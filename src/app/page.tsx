"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera } from "lucide-react";
import { analyzeDamage } from "@/lib/analyzeDamage";
import type { AnalysisResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ExploreFeed } from "@/components/ExploreFeed";
import { ResultView } from "@/components/ResultView";
import { BlurResultView } from "@/components/BlurResultView";
import { VideoFallbackView } from "@/components/VideoFallbackView";
import { BlurTipTile } from "@/components/BlurTipTile";
import { PhotoAngleTile } from "@/components/PhotoAngleTile";

type ViewState = "idle" | "analyzing" | "result";

export default function HomePage() {
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoOnlyInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => fileInputRef.current?.click();
  const handlePhotoOnlyClick = () => photoOnlyInputRef.current?.click();

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setViewState("analyzing");
    try {
      const analysisResult = await analyzeDamage(file);
      setResult(analysisResult);
      setUploadedCount(1);
      setViewState("result");
    } catch {
      setViewState("idle");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    await handleFile(file ?? null);
    e.target.value = "";
  };

  const handlePhotoOnlyChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    await handleFile(file ?? null);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/") || file?.type.startsWith("video/")) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleNewAnalysis = () => {
    setResult(null);
    setUploadedCount(0);
    setViewState("idle");
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleDropZoneKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleUploadClick();
    }
  };

  // Static first render (no Framer Motion) so server and hydration match; avoids hydration mismatch
  if (!hasMounted && viewState === "idle") {
    return (
      <main className="min-h-screen pb-24 md:pb-28">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Video oder Foto hochladen"
        />
        <div className="relative min-h-screen">
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div className="relative container mx-auto max-w-4xl px-4 py-8 sm:py-12">
            <header className="text-center space-y-3 mb-10 sm:mb-14">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                HomeIntel AI
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto text-base sm:text-lg">
                Video oder Fotos hochladen, Schaden einschätzen lassen und den passenden Lösungsweg bekommen — DIY, Video-Support oder Profi.
              </p>
            </header>
            <div className="mb-12 sm:mb-16">
              <div
                role="button"
                tabIndex={0}
                onClick={handleUploadClick}
                onKeyDown={handleDropZoneKeyDown}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white py-12 px-6 cursor-pointer hover:border-primary/50 hover:bg-slate-50/80"
              >
                <div className="rounded-full bg-primary/10 p-4">
                  <Camera className="size-10 text-primary" />
                </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-slate-900 text-lg">
                      Video oder Fotos hochladen
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Klicken oder Datei hierher ziehen
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Kurzes Video oder Fotos – verschiedene Perspektiven helfen bei der Analyse.
                    </p>
                  </div>
                <Button size="lg" className="gap-2 rounded-xl">
                  <Upload className="size-5" />
                  Datei wählen
                </Button>
              </div>
            </div>
            {/* Getrennte Sektion: Wenn der Kunde Fotos nutzt (Oma-Prinzip) */}
            <div className="max-w-xl mx-auto pt-6 border-t border-slate-200 mt-10">
              <p className="text-sm font-medium text-slate-500 mb-4">
                Wenn Sie Fotos nutzen – so klappt es am besten
              </p>
              <div className="mb-6">
                <PhotoAngleTile uploadedCount={0} />
              </div>
              <div className="mb-10">
                <BlurTipTile />
              </div>
            </div>
            <ExploreFeed useMotion={false} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-24 md:pb-28">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Video oder Foto hochladen"
      />
      <input
        ref={photoOnlyInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoOnlyChange}
        aria-label="Nur Fotos hochladen"
      />

      <AnimatePresence mode="wait">
        {viewState === "idle" && (
          <motion.div
            key="home"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative min-h-screen"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-40" />
            <div className="relative container mx-auto max-w-4xl px-4 py-8 sm:py-12">
              <header className="text-center space-y-3 mb-10 sm:mb-14">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  HomeIntel AI
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto text-base sm:text-lg">
                  Video oder Fotos hochladen, Schaden einschätzen lassen und den passenden Lösungsweg bekommen — DIY, Video-Support oder Profi.
                </p>
              </header>

              <motion.div
                initial={false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="mb-12 sm:mb-16"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleUploadClick}
                  onKeyDown={handleDropZoneKeyDown}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`
                    w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed
                    py-12 px-6 transition-all duration-200 cursor-pointer
                    ${dragActive
                      ? "border-primary bg-primary/5 scale-[1.02]"
                      : "border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50/80"
                    }
                  `}
                >
                  <div className="rounded-full bg-primary/10 p-4">
                    <Camera className="size-10 text-primary" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-slate-900 text-lg">
                      Video oder Fotos hochladen
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Klicken oder Datei hierher ziehen
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Kurzes Video oder Fotos – verschiedene Perspektiven helfen bei der Analyse.
                    </p>
                  </div>
                  <Button size="lg" className="gap-2 rounded-xl">
                    <Upload className="size-5" />
                    Datei wählen
                  </Button>
                </div>
              </motion.div>

              {/* Getrennte Sektion: Wenn der Kunde Fotos nutzt (Oma-Prinzip) */}
              <div className="max-w-xl mx-auto pt-6 border-t border-slate-200 mt-10">
                <p className="text-sm font-medium text-slate-500 mb-4">
                  Wenn Sie Fotos nutzen – so klappt es am besten
                </p>
                <div className="mb-6">
                  <PhotoAngleTile uploadedCount={0} />
                </div>
                <div className="mb-10">
                  <BlurTipTile />
                </div>
              </div>

              <ExploreFeed useMotion />
            </div>
          </motion.div>
        )}

        {viewState === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-slate-50/95 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="size-14 rounded-full border-4 border-primary border-t-transparent"
            />
            <div className="text-center space-y-1">
              <p className="font-semibold text-slate-900">Analyse läuft...</p>
              <p className="text-muted-foreground text-sm">
                KI wertet Ihre Datei aus
              </p>
            </div>
          </motion.div>
        )}

        {viewState === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="container mx-auto max-w-2xl px-4 py-10 sm:py-14"
          >
            <div className="mb-8 flex items-center justify-end">
              <button
                type="button"
                onClick={handleNewAnalysis}
                className="text-muted-foreground text-sm hover:text-slate-900"
              >
                {"needImages" in result ? "Neu starten" : "Anderes Foto"}
              </button>
            </div>
            {"needImages" in result ? (
              <VideoFallbackView
                onUploadPhotos={handlePhotoOnlyClick}
                onFileDrop={handleFile}
              />
            ) : "blur" in result ? (
              <>
                <div className="mb-6">
                  <PhotoAngleTile uploadedCount={uploadedCount} />
                </div>
                <BlurResultView
                  onNewPhoto={handleUploadClick}
                  onFileDrop={handleFile}
                />
              </>
            ) : (
              <ResultView result={result} uploadedCount={uploadedCount} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
