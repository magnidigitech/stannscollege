"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Users,
  Building,
  ShieldCheck,
  BookOpen,
  Lightbulb,
  LineChart,
  ArrowRight,
  HeartHandshake,
  Flag,
  Trophy,
  Briefcase,
  Handshake,
  Globe2,
  Menu,
  X,
  Plus,
  Minus,
  Phone,
  MapPin,
  FileCheck,
  Scale,
  Landmark,
  BarChart3,
  Archive,
  Award,
  MessageSquareQuote,
  Calendar,
  Image as ImageIcon,
  ChevronRight,
  FlaskConical,
  Rocket,
  Compass,
  Building2
} from "lucide-react";

export function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/^(i+|v+)\.\s*/, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function DropdownHeaderBanner({
  title,
  href,
  buttonText,
  icon: Icon,
  onNavigate,
}: {
  title: string;
  href: string;
  buttonText: string;
  icon: React.ComponentType<{ className?: string }>;
  onNavigate: () => void;
}) {
  return (
    <div className="col-span-full mb-2 p-4 rounded-2xl bg-gradient-to-r from-[#002147] to-blue-900 text-white flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-amber-300" />
        </div>
        <div>
          <h3 className="font-bold text-sm tracking-tight">{title}</h3>
          <p className="text-[11px] text-blue-200/80">Direct access to institutional frameworks, portals &amp; regulatory filings</p>
        </div>
      </div>
      <Link
        href={href}
        onClick={onNavigate}
        className="px-4 py-2 rounded-xl bg-amber-400 text-[#002147] hover:bg-amber-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export default function Navigation() {
  // Desktop Menu Hover State with debounce
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      // If the clicked target was unmounted/detached during React re-render, ignore
      if (!target || !document.body.contains(target)) return;

      if (navContainerRef.current && !navContainerRef.current.contains(target)) {
        setActiveMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Mobile Drawer & Accordion States
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mAbout, setMAbout] = useState(false);
  const [mAcademics, setMAcademics] = useState(false);
  const [mAdmissions, setMAdmissions] = useState(false);
  const [mInfra, setMInfra] = useState(false);
  const [mFaculty, setMFaculty] = useState(false);
  const [mSupport, setMSupport] = useState(false);
  const [mPlacements, setMPlacements] = useState(false);
  const [mResearch, setMResearch] = useState(false);
  const [mAlumni, setMAlumni] = useState(false);
  const [mIqac, setMIqac] = useState(false);
  const [mMandatory, setMMandatory] = useState(false);
  const [mStrategic, setMStrategic] = useState(false);
  const [mContact, setMContact] = useState(false);

  const researchCategories = [
    {
      title: "1. Research Policy & Ethics",
      fullTitle: "1. Research Promotion, Ethics & Funding Policy",
      icon: Scale,
      href: "/research-innovation#sec-policy",
      items: [
        { text: "Policy Framework & Commitments", href: "/research-innovation#sec-policy" },
      ]
    },
    {
      title: "2. Research & Development Cell",
      fullTitle: "2. Research & Development Cell (RDC)",
      icon: FlaskConical,
      href: "/research-innovation#sec-rdc",
      items: [
        { text: "About RDC", href: "/research-innovation#sec-rdc-about" },
        { text: "Vision & Mission", href: "/research-innovation#sec-rdc-vision" },
        { text: "Key Objectives", href: "/research-innovation#sec-rdc-objectives" },
        { text: "Major Initiatives", href: "/research-innovation#sec-rdc-initiatives" },
        { text: "Institutional Commitment", href: "/research-innovation#sec-rdc-commitment" },
        { text: "RDC Annual Activity Reports", href: "/research-innovation#sec-rdc-reports" },
      ]
    },
    {
      title: "3. Research Infrastructure",
      fullTitle: "3. Research Infrastructure",
      icon: Building2,
      href: "/research-innovation#sec-infra",
      items: [
        { text: "Research Laboratories", href: "/research-innovation#sec-infra-labs" },
        { text: "Laboratory Facilities & Equipment", href: "/research-innovation#sec-infra-equipment" },
        { text: "Departmental Research Facilities", href: "/research-innovation#sec-infra-dept" },
        { text: "Library & E-Resources", href: "/research-innovation#sec-infra-library" },
        { text: "DELNET / Digital Resources", href: "/research-innovation#sec-infra-delnet" },
        { text: "ICT & Computational Facilities", href: "/research-innovation#sec-infra-ict" },
      ]
    },
    {
      title: "4. Research Publications",
      fullTitle: "4. Research Publications & Scholarly Contributions",
      icon: BookOpen,
      href: "/research-innovation#sec-publications",
      items: [
        { text: "Faculty & Students Publications", href: "/research-innovation#sec-pub-faculty-students" },
        { text: "Faculty & Student Paper Presentations", href: "/research-innovation#sec-pub-presentations" },
        { text: "Journals, Books & Book Chapters", href: "/research-innovation#sec-pub-books" },
      ]
    },
    {
      title: "5. Patents & Innovations",
      fullTitle: "5. Patents / Start-ups / Innovations",
      icon: Lightbulb,
      href: "/research-innovation#sec-patents",
      items: [
        { text: "Major Innovation Initiatives", href: "/research-innovation#sec-patents-initiatives" },
        { text: "Year-wise Innovation & IPR Activities", href: "/research-innovation#sec-patents-matrix" },
      ]
    },
    {
      title: "6. IPR Cell",
      fullTitle: "6. Intellectual Property Rights (IPR) Cell",
      icon: ShieldCheck,
      href: "/research-innovation#sec-ipr",
      items: [
        { text: "About IPR Cell (Est. 01-09-2022)", href: "/research-innovation#sec-ipr-about" },
        { text: "Objectives & Major Activities", href: "/research-innovation#sec-ipr-objectives" },
        { text: "Expected Outcomes", href: "/research-innovation#sec-ipr-outcomes" },
        { text: "Annual Activity Reports", href: "/research-innovation#sec-ipr-reports" },
      ]
    },
    {
      title: "7. ED & Start-Up Centre",
      fullTitle: "7. ED / Innovation & Start-Up Centre",
      icon: Rocket,
      href: "/research-innovation#sec-edc",
      items: [
        { text: "About Centre & Vision", href: "/research-innovation#sec-edc-about" },
        { text: "Objectives & Major Activities", href: "/research-innovation#sec-edc-objectives" },
        { text: "Industry & Women Entrepreneurship", href: "/research-innovation#sec-edc-women" },
        { text: "Annual Activity Reports", href: "/research-innovation#sec-edc-reports" },
      ]
    },
    {
      title: "8. IIC & Industry Cell",
      fullTitle: "8. Institution Innovation Council (IIC)",
      icon: Compass,
      href: "/research-innovation#sec-iic",
      items: [
        { text: "About the Cell & Objectives", href: "/research-innovation#sec-iic-about" },
        { text: "Key Activities & Outcomes", href: "/research-innovation#sec-iic-activities" },
        { text: "Annual Activity Reports", href: "/research-innovation#sec-iic-reports" },
      ]
    }
  ];

  const alumniCategories = [
    {
      title: "1. About Alumni",
      icon: Users,
      href: "/alumni#sec-about",
      items: [
        { text: "About Alumni Engagement", href: "/alumni#sec-about-engagement" },
        { text: "Vision, Mission & Objectives", href: "/alumni#sec-about-vision" },
        { text: "Role in Institutional Development", href: "/alumni#sec-about-role" },
        { text: "Alumni–Institution Connect", href: "/alumni#sec-about-connect" },
      ]
    },
    {
      title: "2. College-Level Alumni Committee",
      icon: Users,
      href: "/alumni#sec-committee",
      items: [
        { text: "About the Committee", href: "/alumni#sec-committee-about" },
        { text: "Alumni Committee Members", href: "/alumni#sec-committee-members" },
        { text: "Roles & Responsibilities", href: "/alumni#sec-committee-roles" },
        { text: "Annual Action Plan & Meetings", href: "/alumni#sec-committee-plan" },
        { text: "Annual Reports", href: "/alumni#sec-committee-reports" },
      ]
    },
    {
      title: "3. Registered Alumni Association",
      icon: ShieldCheck,
      href: "/alumni#sec-association",
      items: [
        { text: "About the Association", href: "/alumni#sec-association-about" },
        { text: "Registration Details (307 of 2022)", href: "/alumni#sec-association-reg" },
        { text: "Office Bearers", href: "/alumni#sec-association-members" },
        { text: "Registration & Statutory Documents", href: "/alumni#sec-association-docs" },
      ]
    },
    {
      title: "4. Alumni Contributions & Support",
      icon: HeartHandshake,
      href: "/alumni#sec-contributions",
      items: [
        { text: "Engagement Areas", href: "/alumni#sec-contributions-areas" },
        { text: "Contributions & Support Register", href: "/alumni#sec-contributions-register" },
      ]
    },
    {
      title: "5. Alumni Network",
      icon: Award,
      href: "/alumni#sec-network",
      items: [
        { text: "Join the Alumni Network (Form)", href: "/alumni#sec-network-join" },
        { text: "Our Alumni – Our Pride", href: "/alumni#sec-network-pride" },
        { text: "Voices of Our Alumni", href: "/alumni#sec-network-voices" },
      ]
    },
    {
      title: "6. Alumni Feedback & Connect",
      icon: MessageSquareQuote,
      href: "/alumni#sec-feedback",
      items: [
        { text: "Feedback Framework", href: "/alumni#sec-feedback-info" },
        { text: "Suggestions & Outcomes", href: "/alumni#sec-feedback-suggestions" },
        { text: "Quality Enhancement Connect", href: "/alumni#sec-feedback-quality" },
      ]
    },
    {
      title: "7. Alumni Events",
      icon: Calendar,
      href: "/alumni#sec-events",
      items: [
        { text: "Events & Reunions Overview", href: "/alumni#sec-events-overview" },
        { text: "Scheduled & Annual Programmes", href: "/alumni#sec-events-list" },
      ]
    },
    {
      title: "8. Alumni Gallery & Media",
      icon: ImageIcon,
      href: "/alumni#sec-gallery",
      items: [
        { text: "Photo Gallery Categories", href: "/alumni#sec-gallery-photos" },
        { text: "Video Gallery & Messages", href: "/alumni#sec-gallery-videos" },
      ]
    },
    {
      title: "9. Alumni Contact Information",
      icon: Phone,
      href: "/alumni#sec-contact",
      items: [
        { text: "Association Office Desk", href: "/alumni#sec-contact-desk" },
        { text: "Direct Contact Channels", href: "/alumni#sec-contact-channels" },
      ]
    }
  ];

  const iqacCategories = [
    {
      title: "I. Quality Framework",
      icon: ShieldCheck,
      items: [
        { text: "About IQAC Cell", href: "/quality-assurance/iqac" },
        { text: "AQAR Annual Quality Reports", href: "/quality-assurance/aqar" },
        { text: "NAAC Accreditation Details", href: "/quality-assurance/naac" },
        { text: "NAAC Peer Team Portal", href: "/naac-peer-team" },
      ]
    },
    {
      title: "II. Quality Processes",
      icon: Lightbulb,
      items: [
        { text: "Quality Initiatives", href: "/quality-assurance/quality-initiatives" },
        { text: "Academic & Administrative Audit (AAA)", href: "/quality-assurance/audit" },
        { text: "Feedback System & Action Taken", href: "/quality-assurance/feedback" },
      ]
    },
    {
      title: "III. Evaluation & Media",
      icon: BookOpen,
      items: [
        { text: "Student Satisfaction Surveys", href: "/quality-assurance/surveys" },
        { text: "IQAC Activity Gallery", href: "/quality-assurance/gallery" },
        { text: "Contact IQAC Coordinator", href: "/quality-assurance/contact" },
      ]
    }
  ];

  const mandatoryCategories = [
    {
      title: "A. Statutory & Regulatory",
      fullTitle: "A. Statutory & Regulatory Information",
      icon: ShieldCheck,
      href: "/mandatory-disclosures#sec-statutory",
      items: [
        { text: "Mandatory Disclosure", href: "/mandatory-disclosures#sec-mandatory-disclosure" },
        { text: "Institutional Profile & Programme Details", href: "/mandatory-disclosures#sec-institutional-profile" },
        { text: "ANU Affiliation Orders – UG & PG", href: "/mandatory-disclosures#sec-anu-affiliations" },
        { text: "AICTE Approval / EoA Documents", href: "/mandatory-disclosures#sec-aicte-approval" },
        { text: "UGC Section 2(f) Recognition", href: "/mandatory-disclosures#sec-ugc-recognition" },
        { text: "APSCHE Orders & Communications", href: "/mandatory-disclosures#sec-apsche-orders" },
        { text: "AISHE Certificates & Reports", href: "/mandatory-disclosures#sec-aishe-reports" },
        { text: "NIRF Submission & Reports", href: "/mandatory-disclosures#sec-nirf-reports" },
      ]
    },
    {
      title: "B. Regulatory Compliance",
      fullTitle: "B. Regulatory Compliance",
      icon: FileCheck,
      href: "/mandatory-disclosures#sec-compliance",
      items: [
        { text: "AICTE Compliance", href: "/mandatory-disclosures#sec-compliance" },
        { text: "UGC Compliance", href: "/mandatory-disclosures#sec-compliance" },
        { text: "APSCHE Compliance", href: "/mandatory-disclosures#sec-compliance" },
        { text: "Other Statutory Compliance", href: "/mandatory-disclosures#sec-compliance" },
      ]
    },
    {
      title: "C. Right to Information (RTI)",
      fullTitle: "C. Right to Information (RTI)",
      icon: BookOpen,
      href: "/mandatory-disclosures#sec-rti",
      items: [
        { text: "RTI Act & Institutional Information", href: "/mandatory-disclosures#sec-rti" },
        { text: "RTI Committee / Authorities", href: "/mandatory-disclosures#sec-rti" },
        { text: "RTI Gazette & Constitution Orders", href: "/mandatory-disclosures#sec-rti" },
      ]
    },
    {
      title: "D. Student Welfare & Safety",
      fullTitle: "D. Student Welfare, Safety & Grievance Redressal",
      icon: Users,
      href: "/mandatory-disclosures#sec-student-welfare",
      items: [
        { text: "Anti-Ragging Policy & Committee", href: "/student-support/anti-ragging-cell" },
        { text: "Grievance Redressal Cell", href: "/student-support/grievance-redressal-cell" },
        { text: "Internal Complaints Committee (ICC)", href: "/student-support/internal-complaints-committee" },
        { text: "Women Empowerment & Campus Safety", href: "/student-support/women-empowerment-cell" },
        { text: "SC/ST & Equal Opportunity Cell", href: "/student-support/sc-st-minority-cell" },
        { text: "Student Counselling & Support", href: "/student-support/counseling-centre" },
      ]
    },
    {
      title: "E. Financial Transparency",
      fullTitle: "E. Financial Transparency",
      icon: Scale,
      href: "/mandatory-disclosures#sec-financial",
      items: [
        { text: "Annual Budget", href: "/mandatory-disclosures#sec-financial" },
        { text: "Audited Financial Statements", href: "/mandatory-disclosures#sec-financial" },
        { text: "Sources of Income & Corpus Funds", href: "/mandatory-disclosures#sec-financial" },
        { text: "Utilization Certificates", href: "/mandatory-disclosures#sec-financial" },
        { text: "Finance & Procurement Policies", href: "/mandatory-disclosures#sec-financial" },
        { text: "Approved Fee Structure / AFRC Orders", href: "/mandatory-disclosures#sec-financial" },
        { text: "Scholarship Details", href: "/mandatory-disclosures#sec-financial" },
      ]
    },
    {
      title: "F. Governance & Policies",
      fullTitle: "F. Governance & Institutional Policies",
      icon: Landmark,
      href: "/mandatory-disclosures#sec-governance",
      items: [
        { text: "Governance Structure & Organogram", href: "/about/governance-administration" },
        { text: "Institutional Policies Compendium", href: "/about/policies" },
      ]
    },
    {
      title: "G. Institutional Reports & Data",
      fullTitle: "G. Institutional Reports & Data",
      icon: BarChart3,
      href: "/mandatory-disclosures#sec-reports",
      items: [
        { text: "Annual Reports", href: "/mandatory-disclosures#sec-reports" },
        { text: "Institutional Data & Statistics", href: "/mandatory-disclosures#sec-reports" },
        { text: "Other Statutory Reports", href: "/mandatory-disclosures#sec-reports" },
      ]
    },
    {
      title: "H. Disclosure Archives",
      fullTitle: "H. Disclosure Archives",
      icon: Archive,
      href: "/mandatory-disclosures#sec-archives",
      items: [
        { text: "Previous Mandatory Disclosures", href: "/mandatory-disclosures#sec-archives" },
        { text: "Previous Compliance Documents", href: "/mandatory-disclosures#sec-archives" },
        { text: "Previous Annual Reports", href: "/mandatory-disclosures#sec-archives" },
        { text: "Previous Statutory Reports", href: "/mandatory-disclosures#sec-archives" },
        { text: "Archived Policies & Historical Disclosures", href: "/mandatory-disclosures#sec-archives" },
      ]
    }
  ];

  const strategicCategories = [
    {
      title: "1. Performance Indicators",
      fullTitle: "1. Institutional Performance Indicators",
      icon: GraduationCap,
      href: "/strategic-plans-and-future-directions#performance-indicators",
      items: [
        { text: "a. Academic Performance Indicators", href: "/strategic-plans-and-future-directions#sec-academic-indicators" },
        { text: "b. Research & Innovation Indicators", href: "/strategic-plans-and-future-directions#sec-research-indicators" },
        { text: "c. Societal Impact Indicators", href: "/strategic-plans-and-future-directions#sec-societal-indicators" },
        { text: "d. Institutional Excellence Indicators", href: "/strategic-plans-and-future-directions#sec-excellence-indicators" },
      ]
    },
    {
      title: "2. Strategic Priorities",
      fullTitle: "2. Strategic Priorities – 2026–2031",
      icon: LineChart,
      href: "/strategic-plans-and-future-directions#strategic-priorities",
      items: [
        { text: "a. Academic Priorities", href: "/strategic-plans-and-future-directions#sec-priority-academic" },
        { text: "b. Infrastructure Priorities", href: "/strategic-plans-and-future-directions#sec-priority-infra" },
        { text: "c. Financial Priorities", href: "/strategic-plans-and-future-directions#sec-priority-financial" },
        { text: "d. Global Goals & Internationalization", href: "/strategic-plans-and-future-directions#sec-priority-global" },
        { text: "e. Strategic Documents", href: "/strategic-plans-and-future-directions#sec-strategic-documents" },
      ]
    },
    {
      title: "3. Stakeholder Engagement",
      fullTitle: "3. Stakeholder Engagement & Feedback",
      icon: Users,
      href: "/strategic-plans-and-future-directions#stakeholder-engagement",
      items: [
        { text: "a. Student Feedback", href: "/strategic-plans-and-future-directions#sec-feedback-student" },
        { text: "b. Faculty Engagement", href: "/strategic-plans-and-future-directions#sec-feedback-faculty" },
        { text: "c. Parent Feedback", href: "/strategic-plans-and-future-directions#sec-feedback-parent" },
        { text: "d. Alumni Engagement", href: "/strategic-plans-and-future-directions#sec-feedback-alumni" },
        { text: "e. Community Feedback", href: "/strategic-plans-and-future-directions#sec-feedback-community" },
        { text: "f. Employers Feedback", href: "/strategic-plans-and-future-directions#sec-feedback-employers" },
      ]
    },
    {
      title: "4. Vision for 2047",
      fullTitle: "4. Vision for 2047: Viksit Bharat & Swarna Andhra",
      icon: Flag,
      href: "/strategic-plans-and-future-directions#vision-2047",
      items: [
        { text: "a. Our Commitment", href: "/strategic-plans-and-future-directions#sec-vision-commitments" },
        { text: "b. Strategic Focus Areas", href: "/strategic-plans-and-future-directions#sec-vision-focus" },
        { text: "c. Vision 2047-Signature Initiatives", href: "/strategic-plans-and-future-directions#sec-vision-initiatives" },
        { text: "d. Our Vision for the Future", href: "/strategic-plans-and-future-directions#sec-vision-swarna" },
        { text: "e. Reference Resource Links", href: "/strategic-plans-and-future-directions#sec-reference-resources" },
      ]
    }
  ];

  const contactCategories = [
    {
      title: "I. Direct Communications",
      icon: Phone,
      items: [
        { text: "Send an Enquiry Message", href: "/contact#enquiry-form" },
        { text: "Admissions Helpline Directory", href: "/contact#admissions-helpline" },
        { text: "Principal & Office Contacts", href: "/contact#admissions-helpline" },
      ]
    },
    {
      title: "II. Campus Location",
      icon: MapPin,
      items: [
        { text: "Interactive Campus Map", href: "/contact#campus-map" },
        { text: "Address & Geographic Coordinates", href: "/contact#campus-map" },
      ]
    },
    {
      title: "III. Office & Timings",
      icon: Building,
      items: [
        { text: "Administrative Office Hours", href: "/contact#working-hours" },
        { text: "Official Social Media Portals", href: "/contact" },
      ]
    }
  ];

  const admissionsCategories = [
    {
      title: "I. Admission Guidelines",
      icon: ShieldCheck,
      items: [
        { text: "Admission Policy & Process", slug: "policy-process" },
        { text: "Prospectus & Brochures", slug: "prospectus-brochures" },
        { text: "Eligibility Criteria", slug: "eligibility-criteria" },
      ]
    },
    {
      title: "II. Finance & Aid",
      icon: LineChart,
      items: [
        { text: "Fee Structure", slug: "fee-structure" },
        { text: "Scholarships & Freeships", slug: "scholarships-freeships" },
      ]
    },
    {
      title: "III. Records & Handbooks",
      icon: BookOpen,
      items: [
        { text: "Student Handbook", slug: "student-handbook" },
        { text: "Admission Statistics", slug: "admission-statistics" },
      ]
    }
  ];

  const infraCategories = [
    {
      title: "I. Academic Blocks",
      icon: Building,
      items: [
        { text: "Campus & Buildings", slug: "campus-buildings" },
        { text: "Classrooms", slug: "classrooms" },
        { text: "Library", slug: "library" },
        { text: "Scientific Laboratories", slug: "laboratories" },
      ]
    },
    {
      title: "II. Student Facilities",
      icon: GraduationCap,
      items: [
        { text: "Hostel Residence", slug: "hostel" },
        { text: "Cafeteria / Canteen", slug: "canteen" },
        { text: "Sports, Games & Gym", slug: "sports-games" },
        { text: "Health Centre", slug: "health-centre" },
      ]
    },
    {
      title: "III. Operations & Utility",
      icon: ShieldCheck,
      items: [
        { text: "ICT & Digital Infra", slug: "ict-digital" },
        { text: "Safety & Security", slug: "safety-security" },
        { text: "Green Campus", slug: "green-campus" },
        { text: "Barrier-Free Access", slug: "inclusive-access" },
      ]
    }
  ];

  const supportCategories = [
    {
      title: "I. Support & Welfare Services",
      icon: HeartHandshake,
      items: [
        { text: "Anti-Ragging Committee", slug: "anti-ragging" },
        { text: "Grievance Redressal / Ombudsperson", slug: "grievance-redressal" },
        { text: "Internal Complaints Committee (ICC)", slug: "internal-complaints" },
        { text: "Women Empowerment Cell", slug: "women-empowerment" },
        { text: "Equal Opportunity (SC/ST/Minority)", slug: "equal-opportunity" },
        { text: "Student Counselling Cell", slug: "student-counselling" },
        { text: "Mentor–Mentee System", slug: "mentor-mentee" },
        { text: "Parent Association", slug: "parent-association" },
        { text: "Student Welfare & Scholarships", slug: "scholarships-welfare" },
        { text: "Support for Divyangjan Students", slug: "divyangjan-support" },
        { text: "Student Feedback & Satisfaction", slug: "student-feedback" },
      ]
    },
    {
      title: "II. Sports & Games",
      icon: Trophy,
      items: [
        { text: "Sports Facilities & Playing Areas", slug: "sports-facilities" },
        { text: "Intramural Sports Competitions", slug: "sports-competitions" },
        { text: "Inter-Collegiate & University Trials", slug: "sports-achievements" },
        { text: "Self-Defense & Personal Safety", slug: "self-defense-safety" },
        { text: "Fitness, Yoga & Wellness", slug: "fitness-wellness" },
        { text: "Sports Reports & Gallery", slug: "sports-gallery" },
      ]
    },
    {
      title: "III. Extension & Outreach",
      icon: Flag,
      items: [
        { text: "National Service Scheme (NSS)", slug: "nss-activities" },
        { text: "National Cadet Corps (NCC)", slug: "ncc-activities" },
        { text: "Red Ribbon Club (RRC)", slug: "red-ribbon-club" },
        { text: "Mother Gnanamma Outreach", slug: "mother-gnanamma" },
        { text: "Eco Club & Environment", slug: "eco-club" },
        { text: "Unnat Bharat Abhiyan (UBA)", slug: "unnat-bharat-abhiyan" },
      ]
    },
    {
      title: "IV. Capacity Building",
      icon: Compass,
      items: [
        { text: "Workshops & Skill Seminars", slug: "workshops-seminars" },
      ]
    },
    {
      title: "V. Student Achievements",
      icon: Award,
      items: [
        { text: "Participation & University Ranks", slug: "student-achievements" },
      ]
    }
  ];

  const facultyCategories = [
    {
      title: "I. Staff Roster",
      icon: Users,
      items: [
        { text: "List of Teaching Staff", slug: "teaching-staff" },
        { text: "Faculty Department wise", slug: "department-wise" },
        { text: "List of Non-Teaching Staff", slug: "non-teaching-staff" },
      ]
    },
    {
      title: "II. Policies & Appraisal",
      icon: ShieldCheck,
      items: [
        { text: "Visiting / Adjunct Professors", slug: "visiting-professors" },
        { text: "Recruitment Policy & Process", slug: "recruitment-policy" },
        { text: "360° Performance Appraisal", slug: "performance-appraisal" },
      ]
    },
    {
      title: "III. Development & Awards",
      icon: Lightbulb,
      items: [
        { text: "Professional Development", slug: "professional-development" },
        { text: "Seminars & Conferences", slug: "seminars-conferences" },
        { text: "Faculty Achievements", slug: "faculty-achievements" },
        { text: "Faculty Exchange & Sabbaticals", slug: "faculty-exchange" },
        { text: "Consultancy Assignments", slug: "consultancy-assignments" },
      ]
    }
  ];

  const placementsCategories = [
    {
      title: "I. Training & Placement Cell",
      icon: Briefcase,
      items: [
        { text: "About Training & Placement Cell", slug: "about-cell" },
        { text: "Placements & Recruitment", slug: "placements-recruitment" },
        { text: "APSSDC", slug: "apssdc" },
        { text: "Skill Development Training Areas", slug: "skill-development-areas" },
        { text: "Internships & Industry Exposure", slug: "internships-industry-exposure" },
        { text: "Competitive Exam Coaching", slug: "competitive-exam-coaching" }
      ]
    },
    {
      title: "II. Industry Linkages",
      icon: Handshake,
      items: [
        { text: "Industry & Professional Engagement", slug: "industry-professional-engagement" },
        { text: "MoUs – Memoranda of Understanding", slug: "mous" }
      ]
    },
    {
      title: "III. Internalization & Global Outreach",
      icon: Globe2,
      items: [
        { text: "International Collaborations & Global Engagement", slug: "international-collaborations-global-engagement" }
      ]
    }
  ];

  const aboutCategories = [
    {
      title: "I. The Institution",
      icon: Building,
      items: [
        "Basic Institutional Information",
        "History of the College",
        "Vision, Mission, and Core Values",
        "Institutional Awards & Recognitions",
        "Student Laurels",
        "Institutional Distinctiveness",
        "Head of the Institution",
        "Legacy of Leadership",
      ],
    },
    {
      title: "II. Statutory Affiliations & Recognitions",
      icon: ShieldCheck,
      items: [
        "APSCHE Orders",
        "ANU Affiliation Orders (UG & PG)",
        "AICTE Approvals",
        "UGC 2(f)",
        "AISHE Certificates",
        "NAAC Accreditation",
        "NIRF",
        "NAAC Peer Team",
      ],
    },
    {
      title: "III. Governance & Administration",
      icon: Users,
      items: [
        "Governing Body",
        "Organogram",
        "Key Functionaries & IQAC",
        "Statutory & Non-Statutory Committees",
        "Institutional Policies",
        "Strategic Development Plan",
        "Code of Conduct",
      ],
    },
  ];

  const academicsCol1 = [
    {
      title: "I. Academic Programmes",
      cat: "academic-programmes",
      items: [
        { text: "Undergraduate (UG) Programmes", slug: "undergraduate-programmes" },
        { text: "Postgraduate (PG) Programmes", slug: "postgraduate-programmes" },
        { text: "Industry-Integrated Courses", slug: "industry-integrated-courses" }
      ]
    },
    {
      title: "II. Curriculum & Academic Planning",
      cat: "curriculum-academic-planning",
      items: [
        { text: "Curriculum Framework", slug: "curriculum-framework" },
        { text: "Innovative & Interdisciplinary Offerings", slug: "innovative-interdisciplinary-offerings" },
        { text: "Academic Calendar (UG & PG)", slug: "academic-calendar-ug-pg" },
        { text: "Academic Implementation Plan (AIP)", slug: "academic-implementation-plan-aip" },
        { text: "Time Tables", slug: "time-tables" }
      ]
    }
  ];

  const academicsCol2 = [
    {
      title: "IV. Value-Added Learning",
      cat: "value-added-learning",
      items: [
        { text: "Add-on Courses", slug: "add-on-courses" },
        { text: "Certificate Courses", slug: "certificate-courses" },
        { text: "Value-Added Courses", slug: "value-added-courses" }
      ]
    },
    {
      title: "V. Teaching & Learning",
      cat: "teaching-learning",
      items: [
        { text: "Pedagogy & Learning Methodologies", slug: "pedagogy-learning-methodologies" },
        { text: "Learning Management System (LMS)", slug: "learning-management-system-lms" },
        { text: "Student-Centric Methods", slug: "student-centric-methods" }
      ]
    },
    {
      title: "VI. Outcome-Based Education",
      cat: "outcome-based-education",
      items: [
        { text: "Programme Outcomes (POs)", slug: "programme-outcomes-pos" },
        { text: "Course Outcomes (COs)", slug: "course-outcomes-cos" },
        { text: "Programme Specific Outcomes (PSOs)", slug: "programme-specific-outcomes-psos" }
      ]
    },
    {
      title: "VII. Academic Quality Indicators",
      cat: "academic-quality-indicators",
      items: [
        { text: "Student–Teacher Ratio", slug: "student-teacher-ratio" },
        { text: "Internal Assessment & Evaluation", slug: "internal-assessment-evaluation" },
        { text: "Academic Performance Indicators", slug: "academic-performance-indicators" }
      ]
    }
  ];

  const academicsCol3 = {
    title: "III. Departments",
    cat: "departments",
    items: [
      { text: "1. Dept of Commerce", slug: "department-of-commerce" },
      { text: "2. BCA Applications", slug: "department-of-computer-applications-bca" },
      { text: "3. Computer Science & AI", slug: "department-of-computer-science-cs-artificial-intelligence" },
      { text: "4. Dept of Mathematics", slug: "department-of-mathematics" },
      { text: "5. Dept of Physics", slug: "department-of-physics" },
      { text: "6. Dept of Statistics", slug: "department-of-statistics" },
      { text: "7. Dept of Chemistry", slug: "department-of-chemistry" },
      { text: "8. Dept of Biotechnology", slug: "department-of-biotechnology" },
      { text: "9. Dept of Microbiology", slug: "department-of-microbiology" },
      { text: "10. Dept of Botany", slug: "department-of-botany" },
      { text: "11. Dept of MCA", slug: "department-of-mca" },
      { text: "12. Dept of MBA", slug: "department-of-mba" },
      { text: "13. Dept of English", slug: "department-of-english" },
      { text: "14. Oriental Languages", slug: "department-of-oriental-languages-telugu-sanskrit-hindi" }
    ]
  };

  return (
    <div ref={navContainerRef} className="w-full flex flex-col font-sans select-none relative">

      {/* ============================================================== */}
      {/* DESKTOP HEADER LAYOUT (Two Custom Single-Line Rows)            */}
      {/* ============================================================== */}

      {/* Row 1: Core Navigation (Home, About Us, Academics, etc.) */}
      <div
        className="hidden md:flex items-center justify-between text-[13px] lg:text-[14px] xl:text-[15px] font-medium relative w-full transition-all duration-200 z-30"
        style={{
          color: "#ffffff",
          fontFamily: "inherit",
          fontSize: "15px",
          fontWeight: 600,
          paddingTop: "var(--topnav-padding-y, 5px)",
          paddingBottom: "var(--topnav-padding-y, 5px)"
        }}
      >
        <nav
          className="flex items-center justify-between w-full max-w-[1460px] mx-auto text-inherit"
          style={{
            gap: "var(--topnav-spacing, 14px)",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit"
          }}
        >

          {/* 1. Home */}
          <Link href="/" onClick={() => setActiveMenu(null)} className="hover:opacity-80 transition-all duration-200 whitespace-nowrap text-inherit font-medium">
            Home
          </Link>

          {/* 2. About Us */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/about"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit About Us Page"
            >
              About Us
            </Link>

            {activeMenu === "about" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="About Us"
                  href="/about"
                  buttonText="Visit About Us Main Page"
                  icon={Building}
                  onNavigate={() => setActiveMenu(null)}
                />
                {aboutCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => {
                        const catSlug = toSlug(cat.title);
                        const itemSlug = toSlug(item);
                        const href = itemSlug === "strategic-development-plan"
                          ? "/strategic-plans-and-future-directions"
                          : itemSlug === "naac-peer-team"
                            ? "/naac-peer-team"
                            : `/about/${catSlug}/${itemSlug}`;
                        return (
                          <Link
                            key={idx}
                            href={href}
                            onClick={() => setActiveMenu(null)}
                            className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                          >
                            {item}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Academics */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("academics")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/academics"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Academics Page"
            >
              Academics
            </Link>

            {activeMenu === "academics" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-12 gap-8 cursor-default max-h-[75vh] overflow-y-auto animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("academics")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Academic Programmes & Departments"
                  href="/academics"
                  buttonText="Visit Academics Main Page"
                  icon={GraduationCap}
                  onNavigate={() => setActiveMenu(null)}
                />

                {/* Column 1: I and II */}
                <div className="md:col-span-4 flex flex-col gap-6">
                  {academicsCol1.map((cat, i) => (
                    <div key={i} className="flex flex-col gap-3 border-b border-slate-50 pb-4 last:border-0">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#002147]/5 text-[#002147] border border-[#002147]/10">
                          <GraduationCap className="h-3.5 w-3.5" />
                        </span>
                        <h4 className="font-outfit font-black text-slate-800 text-xs uppercase tracking-wider">{cat.title}</h4>
                      </div>
                      <div className="flex flex-col gap-1">
                        {cat.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/academics/${cat.cat}/${item.slug}`}
                            onClick={() => setActiveMenu(null)}
                            className="text-[11px] font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/70 px-2 py-1 rounded transition-all leading-snug"
                          >
                            {item.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 2: III Departments */}
                <div className="md:col-span-4 flex flex-col gap-4 bg-[#002147]/[0.02] border border-slate-100 rounded-2xl p-5">
                  <Link
                    href="/academics/departments"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2 pb-2 border-b border-[#002147]/10 hover:opacity-80 transition-opacity group cursor-pointer"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#002147] text-white">
                      <BookOpen className="h-3.5 w-3.5" />
                    </span>
                    <div className="flex items-center gap-1">
                      <h4 className="font-outfit font-black text-[#002147] text-xs uppercase tracking-wider">{academicsCol3.title}</h4>
                      <ArrowRight className="h-3 w-3 text-[#002147] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {academicsCol3.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={`/academics/${academicsCol3.cat}/${item.slug}`}
                        onClick={() => setActiveMenu(null)}
                        className="text-[10px] font-bold text-slate-600 hover:text-[#002147] hover:bg-white border border-transparent hover:border-slate-200/50 p-1.5 rounded transition-all truncate leading-snug"
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: IV, V, VI, VII */}
                <div className="md:col-span-4 flex flex-col gap-5">
                  {academicsCol2.map((cat, i) => (
                    <div key={i} className="flex flex-col gap-2 border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                          <Lightbulb className="h-3 w-3" />
                        </span>
                        <h4 className="font-outfit font-black text-slate-800 text-[10px] uppercase tracking-wider">{cat.title}</h4>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {cat.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/academics/${cat.cat}/${item.slug}`}
                            onClick={() => setActiveMenu(null)}
                            className="text-[11px] font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/70 px-2 py-1 rounded transition-all leading-snug"
                          >
                            {item.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* 4. Admissions */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("admissions")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/admissions"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Admissions Page"
            >
              Admissions
            </Link>

            {activeMenu === "admissions" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("admissions")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Admissions & Enrolment Portal"
                  href="/admissions"
                  buttonText="Visit Admissions Main Page"
                  icon={BookOpen}
                  onNavigate={() => setActiveMenu(null)}
                />
                {admissionsCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/admissions/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Infrastructure */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("infra")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/infrastructure"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Infrastructure Page"
            >
              Infrastructure
            </Link>

            {activeMenu === "infra" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("infra")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Campus Infrastructure & Facilities"
                  href="/infrastructure"
                  buttonText="Visit Infrastructure Main Page"
                  icon={Building}
                  onNavigate={() => setActiveMenu(null)}
                />
                {infraCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/infrastructure/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Faculty */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("faculty")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/faculty"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Faculty Page"
            >
              Faculty
            </Link>

            {activeMenu === "faculty" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("faculty")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Faculty & Academic Staff Directory"
                  href="/faculty"
                  buttonText="Visit Faculty Main Page"
                  icon={Users}
                  onNavigate={() => setActiveMenu(null)}
                />
                {facultyCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/faculty/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. Student Support Services */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("support")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/student-support"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Student Support Page"
            >
              Student Support Services
            </Link>

            {activeMenu === "support" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("support")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Student Support & Services Portal"
                  href="/student-support"
                  buttonText="Visit Student Support Main Page"
                  icon={HeartHandshake}
                  onNavigate={() => setActiveMenu(null)}
                />
                {supportCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/student-support/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 8. Placements & Industry Linkages */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("placements")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/placements"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Placements Page"
            >
              Placements & Industry Linkages
            </Link>

            {activeMenu === "placements" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("placements")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {placementsCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/placements/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </nav>
      </div>

      {/* Row 2: Compliance, Research, & Utility Bar */}
      {/* Contains: Alumni, IQAC, Mandatory Disclosures, Research & Innovation, Strategic Plans, Contact */}
      <div
        className={`hidden md:flex items-center justify-between border-t text-[13px] lg:text-[14px] xl:text-[15px] font-medium relative w-full transition-all duration-200 ${activeMenu && ['research','alumni','iqac','mandatory','strategic','contact'].includes(activeMenu) ? 'z-40' : 'z-20'}`}
        style={{
          borderColor: "var(--topnav-divider, rgba(255, 255, 255, 0.15))",
          color: "var(--topnav-row2-color, var(--topnav-link-color, #ffffff))",
          fontFamily: "inherit",
          fontSize: "15px",
          fontWeight: 500,
          paddingTop: "calc(var(--topnav-padding-y, 4px) * 0.75)",
          paddingBottom: "calc(var(--topnav-padding-y, 4px) * 0.75)"
        }}
      >
        <nav
          className="flex items-center justify-between w-full max-w-[1460px] mx-auto text-inherit"
          style={{
            gap: "var(--topnav-spacing, 14px)",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit"
          }}
        >


          {/* Research & Innovation (Moved here to balance Row 1 & Row 2 spacing perfectly!) */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("research")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/research-innovation"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Research & Innovation Page"
            >
              Research & Innovation
            </Link>

            {activeMenu === "research" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[80vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("research")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {researchCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <Link
                        href={cat.href}
                        onClick={() => setActiveMenu(null)}
                        className="font-outfit font-black text-slate-800 text-sm leading-tight hover:text-[#002147] transition-colors"
                      >
                        {cat.fullTitle || cat.title}
                      </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


          {/* 10. Alumni */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("alumni")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/alumni"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Alumni Page"
            >
              Alumni
            </Link>

            {activeMenu === "alumni" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("alumni")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {alumniCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <Link
                      href={cat.href}
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-2 border-b border-slate-100 pb-2.5 group/header hover:text-blue-900 transition-colors"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#002147]/5 border border-[#002147]/10 text-[#002147] group-hover/header:bg-[#002147] group-hover/header:text-white transition-all">
                        <cat.icon className="h-3.5 w-3.5" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-xs sm:text-sm leading-tight group-hover/header:text-[#002147]">
                        {cat.title}
                      </h4>
                    </Link>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/80 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group/link"
                        >
                          <span>{item.text}</span>
                          <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-blue-600 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 11. IQAC, Quality Assurance & Accreditation */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("iqac")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/quality-assurance"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Quality Assurance Page"
            >
              Quality Assurance & Accreditation
            </Link>

            {activeMenu === "iqac" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("iqac")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Internal Quality Assurance Cell (IQAC)"
                  href="/quality-assurance"
                  buttonText="Visit IQAC Main Page"
                  icon={ShieldCheck}
                  onNavigate={() => setActiveMenu(null)}
                />
                {iqacCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 12. Mandatory Disclosures & Compliance */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("mandatory")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/mandatory-disclosures"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Mandatory Disclosures Page"
            >
              Mandatory Disclosures & Compliance
            </Link>

            {activeMenu === "mandatory" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[80vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("mandatory")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {mandatoryCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <Link
                        href={cat.href}
                        onClick={() => setActiveMenu(null)}
                        className="font-outfit font-black text-slate-800 text-sm leading-tight hover:text-[#002147] transition-colors"
                      >
                        {cat.fullTitle || cat.title}
                      </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 13. Strategic Plans & Future Directions */}
          <div
            className="flex items-center group/nav"
            onMouseEnter={() => handleMouseEnter("strategic")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/strategic-plans-and-future-directions"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
              title="Visit Strategic Plans Page"
            >
              Strategic Plans & Future Directions
            </Link>

            {activeMenu === "strategic" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[80vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onMouseEnter={() => handleMouseEnter("strategic")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {strategicCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <Link
                        href={cat.href}
                        onClick={() => setActiveMenu(null)}
                        className="font-outfit font-black text-slate-800 text-sm leading-tight hover:text-[#002147] transition-colors"
                      >
                        {cat.fullTitle || cat.title}
                      </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 14. Contact Us (Direct Link) */}
          <Link
            href="/contact"
            onClick={() => setActiveMenu(null)}
            className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none"
            title="Visit Contact Us Page"
          >
            Contact Us
          </Link>

        </nav>
      </div>

      {/* ============================================================== */}
      {/* MOBILE RESPONSIVE DRAWER & TRIGGER                             */}
      {/* ============================================================== */}

      {/* Mobile Top Header (Visible only on mobile screens when sticky nav is active) */}
      <div
        className="flex md:hidden items-center justify-between h-14 w-full select-none relative z-40 px-4 transition-colors duration-200 border-b border-white/10"
        style={{ backgroundColor: "#001738" }}
      >
        <Link
          href="/"
          className="font-outfit font-black text-base uppercase tracking-tight leading-none text-white"
        >
          St. Ann&apos;s College
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all cursor-pointer text-white"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Navigation Overlay & Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex select-none animate-fadeIn">
          {/* Transparent Backdrop */}
          <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />

          {/* Sliding Drawer Container */}
          <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col h-full overflow-hidden border-l border-slate-100 animate-slideIn">

            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0 bg-slate-50/40">
              <span className="font-outfit font-black text-sm text-[#002147] uppercase tracking-wider">Navigation Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Navigation Items */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2">

              {/* Primary Direct Links */}
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide">
                <span>1. Home</span>
              </Link>

              {/* 2. About Us Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMAbout(!mAbout)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>2. About Us</span>
                  {mAbout ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mAbout && (
                  <div className="flex flex-col gap-4 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/about"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit About Us Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {aboutCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider border-b border-slate-50 pb-1">{cat.title}</span>
                        {cat.items.map((item, idx) => {
                          const itemSlug = toSlug(item);
                          const href = itemSlug === "strategic-development-plan"
                            ? "/strategic-plans-and-future-directions"
                            : itemSlug === "naac-peer-team"
                              ? "/naac-peer-team"
                              : `/about/${toSlug(cat.title)}/${itemSlug}`;
                          return (
                            <Link
                              key={idx}
                              href={href}
                              onClick={() => setMobileOpen(false)}
                              className="text-xs font-semibold text-slate-500 hover:text-[#002147] py-1"
                            >
                              • {item}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Academics Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMAcademics(!mAcademics)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>3. Academics</span>
                  {mAcademics ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mAcademics && (
                  <div className="flex flex-col gap-4 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/academics"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Academics Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Academic Programmes</span>
                      {academicsCol1[0].items.map((item, idx) => (
                        <Link key={idx} href={`/academics/academic-programmes/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Academic Planning</span>
                      {academicsCol1[1].items.map((item, idx) => (
                        <Link key={idx} href={`/academics/curriculum-academic-planning/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Departments</span>
                      <div className="grid grid-cols-1 gap-1">
                        {academicsCol3.items.map((item, idx) => (
                          <Link key={idx} href={`/academics/departments/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-[11px] font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Admissions Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMAdmissions(!mAdmissions)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>4. Admissions</span>
                  {mAdmissions ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mAdmissions && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/admissions"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Admissions Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {admissionsCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/admissions/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Infrastructure Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMInfra(!mInfra)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>5. Infrastructure</span>
                  {mInfra ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mInfra && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/infrastructure"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Infrastructure Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {infraCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/infrastructure/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. Faculty Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMFaculty(!mFaculty)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>6. Faculty</span>
                  {mFaculty ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mFaculty && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/faculty"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Faculty Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {facultyCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/faculty/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 7. Student Support Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMSupport(!mSupport)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>7. Student Support Services</span>
                  {mSupport ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mSupport && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/student-support"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Student Support Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {supportCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/student-support/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 8. Placements Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMPlacements(!mPlacements)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>8. Placements & Industry Linkages</span>
                  {mPlacements ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mPlacements && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/placements"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Placements Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {placementsCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/placements/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 9. Research Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMResearch(!mResearch)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>9. Research & Innovation</span>
                  {mResearch ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mResearch && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/research-innovation"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Research Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {researchCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <Link
                          href={cat.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[10px] font-black uppercase text-[#002147] tracking-wider hover:underline"
                        >
                          {cat.fullTitle || cat.title}
                        </Link>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 10. Alumni Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMAlumni(!mAlumni)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>10. Alumni</span>
                  {mAlumni ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mAlumni && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/alumni"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Alumni Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {alumniCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 11. IQAC Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMIqac(!mIqac)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>11. IQAC & Accreditation</span>
                  {mIqac ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mIqac && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/quality-assurance"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit IQAC Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {iqacCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 12. Mandatory Disclosures Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMMandatory(!mMandatory)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>12. Mandatory Disclosures</span>
                  {mMandatory ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mMandatory && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/mandatory-disclosures"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Disclosures Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {mandatoryCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 13. Strategic Plans Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMStrategic(!mStrategic)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>13. Strategic Plans</span>
                  {mStrategic ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mStrategic && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    {strategicCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <Link
                          href={cat.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[10px] font-black uppercase text-[#002147] tracking-wider hover:underline"
                        >
                          {cat.fullTitle || cat.title}
                        </Link>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 14. Contact Us (Direct Link) */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>14. Contact Us</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>

            </div>

            {/* Apply Now in mobile drawer footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/40 shrink-0 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-admission-enquiry"));
                  }
                }}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-bold text-white text-xs tracking-wider uppercase hover:shadow-xl hover:shadow-emerald-600/20 transition-all duration-300 cursor-pointer border border-emerald-400/30"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
