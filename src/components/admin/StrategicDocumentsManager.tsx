"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
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
  FolderOpen
} from "lucide-react";

export interface StrategicDocumentItem {
  _key: string;
  title: string;
  fileUrl: string;
  assetId?: string;
  googleFormUrl?: string;
  isUploading?: boolean;
}

export function StrategicDocumentsManager() {
  const [documents, setDocuments] = useState<StrategicDocumentItem[]>([]);
  const [initialDocuments, setInitialDocuments] = useState<StrategicDocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Drawer state for Add or Edit
  const [editingDoc, setEditingDoc] = useState<StrategicDocumentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingExisting, setIsEditingExisting] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Preview PDF state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // File upload state in modal
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch initial documents from API
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/admin/strategic-plan/documents");
      const json = await res.json();
      if (json.success && Array.isArray(json.documents)) {
        setDocuments(json.documents);
        setInitialDocuments(json.documents);
      }
    } catch (err: any) {
      console.error("Error fetching documents:", err);
      setErrorMessage("Failed to load documents from Sanity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const isDirty = JSON.stringify(documents) !== JSON.stringify(initialDocuments);

  // Save changes to Sanity
  const handleSaveAll = async () => {
    try {
      setSaving(true);
      setErrorMessage(null);
      setSaveSuccess(false);

      const res = await fetch("/api/admin/strategic-plan/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to save documents to Sanity.");
      }

      setInitialDocuments(documents);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Reordering helpers
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setDocuments((prev) => {
      const updated = [...prev];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === documents.length - 1) return;
    setDocuments((prev) => {
      const updated = [...prev];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  // Delete document
  const handleDelete = (index: number) => {
    const docToDelete = documents[index];
    if (window.confirm(`Are you sure you want to delete "${docToDelete.title}"?`)) {
      setDocuments((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Open modal to add new document
  const handleOpenAddModal = () => {
    setEditingDoc({
      _key: `doc_${Date.now()}`,
      title: "",
      fileUrl: "",
      googleFormUrl: "https://www.google.com",
    });
    setIsEditingExisting(false);
    setEditIndex(null);
    setIsModalOpen(true);
  };

  // Open modal to edit existing document
  const handleOpenEditModal = (doc: StrategicDocumentItem, index: number) => {
    setEditingDoc({ ...doc });
    setIsEditingExisting(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a valid PDF file.");
      return;
    }

    try {
      setUploadingPdf(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "file");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Upload failed");
      }

      setEditingDoc((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          fileUrl: json.url,
          assetId: json.assetId,
          title: prev.title ? prev.title : file.name.replace(/\.[^/.]+$/, ""),
        };
      });
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingPdf(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Save changes from modal
  const handleSaveModal = () => {
    if (!editingDoc || !editingDoc.title.trim()) {
      alert("Please provide a title for the document.");
      return;
    }

    if (!editingDoc.fileUrl.trim()) {
      alert("Please upload a PDF file or provide a valid PDF URL.");
      return;
    }

    if (isEditingExisting && editIndex !== null) {
      setDocuments((prev) => {
        const updated = [...prev];
        updated[editIndex] = { ...editingDoc };
        return updated;
      });
    } else {
      // Add new document at the very top (index 0) so it becomes the latest!
      setDocuments((prev) => [editingDoc, ...prev]);
    }

    setIsModalOpen(false);
    setEditingDoc(null);
  };

  // Filtered documents list for search
  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12 font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#0f172a] p-6 sm:p-8 text-white shadow-xl border border-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400/20 border border-amber-300/30 text-amber-300 shadow-inner">
              <FileText className="h-7 w-7" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-outfit text-xl sm:text-2xl font-black tracking-tight text-white">
                  Strategic Documents &amp; Reports
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 rounded-full">
                  Sanity PDF Archive
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Manage official institutional strategic framework documents and annual deployment reports. The top 3 documents are displayed on the main webpage; all documents are accessible via the &ldquo;View All&rdquo; archive modal.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/strategic-plans-and-future-directions"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 bg-white/10 hover:bg-white/20 border border-white/10 transition-all cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View Public Page</span>
            </a>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Document</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={!isDirty || saving}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white transition-all shadow-md active:scale-95 cursor-pointer ${
                isDirty && !saving
                  ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30 ring-2 ring-emerald-400/50"
                  : "bg-slate-700/60 text-slate-400 cursor-not-allowed opacity-60"
              }`}
            >
              {saving ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>Saving to Sanity...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{isDirty ? "Save Changes" : "Saved"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Total Documents: <strong className="text-white">{documents.length}</strong>
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="text-slate-300 font-semibold">
              Top 3 Display: <strong className="text-amber-300">Live on Page</strong>
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="text-slate-300 font-semibold">
              Remaining: <strong className="text-blue-300">{Math.max(0, documents.length - 3)} in &ldquo;View All&rdquo;</strong>
            </span>
          </div>

          {isDirty && (
            <span className="inline-flex items-center gap-1.5 text-amber-300 bg-amber-400/10 border border-amber-300/20 px-2.5 py-1 rounded-md text-[11px] font-bold">
              <AlertCircle className="h-3.5 w-3.5" />
              Unsaved changes pending — remember to click &ldquo;Save Changes&rdquo;!
            </span>
          )}
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold shadow-xs">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Strategic documents successfully updated and published to Sanity! Changes are live immediately.</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm font-semibold shadow-xs">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Controls Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={fetchDocuments}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
              title="Refresh list from Sanity"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Documents Table / List */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#002147]" />
            <p className="text-sm font-semibold">Loading strategic documents from Sanity...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <FolderOpen className="h-10 w-10 text-slate-300" />
            <p className="text-sm font-semibold">No strategic documents found.</p>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002147] bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl"
            >
              <Plus className="h-4 w-4" /> Add your first document
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredDocs.map((doc, idx) => {
              const originalIndex = documents.findIndex((d) => d._key === doc._key);
              const isTop3 = originalIndex < 3;

              return (
                <div
                  key={doc._key || idx}
                  className={`p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isTop3 ? "bg-amber-50/20 hover:bg-amber-50/40" : "hover:bg-slate-50/80"
                  }`}
                >
                  {/* Left: Rank, Badge & Title */}
                  <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                    {/* Rank Badge */}
                    <div className="flex flex-col items-center justify-center shrink-0">
                      <span
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-outfit text-sm font-black shadow-2xs ${
                          isTop3
                            ? "bg-[#002147] text-white ring-2 ring-amber-400/40"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        #{originalIndex + 1}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {isTop3 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md shadow-2xs">
                            <Sparkles className="h-3 w-3 text-emerald-600" />
                            Live on Main Webpage (Top 3)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md">
                            Archive (View All Modal)
                          </span>
                        )}

                        {doc.fileUrl.startsWith("http") && doc.fileUrl.includes("sanity.io") && (
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                            Sanity Asset
                          </span>
                        )}
                      </div>

                      <h4 className="font-outfit font-black text-slate-900 text-base sm:text-lg tracking-tight leading-snug">
                        {doc.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="truncate max-w-xs sm:max-w-md" title={doc.fileUrl}>
                          📄 {doc.fileUrl}
                        </span>
                        {doc.googleFormUrl && doc.googleFormUrl !== "https://www.google.com" && (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <LinkIcon className="h-3 w-3" /> Form Linked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions (Reorder, Preview, Edit, Delete) */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {/* Reordering */}
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-2xs p-0.5 mr-1">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(originalIndex)}
                        disabled={originalIndex === 0}
                        className={`p-1.5 rounded-lg transition-colors ${
                          originalIndex === 0
                            ? "text-slate-200 cursor-not-allowed"
                            : "text-slate-600 hover:text-[#002147] hover:bg-slate-100 cursor-pointer"
                        }`}
                        title="Move Up (Boost to Higher Priority)"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(originalIndex)}
                        disabled={originalIndex === documents.length - 1}
                        className={`p-1.5 rounded-lg transition-colors ${
                          originalIndex === documents.length - 1
                            ? "text-slate-200 cursor-not-allowed"
                            : "text-slate-600 hover:text-[#002147] hover:bg-slate-100 cursor-pointer"
                        }`}
                        title="Move Down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Preview PDF */}
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(doc.fileUrl);
                        setPreviewTitle(doc.title);
                      }}
                      className="p-2 text-slate-600 hover:text-[#002147] hover:bg-indigo-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                      title="Preview PDF"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(doc, originalIndex)}
                      className="p-2 text-slate-600 hover:text-[#002147] hover:bg-indigo-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                      title="Edit Document"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(originalIndex)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                      title="Delete Document"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && editingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-amber-400" />
                <h3 className="font-outfit font-black text-lg text-white">
                  {isEditingExisting ? "Edit Strategic Document" : "Add New Strategic Document"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Annual Deployment Plan 2026–2027"
                  value={editingDoc.title}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                />
              </div>

              {/* Upload or File URL */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  PDF Document File <span className="text-red-500">*</span>
                </label>

                {/* Upload Box */}
                <div className="border-2 border-dashed border-slate-300 hover:border-[#002147] rounded-2xl p-4 text-center transition-colors bg-slate-50/50">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="doc-pdf-file-upload"
                  />
                  <label
                    htmlFor="doc-pdf-file-upload"
                    className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    {uploadingPdf ? (
                      <>
                        <Loader2 className="h-7 w-7 text-[#002147] animate-spin" />
                        <span className="text-xs font-bold text-slate-700">Uploading PDF to Sanity CDN...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-7 w-7 text-[#002147]" />
                        <span className="text-xs font-bold text-slate-700">
                          Click to browse and upload a PDF file
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Directly uploads into Sanity Asset Pipeline
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Or Manual URL */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    Or specify a custom PDF file URL / local document path:
                  </span>
                  <input
                    type="text"
                    placeholder="/documents/... or https://..."
                    value={editingDoc.fileUrl}
                    onChange={(e) => setEditingDoc({ ...editingDoc, fileUrl: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                  />
                </div>
              </div>

              {/* Optional Feedback URL */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Feedback Google Form URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://forms.gle/..."
                  value={editingDoc.googleFormUrl || ""}
                  onChange={(e) => setEditingDoc({ ...editingDoc, googleFormUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-5 py-2 text-xs font-bold text-white bg-[#002147] hover:bg-[#003366] rounded-xl transition-all shadow-sm active:scale-95"
              >
                {isEditingExisting ? "Update Document" : "Add to List"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-amber-400" />
                <h3 className="font-outfit font-black text-sm sm:text-base text-white truncate max-w-xl">
                  {previewTitle}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewUrl(null)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-slate-100">
              <iframe
                src={`${previewUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StrategicDocumentsManager;
