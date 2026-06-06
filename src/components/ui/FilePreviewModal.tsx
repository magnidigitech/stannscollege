"use client";

import React, { useEffect, useState } from "react";
import { X, ExternalLink, Download, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Load and render PDF pages when fileUrl/isOpen changes
  useEffect(() => {
    if (!isOpen || !fileUrl) {
      setRenderedPages([]);
      setLoadingPages(false);
      setLoadingProgress("");
      setUseFallback(false);
      setCurrentPage(0);
      setPageSize({ width: 0, height: 0 });
      return;
    }

    const isPdfFile = fileUrl.toLowerCase().includes(".pdf");
    if (!isPdfFile) {
      setLoadingPages(false);
      setUseFallback(false);
      setRenderedPages([]);
      return;
    }

    let isMounted = true;
    setLoadingPages(true);
    setUseFallback(false);
    setRenderedPages([]);
    setCurrentPage(0);
    setPageSize({ width: 0, height: 0 });
    setLoadingProgress("Initializing flipbook...");

    async function convertPdf() {
      try {
        // Load PDF.js from CDN dynamically to prevent Next.js SSR and build issues
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

        // Render each page into an offscreen canvas and convert to Image URL
        for (let i = 1; i <= total; i++) {
          if (!isMounted) return;
          setLoadingProgress(`Preparing page ${i} of ${total}...`);

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 }); // High-quality display scale
          
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

          images.push(canvas.toDataURL("image/jpeg", 0.85));
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

  // Calculate dynamic dimensions for the book spread based on PDF page ratio
  const pageRatio = pageSize.width > 0 ? pageSize.width / pageSize.height : 0.707;
  const maxW = windowSize.width * 0.96;
  const maxH = windowSize.height * 0.85;

  let bookHeight = Math.min(maxH, 850);
  let bookWidth = bookHeight * 2 * pageRatio;

  if (bookWidth > maxW) {
    bookWidth = maxW;
    bookHeight = bookWidth / (2 * pageRatio);
  }
  if (bookHeight > maxH) {
    bookHeight = maxH;
    bookWidth = bookHeight * 2 * pageRatio;
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close container */}
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>
      
      {/* Modal Box */}
      <div className="relative w-[98vw] h-[96vh] bg-[#1a1f26] rounded-2xl md:rounded-[2.5rem] shadow-2xl border border-slate-700/40 overflow-hidden flex flex-col z-[210] animate-scaleUp">
        
        {/* Header - Styled with dark theme to suit the reader layout */}
        <div className="bg-[#0b0f13] px-5 py-3.5 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex flex-col max-w-[65%] sm:max-w-[75%]">
            <h4 className="font-outfit text-xs md:text-sm lg:text-base font-black tracking-tight leading-tight select-none uppercase truncate text-white">
              {title}
            </h4>
            <span className="font-sans text-[9px] md:text-xs text-slate-400 font-semibold tracking-wide select-none">
              St. Ann&apos;s College for Women • Interactive Reader
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <a
              href={fileUrl}
              download
              className="flex h-9 px-3 items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 duration-200 text-xs font-bold font-sans"
              title="Download File"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 duration-200"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 duration-200"
              title="Close viewer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>        {/* Content Viewer Body */}
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
            <div className="flex flex-col items-center gap-4 w-full h-full py-3 select-none animate-fadeIn justify-center">
              
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
                              {/* Inner Fold shadow on the left edge of right-hand pages */}
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
                              {/* Inner Fold shadow on the right edge of left-hand pages */}
                              <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none"></div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-6 mt-2 z-20 text-white font-sans">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/50 disabled:text-slate-600 text-white backdrop-blur border border-white/10 transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span className="text-xs font-bold text-slate-400 tracking-wider">
                  Page {currentPage === 0 ? "Cover (1)" : `${currentPage * 2} - ${Math.min(currentPage * 2 + 1, totalPages)}`} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === numSheets - 1}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-slate-800/50 disabled:text-slate-600 text-white backdrop-blur border border-white/10 transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
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
            // Standard Image viewer
            <div className="w-full h-full p-4 flex items-center justify-center overflow-auto">
              <img
                src={fileUrl}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-sm border border-slate-800 bg-white"
              />
            </div>
          ) : (
            // Spinner while loading
            <div className="text-slate-400 text-xs font-semibold flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span>Loading Reader...</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
