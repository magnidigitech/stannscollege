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
  RotateCcw,
  Hand
} from "lucide-react";

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  title: string;
}

export function FilePreviewModal({ isOpen, onClose, fileUrl, title }: FilePreviewModalProps) {
  const isPdf = fileUrl ? fileUrl.toLowerCase().includes(".pdf") : false;
  const [renderedPages, setRenderedPages] = useState<string[]>([]);
  const [loadingPages, setLoadingPages] = useState(isOpen && isPdf);
  const [loadingProgress, setLoadingProgress] = useState(isOpen && isPdf ? "Initializing flipbook..." : "");
  const [useFallback, setUseFallback] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 600 });

  // Zoom & Pan state
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle window resizing for responsive dimensions
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when open
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

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
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
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Recenter pan whenever the current page changes
  useEffect(() => {
    setPanOffset({ x: 0, y: 0 });
  }, [currentPage]);

  // Non-passive wheel listener for smooth wheel zooming
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isOpen) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        setZoom((prev) => Math.min(3, +(prev + 0.25).toFixed(2)));
      } else if (e.deltaY > 0) {
        setZoom((prev) => {
          const next = Math.max(1, +(prev - 0.25).toFixed(2));
          if (next === 1) {
            setPanOffset({ x: 0, y: 0 });
          }
          return next;
        });
      }
    };

    container.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheelNative);
    };
  }, [isOpen]);

  // Load and render PDF pages when fileUrl/isOpen changes
  useEffect(() => {
    if (!isOpen || !fileUrl) {
      setRenderedPages([]);
      setLoadingPages(false);
      setLoadingProgress("");
      setUseFallback(false);
      setCurrentPage(0);
      setPageSize({ width: 0, height: 0 });
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
      return;
    }

    const isPdfFile = fileUrl.toLowerCase().includes(".pdf");
    if (!isPdfFile) {
      setLoadingPages(false);
      setUseFallback(false);
      setRenderedPages([]);
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
      return;
    }

    let isMounted = true;
    setLoadingPages(true);
    setUseFallback(false);
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
          script.onerror = () => reject(new Error("Failed to load PDF reader scripts"));
          document.body.appendChild(script);
        });

        if (!isMounted) return;
        setLoadingProgress("Loading document content...");

        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;

        if (!isMounted) return;
        const total = pdf.numPages;
        const images: string[] = [];

        // High-quality rendering scale for crisp zoomed text
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
        console.error("Flipbook preparation failed:", err);
        if (isMounted) {
          setUseFallback(true);
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
  }, [isOpen, fileUrl]);

  if (!isOpen) return null;

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

  // Dimensions for the book spread inside the available viewport area (accounting for pinned header & footer)
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

  // --- Exact Mathematical Pan Calculation ---
  // Calculates the precise pan limits required to bring any edge of the document fully into view
  const calculatePanLimits = (viewportWidth: number, viewportHeight: number) => {
    const isCover = currentPage === 0;
    // Cover page is 1 page wide (bookWidth / 2); two-page spread is bookWidth
    const contentWidth = (isCover ? (bookWidth / 2) : bookWidth) * zoom;
    const contentHeight = bookHeight * zoom;

    const overflowX = Math.max(0, (contentWidth - viewportWidth) / 2);
    const overflowY = Math.max(0, (contentHeight - viewportHeight) / 2);

    // 40px margin buffer so the page edge and margin comfortably frame inside the viewport
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

  // Global mousemove and mouseup listeners for seamless edge-to-edge drag tracking
  useEffect(() => {
    if (!isOpen || zoom <= 1 || !isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      updatePanFromMouse(e.clientX, e.clientY);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      if (hasDragged) {
        setTimeout(() => setHasDragged(false), 120);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isOpen, zoom, isDragging, hasDragged, bookWidth, bookHeight, currentPage]);

  const handleMouseUp = () => {
    setIsDragging(false);
    if (hasDragged) {
      setTimeout(() => setHasDragged(false), 120);
    }
  };

  const handleMouseLeave = () => {
    // Window-level tracking continues smooth tracking
  };

  // Touch pan support for tablets and mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panStartRef.current = { x: panOffset.x, y: panOffset.y };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { limitX, limitY } = calculatePanLimits(rect.width, rect.height);
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      const rawX = panStartRef.current.x + dx;
      const rawY = panStartRef.current.y + dy;
      setPanOffset({
        x: Math.max(-limitX, Math.min(limitX, rawX)),
        y: Math.max(-limitY, Math.min(limitY, rawY)),
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Double-click to toggle zoom
  const handleDoubleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    if (zoom === 1) {
      setZoom(1.75);
    } else {
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(3, +(prev + 0.25).toFixed(2)));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(1, +(prev - 0.25).toFixed(2));
      if (next === 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleCycleZoom = () => {
    if (zoom === 1) setZoom(1.5);
    else if (zoom === 1.5) setZoom(2);
    else if (zoom === 2) setZoom(2.5);
    else {
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close container */}
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>
      
      {/* Modal Box */}
      <div className="relative w-[98vw] h-[96vh] bg-[#1a1f26] rounded-2xl md:rounded-[2.5rem] shadow-2xl border border-slate-700/40 overflow-hidden flex flex-col z-[210] animate-scaleUp">
        
        {/* ========================================================= */}
        {/* 1. TOP HEADER (PERMANENTLY PINNED AT TOP)                 */}
        {/* ========================================================= */}
        <div className="bg-[#0b0f13] px-5 py-3.5 text-white flex items-center justify-between border-b border-slate-800 shrink-0 z-30">
          <div className="flex flex-col min-w-0 flex-1 mr-3">
            <h4 className="font-outfit text-xs md:text-sm lg:text-base font-black tracking-tight leading-tight select-none uppercase truncate text-white">
              {title}
            </h4>
            <span className="font-sans text-[9px] md:text-xs text-slate-400 font-semibold tracking-wide select-none truncate">
              St. Ann&apos;s College for Women • Interactive Reader
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={fileUrl}
              download
              className="flex h-9 px-3 items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 duration-200 text-xs font-bold font-sans"
              title="Download File"
            >
              <Download className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 px-2.5 sm:px-3 items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 duration-200 text-xs font-bold font-sans whitespace-nowrap"
              title="Standard PDF View (Opens document in new tab)"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Standard PDF View</span>
              <span className="sm:hidden">Standard PDF</span>
            </a>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 duration-200"
              title="Close viewer"
            >
              <X className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. VIEWER VIEWPORT (MIDDLE - EXPANDS TO FILL REMAINING)   */}
        {/* ========================================================= */}
        <div className="flex-1 bg-[#181c22] p-0 flex flex-col items-center justify-center overflow-hidden relative">
          
          {/* Render PDF using Flipbook style layout */}
          {loadingPages ? (
            <div className="absolute inset-0 bg-[#181c22] flex flex-col items-center justify-center gap-4 z-50 text-white animate-fadeIn">
              <Loader2 className="h-10 w-10 text-indigo-400 animate-spin" />
              <div className="flex flex-col items-center gap-1">
                <span className="font-outfit text-sm font-bold tracking-wider uppercase text-slate-300">Rendering Animation</span>
                <span className="text-xs text-slate-400 font-semibold">{loadingProgress}</span>
                <span className="text-[10px] font-black uppercase text-indigo-400/85 tracking-widest mt-2.5 animate-pulse">Powered by Magni Digitech</span>
              </div>
            </div>
          ) : isPdf && !useFallback && totalPages > 0 ? (
            <div 
              ref={containerRef}
              className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${
                zoom > 1 
                  ? isDragging ? "cursor-grabbing" : "cursor-grab"
                  : "cursor-default"
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={handleDoubleClick}
            >
              {/* Floating Side Arrow: Previous Page */}
              {currentPage > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/15 flex items-center justify-center shadow-2xl transition-all active:scale-95 hover:scale-110 cursor-pointer"
                  title="Previous Page (Left Arrow)"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}

              {/* Floating Side Arrow: Next Page */}
              {currentPage < numSheets - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/15 flex items-center justify-center shadow-2xl transition-all active:scale-95 hover:scale-110 cursor-pointer"
                  title="Next Page (Right Arrow)"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}

              {/* Interactive Zoom & Pan Transform Layer */}
              <div 
                className="flex items-center justify-center will-change-transform"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.14s ease-out",
                }}
              >
                {/* Perspective book container */}
                <div 
                  className="relative flex items-center justify-center transition-all duration-300"
                  style={{ 
                    perspective: "2000px", 
                    width: `${bookWidth}px`, 
                    height: `${bookHeight}px` 
                  }}
                >
                  {/* Underlay depth Shadow */}
                  <div className="absolute inset-0 bg-black/40 blur-2xl rounded-full scale-95 pointer-events-none translate-y-6"></div>

                  {/* Book Wrapper */}
                  <div 
                    className="relative w-full h-full transition-transform duration-700 ease-out"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: currentPage === 0 
                        ? "translateX(-25%)" 
                        : (currentPage === numSheets - 1 && currentPage * 2 >= totalPages)
                          ? "translateX(25%)" 
                          : "translateX(0)"
                    }}
                  >
                    {/* Sheets */}
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
                              transform: "translateZ(1px)"
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
                                  <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none"></div>
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
                              transform: "rotateY(180deg) translateZ(1px)" 
                            }}
                          >
                            {backPageIdx < totalPages ? (
                              <div className="relative w-full h-full">
                                <img 
                                  src={renderedPages[backPageIdx]} 
                                  alt={`Page ${backPageIdx + 1}`} 
                                  className="w-full h-full object-fill pointer-events-none bg-white p-0"
                                />
                                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none"></div>
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
          ) : isPdf && useFallback && !loadingPages ? (
            // Fallback Iframe viewer
            <iframe
              src={`${fileUrl}#toolbar=1`}
              className="w-full h-full border-none bg-white"
              title={title}
            />
          ) : !isPdf ? (
            // Standard Image viewer with zoom and pan
            <div 
              ref={containerRef}
              className={`w-full h-full p-4 flex items-center justify-center overflow-hidden select-none relative ${
                zoom > 1 
                  ? isDragging ? "cursor-grabbing" : "cursor-grab"
                  : "cursor-default"
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={handleDoubleClick}
            >
              <div
                className="max-w-full max-h-full flex items-center justify-center will-change-transform"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.14s ease-out",
                }}
              >
                <img
                  src={fileUrl}
                  alt={title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-sm border border-slate-800 bg-white"
                />
              </div>
            </div>
          ) : (
            // Spinner while loading
            <div className="text-slate-400 text-xs font-semibold flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span>Loading Reader...</span>
            </div>
          )}

        </div>

        {/* ========================================================= */}
        {/* 3. OPTIONS BAR (PERMANENTLY PINNED AT THE BOTTOM)         */}
        {/* ========================================================= */}
        <div className="bg-[#0b0f13] px-3 sm:px-6 py-2.5 text-white flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 shrink-0 z-30 shadow-2xl font-sans">
          
          {/* Left: Page Navigator */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/40 disabled:text-slate-600 text-white backdrop-blur border border-white/10 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              title="Previous Page (Left Arrow)"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <span className="text-[11px] md:text-xs font-bold text-slate-300 tracking-wider px-1.5 whitespace-nowrap min-w-[75px] text-center">
              {totalPages > 0 
                ? (currentPage === 0 ? "Cover (1)" : `${currentPage * 2} - ${Math.min(currentPage * 2 + 1, totalPages)}`) + ` / ${totalPages}`
                : "Page 1 of 1"
              }
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === numSheets - 1}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/40 disabled:text-slate-600 text-white backdrop-blur border border-white/10 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              title="Next Page (Right Arrow)"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Center: Zoom Controls */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/40 disabled:text-slate-600 text-white backdrop-blur border border-white/10 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              title="Zoom Out (-)"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            
            <button
              onClick={handleCycleZoom}
              className="px-2.5 h-8 flex items-center justify-center rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold tracking-tight transition-all active:scale-95 cursor-pointer"
              title="Click to cycle zoom (100% -> 150% -> 200% -> 250% -> 100%)"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/40 disabled:text-slate-600 text-white backdrop-blur border border-white/10 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              title="Zoom In (+)"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleResetZoom}
              disabled={zoom === 1 && panOffset.x === 0 && panOffset.y === 0}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/40 disabled:text-slate-600 text-white backdrop-blur border border-white/10 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              title="Reset Zoom & Pan (0 / R)"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Right: Drag to Pan Indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-3 h-8 rounded-xl border text-xs font-bold transition-all ${
                zoom > 1
                  ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30 shadow-xs"
                  : "bg-white/5 text-slate-400 border-white/10"
              }`}
              title="Click and drag to pan across the document when zoomed in"
            >
              <Hand className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Drag to Pan</span>
              <span className="sm:hidden">Drag</span>
            </div>

            {zoom > 1 && (
              <span className="text-[11px] font-semibold text-slate-400 hidden lg:inline">
                • Click & drag to move
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
