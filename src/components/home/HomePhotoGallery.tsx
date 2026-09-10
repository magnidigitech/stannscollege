"use client";

import React, { useState, useEffect, useRef } from "react";
import { Camera, Sparkles, X, ChevronLeft, ChevronRight, Maximize2, Play, ExternalLink, Video } from "lucide-react";

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
  
  // Filter out images 1, 2, 3, 7, 8, 9 (indices 0, 1, 2, 6, 7, 8) as requested,
  // since the YouTube video takes their 2-row x 3-column place
  const displayImages = allImages.filter((_, idx) => ![0, 1, 2, 6, 7, 8].includes(idx));

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [startSecond, setStartSecond] = useState(0);
  const playerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Initialize YouTube IFrame API to track playback time for seamless continuity
  useEffect(() => {
    let isMounted = true;

    const initYT = () => {
      if (typeof window === "undefined" || !(window as any).YT || !(window as any).YT.Player) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new (window as any).YT.Player("stanns-yt-preview-iframe", {
          events: {
            onReady: (event: any) => {
              try {
                event.target.mute();
                event.target.playVideo();
              } catch (e) {}
              startTimeRef.current = Date.now();
            },
          },
        });
      } catch (err) {
        // Fallback timer is active
      }
    };

    if (typeof window !== "undefined") {
      if ((window as any).YT && (window as any).YT.Player) {
        initYT();
      } else {
        const existingScript = document.getElementById("yt-iframe-api");
        if (!existingScript) {
          const tag = document.createElement("script");
          tag.id = "yt-iframe-api";
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const prevCallback = (window as any).onYouTubeIframeAPIReady;
        (window as any).onYouTubeIframeAPIReady = () => {
          if (prevCallback) prevCallback();
          if (isMounted) initYT();
        };
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenVideoModal = () => {
    let currentSec = 0;
    try {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        const t = playerRef.current.getCurrentTime();
        if (typeof t === "number" && !isNaN(t) && t > 0) {
          currentSec = Math.floor(t);
        }
        playerRef.current.pauseVideo?.();
      } else {
        currentSec = Math.floor((Date.now() - startTimeRef.current) / 1000);
      }
    } catch (e) {
      currentSec = Math.floor((Date.now() - startTimeRef.current) / 1000);
    }

    if (currentSec > 400) {
      currentSec = currentSec % 300;
    }

    setStartSecond(Math.max(0, currentSec));
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    try {
      playerRef.current?.playVideo?.();
    } catch (e) {}
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseVideoModal();
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (allImages.length === 0) return null;

  const currentImage = lightboxIndex !== null ? displayImages[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + displayImages.length) % displayImages.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % displayImages.length);
  };

  return (
    <section className="py-16 bg-slate-900 text-white select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-xs font-black text-indigo-300 uppercase tracking-wider">
              <Camera className="h-3.5 w-3.5 text-indigo-400" /> Event Highlights &amp; Campus Life
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Life at St. Ann&apos;s College
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-300 font-semibold max-w-2xl">
              Glimpses of academic conventions, cultural festivities, sports meets, and student initiatives on campus.
            </p>
          </div>
        </div>

        {/* Dynamic Grid: Video takes 3 cols x 2 rows in place of images 1, 2, 3, 7, 8, 9 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          
          {/* YouTube Video Feature Block (Video playing live inside the card) */}
          <div
            onClick={handleOpenVideoModal}
            className="group relative col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-3 lg:row-span-2 rounded-2xl overflow-hidden bg-slate-950 border border-rose-500/30 cursor-pointer shadow-2xl hover:border-rose-400/80 hover:shadow-rose-900/30 transition-all duration-500 flex flex-col justify-between min-h-[380px] lg:min-h-[400px]"
          >
            {/* Live Playing YouTube Video Iframe inside card */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <iframe
                id="stanns-yt-preview-iframe"
                className="w-full h-full scale-[1.35] origin-center"
                src="https://www.youtube.com/embed/2E7IGyhdQeg?autoplay=1&mute=1&loop=1&playlist=2E7IGyhdQeg&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1"
                title="St. Ann's College for Women Campus Tour Video Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>

            {/* Subtle Gradient Overlays for crystal clear text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/40 pointer-events-none" />
            <div className="absolute inset-0 bg-rose-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Top Bar with Badge (No 'Click to Pop Up' badge) */}
            <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-600/90 text-white backdrop-blur-md shadow-md border border-rose-400/30">
                <Video className="h-3.5 w-3.5" />
                <span>Campus Tour</span>
              </span>
            </div>

            {/* Center Area: Clean, video is visibly playing smoothly without buttons */}
            <div className="relative z-10 my-auto pointer-events-none" />

            {/* Bottom Title & Description Overlay */}
            <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent border-t border-white/10 pointer-events-none">
              <h3 className="font-outfit text-base sm:text-lg font-black text-white leading-tight line-clamp-2 drop-shadow-sm group-hover:text-rose-200 transition-colors">
                St. Ann&apos;s College for Women, Gorantla | Institutional Campus Tour
              </h3>
              <p className="text-xs text-slate-300 font-medium mt-1 line-clamp-1">
                Quality Education, Infrastructure &amp; Campus Life
              </p>
            </div>
          </div>

          {/* Remaining Photo Gallery Images */}
          {displayImages.map((img, idx) => (
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

      {/* Video Player Lightbox / Popup Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 sm:p-6 md:p-10 select-none animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseVideoModal();
          }}
        >
          {/* Close button */}
          <button
            onClick={handleCloseVideoModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 shadow-lg"
            aria-label="Close Video"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex flex-col items-center w-full max-w-5xl">
            {/* 16:9 Video Frame */}
            <div className="w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black border border-white/20 bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/2E7IGyhdQeg?autoplay=1&start=${startSecond}&si=fZWEqHKVbRpS6iaH&rel=0`}
                title="St. Ann's College for Women Campus Tour Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Video Details & Direct YouTube Link */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 px-2">
              <div>
                <h3 className="font-outfit text-base sm:text-lg font-bold text-white leading-snug">
                  St. Ann&apos;s College for Women, Gorantla | Institutional Campus Tour
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  Official Institutional Video • St. Ann&apos;s College for Women, Guntur
                </p>
              </div>
              <a
                href="https://youtu.be/2E7IGyhdQeg?si=jS6iLt1Qrg47NRsS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Photos */}
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
              {lightboxIndex + 1} of {displayImages.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

