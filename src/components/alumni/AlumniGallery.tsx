"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getAlumniGallery } from "@/lib/sanity";
import {
  Folder,
  Image as ImageIcon,
  ArrowLeft,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Grid
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// High-quality mock data using Unsplash to display instantly if Sanity is empty or migrating
const MOCK_GALLERIES = [
  {
    _id: "mock-2020",
    folderName: "2020 Alumni",
    slug: "2020-alumni",
    order: 1,
    images: [
      { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200", caption: "2020 Alumni - Graduation Ceremony Cap Toss" },
      { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200", caption: "2020 Alumni - Batchmates Reunion at Campus Lawn" },
      { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200", caption: "2020 Alumni - Interactive Q&A Session" },
      { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200", caption: "2020 Alumni - Group Photo with Faculty" }
    ]
  },
  {
    _id: "mock-2022",
    folderName: "2022 Alumni",
    slug: "2022-alumni",
    order: 2,
    images: [
      { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200", caption: "2022 Alumni - Main Stage Celebrations" },
      { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200", caption: "2022 Alumni - Receiving Honours & Degrees" },
      { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200", caption: "2022 Alumni - Joyful Smiles after Convocation" }
    ]
  },
  {
    _id: "mock-2023",
    folderName: "2023 Alumni",
    slug: "2023-alumni",
    order: 3,
    images: [
      { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200", caption: "2023 Alumni - Alumni Panel Discussion" },
      { url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200", caption: "2023 Alumni - Presentation by Distinguished Alumna" },
      { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200", caption: "2023 Alumni - Networking Lunch" }
    ]
  },
  {
    _id: "mock-2026",
    folderName: "2026 Alumni",
    slug: "2026-alumni",
    order: 4,
    images: [
      { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200", caption: "2026 Alumni - Prefect Group & Organizing Committee" },
      { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200", caption: "2026 Alumni - Farewell Cake Cutting" }
    ]
  },
  {
    _id: "mock-bcom",
    folderName: "B.Com Alumni 2024",
    slug: "bcom-alumni-2024",
    order: 5,
    images: [
      { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200", caption: "B.Com Alumni 2024 - Professional Skills Seminar" },
      { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200", caption: "B.Com Alumni 2024 - Group Snapshot on the Lawn" }
    ]
  },
  {
    _id: "mock-2008",
    folderName: "Batch 2008 Alumni 2025",
    slug: "batch-2008-alumni-2025",
    order: 6,
    images: [
      { url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200", caption: "Batch 2008 Alumni 2025 - Decennial Reunion Celebrations" },
      { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200", caption: "Batch 2008 Alumni 2025 - Commemorative Shield Distribution" }
    ]
  },
  {
    _id: "mock-bca",
    folderName: "BCA 1998-2001",
    slug: "bca-1998-2001",
    order: 7,
    images: [
      { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200", caption: "BCA 1998-2001 - Computer Science Batch Reunion" },
      { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200", caption: "BCA 1998-2001 - Legacy Batch Group Picture" }
    ]
  }
];

export const AlumniGallery = () => {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const sanityData = await getAlumniGallery();
        // Filter out empty galleries in sanity or verify structure
        const activeGalleries = sanityData.filter((g: any) => g.images && g.images.length > 0);

        if (activeGalleries.length > 0) {
          setGalleries(activeGalleries);
        } else {
          console.log("No dynamic galleries found in Sanity. Using rich mock data.");
          setGalleries(MOCK_GALLERIES);
        }
      } catch (err) {
        console.error("Failed to load alumni gallery, using mock data:", err);
        setGalleries(MOCK_GALLERIES);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activeFolder = galleries.find((g) => g.slug === activeSlug);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null || !activeFolder) return;
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < activeFolder.images.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : activeFolder.images.length - 1
        );
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    },
    [lightboxIndex, activeFolder]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && activeFolder) {
      setLightboxIndex((lightboxIndex + 1) % activeFolder.images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && activeFolder) {
      setLightboxIndex(
        (lightboxIndex - 1 + activeFolder.images.length) % activeFolder.images.length
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
        <p className="text-slate-500 font-medium text-sm animate-pulse">Loading Alumni Galleries...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!activeSlug ? (
          /* ============================================================== */
          /* 1. FOLDER SELECTION GRID                                       */
          /* ============================================================== */
          <motion.div
            key="folders-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-outfit font-black text-[#002147] tracking-tight">
                  Alumni Memories Gallery
                </h2>
                <p className="text-slate-500 text-sm md:text-base mt-2 max-w-2xl font-medium">
                  Browse and explore captures from our annual alumni meets, milestone reunions, and cohort celebrations organized by folder.
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
              </div>
            </div>

            {/* Folder Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((folder, idx) => {
                const coverPhoto = folder.images?.[0]?.url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800";
                const photoCount = folder.images?.length || 0;

                return (
                  <motion.div
                    key={folder._id || folder.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => setActiveSlug(folder.slug)}
                    className="group cursor-pointer bg-white border border-slate-200/80 rounded-3xl p-4 shadow-xs hover:shadow-lg hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden flex flex-col gap-4"
                  >
                    {/* Cover Image Frame */}
                    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative group-hover:shadow-md transition-shadow duration-300">
                      <img
                        src={coverPhoto}
                        alt={folder.folderName}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Photo Count Tag */}
                      <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white rounded-full text-xs font-bold font-sans tracking-wide">
                        <ImageIcon className="h-3.5 w-3.5 text-emerald-400" />
                        {photoCount} {photoCount === 1 ? "Photo" : "Photos"}
                      </span>
                    </div>

                    {/* Folder Info */}
                    <div className="flex flex-col gap-1 px-1.5">
                      <h3 className="font-outfit font-black text-lg text-[#002147] group-hover:text-emerald-600 transition-colors">
                        {folder.folderName}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ============================================================== */
          /* 2. SPECIFIC FOLDER IMAGE GRID                                  */
          /* ============================================================== */
          <motion.div
            key="images-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Folder Header */}
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6">
              <button
                onClick={() => setActiveSlug(null)}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#002147] hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 px-4 py-2.5 rounded-full border border-slate-150 transition-all w-fit cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Galleries
              </button>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                <div>
                  <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-emerald-600 font-sans">
                    <Folder className="h-4 w-4 text-amber-500 fill-amber-400" />
                    <span>Alumni Album</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-outfit font-black text-[#002147] tracking-tight mt-1">
                    {activeFolder?.folderName}
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-[#002147]/5 px-4 py-2.5 rounded-2xl border border-[#002147]/10 text-[#002147] text-xs font-bold">
                  <Grid className="h-4 w-4 text-emerald-600" />
                  Total of {activeFolder?.images?.length || 0} Images
                </div>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {activeFolder?.images?.map((img: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative cursor-pointer aspect-[4/3] bg-slate-50 border border-slate-200/70 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-500/30 transition-all duration-300"
                >
                  <img
                    src={img.url}
                    alt={img.caption || `Photo ${idx + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Glassmorphic hover overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#002147] shadow-lg flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110">
                      <ZoomIn className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>

                  {/* Caption bar at the bottom */}
                  {img.caption && (
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-xs font-semibold leading-relaxed truncate">
                        {img.caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==============================================================
          3. LIGHTBOX MODAL DIALOG
          ============================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && activeFolder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center"
          >
            {/* Top Toolbar */}
            <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between text-white z-10">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                {activeFolder.folderName} &nbsp;|&nbsp;&nbsp;
                <span className="text-emerald-400">{lightboxIndex + 1} of {activeFolder.images.length}</span>
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center border border-white/10 hover:scale-105 transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/15 flex items-center justify-center hover:scale-105 transition-all z-10 cursor-pointer hidden md:flex"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Image Container with framer motion slide effect */}
            <div className="w-full max-w-5xl px-4 md:px-16 aspect-[4/3] max-h-[70vh] flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={activeFolder.images[lightboxIndex].url}
                  alt={activeFolder.images[lightboxIndex].caption || "Lightbox View"}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-full max-h-[70vh] rounded-3xl object-contain shadow-2xl border border-white/10 bg-black/40"
                />
              </AnimatePresence>
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/15 flex items-center justify-center hover:scale-105 transition-all z-10 cursor-pointer hidden md:flex"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Bottom Caption Bar */}
            <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col items-center justify-center text-center bg-gradient-to-t from-black/85 via-black/40 to-transparent">
              <p className="text-white text-base md:text-lg font-outfit font-bold max-w-3xl drop-shadow-md">
                {activeFolder.images[lightboxIndex].caption || `${activeFolder.folderName} - Image ${lightboxIndex + 1}`}
              </p>

              {/* Mobile Arrow Controls */}
              <div className="flex md:hidden items-center gap-6 mt-6">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 bg-white/10 rounded-full border border-white/10 flex items-center justify-center text-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 bg-white/10 rounded-full border border-white/10 flex items-center justify-center text-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
