"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Building2,
  FileText,
  HeartHandshake,
  Trophy,
  MessageSquareQuote,
  Calendar,
  CalendarDays,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  BookOpen,
  Eye,
  ArrowRight,
  Clock,
  Video,
  Star,
  Quote,
  X,
  ChevronLeft,
  Download,
  ZoomIn,
  Layers,
  Search,
  Filter,
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { getAlumniData, getAlumniGallery, DEFAULT_ALUMNI_DATA } from "@/lib/sanity";
import { openPdfViewer, getCleanPdfUrl } from "@/lib/pdf-viewer";

// Sidebar categories matching 10.Alumni (13-09-2026).docx (1 to 9)
const ALUMNI_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "sec-about",
    title: "1. About Alumni",
    sectionId: "sec-about",
    items: [
      { text: "About Alumni Engagement", id: "sec-about-engagement" },
      { text: "Vision, Mission & Objectives", id: "sec-about-vision" },
      { text: "Role in Institutional Development", id: "sec-about-role" },
      { text: "Alumni–Institution Connect", id: "sec-about-connect" },
    ]
  },
  {
    catSlug: "sec-committee",
    title: "2. College-Level Alumni Committee",
    sectionId: "sec-committee",
    items: [
      { text: "About the Committee", id: "sec-committee-about" },
      { text: "Alumni Committee Members", id: "sec-committee-members" },
      { text: "Roles & Responsibilities", id: "sec-committee-roles" },
      { text: "Annual Action Plan & Meetings", id: "sec-committee-plan" },
      { text: "Annual Reports", id: "sec-committee-reports" },
    ]
  },
  {
    catSlug: "sec-association",
    title: "3. Registered Alumni Association",
    sectionId: "sec-association",
    items: [
      { text: "About the Association", id: "sec-association-about" },
      { text: "Registration Details (307 of 2022)", id: "sec-association-reg" },
      { text: "Office Bearers", id: "sec-association-members" },
      { text: "Registration & Statutory Documents", id: "sec-association-docs" },
    ]
  },
  {
    catSlug: "sec-contributions",
    title: "4. Alumni Contributions & Support",
    sectionId: "sec-contributions",
    items: [
      { text: "Engagement Areas", id: "sec-contributions-areas" },
      { text: "Contributions Register (AY 2026–27)", id: "sec-contributions-register" },
    ]
  },
  {
    catSlug: "sec-network",
    title: "5. Alumni Network",
    sectionId: "sec-network",
    items: [
      { text: "Join the Alumni Network (Form)", id: "sec-network-join" },
      { text: "Our Alumni – Our Pride", id: "sec-network-pride" },
      { text: "Voices of Our Alumni", id: "sec-network-voices" },
    ]
  },
  {
    catSlug: "sec-feedback",
    title: "6. Alumni Feedback & Connect",
    sectionId: "sec-feedback",
    items: [
      { text: "Feedback Framework", id: "sec-feedback-info" },
      { text: "Suggestions & Outcomes", id: "sec-feedback-suggestions" },
      { text: "Quality Enhancement Connect", id: "sec-feedback-quality" },
    ]
  },
  {
    catSlug: "sec-events",
    title: "7. Alumni Events",
    sectionId: "sec-events",
    items: [
      { text: "Events & Reunions Overview", id: "sec-events-overview" },
      { text: "Scheduled & Annual Programmes", id: "sec-events-list" },
    ]
  },
  {
    catSlug: "sec-gallery",
    title: "8. Alumni Gallery & Media",
    sectionId: "sec-gallery",
    items: [
      { text: "Photo Gallery Categories", id: "sec-gallery-photos" },
      { text: "Video Gallery & Messages", id: "sec-gallery-videos" },
    ]
  },
  {
    catSlug: "sec-contact",
    title: "9. Alumni Contact Information",
    sectionId: "sec-contact",
    items: [
      { text: "Association Office Desk", id: "sec-contact-desk" },
      { text: "Direct Contact Channels", id: "sec-contact-channels" },
    ]
  }
];

export default function AlumniPage() {
  const [data, setData] = useState<any>(DEFAULT_ALUMNI_DATA);
  const [galleryFolders, setGalleryFolders] = useState<any[]>([]);
  const [selectedFolderSlug, setSelectedFolderSlug] = useState<string>("all");
  const [photoDisplayLimit, setPhotoDisplayLimit] = useState<number>(24);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ url: string; caption?: string; folderName?: string; index: number; total: number } | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-about");
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [liveData, liveGallery] = await Promise.all([
          getAlumniData(),
          getAlumniGallery()
        ]);
        if (liveData) {
          setData(liveData);
        }
        if (liveGallery && liveGallery.length > 0) {
          setGalleryFolders(liveGallery);
        }
      } catch (err) {
        console.error("Error loading alumni data from Sanity:", err);
      }
    }
    loadData();
  }, []);

  // Compute all photos flattened and filtered photos
  const allPhotos = React.useMemo(() => {
    const list: { url: string; caption?: string; folderName: string; folderSlug: string }[] = [];
    (galleryFolders || []).forEach((folder) => {
      (folder.images || []).forEach((img: any) => {
        if (img?.url) {
          list.push({
            url: img.url,
            caption: img.caption || folder.folderName,
            folderName: folder.folderName || "Alumni Gallery",
            folderSlug: folder.slug || "alumni",
          });
        }
      });
    });
    return list;
  }, [galleryFolders]);

  const filteredPhotos = React.useMemo(() => {
    if (selectedFolderSlug === "all") return allPhotos;
    return allPhotos.filter((p) => p.folderSlug === selectedFolderSlug);
  }, [allPhotos, selectedFolderSlug]);

  const openLightbox = (index: number) => {
    const photo = filteredPhotos[index];
    if (photo) {
      setLightboxPhoto({
        url: photo.url,
        caption: photo.caption,
        folderName: photo.folderName,
        index,
        total: filteredPhotos.length,
      });
    }
  };

  const handleNextLightbox = () => {
    if (!lightboxPhoto) return;
    const nextIdx = (lightboxPhoto.index + 1) % filteredPhotos.length;
    openLightbox(nextIdx);
  };

  const handlePrevLightbox = () => {
    if (!lightboxPhoto) return;
    const prevIdx = (lightboxPhoto.index - 1 + filteredPhotos.length) % filteredPhotos.length;
    openLightbox(prevIdx);
  };

  const openPdf = (url?: string, title?: string) => {
    openPdfViewer(url, title || "Alumni Document");
  };

  const registrationLink = data.registrationFormUrl || "https://forms.gle/7QMzJvrAsYVT3YZd7";
  const feedbackLink = data.feedbackFormUrl || data.googleFormUrl || "https://docs.google.com/forms/d/e/1FAIpQLSe52erMvj2dXnaAFjDBYV8k024E-y5fQASyPubzMn_WzFNwzw/viewform";
  const googleFormLink = feedbackLink;

  // Modals for Section 5 (Pride Alumni & Voices) and Section 7 (Events & Meets)
  const [eventsModalOpen, setEventsModalOpen] = useState(false);
  const [eventsActiveCategory, setEventsActiveCategory] = useState<string>("all");
  const [eventsActiveStatus, setEventsActiveStatus] = useState<string>("all");
  const [isPrideModalOpen, setIsPrideModalOpen] = useState(false);
  const [prideSearchQuery, setPrideSearchQuery] = useState("");
  const [isVoicesModalOpen, setIsVoicesModalOpen] = useState(false);

  const openEventsModal = (categoryName?: string) => {
    if (categoryName) {
      const lower = categoryName.toLowerCase();
      if (lower.includes("annual")) {
        setEventsActiveCategory("Annual Alumni Meet");
      } else if (lower.includes("reunion") || lower.includes("batch")) {
        setEventsActiveCategory("Batch Reunions & Milestone Celebrations");
      } else if (lower.includes("department")) {
        setEventsActiveCategory("Departmental Alumni Interaction Sessions");
      } else if (lower.includes("mentor") || lower.includes("guidance")) {
        setEventsActiveCategory("Alumni Mentorship & Career Guidance Drives");
      } else {
        setEventsActiveCategory("all");
      }
    } else {
      setEventsActiveCategory("all");
    }
    setEventsActiveStatus("all");
    setEventsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      <div className="flex flex-col font-sans select-none animate-fadeIn w-full">
        {/* Main Content Container (Sidebar on Left, Data Elements on Right) */}
        <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Left: About Navigation Sidebar */}
            <aside className="lg:col-span-3">
              <AboutSidebar
                categories={ALUMNI_SIDEBAR_CATEGORIES}
                bannerTitle="Alumni Engagement & Network"
                bannerSubtitle="Sections on this Page"
                activeId={activeSectionId}
                onItemClick={(id) => setActiveSectionId(id)}
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
                    </strong>, fosters meaningful and lifelong alumni engagement through mentorship, career guidance, student interaction, networking and institutional growth.
                    <span className="block mt-2 text-slate-600 font-medium text-sm">
                      Guided by our institutional philosophy of Educate, Enrich &amp; Empower, our alumni are our pride, our ambassadors, and lifelong partners in advancing academic excellence and empowering young women.
                    </span>
                  </p>
                </SubtextBox>

                {/* ============================================================ */}
                {/* SECTION 1: About Alumni                                      */}
                {/* ============================================================ */}
                <section
                  id="sec-about"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        1. About Alumni
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Institutional philosophy, guiding mission, objectives, and lifelong alma mater bond.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* 1.a About Alumni Engagement */}
                    <div
                      id="sec-about-engagement"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <HeartHandshake className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            a. About Alumni Engagement
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Lifelong connection and collaborative partnership</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The alumni of St. Ann’s College for Women, Gorantla, Guntur are an integral part of the institution’s extended family and a valued partner in its continued development. The college fosters meaningful alumni engagement through interaction, mentoring, career guidance, professional networking, knowledge sharing and participation in institutional initiatives.
                      </p>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        Through the College-Level Alumni Committee and the Registered Alumni Association, alumni are provided opportunities to remain connected with their alma mater and contribute to student and institutional development. Guided by the spirit of “Educate, Enrich &amp; Empower,” the college values and celebrates its alumni as lifelong members of the St. Ann’s family.
                      </p>
                    </div>

                    {/* 1.b Vision, Mission & Objectives */}
                    <div
                      id="sec-about-vision"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <Trophy className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            b. Vision, Mission &amp; Objectives
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">Strategic roadmap for alumni community building</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl border border-blue-200/80 flex flex-col gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4 text-amber-500" /> Vision
                          </span>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            To build a vibrant alumni community that contributes to student development, academic excellence and institutional growth.
                          </p>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-blue-200/80 flex flex-col gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-indigo-600" /> Mission
                          </span>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            To nurture lifelong alumni relationships through meaningful interaction, mentoring, networking and knowledge sharing.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-2xl border border-blue-200/80 flex flex-col gap-2.5">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800">Core Objectives:</span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Strengthen the Alumni–Institution Connect</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Facilitate participation in student development &amp; career guidance</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Promote mentoring, professional interaction &amp; knowledge sharing</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Recognize and showcase alumni achievements</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Encourage alumni support for institutional initiatives</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Foster a strong sense of belonging and lifelong association</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Maintain systematic records of alumni engagement</li>
                        </ul>
                      </div>
                    </div>

                    {/* 1.c Role in Institutional Development */}
                    <div
                      id="sec-about-role"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <GraduationCap className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            c. Role of Alumni in Institutional Development
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Areas where alumni enrich student learning &amp; institutional development</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        Alumni contribute to the institution through their experience, expertise, professional networks and goodwill, enriching student learning and institutional initiatives.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                        {[
                          "Mentoring and career guidance",
                          "Guest lectures and knowledge sharing",
                          "Placement and professional networking",
                          "Student–alumni interaction and industry exposure",
                          "Participation in academic, cultural & extension activities",
                          "Feedback for institutional improvement",
                          "Support for student and community initiatives",
                          "Sharing achievements to inspire students",
                          "Philanthropic and resource contribution",
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700">
                            <span className="flex h-5 w-5 rounded-full bg-[#002147] text-white text-[10px] items-center justify-center font-bold shrink-0">{idx + 1}</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 1.d Alumni–Institution Connect */}
                    <div
                      id="sec-about-connect"
                      className="scroll-mt-52 border-2 border-indigo-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-indigo-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-indigo-200/80 text-indigo-600 shadow-2xs">
                          <Building2 className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-indigo-800 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            d. Alumni–Institution Connect
                          </h4>
                          <p className="text-xs text-indigo-600/80 font-medium">Strengthening a lifelong bond with St. Ann’s</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The bond between St. Ann’s College for Women and its alumni continues beyond graduation. The college provides platforms for alumni to remain connected through Alumni Meets, mentoring, professional interactions, student engagement and institutional programmes.
                      </p>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Alumni–Institution Connect encourages alumni to share, support, inspire and give back to their alma mater, strengthening a lifelong bond with St. Ann’s.
                      </p>
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 2: College-Level Alumni Committee                    */}
                {/* ============================================================ */}
                <section
                  id="sec-committee"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        2. College-Level Alumni Committee
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Institutional coordination mechanism, committee composition, action plans, and annual reports.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* 2.a About Committee (White) */}
                    <div
                      id="sec-committee-about"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider">
                        About the College-Level Alumni Committee
                      </h4>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The College-Level Alumni Committee is an institutional mechanism established to coordinate and strengthen alumni engagement at the college level. The Committee facilitates communication with alumni, coordinates alumni-related initiatives, promotes student–alumni interaction and maintains systematic records of alumni engagement.
                      </p>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        It works in coordination with the college administration and the Registered Alumni Association, wherever appropriate, to promote meaningful alumni participation in student development and institutional initiatives.
                      </p>
                    </div>

                    {/* 2.b Committee Members Table (Soft Ice Blue) */}
                    <div
                      id="sec-committee-members"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base uppercase tracking-wider">
                            Alumni Committee Members
                          </h4>
                          <p className="text-xs text-blue-900/70 font-medium">Institutional leadership, faculty representatives, alumni leaders &amp; student delegates</p>
                        </div>
                        <span className="px-3 py-1 bg-white text-blue-900 border border-blue-200 rounded-xl text-xs font-bold w-fit shadow-2xs">
                          {data.committeeMembers?.length || 11} Members
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-blue-200/80 shadow-2xs bg-white">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100/90 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                              <th className="py-3 px-4 text-center w-16">S. No.</th>
                              <th className="py-3 px-4">Name</th>
                              <th className="py-3 px-4">Designation / Representation</th>
                              <th className="py-3 px-4 text-right">Role</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {(data.committeeMembers || []).map((mem: any, idx: number) => (
                              <tr key={mem._key || idx} className="hover:bg-blue-50/40 transition-colors">
                                <td className="py-3 px-4 font-bold text-slate-900 text-center">{mem.sNo || idx + 1}</td>
                                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{mem.name || "—"}</td>
                                <td className="py-3 px-4 text-slate-700">{mem.designation}</td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                                    mem.role === "Chairperson" ? "bg-amber-50 text-amber-900 border-amber-200" :
                                    mem.role === "Convener" ? "bg-blue-50 text-blue-900 border-blue-200" :
                                    mem.role === "Co-Convener" ? "bg-indigo-50 text-indigo-900 border-indigo-200" :
                                    "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}>
                                    {mem.role}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 2.c Roles & Responsibilities (White) */}
                    <div
                      id="sec-committee-roles"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider">
                        Roles &amp; Responsibilities
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                        {[
                          "Coordinate alumni engagement at the institutional level.",
                          "Facilitate communication and networking with alumni.",
                          "Organize Alumni Meets and interaction programmes.",
                          "Promote mentoring, career guidance and professional interaction.",
                          "Encourage alumni participation in academic and institutional activities.",
                          "Identify and document distinguished alumni and achievements.",
                          "Maintain records of alumni participation and contributions.",
                          "Prepare annual alumni engagement plans and reports.",
                          "Coordinate with the Registered Alumni Association for collaborative initiatives.",
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                            <CheckCircle2 className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 2.d Annual Action Plan & Meetings (Alternating Pair) */}
                    <div
                      id="sec-committee-plan"
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div
                        className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <h5 className="font-outfit font-extrabold text-sm text-blue-900 uppercase tracking-wide">
                          Annual Action Plan
                        </h5>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed text-justify">
                          The College-Level Alumni Committee prepares an annual action plan to strengthen alumni engagement and foster meaningful interaction between the institution, alumni and students. The plan includes alumni meets, mentoring, career guidance, networking and institutional support initiatives.
                        </p>
                      </div>

                      <div
                        className="border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
                        style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                      >
                        <h5 className="font-outfit font-extrabold text-sm text-indigo-900 uppercase tracking-wide">
                          Meetings &amp; Minutes
                        </h5>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed text-justify">
                          The Committee conducts periodic meetings to review alumni activities, discuss proposals, plan programmes and coordinate alumni-related initiatives. The proceedings and minutes of the meetings are maintained as institutional records.
                        </p>
                      </div>
                    </div>

                    {/* 2.e Committee Annual Reports Table (White) */}
                    <div
                      id="sec-committee-reports"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider">
                            Annual Alumni Committee Reports
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Documented reports of major alumni activities, meetings, programmes, and student support</p>
                        </div>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-2xs">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100/90 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                              <th className="py-3 px-4 w-36">Academic Year</th>
                              <th className="py-3 px-4">Annual Alumni Report</th>
                              <th className="py-3 px-4 text-right w-36">View / Download</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {(data.committeeReports || []).map((rep: any, idx: number) => (
                              <tr key={rep._key || idx} className="hover:bg-blue-50/40 transition-colors">
                                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{rep.year}</td>
                                <td className="py-3 px-4 font-medium text-slate-800">{rep.title}</td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <button
                                    onClick={() => openPdf(rep.fileUrl, rep.title)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>View PDF</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 3: Registered Alumni Association                     */}
                {/* ============================================================ */}
                <section
                  id="sec-association"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        3. Registered Alumni Association
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Legally registered society, statutory registration details, office bearers, and governing documents.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* 3.a About Association & Registration Details (White) */}
                    <div
                      id="sec-association-about"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider">
                        About the Alumni Association
                      </h4>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The St. Ann’s College for Women Alumni Association provides a formal platform for strengthening the relationship between the institution and its alumni. The Association facilitates alumni networking, interaction, professional engagement and participation in activities that contribute to student development and institutional growth.
                      </p>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Association functions in accordance with its registered documents and governing framework and works in association with the institution to promote meaningful and sustained alumni engagement.
                      </p>

                      {/* Registration Details Box */}
                      <div id="sec-association-reg" className="mt-2 p-5 bg-blue-50/60 rounded-2xl border border-blue-200 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm uppercase tracking-wider border-b border-blue-200/60 pb-2">
                          <Award className="h-4 w-4 text-blue-700" />
                          <span>Statutory Registration Particulars</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Name</span>
                            <p className="font-bold text-slate-900 mt-0.5">{data.registrationDetails?.societyName || "St. Ann’s College for Women Alumni Association"}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Registration Act</span>
                            <p className="font-bold text-slate-900 mt-0.5">{data.registrationDetails?.actName || "Andhra Pradesh Societies Registration Act, 2001"}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-blue-700 uppercase">Registration No.</span>
                            <p className="font-extrabold text-blue-950 mt-0.5 font-mono text-sm">{data.registrationDetails?.registrationNo || "307 of 2022"}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Date of Registration</span>
                            <p className="font-bold text-slate-900 mt-0.5">{data.registrationDetails?.registrationDate || "18 September 2022"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3.b Office Bearers Table (Soft Ice Blue) */}
                    <div
                      id="sec-association-members"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base uppercase tracking-wider">
                            Office Bearers of the Alumni Association
                          </h4>
                          <p className="text-xs text-blue-900/70 font-medium">Elected office bearers and governing body members</p>
                        </div>
                        <span className="px-3 py-1 bg-white text-indigo-900 border border-indigo-200 rounded-xl text-xs font-bold shadow-2xs">
                          {data.associationOfficeBearers?.length || 7} Bearers
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-blue-200/80 shadow-2xs bg-white">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100/90 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                              <th className="py-3 px-4 text-center w-16">S. No.</th>
                              <th className="py-3 px-4">Name of the Office Bearer</th>
                              <th className="py-3 px-4">Designation</th>
                              <th className="py-3 px-4 text-right">Occupation / Position</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {(data.associationOfficeBearers || []).map((ob: any, idx: number) => (
                              <tr key={ob._key || idx} className="hover:bg-blue-50/40 transition-colors">
                                <td className="py-3 px-4 font-bold text-slate-900 text-center">{ob.sNo || idx + 1}</td>
                                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{ob.name}</td>
                                <td className="py-3 px-4">
                                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-900 border border-indigo-200">
                                    {ob.designation}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right text-slate-700">{ob.occupation}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 3.c Registration & Statutory Documents (White) */}
                    <div
                      id="sec-association-docs"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider">
                            Registration &amp; Statutory Documents
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Official society registration certificate, bylaws, PAN, and renewal proceedings</p>
                        </div>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-2xs">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100/90 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                              <th className="py-3 px-4 text-center w-16">S. No.</th>
                              <th className="py-3 px-4">Document Title</th>
                              <th className="py-3 px-4 text-right w-36">View / Download</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {(data.statutoryDocuments || []).map((doc: any, idx: number) => (
                              <tr key={doc._key || idx} className="hover:bg-blue-50/40 transition-colors">
                                <td className="py-3 px-4 font-bold text-slate-900 text-center">{doc.sNo || idx + 1}</td>
                                <td className="py-3 px-4 font-bold text-slate-900">{doc.documentTitle}</td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <button
                                    onClick={() => openPdf(doc.fileUrl, doc.documentTitle)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>View PDF</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 4: Alumni Contributions and Support                  */}
                {/* ============================================================ */}
                <section
                  id="sec-contributions"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <HeartHandshake className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        4. Alumni Contributions and Support
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Documented participation, mentoring, guest workshops, and professional support register.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* 4.a Overview (White) */}
                    <div
                      id="sec-contributions-areas"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Alumni Association of St. Ann’s College for Women, Gorantla, Guntur promotes active and meaningful engagement between alumni, students and the institution. Alumni contribute to the growth of students and the College through career guidance, mentoring, knowledge sharing, guest talks, workshops, and institutional support.
                      </p>
                    </div>

                    {/* 4.b Contributions & Support Register Table (Soft Ice Blue) */}
                    <div
                      id="sec-contributions-register"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base uppercase tracking-wider">
                            Alumni Contributions &amp; Support Register (AY 2026–2027)
                          </h4>
                          <p className="text-xs text-blue-900/70 font-medium">Record of alumni workshops, guest lectures, and student mentoring sessions</p>
                        </div>
                        <span className="px-3 py-1 bg-white text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold w-fit shadow-2xs">
                          {data.contributionsRegister?.length || 3} Events Documented
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-blue-200/80 shadow-2xs bg-white">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100/90 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                              <th className="py-3 px-4 text-center w-12">S.No</th>
                              <th className="py-3 px-4 whitespace-nowrap">Date</th>
                              <th className="py-3 px-4 whitespace-nowrap">Alumni Name</th>
                              <th className="py-3 px-4 whitespace-nowrap">Target Batch</th>
                              <th className="py-3 px-4">Activity / Contribution</th>
                              <th className="py-3 px-4">Nature of Support</th>
                              <th className="py-3 px-4 text-center">Beneficiaries</th>
                              <th className="py-3 px-4 text-right">Supporting Evidence</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {(data.contributionsRegister || []).map((row: any, idx: number) => (
                              <tr key={row._key || idx} className="hover:bg-blue-50/40 transition-colors">
                                <td className="py-3 px-4 font-bold text-slate-900 text-center">{row.sNo || idx + 1}</td>
                                <td className="py-3 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">{row.date}</td>
                                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.alumniName}</td>
                                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{row.programmeBatch}</td>
                                <td className="py-3 px-4 text-slate-800 min-w-[220px]">{row.activity}</td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                    {row.natureOfSupport}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-bold text-center font-mono text-slate-900">{row.beneficiaries}</td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <button
                                    onClick={() => openPdf(row.fileUrl, `${row.alumniName} - ${row.activity}`)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>View Evidence</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 5: Alumni Network                                    */}
                {/* ============================================================ */}
                <section
                  id="sec-network"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Trophy className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        5. Alumni Network
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Alumni registration portal, distinguished alumni showcase, and official testimonials.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* 5.a Join the Alumni Network (Registration Form Box) */}
                    <div
                      id="sec-network-join"
                      className="scroll-mt-52 border-2 border-amber-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-amber-500/10 via-amber-100/40 to-white flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                      <div className="flex flex-col gap-2 max-w-2xl">
                        <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-black text-[10px] uppercase tracking-wider w-fit">
                          Alumni Registration Portal
                        </span>
                        <h3 className="font-outfit font-black text-slate-900 text-lg sm:text-xl">
                          Join the St. Ann’s Alumni Network
                        </h3>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                          All former students of St. Ann’s College for Women who are interested in staying connected with the College and the Alumni Association are invited to register themselves. Your participation helps strengthen the network and creates opportunities for interaction, mentoring, career guidance and institutional engagement.
                        </p>
                      </div>
                      <a
                        href={registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#002147] hover:bg-blue-900 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
                      >
                        <span>Register as Alumni</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    {/* 5.b Our Alumni – Our Pride (Max 3 Displayed Outside + View All Button) */}
                    <div
                      id="sec-network-pride"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="border-b border-slate-100 pb-3">
                        <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider">
                          Our Alumni – Our Pride
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">Celebrating professional excellence, leadership, and meaningful contributions</p>
                      </div>

                      {(() => {
                        const allPride = data.prideAlumni || [];
                        const featured = allPride.filter((a: any) => a.featured === true);
                        const displayList = featured.length > 0 ? featured.slice(0, 3) : allPride.slice(0, 3);
                        return (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {displayList.map((alumnus: any, idx: number) => {
                                const isAlt = idx % 2 === 1;
                                return (
                                  <div
                                    key={alumnus._key || idx}
                                    className={`p-5 rounded-2xl border-2 shadow-xs transition-all hover:shadow-md flex flex-col justify-between gap-3 ${
                                      isAlt ? "border-blue-200/90" : "border-slate-200/90"
                                    }`}
                                    style={{
                                      backgroundColor: isAlt ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)",
                                    }}
                                  >
                                    <div className="flex flex-col gap-1.5">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider w-fit border ${
                                        isAlt ? "bg-blue-100 text-blue-900 border-blue-200" : "bg-amber-50 text-amber-900 border-amber-200"
                                      }`}>
                                        Distinguished Alumna
                                      </span>
                                      <h5 className="font-outfit font-black text-sm text-slate-900">{alumnus.name}</h5>
                                      <p className="text-xs font-bold text-blue-700">{alumnus.designation} • {alumnus.organization}</p>
                                      <span className="text-[10px] font-mono text-slate-500">{alumnus.programmeBatch}</span>
                                      <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{alumnus.achievement}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {allPride.length > 3 && (
                              <div className="pt-2 flex justify-center">
                                <button
                                  onClick={() => setIsPrideModalOpen(true)}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] hover:bg-blue-900 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
                                >
                                  <Trophy className="h-4 w-4 text-amber-400" />
                                  <span>View All Distinguished Alumni ({allPride.length})</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>

                    {/* 5.c Voices of Our Alumni (Max 6 Displayed Outside with ABBA ABBA + View All Button) */}
                    <div
                      id="sec-network-voices"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="border-b border-blue-200/60 pb-3">
                        <h4 className="font-outfit text-blue-700 font-extrabold text-base uppercase tracking-wider">
                          Voices of Our Alumni
                        </h4>
                        <p className="text-xs text-blue-900/70 font-medium">Reflections, experiences, and memories shared by former students</p>
                      </div>

                      {(() => {
                        const allVoices = data.testimonials || [];
                        const displayVoices = allVoices.slice(0, 6);
                        return (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {displayVoices.map((test: any, idx: number) => {
                                // ABBA ABBA alternating pattern for 2-column grid
                                const isAlt = idx % 4 === 1 || idx % 4 === 2;
                                return (
                                  <div
                                    key={test._key || idx}
                                    className={`p-5 rounded-2xl border-2 shadow-xs flex flex-col justify-between gap-3 transition-all hover:shadow-md ${
                                      isAlt ? "border-blue-200/90" : "border-slate-200/90"
                                    }`}
                                    style={{
                                      backgroundColor: isAlt ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)",
                                    }}
                                  >
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-1.5 text-blue-700">
                                        <Quote className="h-4 w-4 shrink-0" />
                                        <h5 className="font-outfit font-extrabold text-xs uppercase tracking-wider">{test.title}</h5>
                                      </div>
                                      <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                                        “{test.quote}”
                                      </p>
                                    </div>
                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                                      <span className="font-bold text-slate-900">— {test.alumnaName}</span>
                                      <span className="text-[11px] font-mono font-semibold text-slate-500">{test.programmeBatch}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {allVoices.length > 6 && (
                              <div className="pt-2 flex justify-center">
                                <button
                                  onClick={() => setIsVoicesModalOpen(true)}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] hover:bg-blue-900 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
                                >
                                  <Quote className="h-4 w-4 text-indigo-300" />
                                  <span>View All Alumni Voices ({allVoices.length})</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 6: Alumni Feedback & Institutional Connect           */}
                {/* ============================================================ */}
                <section
                  id="sec-feedback"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquareQuote className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        6. Alumni Feedback &amp; Institutional Connect
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Continuous improvement feedback, suggestions &amp; outcomes, and quality enhancement connect.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Box 1 - White */}
                      <div
                        id="sec-feedback-info"
                        className="p-5 rounded-2xl border-2 border-slate-200/90 shadow-xs flex flex-col gap-2 transition-all hover:shadow-md"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <span className="font-outfit font-extrabold text-xs uppercase text-blue-700 tracking-wider">1. Alumni Feedback</span>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed text-justify">
                          Alumni feedback is collected periodically to understand their experiences, suggestions and expectations, and to support continuous institutional improvement.
                        </p>
                      </div>

                      {/* Box 2 - Soft Ice Blue */}
                      <div
                        id="sec-feedback-suggestions"
                        className="p-5 rounded-2xl border-2 border-blue-200/90 shadow-xs flex flex-col gap-2 transition-all hover:shadow-md"
                        style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                      >
                        <span className="font-outfit font-extrabold text-xs uppercase text-indigo-800 tracking-wider">2. Suggestions &amp; Outcomes</span>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed text-justify">
                          Relevant suggestions received from alumni and corresponding actions taken by the institution are documented, wherever applicable.
                        </p>
                      </div>

                      {/* Box 3 - White */}
                      <div
                        id="sec-feedback-quality"
                        className="p-5 rounded-2xl border-2 border-slate-200/90 shadow-xs flex flex-col gap-2 transition-all hover:shadow-md"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <span className="font-outfit font-extrabold text-xs uppercase text-emerald-700 tracking-wider">3. Quality Enhancement</span>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed text-justify">
                          Alumni contribute to institutional quality enhancement through curriculum feedback, mentoring, career guidance, academic enrichment, infrastructure support and other developmental initiatives.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-blue-900 to-[#002147] text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="font-outfit font-black text-base">Alumni Feedback &amp; Institutional Connect</h4>
                        <p className="text-blue-100 text-xs mt-0.5">Share your valuable feedback and recommendations with our IQAC &amp; Alumni Council.</p>
                      </div>
                      <a
                        href={feedbackLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shadow-xs transition-all shrink-0 inline-flex items-center gap-1.5"
                      >
                        <span>Connect &amp; Submit Feedback</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 7: Alumni Events & Meets                             */}
                {/* ============================================================ */}
                <section
                  id="sec-events"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        7. Alumni Events &amp; Meets
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Annual Alumni Meets, batch reunions, departmental sessions, and mentorship drives.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    <div
                      id="sec-events-overview"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider">
                        Dear Alumni,
                      </h4>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        We warmly welcome our alumni to contribute to and participate in the various alumni activities and programmes of the institution. Alumni who wish to contribute, collaborate, organize or support an alumni event may share their ideas and proposals with the Alumni Association through the official feedback/contact channel.
                      </p>
                    </div>

                    {/* 4 Program Category Boxes with Interactive Button to Open Pop-up Table of Past/Current/Upcoming Meets */}
                    <div id="sec-events-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          title: "Annual Alumni Meet",
                          desc: "Grand annual gathering of all alumni batches celebrating institutional milestones and reconnecting alma mater bonds.",
                          date: "Upcoming / Scheduled Annually",
                          categoryKey: "Annual Alumni Meet",
                        },
                        {
                          title: "Batch Reunions & Milestone Celebrations",
                          desc: "Dedicated Silver Jubilee & decade reunion gatherings organized across departments.",
                          date: "Periodic",
                          categoryKey: "Batch Reunions & Milestone Celebrations",
                        },
                        {
                          title: "Departmental Alumni Interaction Sessions",
                          desc: "Subject-specific guest lectures, curriculum feedback forums, and career guidance workshops.",
                          date: "Monthly",
                          categoryKey: "Departmental Alumni Interaction Sessions",
                        },
                        {
                          title: "Alumni Mentorship & Career Guidance Drives",
                          desc: "Direct mentorship pairing graduating seniors with industry-experienced alumni.",
                          date: "Ongoing",
                          categoryKey: "Alumni Mentorship & Career Guidance Drives",
                        },
                      ].map((item: any, idx: number) => {
                        const isAlt = idx % 2 === 1;
                        return (
                          <div
                            key={idx}
                            className={`p-5 rounded-2xl border-2 shadow-xs flex flex-col justify-between gap-3.5 transition-all hover:shadow-md ${
                              isAlt ? "border-blue-200/90" : "border-slate-200/90"
                            }`}
                            style={{
                              backgroundColor: isAlt ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)",
                            }}
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`flex h-8 w-8 items-center justify-center rounded-lg font-black text-xs ${
                                  isAlt ? "bg-blue-200 text-blue-900" : "bg-blue-50 text-blue-800"
                                }`}>
                                  {idx + 1}
                                </span>
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                  isAlt ? "bg-white/90 text-blue-950 border-blue-200" : "bg-slate-100 text-slate-700 border-slate-200"
                                }`}>
                                  {item.date}
                                </span>
                              </div>
                              <h5 className="font-outfit font-extrabold text-sm text-slate-900 leading-snug">{item.title}</h5>
                              <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                            </div>

                            <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                              <button
                                onClick={() => openEventsModal(item.categoryKey)}
                                className="w-full px-3.5 py-2.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-2xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                                <span>View Meets / Details</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-xs font-semibold text-slate-600">
                        Event details and registration forms will be updated on this page as and when programmes are scheduled.
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => openEventsModal("all")}
                          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <CalendarDays className="h-3.5 w-3.5 text-blue-700" />
                          <span>View All Meets Table</span>
                        </button>
                        <a
                          href={registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Register / Propose Event</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 8: Alumni Gallery & Media                            */}
                {/* ============================================================ */}
                <section
                  id="sec-gallery"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <ImageIcon className="h-6 w-6 text-indigo-300 shrink-0" />
                        <h2
                          className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                          style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                        >
                          8. Alumni Gallery &amp; Media
                        </h2>
                      </div>
                      {allPhotos.length > 0 && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 text-indigo-100 rounded-full text-xs font-bold border border-white/20">
                          <Layers className="h-3.5 w-3.5" />
                          <span>{allPhotos.length} Photos in Archive</span>
                        </span>
                      )}
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Year-wise photographs, reunion memories, interactive photo albums, video messages, and success stories.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* Live Photo Gallery Container */}
                    <div id="sec-gallery-photos" className="border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm bg-white flex flex-col gap-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div>
                          <h4 className="font-outfit text-blue-900 font-extrabold text-base uppercase tracking-wider flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-blue-700" />
                            <span>Alumni Photo Gallery &amp; Reunion Albums</span>
                          </h4>
                          <p className="text-slate-500 text-xs mt-0.5">
                            Browse reunion memories and alumni meets across different graduating batches.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-slate-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 w-fit">
                          Showing {Math.min(filteredPhotos.length, photoDisplayLimit)} of {filteredPhotos.length} Photos
                        </span>
                      </div>

                      {/* Folder / Category Pill Filters */}
                      {galleryFolders.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedFolderSlug("all");
                              setPhotoDisplayLimit(24);
                            }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              selectedFolderSlug === "all"
                                ? "bg-[#002147] text-white shadow-xs"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            <span>All Albums</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                              selectedFolderSlug === "all" ? "bg-blue-400 text-slate-950 font-black" : "bg-slate-200 text-slate-700"
                            }`}>
                              {allPhotos.length}
                            </span>
                          </button>

                          {galleryFolders.map((folder: any) => {
                            const isSelected = selectedFolderSlug === (folder.slug || "");
                            const count = folder.images?.length || 0;
                            return (
                              <button
                                key={folder._id || folder.slug}
                                onClick={() => {
                                   setSelectedFolderSlug(folder.slug || "");
                                  setPhotoDisplayLimit(24);
                                }}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                  isSelected
                                    ? "bg-blue-700 text-white shadow-xs"
                                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                }`}
                              >
                                <span>{folder.folderName}</span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                                  isSelected ? "bg-white text-blue-900 font-black" : "bg-slate-200 text-slate-700"
                                }`}>
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Photos Grid */}
                      {filteredPhotos.length > 0 ? (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                            {filteredPhotos.slice(0, photoDisplayLimit).map((photo, pIdx) => (
                              <div
                                key={photo.url + pIdx}
                                onClick={() => openLightbox(pIdx)}
                                className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer"
                              >
                                <img
                                  src={photo.url}
                                  alt={photo.caption || photo.folderName}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                
                                {/* Overlay & Caption on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white">
                                  <div className="flex justify-end">
                                    <span className="p-1.5 rounded-lg bg-white/20 backdrop-blur-xs text-white">
                                      <ZoomIn className="h-3.5 w-3.5" />
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                                      {photo.folderName}
                                    </span>
                                    <p className="text-xs font-semibold text-white truncate">
                                      {photo.caption || photo.folderName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Load More Button */}
                          {filteredPhotos.length > photoDisplayLimit && (
                            <div className="flex justify-center pt-2">
                              <button
                                onClick={() => setPhotoDisplayLimit((prev) => prev + 24)}
                                className="px-6 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-2xl text-xs font-extrabold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
                              >
                                <Layers className="h-4 w-4 text-blue-700" />
                                <span>Load More Photos ({filteredPhotos.length - photoDisplayLimit} remaining)</span>
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="py-12 text-center text-slate-500 text-xs">
                          No photos found in this category.
                        </div>
                      )}
                    </div>

                    {/* Video Gallery & Messages (Soft Ice Blue Container) */}
                    <div
                      id="sec-gallery-videos"
                      className="border-2 border-blue-200/90 rounded-3xl p-6 shadow-sm flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <h4 className="font-outfit text-blue-700 font-extrabold text-base uppercase tracking-wider">
                        Video Gallery &amp; Messages
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {[
                          "Alumni Messages",
                          "Success Stories",
                          "Alumni Meet Videos",
                          "Expert Talks",
                          "Testimonials",
                        ].map((v, idx) => (
                          <div key={idx} className="p-3.5 bg-white border border-blue-200/80 rounded-2xl text-center flex flex-col items-center justify-center gap-1.5 hover:bg-blue-50/60 transition-colors shadow-2xs">
                            <Video className="h-5 w-5 text-blue-700" />
                            <span className="text-[11px] font-bold text-slate-800">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 9: Alumni Contact Information                        */}
                {/* ============================================================ */}
                <section
                  id="sec-contact"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        9. Alumni Contact Information
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Official Alumni Association desk, contact persons, phone numbers, email, and campus address.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-6" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    <div id="sec-contact-desk" className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm bg-white flex flex-col gap-4">
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        For alumni registration, events, reunions, mentoring, contributions, feedback or any other alumni-related queries, former students may contact the institution through the official Alumni Association channel.
                      </p>

                      <div id="sec-contact-channels" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                        {/* Channel Box 1 - Association Desk (White) */}
                        <div
                          className="p-5 rounded-2xl border-2 border-slate-200/90 shadow-xs flex flex-col gap-1.5 transition-all hover:shadow-md"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5 text-blue-700" /> Association Desk
                          </span>
                          <p className="text-xs font-bold text-slate-900">{data.contactInfo?.associationName || "St. Ann’s College for Women Alumni Association"}</p>
                          <span className="text-[11px] text-slate-600 font-medium">{data.contactInfo?.address || "Gorantla, Guntur – 522 034, AP"}</span>
                        </div>

                        {/* Channel Box 2 - Phone & Mobile (Soft Ice Blue) */}
                        <div
                          className="p-5 rounded-2xl border-2 border-blue-200/90 shadow-xs flex flex-col gap-1.5 transition-all hover:shadow-md"
                          style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                        >
                          <span className="text-[10px] font-black uppercase text-blue-800 tracking-wider flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-blue-700" /> Phone &amp; Mobile
                          </span>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-slate-500 uppercase">Desk:</span>
                              <a href={`tel:${(data.contactInfo?.phone || "08632236470").replace(/[\s-]+/g, "")}`} className="text-xs font-bold text-blue-900 hover:underline">
                                {data.contactInfo?.phone || "0863-2236470"}
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-slate-500 uppercase">Mobile:</span>
                              {data.contactInfo?.mobile ? (
                                <div className="flex flex-wrap items-center gap-x-1.5 text-xs">
                                  {data.contactInfo.mobile.split(/[\/,]/).map((numStr: string, nIdx: number) => {
                                    const trimmed = numStr.trim();
                                    const cleanTel = trimmed.replace(/[\s-]+/g, "");
                                    return (
                                      <React.Fragment key={nIdx}>
                                        {nIdx > 0 && <span className="text-slate-400">/</span>}
                                        <a href={`tel:${cleanTel}`} className="font-bold text-slate-800 hover:text-blue-900 hover:underline font-mono">
                                          {trimmed}
                                        </a>
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="flex flex-wrap items-center gap-x-1.5 text-xs">
                                  <a href="tel:+917382104655" className="font-bold text-slate-800 hover:text-blue-900 hover:underline font-mono">+91 7382104655</a>
                                  <span className="text-slate-400">/</span>
                                  <a href="tel:+918500656134" className="font-bold text-slate-800 hover:text-blue-900 hover:underline font-mono">+91 8500656134</a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Channel Box 3 - Official Email (White) */}
                        <div
                          className="p-5 rounded-2xl border-2 border-slate-200/90 shadow-xs flex flex-col gap-1.5 transition-all hover:shadow-md"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-blue-700" /> Official Email
                          </span>
                          <a href={`mailto:${data.contactInfo?.email || "alumni@stannscollege.com"}`} className="text-xs font-bold text-blue-900 hover:underline">
                            {data.contactInfo?.email || "alumni@stannscollege.com"}
                          </a>
                          <span className="text-[11px] text-slate-600">{data.contactInfo?.officeHours || "Mon – Sat: 9:00 AM – 5:00 PM"}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

              </div>
            </main>

          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewPdf && (
        <FilePreviewModal
          isOpen={!!previewPdf}
          fileUrl={previewPdf.url}
          title={previewPdf.title}
          onClose={() => setPreviewPdf(null)}
        />
      )}

      {/* Interactive Photo Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn select-none"
          onClick={() => setLightboxPhoto(null)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between gap-4 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider">
                {lightboxPhoto.folderName}
              </span>
              <h4 className="text-sm font-bold text-white line-clamp-1">
                {lightboxPhoto.caption || lightboxPhoto.folderName}
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                {lightboxPhoto.index + 1} / {lightboxPhoto.total}
              </span>

              <a
                href={lightboxPhoto.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10"
                title="Open original high-res photo"
              >
                <Download className="h-4 w-4" />
              </a>

              <button
                onClick={() => setLightboxPhoto(null)}
                className="p-2 bg-white/15 hover:bg-red-500/80 text-white rounded-xl transition-all border border-white/10 cursor-pointer"
                title="Close viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Center Image Container with Next & Previous */}
          <div
            className="relative w-full max-w-6xl flex-1 flex items-center justify-center p-2 sm:p-4 my-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {lightboxPhoto.total > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevLightbox();
                }}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-2xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs border border-white/15 transition-all hover:scale-110 cursor-pointer"
                title="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Image */}
            <div className="relative max-h-[78vh] max-w-full flex items-center justify-center">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.caption || "Alumni Photo"}
                className="max-h-[78vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Next Button */}
            {lightboxPhoto.total > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextLightbox();
                }}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-2xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs border border-white/15 transition-all hover:scale-110 cursor-pointer"
                title="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar Hints */}
          <div
            className="text-center text-[11px] text-slate-400 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-white">◀</kbd> and <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-white">▶</kbd> arrow keys to navigate • Click outside or press <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-white">Esc</kbd> to exit
          </div>
        </div>
      )}
      {/* ============================================================ */}
      {/* ALUMNI MEETS & REUNIONS POPUP MODAL                          */}
      {/* ============================================================ */}
      {eventsModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setEventsModalOpen(false)}
        >
          <div
            className="bg-white rounded-[2rem] w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#002147] via-blue-900 to-[#002147] text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-blue-800">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-amber-400 shrink-0">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                    St. Ann&apos;s College for Women • Alumni Association
                  </span>
                  <h3 className="font-outfit font-black text-xl sm:text-2xl tracking-tight text-white mt-0.5">
                    Alumni Meets, Reunions &amp; Interaction Schedules
                  </h3>
                  <p className="text-xs text-blue-100/80 font-medium mt-1">
                    Past records, current interaction drives, and upcoming batch gathering calendars.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEventsModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer shrink-0 border border-white/10"
                title="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-slate-50 p-4 sm:p-5 border-b border-slate-200/80 flex flex-col gap-3">
              {/* Top Row: Status Tabs & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Status Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-2xl overflow-x-auto">
                  {[
                    { key: "all", label: "All Meets" },
                    { key: "Upcoming", label: "Upcoming" },
                    { key: "Current", label: "Current / Ongoing" },
                    { key: "Past", label: "Past Meets & Reports" },
                  ].map((tab) => {
                    const active = eventsActiveStatus === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setEventsActiveStatus(tab.key)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          active
                            ? "bg-[#002147] text-white shadow-xs"
                            : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Registration / Propose Event Quick Button */}
                <a
                  href={registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black transition-all inline-flex items-center justify-center gap-1.5 shadow-xs shrink-0"
                >
                  <span>Register / Propose Meet</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Bottom Row: Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Category:
                </span>
                {[
                  { key: "all", label: "All Categories" },
                  { key: "Annual Alumni Meet", label: "Annual Meets" },
                  { key: "Batch Reunions & Milestone Celebrations", label: "Batch Reunions" },
                  { key: "Departmental Alumni Interaction Sessions", label: "Departmental Meets" },
                  { key: "Alumni Mentorship & Career Guidance Drives", label: "Mentorship Drives" },
                ].map((cat) => {
                  const isSelected = eventsActiveCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setEventsActiveCategory(cat.key)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer border ${
                        isSelected
                          ? "bg-blue-100 text-blue-900 border-blue-300 font-extrabold"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Meets Table & Content View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {(() => {
                const allMeets = data.events || [];
                const filtered = allMeets.filter((ev: any) => {
                  // Filter by status
                  if (eventsActiveStatus !== "all") {
                    if (eventsActiveStatus === "Upcoming" && ev.status !== "Upcoming") return false;
                    if (eventsActiveStatus === "Current" && ev.status !== "Current") return false;
                    if (eventsActiveStatus === "Past" && ev.status !== "Past") return false;
                  }
                  // Filter by category
                  if (eventsActiveCategory !== "all") {
                    const matchCategory =
                      ev.category?.toLowerCase() === eventsActiveCategory.toLowerCase() ||
                      ev.title?.toLowerCase().includes(eventsActiveCategory.toLowerCase().slice(0, 8));
                    if (!matchCategory) return false;
                  }
                  return true;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
                      <Calendar className="h-10 w-10 text-slate-400 mb-2" />
                      <h4 className="font-outfit font-black text-slate-800 text-base">No meets found in this category</h4>
                      <p className="text-xs text-slate-500 max-w-sm mt-1">
                        Try switching the status tab or category filter to view all scheduled and past alumni meets.
                      </p>
                      <button
                        onClick={() => {
                          setEventsActiveStatus("all");
                          setEventsActiveCategory("all");
                        }}
                        className="mt-4 px-4 py-2 bg-[#002147] text-white rounded-xl text-xs font-bold transition-all cursor-pointer hover:bg-blue-900"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs bg-white">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100/90 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                          <th className="py-3.5 px-4 text-center w-16">Status</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Academic Year</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Date &amp; Time</th>
                          <th className="py-3.5 px-4">Meet / Event Details</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Venue / Mode</th>
                          <th className="py-3.5 px-4 text-right w-40">Actions / Links</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {filtered.map((ev: any, idx: number) => {
                          const status = ev.status || "Upcoming";
                          const isUpcoming = status === "Upcoming";
                          const isCurrent = status === "Current";
                          const isPast = status === "Past";

                          return (
                            <tr key={ev._key || idx} className="hover:bg-blue-50/40 transition-colors">
                              {/* Status Badge */}
                              <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                    isUpcoming
                                      ? "bg-amber-50 text-amber-900 border-amber-200"
                                      : isCurrent
                                      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                                      : "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}
                                >
                                  {status}
                                </span>
                              </td>

                              {/* Academic Year */}
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                                {ev.academicYear || "2026–2027"}
                              </td>

                              {/* Date & Time */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                  <span className="font-bold text-slate-900">{ev.date || "Scheduled"}</span>
                                  {ev.time && <span className="text-[10px] text-slate-500 font-mono">{ev.time}</span>}
                                </div>
                              </td>

                              {/* Title & Description */}
                              <td className="py-3.5 px-4">
                                <div className="flex flex-col gap-1 max-w-md">
                                  {ev.category && (
                                    <span className="text-[10px] font-extrabold uppercase text-blue-700 tracking-wider">
                                      {ev.category}
                                    </span>
                                  )}
                                  <h5 className="font-outfit font-extrabold text-sm text-slate-900 leading-snug">
                                    {ev.title}
                                  </h5>
                                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                    {ev.description}
                                  </p>
                                </div>
                              </td>

                              {/* Venue */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span className="text-xs font-medium text-slate-700">
                                  {ev.venue || "College Campus"}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-1.5">
                                  {(ev.redirectUrl || (!ev.fileUrl && !isPast)) && (
                                    <a
                                      href={ev.redirectUrl || registrationLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                                    >
                                      <span>{ev.buttonText || (isPast ? "View Details" : "Register")}</span>
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  )}
                                  {ev.fileUrl && (
                                    <button
                                      onClick={() => openPdf(ev.fileUrl, ev.title)}
                                      className="px-3 py-1.5 bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                                    >
                                      <Eye className="h-3 w-3" />
                                      <span>{ev.buttonText && !ev.redirectUrl ? ev.buttonText : "Report"}</span>
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Total of <strong>{(data.events || []).length}</strong> alumni meets &amp; interaction programmes documented.
              </span>
              <button
                onClick={() => setEventsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ALL DISTINGUISHED ALUMNI DIRECTORY POPUP MODAL               */}
      {/* ============================================================ */}
      {isPrideModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setIsPrideModalOpen(false)}
        >
          <div
            className="bg-white rounded-[2rem] w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#002147] via-blue-900 to-[#002147] text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-blue-800">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-amber-400 shrink-0">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                    Distinguished Alumni Directory
                  </span>
                  <h3 className="font-outfit font-black text-xl sm:text-2xl tracking-tight text-white mt-0.5">
                    Our Alumni – Our Pride Directory
                  </h3>
                  <p className="text-xs text-blue-100/80 font-medium mt-1">
                    Celebrating leaders, entrepreneurs, academicians, and distinguished achievers of St. Ann&apos;s.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPrideModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer shrink-0 border border-white/10"
                title="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="bg-slate-50 p-4 px-6 border-b border-slate-200 flex items-center gap-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search alumni by name, batch, designation, or company..."
                value={prideSearchQuery}
                onChange={(e) => setPrideSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none placeholder-slate-400"
              />
              {prideSearchQuery && (
                <button
                  onClick={() => setPrideSearchQuery("")}
                  className="text-xs text-slate-400 hover:text-slate-700 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Alumni Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              {(() => {
                const list = (data.prideAlumni || []).filter((a: any) => {
                  if (!prideSearchQuery) return true;
                  const q = prideSearchQuery.toLowerCase();
                  return (
                    a.name?.toLowerCase().includes(q) ||
                    a.programmeBatch?.toLowerCase().includes(q) ||
                    a.designation?.toLowerCase().includes(q) ||
                    a.organization?.toLowerCase().includes(q) ||
                    a.achievement?.toLowerCase().includes(q)
                  );
                });

                if (list.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 text-xs">
                      No alumni records matched your search query.
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {list.map((alumnus: any, idx: number) => {
                      const isAlt = idx % 2 === 1;
                      return (
                        <div
                          key={alumnus._key || idx}
                          className={`p-5 rounded-2xl border-2 shadow-xs transition-all hover:shadow-md flex flex-col justify-between gap-3 ${
                            isAlt ? "border-blue-200/90" : "border-slate-200/90"
                          }`}
                          style={{
                            backgroundColor: isAlt ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)",
                          }}
                        >
                          <div className="flex flex-col gap-1.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider w-fit border ${
                              isAlt ? "bg-blue-100 text-blue-900 border-blue-200" : "bg-amber-50 text-amber-900 border-amber-200"
                            }`}>
                              Distinguished Alumna
                            </span>
                            <h5 className="font-outfit font-black text-sm text-slate-900">{alumnus.name}</h5>
                            <p className="text-xs font-bold text-blue-700">{alumnus.designation} • {alumnus.organization}</p>
                            <span className="text-[10px] font-mono text-slate-500">{alumnus.programmeBatch}</span>
                            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{alumnus.achievement}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>
                Displaying <strong>{(data.prideAlumni || []).length}</strong> distinguished alumni records.
              </span>
              <button
                onClick={() => setIsPrideModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ALL VOICES OF OUR ALUMNI POPUP MODAL                         */}
      {/* ============================================================ */}
      {isVoicesModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setIsVoicesModalOpen(false)}
        >
          <div
            className="bg-white rounded-[2rem] w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#002147] via-blue-900 to-[#002147] text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-blue-800">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-indigo-300 shrink-0">
                  <Quote className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                    Alumni Reflections &amp; Memories
                  </span>
                  <h3 className="font-outfit font-black text-xl sm:text-2xl tracking-tight text-white mt-0.5">
                    Voices of Our Alumni Collection
                  </h3>
                  <p className="text-xs text-blue-100/80 font-medium mt-1">
                    Inspiring experiences and reflections shared by graduates across various programmes and decades.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVoicesModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer shrink-0 border border-white/10"
                title="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Testimonials Grid (ABBA ABBA) */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.testimonials || []).map((test: any, idx: number) => {
                  const isAlt = idx % 4 === 1 || idx % 4 === 2;
                  return (
                    <div
                      key={test._key || idx}
                      className={`p-5 rounded-2xl border-2 shadow-xs flex flex-col justify-between gap-3 transition-all hover:shadow-md ${
                        isAlt ? "border-blue-200/90" : "border-slate-200/90"
                      }`}
                      style={{
                        backgroundColor: isAlt ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)",
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-blue-700">
                          <Quote className="h-4 w-4 shrink-0" />
                          <h5 className="font-outfit font-extrabold text-xs uppercase tracking-wider">{test.title}</h5>
                        </div>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                          “{test.quote}”
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">— {test.alumnaName}</span>
                        <span className="text-[11px] font-mono font-semibold text-slate-500">{test.programmeBatch}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>
                Total of <strong>{(data.testimonials || []).length}</strong> official alumni testimonials.
              </span>
              <button
                onClick={() => setIsVoicesModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
