"use client";

import { useState } from "react";
import type { DamageResult } from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type DebugOverlayProps = { result: DamageResult };

function getToolList(result: DamageResult): string[] {
  if (result.type === "DIY")
    return ["Zange", "WD-40", "Ersatz-Perlatoren", "Tuch"];
  if (result.type === "Gig-Worker")
    return ["Handy", "Kamera", "Stabiles Internet"];
  if (result.type === "Profi") return ["Meisterbetrieb", "Plancraft-API"];
  return ["Zange", "WD-40", "Ersatz-Perlatoren"];
}

export function DebugOverlay({ result }: DebugOverlayProps) {
  const [collapsed, setCollapsed] = useState(true);
  const meisterpflicht =
    result.type === "Profi" || result.severity === "high";
  const toolList = getToolList(result);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-sm",
        collapsed ? "py-1.5" : "p-3"
      )}
    >
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between gap-2 px-3 py-1 text-left text-xs text-slate-400 hover:text-slate-600"
        aria-expanded={!collapsed}
      >
        <span>Debug</span>
        {collapsed ? (
          <ChevronDown className="size-3.5" aria-hidden />
        ) : (
          <ChevronUp className="size-3.5" aria-hidden />
        )}
      </button>
      {!collapsed && (
        <div className="mt-2 flex flex-wrap gap-4 border-t border-slate-100 pt-2 text-xs text-slate-500">
          <span>Severity: {result.severity}</span>
          <span>Meisterpflicht: {meisterpflicht ? "Ja" : "Nein"}</span>
          <span>Tools: {toolList.join(", ")}</span>
        </div>
      )}
    </div>
  );
}
