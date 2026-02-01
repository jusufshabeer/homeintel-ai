"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** 3 Winkel mit Beispielbildern (Zeichenstil). */
const THREE_ANGLES = [
  { label: "Von vorne", sub: "Schaden zentral im Bild", src: "/image/tipp-vorne.png" },
  { label: "Von der Seite", sub: "Anderer Winkel für Kontext", src: "/image/tipp-seite.png" },
  { label: "Im Detail", sub: "Wichtige Stelle nah heran", src: "/image/tipp-detail.png" },
];

/**
 * Kleine Kachel auf der Startseite: „Tipp: Scharfe Fotos“ – jederzeit aufrufbar.
 * Enthält: Regel (mind. 1 Foto, 3 = bessere Analyse), 3 Winkel-Beispiele, Gutes vs. Nicht so gutes Ergebnis.
 */
export function BlurTipTile() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto rounded-2xl border-2 border-slate-200 bg-white shadow-sm overflow-hidden transition-all",
        open && "border-primary/30 shadow-md"
      )}
      aria-label="Tipp: So gelingt ein gutes Foto"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50/80"
        aria-expanded={open}
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <ImageIcon className="size-5 text-primary" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-medium text-slate-900">Tipp: Scharfe Fotos</span>
          <p className="text-sm text-muted-foreground truncate">
            {open ? "Einklappen" : "Mind. 1 Foto, 3 Winkel = bessere Analyse"}
          </p>
        </div>
        {open ? (
          <ChevronUp className="size-5 shrink-0 text-slate-400" aria-hidden />
        ) : (
          <ChevronDown className="size-5 shrink-0 text-slate-400" aria-hidden />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-slate-100 bg-slate-50/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4 text-sm text-slate-700">
              <div className="space-y-2 leading-relaxed">
                <p>Ein Foto reicht uns völlig. Schön, wenn es scharf ist – dann können wir Ihnen am besten helfen.</p>
                <p>Drei Fotos aus verschiedenen Winkeln helfen uns noch besser.</p>
              </div>

              {/* 3 Winkel mit Beispielbildern */}
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  So sehen die drei empfohlenen Blickwinkel aus
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  Von vorne. Von der Seite. Nah im Detail.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {THREE_ANGLES.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.2 }}
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
                        <p className="font-medium text-slate-900 text-xs">
                          {item.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {item.sub}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gutes Ergebnis vs. Nicht so gutes Ergebnis */}
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  So gelingt das Foto
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.2 }}
                    className="rounded-xl border-2 border-emerald-200 bg-emerald-50/80 overflow-hidden text-center"
                  >
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
                        <p className="font-semibold text-emerald-800 text-sm">
                          Gutes Ergebnis
                        </p>
                      </div>
                      <p className="text-[11px] text-emerald-700 leading-snug">
                        Foto ist scharf. Gut beleuchtet. Der Schaden ist klar zu sehen.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                    className="rounded-xl border-2 border-slate-200 bg-slate-100/80 overflow-hidden text-center"
                  >
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
                        <p className="font-semibold text-slate-600 text-sm">
                          Nicht so gutes Ergebnis
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Foto ist unscharf oder zu dunkel. Dann bitten wir um ein neues Foto.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
