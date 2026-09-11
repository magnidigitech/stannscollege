export interface SectionColors {
  bgColor: string;
  bgGradient?: string;
  isGradient: boolean;
  headingColor: string;
  textColor: string;
  accentColor: string;
  cardBg: string;
  borderColor: string;
  badgeBg?: string;
  badgeTextColor?: string;

  // Header and Navigation specific color palettes matching website customizer
  logoBarColor?: string;
  topNavColor?: string;
  topNavLinkColor?: string;
  topNavRow2Color?: string;
  announcementBg?: string;
  announcementTextColor?: string;
  announcementBadgeBg?: string;
  announcementBadgeTextColor?: string;
  headerTitleColor?: string;
  headerSubColor?: string;
  headerAccentColor?: string;
  headerAddressColor?: string;
  headerLine1Color?: string;
  headerLine2Color?: string;
  headerLine3Color?: string;
  headerLine4Color?: string;
  headerLine5Color?: string;
  headerLine6Color?: string;
}

export interface SectionLayout {
  visible: boolean;
  paddingY: "compact" | "normal" | "spacious" | "extra";
  maxWidth: "compact" | "contained" | "wide" | "full";
  alignment: "left" | "center" | "right";
  columns: 1 | 2 | 3 | 4;
  borderRadius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  cardStyle: "flat" | "elevated" | "glass" | "bordered";

  // Header & Announcement specific layout properties matching website customizer
  announcementBadgeText?: string;
  announcementHeight?: number;
  announcementFontSize?: number;
  announcementSpeed?: number;
  announcementBlinkStyle?: "blink" | "rapid" | "glow" | "solid";
  announcementShowContact?: boolean;
  announcementPhone1?: string;
  announcementPhone2?: string;
  announcementCustomText?: string;

  crestLogoSize?: number;
  headerGraphicSize?: number;
  logoBarPaddingY?: number;
  headerTextAlign?: "left" | "center" | "right";
  headerMode?: "image_v1" | "image_v2" | "text";

  topnavFontFamily?: string;
  topnavFontSize?: number;
  topnavFontWeight?: string;
  topnavSpacing?: number;
  topnavPaddingY?: number;
}

export interface SectionConfig {
  id: string;
  name: string;
  description?: string;
  colors: SectionColors;
  layout: SectionLayout;
}

export interface PageConfig {
  id: string;
  title: string;
  slug: string;
  sections: SectionConfig[];
}

export interface SiteCustomizationData {
  version: number;
  lastUpdated: string;
  updatedBy?: string;
  pages: Record<string, PageConfig>;
}

// Helper to generate default section styles
function createDefaultSection(id: string, name: string, description: string, overrides?: Partial<SectionColors & SectionLayout>): SectionConfig {
  return {
    id,
    name,
    description,
    colors: {
      bgColor: overrides?.bgColor || "#ffffff",
      bgGradient: overrides?.bgGradient || "linear-gradient(to right, #001730, #002147, #0d3b66)",
      isGradient: overrides?.isGradient || false,
      headingColor: overrides?.headingColor || "#002147",
      textColor: overrides?.textColor || "#475569",
      accentColor: overrides?.accentColor || "#1e40af",
      cardBg: overrides?.cardBg || "#f8fafc",
      borderColor: overrides?.borderColor || "#e2e8f0",
      badgeBg: overrides?.badgeBg || "#002147",
      badgeTextColor: overrides?.badgeTextColor || "#ffffff",
      logoBarColor: overrides?.logoBarColor,
      topNavColor: overrides?.topNavColor,
      topNavLinkColor: overrides?.topNavLinkColor,
      topNavRow2Color: overrides?.topNavRow2Color,
      announcementBg: overrides?.announcementBg,
      announcementTextColor: overrides?.announcementTextColor,
      announcementBadgeBg: overrides?.announcementBadgeBg,
      announcementBadgeTextColor: overrides?.announcementBadgeTextColor,
      headerTitleColor: overrides?.headerTitleColor,
      headerSubColor: overrides?.headerSubColor,
      headerAccentColor: overrides?.headerAccentColor,
      headerAddressColor: overrides?.headerAddressColor,
      headerLine1Color: overrides?.headerLine1Color,
      headerLine2Color: overrides?.headerLine2Color,
      headerLine3Color: overrides?.headerLine3Color,
      headerLine4Color: overrides?.headerLine4Color,
      headerLine5Color: overrides?.headerLine5Color,
      headerLine6Color: overrides?.headerLine6Color,
    },
    layout: {
      visible: overrides?.visible !== undefined ? overrides.visible : true,
      paddingY: overrides?.paddingY || "normal",
      maxWidth: overrides?.maxWidth || "contained",
      alignment: overrides?.alignment || "left",
      columns: overrides?.columns || 3,
      borderRadius: overrides?.borderRadius || "lg",
      cardStyle: overrides?.cardStyle || "elevated",
      announcementHeight: overrides?.announcementHeight || 40,
      announcementFontSize: overrides?.announcementFontSize || 12,
      announcementSpeed: overrides?.announcementSpeed || 32,
      announcementBlinkStyle: overrides?.announcementBlinkStyle || "blink",
      announcementShowContact: overrides?.announcementShowContact !== undefined ? overrides.announcementShowContact : true,
      announcementPhone1: overrides?.announcementPhone1 || "0863-2236470",
      announcementPhone2: overrides?.announcementPhone2 || "7382104655",
      announcementCustomText: overrides?.announcementCustomText || "",
      crestLogoSize: overrides?.crestLogoSize || 92,
      headerGraphicSize: overrides?.headerGraphicSize || 92,
      logoBarPaddingY: overrides?.logoBarPaddingY || 0,
      topnavFontFamily: overrides?.topnavFontFamily || "var(--font-inter, sans-serif)",
      topnavFontSize: overrides?.topnavFontSize || 18,
      topnavFontWeight: overrides?.topnavFontWeight || "700",
      topnavSpacing: overrides?.topnavSpacing || 20,
      topnavPaddingY: overrides?.topnavPaddingY || 4,
    },
  };
}

export const INITIAL_PAGES_CONFIG: Record<string, PageConfig> = {
  // Global Header: Announcement Section
  "announcement-bar": {
    id: "announcement-bar",
    title: "Announcement Section",
    slug: "/#announcements",
    sections: [
      createDefaultSection("announcement-ticker", "Top Announcement Ticker & Badges", "Bar background, marquee text, 'ANNOUNCEMENTS' badge, phone contacts, and ticker speed", {
        bgColor: "#020617",
        headingColor: "#ffffff",
        textColor: "#e2e8f0",
        accentColor: "#38bdf8",
        badgeBg: "#dc2626",
        badgeTextColor: "#ffffff",
        borderColor: "#1e293b",
        paddingY: "compact",
        maxWidth: "full",
        announcementHeight: 40,
        announcementFontSize: 12,
        announcementSpeed: 32,
        announcementBlinkStyle: "blink",
        announcementShowContact: true,
        announcementPhone1: "0863-2236470",
        announcementPhone2: "7382104655",
      }),
      createDefaultSection("emergency-alerts", "Phone Contacts & Urgent Ribbon", "Helpline telephone numbers, examination notices, and flash announcements", {
        bgColor: "#991b1b",
        headingColor: "#ffffff",
        textColor: "#fecaca",
        accentColor: "#fef08a",
        paddingY: "compact",
        maxWidth: "contained",
      }),
    ],
  },

  // Global Header: Top Nav
  "top-nav": {
    id: "top-nav",
    title: "Top Nav",
    slug: "/#navigation",
    sections: [
      createDefaultSection("main-navigation", "Sticky Top Nav Bar & Links", "Nav bar background, menu link colors, font size, weight, spacing, and vertical padding", {
        bgColor: "#007c74",
        headingColor: "#ffffff",
        textColor: "#ffffff",
        accentColor: "#38bdf8",
        borderColor: "#00625c",
        paddingY: "compact",
        maxWidth: "full",
        topnavFontFamily: "var(--font-inter, sans-serif)",
        topnavFontSize: 18,
        topnavFontWeight: "700",
        topnavSpacing: 20,
        topnavPaddingY: 4,
      }),
      createDefaultSection("dropdown-menus", "Dropdown Mega-Menus & Sub-Links", "Category headers, nested links, hover highlights, and popup panel styling", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        accentColor: "#2563eb",
        cardBg: "#f8fafc",
        borderColor: "#e2e8f0",
        columns: 3,
      }),
    ],
  },

  // 1. Home
  home: {
    id: "home",
    title: "Home",
    slug: "/",
    sections: [
      createDefaultSection("hero-slider", "Hero & Main Banner Slider", "Primary hero banner and image carousel at the top of the homepage", {
        bgColor: "#020617",
        headingColor: "#ffffff",
        textColor: "#e2e8f0",
        accentColor: "#f59e0b",
        paddingY: "normal",
        maxWidth: "full",
        alignment: "center",
      }),
      createDefaultSection("three-column-highlights", "Three-Column Highlights (Events, Principal's Desk & Notice Board)", "Campus events, leadership message and active notice board row", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        accentColor: "#002147",
        cardBg: "#ffffff",
        borderColor: "#e2e8f0",
        columns: 3,
      }),
      createDefaultSection("why-choose", "Why Choose St. Ann's (3C Philosophy & Pillars)", "Interactive tabs: Philosophy, Academics, Campus & Career", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        accentColor: "#4f46e5",
        columns: 4,
      }),
      createDefaultSection("campus-facilities", "Campus Infrastructure & Placement Records", "Recruitment records, career milestones & placement statistics", {
        bgColor: "#f8fafc",
        headingColor: "#0f172a",
        textColor: "#334155",
        accentColor: "#059669",
        cardBg: "#ffffff",
        columns: 2,
      }),
      createDefaultSection("magazines-newsletters", "College Magazines & Newsletters", "Digital publications, college magazines and monthly newsletters", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 2,
      }),
      createDefaultSection("photo-gallery", "Campus Photo Gallery", "Visual gallery of college blocks, auditorium, and campus life", {
        bgColor: "#020617",
        headingColor: "#ffffff",
        textColor: "#cbd5e1",
        columns: 4,
      }),
      createDefaultSection("mandates-compliance", "Official Mandates & Compliance Actions", "Accreditation mandates, APSCHE, AICTE, and university affiliations", {
        bgColor: "#0f172a",
        headingColor: "#93c5fd",
        textColor: "#94a3b8",
        accentColor: "#38bdf8",
        cardBg: "rgba(255, 255, 255, 0.05)",
        columns: 3,
      }),
    ],
  },

  // 2. About Us
  about: {
    id: "about",
    title: "About Us",
    slug: "/about",
    sections: [
      createDefaultSection("about-hero", "Hero Banner (About Us)", "Top heading and breadcrumb banner for the About section", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
        paddingY: "normal",
      }),
      createDefaultSection("college-profile", "Genesis & College History", "Foundational legacy, Society history, and milestone timeline", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#334155",
      }),
      createDefaultSection("vision-mission", "Vision, Mission & Core Values", "Triple-pillar institutional vision and student charter", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#475569",
        accentColor: "#1e40af",
        columns: 3,
      }),
      createDefaultSection("governing-body", "Governing Body & Executive Management", "Leadership profiles, board members, and advisory council", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 3,
      }),
      createDefaultSection("awards-recognitions", "Awards, Honors & Accreditations", "State, national, and university recognitions showcase", {
        bgColor: "#f1f5f9",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 4,
      }),
    ],
  },

  // 3. Academics
  academics: {
    id: "academics",
    title: "Academics",
    slug: "/academics",
    sections: [
      createDefaultSection("academics-hero", "Hero Banner (Academics)", "Academic programs, degrees, and syllabus hero banner", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("ug-programs", "Undergraduate (UG) Degree Programs", "B.Sc, B.Com, BBA, BCA, and humanities degree specializations", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 3,
      }),
      createDefaultSection("pg-programs", "Postgraduate (PG) Degree Programs", "M.Sc, M.Com, MBA, and professional masters curriculum", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 2,
      }),
      createDefaultSection("academic-regulations", "Academic Regulations & Examination Policy", "CBCS system, attendance criteria, grading policy", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#334155",
      }),
      createDefaultSection("academic-calendar", "Academic Calendar & Schedules", "Semester schedules, mid-term dates, and exam timetables", {
        bgColor: "#f1f5f9",
        headingColor: "#002147",
        textColor: "#475569",
      }),
    ],
  },

  // 4. Admissions
  admissions: {
    id: "admissions",
    title: "Admissions",
    slug: "/admissions",
    sections: [
      createDefaultSection("admissions-hero", "Hero Banner (Admissions)", "Welcome prospective students, admission guidelines & eligibility", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("eligibility-criteria", "Eligibility & Course Matrix", "Cutoffs, prerequisite qualifications, and seat availability", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 3,
      }),
      createDefaultSection("admission-process", "Step-by-Step Admission Procedure", "Registration, counselling, document verification, and confirmation", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 4,
      }),
      createDefaultSection("fee-scholarships", "Fee Structure & Scholarships", "Tuition details, merit waivers, government fee reimbursement", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 2,
      }),
      createDefaultSection("enquiry-form", "Online Admission Enquiry Form", "Interactive student registration and counseling request box", {
        bgColor: "#001730",
        headingColor: "#ffffff",
        textColor: "#cbd5e1",
        accentColor: "#38bdf8",
        cardBg: "#002147",
      }),
    ],
  },

  // 5. Infrastructure
  infrastructure: {
    id: "infrastructure",
    title: "Infrastructure",
    slug: "/infrastructure",
    sections: [
      createDefaultSection("infra-hero", "Hero Banner (Infrastructure)", "World-class campus facilities, laboratories, and green campus", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("laboratories", "Science & Computer Labs", "State-of-the-art biotechnology, physics, chemistry, and computing labs", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 3,
      }),
      createDefaultSection("library", "Central Knowledge & Digital Library", "Over 35,000+ volumes, e-journals, INFLIBNET access", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 2,
      }),
      createDefaultSection("sports-hostel", "Sports Complex, Gymnasium & Student Hostel", "Indoor badminton stadium, safe residential hostel, and cafeteria", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 3,
      }),
      createDefaultSection("gallery-tour", "Campus Virtual Tour & Photo Gallery", "Visual walkthrough of college blocks, auditorium, and botanical gardens", {
        bgColor: "#001730",
        headingColor: "#ffffff",
        textColor: "#e2e8f0",
        columns: 4,
      }),
    ],
  },

  // 6. Faculty
  faculty: {
    id: "faculty",
    title: "Faculty",
    slug: "/faculty",
    sections: [
      createDefaultSection("faculty-hero", "Hero Banner (Faculty)", "Distinguished professors, PhD guides, and departmental mentors", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("faculty-directory", "Faculty Members Directory", "Departmental staff cards, qualifications, experience, and CV downloads", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 3,
      }),
      createDefaultSection("faculty-achievements", "Faculty Research & Recognition", "National awards, paper publications, and patents granted", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 2,
      }),
    ],
  },

  // 7. Student Support
  "student-support": {
    id: "student-support",
    title: "Student Support",
    slug: "/student-support",
    sections: [
      createDefaultSection("support-hero", "Hero Banner (Student Support)", "Holistic student development, welfare cells, and grievance mechanisms", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("statutory-cells", "Anti-Ragging, ICC & Grievance Redressal", "Zero tolerance statutory committees, complaint forms, and helplines", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 3,
      }),
      createDefaultSection("nss-ncc", "NSS, NCC & Community Service", "Social outreach, village adoption, discipline & character building", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 2,
      }),
      createDefaultSection("clubs-committees", "Student Clubs & Cultural Societies", "Literary, fine arts, eco-club, robotics, and sports council", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 3,
      }),
    ],
  },

  // 8. Placements
  placements: {
    id: "placements",
    title: "Placements",
    slug: "/placements",
    sections: [
      createDefaultSection("placements-hero", "Hero Banner (Placements)", "Career guidance, campus recruitment drives, and student placement records", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("placement-stats", "Placement Statistics & High Packages", "Top salary packages, recruiting companies count, and hire ratios", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 4,
      }),
      createDefaultSection("top-recruiters", "Corporate Recruiters Marquee", "TCS, Wipro, Infosys, Tech Mahindra, Cognizant, and banking partners", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 4,
      }),
      createDefaultSection("training-guidance", "Skill Development & Aptitude Training", "Soft skills, technical bootcamps, and mock interview coaching", {
        bgColor: "#f1f5f9",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 3,
      }),
    ],
  },

  // 9. Research & Innovation
  "research-innovation": {
    id: "research-innovation",
    title: "Research & Innovation",
    slug: "/research-innovation",
    sections: [
      createDefaultSection("research-hero", "Hero Banner (Research & Innovation)", "Scientific investigations, UGC projects, patents, and publication cell", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("rdc-cell", "Research Development Cell (RDC)", "Policy guidelines, code of ethics, seed money grants for scholars", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
      }),
      createDefaultSection("publications-patents", "Journal Publications, Books & Patents", "Scopus, Web of Science indexed papers and registered inventions", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 3,
      }),
      createDefaultSection("centres-of-excellence", "Centres of Excellence & Industry MoUs", "Collaborative corporate research labs and specialized learning centers", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 2,
      }),
    ],
  },

  // 10. Alumni
  alumni: {
    id: "alumni",
    title: "Alumni",
    slug: "/alumni",
    sections: [
      createDefaultSection("alumni-hero", "Hero Banner (Alumni Network)", "Global sisterhood, mentorship, and distinguished alumni association", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("alumni-association", "Alumni Association Overview", "Executive body, annual reunion gatherings, and chapter meetings", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
      }),
      createDefaultSection("distinguished-alumni", "Hall of Fame & Notable Achievers", "Civil servants, corporate leaders, entrepreneurs, and scientists", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 3,
      }),
      createDefaultSection("alumni-registration", "Alumni Connect & Membership Form", "Update current details, join mentorship batches, and stay connected", {
        bgColor: "#001730",
        headingColor: "#ffffff",
        textColor: "#cbd5e1",
        accentColor: "#38bdf8",
        cardBg: "#002147",
      }),
    ],
  },

  // 11. Quality Assurance (IQAC)
  "quality-assurance": {
    id: "quality-assurance",
    title: "Quality Assurance (IQAC)",
    slug: "/quality-assurance",
    sections: [
      createDefaultSection("iqac-hero", "Hero Banner (IQAC & NAAC)", "Internal Quality Assurance Cell, accreditation files, and audits", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("naac-accreditation", "NAAC Accreditation Certificates & SSR", "A+ Grade certificates, Institutional Information for Quality Assessment", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 2,
      }),
      createDefaultSection("aqar-reports", "Annual Quality Assurance Reports (AQAR)", "Yearly compliance submissions and quality progress benchmarks", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 3,
      }),
      createDefaultSection("best-practices", "Best Practices & Institutional Distinctiveness", "Eco-friendly campus initiatives, student empowerment frameworks", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 2,
      }),
    ],
  },

  // 12. Mandatory Disclosures
  "mandatory-disclosures": {
    id: "mandatory-disclosures",
    title: "Mandatory Disclosures",
    slug: "/mandatory-disclosures",
    sections: [
      createDefaultSection("disclosures-hero", "Hero Banner (Mandatory Disclosures)", "Statutory compliances, AICTE/UGC approvals, and public notifications", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("statutory-approvals", "AICTE & APSCHE Approvals", "Extension of approval orders, sanction letters, and university affiliations", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 3,
      }),
      createDefaultSection("ugc-certificates", "UGC 2(f) & 12(B) Recognition", "Official government gazettes, autonomy documents, and orders", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 2,
      }),
      createDefaultSection("rti-audited-statements", "RTI Act & Audited Financial Statements", "Public Information Officer contacts, balance sheets, and audit reports", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 2,
      }),
    ],
  },

  // 13. Strategic Plans
  "strategic-plans": {
    id: "strategic-plans",
    title: "Strategic Plans",
    slug: "/strategic-plans-and-future-directions",
    sections: [
      createDefaultSection("strategic-hero", "Hero Banner (Strategic Plans)", "Institutional development plan, future vision, and expansion goals", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("roadmap-milestones", "Strategic Roadmap (2025 - 2030)", "Key performance indicators, research milestones, and infrastructure targets", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        columns: 3,
      }),
      createDefaultSection("idp-document", "Institutional Development Plan (IDP)", "Detailed executive policy document and NEP 2020 alignment", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
      }),
    ],
  },

  // 14. Contact Us
  contact: {
    id: "contact",
    title: "Contact Us",
    slug: "/contact",
    sections: [
      createDefaultSection("contact-hero", "Hero Banner (Contact Us)", "Reach out to administrative officers, admissions desk, and campus directions", {
        bgColor: "#002147",
        headingColor: "#ffffff",
        textColor: "#bfdbfe",
      }),
      createDefaultSection("contact-cards", "Addresses, Phones & Official Emails", "Principal office, registrar, accounts section, and admission helpline", {
        bgColor: "#f8fafc",
        headingColor: "#002147",
        textColor: "#334155",
        columns: 3,
      }),
      createDefaultSection("contact-form", "Interactive Message & Feedback Form", "Send queries directly to the college administration team", {
        bgColor: "#ffffff",
        headingColor: "#002147",
        textColor: "#475569",
        cardBg: "#f8fafc",
      }),
      createDefaultSection("campus-map", "Google Map Location & Transit Directions", "Interactive map route from Guntur railway station and bus terminus", {
        bgColor: "#f1f5f9",
        headingColor: "#002147",
        textColor: "#334155",
      }),
    ],
  },
};

export const INITIAL_CUSTOMIZATION_DATA: SiteCustomizationData = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  updatedBy: "system",
  pages: INITIAL_PAGES_CONFIG,
};
