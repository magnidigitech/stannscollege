"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Building,
  ShieldCheck,
  Award,
  Search,
  ChevronDown,
  FileText,
  Download,
  GraduationCap,
  Network,
  Lightbulb,
  Activity,
  CheckCircle2,
  Eye,
  HeartHandshake,
  Compass,
  Filter,
  Archive,
  Calendar,
  X,
  Camera,
  Play,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { getCleanPdfUrl } from "@/lib/pdf-viewer";
import {
  FACULTY_DATA,
  FacultyMember,
  NonTeachingMember,
  DepartmentItem,
  FacultyEventAlbum,
  FacultyEventMedia
} from "@/components/faculty/staticData";

const DEFAULT_PDF = "/documents/faculty/Faculty_Website_Profile_View.pdf";

const FACULTY_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "teaching-staff",
    title: "A. Teaching Faculty",
    sectionId: "teaching-staff",
    items: [
      { text: "1. Teaching Staff Directory", id: "teaching-staff" },
    ],
  },
  {
    catSlug: "department-wise",
    title: "B. Department-Wise Faculty",
    sectionId: "department-wise",
    items: [
      { text: "1. Academic Departments & Profiles", id: "department-wise" },
    ],
  },
  {
    catSlug: "non-teaching-staff",
    title: "C. Non-Teaching Staff",
    sectionId: "non-teaching-staff",
    items: [
      { text: "1. Administrative Staff", id: "administrative-staff" },
      { text: "2. Laboratory & Technical Support Staff", id: "technical-staff" },
      { text: "3. Contingent Staff", id: "support-staff" },
    ],
  },
  {
    catSlug: "visiting-professors",
    title: "D. Visiting / Adjunct Faculty",
    sectionId: "visiting-professors",
    items: [
      { text: "1. Visiting & Adjunct Scholars", id: "visiting-professors" },
    ],
  },
  {
    catSlug: "recruitment-policy",
    title: "E. Recruitment & Selection",
    sectionId: "recruitment-policy",
    items: [
      { text: "1. Recruitment Policy & Process", id: "recruitment-policy" },
    ],
  },
  {
    catSlug: "faculty-development",
    title: "F. Faculty Development (FDP)",
    sectionId: "faculty-development",
    items: [
      { text: "1. FDP Reports & Certificates", id: "faculty-development" },
    ],
  },
  {
    catSlug: "faculty-achievements",
    title: "G. Faculty Achievements",
    sectionId: "faculty-achievements",
    items: [
      { text: "1. Honors, Awards & Publications", id: "faculty-achievements" },
    ],
  },
  {
    catSlug: "faculty-exchange",
    title: "H. Academic Mobility & Exchange",
    sectionId: "faculty-exchange",
    items: [
      { text: "1. Faculty Exchange & Collaborations", id: "faculty-exchange" },
    ],
  },
  {
    catSlug: "performance-appraisal",
    title: "I. Performance Appraisal (ASAR)",
    sectionId: "performance-appraisal",
    items: [
      { text: "1. 360° Appraisal & ASAR", id: "performance-appraisal" },
    ],
  },
  {
    catSlug: "faculty-welfare",
    title: "J. Faculty Welfare & Support",
    sectionId: "faculty-welfare",
    items: [
      { text: "1. Welfare Schemes & Benefits", id: "faculty-welfare" },
    ],
  },
  {
    catSlug: "faculty-gallery",
    title: "K. Faculty & Staff Gallery",
    sectionId: "faculty-gallery",
    items: [
      { text: "1. Photo & Video Gallery", id: "faculty-gallery" },
    ],
  },
];

interface TabItem {
  id: string;
  slug: string;
  sectionCode: string;
  title: string;
  subtitle: string;
  icon: any;
  aliases: string[];
}

const TABS: TabItem[] = [
  {
    id: "teaching-staff",
    slug: "teaching-staff",
    sectionCode: "A",
    title: "A. Teaching Faculty",
    subtitle: "List of qualified, experienced, and dedicated teaching staff across all academic departments.",
    icon: Users,
    aliases: ["teaching-staff", "teaching-faculty", "sec-teaching-roster", "sec-teaching-faculty"]
  },
  {
    id: "department-wise",
    slug: "department-wise",
    sectionCode: "B",
    title: "B. Department-Wise Faculty",
    subtitle: "Detailed faculty rosters across all 15 academic departments with qualifications, experience, and profile links.",
    icon: Building,
    aliases: ["department-wise", "departmental-faculty", "sec-dept-faculty"]
  },
  {
    id: "non-teaching-staff",
    slug: "non-teaching-staff",
    sectionCode: "C",
    title: "C. Non-Teaching Staff",
    subtitle: "Dedicated administrative, laboratory, technical, and campus support personnel.",
    icon: Network,
    aliases: ["non-teaching-staff", "non-teaching", "sec-non-teaching"]
  },
  {
    id: "visiting-professors",
    slug: "visiting-professors",
    sectionCode: "D",
    title: "D. Visiting / Adjunct Faculty",
    subtitle: "Distinguished academic scholars, industry leaders, and guest resource persons.",
    icon: GraduationCap,
    aliases: ["visiting-professors", "visiting-faculty", "sec-visiting-faculty"]
  },
  {
    id: "recruitment-policy",
    slug: "recruitment-policy",
    sectionCode: "E",
    title: "E. Faculty Recruitment & Selection",
    subtitle: "Merit-based, transparent selection in compliance with statutory UGC, APSCHE, and ANU norms.",
    icon: ShieldCheck,
    aliases: ["recruitment-policy", "recruitment-selection", "sec-recruitment"]
  },
  {
    id: "faculty-development",
    slug: "faculty-development",
    sectionCode: "F",
    title: "F. Faculty Development & Professional Development (FDP)",
    subtitle: "Continuous pedagogical enrichment, research orientation, and skill upgradation.",
    icon: Lightbulb,
    aliases: ["faculty-development", "professional-development", "seminars-conferences", "fdp", "sec-fdp"]
  },
  {
    id: "faculty-achievements",
    slug: "faculty-achievements",
    sectionCode: "G",
    title: "G. Faculty Achievements",
    subtitle: "Excellence in research, publications, patents, awards, and scholarly pursuits.",
    icon: Award,
    aliases: ["faculty-achievements", "sec-achievements"]
  },
  {
    id: "faculty-exchange",
    slug: "faculty-exchange",
    sectionCode: "H",
    title: "H. Academic Mobility & Faculty Exchange",
    subtitle: "Inter-institutional collaboration, guest lectures, and academic interaction.",
    icon: Compass,
    aliases: ["faculty-exchange", "academic-mobility", "sec-exchange"]
  },
  {
    id: "performance-appraisal",
    slug: "performance-appraisal",
    sectionCode: "I",
    title: "I. Faculty Performance Appraisal (ASAR)",
    subtitle: "Systematic, multi-dimensional 360° evaluation and continuous quality enhancement.",
    icon: Activity,
    aliases: ["performance-appraisal", "sec-appraisal"]
  },
  {
    id: "faculty-welfare",
    slug: "faculty-welfare",
    sectionCode: "J",
    title: "J. Faculty Welfare & Support",
    subtitle: "Comprehensive institutional support, social security, and conducive workplace environment.",
    icon: HeartHandshake,
    aliases: ["faculty-welfare", "welfare-support", "sec-welfare"]
  },
  {
    id: "faculty-gallery",
    slug: "faculty-gallery",
    sectionCode: "K",
    title: "K. Faculty & Staff Photo & Video Gallery",
    subtitle: "Memorable moments, academic seminars, workshops, faculty development events, and celebrations.",
    icon: Camera,
    aliases: ["faculty-gallery", "gallery", "photo-gallery", "video-gallery", "sec-gallery"]
  }
];

function normalizeKey(str: string) {
  return (str || "")
    .toLowerCase()
    .replace(/^(dr|mr|mrs|ms|miss|prof|sr|lft)\.?\s*/gi, "")
    .replace(/^(dr|mr|mrs|ms|miss|prof|sr|lft)\.?\s*/gi, "")
    .replace(/[^a-z0-9]/g, "");
}

function getEmbedUrl(url: string) {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  return url;
}

interface FacultyClientPortalProps {
  initialMembers?: any[];
  initialSections?: any[];
  activeSlug?: string;
  profileSlugMap?: Record<string, string>;
  profilePhotoMap?: Record<string, string>;
  profilePdfMap?: Record<string, string>;
  profileDetailsMap?: Record<string, any>;
  initialPdfDocuments?: any[];
}

export default function FacultyClientPortal({
  initialMembers = [],
  initialSections = [],
  activeSlug = "teaching-staff",
  profileSlugMap = {},
  profilePhotoMap = {},
  profilePdfMap = {},
  profileDetailsMap = {},
  initialPdfDocuments = []
}: FacultyClientPortalProps) {
  const router = useRouter();

  // Determine current active tab
  const resolvedActiveTabId = useMemo(() => {
    const slugLower = (activeSlug || "").toLowerCase();
    const matched = TABS.find(
      (t) => t.id === slugLower || t.slug === slugLower || t.aliases.includes(slugLower)
    );
    return matched ? matched.id : "teaching-staff";
  }, [activeSlug]);

  const [currentTab, setCurrentTab] = useState<string>(resolvedActiveTabId);

  useEffect(() => {
    setCurrentTab(resolvedActiveTabId);
  }, [resolvedActiveTabId]);

  // Handle Tab Change with URL history
  const handleTabChange = (tabId: string) => {
    if (tabId === "administrative-staff") {
      setCurrentTab("non-teaching-staff");
      setActiveNonTeachingTab("administrative");
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `/faculty/non-teaching-staff`);
      }
      return;
    }
    if (tabId === "technical-staff") {
      setCurrentTab("non-teaching-staff");
      setActiveNonTeachingTab("technical");
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `/faculty/non-teaching-staff`);
      }
      return;
    }
    if (tabId === "support-staff") {
      setCurrentTab("non-teaching-staff");
      setActiveNonTeachingTab("support");
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `/faculty/non-teaching-staff`);
      }
      return;
    }

    setCurrentTab(tabId);
    const targetTab = TABS.find((t) => t.id === tabId);
    const slug = targetTab?.slug || tabId;
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/faculty/${slug}`);
    }
  };

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("All");
  const [activeNonTeachingTab, setActiveNonTeachingTab] = useState<"administrative" | "technical" | "support" | "contingent">("administrative");
  const [selectedDeptCard, setSelectedDeptCard] = useState<string>(
    FACULTY_DATA.departments[0]?.name || "1. Department of Commerce"
  );

  // PDF Preview Modal state
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [currentPdfTitle, setCurrentPdfTitle] = useState("");

  // Faculty / Staff Interactive Profile Modal (Image 1 + Image 2) state
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

  const handleOpenProfileModal = (profileData: any) => {
    setSelectedProfile(profileData);
    setProfileModalOpen(true);
  };

  // FDP Archive Modal state
  const [fdpArchiveModalOpen, setFdpArchiveModalOpen] = useState(false);
  const [fdpArchiveSearchQuery, setFdpArchiveSearchQuery] = useState("");

  const handleOpenPdf = (url?: string, title?: string) => {
    const validUrl = url && url.trim() && url !== "#" ? url.trim() : DEFAULT_PDF;
    const cleanUrl = getCleanPdfUrl(validUrl, title);
    setCurrentPdfUrl(cleanUrl);
    setCurrentPdfTitle(title || "Faculty Document");
    setPdfModalOpen(true);
  };

  // Live policy documents from Sanity / API
  const [livePolicyDocs, setLivePolicyDocs] = useState<any[]>(initialPdfDocuments || []);

  useEffect(() => {
    async function fetchPolicies() {
      try {
        const res = await fetch("/api/faculty-policies");
        const data = await res.json();
        if (data.success && Array.isArray(data.documents) && data.documents.length > 0) {
          setLivePolicyDocs(data.documents);
        }
      } catch (err) {
        console.warn("Could not fetch live faculty policy documents:", err);
      }
    }
    fetchPolicies();
  }, []);

  // Section E HR Policy document
  const hrPolicyDoc = useMemo(() => {
    const matched = livePolicyDocs.find((d) => d.category === "recruitment");
    if (matched) {
      return {
        title: matched.title || FACULTY_DATA.recruitment.hrPolicyDoc.title,
        subtitle: matched.subtitle || FACULTY_DATA.recruitment.hrPolicyDoc.subtitle,
        fileUrl: matched.fileUrl || FACULTY_DATA.recruitment.hrPolicyDoc.fileUrl,
        year: matched.year || FACULTY_DATA.recruitment.hrPolicyDoc.year,
      };
    }
    return FACULTY_DATA.recruitment.hrPolicyDoc;
  }, [livePolicyDocs]);

  // Memoized FDP Annual Reports (all, latest 3, and filtered for archive popup)
  const allFdpReports = useMemo(() => {
    const liveFdp = livePolicyDocs.filter((d) => d.category === "fdp");
    if (liveFdp.length > 0) {
      return liveFdp.map((d) => ({
        year: d.year || "2025–2026",
        title: d.title,
        subtitle: d.subtitle || "",
        fileUrl: d.fileUrl || "/documents/DefaultFile_1.pdf",
        certificatesUrl: d.certificatesUrl || "",
      }));
    }
    return FACULTY_DATA.professionalDevelopment.annualReports || [];
  }, [livePolicyDocs]);

  const latestFdpReports = useMemo(() => {
    return allFdpReports.slice(0, 3);
  }, [allFdpReports]);

  const filteredFdpArchiveReports = useMemo(() => {
    const q = fdpArchiveSearchQuery.trim().toLowerCase();
    if (!q) return allFdpReports;
    return allFdpReports.filter(
      (r) =>
        r.title?.toLowerCase().includes(q) ||
        r.subtitle?.toLowerCase().includes(q) ||
        r.year?.toLowerCase().includes(q)
    );
  }, [allFdpReports, fdpArchiveSearchQuery]);

  // Compute teaching members list with dynamic photo, profile slug, PDF & details lookup
  const teachingStaff = useMemo(() => {
    const rawList = FACULTY_DATA.teachingFaculty || [];
    return rawList.map((member) => {
      const normName = normalizeKey(member.name);
      const empId = (member.employeeId || "").trim().toUpperCase();

      // Look up slug
      let slug = member.slug || "";
      if (empId && profileSlugMap[empId]) {
        slug = profileSlugMap[empId];
      } else {
        for (const [key, val] of Object.entries(profileSlugMap)) {
          if (normalizeKey(key) === normName || normName.includes(normalizeKey(key)) || normalizeKey(key).includes(normName)) {
            slug = val;
            break;
          }
        }
      }

      // Look up photo by employeeId first, then name
      let photo = member.imageUrl || "";
      if (empId && profilePhotoMap[empId]) {
        photo = profilePhotoMap[empId];
      } else {
        for (const [key, val] of Object.entries(profilePhotoMap)) {
          if (normalizeKey(key) === normName || normName.includes(normalizeKey(key)) || normalizeKey(key).includes(normName)) {
            photo = val;
            break;
          }
        }
      }

      // Look up custom uploaded PDF from Admin by employeeId first, then name
      let pdf = (member as any).pdfUrl || "";
      if (empId && profilePdfMap[empId]) {
        pdf = profilePdfMap[empId];
      } else {
        for (const [key, val] of Object.entries(profilePdfMap)) {
          if (normalizeKey(key) === normName || normName.includes(normalizeKey(key)) || normalizeKey(key).includes(normName)) {
            pdf = val;
            break;
          }
        }
      }

      // Look up full details from Sanity / Admin by employeeId first, then name
      let details: any = null;
      if (empId && profileDetailsMap[empId]) {
        details = profileDetailsMap[empId];
      } else {
        for (const [key, val] of Object.entries(profileDetailsMap)) {
          if (normalizeKey(key) === normName || normName.includes(normalizeKey(key)) || normalizeKey(key).includes(normName)) {
            details = val;
            break;
          }
        }
      }

      // If custom uploaded PDF exists, use it; otherwise, use default Faculty Website Profile View.pdf
      const finalPdfUrl = pdf && (pdf.startsWith("http") || pdf.startsWith("/")) ? pdf : DEFAULT_PDF;

      return {
        ...member,
        profileSlug: slug || undefined,
        imageUrl: photo || details?.profilePhotoUrl || undefined,
        pdfUrl: finalPdfUrl,
        frsId: details?.frsId || (member as any).frsId || "",
        aicteId: details?.aicteId || (member as any).aicteId || "",
        institutionalRole: details?.institutionalRole || (member as any).institutionalRole || "",
        committeeRoles: details?.committeeRoles || (member as any).committeeRoles || []
      };
    });
  }, [profileSlugMap, profilePhotoMap, profilePdfMap, profileDetailsMap]);

  // Map of faculty by Employee ID and Normalized Name for quick department lookups
  const facultyLookupMap = useMemo(() => {
    const map = new Map<string, typeof teachingStaff[0]>();
    teachingStaff.forEach((m) => {
      if (m.employeeId && m.employeeId !== "—") {
        map.set(m.employeeId.trim().toUpperCase(), m);
        map.set(m.employeeId.trim().toLowerCase(), m);
      }
      map.set(normalizeKey(m.name), m);
    });
    return map;
  }, [teachingStaff]);

  // Visiting Faculty computed list
  const visitingStaff = useMemo(() => {
    const dynamicVisiting = (initialMembers || []).filter(
      (m: any) => m.staffType === "visiting"
    );
    const staticVisiting = FACULTY_DATA.visitingFaculty?.members || [];
    const combined: any[] = [];
    const seen = new Set<string>();

    dynamicVisiting.forEach((m: any) => {
      const key = (m.employeeId || m.facultyId || m.name || "").trim().toLowerCase();
      if (key && !seen.has(key)) {
        seen.add(key);
        combined.push({
          sNo: combined.length + 1,
          employeeId: m.employeeId || m.facultyId || `SACW-VF-${String(combined.length + 1).padStart(3, "0")}`,
          name: m.name || m.facultyName,
          designation: m.designation || "Visiting Professor",
          department: m.department || "Specialized Academic / Industry Expert",
          qualification: m.qualification || m.highestQualification || "Postgraduate / Doctoral",
          dateOfJoining: m.dateOfJoining || "—",
          experience: m.experience || m.totalExperience || "—",
          specialization: m.specialization || (Array.isArray(m.areaOfExpertise) ? m.areaOfExpertise.join(", ") : m.areaOfExpertise) || "",
          profilePdfUrl: m.profilePdfUrl || m.facultyProfilePdfUrl || DEFAULT_PDF,
          imageUrl: m.imageUrl || m.profilePhotoUrl || "",
        });
      }
    });

    staticVisiting.forEach((m: any) => {
      const key = (m.employeeId || m.name || "").trim().toLowerCase();
      if (key && !seen.has(key)) {
        seen.add(key);
        const normName = normalizeKey(m.name);
        const empId = (m.employeeId || "").trim().toUpperCase();

        let photo = m.imageUrl || "";
        if (empId && profilePhotoMap[empId]) photo = profilePhotoMap[empId];
        else if (profilePhotoMap[normName]) photo = profilePhotoMap[normName];

        let pdf = m.profilePdfUrl || "";
        if (empId && profilePdfMap[empId]) pdf = profilePdfMap[empId];
        else if (profilePdfMap[normName]) pdf = profilePdfMap[normName];

        combined.push({
          ...m,
          sNo: combined.length + 1,
          imageUrl: photo || m.imageUrl,
          profilePdfUrl: pdf || m.profilePdfUrl || DEFAULT_PDF,
        });
      }
    });

    return combined;
  }, [initialMembers, profilePhotoMap, profilePdfMap]);

  // Event Gallery & Toast States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [eventAlbums, setEventAlbums] = useState<FacultyEventAlbum[]>(FACULTY_DATA.eventAlbums || []);
  const [selectedEventAlbum, setSelectedEventAlbum] = useState<FacultyEventAlbum | null>(null);
  const [galleryYearFilter, setGalleryYearFilter] = useState<string>("all");
  const [albumMediaFilter, setAlbumMediaFilter] = useState<"all" | "photo" | "video">("all");
  const [eventSearchQuery, setEventSearchQuery] = useState<string>("");
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState<number | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<{ url: string; title: string; caption?: string } | null>(null);

  useEffect(() => {
    async function loadLiveAlbums() {
      try {
        const res = await fetch("/api/faculty-gallery");
        const data = await res.json();
        if (data.success && Array.isArray(data.albums) && data.albums.length > 0) {
          setEventAlbums(data.albums);
        }
      } catch (err) {
        console.warn("Could not fetch dynamic faculty event albums:", err);
      }
    }
    loadLiveAlbums();
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const galleryAvailableYears = useMemo(() => {
    const years = new Set<string>();
    eventAlbums.forEach((alb) => {
      if (alb.year) years.add(alb.year);
    });
    return Array.from(years);
  }, [eventAlbums]);

  const filteredEventAlbums = useMemo(() => {
    const q = eventSearchQuery.trim().toLowerCase();
    return eventAlbums.filter((alb) => {
      const matchesYear = galleryYearFilter === "all" || alb.year === galleryYearFilter;
      const matchesSearch =
        !q ||
        alb.title.toLowerCase().includes(q) ||
        (alb.category && alb.category.toLowerCase().includes(q)) ||
        (alb.description && alb.description.toLowerCase().includes(q));
      return matchesYear && matchesSearch;
    });
  }, [eventAlbums, galleryYearFilter, eventSearchQuery]);

  // Current selected album's photos for lightbox navigation
  const currentAlbumPhotos = useMemo(() => {
    if (!selectedEventAlbum) return [];
    return (selectedEventAlbum.media || []).filter((m) => m.mediaType === "photo");
  }, [selectedEventAlbum]);

  const currentAlbumFilteredMedia = useMemo(() => {
    if (!selectedEventAlbum) return [];
    const allMedia = selectedEventAlbum.media || [];
    if (albumMediaFilter === "all") return allMedia;
    return allMedia.filter((m) => m.mediaType === albumMediaFilter);
  }, [selectedEventAlbum, albumMediaFilter]);

  // Unique departments for filter dropdown
  const departmentOptions = useMemo(() => {
    const set = new Set<string>();
    teachingStaff.forEach((m) => {
      if (m.department) set.add(m.department);
    });
    return ["All", ...Array.from(set).sort()];
  }, [teachingStaff]);

  // Filtered teaching staff
  const filteredTeachingStaff = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return teachingStaff;

    return teachingStaff.filter((m) => {
      return (
        m.name.toLowerCase().includes(query) ||
        m.designation.toLowerCase().includes(query) ||
        (m.department && m.department.toLowerCase().includes(query)) ||
        (m.qualification && m.qualification.toLowerCase().includes(query)) ||
        (m.employeeId && m.employeeId.toLowerCase().includes(query))
      );
    });
  }, [teachingStaff, searchQuery]);

  const activeTabObj = TABS.find((t) => t.id === currentTab) || TABS[0];
  const IconComponent = activeTabObj.icon;

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      <div className="flex flex-col font-sans select-none animate-fadeIn w-full">
        
        {/* Main Content Container (Sidebar on Left, Data Elements on Right) */}
        <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Left: About Navigation Sidebar */}
            <aside className="lg:col-span-3">
              <AboutSidebar
                categories={FACULTY_SIDEBAR_CATEGORIES}
                bannerTitle="Faculty & Staff Directory"
                bannerSubtitle="Sections on this Page"
                activeId={currentTab}
                onItemClick={(id) => handleTabChange(id)}
              />
            </aside>

            {/* Right: Data Elements / Sections */}
            <main className="lg:col-span-9 flex flex-col gap-10 mb-16">
              <div className="flex flex-col gap-4">

                {/* Sub-text Box */}
                <SubtextBox>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    <strong className="text-blue-900 font-bold">
                      St. Ann’s College for Women, Gorantla, Guntur
                    </strong>, is supported by a team of qualified, experienced and dedicated faculty committed to academic excellence and the holistic development of students. Through student-centred teaching, mentoring, research, innovation and professional development, our faculty fosters an inclusive and intellectually stimulating learning environment, contributing to the overall growth and quality enhancement of the institution.
                    <span className="block mt-2 text-slate-600 font-medium text-sm">
                      This section provides access to the teaching faculty directory, department-wise faculty profiles, non-teaching staff, recruitment policies, faculty development programmes, achievements, academic mobility, appraisal systems and welfare schemes.
                    </span>
                  </p>
                </SubtextBox>

                {/* ============================================================ */}
                {/* SECTION CONTAINER (Active Tab View)                           */}
                {/* ============================================================ */}
                <section
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  {/* Full-Width Section Header Banner */}
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        {activeTabObj.title}
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      {activeTabObj.subtitle}
                    </p>
                  </div>

                  {/* Section Content Area */}
                  <div
                    className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200"
                    style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                  >

                    {/* SECTION A: TEACHING STAFF DIRECTORY */}
                    {currentTab === "teaching-staff" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 shrink-0">
                              <Users className="h-5 w-5" />
                            </span>
                            <div>
                              <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                List of Teaching Staff
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">
                                Total Teaching Faculty: {teachingStaff.length} Members
                              </p>
                            </div>
                          </div>

                          {/* Search Toolbar on Right Side */}
                          <div className="relative w-full sm:w-72 md:w-80">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search faculty, designation, dept..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-14 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] transition-all"
                            />
                            {searchQuery && (
                              <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[11px] font-bold px-1.5 py-0.5"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Full-Width Table with Zero Horizontal Overflow */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-inner overflow-hidden">
                          <table className="w-full border-collapse text-left font-sans text-xs">
                            <thead>
                              <tr className="bg-[#002147] text-white font-outfit text-[11px] sm:text-xs font-black uppercase tracking-wider">
                                <th className="px-3 py-3.5 text-center w-12">S.No.</th>
                                <th className="px-4 py-3.5 min-w-[200px]">Name of the Employee</th>
                                <th className="px-3 py-3.5 min-w-[170px]">Designation</th>
                                <th className="px-3 py-3.5 min-w-[130px]">Department</th>
                                <th className="px-3 py-3.5 min-w-[130px]">Qualification</th>
                                <th className="px-4 py-3.5 text-center whitespace-nowrap">Date of Joining</th>
                                <th className="px-4 py-3.5 text-center whitespace-nowrap">Experience</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                              {filteredTeachingStaff.length > 0 ? (
                                filteredTeachingStaff.map((m, idx) => {
                                  return (
                                    <tr
                                      key={m.employeeId ? `${m.employeeId}-${idx}` : `${m.name}-${m.sNo || idx}`}
                                      className="hover:bg-slate-50/80 transition-colors group"
                                    >
                                      <td className="px-3 py-3 text-center font-bold text-[#002147] bg-slate-50/40 text-xs">
                                        {m.sNo}
                                      </td>
                                      <td className="px-4 py-3 font-semibold text-slate-800 text-xs">
                                        <button
                                          type="button"
                                          onClick={() => handleOpenProfileModal({
                                            ...m,
                                            employmentClassification: (m as any).employmentClassification || "Full-Time Teaching Faculty",
                                            frsId: m.frsId || "",
                                            aicteId: m.aicteId || "",
                                            institutionalRole: m.institutionalRole || (m.designation.includes("Principal") ? "Principal, St. Ann's College for Women" : m.designation.includes("HOD") ? `Head of the Department, ${m.department}` : `${m.designation}, St. Ann's College for Women`),
                                            committeeRoles: m.committeeRoles && m.committeeRoles.length > 0 ? m.committeeRoles : []
                                          })}
                                          className="text-[#002147] hover:text-blue-700 hover:underline inline-flex items-center gap-1.5 font-bold text-left cursor-pointer transition-colors group/btn"
                                          title={`Click to view profile of ${m.name}`}
                                        >
                                          <span>{m.name}</span>
                                          <Eye className="w-3.5 h-3.5 text-blue-600 opacity-60 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all shrink-0" />
                                        </button>
                                      </td>
                                      <td className="px-3 py-3 font-semibold text-slate-700 text-xs">
                                        {m.designation}
                                      </td>
                                      <td className="px-3 py-3 font-semibold text-slate-700 text-xs">
                                        {m.department || "—"}
                                      </td>
                                      <td className="px-3 py-3 font-semibold text-slate-700 text-xs">
                                        {m.qualification || "—"}
                                      </td>
                                      <td className="px-4 py-3 text-center font-semibold text-slate-700 text-xs whitespace-nowrap">
                                        {m.dateOfJoining}
                                      </td>
                                      <td className="px-4 py-3 text-center font-semibold text-slate-700 text-xs whitespace-nowrap">
                                        {m.experience} {m.experience && !m.experience.includes("Yr") && !m.experience.includes("—") ? "Yrs" : ""}
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold text-sm">
                                    No faculty members match your search criteria.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* SECTION B: DEPARTMENT-WISE FACULTY */}
                    {currentTab === "department-wise" && (
                      <div className="flex flex-col gap-6">
                        {/* Department Dropdown Selector */}
                        <div
                          className="border-2 border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 shrink-0">
                              <Building className="h-5 w-5" />
                            </span>
                            <div>
                              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                                Select Academic Department:
                              </span>
                              <span className="text-xs font-bold text-[#002147]">
                                15 Academic Departments Available
                              </span>
                            </div>
                          </div>

                          <div className="relative min-w-[280px] sm:min-w-[360px]">
                            <select
                              value={selectedDeptCard}
                              onChange={(e) => setSelectedDeptCard(e.target.value)}
                              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm font-extrabold text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] appearance-none cursor-pointer shadow-sm"
                            >
                              {FACULTY_DATA.departments.map((dept) => (
                                <option key={dept.name} value={dept.name}>
                                  {dept.name} ({dept.facultyNames.length} Faculty)
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Department Card */}
                        <div className="flex flex-col gap-8">
                          {FACULTY_DATA.departments
                            .filter((dept) => dept.name === selectedDeptCard)
                            .map((dept) => (
                              <div
                                key={dept.name}
                                className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col gap-6"
                                style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                              >
                                {/* Department Header Banner */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                  <div className="flex items-center gap-3.5">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                                      <Building className="h-5 w-5" />
                                    </span>
                                    <div>
                                      <h3 className="font-outfit text-blue-600 font-extrabold text-lg md:text-xl uppercase tracking-wider">
                                        {dept.name}
                                      </h3>
                                      {dept.tagline && (
                                        <p className="text-xs text-slate-500 font-semibold italic mt-0.5">
                                          "{dept.tagline}"
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <span className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-[#002147] text-xs font-black shrink-0 self-start sm:self-auto">
                                    {dept.facultyNames.length} Faculty Member{dept.facultyNames.length !== 1 ? "s" : ""}
                                  </span>
                                </div>

                                {dept.description && (
                                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                                    {dept.description}
                                  </p>
                                )}

                                {/* Member Cards */}
                                <div className="flex flex-col gap-4">
                                  {(dept.members && dept.members.length > 0 ? dept.members : dept.facultyNames.map(name => ({ name }))).map((rawMem: any, mIdx) => {
                                    const facultyName = typeof rawMem === 'string' ? rawMem : rawMem.name;
                                    const rawEmpId = (typeof rawMem === 'object' && rawMem.employeeId ? rawMem.employeeId : "").trim().toUpperCase();
                                    const normName = normalizeKey(facultyName);
                                    const globalMember = (rawEmpId && rawEmpId !== "—" ? facultyLookupMap.get(rawEmpId) : null) || facultyLookupMap.get(normName);
                                    const member = {
                                      sNo: mIdx + 1,
                                      name: facultyName,
                                      designation: rawMem.designation || globalMember?.designation || "Faculty Member",
                                      department: dept.name.replace(/^\d+\.\s*/, ""),
                                      qualification: rawMem.qualification || globalMember?.qualification || "Postgraduate / Doctoral",
                                      dateOfJoining: rawMem.dateOfJoining || globalMember?.dateOfJoining || "—",
                                      rejoiningDate: rawMem.rejoiningDate || (globalMember as any)?.rejoiningDate || "",
                                      experience: rawMem.experience || globalMember?.experience || "—",
                                      employeeId: rawMem.employeeId || globalMember?.employeeId || "—",
                                      profileSlug: globalMember?.profileSlug,
                                      imageUrl: globalMember?.imageUrl,
                                      pdfUrl: globalMember?.pdfUrl || DEFAULT_PDF
                                    };

                                    return (
                                      <div
                                        key={member.employeeId && member.employeeId !== "—" ? `${member.employeeId}-${mIdx}` : `${member.name}-${mIdx}`}
                                        className="bg-slate-50/60 border border-slate-200/90 hover:border-indigo-300 hover:shadow-md rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 transition-all duration-300"
                                      >
                                        {/* Left: Faculty Details */}
                                        <div className="flex-1 flex flex-col justify-center text-left w-full">
                                          {member.employeeId && member.employeeId !== "—" && (
                                            <div className="mb-2">
                                              <span className="bg-[#002147]/5 text-[#002147] border border-[#002147]/10 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                                Emp ID: {member.employeeId}
                                              </span>
                                            </div>
                                          )}

                                          <h4 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] mb-3 leading-snug">
                                            {member.name}
                                          </h4>

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 border-t border-slate-200/60 pt-3 text-xs sm:text-sm font-semibold text-slate-600">
                                            <p>
                                              <span className="font-bold text-slate-800">Designation:</span>{" "}
                                              {member.designation}
                                            </p>
                                            <p>
                                              <span className="font-bold text-slate-800">Department:</span>{" "}
                                              {member.department}
                                            </p>
                                            <p>
                                              <span className="font-bold text-slate-800">Qualifications:</span>{" "}
                                              {member.qualification}
                                            </p>
                                            <p>
                                              <span className="font-bold text-slate-800">Date of Joining:</span>{" "}
                                              {member.dateOfJoining}
                                              {member.rejoiningDate ? ` (Rejoined: ${member.rejoiningDate})` : ""}
                                            </p>
                                            <p>
                                              <span className="font-bold text-slate-800">Teaching Experience:</span>{" "}
                                              {member.experience}
                                              {member.experience && !member.experience.includes("Year") && !member.experience.includes("Yr") && !member.experience.includes("—") ? " Years" : ""}
                                            </p>
                                          </div>
                                        </div>

                                        {/* Right: Framed Passport Photo & View Profile Button */}
                                        <div className="flex flex-col items-center justify-center shrink-0 w-36 sm:w-40">
                                          <div className="relative p-1.5 bg-white border-2 border-slate-200/80 rounded-2xl shadow-inner w-32 h-40 sm:w-36 sm:h-44 overflow-hidden flex items-center justify-center group/img">
                                            {member.imageUrl ? (
                                              <img
                                                src={member.imageUrl}
                                                alt={member.name}
                                                className="w-full h-full object-cover rounded-xl group-hover/img:scale-105 transition-transform duration-300"
                                              />
                                            ) : (
                                              <div className="w-full h-full rounded-xl bg-white flex flex-col items-center justify-center p-2 text-center">
                                                <img
                                                  src="/images/Crest_Logo.png"
                                                  alt="St. Ann's Crest"
                                                  className="w-full h-full object-contain p-1"
                                                />
                                              </div>
                                            )}
                                          </div>
                                          
                                          {/* View Profile Button Below Picture */}
                                          <button
                                            type="button"
                                            onClick={() => handleOpenPdf(member.pdfUrl || DEFAULT_PDF, `${member.name} - Faculty Profile`)}
                                            className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow transition-all active:scale-95 cursor-pointer"
                                            title={`View Profile PDF for ${member.name}`}
                                          >
                                            <FileText className="w-3.5 h-3.5" />
                                            <span>View Profile</span>
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* SECTION C: NON-TEACHING STAFF */}
                    {currentTab === "non-teaching-staff" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                              <Network className="h-5 w-5" />
                            </span>
                            <div>
                              <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                Non-Teaching &amp; Administrative Staff
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">
                                Total Staff: {FACULTY_DATA.nonTeachingStaff.administrative.length + FACULTY_DATA.nonTeachingStaff.technical.length + FACULTY_DATA.nonTeachingStaff.support.length} Members
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Sub-Category Tabs */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setActiveNonTeachingTab("administrative")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                              activeNonTeachingTab === "administrative"
                                ? "bg-[#002147] text-white shadow"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            Administrative Staff ({FACULTY_DATA.nonTeachingStaff.administrative.length})
                          </button>
                          <button
                            onClick={() => setActiveNonTeachingTab("technical")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                              activeNonTeachingTab === "technical"
                                ? "bg-[#002147] text-white shadow"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            Laboratory &amp; Technical Support Staff ({FACULTY_DATA.nonTeachingStaff.technical.length})
                          </button>
                          <button
                            onClick={() => setActiveNonTeachingTab("support")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                              activeNonTeachingTab === "support" || activeNonTeachingTab === "contingent"
                                ? "bg-[#002147] text-white shadow"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            Contingent Staff ({FACULTY_DATA.nonTeachingStaff.support.length})
                          </button>
                        </div>

                        {/* Non-Teaching Table */}
                        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-inner">
                          <table className="w-full border-collapse text-left font-sans min-w-[650px]">
                            <thead>
                              <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                <th className="px-3 py-3.5 text-center w-12">S.No</th>
                                <th className="px-4 py-3.5 min-w-[180px]">Staff Name</th>
                                <th className="px-4 py-3.5 min-w-[160px]">Designation</th>
                                {activeNonTeachingTab !== "support" && activeNonTeachingTab !== "contingent" && (
                                  <th className="px-4 py-3.5 min-w-[140px]">Qualification</th>
                                )}
                                <th className="px-4 py-3.5 text-center whitespace-nowrap min-w-[120px]">Joined On</th>
                                <th className="px-4 py-3.5 text-center w-28 whitespace-nowrap">Exp (Yrs)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
                              {FACULTY_DATA.nonTeachingStaff[activeNonTeachingTab].map((m: any) => {
                                const normName = normalizeKey(m.name);
                                const photo = profilePhotoMap[normName] || profilePhotoMap[m.name] || "";
                                const pdf = profilePdfMap[normName] || profilePdfMap[m.name] || DEFAULT_PDF;
                                const staffClassification = activeNonTeachingTab === "administrative" ? "Administrative Staff" : activeNonTeachingTab === "technical" ? "Laboratory & Technical Support Staff" : "Contingent Staff";
                                const staffDept = activeNonTeachingTab === "administrative" ? "Administration" : activeNonTeachingTab === "technical" ? "Technical & Laboratory Support" : "Campus Support & Maintenance";

                                const staffProfile = {
                                  ...m,
                                  employeeId: m.employeeId || `SACW-NT${String(m.sNo).padStart(2, '0')}`,
                                  department: staffDept,
                                  employmentClassification: staffClassification,
                                  imageUrl: photo || undefined,
                                  pdfUrl: pdf,
                                  frsId: m.frsId || "",
                                  aicteId: m.aicteId || "",
                                  institutionalRole: m.institutionalRole || `${m.designation}, St. Ann's College for Women`,
                                  committeeRoles: m.committeeRoles || []
                                };

                                return (
                                  <tr key={m.employeeId ? `${m.employeeId}-${m.sNo}` : `${m.name}-${m.sNo}`} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-3 py-3 text-center font-bold text-[#002147] bg-slate-50/40">
                                      {m.sNo}
                                    </td>
                                    <td className="px-4 py-3 font-extrabold text-slate-800">
                                      <button
                                        type="button"
                                        onClick={() => handleOpenProfileModal(staffProfile)}
                                        className="text-[#002147] hover:text-blue-700 hover:underline inline-flex items-center gap-1.5 font-black text-left cursor-pointer transition-colors group/btn"
                                        title={`Click to view profile of ${m.name}`}
                                      >
                                        <span>{m.name}</span>
                                        <Eye className="w-3.5 h-3.5 text-blue-600 opacity-60 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all shrink-0" />
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-slate-700">{m.designation}</td>
                                    {activeNonTeachingTab !== "support" && activeNonTeachingTab !== "contingent" && (
                                      <td className="px-4 py-3 font-medium text-slate-600 text-[12px]">{m.qualification || "—"}</td>
                                    )}
                                    <td className="px-4 py-3 text-center font-medium text-slate-600 whitespace-nowrap text-[12px]">
                                      {m.dateOfJoining || "—"}
                                    </td>
                                    <td className="px-4 py-3 text-center font-extrabold text-[#002147] whitespace-nowrap">{m.experience || "—"}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* SECTION D: VISITING & ADJUNCT FACULTY */}
                    {currentTab === "visiting-professors" && (
                      <div className="flex flex-col gap-6">
                        {/* Section Header Card */}
                        <div
                          className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 shrink-0">
                              <GraduationCap className="h-5 w-5" />
                            </span>
                            <div>
                              <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                Visiting Professors, Adjunct Faculty &amp; Industry Experts
                              </h4>
                              <p className="text-xs text-slate-500 font-semibold italic mt-0.5">
                                Distinguished Academic Scholars, Industry Leaders &amp; Guest Practitioners
                              </p>
                            </div>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1 leading-relaxed">
                            {FACULTY_DATA.visitingFaculty.description}
                          </p>
                        </div>

                        {/* Individual Visiting Faculty Member Profile Cards */}
                        <div className="flex flex-col gap-4">
                          {visitingStaff.map((member: any, idx: number) => (
                            <div
                              key={member.employeeId ? `${member.employeeId}-${idx}` : `${member.name}-${idx}`}
                              className="bg-slate-50/60 border border-slate-200/90 hover:border-indigo-300 hover:shadow-md rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 transition-all duration-300"
                            >
                              {/* Left: Faculty Details */}
                              <div className="flex-1 flex flex-col justify-center text-left w-full">
                                {member.employeeId && (
                                  <div className="mb-2">
                                    <span className="bg-[#002147]/5 text-[#002147] border border-[#002147]/10 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                      ID: {member.employeeId}
                                    </span>
                                  </div>
                                )}

                                <h4 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] mb-3 leading-snug">
                                  {member.name}
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 border-t border-slate-200/60 pt-3 text-xs sm:text-sm font-semibold text-slate-600">
                                  <p>
                                    <span className="font-bold text-slate-800">Designation:</span>{" "}
                                    {member.designation}
                                  </p>
                                  <p>
                                    <span className="font-bold text-slate-800">Department / Domain:</span>{" "}
                                    {member.department}
                                  </p>
                                  <p>
                                    <span className="font-bold text-slate-800">Qualifications:</span>{" "}
                                    {member.qualification}
                                  </p>
                                  <p>
                                    <span className="font-bold text-slate-800">Date of Joining / Associated:</span>{" "}
                                    {member.dateOfJoining}
                                  </p>
                                  <p>
                                    <span className="font-bold text-slate-800">Experience:</span>{" "}
                                    {member.experience} {member.experience && !member.experience.includes("Year") && !member.experience.includes("Yr") && !member.experience.includes("—") ? " Years" : ""}
                                  </p>
                                  {member.specialization && (
                                    <p className="sm:col-span-2">
                                      <span className="font-bold text-slate-800">Area of Specialization:</span>{" "}
                                      {member.specialization}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Right: Framed Passport Photo & View Profile Button */}
                              <div className="flex flex-col items-center justify-center shrink-0 w-36 sm:w-40">
                                <div className="relative p-1.5 bg-white border-2 border-slate-200/80 rounded-2xl shadow-inner w-32 h-40 sm:w-36 sm:h-44 overflow-hidden flex items-center justify-center group/img">
                                  {member.imageUrl ? (
                                    <img
                                      src={member.imageUrl}
                                      alt={member.name}
                                      className="w-full h-full object-cover rounded-xl group-hover/img:scale-105 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className="w-full h-full rounded-xl bg-white flex flex-col items-center justify-center p-2 text-center">
                                      <img
                                        src="/images/Crest_Logo.png"
                                        alt="St. Ann's Crest"
                                        className="w-full h-full object-contain p-1"
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* View Profile Button Below Picture */}
                                <button
                                  type="button"
                                  onClick={() => handleOpenPdf(member.profilePdfUrl || DEFAULT_PDF, `${member.name} - Visiting Faculty Profile`)}
                                  className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow transition-all active:scale-95 cursor-pointer"
                                  title={`View Profile PDF for ${member.name}`}
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>View Profile</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SECTION E: RECRUITMENT & SELECTION */}
                    {currentTab === "recruitment-policy" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            Faculty Recruitment Policy &amp; Selection Process
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.recruitment.description}
                          </p>
                        </div>

                        {/* Recruitment Pillars */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {FACULTY_DATA.recruitment.pillars.map((pillar, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#002147] text-white font-outfit font-black text-xs flex items-center justify-center shrink-0">
                                {idx + 1}
                              </div>
                              <div>
                                <h5 className="font-outfit font-extrabold text-slate-800 text-sm">
                                  {pillar.title}
                                </h5>
                                <p className="text-slate-600 text-xs font-medium mt-1 leading-relaxed">
                                  {pillar.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Official PDF Document Card */}
                        <div className="p-5 bg-blue-50/60 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-[#002147] text-white flex items-center justify-center shrink-0 shadow">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-outfit font-black text-[#002147] text-base">
                                {hrPolicyDoc.title}
                              </h5>
                              <p className="text-slate-600 text-xs font-medium mt-0.5">
                                {hrPolicyDoc.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                            <button
                              onClick={() =>
                                handleOpenPdf(
                                  hrPolicyDoc.fileUrl,
                                  "Human Resource Policy - St. Ann's College for Women"
                                )
                              }
                              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow transition-all active:scale-95 cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                              View PDF Document
                            </button>
                            <a
                              href={hrPolicyDoc.fileUrl}
                              download
                              className="inline-flex items-center justify-center p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all shadow-sm"
                              title="Download HR Policy PDF"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION F: FACULTY DEVELOPMENT (FDP) */}
                    {currentTab === "faculty-development" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            Faculty Development &amp; Professional Development
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.professionalDevelopment.description}
                          </p>
                        </div>

                        {/* 7 Pillars from Doc */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {FACULTY_DATA.professionalDevelopment.pillars.map((item, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3.5">
                              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-outfit font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="font-outfit font-bold text-slate-800 text-sm">
                                  {item.title}
                                </h5>
                                <p className="text-slate-600 text-xs font-medium mt-1 leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Year-wise FDP Activities Table 4 */}
                        <div className="space-y-4 pt-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                            <div>
                              <h5 className="font-outfit font-extrabold text-[#002147] text-base">
                                Year-wise Faculty Development &amp; Professional Development Activities
                              </h5>
                              <p className="text-xs text-slate-500 font-medium mt-0.5">
                                Table 4: Annual FDP reports, training records, and verified participation certificates.
                              </p>
                            </div>
                            {allFdpReports.length > 3 && (
                              <button
                                onClick={() => {
                                  setFdpArchiveSearchQuery("");
                                  setFdpArchiveModalOpen(true);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer"
                              >
                                <Archive className="w-4 h-4 text-indigo-600" />
                                View All Archives ({allFdpReports.length})
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {allFdpReports.map((report) => (
                              <div
                                key={report.year}
                                className="bg-slate-50/70 border-2 border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all group"
                              >
                                <div>
                                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                                    Academic Year {report.year}
                                  </span>
                                  <h5 className="font-outfit font-black text-[#002147] text-base leading-snug mt-2">
                                    {report.title}
                                  </h5>
                                  <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">
                                    {report.subtitle}
                                  </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-2.5">
                                  {/* View Document Button */}
                                  <button
                                    onClick={() => handleOpenPdf(report.fileUrl, report.title)}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>View PDF</span>
                                  </button>

                                  {/* View Certificates Button Beside Document */}
                                  <button
                                    onClick={() => {
                                      if (report.certificatesUrl && report.certificatesUrl.trim() && report.certificatesUrl !== "#") {
                                        handleOpenPdf(report.certificatesUrl, `${report.year} FDP Certificates`);
                                      } else {
                                        setToastMessage(`Certificates for Academic Year ${report.year} will be updated soon.`);
                                      }
                                    }}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                                    title="View Verified FDP & Seminars Certificates"
                                  >
                                    <Award className="w-3.5 h-3.5" />
                                    <span>View Certificates</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION G: FACULTY ACHIEVEMENTS */}
                    {currentTab === "faculty-achievements" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            Faculty Achievements &amp; Scholarly Contributions
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.achievements.description}
                          </p>
                        </div>

                        {/* 8 Pillars from Doc */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {FACULTY_DATA.achievements.pillars.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5"
                            >
                              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-outfit font-black text-xs flex items-center justify-center shrink-0">
                                {idx + 1}
                              </div>
                              <div>
                                <h5 className="font-outfit font-extrabold text-slate-800 text-sm">
                                  {item.title}
                                </h5>
                                <p className="text-slate-600 text-xs font-medium mt-1 leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Table 5: Year-wise Faculty Research & Academic Contributions */}
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-slate-100 pb-2">
                            <h5 className="font-outfit font-extrabold text-[#002147] text-base">
                              Year-wise Faculty Research &amp; Academic Contributions
                            </h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Table 5: Annual repository of research publications, patents, books/chapters, and academic contributions.
                            </p>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full border-collapse text-left text-xs font-sans">
                              <thead>
                                <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                  <th className="px-4 py-3.5 text-center w-16">S. No.</th>
                                  <th className="px-4 py-3.5 min-w-[140px]">Academic Year</th>
                                  <th className="px-4 py-3.5 text-center min-w-[150px]">Research Publications</th>
                                  <th className="px-4 py-3.5 text-center min-w-[130px]">Patents</th>
                                  <th className="px-4 py-3.5 text-center min-w-[140px]">Books / Chapters</th>
                                  <th className="px-4 py-3.5 text-center min-w-[160px]">Academic Contributions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                                {FACULTY_DATA.achievements.records.map((rec, idx) => (
                                  <tr key={rec.year || idx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-3 text-center font-bold text-slate-500">{idx + 1}</td>
                                    <td className="px-4 py-3 font-extrabold text-[#002147] whitespace-nowrap">
                                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200/80 font-bold">
                                        {rec.year}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.publicationsDoc, `Research Publications - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.patentsDoc, `Patents & Innovations - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.booksDoc, `Books & Chapters - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.academicDoc, `Academic Contributions - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION H: ACADEMIC MOBILITY & FACULTY EXCHANGE */}
                    {currentTab === "faculty-exchange" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            Faculty Exchange &amp; Academic Mobility
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.mobility.description}
                          </p>
                        </div>

                        {/* 4 Pillars from Doc */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {FACULTY_DATA.mobility.pillars.map((collab, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5"
                            >
                              <div className="w-8 h-8 rounded-lg bg-indigo-700 text-white font-outfit font-black text-xs flex items-center justify-center shrink-0">
                                {idx + 1}
                              </div>
                              <div>
                                <h5 className="font-outfit font-extrabold text-slate-800 text-sm">
                                  {collab.title}
                                </h5>
                                <p className="text-slate-600 text-xs font-medium mt-1 leading-relaxed">
                                  {collab.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Table 6: Year-wise Record of Faculty Exchange & Academic Mobility */}
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-slate-100 pb-2">
                            <h5 className="font-outfit font-extrabold text-[#002147] text-base">
                              Year-wise Record of Faculty Exchange &amp; Academic Mobility
                            </h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Table 6: Historical records of faculty exchange, study visits, invited guest talks, and collaborative programmes.
                            </p>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full border-collapse text-left text-xs font-sans">
                              <thead>
                                <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                  <th className="px-4 py-3.5 text-center w-16">S. No.</th>
                                  <th className="px-4 py-3.5 min-w-[140px]">Academic Year</th>
                                  <th className="px-4 py-3.5 text-center min-w-[150px]">Faculty Exchange</th>
                                  <th className="px-4 py-3.5 text-center min-w-[140px]">Academic Visits</th>
                                  <th className="px-4 py-3.5 text-center min-w-[140px]">Guest Lectures</th>
                                  <th className="px-4 py-3.5 text-center min-w-[180px]">Collaborative Academic Activities</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                                {FACULTY_DATA.mobility.records.map((rec, idx) => (
                                  <tr key={rec.year || idx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-3 text-center font-bold text-slate-500">{idx + 1}</td>
                                    <td className="px-4 py-3 font-extrabold text-[#002147] whitespace-nowrap">
                                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200/80 font-bold">
                                        {rec.year}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.exchangeDoc, `Faculty Exchange - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.visitsDoc, `Academic Visits - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.guestLecturesDoc, `Guest Lectures - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.collaborativeDoc, `Collaborative Academic Activities - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION I: PERFORMANCE APPRAISAL */}
                    {currentTab === "performance-appraisal" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            Faculty Performance Appraisal
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.appraisal.description}
                          </p>
                        </div>

                        {/* 5 Pillars from Doc */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {FACULTY_DATA.appraisal.pillars.map((param, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#002147] text-white font-outfit font-black text-xs flex items-center justify-center shrink-0">
                                {idx + 1}
                              </div>
                              <div>
                                <h5 className="font-outfit font-extrabold text-slate-800 text-sm">
                                  {param.title}
                                </h5>
                                <p className="text-slate-600 text-xs font-medium mt-1 leading-relaxed">
                                  {param.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Table 7: Year-wise Faculty Performance Appraisal Records */}
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-slate-100 pb-2">
                            <h5 className="font-outfit font-extrabold text-[#002147] text-base">
                              Year-wise Faculty Performance Appraisal Records
                            </h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Table 7: Annual performance appraisal system, API metrics, stakeholder feedback, and 360° evaluation.
                            </p>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full border-collapse text-left text-xs font-sans">
                              <thead>
                                <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                  <th className="px-4 py-3.5 text-center w-16">S. No.</th>
                                  <th className="px-4 py-3.5 min-w-[140px]">Academic Year</th>
                                  <th className="px-4 py-3.5 text-center min-w-[150px]">Performance Appraisal</th>
                                  <th className="px-4 py-3.5 text-center min-w-[140px]">Annual Appraisal</th>
                                  <th className="px-4 py-3.5 text-center min-w-[140px]">Academic Indicators</th>
                                  <th className="px-4 py-3.5 text-center min-w-[130px]">Feedback</th>
                                  <th className="px-4 py-3.5 text-center min-w-[140px]">360° Appraisal*</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                                {FACULTY_DATA.appraisal.records.map((rec, idx) => (
                                  <tr key={rec.year || idx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-3 text-center font-bold text-slate-500">{idx + 1}</td>
                                    <td className="px-4 py-3 font-extrabold text-[#002147] whitespace-nowrap">
                                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200/80 font-bold">
                                        {rec.year}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.appraisalDoc, `Performance Appraisal System - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.annualDoc, `Annual Faculty Appraisal - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.indicatorsDoc, `Academic Performance Indicators - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.feedbackDoc, `Teaching Feedback - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.appraisal360Doc, `360-Degree Appraisal - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION J: FACULTY WELFARE & SUPPORT */}
                    {currentTab === "faculty-welfare" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            Faculty Welfare &amp; Institutional Support
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.welfare.description}
                          </p>
                        </div>

                        {/* 5 Pillars from Doc */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {FACULTY_DATA.welfare.pillars.map((scheme, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5"
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-outfit font-black text-xs flex items-center justify-center shrink-0">
                                {idx + 1}
                              </div>
                              <div>
                                <h5 className="font-outfit font-extrabold text-slate-800 text-sm">
                                  {scheme.title}
                                </h5>
                                <p className="text-slate-600 text-xs font-medium mt-1 leading-relaxed">
                                  {scheme.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Table 8: Year-wise Faculty Welfare & Support Activities */}
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-slate-100 pb-2">
                            <h5 className="font-outfit font-extrabold text-[#002147] text-base">
                              Year-wise Faculty Welfare &amp; Support Activities
                            </h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Table 8: Welfare schemes, leave support, conference travel grants, and digital learning infrastructure.
                            </p>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full border-collapse text-left text-xs font-sans">
                              <thead>
                                <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                  <th className="px-4 py-3.5 text-center w-16">S. No.</th>
                                  <th className="px-4 py-3.5 min-w-[140px]">Academic Year</th>
                                  <th className="px-4 py-3.5 text-center min-w-[150px]">Welfare Measures</th>
                                  <th className="px-4 py-3.5 text-center min-w-[170px]">Leave &amp; Prof. Dev.</th>
                                  <th className="px-4 py-3.5 text-center min-w-[160px]">Financial Assistance</th>
                                  <th className="px-4 py-3.5 text-center min-w-[150px]">Research Support</th>
                                  <th className="px-4 py-3.5 text-center min-w-[160px]">ICT / Digital Learning</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                                {FACULTY_DATA.welfare.records.map((rec, idx) => (
                                  <tr key={rec.year || idx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-3 text-center font-bold text-slate-500">{idx + 1}</td>
                                    <td className="px-4 py-3 font-extrabold text-[#002147] whitespace-nowrap">
                                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200/80 font-bold">
                                        {rec.year}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.welfareDoc, `Welfare Measures - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.leaveDoc, `Leave & Professional Development Support - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.financialDoc, `Financial Assistance - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.researchDoc, `Research Support - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.ictDoc, `ICT & Digital Learning Support - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION K: EVENT PHOTO & VIDEO GALLERY */}
                    {currentTab === "faculty-gallery" && (
                      <div className="flex flex-col gap-6">
                        <div
                          className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          {/* Top Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3.5">
                              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 shrink-0">
                                <Camera className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  Faculty &amp; Staff Event Gallery
                                </h4>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                  Visual albums of institutional events, faculty development programmes, seminars, workshops, and celebrations.
                                </p>
                              </div>
                            </div>
                            <span className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-[#002147] text-xs font-black shrink-0 self-start sm:self-auto">
                              {eventAlbums.length} Event Album{eventAlbums.length !== 1 ? "s" : ""}
                            </span>
                          </div>

                          {/* IF AN ALBUM IS CURRENTLY SELECTED */}
                          {selectedEventAlbum ? (
                            <div className="space-y-6 animate-fadeIn">
                              {/* Navigation back bar */}
                              <div className="flex items-center justify-between">
                                <button
                                  type="button"
                                  onClick={() => setSelectedEventAlbum(null)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#002147] hover:text-white text-slate-700 text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                  <span>Back to All Events</span>
                                </button>
                                <span className="text-xs font-bold text-slate-400">
                                  {selectedEventAlbum.media?.length || 0} media file{(selectedEventAlbum.media?.length || 0) !== 1 ? "s" : ""} in this album
                                </span>
                              </div>

                              {/* Album Header Banner */}
                              <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white p-6 sm:p-7 rounded-2xl shadow-md space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-3 py-0.5 rounded-md bg-amber-400 text-[#002147] text-[11px] font-black uppercase tracking-wider">
                                    {selectedEventAlbum.year}
                                  </span>
                                  {selectedEventAlbum.category && (
                                    <span className="px-3 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold">
                                      {selectedEventAlbum.category}
                                    </span>
                                  )}
                                  <span className="text-xs text-blue-200 font-medium ml-auto">
                                    📅 {selectedEventAlbum.date}
                                  </span>
                                </div>
                                <h3 className="font-outfit font-black text-xl sm:text-2xl leading-snug text-white">
                                  {selectedEventAlbum.title}
                                </h3>
                                {selectedEventAlbum.description && (
                                  <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed max-w-4xl">
                                    {selectedEventAlbum.description}
                                  </p>
                                )}
                              </div>

                              {/* Media Filter Tabs for this Album */}
                              <div className="flex items-center justify-between gap-4 pt-1 border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                                  <button
                                    onClick={() => setAlbumMediaFilter("all")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      albumMediaFilter === "all"
                                        ? "bg-[#002147] text-white shadow-sm font-extrabold"
                                        : "text-slate-600 hover:text-slate-900"
                                    }`}
                                  >
                                    All ({selectedEventAlbum.media?.length || 0})
                                  </button>
                                  <button
                                    onClick={() => setAlbumMediaFilter("photo")}
                                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      albumMediaFilter === "photo"
                                        ? "bg-[#002147] text-white shadow-sm font-extrabold"
                                        : "text-slate-600 hover:text-slate-900"
                                    }`}
                                  >
                                    <ImageIcon className="w-3.5 h-3.5" />
                                    <span>Photos ({(selectedEventAlbum.media || []).filter((m) => m.mediaType === "photo").length})</span>
                                  </button>
                                  <button
                                    onClick={() => setAlbumMediaFilter("video")}
                                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      albumMediaFilter === "video"
                                        ? "bg-[#002147] text-white shadow-sm font-extrabold"
                                        : "text-slate-600 hover:text-slate-900"
                                    }`}
                                  >
                                    <Play className="w-3.5 h-3.5" />
                                    <span>Videos ({(selectedEventAlbum.media || []).filter((m) => m.mediaType === "video").length})</span>
                                  </button>
                                </div>
                              </div>

                              {/* Album Media Grid */}
                              {currentAlbumFilteredMedia.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                  {currentAlbumFilteredMedia.map((m, idx) => {
                                    const isVideo = m.mediaType === "video";
                                    return (
                                      <div
                                        key={m.id || idx}
                                        className="group bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col"
                                      >
                                        <div
                                          onClick={() => {
                                            if (isVideo) {
                                              setActiveVideoModal({ url: m.url, title: selectedEventAlbum.title, caption: m.caption });
                                            } else {
                                              const pIdx = currentAlbumPhotos.findIndex((p) => p.id === m.id);
                                              setGalleryLightboxIndex(pIdx >= 0 ? pIdx : 0);
                                            }
                                          }}
                                          className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer flex items-center justify-center group"
                                        >
                                          {isVideo ? (
                                            <>
                                              <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
                                                <img
                                                  src={m.thumbnailUrl || "/images/college_crest_gold.png"}
                                                  alt={m.caption || selectedEventAlbum.title}
                                                  onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/images/college_crest_gold.png";
                                                  }}
                                                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                                                />
                                              </div>
                                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                                <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                                  <Play className="w-6 h-6 ml-0.5 fill-current" />
                                                </div>
                                              </div>
                                              <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-bold flex items-center gap-1">
                                                <Play className="w-2.5 h-2.5 fill-current" /> Video
                                              </span>
                                            </>
                                          ) : (
                                            <>
                                              <img
                                                src={m.url}
                                                alt={m.caption || selectedEventAlbum.title}
                                                onError={(e) => {
                                                  (e.target as HTMLImageElement).src = "/images/college_crest_gold.png";
                                                }}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                              />
                                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <div className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md">
                                                  <Eye className="w-5 h-5" />
                                                </div>
                                              </div>
                                              <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-bold flex items-center gap-1">
                                                <ImageIcon className="w-2.5 h-2.5" /> Photo
                                              </span>
                                            </>
                                          )}
                                        </div>

                                        {m.caption && (
                                          <div className="p-3.5 bg-white border-t border-slate-100">
                                            <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                                              {m.caption}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                                  <p className="text-xs text-slate-500 font-bold">No media items match the selected filter.</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            /* SHOWCASE LIST OF EVENT ALBUMS */
                            <div className="space-y-6">
                              {/* Filter Bar: Year & Search */}
                              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-1">
                                {/* Academic Year Filter Pills */}
                                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                                  <button
                                    onClick={() => setGalleryYearFilter("all")}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                      galleryYearFilter === "all"
                                        ? "bg-[#002147] text-white shadow"
                                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                    }`}
                                  >
                                    All Academic Years
                                  </button>
                                  {galleryAvailableYears.map((yr) => (
                                    <button
                                      key={yr}
                                      onClick={() => setGalleryYearFilter(yr)}
                                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                        galleryYearFilter === yr
                                          ? "bg-[#002147] text-white shadow"
                                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                      }`}
                                    >
                                      {yr}
                                    </button>
                                  ))}
                                </div>

                                {/* Event Search Bar */}
                                <div className="relative w-full md:w-64 shrink-0">
                                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                  <input
                                    type="text"
                                    value={eventSearchQuery}
                                    onChange={(e) => setEventSearchQuery(e.target.value)}
                                    placeholder="Search event name..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                                  />
                                </div>
                              </div>

                              {/* Event Album Cards Grid */}
                              {filteredEventAlbums.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                  {filteredEventAlbums.map((alb) => {
                                    const photoCount = (alb.media || []).filter((m) => m.mediaType === "photo").length;
                                    const videoCount = (alb.media || []).filter((m) => m.mediaType === "video").length;
                                    const coverUrl =
                                      alb.coverImage ||
                                      (alb.media && alb.media.length > 0 ? alb.media[0].url : "/images/college_crest_gold.png");

                                    return (
                                      <div
                                        key={alb.id || alb._id}
                                        onClick={() => setSelectedEventAlbum(alb)}
                                        className="group bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:border-[#002147] hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                                      >
                                        {/* Cover Image */}
                                        <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                                          <img
                                            src={coverUrl}
                                            alt={alb.title}
                                            onError={(e) => {
                                              (e.target as HTMLImageElement).src = "/images/college_crest_gold.png";
                                            }}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                          {/* Year Badge */}
                                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#002147]/90 text-amber-300 text-[10px] font-black border border-white/10 shadow-sm">
                                            {alb.year}
                                          </span>

                                          {/* Media Counter Pill */}
                                          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white text-[10px] font-extrabold flex items-center gap-1.5">
                                            <Camera className="w-3 h-3 text-amber-400" />
                                            {photoCount} {photoCount === 1 ? "Photo" : "Photos"}
                                            {videoCount > 0 && ` • ${videoCount} Vid`}
                                          </span>

                                          {/* Date on cover */}
                                          <span className="absolute bottom-2.5 left-3 text-[11px] font-bold text-slate-200">
                                            📅 {alb.date}
                                          </span>
                                        </div>

                                        {/* Content Box */}
                                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                                          <div>
                                            {alb.category && (
                                              <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black uppercase mb-2">
                                                {alb.category}
                                              </span>
                                            )}
                                            <h5 className="font-outfit font-black text-[#002147] text-base leading-snug group-hover:text-blue-600 transition-colors">
                                              {alb.title}
                                            </h5>
                                            {alb.description && (
                                              <p className="text-slate-600 text-xs font-medium mt-2 leading-relaxed line-clamp-2">
                                                {alb.description}
                                              </p>
                                            )}
                                          </div>

                                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-700 group-hover:text-blue-900">
                                            <span>Explore Event Photos &amp; Videos</span>
                                            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="p-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-3">
                                  <Camera className="w-10 h-10 text-slate-300 mx-auto" />
                                  <h5 className="font-outfit font-black text-slate-700 text-base">No Event Albums Found</h5>
                                  <p className="text-xs text-slate-500 font-medium">Try changing your academic year or search query.</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                </section>

              </div>
            </main>

          </div>
        </div>

      </div>

      {/* FDP ARCHIVE MODAL POPUP */}
      {fdpArchiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between border-b border-[#003366]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-amber-300">
                  <Archive className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg sm:text-xl">
                    FDP Annual Reports &amp; Yearly Archives
                  </h3>
                  <p className="text-xs text-blue-200 font-medium">
                    Comprehensive annual reports, training logs, and pedagogical development records
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFdpArchiveModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="bg-slate-100/80 p-4 border-b border-slate-200 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fdpArchiveSearchQuery}
                  onChange={(e) => setFdpArchiveSearchQuery(e.target.value)}
                  placeholder="Filter by academic year (e.g. 2023–2024) or keywords..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                />
                {fdpArchiveSearchQuery && (
                  <button
                    onClick={() => setFdpArchiveSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <span className="text-xs font-bold text-slate-500 shrink-0">
                {filteredFdpArchiveReports.length} of {allFdpReports.length} Records
              </span>
            </div>

            {/* Modal Body / Report List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {filteredFdpArchiveReports.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-semibold space-y-2">
                  <Archive className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-sm text-slate-600 font-bold">No annual reports matched your filter.</p>
                  <button
                    onClick={() => setFdpArchiveSearchQuery("")}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredFdpArchiveReports.map((report) => (
                    <div
                      key={report.year}
                      className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Academic Year {report.year}
                          </span>
                        </div>
                        <h5 className="font-outfit font-bold text-[#002147] text-base leading-snug mt-2.5">
                          {report.title}
                        </h5>
                        <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">
                          {report.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            setFdpArchiveModalOpen(false);
                            handleOpenPdf(report.fileUrl, report.title);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow-sm transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Report PDF
                        </button>
                        <a
                          href={report.fileUrl}
                          download
                          className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-all shrink-0 shadow-sm"
                          title="Download PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                St. Ann&apos;s College for Women — Academic &amp; Administrative Documentation
              </span>
              <button
                onClick={() => setFdpArchiveModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-all active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FACULTY / STAFF PROFILE MODAL (IMAGE 1 HEADER + IMAGE 2 CONTENT) */}
      {profileModalOpen && selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-scaleUp">
            
            {/* Top Image 1 College Header Banner */}
            <div className="relative bg-[#002147] text-white px-6 py-5 sm:px-8 sm:py-6 text-center shadow-md">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="absolute right-4 top-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
                title="Close Profile"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="font-outfit font-black text-lg sm:text-2xl md:text-3xl tracking-tight text-white uppercase">
                ST. ANN&apos;S COLLEGE FOR WOMEN
              </h2>
              <p className="text-blue-100 text-[11px] sm:text-xs md:text-sm font-medium mt-1">
                Run by The Society of St. Anne, Guntur | Affiliated to Acharya Nagarjuna University
              </p>
              <p className="text-blue-200 text-[10px] sm:text-[11px] md:text-xs font-normal mt-0.5">
                Recognized under Section 2(f) of UGC Act 1956 | NAAC Accredited &apos;A&apos; Grade | AISHE: C-39493
              </p>
              <p className="text-amber-300 text-[10px] sm:text-[11px] md:text-xs font-semibold mt-0.5">
                Gorantla, Guntur - 522034, Andhra Pradesh, India
              </p>
            </div>

            {/* Gold Accent Stripe */}
            <div className="h-1.5 w-full bg-amber-500 shrink-0" />

            {/* Modal Scrollable Body (Image 2 Content) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 bg-white font-sans text-slate-900 space-y-6">
              
              {/* Sub-Title */}
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900">
                  Faculty Profile
                </h3>
              </div>

              {/* Image 2 Top Framed Card */}
              <div className="border-2 border-slate-900 p-5 sm:p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white">
                {/* Left Info */}
                <div className="flex-1 space-y-1.5 text-left">
                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-slate-900 leading-tight">
                    {selectedProfile.name}
                  </h3>
                  <p className="font-bold text-slate-800 text-sm sm:text-base">
                    {selectedProfile.designation}
                  </p>
                  <p className="font-bold text-slate-800 text-sm sm:text-base">
                    Department of {selectedProfile.department?.replace(/^\d+\.\s*/, "") || "Academic Department"}
                  </p>
                  <p className="font-bold text-slate-800 text-xs sm:text-sm pt-1">
                    Qualifications: <span className="font-normal">{selectedProfile.qualification || "Postgraduate / Doctoral"}</span>
                  </p>
                </div>

                {/* Right: Photo Frame & Employee ID */}
                <div className="flex flex-col items-center shrink-0 self-center sm:self-auto">
                  <div className="w-28 h-36 sm:w-32 sm:h-40 border-2 border-slate-900 bg-white flex items-center justify-center overflow-hidden p-1">
                    {selectedProfile.imageUrl ? (
                      <img
                        src={selectedProfile.imageUrl}
                        alt={selectedProfile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="/images/Crest_Logo.png"
                        alt="St. Ann's College Crest"
                        className="w-full h-full object-contain p-2"
                      />
                    )}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-slate-900 text-center">
                    Employee ID: {selectedProfile.employeeId || "SACW-REGISTERED"}
                  </p>
                </div>
              </div>

              {/* Section 1: Faculty Details (Red Heading) */}
              <div className="pt-2">
                <h4 className="text-red-600 font-bold text-base sm:text-lg mb-3">
                  Faculty Details
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-900 font-medium pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold">•</span>
                    <div>
                      <strong>Employment Classification:</strong> {selectedProfile.employmentClassification || "Full-Time Teaching Faculty"}
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold">•</span>
                    <div>
                      <strong>Date of Joining:</strong> {selectedProfile.dateOfJoining || "—"}
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold">•</span>
                    <div>
                      <strong>FRS ID:</strong> {selectedProfile.frsId || ""}
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold">•</span>
                    <div>
                      <strong>AICTE ID:</strong> {selectedProfile.aicteId || ""}
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-900 font-bold">•</span>
                    <div>
                      <strong>Total Teaching / Professional Experience:</strong> {selectedProfile.experience ? `${selectedProfile.experience} ${!selectedProfile.experience.toString().includes("Yr") && !selectedProfile.experience.toString().includes("Year") && selectedProfile.experience !== "—" ? "Years" : ""}` : "—"}
                    </div>
                  </li>
                </ul>
              </div>

              {/* Section 2: Institutional Responsibilities */}
              <div className="pt-2 border-t border-slate-200">
                <h4 className="font-bold text-base sm:text-lg text-slate-900 mb-1">
                  Institutional Responsibilities
                </h4>
                <p className="text-red-600 font-bold text-sm sm:text-base mb-3">
                  {selectedProfile.institutionalRole || (selectedProfile.designation?.includes("Principal") ? "Principal, St. Ann's College for Women" : selectedProfile.designation?.includes("HOD") ? `Head of the Department, ${selectedProfile.department}` : "")}
                </p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mb-2">
                  Convener / Coordinator of Committees &amp; Cells
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium pl-2">
                  {selectedProfile.committeeRoles && selectedProfile.committeeRoles.length > 0 ? (
                    selectedProfile.committeeRoles.map((role: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-900 font-bold">•</span>
                        <span className="border-b border-slate-300 pb-0.5 flex-1">{role}</span>
                      </li>
                    ))
                  ) : (
                    [1, 2, 3, 4].map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-900 font-bold">•</span>
                        <span className="border-b border-slate-300 pb-0.5 flex-1 min-h-[1.25rem] inline-block" />
                      </li>
                    ))
                  )}
                </ul>
              </div>

            </div>

            {/* Modal Footer with Actions */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-500">
                Official Academic Record — St. Ann&apos;s College for Women
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleOpenPdf(selectedProfile.pdfUrl || DEFAULT_PDF, `${selectedProfile.name} - Faculty Profile`);
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow transition-all active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open Official Profile PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PHOTO LIGHTBOX MODAL */}
      {galleryLightboxIndex !== null && currentAlbumPhotos[galleryLightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-fadeIn select-none">
          <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center">
            {/* Top Bar with Counter & Close */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-2">
              <span className="text-xs sm:text-sm font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                Photo {galleryLightboxIndex + 1} of {currentAlbumPhotos.length}
              </span>
              <button
                onClick={() => setGalleryLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Display Container with Navigation Controls */}
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/10">
              <img
                src={currentAlbumPhotos[galleryLightboxIndex].url}
                alt={currentAlbumPhotos[galleryLightboxIndex].caption || selectedEventAlbum?.title || "Event Photo"}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/college_crest_gold.png";
                }}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Prev Button */}
              {galleryLightboxIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryLightboxIndex(galleryLightboxIndex - 1);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all shadow-xl active:scale-95 cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {galleryLightboxIndex < currentAlbumPhotos.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryLightboxIndex(galleryLightboxIndex + 1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all shadow-xl active:scale-95 cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Photo Info Banner Below */}
            <div className="w-full mt-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-900 text-[10px] font-black uppercase">
                    {selectedEventAlbum?.year || "Event"}
                  </span>
                  <h4 className="font-outfit font-extrabold text-base sm:text-lg">
                    {selectedEventAlbum?.title || "Event Gallery"}
                  </h4>
                </div>
                {currentAlbumPhotos[galleryLightboxIndex].caption && (
                  <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1">
                    {currentAlbumPhotos[galleryLightboxIndex].caption}
                  </p>
                )}
              </div>
              {selectedEventAlbum?.date && (
                <span className="text-xs font-semibold text-slate-300 shrink-0">
                  📅 {selectedEventAlbum.date}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-scaleUp flex flex-col">
            {/* Video Header */}
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between border-b border-blue-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-600 text-white">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-base sm:text-lg">
                    {activeVideoModal.title}
                  </h3>
                  {activeVideoModal.caption && (
                    <p className="text-xs text-blue-200 font-medium line-clamp-1">
                      {activeVideoModal.caption}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                title="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {activeVideoModal.url.includes("youtube") || activeVideoModal.url.includes("youtu.be") ? (
                <iframe
                  src={getEmbedUrl(activeVideoModal.url)}
                  title={activeVideoModal.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideoModal.url}
                  controls
                  autoPlay
                  className="w-full h-full max-h-[70vh] object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Video Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                St. Ann&apos;s College for Women — Faculty Media Archives
              </span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all active:scale-95"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp bg-[#002147] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-blue-400/40 flex items-center gap-3.5 max-w-md">
          <div className="p-1.5 rounded-xl bg-amber-400/20 text-amber-300 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-100 flex-1 leading-snug">
            {toastMessage}
          </p>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* PDF PREVIEW MODAL */}
      <FilePreviewModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        fileUrl={currentPdfUrl}
        title={currentPdfTitle}
      />
    </div>
  );
}
