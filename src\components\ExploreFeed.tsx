"use client";

import {
  Wrench,
  Droplets,
  Thermometer,
  ShowerHead,
  CircleAlert,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const MOCK_ITEMS: {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    id: "1",
    title: "Perlator wechseln",
    description: "Kalkablagerung entfernen und Sieb tauschen",
    icon: Wrench,
    color: "text-amber-600 bg-amber-100",
  },
  {
    id: "2",
    title: "Siphon reinigen",
    description: "Verstopfung lösen und Dichtung prüfen",
    icon: Droplets,
    color: "text-cyan-600 bg-cyan-100",
  },
  {
    id: "3",
    title: "Wasserhahn entkalken",
    description: "Ventile und Perlatoren reinigen",
    icon: Thermometer,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: "4",
    title: "Duschkopf entkalken",
    description: "Essig einweichen und durchspülen",
    icon: ShowerHead,
    color: "text-violet-600 bg-violet-100",
  },
  {
    id: "5",
    title: "Toilette undicht",
    description: "Spülkasten und Dichtung prüfen",
    icon: CircleAlert,
    color: "text-rose-600 bg-rose-100",
  },
  {
    id: "6",
    title: "Heizkörper entlüften",
    description: "Luft ablassen bis Wasser kommt",
    icon: Zap,
    color: "text-orange-600 bg-orange-100",
  },
];

const articleClassName =
  "group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md";

export function ExploreFeed({ useMotion = true }: { useMotion?: boolean }) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          DIY-Wissen entdecken
        </h2>
        <span className="text-muted-foreground text-sm">
          Inspiration für kleine Reparaturen
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {MOCK_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const content = (
            <>
              <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                <div
                  className={`rounded-xl p-3 transition-transform group-hover:scale-110 ${item.color}`}
                >
                  <Icon className="size-8" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-0.5 text-xs line-clamp-2">
                  {item.description}
                </p>
              </div>
            </>
          );
          return useMotion ? (
            <motion.article
              key={item.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className={articleClassName}
            >
              {content}
            </motion.article>
          ) : (
            <article key={item.id} className={articleClassName}>
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
