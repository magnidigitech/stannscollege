"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronRight, Download, Eye, FileText, Shield, X, Award } from "lucide-react";

interface Committee {
  id: number;
  slug: string;
  committee: string;
  chairperson: string;
  convener?: string;
  iqac_coordinator?: string;
  co_convener?: string;
  coordinator?: string;
  members: string[];
}

export function StatutoryCommittees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const committees: Committee[] = [
    {
      id: 1,
      slug: "admissions-committee",
      committee: "Admissions Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mr. Ch. Rama Rao",
      members: ["All Heads of Departments"]
    },
    {
      id: 2,
      slug: "alumni-committee",
      committee: "Alumni Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      iqac_coordinator: "Mrs. R. Sharon Rose",
      convener: "Mrs. G. Saroja",
      co_convener: "Mrs. D.V. Ramanamma",
      members: ["All Heads of Departments"]
    },
    {
      id: 3,
      slug: "anti-drug-committee",
      committee: "Anti Drug Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. I. Adi Lakshmi",
      members: [
        "Mr. D. Simon",
        "Mr. G. Bala Show Reddy",
        "Student Representative UG",
        "Student Representative PG"
      ]
    },
    {
      id: 4,
      slug: "anti-ragging-committee",
      committee: "Anti Ragging Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. J. Prameela Rani",
      members: [
        "Mrs. D. Swarna Charani Rai",
        "Mrs. B. Usha Rani",
        "Mr. G. Bala Show Reddy",
        "Mrs. J. Sirisha",
        "Sr. Vyakula Rani",
        "SI Nallapadu",
        "Lawyer",
        "Parent UG",
        "Parent PG"
      ]
    },
    {
      id: 5,
      slug: "attendance-committee",
      committee: "Attendance Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. J. Prameela Rani",
      members: ["All Class Incharges"]
    },
    {
      id: 6,
      slug: "awards-medals-committee",
      committee: "Awards & Medals Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. G. Anitha Bhanu",
      members: [
        "Dr. G. Radhika",
        "Mrs. G. Saroja",
        "Mrs. B. Usha Rani",
        "Mr. T. Durga Bhavani",
        "Mrs. G. Sailaja",
        "Mrs. D. Anitha"
      ]
    },
    {
      id: 7,
      slug: "college-development-committee",
      committee: "College Development Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. R. Sharon Rose",
      members: ["Sr. Margaret Priyanka", "Administrative Staff"]
    },
    {
      id: 8,
      slug: "discipline-committee",
      committee: "Discipline Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mr. S.M. Subhani",
      members: [
        "Mrs. R. Sharon Rose",
        "Mrs. J. Prameela Rani",
        "Mrs. M. Usha Rani",
        "Mrs. B. Usha Rani",
        "Mrs. I. Adi Lakshmi",
        "Mr. G. Bala Show Reddy",
        "Mrs. K. Susmitha",
        "Mrs. G. Sailaja",
        "Mrs. D. Anitha"
      ]
    },
    {
      id: 9,
      slug: "cultural-committee",
      committee: "Cultural & Co-Curricular Activities Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. K. Vanaja",
      members: [
        "Mrs. K. Vidyadhari",
        "Mrs. M. Anjana Devi",
        "Mrs. P. Sandhya",
        "Mrs. B. Ranjitha",
        "Sr. Margaret Priyanka",
        "Dr. D. Ramana",
        "Mrs. R. Phani Rajya Lakshmi",
        "Mrs. J. Sirisha",
        "Mrs. Manasa",
        "Mrs. K. Grace Santhi Anne",
        "Mrs. G. Sailaja",
        "Mrs. D. Anitha",
        "Mr. S.M. Subhani"
      ]
    },
    {
      id: 10,
      slug: "examination-committee",
      committee: "Examination Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mr. S.M. Subhani",
      members: [
        "Mrs. T. Durga Bhavani",
        "Mrs. L. Mary Anusha",
        "Mrs. M. Usha Rani",
        "Dr. G. Radhika",
        "Sr. Margaret Priyanka"
      ]
    },
    {
      id: 11,
      slug: "iqac",
      committee: "Internal Quality Assurance Cell (IQAC)",
      chairperson: "Dr. Sr. Sandhya Thumma",
      coordinator: "Mrs. R. Sharon Rose",
      members: [
        "Heads of Departments",
        "External Experts",
        "Alumni",
        "Industrial Representatives",
        "Students"
      ]
    },
    {
      id: 12,
      slug: "library-committee",
      committee: "Library Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. G. Sailaja",
      co_convener: "Mrs. D. Anitha",
      members: ["All Heads of Departments"]
    },
    {
      id: 13,
      slug: "nss",
      committee: "NSS Unit",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. A. Adi Lakshmi",
      members: ["NSS Volunteers"]
    },
    {
      id: 14,
      slug: "sports",
      committee: "Sports & Games Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mr. G. Bala Show Reddy",
      members: [
        "Mrs. K. Susmitha",
        "Mrs. I. Adi Lakshmi",
        "Mr. D. Simon"
      ]
    },
    {
      id: 15,
      slug: "women-empowerment",
      committee: "Women Empowerment Cell",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. D.V. Ramanamma",
      members: [
        "Mrs. G. Anitha Devi",
        "Mrs. G. Vijaya Lakshmi",
        "Mrs. L. Mary Anusha",
        "Mrs. G. Santhi Kumari",
        "Mrs. K. Grace Santhi Anne",
        "Mrs. T. Durga Bhavani"
      ]
    },
    {
      id: 16,
      slug: "placement",
      committee: "Training & Placement Cell",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. M. Usha Rani",
      members: [
        "Mrs. D. Swarna Charani Rai",
        "Mrs. B. Usha Rani",
        "Mrs. G. Saroja"
      ]
    },
    {
      id: 17,
      slug: "research",
      committee: "Research & Development Cell",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Dr. G. Radhika",
      members: [
        "Mrs. G. Vijaya Lakshmi",
        "Mrs. B. Ranjitha",
        "Mrs. K. Vidyadhari"
      ]
    },
    {
      id: 18,
      slug: "iic",
      committee: "Institution Innovation Council",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. G. Anitha Bhanu",
      members: [
        "Mrs. G. Vijaya Lakshmi",
        "Mrs. P. Sandhya",
        "Mrs. B. Ranjitha"
      ]
    },
    {
      id: 19,
      slug: "eco-club",
      committee: "Eco Club",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. K. Vidyadhari",
      members: [
        "Mrs. B. Ranjitha",
        "Mrs. G. Vijaya Lakshmi",
        "Mrs. L. Mary Anusha"
      ]
    },
    {
      id: 20,
      slug: "red-ribbon",
      committee: "Red Ribbon Club",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. I. Adi Lakshmi",
      members: [
        "Mrs. K. Susmitha",
        "Mrs. G. Vijaya Lakshmi"
      ]
    },
    {
      id: 21,
      slug: "equal-opportunity-cell",
      committee: "Equal Opportunity Cell (SC/ST/OBC/Minority)",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. G. Saroja",
      members: [
        "Mrs. B. Usha Rani",
        "Mrs. J. Prameela Rani",
        "Student Representatives"
      ]
    },
    {
      id: 22,
      slug: "anti-sexual-harassment-icc",
      committee: "Internal Complaints Committee (ICC)",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. R. Sharon Rose",
      members: [
        "Mrs. D.V. Ramanamma",
        "Mrs. G. Anitha Bhanu",
        "External Member",
        "Student Representative"
      ]
    },
    {
      id: 23,
      slug: "grievance-students",
      committee: "Student Grievance Redressal Cell",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. K. Vidyadhari",
      members: [
        "Mrs. M. Usha Rani",
        "Mrs. G. Saroja",
        "Student Representatives"
      ]
    },
    {
      id: 24,
      slug: "mentor-mentee",
      committee: "Mentor-Mentee Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. J. Prameela Rani",
      members: [
        "All Faculty Mentors",
        "Students"
      ]
    },
    {
      id: 25,
      slug: "parents-association",
      committee: "Parents Association",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. G. Saroja",
      members: [
        "Parent Representatives",
        "Faculty Coordinators"
      ]
    },
    {
      id: 26,
      slug: "website-committee",
      committee: "Website / Digital Boards / Magazine Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. R. Sharon Rose",
      members: [
        "Mrs. D. Anitha",
        "Mrs. G. Sailaja",
        "Technical Staff"
      ]
    },
    {
      id: 27,
      slug: "press-media",
      committee: "Press & Media Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. R. Sharon Rose",
      members: [
        "Mrs. G. Saroja",
        "Mrs. B. Usha Rani",
        "Media Coordinators"
      ]
    },
    {
      id: 28,
      slug: "rti",
      committee: "RTI Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Administrative Officer",
      members: [
        "Office Staff",
        "Faculty Representative"
      ]
    },
    {
      id: 29,
      slug: "seminars",
      committee: "Seminars / Conferences / Workshops Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. K. Vidyadhari",
      members: [
        "Mrs. G. Vijaya Lakshmi",
        "Mrs. B. Ranjitha",
        "Faculty Members"
      ]
    },
    {
      id: 30,
      slug: "entrepreneurship",
      committee: "Entrepreneurship Development Cell",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. G. Anitha Bhanu",
      members: [
        "Mrs. G. Vijaya Lakshmi",
        "Mrs. B. Ranjitha",
        "Students"
      ]
    },
    {
      id: 31,
      slug: "innovation-startup",
      committee: "Innovation & Start-Up Cell",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. G. Anitha Bhanu",
      members: [
        "Faculty Members",
        "Student Innovators"
      ]
    },
    {
      id: 32,
      slug: "ipr",
      committee: "Intellectual Property Rights (IPR) Cell",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Dr. G. Radhika",
      members: [
        "Research Faculty",
        "Students"
      ]
    },
    {
      id: 33,
      slug: "coaching",
      committee: "Coaching / Competitive Exams Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Dr. G. Radhika",
      members: [
        "Mrs. G. Vijaya Lakshmi",
        "Mrs. K. Vidyadhari"
      ]
    },
    {
      id: 34,
      slug: "uhv",
      committee: "Universal Human Values (UHV) Cell",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. I. Adi Lakshmi",
      members: [
        "Faculty Members",
        "Students"
      ]
    },
    {
      id: 35,
      slug: "ncc",
      committee: "NCC Unit",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "NCC Officer",
      members: [
        "NCC Cadets",
        "Faculty Coordinator"
      ]
    },
    {
      id: 36,
      slug: "outreach",
      committee: "Mother Gnanamma Outreach Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Sr. Margaret Priyanka",
      members: [
        "Faculty",
        "Students"
      ]
    },
    {
      id: 37,
      slug: "eco-sustainability",
      committee: "Eco Sustainability Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. K. Vidyadhari",
      members: [
        "Mrs. B. Ranjitha",
        "Mrs. G. Vijaya Lakshmi"
      ]
    },
    {
      id: 38,
      slug: "tour-travel",
      committee: "Tours & Travels Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Mrs. M. Usha Rani",
      members: [
        "Mrs. D. Swarna Charani Rai",
        "Mrs. B. Usha Rani"
      ]
    },
    {
      id: 39,
      slug: "health-safety",
      committee: "Health & Safety Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Sr. Vyakula Rani",
      members: [
        "Medical Staff",
        "Faculty Members"
      ]
    },
    {
      id: 40,
      slug: "transport",
      committee: "Transport Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Administrative Officer",
      members: [
        "Transport Staff",
        "Faculty Coordinator"
      ]
    },
    {
      id: 41,
      slug: "hostel",
      committee: "Hostel Committee",
      chairperson: "Dr. Sr. Sandhya Thumma",
      convener: "Hostel Warden",
      members: [
        "Wardens",
        "Student Representatives"
      ]
    }
  ];

  const filteredCommittees = committees.filter((c) =>
    c.committee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.members.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <Shield className="h-3.5 w-3.5" /> Governance & Framework
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Statutory & Non-Statutory Committees
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              In strict compliance with statutory guidelines, St. Ann’s College for Women operates multiple regulatory, advisory, and outreach committees to ensure a safe, dynamic academic campus environment.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Shield className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* PDF View Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" /> Committees 2025–2026
            </h4>
            <p className="text-slate-500 text-xs md:text-sm font-medium mb-4 select-none">
              Official verification record containing committee assignments.
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-slate-100/80 pt-4">
            <button
              onClick={() => setSelectedPdf("/documents/committees/college-committees-2025-2026.pdf")}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100/60 hover:border-indigo-200/80 px-4 py-2.5 text-xs font-bold text-indigo-700 transition-all select-none"
            >
              <Eye className="h-4 w-4" /> View PDF
            </button>
            <a
              href="/documents/committees/college-committees-2025-2026.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-800 transition-all select-none"
            >
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" /> Committees 2024–2025
            </h4>
            <p className="text-slate-500 text-xs md:text-sm font-medium mb-4 select-none">
              Official assignment lists for the previous academic year.
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-slate-100/80 pt-4">
            <button
              onClick={() => setSelectedPdf("/documents/committees/college-committees-2024-2025.pdf")}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100/60 hover:border-indigo-200/80 px-4 py-2.5 text-xs font-bold text-indigo-700 transition-all select-none"
            >
              <Eye className="h-4 w-4" /> View PDF
            </button>
            <a
              href="/documents/committees/college-committees-2024-2025.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-800 transition-all select-none"
            >
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Modern Search & Accordion Section */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-indigo-600" /> Search & Explore Committees
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 select-none">
          Find any specific committee or member instantly by typing in the search bar.
        </p>

        {/* Amazon-like AJAX Live Filter Search Bar */}
        <div className="relative flex items-center mb-6 max-w-xl">
          <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search committees, members, or conveners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 hover:border-indigo-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm font-medium outline-none transition-all shadow-sm"
          />
        </div>

        {/* Dynamic Accordion list */}
        <div className="flex flex-col gap-3">
          {filteredCommittees.length > 0 ? (
            filteredCommittees.map((item) => (
              <div
                key={item.id}
                className={`overflow-hidden border transition-all duration-300 rounded-2xl ${
                  openId === item.id
                    ? "bg-indigo-50/20 border-indigo-200/80 shadow-md"
                    : "bg-white border-slate-100 hover:border-indigo-100 hover:shadow-sm"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between px-6 py-4 outline-none text-left select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 font-black text-indigo-600 text-xs shrink-0 select-none">
                      {item.id}
                    </span>
                    <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight group-hover:text-indigo-600 transition-colors">
                      {item.committee}
                    </h5>
                  </div>
                  {openId === item.id ? (
                    <ChevronDown className="h-5 w-5 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {/* Accordion Panel Body */}
                {openId === item.id && (
                  <div className="px-6 pb-5 pt-1 border-t border-indigo-100/40 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                      {/* Structure detail */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-50/60 pb-1.5 last:border-0 last:pb-0">
                          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                            Chairperson
                          </span>
                          <span className="font-black text-slate-800 text-sm md:text-base leading-tight">
                            {item.chairperson}
                          </span>
                        </div>
                        {item.convener && (
                          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-50/60 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                              Convener
                            </span>
                            <span className="font-bold text-indigo-600 text-sm md:text-base leading-tight">
                              {item.convener}
                            </span>
                          </div>
                        )}
                        {item.co_convener && (
                          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-50/60 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                              Co-Convener
                            </span>
                            <span className="font-bold text-indigo-600 text-sm md:text-base leading-tight">
                              {item.co_convener}
                            </span>
                          </div>
                        )}
                        {item.coordinator && (
                          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-50/60 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                              Coordinator
                            </span>
                            <span className="font-bold text-indigo-600 text-sm md:text-base leading-tight">
                              {item.coordinator}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Members list */}
                      <div className="flex flex-col gap-1.5 border-t md:border-t-0 md:border-l border-slate-100 md:pl-5 pt-3 md:pt-0">
                        <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                          Members
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.members.map((member, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1 text-xs text-slate-600 font-medium"
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 font-semibold p-4">
              No matching committees found.
            </p>
          )}
        </div>
      </div>

      {/* Modal Popup PDF Viewer */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200/80">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600">
                  <FileText className="h-4 w-4" />
                </span>
                <h3 className="font-outfit text-base font-black text-slate-800 leading-tight">
                  Committees Report Viewer
                </h3>
              </div>
              <button
                onClick={() => setSelectedPdf(null)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition-all select-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body: Embedded iframe */}
            <div className="flex-1 bg-slate-50 p-4">
              <iframe
                src={`${selectedPdf}#toolbar=0&navpanes=0`}
                className="w-full h-full rounded-2xl border border-slate-200/60 shadow-sm bg-white"
                title="Committees Report PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
