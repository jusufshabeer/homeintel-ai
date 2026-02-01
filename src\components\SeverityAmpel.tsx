"use client";

import type { DamageResult } from "@/lib/types";
import { cn } from "@/lib/utils";

type SeverityAmpelProps = { result: DamageResult };

const AMPEL = {
  low: {
    // Grün: exakt wie beim Häkchen (bg-emerald-500)
    activeClass: "bg-emerald-500 ring-4 ring-emerald-200",
    inactiveClass: "bg-emerald-200",
  },
  medium: {
    // Gelb: echtes Ampel-Gelb
    activeClass: "bg-yellow-400 ring-4 ring-yellow-200",
    inactiveClass: "bg-yellow-200",
  },
  high: {
    // Rot: exakt wie beim X (bg-red-500)
    activeClass: "bg-red-500 ring-4 ring-red-200",
    inactiveClass: "bg-red-200",
  },
} as const;

/**
 * Ampel-System: Grün / Gelb / Rot – rein visuell, ohne Text-Labels.
 * Für den Kunden sofort erkennbar.
 */
export function SeverityAmpel({ result }: SeverityAmpelProps) {
  const severity = result.severity;
  const green = severity === "low" ? AMPEL.low.activeClass : AMPEL.low.inactiveClass;
  const yellow = severity === "medium" ? AMPEL.medium.activeClass : AMPEL.medium.inactiveClass;
  const red = severity === "high" ? AMPEL.high.activeClass : AMPEL.high.inactiveClass;

  return (
    <section
      className="rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6"
      aria-label="Ampel-Einschätzung"
    >
      <h2 className="mb-4 text-base font-semibold text-slate-900 sm:text-lg">
        Wie akut ist der Schaden?
      </h2>
      <div className="flex items-center justify-center gap-4 sm:gap-5">
        <div
          className={cn("size-14 rounded-full sm:size-16 transition-all", green)}
          aria-label="Grün"
        />
        <div
          className={cn("size-14 rounded-full sm:size-16 transition-all", yellow)}
          aria-label="Gelb"
        />
        <div
          className={cn("size-14 rounded-full sm:size-16 transition-all", red)}
          aria-label="Rot"
        />
      </div>
    </section>
  );
}
