"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Building2,
  FileText,
  HeartHandshake,
  Trophy,
  MessageSquareQuote,
  Calendar,
  Image as ImageIcon,
  Phone,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Eye,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
  ShieldCheck,
  Award,
  Link2,
  Mail,
  MapPin,
  Folder,
  Grid,
  Sparkles,
  Tag,
  Star,
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

export function AlumniManager() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active Tab from 1 to 9
  const [activeTab, setActiveTab] = useState<number>(1);

  // Modal State for generic Table / Card Item
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // PDF Preview Modal
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  // =========================================================
  // Gallery Albums State (Tab 8)
  // =========================================================
  const [galleryAlbums, setGalleryAlbums] = useState<any[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [savingAlbum, setSavingAlbum] = useState(false);

  useEffect(() => {
    fetchData();
    fetchGalleryAlbums();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/alumni");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setError(json.error || "Failed to load alumni data.");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading alumni.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryAlbums = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch("/api/admin/alumni/gallery");
      const json = await res.json();
      if (json.success && json.albums) {
        setGalleryAlbums(json.albums);
      }
    } catch (err: any) {
      console.error("Failed to load gallery albums:", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleSaveToSanity = async () => {
    if (!data) return;
    setSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setError(json.error || "Failed to save records in Sanity.");
      }
    } catch (err: any) {
      setError(err.message || "Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Upload File Handler (PDFs or images)
  const handleFileUpload = async (file: File, fieldName: string = "fileUrl", type: "file" | "image" = "file") => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      const fileUrl = json.asset?.url || json.url;
      const assetId = json.asset?._id || json.assetId;

      if (json.success && fileUrl) {
        setEditingItem((prev: any) => ({
          ...prev,
          [fieldName]: fileUrl,
          ...(assetId ? { assetId, ...(type === "image" ? { photoAssetId: assetId } : {}) } : {}),
        }));
      } else {
        alert(json.error || "Failed to upload file to Sanity.");
      }
    } catch (err: any) {
      alert(err.message || "Error during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // Open modal to add item
  const openAddModal = (type: string, initialFields: any) => {
    setModalType(type);
    setEditIndex(null);
    setEditingItem({
      _key: `${type}_${Date.now()}`,
      ...initialFields,
    });
    setModalOpen(true);
  };

  // Open modal to edit item
  const openEditModal = (type: string, index: number, item: any) => {
    setModalType(type);
    setEditIndex(index);
    setEditingItem({ ...item });
    setModalOpen(true);
  };

  // Save Modal
  const handleSaveModal = () => {
    if (!data || !modalType || !editingItem) return;
    const updatedArray = [...(data[modalType] || [])];
    if (editIndex !== null && editIndex >= 0) {
      updatedArray[editIndex] = editingItem;
    } else {
      updatedArray.push(editingItem);
    }
    setData({
      ...data,
      [modalType]: updatedArray,
    });
    setModalOpen(false);
    setEditingItem(null);
    setEditIndex(null);
  };

  // Delete item
  const handleDeleteItem = (type: string, index: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    const updatedArray = [...(data[type] || [])];
    updatedArray.splice(index, 1);
    setData({
      ...data,
      [type]: updatedArray,
    });
  };

  // Toggle Featured status on Pride Alumni
  const handleTogglePrideFeatured = (index: number) => {
    const updatedPride = [...(data.prideAlumni || [])];
    const current = updatedPride[index];
    updatedPride[index] = {
      ...current,
      featured: current.featured === false ? true : false,
    };
    setData({
      ...data,
      prideAlumni: updatedPride,
    });
  };

  // =========================================================
  // Gallery Album Actions (Tab 8) - Unified User-Friendly Manager
  // =========================================================
  const openCreateAlbumModal = () => {
    setSelectedAlbum({
      folderName: "",
      eventDate: new Date().toISOString().split("T")[0],
      slug: "",
      order: 1,
      images: [],
    });
    setIsAlbumModalOpen(true);
  };

  const openManagePhotosModal = (album: any) => {
    setSelectedAlbum({
      _id: album._id,
      folderName: album.folderName || "",
      eventDate: album.eventDate || "",
      slug: album.slug || "",
      order: album.order || 1,
      images: (album.images || []).map((img: any) => ({
        _key: img._key || `img_${Math.random()}`,
        url: img.url,
        assetId: img.assetId,
        caption: img.caption || "",
      })),
    });
    setIsAlbumModalOpen(true);
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (!window.confirm("Are you sure you want to delete this entire album and its photos from Sanity?")) return;
    try {
      const res = await fetch(`/api/admin/alumni/gallery?id=${albumId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchGalleryAlbums();
      } else {
        alert(json.error || "Failed to delete album.");
      }
    } catch (err: any) {
      alert(err.message || "Error deleting album.");
    }
  };

  const handleUploadPhotoToAlbum = async (files: FileList | null) => {
    if (!files || files.length === 0 || !selectedAlbum) return;
    setIsUploadingPhoto(true);
    try {
      const newImages = [...(selectedAlbum.images || [])];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image");

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const json = await res.json();
        const url = json.asset?.url || json.url;
        const assetId = json.asset?._id || json.assetId;

        if (json.success && url && assetId) {
          newImages.push({
            _key: `img_${Date.now()}_${i}`,
            url,
            assetId,
            caption: selectedAlbum.folderName ? `${selectedAlbum.folderName}` : "",
          });
        }
      }
      setSelectedAlbum({
        ...selectedAlbum,
        images: newImages,
      });
    } catch (err: any) {
      alert("Error uploading one or more photos.");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleDeletePhotoFromAlbum = (photoIndex: number) => {
    if (!selectedAlbum) return;
    const updatedImages = [...selectedAlbum.images];
    updatedImages.splice(photoIndex, 1);
    setSelectedAlbum({
      ...selectedAlbum,
      images: updatedImages,
    });
  };

  const handleSaveAlbum = async () => {
    if (!selectedAlbum) return;
    if (!selectedAlbum.folderName?.trim()) {
      alert("Please enter a name for the album.");
      return;
    }
    setSavingAlbum(true);
    try {
      const slugValue =
        selectedAlbum.slug?.trim() ||
        selectedAlbum.folderName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

      const payload = {
        ...selectedAlbum,
        folderName: selectedAlbum.folderName.trim(),
        eventDate: selectedAlbum.eventDate || null,
        slug: slugValue,
        order: selectedAlbum.order || 1,
      };

      const res = await fetch("/api/admin/alumni/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setIsAlbumModalOpen(false);
        setSelectedAlbum(null);
        fetchGalleryAlbums();
      } else {
        alert(json.error || "Failed to save album.");
      }
    } catch (err: any) {
      alert(err.message || "Network error while saving album.");
    } finally {
      setSavingAlbum(false);
    }
  };

  const TABS = [
    { id: 1, label: "1. About Alumni", icon: Users, count: 4 },
    { id: 2, label: "2. College Committee", icon: Building2, count: (data?.committeeMembers?.length || 0) + (data?.committeeReports?.length || 0) },
    { id: 3, label: "3. Registered Association", icon: ShieldCheck, count: (data?.associationOfficeBearers?.length || 0) + (data?.statutoryDocuments?.length || 0) },
    { id: 4, label: "4. Contributions Register", icon: HeartHandshake, count: data?.contributionsRegister?.length || 0 },
    { id: 5, label: "5. Alumni Network", icon: Trophy, count: (data?.prideAlumni?.length || 0) + (data?.testimonials?.length || 0) },
    { id: 6, label: "6. Feedback & Connect", icon: MessageSquareQuote, count: 1 },
    { id: 7, label: "7. Events & Reunions", icon: Calendar, count: data?.events?.length || 0 },
    { id: 8, label: "8. Gallery & Media", icon: ImageIcon, count: galleryAlbums?.length || 0 },
    { id: 9, label: "9. Contact Desk", icon: Phone, count: 1 },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
        <Loader2 className="h-10 w-10 text-blue-800 animate-spin" />
        <span className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading Live Alumni Records...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* ── TOP ACTION BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800">
              Sanity Singleton Document: <span className="font-mono text-[11px] text-blue-700 font-extrabold">alumni-singleton</span>
            </span>
          </div>
          <span className="text-slate-300 hidden md:inline">|</span>
          <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
            Last updated: <strong className="text-slate-700">{data?.lastUpdated || "Live"}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              fetchData();
              fetchGalleryAlbums();
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            title="Reload from Sanity"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleSaveToSanity}
            disabled={saving}
            className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              saveSuccess
                ? "bg-emerald-600 text-white"
                : "bg-[#002147] hover:bg-blue-900 text-white"
            }`}
          >
            {saving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Saving to Sanity...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Saved &amp; Published!</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes to Sanity</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── TAB SELECTOR ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all text-center border cursor-pointer ${
                isActive
                  ? "bg-[#002147] text-white border-[#002147] shadow-sm scale-[1.02]"
                  : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-1">
                <Icon className={`h-4 w-4 ${isActive ? "text-amber-400" : "text-blue-700"}`} />
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {tab.count}
                </span>
              </div>
              <span className="text-[11px] font-bold leading-tight line-clamp-1">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: 1. About Alumni                                    */}
      {/* ========================================================= */}
      {activeTab === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-outfit font-black text-slate-900 text-base">
              1. About Alumni Institutional Overview &amp; Framework
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              These foundational subsections outline institutional alumni objectives, significance, structure, and connect mechanisms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 bg-white rounded-2xl border-2 border-slate-200/90 shadow-xs flex flex-col gap-2">
              <span className="font-outfit font-extrabold text-xs uppercase text-blue-700 tracking-wider">a. Introduction &amp; Overview</span>
              <p className="text-slate-600 leading-relaxed font-medium">
                The Alumni of St. Ann’s College for Women represent a vital legacy of academic excellence, leadership and values. The alumni network reflects the institution&apos;s enduring commitment to women&apos;s empowerment.
              </p>
            </div>
            <div className="p-5 bg-[#e8f1fd] rounded-2xl border-2 border-blue-200/90 shadow-xs flex flex-col gap-2">
              <span className="font-outfit font-extrabold text-xs uppercase text-indigo-800 tracking-wider">b. Significance of Alumni Engagement</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Alumni play an active role as mentors, advisors and ambassadors. Their contributions enrich student learning, strengthen career guidance, and foster institutional development.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border-2 border-slate-200/90 shadow-xs flex flex-col gap-2">
              <span className="font-outfit font-extrabold text-xs uppercase text-blue-700 tracking-wider">c. Institutional Objectives</span>
              <p className="text-slate-600 leading-relaxed font-medium">
                Maintain lifelong connections, facilitate mentoring and career guidance, encourage alumni participation in academic activities, and recognize distinguished alumni achievements.
              </p>
            </div>
            <div className="p-5 bg-[#e8f1fd] rounded-2xl border-2 border-blue-200/90 shadow-xs flex flex-col gap-2">
              <span className="font-outfit font-extrabold text-xs uppercase text-indigo-800 tracking-wider">d. Alumni–Institution Connect</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Platforms for alumni to remain connected through Alumni Meets, mentoring, professional interactions, and student engagement drives.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: 2. College-Level Alumni Committee                  */}
      {/* ========================================================= */}
      {activeTab === 2 && (
        <div className="flex flex-col gap-6">
          <TableSectionCard
            title="2.b College-Level Alumni Committee Composition"
            subtitle="Institutional committee composition coordinating alumni engagement"
            onAdd={() => openAddModal("committeeMembers", { sNo: (data.committeeMembers?.length || 0) + 1, name: "", designation: "", role: "Member" })}
          >
            <DataTable
              items={data.committeeMembers || []}
              columns={["S.No", "Name", "Designation / Representation", "Role in Committee", "Actions"]}
              renderRow={(mem, idx) => (
                <tr key={mem._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 text-center">{mem.sNo || idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{mem.name}</td>
                  <td className="py-3 px-4 text-slate-700">{mem.designation}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                      {mem.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("committeeMembers", idx, mem)} onDelete={() => handleDeleteItem("committeeMembers", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>

          <TableSectionCard
            title="2.e College-Level Alumni Committee Annual Reports"
            subtitle="Annual reports documenting committee activities and institutional outcomes"
            onAdd={() => openAddModal("committeeReports", { year: "2025–2026", title: "Annual Alumni Committee Report", fileUrl: "" })}
          >
            <DataTable
              items={data.committeeReports || []}
              columns={["Academic Year", "Report Title", "Document File", "Actions"]}
              renderRow={(rep, idx) => (
                <tr key={rep._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold font-mono text-slate-900 whitespace-nowrap">{rep.year}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{rep.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={rep.fileUrl} label="View PDF" onPreview={() => setPreviewPdf({ url: rep.fileUrl, title: rep.title })} />
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("committeeReports", idx, rep)} onDelete={() => handleDeleteItem("committeeReports", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: 3. Registered Alumni Association                    */}
      {/* ========================================================= */}
      {activeTab === 3 && (
        <div className="flex flex-col gap-6">
          <TableSectionCard
            title="3.b Registered Association Office Bearers (Governing Body)"
            subtitle="Elected alumni leadership managing the registered society"
            onAdd={() => openAddModal("associationOfficeBearers", { sNo: (data.associationOfficeBearers?.length || 0) + 1, name: "", designation: "Executive Member", occupation: "Lecturer" })}
          >
            <DataTable
              items={data.associationOfficeBearers || []}
              columns={["S.No", "Name", "Designation", "Occupation / Position", "Actions"]}
              renderRow={(ob, idx) => (
                <tr key={ob._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 text-center">{ob.sNo || idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{ob.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-900 border border-indigo-200">
                      {ob.designation}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{ob.occupation}</td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("associationOfficeBearers", idx, ob)} onDelete={() => handleDeleteItem("associationOfficeBearers", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>

          <TableSectionCard
            title="3.c Statutory &amp; Registration Documents"
            subtitle="Official Society registration certificate, bylaws, PAN, and renewal proceedings"
            onAdd={() => openAddModal("statutoryDocuments", { sNo: (data.statutoryDocuments?.length || 0) + 1, documentTitle: "", description: "", fileUrl: "" })}
          >
            <DataTable
              items={data.statutoryDocuments || []}
              columns={["S.No", "Document Title", "Description", "Document File", "Actions"]}
              renderRow={(doc, idx) => (
                <tr key={doc._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 text-center">{doc.sNo || idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{doc.documentTitle}</td>
                  <td className="py-3 px-4 text-slate-600">{doc.description}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={doc.fileUrl} label="View PDF" onPreview={() => setPreviewPdf({ url: doc.fileUrl, title: doc.documentTitle })} />
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("statutoryDocuments", idx, doc)} onDelete={() => handleDeleteItem("statutoryDocuments", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: 4. Alumni Contributions & Support Register          */}
      {/* ========================================================= */}
      {activeTab === 4 && (
        <TableSectionCard
          title="4. Alumni Contributions &amp; Support Register (AY 2026–2027)"
          subtitle="Documented register recording alumni-led workshops, mentoring sessions, and professional support"
          onAdd={() => openAddModal("contributionsRegister", { sNo: (data.contributionsRegister?.length || 0) + 1, date: "14-08-2026", alumniName: "", programmeBatch: "UG", activity: "", natureOfSupport: "Mentoring & Guidance", beneficiaries: "100", fileUrl: "" })}
        >
          <DataTable
            items={data.contributionsRegister || []}
            columns={["S.No", "Date", "Alumni Name", "Programme / Batch", "Activity / Contribution", "Nature of Support", "Beneficiaries", "Supporting Evidence", "Actions"]}
            renderRow={(row, idx) => (
              <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                <td className="py-3 px-4 font-bold text-slate-900 text-center">{row.sNo || idx + 1}</td>
                <td className="py-3 px-4 font-mono whitespace-nowrap text-slate-700">{row.date}</td>
                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.alumniName}</td>
                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{row.programmeBatch}</td>
                <td className="py-3 px-4 text-slate-800 min-w-[200px]">{row.activity}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {row.natureOfSupport}
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-center font-mono">{row.beneficiaries}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <PdfBadge url={row.fileUrl} label="View Evidence" onPreview={() => setPreviewPdf({ url: row.fileUrl, title: `${row.alumniName} - ${row.activity}` })} />
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <ActionButtons onEdit={() => openEditModal("contributionsRegister", idx, row)} onDelete={() => handleDeleteItem("contributionsRegister", idx)} />
                </td>
              </tr>
            )}
          />
        </TableSectionCard>
      )}

      {/* ========================================================= */}
      {/* TAB 5: 5. Alumni Network                                  */}
      {/* ========================================================= */}
      {activeTab === 5 && (
        <div className="flex flex-col gap-6">
          {/* Alumni Registration Form URL Configuration (Section 5) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#002147] to-blue-950 text-white flex flex-col gap-3 shadow-md">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-black text-xs">
                  <ExternalLink className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="font-outfit font-black text-sm">
                    5.1 Alumni Registration Portal URL (Section 5)
                  </h4>
                  <p className="text-blue-100/80 text-xs">
                    Connected to &quot;Register as Alumni&quot; in Section 5.
                  </p>
                </div>
              </div>
              {data.registrationFormUrl && (
                <a
                  href={data.registrationFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all inline-flex items-center gap-1 shrink-0"
                >
                  <span>Test Link</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <input
                type="url"
                value={data.registrationFormUrl || ""}
                onChange={(e) => setData({ ...data, registrationFormUrl: e.target.value })}
                placeholder="https://forms.gle/7QMzJvrAsYVT3YZd7"
                className="flex-1 px-3.5 py-2.5 bg-white/10 text-white placeholder-blue-200/50 border border-white/20 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-slate-950"
              />
              <button
                type="button"
                onClick={() => {
                  if (data.registrationFormUrl) {
                    window.open(data.registrationFormUrl, "_blank");
                  } else {
                    alert("Please enter a valid Registration URL first.");
                  }
                }}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-xs transition-colors whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-xs"
                title="Test Registration Google Form URL in a new tab"
              >
                <span>Test Link</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Our Alumni - Our Pride */}
          <CardGridSection
            title="5.2 Our Alumni – Our Pride (Distinguished Alumni Directory)"
            subtitle="Showcase celebrating distinguished alumni. You can select which ones to feature on the homepage outside (Top 3 max displayed)."
            onAdd={() => openAddModal("prideAlumni", { name: "Alumna Name", programmeBatch: "B.Sc – 2005–2008", designation: "Position", organization: "Company / Org", achievement: "Professional achievement summary.", featured: true, redirectUrl: "" })}
          >
            {(data.prideAlumni || []).map((alumnus: any, idx: number) => {
              const isFeatured = alumnus.featured !== false;
              return (
                <div key={alumnus._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleTogglePrideFeatured(idx)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border cursor-pointer transition-all flex items-center gap-1 ${
                          isFeatured
                            ? "bg-amber-100 text-amber-900 border-amber-300 font-extrabold"
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                        }`}
                        title="Click to toggle featured display on Section 5 outside"
                      >
                        <Star className={`h-3 w-3 ${isFeatured ? "fill-amber-500 text-amber-600" : "text-slate-400"}`} />
                        <span>{isFeatured ? "Featured (Outside Top 3)" : "Directory Only"}</span>
                      </button>
                      <ActionButtons onEdit={() => openEditModal("prideAlumni", idx, alumnus)} onDelete={() => handleDeleteItem("prideAlumni", idx)} />
                    </div>
                    <h4 className="font-outfit font-extrabold text-sm text-slate-900">{alumnus.name}</h4>
                    <span className="text-[11px] font-bold text-blue-700">{alumnus.designation} • {alumnus.organization}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{alumnus.programmeBatch}</span>
                    <p className="text-slate-600 text-xs leading-relaxed">{alumnus.achievement}</p>
                  </div>
                </div>
              );
            })}
          </CardGridSection>

          {/* Voices of Our Alumni (Testimonials) */}
          <CardGridSection
            title="5.3 Voices of Our Alumni (Testimonials Collection)"
            subtitle="Reflections, memories, and career stories shared by alumni graduates (Top 6 max displayed outside with ABBAABBA layout)"
            onAdd={() => openAddModal("testimonials", { title: "New Testimonial", quote: "My journey at St. Ann's was...", alumnaName: "Alumna Name", programmeBatch: "B.Com | 2005–2008" })}
          >
            {(data.testimonials || []).map((test: any, idx: number) => (
              <div key={test._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      TESTIMONIAL {idx + 1}
                    </span>
                    <ActionButtons onEdit={() => openEditModal("testimonials", idx, test)} onDelete={() => handleDeleteItem("testimonials", idx)} />
                  </div>
                  <h4 className="font-outfit font-extrabold text-sm text-slate-900">{test.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed italic">“{test.quote}”</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{test.alumnaName}</span>
                  <span className="text-[11px] font-mono text-slate-500">{test.programmeBatch}</span>
                </div>
              </div>
            ))}
          </CardGridSection>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: 6. Feedback & Institutional Connect                */}
      {/* ========================================================= */}
      {activeTab === 6 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-outfit font-black text-slate-900 text-base">
                6. Alumni Feedback &amp; Quality Enhancement Framework
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Structured feedback channels, action taken records, and alumni institutional support.
              </p>
            </div>
            {data.feedbackFormUrl && (
              <a
                href={data.feedbackFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-colors w-fit"
              >
                <span>Test Feedback Form</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {/* Feedback Form Link Configuration Input */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#002147] text-white flex flex-col gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-black text-xs">
                <Link2 className="h-4 w-4" />
              </span>
              <h4 className="font-outfit font-black text-sm">6.1 Alumni Feedback Google Form URL (Section 6)</h4>
            </div>
            <p className="text-blue-100 text-xs leading-relaxed">
              This independent link connects directly to the &quot;Connect &amp; Submit Feedback&quot; button in Section 6.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <input
                type="url"
                value={data.feedbackFormUrl || ""}
                onChange={(e) => setData({ ...data, feedbackFormUrl: e.target.value })}
                placeholder="https://docs.google.com/forms/d/e/.../viewform"
                className="flex-1 px-3.5 py-2.5 bg-white/10 text-white placeholder-blue-200/50 border border-white/20 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-slate-950"
              />
              <button
                type="button"
                onClick={() => {
                  if (data.feedbackFormUrl) {
                    window.open(data.feedbackFormUrl, "_blank");
                  } else {
                    alert("Please enter a valid Feedback URL first.");
                  }
                }}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-xs transition-colors whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-xs"
                title="Test Alumni Feedback Google Form URL in a new tab"
              >
                <span>Test Link</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* 3 Quality Enhancement Framework Cards (Alternating Colors) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 bg-white rounded-2xl border-2 border-slate-200/90 shadow-xs flex flex-col gap-2 hover:shadow-md transition-all">
              <span className="font-outfit font-extrabold text-xs uppercase text-blue-700 tracking-wider">
                1. Alumni Feedback
              </span>
              <p className="text-slate-600 leading-relaxed font-medium">
                Collected periodically to understand experiences, suggestions and expectations for continuous institutional development.
              </p>
            </div>

            <div className="p-5 bg-[#e8f1fd] rounded-2xl border-2 border-blue-200/90 shadow-xs flex flex-col gap-2 hover:shadow-md transition-all">
              <span className="font-outfit font-extrabold text-xs uppercase text-indigo-800 tracking-wider">
                2. Suggestions &amp; Outcomes
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Relevant suggestions received from alumni and corresponding action taken reports documented for NAAC &amp; IQAC audits.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border-2 border-slate-200/90 shadow-xs flex flex-col gap-2 hover:shadow-md transition-all">
              <span className="font-outfit font-extrabold text-xs uppercase text-emerald-700 tracking-wider">
                3. Quality Enhancement
              </span>
              <p className="text-slate-600 leading-relaxed font-medium">
                Active contribution towards curriculum feedback, mentoring, career readiness, and infrastructure enhancement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: 7. Events & Reunions                               */}
      {/* ========================================================= */}
      {activeTab === 7 && (
        <TableSectionCard
          title="7. Alumni Events, Meets &amp; Batch Reunions Calendar"
          subtitle="Manage scheduled, ongoing, and past alumni meets with category, status, dates, and reports"
          onAdd={() =>
            openAddModal("events", {
              title: "Annual Alumni Meet 2026",
              category: "Annual Alumni Meet",
              status: "Upcoming",
              academicYear: "2026–2027",
              date: "24 October 2026",
              time: "10:00 AM – 3:30 PM",
              venue: "College Auditorium & Lawns",
              description: "Grand annual gathering of all alumni batches celebrating institutional milestones.",
              redirectUrl: data.registrationFormUrl || "https://forms.gle/7QMzJvrAsYVT3YZd7",
              buttonText: "Register",
              fileUrl: "",
            })
          }
        >
          <DataTable
            items={data.events || []}
            columns={["Status", "Category", "Event / Meet Title", "Academic Year & Schedule", "Venue / Location", "Registration / PDF", "Actions"]}
            renderRow={(ev, idx) => {
              const status = ev.status || "Upcoming";
              const isUpcoming = status === "Upcoming";
              const isCurrent = status === "Current";

              return (
                <tr key={ev._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  {/* Status */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        isUpcoming
                          ? "bg-amber-50 text-amber-900 border-amber-200"
                          : isCurrent
                          ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                      {ev.category || "General Event"}
                    </span>
                  </td>

                  {/* Title & Description */}
                  <td className="py-3 px-4 font-bold text-slate-900 max-w-xs">
                    <div>{ev.title}</div>
                    {ev.description && <div className="text-[11px] font-normal text-slate-500 line-clamp-1 mt-0.5">{ev.description}</div>}
                  </td>

                  {/* Academic Year & Date / Time */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-mono font-bold text-slate-900">{ev.academicYear || "2026–2027"}</div>
                    <div className="text-[11px] text-slate-600 font-mono">{ev.date} {ev.time ? `• ${ev.time}` : ""}</div>
                  </td>

                  {/* Venue */}
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">{ev.venue || "College Campus"}</td>

                  {/* Registration / PDF */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      {ev.redirectUrl && (
                        <div className="flex items-center gap-1">
                          <LinkBadge url={ev.redirectUrl} />
                          <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded">
                            {ev.buttonText || "Register"}
                          </span>
                        </div>
                      )}
                      {ev.fileUrl && (
                        <PdfBadge url={ev.fileUrl} label="PDF Report" onPreview={() => setPreviewPdf({ url: ev.fileUrl, title: ev.title })} />
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("events", idx, ev)} onDelete={() => handleDeleteItem("events", idx)} />
                  </td>
                </tr>
              );
            }}
          />
        </TableSectionCard>
      )}

      {/* ========================================================= */}
      {/* TAB 8: 8. Gallery & Media (Albums & Photo Manager)        */}
      {/* ========================================================= */}
      {activeTab === 8 && (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-base">
                  8. Alumni Photo Albums &amp; Memories Gallery
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Create albums, organize reunion batches, upload photographs, and manage photo captions for the Alumni Memories Gallery.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={fetchGalleryAlbums}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Refresh Albums</span>
                </button>
                <button
                  onClick={openCreateAlbumModal}
                  className="px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ Create New Album</span>
                </button>
              </div>
            </div>

            {loadingGallery ? (
              <div className="p-12 flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-8 w-8 text-blue-800 animate-spin" />
                <span className="text-xs text-slate-500 font-bold">Loading Alumni Gallery Albums...</span>
              </div>
            ) : galleryAlbums.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-3">
                <Folder className="h-10 w-10 text-slate-400" />
                <div>
                  <h4 className="font-outfit font-bold text-sm text-slate-800">No Gallery Albums Created Yet</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click &quot;+ Create New Album&quot; to create your first alumni memories album and upload batch reunion photos.
                  </p>
                </div>
                <button
                  onClick={openCreateAlbumModal}
                  className="px-4 py-2 bg-[#002147] text-white rounded-xl text-xs font-bold transition-all hover:bg-blue-900 cursor-pointer"
                >
                  + Create First Album
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(() => {
                  const sortedAlbums = [...galleryAlbums].sort((a, b) => {
                    if (a.eventDate && b.eventDate) {
                      return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
                    }
                    if (a.eventDate) return -1;
                    if (b.eventDate) return 1;
                    return (a.order || 999) - (b.order || 999);
                  });

                  return sortedAlbums.map((album, idx) => {
                    const coverUrl =
                      album.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800";
                    const photoCount = album.images?.length || 0;

                    return (
                      <div
                        key={album._id || idx}
                        className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                      >
                        {/* Album Cover Thumbnail */}
                        <div className="relative aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
                          <img
                            src={coverUrl}
                            alt={album.folderName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/70 backdrop-blur-xs text-white rounded-full text-[10px] font-bold flex items-center gap-1 font-mono">
                            <ImageIcon className="h-3 w-3 text-amber-400" />
                            {photoCount} {photoCount === 1 ? "Photo" : "Photos"}
                          </span>
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/95 text-blue-950 rounded-lg text-[10px] font-black uppercase font-mono shadow-xs flex items-center gap-1 border border-blue-100">
                            <Calendar className="h-3 w-3 text-blue-700" />
                            {album.eventDate
                              ? new Date(album.eventDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : `Album #${idx + 1}`}
                          </span>
                        </div>

                        {/* Album Info */}
                        <div className="p-4 flex flex-col gap-3">
                          <div>
                            <h4 className="font-outfit font-black text-sm text-slate-900 group-hover:text-blue-900 transition-colors">
                              {album.folderName}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                              <span>{photoCount} {photoCount === 1 ? "photo" : "photos"} stored</span>
                              {album.eventDate && (
                                <>
                                  <span>•</span>
                                  <span className="text-blue-800 font-bold flex items-center gap-1">
                                    <Calendar className="h-3 w-3 text-blue-600" />
                                    {new Date(album.eventDate).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                            <button
                              onClick={() => openManagePhotosModal(album)}
                              className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer flex-1 justify-center"
                            >
                              <ImageIcon className="h-3.5 w-3.5 text-blue-700" />
                              <span>Edit Album / Photos ({photoCount})</span>
                            </button>

                            <button
                              onClick={() => handleDeleteAlbum(album._id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete album from Sanity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 9: 9. Contact Information                             */}
      {/* ========================================================= */}
      {activeTab === 9 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-outfit font-black text-slate-900 text-base">
              9. Alumni Official Contact Desk Information
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Contact emails, phone numbers, and official institutional physical address.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">
                Official Contact Email 1
              </label>
              <input
                type="email"
                value={data.contactInfo?.email || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    contactInfo: { ...data.contactInfo, email: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-medium"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">
                Official Contact Email 2 (Optional)
              </label>
              <input
                type="email"
                value={data.contactInfo?.email2 || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    contactInfo: { ...data.contactInfo, email2: e.target.value },
                  })
                }
                placeholder="e.g. principal@stannscollegevizag.org"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-medium"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">
                Contact Phone 1 (Primary)
              </label>
              <input
                type="text"
                value={data.contactInfo?.phone || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    contactInfo: { ...data.contactInfo, phone: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-medium"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">
                Contact Phone 2 (Mobile / Additional)
              </label>
              <input
                type="text"
                value={data.contactInfo?.phone2 || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    contactInfo: { ...data.contactInfo, phone2: e.target.value },
                  })
                }
                placeholder="e.g. +91 891 2577977"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-medium"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">
                Official Campus Address
              </label>
              <textarea
                rows={2}
                value={data.contactInfo?.address || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    contactInfo: { ...data.contactInfo, address: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: Add / Edit Item Generic Form (Tabs 1 - 7)          */}
      {/* ========================================================= */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-outfit font-black text-slate-900 text-base">
                {editIndex !== null ? "Edit Record" : "Add New Record"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              {/* S.No */}
              {editingItem.sNo !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">S.No</label>
                  <input
                    type="number"
                    value={editingItem.sNo || 1}
                    onChange={(e) => setEditingItem({ ...editingItem, sNo: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Category */}
              {editingItem.category !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Category / Group</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] bg-white font-bold"
                  >
                    <option value="Annual Alumni Meet">Annual Alumni Meet</option>
                    <option value="Batch Reunions & Milestone Celebrations">Batch Reunions &amp; Milestone Celebrations</option>
                    <option value="Departmental Alumni Interaction Sessions">Departmental Alumni Interaction Sessions</option>
                    <option value="Alumni Mentorship & Career Guidance Drives">Alumni Mentorship &amp; Career Guidance Drives</option>
                    <option value="General Alumni Event">General Alumni Event</option>
                  </select>
                </div>
              )}

              {/* Status */}
              {editingItem.status !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Event Status</label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] bg-white font-bold"
                  >
                    <option value="Upcoming">Upcoming (Scheduled)</option>
                    <option value="Current">Current (Ongoing)</option>
                    <option value="Past">Past (Concluded)</option>
                  </select>
                </div>
              )}

              {/* Academic Year */}
              {editingItem.academicYear !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Academic Year</label>
                  <input
                    type="text"
                    value={editingItem.academicYear || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, academicYear: e.target.value })}
                    placeholder="e.g. 2026–2027"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono"
                  />
                </div>
              )}

              {/* Date & Time */}
              {(editingItem.date !== undefined || editingItem.time !== undefined) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Date</label>
                    <input
                      type="text"
                      value={editingItem.date || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                      placeholder="e.g. 24 October 2026"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Time</label>
                    <input
                      type="text"
                      value={editingItem.time || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                      placeholder="e.g. 10:00 AM – 3:30 PM"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                    />
                  </div>
                </div>
              )}

              {/* Venue */}
              {editingItem.venue !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Venue / Location / Mode</label>
                  <input
                    type="text"
                    value={editingItem.venue || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, venue: e.target.value })}
                    placeholder="e.g. College Silver Jubilee Auditorium & Lawns"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Name / Member Name / Alumna Name */}
              {(editingItem.name !== undefined || editingItem.memberName !== undefined || editingItem.alumnaName !== undefined || editingItem.alumniName !== undefined) && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Full Name</label>
                  <input
                    type="text"
                    value={editingItem.name || editingItem.memberName || editingItem.alumnaName || editingItem.alumniName || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingItem.name !== undefined) setEditingItem({ ...editingItem, name: val });
                      else if (editingItem.memberName !== undefined) setEditingItem({ ...editingItem, memberName: val });
                      else if (editingItem.alumnaName !== undefined) setEditingItem({ ...editingItem, alumnaName: val });
                      else if (editingItem.alumniName !== undefined) setEditingItem({ ...editingItem, alumniName: val });
                    }}
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-bold"
                  />
                </div>
              )}

              {/* Designation / Role */}
              {(editingItem.designation !== undefined || editingItem.role !== undefined) && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Designation / Role</label>
                  <input
                    type="text"
                    value={editingItem.designation || editingItem.role || ""}
                    onChange={(e) => {
                      if (editingItem.role !== undefined) setEditingItem({ ...editingItem, role: e.target.value });
                      else setEditingItem({ ...editingItem, designation: e.target.value });
                    }}
                    placeholder="e.g. President / Advocate"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.organization !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Organization / Institution</label>
                  <input
                    type="text"
                    value={editingItem.organization || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                    placeholder="e.g. High Court of AP, Infosys..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Title / Document Title */}
              {(editingItem.title !== undefined || editingItem.documentTitle !== undefined) && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Title</label>
                  <input
                    type="text"
                    value={editingItem.title || editingItem.documentTitle || ""}
                    onChange={(e) => {
                      if (editingItem.documentTitle !== undefined) setEditingItem({ ...editingItem, documentTitle: e.target.value });
                      else setEditingItem({ ...editingItem, title: e.target.value });
                    }}
                    placeholder="Title"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Programme / Batch */}
              {editingItem.programmeBatch !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Programme / Batch</label>
                  <input
                    type="text"
                    value={editingItem.programmeBatch || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, programmeBatch: e.target.value })}
                    placeholder="e.g. B.Com | 2005–2008"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Activity / Description / Quote / Achievement */}
              {editingItem.activity !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Activity / Contribution</label>
                  <textarea
                    rows={2}
                    value={editingItem.activity || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, activity: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.natureOfSupport !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Nature of Support</label>
                  <input
                    type="text"
                    value={editingItem.natureOfSupport || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, natureOfSupport: e.target.value })}
                    placeholder="e.g. Mentoring & Guidance"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.beneficiaries !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Beneficiaries Count</label>
                  <input
                    type="text"
                    value={editingItem.beneficiaries || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, beneficiaries: e.target.value })}
                    placeholder="e.g. 423"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.quote !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Testimonial Quote</label>
                  <textarea
                    rows={3}
                    value={editingItem.quote || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.achievement !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Achievement Summary</label>
                  <textarea
                    rows={2}
                    value={editingItem.achievement || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, achievement: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.description !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Description</label>
                  <textarea
                    rows={2}
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Redirecting Link */}
              {editingItem.redirectUrl !== undefined && (
                <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px] uppercase tracking-wider">
                    <ExternalLink className="h-3.5 w-3.5 text-blue-700" />
                    <span>Registration / Action Link</span>
                  </div>
                  <input
                    type="text"
                    value={editingItem.redirectUrl || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, redirectUrl: e.target.value })}
                    placeholder="https://forms.gle/... or https://..."
                    className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                  />
                </div>
              )}

              {/* Button Text / Label (for Event Register/Action button) */}
              {(modalType === "events" || editingItem.buttonText !== undefined) && (
                <div>
                  <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">
                    Button Text / Action Label (on Event &quot;Register&quot; Button)
                  </label>
                  <input
                    type="text"
                    value={editingItem.buttonText ?? "Register"}
                    onChange={(e) => setEditingItem({ ...editingItem, buttonText: e.target.value })}
                    placeholder="e.g. Register, View Details, Join Meet, View Brochure"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-bold text-xs"
                  />
                </div>
              )}

              {/* PDF Document Upload & URL */}
              {editingItem.fileUrl !== undefined && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
                    <FileText className="h-3.5 w-3.5 text-blue-700" />
                    <span>PDF Document / Report File</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shrink-0">
                      <Upload className="h-3.5 w-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload New PDF"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "fileUrl", "file")}
                        disabled={isUploading}
                      />
                    </label>
                    <input
                      type="text"
                      value={editingItem.fileUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                      placeholder="/documents/alumni/... or https://cdn.sanity.io/..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── UNIFIED ALBUM & PHOTO MANAGER MODAL (Tab 8) ── */}
      {isAlbumModalOpen && selectedAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">
                  Alumni Memories Album
                </span>
                <h3 className="font-outfit font-black text-slate-900 text-base">
                  {selectedAlbum._id ? `Edit Album • ${selectedAlbum.folderName || "Untitled"}` : "Create New Photo Album"}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAlbumModalOpen(false);
                  setSelectedAlbum(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 text-xs">
              {/* Album Title & Event Date Inputs */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="block text-slate-800 font-extrabold uppercase text-[11px] tracking-wide">
                    Album Name / Occasion Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedAlbum.folderName || ""}
                    onChange={(e) => setSelectedAlbum({ ...selectedAlbum, folderName: e.target.value })}
                    placeholder="e.g. 2026 Annual Alumni Meet & Reunions"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-sm focus:outline-none focus:border-[#002147] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="block text-slate-800 font-extrabold uppercase text-[11px] tracking-wide flex items-center justify-between">
                    <span>Event Date</span>
                    <span className="text-[10px] text-blue-700 font-bold">(Auto-sorts)</span>
                  </label>
                  <input
                    type="date"
                    value={selectedAlbum.eventDate || ""}
                    onChange={(e) => setSelectedAlbum({ ...selectedAlbum, eventDate: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs focus:outline-none focus:border-[#002147] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Photo Upload Zone */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-white flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-outfit font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="h-4 w-4 text-blue-700" />
                      <span>Photos in this Album ({(selectedAlbum.images || []).length})</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Select multiple photos from your device to upload directly to Sanity.
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0">
                    {isUploadingPhoto ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Uploading to Sanity...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5" />
                        <span>+ Upload Photos</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleUploadPhotoToAlbum(e.target.files)}
                      disabled={isUploadingPhoto}
                    />
                  </label>
                </div>

                {/* Uploaded Photos Grid */}
                {(selectedAlbum.images || []).length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <ImageIcon className="h-8 w-8 text-slate-300" />
                    <span className="font-medium text-slate-600">No photos uploaded to this album yet.</span>
                    <span className="text-[11px] text-slate-400">Click &quot;+ Upload Photos&quot; above to select images.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
                    {(selectedAlbum.images || []).map((img: any, pIdx: number) => (
                      <div
                        key={img._key || pIdx}
                        className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col gap-1.5 relative group"
                      >
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-200 relative">
                          <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleDeletePhotoFromAlbum(pIdx)}
                            className="absolute top-1.5 right-1.5 p-1 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm opacity-90 group-hover:opacity-100 transition-all cursor-pointer"
                            title="Remove photo"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={img.caption || ""}
                          onChange={(e) => {
                            const updated = [...selectedAlbum.images];
                            updated[pIdx] = { ...img, caption: e.target.value };
                            setSelectedAlbum({ ...selectedAlbum, images: updated });
                          }}
                          placeholder="Add photo caption..."
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded-md text-[11px] focus:outline-none focus:border-[#002147]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">
                {(selectedAlbum.images || []).length} {(selectedAlbum.images || []).length === 1 ? "photo" : "photos"} ready in album
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsAlbumModalOpen(false);
                    setSelectedAlbum(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAlbum}
                  disabled={savingAlbum || isUploadingPhoto}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {savingAlbum && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Save Album &amp; Photos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {previewPdf && (
        <FilePreviewModal
          isOpen={!!previewPdf}
          fileUrl={previewPdf.url}
          title={previewPdf.title}
          onClose={() => setPreviewPdf(null)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-components for clean rendering
// ─────────────────────────────────────────────────────────────

function TableSectionCard({ title, subtitle, onAdd, children }: any) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <h3 className="font-outfit font-black text-slate-900 text-base">{title}</h3>
          <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Record</span>
          </button>
        )}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function CardGridSection({ title, subtitle, onAdd, children }: any) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-outfit font-black text-slate-900 text-base">{title}</h3>
          <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer w-fit"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Card</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}

function DataTable({ items, columns, renderRow }: { items: any[]; columns: string[]; renderRow: (item: any, idx: number) => React.ReactNode }) {
  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs font-medium">
        No records found. Click &quot;Add Record&quot; to create one.
      </div>
    );
  }
  return (
    <table className="w-full text-left text-xs border-collapse">
      <thead>
        <tr className="bg-slate-100/70 border-b border-slate-200/80 text-slate-700 font-extrabold uppercase text-[10px] tracking-wider">
          {columns.map((c, i) => (
            <th key={i} className={`py-3 px-4 ${i === columns.length - 1 ? "text-right" : ""}`}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 font-medium">{items.map(renderRow)}</tbody>
    </table>
  );
}

function ActionButtons({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="inline-flex items-center gap-1">
      <button
        onClick={onEdit}
        className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-100/70 transition-all cursor-pointer"
        title="Edit Record"
      >
        <Edit2 className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100/70 transition-all cursor-pointer"
        title="Delete Record"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function LinkBadge({ url }: { url?: string }) {
  if (!url) {
    return <span className="text-slate-400 font-mono text-[11px]">—</span>;
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold hover:bg-[#002147] hover:text-white transition-all max-w-[140px] truncate"
      title={url}
    >
      <Link2 className="h-3 w-3 shrink-0" />
      <span className="truncate">Open Link</span>
    </a>
  );
}

function PdfBadge({ url, label = "View PDF", onPreview }: { url?: string; label?: string; onPreview?: () => void }) {
  if (!url) {
    return <span className="text-slate-400 font-mono text-[11px]">—</span>;
  }
  return (
    <button
      onClick={onPreview}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-[#002147] hover:text-white border border-slate-200 text-[11px] font-bold transition-all cursor-pointer"
      title="Preview document"
    >
      <Eye className="h-3 w-3 text-blue-600 group-hover:text-white" />
      <span>{label}</span>
    </button>
  );
}
