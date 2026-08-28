"use client";

import React, { useState } from "react";
import { Camera, Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export interface GalleryImageItem {
  caption?: string;
  imageUrl: string;
}

export interface HomeGalleryDoc {
  _id: string;
  title: string;
  academicYear: string;
  category: string;
  images: GalleryImageItem[];
}

interface HomePhotoGalleryProps {
  galleries: HomeGalleryDoc[];
}

export default function HomePhotoGallery({ galleries }: HomePhotoGalleryProps) {
  // Flatten all images across gallery documents
  const allImages = galleries.flatMap((g) => g.images || []).filter((img) => img.imageUrl);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (allImages.length === 0) return null;

  const currentImage = lightboxIndex !== null ? allImages[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % allImages.length);
  };

  return (
    <section className="py-16 bg-slate-900 text-white select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-xs font-black text-indigo-300 uppercase tracking-wider">
              <Camera className="h-3.5 w-3.5 text-indigo-400" /> Event Highlights & Campus Life
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Life at St. Ann&apos;s College
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-300 font-semibold max-w-2xl">
              Glimpses of academic conventions, cultural festivities, sports meets, and student initiatives on campus.
            </p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-48 rounded-2xl overflow-hidden bg-slate-800 border border-white/10 cursor-pointer shadow-md"
            >
              <img
                src={img.imageUrl}
                alt={img.caption || `Campus Event Photo ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <span className="text-[11px] font-bold text-white leading-tight line-clamp-2">
                  {img.caption || "Campus Event"}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-300 mt-1">
                  <Maximize2 className="h-3 w-3" /> View Photo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 select-none animate-fadeIn">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Main Image Container */}
          <div className="flex flex-col items-center max-w-5xl max-h-[85vh]">
            <img
              src={currentImage.imageUrl}
              alt={currentImage.caption || "Gallery Preview"}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            {currentImage.caption && (
              <p className="font-sans text-sm font-semibold text-slate-200 mt-4 text-center max-w-xl">
                {currentImage.caption}
              </p>
            )}
            <span className="text-xs text-slate-400 mt-1 font-bold">
              {lightboxIndex + 1} of {allImages.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
