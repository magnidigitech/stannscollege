"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Image as ImageIcon,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  UploadCloud,
  Eye,
  ExternalLink,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  X,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  Loader2,
  MoveVertical,
  Check
} from "lucide-react";

export interface HeroBannerItem {
  _id?: string;
  title?: string;
  displayOrder: number;
  linkUrl?: string;
  imageUrl: string;
  assetId?: string;
  isUploading?: boolean;
}

export function HeroBannersManager() {
  const [banners, setBanners] = useState<HeroBannerItem[]>([]);
  const [initialBanners, setInitialBanners] = useState<HeroBannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state for Add or Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroBannerItem | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isEditingExisting, setIsEditingExisting] = useState(false);

  // File upload state in modal
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lightbox full-size image preview
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  // Delete confirmation modal
  const [deletingBanner, setDeletingBanner] = useState<{ id: string; title: string; index: number } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch banners from API
  const fetchBanners = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/admin/hero-banners");
      const json = await res.json();
      if (json.success && Array.isArray(json.banners)) {
        setBanners(json.banners);
        setInitialBanners(json.banners);
      } else {
        setErrorMessage(json.error || "Failed to load hero banners from Sanity.");
      }
    } catch (err: any) {
      console.error("Error loading hero banners:", err);
      setErrorMessage("Failed to connect to hero banners API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const isDirty = JSON.stringify(banners) !== JSON.stringify(initialBanners);

  // 2. Save all reordered / updated banners
  const handleSaveAll = async () => {
    try {
      setSaving(true);
      setErrorMessage(null);
      setSaveSuccess(false);

      const res = await fetch("/api/admin/hero-banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banners }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to save banners.");
      }

      setInitialBanners(banners);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      fetchBanners();
    } catch (err: any) {
      console.error("Error saving banners:", err);
      setErrorMessage(err.message || "Failed to save banners.");
    } finally {
      setSaving(false);
    }
  };

  // 3. Move banner Up / Down in sequence
  const handleMove = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === banners.length - 1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...banners];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);

    // Update displayOrder numbers
    const reordered = updated.map((b, i) => ({ ...b, displayOrder: i + 1 }));
    setBanners(reordered);
  };

  // 4. Open Modal for Adding New Banner
  const handleOpenAddModal = () => {
    setEditingBanner({
      title: "",
      displayOrder: banners.length + 1,
      linkUrl: "",
      imageUrl: "",
    });
    setIsEditingExisting(false);
    setEditIndex(null);
    setUploadError(null);
    setIsModalOpen(true);
  };

  // 5. Open Modal for Editing Existing Banner
  const handleOpenEditModal = (banner: HeroBannerItem, index: number) => {
    setEditingBanner({ ...banner });
    setIsEditingExisting(true);
    setEditIndex(index);
    setUploadError(null);
    setIsModalOpen(true);
  };

  // 6. Handle Image File Upload directly via /api/admin/upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }

    try {
      setUploadingImage(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "image");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!json.success || !json.asset?.url) {
        throw new Error(json.error || "Failed to upload image asset to Sanity.");
      }

      setEditingBanner((prev) =>
        prev
          ? {
              ...prev,
              imageUrl: json.asset.url,
              assetId: json.asset._id,
              title: prev.title || file.name.replace(/\.[^/.]+$/, "").replace(/^\d+\./, "").trim(),
            }
          : null
      );
    } catch (err: any) {
      console.error("Image upload failed:", err);
      setUploadError(err.message || "Failed to upload image to Sanity asset pipeline.");
    } finally {
      setUploadingImage(false);
    }
  };

  // 7. Save Single Banner from Modal
  const handleSaveModal = () => {
    if (!editingBanner) return;

    if (!editingBanner.imageUrl) {
      setUploadError("Please upload or select a banner image.");
      return;
    }

    let updatedList = [...banners];

    if (isEditingExisting && editIndex !== null) {
      // Update existing item in local list
      updatedList[editIndex] = {
        ...editingBanner,
        title: editingBanner.title?.trim() || `Banner ${editIndex + 1}`,
      };
    } else {
      // Add new banner to list
      const newBanner: HeroBannerItem = {
        ...editingBanner,
        _id: `new-${Date.now()}`,
        title: editingBanner.title?.trim() || `Banner ${banners.length + 1}`,
        displayOrder: banners.length + 1,
      };
      updatedList.push(newBanner);
    }

    // Ensure order is sequential
    updatedList = updatedList.map((b, i) => ({ ...b, displayOrder: i + 1 }));

    setBanners(updatedList);
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  // 8. Confirm Delete Banner
  const handleConfirmDelete = async () => {
    if (!deletingBanner) return;

    try {
      setIsDeleting(true);
      if (deletingBanner.id && !deletingBanner.id.startsWith("new-")) {
        const res = await fetch(`/api/admin/hero-banners?id=${encodeURIComponent(deletingBanner.id)}`, {
          method: "DELETE",
        });
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.error || "Failed to delete banner from Sanity.");
        }
      }

      const updated = banners
        .filter((_, idx) => idx !== deletingBanner.index)
        .map((b, i) => ({ ...b, displayOrder: i + 1 }));

      setBanners(updated);
      setInitialBanners(updated);
      setDeletingBanner(null);
    } catch (err: any) {
      console.error("Delete failed:", err);
      setErrorMessage(err.message || "Failed to delete banner.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered banners
  const filteredBanners = banners.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (b.title && b.title.toLowerCase().includes(q)) ||
      (b.linkUrl && b.linkUrl.toLowerCase().includes(q)) ||
      `#${b.displayOrder}`.includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn select-none">
      {/* ── HEADER BANNER ── */}
      <div className="bg-gradient-to-r from-[#002147] via-[#002b5c] to-[#0a3d78] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-900/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5 text-sky-300" />
            Homepage Carousel (16:6 Aspect Ratio)
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight leading-tight">
            Home Hero Banners Manager
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm font-medium mt-1.5 leading-relaxed">
            Manage the full-bleed widescreen hero slides cycling on the homepage. Upload images, reorder sequence from #1 to #10, and optionally attach click target links.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={fetchBanners}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
            title="Reload from Sanity"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-sky-300" : ""}`} />
            Refresh
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add New Banner
          </button>
        </div>
      </div>

      {/* ── STATS & SPEC NOTICES ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Slides</span>
            <span className="text-xl font-black text-slate-800 font-outfit">{banners.length} Banners Live</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
            <MoveVertical className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Optimal Dimensions</span>
            <span className="text-xl font-black text-slate-800 font-outfit">16:6 (2048×768)</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Sanity Sync</span>
            <span className="text-xl font-black text-emerald-600 font-outfit">Instant Live Sync</span>
          </div>
        </div>
      </div>

      {/* ── SAVE BAR (Shown when changes are pending) ── */}
      {isDirty && (
        <div className="sticky top-4 z-30 bg-amber-500 text-slate-950 px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between border-2 border-amber-600 animate-pulse">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-5 w-5 shrink-0 text-slate-950 font-black" />
            <span className="text-xs sm:text-sm font-black">
              You have unsaved sequence changes! Click &ldquo;Save All Changes&rdquo; to push to Sanity.
            </span>
          </div>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin text-amber-400" /> : <Save className="h-4 w-4" />}
            Save All Changes
          </button>
        </div>
      )}

      {/* ── ALERTS / TOASTS ── */}
      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold animate-fadeIn">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          All hero banner changes saved successfully to Sanity!
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-2xl flex items-center justify-between gap-2.5 text-xs sm:text-sm font-bold animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── TOOLBAR: SEARCH & ACTIONS ── */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search banners by title or link..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-slate-500">
            Showing {filteredBanners.length} of {banners.length} banners
          </span>
          <button
            onClick={handleSaveAll}
            disabled={saving || !isDirty}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 shadow-sm ${
              isDirty
                ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer active:scale-95"
                : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
            }`}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Save className="h-4 w-4" />}
            Save Sequence
          </button>
        </div>
      </div>

      {/* ── BANNERS LIST ── */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 flex flex-col items-center justify-center text-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-sm font-bold text-slate-600">Loading hero banners from Sanity...</span>
        </div>
      ) : filteredBanners.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 flex flex-col items-center justify-center text-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shadow-inner">
            <ImageIcon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-black font-outfit text-slate-800">No Banners Found</h3>
            <p className="text-xs text-slate-500 font-medium max-w-sm mt-1">
              {searchQuery ? "No banner matched your search query." : "There are currently no hero banners published."}
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus className="h-4 w-4" />
            Upload First Banner
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {filteredBanners.map((banner, index) => {
            const actualIndex = banners.findIndex((b) => b === banner || (b._id && b._id === banner._id));

            return (
              <div
                key={banner._id || `banner-${index}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Left: Reorder controls + Order badge + 16:6 Thumbnail + Title Info */}
                <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                  {/* Sequence Order Controls */}
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMove(actualIndex, "up")}
                      disabled={actualIndex === 0}
                      className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all ${
                        actualIndex === 0
                          ? "text-slate-300 cursor-not-allowed bg-slate-50"
                          : "text-slate-600 hover:text-blue-600 hover:bg-blue-50 bg-slate-100 cursor-pointer active:scale-95"
                      }`}
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(actualIndex, "down")}
                      disabled={actualIndex === banners.length - 1}
                      className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all ${
                        actualIndex === banners.length - 1
                          ? "text-slate-300 cursor-not-allowed bg-slate-50"
                          : "text-slate-600 hover:text-blue-600 hover:bg-blue-50 bg-slate-100 cursor-pointer active:scale-95"
                      }`}
                      title="Move Down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Order Number Badge */}
                  <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-outfit font-black text-sm shrink-0 shadow-xs">
                    #{banner.displayOrder || actualIndex + 1}
                  </div>

                  {/* 16:6 Image Thumbnail with Lightbox trigger */}
                  <div
                    onClick={() => {
                      setLightboxUrl(banner.imageUrl);
                      setLightboxTitle(banner.title || `Banner #${banner.displayOrder}`);
                    }}
                    className="relative w-36 sm:w-48 aspect-[16/6] rounded-xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-2xs group/thumb cursor-pointer shrink-0"
                    title="Click to preview full-size"
                  >
                    <img
                      src={banner.imageUrl}
                      alt={banner.title || `Hero banner ${banner.displayOrder}`}
                      className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Eye className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <h4 className="font-outfit font-black text-slate-800 text-sm sm:text-base truncate leading-snug">
                      {banner.title || `Banner #${banner.displayOrder || actualIndex + 1}`}
                    </h4>

                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      {banner.linkUrl ? (
                        <a
                          href={banner.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:underline truncate max-w-[260px]"
                        >
                          <LinkIcon className="h-3 w-3 shrink-0" />
                          <span className="truncate">{banner.linkUrl}</span>
                          <ExternalLink className="h-2.5 w-2.5 shrink-0 ml-0.5" />
                        </a>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400 italic">
                          No click link (Static slide)
                        </span>
                      )}

                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        16:6
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => {
                      setLightboxUrl(banner.imageUrl);
                      setLightboxTitle(banner.title || `Banner #${banner.displayOrder}`);
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-all cursor-pointer shadow-xs"
                    title="Preview Full Size"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(banner, actualIndex)}
                    className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-all cursor-pointer shadow-xs"
                    title="Edit Banner"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() =>
                      setDeletingBanner({
                        id: banner._id || "",
                        title: banner.title || `Banner #${banner.displayOrder}`,
                        index: actualIndex,
                      })
                    }
                    className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-all cursor-pointer shadow-xs"
                    title="Delete Banner"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MODAL: ADD / EDIT BANNER ── */}
      {isModalOpen && editingBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#002147] to-[#0a3d78] text-white p-5 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <ImageIcon className="h-5 w-5 text-sky-300" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg sm:text-xl">
                    {isEditingExisting ? "Edit Hero Banner" : "Add New Hero Banner"}
                  </h3>
                  <p className="text-xs text-sky-200/80 font-medium mt-0.5">
                    Recommended 16:6 aspect ratio (e.g. 2048 × 768 px)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-5 flex-1">
              {uploadError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-2">
                  Banner Image <span className="text-rose-500">*</span>
                </label>

                {editingBanner.imageUrl ? (
                  <div className="flex flex-col gap-2">
                    <div className="relative w-full aspect-[16/6] rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-200 shadow-sm group">
                      <img
                        src={editingBanner.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white text-slate-800 rounded-lg text-xs font-black shadow-md cursor-pointer hover:bg-slate-100"
                        >
                          Replace Image
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-1">
                      <span>Preview in 16:6 container</span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:underline font-bold cursor-pointer"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-[16/6] rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all group"
                  >
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-2 text-blue-600">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="text-xs font-bold">Uploading to Sanity Asset Pipeline...</span>
                      </div>
                    ) : (
                      <>
                        <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-2 shadow-xs group-hover:scale-110 transition-transform">
                          <UploadCloud className="h-6 w-6" />
                        </div>
                        <span className="text-xs sm:text-sm font-black text-slate-800">
                          Click to upload banner image
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 mt-1">
                          PNG, JPG, or WebP • 16:6 aspect ratio recommended (2048 × 768 px)
                        </span>
                      </>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Title / Label Input */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  Banner Title / Label <span className="text-slate-400 font-normal lowercase">(for reference &amp; alt text)</span>
                </label>
                <input
                  type="text"
                  value={editingBanner.title || ""}
                  onChange={(e) =>
                    setEditingBanner((prev) => (prev ? { ...prev, title: e.target.value } : null))
                  }
                  placeholder="e.g. NAAC Accreditation & Academic Excellence"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Target Link URL (Optional) */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  Click Target Link URL <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={editingBanner.linkUrl || ""}
                    onChange={(e) =>
                      setEditingBanner((prev) => (prev ? { ...prev, linkUrl: e.target.value } : null))
                    }
                    placeholder="e.g. /admissions or https://..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  Leave empty if clicking the slide shouldn&apos;t navigate anywhere.
                </p>
              </div>

              {/* Order input */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  Sequence Display Order
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={editingBanner.displayOrder || 1}
                  onChange={(e) =>
                    setEditingBanner((prev) =>
                      prev ? { ...prev, displayOrder: parseInt(e.target.value, 10) || 1 } : null
                    )
                  }
                  className="w-32 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                disabled={uploadingImage || !editingBanner.imageUrl}
                className={`px-5 py-2.5 rounded-xl text-white text-xs font-black transition-all flex items-center gap-2 shadow-md ${
                  uploadingImage || !editingBanner.imageUrl
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 cursor-pointer active:scale-95"
                }`}
              >
                <Check className="h-4 w-4" />
                {isEditingExisting ? "Save Updates" : "Add to List"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX MODAL: FULL SIZE PREVIEW ── */}
      {lightboxUrl && (
        <div
          onClick={() => setLightboxUrl(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
          >
            <div className="p-4 bg-black/40 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-sky-400" />
                <span className="font-bold text-sm truncate">{lightboxTitle}</span>
              </div>
              <button
                onClick={() => setLightboxUrl(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-2 sm:p-4 flex items-center justify-center bg-black/95">
              <img
                src={lightboxUrl}
                alt={lightboxTitle}
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deletingBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center flex flex-col items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shadow-xs">
              <Trash2 className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-lg font-black font-outfit text-slate-800">Delete Hero Banner?</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Are you sure you want to remove &ldquo;{deletingBanner.title}&rdquo;? It will be permanently deleted from the homepage slider.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full justify-center mt-2">
              <button
                type="button"
                onClick={() => setDeletingBanner(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
              >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Trash2 className="h-4 w-4" />}
                Delete Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
