"use client";

import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_PHOTOS = 3;

type PhotoAngleTileProps = {
  /** Anzahl bereits hochgeladener Fotos (0–3). */
  uploadedCount: number;
  /** Kompakt (z. B. in Ecke) oder normal. */
  compact?: boolean;
  className?: string;
};

/**
 * Kleine Kachel: Wie viele Fotos hochgeladen, Hinweis auf 3 Winkel für bessere Analyse.
 * Auf Hauptseite (0/3) und auf Ergebnis-Seite (1/3) nutzbar.
 */
export function PhotoAngleTile({
  uploadedCount,
  compact = false,
  className,
}: PhotoAngleTileProps) {
  const count = Math.min(Math.max(0, uploadedCount), MAX_PHOTOS);

  if (compact) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700",
          className
        )}
        aria-label={`${count} von ${MAX_PHOTOS} Fotos hochgeladen – 3 Winkel für bessere Analyse`}
      >
        <Camera className="size-4 shrink-0 text-slate-500" aria-hidden />
        <span className="font-medium">{count}/{MAX_PHOTOS}</span>
        <span className="text-slate-500">Fotos</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-slate-200 bg-white p-4",
        className
      )}
      aria-label={`${count} von ${MAX_PHOTOS} Fotos – 3 Winkel für bessere Analyse`}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Camera className="size-5 text-primary" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">
            {count}/{MAX_PHOTOS} Fotos hochgeladen
          </p>
          <p className="text-sm text-muted-foreground">
            {count === 0
              ? "Mindestens 1 Foto nötig. 3 Fotos aus verschiedenen Winkeln verbessern die Analyse."
              : count < MAX_PHOTOS
                ? "3 Fotos aus verschiedenen Winkeln verbessern die Analyse."
                : "Alle 3 Winkel erfasst – Analyse basiert auf allen Fotos."}
          </p>
        </div>
      </div>
    </div>
  );
}
