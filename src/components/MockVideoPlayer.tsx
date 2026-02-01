"use client";

import { useState } from "react";
import { Play, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export function MockVideoPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border bg-muted">
      <div
        className={cn(
          "relative flex aspect-video items-center justify-center bg-zinc-800",
          playing && "bg-zinc-900"
        )}
      >
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          className="flex size-16 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow-lg transition hover:bg-white"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Square className="size-6 fill-current" />
          ) : (
            <Play className="size-8 fill-current pl-1" />
          )}
        </button>
        {playing && (
          <div className="absolute bottom-2 left-2 right-2 h-1 rounded-full bg-white/30">
            <div className="h-full w-1/3 rounded-full bg-white" />
          </div>
        )}
      </div>
      <div className="border-t px-3 py-2 text-muted-foreground text-xs">
        Live-Video Support (Mock) — Timeline placeholder
      </div>
    </div>
  );
}
