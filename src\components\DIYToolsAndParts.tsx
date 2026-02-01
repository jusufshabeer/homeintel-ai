"use client";

import { useState } from "react";
import { Wrench, Package } from "lucide-react";
import { cn } from "@/lib/utils";

type DIYToolsAndPartsProps = {
  tools: string[];
  parts: string[];
};

/**
 * Werkzeuge und Ersatzteile nahe „Ersatzteil liefern“.
 * Checkbox = „Habe ich“ → angehakt = nicht mitbestellen, nicht angehakt = soll mitgeliefert werden.
 * Oma-tauglich: klar getrennt Werkzeuge (zum Arbeiten) vs. Teile (zum Tauschen).
 */
export function DIYToolsAndParts({ tools, parts }: DIYToolsAndPartsProps) {
  const [haveTool, setHaveTool] = useState<Record<number, boolean>>({});
  const [havePart, setHavePart] = useState<Record<number, boolean>>({});

  const toggleTool = (i: number) =>
    setHaveTool((prev) => ({ ...prev, [i]: !prev[i] }));
  const togglePart = (i: number) =>
    setHavePart((prev) => ({ ...prev, [i]: !prev[i] }));

  if (tools.length === 0 && parts.length === 0) return null;

  return (
    <div className="mt-6 space-y-5 rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-medium text-slate-700">
        Was Sie haben — was wir liefern sollen
      </p>

      {tools.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-2 text-slate-900">
            <Wrench className="size-4 shrink-0 text-slate-500" aria-hidden />
            <span className="font-medium">Werkzeuge</span>
          </div>
          <p className="mb-2 text-xs text-muted-foreground">
            Ankreuzen = „habe ich“. Nicht angekreuzt = mitbestellen.
          </p>
          <ul className="space-y-2">
            {tools.map((label, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={haveTool[i] ?? false}
                    onChange={() => toggleTool(i)}
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                    aria-label={`${label} – habe ich`}
                  />
                  <span className={cn(haveTool[i] && "text-slate-500 line-through")}>
                    {label}
                  </span>
                  {haveTool[i] && (
                    <span className="text-xs text-emerald-600">(habe ich)</span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {parts.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-2 text-slate-900">
            <Package className="size-4 shrink-0 text-slate-500" aria-hidden />
            <span className="font-medium">Ersatzteile / Teile zum Tauschen</span>
          </div>
          <p className="mb-2 text-xs text-muted-foreground">
            Ankreuzen = „habe ich“. Nicht angekreuzt = mitbestellen.
          </p>
          <ul className="space-y-2">
            {parts.map((label, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={havePart[i] ?? false}
                    onChange={() => togglePart(i)}
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                    aria-label={`${label} – habe ich`}
                  />
                  <span className={cn(havePart[i] && "text-slate-500 line-through")}>
                    {label}
                  </span>
                  {havePart[i] && (
                    <span className="text-xs text-emerald-600">(habe ich)</span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
