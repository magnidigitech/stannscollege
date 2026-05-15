"use client";

import { ClipboardList, FileDown, CheckCircle, Star, Settings, LineChart, BookOpen } from "lucide-react";

export function OutcomeBasedEducation() {
  const poData = [
    { no: "PO1", label: "Domain Knowledge", desc: "Acquire comprehensive expertise and empirical insights within selected core disciplines." },
    { no: "PO2", label: "Critical Thinking", desc: "Analyze real-world paradigms, identify gaps, and structure analytical frameworks to solve problems." },
    { no: "PO3", label: "Communication Skills", desc: "Synthesize and convey strategic concepts with precision, clarity, and confidence." },
    { no: "PO4", label: "Digital Skills", desc: "Employ contemporary digital tools, suites, and analytics workflows with proficiency." },
    { no: "PO5", label: "Teamwork", desc: "Demonstrate dynamic collaborative intelligence and cross-functional leadership." },
    { no: "PO6", label: "Ethics", desc: "Uphold professional compliance, corporate values, and absolute transparent operations." },
    { no: "PO7", label: "Environmental Awareness", desc: "Identify sustainability objectives and contribute toward ecological preservation." },
    { no: "PO8", label: "Lifelong Learning", desc: "Develop cognitive agility for persistent independent learning and skills acquisition." }
  ];

  const handleDownload = (name: string) => {
    alert(`Downloading OBE document: ${name}`);
  };

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Settings className="h-4 w-4 text-[#002147]" /> Outcome-Based Education (OBE)
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Outcome-Based Education
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        Outcome-Based Education (OBE) ensures that students achieve clearly defined learning outcomes in terms of knowledge, skills, and values. The institution aligns Programme Outcomes (POs), Programme Specific Outcomes (PSOs), and Course Outcomes (COs) with teaching, learning, and evaluation processes.
      </p>

      {/* PO Section */}
      <div className="bg-white border border-slate-200/60 rounded-[2rem] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-6">
          <h3 className="font-outfit text-lg font-black text-[#002147] flex items-center gap-2">
            <ClipboardList className="h-5 w-5" /> 1. Programme Outcomes (POs)
          </h3>
          <button
            onClick={() => handleDownload("Full Programme Outcomes PDF")}
            className="inline-flex items-center gap-1.5 bg-[#002147]/5 hover:bg-[#002147]/10 text-[#002147] px-4 py-2 rounded-full font-bold text-xs transition-all border border-[#002147]/10 shrink-0"
          >
            <FileDown className="h-3.5 w-3.5" /> Download POs (PDF)
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {poData.map((po) => (
            <div key={po.no} className="bg-slate-50/80 hover:bg-white border border-slate-200/40 rounded-2xl p-5 shadow-sm flex flex-col gap-2 hover:border-[#002147]/20 hover:shadow-md transition-all group">
              <span className="font-outfit font-black text-[#002147] group-hover:text-indigo-600 text-sm tracking-wide">{po.no}</span>
              <h4 className="font-sans font-bold text-slate-800 text-xs md:text-sm leading-tight mt-0.5">{po.label}</h4>
              <p className="text-slate-400 group-hover:text-slate-500 text-[10px] leading-relaxed font-medium mt-1">
                {po.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PSOs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/60 rounded-[2rem] p-6 flex flex-col shadow-sm">
          <h4 className="font-outfit text-base font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <BookOpen className="h-4 w-4 text-[#002147]" /> 🎓 B.Com PSOs
          </h4>
          <ul className="flex flex-col gap-3.5 py-6 font-sans font-semibold text-slate-600 text-xs md:text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>PSO1: Accounting Knowledge</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>PSO2: Taxation & Business Law</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>PSO3: Financial Analysis</span>
            </li>
          </ul>
          <button
            onClick={() => handleDownload("B.Com PSOs PDF")}
            className="mt-auto inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl p-3 font-sans font-bold text-xs text-[#002147] transition-all"
          >
            <FileDown className="h-3.5 w-3.5" /> View Details: B.Com PSOs (PDF)
          </button>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-[2rem] p-6 flex flex-col shadow-sm">
          <h4 className="font-outfit text-base font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Settings className="h-4 w-4 text-indigo-600" /> 💻 BCA PSOs
          </h4>
          <ul className="flex flex-col gap-3.5 py-6 font-sans font-semibold text-slate-600 text-xs md:text-sm">
            <li className="flex items-start gap-2">
              <Star className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
              <span>PSO1: Programming Skills</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
              <span>PSO2: Database Management</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
              <span>PSO3: Software Development</span>
            </li>
          </ul>
          <button
            onClick={() => handleDownload("BCA PSOs PDF")}
            className="mt-auto inline-flex items-center justify-center gap-1.5 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-xl p-3 font-sans font-bold text-xs text-indigo-800 transition-all"
          >
            <FileDown className="h-3.5 w-3.5" /> View Details: BCA PSOs (PDF)
          </button>
        </div>
      </div>

      {/* Course Outcomes & Mapping Details Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { title: "Course Outcomes (COs)", file: "Full Course Outcomes (Programme-wise PDF)", color: "bg-[#002147] hover:bg-[#00387a]" },
          { title: "CO–PO Mapping", file: "CO-PO Mapping Details (PDF)", color: "bg-indigo-950 hover:bg-indigo-900" },
          { title: "Attainment of Outcomes", file: "Outcome Attainment (PDF)", color: "bg-teal-950 hover:bg-teal-900" }
        ].map((item, i) => (
          <div key={i} className={`${item.color} text-white p-6 rounded-[2rem] flex flex-col gap-4 shadow-sm transition-all`}>
            <span className="font-outfit font-black text-xs md:text-sm leading-tight">{item.title}</span>
            <button
              onClick={() => handleDownload(item.file)}
              className="mt-auto inline-flex items-center gap-1.5 bg-white/10 backdrop-blur hover:bg-white/20 p-2.5 rounded-2xl text-center font-bold text-[10px] uppercase tracking-wide border border-white/10 shadow-inner justify-center"
            >
              <FileDown className="h-3 w-3" /> Download / View
            </button>
          </div>
        ))}
      </div>

      {/* Continuous Improvement Box */}
      <div className="bg-[#002147]/5 border border-[#002147]/10 rounded-[2rem] p-8 md:p-10 mt-2 flex flex-col md:flex-row items-center gap-8">
        <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
          <LineChart className="h-8 w-8" />
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-outfit font-black text-[#002147] text-lg">Continuous Improvement Cycles</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-slate-600 font-semibold text-xs md:text-sm">
            <div className="flex items-start gap-2">
              <span className="h-1 w-1 rounded-full bg-emerald-600 mt-2"></span>
              <span>Regular review of learning outcomes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="h-1 w-1 rounded-full bg-emerald-600 mt-2"></span>
              <span>Feedback from students and stakeholders</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="h-1 w-1 rounded-full bg-emerald-600 mt-2"></span>
              <span>Curriculum enhancement & pedagogical innovations</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="h-1 w-1 rounded-full bg-emerald-600 mt-2"></span>
              <span>Remedial and advanced learning support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
