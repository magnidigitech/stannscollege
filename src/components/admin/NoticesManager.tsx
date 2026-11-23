"use client";

import React, { useState, useEffect, useRef } from "react";

import {

  Bell,

  Plus,

  Search,

  Edit2,

  Trash2,

  ExternalLink,

  FileText,

  CheckCircle2,

  AlertTriangle,

  X,

  Sparkles,

  Calendar,

  Filter,

  RefreshCw,

  Mail,

  Tag,

  UploadCloud,

  Loader2,

  Eye,

  Link as LinkIcon,

  Image as ImageIcon,

} from "lucide-react";

export interface NoticeLink {

  _key?: string;

  title: string;

  url: string;

}

export interface NoticeDocument {

  _key?: string;

  title: string;

  url?: string;

  originalFilename?: string;

  assetId?: string;

  uploading?: boolean;

  fileType?: "pdf" | "image" | "file";

}

export interface NoticeItem {

  _id?: string;

  title: string;

  date?: string;

  category?: string;

  description?: string;

  linkUrl?: string;

  linkLabel?: string;

  links?: NoticeLink[];

  imageUrl?: string;

  imageAssetId?: string;

  pdfUrl?: string;

  pdfAssetId?: string;

  documents?: NoticeDocument[];

  isNew?: boolean;

  newUntil?: string;

  displayOrder?: number;

}

const CATEGORIES = [

  { label: "Admissions", value: "admissions" },

  { label: "Examinations & Timetables", value: "examinations" },

  { label: "Academic Announcements", value: "academic" },

  { label: "General Circulars", value: "general" },

  { label: "Student Support & Welfare", value: "student-support" },

  { label: "Placements & Training", value: "placements" },

];

function isNoticeNew(dateStr?: string, newUntil?: string, isNewFlag?: boolean): boolean {

  if (isNewFlag === false) return false;

  const now = Date.now();

  // 1. If explicit "newUntil" expiry date is specified
  if (newUntil && typeof newUntil === "string" && newUntil.trim() !== "") {

    const val = newUntil.trim();

    // Check if YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {

      const [year, month, day] = val.split("-").map(Number);

      const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999).getTime();

      return now <= endOfDay;

    }

    const t = Date.parse(val);

    if (!isNaN(t)) {

      const d = new Date(t);

      d.setHours(23, 59, 59, 999);

      return now <= d.getTime();

    }

  }

  // 2. Fallback: 2-week active period from publish date
  if (!dateStr) return false;

  let noticeTime = Date.parse(dateStr);

  if (isNaN(noticeTime)) {

    const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1").trim();

    noticeTime = Date.parse(cleaned);

  }

  if (isNaN(noticeTime)) {

    const parts = dateStr.match(/(\d{1,2})[-/ ]([A-Za-z]+|\d{1,2})[-/ ](\d{4})/);

    if (parts) {

      noticeTime = Date.parse(`${parts[2]} ${parts[1]}, ${parts[3]}`);

    }

  }

  if (isNaN(noticeTime)) return false;

  const diffMs = now - noticeTime;

  const twoWeeksMs = 14 * 24 * 60 * 60 * 1000;

  return diffMs <= twoWeeksMs && diffMs >= -twoWeeksMs;

}

// Client Starburst NEW Badge

const StarburstNewBadge = () => (

  <span className="relative inline-flex items-center justify-center shrink-0 w-5 h-5 select-none animate-pulse">

    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.18)]">

      <polygon

        points="50,0 61,24 85,15 79,40 100,50 79,60 85,85 61,76 50,100 39,76 15,85 21,60 0,50 21,40 15,15 39,24"

        fill="#FFE600"

        stroke="#EAB308"

        strokeWidth="3"

      />

    </svg>

    <span className="absolute font-black text-[6.5px] text-[#DC2626] tracking-tighter leading-none font-sans scale-90">

      NEW

    </span>

  </span>

);

export default function NoticesManager() {

  const [notices, setNotices] = useState<NoticeItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State for Add / Edit

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);

  const [saving, setSaving] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  const [uploadingNoticeImage, setUploadingNoticeImage] = useState(false);

  // Modal State for Delete Confirmation

  const [noticeToDelete, setNoticeToDelete] = useState<NoticeItem | null>(null);

  const [deleting, setDeleting] = useState(false);

  // Success Notification

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {

    setNotification(msg);

    setTimeout(() => setNotification(null), 4500);

  };

  // 1. Fetch Notices from API

  const fetchNotices = async () => {

    setLoading(true);

    setError(null);

    try {

      const res = await fetch("/api/admin/notices");

      const data = await res.json();

      if (data.success && Array.isArray(data.notices)) {

        setNotices(data.notices);

      } else {

        throw new Error(data.error || "Failed to load notices");

      }

    } catch (err: any) {

      setError(err.message || "Failed to load notices from Sanity");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchNotices();

  }, []);

  // Form State

  const [formData, setFormData] = useState<NoticeItem>({

    title: "",

    date: "",

    category: "general",

    description: "",

    links: [],

    documents: [],

    imageUrl: "",

    imageAssetId: "",

    isNew: true,

    newUntil: "",

    displayOrder: 1,

  });

  const handleOpenAdd = () => {

    setEditingNotice(null);

    const today = new Date();

    const months = [

      "January", "February", "March", "April", "May", "June",

      "July", "August", "September", "October", "November", "December"

    ];

    const dateFormatted = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

    setFormData({

      title: "",

      date: dateFormatted,

      category: "general",

      description: "",

      links: [{ title: "", url: "" }],

      documents: [],

      imageUrl: "",

      imageAssetId: "",

      isNew: true,

      newUntil: "",

      displayOrder: notices.length + 1,

    });

    setFormError(null);

    setIsModalOpen(true);

  };

  const handleOpenEdit = (n: NoticeItem) => {

    setEditingNotice(n);

    // Initial links setup

    let initialLinks: NoticeLink[] = [];

    if (Array.isArray(n.links) && n.links.length > 0) {

      initialLinks = n.links.map((l) => ({

        _key: l._key,

        title: l.title || "",

        url: l.url || "",

      }));

    } else if (n.linkUrl) {

      initialLinks = [{ title: n.linkLabel || "", url: n.linkUrl }];

    }

    // Initial documents setup

    let initialDocs: NoticeDocument[] = [];

    if (Array.isArray(n.documents) && n.documents.length > 0) {

      initialDocs = n.documents.map((d) => ({

        _key: d._key,

        title: d.title || "",

        url: d.url || "",

        originalFilename: d.originalFilename || "",

        assetId: d.assetId || "",

      }));

    } else if (n.pdfUrl) {

      initialDocs = [{

        title: "Official Circular (PDF)",

        url: n.pdfUrl,

        originalFilename: "Official_Circular.pdf",

        assetId: n.pdfAssetId || "",

      }];

    }

    setFormData({

      _id: n._id,

      title: n.title || "",

      date: n.date || "",

      category: n.category || "general",

      description: n.description || "",

      links: initialLinks,

      documents: initialDocs,

      imageUrl: n.imageUrl || "",

      imageAssetId: n.imageAssetId || "",

      isNew: n.isNew !== undefined ? n.isNew : true,

      newUntil: n.newUntil || "",

      displayOrder: n.displayOrder || 1,

    });

    setFormError(null);

    setIsModalOpen(true);

  };

  // ── Links Array Controls ──

  const handleAddLink = () => {

    setFormData((prev) => ({

      ...prev,

      links: [...(prev.links || []), { title: "", url: "" }],

    }));

  };

  const handleUpdateLink = (index: number, field: "title" | "url", value: string) => {

    setFormData((prev) => {

      const updated = [...(prev.links || [])];

      updated[index] = { ...updated[index], [field]: value };

      return { ...prev, links: updated };

    });

  };

  const handleRemoveLink = (index: number) => {

    setFormData((prev) => ({

      ...prev,

      links: (prev.links || []).filter((_, i) => i !== index),

    }));

  };

  // ── Documents Array Controls ──

  const handleAddDocument = () => {

    setFormData((prev) => ({

      ...prev,

      documents: [

        ...(prev.documents || []),

        { title: "", url: "", originalFilename: "", assetId: "", uploading: false },

      ],

    }));

  };

  const handleUpdateDocument = (index: number, field: "title" | "url", value: string) => {

    setFormData((prev) => {

      const updated = [...(prev.documents || [])];

      updated[index] = { ...updated[index], [field]: value };

      return { ...prev, documents: updated };

    });

  };

  const handleRemoveDocument = (index: number) => {

    setFormData((prev) => ({

      ...prev,

      documents: (prev.documents || []).filter((_, i) => i !== index),

    }));

  };

  const handleUploadNoticeImage = async (file: File) => {

    if (!file) return;

    setUploadingNoticeImage(true);

    try {

      const uploadForm = new FormData();

      uploadForm.append("file", file);

      uploadForm.append("type", "image");

      const res = await fetch("/api/admin/upload", {

        method: "POST",

        body: uploadForm,

      });

      const data = await res.json();

      if (!res.ok || !data.success) {

        throw new Error(data.error || "Failed to upload image to Sanity CDN.");

      }

      setFormData((prev) => ({

        ...prev,

        imageUrl: data.asset.url,

        imageAssetId: data.asset._id,

      }));

    } catch (err: any) {

      alert(`Image upload error: ${err.message || "Failed to upload image to Sanity."}`);

    } finally {

      setUploadingNoticeImage(false);

    }

  };

  const handleUploadDocumentFile = async (index: number, file: File) => {

    if (!file) return;

    setFormData((prev) => {

      const updated = [...(prev.documents || [])];

      updated[index] = { ...updated[index], uploading: true };

      return { ...prev, documents: updated };

    });

    try {

      const isImg = file.type.startsWith("image/") || /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name);

      const uploadForm = new FormData();

      uploadForm.append("file", file);

      uploadForm.append("type", isImg ? "image" : "file");

      const res = await fetch("/api/admin/upload", {

        method: "POST",

        body: uploadForm,

      });

      const data = await res.json();

      if (!res.ok || !data.success) {

        throw new Error(data.error || "Failed to upload file to Sanity.");

      }

      setFormData((prev) => {

        const updated = [...(prev.documents || [])];

        const currentDoc = updated[index];

        const defaultTitle = currentDoc.title?.trim()

          ? currentDoc.title

          : file.name.replace(/\.[^/.]+$/, "");

        updated[index] = {

          ...currentDoc,

          title: defaultTitle,

          url: data.asset.url,

          assetId: data.asset._id,

          originalFilename: data.asset.originalFilename || file.name,

          fileType: isImg ? "image" : "pdf",

          uploading: false,

        };

        return { ...prev, documents: updated };

      });

    } catch (err: any) {

      alert(`Upload error: ${err.message || "Failed to upload file to Sanity."}`);

      setFormData((prev) => {

        const updated = [...(prev.documents || [])];

        if (updated[index]) {

          updated[index] = { ...updated[index], uploading: false };

        }

        return { ...prev, documents: updated };

      });

    }

  };

  // ── Save Notice (Create or Update) ──

  const handleSave = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!formData.title.trim()) {

      setFormError("Please enter a notice title.");

      return;

    }

    setSaving(true);

    setFormError(null);

    try {

      // Filter out incomplete links

      const cleanLinks = (formData.links || []).filter(

        (l) => l.url && typeof l.url === "string" && l.url.trim() !== ""

      );

      // Filter out incomplete documents

      const cleanDocs = (formData.documents || []).filter(

        (d) => (d.url && d.url.trim() !== "") || d.assetId

      );

      const payload = {

        notice: {

          ...formData,

          _id: editingNotice?._id || undefined,

          links: cleanLinks,

          documents: cleanDocs,

          linkUrl: cleanLinks[0]?.url || "",

          linkLabel: cleanLinks[0]?.title || "",

          pdfUrl: cleanDocs[0]?.url || "",

          pdfAssetId: cleanDocs[0]?.assetId || "",

        },

      };

      const res = await fetch("/api/admin/notices", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(payload),

      });

      const data = await res.json();

      if (!res.ok || !data.success) {

        throw new Error(data.error || "Failed to save notice.");

      }

      showNotification(

        editingNotice

          ? "Notice updated successfully in Sanity!"

          : "New notice published successfully to Sanity!"

      );

      setIsModalOpen(false);

      fetchNotices();

    } catch (err: any) {

      setFormError(err.message || "An error occurred while saving.");

    } finally {

      setSaving(false);

    }

  };

  // ── Delete Notice ──

  const handleDelete = async () => {

    if (!noticeToDelete?._id) return;

    setDeleting(true);

    try {

      const res = await fetch(`/api/admin/notices?id=${encodeURIComponent(noticeToDelete._id)}`, {

        method: "DELETE",

      });

      const data = await res.json();

      if (!res.ok || !data.success) {

        throw new Error(data.error || "Failed to delete notice.");

      }

      showNotification("Notice deleted permanently from Sanity & the website.");

      setNoticeToDelete(null);

      fetchNotices();

    } catch (err: any) {

      alert(`Delete error: ${err.message || "Failed to delete notice"}`);

    } finally {

      setDeleting(false);

    }

  };

  // ── Filtered Notices List ──

  const filteredNotices = notices.filter((n) => {

    const q = searchQuery.toLowerCase();

    const matchesSearch =

      !q ||

      n.title?.toLowerCase().includes(q) ||

      n.description?.toLowerCase().includes(q);

    const matchesCategory =

      categoryFilter === "all" ||

      (n.category && n.category.toLowerCase() === categoryFilter.toLowerCase());

    return matchesSearch && matchesCategory;

  });

  const totalWithNewBadge = notices.filter((n) => isNoticeNew(n.date, n.newUntil, n.isNew)).length;

  const activeCategoriesCount = new Set(notices.map((n) => n.category).filter(Boolean)).size;

  return (

    <div className="space-y-6">

      {/* Toast Notification */}

      {notification && (

        <div className="bg-emerald-600 text-white py-3 px-5 rounded-2xl shadow-xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold animate-fadeIn">

          <div className="flex items-center gap-2">

            <CheckCircle2 className="w-5 h-5 text-emerald-200" />

            <span>{notification}</span>

          </div>

          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">

            <X className="w-4 h-4" />

          </button>

        </div>

      )}

      {/* Header Banner Card */}

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        <div>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">

            <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-md flex items-center gap-1.5">

              <Bell className="w-3.5 h-3.5 text-rose-600" />

              Live Website Notice Board

            </span>

          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">

            Notice Board &amp; Circulars Manager

          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">

            Publish official announcements, entrance counseling circulars, academic notifications, multiple web portal links, and downloadable PDF circulars with real-time sync to Sanity.

          </p>

        </div>

        <button

          type="button"

          onClick={handleOpenAdd}

          className="shrink-0 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"

        >

          <Plus className="w-4 h-4" />

          <span>Publish New Notice</span>

        </button>

      </div>

      {/* Controls Bar: Search & Category Filters */}

      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          <div className="relative w-full sm:w-96">

            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

            <input

              type="text"

              placeholder="Search circulars, admission allotments, exam schedules..."

              value={searchQuery}

              onChange={(e) => setSearchQuery(e.target.value)}

              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"

            />

          </div>

          <button

            type="button"

            onClick={fetchNotices}

            className="self-end sm:self-center px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"

            title="Refresh from Sanity"

          >

            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />

            <span>Sync</span>

          </button>

        </div>

        {/* Category Pills */}

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">

          <button

            type="button"

            onClick={() => setCategoryFilter("all")}

            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${

              categoryFilter === "all"

                ? "bg-[#002147] text-white shadow-xs"

                : "bg-slate-100 text-slate-600 hover:bg-slate-200"

            }`}

          >

            All Categories ({notices.length})

          </button>

          {CATEGORIES.map((cat) => {

            const count = notices.filter(

              (n) => n.category && n.category.toLowerCase() === cat.value.toLowerCase()

            ).length;

            return (

              <button

                key={cat.value}

                type="button"

                onClick={() => setCategoryFilter(cat.value)}

                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${

                  categoryFilter === cat.value

                    ? "bg-[#002147] text-white shadow-xs"

                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"

                }`}

              >

                {cat.label} ({count})

              </button>

            );

          })}

        </div>

      </div>

      {/* Notices List */}

      {loading ? (

        <div className="py-16 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-slate-200">

          <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />

          <p className="text-xs font-semibold text-slate-500">Loading notices from Sanity...</p>

        </div>

      ) : filteredNotices.length === 0 ? (

        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">

          <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />

          <h3 className="font-outfit text-base font-bold text-slate-700">No notices found</h3>

          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">

            {searchQuery

              ? `No circulars match "${searchQuery}". Clear your search query.`

              : "No notices have been published yet in this category."}

          </p>

        </div>

      ) : (

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm divide-y divide-slate-100 overflow-hidden">

          {filteredNotices.map((n, idx) => {

            const hasNewBadge = isNoticeNew(n.date, n.newUntil, n.isNew);

            const totalLinks = Array.isArray(n.links) && n.links.length > 0 ? n.links.length : (n.linkUrl ? 1 : 0);

            const totalDocs = Array.isArray(n.documents) && n.documents.length > 0 ? n.documents.length : (n.pdfUrl ? 1 : 0);

            return (

              <div

                key={n._id || idx}

                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group"

              >

                <div className="flex items-start gap-3.5 flex-1 min-w-0">

                  {/* Starburst badge preview */}

                  <div className="shrink-0 mt-0.5">

                    {hasNewBadge ? (

                      <StarburstNewBadge />

                    ) : (

                      <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-rose-600 transition-colors">

                        <Mail className="w-3.5 h-3.5" />

                      </div>

                    )}

                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex flex-wrap items-center gap-2 mb-1">

                      {n.date && (

                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">

                          <Calendar className="w-3 h-3 text-rose-600" />

                          {n.date}

                        </span>

                      )}

                      {n.category && (

                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md uppercase tracking-wider">

                          {n.category.replace(/-/g, " ")}

                        </span>

                      )}

                      {hasNewBadge ? (

                        <span className="text-[9px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">

                          ⚡ NEW Badge Active {n.newUntil ? `until ${n.newUntil}` : ""}

                        </span>

                      ) : n.newUntil ? (

                        <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">

                          Standard (Badge Expired)

                        </span>

                      ) : (

                        <span className="text-[9px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">

                          Standard Notice

                        </span>

                      )}

                    </div>

                    <h3 className="font-outfit text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-700 transition-colors leading-snug">

                      {n.title}

                    </h3>

                    {n.description && (

                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed whitespace-pre-line">

                        {n.description}

                      </p>

                    )}

                    {/* Metadata summary: Links & PDFs */}

                    <div className="mt-2.5 flex flex-wrap items-center gap-2">

                      {totalLinks > 0 && (

                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-md">

                          <ExternalLink className="w-3 h-3 text-sky-600" />

                          {totalLinks} Web {totalLinks === 1 ? "Link" : "Links"} Attached

                        </span>

                      )}

                      {totalDocs > 0 && (

                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-md">

                          <FileText className="w-3 h-3 text-rose-600" />

                          {totalDocs} Attached {totalDocs === 1 ? "Document" : "Documents"}

                        </span>

                      )}

                      {n.imageUrl && (

                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">

                          <ImageIcon className="w-3 h-3 text-emerald-600" />

                          Poster Attached

                        </span>

                      )}

                    </div>

                  </div>

                </div>

                {/* Right Action Buttons */}

                <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">

                  <button

                    type="button"

                    onClick={() => handleOpenEdit(n)}

                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"

                  >

                    <Edit2 className="w-3.5 h-3.5 text-indigo-600" />

                    <span>Edit</span>

                  </button>

                  <button

                    type="button"

                    onClick={() => setNoticeToDelete(n)}

                    className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200/60"

                  >

                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />

                    <span>Delete</span>

                  </button>

                </div>

              </div>

            );

          })}

        </div>

      )}

      {/* ── MODAL: ADD / EDIT NOTICE ── */}

      {isModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">

          <div className="absolute inset-0" onClick={() => !saving && setIsModalOpen(false)} />

          <div className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">

            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white">

              <div className="flex items-center gap-2.5">

                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">

                  <Bell className="w-4 h-4 text-rose-300" />

                </div>

                <div>

                  <h3 className="font-outfit text-base font-bold leading-tight">

                    {editingNotice ? "Edit Circular / Notice" : "Publish New Official Notice"}

                  </h3>

                  <p className="text-[11px] text-rose-200/80">

                    Saves directly to Sanity production dataset

                  </p>

                </div>

              </div>

              <button

                type="button"

                onClick={() => setIsModalOpen(false)}

                disabled={saving}

                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"

              >

                <X className="w-4 h-4" />

              </button>

            </div>

            {/* Modal Form Body */}

            <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto bg-slate-50/50">

              {formError && (

                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-2">

                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />

                  <span>{formError}</span>

                </div>

              )}

              {/* Title */}

              <div>

                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">

                  Notice Title <span className="text-rose-500">*</span>

                </label>

                <input

                  type="text"

                  required

                  placeholder="e.g. UG I Year – Phase I Seat Allotment"

                  value={formData.title}

                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}

                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"

                />

              </div>

              {/* Date, Category & NEW Badge Expiry */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                <div>

                  <label className="block text-[11px] font-bold text-slate-600 mb-1">

                    Publishing Date (e.g. 7 September 2026)

                  </label>

                  <input

                    type="text"

                    required

                    placeholder="7 September 2026"

                    value={formData.date}

                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}

                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"

                  />

                  <p className="text-[10px] text-slate-400 mt-1">

                    Notice display date.

                  </p>

                </div>

                <div>

                  <label className="block text-[11px] font-bold text-slate-600 mb-1">

                    Category

                  </label>

                  <select

                    value={formData.category}

                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}

                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"

                  >

                    {CATEGORIES.map((cat) => (

                      <option key={cat.value} value={cat.value}>

                        {cat.label}

                      </option>

                    ))}

                  </select>

                  <p className="text-[10px] text-slate-400 mt-1">

                    Filter category.

                  </p>

                </div>

                <div>

                  <div className="flex items-center justify-between mb-1">

                    <label className="block text-[11px] font-bold text-amber-900 flex items-center gap-1">

                      <Sparkles className="w-3 h-3 text-amber-600" />

                      &ldquo;NEW&rdquo; Badge Active Until

                    </label>

                    {formData.newUntil && (

                      <button

                        type="button"

                        onClick={() => setFormData({ ...formData, newUntil: "" })}

                        className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"

                      >

                        Clear

                      </button>

                    )}

                  </div>

                  <input

                    type="date"

                    value={formData.newUntil || ""}

                    onChange={(e) => setFormData({ ...formData, newUntil: e.target.value })}

                    className="w-full px-3 py-2 bg-amber-50/50 rounded-xl border border-amber-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:border-amber-400"

                  />

                  <p className="text-[10px] text-amber-800/80 mt-1">

                    Shows &ldquo;NEW&rdquo; till this date, then becomes normal.

                  </p>

                </div>

              </div>

              {/* Description */}

              <div>

                <label className="block text-[11px] font-bold text-slate-600 mb-1">

                  Official Announcement / Description

                </label>

                <textarea

                  rows={4}

                  placeholder="Enter full notice instructions, registration deadlines, counseling steps, and guidelines..."

                  value={formData.description}

                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}

                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] leading-relaxed"

                />

              </div>

              {/* ── NOTICE POSTER / CIRCULAR FLYER IMAGE (OPTION C) ── */}

              <div className="p-4 bg-white rounded-2xl border border-emerald-200/90 shadow-2xs space-y-3">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2 text-xs font-black text-emerald-950 uppercase tracking-wider">

                    <ImageIcon className="w-4 h-4 text-emerald-600" />

                    <span>Notice Poster / Circular Flyer Image</span>

                    <span className="text-[10px] font-bold text-emerald-600 lowercase tracking-normal">(optional)</span>

                  </div>

                  {formData.imageUrl && (

                    <button

                      type="button"

                      onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "", imageAssetId: "" }))}

                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"

                    >

                      <Trash2 className="w-3.5 h-3.5" />

                      <span>Remove Image</span>

                    </button>

                  )}

                </div>

                <p className="text-[11px] text-slate-500">

                  Upload a notice flyer, circular scan, or announcement banner (PNG, JPG, WebP) to display directly in the notice popup modal.

                </p>

                {formData.imageUrl ? (

                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center gap-3">

                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-emerald-200 bg-white shrink-0 shadow-xs">

                      <img

                        src={formData.imageUrl}

                        alt="Notice Poster Flyer"

                        className="w-full h-full object-cover"

                      />

                    </div>

                    <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800">

                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />

                        Poster Image Attached to Notice

                      </span>

                      <p className="text-[11px] text-slate-500 truncate font-mono">

                        {formData.imageUrl}

                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">

                        <label className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors">

                          <UploadCloud className="w-3.5 h-3.5" />

                          <span>Replace Poster</span>

                          <input

                            type="file"

                            accept="image/*"

                            className="hidden"

                            disabled={uploadingNoticeImage}

                            onChange={(e) => {

                              const file = e.target.files?.[0];

                              if (file) handleUploadNoticeImage(file);

                            }}

                          />

                        </label>

                        <a

                          href={formData.imageUrl}

                          target="_blank"

                          rel="noopener noreferrer"

                          className="px-3 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-1 hover:bg-emerald-50 transition-colors"

                        >

                          <Eye className="w-3.5 h-3.5" />

                          <span>Preview Full</span>

                        </a>

                      </div>

                    </div>

                  </div>

                ) : (

                  <div className="p-5 border border-dashed border-emerald-200 rounded-xl bg-emerald-50/30 text-center">

                    {uploadingNoticeImage ? (

                      <div className="flex flex-col items-center justify-center gap-2">

                        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />

                        <span className="text-xs font-bold text-emerald-700">Uploading Image to Sanity CDN...</span>

                      </div>

                    ) : (

                      <>

                        <ImageIcon className="w-8 h-8 text-emerald-400 mx-auto mb-1.5" />

                        <p className="text-xs text-emerald-900 font-semibold mb-2">No poster image uploaded yet</p>

                        <label className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5">

                          <UploadCloud className="w-3.5 h-3.5" />

                          <span>Upload Flyer / Poster Image</span>

                          <input

                            type="file"

                            accept="image/*"

                            className="hidden"

                            disabled={uploadingNoticeImage}

                            onChange={(e) => {

                              const file = e.target.files?.[0];

                              if (file) handleUploadNoticeImage(file);

                            }}

                          />

                        </label>

                      </>

                    )}

                  </div>

                )}

              </div>

              {/* ── SECTION 1: EXTERNAL WEB LINKS & PORTALS (MULTIPLE WITH ADD BUTTON) ── */}

              <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2 text-xs font-black text-sky-950 uppercase tracking-wider">

                    <ExternalLink className="w-4 h-4 text-sky-600" />

                    <span>External Web Links &amp; Portals</span>

                    <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">

                      {formData.links?.length || 0}

                    </span>

                  </div>

                  <button

                    type="button"

                    onClick={handleAddLink}

                    className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"

                  >

                    <Plus className="w-3.5 h-3.5" />

                    <span>Add Link</span>

                  </button>

                </div>

                <p className="text-[11px] text-slate-500">

                  Add direct links to government portals (APCFSS, AP ICET, Nypunyam, JNTUK, etc.) or application forms.

                </p>

                {(!formData.links || formData.links.length === 0) ? (

                  <div className="p-4 border border-dashed border-sky-200 rounded-xl bg-sky-50/40 text-center">

                    <p className="text-xs text-sky-700 font-semibold mb-2">No web links added yet</p>

                    <button

                      type="button"

                      onClick={handleAddLink}

                      className="px-3 py-1 rounded-lg bg-white border border-sky-300 text-sky-800 text-xs font-bold hover:bg-sky-50 transition-colors cursor-pointer"

                    >

                      + Add Portal Link

                    </button>

                  </div>

                ) : (

                  <div className="space-y-2.5">

                    {formData.links.map((link, idx) => (

                      <div

                        key={idx}

                        className="p-3 bg-slate-50/90 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 transition-all group"

                      >

                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 sm:w-16 shrink-0">

                          <LinkIcon className="w-3.5 h-3.5 text-sky-600" />

                          <span>Link #{idx + 1}</span>

                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">

                          <input

                            type="text"

                            placeholder="Button Label (e.g. APCFSS Portal)"

                            value={link.title || ""}

                            onChange={(e) => handleUpdateLink(idx, "title", e.target.value)}

                            className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-medium focus:ring-1 focus:ring-sky-500 focus:border-sky-500"

                          />

                          <input

                            type="url"

                            placeholder="URL (https://cap.apcfss.in)"

                            value={link.url}

                            onChange={(e) => handleUpdateLink(idx, "url", e.target.value)}

                            className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-medium font-mono focus:ring-1 focus:ring-sky-500 focus:border-sky-500"

                          />

                        </div>

                        {link.url && (

                          <a

                            href={link.url}

                            target="_blank"

                            rel="noopener noreferrer"

                            className="p-1.5 text-sky-600 hover:text-sky-800 shrink-0"

                            title="Test Link"

                          >

                            <ExternalLink className="w-4 h-4" />

                          </a>

                        )}

                        <button

                          type="button"

                          onClick={() => handleRemoveLink(idx)}

                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors shrink-0 cursor-pointer"

                          title="Remove Link"

                        >

                          <Trash2 className="w-4 h-4" />

                        </button>

                      </div>

                    ))}

                  </div>

                )}

              </div>

              {/* ── SECTION 2: OFFICIAL DOCUMENTS, CIRCULARS & IMAGES (MULTIPLE WITH ADD BUTTON & UPLOAD) ── */}

              <div className="p-4 bg-white rounded-2xl border border-rose-200/80 shadow-2xs space-y-3">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2 text-xs font-black text-rose-950 uppercase tracking-wider">

                    <FileText className="w-4 h-4 text-rose-600" />

                    <span>Official Documents, Circulars &amp; Images</span>

                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">

                      {formData.documents?.length || 0}

                    </span>

                  </div>

                  <button

                    type="button"

                    onClick={handleAddDocument}

                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"

                  >

                    <Plus className="w-3.5 h-3.5" />

                    <span>Add Attachment</span>

                  </button>

                </div>

                <p className="text-[11px] text-slate-500">

                  Upload official circular PDFs or image attachments (timetables, guidelines, flyers) directly to Sanity CDN or provide a direct document link.

                </p>

                {(!formData.documents || formData.documents.length === 0) ? (

                  <div className="p-5 border border-dashed border-rose-200 rounded-xl bg-rose-50/30 text-center">

                    <FileText className="w-8 h-8 text-rose-300 mx-auto mb-1.5" />

                    <p className="text-xs text-rose-800 font-semibold mb-2">No documents or circular attachments yet</p>

                    <button

                      type="button"

                      onClick={handleAddDocument}

                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"

                    >

                      <Plus className="w-3.5 h-3.5" />

                      <span>Attach PDF / Image</span>

                    </button>

                  </div>

                ) : (

                  <div className="space-y-3">

                    {formData.documents.map((doc, idx) => {

                      const isDocImg = doc.fileType === "image" || /\.(jpe?g|png|webp|gif|svg)$/i.test(doc.url || doc.originalFilename || "");

                      return (

                        <div

                          key={idx}

                          className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2.5 transition-all"

                        >

                          {/* Top row: Title and Remove */}

                          <div className="flex items-center justify-between gap-2">

                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">

                              <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-black flex items-center justify-center shrink-0">

                                {idx + 1}

                              </span>

                              <span>Attachment Title</span>

                              {isDocImg && (

                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">

                                  Image

                                </span>

                              )}

                            </div>

                            <button

                              type="button"

                              onClick={() => handleRemoveDocument(idx)}

                              className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"

                              title="Remove Attachment"

                            >

                              <Trash2 className="w-4 h-4" />

                            </button>

                          </div>

                          <input

                            type="text"

                            placeholder="e.g. Official Seat Allotment Guidelines or Timetable Image"

                            value={doc.title || ""}

                            onChange={(e) => handleUpdateDocument(idx, "title", e.target.value)}

                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-semibold focus:ring-1 focus:ring-rose-500 focus:border-rose-500"

                          />

                          {/* File upload trigger and status */}

                          <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">

                            <div className="flex items-center gap-2.5 min-w-0">

                              {doc.uploading ? (

                                <div className="flex items-center gap-2 text-xs font-bold text-rose-600">

                                  <Loader2 className="w-4 h-4 animate-spin text-rose-600" />

                                  <span>Uploading to Sanity CDN...</span>

                                </div>

                              ) : doc.url ? (

                                <div className="flex items-center gap-2 min-w-0">

                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />

                                  <div className="min-w-0">

                                    <p className="text-xs font-bold text-slate-800 truncate">

                                      {doc.originalFilename || "Sanity Document Attached"}

                                    </p>

                                    <a

                                      href={doc.url}

                                      target="_blank"

                                      rel="noopener noreferrer"

                                      className="text-[11px] text-rose-600 hover:underline inline-flex items-center gap-1 font-medium"

                                    >

                                      <Eye className="w-3 h-3" />

                                      <span>{isDocImg ? "Preview Attached Image" : "Preview Attached PDF"}</span>

                                    </a>

                                  </div>

                                </div>

                              ) : (

                                <div className="flex items-center gap-2 text-xs text-slate-500">

                                  <FileText className="w-4 h-4 text-slate-400" />

                                  <span>No file uploaded yet</span>

                                </div>

                              )}

                            </div>

                            {/* File input button */}

                            <div className="shrink-0 flex items-center gap-2">

                              <label className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors">

                                <UploadCloud className="w-3.5 h-3.5 text-rose-600" />

                                <span>{doc.url ? "Replace File" : "Upload File / Image"}</span>

                                <input

                                  type="file"

                                  accept=".pdf,application/pdf,image/*,.jpg,.jpeg,.png,.webp"

                                  className="hidden"

                                  disabled={doc.uploading}

                                  onChange={(e) => {

                                    const file = e.target.files?.[0];

                                    if (file) {

                                      handleUploadDocumentFile(idx, file);

                                    }

                                  }}

                                />

                              </label>

                            </div>

                          </div>

                          {/* Direct Document / PDF URL alternative */}

                          <div>

                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">

                              Or Enter Direct URL (Optional)

                            </label>

                            <input

                              type="url"

                              placeholder="https://.../notice.pdf"

                              value={doc.url || ""}

                              onChange={(e) => handleUpdateDocument(idx, "url", e.target.value)}

                              className="w-full px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-600 focus:ring-1 focus:ring-rose-500 focus:border-rose-500"

                            />

                          </div>

                        </div>

                      );

                    })}

                  </div>

                )}

              </div>

              {/* Modal Footer Actions */}

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">

                <button

                  type="button"

                  onClick={() => setIsModalOpen(false)}

                  disabled={saving}

                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"

                >

                  Cancel

                </button>

                <button

                  type="submit"

                  disabled={saving}

                  className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"

                >

                  {saving ? (

                    <>

                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                      <span>Publishing to Sanity...</span>

                    </>

                  ) : (

                    <span>{editingNotice ? "Update Notice" : "Publish Notice"}</span>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ── MODAL: DELETE CONFIRMATION ── */}

      {noticeToDelete && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">

          <div className="absolute inset-0" onClick={() => !deleting && setNoticeToDelete(null)} />

          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 animate-scaleUp">

            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 mx-auto">

              <Trash2 className="w-6 h-6 text-rose-600" />

            </div>

            <h3 className="text-base font-bold text-slate-900 text-center">

              Delete this Notice?

            </h3>

            <p className="text-xs text-slate-500 text-center mt-2 leading-relaxed">

              Are you sure you want to delete <span className="font-bold text-slate-800">&ldquo;{noticeToDelete.title}&rdquo;</span>?

              This action will permanently delete the notice from Sanity and remove it from the live website.

            </p>

            <div className="mt-6 flex items-center justify-center gap-3">

              <button

                type="button"

                onClick={() => setNoticeToDelete(null)}

                disabled={deleting}

                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"

              >

                Cancel

              </button>

              <button

                type="button"

                onClick={handleDelete}

                disabled={deleting}

                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"

              >

                {deleting ? (

                  <>

                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                    <span>Deleting...</span>

                  </>

                ) : (

                  <span>Yes, Delete Notice</span>

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

