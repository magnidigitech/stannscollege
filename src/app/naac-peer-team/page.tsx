"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, Award, Image as ImageIcon, PlayCircle, 
  Download, Eye, X, ChevronLeft, ChevronRight, Search, 
  Film, AlertCircle, FileText, ArrowLeft, Loader2
} from "lucide-react";
import { getNaacPeerTeam } from "@/lib/sanity";

// Interfaces
interface GalleryImage {
  url: string;
  caption?: string;
}

interface PeerTeamVideo {
  title: string;
  videoFileUrl?: string;
  videoUrl?: string;
}

interface SanityNaacPeerTeam {
  title: string;
  description: string;
  certificatePdfUrl?: string;
  certificateImageUrl?: string;
  gallery?: GalleryImage[];
  videos?: PeerTeamVideo[];
}

// 16 Fallback videos
const FALLBACK_VIDEOS: PeerTeamVideo[] = [
  { title: "AP STATE SKILL CENTER", videoUrl: "/videos/naac/AP STATE SKILL CENTER.mp4" },
  { title: "BIOTECHNOLOGY", videoUrl: "/videos/naac/BIOTECHNOLGY.mp4" },
  { title: "BOTANY", videoUrl: "/videos/naac/BOTANY.mp4" },
  { title: "CHEMISTRY", videoUrl: "/videos/naac/CHEMISTRY.mp4" },
  { title: "COMMERCE", videoUrl: "/videos/naac/COMMERCE.mp4" },
  { title: "COMPUTER SCIENCE", videoUrl: "/videos/naac/COMPUTER SCIENCE.mp4" },
  { title: "MATHEMATICS", videoUrl: "/videos/naac/MATHEMATICS.mp4" },
  { title: "MBA", videoUrl: "/videos/naac/MBA.mp4" },
  { title: "MCA", videoUrl: "/videos/naac/MCA.mp4" },
  { title: "MICROBIOLOGY", videoUrl: "/videos/naac/MICROBIOLOGY.mp4" },
  { title: "OTHER ACTIVITIES", videoUrl: "/videos/naac/OTHER ACTIVITIES.mp4" },
  { title: "PG-LIBRARY", videoUrl: "/videos/naac/PG-LIBRARY.mp4" },
  { title: "PHYSICS", videoUrl: "/videos/naac/PHYSICS.mp4" },
  { title: "SPORTS & GAMES", videoUrl: "/videos/naac/SPORTS & GAMES.mp4" },
  { title: "STATISTICS", videoUrl: "/videos/naac/STATISTICS.mp4" },
  { title: "UG-LIBRARY", videoUrl: "/videos/naac/UG-LIBRARY.mp4" }
];

export default function NaacPeerTeamPage() {
  const [data, setData] = useState<SanityNaacPeerTeam | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"certificate" | "gallery" | "videos">("certificate");
  
  // Search and media states
  const [imageSearch, setImageSearch] = useState("");
  const [videoSearch, setVideoSearch] = useState("");
  const [visibleImagesCount, setVisibleImagesCount] = useState(24);
  
  // Lightbox view states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string | null>(null);

  // Fetch Sanity Data
  useEffect(() => {
    async function loadData() {
      try {
        const res = await getNaacPeerTeam();
        if (res) {
          setData(res);
        }
      } catch (err) {
        console.error("Error loading NAAC Peer Team data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Lock page scrolling when modal is active
  useEffect(() => {
    if (lightboxIndex !== null || activeVideo !== null) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [lightboxIndex, activeVideo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-[#002147] animate-spin" />
        <p className="text-slate-500 font-semibold tracking-wide text-sm">
          Loading NAAC Peer Team Visit Portfolios...
        </p>
      </div>
    );
  }

  // Resolved resources (Sanity data with local fallbacks)
  const title = data?.title || "NAAC Peer Team Visit";
  const description = data?.description || "The National Assessment and Accreditation Council (NAAC) Peer Team visited St. Ann’s College for Women, Gorantla, Guntur to assess the institutional performance, academic standards, quality infrastructure, and overall educational impact. Explore our accreditation documents, photo archives, and video presentations highlighting our department capabilities and campus infrastructure.";
  const certificatePdfUrl = data?.certificatePdfUrl || "/documents/naac/NAAC_CERTIFICATE.pdf";
  const certificateImageUrl = data?.certificateImageUrl || "/documents/6.NAAC Certficates/NAAC Certficates/NAAC Certtifcate 1.jpeg";
  const gallery = data?.gallery || [];
  const videos = data?.videos && data.videos.length > 0 ? data.videos : FALLBACK_VIDEOS;

  // Filtered lists
  const filteredImages = gallery.filter((img) => 
    img.caption?.toLowerCase().includes(imageSearch.toLowerCase()) || 
    img.url.toLowerCase().includes(imageSearch.toLowerCase())
  );

  const filteredVideos = videos.filter((vid) => 
    vid.title.toLowerCase().includes(videoSearch.toLowerCase())
  );

  // Lightbox handlers
  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white pb-20">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] py-16 px-6 sm:px-12 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link href="/" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1 text-xs font-bold text-indigo-150 transition-all select-none">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-250 tracking-wider uppercase">
                <ShieldCheck className="h-3.5 w-3.5" /> NAAC PEER TEAM
              </span>
            </div>
            <h1 className="mt-5 font-outfit text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight select-none">
              {title}
            </h1>
            <p className="mt-4 text-indigo-100/80 text-sm md:text-base max-w-4xl font-normal leading-relaxed">
              {description}
            </p>
          </div>
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Award className="h-10 w-10 animate-pulse" />
          </span>
        </div>
      </div>

      {/* 2. Interactive Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 gap-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("certificate")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all select-none ${
                activeTab === "certificate"
                  ? "bg-white text-[#002147] shadow-md border border-slate-200/50"
                  : "text-slate-500 hover:text-[#002147]"
              }`}
            >
              <FileText className="h-4.5 w-4.5" />
              Certificate
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all select-none ${
                activeTab === "gallery"
                  ? "bg-white text-[#002147] shadow-md border border-slate-200/50"
                  : "text-slate-500 hover:text-[#002147]"
              }`}
            >
              <ImageIcon className="h-4.5 w-4.5" />
              Photo Gallery
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all select-none ${
                activeTab === "videos"
                  ? "bg-white text-[#002147] shadow-md border border-slate-200/50"
                  : "text-slate-500 hover:text-[#002147]"
              }`}
            >
              <PlayCircle className="h-4.5 w-4.5" />
              Videos
            </button>
          </div>

          {/* Search Inputs (Conditional) */}
          {activeTab === "gallery" && gallery.length > 0 && (
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-[#002147] transition-colors" />
              <input
                type="text"
                placeholder="Search photo captions..."
                value={imageSearch}
                onChange={(e) => {
                  setImageSearch(e.target.value);
                  setVisibleImagesCount(24); // Reset pagination on search
                }}
                className="w-full bg-white px-11 py-3 text-sm rounded-2xl border border-slate-200 focus:border-[#002147] focus:outline-none transition-all font-semibold text-slate-700 shadow-2xs"
              />
              {imageSearch && (
                <button onClick={() => setImageSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {activeTab === "videos" && (
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-[#002147] transition-colors" />
              <input
                type="text"
                placeholder="Search department videos..."
                value={videoSearch}
                onChange={(e) => setVideoSearch(e.target.value)}
                className="w-full bg-white px-11 py-3 text-sm rounded-2xl border border-slate-200 focus:border-[#002147] focus:outline-none transition-all font-semibold text-slate-700 shadow-2xs"
              />
              {videoSearch && (
                <button onClick={() => setVideoSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* A. Certificate Tab */}
        {activeTab === "certificate" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Certificate Meta Details */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white border border-slate-200/60 p-8 rounded-3xl shadow-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Accreditation Certificate
                </span>
                <h2 className="font-outfit text-2xl md:text-3xl font-black text-[#002147] mt-4 leading-tight">
                  Official NAAC Certification
                </h2>
                <p className="mt-3 text-slate-500 text-sm md:text-base leading-relaxed">
                  St. Ann’s College for Women holds prestigious NAAC Accreditation with an <strong>‘A’ Grade (CGPA of 3.09)</strong>. Click to preview or download the high-resolution certificate copy for institutional audits and compliance disclosures.
                </p>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={certificatePdfUrl}
                    download
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#002147] text-white hover:bg-[#001c3d] rounded-2xl text-xs font-black shadow-md hover:shadow-lg transition-all"
                  >
                    <Download className="h-4.5 w-4.5" /> DOWNLOAD CERTIFICATE (PDF)
                  </a>
                  <a
                    href={certificatePdfUrl}
                    target="_blank"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-2xl text-xs font-black transition-all"
                  >
                    <Eye className="h-4.5 w-4.5" /> View PDF
                  </a>
                </div>
              </div>

              {/* Accreditations Details Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100/80 p-8 rounded-3xl shadow-sm">
                <h4 className="font-outfit font-black text-emerald-800 text-lg leading-tight flex items-center gap-2">
                  🏆 Institutional Milestone
                </h4>
                <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
                  The NAAC certificate represents St. Ann’s College commitment to fostering exceptional teaching standards, modern learning infrastructure, value-added skill courses, and research-oriented development.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6 border-t border-emerald-100/60 pt-5 text-center">
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3.5">
                    <span className="text-[10px] uppercase font-black text-emerald-700 tracking-wider">CGPA Score</span>
                    <h5 className="font-outfit text-xl font-black text-[#002147] mt-1">3.09 / 4.00</h5>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3.5">
                    <span className="text-[10px] uppercase font-black text-emerald-700 tracking-wider">Grade Status</span>
                    <h5 className="font-outfit text-xl font-black text-[#002147] mt-1">A Grade</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Visual Rendering */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative group bg-white border border-slate-200 p-4 sm:p-6 rounded-[2.5rem] shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-2xl select-none">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded-[2.5rem] flex items-center justify-center z-10 pointer-events-none">
                  <span className="bg-white/95 px-5 py-3 rounded-full text-slate-800 text-xs font-black shadow-md tracking-wider flex items-center gap-1.5 scale-90 group-hover:scale-100 transition-all">
                    <Eye className="h-4 w-4" /> CLICK TO EXPAND
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={certificateImageUrl}
                  alt="NAAC Accreditation Certificate"
                  onClick={() => setLightboxIndex(-1)} // -1 code for showing certificate in full screen modal
                  className="w-full h-auto rounded-3xl border border-slate-100 shadow-2xs bg-slate-50 cursor-pointer transition-all duration-300 group-hover:scale-[1.01]"
                />
              </div>
            </div>

          </div>
        )}

        {/* B. Photo Gallery Tab */}
        {activeTab === "gallery" && (
          <div>
            {gallery.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                <AlertCircle className="h-12 w-12 text-slate-300" />
                <div className="text-center">
                  <h4 className="font-outfit font-black text-lg text-slate-700">Photo Gallery Empty</h4>
                  <p className="text-slate-450 text-xs md:text-sm max-w-md mt-1.5 leading-relaxed">
                    The Sanity studio has not been seeded with Peer Team Visit images yet. Please run the seeder script to upload all visit photographs.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {filteredImages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
                    <AlertCircle className="h-8 w-8 text-slate-350" />
                    <p className="text-slate-450 text-sm font-semibold tracking-wide">
                      No matching photographs found in visit archive.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Images Responsive Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {filteredImages.slice(0, visibleImagesCount).map((img, index) => (
                        <div
                          key={index}
                          onClick={() => setLightboxIndex(index)}
                          className="relative group bg-white border border-slate-200/80 p-2.5 rounded-3xl shadow-2xs hover:shadow-md cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between"
                        >
                          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.url ? `${img.url}?w=500&q=70&fit=max&auto=format` : ""}
                              alt={img.caption || "NAAC Peer Team Gallery"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[#002147]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="p-2.5 rounded-full bg-white/95 text-[#002147] shadow-sm transform scale-90 group-hover:scale-100 transition-transform">
                                <Eye className="h-4.5 w-4.5" />
                              </span>
                            </div>
                          </div>
                          {img.caption && (
                            <p className="mt-3.5 px-1.5 text-slate-500 text-xs font-bold truncate leading-relaxed">
                              {img.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Pagination Load More Button */}
                    {visibleImagesCount < filteredImages.length && (
                      <div className="mt-12 flex justify-center">
                        <button
                          onClick={() => setVisibleImagesCount(prev => prev + 24)}
                          className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black text-slate-700 shadow-2xs transition-all active:scale-95 select-none"
                        >
                          Load More Photographs ({filteredImages.length - visibleImagesCount} Remaining)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* C. Videos Tab */}
        {activeTab === "videos" && (
          <div>
            {filteredVideos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
                <AlertCircle className="h-8 w-8 text-slate-350" />
                <p className="text-slate-450 text-sm font-semibold tracking-wide">
                  No matching department videos found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredVideos.map((vid, index) => {
                  const resolvedUrl = vid.videoFileUrl || vid.videoUrl;
                  return (
                    <div
                      key={index}
                      className="group bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Video Card Poster/Preview Box */}
                        <div
                          onClick={() => {
                            if (resolvedUrl) {
                              setActiveVideo(resolvedUrl);
                              setActiveVideoTitle(vid.title);
                            }
                          }}
                          className="aspect-[16/10] w-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden shadow-2xs group-hover:shadow-inner border border-slate-800/80"
                        >
                          {resolvedUrl ? (
                            <video
                              src={resolvedUrl}
                              preload="metadata"
                              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                              muted
                              playsInline
                            />
                          ) : null}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10"></div>
                          <PlayCircle className="h-12 w-12 text-white/95 group-hover:text-emerald-400 group-hover:scale-110 z-20 transition-all duration-300 drop-shadow-md" />
                        </div>

                        {/* Title details */}
                        <h4 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-snug mt-5 group-hover:text-[#002147] transition-colors line-clamp-2">
                          {vid.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-6 border-t border-slate-100 pt-4">
                        <button
                          onClick={() => {
                            if (resolvedUrl) {
                              setActiveVideo(resolvedUrl);
                              setActiveVideoTitle(vid.title);
                            }
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition-all select-none"
                        >
                          <Eye className="h-4 w-4 shrink-0" /> Play Video
                        </button>
                        {resolvedUrl && (
                          <a
                            href={resolvedUrl}
                            download
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 hover:bg-[#002147]/10 border border-[#002147]/10 text-[#002147] transition-all active:scale-95 select-none"
                            title="Download Video File"
                          >
                            <Download className="h-4.5 w-4.5" />
                          </a>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* 4. MODAL OVERLAY LIGHTBOX VIEWERS                              */}
      {/* ============================================================== */}

      {/* A. Image Lightbox (Supports scrolling / navigation) */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
          
          {/* Backdrop click to close */}
          <div onClick={() => setLightboxIndex(null)} className="absolute inset-0 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 transition-all z-50 select-none border border-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Arrow (If not showing the main accreditation certificate) */}
          {lightboxIndex >= 0 && filteredImages.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-4 sm:left-6 p-3 rounded-full bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 transition-all z-50 select-none border border-white/10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Core Content Container */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center gap-4 z-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxIndex === -1 ? certificateImageUrl : (filteredImages[lightboxIndex].url ? `${filteredImages[lightboxIndex].url}?w=1600&q=80&fit=max&auto=format` : "")}
              alt="NAAC Peer Team Visit Detail View"
              className="max-h-[75vh] max-w-full rounded-2xl border border-white/10 shadow-2xl bg-black select-none object-contain animate-scaleUp"
            />
            {lightboxIndex >= 0 && (
              <div className="text-center text-white max-w-xl">
                <p className="text-sm font-bold tracking-wide">
                  {filteredImages[lightboxIndex].caption || "NAAC Peer Team Visit"}
                </p>
                <span className="text-xs text-slate-400 font-semibold mt-1 inline-block">
                  Image {lightboxIndex + 1} of {filteredImages.length}
                </span>
              </div>
            )}
            {lightboxIndex === -1 && (
              <div className="text-center text-white">
                <p className="text-sm font-bold tracking-wide">NAAC Accreditation Certificate</p>
              </div>
            )}
          </div>

          {/* Right Arrow (If not showing the main accreditation certificate) */}
          {lightboxIndex >= 0 && filteredImages.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-4 sm:right-6 p-3 rounded-full bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 transition-all z-50 select-none border border-white/10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

        </div>
      )}

      {/* B. Video Lightbox Player */}
      {activeVideo && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-fadeIn">
          {/* Backdrop click to close */}
          <div onClick={() => { setActiveVideo(null); setActiveVideoTitle(null); }} className="absolute inset-0 pointer-events-none" />

          {/* Video Container Box */}
          <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-[2rem] border border-slate-200/50 shadow-2xl flex flex-col overflow-hidden z-10 animate-scaleUp">
            
            {/* Header info */}
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between gap-6 border-b border-slate-800">
              <div className="flex flex-col gap-0.5 pr-8 truncate">
                <span className="text-[9px] uppercase font-black tracking-widest text-emerald-450">
                  Video Presenter
                </span>
                <h3 className="font-outfit text-sm md:text-base font-black tracking-tight leading-none mt-1 truncate">
                  {activeVideoTitle || "Department Presentation"}
                </h3>
              </div>
              <div className="flex items-center gap-3.5 shrink-0">
                <a
                  href={activeVideo}
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <button
                  onClick={() => { setActiveVideo(null); setActiveVideoTitle(null); }}
                  className="p-2 rounded-xl bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Video content */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full h-full max-h-[70vh] bg-black"
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
