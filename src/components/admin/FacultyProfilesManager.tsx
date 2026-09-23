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
} from "lucide-react";
import { generateSlug } from "@/app/api/admin/faculty/route";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

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
  title: string;
  subtitle?: string;
  category: "recruitment" | "fdp" | "achievements" | "exchange" | "appraisal" | "welfare";
  year?: string;
  fileUrl: string;
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

  // Top Section Switcher: "teaching" | "non-teaching" | "visiting" | "policies"
  const [activeSection, setActiveSection] = useState<"teaching" | "non-teaching" | "visiting" | "policies">("teaching");

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
  const [uploadingDocPdf, setUploadingDocPdf] = useState(false);

  // Helper input states for comma-separated tags
  const [expertiseTagsInput, setExpertiseTagsInput] = useState("");
  const [languagesInput, setLanguagesInput] = useState("");
  const [researchAreasInput, setResearchAreasInput] = useState("");

  // Modal State for Delete
  const [facultyToDelete, setFacultyToDelete] = useState<FacultyMemberItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Policy Documents State (Sections E - J)
  const [policyDocs, setPolicyDocs] = useState<PolicyDocItem[]>([
    {
      id: "doc-hr-policy",
      title: "Human Resource Policy & Service Rules",
      subtitle: "Institutional recruitment and merit selection framework",
      category: "recruitment",
      year: "2024–2025",
      fileUrl: "/documents/DefaultFile_1.pdf",
    },
    {
      id: "doc-fdp-report",
      title: "Annual Faculty Development (FDP) Report",
      subtitle: "Pedagogical workshops and faculty empowerment programs",
      category: "fdp",
      year: "2024–2025",
      fileUrl: "/documents/DefaultFile_2.pdf",
    },
    {
      id: "doc-achievements",
      title: "Faculty Research, Awards & Publication Register",
      subtitle: "Compendium of faculty honors and journal publications",
      category: "achievements",
      year: "2024–2025",
      fileUrl: "/documents/DefaultFile_3.pdf",
    },
    {
      id: "doc-exchange",
      title: "Academic Mobility & Collaborative Exchange Reports",
      subtitle: "Inter-institutional guest faculty exchange initiatives",
      category: "exchange",
      year: "2024–2025",
      fileUrl: "/documents/DefaultFile_4.pdf",
    },
    {
      id: "doc-asar-appraisal",
      title: "Faculty Performance Appraisal (ASAR) Guidelines & Form",
      subtitle: "Annual self-appraisal report and API score calculation",
      category: "appraisal",
      year: "2024–2025",
      fileUrl: "/documents/DefaultFile_5.pdf",
    },
    {
      id: "doc-welfare",
      title: "Institutional Faculty Welfare Schemes & Benefit Circulars",
      subtitle: "Maternity, medical, provident fund, and financial support policies",
      category: "welfare",
      year: "2024–2025",
      fileUrl: "/documents/DefaultFile_1.pdf",
    },
  ]);

  const [activePolicyCategory, setActivePolicyCategory] = useState<string>("all");
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<PolicyDocItem | null>(null);
  const [docFormData, setDocFormData] = useState<PolicyDocItem>({
    id: "",
    title: "",
    subtitle: "",
    category: "recruitment",
    year: "2024–2025",
    fileUrl: "/documents/DefaultFile_1.pdf",
  });

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
      const isTeaching =
        (f.staffType === "teaching" || !f.staffType) &&
        f.staffType !== "non-teaching" &&
        f.staffType !== "technical" &&
        f.staffType !== "support" &&
        f.staffType !== "visiting";

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

    const payload = {
      faculty: {
        ...formData,
        slug: formData.slug?.trim() || autoSlug,
        areaOfExpertise,
        languagesKnown,
        researchAreas,
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
      const res = await fetch(`/api/admin/faculty?id=${encodeURIComponent(facultyToDelete._id)}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        showNotification("Profile deleted successfully.");
        setFacultyToDelete(null);
        fetchFaculty();
      } else {
        throw new Error(result.error || "Failed to delete profile.");
      }
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  // Handle Policy Document PDF Upload
  const handlePolicyDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDocPdf(true);
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
        setDocFormData((prev) => ({
          ...prev,
          fileUrl: result.asset.url,
        }));
        showNotification("Document PDF uploaded successfully.");
      } else {
        throw new Error(result.error || "Failed to upload document");
      }
    } catch (err: any) {
      alert("Error uploading PDF: " + err.message);
    } finally {
      setUploadingDocPdf(false);
    }
  };

  // Save Policy Document
  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFormData.title.trim()) return;

    if (editingDoc) {
      setPolicyDocs((prev) =>
        prev.map((d) => (d.id === editingDoc.id ? { ...docFormData } : d))
      );
      showNotification("Policy document updated successfully.");
    } else {
      const newDoc: PolicyDocItem = {
        ...docFormData,
        id: `doc-${Date.now()}`,
      };
      setPolicyDocs((prev) => [...prev, newDoc]);
      showNotification("New policy document added successfully.");
    }
    setIsDocModalOpen(false);
  };

  const filteredPolicyDocs = useMemo(() => {
    return policyDocs.filter((d) => {
      const matchesCat = activePolicyCategory === "all" || d.category === activePolicyCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQ = !q || d.title.toLowerCase().includes(q) || (d.subtitle && d.subtitle.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [policyDocs, activePolicyCategory, searchQuery]);

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
          {activeSection !== "policies" ? (
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#002147] font-black text-xs transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              {activeSection === "non-teaching" ? "Add Staff Member" : "Add Faculty Profile"}
            </button>
          ) : (
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#002147] font-black text-xs transition-all shadow-md active:scale-95"
            >
              <FolderPlus className="w-4 h-4" />
              Add Policy Document
            </button>
          )}
        </div>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/80">
        <button
          onClick={() => setActiveSection("teaching")}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSection === "teaching"
              ? "bg-[#002147] text-white shadow-md font-extrabold"
              : "text-slate-700 hover:bg-white/60"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          A &amp; B. Teaching Faculty Roster ({facultyList.filter((f) => (f.staffType === "teaching" || !f.staffType) && f.staffType !== "non-teaching" && f.staffType !== "technical" && f.staffType !== "support" && f.staffType !== "visiting").length})
        </button>

        <button
          onClick={() => setActiveSection("non-teaching")}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSection === "non-teaching"
              ? "bg-[#002147] text-white shadow-md font-extrabold"
              : "text-slate-700 hover:bg-white/60"
          }`}
        >
          <Network className="w-4 h-4" />
          C. Non-Teaching Staff ({nonTeachingCounts.all})
        </button>

        <button
          onClick={() => setActiveSection("visiting")}
          className={`flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSection === "visiting"
              ? "bg-[#002147] text-white shadow-md font-extrabold"
              : "text-slate-700 hover:bg-white/60"
          }`}
        >
          <Users className="w-4 h-4" />
          D. Visiting / Adjunct
        </button>

        <button
          onClick={() => setActiveSection("policies")}
          className={`flex-1 min-w-[220px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSection === "policies"
              ? "bg-[#002147] text-white shadow-md font-extrabold"
              : "text-slate-700 hover:bg-white/60"
          }`}
        >
          <FileText className="w-4 h-4" />
          E - J. Policy Archives &amp; PDFs ({policyDocs.length})
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

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeSection === "policies"
                ? "Search policies, circulars, reports, and PDFs..."
                : "Search by name, designation, qualification, emp ID, or slug..."
            }
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

        {activeSection !== "policies" && (
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
        )}
      </div>

      {/* SECTIONS A, B, C, D: FACULTY & STAFF TABLE */}
      {activeSection !== "policies" && (
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
                              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#002147] font-black text-xs flex items-center justify-center border border-blue-200 shrink-0">
                                {item.facultyName ? item.facultyName.charAt(0) : "F"}
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
      )}

      {/* SECTION E - J: POLICY DOCUMENTS & ARCHIVES */}
      {activeSection === "policies" && (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-outfit font-black text-slate-900 text-base md:text-lg">
                Statutory Policy &amp; Faculty Documents Register
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Official PDF documents, appraisal forms, and welfare circulars for Sections E through J
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPolicyDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-indigo-300 transition-all flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#002147] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileText className="w-5 h-5 text-indigo-200" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-[#002147]">
                        Section {doc.category.toUpperCase()}
                      </span>
                      {doc.year && (
                        <span className="text-[10px] font-bold text-slate-500">{doc.year}</span>
                      )}
                    </div>
                    <h4 className="font-outfit font-extrabold text-slate-900 text-sm">{doc.title}</h4>
                    {doc.subtitle && (
                      <p className="text-xs text-slate-600 font-medium">{doc.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setPreviewPdfUrl(doc.fileUrl);
                        setPreviewPdfTitle(doc.title);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview PDF
                    </button>
                    <a
                      href={doc.fileUrl}
                      download
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingDoc(doc);
                        setDocFormData(doc);
                        setIsDocModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all font-bold"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove document "${doc.title}"?`)) {
                          setPolicyDocs((prev) => prev.filter((d) => d.id !== doc.id));
                          showNotification("Document removed.");
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all font-bold"
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

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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

                  {/* Profile Photo Upload */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-5">
                    {formData.profilePhotoUrl ? (
                      <img
                        src={formData.profilePhotoUrl}
                        alt="Profile Preview"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#002147]/20 shadow-md shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-400 font-bold shrink-0">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                    <div className="space-y-1.5 flex-1">
                      <p className="text-xs font-bold text-slate-800">Profile Photo</p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Upload portrait or official photo (JPG, PNG, WebP).
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
                            Remove
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

      {/* POLICY DOCUMENT MODAL (Sections E - J) */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-5 border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-[#002147]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-slate-900 text-base">
                    {editingDoc ? "Edit Policy Document" : "Add Policy Document"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Sections E through J</p>
                </div>
              </div>
              <button
                onClick={() => setIsDocModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={docFormData.title}
                  onChange={(e) => setDocFormData({ ...docFormData, title: e.target.value })}
                  placeholder="e.g. Annual Faculty Development Program Report"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subtitle / Description
                </label>
                <input
                  type="text"
                  value={docFormData.subtitle || ""}
                  onChange={(e) => setDocFormData({ ...docFormData, subtitle: e.target.value })}
                  placeholder="e.g. Statutory norms, workshops, and participation certificates"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Section Category
                  </label>
                  <select
                    value={docFormData.category}
                    onChange={(e) => setDocFormData({ ...docFormData, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                  >
                    <option value="recruitment">Section E - Recruitment Policy</option>
                    <option value="fdp">Section F - Faculty Development (FDP)</option>
                    <option value="achievements">Section G - Faculty Achievements</option>
                    <option value="exchange">Section H - Academic Mobility</option>
                    <option value="appraisal">Section I - Appraisal (ASAR)</option>
                    <option value="welfare">Section J - Welfare Schemes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Academic Year / Period
                  </label>
                  <input
                    type="text"
                    value={docFormData.year || ""}
                    onChange={(e) => setDocFormData({ ...docFormData, year: e.target.value })}
                    placeholder="e.g. 2024–2025"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Upload PDF */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2">
                <label className="block text-xs font-bold text-slate-700">Attach Official PDF</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    {uploadingDocPdf ? "Uploading..." : "Upload PDF"}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePolicyDocUpload}
                      disabled={uploadingDocPdf}
                      className="hidden"
                    />
                  </label>
                  {docFormData.fileUrl && (
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      PDF Attached
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={docFormData.fileUrl}
                  onChange={(e) => setDocFormData({ ...docFormData, fileUrl: e.target.value })}
                  placeholder="Or enter PDF URL (/documents/...)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-medium text-slate-700 mt-2"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow"
                >
                  Save Document
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
