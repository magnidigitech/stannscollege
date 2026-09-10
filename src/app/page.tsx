"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";
import {
  getCollegeMagazines,
  getNewsletters,
  getHomeBanners,
  getHomeGalleries,
} from "@/lib/sanity";

// Components
import CollegeMagazinesSection, { MagazineItem } from "@/components/home/CollegeMagazinesSection";
import NewslettersSection, { NewsletterItem } from "@/components/home/NewslettersSection";
import HomePhotoGallery, { HomeGalleryDoc } from "@/components/home/HomePhotoGallery";

// Default Fallback Hero Slides
const defaultSlides = [
  {
    _id: "default-1",
    imageUrl: "/images/infrastructure/campus-buildings/img-1.jpg",
    tagline: "Society of St. Anne minority institution",
    title: "Shaping Visionary Female Leaders",
    desc: "Embark on an extraordinary educational experience that blends character, academic competence, and social compassion.",
    cta1Text: "Apply For Admissions",
    cta1Link: "/admissions/policy-process",
    cta2Text: "Explore About Us",
    cta2Link: "/about/the-institution/basic-institutional-information",
  },
  {
    _id: "default-2",
    imageUrl: "/images/infrastructure/campus-buildings/img-2.jpg",
    tagline: "Acharya Nagarjuna University Affiliated - Grade A+",
    title: "Academic Excellence & Rigour",
    desc: "Proudly graded A+ by NAAC in Guntur. Discover our meticulously structured undergraduate & postgraduate curricula.",
    cta1Text: "Academic Programmes",
    cta1Link: "/academics/academic-programmes/undergraduate-programmes",
    cta2Text: "NAAC Peer Team Visit",
    cta2Link: "/naac-peer-team",
  },
  {
    _id: "default-3",
    imageUrl: "/images/infrastructure/campus-buildings/img-3.jpg",
    tagline: "AICTE Approved Professional Programs",
    title: "Vibrant Placements & Industry Links",
    desc: "Launch your career with leading multinational corporations. Benefit from professional skill training and robust recruitment cell support.",
    cta1Text: "Placement Highlights",
    cta1Link: "/placements/training-placements",
    cta2Text: "Contact Support",
    cta2Link: "/contact",
  },
  {
    _id: "default-4",
    imageUrl: "/Home page/IMG_20240304_085331.jpg",
    tagline: "Holistic Student Development",
    title: "Empowering Women Through Quality Education",
    desc: "Fostering academic rigor, personal mentorship, and vibrant student community engagement across all departments.",
    cta1Text: "Explore Programmes",
    cta1Link: "/academics/academic-programmes/undergraduate-programmes",
    cta2Text: "Admissions Process",
    cta2Link: "/admissions/policy-process",
  },
  {
    _id: "default-5",
    imageUrl: "/Home page/IMG20250122085524.jpg",
    tagline: "Modern Learning Infrastructure",
    title: "State-of-the-Art Campus & Infrastructure",
    desc: "Equipped with advanced computer networks, science laboratories, ICT classrooms, and extensive library catalogs.",
    cta1Text: "Campus Facilities",
    cta1Link: "/about/the-institution/basic-institutional-information",
    cta2Text: "Student Support",
    cta2Link: "/student-support/student-counselling",
  },
  {
    _id: "default-6",
    imageUrl: "/Home page/WhatsApp Image 2025-12-30 at 10.24.28 AM.jpeg",
    tagline: "Celebrations & Student Leadership",
    title: "Vibrant Campus Life & Cultural Eminence",
    desc: "Celebrating student creativity, leadership forums, sports triumphs, and annual academic conventions.",
    cta1Text: "View Photo Gallery",
    cta1Link: "/about/the-institution/institutional-awards",
    cta2Text: "Contact Support",
    cta2Link: "/contact",
  },
  {
    _id: "default-7",
    imageUrl: "/Home page/IMG20260217130933.jpg",
    tagline: "The 3C Institutional Philosophy",
    title: "Character, Competence & Compassion",
    desc: "Building socially compassionate and industry-ready female leaders for modern global communities.",
    cta1Text: "About St. Ann's",
    cta1Link: "/about/the-institution/history-of-the-college",
    cta2Text: "Our Leadership",
    cta2Link: "/about/the-institution/head-of-the-institution",
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

export default function HomePage() {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [heroSlides, setHeroSlides] = useState<any[]>(defaultSlides);

  // Dynamic Sanity Data States
  const [magazines, setMagazines] = useState<MagazineItem[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [galleries, setGalleries] = useState<HomeGalleryDoc[]>([]);

  // Right Side Drawer / Modal State for Magazine & Chronicle
  const [activeRightDrawer, setActiveRightDrawer] = useState<"magazine" | "chronicle" | null>(null);

  // Active Tab State
  const [activeTab, setActiveTab] = useState("philosophy");

  // Fetch Sanity Data on Mount
  useEffect(() => {
    async function loadData() {
      try {
        const [magsData, newsData, bannersData, galleryData] = await Promise.all([
          getCollegeMagazines(),
          getNewsletters(),
          getHomeBanners(),
          getHomeGalleries(),
        ]);

        if (magsData && magsData.length > 0) setMagazines(magsData);
        if (newsData && newsData.length > 0) setNewsletters(newsData);
        if (bannersData && bannersData.length > 0) setHeroSlides(bannersData);
        if (galleryData && galleryData.length > 0) setGalleries(galleryData);
      } catch (err) {
        console.error("Error loading home page Sanity data:", err);
      }
    }
    loadData();
  }, []);

  // Auto transition hero slides every 6 seconds
  useEffect(() => {
    if (isHovered || heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, heroSlides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const activeSlide = heroSlides[currentSlide] || heroSlides[0];

  return (
    <div className="flex flex-col w-full bg-slate-50/30 overflow-x-hidden selection:bg-[#002147]/10 selection:text-[#002147]">
      {/* ----------------------------------------------------
          1. HERO SLIDER SECTION (Visual Wow Factor)
          ---------------------------------------------------- */}
      <section
        className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] max-h-[720px] bg-slate-950 overflow-hidden select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            const slideImg = (
              <img
                src={slide.imageUrl}
                alt={slide.title || `St. Ann's College Banner ${index + 1}`}
                className="w-full h-full object-cover object-top"
              />
            );
            return (
              <div
                key={slide._id || index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {slide.cta1Link ? (
                  <Link href={slide.cta1Link} className="block w-full h-full">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white transition-all active:scale-95 shadow-lg cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white transition-all active:scale-95 shadow-lg cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentSlide ? "w-8 bg-indigo-500" : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ----------------------------------------------------
          2. ACTIVE HERO BANNER SPOTLIGHT / HIGHLIGHTS STRIP
          (Compact bar with main headline and action buttons)
          ---------------------------------------------------- */}
      {activeSlide && (
        <section className="w-full bg-[#001733] border-y border-indigo-950/80 py-4 sm:py-5 select-none text-white relative overflow-hidden shadow-md">
          {/* Subtle background ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full relative z-10">
            <div
              key={currentSlide}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 transition-all duration-500 ease-out"
            >
              {/* Main Headline Text in Big Size */}
              <h2 className="flex-1 font-outfit text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {activeSlide.title}
              </h2>

              {/* Action Buttons at the Right */}
              <div className="shrink-0 flex flex-wrap items-center gap-3">
                {(activeSlide.cta1Text || activeSlide.cta1Link) && (
                  <Link
                    href={activeSlide.cta1Link || "/admissions/policy-process"}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-950/50 hover:from-indigo-500 hover:to-indigo-600 active:scale-95 transition-all duration-300"
                  >
                    {activeSlide.cta1Text || "Explore Programme"}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}

                {(activeSlide.cta2Text || activeSlide.cta2Link) && (
                  <Link
                    href={activeSlide.cta2Link || "/about/the-institution/basic-institutional-information"}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white hover:text-white active:scale-95 transition-all duration-300"
                  >
                    {activeSlide.cta2Text || "Learn More"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ----------------------------------------------------
          6. PRINCIPAL'S WELCOME & EMBLEM SPOTLIGHT
          ---------------------------------------------------- */}
      <section className="py-16 bg-white border-y border-slate-200/50 select-none">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl rotate-3 scale-95 group-hover:rotate-1 group-hover:scale-100 transition-transform duration-500 blur-sm opacity-20 pointer-events-none" />
                <div className="relative overflow-hidden rounded-3xl bg-slate-100 border border-slate-200/60 p-4 shadow-md max-w-xs md:max-w-sm flex flex-col items-center">
                  <div className="h-72 w-64 bg-[#002147]/5 rounded-2xl flex items-center justify-center border border-slate-200/40 relative group overflow-hidden">
                    <img
                      src="/images/principal.jpg"
                      alt="Dr. Sr. Sandhya Thumma"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-outfit text-lg font-black text-slate-800 leading-tight">
                      Dr. Sr. Sandhya Thumma
                    </h3>
                    <p className="text-xs font-bold text-indigo-600 tracking-wider uppercase mt-1">
                      Principal, St. Ann&apos;s College
                    </p>
                    <p className="font-sans text-[11px] font-semibold text-slate-400 mt-0.5">
                      MBA, M.Com, M.Ed, Ph.D.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-600 uppercase tracking-wider">
                <Quote className="h-3.5 w-3.5 text-indigo-500" /> Welcome Address
              </span>

              <h2 className="font-outfit text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                Transforming Potential into Power
              </h2>

              <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mt-2">
                &quot;Welcome to a premier academic community where we don&apos;t just teach—we transform. At St. Ann’s College for Women, Gorantla, we recognize that the future belongs to those who prepare for it.&quot;
              </p>

              <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Our vision is to ensure our institution remains at the forefront of higher education. Under the guidance of the Society of St. Anne, we balance professional modern curriculum, robust lab infrastructures, and spiritual core ethics to build the female leaders of tomorrow. We are deeply committed to character, academic competence, and compassion.
              </p>

              <div className="flex items-center gap-4 mt-4 select-none">
                <Link
                  href="/about/the-institution/head-of-the-institution"
                  className="flex items-center gap-2 rounded-2xl bg-[#002147] hover:bg-[#002b5c] text-white px-5 py-3.5 text-sm font-bold shadow-md transition-all duration-300 active:scale-95"
                >
                  Read Full Message <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about/the-institution/vision-mission-and-core-values"
                  className="flex items-center gap-1 text-slate-600 hover:text-[#002147] text-sm font-semibold transition-colors duration-200"
                >
                  Our Vision & Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          7. DYNAMIC CAMPUS PHOTO GALLERY
          ---------------------------------------------------- */}
      {galleries.length > 0 && <HomePhotoGallery galleries={galleries} />}

      {/* ----------------------------------------------------
          8. INTERACTIVE WHY CHOOSE ST. ANN'S SECTION
          ---------------------------------------------------- */}
      <section className="py-16 select-none bg-slate-50/20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-600 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" /> Institution Pillars
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Why Elite Students Choose St. Ann&apos;s
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-semibold max-w-md">
              A curriculum crafted for real-world excellence, personal mentoring, and industry pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
            <div className="lg:col-span-4 flex flex-col gap-3">
              {whyTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 p-4 text-left rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? "bg-[#002147] border-[#002147] text-white shadow-lg"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                        isSelected
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-indigo-50 border-indigo-100 text-indigo-600"
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-sm font-black leading-none tracking-tight">
                        {tab.title}
                      </h4>
                      <p
                        className={`font-sans text-[11px] font-medium mt-1 leading-none ${
                          isSelected ? "text-indigo-200" : "text-slate-400"
                        }`}
                      >
                        Explore details
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-8">
              {whyTabs.map((tab) => {
                if (tab.id !== activeTab) return null;
                return (
                  <div
                    key={tab.id}
                    className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden transition-all duration-500 animate-fadeIn"
                  >
                    <div
                      className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${tab.bgGradient} blur-3xl rounded-full pointer-events-none`}
                    />
                    <div className="relative z-10 flex flex-col gap-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/50 text-[#002147] shadow-inner">
                          <tab.icon className="h-5 w-5" />
                        </span>
                        <h3 className="font-outfit text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none">
                          {tab.heading}
                        </h3>
                      </div>

                      <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed">
                        {tab.text}
                      </p>

                      <div className="h-px bg-slate-100 my-2" />

                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-black text-[#002147] uppercase tracking-wider">
                          Key Features
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {tab.bulletPoints.map((bp, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                              <span className="font-sans text-xs md:text-sm font-semibold text-slate-600 leading-snug">
                                {bp}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          9. ACADEMIC PROGRAMS NAVIGATION
          ---------------------------------------------------- */}
      <section className="py-12 bg-white border-y border-slate-200/50 select-none">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
          <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-600 uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5 text-indigo-500" /> Academic Tracks
            </span>
            <h2 className="font-outfit text-3xl font-black text-slate-800 tracking-tight leading-none">
              Explore Our Degree Pathways
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-semibold">
              Select program formats designed to accelerate career growth & research aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-black text-blue-600 uppercase tracking-wider">
                    UG Honours
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200/50 text-[#002147] shadow-sm">
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
                className="mt-6 flex items-center justify-center gap-2 w-full rounded-2xl bg-[#002147] hover:bg-[#002b5c] text-white font-sans font-bold text-xs py-3.5 px-4 shadow-sm transition-all duration-300"
              >
                View UG Syllabus & Details <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded bg-purple-50 border border-purple-100 px-2 py-0.5 text-[10px] font-black text-purple-600 uppercase tracking-wider">
                    PG Professional
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200/50 text-[#002147] shadow-sm">
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
                className="mt-6 flex items-center justify-center gap-2 w-full rounded-2xl bg-[#002147] hover:bg-[#002b5c] text-white font-sans font-bold text-xs py-3.5 px-4 shadow-sm transition-all duration-300"
              >
                View PG Syllabus & Intake <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          10. PLACEMENTS SPOTLIGHT
          ---------------------------------------------------- */}
      <section className="py-16 select-none bg-slate-50/20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-600 uppercase tracking-wider">
                <Briefcase className="h-3.5 w-3.5 text-indigo-500" /> Career Milestones
              </span>

              <h2 className="font-outfit text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                Top Recruiters & Placement Records
              </h2>

              <p className="font-sans text-xs md:text-sm text-slate-400 font-semibold">
                Building pathways with industry giants. Over a decade of successful placement drives.
              </p>

              <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Our Training and Placement Cell works relentlessly to groom student cohorts through professional corporate bootcamps. Students secure roles in leading MNC software firms, taxation agencies, and financial entities.
              </p>

              <div className="h-px bg-slate-200 w-full my-2" />

              <div className="flex flex-col gap-2 font-sans text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Training in Aptitude & Quantitative skills
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Technical coding mock interviews (Java, C, Python)
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Soft-skill grooming & presentation mock drills
                </span>
              </div>

              <Link
                href="/placements/training-placements"
                className="mt-4 flex items-center gap-2 rounded-2xl bg-[#002147] hover:bg-[#002b5c] text-white px-5 py-3.5 text-sm font-bold shadow-md transition-all active:scale-95 duration-300"
              >
                More Placement Reports <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl rotate-2 blur-sm pointer-events-none" />
                <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/60 p-4 md:p-6 shadow-md flex flex-col gap-4">
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest leading-none">
                    Performance Graph Highlight
                  </span>

                  <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2 relative overflow-hidden flex items-center justify-center min-h-[220px]">
                    <img
                      src="/images/placements/Placements Statistics 2024-2025.png"
                      alt="St Ann's Placement Statistics Graph"
                      className="max-h-[300px] w-auto object-contain rounded-xl hover:scale-105 transition-transform duration-300 select-none"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-sans font-semibold border-t border-slate-100 pt-3">
                    <span>Recruitment Cycle: 2024–2025</span>
                    <span className="text-indigo-600 font-bold flex items-center gap-1">
                      100% Placement Support <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          11. BOTTOM ACTION & MAP
          ---------------------------------------------------- */}
      <section className="py-12 bg-slate-900 text-white select-none">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
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
                  We are highly committed to NAAC guidelines & compliance regulations for higher educational institutions.
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
                  Direct convener & management seats for UG Honours and AICTE approved PG (MCA & MBA) programmes.
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
                <Link
                  href="/admissions/policy-process"
                  className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold mt-2"
                >
                  Start Application <ArrowRight className="h-3 w-3" />
                </Link>
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
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5 select-none items-start"
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
          FIXED RIGHT NOTCH BUTTONS: College Magazine & St. Ann's Chronicle
          (Compact vertical orientation, fixed at middle-lower screen, persistent on scroll)
          ---------------------------------------------------- */}
      <aside
        aria-label="Publications & Periodicals"
        className="fixed right-0 top-[56%] -translate-y-1/2 z-30 flex flex-col gap-2 select-none items-end"
      >
        {/* College Annual Magazine Vertical Notch */}
        <button
          onClick={() => setActiveRightDrawer("magazine")}
          className="group flex flex-col items-center gap-1.5 bg-gradient-to-b from-[#001730] to-[#002147] hover:from-indigo-900 hover:to-indigo-700 text-white px-1.5 py-2.5 rounded-l-xl border-l-2 border-y border-indigo-400/40 shadow-xl shadow-indigo-950/60 transition-all duration-300 transform translate-x-1 hover:translate-x-0 cursor-pointer"
          title="College Annual Magazine"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500 text-indigo-300 group-hover:text-white transition-all shrink-0 border border-indigo-400/30 shadow-2xs">
            <BookOpen className="h-3.5 w-3.5" />
          </div>
          <span className="[writing-mode:vertical-rl] rotate-180 font-outfit font-black text-[10px] tracking-wider uppercase text-white group-hover:text-indigo-200 transition-colors py-0.5 select-none whitespace-nowrap">
            Magazine
          </span>
        </button>

        {/* The St. Ann's Chronicle Vertical Notch */}
        <button
          onClick={() => setActiveRightDrawer("chronicle")}
          className="group flex flex-col items-center gap-1.5 bg-gradient-to-b from-[#001730] to-[#00382b] hover:from-emerald-950 hover:to-emerald-700 text-white px-1.5 py-2.5 rounded-l-xl border-l-2 border-y border-emerald-400/40 shadow-xl shadow-emerald-950/60 transition-all duration-300 transform translate-x-1 hover:translate-x-0 cursor-pointer"
          title="The St. Ann's Chronicle"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500 text-emerald-300 group-hover:text-white transition-all shrink-0 border border-emerald-400/30 shadow-2xs">
            <Newspaper className="h-3.5 w-3.5" />
          </div>
          <span className="[writing-mode:vertical-rl] rotate-180 font-outfit font-black text-[10px] tracking-wider uppercase text-white group-hover:text-emerald-200 transition-colors py-0.5 select-none whitespace-nowrap">
            Chronicle
          </span>
        </button>
      </aside>

      {/* ----------------------------------------------------
          MODAL VIEWER FOR MAGAZINE & CHRONICLE
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
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-gradient-to-r from-[#001730] via-[#002147] to-[#001730] text-white border-b border-indigo-950 select-none">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex bg-white/10 rounded-2xl p-1 border border-white/15">
                  <button
                    onClick={() => setActiveRightDrawer("magazine")}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeRightDrawer === "magazine"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <BookOpen className="h-4 w-4 shrink-0" />
                    <span>College Annual Magazine</span>
                  </button>
                  <button
                    onClick={() => setActiveRightDrawer("chronicle")}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeRightDrawer === "chronicle"
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Newspaper className="h-4 w-4 shrink-0" />
                    <span>The St. Ann&apos;s Chronicle</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setActiveRightDrawer(null)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50">
              {activeRightDrawer === "magazine" ? (
                <CollegeMagazinesSection magazines={magazines} />
              ) : (
                <NewslettersSection newsletters={newsletters} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
