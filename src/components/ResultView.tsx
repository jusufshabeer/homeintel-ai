"use client";

import { useState } from "react";
import type { DamageResult } from "@/lib/types";
import { TechnicalGuide } from "@/components/TechnicalGuide";
import { RouteCta } from "@/components/RouteCta";
import { DIY_PERLATOR_STEPS, getToolsAndParts } from "@/lib/mockGuides";
import { DIYToolsAndParts } from "@/components/DIYToolsAndParts";
import { SeverityAmpel } from "@/components/SeverityAmpel";
import { PhotoAngleTile } from "@/components/PhotoAngleTile";
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ResultViewProps = { result: DamageResult; uploadedCount?: number };

const severityConfig: Record<
  string,
  { label: string; dotClass: string; bgClass: string }
> = {
  low: {
    label: "Einfach",
    dotClass: "bg-emerald-500",
    bgClass: "bg-emerald-50 text-emerald-800",
  },
  medium: {
    label: "Mittel",
    dotClass: "bg-amber-500",
    bgClass: "bg-amber-50 text-amber-800",
  },
  high: {
    label: "Fachbetrieb nötig",
    dotClass: "bg-rose-500",
    bgClass: "bg-rose-50 text-rose-800",
  },
};

function MeisterpflichtCard({ result }: { result: DamageResult }) {
  const meisterpflicht = result.type === "Profi" || result.severity === "high";

  if (meisterpflicht) {
    return (
      <section
        className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-5 sm:p-6"
        aria-label="Wichtige Information: Meisterpflicht"
      >
        <h2 className="mb-3 text-base font-semibold text-amber-900 sm:text-lg">
          Für Sie wichtig
        </h2>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-200">
            <AlertCircle className="size-5 text-amber-700" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-amber-900">
              Meisterpflicht: <span className="text-amber-700">Ja</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-amber-800">
              Für diese Arbeit ist ein Meisterbetrieb nötig. Wir empfehlen einen
              Fachbetrieb — so ist alles sicher und rechtlich in Ordnung.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-5 sm:p-6"
      aria-label="Wichtige Information: Keine Meisterpflicht"
    >
      <h2 className="mb-3 text-base font-semibold text-emerald-900 sm:text-lg">
        Für Sie wichtig
      </h2>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-200">
          <CheckCircle2 className="size-5 text-emerald-700" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-emerald-900">
            Meisterpflicht: <span className="text-emerald-700">Nein</span>
          </p>
          <p className="mt-1 text-sm leading-relaxed text-emerald-800">
            Sie dürfen die Reparatur selbst durchführen oder einen Dienstleister
            beauftragen. Kein Meisterbetrieb nötig.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ResultView({ result, uploadedCount = 1 }: ResultViewProps) {
  const [showGuide, setShowGuide] = useState(false);
  const config = severityConfig[result.severity] ?? severityConfig.low;

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <SeverityAmpel result={result} />
      <PhotoAngleTile uploadedCount={uploadedCount} />
      <MeisterpflichtCard result={result} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Das haben wir erkannt
        </h2>
        <p className="text-slate-700 text-base leading-relaxed">
          {result.description}
        </p>
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
            config.bgClass
          )}
        >
          <span className={cn("size-2 rounded-full", config.dotClass)} />
          {config.label}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Dein nächster Schritt
        </h2>
        <RouteCta result={result} />
        {result.type === "DIY" && (() => {
          const { tools, parts } = getToolsAndParts(result);
          if (tools.length > 0 || parts.length > 0) {
            return <DIYToolsAndParts tools={tools} parts={parts} />;
          }
          return null;
        })()}
      </section>

      {result.type === "DIY" && (
        <section className="border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="flex w-full items-center justify-between gap-2 rounded-lg py-2 text-left text-sm font-medium text-slate-600 hover:text-slate-900"
            aria-expanded={showGuide}
          >
            {showGuide ? "Anleitung ausblenden" : "Kurze Anleitung anzeigen"}
            {showGuide ? (
              <ChevronUp className="size-4 shrink-0" />
            ) : (
              <ChevronDown className="size-4 shrink-0" />
            )}
          </button>
          {showGuide && (
            <div className="mt-4">
              <TechnicalGuide content={DIY_PERLATOR_STEPS} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
