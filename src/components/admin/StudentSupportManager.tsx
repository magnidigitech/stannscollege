"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  HeartHandshake,
  ShieldCheck,
  Award,
  Sparkles,
  FileText,
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
  Users,
  Trophy,
  Flag,
  Compass,
  MessageSquare,
  ExternalLink,
  Calendar,
  X,
  Search,
  UploadCloud,
  FileSpreadsheet,
  Layers,
  HelpCircle,
  Scale,
  Image as ImageIcon,
  FolderPlus,
  CheckCircle2,
  Images
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { STUDENT_SUPPORT_DATA } from "@/components/student-support/staticData";

const DEFAULT_PDF = "/documents/DefaultFile_1.pdf";

interface DocRecord {
  title: string;
  fileUrl: string;
  year?: string;
  subtitle?: string;
}

interface PhotoItem {
  id?: string;
  url: string;
  title?: string;
  caption?: string;
}

interface PhotoGroup {
  id: string;
  title: string;
  year: string;
  caption?: string;
  images: PhotoItem[];
}

/**
 * Normalizes legacy single-image objects or photo group objects into PhotoGroup array
 */
function normalizeToPhotoGroups(rawList: any[]): PhotoGroup[] {
  if (!Array.isArray(rawList)) return [];
  return rawList.map((item, idx) => {
    if (!item) {
      return {
        id: `grp-${Date.now()}-${idx}`,
        title: "Untitled Group",
        year: "2025–2026",
        caption: "",
        images: [],
      };
    }
    // If it's already a group with images array
    if (Array.isArray(item.images)) {
      return {
        id: item.id || `grp-${Date.now()}-${idx}`,
        title: item.title || item.folderName || "Photo Group",
        year: item.year || "2025–2026",
        caption: item.caption || "",
        images: item.images.map((img: any, pIdx: number) => ({
          id: img.id || `img-${idx}-${pIdx}`,
          url: img.url,
          title: img.title || item.title || "Photo",
          caption: img.caption || item.caption || "",
        })),
      };
    }
    // If it's a legacy single photo object with url
    return {
      id: item.id || `grp-${Date.now()}-${idx}`,
      title: item.title || "Photo Group",
      year: item.year || "2025–2026",
      caption: item.caption || "",
      images: item.url
        ? [
            {
              id: `img-${idx}-0`,
              url: item.url,
              title: item.title || "Photo",
              caption: item.caption || "",
            },
          ]
        : [],
    };
  });
}

export function StudentSupportManager() {
  const [data, setData] = useState<any>(STUDENT_SUPPORT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main Section Tab: "welfare" | "sports" | "outreach" | "capacity" | "laurels"
  const [activeSection, setActiveSection] = useState<
    "welfare" | "sports" | "outreach" | "capacity" | "laurels"
  >("welfare");

  // Sub-tab for Section A Welfare Cells
  const [activeWelfareCell, setActiveWelfareCell] = useState<string>("anti-ragging");

  // Sub-tab for Section B Sports Pillars (9 items)
  const [activeSportsPillar, setActiveSportsPillar] = useState<string>("sports-facilities");

  // Sub-tab for Section C Outreach Wings (6 wings)
  const [activeOutreachWing, setActiveOutreachWing] = useState<string>("nss");

  // Modal State for Add / Edit Annual Report / PDF
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>(""); 
  const [editingDoc, setEditingDoc] = useState<DocRecord>({
    title: "",
    fileUrl: "",
    year: "",
    subtitle: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Unified Group Photos Modal State ──
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupCategory, setGroupCategory] = useState<"sports" | "outreach" | "capacity" | "laurels">("sports");
  const [groupWingSlug, setGroupWingSlug] = useState<string>("");
  const [editingGroupIndex, setEditingGroupIndex] = useState<number | null>(null);
  const [groupData, setGroupData] = useState<PhotoGroup>({
    id: "",
    title: "",
    year: "2025–2026",
    caption: "",
    images: [],
  });
  const [isUploadingGroupImages, setIsUploadingGroupImages] = useState(false);
  const [groupUploadProgress, setGroupUploadProgress] = useState<string>("");
  const groupFileInputRef = useRef<HTMLInputElement>(null);

  // PDF Preview State
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  // Image Preview State (Lightbox)
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; caption?: string } | null>(null);

  // Direct upload tracking for Section A Core Institutional Policy/Order PDFs
  const [uploadingCoreField, setUploadingCoreField] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/student-support");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setData(STUDENT_SUPPORT_DATA);
      }
    } catch (err: any) {
      setError(err.message || "Network error loading student support data.");
      setData(STUDENT_SUPPORT_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToSanity = async () => {
    if (!data) return;
    setSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/student-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setError(json.error || "Failed to save student support data in Sanity.");
      }
    } catch (err: any) {
      setError(err.message || "Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Upload handler for PDF
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a valid PDF file.");
      return;
    }

    try {
      setIsUploading(true);
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

      setEditingDoc((prev) => ({
        ...prev,
        fileUrl: json.url,
        title: prev.title ? prev.title : file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      }));
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Direct upload handler for Core Institutional Policies & Orders in Section A
  const handleCorePdfUpload = async (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a valid PDF file.");
      return;
    }

    try {
      setUploadingCoreField(field);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "file");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!json.success || !json.url) {
        throw new Error(json.error || "Upload failed");
      }

      handleUpdateWelfareCellField(field, json.url);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingCoreField(null);
      e.target.value = "";
    }
  };

  // ── Multi-image Upload handler for Group of Photos ──
  const handleGroupImagesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingGroupImages(true);
    const total = files.length;
    const uploadedImages: PhotoItem[] = [];

    for (let i = 0; i < total; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      setGroupUploadProgress(`Uploading ${i + 1} of ${total}: ${file.name}...`);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image");

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();
        if (json.success && json.url) {
          const autoTitle = groupData.title.trim()
            ? (total > 1 ? `${groupData.title.trim()} (${i + 1})` : groupData.title.trim())
            : file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

          uploadedImages.push({
            id: `img-${Date.now()}-${i}`,
            url: json.url,
            title: autoTitle,
            caption: groupData.caption || "",
          });
        }
      } catch (err) {
        console.error(`Error uploading image ${file.name}:`, err);
      }
    }

    setGroupData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedImages],
    }));
    setIsUploadingGroupImages(false);
    setGroupUploadProgress("");
    if (groupFileInputRef.current) groupFileInputRef.current.value = "";
  };

  // Helper to open Add modal (PDF)
  const openAddModal = (type: string, defaultTitle = "") => {
    setModalType(type);
    setEditingDoc({
      title: defaultTitle,
      fileUrl: "",
      year: "2026–2027",
      subtitle: "Academic Year Report",
    });
    setEditIndex(null);
    setModalOpen(true);
  };

  // Helper to open Edit modal (PDF)
  const openEditModal = (type: string, doc: DocRecord, index: number) => {
    setModalType(type);
    setEditingDoc({ ...doc });
    setEditIndex(index);
    setModalOpen(true);
  };

  // Helper to save from PDF modal into active state
  const handleSaveModal = () => {
    if (!editingDoc.title.trim()) {
      alert("Please provide a title for the document.");
      return;
    }

    const updated = JSON.parse(JSON.stringify(data));

    if (modalType === "welfare-annual-report") {
      const cellIndex = updated.welfareServices.items.findIndex(
        (c: any) => c.slug === activeWelfareCell
      );
      if (cellIndex !== -1) {
        const cell = updated.welfareServices.items[cellIndex];
        if (!cell.annualReports) cell.annualReports = [];

        if (editIndex !== null) {
          cell.annualReports[editIndex] = editingDoc;
        } else {
          cell.annualReports.unshift(editingDoc);
        }
      }
    } else if (modalType === "sports-pillar-report") {
      if (!updated.sportsAndGames) updated.sportsAndGames = { pillars: [] };
      const pillarIndex = (updated.sportsAndGames.pillars || []).findIndex(
        (p: any) => p.slug === activeSportsPillar
      );
      if (pillarIndex !== -1) {
        const pillar = updated.sportsAndGames.pillars[pillarIndex];
        if (!pillar.reports) pillar.reports = [];
        if (editIndex !== null) {
          pillar.reports[editIndex] = editingDoc;
        } else {
          pillar.reports.unshift(editingDoc);
        }
      }
    } else if (modalType === "outreach-wing-report") {
      if (!updated.extensionOutreach) updated.extensionOutreach = { wings: [] };
      const wingIndex = (updated.extensionOutreach.wings || []).findIndex(
        (w: any) => w.slug === activeOutreachWing
      );
      if (wingIndex !== -1) {
        const wing = updated.extensionOutreach.wings[wingIndex];
        if (!wing.reports) wing.reports = [];
        if (editIndex !== null) {
          wing.reports[editIndex] = editingDoc;
        } else {
          wing.reports.unshift(editingDoc);
        }
      }
    } else if (modalType === "capacity-report") {
      if (!updated.capacityBuilding) updated.capacityBuilding = { reports: [], gallery: [] };
      if (!updated.capacityBuilding.reports) updated.capacityBuilding.reports = [];
      if (editIndex !== null) {
        updated.capacityBuilding.reports[editIndex] = editingDoc;
      } else {
        updated.capacityBuilding.reports.unshift(editingDoc);
      }
      updated.capacityReports = updated.capacityBuilding.reports;
    } else if (modalType === "laurel-report") {
      if (!updated.studentAchievements) updated.studentAchievements = { reports: [], gallery: [] };
      if (!updated.studentAchievements.reports) updated.studentAchievements.reports = [];
      if (editIndex !== null) {
        updated.studentAchievements.reports[editIndex] = editingDoc;
      } else {
        updated.studentAchievements.reports.unshift(editingDoc);
      }
      updated.laurelReports = updated.studentAchievements.reports;
    }

    setData(updated);
    setModalOpen(false);
  };

  // Helper to delete a report from list
  const handleDeleteReport = (type: string, index: number) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    const updated = JSON.parse(JSON.stringify(data));

    if (type === "welfare-annual-report") {
      const cellIndex = updated.welfareServices.items.findIndex(
        (c: any) => c.slug === activeWelfareCell
      );
      if (cellIndex !== -1) {
        updated.welfareServices.items[cellIndex].annualReports.splice(index, 1);
      }
    } else if (type === "sports-pillar-report") {
      const pillarIndex = (updated.sportsAndGames?.pillars || []).findIndex(
        (p: any) => p.slug === activeSportsPillar
      );
      if (pillarIndex !== -1 && updated.sportsAndGames.pillars[pillarIndex].reports) {
        updated.sportsAndGames.pillars[pillarIndex].reports.splice(index, 1);
      }
    } else if (type === "outreach-wing-report") {
      const wingIndex = (updated.extensionOutreach?.wings || []).findIndex(
        (w: any) => w.slug === activeOutreachWing
      );
      if (wingIndex !== -1 && updated.extensionOutreach.wings[wingIndex].reports) {
        updated.extensionOutreach.wings[wingIndex].reports.splice(index, 1);
      }
    } else if (type === "capacity-report") {
      if (updated.capacityBuilding?.reports) {
        updated.capacityBuilding.reports.splice(index, 1);
        updated.capacityReports = updated.capacityBuilding.reports;
      }
    } else if (type === "laurel-report") {
      if (updated.studentAchievements?.reports) {
        updated.studentAchievements.reports.splice(index, 1);
        updated.laurelReports = updated.studentAchievements.reports;
      }
    }

    setData(updated);
  };

  // Helper to open Add Group Modal
  const openAddGroupModal = (
    category: "sports" | "outreach" | "capacity" | "laurels",
    wingSlug = "",
    defaultTitle = ""
  ) => {
    setGroupCategory(category);
    setGroupWingSlug(wingSlug || (category === "sports" ? activeSportsPillar : activeOutreachWing));
    setEditingGroupIndex(null);
    setGroupData({
      id: `grp-${Date.now()}`,
      title: defaultTitle,
      year: "2025–2026",
      caption: "",
      images: [],
    });
    setGroupUploadProgress("");
    setGroupModalOpen(true);
  };

  // Helper to open Edit Group Modal
  const openEditGroupModal = (
    category: "sports" | "outreach" | "capacity" | "laurels",
    group: PhotoGroup,
    index: number,
    wingSlug = ""
  ) => {
    setGroupCategory(category);
    setGroupWingSlug(wingSlug || (category === "sports" ? activeSportsPillar : activeOutreachWing));
    setEditingGroupIndex(index);
    setGroupData({
      id: group.id,
      title: group.title,
      year: group.year,
      caption: group.caption || "",
      images: [...group.images],
    });
    setGroupUploadProgress("");
    setGroupModalOpen(true);
  };

  // Helper to save Group into state
  const handleSaveGroup = () => {
    if (!groupData.title.trim()) {
      alert("Please provide a title/occasion for this photo group.");
      return;
    }
    if (groupData.images.length === 0) {
      alert("Please upload at least one photo in this group.");
      return;
    }

    const updated = JSON.parse(JSON.stringify(data));

    if (groupCategory === "sports") {
      if (!updated.sportsAndGames) updated.sportsAndGames = { pillars: [] };
      const pillarIndex = (updated.sportsAndGames.pillars || []).findIndex(
        (p: any) => p.slug === (groupWingSlug || activeSportsPillar)
      );
      if (pillarIndex !== -1) {
        const pillar = updated.sportsAndGames.pillars[pillarIndex];
        const currentList = normalizeToPhotoGroups(pillar.gallery || []);
        if (editingGroupIndex !== null) {
          currentList[editingGroupIndex] = groupData;
        } else {
          currentList.unshift(groupData);
        }
        pillar.gallery = currentList;
      }
    } else if (groupCategory === "outreach") {
      if (!updated.extensionOutreach) updated.extensionOutreach = { wings: [] };
      const wingIndex = (updated.extensionOutreach.wings || []).findIndex(
        (w: any) => w.slug === (groupWingSlug || activeOutreachWing)
      );
      if (wingIndex !== -1) {
        const wing = updated.extensionOutreach.wings[wingIndex];
        const currentList = normalizeToPhotoGroups(wing.gallery || []);
        if (editingGroupIndex !== null) {
          currentList[editingGroupIndex] = groupData;
        } else {
          currentList.unshift(groupData);
        }
        wing.gallery = currentList;
      }
    } else if (groupCategory === "capacity") {
      if (!updated.capacityBuilding) updated.capacityBuilding = { reports: [], gallery: [] };
      const currentList = normalizeToPhotoGroups(updated.capacityBuilding.gallery || []);
      if (editingGroupIndex !== null) {
        currentList[editingGroupIndex] = groupData;
      } else {
        currentList.unshift(groupData);
      }
      updated.capacityBuilding.gallery = currentList;
    } else if (groupCategory === "laurels") {
      if (!updated.studentAchievements) updated.studentAchievements = { reports: [], gallery: [] };
      const currentList = normalizeToPhotoGroups(updated.studentAchievements.gallery || []);
      if (editingGroupIndex !== null) {
        currentList[editingGroupIndex] = groupData;
      } else {
        currentList.unshift(groupData);
      }
      updated.studentAchievements.gallery = currentList;
    }

    setData(updated);
    setGroupModalOpen(false);
  };

  // Helper to delete entire Group
  const handleDeleteGroup = (
    category: "sports" | "outreach" | "capacity" | "laurels",
    index: number,
    wingSlug = ""
  ) => {
    if (!window.confirm("Are you sure you want to delete this entire photo group?")) return;
    const updated = JSON.parse(JSON.stringify(data));

    if (category === "sports") {
      const pillarIndex = (updated.sportsAndGames?.pillars || []).findIndex(
        (p: any) => p.slug === (wingSlug || activeSportsPillar)
      );
      if (pillarIndex !== -1) {
        const currentList = normalizeToPhotoGroups(updated.sportsAndGames.pillars[pillarIndex].gallery || []);
        currentList.splice(index, 1);
        updated.sportsAndGames.pillars[pillarIndex].gallery = currentList;
      }
    } else if (category === "outreach") {
      const wingIndex = (updated.extensionOutreach?.wings || []).findIndex(
        (w: any) => w.slug === (wingSlug || activeOutreachWing)
      );
      if (wingIndex !== -1) {
        const currentList = normalizeToPhotoGroups(updated.extensionOutreach.wings[wingIndex].gallery || []);
        currentList.splice(index, 1);
        updated.extensionOutreach.wings[wingIndex].gallery = currentList;
      }
    } else if (category === "capacity") {
      const currentList = normalizeToPhotoGroups(updated.capacityBuilding?.gallery || []);
      currentList.splice(index, 1);
      if (!updated.capacityBuilding) updated.capacityBuilding = {};
      updated.capacityBuilding.gallery = currentList;
    } else if (category === "laurels") {
      const currentList = normalizeToPhotoGroups(updated.studentAchievements?.gallery || []);
      currentList.splice(index, 1);
      if (!updated.studentAchievements) updated.studentAchievements = {};
      updated.studentAchievements.gallery = currentList;
    }

    setData(updated);
  };

  // Helper to update text fields in active welfare cell
  const handleUpdateWelfareCellField = (field: string, value: string) => {
    const updated = JSON.parse(JSON.stringify(data));
    const cellIndex = updated.welfareServices.items.findIndex(
      (c: any) => c.slug === activeWelfareCell
    );
    if (cellIndex !== -1) {
      updated.welfareServices.items[cellIndex][field] = value;
      setData(updated);
    }
  };

  // Helper to update sports pillar description
  const handleUpdateSportsPillarDesc = (desc: string) => {
    const updated = JSON.parse(JSON.stringify(data));
    const pillarIndex = (updated.sportsAndGames?.pillars || []).findIndex(
      (p: any) => p.slug === activeSportsPillar
    );
    if (pillarIndex !== -1) {
      updated.sportsAndGames.pillars[pillarIndex].desc = desc;
      setData(updated);
    }
  };

  // Helper to update wing description in outreach
  const handleUpdateWingDesc = (desc: string) => {
    const updated = JSON.parse(JSON.stringify(data));
    const wingIndex = (updated.extensionOutreach?.wings || []).findIndex(
      (w: any) => w.slug === activeOutreachWing
    );
    if (wingIndex !== -1) {
      updated.extensionOutreach.wings[wingIndex].desc = desc;
      setData(updated);
    }
  };

  // Helper to update capacity description
  const handleUpdateCapacityDesc = (description: string) => {
    const updated = JSON.parse(JSON.stringify(data));
    if (!updated.capacityBuilding) updated.capacityBuilding = {};
    updated.capacityBuilding.description = description;
    setData(updated);
  };

  // Helper to update laurels description
  const handleUpdateLaurelsDesc = (description: string) => {
    const updated = JSON.parse(JSON.stringify(data));
    if (!updated.studentAchievements) updated.studentAchievements = {};
    updated.studentAchievements.description = description;
    setData(updated);
  };

  const currentWelfareCell =
    data?.welfareServices?.items?.find((c: any) => c.slug === activeWelfareCell) ||
    data?.welfareServices?.items?.[0];

  const welfareCellsList = data?.welfareServices?.items || [];

  const sportsPillarsList = data?.sportsAndGames?.pillars || STUDENT_SUPPORT_DATA.sportsAndGames.pillars;
  const currentSportsPillar =
    sportsPillarsList.find((p: any) => p.slug === activeSportsPillar) ||
    STUDENT_SUPPORT_DATA.sportsAndGames.pillars.find((p: any) => p.slug === activeSportsPillar) ||
    sportsPillarsList[0] ||
    STUDENT_SUPPORT_DATA.sportsAndGames.pillars[0];

  const sportsPillarGalleryGroups = normalizeToPhotoGroups(currentSportsPillar.gallery || []);

  const currentOutreachWing =
    data?.extensionOutreach?.wings?.find((w: any) => w.slug === activeOutreachWing) ||
    STUDENT_SUPPORT_DATA.extensionOutreach.wings.find((w: any) => w.slug === activeOutreachWing) ||
    data?.extensionOutreach?.wings?.[0] ||
    STUDENT_SUPPORT_DATA.extensionOutreach.wings[0];

  const outreachWingsList = data?.extensionOutreach?.wings || STUDENT_SUPPORT_DATA.extensionOutreach.wings;
  const outreachGalleryGroups = normalizeToPhotoGroups(currentOutreachWing.gallery || []);

  const capacityBuildingData = data?.capacityBuilding || STUDENT_SUPPORT_DATA.capacityBuilding;
  const capacityReports = capacityBuildingData.reports || data?.capacityReports || [];
  const capacityGalleryGroups = normalizeToPhotoGroups(capacityBuildingData.gallery || []);

  const studentAchievementsData = data?.studentAchievements || STUDENT_SUPPORT_DATA.studentAchievements;
  const laurelsReports = studentAchievementsData.reports || data?.laurelReports || [];
  const laurelsGalleryGroups = normalizeToPhotoGroups(studentAchievementsData.gallery || []);

  /**
   * Helper to render Core Institutional Policy / Order field with direct PDF upload
   */
  const renderCoreDocField = (
    field: "committeePdf" | "policyPdf" | "sopPdf" | "guidelinesPdf" | "aboutPdf",
    label: string,
    badgeText: string
  ) => {
    const val = currentWelfareCell?.[field] ?? "";
    const isThisUploading = uploadingCoreField === field;

    return (
      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5 flex flex-col justify-between shadow-2xs hover:border-blue-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-blue-950 uppercase tracking-wide">
            {label}
          </span>
          <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md border border-blue-200/60">
            {badgeText}
          </span>
        </div>

        <input
          type="text"
          value={val}
          onChange={(e) => handleUpdateWelfareCellField(field, e.target.value)}
          placeholder="/documents/student-support/... or https://..."
          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold cursor-pointer transition-all shadow-2xs">
            {isThisUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            <span>{isThisUploading ? "Uploading..." : "Upload PDF"}</span>
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              disabled={isThisUploading}
              onChange={(e) => handleCorePdfUpload(field, e)}
            />
          </label>

          <div className="flex items-center gap-2">
            {val && (
              <button
                type="button"
                onClick={() => setPreviewPdf({ url: val, title: label })}
                className="text-[11px] font-bold text-blue-800 hover:text-blue-950 bg-white hover:bg-blue-50 border border-slate-200 px-2.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                <Eye className="h-3.5 w-3.5 text-blue-600" />
                <span>Preview</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Helper to render Photo Group Card
   */
  const renderPhotoGroupCard = (
    group: PhotoGroup,
    idx: number,
    category: "sports" | "outreach" | "capacity" | "laurels",
    wingSlug = ""
  ) => {
    const coverImage = group.images[0]?.url || "/images/infrastructure/cultural-recreation/img-1.jpg";
    const totalPhotos = group.images.length;

    return (
      <div
        key={group.id || idx}
        className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
      >
        {/* Card Image Banner */}
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt={group.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e: any) => {
              e.currentTarget.src = "/images/infrastructure/cultural-recreation/img-1.jpg";
            }}
          />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-lg bg-black/75 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1">
              <Calendar className="h-3 w-3 text-amber-300" />
              <span>{group.year}</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-700/90 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1">
              <Images className="h-3 w-3" />
              <span>{totalPhotos} {totalPhotos === 1 ? "Photo" : "Photos"}</span>
            </span>
          </div>
        </div>

        {/* Card Info */}
        <div className="p-4 flex flex-col justify-between flex-1 gap-3">
          <div>
            <h5 className="font-outfit font-extrabold text-sm text-slate-900 leading-snug line-clamp-1">
              {group.title}
            </h5>
            {group.caption && (
              <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium leading-relaxed">
                {group.caption}
              </p>
            )}

            {/* Thumbnail previews if multiple */}
            {group.images.length > 1 && (
              <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto py-1">
                {group.images.slice(0, 4).map((img, pIdx) => (
                  <div
                    key={pIdx}
                    className="h-9 w-12 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                {group.images.length > 4 && (
                  <span className="text-[10px] font-bold text-slate-400 pl-1">
                    +{group.images.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setPreviewImage({
                  url: coverImage,
                  title: `${group.title} (${group.year})`,
                  caption: group.caption,
                })
              }
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => openEditGroupModal(category, group, idx, wingSlug)}
                className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                title="Edit Group & Photos"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteGroup(category, idx, wingSlug)}
                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                title="Delete Entire Photo Group"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* =========================================================================
          TOP ACTION HEADER BAR
         ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002147] text-white shadow-sm shrink-0">
            <HeartHandshake className="h-6 w-6 text-amber-300" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-outfit font-black text-xl text-[#002147] tracking-tight">
                Student Support Services Manager
              </h2>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                5 Portal Sections
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage committee orders, statutory policies, online forms, year-wise reports and group photo galleries.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchData}
            disabled={loading || saving}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <a
            href="/student-support"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer shadow-2xs"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Live Portal</span>
          </a>

          <button
            type="button"
            onClick={handleSaveToSanity}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#002147] hover:bg-[#003366] transition-all shadow-sm hover:shadow hover:scale-105 active:scale-95 cursor-pointer"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5 text-amber-300" />}
            <span>{saving ? "Saving Changes..." : "Save All to Sanity"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-xs animate-fadeIn">
          <Check className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Student Support Services data successfully published and synced with Sanity!</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-xs animate-fadeIn">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* =========================================================================
          MAIN SECTION TABS (5 SECTIONS)
         ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/90 text-xs font-bold">
        {[
          { id: "welfare", label: "A. Support & Welfare (11 Cells)", icon: ShieldCheck },
          { id: "sports", label: "B. Sports & Games (9 Pillars)", icon: Trophy },
          { id: "outreach", label: "C. Extension & Outreach (6 Wings)", icon: Flag },
          { id: "capacity", label: "D. Workshops & Seminars", icon: Compass },
          { id: "laurels", label: "E. Student Laurels", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "bg-[#002147] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-amber-300" : "text-slate-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          SECTION A: SUPPORT & WELFARE CELLS
         ========================================================================= */}
      {activeSection === "welfare" && (
        <div className="space-y-6">
          {/* Sub-Tabs: 11 Cells / Committees */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/90 overflow-x-auto custom-scrollbar">
            {welfareCellsList.map((cell: any) => {
              const isActive = activeWelfareCell === cell.slug;
              return (
                <button
                  key={cell.slug}
                  onClick={() => setActiveWelfareCell(cell.slug)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#1e40af] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span>{cell.number}. {cell.title.split("/")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {currentWelfareCell && (
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              {/* Cell Header Details */}
              <div className="border-b border-slate-100 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      Cell #{currentWelfareCell.number}
                    </span>
                    <h3 className="font-outfit font-black text-lg sm:text-xl text-[#002147]">
                      {currentWelfareCell.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {currentWelfareCell.tagline}
                  </p>
                </div>

                {/* Form URL input if present */}
                <div className="flex items-center gap-2 max-w-md w-full">
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                      Form:
                    </span>
                    <input
                      type="text"
                      placeholder="Online Google Form URL..."
                      value={currentWelfareCell.formUrl || ""}
                      onChange={(e) => handleUpdateWelfareCellField("formUrl", e.target.value)}
                      className="w-full pl-14 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 1. Core Institutional Documents Box */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-800">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-blue-900">
                    1. Core Institutional Policies &amp; Orders
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Committee Order */}
                  {currentWelfareCell.committeePdf !== undefined &&
                    renderCoreDocField("committeePdf", "Committee Order", "Official Order")}

                  {/* Institutional Policy */}
                  {currentWelfareCell.policyPdf !== undefined &&
                    renderCoreDocField("policyPdf", "Institutional Policy", "Policy Document")}

                  {/* Guidelines / Schemes */}
                  {currentWelfareCell.guidelinesPdf !== undefined &&
                    renderCoreDocField("guidelinesPdf", "Committee Guidelines / Scheme", "Guidelines Document")}

                  {/* SOP Document */}
                  {currentWelfareCell.sopPdf !== undefined &&
                    renderCoreDocField("sopPdf", "Standard Operating Procedure", "SOP Document")}

                  {/* About Document */}
                  {currentWelfareCell.aboutPdf !== undefined &&
                    renderCoreDocField("aboutPdf", "About / Charter Document", "Charter Document")}
                </div>
              </div>

              {/* 2. Year-wise Annual Reports */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
                      <Calendar className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-emerald-900">
                      2. Year-wise Annual Reports &amp; Documentation ({(currentWelfareCell.annualReports || []).length})
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openAddModal(
                        "welfare-annual-report",
                        `${currentWelfareCell.title} Report 2026–2027`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Annual Report</span>
                  </button>
                </div>

                {/* Table of Annual Reports */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Report Title</th>
                        <th className="py-3 px-4">File Path / URL</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(currentWelfareCell.annualReports || []).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-6 text-slate-400">
                            No annual reports added yet for this cell. Click &quot;Add Annual Report&quot; to upload one.
                          </td>
                        </tr>
                      ) : (
                        (currentWelfareCell.annualReports || []).map((rep: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">
                                {rep.year}
                              </span>
                              {idx === 0 && (
                                <span className="ml-2 text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                                  Latest
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-800">
                              {rep.title}
                            </td>
                            <td className="py-3 px-4 text-slate-500 truncate max-w-xs">
                              {rep.fileUrl || DEFAULT_PDF}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPreviewPdf({
                                      url: rep.fileUrl || DEFAULT_PDF,
                                      title: rep.title,
                                    })
                                  }
                                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                                  title="View PDF"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    openEditModal("welfare-annual-report", rep, idx)
                                  }
                                  className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                                  title="Edit Report"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteReport("welfare-annual-report", idx)
                                  }
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                                  title="Delete Report"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SECTION B: SPORTS & GAMES (9 PILLARS WITH REPORTS & PHOTO GROUPS)
         ========================================================================= */}
      {activeSection === "sports" && (
        <div className="space-y-6">
          {/* Sub-Tabs: 9 Sports Pillars */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/90 overflow-x-auto custom-scrollbar">
            {sportsPillarsList.map((pillar: any, idx: number) => {
              const isActive = activeSportsPillar === pillar.slug;
              return (
                <button
                  key={pillar.slug || idx}
                  onClick={() => setActiveSportsPillar(pillar.slug)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-800 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span>{pillar.title.replace(/^\d+\.\s*/, "").split("(")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {currentSportsPillar && (
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              {/* Pillar Header Details */}
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold">
                      <Trophy className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-outfit font-black text-xl text-[#002147]">
                        {currentSportsPillar.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Manage annual PDF reports and photo gallery groups for this sports programme.
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
                    Slug: {currentSportsPillar.slug}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Programme Description
                  </label>
                  <textarea
                    rows={2}
                    value={currentSportsPillar.desc || ""}
                    onChange={(e) => handleUpdateSportsPillarDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                    placeholder="Programme description and athletic activities..."
                  />
                </div>
              </div>

              {/* 1. Pillar Yearly PDF Reports */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-800">
                      <FileText className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-blue-900">
                      1. Yearly Reports Archive ({(currentSportsPillar.reports || []).length} PDFs)
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openAddModal(
                        "sports-pillar-report",
                        `${currentSportsPillar.title.replace(/^\d+\.\s*/, "")} Report 2026–2027`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add PDF Report</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Report Title</th>
                        <th className="py-3 px-4">File Path / URL</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(currentSportsPillar.reports || []).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-6 text-slate-400">
                            No reports added yet for this sports programme. Click &quot;Add PDF Report&quot; to upload one.
                          </td>
                        </tr>
                      ) : (
                        (currentSportsPillar.reports || []).map((rep: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-extrabold">
                                {rep.year}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-800">{rep.title}</td>
                            <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{rep.fileUrl || DEFAULT_PDF}</td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setPreviewPdf({ url: rep.fileUrl || DEFAULT_PDF, title: rep.title })}
                                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openEditModal("sports-pillar-report", rep, idx)}
                                  className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteReport("sports-pillar-report", idx)}
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Pillar Photo Gallery (Groups Only) */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    </span>
                    <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-emerald-900">
                      2. Photo Gallery ({sportsPillarGalleryGroups.length} Photo Groups)
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openAddGroupModal(
                        "sports",
                        currentSportsPillar.slug,
                        `${currentSportsPillar.title.replace(/^\d+\.\s*/, "").split("(")[0].trim()} Activity`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <FolderPlus className="h-3.5 w-3.5 text-amber-300" />
                    <span>+ Upload Group of Photos</span>
                  </button>
                </div>

                {sportsPillarGalleryGroups.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400 text-xs">
                    No photo groups added yet for this sports programme. Click &quot;+ Upload Group of Photos&quot; to add photographs.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                    {sportsPillarGalleryGroups.map((group, idx) =>
                      renderPhotoGroupCard(group, idx, "sports", currentSportsPillar.slug)
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SECTION C: EXTENSION & OUTREACH (6 WINGS WITH PHOTO GROUPS)
         ========================================================================= */}
      {activeSection === "outreach" && (
        <div className="space-y-6">
          {/* Sub-Tabs: 6 Outreach Wings */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/90 overflow-x-auto custom-scrollbar">
            {outreachWingsList.map((wing: any, idx: number) => {
              const isActive = activeOutreachWing === wing.slug;
              return (
                <button
                  key={wing.slug || idx}
                  onClick={() => setActiveOutreachWing(wing.slug)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span>{wing.title.replace(/^\d+\.\s*/, "").split("(")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {currentOutreachWing && (
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              {/* Wing Header Details */}
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                      <Flag className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-outfit font-black text-xl text-[#002147]">
                        {currentOutreachWing.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Manage annual PDF reports and photo gallery groups for this outreach wing.
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                    Slug: {currentOutreachWing.slug}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Wing Description
                  </label>
                  <textarea
                    rows={2}
                    value={currentOutreachWing.desc || ""}
                    onChange={(e) => handleUpdateWingDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                    placeholder="Outreach wing description and community impact..."
                  />
                </div>
              </div>

              {/* 1. Wing Yearly PDF Reports */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-800">
                      <FileText className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-blue-900">
                      1. Yearly Reports Archive ({(currentOutreachWing.reports || []).length} PDFs)
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openAddModal(
                        "outreach-wing-report",
                        `${currentOutreachWing.title.replace(/^\d+\.\s*/, "")} Report 2026–2027`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add PDF Report</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Report Title</th>
                        <th className="py-3 px-4">File Path / URL</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(currentOutreachWing.reports || []).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-6 text-slate-400">
                            No reports added yet for this wing. Click &quot;Add PDF Report&quot; to upload one.
                          </td>
                        </tr>
                      ) : (
                        (currentOutreachWing.reports || []).map((rep: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-extrabold">
                                {rep.year}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-800">{rep.title}</td>
                            <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{rep.fileUrl || DEFAULT_PDF}</td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setPreviewPdf({ url: rep.fileUrl || DEFAULT_PDF, title: rep.title })}
                                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openEditModal("outreach-wing-report", rep, idx)}
                                  className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteReport("outreach-wing-report", idx)}
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Wing Photo Gallery (Groups Only) */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    </span>
                    <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-emerald-900">
                      2. Photo Gallery ({outreachGalleryGroups.length} Photo Groups)
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openAddGroupModal(
                        "outreach",
                        currentOutreachWing.slug,
                        `${currentOutreachWing.title.replace(/^\d+\.\s*/, "").split("(")[0].trim()} Activities`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <FolderPlus className="h-3.5 w-3.5 text-amber-300" />
                    <span>+ Upload Group of Photos</span>
                  </button>
                </div>

                {outreachGalleryGroups.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400 text-xs">
                    No photo groups added yet for this wing. Click &quot;+ Upload Group of Photos&quot; to add photographs.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                    {outreachGalleryGroups.map((group, idx) =>
                      renderPhotoGroupCard(group, idx, "outreach", currentOutreachWing.slug)
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SECTION D: WORKSHOPS & SEMINARS (REPORTS & GROUP GALLERIES)
         ========================================================================= */}
      {activeSection === "capacity" && (
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="border-b border-slate-100 pb-5 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sky-700 font-bold">
                  <Compass className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-outfit font-black text-xl text-[#002147]">
                    Workshops &amp; Seminars Manager
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Manage workshops, seminars schedules, expert training sessions, and group photo galleries.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Section Description
              </label>
              <textarea
                rows={2}
                value={capacityBuildingData.description || ""}
                onChange={(e) => handleUpdateCapacityDesc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                placeholder="Description of workshops, seminars and skill development programmes..."
              />
            </div>
          </div>

          {/* 1. PDF Reports */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-800">
                  <FileText className="h-3.5 w-3.5" />
                </span>
                <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-blue-900">
                  1. Workshops &amp; Seminars Documentation ({capacityReports.length} Reports)
                </h4>
              </div>

              <button
                type="button"
                onClick={() => openAddModal("capacity-report", "Workshops & Seminars Schedule")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Capacity Report</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                    <th className="py-3 px-4">Academic Year</th>
                    <th className="py-3 px-4">Report Title</th>
                    <th className="py-3 px-4">File Path / URL</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {capacityReports.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-slate-400">
                        No reports added yet. Click &quot;Add Capacity Report&quot; to upload one.
                      </td>
                    </tr>
                  ) : (
                    capacityReports.map((rep: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">
                            {rep.year}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{rep.title}</td>
                        <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{rep.fileUrl || DEFAULT_PDF}</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setPreviewPdf({ url: rep.fileUrl || DEFAULT_PDF, title: rep.title })}
                              className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditModal("capacity-report", rep, idx)}
                              className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteReport("capacity-report", idx)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Photo Gallery (Groups Only) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </span>
                <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-emerald-900">
                  2. Workshops &amp; Seminars Photo Gallery ({capacityGalleryGroups.length} Photo Groups)
                </h4>
              </div>

              <button
                type="button"
                onClick={() => openAddGroupModal("capacity", "", "Technical Workshops & Seminars")}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <FolderPlus className="h-3.5 w-3.5 text-amber-300" />
                <span>+ Upload Group of Photos</span>
              </button>
            </div>

            {capacityGalleryGroups.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400 text-xs">
                No gallery photo groups added yet. Click &quot;+ Upload Group of Photos&quot; to add albums.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                {capacityGalleryGroups.map((group, idx) =>
                  renderPhotoGroupCard(group, idx, "capacity")
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION E: STUDENT LAURELS (REPORTS & GROUP GALLERIES)
         ========================================================================= */}
      {activeSection === "laurels" && (
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="border-b border-slate-100 pb-5 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-outfit font-black text-xl text-[#002147]">
                    Student Laurels &amp; Recognitions Manager
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Manage university ranks, state/national awards records archive, and photo gallery groups.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Section Description
              </label>
              <textarea
                rows={2}
                value={studentAchievementsData.description || ""}
                onChange={(e) => handleUpdateLaurelsDesc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                placeholder="Description of student participation, laurels, university ranks and awards..."
              />
            </div>
          </div>

          {/* 1. PDF Reports */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-800">
                  <FileText className="h-3.5 w-3.5" />
                </span>
                <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-blue-900">
                  1. Student Laurels &amp; Awards Archive ({laurelsReports.length} Records)
                </h4>
              </div>

              <button
                type="button"
                onClick={() => openAddModal("laurel-report", "Student Laurels & University Ranks")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Laurels Record</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                    <th className="py-3 px-4">Academic Year</th>
                    <th className="py-3 px-4">Record Title</th>
                    <th className="py-3 px-4">File Path / URL</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {laurelsReports.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-slate-400">
                        No laurel records added yet. Click &quot;Add Laurels Record&quot; to upload one.
                      </td>
                    </tr>
                  ) : (
                    laurelsReports.map((rep: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">
                            {rep.year}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{rep.title}</td>
                        <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{rep.fileUrl || DEFAULT_PDF}</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setPreviewPdf({ url: rep.fileUrl || DEFAULT_PDF, title: rep.title })}
                              className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditModal("laurel-report", rep, idx)}
                              className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteReport("laurel-report", idx)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Photo Gallery (Groups Only) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </span>
                <h4 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-emerald-900">
                  2. Student Laurels &amp; Awards Photo Gallery ({laurelsGalleryGroups.length} Photo Groups)
                </h4>
              </div>

              <button
                type="button"
                onClick={() => openAddGroupModal("laurels", "", "Gold Medalists & Champions Felicitation")}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <FolderPlus className="h-3.5 w-3.5 text-amber-300" />
                <span>+ Upload Group of Photos</span>
              </button>
            </div>

            {laurelsGalleryGroups.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400 text-xs">
                No gallery photo groups added yet. Click &quot;+ Upload Group of Photos&quot; to add albums.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                {laurelsGalleryGroups.map((group, idx) =>
                  renderPhotoGroupCard(group, idx, "laurels")
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          GROUP PHOTO UPLOAD / EDIT MODAL DRAWER
         ========================================================================= */}
      {groupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-white border-2 border-slate-200 rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <FolderPlus className="h-5 w-5 text-amber-300" />
                <div>
                  <h3 className="font-outfit font-black text-base sm:text-lg">
                    {editingGroupIndex !== null ? "Edit Photo Group & Photos" : "Upload Group of Photos"}
                  </h3>
                  <p className="text-[11px] text-blue-200 font-medium">
                    Group photos by event occasion and academic year
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setGroupModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
              {/* Group Meta Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Group / Occasion Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={groupData.title}
                    onChange={(e) => setGroupData({ ...groupData, title: e.target.value })}
                    placeholder="e.g. Annual Sports Meet & Athletic Events"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-[#002147] focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Year <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={groupData.year}
                    onChange={(e) => setGroupData({ ...groupData, year: e.target.value })}
                    placeholder="e.g. 2025–2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-[#002147] focus:outline-none bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Description / Caption
                  </label>
                  <textarea
                    rows={2}
                    value={groupData.caption || ""}
                    onChange={(e) => setGroupData({ ...groupData, caption: e.target.value })}
                    placeholder="Brief highlights or description for this photo group..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Upload Multi-file Zone */}
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-700 rounded-2xl p-6 bg-blue-50/30 transition-all flex flex-col items-center justify-center text-center gap-3">
                <input
                  type="file"
                  ref={groupFileInputRef}
                  onChange={handleGroupImagesSelected}
                  multiple
                  accept="image/*"
                  className="hidden"
                />

                <div className="h-12 w-12 rounded-2xl bg-[#002147] text-amber-300 flex items-center justify-center shadow-xs">
                  <UploadCloud className="h-6 w-6" />
                </div>

                <div>
                  <h4 className="font-outfit font-bold text-sm text-slate-800">
                    Add Photos to this Group
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select one or multiple photos from your device (JPG, PNG, WebP).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => groupFileInputRef.current?.click()}
                  disabled={isUploadingGroupImages}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {isUploadingGroupImages ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{groupUploadProgress || "Uploading..."}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 text-amber-300" />
                      <span>Choose Photos from Computer</span>
                    </>
                  )}
                </button>
              </div>

              {/* Staged Photos in this Group */}
              {groupData.images.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h5 className="font-outfit font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Photos in this Group ({groupData.images.length})</span>
                    </h5>
                    <button
                      type="button"
                      onClick={() => setGroupData((prev) => ({ ...prev, images: [] }))}
                      className="text-xs text-rose-600 hover:underline font-bold cursor-pointer"
                    >
                      Clear All Photos
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-1">
                    {groupData.images.map((img, idx) => (
                      <div
                        key={img.id || idx}
                        className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 flex flex-col gap-2 relative group"
                      >
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() =>
                              setGroupData((prev) => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== idx),
                              }))
                            }
                            className="absolute top-1.5 right-1.5 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm cursor-pointer"
                            title="Remove photo from group"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={img.title || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setGroupData((prev) => {
                              const updated = [...prev.images];
                              updated[idx] = { ...updated[idx], title: val };
                              return { ...prev, images: updated };
                            });
                          }}
                          placeholder="Photo title / caption..."
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-[11px] font-bold focus:outline-none focus:border-[#002147]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  No photos in this group yet. Click &quot;Choose Photos from Computer&quot; above to add images.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs font-semibold text-slate-500">
                {groupData.images.length} {groupData.images.length === 1 ? "photo" : "photos"} in group
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGroupModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveGroup}
                  disabled={groupData.images.length === 0 || isUploadingGroupImages}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-colors cursor-pointer shadow-xs"
                >
                  {editingGroupIndex !== null ? "Update Photo Group" : "Save Photo Group"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT PDF MODAL DRAWER
         ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-white border-2 border-slate-200 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-amber-300" />
                <h3 className="font-outfit font-black text-base sm:text-lg">
                  {editIndex !== null ? "Edit Document Record" : "Add New Document Record"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  value={editingDoc.title}
                  onChange={(e) => setEditingDoc((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Annual Activity Report 2026–2027"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Academic Year / Subtitle
                </label>
                <input
                  type="text"
                  value={editingDoc.year || ""}
                  onChange={(e) => setEditingDoc((prev) => ({ ...prev, year: e.target.value }))}
                  placeholder="e.g. 2026–2027"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  File Upload (PDF) or Local Path
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingDoc.fileUrl || ""}
                      onChange={(e) => setEditingDoc((prev) => ({ ...prev, fileUrl: e.target.value }))}
                      placeholder="/documents/student-support/... or CDN URL"
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePdfUpload}
                      accept=".pdf"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      {isUploading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Upload className="h-3.5 w-3.5" />
                      )}
                      <span>Upload PDF</span>
                    </button>
                  </div>
                  {editingDoc.fileUrl && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-slate-600 truncate max-w-xs">{editingDoc.fileUrl}</span>
                      <button
                        type="button"
                        onClick={() => setPreviewPdf({ url: editingDoc.fileUrl, title: editingDoc.title })}
                        className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" /> Preview
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-[#002147] hover:bg-[#003366] text-white transition-colors cursor-pointer"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Photo Preview Lightbox */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl flex flex-col animate-scaleUp cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 bg-slate-900 text-white">
              <h4 className="font-outfit font-black text-lg text-white">
                {previewImage.title}
              </h4>
              {previewImage.caption && (
                <p className="text-sm text-slate-300 mt-1 font-medium leading-relaxed">
                  {previewImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {previewPdf && (
        <FilePreviewModal
          isOpen={true}
          onClose={() => setPreviewPdf(null)}
          fileUrl={previewPdf.url}
          title={previewPdf.title}
        />
      )}
    </div>
  );
}
