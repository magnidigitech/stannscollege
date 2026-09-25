"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Building,
  Users,
  Briefcase,
  BookOpen,
  Award,
  Globe,
  Upload,
  RefreshCw,
  Eye,
  FileText,
  User,
  Layers,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
  Lightbulb,
  Compass,
  Activity,
  HeartHandshake,
  Network,
  Download,
  FolderPlus,
  Camera,
  Play,
  Image as ImageIcon,
  Film,
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { FACULTY_DATA, FacultyGalleryItem, FacultyEventAlbum, FacultyEventMedia, DEFAULT_FACULTY_POLICY_DOCS } from "@/components/faculty/staticData";

function generateSlug(text: string): string {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface QualificationItem {
  degreeName?: string;
  specialization?: string;
  university?: string;
  yearOfPassing?: string;
  gradePercentage?: string;
}

interface ExperienceItem {
  organization?: string;
  designation?: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
}

interface PublicationItem {
  publicationTitle: string;
  journalName?: string;
  publicationType?: string;
  authors?: string;
  year?: string;
  volumeIssuePages?: string;
  doiLink?: string;
  indexing?: string;
}

interface AwardItem {
  awardTitle: string;
  awardedBy?: string;
  awardYear?: string;
  description?: string;
}

interface SubjectItem {
  subjectName: string;
  courseProgram?: string;
  semesterYear?: string;
  academicYear?: string;
  materialsLink?: string;
}

interface ProjectItem {
  projectTitle: string;
  fundingAgency?: string;
  amountReceived?: string;
  duration?: string;
  role?: string;
  projectStatus?: string;
}

export interface FacultyMemberItem {
  _id?: string;
  sNo?: number;
  staffType?: "teaching" | "non-teaching" | "technical" | "support" | "visiting" | "contingent";
  facultyName: string;
  slug?: string;
  profilePhotoUrl?: string;
  photoAssetId?: string;
  designation: string;
  department: string;
  facultyId?: string;
  gender?: string;
  dateOfBirth?: string;
  dateOfJoining?: string;
  employmentType?: string;
  officialEmail?: string;
  contactNumber?: string;
  officeLocation?: string;
  facultyStatus?: string;
  highestQualification?: string;
  qualifications?: QualificationItem[];
  totalExperience?: string;
  teachingExperience?: string;
  industryExperience?: string;
  professionalExperience?: ExperienceItem[];
  shortBio?: string;
  careerObjective?: string;
  teachingPhilosophy?: string;
  areaOfExpertise?: string[];
  languagesKnown?: string[];
  subjectsHandled?: SubjectItem[];
  researchAreas?: string[];
  researchInterests?: string;
  ongoingProjects?: ProjectItem[];
  completedProjects?: ProjectItem[];
  publications?: PublicationItem[];
  booksPublished?: string[];
  awards?: AwardItem[];
  currentAdministrativeRole?: string;
  departmentResponsibilities?: string[];
  committeeMemberships?: string[];
  frsId?: string;
  aicteId?: string;
  institutionalRole?: string;
  committeeRoles?: string[];
  facultyProfilePdfUrl?: string;
  facultyProfilePdfAssetId?: string;
  linkedinUrl?: string;
  googleScholarUrl?: string;
  orcidId?: string;
  scopusId?: string;
  researchGateUrl?: string;
  personalWebsite?: string;
  cvPdfUrl?: string;
  cvAssetId?: string;
  displayOrder?: number;
  featuredFaculty?: boolean;
  showOnWebsite?: boolean;
}

export interface PolicyDocItem {
  id: string;
  _id?: string;
  title: string;
  subtitle?: string;
  category: "recruitment" | "fdp" | "achievements" | "exchange" | "appraisal" | "welfare";
  year?: string;
  fileUrl: string;
  certificatesUrl?: string;
  displayOrder?: number;
}

const DEPARTMENTS = [
  "Commerce",
  "Computer Applications",
  "Computer Science & Applications",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Zoology",
  "Botany",
  "Biotechnology",
  "Microbiology",
  "Statistics",
  "English",
  "Telugu",
  "Hindi",
  "Economics",
  "Psychology",
  "History",
  "Political Science",
  "Physical Education",
  "Library & Information Science",
  "Administration",
  "MCA",
  "MBA",
  "Other",
];

const MODAL_TABS = [
  { id: "basic", label: "Basic Info", icon: User },
  { id: "about", label: "About & Philosophy", icon: BookOpen },
  { id: "qualifications", label: "Qualifications", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "teaching-research", label: "Teaching & Research", icon: Layers },
  { id: "publications-awards", label: "Publications & Awards", icon: Award },
  { id: "links-docs", label: "Links & Documents", icon: Globe },
];

const EMPTY_FORM: FacultyMemberItem = {
  facultyName: "",
  slug: "",
  staffType: "teaching",
  designation: "Assistant Professor",
  department: "Commerce",
  facultyId: "",
  gender: "Female",
  dateOfJoining: "",
  employmentType: "Regular",
  officialEmail: "",
  contactNumber: "",
  officeLocation: "",
  facultyStatus: "active",
  highestQualification: "",
  qualifications: [],
  totalExperience: "",
  teachingExperience: "",
  industryExperience: "",
  professionalExperience: [],
  shortBio: "",
  careerObjective: "",
  teachingPhilosophy: "",
  areaOfExpertise: [],
  languagesKnown: [],
  subjectsHandled: [],
  researchAreas: [],
  researchInterests: "",
  ongoingProjects: [],
  completedProjects: [],
  publications: [],
  booksPublished: [],
  awards: [],
  currentAdministrativeRole: "",
  departmentResponsibilities: [],
  committeeMemberships: [],
  frsId: "",
  aicteId: "",
  institutionalRole: "",
  committeeRoles: [],
  facultyProfilePdfUrl: "",
  facultyProfilePdfAssetId: "",
  linkedinUrl: "",
  googleScholarUrl: "",
  orcidId: "",
  scopusId: "",
  researchGateUrl: "",
  personalWebsite: "",
  cvPdfUrl: "",
  displayOrder: 0,
  sNo: 1,
  featuredFaculty: false,
  showOnWebsite: true,
};

export function FacultyProfilesManager() {
  const [facultyList, setFacultyList] = useState<FacultyMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Top Section Switcher: "teaching" | "non-teaching" | "visiting" | "policies" | "gallery"
  const [activeSection, setActiveSection] = useState<"teaching" | "non-teaching" | "visiting" | "policies" | "gallery">("teaching");

  // Non-Teaching Category Sub-tab: "all" | "administrative" | "technical" | "support"
  const [nonTeachingCategory, setNonTeachingCategory] = useState<"all" | "administrative" | "technical" | "support">("all");

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("All");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<"All" | "active" | "inactive">("All");

  // Reorder State
  const [reordering, setReordering] = useState(false);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<string>("basic");
  const [editingFaculty, setEditingFaculty] = useState<FacultyMemberItem | null>(null);
  const [formData, setFormData] = useState<FacultyMemberItem>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Upload States
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadingProfilePdf, setUploadingProfilePdf] = useState(false);

  // Helper input states for comma-separated tags
  const [expertiseTagsInput, setExpertiseTagsInput] = useState("");
  const [languagesInput, setLanguagesInput] = useState("");
  const [researchAreasInput, setResearchAreasInput] = useState("");
  const [committeeRolesInput, setCommitteeRolesInput] = useState("");

  // Modal State for Delete
  const [facultyToDelete, setFacultyToDelete] = useState<FacultyMemberItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Event Albums Management State (Section K - Event Gallery)
  const [eventAlbumsList, setEventAlbumsList] = useState<FacultyEventAlbum[]>(FACULTY_DATA.eventAlbums || []);
  const [albumYearFilter, setAlbumYearFilter] = useState<string>("all");
  const [albumSearchQuery, setAlbumSearchQuery] = useState<string>("");
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState<boolean>(false);
  const [editingAlbum, setEditingAlbum] = useState<FacultyEventAlbum | null>(null);
  const [albumFormData, setAlbumFormData] = useState<FacultyEventAlbum>({
    id: "",
    title: "",
    date: new Date().toISOString().split("T")[0],
    year: "2025–2026",
    category: "Faculty Development",
    description: "",
    coverImage: "",
    media: [],
  });
  const [uploadingAlbumMedia, setUploadingAlbumMedia] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [videoInputUrl, setVideoInputUrl] = useState("");
  const [videoInputCaption, setVideoInputCaption] = useState("");

  // Fetch live event albums from Sanity
  const fetchEventAlbums = async () => {
    try {
      const res = await fetch("/api/admin/faculty-gallery");
      const data = await res.json();
      if (data.success && Array.isArray(data.albums) && data.albums.length > 0) {
        setEventAlbumsList(data.albums);
      }
    } catch (err) {
      console.warn("Could not fetch Sanity faculty event albums:", err);
    }
  };

  useEffect(() => {
    fetchEventAlbums();
  }, []);

  // Multi-File Upload directly to Sanity CDN for the current event album
  const handleBatchUploadToAlbum = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingAlbumMedia(true);
    setUploadProgress({ current: 0, total: files.length });
    const newMediaItems: FacultyEventMedia[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress({ current: i + 1, total: files.length });
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("type", file.type.startsWith("video") ? "file" : "image");

        // Uploads directly into Sanity Asset Pipeline
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        if (result.success && result.asset) {
          const isVid = file.type.startsWith("video");
          const cleanedName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
          const formattedTitle = cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);
          newMediaItems.push({
            id: `media-${Date.now()}-${i}`,
            mediaType: isVid ? "video" : "photo",
            url: result.asset.url,
            assetId: result.asset._id,
            caption: formattedTitle,
          });
        }
      } catch (err) {
        console.error("Failed to upload file to Sanity:", file.name, err);
      }
    }

    if (newMediaItems.length > 0) {
      setAlbumFormData((prev) => {
        const updatedMedia = [...(prev.media || []), ...newMediaItems];
        return {
          ...prev,
          media: updatedMedia,
          coverImage: prev.coverImage || updatedMedia[0]?.url || "",
        };
      });
      showNotification(`Successfully uploaded ${newMediaItems.length} file(s) to Sanity!`);
    } else {
      alert("No files were successfully uploaded to Sanity.");
    }
    setUploadingAlbumMedia(false);
  };

  // Add YouTube / Video URL to this event album
  const handleAddVideoToAlbum = () => {
    if (!videoInputUrl.trim()) return;
    const newVid: FacultyEventMedia = {
      id: `vid-${Date.now()}`,
      mediaType: "video",
      url: videoInputUrl.trim(),
      caption: videoInputCaption.trim() || "Event Video Highlight",
    };
    setAlbumFormData((prev) => ({
      ...prev,
      media: [...(prev.media || []), newVid],
    }));
    setVideoInputUrl("");
    setVideoInputCaption("");
    showNotification("Video added to event album.");
  };

  // Save Event Album directly to Sanity via POST /api/admin/faculty-gallery
  const handleSaveEventAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumFormData.title.trim()) {
      alert("Event Title is required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/faculty-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ album: albumFormData }),
      });
      const result = await res.json();
      if (result.success) {
        showNotification("Event album saved successfully to Sanity!");
        await fetchEventAlbums();
        setIsAlbumModalOpen(false);
      } else {
        throw new Error(result.error || "Failed to save event album to Sanity");
      }
    } catch (err: any) {
      alert(err.message || "Failed to save event album to Sanity.");
    } finally {
      setSaving(false);
    }
  };

  // Delete Event Album from Sanity via DELETE /api/admin/faculty-gallery?id=xxx
  const handleDeleteEventAlbum = async (album: FacultyEventAlbum) => {
    if (!confirm(`Are you sure you want to permanently delete event album "${album.title}"?`)) return;
    try {
      const albumId = album._id || album.id;
      const res = await fetch(`/api/admin/faculty-gallery?id=${encodeURIComponent(albumId)}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        showNotification("Event album deleted from Sanity.");
        setEventAlbumsList((prev) => prev.filter((a) => (a._id || a.id) !== albumId));
      } else {
        throw new Error(result.error || "Failed to delete from Sanity");
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete event album.");
    }
  };

  // Policy Documents State (Sections E - J)
  const [policyDocs, setPolicyDocs] = useState<PolicyDocItem[]>(DEFAULT_FACULTY_POLICY_DOCS as PolicyDocItem[]);
  const [activePolicyCategory, setActivePolicyCategory] = useState<string>("all");
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<PolicyDocItem | null>(null);
  const [savingDoc, setSavingDoc] = useState(false);
  const [uploadingDocPdf, setUploadingDocPdf] = useState(false);
  const [uploadingCertPdf, setUploadingCertPdf] = useState(false);
  const [docFormData, setDocFormData] = useState<PolicyDocItem>({
    id: "",
    title: "",
    subtitle: "",
    category: "fdp",
    year: "2025–2026",
    fileUrl: "",
    certificatesUrl: "",
  });

  const filteredPolicyDocs = useMemo(() => {
    if (activePolicyCategory === "all") return policyDocs;
    return policyDocs.filter((d) => d.category === activePolicyCategory);
  }, [policyDocs, activePolicyCategory]);

  // Fetch live policy documents from Sanity
  const fetchPolicyDocs = async () => {
    try {
      const res = await fetch("/api/admin/faculty-policies");
      const data = await res.json();
      if (data.success && Array.isArray(data.documents) && data.documents.length > 0) {
        setPolicyDocs(data.documents);
      }
    } catch (err) {
      console.warn("Could not fetch Sanity faculty policy documents:", err);
    }
  };

  useEffect(() => {
    fetchPolicyDocs();
  }, []);

  const handlePolicyDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF document.");
      return;
    }
    setUploadingDocPdf(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setDocFormData((prev) => ({ ...prev, fileUrl: data.url }));
        showNotification("PDF uploaded successfully to Sanity CDN.");
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload PDF.");
    } finally {
      setUploadingDocPdf(false);
    }
  };

  const handleCertDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF document.");
      return;
    }
    setUploadingCertPdf(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setDocFormData((prev) => ({ ...prev, certificatesUrl: data.url }));
        showNotification("Certificates PDF uploaded successfully to Sanity CDN.");
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload Certificates PDF.");
    } finally {
      setUploadingCertPdf(false);
    }
  };

  const handleSaveDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFormData.title.trim()) {
      alert("Document title is required.");
      return;
    }
    setSavingDoc(true);
    try {
      const res = await fetch("/api/admin/faculty-policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document: docFormData }),
      });
      const data = await res.json();
      if (data.success && data.document) {
        showNotification(data.message || "Document saved to Sanity.");
        setIsDocModalOpen(false);
        fetchPolicyDocs();
      } else {
        throw new Error(data.error || "Failed to save document");
      }
    } catch (err: any) {
      alert(err.message || "Failed to save document.");
    } finally {
      setSavingDoc(false);
    }
  };

  const handleDeleteDoc = async (doc: PolicyDocItem) => {
    if (!confirm(`Are you sure you want to delete "${doc.title}"?`)) return;
    try {
      const docId = doc._id || doc.id;
      const res = await fetch(`/api/admin/faculty-policies?id=${encodeURIComponent(docId)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Document deleted from Sanity.");
        setPolicyDocs((prev) => prev.filter((d) => (d._id || d.id) !== docId));
      } else {
        throw new Error(data.error || "Failed to delete document");
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete document.");
    }
  };

  // PDF Preview Modal
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [previewPdfTitle, setPreviewPdfTitle] = useState<string>("");

  // Notification Banner
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  // 1. Fetch Faculty Profiles from API
  const fetchFaculty = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/faculty");
      const data = await res.json();
      if (data.success && Array.isArray(data.faculty)) {
        setFacultyList(data.faculty);
      } else {
        throw new Error(data.error || "Failed to load faculty profiles");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load faculty profiles from Sanity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // Filtered List based on Active Section and Sub-filters
  const currentSectionFaculty = useMemo(() => {
    return facultyList.filter((f) => {
      const isTeaching = f.staffType === "teaching" || !f.staffType;

      if (activeSection === "teaching") {
        return isTeaching;
      }
      if (activeSection === "non-teaching") {
        if (f.staffType === "teaching") return false;

        const isAdministrative =
          f.staffType === "non-teaching" ||
          f.department === "Administration" ||
          f.department?.toLowerCase() === "administrative staff";

        const isTechnical =
          f.staffType === "technical" ||
          f.department === "Technical & Laboratory" ||
          f.department?.toLowerCase() === "technical & lab staff" ||
          f.department?.toLowerCase() === "technical staff";

        const isSupport =
          f.staffType === "support" ||
          f.department === "Support Staff" ||
          f.department?.toLowerCase() === "support staff";

        if (nonTeachingCategory === "administrative") {
          return isAdministrative;
        }
        if (nonTeachingCategory === "technical") {
          return isTechnical;
        }
        if (nonTeachingCategory === "support") {
          return isSupport;
        }
        return isAdministrative || isTechnical || isSupport || f.staffType === "non-teaching" || f.staffType === "technical" || f.staffType === "support";
      }
      if (activeSection === "visiting") {
        return f.staffType === "visiting" || f.employmentType === "Visiting" || f.employmentType === "Adjunct";
      }
      return true;
    });
  }, [facultyList, activeSection, nonTeachingCategory]);

  const nonTeachingCounts = useMemo(() => {
    const adminCount = facultyList.filter(
      (f) =>
        f.staffType !== "teaching" &&
        (f.staffType === "non-teaching" || f.department === "Administration" || f.department?.toLowerCase() === "administrative staff")
    ).length;
    const techCount = facultyList.filter(
      (f) =>
        f.staffType !== "teaching" &&
        (f.staffType === "technical" || f.department === "Technical & Laboratory" || f.department?.toLowerCase() === "technical & lab staff" || f.department?.toLowerCase() === "technical staff")
    ).length;
    const supportCount = facultyList.filter(
      (f) =>
        f.staffType !== "teaching" &&
        (f.staffType === "support" || f.department === "Support Staff" || f.department?.toLowerCase() === "support staff")
    ).length;
    return {
      all: adminCount + techCount + supportCount,
      administrative: adminCount,
      technical: techCount,
      support: supportCount,
    };
  }, [facultyList]);

  const filteredFaculty = useMemo(() => {
    return currentSectionFaculty.filter((f) => {
      const matchesDept =
        selectedDeptFilter === "All" ||
        f.department?.toLowerCase() === selectedDeptFilter.toLowerCase() ||
        f.department?.toLowerCase().includes(selectedDeptFilter.toLowerCase());

      const matchesStatus =
        selectedStatusFilter === "All" || f.facultyStatus === selectedStatusFilter;

      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        f.facultyName?.toLowerCase().includes(q) ||
        f.designation?.toLowerCase().includes(q) ||
        f.department?.toLowerCase().includes(q) ||
        f.highestQualification?.toLowerCase().includes(q) ||
        f.facultyId?.toLowerCase().includes(q) ||
        f.slug?.toLowerCase().includes(q);

      return matchesDept && matchesStatus && matchesQuery;
    });
  }, [currentSectionFaculty, selectedDeptFilter, selectedStatusFilter, searchQuery]);

  // Handle Name Change with Real-Time Automated Slug Generation
  const handleFacultyNameChange = (name: string) => {
    const autoSlug = generateSlug(name);
    setFormData((prev) => ({
      ...prev,
      facultyName: name,
      slug: autoSlug,
    }));
  };

  // Move Item Up in List
  const handleMoveUp = async (index: number) => {
    if (index === 0 || reordering) return;
    const currentItem = filteredFaculty[index];
    const prevItem = filteredFaculty[index - 1];
    if (!currentItem._id || !prevItem._id) return;

    setReordering(true);
    const newCurrentSNo = prevItem.sNo || index;
    const newPrevSNo = currentItem.sNo || index + 1;

    // Optimistic UI update
    setFacultyList((prevList) => {
      return prevList.map((f) => {
        if (f._id === currentItem._id) return { ...f, sNo: newCurrentSNo };
        if (f._id === prevItem._id) return { ...f, sNo: newPrevSNo };
        return f;
      }).sort((a, b) => (a.sNo || 0) - (b.sNo || 0));
    });

    try {
      await fetch("/api/admin/faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reorder",
          items: [
            { _id: currentItem._id, sNo: newCurrentSNo },
            { _id: prevItem._id, sNo: newPrevSNo },
          ],
        }),
      });
      showNotification(`Moved "${currentItem.facultyName}" up.`);
    } catch (err) {
      fetchFaculty();
    } finally {
      setReordering(false);
    }
  };

  // Move Item Down in List
  const handleMoveDown = async (index: number) => {
    if (index >= filteredFaculty.length - 1 || reordering) return;
    const currentItem = filteredFaculty[index];
    const nextItem = filteredFaculty[index + 1];
    if (!currentItem._id || !nextItem._id) return;

    setReordering(true);
    const newCurrentSNo = nextItem.sNo || index + 2;
    const newNextSNo = currentItem.sNo || index + 1;

    // Optimistic UI update
    setFacultyList((prevList) => {
      return prevList.map((f) => {
        if (f._id === currentItem._id) return { ...f, sNo: newCurrentSNo };
        if (f._id === nextItem._id) return { ...f, sNo: newNextSNo };
        return f;
      }).sort((a, b) => (a.sNo || 0) - (b.sNo || 0));
    });

    try {
      await fetch("/api/admin/faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reorder",
          items: [
            { _id: currentItem._id, sNo: newCurrentSNo },
            { _id: nextItem._id, sNo: newNextSNo },
          ],
        }),
      });
      showNotification(`Moved "${currentItem.facultyName}" down.`);
    } catch (err) {
      fetchFaculty();
    } finally {
      setReordering(false);
    }
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingFaculty(null);
    let defaultStaffType = "teaching";
    let defaultDepartment = "Commerce";

    if (activeSection === "non-teaching") {
      if (nonTeachingCategory === "administrative") {
        defaultStaffType = "non-teaching";
        defaultDepartment = "Administration";
      } else if (nonTeachingCategory === "technical") {
        defaultStaffType = "technical";
        defaultDepartment = "Technical & Laboratory";
      } else if (nonTeachingCategory === "support") {
        defaultStaffType = "support";
        defaultDepartment = "Support Staff";
      } else {
        defaultStaffType = "non-teaching";
        defaultDepartment = "Administration";
      }
    } else if (activeSection === "visiting") {
      defaultStaffType = "visiting";
      defaultDepartment = "Commerce";
    }

    const nextSNo = facultyList.length > 0 ? Math.max(...facultyList.map((f) => f.sNo || 0)) + 1 : 1;
    setFormData({
      ...EMPTY_FORM,
      staffType: defaultStaffType as any,
      department: defaultDepartment,
      sNo: nextSNo,
    });
    setExpertiseTagsInput("");
    setLanguagesInput("");
    setResearchAreasInput("");
    setCommitteeRolesInput("");
    setActiveModalTab("basic");
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (faculty: FacultyMemberItem) => {
    setEditingFaculty(faculty);
    setFormData({
      ...faculty,
      slug: faculty.slug || generateSlug(faculty.facultyName),
      qualifications: faculty.qualifications || [],
      professionalExperience: faculty.professionalExperience || [],
      subjectsHandled: faculty.subjectsHandled || [],
      publications: faculty.publications || [],
      awards: faculty.awards || [],
      ongoingProjects: faculty.ongoingProjects || [],
      completedProjects: faculty.completedProjects || [],
    });
    setExpertiseTagsInput((faculty.areaOfExpertise || []).join(", "));
    setLanguagesInput((faculty.languagesKnown || []).join(", "));
    setResearchAreasInput((faculty.researchAreas || []).join(", "));
    setCommitteeRolesInput((faculty.committeeRoles || []).join("\n"));
    setActiveModalTab("basic");
    setFormError(null);
    setIsModalOpen(true);
  };

  // Handle Photo Upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("type", "image");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success && result.asset) {
        setFormData((prev) => ({
          ...prev,
          profilePhotoUrl: result.asset.url,
          photoAssetId: result.asset._id,
        }));
        showNotification("Profile photo uploaded successfully.");
      } else {
        throw new Error(result.error || "Failed to upload photo");
      }
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Handle CV PDF Upload
  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCv(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("type", "file");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success && result.asset) {
        setFormData((prev) => ({
          ...prev,
          cvPdfUrl: result.asset.url,
          cvAssetId: result.asset._id,
        }));
        showNotification("CV PDF document uploaded successfully.");
      } else {
        throw new Error(result.error || "Failed to upload CV");
      }
    } catch (err: any) {
      alert("Error uploading CV PDF: " + err.message);
    } finally {
      setUploadingCv(false);
    }
  };

  // Handle Faculty Profile PDF Upload
  const handleFacultyProfilePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProfilePdf(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("type", "file");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success && result.asset) {
        setFormData((prev) => ({
          ...prev,
          facultyProfilePdfUrl: result.asset.url,
          facultyProfilePdfAssetId: result.asset._id,
        }));
        showNotification("Official Faculty Profile PDF uploaded successfully.");
      } else {
        throw new Error(result.error || "Failed to upload Profile PDF");
      }
    } catch (err: any) {
      alert("Error uploading Profile PDF: " + err.message);
    } finally {
      setUploadingProfilePdf(false);
    }
  };

  // Save Faculty Profile
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.facultyName.trim()) {
      setFormError("Faculty Name is required.");
      return;
    }

    setSaving(true);
    setFormError(null);

    const autoSlug = generateSlug(formData.facultyName);

    // Parse comma-separated tags
    const areaOfExpertise = expertiseTagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const languagesKnown = languagesInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const researchAreas = researchAreasInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const committeeRoles = committeeRolesInput
      .split(/\r?\n|,/)
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      faculty: {
        ...formData,
        slug: formData.slug?.trim() || autoSlug,
        areaOfExpertise,
        languagesKnown,
        researchAreas,
        committeeRoles,
      },
    };

    try {
      const res = await fetch("/api/admin/faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        showNotification(result.message || "Profile saved successfully.");
        setIsModalOpen(false);
        fetchFaculty();
      } else {
        throw new Error(result.error || "Failed to save profile.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  // Delete Faculty Profile
  const handleDelete = async () => {
    if (!facultyToDelete?._id) return;
    setDeleting(true);
    try {
      const deletedId = facultyToDelete._id;
      const res = await fetch(`/api/admin/faculty?id=${encodeURIComponent(deletedId)}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        showNotification("Profile deleted successfully.");
        setFacultyList((prev) => prev.filter((f) => f._id !== deletedId));
        setFacultyToDelete(null);
        await fetchFaculty();
      } else {
        throw new Error(result.error || "Failed to delete profile.");
      }
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-700 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-500 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-bold">{notification}</p>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#002147] via-[#0b3366] to-[#002147] text-white p-6 sm:p-8 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Complete Faculty &amp; Staff Page Administration
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
            Faculty &amp; Staff Full Management
          </h2>
          <p className="text-sm text-blue-100/80 max-w-2xl font-medium">
            Manage teaching faculty, department rosters, non-teaching staff, visiting scholars, and all statutory policy archives (Sections A through J).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={fetchFaculty}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all active:scale-95 border border-white/20"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          {activeSection === "gallery" ? (
            <button
              onClick={() => {
                setEditingAlbum(null);
                setAlbumFormData({
                  id: "",
                  title: "",
                  date: new Date().toISOString().split("T")[0],
                  year: albumYearFilter === "all" ? "2025–2026" : albumYearFilter,
                  category: "Faculty Development",
                  description: "",
                  coverImage: "",
                  media: [],
                });
                setIsAlbumModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#002147] font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              Create Event Album
            </button>
          ) : activeSection === "policies" ? (
            <button
              onClick={() => {
                setEditingDoc(null);
                setDocFormData({
                  id: "",
                  title: "",
                  subtitle: "",
                  category: "recruitment",
                  year: "2024–2025",
                  fileUrl: "/documents/DefaultFile_1.pdf",
                });
                setIsDocModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#002147] font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              Add Policy Document
            </button>
          ) : (
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#002147] font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {activeSection === "non-teaching"
                ? "Add Staff Member"
                : activeSection === "visiting"
                ? "Add Visiting Faculty"
                : "Add Faculty Profile"}
            </button>
          )}
        </div>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/80">
        <button
          onClick={() => setActiveSection("teaching")}
          className={`flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSection === "teaching"
              ? "bg-[#002147] text-white shadow-md font-extrabold"
              : "text-slate-700 hover:bg-white/60"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          A &amp; B. Teaching ({facultyList.filter((f) => f.staffType === "teaching" || !f.staffType).length})
        </button>

        <button
          onClick={() => setActiveSection("non-teaching")}
          className={`flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSection === "non-teaching"
              ? "bg-[#002147] text-white shadow-md font-extrabold"
              : "text-slate-700 hover:bg-white/60"
          }`}
        >
          <Network className="w-4 h-4" />
          C. Non-Teaching ({nonTeachingCounts.all})
        </button>

        <button
          onClick={() => setActiveSection("visiting")}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSection === "visiting"
              ? "bg-[#002147] text-white shadow-md font-extrabold"
              : "text-slate-700 hover:bg-white/60"
          }`}
        >
          <Users className="w-4 h-4" />
          D. Visiting ({facultyList.filter((f) => f.staffType === "visiting").length})
        </button>

        <button
          onClick={() => setActiveSection("policies")}
          className={`flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSection === "policies"
              ? "bg-[#002147] text-white shadow-md font-extrabold"
              : "text-slate-700 hover:bg-white/60"
          }`}
        >
          <FileText className="w-4 h-4" />
          E - J. Policies &amp; PDFs ({policyDocs.length})
        </button>

        <button
          onClick={() => setActiveSection("gallery")}
          className={`flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSection === "gallery"
              ? "bg-[#002147] text-white shadow-md font-extrabold"
              : "text-slate-700 hover:bg-white/60"
          }`}
        >
          <Camera className="w-4 h-4" />
          K. Event Gallery ({eventAlbumsList.length})
        </button>
      </div>

      {/* Non-Teaching Sub-Category Filter Bar */}
      {activeSection === "non-teaching" && (
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200">
          <span className="text-xs font-black uppercase text-slate-500 pl-2 pr-1">Sub-Category:</span>
          {[
            { id: "all", label: `All Non-Teaching (${nonTeachingCounts.all})` },
            { id: "administrative", label: `1. Administrative Staff (${nonTeachingCounts.administrative})` },
            { id: "technical", label: `2. Technical & Lab Staff (${nonTeachingCounts.technical})` },
            { id: "support", label: `3. Support Staff (${nonTeachingCounts.support})` },
          ].map((sub) => (
            <button
              key={sub.id}
              onClick={() => setNonTeachingCategory(sub.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                nonTeachingCategory === sub.id
                  ? "bg-[#002147] text-white shadow"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {/* Policy Categories Sub-bar */}
      {activeSection === "policies" && (
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200">
          <span className="text-xs font-black uppercase text-slate-500 pl-2 pr-1">Filter Section:</span>
          {[
            { id: "all", label: "All Sections (E - J)" },
            { id: "recruitment", label: "E. Recruitment Policy" },
            { id: "fdp", label: "F. Faculty Development (FDP)" },
            { id: "achievements", label: "G. Faculty Achievements" },
            { id: "exchange", label: "H. Academic Mobility" },
            { id: "appraisal", label: "I. Appraisal (ASAR)" },
            { id: "welfare", label: "J. Welfare Schemes" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActivePolicyCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePolicyCategory === cat.id
                  ? "bg-[#002147] text-white shadow"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* SECTIONS A, B, C, D: FACULTY & STAFF SEARCH & TABLE */}
      {(activeSection === "teaching" || activeSection === "non-teaching" || activeSection === "visiting") && (
        <>
          {/* Search & Filter Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, designation, qualification, emp ID, or slug..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Department Filter */}
              <div className="relative flex-1 md:w-56">
                <select
                  value={selectedDeptFilter}
                  onChange={(e) => setSelectedDeptFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2.5 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] appearance-none cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative w-36">
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2.5 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] appearance-none cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400 font-semibold space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p>Loading roster from Sanity...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-rose-600 font-semibold space-y-2">
              <AlertTriangle className="w-8 h-8 mx-auto text-rose-500" />
              <p>{error}</p>
              <button
                onClick={fetchFaculty}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold"
              >
                Retry
              </button>
            </div>
          ) : filteredFaculty.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-semibold space-y-3">
              <Users className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-base text-slate-600 font-bold">No records found in this section.</p>
              <p className="text-xs text-slate-400">Click the button above to add a new member.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                    <th className="px-3 py-3.5 text-center w-20">Order / Move</th>
                    <th className="px-3 py-3.5 min-w-[200px]">Member Name</th>
                    <th className="px-3 py-3.5 min-w-[150px]">Designation</th>
                    <th className="px-3 py-3.5 min-w-[140px]">Department / Category</th>
                    <th className="px-3 py-3.5 min-w-[120px]">Qualification</th>
                    <th className="px-3 py-3.5 text-center w-24">Experience</th>
                    <th className="px-3 py-3.5 text-center w-24">Status</th>
                    <th className="px-3 py-3.5 text-center w-36">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredFaculty.map((item, idx) => {
                    const slug = item.slug || "";
                    const isActive = item.facultyStatus === "active";
                    return (
                      <tr key={item._id || idx} className="hover:bg-slate-50/80 transition-colors">
                        {/* Friendly Reorder Arrows */}
                        <td className="px-2 py-3 text-center bg-slate-50/40">
                          <div className="flex items-center justify-center gap-1">
                            <span className="font-bold text-[#002147] text-xs mr-1">{item.sNo || idx + 1}</span>
                            <div className="flex flex-col gap-0.5">
                              <button
                                onClick={() => handleMoveUp(idx)}
                                disabled={idx === 0 || reordering}
                                title="Move Up"
                                className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMoveDown(idx)}
                                disabled={idx >= filteredFaculty.length - 1 || reordering}
                                title="Move Down"
                                className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            {item.profilePhotoUrl ? (
                              <img
                                src={item.profilePhotoUrl}
                                alt={item.facultyName}
                                className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-sm">
                                <img
                                  src="/images/Crest_Logo.png"
                                  alt="College Crest"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-extrabold text-slate-900 text-sm">{item.facultyName}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                {item.facultyId && (
                                  <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                                    {item.facultyId}
                                  </span>
                                )}
                                {slug && item.staffType === "teaching" && (
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    /{slug}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-3 font-semibold text-slate-800">
                          {item.designation || "—"}
                        </td>

                        <td className="px-3 py-3 font-bold text-[#002147]">
                          {item.department || "—"}
                        </td>

                        <td className="px-3 py-3 font-medium text-slate-600">
                          {item.highestQualification || "—"}
                        </td>

                        <td className="px-3 py-3 text-center font-bold text-slate-700">
                          {(() => {
                            const exp = item.totalExperience || item.teachingExperience;
                            if (!exp) return "—";
                            const expStr = String(exp).trim();
                            return expStr.toLowerCase().includes("yr") || expStr.toLowerCase().includes("year")
                              ? expStr
                              : `${expStr} Yrs`;
                          })()}
                        </td>

                        <td className="px-3 py-3 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-100 text-slate-500 border border-slate-200"
                            }`}
                          >
                            {isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-3 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const pdfTarget = item.facultyProfilePdfUrl || item.cvPdfUrl || "/documents/faculty/Faculty_Website_Profile_View.pdf";
                                setPreviewPdfUrl(pdfTarget);
                                setPreviewPdfTitle(`${item.facultyName} - Profile Document`);
                              }}
                              title="Preview Profile PDF"
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all font-bold"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                            {slug && item.staffType === "teaching" && (
                              <Link
                                href={`/faculty/profile/${slug}`}
                                target="_blank"
                                title="View Public Profile Page"
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            )}
                            <button
                              onClick={() => handleOpenEdit(item)}
                              title="Edit Details"
                              className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all font-bold"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setFacultyToDelete(item)}
                              title="Delete Record"
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all font-bold"
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
          )}
        </div>
        </>
      )}

      {/* SECTION E - J: POLICY DOCUMENTS & ARCHIVES */}
      {activeSection === "policies" && (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-outfit font-black text-slate-900 text-base md:text-lg">
                Statutory Policy &amp; Faculty Documents Register
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Official PDF reports, certificates, appraisal forms, and welfare circulars for Sections E through J
              </p>
            </div>
            <button
              onClick={() => {
                setEditingDoc(null);
                setDocFormData({
                  id: `doc-${Date.now()}`,
                  title: "",
                  subtitle: "",
                  category: "fdp",
                  year: "2025–2026",
                  fileUrl: "",
                  certificatesUrl: "",
                });
                setIsDocModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-black shadow-md transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Document / FDP Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPolicyDocs.map((doc) => (
              <div
                key={doc._id || doc.id}
                className="p-5 rounded-2xl border-2 border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#002147] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileText className="w-5 h-5 text-indigo-200" />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-[#002147]">
                        Section {doc.category.toUpperCase()}
                      </span>
                      {doc.year && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {doc.year}
                        </span>
                      )}
                      {doc.certificatesUrl && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ✓ Certificates Attached
                        </span>
                      )}
                    </div>
                    <h4 className="font-outfit font-black text-slate-900 text-sm leading-snug">{doc.title}</h4>
                    {doc.subtitle && (
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{doc.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between border-t border-slate-200/60 pt-3 gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Main PDF preview */}
                    {doc.fileUrl ? (
                      <button
                        onClick={() => {
                          setPreviewPdfUrl(doc.fileUrl);
                          setPreviewPdfTitle(doc.title);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview PDF</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">No PDF uploaded</span>
                    )}

                    {/* Certificates preview */}
                    {doc.certificatesUrl && (
                      <button
                        onClick={() => {
                          setPreviewPdfUrl(doc.certificatesUrl!);
                          setPreviewPdfTitle(`${doc.title} - Certificates`);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>Certificates</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingDoc(doc);
                        setDocFormData({ ...doc });
                        setIsDocModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all font-bold cursor-pointer"
                      title="Edit Document"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteDoc(doc)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all font-bold cursor-pointer"
                      title="Delete Document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION K: EVENT PHOTO & VIDEO GALLERY */}
      {activeSection === "gallery" && (
        <div className="space-y-6">
          {/* Gallery Header & Filters */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg sm:text-xl">
                  Faculty &amp; Staff Event Photo &amp; Video Albums
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Create albums for institutional events (e.g. FDPs, seminars, workshops, celebrations) and batch upload photos/videos directly to Sanity CDN.
                </p>
              </div>

              {/* Year Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Filter Year:</span>
                {["all", "2025–2026", "2024–2025", "2023–2024", "2022–2023"].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setAlbumYearFilter(yr)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      albumYearFilter === yr
                        ? "bg-[#002147] text-white shadow"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {yr === "all" ? "All Years" : yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar & Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={albumSearchQuery}
                  onChange={(e) => setAlbumSearchQuery(e.target.value)}
                  placeholder="Search event name, category, or description..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                />
              </div>

              <button
                onClick={() => {
                  setEditingAlbum(null);
                  setAlbumFormData({
                    id: "",
                    title: "",
                    date: new Date().toISOString().split("T")[0],
                    year: albumYearFilter === "all" ? "2025–2026" : albumYearFilter,
                    category: "Faculty Development",
                    description: "",
                    coverImage: "",
                    media: [],
                  });
                  setIsAlbumModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#002147] font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Create New Event Album
              </button>
            </div>
          </div>

          {/* Event Albums Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {eventAlbumsList
              .filter((album) => {
                if (albumYearFilter !== "all" && album.year !== albumYearFilter) return false;
                if (albumSearchQuery.trim()) {
                  const q = albumSearchQuery.toLowerCase();
                  return (
                    album.title.toLowerCase().includes(q) ||
                    (album.category && album.category.toLowerCase().includes(q)) ||
                    (album.description && album.description.toLowerCase().includes(q))
                  );
                }
                return true;
              })
              .map((album) => {
                const photoCount = (album.media || []).filter((m) => m.mediaType === "photo").length;
                const videoCount = (album.media || []).filter((m) => m.mediaType === "video").length;
                const coverUrl =
                  album.coverImage ||
                  (album.media && album.media.length > 0 ? album.media[0].url : "/images/college_crest_gold.png");

                return (
                  <div
                    key={album.id || album._id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Cover Thumbnail */}
                    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                      <img
                        src={coverUrl}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/college_crest_gold.png";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#002147]/90 text-amber-300 text-[10px] font-black border border-white/10 shadow-sm">
                        {album.year}
                      </span>
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-extrabold flex items-center gap-1">
                        <Camera className="w-3 h-3 text-amber-400" />
                        {photoCount} Photos {videoCount > 0 && `• ${videoCount} Vids`}
                      </span>
                      <span className="absolute bottom-2 left-2.5 text-[11px] font-bold text-slate-200">
                        📅 {album.date}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        {album.category && (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black uppercase mb-1.5">
                            {album.category}
                          </span>
                        )}
                        <h4 className="font-outfit font-black text-slate-900 text-sm leading-snug group-hover:text-[#002147] transition-colors">
                          {album.title}
                        </h4>
                        {album.description && (
                          <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                            {album.description}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400">
                          {album.media?.length || 0} items
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingAlbum(album);
                              setAlbumFormData({
                                id: album.id || album._id || "",
                                _id: album._id,
                                title: album.title,
                                date: album.date || "",
                                year: album.year || "2025–2026",
                                category: album.category || "Faculty Development",
                                description: album.description || "",
                                coverImage: album.coverImage || "",
                                media: album.media || [],
                              });
                              setIsAlbumModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-all cursor-pointer"
                            title="Edit Album & Photos"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit Album</span>
                          </button>
                          <button
                            onClick={() => handleDeleteEventAlbum(album)}
                            className="p-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all cursor-pointer"
                            title="Delete Album"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {eventAlbumsList.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Camera className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-outfit font-black text-slate-800 text-lg">No Event Albums Found</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
                Click &quot;Create New Event Album&quot; above to create an album and upload all event photos and videos directly to Sanity.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT FACULTY OR STAFF MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between border-b border-[#003366]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-amber-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg sm:text-xl">
                    {editingFaculty ? "Edit Profile Record" : "Add New Profile Record"}
                  </h3>
                  <p className="text-xs text-blue-200 font-medium">
                    {editingFaculty ? `Editing: ${formData.facultyName}` : "Create a comprehensive roster & directory record"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto bg-slate-100 px-6 py-2.5 border-b border-slate-200">
              {MODAL_TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeModalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveModalTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-[#002147] text-white shadow"
                        : "bg-transparent text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {formError && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* TAB 1: BASIC INFO */}
              {activeModalTab === "basic" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Faculty / Staff Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.facultyName}
                        onChange={(e) => handleFacultyNameChange(e.target.value)}
                        placeholder="e.g. Dr. Sr. Sandhya Thumma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700">
                          URL Slug
                        </label>
                        <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-bold">
                          Auto-filled from Name
                        </span>
                      </div>
                      <input
                        type="text"
                        readOnly
                        value={formData.slug || ""}
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-600 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Designation <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        placeholder="e.g. Associate Professor & HOD"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Department / Unit <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      >
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Staff Type
                      </label>
                      <select
                        value={formData.staffType || "teaching"}
                        onChange={(e) => setFormData({ ...formData, staffType: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      >
                        <option value="teaching">Teaching Staff (Section A & B)</option>
                        <option value="non-teaching">Non-Teaching Staff (Section C - Admin)</option>
                        <option value="technical">Technical & Lab Staff (Section C - Tech)</option>
                        <option value="support">Support Staff (Section C - Support)</option>
                        <option value="visiting">Visiting / Adjunct (Section D)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        value={formData.facultyId || ""}
                        onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
                        placeholder="e.g. SACW-024"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        FRS ID
                      </label>
                      <input
                        type="text"
                        value={formData.frsId || ""}
                        onChange={(e) => setFormData({ ...formData, frsId: e.target.value })}
                        placeholder="e.g. 102948"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        AICTE ID
                      </label>
                      <input
                        type="text"
                        value={formData.aicteId || ""}
                        onChange={(e) => setFormData({ ...formData, aicteId: e.target.value })}
                        placeholder="e.g. 1-284920194"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Date of Joining
                      </label>
                      <input
                        type="text"
                        value={formData.dateOfJoining || ""}
                        onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                        placeholder="e.g. 16-06-2007"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Employment Type
                      </label>
                      <select
                        value={formData.employmentType || "Regular"}
                        onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      >
                        <option value="Regular">Regular</option>
                        <option value="Contract">Contract</option>
                        <option value="Visiting">Visiting</option>
                        <option value="Adjunct">Adjunct</option>
                        <option value="Part-Time">Part-Time</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Status
                      </label>
                      <select
                        value={formData.facultyStatus || "active"}
                        onChange={(e) => setFormData({ ...formData, facultyStatus: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Official Email
                      </label>
                      <input
                        type="email"
                        value={formData.officialEmail || ""}
                        onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                        placeholder="e.g. faculty@stannscollege.edu"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        value={formData.contactNumber || ""}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        placeholder="e.g. +91 9876543210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Office Location
                      </label>
                      <input
                        type="text"
                        value={formData.officeLocation || ""}
                        onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                        placeholder="e.g. Block B, Room 204"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                      />
                    </div>
                  </div>

                  {/* Profile Photo Upload with Crest Fallback Display */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-5">
                    {formData.profilePhotoUrl ? (
                      <img
                        src={formData.profilePhotoUrl}
                        alt="Profile Preview"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#002147]/20 shadow-md shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-white border border-slate-300 flex flex-col items-center justify-center p-2 shadow-inner shrink-0">
                        <img
                          src="/images/Crest_Logo.png"
                          alt="College Crest Fallback"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="space-y-1.5 flex-1">
                      <p className="text-xs font-bold text-slate-800">
                        Profile Photo
                        {!formData.profilePhotoUrl && (
                          <span className="ml-2 text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-bold">
                            Default: College Crest Logo
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Upload personal portrait (JPG, PNG). If left empty, the official College Crest is automatically used as the profile picture.
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white font-bold text-xs shadow-sm transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          {uploadingPhoto ? "Uploading..." : "Upload Photo"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            disabled={uploadingPhoto}
                            className="hidden"
                          />
                        </label>
                        {formData.profilePhotoUrl && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, profilePhotoUrl: undefined, photoAssetId: undefined })}
                            className="text-xs font-bold text-rose-600 hover:underline"
                          >
                            Remove (Use Crest)
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Order / S.No
                      </label>
                      <input
                        type="number"
                        value={formData.sNo || 1}
                        onChange={(e) => setFormData({ ...formData, sNo: parseInt(e.target.value) || 1 })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div className="flex items-center gap-2 sm:mt-6">
                      <input
                        type="checkbox"
                        id="showOnWebsite"
                        checked={formData.showOnWebsite !== false}
                        onChange={(e) => setFormData({ ...formData, showOnWebsite: e.target.checked })}
                        className="h-4 w-4 rounded border-slate-300 text-[#002147] focus:ring-[#002147]"
                      />
                      <label htmlFor="showOnWebsite" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Show on Public Website
                      </label>
                    </div>

                    <div className="flex items-center gap-2 sm:mt-6">
                      <input
                        type="checkbox"
                        id="featuredFaculty"
                        checked={Boolean(formData.featuredFaculty)}
                        onChange={(e) => setFormData({ ...formData, featuredFaculty: e.target.checked })}
                        className="h-4 w-4 rounded border-slate-300 text-[#002147] focus:ring-[#002147]"
                      />
                      <label htmlFor="featuredFaculty" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Featured Faculty (Highlight)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ABOUT & PHILOSOPHY */}
              {activeModalTab === "about" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Short Biography / About Staff Member
                    </label>
                    <textarea
                      rows={4}
                      value={formData.shortBio || ""}
                      onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                      placeholder="Summary of background, role, and achievements..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Teaching Philosophy / Workplace Vision
                    </label>
                    <textarea
                      rows={3}
                      value={formData.teachingPhilosophy || ""}
                      onChange={(e) => setFormData({ ...formData, teachingPhilosophy: e.target.value })}
                      placeholder="Pedagogy vision or service commitment..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Area of Expertise (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={expertiseTagsInput}
                      onChange={(e) => setExpertiseTagsInput(e.target.value)}
                      placeholder="e.g. Accounting, Direct Taxes, Corporate Finance, Data Analytics"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Languages Known (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={languagesInput}
                      onChange={(e) => setLanguagesInput(e.target.value)}
                      placeholder="e.g. English, Telugu, Hindi"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: QUALIFICATIONS */}
              {activeModalTab === "qualifications" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Highest Qualification (Displayed on Cards & Directory)
                    </label>
                    <input
                      type="text"
                      value={formData.highestQualification || ""}
                      onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                      placeholder="e.g. M.Com, M.Phil., Ph.D, NET"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
                        Detailed Academic Qualifications Roster
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const list = formData.qualifications || [];
                          setFormData({
                            ...formData,
                            qualifications: [
                              ...list,
                              { degreeName: "", specialization: "", university: "", yearOfPassing: "", gradePercentage: "" },
                            ],
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Qualification Entry
                      </button>
                    </div>

                    {(formData.qualifications || []).length === 0 ? (
                      <p className="text-xs text-slate-400 font-medium italic p-4 bg-slate-50 rounded-xl text-center">
                        No specific degree entries added. Click "Add Qualification Entry" above.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {formData.qualifications?.map((q, qIdx) => (
                          <div key={qIdx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-[#002147]">Degree #{qIdx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(formData.qualifications || [])];
                                  updated.splice(qIdx, 1);
                                  setFormData({ ...formData, qualifications: updated });
                                }}
                                className="text-rose-600 hover:text-rose-800 text-xs font-bold"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="text"
                                placeholder="Degree Name (e.g. M.Com, B.Sc)"
                                value={q.degreeName || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.qualifications || [])];
                                  updated[qIdx].degreeName = e.target.value;
                                  setFormData({ ...formData, qualifications: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                              />
                              <input
                                type="text"
                                placeholder="Specialization (e.g. Taxation)"
                                value={q.specialization || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.qualifications || [])];
                                  updated[qIdx].specialization = e.target.value;
                                  setFormData({ ...formData, qualifications: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                              <input
                                type="text"
                                placeholder="University / Institution"
                                value={q.university || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.qualifications || [])];
                                  updated[qIdx].university = e.target.value;
                                  setFormData({ ...formData, qualifications: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Year of Passing (e.g. 2018)"
                                value={q.yearOfPassing || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.qualifications || [])];
                                  updated[qIdx].yearOfPassing = e.target.value;
                                  setFormData({ ...formData, qualifications: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                              <input
                                type="text"
                                placeholder="Grade / Percentage / Distinction"
                                value={q.gradePercentage || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.qualifications || [])];
                                  updated[qIdx].gradePercentage = e.target.value;
                                  setFormData({ ...formData, qualifications: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: EXPERIENCE */}
              {activeModalTab === "experience" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Total Experience (Years)
                      </label>
                      <input
                        type="text"
                        value={formData.totalExperience || ""}
                        onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                        placeholder="e.g. 15"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Teaching Experience (Years)
                      </label>
                      <input
                        type="text"
                        value={formData.teachingExperience || ""}
                        onChange={(e) => setFormData({ ...formData, teachingExperience: e.target.value })}
                        placeholder="e.g. 12"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Industry / Administrative Experience
                      </label>
                      <input
                        type="text"
                        value={formData.industryExperience || ""}
                        onChange={(e) => setFormData({ ...formData, industryExperience: e.target.value })}
                        placeholder="e.g. 3"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
                        Professional Work History
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const list = formData.professionalExperience || [];
                          setFormData({
                            ...formData,
                            professionalExperience: [
                              ...list,
                              { organization: "", designation: "", fromDate: "", toDate: "", description: "" },
                            ],
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Experience Item
                      </button>
                    </div>

                    {(formData.professionalExperience || []).length === 0 ? (
                      <p className="text-xs text-slate-400 font-medium italic p-4 bg-slate-50 rounded-xl text-center">
                        No previous experience entries added. Click "Add Experience Item" above.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {formData.professionalExperience?.map((exp, expIdx) => (
                          <div key={expIdx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-[#002147]">Role #{expIdx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(formData.professionalExperience || [])];
                                  updated.splice(expIdx, 1);
                                  setFormData({ ...formData, professionalExperience: updated });
                                }}
                                className="text-rose-600 hover:text-rose-800 text-xs font-bold"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Organization Name"
                                value={exp.organization || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.professionalExperience || [])];
                                  updated[expIdx].organization = e.target.value;
                                  setFormData({ ...formData, professionalExperience: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                              />
                              <input
                                type="text"
                                placeholder="Designation / Role"
                                value={exp.designation || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.professionalExperience || [])];
                                  updated[expIdx].designation = e.target.value;
                                  setFormData({ ...formData, professionalExperience: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="From Date (e.g. 2015)"
                                value={exp.fromDate || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.professionalExperience || [])];
                                  updated[expIdx].fromDate = e.target.value;
                                  setFormData({ ...formData, professionalExperience: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                              <input
                                type="text"
                                placeholder="To Date (e.g. 2021 or Present)"
                                value={exp.toDate || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.professionalExperience || [])];
                                  updated[expIdx].toDate = e.target.value;
                                  setFormData({ ...formData, professionalExperience: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Institutional Responsibilities & Committee Roles */}
                  <div className="border-t border-slate-200 pt-4 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
                      Institutional Responsibilities &amp; Committee Roles
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Institutional Role / Position
                      </label>
                      <input
                        type="text"
                        value={formData.institutionalRole || ""}
                        onChange={(e) => setFormData({ ...formData, institutionalRole: e.target.value })}
                        placeholder="e.g. Principal, St. Ann's College for Women or Head of the Department, Commerce"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Convener / Coordinator of Committees &amp; Cells (One per line or comma-separated)
                      </label>
                      <textarea
                        rows={3}
                        value={committeeRolesInput}
                        onChange={(e) => setCommitteeRolesInput(e.target.value)}
                        placeholder="e.g.&#10;Internal Quality Assurance Cell (IQAC) Core Member&#10;Academic Council & Curriculum Committee&#10;Women Empowerment & Anti-Ragging Cell"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: TEACHING & RESEARCH */}
              {activeModalTab === "teaching-research" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Research Areas (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={researchAreasInput}
                      onChange={(e) => setResearchAreasInput(e.target.value)}
                      placeholder="e.g. Machine Learning, Natural Language Processing, Cloud Computing"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Research Interests &amp; Overview
                    </label>
                    <textarea
                      rows={3}
                      value={formData.researchInterests || ""}
                      onChange={(e) => setFormData({ ...formData, researchInterests: e.target.value })}
                      placeholder="Detailed research focus, methodology, and ongoing explorations..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: PUBLICATIONS & AWARDS */}
              {activeModalTab === "publications-awards" && (
                <div className="space-y-6">
                  {/* Publications */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
                        Journal &amp; Conference Publications
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const list = formData.publications || [];
                          setFormData({
                            ...formData,
                            publications: [
                              ...list,
                              { publicationTitle: "", journalName: "", year: "", doiLink: "", indexing: "" },
                            ],
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Publication
                      </button>
                    </div>

                    {(formData.publications || []).length === 0 ? (
                      <p className="text-xs text-slate-400 font-medium italic p-4 bg-slate-50 rounded-xl text-center">
                        No publications listed. Click "Add Publication" to add research papers.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {formData.publications?.map((pub, pIdx) => (
                          <div key={pIdx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-[#002147]">Paper #{pIdx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(formData.publications || [])];
                                  updated.splice(pIdx, 1);
                                  setFormData({ ...formData, publications: updated });
                                }}
                                className="text-rose-600 hover:text-rose-800 text-xs font-bold"
                              >
                                Remove
                              </button>
                            </div>
                            <input
                              type="text"
                              placeholder="Paper / Publication Title"
                              value={pub.publicationTitle}
                              onChange={(e) => {
                                const updated = [...(formData.publications || [])];
                                updated[pIdx].publicationTitle = e.target.value;
                                setFormData({ ...formData, publications: updated });
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="text"
                                placeholder="Journal / Conference Name"
                                value={pub.journalName || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.publications || [])];
                                  updated[pIdx].journalName = e.target.value;
                                  setFormData({ ...formData, publications: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                              <input
                                type="text"
                                placeholder="Year (e.g. 2023)"
                                value={pub.year || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.publications || [])];
                                  updated[pIdx].year = e.target.value;
                                  setFormData({ ...formData, publications: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                              <input
                                type="text"
                                placeholder="DOI or Link (https://...)"
                                value={pub.doiLink || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.publications || [])];
                                  updated[pIdx].doiLink = e.target.value;
                                  setFormData({ ...formData, publications: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Awards */}
                  <div className="border-t border-slate-200 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
                        Honors &amp; Awards
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const list = formData.awards || [];
                          setFormData({
                            ...formData,
                            awards: [
                              ...list,
                              { awardTitle: "", awardedBy: "", awardYear: "", description: "" },
                            ],
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-bold transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Award Entry
                      </button>
                    </div>

                    {(formData.awards || []).length === 0 ? (
                      <p className="text-xs text-slate-400 font-medium italic p-4 bg-slate-50 rounded-xl text-center">
                        No awards recorded. Click "Add Award Entry" above.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {formData.awards?.map((awd, aIdx) => (
                          <div key={aIdx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-[#002147]">Award #{aIdx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(formData.awards || [])];
                                  updated.splice(aIdx, 1);
                                  setFormData({ ...formData, awards: updated });
                                }}
                                className="text-rose-600 hover:text-rose-800 text-xs font-bold"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="text"
                                placeholder="Award Title"
                                value={awd.awardTitle}
                                onChange={(e) => {
                                  const updated = [...(formData.awards || [])];
                                  updated[aIdx].awardTitle = e.target.value;
                                  setFormData({ ...formData, awards: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                              />
                              <input
                                type="text"
                                placeholder="Awarded By"
                                value={awd.awardedBy || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.awards || [])];
                                  updated[aIdx].awardedBy = e.target.value;
                                  setFormData({ ...formData, awards: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                              <input
                                type="text"
                                placeholder="Year (e.g. 2022)"
                                value={awd.awardYear || ""}
                                onChange={(e) => {
                                  const updated = [...(formData.awards || [])];
                                  updated[aIdx].awardYear = e.target.value;
                                  setFormData({ ...formData, awards: updated });
                                }}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 7: LINKS & DOCUMENTS */}
              {activeModalTab === "links-docs" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={formData.linkedinUrl || ""}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Google Scholar Profile URL
                      </label>
                      <input
                        type="url"
                        value={formData.googleScholarUrl || ""}
                        onChange={(e) => setFormData({ ...formData, googleScholarUrl: e.target.value })}
                        placeholder="https://scholar.google.com/citations?user=..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ORCID ID / URL
                      </label>
                      <input
                        type="text"
                        value={formData.orcidId || ""}
                        onChange={(e) => setFormData({ ...formData, orcidId: e.target.value })}
                        placeholder="e.g. 0000-0002-1825-0097"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Scopus Author ID
                      </label>
                      <input
                        type="text"
                        value={formData.scopusId || ""}
                        onChange={(e) => setFormData({ ...formData, scopusId: e.target.value })}
                        placeholder="e.g. 57200000000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  {/* CV Document Upload */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-xs font-bold text-slate-800">Curriculum Vitae (CV) PDF</p>
                      {formData.cvPdfUrl ? (
                        <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          CV Document attached.
                          <a href={formData.cvPdfUrl} target="_blank" className="underline ml-1">
                            Preview
                          </a>
                        </p>
                      ) : (
                        <p className="text-[11px] text-slate-500 font-medium">
                          Upload faculty detailed CV or resume PDF.
                        </p>
                      )}
                      <div className="flex items-center gap-3 pt-1">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white font-bold text-xs shadow-sm transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          {uploadingCv ? "Uploading..." : "Upload CV PDF"}
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleCvUpload}
                            disabled={uploadingCv}
                            className="hidden"
                          />
                        </label>
                        {formData.cvPdfUrl && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, cvPdfUrl: undefined, cvAssetId: undefined })}
                            className="text-xs font-bold text-rose-600 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Official Faculty Profile PDF Upload (Custom Profile View) */}
                  <div className="border border-blue-200 rounded-2xl p-4 bg-blue-50/40 flex flex-col sm:flex-row items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-300 text-[#002147] flex items-center justify-center shrink-0 shadow-sm">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-800">Official Faculty Profile PDF</p>
                        <span className="text-[10px] bg-blue-100 text-blue-900 font-extrabold px-2 py-0.5 rounded-full">
                          Website Profile View
                        </span>
                      </div>
                      {formData.facultyProfilePdfUrl ? (
                        <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Custom Profile PDF attached.
                          <a href={formData.facultyProfilePdfUrl} target="_blank" className="underline ml-1">
                            Preview PDF
                          </a>
                        </p>
                      ) : (
                        <p className="text-[11px] text-slate-500 font-medium">
                          Upload custom official profile PDF. If not uploaded, the system automatically uses default <span className="font-semibold text-[#002147]">Faculty Website Profile View.pdf</span>.
                        </p>
                      )}
                      <div className="flex items-center gap-3 pt-1">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white font-bold text-xs shadow-sm transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          {uploadingProfilePdf ? "Uploading..." : "Upload Profile PDF"}
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFacultyProfilePdfUpload}
                            disabled={uploadingProfilePdf}
                            className="hidden"
                          />
                        </label>
                        {formData.facultyProfilePdfUrl && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, facultyProfilePdfUrl: undefined, facultyProfilePdfAssetId: undefined })}
                            className="text-xs font-bold text-rose-600 hover:underline"
                          >
                            Remove (Use Default PDF)
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="border-t border-slate-200 pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white font-black text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving to Sanity...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      {editingFaculty ? "Update Profile Record" : "Create Profile Record"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* ADD / EDIT EVENT ALBUM MODAL */}
      {isAlbumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn select-none">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between border-b border-[#003366]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-400 text-[#002147]">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg">
                    {editingAlbum ? `Edit Album: ${albumFormData.title}` : "Create New Event Album"}
                  </h3>
                  <p className="text-xs text-blue-200 font-medium">
                    Upload institutional photos &amp; videos for this event directly into Sanity CDN.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAlbumModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveEventAlbum} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Event Metadata Grid */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-outfit font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                  1. Event Information
                </h4>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Event Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={albumFormData.title}
                    onChange={(e) => setAlbumFormData((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. National Faculty Development Program on Digital Pedagogies"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#002147]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={albumFormData.date}
                      onChange={(e) => setAlbumFormData((p) => ({ ...p, date: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#002147]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      Academic Year *
                    </label>
                    <select
                      value={albumFormData.year}
                      onChange={(e) => setAlbumFormData((p) => ({ ...p, year: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#002147]"
                    >
                      <option value="2025–2026">2025–2026</option>
                      <option value="2024–2025">2024–2025</option>
                      <option value="2023–2024">2023–2024</option>
                      <option value="2022–2023">2022–2023</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      Category / Department
                    </label>
                    <input
                      type="text"
                      value={albumFormData.category || ""}
                      onChange={(e) => setAlbumFormData((p) => ({ ...p, category: e.target.value }))}
                      placeholder="e.g. Faculty Development"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#002147]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Event Overview / Description
                  </label>
                  <textarea
                    rows={2}
                    value={albumFormData.description || ""}
                    onChange={(e) => setAlbumFormData((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Brief highlights and proceedings of the event..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                  />
                </div>
              </div>

              {/* Multi-File Upload to Sanity */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-outfit font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                      2. Batch Upload Photos &amp; Videos to Sanity
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Select multiple photos or video files from your device. All files upload straight to Sanity CDN.
                    </p>
                  </div>

                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-sm cursor-pointer shrink-0 active:scale-95">
                    {uploadingAlbumMedia ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Uploading {uploadProgress.current}/{uploadProgress.total}...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Select Multiple Files to Upload
                      </>
                    )}
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleBatchUploadToAlbum}
                      disabled={uploadingAlbumMedia}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Video URL Adder */}
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={videoInputUrl}
                    onChange={(e) => setVideoInputUrl(e.target.value)}
                    placeholder="Or enter YouTube link / video URL..."
                    className="flex-1 w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                  />
                  <input
                    type="text"
                    value={videoInputCaption}
                    onChange={(e) => setVideoInputCaption(e.target.value)}
                    placeholder="Video title / caption..."
                    className="w-full sm:w-48 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                  />
                  <button
                    type="button"
                    onClick={handleAddVideoToAlbum}
                    disabled={!videoInputUrl.trim()}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all disabled:opacity-40 shrink-0"
                  >
                    Add Video Link
                  </button>
                </div>
              </div>

              {/* Uploaded Media Items in this Event Album */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-outfit font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                    3. Media Items in this Album ({(albumFormData.media || []).length})
                  </h4>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Cover Image is indicated with a star ⭐
                  </span>
                </div>

                {(albumFormData.media || []).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-72 overflow-y-auto p-1">
                    {(albumFormData.media || []).map((m, idx) => {
                      const isCover = albumFormData.coverImage === m.url;
                      return (
                        <div
                          key={m.id || idx}
                          className={`bg-white rounded-xl border p-2.5 space-y-2 flex flex-col justify-between transition-all ${
                            isCover ? "border-amber-400 ring-2 ring-amber-400/20 shadow-sm" : "border-slate-200"
                          }`}
                        >
                          <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                            {m.mediaType === "video" ? (
                              <div className="w-full h-full bg-slate-900 flex items-center justify-center text-amber-400">
                                <Play className="w-8 h-8 fill-current" />
                              </div>
                            ) : (
                              <img
                                src={m.url}
                                alt={m.caption || "Asset"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/images/college_crest_gold.png";
                                }}
                              />
                            )}
                            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-black uppercase">
                              {m.mediaType}
                            </span>
                            {isCover && (
                              <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-amber-400 text-[#002147] text-[9px] font-black">
                                ⭐ Cover
                              </span>
                            )}
                          </div>

                          <input
                            type="text"
                            value={m.caption || ""}
                            onChange={(e) => {
                              const newMedia = [...(albumFormData.media || [])];
                              newMedia[idx] = { ...newMedia[idx], caption: e.target.value };
                              setAlbumFormData((p) => ({ ...p, media: newMedia }));
                            }}
                            placeholder="Add photo/video caption..."
                            className="w-full px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] text-slate-800"
                          />

                          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                            {!isCover && (
                              <button
                                type="button"
                                onClick={() => setAlbumFormData((p) => ({ ...p, coverImage: m.url }))}
                                className="text-[10px] font-bold text-amber-600 hover:text-amber-800"
                              >
                                Set as Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const newMedia = (albumFormData.media || []).filter((_, i) => i !== idx);
                                setAlbumFormData((p) => ({
                                  ...p,
                                  media: newMedia,
                                  coverImage: isCover ? newMedia[0]?.url || "" : p.coverImage,
                                }));
                              }}
                              className="text-[10px] font-bold text-rose-600 hover:text-rose-800 ml-auto"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-400 font-medium">
                    No photos or videos uploaded to this event yet. Use the batch upload button above.
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAlbumModalOpen(false)}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingAlbumMedia}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white font-black text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving to Sanity...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Save Event Album to Sanity
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {facultyToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-200 animate-scaleUp">
            <div className="flex items-center gap-3.5 text-rose-600">
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-outfit font-black text-lg text-slate-900">Delete Profile Record</h3>
                <p className="text-xs text-slate-500 font-semibold">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              Are you sure you want to permanently delete the profile of{" "}
              <strong className="text-slate-900 font-black">{facultyToDelete.facultyName}</strong> (
              {facultyToDelete.designation}, {facultyToDelete.department})?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFacultyToDelete(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT EDIT / ADD MODAL */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#002147] text-amber-300 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg text-slate-900">
                    {editingDoc ? "Edit Section Document / FDP Report" : "Add New Section Document / FDP Report"}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Upload documents directly to Sanity CDN (Sections E through J)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDocModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                    Section Category *
                  </label>
                  <select
                    value={docFormData.category}
                    onChange={(e) => setDocFormData({ ...docFormData, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002147]"
                  >
                    <option value="recruitment">Section E: Recruitment &amp; Selection</option>
                    <option value="fdp">Section F: Faculty Development (FDP)</option>
                    <option value="achievements">Section G: Faculty Achievements</option>
                    <option value="exchange">Section H: Academic Mobility &amp; Exchange</option>
                    <option value="appraisal">Section I: Performance Appraisal (ASAR)</option>
                    <option value="welfare">Section J: Faculty Welfare &amp; Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={docFormData.year || ""}
                    onChange={(e) => setDocFormData({ ...docFormData, year: e.target.value })}
                    placeholder="e.g. 2025–2026 or 2024–2025"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002147]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={docFormData.title}
                  onChange={(e) => setDocFormData({ ...docFormData, title: e.target.value })}
                  placeholder="e.g. Faculty Development Programme (FDP) Annual Report 2025–2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002147]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Subtitle / Description
                </label>
                <input
                  type="text"
                  value={docFormData.subtitle || ""}
                  onChange={(e) => setDocFormData({ ...docFormData, subtitle: e.target.value })}
                  placeholder="e.g. Institutional FDPs, Pedagogical Workshops & Training Modules"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002147]"
                />
              </div>

              {/* Main Document PDF Upload & URL */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-black uppercase text-slate-800">
                  Main Document PDF File *
                </label>
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <input
                    type="text"
                    value={docFormData.fileUrl}
                    onChange={(e) => setDocFormData({ ...docFormData, fileUrl: e.target.value })}
                    placeholder="/documents/... or https://cdn.sanity.io/..."
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  />
                  <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-black cursor-pointer shrink-0 shadow-sm">
                    {uploadingDocPdf ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingDocPdf ? "Uploading..." : "Upload to Sanity"}</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handlePolicyDocUpload}
                      disabled={uploadingDocPdf}
                    />
                  </label>
                  {docFormData.fileUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewPdfUrl(docFormData.fileUrl);
                        setPreviewPdfTitle(docFormData.title);
                      }}
                      className="px-3 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Verified Certificates PDF Upload & URL (for FDP, etc.) */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black uppercase text-amber-950">
                    Verified Participation Certificates PDF (Optional - Section F)
                  </label>
                  <span className="text-[10px] font-bold text-amber-700">
                    Leave blank to show &quot;Will be updated soon&quot;
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <input
                    type="text"
                    value={docFormData.certificatesUrl || ""}
                    onChange={(e) => setDocFormData({ ...docFormData, certificatesUrl: e.target.value })}
                    placeholder="/documents/... or https://cdn.sanity.io/..."
                    className="flex-1 bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  />
                  <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black cursor-pointer shrink-0 shadow-sm">
                    {uploadingCertPdf ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingCertPdf ? "Uploading..." : "Upload Certs"}</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleCertDocUpload}
                      disabled={uploadingCertPdf}
                    />
                  </label>
                  {docFormData.certificatesUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewPdfUrl(docFormData.certificatesUrl!);
                        setPreviewPdfTitle(`${docFormData.title} - Certificates`);
                      }}
                      className="px-3 py-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-bold shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  disabled={savingDoc}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingDoc}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white font-black text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {savingDoc ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving to Sanity...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Save Document
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF PREVIEW MODAL */}
      {previewPdfUrl && (
        <FilePreviewModal
          isOpen={!!previewPdfUrl}
          onClose={() => setPreviewPdfUrl(null)}
          fileUrl={previewPdfUrl}
          title={previewPdfTitle || "Document Preview"}
        />
      )}
    </div>
  );
}

export default FacultyProfilesManager;
