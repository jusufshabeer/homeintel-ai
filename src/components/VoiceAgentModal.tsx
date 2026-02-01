"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ELEVENLABS_SCRIPT_URL =
  "https://unpkg.com/@elevenlabs/convai-widget-embed";
const SCRIPT_ID = "elevenlabs-convai-widget-script";

type VoiceAgentModalProps = {
  agentId: string;
  open: boolean;
  onClose: () => void;
};

/** Lädt das ElevenLabs-Widget-Skript einmal global */
function loadElevenLabsScript(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const existing = document.getElementById(SCRIPT_ID);
  if (existing) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = ELEVENLABS_SCRIPT_URL;
    script.async = true;
    script.type = "text/javascript";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("ElevenLabs-Widget konnte nicht geladen werden."));
    document.body.appendChild(script);
  });
}

export function VoiceAgentModal({ agentId, open, onClose }: VoiceAgentModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !agentId) return;

    setError(null);
    loadElevenLabsScript()
      .then(() => setScriptLoaded(true))
      .catch((e) => setError(e instanceof Error ? e.message : "Unbekannter Fehler"));
  }, [open, agentId]);

  useEffect(() => {
    if (!open || !scriptLoaded || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", agentId);
    widget.setAttribute("variant", "expanded");
    widget.setAttribute("dismissible", "true");
    // Deutsche Anzeigetexte
    widget.setAttribute("action-text", "Sprachhilfe — Termin vereinbaren");
    widget.setAttribute("start-call-text", "Gespräch starten");
    widget.setAttribute("end-call-text", "Gespräch beenden");
    widget.setAttribute("expand-text", "Chat öffnen");
    widget.setAttribute("listening-text", "Höre zu…");
    widget.setAttribute("speaking-text", "Assistent spricht");

    container.appendChild(widget);

    return () => {
      container.innerHTML = "";
    };
  }, [open, scriptLoaded, agentId]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-agent-modal-title"
      onClick={handleOverlayClick}
    >
      <div
        className="relative flex h-full max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2
            id="voice-agent-modal-title"
            className="text-lg font-semibold text-slate-900"
          >
            Termin mit Sprachassistent vereinbaren
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Fenster schließen"
          >
            <X className="size-5" />
          </Button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4">
          {error && (
            <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {error}
            </div>
          )}
          <div
            ref={containerRef}
            className="min-h-[320px] [&_elevenlabs-convai]:min-h-[320px]"
          />
        </div>
        <p className="shrink-0 border-t border-slate-200 px-4 py-2 text-center text-xs text-slate-500">
          Sprechen Sie mit dem Assistenten, um einen Klempner-Termin zu vereinbaren. Ihr Kalender (Google) wird über unseren Dienst verbunden.
        </p>
      </div>
    </div>
  );
}
