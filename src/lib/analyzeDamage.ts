import type { DamageResult, AnalysisResult } from "./types";

const DEFAULT_RESULT: DamageResult = {
  severity: "low",
  type: "DIY",
  description: "Kalkablagerung / Armatur-Bereich (Rohrsystem)",
  repairStyle: "iFixit",
};

/** Analysiert Video oder Bild. Video: wenn nicht auswertbar → needImages. Bild: echte Vision-API (OpenAI) für Blur- und Schadensanalyse. */
export async function analyzeDamage(file: File | null): Promise<AnalysisResult> {
  if (!file) return DEFAULT_RESULT;

  const fileType = file.type ?? "";

  const isVideo = fileType.startsWith("video/");
  if (isVideo) {
    return { needImages: true };
  }

  if (!fileType.startsWith("image/")) return DEFAULT_RESULT;

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    console.error("Analyze API error:", err);
    return DEFAULT_RESULT;
  }

  const data = await res.json();

  if (data.blur === true) {
    return { blur: true };
  }

  return {
    severity: data.severity ?? "low",
    type: data.type ?? "DIY",
    description: data.description ?? DEFAULT_RESULT.description,
    repairStyle: data.repairStyle ?? DEFAULT_RESULT.repairStyle,
    ...(data.action ? { action: data.action } : {}),
  };
}
