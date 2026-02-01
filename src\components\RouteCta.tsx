"use client";

import type { DamageResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Package, Video, CheckCircle2, Wrench, Film } from "lucide-react";
import { MockVideoPlayer } from "@/components/MockVideoPlayer";
import { useState } from "react";

type RouteCtaProps = { result: DamageResult };

export function RouteCta({ result }: RouteCtaProps) {
  const [videoVisible, setVideoVisible] = useState(false);

  if (result.type === "DIY") {
    return (
      <div className="space-y-3">
        <Button
          variant="delivery"
          size="lg"
          className="w-full gap-2 rounded-xl sm:w-auto"
        >
          <Package className="size-5" />
          Ersatzteil liefern lassen (ca. 90 Min)
        </Button>
        <p className="text-muted-foreground text-sm">
          Lieferung bis zur Haustür — du bestellst, wir liefern das Passende.
        </p>
      </div>
    );
  }

  if (result.type === "Gig-Worker") {
    return (
      <div className="space-y-4">
        {/* Call to Action: Dienstleister/Klempner bestellen — für Demo klar erkennbar */}
        <Button
          variant="default"
          size="lg"
          className="w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
          onClick={() => {}}
          aria-label="Klempner oder Dienstleister bestellen"
        >
          <Wrench className="size-5" />
          Klempner bestellen
        </Button>
        <p className="text-muted-foreground text-sm">
          Dienstleister in Ihrer Nähe — Termin wählen, Reparatur erledigen lassen.
        </p>
        <div className="border-t border-slate-200 pt-4 space-y-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Alternativ
          </p>
          {/* Video aus hochgeladenen Bildern (hohe Technologie) */}
          <div>
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 rounded-xl sm:w-auto"
              onClick={() => {}}
              aria-label="Video aus Ihren Fotos erstellen"
            >
              <Film className="size-5" />
              Video aus Ihren Fotos erstellen
            </Button>
            <p className="mt-2 text-muted-foreground text-sm">
              Aus Ihren hochgeladenen Bildern wird ein kurzes Video für den Dienstleister erstellt.
            </p>
          </div>
          <div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVideoVisible(true)}
              className="w-full gap-2 rounded-xl sm:w-auto"
            >
              <Video className="size-5" />
              Live-Video-Hilfe starten
            </Button>
            <p className="mt-2 text-muted-foreground text-sm">
              Ein Experte schaut per Video mit — du zeigst, er erklärt.
            </p>
          </div>
        </div>
        {videoVisible && (
          <div className="rounded-xl border border-slate-200 bg-white p-2">
            <MockVideoPlayer />
          </div>
        )}
      </div>
    );
  }

  if (result.type === "Profi") {
    const reportJson = JSON.stringify(
      {
        Einschätzung: result.description,
        Schwere: result.severity,
        "Nächster Schritt": result.action,
      },
      null,
      2
    );
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
          <CheckCircle2 className="size-5 shrink-0" />
          Projekt beim Fachbetrieb angelegt — du wirst kontaktiert.
        </div>
        <details className="group">
          <summary className="cursor-pointer list-none text-sm text-slate-600 hover:text-slate-900">
            Technische Details anzeigen
          </summary>
          <pre className="mt-3 overflow-auto rounded-lg border border-slate-200 bg-white p-4 font-mono text-xs text-slate-700">
            {reportJson}
          </pre>
        </details>
      </div>
    );
  }

  return null;
}
