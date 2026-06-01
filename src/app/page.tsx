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
  Layers,
  Heart,
  ChevronDown,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------
// Static Slide Data (Using actual campus buildings files)
// ----------------------------------------------------
const slides = [
  {
    id: 1,
    image: "/images/infrastructure/campus-buildings/img-1.jpg",
    tagline: "Society of St. Anne minority institution",
    title: "Shaping Visionary Female Leaders",
    desc: "Embark on an extraordinary educational experience that blends character, academic competence, and social compassion.",
    cta1: "Apply For Admissions",
    link1: "/admissions/policy-process",
    cta2: "Explore About Us",
    link2: "/about/the-institution/basic-institutional-information",
  },
  {
    id: 2,
    image: "/images/infrastructure/campus-buildings/img-2.jpg",
    tagline: "Acharya Nagarjuna University Affiliated",
    title: "Academic Excellence & Rigour",
    desc: "Proudly graded A+ by NAAC in Guntur. Discover our meticulously structured undergraduate & postgraduate curricula.",
    cta1: "Academic Programmes",
    link1: "/academics/academic-programmes/undergraduate-programmes",
    cta2: "View Departments",
    link2: "/academics/departments",
  },
  {
    id: 3,
    image: "/images/infrastructure/campus-buildings/img-3.jpg",
    tagline: "AICTE Approved Professional Programs",
    title: "Vibrant Placements & Industry Links",
    desc: "Launch your career with leading multinational corporations. Benefit from professional skill training and robust recruitment cell support.",
    cta1: "Placement Highlights",
    link1: "/placements/training-placements",
    cta2: "Contact Support",
    link2: "/contact",
  },
];

// ----------------------------------------------------
// Tab Data for "Why Choose St. Ann's"
// ----------------------------------------------------
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
    accentColor: "rose",
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
    accentColor: "indigo",
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
    accentColor: "emerald",
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
    accentColor: "amber",
  },
];

export default function HomePage() {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Tabs State
  const [activeTab, setActiveTab] = useState("philosophy");

  // Auto transition hero slides every 6 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="flex flex-col w-full bg-slate-50/30 overflow-x-hidden selection:bg-[#002147]/10 selection:text-[#002147]">
      {/* ----------------------------------------------------
          1. HERO SLIDER SECTION (Visual Wow Factor)
          ---------------------------------------------------- */}
      <section
        className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] bg-slate-950 overflow-hidden select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides Container */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* Background Image with Dark Linear Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform duration-10000 ease-linear ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="mx-auto max-w-7xl px-6 w-full text-left">
                    <div className="max-w-2xl md:max-w-3xl flex flex-col items-start gap-4">
                      {/* Animated Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 text-xs md:text-sm font-bold text-indigo-300 tracking-wider uppercase transform transition-all duration-700 delay-300 ${
                          isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        }`}
                      >
                        <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />{" "}
                        {slide.tagline}
                      </span>

                      {/* Main Animated Title */}
                      <h1
                        className={`font-outfit text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mt-2 transform transition-all duration-700 delay-500 ${
                          isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                        }`}
                      >
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p
                        className={`text-sm sm:text-base md:text-lg text-slate-200 font-sans max-w-xl md:max-w-2xl leading-relaxed mt-2 transform transition-all duration-700 delay-700 ${
                          isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {slide.desc}
                      </p>

                      {/* CTA Buttons */}
                      <div
                        className={`flex flex-wrap items-center gap-4 mt-6 transform transition-all duration-700 delay-900 ${
                          isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                      >
                        <Link
                          href={slide.link1}
                          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-900/40 hover:from-indigo-500 hover:to-indigo-600 hover:shadow-indigo-800/60 active:scale-95 transition-all duration-300"
                        >
                          {slide.cta1} <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          href={slide.link2}
                          className="flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md px-6 py-4 text-sm font-bold text-white hover:text-white active:scale-95 transition-all duration-300"
                        >
                          {slide.cta2}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Slider Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-white transition-all active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-white transition-all active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-indigo-500" : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------
          2. ACCREDITATIONS & MANDATES FAST STRIP
          ---------------------------------------------------- */}
      <section className="w-full bg-[#002147] py-6 border-b border-[#001733] select-none text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 shadow-inner">
                <ShieldCheck className="h-5 w-5 animate-pulse" />
              </span>
              <div>
                <h4 className="font-outfit text-sm font-black uppercase tracking-wider leading-none text-indigo-300">
                  Accredited Status
                </h4>
                <p className="font-sans text-xs text-slate-300 mt-1 font-semibold">
                  Recognized and verified parameters of excellence
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 w-full lg:w-auto text-center lg:text-left">
              <div className="flex flex-col border-l-2 border-indigo-500/30 pl-4">
                <span className="font-outfit text-sm font-black text-white leading-none">NAAC A+</span>
                <span className="font-sans text-[11px] text-slate-400 font-semibold mt-1">First Cycle Grade</span>
              </div>
              <div className="flex flex-col border-l-2 border-indigo-500/30 pl-4">
                <span className="font-outfit text-sm font-black text-white leading-none">AICTE APPROVED</span>
                <span className="font-sans text-[11px] text-slate-400 font-semibold mt-1">Professional PG</span>
              </div>
              <div className="flex flex-col border-l-2 border-indigo-500/30 pl-4">
                <span className="font-outfit text-sm font-black text-white leading-none">UGC 2(f)</span>
                <span className="font-sans text-[11px] text-slate-400 font-semibold mt-1">Act Recognized</span>
              </div>
              <div className="flex flex-col border-l-2 border-indigo-500/30 pl-4">
                <span className="font-outfit text-sm font-black text-white leading-none">AISHE CODE</span>
                <span className="font-sans text-[11px] text-slate-400 font-semibold mt-1">C-32612 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          3. KEY INSTITUTIONAL STATISTICS (Dash style)
          ---------------------------------------------------- */}
      <section className="py-12 select-none">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-3xl md:text-4xl font-outfit font-black text-[#002147] tracking-tight group-hover:scale-105 transition-transform duration-300">
                  29+ Years
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-[#002147] group-hover:text-white transition-colors">
                  <Award className="h-5 w-5" />
                </span>
              </div>
              <h3 className="font-outfit text-base font-bold text-slate-800 tracking-tight mt-4">
                Educational Legacy
              </h3>
              <p className="font-sans text-xs text-slate-400 font-medium leading-relaxed mt-1">
                Shaping standards of academic eminence & service since our inception in 1997.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-3xl md:text-4xl font-outfit font-black text-[#002147] tracking-tight group-hover:scale-105 transition-transform duration-300">
                  15+
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-[#002147] group-hover:text-white transition-colors">
                  <BookOpen className="h-5 w-5" />
                </span>
              </div>
              <h3 className="font-outfit text-base font-bold text-slate-800 tracking-tight mt-4">
                Academic Programs
              </h3>
              <p className="font-sans text-xs text-slate-400 font-medium leading-relaxed mt-1">
                Rigorous Honours programmes in Commerce, Sciences, Management, and Humanities.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-3xl md:text-4xl font-outfit font-black text-[#002147] tracking-tight group-hover:scale-105 transition-transform duration-300">
                  50+
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-[#002147] group-hover:text-white transition-colors">
                  <Users className="h-5 w-5" />
                </span>
              </div>
              <h3 className="font-outfit text-base font-bold text-slate-800 tracking-tight mt-4">
                Expert Faculty
              </h3>
              <p className="font-sans text-xs text-slate-400 font-medium leading-relaxed mt-1">
                Accomplished educators, PhD scholars, and researchers dedicated to students.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-3xl md:text-4xl font-outfit font-black text-[#002147] tracking-tight group-hover:scale-105 transition-transform duration-300">
                  100%
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-[#002147] group-hover:text-white transition-colors">
                  <TrendingUp className="h-5 w-5" />
                </span>
              </div>
              <h3 className="font-outfit text-base font-bold text-slate-800 tracking-tight mt-4">
                Placement Guidance
              </h3>
              <p className="font-sans text-xs text-slate-400 font-medium leading-relaxed mt-1">
                Continuous training, industrial collaborations, and drives with top corporates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          4. PRINCIPAL'S WELCOME & EMBLEM SPOTLIGHT
          ---------------------------------------------------- */}
      <section className="py-12 bg-white border-y border-slate-200/50 select-none">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Professional Principal Frame */}
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

            {/* Right: Message Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-600 uppercase tracking-wider">
                <Quote className="h-3.5 w-3.5 text-indigo-500" /> Welcome Address
              </span>
              
              <h2 className="font-outfit text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                Transforming Potential into Power
              </h2>

              <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mt-2">
                "Welcome to a premium academic community where we don&apos;t just teach—we transform. At St. Ann’s College for Women, Gorantla, we recognize that the future belongs to those who prepare for it."
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
          5. INTERACTIVE WHY CHOOSE ST. ANN'S SECTION
          ---------------------------------------------------- */}
      <section className="py-16 select-none bg-slate-50/20">
        <div className="mx-auto max-w-7xl px-6">
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

          {/* Interactive Tabbed Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
            {/* Tab Controls (Column 1-4) */}
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

            {/* Tab View Display (Column 5-12) */}
            <div className="lg:col-span-8">
              {whyTabs.map((tab) => {
                if (tab.id !== activeTab) return null;
                return (
                  <div
                    key={tab.id}
                    className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden transition-all duration-500 animate-fadeIn"
                  >
                    {/* Corner gradient blur accent */}
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
          6. ACADEMIC PROGRAMS NAVIGATION
          ---------------------------------------------------- */}
      <section className="py-12 bg-white border-y border-slate-200/50 select-none">
        <div className="mx-auto max-w-7xl px-6">
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
            {/* Option 1: UG */}
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

            {/* Option 2: PG */}
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
          7. PLACEMENTS SPOTLIGHT & CORPORATE TRUST
          ---------------------------------------------------- */}
      <section className="py-16 select-none bg-slate-50/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column - Placement Info */}
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

            {/* Right Column - Placement Graph Display */}
            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl rotate-2 blur-sm pointer-events-none" />
                <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/60 p-4 md:p-6 shadow-md flex flex-col gap-4">
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest leading-none">
                    Performance Graph Highlight
                  </span>
                  
                  {/* Graph Image Display */}
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
          8. STUDENT LAURELS & ACHIEVERS SPOTLIGHT
          ---------------------------------------------------- */}
      <section className="py-16 bg-white border-t border-slate-200/50 select-none">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-600 uppercase tracking-wider">
              <Award className="h-3.5 w-3.5 text-indigo-500" /> Student laurels
            </span>
            <h2 className="font-outfit text-3xl font-black text-slate-800 tracking-tight leading-none">
              Pride of St. Ann&apos;s
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-semibold">
              Shining stars who secured Gold Medals and Pratibha Awards in University Examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* Laurel 1 */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-3xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                  MCA Gold Medalist
                </span>
                <h4 className="font-outfit text-lg font-black text-slate-800 mt-2">
                  S. Ravali
                </h4>
                <p className="font-sans text-xs text-slate-400 mt-0.5">Hall Ticket: Y15MC58020</p>
                <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal mt-3">
                  Secured an extraordinary achievement of **03 Gold Medals** in Acharya Nagarjuna University Examinations, exemplifying computational brilliance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold font-sans">
                <span>MCA Batch</span>
                <span className="text-[#002147]">3 Gold Medals</span>
              </div>
            </div>

            {/* Laurel 2 */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-3xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                  Pratibha Puraskar Award
                </span>
                <h4 className="font-outfit text-lg font-black text-slate-800 mt-2">
                  Gundala Usha Rani
                </h4>
                <p className="font-sans text-xs text-slate-400 mt-0.5">Hall Ticket: Y222158013</p>
                <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal mt-3">
                  Ranked 2nd Place in Top 5 at the state-level examinations. Recognized for excellent commerce standards and analytical intelligence.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold font-sans">
                <span>B.Com Batch</span>
                <span className="text-[#002147]">State Rank 2</span>
              </div>
            </div>

            {/* Laurel 3 */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-3xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                  University Ranker
                </span>
                <h4 className="font-outfit text-lg font-black text-slate-800 mt-2">
                  K. Anuja
                </h4>
                <p className="font-sans text-xs text-slate-400 mt-0.5">Hall Ticket: Y153158018</p>
                <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal mt-3">
                  Distinguished recipient of the prestigious Pratibha Puraskar Academic Excellence Award for exceptional pedagogy performance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold font-sans">
                <span>BBC Batch</span>
                <span className="text-[#002147]">Pratibha Award</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 bg-slate-50 border border-slate-200/60 p-6 rounded-3xl">
            <span className="text-xs md:text-sm text-slate-600 font-semibold font-sans text-center sm:text-left">
              Want to see the entire, historically authenticated list of Pratibha Awards & Gold Medals?
            </span>
            <Link
              href="/about/the-institution/student-laurels"
              className="flex items-center gap-2 rounded-2xl bg-[#002147] hover:bg-[#002b5c] text-white px-5 py-3 text-xs font-bold shadow-sm transition-all duration-300"
            >
              Explore Complete Laurels <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          9. BOTTOM DETAILED MAP / CONTACT FAST ACTION
          ---------------------------------------------------- */}
      <section className="py-12 bg-slate-900 text-white select-none">
        <div className="mx-auto max-w-7xl px-6">
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
    </div>
  );
}
