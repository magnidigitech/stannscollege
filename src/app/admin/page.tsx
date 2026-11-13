"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventsManager from "@/components/admin/EventsManager";
import NoticesManager from "@/components/admin/NoticesManager";
import { StrategicPlanManager } from "@/components/admin/StrategicPlanManager";
import { HeroBannersManager } from "@/components/admin/HeroBannersManager";
import { MandatoryDisclosuresManager } from "@/components/admin/MandatoryDisclosuresManager";
import { AlumniManager } from "@/components/admin/AlumniManager";
import { ResearchManager } from "@/components/admin/ResearchManager";
import { PlacementsManager } from "@/components/admin/PlacementsManager";
import { StudentSupportManager } from "@/components/admin/StudentSupportManager";
import { FacultyProfilesManager } from "@/components/admin/FacultyProfilesManager";
import { AdmissionsManager } from "@/components/admin/AdmissionsManager";
import { AcademicsManager } from "@/components/admin/AcademicsManager";
import { QualityAssuranceManager } from "@/components/admin/QualityAssuranceManager";
import QuickDrawersManager from "@/components/admin/QuickDrawersManager";
import {
  Calendar,
  Bell,
  Compass,
  FileText,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Database,
  Globe,
  Users,
  FlaskConical,
  Briefcase,
  HeartHandshake,
  GraduationCap,
  BookOpen,
  Home,
  Building,
  Layers,
  Scale,
  FolderTree,
  ClipboardList,
  Phone,
  Newspaper,
  FileSpreadsheet,
  Award
} from "lucide-react";

interface AdminUser {
  email: string;
  name: string;
  role: string;
}

interface AdminSubItem {
  id: string; // Unique sub-item key
  label: string; // Display title in sidebar
  badge?: string;
  icon: any;
  description?: string;
  component: React.ComponentType<any>;
  subTabKey?: string | number; // Sub-tab to activate in the manager component
}

interface AdminNavGroup {
  id: string;
  orderNumber: number;
  navTitle: string; // Exactly matching Top Nav Bar name
  navIcon: any;
  description?: string;
  subItems: AdminSubItem[];
}

/**
 * Hierarchical Admin Navigation Groups
 * Organised in the EXACT sequence of the live website's Top Navigation Bar
 * Clicking the main category name ONLY toggles the accordion open/closed.
 * Clicking a sub-item switches the active panel and activates the corresponding tab.
 */
const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "nav-home",
    orderNumber: 1,
    navTitle: "1. Home",
    navIcon: Home,
    description: "Homepage banners, sliders, and floating quick-access shortcut drawers",
    subItems: [
      {
        id: "home-banners",
        label: "Home Hero Banners",
        badge: "16:6 Live Slider",
        icon: ImageIcon,
        description: "Manage, reorder, preview, and upload 16:6 widescreen homepage hero banners directly synced to Sanity.",
        component: HeroBannersManager,
      },
      {
        id: "drawers-newsletters",
        label: "Newsletters (The Chronicle)",
        badge: "Monthly",
        icon: Newspaper,
        description: "Manage and upload monthly circular newsletters for the right-notch quick drawer.",
        component: QuickDrawersManager,
        subTabKey: "newsletters",
      },
      {
        id: "drawers-magazines",
        label: "College Magazines (Annite)",
        badge: "Annual",
        icon: BookOpen,
        description: "Manage and upload annual college magazines for the right-notch quick drawer.",
        component: QuickDrawersManager,
        subTabKey: "magazines",
      },
      {
        id: "drawers-handbooks",
        label: "Student Handbook (Code of Conduct)",
        badge: "Yearly",
        icon: ShieldCheck,
        description: "Manage and upload yearly student code of conduct handbooks for the right-notch drawer.",
        component: QuickDrawersManager,
        subTabKey: "handbooks",
      },
      {
        id: "drawers-brochures",
        label: "Brochures & Course Flyers",
        badge: "Publications",
        icon: FileSpreadsheet,
        description: "Manage promotional brochures, flyers, and course roadmaps.",
        component: QuickDrawersManager,
        subTabKey: "brochures",
      },
      {
        id: "drawers-prospectus",
        label: "Admissions Prospectus",
        badge: "Official",
        icon: Compass,
        description: "Manage official college admissions prospectus and archive editions.",
        component: QuickDrawersManager,
        subTabKey: "prospectus",
      },
    ],
  },
  {
    id: "nav-about",
    orderNumber: 2,
    navTitle: "2. About Us",
    navIcon: Building,
    description: "Institutional governance, policies, and strategic development frameworks",
    subItems: [
      {
        id: "strategic-documents",
        label: "Strategic Documents & Archives",
        badge: "Deployment PDFs",
        icon: FileText,
        description: "Manage strategic framework documents, annual deployment PDF archives, and statutory reports.",
        component: StrategicPlanManager,
        subTabKey: "documents",
      },
      {
        id: "strategic-framework",
        label: "Institutional Strategic Framework",
        badge: "Goals & Pillars",
        icon: Compass,
        description: "Manage the core strategic framework, key performance indicators, and institutional priorities.",
        component: StrategicPlanManager,
        subTabKey: "framework",
      },
      {
        id: "strategic-feedback",
        label: "Stakeholder Feedback Forms",
        badge: "6 Forms",
        icon: Users,
        description: "Manage stakeholder feedback survey links for students, faculty, parents, alumni, employers, and community.",
        component: StrategicPlanManager,
        subTabKey: "feedback",
      },
      {
        id: "strategic-executive",
        label: "Executive Vision 2047",
        badge: "Viksit Bharat",
        icon: Sparkles,
        description: "Manage executive vision statement, national/state alignment, and Swarna Andhra @2047 roadmap.",
        component: StrategicPlanManager,
        subTabKey: "executive",
      },
    ],
  },
  {
    id: "nav-academics",
    orderNumber: 3,
    navTitle: "3. Academics",
    navIcon: BookOpen,
    description: "Undergraduate & Postgraduate programmes, curricula, calendars, and departments",
    subItems: [
      {
        id: "academics-A",
        label: "A. Programmes (UG & PG)",
        badge: "Intake & Syllabi",
        icon: GraduationCap,
        description: "Manage UG and PG academic programmes, seat matrices, eligibility, and curriculum architectures.",
        component: AcademicsManager,
        subTabKey: "A",
      },
      {
        id: "academics-B",
        label: "B. Regulations, Syllabi & Calendars",
        badge: "Calendars & Timetables",
        icon: BookOpen,
        description: "Manage academic calendars, AIP, semester timetables, course syllabi, and regulations.",
        component: AcademicsManager,
        subTabKey: "B",
      },
      {
        id: "academics-C",
        label: "C. Academic Departments",
        badge: "16 Depts",
        icon: Building,
        description: "Manage department portals, faculty allocations, and department-specific document registers.",
        component: AcademicsManager,
        subTabKey: "C",
      },
      {
        id: "academics-D",
        label: "D. Teaching & Learning",
        badge: "Sub-Pages",
        icon: Sparkles,
        description: "Manage teaching-learning methodology records, ICT classrooms, and pedagogy evidence.",
        component: AcademicsManager,
        subTabKey: "D",
      },
      {
        id: "academics-E",
        label: "E. Examination & Evaluation",
        badge: "CIA & Results",
        icon: Award,
        description: "Manage Continuous Internal Assessment (CIA) guidelines, exam schedules, and grading standards.",
        component: AcademicsManager,
        subTabKey: "E",
      },
      {
        id: "academics-F",
        label: "F. Academic Enrichment",
        badge: "VAC & Skills",
        icon: Sparkles,
        description: "Manage Value-Added Courses (VAC), certificate courses, and student enrichment training.",
        component: AcademicsManager,
        subTabKey: "F",
      },
      {
        id: "academics-G",
        label: "G. Quality & Programme Outcomes",
        badge: "POs, PSOs & COs",
        icon: ShieldCheck,
        description: "Manage Programme Outcomes (POs), Programme Specific Outcomes (PSOs), and Course Outcomes (COs).",
        component: AcademicsManager,
        subTabKey: "G",
      },
    ],
  },
  {
    id: "nav-admissions",
    orderNumber: 4,
    navTitle: "4. Admissions",
    navIcon: GraduationCap,
    description: "Intake seat matrices, eligibility rules, admission policy, and prospectus",
    subItems: [
      {
        id: "admissions-A",
        label: "A. Programmes Offered",
        badge: "Intake Matrix",
        icon: GraduationCap,
        description: "Manage UG and PG intake quotas, convener vs management seats, and course brochures.",
        component: AdmissionsManager,
        subTabKey: "A",
      },
      {
        id: "admissions-B",
        label: "B. Eligibility Criteria",
        badge: "Requirements",
        icon: ClipboardList,
        description: "Manage qualifying examination criteria, subject prerequisites, and admission quotas.",
        component: AdmissionsManager,
        subTabKey: "B",
      },
      {
        id: "admissions-C",
        label: "C. Admission Policy & Process",
        badge: "Guidelines",
        icon: ShieldCheck,
        description: "Manage admission policy framework, application steps, required documents checklist, and rules.",
        component: AdmissionsManager,
        subTabKey: "C",
      },
      {
        id: "admissions-D",
        label: "D. Prospectus & Brochures",
        badge: "Downloads",
        icon: BookOpen,
        description: "Upload and manage college prospectus, department pamphlets, and student guidelines PDFs.",
        component: AdmissionsManager,
        subTabKey: "D",
      },
      {
        id: "admissions-E",
        label: "E. Admission Desk",
        badge: "Helpline",
        icon: Phone,
        description: "Manage admission helpdesk contacts, officer numbers, working hours, and email assistance.",
        component: AdmissionsManager,
        subTabKey: "E",
      },
      {
        id: "admissions-F",
        label: "F. Admission Information",
        badge: "Statutory",
        icon: Layers,
        description: "Manage statutory Table 3 admission registers, sanctioned vs enrolled counts, and category statistics.",
        component: AdmissionsManager,
        subTabKey: "F",
      },
    ],
  },
  {
    id: "nav-faculty",
    orderNumber: 5,
    navTitle: "5. Faculty",
    navIcon: Users,
    description: "Faculty directory, qualifications, research areas, and profiles",
    subItems: [
      {
        id: "faculty-profiles-dir",
        label: "Faculty Profiles & Directory",
        badge: "Live Sanity Sync",
        icon: Users,
        description: "Create, edit, and manage faculty profiles, academic qualifications, research, and publications.",
        component: FacultyProfilesManager,
      },
    ],
  },
  {
    id: "nav-student-support",
    orderNumber: 6,
    navTitle: "6. Student Support Services",
    navIcon: HeartHandshake,
    description: "Student welfare, anti-ragging cell, ICC, grievance redressal, and committees",
    subItems: [
      {
        id: "support-welfare",
        label: "A. Support & Welfare (11 Cells)",
        badge: "Statutory Cells",
        icon: HeartHandshake,
        description: "Manage anti-ragging, grievance redressal, ICC, women empowerment, SC/ST, and student welfare cells.",
        component: StudentSupportManager,
        subTabKey: "welfare",
      },
      {
        id: "support-sports",
        label: "B. Sports & Games (9 Pillars)",
        badge: "Athletics & Gym",
        icon: Award,
        description: "Manage sports facilities, tournament registers, coaching staff, and equipment logs.",
        component: StudentSupportManager,
        subTabKey: "sports",
      },
      {
        id: "support-outreach",
        label: "C. Extension & Outreach (6 Wings)",
        badge: "NSS & YRC",
        icon: Globe,
        description: "Manage community service wings, village adoption reports, and awareness rallies.",
        component: StudentSupportManager,
        subTabKey: "outreach",
      },
      {
        id: "support-capacity",
        label: "D. Capacity Building & Seminars",
        badge: "Skill Workshops",
        icon: BookOpen,
        description: "Manage student development seminars, soft-skills training, and career guidance workshops.",
        component: StudentSupportManager,
        subTabKey: "capacity",
      },
      {
        id: "support-laurels",
        label: "E. Student Laurels & Awards",
        badge: "Achievements",
        icon: Sparkles,
        description: "Manage university rank holders, state/national sports awards, and cultural medals.",
        component: StudentSupportManager,
        subTabKey: "laurels",
      },
    ],
  },
  {
    id: "nav-placements",
    orderNumber: 7,
    navTitle: "7. Placements & Industry Linkages",
    navIcon: Briefcase,
    description: "Corporate recruitment statistics, partner recruiters, MoUs, and APSSDC",
    subItems: [
      {
        id: "placements-cell",
        label: "I. Training & Placement Cell",
        badge: "Annual Reports",
        icon: Briefcase,
        description: "Manage TPO Profile, recruitment statistics, packages, and annual placement reports.",
        component: PlacementsManager,
      },
    ],
  },
  {
    id: "nav-research",
    orderNumber: 8,
    navTitle: "8. Research & Innovation",
    navIcon: FlaskConical,
    description: "RDC cell, research policy, faculty publications, IPR patents, and incubation",
    subItems: [
      {
        id: "research-1",
        label: "1. Research Policy & Funding",
        badge: "Policy Framework",
        icon: ShieldCheck,
        description: "Manage institutional research promotion guidelines, seed funding, and ethics code.",
        component: ResearchManager,
        subTabKey: 1,
      },
      {
        id: "research-2",
        label: "2. Research & Development Cell (RDC)",
        badge: "RDC Reports",
        icon: FlaskConical,
        description: "Manage RDC committee members, annual activity reports, and research milestones.",
        component: ResearchManager,
        subTabKey: 2,
      },
      {
        id: "research-3",
        label: "3. Research Infrastructure & Labs",
        badge: "Instrumentation",
        icon: Building,
        description: "Manage instrumentation laboratories, library digital e-resources, and computational facilities.",
        component: ResearchManager,
        subTabKey: 3,
      },
      {
        id: "research-4",
        label: "4. Publications, Books & Chapters",
        badge: "Scopus/UGC CARE",
        icon: BookOpen,
        description: "Manage peer-reviewed journal papers, books, ISBN book chapters, and conference presentations.",
        component: ResearchManager,
        subTabKey: 4,
      },
      {
        id: "research-5",
        label: "5. Patents & Innovations",
        badge: "Patents Filed/Granted",
        icon: Sparkles,
        description: "Manage intellectual patent filings, published grants, and year-wise innovation metrics.",
        component: ResearchManager,
        subTabKey: 5,
      },
      {
        id: "research-6",
        label: "6. IPR Cell & Activities",
        badge: "Intellectual Property",
        icon: Award,
        description: "Manage IPR cell constitution order, awareness workshops, and copyright registrations.",
        component: ResearchManager,
        subTabKey: 6,
      },
      {
        id: "research-7",
        label: "7. ED Start-Up Center",
        badge: "Incubation",
        icon: Briefcase,
        description: "Manage Entrepreneurship Development (ED) cell, student start-up incubators, and enterprise pitches.",
        component: ResearchManager,
        subTabKey: 7,
      },
      {
        id: "research-8",
        label: "8. IIC Industry Cell",
        badge: "MoE Innovation",
        icon: Sparkles,
        description: "Manage Institution's Innovation Council (IIC) star ratings, quarters, and celebration days.",
        component: ResearchManager,
        subTabKey: 8,
      },
    ],
  },
  {
    id: "nav-alumni",
    orderNumber: 9,
    navTitle: "9. Alumni",
    navIcon: Users,
    description: "Alumni network, registered association, contribution register, and pride alumni",
    subItems: [
      {
        id: "alumni-1",
        label: "1. About Alumni Association",
        badge: "Overview",
        icon: Users,
        description: "Manage alumni association overview, registration details, and institutional role.",
        component: AlumniManager,
        subTabKey: 1,
      },
      {
        id: "alumni-2",
        label: "2. College Alumni Committee",
        badge: "Steering Body",
        icon: Building,
        description: "Manage college alumni committee office bearers, constitution, and meeting reports.",
        component: AlumniManager,
        subTabKey: 2,
      },
      {
        id: "alumni-3",
        label: "3. Registered Association & Orders",
        badge: "Societies Act",
        icon: ShieldCheck,
        description: "Manage AP Societies Registration certificate, bylaws, and statutory compliance orders.",
        component: AlumniManager,
        subTabKey: 3,
      },
      {
        id: "alumni-4",
        label: "4. Alumni Contributions Register",
        badge: "Financial & In-Kind",
        icon: HeartHandshake,
        description: "Manage audited financial donations, book endowments, laboratory apparatus gifts, and scholarships.",
        component: AlumniManager,
        subTabKey: 4,
      },
      {
        id: "alumni-5",
        label: "5. Pride Alumni & Testimonials",
        badge: "Hall of Fame",
        icon: Award,
        description: "Manage distinguished pride alumni profiles, testimonials, and career placements.",
        component: AlumniManager,
        subTabKey: 5,
      },
      {
        id: "alumni-7",
        label: "6. Events, Reunions & Gallery",
        badge: "Photo Albums",
        icon: Calendar,
        description: "Manage annual alumni homecoming meets, batch reunions, and commemorative photos.",
        component: AlumniManager,
        subTabKey: 7,
      },
    ],
  },
  {
    id: "nav-quality",
    orderNumber: 10,
    navTitle: "10. Quality Assurance & Accreditation",
    navIcon: ShieldCheck,
    description: "IQAC cell, NAAC criteria, AQAR annual reports, and administrative audits",
    subItems: [
      {
        id: "qa-iqac",
        label: "IQAC Initiatives (6 Modules)",
        badge: "Steering Committee",
        icon: Users,
        description: "Manage IQAC committee orders, minutes of meetings, AAA audits, and best practices.",
        component: QualityAssuranceManager,
        subTabKey: "iqac",
      },
      {
        id: "qa-naac",
        label: "NAAC Accreditation & Criteria",
        badge: "A+ Grade (3.24)",
        icon: ShieldCheck,
        description: "Manage NAAC accreditation cycles, 7 criteria, qualitative metrics, and peer team portal.",
        component: QualityAssuranceManager,
        subTabKey: "naac",
      },
      {
        id: "qa-aqar",
        label: "AQAR Annual Quality Reports",
        badge: "Year-wise PDFs",
        icon: FileText,
        description: "Manage Annual Quality Assurance Reports (AQAR) submitted to NAAC by academic session.",
        component: QualityAssuranceManager,
        subTabKey: "aqar",
      },
    ],
  },
  {
    id: "nav-mandatory",
    orderNumber: 11,
    navTitle: "11. Mandatory Disclosures",
    navIcon: Scale,
    description: "Statutory tables, AICTE/APSCHE orders, AISHE/NIRF reports, and RTI",
    subItems: [
      {
        id: "md-A",
        label: "A. Statutory & Regulatory",
        badge: "ANU / AICTE / UGC",
        icon: ShieldCheck,
        description: "Manage ANU permanent affiliations, AICTE approval letters, UGC 2(f) orders, and NIRF.",
        component: MandatoryDisclosuresManager,
        subTabKey: "A",
      },
      {
        id: "md-B",
        label: "B. Regulatory Compliance",
        badge: "Compliance Orders",
        icon: Scale,
        description: "Manage statutory government compliance registers and regulatory body orders.",
        component: MandatoryDisclosuresManager,
        subTabKey: "B",
      },
      {
        id: "md-C",
        label: "C. Right to Information (RTI)",
        badge: "RTI Committee",
        icon: Users,
        description: "Manage RTI statutory committee, appellate authorities, and public disclosure registers.",
        component: MandatoryDisclosuresManager,
        subTabKey: "C",
      },
      {
        id: "md-D",
        label: "D. Student Welfare & Safety",
        badge: "Safety Charters",
        icon: HeartHandshake,
        description: "Manage anti-ragging, ICC, and women campus security disclosures.",
        component: MandatoryDisclosuresManager,
        subTabKey: "D",
      },
      {
        id: "md-E",
        label: "E. Financial Transparency",
        badge: "Audited Accounts",
        icon: Scale,
        description: "Manage annual budgets, audited balance sheets, corpus funds, and utilization certificates.",
        component: MandatoryDisclosuresManager,
        subTabKey: "E",
      },
      {
        id: "md-F",
        label: "F. Governance Structure",
        badge: "Organogram",
        icon: Building,
        description: "Manage governing body lists, organizational chart, and statutory service rules.",
        component: MandatoryDisclosuresManager,
        subTabKey: "F",
      },
      {
        id: "md-G",
        label: "G. Reports & Data",
        badge: "Annual Reports",
        icon: FileText,
        description: "Manage institutional annual reports, academic summaries, and NIRF rankings.",
        component: MandatoryDisclosuresManager,
        subTabKey: "G",
      },
      {
        id: "md-H",
        label: "H. Disclosure Archives",
        badge: "Past Sessions",
        icon: FileText,
        description: "Manage historical compliance documents, previous year disclosures, and statutory archives.",
        component: MandatoryDisclosuresManager,
        subTabKey: "H",
      },
    ],
  },
  {
    id: "nav-updates",
    orderNumber: 12,
    navTitle: "12. Campus Updates & Alerts",
    navIcon: Bell,
    description: "Official notifications, examination circulars, upcoming events, and celebrations",
    subItems: [
      {
        id: "events-management",
        label: "Events & Activities",
        badge: "Live Sanity Sync",
        icon: Calendar,
        description: "Manage upcoming college events, celebrations, workshops, seminars, photos, and document attachments.",
        component: EventsManager,
      },
      {
        id: "notices-management",
        label: "Notice Board & Circulars",
        badge: "Live Sanity Sync",
        icon: Bell,
        description: "Publish official college circulars, notifications, examination alerts, admissions updates, and downloadable PDFs.",
        component: NoticesManager,
      },
    ],
  },
];

// Flat list of all sub-items
const ALL_SUB_ITEMS: AdminSubItem[] = ADMIN_NAV_GROUPS.flatMap((g) => g.subItems);

export default function AdminPage() {
  const router = useRouter();

  // Auth state
  const [user, setUser] = useState<AdminUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Active sub-item ID (defaults to "home-banners")
  const [activeSubItemId, setActiveSubItemId] = useState<string>("home-banners");

  // Active sub-tab key within the active component (e.g. "A", "B", "newsletters", etc.)
  const [activeSubTabKey, setActiveSubTabKey] = useState<string | number | undefined>(undefined);

  // Open Accordion Groups state (multi-accordion capable)
  // By default, group containing the active item is open
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "nav-home": true,
    "nav-admissions": true,
  });

  // Toggle Accordion Group: ONLY toggles the appearance/disappearance of sub-items
  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // 1. Verify Authentication & Tab Session
  useEffect(() => {
    const isTabActive =
      typeof window !== "undefined" &&
      sessionStorage.getItem("stanns_admin_tab_active") === "1";
    if (!isTabActive) {
      window.location.replace("/admin/login");
      fetch("/api/admin/auth", { method: "DELETE" }).catch(() => {});
      return;
    }

    async function verifyAuth() {
      try {
        const res = await fetch("/api/admin/auth", { cache: "no-store" });
        const data = await res.json();
        if (!data.authenticated) {
          sessionStorage.removeItem("stanns_admin_tab_active");
          window.location.replace("/admin/login");
          return;
        }
        setUser(data.user);
        setAuthLoading(false);
      } catch (err) {
        sessionStorage.removeItem("stanns_admin_tab_active");
        window.location.replace("/admin/login");
      }
    }
    verifyAuth();
  }, [router]);

  // Keep parent group open when activeSubItemId changes
  useEffect(() => {
    const parentGroup = ADMIN_NAV_GROUPS.find((g) =>
      g.subItems.some((s) => s.id === activeSubItemId)
    );
    if (parentGroup) {
      setOpenGroups((prev) => ({ ...prev, [parentGroup.id]: true }));
    }
  }, [activeSubItemId]);

  // Logout handler
  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("stanns_admin_tab_active");
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.replace("/admin/login");
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (typeof window !== 'undefined' && sessionStorage.getItem('stanns_admin_tab_active') !== '1') {
                  window.location.replace('/admin/login');
                }
              } catch (e) {}
            `,
          }}
        />
        <div className="flex flex-col items-center gap-3 text-white">
          <div className="w-9 h-9 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-300">
            Loading Administrator Portal...
          </span>
        </div>
      </div>
    );
  }

  // Find active sub-item and its parent group
  const currentSubItem =
    ALL_SUB_ITEMS.find((s) => s.id === activeSubItemId) || ALL_SUB_ITEMS[0];
  const currentGroup =
    ADMIN_NAV_GROUPS.find((g) => g.subItems.some((s) => s.id === currentSubItem.id)) ||
    ADMIN_NAV_GROUPS[0];
  const ActiveComponent = currentSubItem.component;

  // Effective sub-tab key passed to the manager component
  const effectiveSubTabKey =
    activeSubTabKey !== undefined ? activeSubTabKey : currentSubItem.subTabKey;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#002147] text-white border-b border-blue-900 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Portal Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-tight">
                  St. Ann&apos;s Administrator Portal
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  Live Management
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                Official Content &amp; Communications Management Hub
              </p>
            </div>
          </div>

          {/* Actions & User Profile */}
          <div className="flex items-center gap-3">
            {/* Live Sanity Status */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>Sanity Live Sync Connected</span>
            </div>

            {/* Quick Links */}
            <Link
              href="/"
              target="_blank"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-xs font-semibold text-white transition-colors"
              title="Open Live College Website in new tab"
            >
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              <span>View Website</span>
              <ExternalLink className="w-3 h-3 text-white/60" />
            </Link>

            <Link
              href="/studio"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 rounded-xl text-xs font-semibold text-blue-100 transition-colors"
              title="Open Sanity Studio in new tab"
            >
              <Database className="w-3.5 h-3.5 text-sky-300" />
              <span>Sanity Studio</span>
              <ExternalLink className="w-3 h-3 text-sky-200" />
            </Link>

            {/* User Details & Logout */}
            <div className="flex items-center gap-3 pl-3 border-l border-blue-900">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold leading-none">{user?.name || "Administrator"}</p>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider">
                    {user?.role || "Admin"}
                  </span>
                  <span className="text-[10px] text-blue-200/60">•</span>
                  <span className="text-[10px] text-blue-200/70">{user?.email}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign out of Administrator Portal"
                className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto w-full p-2 sm:p-3 lg:p-4 flex-1 flex flex-col lg:flex-row gap-4 items-start">
        
        {/* Left Sidebar: Organised in Order of Top Nav Bar */}
        <aside className="w-full lg:w-80 shrink-0 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4 space-y-3 lg:sticky lg:top-20">
          
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-blue-700" />
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                Top Nav Modules
              </span>
            </div>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 rounded-full">
              {ADMIN_NAV_GROUPS.length} Nav Groups
            </span>
          </div>

          {/* Accordion List matching Top Nav Bar Order */}
          <nav className="space-y-1.5 max-h-[calc(100vh-210px)] overflow-y-auto pr-1">
            {ADMIN_NAV_GROUPS.map((group) => {
              const GroupIcon = group.navIcon;
              const isOpen = Boolean(openGroups[group.id]);
              const isGroupActive = group.subItems.some((s) => s.id === activeSubItemId);

              return (
                <div
                  key={group.id}
                  className={`rounded-2xl transition-all border ${
                    isGroupActive
                      ? "bg-slate-50/70 border-blue-200/80"
                      : "bg-transparent border-transparent hover:border-slate-200/60"
                  }`}
                >
                  {/* Group Header Button: Clicking ONLY toggles the appearance/disappearance of sub-items! */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                      isGroupActive
                        ? "text-[#002147] font-black bg-blue-50/50"
                        : "text-slate-700 hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                          isGroupActive
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <GroupIcon className="w-3.5 h-3.5" />
                      </span>
                      <span className="truncate text-xs tracking-tight">{group.navTitle}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`text-[9.5px] font-black px-1.5 py-0.5 rounded-full ${
                          isGroupActive
                            ? "bg-blue-200/70 text-blue-900"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {group.subItems.length}
                      </span>

                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-blue-700" : "text-slate-400"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Sub-Items Accordion Body (Shown when Open) */}
                  {isOpen && (
                    <div className="pl-4 pr-1 py-1.5 space-y-1 border-l-2 border-blue-200 ml-4 my-1">
                      {group.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeSubItemId === sub.id;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              setActiveSubItemId(sub.id);
                              setActiveSubTabKey(sub.subTabKey);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                              isSubActive
                                ? "bg-[#002147] text-white shadow-xs font-bold"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <SubIcon
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isSubActive ? "text-amber-300" : "text-sky-600"
                                }`}
                              />
                              <span className="truncate text-[11.5px]">{sub.label}</span>
                            </div>
                            <ChevronRight
                              className={`w-3 h-3 shrink-0 ${
                                isSubActive ? "text-blue-300" : "text-slate-300"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Quick Shortcuts */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5 mt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-1">
              Live Shortcuts
            </span>
            <Link
              href="/studio"
              target="_blank"
              className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-white hover:shadow-xs transition-all border border-transparent hover:border-slate-200"
            >
              <span className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                Sanity Studio
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-white hover:shadow-xs transition-all border border-transparent hover:border-slate-200"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                Live Website
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 w-full min-w-0">
          
          {/* Active Manager Component with synchronized tab */}
          <div>
            <ActiveComponent
              key={`${currentSubItem.id}-${effectiveSubTabKey}`}
              currentTab={effectiveSubTabKey as any}
              initialTab={effectiveSubTabKey as any}
              currentSection={effectiveSubTabKey as any}
              initialSection={effectiveSubTabKey as any}
              onTabChange={(tab: any) => {
                setActiveSubTabKey(tab);
                // Also update activeSubItemId if matching a sub-item in current group
                const matchingSub = currentGroup.subItems.find((s) => s.subTabKey === tab);
                if (matchingSub) {
                  setActiveSubItemId(matchingSub.id);
                }
              }}
              onSectionChange={(sec: any) => {
                setActiveSubTabKey(sec);
                const matchingSub = currentGroup.subItems.find((s) => s.subTabKey === sec);
                if (matchingSub) {
                  setActiveSubItemId(matchingSub.id);
                }
              }}
            />
          </div>
        </main>

      </div>
    </div>
  );
}
