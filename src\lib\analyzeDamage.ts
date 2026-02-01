import type { DamageResult, AnalysisResult } from "./types";

const MOCK_DELAY_MS = 1800;

const DEFAULT_RESULT: DamageResult = {
  severity: "low",
  type: "DIY",
  description: "Kalkablagerung / Armatur-Bereich (Rohrsystem)",
  repairStyle: "iFixit",
};

/** Prüft, ob das Bild als unscharf gelten soll (Vision AI – hier Mock via Dateiname; später echte Vision-API). */
function detectBlur(image: File): boolean {
  const name = (image.name ?? "").toLowerCase();
  return name.includes("blur") || name.includes("unscharf");
}

/** Analysiert Video oder Bild. Video: wenn nicht auswertbar → needImages. Bild: wie bisher (blur, Schaden). */
export async function analyzeDamage(file: File | null): Promise<AnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  if (!file) return DEFAULT_RESULT;

  const fileType = file.type ?? "";
  
  const isVideo = fileType.startsWith("video/");
  if (isVideo) {
    return { needImages: true };
  }

  if (!fileType.startsWith("image/")) return DEFAULT_RESULT;

  if (detectBlur(file)) {
    return { blur: true };
  }

  const name = file.name.toLowerCase();

  // Profi route: extrem.png or "Rohrbruch"
  if (name.includes("rohrbruch") || name.includes("extrem")) {
    return {
      severity: "high",
      type: "Profi",
      description: "Wasserschaden / Meisterpflicht",
      repairStyle: "Plancraft",
      action: "Push to Plancraft",
    };
  }

  // Gig-Worker route: middle.png or "Siphon"
  if (name.includes("siphon") || name.includes("middle")) {
    return {
      severity: "medium",
      type: "Gig-Worker",
      description: "Undichter Abfluss",
      repairStyle: "Video-Support",
    };
  }

  // DIY route: easy.png, Perlator, Armatur, Rohrsystem.
  // Vision AI soll lernen: nicht nur Perlator, sondern ganzer Armatur-/Rohrbereich (siehe docs/vision-ai-knowledge-diy-rohrsystem.md).
  if (
    name.includes("perlator") ||
    name.includes("easy") ||
    name.includes("armatur") ||
    name.includes("rohr") ||
    name.includes("wasserhahn")
  ) {
    return {
      severity: "low",
      type: "DIY",
      description: "Kalkablagerung / Armatur-Bereich (Rohrsystem, Perlator, Auslauf)",
      repairStyle: "iFixit",
    };
  }

  return DEFAULT_RESULT;
}
