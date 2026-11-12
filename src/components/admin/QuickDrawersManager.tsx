"use client";



import React, { useState, useEffect, useRef } from "react";

import {

  Newspaper,

  BookOpen,

  ShieldCheck,

  FileSpreadsheet,

  Compass,

  GraduationCap,

  Plus,

  Eye,

  Download,

  Trash2,

  Edit,

  UploadCloud,

  FileText,

  Calendar,

  Layers,

  Sparkles,

  ExternalLink,

  Search,

  Filter,

  Check,

  X,

  Loader2,

  AlertCircle,

  RefreshCw,

  FolderDown,

  Info

} from "lucide-react";

import Link from "next/link";

import { FilePreviewModal } from "@/components/ui/FilePreviewModal";



type DrawerTab = "newsletters" | "magazines" | "handbooks" | "brochures" | "prospectus";



export interface QuickDrawersManagerProps {

  initialTab?: DrawerTab;

  currentTab?: DrawerTab;

  onTabChange?: (tab: DrawerTab) => void;

}



const TAB_INFO: Record<DrawerTab, { title: string; subtitle: string; icon: any }> = {

  newsletters: {

    title: "Newsletters (The Chronicle)",

    subtitle: "Manage and upload circular newsletters for the right-notch quick drawer.",

    icon: Newspaper,

  },

  magazines: {

    title: "College Magazines (Annite)",

    subtitle: "Manage annual student magazines and literary publications.",

    icon: BookOpen,

  },

  handbooks: {

    title: "Student Handbook (Code of Conduct)",

    subtitle: "Manage institutional conduct guidelines, academic regulations, and student rules.",

    icon: ShieldCheck,

  },

  brochures: {

    title: "Brochures & Course Flyers",

    subtitle: "Manage promotional brochures, department flyers, and program information pamphlets.",

    icon: FileSpreadsheet,

  },

  prospectus: {

    title: "Admissions Prospectus",

    subtitle: "Manage official college admissions prospectus and statutory charters.",

    icon: Compass,

  },

};



export function QuickDrawersManager({

  initialTab = "newsletters",

  currentTab,

  onTabChange,

}: QuickDrawersManagerProps = {}) {

  const [activeTab, setActiveTab] = useState<DrawerTab>(currentTab || initialTab || "newsletters");



  useEffect(() => {

    if (currentTab && currentTab !== activeTab) {

      setActiveTab(currentTab);

    }

  }, [currentTab]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);



  // Collections data

  const [newsletters, setNewsletters] = useState<any[]>([]);

  const [magazines, setMagazines] = useState<any[]>([]);

  const [handbooks, setHandbooks] = useState<any[]>([]);

  const [brochures, setBrochures] = useState<any[]>([]);

  const [prospectus, setProspectus] = useState<any[]>([]);



  // Search & Filter

  const [searchQuery, setSearchQuery] = useState("");

  const [yearFilter, setYearFilter] = useState("ALL");



  // Preview Modal

  const [previewModalFile, setPreviewModalFile] = useState<{ url: string; title: string } | null>(null);



  // Add / Edit Modal state

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const [editingItem, setEditingItem] = useState<any | null>(null);

  const [isSaving, setIsSaving] = useState(false);



  // Form state

  const [formData, setFormData] = useState<any>({

    title: "",

    subtitle: "",

    academicYear: "2025-2026",

    month: "June",

    category: "College",

    description: "",

    displayOrder: 1,

    order: 1,

    isCurrent: true,

    fileUrl: "",

    coverUrl: "",

    assetId: "",

    pdfAssetId: "",

    coverAssetId: "",

    fileAssetId: "",

    isImage: false,

  });



  // File Upload state

  const [uploadingPdf, setUploadingPdf] = useState(false);

  const [uploadingCover, setUploadingCover] = useState(false);

  const pdfInputRef = useRef<HTMLInputElement>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);



  // Delete Modal state

  const [deleteModalItem, setDeleteModalItem] = useState<any | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);



  // Fetch all drawer data from API

  const fetchData = async () => {

    try {

      setRefreshing(true);

      setErrorMessage(null);

      const res = await fetch("/api/admin/quick-drawers");

      const json = await res.json();

      if (json.success) {

        setNewsletters(json.newsletters || []);

        setMagazines(json.magazines || []);

        setHandbooks(json.handbooks || []);

        setBrochures(json.brochures || []);

        setProspectus(json.prospectus || []);

      } else {

        setErrorMessage(json.error || "Failed to load drawer publications.");

      }

    } catch (err: any) {

      console.error("Error fetching quick drawers:", err);

      setErrorMessage("Network error while connecting to quick-drawers API.");

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  };



  useEffect(() => {

    fetchData();

  }, []);



  // Handle PDF file upload to Sanity asset pipeline

  const handlePdfUpload = async (file: File) => {

    try {

      setUploadingPdf(true);

      const data = new FormData();

      data.append("file", file);

      data.append("type", "file");



      const res = await fetch("/api/admin/upload", {

        method: "POST",

        body: data,

      });

      const json = await res.json();



      if (json.success && json.asset) {

        setFormData((prev: any) => ({

          ...prev,

          fileUrl: json.asset.url,

          pdfUrl: json.asset.url,

          assetId: json.asset._id,

          pdfAssetId: json.asset._id,

          fileAssetId: json.asset._id,

        }));

      } else {

        alert(json.error || "Failed to upload document file.");

      }

    } catch (err) {

      console.error("Upload error:", err);

      alert("Failed to upload document file.");

    } finally {

      setUploadingPdf(false);

    }

  };



  // Handle Cover Image file upload to Sanity

  const handleCoverUpload = async (file: File) => {

    try {

      setUploadingCover(true);

      const data = new FormData();

      data.append("file", file);

      data.append("type", "image");



      const res = await fetch("/api/admin/upload", {

        method: "POST",

        body: data,

      });

      const json = await res.json();



      if (json.success && json.asset) {

        setFormData((prev: any) => ({

          ...prev,

          coverUrl: json.asset.url,

          coverAssetId: json.asset._id,

        }));

      } else {

        alert(json.error || "Failed to upload cover image.");

      }

    } catch (err) {

      console.error("Upload error:", err);

      alert("Failed to upload cover image.");

    } finally {

      setUploadingCover(false);

    }

  };



  // Open Modal for Add

  const handleOpenAdd = () => {

    setModalMode("add");

    setEditingItem(null);

    setFormData({

      title: "",

      subtitle: "",

      academicYear: "2025-2026",

      month: "June",

      category: "College",

      description: "",

      displayOrder: 1,

      order: 1,

      isCurrent: true,

      fileUrl: "",

      coverUrl: "",

      assetId: "",

      pdfAssetId: "",

      coverAssetId: "",

      fileAssetId: "",

      isImage: false,

    });

    setIsModalOpen(true);

  };



  // Open Modal for Edit

  const handleOpenEdit = (item: any) => {

    setModalMode("edit");

    setEditingItem(item);

    setFormData({

      ...item,

      academicYear: item.academicYear || item.year || "2025-2026",

      fileUrl: item.fileUrl || item.pdfUrl || "",

      coverUrl: item.coverUrl || "",

    });

    setIsModalOpen(true);

  };



  // Save (Create or Update)

  const handleSave = async (e: React.FormEvent) => {

    e.preventDefault();

    setIsSaving(true);

    setErrorMessage(null);



    let categoryMap: Record<DrawerTab, string> = {

      newsletters: "newsletter",

      magazines: "collegeMagazine",

      handbooks: "studentHandbook",

      brochures: "collegeBrochure",

      prospectus: "collegeProspectus",

    };

    const category = categoryMap[activeTab];



    try {

      const isEdit = modalMode === "edit" && editingItem?._id;

      const method = isEdit ? "PUT" : "POST";

      const payload = {

        category,

        item: {

          ...formData,

          ...(isEdit && { _id: editingItem._id }),

        },

      };



      const res = await fetch("/api/admin/quick-drawers", {

        method,

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(payload),

      });

      const json = await res.json();



      if (json.success) {

        setIsModalOpen(false);

        setSuccessMessage(

          isEdit ? "Document updated successfully in Sanity." : "New publication added successfully to Sanity."

        );

        setTimeout(() => setSuccessMessage(null), 4000);

        await fetchData();

      } else {

        alert(json.error || "Failed to save document.");

      }

    } catch (err: any) {

      console.error("Save error:", err);

      alert("Error saving document to Sanity.");

    } finally {

      setIsSaving(false);

    }

  };



  // Delete Document

  const handleDelete = async () => {

    if (!deleteModalItem?._id) return;

    try {

      setIsDeleting(true);

      const res = await fetch(`/api/admin/quick-drawers?id=${encodeURIComponent(deleteModalItem._id)}`, {

        method: "DELETE",

      });

      const json = await res.json();



      if (json.success) {

        setDeleteModalItem(null);

        setSuccessMessage("Document deleted from Sanity.");

        setTimeout(() => setSuccessMessage(null), 4000);

        await fetchData();

      } else {

        alert(json.error || "Failed to delete document.");

      }

    } catch (err) {

      console.error("Delete error:", err);

      alert("Failed to delete document.");

    } finally {

      setIsDeleting(false);

    }

  };



  // Active items list based on selected tab

  const getActiveItems = () => {

    if (activeTab === "newsletters") return newsletters;

    if (activeTab === "magazines") return magazines;

    if (activeTab === "handbooks") return handbooks;

    if (activeTab === "brochures") return brochures;

    if (activeTab === "prospectus") return prospectus;

    return [];

  };



  const activeItems = getActiveItems();



  // Unique years for filtering

  const uniqueYears = Array.from(

    new Set(activeItems.map((item) => item.academicYear || item.year))

  ).filter(Boolean) as string[];



  // Filtered items

  const filteredItems = activeItems.filter((item) => {

    const itemYear = item.academicYear || item.year || "";

    const matchesYear = yearFilter === "ALL" || itemYear === yearFilter;

    const matchesQuery =

      searchQuery.trim() === "" ||

      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||

      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||

      (item.month && item.month.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesYear && matchesQuery;

  });



  return (

    <div className="space-y-6">

      {/* Overview Card */}

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        <div>

          <div className="flex items-center gap-2">

            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px] uppercase tracking-wider">

              Homepage Right Notch Shortcuts

            </span>

            <span className="text-xs font-semibold text-slate-500">• 6 Quick-Access Drawers</span>

          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">

            Quick-Access Drawers &amp; Publications Manager

          </h2>

          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">

            Manage, upload, and update the downloadable publications, official circular newsletters, college magazines, student code of conduct handbooks, and admissions prospectus displayed in the homepage floating right drawer tabs.

          </p>

        </div>



        <div className="flex items-center gap-3 shrink-0">

          <button

            type="button"

            onClick={fetchData}

            disabled={refreshing}

            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-200"

          >

            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />

            <span>Reload</span>

          </button>



          <button

            type="button"

            onClick={handleOpenAdd}

            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold transition-all shadow-md cursor-pointer"

          >

            <Plus className="w-4 h-4" />

            <span>Add New Document</span>

          </button>

        </div>

      </div>



      {/* Success / Error Banners */}

      {successMessage && (

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fadeIn">

          <Check className="w-4 h-4 text-emerald-600 shrink-0" />

          <span>{successMessage}</span>

        </div>

      )}

      {errorMessage && (

        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs font-bold animate-fadeIn">

          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />

          <span>{errorMessage}</span>

        </div>

      )}



      {/* Filter & Search Bar */}

      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">

        <div className="relative flex-1 sm:max-w-md">

          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input

            type="text"

            placeholder="Search by title, month, or keyword..."

            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}

            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"

          />

        </div>



        <div className="flex items-center gap-3">

          <div className="flex items-center gap-1.5">

            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="text-xs font-semibold text-slate-500">Academic Year:</span>

            <select

              value={yearFilter}

              onChange={(e) => setYearFilter(e.target.value)}

              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"

            >

              <option value="ALL">All Academic Years</option>

              {uniqueYears.map((yr) => (

                <option key={yr} value={yr}>

                  {yr}

                </option>

              ))}

            </select>

          </div>



          <span className="text-xs font-bold text-slate-400">

            {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"}

          </span>

        </div>

      </div>



      {/* Items Grid */}

      {loading ? (

        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">

          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />

          <p className="text-xs text-slate-500 font-medium mt-2">Loading documents from Sanity...</p>

        </div>

      ) : filteredItems.length === 0 ? (

        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">

          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">

            <FileText className="w-6 h-6" />

          </div>

          <h3 className="font-bold text-sm text-slate-800">No documents found</h3>

          <p className="text-xs text-slate-500 max-w-sm mx-auto">

            {searchQuery || yearFilter !== "ALL"

              ? "No items match your active search filter. Try clearing filters."

              : "No documents currently in this category. Click 'Add New Document' above to upload one."}

          </p>

        </div>

      ) : (

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-left border-collapse text-xs sm:text-sm">

              <thead>

                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-black uppercase tracking-wider text-slate-500">

                  <th className="py-3.5 px-4 text-center w-14">S.No</th>

                  <th className="py-3.5 px-6">Document Title &amp; Details</th>

                  <th className="py-3.5 px-4 text-center">Academic Year / Month</th>

                  <th className="py-3.5 px-4 text-center">Edition</th>

                  <th className="py-3.5 px-4 text-center">PDF File / Test</th>

                  <th className="py-3.5 px-4 text-center w-36">Actions</th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredItems.map((item, idx) => {

                  const fileUrl = item.fileUrl || item.pdfUrl || "";

                  const coverUrl = item.coverUrl || "";

                  const year = item.academicYear || item.year || "2025-2026";



                  return (

                    <tr key={item._id || idx} className="hover:bg-slate-50/80 transition-colors">

                      <td className="py-3.5 px-4 text-center font-bold text-slate-400">

                        {idx + 1}

                      </td>

                      <td className="py-3.5 px-6">

                        <div className="flex items-center gap-3">

                          {coverUrl && (

                            <img

                              src={coverUrl}

                              alt={item.title || "Cover"}

                              className="w-10 h-13 object-cover rounded-lg border border-slate-200 shadow-2xs shrink-0"

                            />

                          )}

                          <div className="flex flex-col min-w-0">

                            <span className="font-outfit font-black text-slate-900 text-sm leading-snug">

                              {item.title || "Untitled Document"}

                            </span>

                            {item.subtitle && (

                              <span className="text-xs text-slate-500 font-medium">

                                {item.subtitle}

                              </span>

                            )}

                            {item.description && (

                              <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">

                                {item.description}

                              </span>

                            )}

                          </div>

                        </div>

                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">

                        <div className="inline-flex flex-col items-center gap-0.5">

                          <span className="text-xs font-bold text-[#002147]">

                            {year}

                          </span>

                          {item.month && (

                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">

                              {item.month}

                            </span>

                          )}

                        </div>

                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">

                        {item.isCurrent ? (

                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200 px-2.5 py-0.5 rounded-md">

                            Current Edition

                          </span>

                        ) : (

                          <span className="text-[10px] text-slate-400 font-semibold">

                            Archive Edition

                          </span>

                        )}

                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">

                        {fileUrl ? (

                          <div className="flex items-center justify-center gap-1.5">

                            <button

                              type="button"

                              onClick={() => setPreviewModalFile({ url: fileUrl, title: item.title || "Document" })}

                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#002147] font-bold text-xs transition-colors cursor-pointer"

                            >

                              <Eye className="w-3.5 h-3.5" />

                              <span>View PDF</span>

                            </button>

                            <a

                              href={fileUrl}

                              download

                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"

                              title="Download PDF"

                            >

                              <Download className="w-3.5 h-3.5" />

                            </a>

                          </div>

                        ) : (

                          <span className="text-xs text-amber-600 font-semibold">No PDF Attached</span>

                        )}

                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">

                        <div className="flex items-center justify-center gap-1">

                          <button

                            type="button"

                            onClick={() => handleOpenEdit(item)}

                            className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"

                            title="Edit Details"

                          >

                            <Edit className="w-3.5 h-3.5" />

                          </button>

                          <button

                            type="button"

                            onClick={() => setDeleteModalItem(item)}

                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"

                            title="Delete from Sanity"

                          >

                            <Trash2 className="w-3.5 h-3.5" />

                          </button>

                        </div>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        </div>

      )}



      {/* Add / Edit Modal */}

      {isModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">

          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">

            <div className="px-6 py-4 bg-[#002147] text-white flex items-center justify-between">

              <div className="flex items-center gap-2.5">

                <FileText className="w-5 h-5 text-amber-300" />

                <h3 className="font-bold text-base">

                  {modalMode === "add" ? "Add New Document" : "Edit Document Details"}

                </h3>

              </div>

              <button

                type="button"

                onClick={() => setIsModalOpen(false)}

                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"

              >

                <X className="w-4 h-4" />

              </button>

            </div>



            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">

              <div>

                <label className="text-xs font-bold text-slate-700 block mb-1">

                  Document Title *

                </label>

                <input

                  type="text"

                  required

                  placeholder="e.g. The St. Ann's Chronicle - October 2024"

                  value={formData.title}

                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}

                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:bg-white"

                />

              </div>



              {activeTab === "brochures" && (

                <div>

                  <label className="text-xs font-bold text-slate-700 block mb-1">

                    Subtitle / Tagline

                  </label>

                  <input

                    type="text"

                    placeholder="e.g. Campus Infrastructure & Facilities"

                    value={formData.subtitle || ""}

                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}

                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:bg-white"

                  />

                </div>

              )}



              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="text-xs font-bold text-slate-700 block mb-1">

                    Academic Year *

                  </label>

                  <input

                    type="text"

                    required

                    placeholder="2025-2026"

                    value={formData.academicYear || formData.year || ""}

                    onChange={(e) =>

                      setFormData({ ...formData, academicYear: e.target.value, year: e.target.value })

                    }

                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:bg-white"

                  />

                </div>



                {activeTab === "newsletters" && (

                  <div>

                    <label className="text-xs font-bold text-slate-700 block mb-1">

                      Publication Month *

                    </label>

                    <select

                      value={formData.month || "June"}

                      onChange={(e) => setFormData({ ...formData, month: e.target.value })}

                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"

                    >

                      {[

                        "June", "July", "August", "September", "October", "November",

                        "December", "January", "February", "March", "April", "May"

                      ].map((m) => (

                        <option key={m} value={m}>{m}</option>

                      ))}

                    </select>

                  </div>

                )}



                <div>

                  <label className="text-xs font-bold text-slate-700 block mb-1">

                    Display Sorting Order

                  </label>

                  <input

                    type="number"

                    value={formData.displayOrder || formData.order || 1}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        displayOrder: Number(e.target.value),

                        order: Number(e.target.value),

                      })

                    }

                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:bg-white"

                  />

                </div>

              </div>



              {/* PDF Document Upload */}

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">

                <label className="text-xs font-bold text-slate-700 block">

                  PDF / Document Attachment

                </label>

                <div className="flex items-center gap-3">

                  <input

                    type="file"

                    ref={pdfInputRef}

                    accept=".pdf,.doc,.docx"

                    className="hidden"

                    onChange={(e) => {

                      if (e.target.files?.[0]) handlePdfUpload(e.target.files[0]);

                    }}

                  />

                  <button

                    type="button"

                    onClick={() => pdfInputRef.current?.click()}

                    disabled={uploadingPdf}

                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer shadow-xs"

                  >

                    <UploadCloud className="w-4 h-4 text-blue-600" />

                    <span>{uploadingPdf ? "Uploading PDF..." : "Upload New PDF File"}</span>

                  </button>



                  <input

                    type="text"

                    placeholder="or enter file URL / path (/documents/...)"

                    value={formData.fileUrl || formData.pdfUrl || ""}

                    onChange={(e) =>

                      setFormData({ ...formData, fileUrl: e.target.value, pdfUrl: e.target.value })

                    }

                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"

                  />

                </div>

                {(formData.fileUrl || formData.pdfUrl) && (

                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5 mt-1 truncate">

                    <Check className="w-3.5 h-3.5" />

                    <span className="truncate">Active: {formData.fileUrl || formData.pdfUrl}</span>

                  </p>

                )}

              </div>



              {/* Cover Image Upload (Optional for Magazines & Brochures) */}

              {(activeTab === "magazines" || activeTab === "brochures") && (

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">

                  <label className="text-xs font-bold text-slate-700 block">

                    Cover / Flyer Image (Optional)

                  </label>

                  <div className="flex items-center gap-3">

                    <input

                      type="file"

                      ref={coverInputRef}

                      accept="image/*"

                      className="hidden"

                      onChange={(e) => {

                        if (e.target.files?.[0]) handleCoverUpload(e.target.files[0]);

                      }}

                    />

                    <button

                      type="button"

                      onClick={() => coverInputRef.current?.click()}

                      disabled={uploadingCover}

                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer shadow-xs"

                    >

                      <UploadCloud className="w-4 h-4 text-indigo-600" />

                      <span>{uploadingCover ? "Uploading Cover..." : "Upload Cover Image"}</span>

                    </button>



                    <input

                      type="text"

                      placeholder="or enter image URL..."

                      value={formData.coverUrl || ""}

                      onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}

                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"

                    />

                  </div>

                </div>

              )}



              {/* Submit Buttons */}

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">

                <button

                  type="button"

                  onClick={() => setIsModalOpen(false)}

                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"

                >

                  Cancel

                </button>

                <button

                  type="submit"

                  disabled={isSaving}

                  className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"

                >

                  {isSaving && <Loader2 className="w-4 h-4 animate-spin text-white" />}

                  <span>{modalMode === "add" ? "Save to Sanity" : "Update Document"}</span>

                </button>

              </div>

            </form>

          </div>

        </div>

      )}



      {/* Delete Confirmation Modal */}

      {deleteModalItem && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">

          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">

            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">

              <Trash2 className="w-6 h-6" />

            </div>

            <div className="text-center space-y-1">

              <h3 className="font-bold text-base text-slate-900">Delete this document?</h3>

              <p className="text-xs text-slate-500">

                Are you sure you want to delete{" "}

                <span className="font-bold text-slate-800">

                  {deleteModalItem.title || "this document"}

                </span>

                ? This action will remove it from the Sanity dataset and live website.

              </p>

            </div>

            <div className="flex items-center justify-center gap-3 pt-2">

              <button

                type="button"

                onClick={() => setDeleteModalItem(null)}

                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"

              >

                Cancel

              </button>

              <button

                type="button"

                onClick={handleDelete}

                disabled={isDeleting}

                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"

              >

                {isDeleting && <Loader2 className="w-4 h-4 animate-spin text-white" />}

                <span>Confirm Delete</span>

              </button>

            </div>

          </div>

        </div>

      )}



      {/* PDF / Document Live Preview Modal */}

      {previewModalFile && (

        <FilePreviewModal

          isOpen={Boolean(previewModalFile)}

          onClose={() => setPreviewModalFile(null)}

          fileUrl={previewModalFile.url}

          title={previewModalFile.title}

        />

      )}

    </div>

  );

}

export default QuickDrawersManager;



