"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ImageIcon, ChevronDown, ChevronUp, Upload, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** 3 Winkel mit Beispielbildern (Zeichenstil). */
const THREE_ANGLES = [
  { label: "Von vorne", sub: "Schaden zentral im Bild", src: "/image/tipp-vorne.png" },
  { label: "Von der Seite", sub: "Anderer Winkel für Kontext", src: "/image/tipp-seite.png" },
  { label: "Im Detail", sub: "Wichtige Stelle nah heran", src: "/image/tipp-detail.png" },
];

type BlurResultViewProps = {
  /** Öffnet Dateiauswahl / Kamera – Kunde bleibt auf der Seite */
  onNewPhoto: () => void;
  /** Wird aufgerufen, wenn ein Bild per Drag & Drop abgelegt wird */
  onFileDrop?: (file: File) => void;
  /** Kleine Kachel „Unscharf“ – immer sichtbar, jederzeit aufrufbar */
  showTile?: boolean;
};

/** Kachel „Foto unscharf“ – kompakt, immer erkennbar (Oma-Prinzip). */
export function BlurTile({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border-2 border-amber-200 bg-amber-50 px-3 py-2 text-amber-800",
        compact ? "text-sm" : "text-base",
        className
      )}
      aria-label="Hinweis: Foto war unscharf"
    >
      <ImageIcon className="size-4 shrink-0 text-amber-600" aria-hidden />
      <span className="font-medium">Foto unscharf</span>
    </div>
  );
}

export function BlurResultView({
  onNewPhoto,
  onFileDrop,
  showTile = true,
}: BlurResultViewProps) {
  const [tipOpen, setTipOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/") && onFileDrop) onFileDrop(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  return (
    <div className="mx-auto max-w-xl space-y-8">
      {/* Kleine Kachel oben: weich formuliert (Kunde evtl. frustriert) */}
      {showTile && (
        <div className="flex flex-wrap items-center gap-2">
          <BlurTile />
          <span className="text-muted-foreground text-sm">
            Ein neues Foto hilft uns weiter – dafür möchten wir Sie bitten.
          </span>
        </div>
      )}

      <section className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-amber-200">
            <Camera className="size-7 text-amber-800" aria-hidden />
          </div>
          <h2 className="text-xl font-semibold text-amber-900 sm:text-2xl">
            Das Foto ist leider unscharf geworden
          </h2>
          <p className="max-w-md text-base leading-relaxed text-amber-800">
            Das passiert schnell – kein Problem. Laden Sie hier direkt ein neues
            Foto hoch oder nehmen Sie eines mit der Kamera auf – Sie bleiben auf
            dieser Seite.
          </p>

          {/* Direkt hier: neues Bild laden oder Kamera (ohne Zurück zur Startseite) */}
          <div
            role="button"
            tabIndex={0}
            onClick={onNewPhoto}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onNewPhoto();
              }
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "mt-4 w-full max-w-sm rounded-xl border-2 border-dashed py-6 px-4 cursor-pointer transition-colors",
              dragActive
                ? "border-amber-500 bg-amber-100/50"
                : "border-amber-300 bg-white hover:border-amber-400 hover:bg-amber-50/50"
            )}
            aria-label="Neues Foto auswählen oder hierher ziehen"
          >
            <Upload className="mx-auto size-8 text-amber-700 mb-2" aria-hidden />
            <p className="font-medium text-amber-900">
              Neues Foto auswählen oder hierher ziehen
            </p>
            <p className="text-sm text-amber-700 mt-0.5">
              Klicken öffnet Kamera / Galerie – Sie bleiben auf dieser Seite
            </p>
          </div>
          <Button
            size="lg"
            onClick={onNewPhoto}
            className="mt-2 gap-2 rounded-xl bg-amber-600 hover:bg-amber-700"
            aria-label="Neues Foto aufnehmen oder auswählen"
          >
            <Camera className="size-5" />
            Foto auswählen oder Kamera öffnen
          </Button>
        </div>
      </section>

      {/* Tipp auf der Blur-Seite: weich, nicht belehrend – für frustrierte Kunden */}
      <section className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden">
        <button
          type="button"
          onClick={() => setTipOpen(!tipOpen)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50/80"
          aria-expanded={tipOpen}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <ImageIcon className="size-5 text-primary" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <span className="font-medium text-slate-900">Kleiner Tipp für das nächste Foto</span>
            <p className="text-sm text-muted-foreground">
              {tipOpen ? "Einklappen" : "Falls Sie möchten – ganz unkompliziert"}
            </p>
          </div>
          {tipOpen ? (
            <ChevronUp className="size-5 shrink-0 text-slate-400" aria-hidden />
          ) : (
            <ChevronDown className="size-5 shrink-0 text-slate-400" aria-hidden />
          )}
        </button>
        <AnimatePresence>
          {tipOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-slate-100 bg-slate-50/50 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-4 text-sm text-slate-700">
                <div className="space-y-2 leading-relaxed">
                  <p>Ein scharfes Foto reicht.</p>
                  <p>Noch besser: drei Fotos aus verschiedenen Winkeln. Dann erkennen wir den Schaden am besten.</p>
                  <p className="text-slate-600">Kein Muss. Nur ein Tipp.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">So sehen die drei empfohlenen Blickwinkel aus</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Von vorne. Von der Seite. Nah im Detail.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {THREE_ANGLES.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
                      >
                        <div className="relative aspect-[4/3] w-full bg-slate-50">
                          <Image
                            src={item.src}
                            alt={item.label}
                            fill
                            className="object-contain p-1"
                            sizes="(max-width: 400px) 100px, 120px"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <p className="font-medium text-slate-900 text-xs">{item.label}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2">So gelingt das Foto</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/80 overflow-hidden text-center">
                      <div className="relative aspect-[4/3] w-full bg-white">
                        <Image
                          src="/image/ergebnis-gut.png"
                          alt="Beispiel: gutes Foto – scharf, Schaden erkennbar"
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 400px) 140px, 180px"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" aria-hidden>
                            <Check className="size-5" strokeWidth={3} />
                          </span>
                          <p className="font-semibold text-emerald-800 text-sm">Gutes Ergebnis</p>
                        </div>
                        <p className="text-[11px] text-emerald-700 leading-snug">
                          Foto ist scharf. Gut beleuchtet. Der Schaden ist klar zu sehen.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-xl border-2 border-slate-200 bg-slate-100/80 overflow-hidden text-center">
                      <div className="relative aspect-[4/3] w-full bg-white">
                        <Image
                          src="/image/ergebnis-nicht-gut.png"
                          alt="Beispiel: nicht so gutes Foto – unscharf"
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 400px) 140px, 180px"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white" aria-hidden>
                            <X className="size-5" strokeWidth={3} />
                          </span>
                          <p className="font-semibold text-slate-600 text-sm">Nicht so gutes Ergebnis</p>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          Foto ist unscharf oder zu dunkel. Dann bitten wir um ein neues Foto.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
