import type { DamageResult } from "./types";

/** Nur die Anleitungsschritte – ohne Werkzeuge/Teile (stehen bei „Ersatzteil liefern“). Gilt für Armatur-Bereich / Rohrsystem (nicht nur Perlator). */
export const DIY_PERLATOR_STEPS = `# So gehst du vor (Armatur / Rohrsystem)

1. **Wasser abdrehen** — Am Hahn oder unter der Spüle. Kurz aufdrehen, damit kein Druck mehr da ist.
2. **Perlator bzw. Auslauf abschrauben** — Gegen den Uhrzeigersinn. Vorsichtig mit der Zange, damit Armatur und Rohre keinen Schaden nehmen. Bei Rost: WD-40 sprühen, 5 Min warten.
3. **Reinigen oder tauschen** — Perlator/Auslauf abspülen oder neuen einsetzen. Dichtungen am Rohrsystem prüfen.
4. **Festschrauben** — Im Uhrzeigersinn handfest anziehen. Wasser aufdrehen und prüfen, ob es tropft.
`;

/** Vollständige Anleitung (Armatur-Bereich / Rohrsystem). */
export const DIY_PERLATOR_GUIDE = `# Armatur-Bereich / Rohrsystem: Perlator & Auslauf

## So gehst du vor

1. **Wasser abdrehen** — Am Hahn oder unter der Spüle. Kurz aufdrehen, damit kein Druck mehr da ist.
2. **Perlator bzw. Auslauf abschrauben** — Gegen den Uhrzeigersinn. Vorsichtig mit der Zange, damit Armatur und Rohre keinen Schaden nehmen. Bei Rost: WD-40 sprühen, 5 Min warten.
3. **Reinigen oder tauschen** — Perlator/Auslauf abspülen oder neuen einsetzen. Dichtungen am Rohrsystem prüfen.
4. **Festschrauben** — Im Uhrzeigersinn handfest anziehen. Wasser aufdrehen und prüfen, ob es tropft.
`;

/** Werkzeuge = was man zum Arbeiten braucht (nicht getauscht). */
export const DIY_PERLATOR_TOOLS = [
  "Rohrzange oder Maulschlüssel",
  "Tuch zum Abtrocknen",
  "WD-40 (bei festsitzendem Perlator/Auslauf)",
];

/** Ersatzteile / Teile = was ausgetauscht wird (ganzer Armatur-Bereich, nicht nur Perlator). */
export const DIY_PERLATOR_PARTS = [
  "Ersatz-Perlator bzw. Strahlregler (passend zum Gewinde)",
  "Dichtungen (Perlator, ggf. Auslauf)",
  "Bei Bedarf: Auslauf/Armatur-Teile (wenn Vision AI ganzen Rohrbereich erkennt)",
];

/** Liefert Werkzeuge und Ersatzteile für DIY-Reparatur (für Kachel bei „Ersatzteil liefern“). */
export function getToolsAndParts(result: DamageResult): {
  tools: string[];
  parts: string[];
} {
  if (result.type !== "DIY") return { tools: [], parts: [] };
  if (
    result.repairStyle === "iFixit" ||
    result.description.includes("Kalkablagerung") ||
    result.description.includes("Armatur") ||
    result.description.includes("Rohrsystem")
  ) {
    return { tools: [...DIY_PERLATOR_TOOLS], parts: [...DIY_PERLATOR_PARTS] };
  }
  return { tools: [], parts: [] };
}
