"use client";

import { useState } from "react";
import { ShieldCheck, Award, GraduationCap, CheckCircle, X, Eye, Download, Image as ImageIcon, BookOpen, Sparkles, Building } from "lucide-react";

interface NaacCertificate {
  _id: string;
  title: string;
  imageUrl: string;
}

export function NaacCertificates({ naacCertificates = [] }: { naacCertificates?: NaacCertificate[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fallback static files from the public/documents/6.NAAC Certficates folder
  const defaultCertificates = [
    {
      _id: "naac-cert-1",
      title: "NAAC Accreditation Certificate",
      category: "NAAC Documents",
      imageUrl: "/documents/6.NAAC Certficates/NAAC Certficates/NAAC Certtifcate 1.jpeg"
    },
    {
      _id: "naac-score-2",
      title: "Accreditation Score Card",
      category: "NAAC Documents",
      imageUrl: "/documents/6.NAAC Certficates/NAAC Certficates/Score Card -2.jpeg"
    },
    {
      _id: "naac-letter-3",
      title: "Letter of Communication",
      category: "NAAC Documents",
      imageUrl: "/documents/6.NAAC Certficates/NAAC Certficates/3.Letter of Communication.jpeg"
    },
    {
      _id: "apsche-appreciation-1",
      title: "APSCHE Appreciation Letter – Page 1",
      category: "APSCHE Recognition",
      imageUrl: "/documents/6.NAAC Certficates/Appreciation Letter from APSCHE/WhatsApp Image 2026-04-09 at 2.06.41 PM.jpeg"
    },
    {
      _id: "apsche-appreciation-2",
      title: "APSCHE Appreciation Letter – Page 2",
      category: "APSCHE Recognition",
      imageUrl: "/documents/6.NAAC Certficates/Appreciation Letter from APSCHE/WhatsApp Image 2026-04-09 at 2.06.41 PM (2).jpeg"
    }
  ];

  const certificatesToUse = naacCertificates && naacCertificates.length > 0
    ? naacCertificates
    : defaultCertificates;

  const naacDocs = certificatesToUse.filter(doc => !doc.imageUrl.includes("Appreciation"));
  const apscheDocs = certificatesToUse.filter(doc => doc.imageUrl.includes("Appreciation"));

  const highlights = [
    {
      title: "Accredited with ‘A’ Grade",
      desc: "St. Ann’s College for Women achieved NAAC Accreditation with a CGPA of 3.09, recognizing the dedication towards maintaining high standards in higher education."
    },
    {
      title: "Excellence in Teaching & Learning",
      desc: "The institution emphasizes student-centered learning, academic innovation, skill development programs, and continuous evaluation methods to ensure quality education."
    },
    {
      title: "Strong Academic Infrastructure",
      desc: "The college provides modern classrooms, learning resources, sports facilities, and a secure environment that supports both academic and personal growth of students."
    },
    {
      title: "Research & Innovation",
      desc: "The institution encourages faculty research, publications, innovation activities, extension programs, and industry-oriented learning opportunities for students."
    },
    {
      title: "Student Support & Mentorship",
      desc: "With an effective mentor-mentee system, career guidance, coaching for competitive examinations, and skill-based add-on courses, the college nurtures student success."
    },
    {
      title: "Institutional Values & Best Practices",
      desc: "The college promotes ethics, leadership, women empowerment, social responsibility, and community engagement through institutional initiatives."
    }
  ];

  return (
    <div className="flex flex-col gap-10 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              NAAC Accreditation
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Accredited by the National Assessment and Accreditation Council (NAAC) with a prestigious <strong className="text-white font-bold">‘A’ Grade</strong> and a <strong className="text-white font-bold">CGPA of 3.09 on a 4-point scale</strong>.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Award className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Main Narrative Card */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 shadow-sm">
            <BookOpen className="h-5 w-5" />
          </span>
          <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 leading-tight">
            Institutional Commitment to Quality
          </h3>
        </div>
        <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed font-normal mb-4">
          St. Ann’s College for Women, Gorantla, has been accredited by the National Assessment and Accreditation Council (NAAC) with an prestigious <strong className="text-indigo-600 font-bold">‘A’ Grade</strong> and a <strong className="text-indigo-600 font-bold">CGPA of 3.09 on a 4-point scale</strong>. The accreditation reflects the institution’s commitment to academic excellence, quality education, holistic student development, and continuous institutional improvement.
        </p>
        <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed font-normal">
          Affiliated to Acharya Nagarjuna University, the college has consistently focused on creating a strong academic environment with modern infrastructure, innovative teaching methodologies, research initiatives, student support systems, and value-based education. The NAAC accreditation is valid up to <strong className="text-slate-800 font-bold">June 29, 2029</strong>.
        </p>
      </div>

      {/* Quality Highlights Grid */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-600" /> NAAC Quality Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-5 bg-gradient-to-br from-slate-50/80 to-white border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                <h4 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-snug group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h4>
              </div>
              <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* APSCHE Section */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600 shadow-sm">
            <Building className="h-5 w-5" />
          </span>
          <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 leading-tight">
            APSCHE Recognition & Appreciation
          </h3>
        </div>
        <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed font-normal mb-5">
          The Andhra Pradesh State Council of Higher Education (APSCHE) appreciated St. Ann’s College for Women for achieving NAAC Accreditation with ‘A’ Grade and recognized the institution’s commitment to quality education and continuous improvement.
        </p>

        <div className="p-5 bg-gradient-to-r from-amber-50/50 via-indigo-50/20 to-white border border-amber-100/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              🏆 Q-Mentor Institution
            </span>
            <h5 className="font-outfit font-black text-slate-800 text-base leading-snug">
              Guiding Institutional Growth
            </h5>
            <p className="text-xs md:text-sm text-slate-500 mt-1 leading-relaxed">
              APSCHE identified the college as a <strong className="text-amber-800 font-bold">Q-Mentor Institution</strong> to guide and support nearby non-accredited colleges in their own NAAC assessment and accreditation processes.
            </p>
          </div>
        </div>
      </div>

      {/* Official Certificates Grid */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-6 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-indigo-600" /> Official NAAC Certificates & Records
        </h3>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 select-none">
          Click below to preview or download the high-resolution certified records directly.
        </p>

        <div className="flex flex-col gap-8">
          {/* Sub-section: NAAC Certificates */}
          <div>
            <h5 className="text-xs font-black text-indigo-600/80 tracking-widest uppercase mb-4">
              NAAC Accreditations & Letters
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {naacDocs.map((doc) => (
                <div
                  key={doc._id}
                  className="group p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-md rounded-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                      AY 2024-2029
                    </span>
                    <h5 className="font-outfit font-black text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                      {doc.title}
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">
                      Verified NAAC Certificate Copy.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-6 border-t border-slate-100/80 pt-4">
                    <button
                      onClick={() => setSelectedImage(doc.imageUrl)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100/60 hover:border-indigo-200/80 px-3 py-2.5 text-xs font-bold text-indigo-700 transition-all active:scale-95 select-none"
                    >
                      <Eye className="h-4 w-4 shrink-0" /> View Image
                    </button>
                    <a
                      href={doc.imageUrl}
                      download
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-800 transition-all active:scale-95 select-none"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-section: APSCHE Appreciation Letters */}
          {apscheDocs.length > 0 && (
            <div>
              <h5 className="text-xs font-black text-amber-600/80 tracking-widest uppercase mb-4">
                APSCHE Appreciation Letters
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {apscheDocs.map((doc) => (
                  <div
                    key={doc._id}
                    className="group p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-amber-100 hover:shadow-md rounded-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">
                        APSCHE - AP
                      </span>
                      <h5 className="font-outfit font-black text-slate-800 text-base leading-snug group-hover:text-amber-600 transition-colors">
                        {doc.title}
                      </h5>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">
                        Official Appreciation Letter page.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-6 border-t border-slate-100/80 pt-4">
                      <button
                        onClick={() => setSelectedImage(doc.imageUrl)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-100/60 hover:border-amber-200/80 px-3 py-2.5 text-xs font-bold text-amber-700 transition-all active:scale-95 select-none"
                      >
                        <Eye className="h-4 w-4 shrink-0" /> View Image
                      </button>
                      <a
                        href={doc.imageUrl}
                        download
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-800 transition-all active:scale-95 select-none"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup Lightbox Viewer */}
      {selectedImage && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200/80">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600">
                  <ImageIcon className="h-4 w-4" />
                </span>
                <h3 className="font-outfit text-base font-black text-slate-800 leading-tight">
                  NAAC Record Lightbox Viewer
                </h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition-all select-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body: Embedded image */}
            <div className="flex-1 bg-slate-900 p-4 flex items-center justify-center overflow-auto select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="NAAC Document Preview"
                className="max-h-full max-w-full rounded-2xl border border-slate-800/80 shadow-2xl bg-black select-none object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
