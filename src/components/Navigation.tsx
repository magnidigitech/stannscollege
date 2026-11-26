"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ChevronDown,
  FlaskConical,
  Rocket,
  Compass,
  Building2,
  Presentation,
  Cpu,
  Home,
  UtensilsCrossed,
  HeartPulse,
  Dumbbell,
  Music,
  ShieldAlert,
  Leaf,
  Accessibility,
  Sparkles
} from "lucide-react";

export function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/^(i+|v+)\.\s*/, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


export default function Navigation() {
  const pathname = usePathname();
  // Desktop Menu Click State
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // If the clicked target was unmounted/detached during React re-render, ignore
      if (!target || !document.body.contains(target)) return;

      // Ignore clicks on menu trigger buttons or inside active dropdowns
      if (target.closest("[data-nav-item]") || target.closest("[data-nav-dropdown]")) {
        return;
      }

      setActiveMenu(null);
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

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
      title: "1. Quality Framework",
      fullTitle: "1. Quality Framework & Accreditations",
      icon: ShieldCheck,
      href: "/quality-assurance",
      items: [
        { text: "About IQAC Cell", href: "/quality-assurance/iqac" },
        { text: "AQAR Annual Quality Reports", href: "/quality-assurance/aqar" },
        { text: "NAAC Accreditation (A+ Grade)", href: "/quality-assurance/naac" },
        { text: "NAAC Peer Team Portal", href: "/naac-peer-team" },
      ]
    },
    {
      title: "2. Quality Processes",
      fullTitle: "2. Quality Initiatives & Audits",
      icon: Lightbulb,
      href: "/quality-assurance/quality-initiatives",
      items: [
        { text: "Quality Initiatives & Benchmarks", href: "/quality-assurance/quality-initiatives" },
        { text: "Academic & Administrative Audit (AAA)", href: "/quality-assurance/audit" },
        { text: "Feedback System & Action Taken", href: "/quality-assurance/feedback" },
      ]
    },
    {
      title: "3. Evaluation & Media",
      fullTitle: "3. Surveys, Gallery & Contact",
      icon: BookOpen,
      href: "/quality-assurance/gallery",
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
      title: "1. Programmes & Eligibility",
      fullTitle: "1. Programmes & Eligibility",
      icon: GraduationCap,
      href: "/admissions/programmes-eligibility",
      items: [
        { text: "Programmes Offered (UG & PG)", href: "/admissions/programmes-offered" },
        { text: "Eligibility Criteria & Requirements", href: "/admissions/eligibility-criteria" },
        { text: "Approved Intake & Seat Matrix", href: "/admissions/programmes-eligibility" },
        { text: "Fee Structure & Scholarships", href: "/admissions/programmes-eligibility" },
      ]
    },
    {
      title: "2. Admission Policy & Process",
      fullTitle: "2. Admission Policy & Process",
      icon: ShieldCheck,
      href: "/admissions/admission-policy-process",
      items: [
        { text: "Admission Policy Framework", href: "/admissions/admission-policy-process" },
        { text: "Application Process & Guidelines", href: "/admissions/admission-policy-process" },
        { text: "Required Documents Checklist", href: "/admissions/admission-policy-process" },
        { text: "Rules & Code of Conduct", href: "/admissions/admission-policy-process" },
      ]
    },
    {
      title: "3. Prospectus & Brochures",
      fullTitle: "3. Prospectus & Brochures",
      icon: BookOpen,
      href: "/admissions/prospectus-brochures",
      items: [
        { text: "College Prospectus (Digital)", href: "/admissions/prospectus-brochures" },
        { text: "Department Course Pamphlets", href: "/admissions/prospectus-brochures" },
        { text: "Student Handbook & Guidelines", href: "/admissions/prospectus-brochures" },
        { text: "Academic Information Brochures", href: "/admissions/prospectus-brochures" },
      ]
    },
    {
      title: "4. Helpdesk & Statutory Records",
      fullTitle: "4. Helpdesk & Statutory Records",
      icon: Phone,
      href: "/admissions/admission-desk",
      items: [
        { text: "Admission Helpdesk & Desk Info", href: "/admissions/admission-desk" },
        { text: "Helpline Numbers & Office Timings", href: "/admissions/admission-desk" },
        { text: "Statutory Admission Records (Table 3)", href: "/admissions/admission-information" },
        { text: "Sanctioned vs Enrolled Statistics", href: "/admissions/admission-information" },
      ]
    }
  ];

  const infraColumns = [
    [
      {
        title: "Academic & Campus Infra",
        icon: Building2,
        items: [
          { text: "1. Campus & Buildings", slug: "campus-buildings" },
          { text: "2. Classrooms", slug: "classrooms" },
          { text: "3. Library & Info Centre", slug: "library" },
          { text: "4. ICT & Digital Infra", slug: "ict-digital" },
        ]
      }
    ],
    [
      {
        title: "Laboratories & Skills",
        icon: FlaskConical,
        items: [
          { text: "5. Laboratories", slug: "laboratories" },
          { text: "6. Skill Development Centre", slug: "skill-development" },
          { text: "7. Hostel", slug: "hostel" },
          { text: "8. Canteen", slug: "canteen" },
        ]
      }
    ],
    [
      {
        title: "Student Support & Amenities",
        icon: HeartPulse,
        items: [
          { text: "9. Health Centre", slug: "health-centre" },
          { text: "10. Sports, Games & Gym", slug: "sports-games" },
          { text: "11. Cultural & Recreation", slug: "cultural-recreation" },
        ]
      }
    ],
    [
      {
        title: "Safety & Sustainability",
        icon: ShieldAlert,
        items: [
          { text: "12. Safety & Disaster Mgmt", slug: "safety-security" },
          { text: "13. Green Campus Initiatives", slug: "green-campus" },
          { text: "14. Barrier-Free Access", slug: "inclusive-access" },
        ]
      }
    ]
  ];

  const supportCategories = [
    {
      title: "1. Support & Welfare Services",
      fullTitle: "1. Support & Welfare Services",
      icon: HeartHandshake,
      href: "/student-support/anti-ragging",
      items: [
        { text: "Anti-Ragging Committee", href: "/student-support/anti-ragging" },
        { text: "Grievance Redressal / Ombudsperson", href: "/student-support/grievance-redressal" },
        { text: "Internal Complaints Committee (ICC)", href: "/student-support/internal-complaints" },
        { text: "Women Empowerment Cell", href: "/student-support/women-empowerment" },
        { text: "Equal Opportunity (SC/ST/Minority)", href: "/student-support/equal-opportunity" },
        { text: "Student Counselling Cell", href: "/student-support/student-counselling" },
        { text: "Mentor–Mentee System", href: "/student-support/mentor-mentee" },
        { text: "Parent Association", href: "/student-support/parent-association" },
        { text: "Student Welfare & Scholarships", href: "/student-support/scholarships-welfare" },
        { text: "Support for Divyangjan Students", href: "/student-support/divyangjan-support" },
        { text: "Student Feedback & Satisfaction", href: "/student-support/student-feedback" },
      ]
    },
    {
      title: "2. Sports & Games",
      fullTitle: "2. Sports & Games",
      icon: Trophy,
      href: "/student-support/sports-facilities",
      items: [
        { text: "Sports Facilities & Playing Areas", href: "/student-support/sports-facilities" },
        { text: "Intramural Sports Competitions", href: "/student-support/sports-competitions" },
        { text: "Inter-Collegiate Tournaments", href: "/student-support/sports-achievements" },
        { text: "University / State / National Level", href: "/student-support/sports-achievements" },
        { text: "Self-Defense & Personal Safety", href: "/student-support/self-defense-safety" },
        { text: "Fitness, Yoga & Wellness", href: "/student-support/fitness-wellness" },
        { text: "Sports Reports & Gallery", href: "/student-support/sports-gallery" },
      ]
    },
    {
      title: "3. Extension & Outreach",
      fullTitle: "3. Extension & Outreach",
      icon: Flag,
      href: "/student-support/nss-activities",
      items: [
        { text: "National Service Scheme (NSS)", href: "/student-support/nss-activities" },
        { text: "National Cadet Corps (NCC)", href: "/student-support/ncc-activities" },
        { text: "Red Ribbon Club (RRC)", href: "/student-support/red-ribbon-club" },
        { text: "Mother Gnanamma Outreach", href: "/student-support/mother-gnanamma" },
        { text: "Eco Club & Environment", href: "/student-support/eco-club" },
        { text: "Community Outreach (UBA)", href: "/student-support/unnat-bharat-abhiyan" },
      ]
    },
    {
      title: "4. Workshops & Seminars",
      fullTitle: "4. Workshops & Seminars",
      icon: Compass,
      href: "/student-support/workshops-seminars",
      items: [
        { text: "Workshops & Skill Seminars", href: "/student-support/workshops-seminars" },
      ]
    },
    {
      title: "5. Student Laurels & Ranks",
      fullTitle: "5. Student Laurels & Ranks",
      icon: Award,
      href: "/student-support/student-achievements",
      items: [
        { text: "Student Laurels & University Ranks", href: "/student-support/student-achievements" },
      ]
    }
  ];

  const facultyCategories = [
    {
      title: "A. Teaching Faculty",
      icon: Users,
      href: "/faculty/teaching-staff",
      items: [
        { text: "1. Teaching Staff Directory", slug: "teaching-staff" },
      ]
    },
    {
      title: "B. Department-Wise Faculty",
      icon: Building,
      href: "/faculty/department-wise",
      items: [
        { text: "1. Academic Departments & Profiles", slug: "department-wise" },
      ]
    },
    {
      title: "C. Non-Teaching Staff",
      icon: Users,
      href: "/faculty/non-teaching-staff",
      items: [
        { text: "1. Administrative Staff", slug: "non-teaching-staff" },
        { text: "2. Laboratory & Technical Support Staff", slug: "non-teaching-staff" },
        { text: "3. Contingent Staff", slug: "non-teaching-staff" },
      ]
    },
    {
      title: "D. Visiting / Adjunct Faculty",
      icon: GraduationCap,
      href: "/faculty/visiting-professors",
      items: [
        { text: "1. Visiting & Adjunct Scholars", slug: "visiting-professors" },
      ]
    },
    {
      title: "E. Faculty Recruitment & Selection",
      icon: FileCheck,
      href: "/faculty/recruitment-policy",
      items: [
        { text: "1. Recruitment Policy & Process", slug: "recruitment-policy" },
      ]
    },
    {
      title: "F. Faculty Development (FDP)",
      icon: Award,
      href: "/faculty/faculty-development",
      items: [
        { text: "1. FDP Reports & Certificates", slug: "faculty-development" },
      ]
    },
    {
      title: "G. Faculty Achievements",
      icon: Trophy,
      href: "/faculty/faculty-achievements",
      items: [
        { text: "1. Honors, Awards & Publications", slug: "faculty-achievements" },
      ]
    },
    {
      title: "H. Faculty Exchange & Academic Mobility",
      icon: Globe2,
      href: "/faculty/faculty-exchange",
      items: [
        { text: "1. Faculty Exchange & Collaborations", slug: "faculty-exchange" },
      ]
    },
    {
      title: "I. Faculty Performance Appraisal (ASAR)",
      icon: ShieldCheck,
      href: "/faculty/performance-appraisal",
      items: [
        { text: "1. 360° Appraisal & ASAR", slug: "performance-appraisal" },
      ]
    },
    {
      title: "J. Faculty Welfare & Support",
      icon: HeartHandshake,
      href: "/faculty/faculty-welfare",
      items: [
        { text: "1. Welfare Schemes & Benefits", slug: "faculty-welfare" },
      ]
    },
    {
      title: "K. Faculty & Staff Gallery",
      icon: ImageIcon,
      href: "/faculty/faculty-gallery",
      items: [
        { text: "1. Photo & Video Gallery", slug: "faculty-gallery" },
      ]
    }
  ];

  const facultyColumns = [
    // Column 1: A, B, C
    [facultyCategories[0], facultyCategories[1], facultyCategories[2]],
    // Column 2: D, E, F
    [facultyCategories[3], facultyCategories[4], facultyCategories[5]],
    // Column 3: G, H, I
    [facultyCategories[6], facultyCategories[7], facultyCategories[8]],
    // Column 4: J, K
    [facultyCategories[9], facultyCategories[10]]
  ];

  const placementsCategories = [
    {
      title: "1. Training & Placement Cell",
      fullTitle: "1. Training & Placement Cell",
      icon: Briefcase,
      href: "/placements/about-cell",
      items: [
        { text: "About Training & Placement Cell", href: "/placements/about-cell" },
        { text: "Placements & Recruitment", href: "/placements/placements-recruitment" },
        { text: "APSSDC Skill Programs", href: "/placements/apssdc" },
        { text: "Skill Development Training Areas", href: "/placements/skill-development-areas" },
        { text: "Internships & Industry Exposure", href: "/placements/internships-industry-exposure" },
        { text: "Competitive Exam Coaching", href: "/placements/competitive-exam-coaching" }
      ]
    },
    {
      title: "2. Industry Linkages & MoUs",
      fullTitle: "2. Industry Linkages & MoUs",
      icon: Handshake,
      href: "/placements/industry-professional-engagement",
      items: [
        { text: "Industry & Professional Engagement", href: "/placements/industry-professional-engagement" },
        { text: "MoUs – Memoranda of Understanding", href: "/placements/mous" }
      ]
    },
    {
      title: "3. Global Outreach",
      fullTitle: "3. International Collaborations",
      icon: Globe2,
      href: "/placements/international-collaborations-global-engagement",
      items: [
        { text: "International Collaborations & Global Engagement", href: "/placements/international-collaborations-global-engagement" }
      ]
    }
  ];

  const aboutCategories = [
    {
      title: "A. The Institution",
      fullTitle: "A. The Institution",
      icon: Building,
      href: "/about/the-institution/basic-institutional-information",
      items: [
        { text: "Basic Institutional Information", href: "/about/the-institution/basic-institutional-information" },
        { text: "History & Milestones", href: "/about/the-institution/history-of-the-college" },
        { text: "Emblem, Motto, Tagline, Vision, Mission & Core Values", href: "/about/the-institution/vision-mission-and-core-values" },
        { text: "Institutional Awards & Recognitions", href: "/about/the-institution/institutional-awards-recognitions" },
        { text: "Student Achievements & Laurels", href: "/about/the-institution/student-laurels" },
        { text: "Head of the Institution", href: "/about/the-institution/head-of-the-institution" },
        { text: "Legacy of Leadership", href: "/about/the-institution/legacy-of-leadership" },
      ]
    },
    {
      title: "B. Affiliations & Recognitions",
      fullTitle: "B. Affiliations, Approvals, Accreditation & Recognitions",
      icon: ShieldCheck,
      href: "/about/statutory-affiliations-recognitions",
      items: [
        { text: "Affiliated to Acharya Nagarjuna University (ANU)", href: "/about/statutory-affiliations-recognitions#anu" },
        { text: "Approved by AICTE", href: "/about/statutory-affiliations-recognitions#aicte" },
        { text: "Recognised by UGC under Section 2(f)", href: "/about/statutory-affiliations-recognitions#ugc" },
        { text: "Accredited by NAAC", href: "/about/statutory-affiliations-recognitions#naac" },
        { text: "View Detailed Statutory Disclosures →", href: "/mandatory-disclosures" },
      ]
    },
    {
      title: "C. Governance & Administration",
      fullTitle: "C. Governance & Administration",
      icon: Users,
      href: "/about/governance-administration/governing-body",
      items: [
        { text: "Governing Body", href: "/about/governance-administration/governing-body" },
        { text: "Organogram", href: "/about/governance-administration/organogram" },
        { text: "Key Functionaries", href: "/about/governance-administration/key-functionaries" },
        { text: "Statutory & Non-Statutory Committees", href: "/about/governance-administration/statutory-non-statutory-committees" },
        { text: "Institutional Policies", href: "/about/governance-administration/institutional-policies" },
        { text: "Strategic Development Plan", href: "/strategic-plans-and-future-directions" },
        { text: "Code of Conduct", href: "/about/governance-administration/code-of-conduct" },
      ]
    }
  ];

  const academicsCategories = [
    {
      title: "A. Academic Programmes",
      fullTitle: "A. Academic Programmes",
      icon: GraduationCap,
      href: "/academics/academic-programmes/undergraduate-programmes",
      items: [
        { text: "Undergraduate (UG) Programmes", href: "/academics/academic-programmes/undergraduate-programmes" },
        { text: "Postgraduate (PG) Programmes", href: "/academics/academic-programmes/postgraduate-programmes" }
      ]
    },
    {
      title: "B. Academic Regulations & Resources",
      fullTitle: "B. Academic Regulations & Resources",
      icon: BookOpen,
      href: "/academics/curriculum-academic-planning/academic-calendar",
      items: [
        { text: "Academic Calendar", href: "/academics/curriculum-academic-planning/academic-calendar" },
        { text: "Time Tables", href: "/academics/curriculum-academic-planning/timetables" },
        { text: "Curriculum & Syllabus", href: "/academics/curriculum-academic-planning/curriculum-syllabus" },
        { text: "Academic Regulations", href: "/academics/curriculum-academic-planning/academic-regulations" },
        { text: "ILMS – Integrated Learning Management System", href: "/academics/curriculum-academic-planning/ilms-system" }
      ]
    },
    {
      title: "C. Departments",
      fullTitle: "C. Departments",
      icon: Building2,
      href: "/academics/departments",
      items: []
    },
    {
      title: "D. Teaching & Learning",
      fullTitle: "D. Teaching & Learning",
      icon: Lightbulb,
      href: "/academics/teaching-learning/teaching-learning-practices",
      items: [
        { text: "Teaching-Learning Practices", href: "/academics/teaching-learning/teaching-learning-practices" },
        { text: "Innovative Teaching Practices", href: "/academics/teaching-learning/innovative-teaching-practices" },
        { text: "Experiential & Participative Learning", href: "/academics/teaching-learning/experiential-participative-learning" },
        { text: "ICT-Enabled Teaching", href: "/academics/teaching-learning/ict-enabled-teaching" },
        { text: "Student-Centric Learning", href: "/academics/teaching-learning/student-centric-learning" }
      ]
    },
    {
      title: "E. Examination & Evaluation",
      fullTitle: "E. Examination & Evaluation",
      icon: Award,
      href: "/academics/examination-evaluation/examination-system",
      items: [
        { text: "Examination System", href: "/academics/examination-evaluation/examination-system" },
        { text: "Continuous Internal Assessment (CIA)", href: "/academics/examination-evaluation/continuous-internal-assessment" },
        { text: "University Examinations", href: "/academics/examination-evaluation/university-examinations" },
        { text: "Results & Performance", href: "/academics/examination-evaluation/results-performance" },
        { text: "Examination Regulations", href: "/academics/examination-evaluation/examination-regulations" }
      ]
    },
    {
      title: "F. Academic Enrichment",
      fullTitle: "F. Academic Enrichment",
      icon: Sparkles,
      href: "/academics/academic-enrichment/value-added-courses",
      items: [
        { text: "Value-Added Courses", href: "/academics/academic-enrichment/value-added-courses" },
        { text: "Certificate Courses", href: "/academics/academic-enrichment/certificate-courses" },
        { text: "Skill Development Programmes", href: "/academics/academic-enrichment/skill-development-programmes" },
        { text: "Guest Lectures & Workshops", href: "/academics/academic-enrichment/guest-lectures-workshops" },
        { text: "Seminars & Conferences", href: "/academics/academic-enrichment/seminars-conferences" },
        { text: "Academic Collaborations", href: "/academics/academic-enrichment/academic-collaborations" }
      ]
    },
    {
      title: "G. Academic Quality & Outcomes",
      fullTitle: "G. Academic Quality & Outcomes",
      icon: ShieldCheck,
      href: "/academics/academic-quality-outcomes/programme-outcomes",
      items: [
        { text: "Programme Outcomes (POs)", href: "/academics/academic-quality-outcomes/programme-outcomes" },
        { text: "Programme Specific Outcomes (PSOs)", href: "/academics/academic-quality-outcomes/programme-specific-outcomes" },
        { text: "Course Outcomes (COs)", href: "/academics/academic-quality-outcomes/course-outcomes" },
        { text: "CO–PO/PSO Mapping", href: "/academics/academic-quality-outcomes/co-po-pso-mapping" },
        { text: "Attainment of Outcomes", href: "/academics/academic-quality-outcomes/attainment-of-outcomes" },
        { text: "Academic Audit", href: "/academics/academic-quality-outcomes/academic-audit" }
      ]
    }
  ];

  const academicsColumns = [
    // Column 1: A & B
    [academicsCategories[0], academicsCategories[1]],
    // Column 2: C & D
    [academicsCategories[2], academicsCategories[3]],
    // Column 3: E & F
    [academicsCategories[4], academicsCategories[5]],
    // Column 4: G
    [academicsCategories[6]]
  ];

  const getActiveSectionInfo = () => {
    if (pathname.startsWith("/about")) {
      return {
        title: "About Us",
        badge: "In this Section: About Us",
        groups: [
          {
            title: "A. The Institution",
            items: [
              { name: "Basic Institutional Information", href: "/about/the-institution/basic-institutional-information" },
              { name: "History & Milestones", href: "/about/the-institution/history-of-the-college" },
              { name: "Vision, Mission & Core Values", href: "/about/the-institution/vision-mission-and-core-values" },
              { name: "Awards & Recognitions", href: "/about/the-institution/institutional-awards-recognitions" },
              { name: "Student Laurels", href: "/about/the-institution/student-laurels" },
              { name: "Head of Institution", href: "/about/the-institution/head-of-the-institution" },
              { name: "Legacy of Leadership", href: "/about/the-institution/legacy-of-leadership" },
            ]
          },
          {
            title: "B. Affiliations & Recognitions",
            items: [
              { name: "Affiliated to ANU", href: "/about/statutory-affiliations-recognitions#anu" },
              { name: "Approved by AICTE", href: "/about/statutory-affiliations-recognitions#aicte" },
              { name: "Recognised under UGC 2(f)", href: "/about/statutory-affiliations-recognitions#ugc" },
              { name: "Accredited by NAAC", href: "/about/statutory-affiliations-recognitions#naac" },
            ]
          },
          {
            title: "C. Governance & Administration",
            items: [
              { name: "Governing Body", href: "/about/governance-administration/governing-body" },
              { name: "Organogram", href: "/about/governance-administration/organogram" },
              { name: "Key Functionaries", href: "/about/governance-administration/key-functionaries" },
              { name: "Committees", href: "/about/governance-administration/statutory-non-statutory-committees" },
              { name: "Institutional Policies", href: "/about/governance-administration/institutional-policies" },
              { name: "Strategic Development Plan", href: "/strategic-plans-and-future-directions" },
              { name: "Code of Conduct", href: "/about/governance-administration/code-of-conduct" },
            ]
          }
        ]
      };
    }

    if (pathname.startsWith("/academics")) {
      return {
        title: "Academics",
        badge: "In this Section: Academics",
        groups: [
          {
            title: "A. Programmes",
            items: [
              { name: "Undergraduate (UG) Programmes", href: "/academics/academic-programmes/undergraduate-programmes" },
              { name: "Postgraduate (PG) Programmes", href: "/academics/academic-programmes/postgraduate-programmes" },
            ]
          },
          {
            title: "B. Regulations & Resources",
            items: [
              { name: "Academic Calendar", href: "/academics/curriculum-academic-planning/academic-calendar" },
              { name: "Time Tables", href: "/academics/curriculum-academic-planning/timetables" },
              { name: "Curriculum & Syllabus", href: "/academics/curriculum-academic-planning/curriculum-syllabus" },
              { name: "Academic Regulations", href: "/academics/curriculum-academic-planning/academic-regulations" },
              { name: "ILMS – LMS System", href: "/academics/curriculum-academic-planning/ilms-system" },
            ]
          },
          {
            title: "C. Academic Departments",
            items: [
              { name: "View All Departments (Hub)", href: "/academics/departments" },
              { name: "Dept. of Commerce", href: "/academics/departments/department-of-commerce" },
              { name: "BCA – Computer Applications", href: "/academics/departments/department-of-bca" },
              { name: "Computer Science", href: "/academics/departments/department-of-computer-science" },
              { name: "Artificial Intelligence (AI)", href: "/academics/departments/department-of-artificial-intelligence" },
              { name: "Dept. of Mathematics", href: "/academics/departments/department-of-mathematics" },
              { name: "Dept. of Physics", href: "/academics/departments/department-of-physics" },
              { name: "Dept. of Chemistry", href: "/academics/departments/department-of-chemistry" },
              { name: "Dept. of MCA", href: "/academics/departments/department-of-mca" },
              { name: "Dept. of MBA", href: "/academics/departments/department-of-mba" },
              { name: "Dept. of English", href: "/academics/departments/department-of-english" },
            ]
          }
        ]
      };
    }

    if (pathname.startsWith("/admissions")) {
      return {
        title: "Admissions",
        badge: "In this Section: Admissions",
        groups: [
          {
            title: "Admissions Directory",
            items: [
              { name: "Admissions Overview & Guidelines", href: "/admissions" },
              { name: "Programmes Offered & Intake", href: "/admissions#programmes" },
              { name: "Eligibility Criteria", href: "/admissions#eligibility" },
              { name: "Fee Structure", href: "/admissions#fee-structure" },
              { name: "Application Procedures", href: "/admissions#procedure" },
              { name: "Scholarships & Financial Aid", href: "/admissions#scholarships" },
              { name: "Helpdesk & Enquiry Desk", href: "/admissions#contact" },
            ]
          }
        ]
      };
    }

    if (pathname.startsWith("/quality-assurance")) {
      return {
        title: "Quality Assurance",
        badge: "In this Section: Quality Assurance (IQAC)",
        groups: [
          {
            title: "IQAC Directory",
            items: [
              { name: "IQAC Overview", href: "/quality-assurance" },
              { name: "NAAC Accreditation & SSR", href: "/quality-assurance#naac" },
              { name: "NIRF Reports", href: "/quality-assurance#nirf" },
              { name: "AQAR Annual Reports", href: "/quality-assurance#aqar" },
              { name: "IQAC Composition", href: "/quality-assurance#composition" },
              { name: "Quality Initiatives", href: "/quality-assurance#initiatives" },
            ]
          }
        ]
      };
    }

    if (pathname.startsWith("/infrastructure")) {
      return {
        title: "Infrastructure",
        badge: "In this Section: Infrastructure",
        groups: [
          {
            title: "Infrastructure Facilities",
            items: [
              { name: "Campus Overview", href: "/infrastructure" },
              { name: "Laboratories & Equipment", href: "/infrastructure#labs" },
              { name: "Central Library", href: "/infrastructure#library" },
              { name: "Sports & Fitness", href: "/infrastructure#sports" },
              { name: "Hostel & Dining", href: "/infrastructure#hostel" },
            ]
          }
        ]
      };
    }

    if (pathname.startsWith("/placements")) {
      return {
        title: "Placements",
        badge: "In this Section: Placements",
        groups: [
          {
            title: "TPO & Career Cell",
            items: [
              { name: "Placements Overview", href: "/placements" },
              { name: "Recruiters & Partners", href: "/placements#recruiters" },
              { name: "Placement Records & Statistics", href: "/placements#statistics" },
              { name: "TPO Desk & Contact", href: "/placements#contact" },
            ]
          }
        ]
      };
    }

    if (pathname.startsWith("/student-support")) {
      return {
        title: "Student Support",
        badge: "In this Section: Student Support",
        groups: [
          {
            title: "Welfare & Services",
            items: [
              { name: "Services Overview", href: "/student-support-services" },
              { name: "Mentoring & Guidance", href: "/student-support-services#mentoring" },
              { name: "NCC & NSS Units", href: "/student-support-services#ncc-nss" },
              { name: "Clubs & Associations", href: "/student-support-services#clubs" },
            ]
          }
        ]
      };
    }

    if (pathname.startsWith("/alumni")) {
      return {
        title: "Alumni Connect",
        badge: "In this Section: Alumni Connect",
        groups: [
          {
            title: "Alumnae Network",
            items: [
              { name: "Alumni Engagement & Vision", href: "/alumni#sec-about" },
              { name: "Alumni Committee", href: "/alumni#sec-committee" },
              { name: "Registered Association", href: "/alumni#sec-association" },
              { name: "Distinguished Alumni", href: "/alumni#sec-contributions" },
            ]
          }
        ]
      };
    }

    if (pathname.startsWith("/research-innovation")) {
      return {
        title: "Research & Innovation",
        badge: "In this Section: Research & Innovation",
        groups: [
          {
            title: "RDC & Innovations",
            items: [
              { name: "Research Development Cell (RDC)", href: "/research-innovation#sec-rdc" },
              { name: "Policy & Ethics", href: "/research-innovation#sec-policy" },
              { name: "Publications & Citations", href: "/research-innovation#sec-publications" },
              { name: "Patents & Innovations", href: "/research-innovation#sec-patents" },
              { name: "IPR Cell", href: "/research-innovation#sec-ipr" },
            ]
          }
        ]
      };
    }

    if (pathname.startsWith("/mandatory-disclosures")) {
      return {
        title: "Disclosures",
        badge: "In this Section: Mandatory Disclosures",
        groups: [
          {
            title: "Statutory Disclosures",
            items: [
              { name: "AICTE Mandatory Disclosures", href: "/mandatory-disclosures" },
              { name: "University Affiliation Orders", href: "/mandatory-disclosures#affiliation" },
              { name: "Audit & Financial Reports", href: "/mandatory-disclosures#finance" },
            ]
          }
        ]
      };
    }

    return null;
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
          className="flex items-center justify-between w-full max-w-[1260px] mx-auto px-4 sm:px-6 text-inherit"
          style={{
            gap: "var(--topnav-spacing, 12px)",
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
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="about"
              onClick={() => toggleMenu("about")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="About Us"
              aria-expanded={activeMenu === "about"}
            >
              About Us
            </button>

            {activeMenu === "about" && (
              <div
                data-nav-dropdown="about"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {aboutCategories.map((cat, i) => (
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
                        {cat.fullTitle || cat.title}
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

          {/* 3. Academics */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="academics"
              onClick={() => toggleMenu("academics")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Academics"
              aria-expanded={activeMenu === "academics"}
            >
              Academics
            </button>

            {activeMenu === "academics" && (
              <div
                data-nav-dropdown="academics"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {academicsColumns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-5">
                    {col.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-2.5">
                        <Link
                          href={cat.href}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 group/header hover:text-blue-900 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#002147]/5 border border-[#002147]/10 text-[#002147] group-hover/header:bg-[#002147] group-hover/header:text-white transition-all">
                              <cat.icon className="h-3.5 w-3.5" />
                            </span>
                            <span className="font-outfit font-black text-slate-800 text-xs sm:text-sm leading-tight group-hover/header:text-[#002147]">
                              {cat.fullTitle || cat.title}
                            </span>
                          </div>
                          {cat.items.length === 0 && (
                            <ChevronRight className="h-4 w-4 text-slate-400 group-hover/header:text-[#002147] group-hover/header:translate-x-0.5 transition-all shrink-0" />
                          )}
                        </Link>
                        {cat.items.length > 0 && (
                          <div className="flex flex-col gap-1">
                            {cat.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setActiveMenu(null)}
                                className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/80 px-2.5 py-1 rounded-lg transition-all flex items-center justify-between group/link"
                              >
                                <span>{item.text}</span>
                                <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-blue-600 shrink-0" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. Admissions */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="admissions"
              onClick={() => toggleMenu("admissions")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Admissions"
              aria-expanded={activeMenu === "admissions"}
            >
              Admissions
            </button>

            {activeMenu === "admissions" && (
              <div
                data-nav-dropdown="admissions"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {admissionsCategories.map((cat, i) => (
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
                        {cat.fullTitle || cat.title}
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

          {/* 5. Infrastructure */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="infra"
              onClick={() => toggleMenu("infra")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Infrastructure"
              aria-expanded={activeMenu === "infra"}
            >
              Infrastructure
            </button>

            {activeMenu === "infra" && (
              <div
                data-nav-dropdown="infra"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[80vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {infraColumns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-5">
                    {col.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                            <cat.icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-outfit font-black text-slate-800 text-xs sm:text-sm leading-tight">
                            {cat.title}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          {cat.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={`/infrastructure/${item.slug}`}
                              onClick={() => setActiveMenu(null)}
                              className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-2.5 py-1 rounded-lg transition-all"
                            >
                              {item.text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Faculty */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="faculty"
              onClick={() => toggleMenu("faculty")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Faculty"
              aria-expanded={activeMenu === "faculty"}
            >
              Faculty
            </button>

            {activeMenu === "faculty" && (
              <div
                data-nav-dropdown="faculty"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[80vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {facultyColumns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-5">
                    {col.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                            <cat.icon className="h-3.5 w-3.5" />
                          </span>
                          <Link
                            href={cat.href}
                            onClick={() => setActiveMenu(null)}
                            className="font-outfit font-black text-slate-800 text-xs sm:text-sm leading-tight hover:text-[#002147] transition-colors"
                          >
                            {cat.title}
                          </Link>
                        </div>
                        <div className="flex flex-col gap-1">
                          {cat.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={`/faculty/${item.slug}`}
                              onClick={() => setActiveMenu(null)}
                              className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-2.5 py-1 rounded-lg transition-all"
                            >
                              {item.text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. Student Support Services */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="support"
              onClick={() => toggleMenu("support")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Student Support Services"
              aria-expanded={activeMenu === "support"}
            >
              Student Support Services
            </button>

            {activeMenu === "support" && (
              <div
                data-nav-dropdown="support"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {supportCategories.map((cat, i) => (
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
                        {cat.fullTitle || cat.title}
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

          {/* 8. Placements & Industry Linkages */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="placements"
              onClick={() => toggleMenu("placements")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Placements & Industry Linkages"
              aria-expanded={activeMenu === "placements"}
            >
              Placements & Industry Linkages
            </button>

            {activeMenu === "placements" && (
              <div
                data-nav-dropdown="placements"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {placementsCategories.map((cat, i) => (
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
                        {cat.fullTitle || cat.title}
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
          className="flex items-center justify-between w-full max-w-[1260px] mx-auto px-4 sm:px-6 text-inherit"
          style={{
            gap: "var(--topnav-spacing, 12px)",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit"
          }}
        >


          {/* Research & Innovation (Moved here to balance Row 1 & Row 2 spacing perfectly!) */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="research"
              onClick={() => toggleMenu("research")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Research & Innovation"
              aria-expanded={activeMenu === "research"}
            >
              Research & Innovation
            </button>

            {activeMenu === "research" && (
              <div
                data-nav-dropdown="research"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {researchCategories.map((cat, i) => (
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
                        {cat.fullTitle || cat.title}
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


          {/* 10. Alumni */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="alumni"
              onClick={() => toggleMenu("alumni")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Alumni"
              aria-expanded={activeMenu === "alumni"}
            >
              Alumni
            </button>

            {activeMenu === "alumni" && (
              <div
                data-nav-dropdown="alumni"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
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
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="iqac"
              onClick={() => toggleMenu("iqac")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Quality Assurance & Accreditation"
              aria-expanded={activeMenu === "iqac"}
            >
              Quality Assurance & Accreditation
            </button>

            {activeMenu === "iqac" && (
              <div
                data-nav-dropdown="iqac"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {iqacCategories.map((cat, i) => (
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
                        {cat.fullTitle || cat.title}
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

          {/* 12. Mandatory Disclosures & Compliance */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="mandatory"
              onClick={() => toggleMenu("mandatory")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Mandatory Disclosures & Compliance"
              aria-expanded={activeMenu === "mandatory"}
            >
              Mandatory Disclosures & Compliance
            </button>

            {activeMenu === "mandatory" && (
              <div
                data-nav-dropdown="mandatory"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {mandatoryCategories.map((cat, i) => (
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
                        {cat.fullTitle || cat.title}
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

          {/* 13. Strategic Plans & Future Directions */}
          <div className="flex items-center group/nav">
            <button
              type="button"
              data-nav-item="strategic"
              onClick={() => toggleMenu("strategic")}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-medium outline-none bg-transparent border-0 p-0 text-inherit font-[inherit] text-[inherit]"
              title="Strategic Plans & Future Directions"
              aria-expanded={activeMenu === "strategic"}
            >
              Strategic Plans & Future Directions
            </button>

            {activeMenu === "strategic" && (
              <div
                data-nav-dropdown="strategic"
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-default animate-fadeIn max-h-[82vh] overflow-y-auto"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {strategicCategories.map((cat, i) => (
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
                        {cat.fullTitle || cat.title}
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
      {/* MOBILE RESPONSIVE STICKY 3-LINE MENU & UNIFIED DRAWER          */}
      {/* ============================================================== */}

      {/* Mobile Sticky Top Header (Clean 3-Line Menu Header) */}
      <div
        className="flex md:hidden items-center justify-between h-11 w-full select-none relative z-40 px-3.5 transition-colors duration-200"
        style={{ backgroundColor: "#000080" }}
      >
        {/* Left: Brand / Active Section Indicator */}
        <Link
          href="/"
          className="flex items-center gap-2 group min-w-0"
        >
          <img
            src="/images/Crest_Logo.png?v=full_v5"
            alt="St. Ann's Crest"
            className="h-6 w-auto object-contain shrink-0 drop-shadow-xs"
          />
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-outfit font-black text-[13px] text-white tracking-tight uppercase leading-none truncate">
              St. Ann’s College
            </span>
            {(() => {
              const sec = getActiveSectionInfo();
              return sec ? (
                <>
                  <span className="text-white/40 text-[11px] font-bold">/</span>
                  <span className="text-amber-300 font-extrabold text-[11px] truncate max-w-[130px] xs:max-w-[170px]">
                    {sec.title}
                  </span>
                </>
              ) : null;
            })()}
          </div>
        </Link>

        {/* Right: Quick Apply button + 3-Line Hamburger Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-admission-enquiry"));
              }
            }}
            className="flex items-center gap-1 rounded-full bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 text-[10.5px] font-bold text-white shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <span>Apply</span>
            <ArrowRight className="h-2.5 w-2.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex items-center justify-center h-8 w-8 rounded-lg transition-all cursor-pointer border ${
              mobileOpen
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-sm"
                : "bg-white/10 hover:bg-white/20 text-white border-white/20"
            }`}
            title={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <X className="h-4.5 w-4.5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Side Panel (Drawer) with Blurred Left Gap */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex select-none animate-fadeIn">
          {/* Blurred Backdrop on Left Gap: Tapping closes the drawer */}
          <div
            className="flex-1 bg-slate-950/60 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu backdrop"
          />

          {/* Sliding Drawer Container: ~84vw width leaving the left blurred gap */}
          <div className="w-[84vw] max-w-sm bg-white shadow-2xl flex flex-col h-full overflow-hidden border-l border-slate-200 animate-slideIn shrink-0">

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 shrink-0 bg-[#001738] text-white">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/Crest_Logo.png?v=full_v5"
                  alt="St. Ann's Crest"
                  className="h-8 w-auto object-contain bg-white/10 p-1 rounded-lg"
                />
                <div className="flex flex-col">
                  <span className="font-outfit font-black text-sm text-white uppercase tracking-wider leading-tight">
                    St. Ann’s College
                  </span>
                  <span className="text-[10px] text-blue-200 font-medium leading-tight">
                    College Menu &amp; Directory
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable 14-Items Accordion Menu */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
              {[
                {
                  id: "home",
                  name: "1. Home",
                  href: "/",
                  icon: Home,
                  desc: "Main Campus & Portal",
                  hasChildren: false,
                },
                {
                  id: "about",
                  name: "2. About Us",
                  href: "/about",
                  icon: Building,
                  desc: "History, Vision, Leadership & Governance",
                  hasChildren: true,
                  groups: [
                    {
                      title: "A. The Institution",
                      items: [
                        { text: "Basic Institutional Information", href: "/about/the-institution/basic-institutional-information" },
                        { text: "History & Milestones", href: "/about/the-institution/history-of-the-college" },
                        { text: "Emblem, Vision, Mission & Values", href: "/about/the-institution/vision-mission-and-core-values" },
                        { text: "Institutional Awards & Recognitions", href: "/about/the-institution/institutional-awards-recognitions" },
                        { text: "Student Achievements & Laurels", href: "/about/the-institution/student-laurels" },
                        { text: "Head of the Institution", href: "/about/the-institution/head-of-the-institution" },
                        { text: "Legacy of Leadership", href: "/about/the-institution/legacy-of-leadership" },
                      ]
                    },
                    {
                      title: "B. Affiliations & Recognitions",
                      items: [
                        { text: "Affiliated to ANU", href: "/about/statutory-affiliations-recognitions#anu" },
                        { text: "Approved by AICTE", href: "/about/statutory-affiliations-recognitions#aicte" },
                        { text: "Recognised under UGC Section 2(f)", href: "/about/statutory-affiliations-recognitions#ugc" },
                        { text: "Accredited by NAAC", href: "/about/statutory-affiliations-recognitions#naac" },
                      ]
                    },
                    {
                      title: "C. Governance & Administration",
                      items: [
                        { text: "Governing Body", href: "/about/governance-administration/governing-body" },
                        { text: "Organogram", href: "/about/governance-administration/organogram" },
                        { text: "Key Functionaries", href: "/about/governance-administration/key-functionaries" },
                        { text: "Statutory & Non-Statutory Committees", href: "/about/governance-administration/statutory-non-statutory-committees" },
                        { text: "Institutional Policies", href: "/about/governance-administration/institutional-policies" },
                        { text: "Strategic Development Plan", href: "/strategic-plans-and-future-directions" },
                        { text: "Code of Conduct", href: "/about/governance-administration/code-of-conduct" },
                      ]
                    }
                  ]
                },
                {
                  id: "academics",
                  name: "3. Academics",
                  href: "/academics",
                  icon: GraduationCap,
                  desc: "Curricula, Regulations & Programs",
                  hasChildren: true,
                  groups: [
                    {
                      title: "A. Academic Programmes",
                      items: [
                        { text: "Undergraduate (UG) Programmes", href: "/academics/academic-programmes/undergraduate-programmes" },
                        { text: "Postgraduate (PG) Programmes", href: "/academics/academic-programmes/postgraduate-programmes" },
                      ]
                    },
                    {
                      title: "B. Academic Regulations & Resources",
                      items: [
                        { text: "Academic Calendar", href: "/academics/curriculum-academic-planning/academic-calendar" },
                        { text: "Time Tables", href: "/academics/curriculum-academic-planning/timetables" },
                        { text: "Curriculum & Syllabus", href: "/academics/curriculum-academic-planning/curriculum-syllabus" },
                        { text: "Academic Regulations", href: "/academics/curriculum-academic-planning/academic-regulations" },
                        { text: "ILMS – Learning Management", href: "/academics/curriculum-academic-planning/ilms-system" },
                      ]
                    },
                    {
                      title: "C. Academic Departments",
                      items: [
                        { text: "All Departments Hub", href: "/academics/departments" },
                        { text: "1. Dept. of Commerce", href: "/academics/departments/department-of-commerce" },
                        { text: "2. BCA – Computer Applications", href: "/academics/departments/department-of-bca" },
                        { text: "3. Computer Science", href: "/academics/departments/department-of-computer-science" },
                        { text: "4. Artificial Intelligence (AI)", href: "/academics/departments/department-of-artificial-intelligence" },
                        { text: "5. Dept. of Mathematics", href: "/academics/departments/department-of-mathematics" },
                        { text: "6. Dept. of Physics", href: "/academics/departments/department-of-physics" },
                        { text: "7. Dept. of Statistics", href: "/academics/departments/department-of-statistics" },
                        { text: "8. Dept. of Biotechnology", href: "/academics/departments/department-of-biotechnology" },
                        { text: "9. Dept. of Microbiology", href: "/academics/departments/department-of-microbiology" },
                        { text: "10. Dept. of Botany", href: "/academics/departments/department-of-botany" },
                        { text: "11. Dept. of Chemistry", href: "/academics/departments/department-of-chemistry" },
                        { text: "12. Dept. of MCA", href: "/academics/departments/department-of-mca" },
                        { text: "13. Dept. of MBA", href: "/academics/departments/department-of-mba" },
                        { text: "14. Dept. of English", href: "/academics/departments/department-of-english" },
                        { text: "15. Dept. of Telugu", href: "/academics/departments/department-of-telugu" },
                        { text: "16. Dept. of Sanskrit & Hindi", href: "/academics/departments/department-of-sanskrit-hindi" },
                      ]
                    },
                    {
                      title: "D. Teaching & Learning",
                      items: [
                        { text: "Teaching-Learning Practices", href: "/academics/teaching-learning/teaching-learning-practices" },
                        { text: "Innovative Teaching Practices", href: "/academics/teaching-learning/innovative-teaching-practices" },
                        { text: "Experiential & Participative Learning", href: "/academics/teaching-learning/experiential-participative-learning" },
                        { text: "ICT-Enabled Teaching", href: "/academics/teaching-learning/ict-enabled-teaching" },
                        { text: "Student-Centric Learning", href: "/academics/teaching-learning/student-centric-learning" },
                      ]
                    },
                    {
                      title: "E. Examination & Evaluation",
                      items: [
                        { text: "Examination System", href: "/academics/examination-evaluation/examination-system" },
                        { text: "Continuous Internal Assessment (CIA)", href: "/academics/examination-evaluation/continuous-internal-assessment" },
                        { text: "University Examinations", href: "/academics/examination-evaluation/university-examinations" },
                        { text: "Results & Performance", href: "/academics/examination-evaluation/results-performance" },
                        { text: "Examination Regulations", href: "/academics/examination-evaluation/examination-regulations" },
                      ]
                    }
                  ]
                },
                {
                  id: "admissions",
                  name: "4. Admissions",
                  href: "/admissions",
                  icon: BookOpen,
                  desc: "Eligibility, Fee Structure & Guidelines",
                  hasChildren: true,
                  groups: [
                    {
                      title: "Admissions Information",
                      items: [
                        { text: "Admissions Overview & Guidelines", href: "/admissions" },
                        { text: "Programmes Offered & Intake", href: "/admissions#programmes" },
                        { text: "Eligibility Criteria", href: "/admissions#eligibility" },
                        { text: "Fee Structure", href: "/admissions#fee-structure" },
                        { text: "Admission Procedure & Steps", href: "/admissions#procedure" },
                        { text: "Scholarships & Financial Aid", href: "/admissions#scholarships" },
                        { text: "Admissions Helpdesk & Contact", href: "/admissions#contact" },
                      ]
                    }
                  ]
                },
                {
                  id: "infra",
                  name: "5. Infrastructure",
                  href: "/infrastructure",
                  icon: Building2,
                  desc: "Campus, Labs, Library & Hostels",
                  hasChildren: true,
                  groups: [
                    {
                      title: "Campus Facilities",
                      items: [
                        { text: "1. Campus & Buildings", href: "/infrastructure/campus-buildings" },
                        { text: "2. Classrooms & Seminar Halls", href: "/infrastructure/classrooms" },
                        { text: "3. Central Library & Info Centre", href: "/infrastructure/library" },
                        { text: "4. ICT & Digital Infrastructure", href: "/infrastructure/ict-digital" },
                        { text: "5. Laboratories & Instrumentation", href: "/infrastructure/laboratories" },
                        { text: "6. Sports & Fitness Grounds", href: "/infrastructure/sports-facilities" },
                        { text: "7. Hostel & Dining Amenities", href: "/infrastructure/hostel-amenities" },
                      ]
                    }
                  ]
                },
                {
                  id: "faculty",
                  name: "6. Faculty",
                  href: "/faculty",
                  icon: Users,
                  desc: "Teaching Faculty, Profiles & Departments",
                  hasChildren: true,
                  groups: [
                    {
                      title: "Faculty Directory",
                      items: [
                        { text: "Teaching Staff Directory", href: "/faculty/teaching-staff" },
                        { text: "Department-Wise Faculty Profiles", href: "/faculty/department-wise" },
                        { text: "Non-Teaching & Admin Staff", href: "/faculty/non-teaching-staff" },
                        { text: "Visiting & Adjunct Professors", href: "/faculty/visiting-professors" },
                        { text: "Recruitment Policy & Process", href: "/faculty/recruitment-policy" },
                        { text: "Faculty Development (FDP)", href: "/faculty/faculty-development" },
                      ]
                    }
                  ]
                },
                {
                  id: "support",
                  name: "7. Student Support",
                  href: "/student-support-services",
                  icon: HeartHandshake,
                  desc: "Mentoring, NCC, NSS & Clubs",
                  hasChildren: true,
                  groups: [
                    {
                      title: "Student Welfare & Support",
                      items: [
                        { text: "Support Services Overview", href: "/student-support-services" },
                        { text: "Grievance Redressal / Ombudsperson", href: "/student-support/grievance-redressal" },
                        { text: "Internal Complaints Committee (ICC)", href: "/student-support/internal-complaints" },
                        { text: "Women Empowerment Cell", href: "/student-support/women-empowerment" },
                        { text: "Student Counselling & Wellness", href: "/student-support/student-counselling" },
                        { text: "Mentor–Mentee System", href: "/student-support/mentor-mentee" },
                        { text: "Parent Association", href: "/student-support/parent-association" },
                        { text: "Scholarships & Welfare", href: "/student-support/scholarships-welfare" },
                        { text: "Sports Facilities & Physical Education", href: "/student-support/sports-facilities" },
                        { text: "National Service Scheme (NSS)", href: "/student-support/nss-activities" },
                        { text: "National Cadet Corps (NCC)", href: "/student-support/ncc-activities" },
                        { text: "Clubs & Cultural Forums", href: "/student-support/eco-club" },
                      ]
                    }
                  ]
                },
                {
                  id: "placements",
                  name: "8. Placements",
                  href: "/placements",
                  icon: Briefcase,
                  desc: "Recruiters, TPO Desk & Statistics",
                  hasChildren: true,
                  groups: [
                    {
                      title: "Career & Training Cell",
                      items: [
                        { text: "Training & Placement Cell Overview", href: "/placements" },
                        { text: "Training Programmes & Skill Matrix", href: "/placements#training" },
                        { text: "Major Recruiters & Corporate Partners", href: "/placements#recruiters" },
                        { text: "Placement Statistics & Track Record", href: "/placements#statistics" },
                        { text: "TPO Desk & Contact Information", href: "/placements#contact" },
                      ]
                    }
                  ]
                },
                {
                  id: "research",
                  name: "9. Research & Innovation",
                  href: "/research-innovation",
                  icon: FlaskConical,
                  desc: "Projects, Publications & IPR Cell",
                  hasChildren: true,
                  groups: [
                    {
                      title: "Research & Development",
                      items: [
                        { text: "Research Promotion Policy & Ethics", href: "/research-innovation#sec-policy" },
                        { text: "Research & Development Cell (RDC)", href: "/research-innovation#sec-rdc" },
                        { text: "Research Infrastructure & Labs", href: "/research-innovation#sec-infra" },
                        { text: "Research Publications & Books", href: "/research-innovation#sec-publications" },
                        { text: "Patents, Start-ups & Innovations", href: "/research-innovation#sec-patents" },
                        { text: "Intellectual Property Rights (IPR) Cell", href: "/research-innovation#sec-ipr" },
                        { text: "Innovation & Start-Up Centre (EDC)", href: "/research-innovation#sec-edc" },
                        { text: "Institution Innovation Council (IIC)", href: "/research-innovation#sec-iic" },
                      ]
                    }
                  ]
                },
                {
                  id: "alumni",
                  name: "10. Alumni",
                  href: "/alumni",
                  icon: Handshake,
                  desc: "Alumnae Network & Distinguished Members",
                  hasChildren: true,
                  groups: [
                    {
                      title: "Alumnae Network",
                      items: [
                        { text: "About Alumni Engagement & Objectives", href: "/alumni#sec-about" },
                        { text: "College-Level Alumni Committee", href: "/alumni#sec-committee" },
                        { text: "Registered Alumni Association", href: "/alumni#sec-association" },
                        { text: "Alumni Contributions & Support", href: "/alumni#sec-contributions" },
                        { text: "Distinguished Alumnae Profiles", href: "/alumni#sec-distinguished" },
                        { text: "Alumni Registration & Portal", href: "/alumni#sec-register" },
                      ]
                    }
                  ]
                },
                {
                  id: "iqac",
                  name: "11. Quality Assurance (IQAC)",
                  href: "/quality-assurance",
                  icon: ShieldCheck,
                  desc: "NAAC, NIRF, AQAR & Accreditations",
                  hasChildren: true,
                  groups: [
                    {
                      title: "IQAC & Accreditations",
                      items: [
                        { text: "IQAC Overview & Objectives", href: "/quality-assurance" },
                        { text: "NAAC Accreditation & SSR Documents", href: "/quality-assurance#naac" },
                        { text: "NIRF Reports & Rankings", href: "/quality-assurance#nirf" },
                        { text: "Annual Quality Assurance Reports (AQAR)", href: "/quality-assurance#aqar" },
                        { text: "IQAC Composition & Meeting Minutes", href: "/quality-assurance#composition" },
                        { text: "Quality Initiatives & Institutional Audits", href: "/quality-assurance#initiatives" },
                      ]
                    }
                  ]
                },
                {
                  id: "mandatory",
                  name: "12. Mandatory Disclosures",
                  href: "/mandatory-disclosures",
                  icon: FileCheck,
                  desc: "Statutory Compliance & AICTE Approvals",
                  hasChildren: true,
                  groups: [
                    {
                      title: "Statutory & Regulatory Disclosures",
                      items: [
                        { text: "AICTE Mandatory Disclosures", href: "/mandatory-disclosures#sec-statutory" },
                        { text: "Institutional Profile & Programs", href: "/mandatory-disclosures#sec-institutional-profile" },
                        { text: "ANU Affiliation Orders – UG & PG", href: "/mandatory-disclosures#sec-anu-affiliations" },
                        { text: "AICTE Approval & EoA Letters", href: "/mandatory-disclosures#sec-aicte-approval" },
                        { text: "UGC Section 2(f) Recognition", href: "/mandatory-disclosures#sec-ugc-recognition" },
                        { text: "Right to Information (RTI) Information", href: "/mandatory-disclosures#sec-rti" },
                        { text: "Audited Financial Statements & Budget", href: "/mandatory-disclosures#sec-financial" },
                        { text: "Annual Reports & Statistics", href: "/mandatory-disclosures#sec-reports" },
                      ]
                    }
                  ]
                },
                {
                  id: "strategic",
                  name: "13. Strategic Plans",
                  href: "/strategic-plans-and-future-directions",
                  icon: Compass,
                  desc: "Institutional Perspective & 2030 Roadmap",
                  hasChildren: true,
                  groups: [
                    {
                      title: "Strategic Perspective",
                      items: [
                        { text: "Strategic Development Plan Overview", href: "/strategic-plans-and-future-directions" },
                        { text: "Strategic Priorities (Academic, Infra, Financial)", href: "/strategic-plans-and-future-directions#sec-priority-academic" },
                        { text: "Stakeholder Engagement & Feedback", href: "/strategic-plans-and-future-directions#stakeholder-engagement" },
                        { text: "Vision for 2047: Viksit Bharat", href: "/strategic-plans-and-future-directions#vision-2047" },
                      ]
                    }
                  ]
                },
                {
                  id: "contact",
                  name: "14. Contact Us",
                  href: "/contact",
                  icon: Phone,
                  desc: "Campus Location, Numbers & Enquiry",
                  hasChildren: false,
                },
              ].map((item) => {
                const IconComponent = item.icon;
                const isCurrent = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const isExpanded = expandedSection === item.id;

                if (!item.hasChildren) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-all border ${
                        pathname === item.href
                          ? "bg-[#002147] text-white border-[#002147] shadow-xs"
                          : "bg-white hover:bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`p-1.5 rounded-lg shrink-0 ${
                            pathname === item.href ? "bg-white/10 text-white" : "bg-blue-50 text-[#002147]"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col min-w-0 text-left">
                          <span className={`text-xs font-bold leading-tight truncate ${pathname === item.href ? "text-white" : "text-slate-800"}`}>
                            {item.name}
                          </span>
                          <span className={`text-[10px] leading-tight truncate mt-0.5 ${pathname === item.href ? "text-blue-200" : "text-slate-400"}`}>
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${pathname === item.href ? "text-white" : "text-slate-400"}`} />
                    </Link>
                  );
                }

                return (
                  <div key={item.id} className="flex flex-col">
                    <div
                      onClick={() => toggleSection(item.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-all border cursor-pointer select-none ${
                        isExpanded
                          ? "bg-[#002147] text-white border-[#002147] shadow-xs"
                          : isCurrent
                            ? "bg-blue-50/80 text-[#002147] border-blue-200"
                            : "bg-white hover:bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`p-1.5 rounded-lg shrink-0 ${
                            isExpanded
                              ? "bg-white/10 text-white"
                              : isCurrent
                                ? "bg-[#002147] text-white"
                                : "bg-blue-50 text-[#002147]"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col min-w-0 text-left">
                          <span
                            className={`text-xs font-bold leading-tight truncate ${
                              isExpanded
                                ? "text-white"
                                : isCurrent
                                  ? "text-[#002147] font-black"
                                  : "text-slate-800"
                            }`}
                          >
                            {item.name}
                          </span>
                          <span
                            className={`text-[10px] leading-tight truncate mt-0.5 ${
                              isExpanded ? "text-blue-200" : "text-slate-400"
                            }`}
                          >
                            {item.desc}
                          </span>
                        </div>
                      </div>

                      {/* Right Down Arrow for Accordion */}
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <span
                          className={`flex items-center justify-center h-6 w-6 rounded-md transition-all ${
                            isExpanded
                              ? "bg-amber-400 text-slate-950"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </span>
                      </div>
                    </div>

                    {/* Expanded Accordion Content: When one opens, all others close */}
                    {isExpanded && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 my-1.5 mx-1 flex flex-col gap-2.5 animate-fadeIn">
                        {/* Landing Link */}
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-blue-100/70 hover:bg-blue-200/80 text-[#002147] text-xs font-bold transition-all"
                        >
                          <span>Visit {item.name.replace(/^\d+\.\s*/, "")} Hub →</span>
                          <ChevronRight className="h-3 w-3 shrink-0" />
                        </Link>

                        {item.groups?.map((group, gIdx) => (
                          <div key={gIdx} className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1.5">
                              {group.title}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              {group.items.map((sub, sIdx) => {
                                const isSubActive = pathname === sub.href;
                                return (
                                  <Link
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`px-2 py-1.5 rounded-lg text-[11.5px] font-medium flex items-center justify-between transition-all ${
                                      isSubActive
                                        ? "bg-[#002147] text-white font-bold shadow-xs"
                                        : "text-slate-700 hover:bg-white hover:text-[#002147]"
                                    }`}
                                  >
                                    <span className="truncate pr-1.5 leading-snug">{sub.text}</span>
                                    <ChevronRight
                                      className={`h-3 w-3 shrink-0 ${isSubActive ? "text-white" : "opacity-35"}`}
                                    />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Social Channels */}
              <div className="flex items-center justify-center gap-3 pt-4 pb-3 border-t border-slate-100 mt-2">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="h-7 w-7 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 shadow-xs" title="Facebook">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="h-7 w-7 rounded-lg bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 shadow-xs" title="YouTube">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://www.instagram.com/stannscollegeforwomengnt" target="_blank" rel="noreferrer" className="h-7 w-7 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:opacity-90 shadow-xs" title="Instagram">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://whatsapp.com/channel/0029Vb9FPmy0bIdpHlLFXY3c" target="_blank" rel="noreferrer" className="h-7 w-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 shadow-xs" title="WhatsApp">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}