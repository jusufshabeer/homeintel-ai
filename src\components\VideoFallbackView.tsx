"use client";

import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoAngleTile } from "@/components/PhotoAngleTile";

type VideoFallbackViewProps = {
  /** Öffnet Dateiauswahl nur für Fotos (situationsbedingt) */
  onUploadPhotos: () => void;
  /** Fotos per Drop (nur Bilder akzeptieren) */
  onFileDrop?: (file: File) => void;
};

/**
 * Situationsbedingt: Video war nicht auswertbar → Kunde soll Fotos laden.
 * Layout passt sich an – nur Fotos-Upload, kein Video.
 */
export function VideoFallbackView({
  onUploadPhotos,
  onFileDrop,
}: VideoFallbackViewProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/") && onFileDrop) onFileDrop(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/80 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-slate-200">
            <Camera className="size-7 text-slate-600" aria-hidden />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Aus dem Video konnten wir nicht genug erkennen
          </h2>
          <p className="max-w-md text-base leading-relaxed text-slate-700">
            Laden Sie bitte <strong>Fotos</strong> aus verschiedenen Winkeln
            hoch – dann können wir den Schaden zuverlässig einschätzen.
          </p>

          <div
            role="button"
            tabIndex={0}
            onClick={onUploadPhotos}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onUploadPhotos();
              }
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={(e) => e.preventDefault()}
            className="mt-4 w-full max-w-sm rounded-xl border-2 border-dashed border-slate-300 bg-white py-6 px-4 cursor-pointer hover:border-primary/50 hover:bg-slate-50/50 transition-colors"
            aria-label="Fotos hochladen"
          >
            <Upload className="mx-auto size-8 text-slate-500 mb-2" aria-hidden />
            <p className="font-medium text-slate-900">
              Fotos auswählen oder hierher ziehen
            </p>
            <p className="text-sm text-slate-600 mt-0.5">
              Nur Fotos – verschiedene Perspektiven helfen
            </p>
          </div>
          <Button
            size="lg"
            onClick={onUploadPhotos}
            className="mt-2 gap-2 rounded-xl"
            aria-label="Fotos hochladen"
          >
            <Camera className="size-5" />
            Fotos hochladen
          </Button>
        </div>
      </div>

      <PhotoAngleTile uploadedCount={0} />
    </div>
  );
}
