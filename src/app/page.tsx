"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Award,
  CheckCircle2,
  BookOpen,
  Users,
  Target,
  ShieldCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Quote,
  Building,
  Briefcase,
  Heart,
  ExternalLink,
  Newspaper,
  X,
  Calendar,
  FileText,
  Mail,
  FileEdit,
  Bell,
  Clock,
  Download,
  Info,
} from "lucide-react";
import Link from "next/link";
import {
  getCollegeMagazines,
  getNewsletters,
  getHomeBanners,
  getHomeGalleries,
  getEvents,
  getNotices,
} from "@/lib/sanity";
import {
  getEventLifecycle,
  getEventDocuments,
  getEventTimestamp,
  fallbackEventsHistory,
  EventDocument,
} from "@/lib/events";

// Components
import CollegeMagazinesSection, { MagazineItem } from "@/components/home/CollegeMagazinesSection";
import NewslettersSection, { NewsletterItem } from "@/components/home/NewslettersSection";
import HomePhotoGallery, { HomeGalleryDoc } from "@/components/home/HomePhotoGallery";
import TopRecruitersSection from "@/components/home/TopRecruitersSection";

// Default Fallback Hero Slides (Synced with Sanity Home Banners 2026)
const defaultSlides = [
  {
    _id: "home-hero-banner-1",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/6bd1fa93a6462c5711ed75e321d763ccb033d570-2048x768.png",
    tagline: "Accredited with 'A' Grade in First Cycle",
    title: "NAAC Accreditation & Academic Excellence",
    desc: "Embark on an extraordinary educational experience that blends character, academic competence, and social compassion.",
    cta1Text: "Explore More",
    cta1Link: "/about/the-institution/basic-institutional-information",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
  {
    _id: "home-hero-banner-2",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/790b62b21aa36ff48404322632b42654aa4974f2-2048x768.png",
    tagline: "29+ Years of Educational Eminence (1997 - 2026)",
    title: "St. Ann's College for Women, Gorantla",
    desc: "Empowering young women through world-class holistic education, values, and leadership development.",
    cta1Text: "Explore More",
    cta1Link: "/about/the-institution/history-of-the-college",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
  {
    _id: "home-hero-banner-3",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/b74daebe0d2b325ef480b581da9809ddd80750d3-2048x768.png",
    tagline: "Nurturing Confident Future Women Leaders",
    title: "Vibrant Campus & Community Life",
    desc: "State-of-the-art academic environment fostering innovation, personal mentorship, and community engagement.",
    cta1Text: "Explore More",
    cta1Link: "/academics/academic-programmes/undergraduate-programmes",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
  {
    _id: "home-hero-banner-4",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/8d67982f148c171d812682083a2a4ea6fa4ffab2-2048x768.png",
    tagline: "Modern Architectural Learning Facility",
    title: "Gnanam Block & Infrastructure",
    desc: "Spacious classrooms, dedicated faculty spaces, and smart educational amenities in Gorantla, Guntur.",
    cta1Text: "Explore More",
    cta1Link: "/about/the-institution/basic-institutional-information",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
  {
    _id: "home-hero-banner-5",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/4b345981175dc5a1ad02c770f3efff7b7acebe3a-2048x768.png",
    tagline: "Character, Competence & Compassion",
    title: "Student Empowerment & Development",
    desc: "Building socially compassionate, industry-ready leaders for modern global communities.",
    cta1Text: "Explore More",
    cta1Link: "/student-support/student-counselling",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
  {
    _id: "home-hero-banner-6",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/ae154d43b440b86df71948997c671430f2cb5179-2048x768.png",
    tagline: "Hands-on Research & Experimental Learning",
    title: "Advanced Science Laboratories",
    desc: "State-of-the-art equipment and specialized laboratory setups across science departments.",
    cta1Text: "Explore More",
    cta1Link: "/academics/academic-programmes/undergraduate-programmes",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
  {
    _id: "home-hero-banner-7",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/68d6b2ff34156513d10c8b5b5ee2e6955c677947-2048x768.png",
    tagline: "Cutting-Edge Digital Infrastructure",
    title: "State-of-the-Art IT & Computer Labs",
    desc: "High-speed networks, licensed software tools, and advanced computing terminals for MCA and UG students.",
    cta1Text: "Explore More",
    cta1Link: "/academics/academic-programmes/undergraduate-programmes",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
  {
    _id: "home-hero-banner-8",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/33ffcf89bafb677321ac84983b171ca7778086e1-2048x768.png",
    tagline: "Discipline, Duty & National Pride",
    title: "NCC & Leadership Training",
    desc: "Instilling patriotism, physical fitness, team synergy, and leadership among cadet students.",
    cta1Text: "Explore More",
    cta1Link: "/student-support/student-support-services",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
  {
    _id: "home-hero-banner-9",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/95031f21efbc370d814bac776f50563b8880cf51-2048x768.png",
    tagline: "AICTE Approved & UGC 2(f) Recognized",
    title: "Accreditations & Institutional Recognitions",
    desc: "Permanently affiliated to Acharya Nagarjuna University with stellar quality certifications.",
    cta1Text: "Explore More",
    cta1Link: "/naac-peer-team",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
  {
    _id: "home-hero-banner-10",
    imageUrl: "https://cdn.sanity.io/images/fhjwqub5/production/f97b3d918cf9125a21432e68a7f09629f02da810-2048x768.png",
    tagline: "Career Opportunities with Global Leaders",
    title: "Placement Achievements & Industry Linkages",
    desc: "Top multinational recruiters and comprehensive career placement training for graduating batches.",
    cta1Text: "Explore More",
    cta1Link: "/placements/training-placements",
    cta2Text: "Contact Us",
    cta2Link: "/contact",
  },
];

// Why Choose Tabs
const whyTabs = [
  {
    id: "philosophy",
    title: "The 3C Philosophy",
    icon: Heart,
    heading: "Character, Competence, and Compassion",
    text: "At St. Ann's, we believe higher education transcends regular classroom lectures. We foster moral uprightness (Character), high-level industrial capabilities (Competence), and dynamic social empathy (Compassion) to nurture women who can confidently lead modern communities.",
    bulletPoints: [
      "Guided spiritual and moral value mentoring systems",
      "Experiential, real-world case study workflows",
      "Regular rural outreach and community development initiatives",
    ],
    bgGradient: "from-rose-500/10 via-pink-500/5 to-transparent",
  },
  {
    id: "academics",
    title: "Premium Academics",
    icon: GraduationCap,
    heading: "UGC 2(f) Recognized Pedagogy",
    text: "Offering premier degree programs across Commerce, Science, Humanities, and Postgraduate tracks (MCA & MBA). We implement student-centric 'learning by doing' methodologies and value-added skill courses.",
    bulletPoints: [
      "Intensive training in Tally, GST, and Banking practices",
      "State-of-the-art computer networks and lab systems",
      "Distinguished faculty holding PhD and senior qualifications",
    ],
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "infrastructure",
    title: "World-Class Campus",
    icon: Building,
    heading: "Empowering Infrastructure & Safety",
    text: "A safe, green campus featuring high-speed digital tools. Safe and modern hostel accommodations, extensive sports playgrounds, ICT-enabled classrooms, and advanced science labs prepare students for technological frontiers.",
    bulletPoints: [
      "Completely secure campus with dedicated surveillance systems",
      "Comprehensive library with extensive digital and physical catalogs",
      "Modern hygienic canteen and in-campus medical center support",
    ],
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: "placements",
    title: "Career Success",
    icon: Briefcase,
    heading: "100% Dedicated Placement Training",
    text: "Bridging the gap between corporate expectations and academic excellence. Our active placement cell equips students with aptitude training, mock interviews, and communication courses, leading to top placement tracks.",
    bulletPoints: [
      "Continuous collaborations and MoUs with major firms",
      "Annual recruitment drives with global tech and financial players",
      "Comprehensive career guidance starting from the first year",
    ],
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
];

// Fixed Left Social Media Channels
const socialMediaButtons = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@stannscollegeforwomen",
    bg: "bg-[#FF0000] hover:bg-[#D90000]",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61593155107273",
    bg: "bg-[#1877F2] hover:bg-[#0c65d6]",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/stannscollegeforwomengnt",
    bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    url: "https://whatsapp.com/channel/0029Vb9FPmy0bIdpHlLFXY3c",
    bg: "bg-[#25D366] hover:bg-[#1faa54]",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    bg: "bg-[#0A66C2] hover:bg-[#084e96]",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

// Default Events & Activities (Matching Image 1)
const defaultEventsList = [
  {
    day: "31st",
    monthYear: "July 2026",
    title: "Depts. Of Microbiology and Biochemistry organizes session on science communcation- Beyond Beakers & Books.",
    link: "/events",
  },
  {
    day: "24th",
    monthYear: "July 2026",
    title: "One Day Workshop on Understanding Gender in Everyday Life: POSH Act Awareness for Peer Leaders.",
    link: "/events",
  },
  {
    day: "14th",
    monthYear: "July 2026",
    title: "Department of Botany is conducting Haritha haram - The plantation program.",
    link: "/events",
  },
  {
    day: "12th",
    monthYear: "August 2026",
    title: "One day Online Workshop on National Remote Sensing Day – 2026",
    link: "/events",
  },
  {
    day: "8th",
    monthYear: "June 2028",
    title: "The School of Informatics, IQAC & IDPC present a Faculty Workshop on AI Ethics and Governance by Fr. Dr. M. Xavier Rex SJ, exploring responsible and ethical use of AI in academia.",
    link: "/events",
  },
];

// Official Notices (Extracted from NOTICES (1).docx)
const defaultNoticesList = [
  {
    _id: "notice-ug-phase1-allotment-sep-2026",
    title: "UG I Year – Phase I Seat Allotment",
    date: "7 September 2026",
    category: "admissions",
    description:
      "UG I Year Phase I Seat Allotment was released by the concerned Higher Education authorities. Students allotted seats at St. Ann’s College for Women are advised to complete the prescribed admission and registration formalities within the notified schedule.",
    linkUrl: "https://cap.apcfss.in",
    linkLabel: "APCFSS Portal (https://cap.apcfss.in)",
    links: [
      {
        title: "APCFSS Portal (https://cap.apcfss.in)",
        url: "https://cap.apcfss.in",
      },
    ],
  },
  {
    _id: "notice-mca-mba-seat-allotment-sep-2026",
    title: "MCA & MBA – Seat Allotment",
    date: "9 September 2026",
    category: "admissions",
    description:
      "MCA & MBA seat allotment was released through AP ICET Admissions. Candidates allotted seats at St. Ann’s College for Women, Gorantla, Guntur (College Code: AANG) are advised to complete the required admission formalities.",
    linkUrl: "https://cets.apsche.ap.gov.in",
    linkLabel: "AP ICET Admissions Portal",
    links: [
      {
        title: "AP ICET Admissions Portal",
        url: "https://cets.apsche.ap.gov.in",
      },
    ],
  },
  {
    _id: "notice-commencement-mca-mba-classes-sep-2026",
    title: "Commencement of MCA & MBA Classes",
    date: "16 September 2026",
    category: "academic",
    description:
      "Classes for MCA & MBA First Year – Batch Y27 will commence from 16 September 2026. Students are requested to report to the College on time and attend classes regularly.",
  },
  {
    _id: "notice-nypunyam-portal-registration-sep-2026",
    title: "UG & PG Student Registration – Nypunyam Portal",
    date: "11 September 2026",
    category: "academic",
    description:
      "All UG & PG students are required to complete their Nypunyam Portal registration and resume-related formalities on or before 20 September 2026, as per the instructions issued by Commissioner of Higher Education (CHE), Acharya Nagarjuna University (ANU), APSSDC and other concerned authorities.\n\nStudents who complete the registration process are required to complete/update their Resume Templates in the Nypunyam Portal as per the prescribed instructions.\n\n📌 Registration & Resume Completion Deadline: 20 September 2026\n\nStudents are advised to regularly check the College Website and Official Notices for further instructions and updates.",
    linkUrl: "https://nypunyam.apssdc.in",
    linkLabel: "Nypunyam Portal (APSSDC)",
    links: [
      {
        title: "Nypunyam Portal (APSSDC)",
        url: "https://nypunyam.apssdc.in",
      },
    ],
  },
];

// Helper: Returns true only if the notice was published within 2 weeks (14 days)
function isNoticeNew(dateStr?: string): boolean {
  if (!dateStr) return false;

  let noticeTime = Date.parse(dateStr);
  if (isNaN(noticeTime)) {
    const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1").trim();
    noticeTime = Date.parse(cleaned);
  }

  if (isNaN(noticeTime)) {
    const parts = dateStr.match(/(\d{1,2})[-/ ]([A-Za-z]+|\d{1,2})[-/ ](\d{4})/);
    if (parts) {
      noticeTime = Date.parse(`${parts[2]} ${parts[1]}, ${parts[3]}`);
    }
  }

  if (isNaN(noticeTime)) return false;

  const now = Date.now();
  const diffMs = now - noticeTime;
  const twoWeeksMs = 14 * 24 * 60 * 60 * 1000;

  // Shown for 2 weeks from the date of publishing
  return diffMs <= twoWeeksMs && diffMs >= -twoWeeksMs;
}

// Client-approved Starburst NEW badge matching the official circulars / events layout
const StarburstNewBadge = () => (
  <span className="relative inline-flex items-center justify-center shrink-0 w-5 h-5 sm:w-5.5 sm:h-5.5 select-none my-0.5 animate-pulse">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.18)]">
      <polygon
        points="50,0 61,24 85,15 79,40 100,50 79,60 85,85 61,76 50,100 39,76 15,85 21,60 0,50 21,40 15,15 39,24"
        fill="#FFE600"
        stroke="#EAB308"
        strokeWidth="3"
      />
    </svg>
    <span className="absolute font-black text-[6.5px] sm:text-[7px] text-[#DC2626] tracking-tighter leading-none font-sans scale-90">
      NEW
    </span>
  </span>
);

// Dynamic Upcoming Badge: Shown till the end of the event date
const UpcomingBadge = () => (
  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[8.5px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs shrink-0 select-none my-0.5">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    Upcoming
  </span>
);

export default function HomePage() {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState<any[]>(defaultSlides);

  // Dynamic Sanity Data States
  const [magazines, setMagazines] = useState<MagazineItem[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [galleries, setGalleries] = useState<HomeGalleryDoc[]>([]);
  const [sanityEvents, setSanityEvents] = useState<any[]>(fallbackEventsHistory);
  const [sanityNotices, setSanityNotices] = useState<any[]>([]);

  // Right Side Drawer / Modal State for Degree Pathways, Magazine & Monthly Newsletter
  const [activeRightDrawer, setActiveRightDrawer] = useState<"pathways" | "magazine" | "newsletter" | null>(null);

  // Document popup modal for events with documents and details
  const [activeDocModal, setActiveDocModal] = useState<{
    eventTitle: string;
    bannerUrl?: string;
    eventDate?: string;
    organizer?: string;
    description?: string;
    links?: { title: string; url: string }[];
    documents: EventDocument[];
  } | null>(null);

  // Notice popup modal for notice board items with details, links and pdfs
  const [activeNoticeModal, setActiveNoticeModal] = useState<{
    title: string;
    date?: string;
    category?: string;
    description?: string;
    links: { title: string; url: string }[];
    documents: { title: string; url: string; originalFilename?: string }[];
  } | null>(null);

  // In-app PDF Viewer Modal state (opens PDF in a popup modal, not in another tab)
  const [viewingPdfModal, setViewingPdfModal] = useState<{
    title: string;
    url: string;
  } | null>(null);

  // Handler for clicking event details / documents: Always open the contents modal
  const handleEventDocClick = (item: any) => {
    const docs = getEventDocuments(item);
    const links: { title: string; url: string }[] = [];
    if (item.link || item.eventUrl || item.registrationLink) {
      links.push({
        title: item.linkLabel || "Event Registration / Portal Link",
        url: item.link || item.eventUrl || item.registrationLink,
      });
    }
    if (Array.isArray(item.links)) {
      item.links.forEach((l: any) => {
        if (l?.url && !links.some((existing) => existing.url === l.url)) {
          links.push({
            title: l.title || l.url,
            url: l.url,
          });
        }
      });
    }

    // Open the contents modal
    setActiveDocModal({
      eventTitle: item.title,
      bannerUrl: item.bannerUrl || item.imageUrl || item.banner || item.image || "/images/infrastructure/campus-buildings/img-1.jpg",
      eventDate: item.date || item.eventDate,
      organizer: item.organizer,
      description: item.description,
      links,
      documents: docs,
    });
  };

  // Handler for clicking notice details: Opens the notice popup modal with full details, links and pdfs
  const handleNoticeClick = (item: any) => {
    const links: { title: string; url: string }[] = [];
    if (item.linkUrl) {
      links.push({
        title: item.linkLabel || item.linkUrl,
        url: item.linkUrl,
      });
    }
    if (Array.isArray(item.links)) {
      item.links.forEach((l: any) => {
        if (l?.url && !links.some((existing) => existing.url === l.url)) {
          links.push({
            title: l.title || l.url,
            url: l.url,
          });
        }
      });
    }

    const documents: { title: string; url: string; originalFilename?: string }[] = [];
    if (item.pdfUrl) {
      documents.push({
        title: item.pdfTitle || "Official Circular (PDF)",
        url: item.pdfUrl,
        originalFilename: "Official_Circular.pdf",
      });
    }
    if (Array.isArray(item.documents)) {
      item.documents.forEach((d: any) => {
        if (d?.url && !documents.some((existing) => existing.url === d.url)) {
          documents.push({
            title: d.title || d.originalFilename || "Notice Document",
            url: d.url,
            originalFilename: d.originalFilename,
          });
        }
      });
    }

    setActiveNoticeModal({
      title: item.title,
      date: item.date,
      category: item.category,
      description: item.description,
      links,
      documents,
    });
  };

  // Active Tab State
  const [activeTab, setActiveTab] = useState("philosophy");

  // Fetch Sanity Data on Mount
  useEffect(() => {
    async function loadData() {
      try {
        const [magsData, newsData, bannersData, galleryData, eventsData, noticesData] = await Promise.all([
          getCollegeMagazines(),
          getNewsletters(),
          getHomeBanners(),
          getHomeGalleries(),
          getEvents(),
          getNotices(),
        ]);

        if (magsData && magsData.length > 0) setMagazines(magsData);
        if (newsData && newsData.length > 0) setNewsletters(newsData);
        if (bannersData && bannersData.length > 0) setHeroSlides(bannersData);
        if (galleryData && galleryData.length > 0) setGalleries(galleryData);
        if (eventsData && eventsData.length > 0) setSanityEvents(eventsData);
        if (noticesData && noticesData.length > 0) setSanityNotices(noticesData);
      } catch (err) {
        console.error("Error loading home page Sanity data:", err);
      }
    }
    loadData();
  }, []);

  // Auto transition hero slides continuously one by one every 4.5 seconds
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearTimeout(timer);
  }, [currentSlide, heroSlides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Dynamically calculate hero banner height so it fills the screen down to the screen edge
  const sectionRef = useRef<HTMLElement>(null);
  const [bannerHeight, setBannerHeight] = useState<string>("calc(100vh - 220px)");

  useEffect(() => {
    const updateBannerHeight = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const availableHeight = Math.max(340, window.innerHeight - sectionTop);
        setBannerHeight(`${availableHeight}px`);
      }
    };

    updateBannerHeight();
    window.addEventListener("resize", updateBannerHeight);
    const timer1 = setTimeout(updateBannerHeight, 150);
    const timer2 = setTimeout(updateBannerHeight, 600);

    return () => {
      window.removeEventListener("resize", updateBannerHeight);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Segregate Events & Activities into 2 parts:
  // Visible events filtered by startDate
  const visibleEvents = sanityEvents.filter((item) => getEventLifecycle(item).isVisible);

  // Upper part: Other / Conducted events whose event date is crossed (latest date first, oldest last)
  const otherEvents = visibleEvents
    .filter((item) => getEventLifecycle(item).status !== "upcoming")
    .sort((a, b) => getEventTimestamp(b) - getEventTimestamp(a));

  // Bottom part: Upcoming events & activities (oldest date first)
  const upcomingEvents = visibleEvents
    .filter((item) => getEventLifecycle(item).status === "upcoming")
    .sort((a, b) => getEventTimestamp(a) - getEventTimestamp(b));

  return (
    <div className="flex flex-col w-full bg-slate-50/30 overflow-x-hidden selection:bg-[#002147]/10 selection:text-[#002147]">
      {/* ----------------------------------------------------
          1. HERO SLIDER SECTION (Visual Wow Factor)
          ---------------------------------------------------- */}
      <section
        ref={sectionRef}
        style={{ height: bannerHeight }}
        className="relative w-full min-h-[340px] bg-slate-950 overflow-hidden select-none transition-colors duration-300"
      >
          <div className="relative w-full h-full">
            {heroSlides.map((slide, index) => {
              const isActive = index === currentSlide;
              const slideImg = (
                <div className="relative w-full h-full overflow-hidden">
                  {/* Full-bleed banner image filling the banner container completely with no top cropping */}
                  <img
                    src={slide.imageUrl}
                    alt={slide.title || `St. Ann's College Banner ${index + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              );
              return (
                <div
                  key={slide._id || index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {slide.linkUrl || slide.cta1Link ? (
                    <Link href={slide.linkUrl || slide.cta1Link} className="block w-full h-full">
                      {slideImg}
                    </Link>
                  ) : (
                    slideImg
                  )}
                </div>
              );
            })}
          </div>

          {/* Carousel Slider Controls */}
          {heroSlides.length > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white transition-all active:scale-95 shadow-lg cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white transition-all active:scale-95 shadow-lg cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </>
          )}
        </section>

      {/* ----------------------------------------------------
          6. THREE-COLUMN HIGHLIGHTS: EVENTS, PRINCIPAL MESSAGE & NOTICES
          ---------------------------------------------------- */}
      <section className="pt-2 pb-10 sm:pt-3 sm:pb-14 bg-gradient-to-b from-slate-100/70 via-white to-slate-50/80 border-b border-slate-200/90 select-none relative overflow-hidden transition-colors duration-300">
        {/* Subtle atmospheric ambient glows */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-[1780px] px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            
            {/* BOX 1: Events & Activities */}
            <div className="flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-indigo-950/10 hover:border-indigo-200/80 transition-all duration-500 overflow-hidden group">
              {/* Compact Sleek Header */}
              <div className="bg-gradient-to-r from-[#002147] via-[#002d5f] to-[#0a3d78] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between relative overflow-hidden border-b border-indigo-950/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent)] pointer-events-none" />
                <div className="flex items-center gap-2.5 relative z-10 min-w-0">
                  <div className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner shrink-0">
                    <Calendar className="h-3.5 w-3.5 text-sky-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-outfit text-sm sm:text-base font-black tracking-tight text-white leading-tight truncate">
                      Events &amp; Activities
                    </h3>
                    <p className="text-[10px] font-medium text-sky-200/80 leading-none mt-0.5 truncate">
                      Campus workshops &amp; symposiums
                    </p>
                  </div>
                </div>
                <span className="relative z-10 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-white/10 backdrop-blur-md border border-white/20 text-sky-200 uppercase tracking-widest flex items-center gap-1 shadow-xs shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Upcoming
                </span>
              </div>

              {/* Two Segregated Sections: Conducted Events (Upper) & Upcoming Events (Bottom) */}
              {visibleEvents.length > 0 ? (
                <div className="flex-1 flex flex-col min-h-0 bg-white">
                  {/* ── 1. UPPER PART: Conducted Events & Activities (with View Circular / Report) ── */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="px-3.5 py-1.5 bg-slate-100/90 border-b border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-700 shrink-0" />
                        <span className="font-outfit text-[11px] font-black text-slate-800 tracking-wider uppercase">
                          Conducted Events &amp; Activities
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-200 text-slate-700">
                        {otherEvents.length} Recorded
                      </span>
                    </div>

                    {/* Scroller 1: Conducted Events */}
                    <div className="flex-1 overflow-y-auto max-h-[210px] divide-y divide-slate-100 p-2 bg-white">
                      {otherEvents.length > 0 ? (
                        otherEvents.map((item, idx) => {
                          const lifecycle = getEventLifecycle(item);
                          return (
                            <div
                              key={item._id || idx}
                              className="py-2.5 px-3 flex items-start gap-2.5 hover:bg-indigo-50/40 transition-colors group/item"
                            >
                              {/* Dynamic Badge: Starburst NEW for 3 days post-event */}
                              <div className="shrink-0 flex items-center justify-center min-w-[24px]">
                                {lifecycle.status === "new" ? (
                                  <StarburstNewBadge />
                                ) : null}
                              </div>

                              <Mail className="h-4 w-4 text-slate-700 shrink-0 stroke-[1.75] mt-0.5 group-hover/item:text-[#002147] transition-colors" />

                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-[13px] font-medium text-slate-800 leading-snug">
                                  <span className="font-semibold text-slate-900 group-hover/item:text-[#002147] transition-colors">
                                    {item.title}
                                  </span>
                                  {item.date && (
                                    <span className="text-slate-600 font-normal"> ({item.date})</span>
                                  )}
                                  {" "}
                                  <button
                                    type="button"
                                    onClick={() => handleEventDocClick(item)}
                                    className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold bg-indigo-50 hover:bg-[#002147] text-[#002147] hover:text-white border border-indigo-200 hover:border-[#002147] transition-all duration-200 shadow-2xs cursor-pointer align-baseline group/btn"
                                    title="Click for more"
                                  >
                                    <FileText className="h-3 w-3 shrink-0 text-indigo-600 group-hover/btn:text-white transition-colors" />
                                    <span>Click for more</span>
                                  </button>
                                </div>
                                {item.organizer && (
                                  <p className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                                    Organized by: {item.organizer}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-slate-400 p-4 text-center">No past events recorded</p>
                      )}
                    </div>
                  </div>

                  {/* ── 2. BOTTOM PART: Upcoming Events & Activities ── */}
                  <div className="flex-1 flex flex-col min-h-0 border-t-2 border-slate-200">
                    <div className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-50/90 to-teal-50/80 border-b border-emerald-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="font-outfit text-[11px] font-black text-emerald-950 tracking-wider uppercase">
                          Upcoming Events &amp; Activities
                        </span>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {upcomingEvents.length} Scheduled
                      </span>
                    </div>

                    {/* Scroller 2: Upcoming Events */}
                    <div className="flex-1 overflow-y-auto max-h-[210px] divide-y divide-slate-100 p-2 bg-white">
                      {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((item, idx) => {
                          return (
                            <div
                              key={item._id || idx}
                              className="py-2.5 px-3 flex items-start gap-2.5 hover:bg-emerald-50/30 transition-colors group/item"
                            >
                              <Mail className="h-4 w-4 text-slate-700 shrink-0 stroke-[1.75] mt-0.5 group-hover/item:text-[#002147] transition-colors" />

                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-[13px] font-medium text-slate-800 leading-snug">
                                  <span className="font-semibold text-slate-900 group-hover/item:text-[#002147] transition-colors">
                                    {item.title}
                                  </span>
                                  {item.date && (
                                    <span className="text-slate-600 font-normal"> ({item.date})</span>
                                  )}
                                  {" "}
                                  <button
                                    type="button"
                                    onClick={() => handleEventDocClick(item)}
                                    className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold bg-emerald-50 hover:bg-[#002147] text-emerald-800 hover:text-white border border-emerald-200 hover:border-[#002147] transition-all duration-200 shadow-2xs cursor-pointer align-baseline group/btn"
                                    title="Click for more"
                                  >
                                    <FileText className="h-3 w-3 shrink-0 text-emerald-600 group-hover/btn:text-white transition-colors" />
                                    <span>Click for more</span>
                                  </button>
                                </div>
                                {item.organizer && (
                                  <p className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                                    Organized by: {item.organizer}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-slate-400 p-4 text-center">No upcoming events scheduled</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Coming Soon State */
                <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 text-center bg-slate-50/40 min-h-[340px]">
                  <div className="h-16 w-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-sm">
                    <Calendar className="h-7 w-7 text-indigo-600 animate-pulse" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100/80 text-indigo-800 border border-indigo-200/80 mb-2">
                    <Sparkles className="h-3 w-3 text-indigo-600" /> Coming Soon
                  </span>
                  <h4 className="font-outfit text-base sm:text-lg font-bold text-slate-800">
                    Events Calendar Being Scheduled
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mt-1.5 leading-relaxed">
                    Upcoming academic conferences, student workshops, and cultural galas will be posted here directly via Sanity.
                  </p>
                </div>
              )}

              {/* Bottom Modern Button */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-center">
                <Link
                  href="/events"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#002147] to-[#0a3d78] hover:from-[#002d5f] hover:to-[#0f4d96] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#002147]/15 transition-all duration-300 active:scale-98 group/btn"
                >
                  <span>More Events &amp; Activities</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* BOX 2: Principal Profile & Leadership Message */}
            <div className="flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-indigo-950/10 hover:border-indigo-200/80 transition-all duration-500 overflow-hidden p-3.5 sm:p-4 justify-between group">
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center shadow-xs">
                      <Quote className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <h3 className="font-outfit text-sm sm:text-base font-black text-slate-900 leading-none">
                      Principal&apos;s Desk
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200/70 uppercase tracking-wider">
                    Leadership
                  </span>
                </div>

                {/* Framed Photo with subtle glow */}
                <div className="w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-md aspect-[16/10] bg-slate-100 relative group/photo mt-4">
                  <img
                    src="/images/principal.jpg"
                    alt="Dr. Sr. Sandhya Thumma"
                    className="w-full h-full object-cover object-top group-hover/photo:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/40 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Name & Credentials */}
                <div className="text-center mt-4">
                  <h4 className="font-outfit text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    Dr. Sr. Sandhya Thumma
                  </h4>
                  <p className="text-xs font-bold text-indigo-600 tracking-wider uppercase mt-1">
                    Principal, St. Ann&apos;s College
                  </p>
                  <p className="font-sans text-[11px] font-semibold text-slate-400 mt-0.5">
                    MBA, M.Com, M.Ed, Ph.D.
                  </p>
                </div>

                {/* Message Box with Watermark Quote */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-50/90 border border-slate-100 relative overflow-hidden">
                  <Quote className="absolute -top-1 -right-1 h-12 w-12 text-indigo-100/50 pointer-events-none" />
                  <div className="flex items-center gap-1.5 mb-1.5 text-[#002147] relative z-10">
                    <FileText className="h-3.5 w-3.5 text-indigo-600" />
                    <span className="font-outfit text-xs font-black uppercase tracking-wider text-indigo-900">
                      Welcome Message
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal relative z-10">
                    &ldquo;Dear Students, Faculty, and Visitors, It is with great pleasure and enthusiasm that I welcome you to our Degree and PG College for Women&apos;s website.&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom Button */}
              <div className="mt-4 pt-2">
                <Link
                  href="/about/the-institution/head-of-the-institution"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#002147] to-[#0a3d78] hover:from-[#002d5f] hover:to-[#0f4d96] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#002147]/15 transition-all duration-300 active:scale-98 group/btn"
                >
                  <span>Read Full Welcome Message</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* BOX 3: Notices */}
            <div className="flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-indigo-950/10 hover:border-indigo-200/80 transition-all duration-500 overflow-hidden group">
              {/* Compact Sleek Header */}
              <div className="bg-gradient-to-r from-[#002147] via-[#002d5f] to-[#0a3d78] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between relative overflow-hidden border-b border-indigo-950/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent)] pointer-events-none" />
                <div className="flex items-center gap-2.5 relative z-10 min-w-0">
                  <div className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner shrink-0">
                    <Bell className="h-3.5 w-3.5 text-rose-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-outfit text-sm sm:text-base font-black tracking-tight text-white leading-tight truncate">
                      Notice Board
                    </h3>
                    <p className="text-[10px] font-medium text-rose-200/80 leading-none mt-0.5 truncate">
                      Academic timetables &amp; circulars
                    </p>
                  </div>
                </div>
                <span className="relative z-10 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-white/10 backdrop-blur-md border border-white/20 text-rose-200 uppercase tracking-widest flex items-center gap-1 shadow-xs shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  Active
                </span>
              </div>

              {/* Items List matching client requested format */}
              {(sanityNotices.length > 0 ? sanityNotices : defaultNoticesList).length > 0 ? (
                <div className="flex-1 divide-y divide-slate-200 overflow-y-auto max-h-[460px] p-2 bg-white">
                  {(sanityNotices.length > 0 ? sanityNotices : defaultNoticesList).map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="py-2.5 px-3 flex items-start gap-2.5 hover:bg-rose-50/40 transition-colors group/item"
                    >
                      <div className="shrink-0 flex items-center justify-center min-w-[22px]">
                        {isNoticeNew(item.date) && <StarburstNewBadge />}
                      </div>
                      <Mail className="h-4 w-4 text-slate-700 shrink-0 stroke-[1.75] mt-0.5 group-hover/item:text-[#002147] transition-colors" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-[13px] font-medium text-slate-800 leading-snug">
                          <span
                            onClick={() => handleNoticeClick(item)}
                            className="font-semibold text-slate-900 hover:text-[#002147] transition-colors cursor-pointer"
                          >
                            {item.title}
                          </span>
                          {item.date && (
                            <span className="text-slate-600 font-normal"> ({item.date})</span>
                          )}
                          {" "}
                          <button
                            type="button"
                            onClick={() => handleNoticeClick(item)}
                            className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold bg-rose-50 hover:bg-[#002147] text-rose-800 hover:text-white border border-rose-200 hover:border-[#002147] transition-all duration-200 shadow-2xs cursor-pointer align-baseline group/btn"
                            title="Click for more"
                          >
                            <FileText className="h-3 w-3 shrink-0 text-rose-600 group-hover/btn:text-white transition-colors" />
                            <span>Click for more</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Coming Soon State */
                <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 text-center bg-slate-50/40 min-h-[340px]">
                  <div className="h-16 w-16 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 shadow-sm">
                    <Bell className="h-7 w-7 text-rose-600 animate-pulse" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100/80 text-rose-800 border border-rose-200/80 mb-2">
                    <Sparkles className="h-3 w-3 text-rose-600" /> Coming Soon
                  </span>
                  <h4 className="font-outfit text-base sm:text-lg font-bold text-slate-800">
                    Official Circulars Being Published
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mt-1.5 leading-relaxed">
                    University examination schedules, timetables, and academic circulars will be published here directly via Sanity.
                  </p>
                </div>
              )}

              {/* Bottom Modern Button */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-center">
                <Link
                  href="/notices"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#002147] to-[#0a3d78] hover:from-[#002d5f] hover:to-[#0f4d96] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#002147]/15 transition-all duration-300 active:scale-98 group/btn"
                >
                  <span>More Notices &amp; Circulars</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          7. DYNAMIC CAMPUS PHOTO GALLERY
          ---------------------------------------------------- */}
      {galleries.length > 0 && (
        <div className="transition-colors duration-300">
          <HomePhotoGallery galleries={galleries} />
        </div>
      )}

      {/* ----------------------------------------------------
          8. TOP RECRUITERS & CORPORATE PLACEMENT PARTNERS (FLOATING LTR)
          ---------------------------------------------------- */}
      <TopRecruitersSection />

      {/* ----------------------------------------------------
          11. BOTTOM ACTION & MAP
          ---------------------------------------------------- */}
      <section className="py-12 bg-slate-900 text-white select-none transition-colors duration-300">
          <div className="mx-auto max-w-[1780px] px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-indigo-300">
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-outfit text-sm font-black uppercase tracking-wider text-indigo-300 leading-none">
                    Official Mandates
                  </h4>
                  <p className="font-sans text-xs text-slate-400 mt-2 font-medium">
                    We are highly committed to NAAC guidelines &amp; compliance regulations for higher educational institutions.
                  </p>
                  <Link
                    href="/naac-peer-team"
                    className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold mt-2"
                  >
                    NAAC Peer Team Visit <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-indigo-300">
                  <Building className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-outfit text-sm font-black uppercase tracking-wider text-indigo-300 leading-none">
                    Campus Admissions
                  </h4>
                  <p className="font-sans text-xs text-slate-400 mt-2 font-medium">
                    Direct convener &amp; management seats for UG Honours and AICTE approved PG (MCA &amp; MBA) programmes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-indigo-300">
                  <ExternalLink className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-outfit text-sm font-black uppercase tracking-wider text-indigo-300 leading-none">
                    Apply Today
                  </h4>
                  <p className="font-sans text-xs text-slate-400 mt-2 font-medium">
                    Submit your online application enquiry now to reserve counseling support from our Help Desk.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("open-admission-enquiry"));
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold mt-2 cursor-pointer transition-colors"
                  >
                    Start Application <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      {/* ----------------------------------------------------
          FIXED LEFT NOTCH BUTTONS: Social Media Channels
          (Fixed at middle of screen, persistent on scroll)
          ---------------------------------------------------- */}
      <aside
        aria-label="Social Media Channels"
        className="fixed left-0 top-[60%] -translate-y-1/2 z-30 flex flex-col gap-1.5 select-none items-start"
      >
        {socialMediaButtons.map((btn) => (
          <a
            key={btn.name}
            href={btn.url}
            target="_blank"
            rel="noreferrer"
            title={`Follow St. Ann's on ${btn.name}`}
            className={`group flex items-center ${btn.bg} text-white pl-2.5 pr-2.5 py-2.5 rounded-r-2xl shadow-xl shadow-slate-950/20 border-r-2 border-y border-white/20 transition-all duration-300 transform -translate-x-1 hover:translate-x-0 cursor-pointer`}
          >
            <div className="shrink-0 flex items-center justify-center h-5 w-5">{btn.icon}</div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[120px] group-hover:pl-2 text-xs font-bold transition-all duration-300 ease-out font-sans">
              {btn.name}
            </span>
          </a>
        ))}
      </aside>

      {/* ----------------------------------------------------
          FIXED RIGHT NOTCH BUTTONS: Degree Pathways, College Magazine & Monthly News Letter
          (Ultra-compact vertical orientation, positioned safely below top navigation)
          ---------------------------------------------------- */}
      <aside
        aria-label="Academic & Publication Shortcuts"
        className="fixed right-0 top-[65%] -translate-y-1/2 z-30 flex flex-col gap-2 select-none items-end"
      >
        {/* 1. Explore Degree Pathways Vertical Notch */}
        <button
          onClick={() => setActiveRightDrawer("pathways")}
          className="group flex flex-col items-center gap-1.5 bg-gradient-to-b from-[#001730] to-[#002147] hover:from-blue-950 hover:to-blue-800 text-white px-2.5 py-3 rounded-l-2xl border-l-[3px] border-y border-blue-400/50 shadow-xl shadow-blue-950/60 transition-all duration-300 transform translate-x-1 hover:translate-x-0 cursor-pointer"
          title="Explore Degree Pathways"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/25 group-hover:bg-blue-500 text-blue-300 group-hover:text-white transition-all shrink-0 border border-blue-400/40 shadow-xs">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="[writing-mode:vertical-rl] rotate-180 font-outfit font-extrabold text-[11px] tracking-wider uppercase text-white group-hover:text-blue-200 transition-colors py-1 select-none whitespace-nowrap">
            Pathways
          </span>
        </button>

        {/* 2. College Annual Magazine Vertical Notch */}
        <button
          onClick={() => setActiveRightDrawer("magazine")}
          className="group flex flex-col items-center gap-1.5 bg-gradient-to-b from-[#001730] to-[#1e1b4b] hover:from-indigo-950 hover:to-indigo-800 text-white px-2.5 py-3 rounded-l-2xl border-l-[3px] border-y border-indigo-400/50 shadow-xl shadow-indigo-950/60 transition-all duration-300 transform translate-x-1 hover:translate-x-0 cursor-pointer"
          title="College Annual Magazine"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/25 group-hover:bg-indigo-500 text-indigo-300 group-hover:text-white transition-all shrink-0 border border-indigo-400/40 shadow-xs">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="[writing-mode:vertical-rl] rotate-180 font-outfit font-extrabold text-[11px] tracking-wider uppercase text-white group-hover:text-indigo-200 transition-colors py-1 select-none whitespace-nowrap">
            Magazine
          </span>
        </button>

        {/* 3. Monthly News Letter Vertical Notch */}
        <button
          onClick={() => setActiveRightDrawer("newsletter")}
          className="group flex flex-col items-center gap-1.5 bg-gradient-to-b from-[#001730] to-[#00382b] hover:from-emerald-950 hover:to-emerald-800 text-white px-2.5 py-3 rounded-l-2xl border-l-[3px] border-y border-emerald-400/50 shadow-xl shadow-emerald-950/60 transition-all duration-300 transform translate-x-1 hover:translate-x-0 cursor-pointer"
          title="Monthly News Letter"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/25 group-hover:bg-emerald-500 text-emerald-300 group-hover:text-white transition-all shrink-0 border border-emerald-400/40 shadow-xs">
            <Newspaper className="h-4 w-4" />
          </div>
          <span className="[writing-mode:vertical-rl] rotate-180 font-outfit font-extrabold text-[11px] tracking-wider uppercase text-white group-hover:text-emerald-200 transition-colors py-1 select-none whitespace-nowrap">
            News Letter
          </span>
        </button>
      </aside>

      {/* ----------------------------------------------------
          MODAL VIEWER FOR DEGREE PATHWAYS, MAGAZINE & MONTHLY NEWS LETTER
          ---------------------------------------------------- */}
      {activeRightDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setActiveRightDrawer(null)}
          />

          {/* Modal Box */}
          <div className="relative z-10 w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
            {/* Modal Top Header with Switcher and Close Button */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#001730] via-[#002147] to-[#001730] text-white border-b border-indigo-950 select-none">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="flex flex-wrap bg-white/10 rounded-xl p-1 border border-white/15 gap-1">
                  <button
                    onClick={() => setActiveRightDrawer("pathways")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeRightDrawer === "pathways"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                    <span>Degree Pathways</span>
                  </button>
                  <button
                    onClick={() => setActiveRightDrawer("magazine")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeRightDrawer === "magazine"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    <span>College Annual Magazine</span>
                  </button>
                  <button
                    onClick={() => setActiveRightDrawer("newsletter")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeRightDrawer === "newsletter"
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Newspaper className="h-3.5 w-3.5 shrink-0" />
                    <span>Monthly News Letter</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setActiveRightDrawer(null)}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/10 shrink-0 ml-2"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50">
              {activeRightDrawer === "pathways" && (
                <div className="p-6 sm:p-10 max-w-[1400px] mx-auto animate-fadeIn">
                  <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-3 mb-8">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-600 uppercase tracking-wider">
                      <BookOpen className="h-3.5 w-3.5 text-indigo-500" /> Academic Tracks
                    </span>
                    <h2 className="font-outfit text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-none">
                      Explore Our Degree Pathways
                    </h2>
                    <p className="font-sans text-xs md:text-sm text-slate-500 font-semibold">
                      Select program formats designed to accelerate career growth &amp; research aspirations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Undergraduate Programmes Card */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 rounded bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-black text-blue-600 uppercase tracking-wider">
                            UG Honours
                          </span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/50 text-[#002147] shadow-2xs">
                            <GraduationCap className="h-4 w-4" />
                          </span>
                        </div>
                        <h3 className="font-outfit text-xl font-black text-slate-800 leading-snug">
                          Undergraduate Programmes
                        </h3>
                        <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                          Excellent 3-Year Honours programmes under Acharya Nagarjuna University, Guntur. Combining robust foundational courses, electives, and mandatory internship workloads in:
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-sans text-xs font-semibold text-slate-600 mt-2">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" /> B.Com Honours
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" /> B.Sc Honours
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" /> BCA (Comp Apps)
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" /> B.A. Honours
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/academics/academic-programmes/undergraduate-programmes"
                        onClick={() => setActiveRightDrawer(null)}
                        className="mt-6 flex items-center justify-center gap-2 w-full rounded-2xl bg-[#002147] hover:bg-[#002b5c] text-white font-sans font-bold text-xs py-3.5 px-4 shadow-sm transition-all duration-300"
                      >
                        View UG Syllabus &amp; Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    {/* Postgraduate Programmes Card */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 rounded bg-purple-50 border border-purple-100 px-2 py-0.5 text-[10px] font-black text-purple-600 uppercase tracking-wider">
                            PG Professional
                          </span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/50 text-[#002147] shadow-2xs">
                            <Target className="h-4 w-4" />
                          </span>
                        </div>
                        <h3 className="font-outfit text-xl font-black text-slate-800 leading-snug">
                          Postgraduate Programmes
                        </h3>
                        <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                          Highly acclaimed professional PG programs approved by AICTE, New Delhi. Rigorous laboratory models, industrial internship interfaces, and seminars:
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-sans text-xs font-semibold text-slate-600 mt-2">
                          <span className="flex items-center gap-1.5 font-bold text-[#002147]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" /> MCA (Comp Apps)
                          </span>
                          <span className="flex items-center gap-1.5 font-bold text-[#002147]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" /> MBA (Management)
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" /> Advanced Coding Lab
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" /> Case Study Seminars
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/academics/academic-programmes/postgraduate-programmes"
                        onClick={() => setActiveRightDrawer(null)}
                        className="mt-6 flex items-center justify-center gap-2 w-full rounded-2xl bg-[#002147] hover:bg-[#002b5c] text-white font-sans font-bold text-xs py-3.5 px-4 shadow-sm transition-all duration-300"
                      >
                        View PG Syllabus &amp; Intake <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeRightDrawer === "magazine" && (
                <CollegeMagazinesSection magazines={magazines} />
              )}

              {activeRightDrawer === "newsletter" && (
                <NewslettersSection newsletters={newsletters} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          DOCUMENT POPUP MODAL (For Events & Activities)
          When 1 doc: opens directly in new tab.
          When >1 doc: popup showing list of documents.
          ---------------------------------------------------- */}
      {activeDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setActiveDocModal(null)}
          />

          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                  <FileText className="h-3.5 w-3.5 text-sky-300" />
                </div>
                <div>
                  <h3 className="font-outfit text-sm sm:text-base font-bold leading-tight">
                    Event Documents &amp; Details
                  </h3>
                  <p className="text-[10px] sm:text-[10.5px] text-sky-200/80 leading-tight">
                    St. Ann&apos;s College for Women
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveDocModal(null)}
                className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10 shrink-0"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto bg-slate-50/50">
              {/* Event Info Card: Order = event name -> banner -> tags -> Description -> files */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
                {/* 1. Event Name */}
                <h4 className="font-outfit text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeDocModal.eventTitle}
                </h4>

                {/* 2. Banner */}
                {activeDocModal.bannerUrl && (
                  <div className="w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-100">
                    <img
                      src={activeDocModal.bannerUrl}
                      alt={activeDocModal.eventTitle}
                      className="w-full h-auto max-h-72 object-cover object-center rounded-2xl"
                    />
                  </div>
                )}

                {/* 3. Tags which are already present */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  {activeDocModal.eventDate && (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      {activeDocModal.eventDate}
                    </span>
                  )}
                  {activeDocModal.organizer && (
                    <span className="inline-flex items-center gap-1 font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                      <Users className="h-3.5 w-3.5 text-indigo-500" />
                      {activeDocModal.organizer}
                    </span>
                  )}
                </div>

                {/* 4. Description */}
                {activeDocModal.description && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      <Info className="h-3 w-3 text-indigo-500" />
                      <span>Event Overview</span>
                    </div>
                    <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/70 border-l-4 border-l-[#002147] text-xs text-slate-700 leading-relaxed shadow-2xs">
                      {activeDocModal.description}
                    </div>
                  </div>
                )}
              </div>

              {/* Links List for Event */}
              {activeDocModal.links && activeDocModal.links.length > 0 && (
                <div>
                  <h5 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="h-3.5 w-3.5 text-sky-600" />
                      <span>Event Registration &amp; Official Links ({activeDocModal.links.length})</span>
                    </span>
                    <span className="text-[10px] font-bold text-sky-600 lowercase tracking-normal">
                      Click to open link
                    </span>
                  </h5>
                  <div className="space-y-2">
                    {activeDocModal.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all group/link cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 group-hover/link:bg-sky-100 transition-colors">
                            <ExternalLink className="h-5 w-5 text-sky-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover/link:text-[#002147] truncate">
                              {link.title || link.url}
                            </p>
                            <p className="text-[11px] text-sky-600 underline font-mono truncate">
                              {link.url}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] group-hover/link:bg-sky-700 text-white font-bold text-xs shadow-xs transition-colors">
                          <span>Visit Link</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents List */}
              <div>
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
                  <span>Available Documents ({activeDocModal.documents.length})</span>
                  <span className="text-[10px] font-bold text-indigo-600 lowercase tracking-normal">
                    Click to view / download
                  </span>
                </h5>

                {activeDocModal.documents.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeDocModal.documents.map((doc, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() =>
                          setViewingPdfModal({
                            title: doc.title || doc.originalFilename || `Event Document ${idx + 1}`,
                            url: doc.url,
                          })
                        }
                        className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 shadow-2xs hover:shadow-md transition-all group/doc cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 group-hover/doc:bg-rose-100 transition-colors">
                            <FileText className="h-5 w-5 text-rose-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover/doc:text-[#002147] truncate">
                              {doc.title || `Document ${idx + 1}`}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {doc.originalFilename || "Click to view PDF document"}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 group-hover/doc:bg-[#002147] text-white font-bold text-xs shadow-xs transition-colors">
                          <span>View PDF</span>
                          <FileText className="h-3.5 w-3.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
                    <FileText className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">No Documents Attached Yet</p>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                      The official circular and brochure for this event will be published shortly by the organizing department.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveDocModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          NOTICE DETAILS & DOCUMENTS POPUP MODAL (Notice Board)
          ---------------------------------------------------- */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setActiveNoticeModal(null)}
          />

          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                  <Bell className="h-3.5 w-3.5 text-rose-300" />
                </div>
                <div>
                  <h3 className="font-outfit text-sm sm:text-base font-bold leading-tight">
                    Notice Details &amp; Circular
                  </h3>
                  <p className="text-[10px] sm:text-[10.5px] text-sky-200/80 leading-tight">
                    St. Ann&apos;s College for Women • Official Notice Board
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10 shrink-0"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto bg-slate-50/50">
              {/* Notice Info Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
                {/* 1. Notice Title */}
                <h4 className="font-outfit text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeNoticeModal.title}
                </h4>

                {/* 2. Tags: Date, Category, 2-Week NEW badge */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  {isNoticeNew(activeNoticeModal.date) && <StarburstNewBadge />}
                  {activeNoticeModal.date && (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                      <Calendar className="h-3.5 w-3.5 text-rose-600" />
                      {activeNoticeModal.date}
                    </span>
                  )}
                  {activeNoticeModal.category && (
                    <span className="inline-flex items-center gap-1 font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wider text-[10px]">
                      {activeNoticeModal.category.replace(/-/g, " ")}
                    </span>
                  )}
                </div>

                {/* 3. Description / Notice Content */}
                {activeNoticeModal.description && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      <Info className="h-3 w-3 text-indigo-500" />
                      <span>Official Notice Announcement</span>
                    </div>
                    <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/70 border-l-4 border-l-[#002147] text-xs sm:text-[13px] text-slate-700 leading-relaxed shadow-2xs whitespace-pre-line">
                      {activeNoticeModal.description}
                    </div>
                  </div>
                )}
              </div>

              {/* ── SECTION FOR LINKS ── */}
              {activeNoticeModal.links && activeNoticeModal.links.length > 0 && (
                <div>
                  <h5 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="h-3.5 w-3.5 text-sky-600" />
                      <span>Official Links &amp; Portals ({activeNoticeModal.links.length})</span>
                    </span>
                    <span className="text-[10px] font-bold text-sky-600 lowercase tracking-normal">
                      Click to visit portal
                    </span>
                  </h5>

                  <div className="space-y-2">
                    {activeNoticeModal.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all group/link cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 group-hover/link:bg-sky-100 transition-colors">
                            <ExternalLink className="h-5 w-5 text-sky-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover/link:text-[#002147] truncate">
                              {link.title || link.url}
                            </p>
                            <p className="text-[11px] text-sky-600 underline font-mono truncate">
                              {link.url}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] group-hover/link:bg-sky-700 text-white font-bold text-xs shadow-xs transition-colors">
                          <span>Open Link</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SECTION FOR DOCUMENTS & PDFS ── */}
              <div>
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-rose-600" />
                    <span>Attached Circulars &amp; PDFs ({activeNoticeModal.documents.length})</span>
                  </span>
                  <span className="text-[10px] font-bold text-rose-600 lowercase tracking-normal">
                    Click to view / download
                  </span>
                </h5>

                {activeNoticeModal.documents.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeNoticeModal.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-rose-50/40 border border-slate-200 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all group/doc"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 group-hover/doc:bg-rose-100 transition-colors">
                            <FileText className="h-5 w-5 text-rose-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover/doc:text-[#002147] truncate">
                              {doc.title || `Document ${idx + 1}`}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {doc.originalFilename || "Click to view PDF document"}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setViewingPdfModal({
                                title: doc.title || "Notice Document PDF",
                                url: doc.url,
                              })
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-[#002147] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                          >
                            <span>View PDF</span>
                            <FileText className="h-3.5 w-3.5" />
                          </button>
                          <a
                            href={doc.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                            title="Download PDF"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center">
                    <FileText className="h-9 w-9 text-slate-300 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-slate-700">Digital Announcement</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs mx-auto">
                      Official circular published online. No downloadable PDF attachment required.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          IN-APP PDF VIEWER MODAL (Opens PDF in modal, not new tab)
          ---------------------------------------------------- */}
      {viewingPdfModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setViewingPdfModal(null)}
          />

          <div className="relative z-10 w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">
            {/* Top Header */}
            <div className="flex items-center justify-between px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white shrink-0">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <div className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                  <FileText className="h-3.5 w-3.5 text-sky-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-outfit text-sm sm:text-base font-bold truncate">
                    {viewingPdfModal.title}
                  </h3>
                  <p className="text-[10px] sm:text-[10.5px] text-sky-200/80 leading-tight">
                    St. Ann&apos;s College for Women • PDF Viewer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={viewingPdfModal.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/15"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setViewingPdfModal(null)}
                  className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10 shrink-0"
                  aria-label="Close PDF Viewer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body with Iframe */}
            <div className="flex-1 w-full h-full bg-slate-100 relative">
              <iframe
                src={`${viewingPdfModal.url}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={viewingPdfModal.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
