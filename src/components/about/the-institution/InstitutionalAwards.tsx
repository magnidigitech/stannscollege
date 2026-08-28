"use client";

import React, { useState, useEffect } from "react";
import { Award, ShieldCheck, Sparkles, CheckCircle, Trophy, Calendar, Eye, X, ChevronLeft, ChevronRight, Download } from "lucide-react";

export function InstitutionalAwards() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const awardCertificates = [
    { src: "/images/about/the-institution/institutional-awards/2026.jpg", title: "AP Higher Education Conclave Certificate 2026" },
    { src: "/images/about/the-institution/institutional-awards/2024.jpeg", title: "NAAC 'A' Grade Accreditation 2024" },
    { src: "/images/about/the-institution/institutional-awards/2019.jpg", title: "ANU Best Professional PG College 2019" },
    { src: "/images/about/the-institution/institutional-awards/2017.jpg", title: "ANU Best Degree College 2017" },
    { src: "/images/about/the-institution/institutional-awards/2008.jpg", title: "ANU PG Certificate of Merit 2008" },
    { src: "/images/about/the-institution/institutional-awards/NIRF.jpg", title: "NIRF National Ranking Certificate" },
    { src: "/images/about/the-institution/institutional-awards/20181026_100642.jpg", title: "Red Cross Society Voluntary Appreciation" },
    { src: "/images/about/the-institution/institutional-awards/IMG20260415160014.jpg", title: "Institutional Excellence Award" },
    { src: "/images/about/the-institution/institutional-awards/IMG20260415160105.jpg", title: "Academic Development & Leadership Award" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_1.jpg", title: "APSCHE Development Certificate" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_7.jpg", title: "Swachh Bharat Clean Campus Award" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_10.jpg", title: "Skill India Entrepreneurship Appreciation" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_11.jpg", title: "Heartfulness Global Essay Event Appreciation" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_12.jpg", title: "Guntur Municipal Corporation Award" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_13.jpg", title: "UGC & AICTE Institutional Approval" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_16.jpg", title: "Higher Education Excellence Certificate" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_17.jpg", title: "Empowering Women through Professional Training" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_18.jpg", title: "Green Campus Sustainability Certificate" },
    { src: "/images/about/the-institution/institutional-awards/New Doc 02-11-2025 12.12_19.jpg", title: "Decennial Anniversary Appreciation Certificate" }
  ];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentIndex = awardCertificates.findIndex(c => c.src === selectedImage);
    const prevIndex = (currentIndex - 1 + awardCertificates.length) % awardCertificates.length;
    setSelectedImage(awardCertificates[prevIndex].src);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentIndex = awardCertificates.findIndex(c => c.src === selectedImage);
    const nextIndex = (currentIndex + 1) % awardCertificates.length;
    setSelectedImage(awardCertificates[nextIndex].src);
  };

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const recentHighlights = [
    {
      date: "March 1, 2026",
      title: "Sustainable Bharath 2047 Conclave Certificate",
      desc: "Participation Certificate in the National Conclave on Research & Deep Technologies by the Research Heights Foundation, Hyderabad."
    },
    {
      date: "December 3, 2025",
      title: "TOP 10 MCA Colleges in AP",
      desc: "Ranked among the TOP 10 MCA Colleges in Andhra Pradesh by The Higher Education Review Magazine, Bangalore."
    },
    {
      date: "June 30, 2024",
      title: "NAAC 'A' Grade Accreditation",
      desc: "Secured prestigious NAAC 'A' Grade Accreditation with a CGPA of 3.09."
    },
    {
      date: "September 26, 2023",
      title: "Red Cross Recognition",
      desc: "Received Certificate of Appreciation from the Red Cross Blood Centre for voluntary blood donation."
    },
    {
      date: "July 12, 2023",
      title: "Best Green Campus Award",
      desc: "Honored with the Best Green Campus Award, reflecting our dedication to environmental sustainability."
    }
  ];

  const historicalMilestones = [
    {
      date: "March 12, 2022",
      title: "Silver Jubilee Celebration",
      desc: "Celebrated 25 years of empowering women through high-end professional and value-based education."
    },
    {
      date: "2022",
      title: "Aazadi Ka Amrit Mahotsav",
      desc: "Secured Third Prize in the Swachh Competitions during the 75th Aazadi Ka Amrit Mahotsav."
    },
    {
      date: "July 26, 2020",
      title: "New College Block",
      desc: "Inaugurated a New College Block, significantly enhancing campus infrastructure and student facilities."
    },
    {
      date: "September 11, 2019",
      title: "ANU Best Performing PG College",
      desc: "Awarded First Prize for Best Performing Professional PG College by Acharya Nagarjuna University."
    },
    {
      date: "2019",
      title: "Heartfulness Essay Event",
      desc: "Received a Certificate of Appreciation for contributions to the Heartfulness Global Essay Event."
    },
    {
      date: "August 12, 2018",
      title: "Guntur 5K Freedom Run",
      desc: "Recognized by the Guntur Municipal Corporation with an Appreciation Certificate."
    },
    {
      date: "September 16, 2017",
      title: "ANU Best Performing Degree College",
      desc: "Honored with the First Prize for Best Performing Degree College by Acharya Nagarjuna University."
    },
    {
      date: "April 3, 2017",
      title: "NIRF Ranking",
      desc: "Ranked in the 151-200 Band in the NIRF (National Institutional Ranking Framework)."
    },
    {
      date: "2011-2012",
      title: "MCA Course Decennial Year",
      desc: "Celebrated the Decennial year of the MCA Course, marking a decade of excellence in technical education."
    },
    {
      date: "September 11, 2008",
      title: "ANU PG Certificate of Merit",
      desc: "Awarded Certificate of Merit (Second Prize) for Best Performing Professional PG College by Acharya Nagarjuna University."
    }
  ];

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Banner Component Card with Badge */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#064e3b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Institutional Awards & Recognitions
            </h2>
            <p className="mt-2 text-teal-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Consistently recognized for unwavering dedication to academic excellence, community service, and institutional quality.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-400/30 text-teal-200 backdrop-blur-md shadow-inner">
            <Trophy className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Landmark Achievement: NAAC 'A' Grade */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-outfit text-xl font-black text-slate-900 select-none">
            Landmark Achievement: NAAC ‘A’ Grade
          </h3>
        </div>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
          The academic year 2024-2025 was crowned by a historic milestone: St. Ann’s College for Women was awarded the prestigious ‘A’ Grade by the National Assessment and Accreditation Council (NAAC) with a CGPA of 3.09 on June 30, 2024.
        </p>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">
          This remarkable feat, accomplished in our very first accreditation cycle, is a testament to the visionary leadership of our President, Rev. Mother Anthonamma Pyreddy; Provincial Superior & Secretary, Dr. Thumma Theresamma; and our Correspondent (then-Principal), Dr. Sr. Fatima Rani P.
        </p>
        <div className="p-4 bg-teal-50/50 border border-teal-100/60 rounded-2xl">
          <p className="text-xs md:text-sm font-semibold text-teal-900 leading-relaxed">
            The successful Peer Team Visit (June 12-14, 2024), led by Dr. Devinder Kumar, Dr. Mufeed Ahmad, and Dr. Anjali Kulkarni, validated our strengths in teaching, research, and institutional culture.
          </p>
        </div>

        {/* NAAC Peer Team Visit Photo Gallery */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <h5 className="font-outfit text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Photo Gallery: NAAC Peer Team Visit</h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm aspect-[4/3] bg-slate-50 relative group">
              <img src="/images/about/the-institution/institutional-awards/naac/CHA_2048--1.jpg" alt="NAAC Peer Team Visit" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm aspect-[4/3] bg-slate-50 relative group">
              <img src="/images/about/the-institution/institutional-awards/naac/CHA_1206.JPG" alt="NAAC Evaluation Panel" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm aspect-[4/3] bg-slate-50 relative group">
              <img src="/images/about/the-institution/institutional-awards/naac/CHA_1228.JPG" alt="NAAC Discussion" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>

      {/* Notable Institutional Achievements - Recent Highlights */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h3 className="font-outfit text-xl font-black text-slate-800 select-none leading-none">
            Recent Highlights (2023 – 2026)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentHighlights.map((hl, i) => (
            <div key={i} className="p-5 bg-white border border-slate-200/60 rounded-3xl flex flex-col justify-between hover:shadow-md hover:border-indigo-100 transition-all duration-300 h-full">
              <div>
                <span className="inline-flex items-center gap-1 font-outfit text-xs font-black text-indigo-600 uppercase tracking-wide">
                  <Calendar className="h-4 w-4" /> {hl.date}
                </span>
                <h4 className="mt-2 font-outfit text-base font-black text-slate-800 leading-snug">{hl.title}</h4>
                <p className="mt-1.5 font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                  {hl.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Milestones */}
      <div className="flex flex-col gap-6">
        <h3 className="font-outfit text-xl font-black text-slate-800 border-b border-slate-100 pb-3 select-none leading-none">
          Historical Milestones
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {historicalMilestones.map((ms, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all">
              <CheckCircle className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{ms.date}</span>
                <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight mt-0.5">{ms.title}</h5>
                <p className="text-slate-500 font-sans text-xs mt-1 leading-relaxed font-normal">{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Award & Appreciation Certificates Gallery */}
      <div className="flex flex-col gap-6 border-t border-slate-100 pt-8">
        <div className="flex items-center gap-2">
          <h3 className="font-outfit text-xl font-black text-slate-800 select-none leading-none">
            Awards & Appreciation Certificates
          </h3>
        </div>
        <p className="text-slate-500 font-sans text-xs md:text-sm font-normal leading-relaxed -mt-3">
          Click any certificate to view in high resolution with full-screen dynamic lighting preview.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {awardCertificates.map((cert, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(cert.src)}
              className="bg-white border border-slate-200/80 p-2 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 relative">
                {/* Floating Download Button on Thumbnail */}
                <a
                  href={cert.src}
                  download={cert.title}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-white/80 hover:bg-white text-slate-800 shadow-sm border border-slate-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105 active:scale-95"
                  title="Download Certificate"
                >
                  <Download className="h-4 w-4" />
                </a>

                <img
                  src={cert.src}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#002147]/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white scale-75 group-hover:scale-100 transition-transform duration-300" />
                </div>
              </div>
              <h5 className="font-outfit text-[10px] md:text-xs font-black text-slate-700 mt-2 truncate text-center px-0.5 leading-snug">
                {cert.title}
              </h5>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for high-resolution certificate preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-md select-none"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-md select-none"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative max-w-2xl w-full flex flex-col items-center animate-scaleUp z-[205]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Download Button inside Modal */}
            <a
              href={selectedImage}
              download={awardCertificates.find(c => c.src === selectedImage)?.title || "Certificate"}
              onClick={(e) => e.stopPropagation()}
              className="absolute -top-12 left-0 flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:scale-105 transition-all duration-200 font-sans text-xs font-semibold"
            >
              <Download className="h-4 w-4" /> Download Certificate
            </a>

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:scale-105 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="bg-white p-3 rounded-3xl shadow-2xl border border-white/10 max-h-[80vh] overflow-hidden flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Award Certificate Preview"
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-inner select-none"
              />
            </div>
            <p className="mt-4 font-outfit text-xs md:text-sm font-black text-white/95 uppercase tracking-widest text-center px-4 leading-normal select-none">
              {awardCertificates.find(c => c.src === selectedImage)?.title || "Certificate View"}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
