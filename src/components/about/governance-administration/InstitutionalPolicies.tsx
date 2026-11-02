"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Eye, 
  BookOpen, 
  Award, 
  Users, 
  Compass, 
  Briefcase, 
  DollarSign, 
  Building2, 
  Leaf, 
  Sparkles,
  ChevronDown,
  Layers
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

interface PolicyItem {
  sNo: number;
  name: string;
  pdfUrl: string;
  isRealDoc?: boolean;
}

interface PolicySubsection {
  letter: string;
  title: string;
  policies: PolicyItem[];
}

interface PolicySection {
  id: string;
  roman: string;
  title: string;
  icon: any;
  subsections?: PolicySubsection[];
  policies?: PolicyItem[];
}

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "academic-curriculum",
    roman: "I",
    title: "Academic & Curriculum Policies",
    icon: BookOpen,
    policies: [
      { sNo: 1, name: "Curriculum Implementation and Delivery Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, name: "Teaching–Learning and Pedagogy Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, name: "Academic Planning and Academic Calendar Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 4, name: "Examination and Continuous Assessment Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 5, name: "Outcome-Based Education (OBE) Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 6, name: "Feedback and Stakeholder Participation Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 7, name: "Internship, Experiential Learning and Skill Development Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 8, name: "Value-Added and Certificate Courses Policy", pdfUrl: "/documents/DefaultFile_1.pdf" }
    ]
  },
  {
    id: "student-support",
    roman: "II",
    title: "Student Support & Welfare Policies",
    icon: Users,
    subsections: [
      {
        letter: "A",
        title: "Statutory and Regulatory Policies",
        policies: [
          { sNo: 1, name: "Anti-Ragging Policy", pdfUrl: "/documents/student-support/1.Anti Ragging Policy.pdf", isRealDoc: true },
          { sNo: 2, name: "Internal Complaints Committee (ICC) / Prevention of Sexual Harassment (POSH) Policy", pdfUrl: "/documents/student-support/2.Internal Complaints Committee (ICC) & POSH Policy.pdf", isRealDoc: true },
          { sNo: 3, name: "Student Grievance Redressal Policy", pdfUrl: "/documents/student-support/3.Greaivance Reddrassal Policy.pdf", isRealDoc: true },
          { sNo: 4, name: "Code of Conduct and Discipline Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
          { sNo: 5, name: "Zero Tolerance Policy Against Ragging, Harassment and Discrimination", pdfUrl: "/documents/DefaultFile_1.pdf" }
        ]
      },
      {
        letter: "B",
        title: "Student Welfare & Inclusiveness Policies",
        policies: [
          { sNo: 6, name: "Equal Opportunity, SC/ST, Minority and Inclusive Education Policy", pdfUrl: "/documents/student-support/6.EOC SC ST Minority Policy.pdf", isRealDoc: true },
          { sNo: 7, name: "Women Empowerment and Gender Sensitization Policy", pdfUrl: "/documents/student-support/Woment Empowerment Cell Policy 2026.pdf", isRealDoc: true },
          { sNo: 8, name: "Divyangjan Support Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
          { sNo: 9, name: "Student Welfare, Counseling and Wellness Policy", pdfUrl: "/documents/student-support/9.Student Welfare,Counselling & Welness Polciy.pdf", isRealDoc: true }
        ]
      },
      {
        letter: "C",
        title: "Academic Support & Mentoring Policies",
        policies: [
          { sNo: 10, name: "Mentoring and Student Induction Policy", pdfUrl: "/documents/student-support/Mentor & Mentee Committee Guidelines.pdf", isRealDoc: true },
          { sNo: 11, name: "Scholarships, Freeships and Financial Assistance Policy", pdfUrl: "/documents/student-support/Scholarships,Freeships & Financial Assistance Polciy.pdf", isRealDoc: true },
          { sNo: 12, name: "Slow and Advanced Learners Support Policy", pdfUrl: "/documents/DefaultFile_1.pdf" }
        ]
      },
      {
        letter: "D",
        title: "Career Development & Student Progression Policies",
        policies: [
          { sNo: 13, name: "Career Guidance, Training and Placement Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
          { sNo: 14, name: "Alumni Engagement and Student Progression Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
          { sNo: 15, name: "Student Leadership and Participation Policy", pdfUrl: "/documents/DefaultFile_1.pdf" }
        ]
      },
      {
        letter: "E",
        title: "Safety, Ethics & Health Policies",
        policies: [
          { sNo: 16, name: "Campus Safety and Security Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
          { sNo: 17, name: "Health, Hygiene and Wellness Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
          { sNo: 18, name: "Cyber Safety and Digital Ethics Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
          { sNo: 19, name: "Tobacco-Free and Substance Abuse Prevention Policy", pdfUrl: "/documents/DefaultFile_1.pdf" }
        ]
      }
    ]
  },
  {
    id: "research-innovation",
    roman: "III",
    title: "Research, Innovation & Extension Policies",
    icon: Sparkles,
    policies: [
      { sNo: 1, name: "Research Promotion and Development Policy", pdfUrl: "/documents/research/1.Rsearch Promotion & Development Policy.pdf", isRealDoc: true },
      { sNo: 2, name: "Innovation and Incubation Policy", pdfUrl: "/documents/research/Institution_Innovation_Cell_Policy.pdf", isRealDoc: true },
      { sNo: 3, name: "Entrepreneurship Development Policy", pdfUrl: "/documents/research/Entrepreneurship_Policy.pdf", isRealDoc: true },
      { sNo: 4, name: "Intellectual Property Rights (IPR) Policy", pdfUrl: "/documents/research/Intellectual_Property_Rights_IPR_Policy.pdf", isRealDoc: true },
      { sNo: 5, name: "Consultancy, Collaboration and MoU Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 6, name: "Extension Activities and Community Engagement Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 7, name: "NSS and Institutional Social Responsibility Policy", pdfUrl: "/documents/DefaultFile_1.pdf" }
    ]
  },
  {
    id: "governance-management",
    roman: "IV",
    title: "Governance & Institutional Management Policies",
    icon: Compass,
    policies: [
      { sNo: 1, name: "Institutional Governance and Leadership Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, name: "Decentralization and Participative Management Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, name: "E-Governance and Digital Administration Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 4, name: "Internal Quality Assurance Cell (IQAC) Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 5, name: "Strategic Perspective and Development Plan Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 6, name: "Code of Professional Ethics and Conduct Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 7, name: "Disaster Management Plan", pdfUrl: "/documents/DefaultFile_1.pdf" }
    ]
  },
  {
    id: "human-resources",
    roman: "V",
    title: "Human Resource Management Policies",
    icon: Briefcase,
    policies: [
      { sNo: 1, name: "Recruitment, Selection and Promotion Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, name: "Faculty Development and Training Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, name: "Faculty Performance Appraisal Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 4, name: "Leave, Service Rules and Welfare Policy", pdfUrl: "/documents/faculty/Human_Resource_Policy.pdf", isRealDoc: true },
      { sNo: 5, name: "Staff Grievance Redressal Policy", pdfUrl: "/documents/DefaultFile_1.pdf" }
    ]
  },
  {
    id: "financial-management",
    roman: "VI",
    title: "Financial Management Policies",
    icon: DollarSign,
    policies: [
      { sNo: 1, name: "Financial Management Policy", pdfUrl: "/documents/policies/Financial_Management_Policy.pdf", isRealDoc: true },
      { sNo: 2, name: "SOP (Standard Operating Procedure)", pdfUrl: "/documents/policies/Purchase_Procurement_Policy_SOP.pdf", isRealDoc: true },
      { sNo: 3, name: "Purchase Policy", pdfUrl: "/documents/policies/Purchase_Procurement_Policy_SOP.pdf", isRealDoc: true }
    ]
  },
  {
    id: "infrastructure-learning",
    roman: "VII",
    title: "Infrastructure & Learning Resources Policies",
    icon: Building2,
    policies: [
      { sNo: 1, name: "Infrastructure Development and Augmentation Policy", pdfUrl: "/documents/policies/Infrastructure_Development_Augmentation_Policy.pdf", isRealDoc: true },
      { sNo: 2, name: "IT Infrastructure and Digital Learning Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, name: "Library and Knowledge Resource Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 4, name: "Maintenance of Physical and Academic Facilities Policy", pdfUrl: "/documents/DefaultFile_1.pdf" }
    ]
  },
  {
    id: "environment-sustainability",
    roman: "VIII",
    title: "Environment & Sustainability Policies",
    icon: Leaf,
    policies: [
      { sNo: 1, name: "Green Campus and Environmental Sustainability Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, name: "Waste Management Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, name: "Energy Conservation and Renewable Energy Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 4, name: "Water Conservation and Management Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 5, name: "Environmental Audit & Sustainability Monitoring Policy", pdfUrl: "/documents/DefaultFile_1.pdf" }
    ]
  },
  {
    id: "quality-assurance",
    roman: "IX",
    title: "Quality Assurance & Accreditation Policies",
    icon: Award,
    policies: [
      { sNo: 1, name: "Continuous Quality Improvement Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, name: "Documentation, Data Management and AQAR Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, name: "Academic and Administrative Audit (AAA) Policy", pdfUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 4, name: "Best Practices and Institutional Distinctiveness Policy", pdfUrl: "/documents/DefaultFile_1.pdf" }
    ]
  }
];

export function InstitutionalPolicies() {
  const [activeSectionId, setActiveSectionId] = useState<string>(POLICY_SECTIONS[0].id);
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  const handleOpenPdf = (pdfUrl: string, title: string) => {
    setPreviewPdf({ url: pdfUrl, title });
  };

  const handleCloseModal = () => {
    setPreviewPdf(null);
  };

  const selectedSection = POLICY_SECTIONS.find((s) => s.id === activeSectionId) || POLICY_SECTIONS[0];

  return (
    <div className="flex flex-col gap-10 font-sans select-none animate-fadeIn">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Policy Framework
            </div>
            <h2 className="font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Institutional Policies
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-2xl font-normal leading-relaxed">
              Comprehensive governance frameworks framed in accordance with UGC, NAAC, and APSCHE guidelines to uphold transparency, academic rigor, ethical practices, and continuous institutional development.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
              <FileText className="h-6 w-6 animate-pulse" />
            </span>
          </div>
        </div>
      </div>

      {/* Official Narrative Callout */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          Policy Framework & Regulatory Governance
        </h3>
        <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal">
          St. Ann’s College for Women is committed to maintaining transparency, academic excellence, ethical practices, inclusiveness, and quality assurance in all institutional activities. The Institutional Policies of the college are framed in accordance with the guidelines of UGC, NAAC, APSCHE, and other regulatory bodies to ensure effective governance, student welfare, research promotion, environmental sustainability, and continuous institutional development. These policies provide a structured framework for the smooth and effective functioning of the institution.
        </p>
      </div>

      {/* Dropdown Section Selector */}
      <div className="bg-white border border-slate-200/70 p-5 md:p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm shrink-0">
            <Layers className="h-5 w-5" />
          </span>
          <div>
            <label htmlFor="policy-section-dropdown" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Select Policy Category
            </label>
            <h4 className="font-outfit text-sm md:text-base font-black text-slate-800 leading-tight mt-0.5">
              Choose an Institutional Policy Section
            </h4>
          </div>
        </div>

        <div className="relative w-full md:w-auto min-w-[320px] lg:min-w-[440px]">
          <select
            id="policy-section-dropdown"
            value={activeSectionId}
            onChange={(e) => setActiveSectionId(e.target.value)}
            className="w-full appearance-none bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200/90 rounded-2xl py-3 px-4 pr-11 text-xs md:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/10 transition-all cursor-pointer shadow-sm"
          >
            {POLICY_SECTIONS.map((sec) => (
              <option key={sec.id} value={sec.id} className="text-slate-800 font-medium py-1.5">
                {sec.roman}. {sec.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#002147]">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Selected Section Table */}
      <div className="bg-white border border-slate-200/70 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-sm shrink-0">
            <selectedSection.icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-outfit text-lg md:text-xl font-black text-slate-900 leading-snug">
              {selectedSection.roman}. {selectedSection.title}
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Official Institutional Policies
            </span>
          </div>
        </div>

        {/* If section has subsections (e.g. Student Support II.A - II.E) */}
        {selectedSection.subsections ? (
          <div className="flex flex-col gap-8">
            {selectedSection.subsections.map((sub) => (
              <div key={sub.letter} className="flex flex-col gap-3">
                <h4 className="font-outfit text-sm md:text-base font-bold text-[#002147] flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-black">
                    {sub.letter}
                  </span>
                  {sub.title}
                </h4>

                {/* Table of policies */}
                <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50/30">
                  <table className="min-w-full divide-y divide-slate-100 text-left text-xs md:text-sm">
                    <thead className="bg-slate-50/80 font-outfit text-slate-700">
                      <tr>
                        <th className="px-4 py-3 font-black text-center w-14">S.No</th>
                        <th className="px-6 py-3 font-black">Name of the Policy</th>
                        <th className="px-6 py-3 font-black text-right w-44">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 bg-white">
                      {sub.policies.map((pol) => (
                        <tr key={pol.sNo} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-4 py-3.5 text-center font-bold text-slate-400">
                            {pol.sNo}
                          </td>
                          <td className="px-6 py-3.5 font-semibold text-slate-800">
                            {pol.name}
                          </td>
                          <td className="px-6 py-3.5 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2 justify-end">
                              <button
                                onClick={() => handleOpenPdf(pol.pdfUrl, pol.name)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200/60 hover:border-transparent font-bold text-xs transition-all shadow-sm"
                              >
                                <Eye className="h-3.5 w-3.5" /> View PDF
                              </button>
                              <a
                                href={pol.pdfUrl}
                                download
                                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                                title="Direct Download"
                              >
                                <Download className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Flat policies list for sections without subsections */
          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50/30">
            <table className="min-w-full divide-y divide-slate-100 text-left text-xs md:text-sm">
              <thead className="bg-slate-50/80 font-outfit text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-black text-center w-14">S.No</th>
                  <th className="px-6 py-3 font-black">Name of the Policy</th>
                  <th className="px-6 py-3 font-black text-right w-44">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 bg-white">
                {selectedSection.policies?.map((pol) => (
                  <tr key={pol.sNo} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3.5 text-center font-bold text-slate-400">
                      {pol.sNo}
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-slate-800">
                      {pol.name}
                    </td>
                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <button
                          onClick={() => handleOpenPdf(pol.pdfUrl, pol.name)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200/60 hover:border-transparent font-bold text-xs transition-all shadow-sm"
                        >
                          <Eye className="h-3.5 w-3.5" /> View PDF
                        </button>
                        <a
                          href={pol.pdfUrl}
                          download
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          title="Direct Download"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      {previewPdf && (
        <FilePreviewModal
          isOpen={true}
          onClose={handleCloseModal}
          fileUrl={previewPdf.url}
          title={previewPdf.title}
        />
      )}
    </div>
  );
}
