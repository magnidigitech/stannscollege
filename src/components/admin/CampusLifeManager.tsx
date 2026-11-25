"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Video,
  Camera,
  Plus,
  Trash2,
  Edit2,
  UploadCloud,
  ExternalLink,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  X,
  Sparkles,
  Play,
  ArrowUp,
  ArrowDown,
  Loader2,
  Check,
  Film,
  Layers,
  Sliders,
  Eye,
} from "lucide-react";
import { extractYouTubeId, getYouTubeThumbnailUrl } from "@/lib/youtube";

export interface CampusVideoItem {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  caption?: string;
  isActive: boolean;
}

export interface CampusGalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  category?: string;
  displayOrder: number;
}

export interface CampusLifeData {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionDescription: string;
  videos: CampusVideoItem[];
  gallery: CampusGalleryItem[];
}

export default function CampusLifeManager() {
  const [activeTab, setActiveTab] = useState<"videos" | "photos" | "settings">("videos");
  const [data, setData] = useState<CampusLifeData | null>(null);
  const [initialData, setInitialData] = useState<CampusLifeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideoIndex, setEditingVideoIndex] = useState<number | null>(null);
  const [videoForm, setVideoForm] = useState<CampusVideoItem>({
    id: "",
    title: "",
    youtubeUrl: "",
    youtubeId: "",
    caption: "",
    isActive: true,
  });

  // Photo Modal State
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState<number | null>(null);
  const [photoForm, setPhotoForm] = useState<CampusGalleryItem>({
    id: "",
    imageUrl: "",
    caption: "",
    category: "Events",
    displayOrder: 1,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search & Category Filter for Photos
  const [photoSearch, setPhotoSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "video" | "photo";
    index: number;
    title: string;
  } | null>(null);

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/admin/campus-life");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
        setInitialData(JSON.parse(JSON.stringify(json.data)));
      } else {
        setErrorMessage(json.error || "Failed to load campus life data.");
      }
    } catch (err: any) {
      console.error("Error fetching campus life data:", err);
      setErrorMessage("Could not connect to Campus Life API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Check for unsaved changes
  const hasChanges =
    JSON.stringify(data) !== JSON.stringify(initialData);

  // Save changes
  const handleSaveAll = async () => {
    if (!data) return;
    try {
      setSaving(true);
      setErrorMessage(null);
      const res = await fetch("/api/admin/campus-life", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setInitialData(JSON.parse(JSON.stringify(data)));
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setErrorMessage(json.error || "Failed to save changes.");
      }
    } catch (err: any) {
      console.error("Save error:", err);
      setErrorMessage("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Video Handlers
  const handleOpenAddVideo = () => {
    setEditingVideoIndex(null);
    setVideoForm({
      id: `vid-${Date.now()}`,
      title: "",
      youtubeUrl: "",
      youtubeId: "",
      caption: "",
      isActive: (data?.videos || []).length === 0, // auto-active if first video
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenEditVideo = (index: number) => {
    if (!data) return;
    setEditingVideoIndex(index);
    setVideoForm({ ...data.videos[index] });
    setIsVideoModalOpen(true);
  };

  const handleSaveVideoModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    const cleanId = extractYouTubeId(videoForm.youtubeUrl || videoForm.youtubeId);
    if (!cleanId) {
      alert("Please provide a valid YouTube video URL or 11-character video ID.");
      return;
    }

    const updatedVideo: CampusVideoItem = {
      ...videoForm,
      youtubeId: cleanId,
      youtubeUrl: videoForm.youtubeUrl || `https://www.youtube.com/watch?v=${cleanId}`,
    };

    let updatedVideos = [...data.videos];

    // If marked active, deactivate other videos
    if (updatedVideo.isActive) {
      updatedVideos = updatedVideos.map((v, i) =>
        i === editingVideoIndex ? updatedVideo : { ...v, isActive: false }
      );
    }

    if (editingVideoIndex !== null) {
      updatedVideos[editingVideoIndex] = updatedVideo;
    } else {
      updatedVideos.push(updatedVideo);
    }

    // Ensure at least one video is active
    if (!updatedVideos.some((v) => v.isActive) && updatedVideos.length > 0) {
      updatedVideos[0].isActive = true;
    }

    setData({ ...data, videos: updatedVideos });
    setIsVideoModalOpen(false);
  };

  const handleToggleActiveVideo = (index: number) => {
    if (!data) return;
    const updated = data.videos.map((v, i) => ({
      ...v,
      isActive: i === index,
    }));
    setData({ ...data, videos: updated });
  };

  const handleDeleteVideo = (index: number) => {
    if (!data) return;
    const updated = data.videos.filter((_, i) => i !== index);
    if (updated.length > 0 && !updated.some((v) => v.isActive)) {
      updated[0].isActive = true;
    }
    setData({ ...data, videos: updated });
    setDeleteTarget(null);
  };

  // Photo Handlers
  const handleOpenAddPhoto = () => {
    setEditingPhotoIndex(null);
    setPhotoForm({
      id: `gal-${Date.now()}`,
      imageUrl: "",
      caption: "",
      category: "Cultural",
      displayOrder: (data?.gallery.length || 0) + 1,
    });
    setUploadError(null);
    setIsPhotoModalOpen(true);
  };

  const handleOpenEditPhoto = (index: number) => {
    if (!data) return;
    setEditingPhotoIndex(index);
    setPhotoForm({ ...data.gallery[index] });
    setUploadError(null);
    setIsPhotoModalOpen(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      if (json.success && json.url) {
        setPhotoForm((prev) => ({ ...prev, imageUrl: json.url }));
      } else {
        setUploadError(json.error || "Failed to upload image.");
      }
    } catch (err: any) {
      setUploadError("Image upload failed: " + (err.message || "Network error"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSavePhotoModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    if (!photoForm.imageUrl.trim()) {
      alert("Please provide an image URL or upload an image file.");
      return;
    }

    const updatedGallery = [...data.gallery];
    if (editingPhotoIndex !== null) {
      updatedGallery[editingPhotoIndex] = photoForm;
    } else {
      updatedGallery.push(photoForm);
    }

    setData({ ...data, gallery: updatedGallery });
    setIsPhotoModalOpen(false);
  };

  const handleDeletePhoto = (index: number) => {
    if (!data) return;
    const updated = data.gallery.filter((_, i) => i !== index);
    setData({ ...data, gallery: updated });
    setDeleteTarget(null);
  };

  const handleMovePhoto = (index: number, direction: "up" | "down") => {
    if (!data) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= data.gallery.length) return;

    const updated = [...data.gallery];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    // re-assign display orders
    updated.forEach((p, idx) => {
      p.displayOrder = idx + 1;
    });

    setData({ ...data, gallery: updated });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-sm font-semibold text-slate-600">Loading Campus Life &amp; Video Manager...</p>
      </div>
    );
  }

  const galleryList = data?.gallery || [];
  const categories = ["All", ...Array.from(new Set(galleryList.map((g) => g.category || "Events")))];

  const filteredPhotos = galleryList.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      !photoSearch.trim() ||
      (item.caption && item.caption.toLowerCase().includes(photoSearch.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(photoSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <Film className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Life at St. Ann&apos;s College
              </h2>
              <p className="text-xs font-medium text-slate-500">
                Manage dynamic YouTube videos, event photo gallery, and section header copy.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {hasChanges && (
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl animate-pulse">
              ● Unsaved Changes
            </span>
          )}

          <button
            type="button"
            onClick={fetchData}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving || !hasChanges}
            className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-black rounded-xl transition-all shadow-md ${
              saveSuccess
                ? "bg-emerald-600 text-white shadow-emerald-500/20"
                : hasChanges
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 active:scale-95"
                : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
            }`}
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved Live!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="ml-auto text-red-400 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("videos")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
            activeTab === "videos"
              ? "bg-rose-600 text-white shadow-sm shadow-rose-500/30"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Campus Videos ({data?.videos.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("photos")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
            activeTab === "photos"
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Photo Gallery ({data?.gallery.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
            activeTab === "settings"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Section Header Copy</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: YOUTUBE CAMPUS VIDEOS                             */}
      {/* ======================================================== */}
      {activeTab === "videos" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-black text-slate-900">
                Homepage Featured Videos
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                The video marked as <strong>Active</strong> is seamlessly embedded into the 2-row card on the homepage.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddVideo}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md shadow-rose-600/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Video</span>
            </button>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.videos.map((video, idx) => (
              <div
                key={video.id || idx}
                className={`group relative rounded-2xl border bg-white overflow-hidden shadow-sm transition-all hover:shadow-md ${
                  video.isActive
                    ? "border-rose-500 ring-2 ring-rose-500/20"
                    : "border-slate-200"
                }`}
              >
                {/* Thumbnail Preview with Play Icon */}
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <img
                    src={getYouTubeThumbnailUrl(video.youtubeId)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Top Left: Active Badge */}
                  <div className="absolute top-3 left-3">
                    {video.isActive ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-md">
                        <Check className="w-3 h-3" /> Featured Active
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggleActiveVideo(idx)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-700 hover:bg-white shadow-md hover:text-rose-600 transition-colors"
                      >
                        Set as Active
                      </button>
                    )}
                  </div>

                  {/* Top Right: YouTube ID Pill */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[10px] font-mono text-white px-2 py-0.5 rounded-md">
                    {video.youtubeId}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h4 className="text-xs font-black text-slate-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
                    {video.title || "Untitled Video"}
                  </h4>
                  {video.caption && (
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {video.caption}
                    </p>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={video.youtubeUrl || `https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Watch</span>
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditVideo(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="Edit Video"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: "video",
                            index: idx,
                            title: video.title || video.youtubeId,
                          })
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CAMPUS PHOTO GALLERY                              */}
      {/* ======================================================== */}
      {activeTab === "photos" && (
        <div className="space-y-6">
          {/* Controls: Search, Filter, Add */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={photoSearch}
                  onChange={(e) => setPhotoSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-48"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-md">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenAddPhoto}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20 transition-all active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Photo</span>
            </button>
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPhotos.map((photo, filteredIdx) => {
              // find actual index in raw array
              const actualIdx = data?.gallery.findIndex((p) => p.id === photo.id) ?? filteredIdx;

              return (
                <div
                  key={photo.id || filteredIdx}
                  className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption || "Campus Event"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Order Pill */}
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-[10px] font-bold text-white px-1.5 py-0.5 rounded">
                      #{photo.displayOrder || actualIdx + 1}
                    </div>

                    {/* Category Pill */}
                    {photo.category && (
                      <div className="absolute top-2 right-2 bg-indigo-600/90 backdrop-blur-md text-[10px] font-bold text-white px-1.5 py-0.5 rounded">
                        {photo.category}
                      </div>
                    )}
                  </div>

                  {/* Caption & Controls */}
                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <p className="text-[11px] font-bold text-slate-800 line-clamp-2">
                      {photo.caption || "Campus Event"}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      {/* Reorder Buttons */}
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleMovePhoto(actualIdx, "up")}
                          disabled={actualIdx === 0}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20"
                          title="Move Earlier"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMovePhoto(actualIdx, "down")}
                          disabled={actualIdx === (data?.gallery.length || 0) - 1}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20"
                          title="Move Later"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Edit & Delete */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditPhoto(actualIdx)}
                          className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                          title="Edit Photo"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({
                              type: "photo",
                              index: actualIdx,
                              title: photo.caption || `Photo #${actualIdx + 1}`,
                            })
                          }
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center p-12 bg-slate-50 border border-slate-200 rounded-2xl">
              <Camera className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-600">No photos found matching your search</p>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: SECTION HEADER COPY                               */}
      {/* ======================================================== */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 max-w-3xl">
          <div>
            <h3 className="text-sm font-black text-slate-900">Homepage Section Titles</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize the section heading, badge subtitle, and descriptive text displayed above the gallery.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Badge / Tagline (Upper pill)
              </label>
              <input
                type="text"
                value={data?.sectionSubtitle || ""}
                onChange={(e) =>
                  setData((prev) => (prev ? { ...prev, sectionSubtitle: e.target.value } : prev))
                }
                placeholder="Event Highlights & Campus Life"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Main Heading
              </label>
              <input
                type="text"
                value={data?.sectionTitle || ""}
                onChange={(e) =>
                  setData((prev) => (prev ? { ...prev, sectionTitle: e.target.value } : prev))
                }
                placeholder="Life at St. Ann's College"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description Paragraph
              </label>
              <textarea
                rows={3}
                value={data?.sectionDescription || ""}
                onChange={(e) =>
                  setData((prev) => (prev ? { ...prev, sectionDescription: e.target.value } : prev))
                }
                placeholder="Glimpses of academic conventions, cultural festivities..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIDEO MODAL (Add / Edit)                                 */}
      {/* ======================================================== */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
                  <Video className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-black text-slate-900">
                  {editingVideoIndex !== null ? "Edit Campus Video" : "Add Campus Video"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideoModal} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="e.g. St. Ann's College Campus Tour 2026"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  YouTube URL or Video ID *
                </label>
                <input
                  type="text"
                  required
                  value={videoForm.youtubeUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    const extracted = extractYouTubeId(val);
                    setVideoForm({
                      ...videoForm,
                      youtubeUrl: val,
                      youtubeId: extracted,
                    });
                  }}
                  placeholder="https://www.youtube.com/watch?v=2E7IGyhdQeg or 2E7IGyhdQeg"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Supports full URL, youtu.be short link, or 11-char ID.
                </p>
              </div>

              {/* Live Thumbnail Preview */}
              {videoForm.youtubeId && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <img
                    src={getYouTubeThumbnailUrl(videoForm.youtubeId, "mqdefault")}
                    alt="YouTube Preview"
                    className="w-24 h-14 object-cover rounded-lg border border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Detected ID: {videoForm.youtubeId}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">Thumbnail preview connected</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subtitle / Caption
                </label>
                <input
                  type="text"
                  value={videoForm.caption || ""}
                  onChange={(e) => setVideoForm({ ...videoForm, caption: e.target.value })}
                  placeholder="e.g. Quality Education, Infrastructure & Campus Life"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="videoActive"
                  checked={videoForm.isActive}
                  onChange={(e) => setVideoForm({ ...videoForm, isActive: e.target.checked })}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="videoActive" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Featured as Active Video on Homepage
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-black bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md shadow-rose-600/20"
                >
                  {editingVideoIndex !== null ? "Update Video" : "Add Video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PHOTO MODAL (Add / Edit)                                 */}
      {/* ======================================================== */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <Camera className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-black text-slate-900">
                  {editingPhotoIndex !== null ? "Edit Gallery Photo" : "Add Gallery Photo"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhotoModal} className="p-5 space-y-4">
              {/* Image Upload or URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Photo Image *
                </label>

                {/* Upload button */}
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200/50"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingImage ? "Uploading..." : "Upload from Device"}</span>
                  </button>
                  <span className="text-[11px] text-slate-400">or enter image path / URL below</span>
                </div>

                <input
                  type="text"
                  required
                  value={photoForm.imageUrl}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  placeholder="/images/infrastructure/... or https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono"
                />

                {uploadError && (
                  <p className="text-[11px] font-bold text-red-600 mt-1">{uploadError}</p>
                )}
              </div>

              {/* Thumbnail Preview */}
              {photoForm.imageUrl && (
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <img
                    src={photoForm.imageUrl}
                    alt="Preview"
                    className="w-20 h-14 object-cover rounded-lg border border-slate-200"
                    onError={(e) => {
                      (e.target as any).src = "https://placehold.co/100x70?text=Preview";
                    }}
                  />
                  <span className="text-[11px] text-slate-500 truncate flex-1">
                    {photoForm.imageUrl}
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Photo Caption
                </label>
                <input
                  type="text"
                  value={photoForm.caption || ""}
                  onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })}
                  placeholder="e.g. Annual Cultural Festivities & Dance"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={photoForm.category || "Events"}
                    onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                    placeholder="Cultural, Sports, Events..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={photoForm.displayOrder}
                    onChange={(e) =>
                      setPhotoForm({ ...photoForm, displayOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20"
                >
                  {editingPhotoIndex !== null ? "Update Photo" : "Add Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DELETE CONFIRMATION MODAL                                */}
      {/* ======================================================== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl p-5 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 text-red-600">
              <span className="p-2 rounded-xl bg-red-50">
                <Trash2 className="w-5 h-5" />
              </span>
              <h3 className="text-sm font-black text-slate-900">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to remove <strong>{deleteTarget.title}</strong>? Remember to click <strong>Save All Changes</strong> to persist.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteTarget.type === "video") {
                    handleDeleteVideo(deleteTarget.index);
                  } else {
                    handleDeletePhoto(deleteTarget.index);
                  }
                }}
                className="px-4 py-1.5 text-xs font-black bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md shadow-red-600/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
