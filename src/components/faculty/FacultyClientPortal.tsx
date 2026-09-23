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
  X
} from "lucide-react";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { getCleanPdfUrl } from "@/lib/pdf-viewer";
import {
  FACULTY_DATA,
  FacultyMember,
  NonTeachingMember,
  DepartmentItem
} from "@/components/faculty/staticData";

const DEFAULT_PDF = "/documents/DefaultFile_1.pdf";

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
      { text: "2. Technical & Laboratory Staff", id: "technical-staff" },
      { text: "3. Support Staff", id: "support-staff" },
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
    title: "F. Faculty Development & Professional Empowerment (FDP)",
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
  }
];

function normalizeKey(str: string) {
  return (str || "")
    .toLowerCase()
    .replace(/^(dr|mr|mrs|ms|miss|prof|sr)\.?\s+/gi, "")
    .replace(/[^a-z0-9]/g, "");
}

interface FacultyClientPortalProps {
  initialMembers?: any[];
  initialSections?: any[];
  activeSlug?: string;
  profileSlugMap?: Record<string, string>;
  profilePhotoMap?: Record<string, string>;
  profilePdfMap?: Record<string, string>;
  initialPdfDocuments?: any[];
}

export default function FacultyClientPortal({
  initialMembers = [],
  initialSections = [],
  activeSlug = "teaching-staff",
  profileSlugMap = {},
  profilePhotoMap = {},
  profilePdfMap = {},
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
  const [activeNonTeachingTab, setActiveNonTeachingTab] = useState<"administrative" | "technical" | "support">("administrative");
  const [selectedDeptCard, setSelectedDeptCard] = useState<string>(
    FACULTY_DATA.departments[0]?.name || "1. DEPARTMENT OF COMMERCE"
  );

  // PDF Preview Modal state
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [currentPdfTitle, setCurrentPdfTitle] = useState("");

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

  // Memoized FDP Annual Reports (all, latest 3, and filtered for archive popup)
  const allFdpReports = useMemo(() => {
    return FACULTY_DATA.professionalDevelopment.annualReports || [];
  }, []);

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

  // Compute teaching members list with dynamic photo, profile slug & PDF lookup
  const teachingStaff = useMemo(() => {
    const rawList = FACULTY_DATA.teachingFaculty || [];
    return rawList.map((member) => {
      const normName = normalizeKey(member.name);
      
      // Look up slug
      let slug = member.slug || "";
      for (const [key, val] of Object.entries(profileSlugMap)) {
        if (normalizeKey(key) === normName || normName.includes(normalizeKey(key)) || normalizeKey(key).includes(normName)) {
          slug = val;
          break;
        }
      }

      // Look up photo
      let photo = member.imageUrl || "";
      for (const [key, val] of Object.entries(profilePhotoMap)) {
        if (normalizeKey(key) === normName || normName.includes(normalizeKey(key)) || normalizeKey(key).includes(normName)) {
          photo = val;
          break;
        }
      }

      // Look up PDF
      let pdf = (member as any).pdfUrl || "";
      for (const [key, val] of Object.entries(profilePdfMap)) {
        if (normalizeKey(key) === normName || normName.includes(normalizeKey(key)) || normalizeKey(key).includes(normName)) {
          pdf = val;
          break;
        }
      }

      // Auto-created dynamic PDF endpoint with available data
      const memberSlug = slug || (member as any).slug || (member as any).employeeId || normName;
      const params = new URLSearchParams({
        name: member.name || "",
        designation: member.designation || "",
        department: member.department || "",
        qualification: member.qualification || "",
        doj: member.dateOfJoining || "",
        exp: member.experience || "",
        empId: member.employeeId || "",
        photo: photo || member.imageUrl || "",
      });
      const dynamicPdfUrl = `/api/faculty-pdf/${encodeURIComponent(memberSlug)}.pdf?${params.toString()}`;
      const finalPdfUrl = pdf && pdf.startsWith("http") ? pdf : dynamicPdfUrl;

      return {
        ...member,
        profileSlug: slug || undefined,
        imageUrl: photo || undefined,
        pdfUrl: finalPdfUrl
      };
    });
  }, [profileSlugMap, profilePhotoMap, profilePdfMap]);

  // Map of faculty by name for quick department lookups
  const facultyByNameMap = useMemo(() => {
    const map = new Map<string, typeof teachingStaff[0]>();
    teachingStaff.forEach((m) => {
      map.set(normalizeKey(m.name), m);
    });
    return map;
  }, [teachingStaff]);

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
                              <tr className="bg-[#002147] text-white font-outfit text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                                <th className="px-2.5 py-3 text-center w-[5%]">S.No.</th>
                                <th className="px-2.5 py-3 text-center w-[11%]">Employee ID</th>
                                <th className="px-3 py-3 w-[23%]">Name of the Employee</th>
                                <th className="px-2.5 py-3 w-[18%]">Designation</th>
                                <th className="px-2.5 py-3 w-[14%]">Department</th>
                                <th className="px-2.5 py-3 w-[14%]">Qualification</th>
                                <th className="px-2.5 py-3 text-center w-[9%]">Date of Joining</th>
                                <th className="px-2 py-3 text-center w-[6%]">Experience</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs sm:text-[12px]">
                              {filteredTeachingStaff.length > 0 ? (
                                filteredTeachingStaff.map((m) => {
                                  const isLeadership =
                                    m.designation.includes("Principal") ||
                                    m.designation.includes("Vice-Principal");
                                  const isHod = m.designation.includes("HOD");

                                  return (
                                    <tr
                                      key={m.sNo}
                                      className="hover:bg-slate-50/80 transition-colors group"
                                    >
                                      <td className="px-2.5 py-2.5 text-center font-bold text-[#002147] bg-slate-50/40">
                                        {m.sNo}
                                      </td>
                                      <td className="px-2.5 py-2.5 text-center font-mono font-bold text-slate-600 bg-slate-50/20 text-[11px]">
                                        {m.employeeId || "—"}
                                      </td>
                                      <td className="px-3 py-2.5 font-extrabold text-slate-800">
                                        <button
                                          type="button"
                                          onClick={() => handleOpenPdf(m.pdfUrl || DEFAULT_PDF, `${m.name} - Faculty Profile`)}
                                          className="text-[#002147] hover:text-blue-700 hover:underline inline-flex items-center gap-1.5 font-black text-left cursor-pointer transition-colors group/btn"
                                          title={`View PDF profile for ${m.name}`}
                                        >
                                          <span>{m.name}</span>
                                          <FileText className="w-3.5 h-3.5 text-blue-600 opacity-70 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all shrink-0" />
                                        </button>
                                      </td>
                                      <td className="px-2.5 py-2.5 font-semibold text-slate-700">
                                        <div className="flex flex-wrap items-center gap-1">
                                          <span>{m.designation}</span>
                                          {isLeadership && (
                                            <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase bg-rose-50 text-rose-700 border border-rose-200">
                                              Leadership
                                            </span>
                                          )}
                                          {isHod && (
                                            <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase bg-amber-50 text-amber-700 border border-amber-200">
                                              HOD
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                      <td className="px-2.5 py-2.5 font-bold text-[#002147]">
                                        {m.department || "—"}
                                      </td>
                                      <td className="px-2.5 py-2.5 font-medium text-slate-600 text-[11px]">
                                        {m.qualification || "—"}
                                      </td>
                                      <td className="px-2.5 py-2.5 text-center font-medium text-slate-600 text-[11px]">
                                        {m.dateOfJoining}
                                      </td>
                                      <td className="px-2 py-2.5 text-center font-extrabold text-[#002147]">
                                        {m.experience} {m.experience && !m.experience.includes("Yr") && !m.experience.includes("—") ? "Yrs" : ""}
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan={8} className="py-12 text-center text-slate-400 font-semibold text-sm">
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
                                  {dept.facultyNames.map((facultyName, mIdx) => {
                                    const normName = normalizeKey(facultyName);
                                    const member = facultyByNameMap.get(normName) || {
                                      sNo: mIdx + 1,
                                      name: facultyName,
                                      designation: "Faculty Member",
                                      department: dept.name.replace(/^\d+\.\s*/, ""),
                                      qualification: "Postgraduate / Doctoral",
                                      dateOfJoining: "—",
                                      experience: "—",
                                      employeeId: "—",
                                      profileSlug: undefined,
                                      imageUrl: undefined,
                                      pdfUrl: `/api/faculty-pdf/${encodeURIComponent(normName)}.pdf?name=${encodeURIComponent(facultyName)}&department=${encodeURIComponent(dept.name.replace(/^\d+\.\s*/, ""))}&designation=Faculty+Member`
                                    };

                                    const isLeadership =
                                      member.designation.includes("Principal") ||
                                      member.designation.includes("Vice-Principal");
                                    const isHod = member.designation.includes("HOD");

                                    return (
                                      <div
                                        key={member.employeeId || mIdx}
                                        className="bg-slate-50/60 border border-slate-200/90 hover:border-indigo-300 hover:shadow-md rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 transition-all duration-300"
                                      >
                                        {/* Left: Faculty Details */}
                                        <div className="flex-1 flex flex-col justify-center text-left w-full">
                                          <div className="flex flex-wrap items-center gap-2 mb-2">
                                            {isLeadership && (
                                              <span className="bg-rose-50 text-rose-600 border border-rose-200 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                                                Leadership
                                              </span>
                                            )}
                                            {isHod && (
                                              <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase">
                                                Head of Department
                                              </span>
                                            )}
                                            {member.employeeId && member.employeeId !== "—" && (
                                              <span className="bg-[#002147]/5 text-[#002147] border border-[#002147]/10 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                                Emp ID: {member.employeeId}
                                              </span>
                                            )}
                                          </div>

                                          <h4 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] mb-3 leading-snug">
                                            <button
                                              type="button"
                                              onClick={() => handleOpenPdf(member.pdfUrl || DEFAULT_PDF, `${member.name} - Faculty Profile`)}
                                              className="text-[#002147] hover:text-blue-700 hover:underline inline-flex items-center gap-2 text-left cursor-pointer transition-colors"
                                              title={`View PDF profile for ${member.name}`}
                                            >
                                              <span>{member.name}</span>
                                              <FileText className="w-4 h-4 text-blue-600 opacity-70 shrink-0" />
                                            </button>
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
                                            </p>
                                            <p>
                                              <span className="font-bold text-slate-800">Teaching Experience:</span>{" "}
                                              {member.experience} Years
                                            </p>
                                          </div>
                                        </div>

                                        {/* Right: Framed Passport Photo */}
                                        <div className="flex flex-col items-center justify-center shrink-0">
                                          <div className="relative p-1.5 bg-white border-2 border-slate-200/80 rounded-2xl shadow-inner w-32 h-40 sm:w-36 sm:h-44 overflow-hidden flex items-center justify-center group/img">
                                            {member.imageUrl ? (
                                              <img
                                                src={member.imageUrl}
                                                alt={member.name}
                                                className="w-full h-full object-cover rounded-xl group-hover/img:scale-105 transition-transform duration-300"
                                              />
                                            ) : (
                                              <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#002147]/10 to-indigo-50 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                                                <Users className="w-10 h-10 text-[#002147]/40 mb-1" />
                                                <span className="text-[10px] font-bold text-slate-500">
                                                  St. Ann's Faculty
                                                </span>
                                              </div>
                                            )}
                                          </div>
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
                            Technical &amp; Lab Staff ({FACULTY_DATA.nonTeachingStaff.technical.length})
                          </button>
                          <button
                            onClick={() => setActiveNonTeachingTab("support")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                              activeNonTeachingTab === "support"
                                ? "bg-[#002147] text-white shadow"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            Support Staff ({FACULTY_DATA.nonTeachingStaff.support.length})
                          </button>
                        </div>

                        {/* Non-Teaching Table */}
                        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-inner">
                          <table className="w-full border-collapse text-left font-sans min-w-[700px]">
                            <thead>
                              <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                <th className="px-3 py-3.5 text-center w-12">S.No</th>
                                <th className="px-3 py-3.5 min-w-[180px]">Staff Name</th>
                                <th className="px-3 py-3.5 min-w-[160px]">Designation</th>
                                <th className="px-3 py-3.5 min-w-[140px]">Qualification</th>
                                <th className="px-3 py-3.5 text-center min-w-[100px]">Joined On</th>
                                <th className="px-3 py-3.5 text-center w-24">Exp (Yrs)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
                              {FACULTY_DATA.nonTeachingStaff[activeNonTeachingTab].map((m: any) => (
                                <tr key={m.sNo} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-3 py-3 text-center font-bold text-[#002147] bg-slate-50/40">
                                    {m.sNo}
                                  </td>
                                  <td className="px-3 py-3 font-extrabold text-slate-800">{m.name}</td>
                                  <td className="px-3 py-3 font-semibold text-slate-700">{m.designation}</td>
                                  <td className="px-3 py-3 font-medium text-slate-600 text-[12px]">{m.qualification || "—"}</td>
                                  <td className="px-3 py-3 text-center font-medium text-slate-600 whitespace-nowrap text-[12px]">
                                    {m.dateOfJoining || "—"}
                                  </td>
                                  <td className="px-3 py-3 text-center font-extrabold text-[#002147]">{m.experience || "—"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* SECTION D: VISITING & ADJUNCT FACULTY */}
                    {currentTab === "visiting-professors" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            Visiting Professors, Scholars &amp; Industry Experts
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.visitingFaculty.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {FACULTY_DATA.visitingFaculty.pillars.map((pillar, idx) => (
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
                                {FACULTY_DATA.recruitment.hrPolicyDoc.title}
                              </h5>
                              <p className="text-slate-600 text-xs font-medium mt-0.5">
                                {FACULTY_DATA.recruitment.hrPolicyDoc.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                            <button
                              onClick={() =>
                                handleOpenPdf(
                                  FACULTY_DATA.recruitment.hrPolicyDoc.fileUrl,
                                  "Human Resource Policy - St. Ann's College for Women"
                                )
                              }
                              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow transition-all active:scale-95"
                            >
                              <Eye className="w-4 h-4" />
                              Preview Policy
                            </button>
                            <a
                              href={FACULTY_DATA.recruitment.hrPolicyDoc.fileUrl}
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
                            Faculty Development &amp; Professional Empowerment
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.professionalDevelopment.description}
                          </p>
                        </div>

                        {/* Core Initiatives List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {FACULTY_DATA.professionalDevelopment.initiatives.map((item, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="text-xs sm:text-sm font-bold text-slate-700">{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* FDP Annual Reports Header & Action */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                          <div>
                            <span className="text-xs font-black uppercase text-indigo-900 tracking-wider">
                              Annual Reports &amp; Documentation (Latest {latestFdpReports.length})
                            </span>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Review recent academic annual reports. Access older yearly records in the full archive popup.
                            </p>
                          </div>
                          {allFdpReports.length > 3 && (
                            <button
                              onClick={() => {
                                setFdpArchiveSearchQuery("");
                                setFdpArchiveModalOpen(true);
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0"
                            >
                              <Archive className="w-4 h-4 text-indigo-600" />
                              View All Yearly Archives ({allFdpReports.length})
                            </button>
                          )}
                        </div>

                        {/* FDP Annual Reports Cards (Latest 3) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {latestFdpReports.map((report) => (
                            <div
                              key={report.year}
                              className="bg-white border-2 border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group"
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

                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                <button
                                  onClick={() => handleOpenPdf(report.fileUrl, report.title)}
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow-sm transition-all"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  View Report PDF
                                </button>
                                <a
                                  href={report.fileUrl}
                                  download
                                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all shrink-0"
                                  title="Download PDF"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Banner for Archives if > 3 */}
                        {allFdpReports.length > 3 && (
                          <div className="p-4 bg-gradient-to-r from-indigo-50/80 via-blue-50/60 to-indigo-50/80 border border-indigo-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-[#002147] text-amber-300 shrink-0 shadow-sm">
                                <Archive className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                                  Historical FDP Annual Reports Archive
                                </p>
                                <p className="text-xs text-slate-600 font-medium">
                                  Showing {latestFdpReports.length} latest academic years above. Access all {allFdpReports.length} previous annual reports in the archive repository.
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setFdpArchiveSearchQuery("");
                                setFdpArchiveModalOpen(true);
                              }}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
                            >
                              <Archive className="w-4 h-4 text-amber-300" />
                              View All Archives ({allFdpReports.length})
                            </button>
                          </div>
                        )}

                        {/* Certificates Document Card */}
                        <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow">
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-outfit font-black text-amber-950 text-base">
                                {FACULTY_DATA.professionalDevelopment.certificatesDoc.title}
                              </h5>
                              <p className="text-amber-900 text-xs font-medium mt-0.5">
                                {FACULTY_DATA.professionalDevelopment.certificatesDoc.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                            <button
                              onClick={() =>
                                handleOpenPdf(
                                  FACULTY_DATA.professionalDevelopment.certificatesDoc.fileUrl,
                                  "2024-2025 FDPs & Seminars Certificates"
                                )
                              }
                              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold shadow transition-all active:scale-95"
                            >
                              <Eye className="w-4 h-4" />
                              Preview Certificates PDF
                            </button>
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
                            Faculty Achievements &amp; Recognition
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.achievements.description}
                          </p>
                        </div>

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

                        {/* Year-wise Table */}
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-slate-100 pb-2">
                            <h5 className="font-outfit font-extrabold text-[#002147] text-base">
                              Year-wise Faculty Research &amp; Academic Contributions
                            </h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Annual repository of research publications, patents, book chapters, and academic contributions.
                            </p>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full border-collapse text-left text-xs font-sans">
                              <thead>
                                <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                  <th className="px-4 py-3.5 text-center w-16">S.No.</th>
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
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.patentsDoc, `Patents & Innovations - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.booksDoc, `Books & Chapters - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.academicDoc, `Academic Contributions - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
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
                            Academic Mobility &amp; Faculty Exchange
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.mobility.description}
                          </p>
                        </div>

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

                        {/* Year-wise Table */}
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-slate-100 pb-2">
                            <h5 className="font-outfit font-extrabold text-[#002147] text-base">
                              Year-wise Record of Faculty Exchange &amp; Academic Mobility
                            </h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Historical logs of faculty exchanges, study visits, invited guest talks, and inter-institutional initiatives.
                            </p>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full border-collapse text-left text-xs font-sans">
                              <thead>
                                <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                  <th className="px-4 py-3.5 text-center w-16">S.No.</th>
                                  <th className="px-4 py-3.5 min-w-[140px]">Academic Year</th>
                                  <th className="px-4 py-3.5 text-center min-w-[150px]">Faculty Exchange</th>
                                  <th className="px-4 py-3.5 text-center min-w-[140px]">Academic Visits</th>
                                  <th className="px-4 py-3.5 text-center min-w-[140px]">Guest Lectures</th>
                                  <th className="px-4 py-3.5 text-center min-w-[180px]">Collaborative Activities</th>
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
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.visitsDoc, `Academic Visits - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.guestLecturesDoc, `Guest Lectures - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.collaborativeDoc, `Collaborative Academic Activities - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
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

                    {/* SECTION I: PERFORMANCE APPRAISAL (ASAR) */}
                    {currentTab === "performance-appraisal" && (
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            Faculty Performance Appraisal (ASAR)
                          </h4>
                          <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                            {FACULTY_DATA.appraisal.description}
                          </p>
                        </div>

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

                        {/* Year-wise Table */}
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-slate-100 pb-2">
                            <h5 className="font-outfit font-extrabold text-[#002147] text-base">
                              Year-wise Faculty Performance Appraisal Records
                            </h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Systematic annual performance appraisals, ASAR filings, API rubrics, and stakeholder feedback.
                            </p>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full border-collapse text-left text-xs font-sans">
                              <thead>
                                <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                  <th className="px-4 py-3.5 text-center w-16">S.No.</th>
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
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.annualDoc, `Annual Faculty Appraisal - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.indicatorsDoc, `Academic Performance Indicators - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.feedbackDoc, `Teaching Feedback - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.appraisal360Doc, `360-Degree Appraisal - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
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

                        {/* Year-wise Table */}
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-slate-100 pb-2">
                            <h5 className="font-outfit font-extrabold text-[#002147] text-base">
                              Year-wise Faculty Welfare &amp; Support Activities
                            </h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Statutory benefits, capacity building leave, conference travel grants, and digital learning infrastructure.
                            </p>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full border-collapse text-left text-xs font-sans">
                              <thead>
                                <tr className="bg-[#002147] text-white font-outfit text-[11px] font-black uppercase tracking-wider">
                                  <th className="px-4 py-3.5 text-center w-16">S.No.</th>
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
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.leaveDoc, `Leave & Professional Development Support - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.financialDoc, `Financial Assistance - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.researchDoc, `Research Support - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        View PDF
                                      </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => handleOpenPdf(rec.ictDoc, `ICT & Digital Learning Support - ${rec.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all shadow-xs"
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
