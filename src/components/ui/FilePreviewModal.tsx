"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  X, 
  ExternalLink, 
  Download, 
  ArrowLeft, 
  ArrowRight, 
  Loader2, 
  ZoomIn, 
  ZoomOut, 
  BookOpen,
  FileText
} from "lucide-react";
import { getCleanPdfUrl } from "@/lib/pdf-viewer";

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  title: string;
}

export function FilePreviewModal({ isOpen, onClose, fileUrl, title }: FilePreviewModalProps) {
  const isPdf = fileUrl ? fileUrl.toLowerCase().includes(".pdf") : false;
  // Default view is standard native browser PDF view
  const [viewMode, setViewMode] = useState<"standard" | "flipbook">("standard");

  // Flipbook state (lazily initialized when user switches to flipbook mode)
  const [renderedPages, setRenderedPages] = useState<string[]>([]);
  const [loadingPages, setLoadingPages] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 600 });

  // Zoom & Pan state for Flipbook & Image modes
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Compute clean PDF URL with proper filename
  const cleanPdfUrl = React.useMemo(() => {
    return getCleanPdfUrl(fileUrl, title);
  }, [fileUrl, title]);

  // Handle window resizing
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset viewMode to "standard" whenever a new file is opened
  useEffect(() => {
    if (isOpen) {
      setViewMode("standard");
      setCurrentPage(0);
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [isOpen, fileUrl]);

  // Handle keyboard shortcuts (Escape to close, Arrows for flipbook)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (viewMode === "flipbook") {
        if (e.key === "ArrowLeft") {
          setCurrentPage((prev) => Math.max(0, prev - 1));
        } else if (e.key === "ArrowRight") {
          setCurrentPage((prev) => prev + 1);
        } else if (e.key === "+" || e.key === "=") {
          setZoom((prev) => Math.min(3, +(prev + 0.25).toFixed(2)));
        } else if (e.key === "-") {
          setZoom((prev) => {
            const next = Math.max(1, +(prev - 0.25).toFixed(2));
            if (next === 1) setPanOffset({ x: 0, y: 0 });
            return next;
          });
        } else if (e.key === "0" || e.key.toLowerCase() === "r") {
          setZoom(1);
          setPanOffset({ x: 0, y: 0 });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, viewMode]);

  // Load flipbook pages only when flipbook mode is active and pages not yet cached
  useEffect(() => {
    if (!isOpen || !fileUrl || !isPdf || viewMode !== "flipbook") {
      return;
    }

    if (renderedPages.length > 0) {
      return; // Already prepared
    }

    let isMounted = true;
    setLoadingPages(true);
    setRenderedPages([]);
    setCurrentPage(0);
    setPageSize({ width: 0, height: 0 });
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
    setLoadingProgress("Initializing flipbook...");

    async function convertPdf() {
      try {
        const pdfjsLib = await new Promise<any>((resolve, reject) => {
          if ((window as any).pdfjsLib) {
            resolve((window as any).pdfjsLib);
            return;
          }
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.onload = () => {
            (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            resolve((window as any).pdfjsLib);
          };
          script.onerror = () => reject(new Error("Failed to load PDF reader engine"));
          document.body.appendChild(script);
        });

        if (!isMounted) return;
        setLoadingProgress("Loading document content...");

        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;

        if (!isMounted) return;
        const total = pdf.numPages;
        const images: string[] = [];

        for (let i = 1; i <= total; i++) {
          if (!isMounted) return;
          setLoadingProgress(`Preparing page ${i} of ${total}...`);

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.85 });
          
          if (i === 1 && isMounted) {
            setPageSize({ width: viewport.width, height: viewport.height });
          }

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) throw new Error("Canvas context initialization failed");

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          images.push(canvas.toDataURL("image/jpeg", 0.88));
        }

        if (isMounted) {
          setRenderedPages(images);
        }
      } catch (err) {
        console.error("Flipbook rendering error, falling back to standard view:", err);
        if (isMounted) {
          setViewMode("standard");
        }
      } finally {
        if (isMounted) {
          setLoadingPages(false);
        }
      }
    }

    convertPdf();

    return () => {
      isMounted = false;
    };
  }, [isOpen, fileUrl, isPdf, viewMode, renderedPages.length]);

  // Flipbook sheet parameters
  const totalPages = renderedPages.length;
  const numSheets = totalPages > 0 ? Math.ceil((totalPages - 1) / 2) + 1 : 0;

  const handleNext = () => {
    if (currentPage < numSheets - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Flipbook dimensions
  const pageRatio = pageSize.width > 0 ? pageSize.width / pageSize.height : 0.707;
  const maxW = Math.max(360, windowSize.width * 0.94);
  const maxH = Math.max(300, (windowSize.height - 130) * 0.90);

  let bookHeight = Math.min(maxH, 800);
  let bookWidth = bookHeight * 2 * pageRatio;

  if (bookWidth > maxW) {
    bookWidth = maxW;
    bookHeight = bookWidth / (2 * pageRatio);
  }
  if (bookHeight > maxH) {
    bookHeight = maxH;
    bookWidth = bookHeight * 2 * pageRatio;
  }

  // Pan limits
  const calculatePanLimits = (viewportWidth: number, viewportHeight: number) => {
    const isCover = currentPage === 0;
    const contentWidth = (isCover ? (bookWidth / 2) : bookWidth) * zoom;
    const contentHeight = bookHeight * zoom;

    const overflowX = Math.max(0, (contentWidth - viewportWidth) / 2);
    const overflowY = Math.max(0, (contentHeight - viewportHeight) / 2);

    const margin = 40;
    const limitX = overflowX > 0 ? (overflowX + margin) : 0;
    const limitY = overflowY > 0 ? (overflowY + margin) : 0;

    return { limitX, limitY };
  };

  const updatePanFromMouse = (clientX: number, clientY: number) => {
    if (!containerRef.current || !isDragging || !dragStartRef.current || !panStartRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const { limitX, limitY } = calculatePanLimits(rect.width, rect.height);

    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      setHasDragged(true);
    }
    const rawX = panStartRef.current.x + dx;
    const rawY = panStartRef.current.y + dy;

    setPanOffset({
      x: Math.max(-limitX, Math.min(limitX, rawX)),
      y: Math.max(-limitY, Math.min(limitY, rawY)),
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    if ((e.target as HTMLElement).closest("button, a")) return;

    setIsDragging(true);
    setHasDragged(false);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { x: panOffset.x, y: panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePanFromMouse(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (hasDragged) {
      setTimeout(() => setHasDragged(false), 120);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] w-screen h-screen bg-slate-950 flex flex-col animate-fadeIn select-none font-sans">
      {/* ========================================================= */}
      {/* 1. DEFAULT STANDARD PDF VIEW (100% Full-Screen Iframe)    */}
      {/* ========================================================= */}
      {isPdf && viewMode === "standard" && (
        <div className="relative w-full h-full flex flex-col bg-slate-950 overflow-hidden">
          {/* Native Browser PDF Iframe with Clean Sanitized Filename Header */}
          <iframe
            src={`${cleanPdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
            className="w-full h-full border-none bg-slate-900"
            title={title}
          />

          {/* Floating Action Controls on Bottom Right */}
          <div className="absolute bottom-5 right-6 z-50 flex items-center gap-2.5">
            {/* Flipbook View Toggle Button */}
            <button
              type="button"
              onClick={() => setViewMode("flipbook")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-2xl backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 cursor-pointer group"
              title="Switch to Interactive 3D Flipbook Reader"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-300 group-hover:text-white" />
              <span>Flipbook View</span>
            </button>

            {/* New Tab Button */}
            <a
              href={cleanPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-[#002147] text-white text-xs font-bold transition-all shadow-2xl backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
              title="Open PDF in new browser tab"
            >
              <ExternalLink className="h-3.5 w-3.5 text-sky-300" />
              <span className="hidden sm:inline">New Tab</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/90 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-2xl backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 cursor-pointer group"
              aria-label="Close PDF Viewer"
              title="Close (Esc)"
            >
              <X className="h-4 w-4 text-slate-300 group-hover:text-white" />
              <span>Close</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. INTERACTIVE FLIPBOOK VIEW (When User Clicks Flipbook) */}
      {/* ========================================================= */}
      {isPdf && viewMode === "flipbook" && (
        <div className="relative w-full h-full flex flex-col bg-[#11161d] overflow-hidden">
          {/* Flipbook Header */}
          <div className="bg-[#0b0f13] px-5 py-3 text-white flex items-center justify-between border-b border-slate-800 shrink-0 z-30">
            <div className="flex flex-col min-w-0 flex-1 mr-3">
              <h4 className="font-outfit text-xs md:text-sm font-bold tracking-tight leading-tight select-none uppercase truncate text-white">
                {title}
              </h4>
              <span className="font-sans text-[10px] text-slate-400 font-semibold tracking-wide select-none truncate">
                St. Ann&apos;s College for Women • Interactive 3D Flipbook Reader
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("standard")}
                className="flex h-8 px-3 items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs border border-indigo-500"
                title="Switch back to Standard Browser PDF Viewer"
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Standard PDF View</span>
              </button>
              <a
                href={cleanPdfUrl}
                download
                className="flex h-8 px-3 items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/10"
                title="Download PDF"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download</span>
              </a>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
                title="Close (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Flipbook Canvas Area */}
          <div className="flex-1 bg-[#141920] p-0 flex flex-col items-center justify-center overflow-hidden relative">
            {loadingPages ? (
              <div className="absolute inset-0 bg-[#141920] flex flex-col items-center justify-center gap-4 z-50 text-white animate-fadeIn">
                <Loader2 className="h-10 w-10 text-indigo-400 animate-spin" />
                <div className="flex flex-col items-center gap-1">
                  <span className="font-outfit text-sm font-bold tracking-wider uppercase text-slate-300">
                    Preparing Interactive Flipbook
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{loadingProgress}</span>
                </div>
              </div>
            ) : totalPages > 0 ? (
              <div
                ref={containerRef}
                className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${
                  zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                {/* Previous Page Arrow */}
                {currentPage > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 flex items-center justify-center shadow-2xl transition-all active:scale-95 hover:scale-110 cursor-pointer"
                    title="Previous Page (Left Arrow)"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}

                {/* Next Page Arrow */}
                {currentPage < numSheets - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 flex items-center justify-center shadow-2xl transition-all active:scale-95 hover:scale-110 cursor-pointer"
                    title="Next Page (Right Arrow)"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}

                {/* Zoom & Pan Transform Layer */}
                <div
                  className="flex items-center justify-center will-change-transform"
                  style={{
                    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                    transformOrigin: "center center",
                    transition: isDragging ? "none" : "transform 0.14s ease-out",
                  }}
                >
                  <div
                    className="relative flex items-center justify-center transition-all duration-300"
                    style={{
                      perspective: "2000px",
                      width: `${bookWidth}px`,
                      height: `${bookHeight}px`,
                    }}
                  >
                    {/* Shadow under book */}
                    <div className="absolute inset-0 bg-black/50 blur-2xl rounded-full scale-95 pointer-events-none translate-y-6" />

                    {/* Book Wrapper */}
                    <div
                      className="relative w-full h-full transition-transform duration-700 ease-out"
                      style={{
                        transformStyle: "preserve-3d",
                        transform:
                          currentPage === 0
                            ? "translateX(-25%)"
                            : currentPage === numSheets - 1 && currentPage * 2 >= totalPages
                            ? "translateX(25%)"
                            : "translateX(0)",
                      }}
                    >
                      {Array.from({ length: numSheets }).map((_, sheetIdx) => {
                        const isFlipped = sheetIdx < currentPage;
                        const zIndex = isFlipped ? sheetIdx : numSheets - sheetIdx;
                        const frontPageIdx = sheetIdx * 2;
                        const backPageIdx = sheetIdx * 2 + 1;

                        return (
                          <div
                            key={sheetIdx}
                            className="absolute top-0 right-0 w-1/2 h-full origin-left transition-transform duration-[850ms] cubic-bezier(0.25, 1, 0.5, 1) cursor-pointer select-none"
                            style={{
                              transformStyle: "preserve-3d",
                              zIndex: zIndex,
                              transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                            }}
                            onClick={() => {
                              if (hasDragged || zoom > 1) return;
                              if (isFlipped) {
                                setCurrentPage(sheetIdx);
                              } else {
                                setCurrentPage(sheetIdx + 1);
                              }
                            }}
                          >
                            {/* Front of sheet */}
                            <div
                              className={`absolute inset-0 w-full h-full select-none flex items-center justify-center transition-all ${
                                frontPageIdx < totalPages
                                  ? "bg-white shadow-md rounded-r-2xl border border-slate-200/45 overflow-hidden"
                                  : "bg-transparent pointer-events-none border-none shadow-none"
                              }`}
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "translateZ(1px)",
                              }}
                            >
                              {frontPageIdx < totalPages ? (
                                <div className="relative w-full h-full">
                                  <img
                                    src={renderedPages[frontPageIdx]}
                                    alt={`Page ${frontPageIdx + 1}`}
                                    className="w-full h-full object-fill pointer-events-none bg-white p-0"
                                  />
                                  {frontPageIdx > 0 && (
                                    <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none" />
                                  )}
                                </div>
                              ) : null}
                            </div>

                            {/* Back of sheet */}
                            <div
                              className={`absolute inset-0 w-full h-full select-none flex items-center justify-center transition-all ${
                                backPageIdx < totalPages
                                  ? "bg-white shadow-md rounded-l-2xl border border-slate-200/45 overflow-hidden"
                                  : "bg-transparent pointer-events-none border-none shadow-none"
                              }`}
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(180deg) translateZ(1px)",
                              }}
                            >
                              {backPageIdx < totalPages ? (
                                <div className="relative w-full h-full">
                                  <img
                                    src={renderedPages[backPageIdx]}
                                    alt={`Page ${backPageIdx + 1}`}
                                    className="w-full h-full object-fill pointer-events-none bg-white p-0"
                                  />
                                  <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none" />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Flipbook Footer Toolbar */}
          <div className="bg-[#0b0f13] px-4 sm:px-6 py-2.5 text-white flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 shrink-0 z-30 shadow-2xl">
            {/* Page Navigator */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/40 disabled:text-slate-600 text-white border border-white/10 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                title="Previous Page (Left Arrow)"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs font-bold text-slate-300 tracking-wider px-1.5 whitespace-nowrap min-w-[75px] text-center">
                {totalPages > 0
                  ? (currentPage === 0 ? "Cover (1)" : `${currentPage * 2} - ${Math.min(currentPage * 2 + 1, totalPages)}`) +
                    ` / ${totalPages}`
                  : "Page 1 of 1"}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === numSheets - 1}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/40 disabled:text-slate-600 text-white border border-white/10 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                title="Next Page (Right Arrow)"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((prev) => Math.max(1, +(prev - 0.25).toFixed(2)))}
                disabled={zoom <= 1}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/40 disabled:text-slate-600 text-white border border-white/10 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                title="Zoom Out (-)"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs font-mono font-bold text-indigo-300 px-1">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((prev) => Math.min(3, +(prev + 0.25).toFixed(2)))}
                disabled={zoom >= 3}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/40 disabled:text-slate-600 text-white border border-white/10 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                title="Zoom In (+)"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Switch to Standard PDF button */}
            <button
              type="button"
              onClick={() => setViewMode("standard")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all border border-indigo-500 shadow-xs cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Standard View</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. IMAGE PREVIEW (For Non-PDF Documents & Posters)        */}
      {/* ========================================================= */}
      {!isPdf && (
        <div className="relative w-full h-full flex flex-col bg-slate-950 overflow-hidden">
          <div className="flex-1 w-full h-full p-4 flex items-center justify-center overflow-hidden relative">
            <img
              src={fileUrl}
              alt={title}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-slate-800 bg-white"
            />
          </div>

          {/* Floating Action Controls on Bottom Right */}
          <div className="absolute bottom-5 right-6 z-50 flex items-center gap-2.5">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-[#002147] text-white text-xs font-bold transition-all shadow-2xl backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
              title="Open Image in new browser tab"
            >
              <ExternalLink className="h-3.5 w-3.5 text-sky-300" />
              <span className="hidden sm:inline">New Tab</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/90 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-2xl backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 cursor-pointer group"
              aria-label="Close Preview"
              title="Close (Esc)"
            >
              <X className="h-4 w-4 text-slate-300 group-hover:text-white" />
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
