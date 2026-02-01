export type DamageResult = {
  severity: "low" | "medium" | "high";
  type: "DIY" | "Gig-Worker" | "Profi";
  description: string;
  repairStyle: string;
  action?: string; // only for Profi: 'Push to Plancraft'
};

/** Vision AI hat unscharfes Foto erkannt – Kunde soll neues Bild hochladen */
export type BlurResult = { blur: true };

/** Video war nicht auswertbar – Kunde soll Fotos laden (situationsbedingtes Layout) */
export type VideoNeedImagesResult = { needImages: true };

export type AnalysisResult = DamageResult | BlurResult | VideoNeedImagesResult;
