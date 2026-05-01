"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ShieldCheck, Download, Users, FileText, Sparkles, Compass, Target, BookOpen } from "lucide-react";

export function CodeOfConduct() {
  const [activeTab, setActiveTab] = useState<"students" | "employees">("students");
  const [openIds, setOpenIds] = useState<string[]>([]);

  const studentsSections = [
    {
      id: "overview",
      title: "Overview",
      icon: <Compass className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            The Students’ Code of Conduct at St. Ann’s College for Women defines the rules, responsibilities, and expected behavior of students to maintain a disciplined, safe, and academically focused environment. This policy is designed in alignment with institutional values and NAAC guidelines to promote responsible student conduct and holistic development.
          </p>
        </div>
      )
    },
    {
      id: "discipline",
      title: "1. General Discipline",
      icon: <Target className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            All students are expected to maintain high standards of discipline and behavior within the campus.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Strictly adhere to all rules and regulations laid down by the college.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Any violation of rules or instructions will be recorded in the Identity Card and college records.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Upon three recorded violations, the college reserves the right to suspend or expel the student.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "timings",
      title: "2. College Timings & Assembly",
      icon: <FileText className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Working Hours</h5>
              <ul className="flex flex-col gap-1 text-xs md:text-sm">
                <li>Monday to Friday: 8:55 AM – 3:00 PM</li>
                <li>Saturday: 8:55 AM – 12:30 PM</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Morning Assembly</h5>
              <p className="text-xs md:text-sm leading-relaxed">
                Attendance is mandatory for all students. Must maintain absolute discipline, respect, and attentiveness.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "dress-code",
      title: "3. Dress Code & ID Cards",
      icon: <ShieldCheck className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Must follow the prescribed uniform rules to maintain institutional decorum and visual consistency.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Attend college in the prescribed uniform only.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Every student must carry her Identity Card at all times within the campus.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Loss of ID card must be reported immediately.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "mobile-use",
      title: "5. Mobile Phone Usage",
      icon: <Users className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Mobile phones must be used responsibly and only for official or academic purposes.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Permitted only for academic activities (e.g. internships, online modules).</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Unauthorized use results in immediate confiscation and disciplinary notice.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Taking photos/videos without official permission is strictly prohibited.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "anti-ragging",
      title: "10. Anti-Ragging Policy & Cleanliness",
      icon: <Sparkles className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Ensuring a highly clean, safe, and positive academic environment for all students.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Ragging in any form is strictly prohibited and dealt under the 1996 Prohibition Act.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Uphold dynamic cleanliness of all campus buildings and rooms.</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const employeesSections = [
    {
      id: "emp-overview",
      title: "Overview",
      icon: <Compass className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            The Code of Conduct for employees of St. Ann’s College for Women establishes the professional standards, ethical values, and responsibilities expected from all teaching and non-teaching staff. It ensures a disciplined, respectful, transparent, and academically focused institutional environment.
          </p>
        </div>
      )
    },
    {
      id: "emp-general",
      title: "1. General Rules & Responsibilities",
      icon: <Target className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Identity cards, professional decorum, address recordings, and collegiality.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Mandatory to wear ID card at all times on campus.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Maintain punctuality, dedicated work habits, and fair assessment.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Report address changes within exactly 3 days.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "emp-leave",
      title: "3. Leave & Vacation Policy",
      icon: <FileText className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Casual Leave</h5>
              <p className="text-xs md:text-sm">15 days per year, maximum 3 days at a time.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Medical Leave</h5>
              <p className="text-xs md:text-sm">Up to 5 days, extendable to 10 with certificate.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Vacation</h5>
              <p className="text-xs md:text-sm">Teaching staff: Min 45 days. Non-teaching: Min 30 days.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "emp-disciplinary",
      title: "4. Disciplinary Framework",
      icon: <ShieldCheck className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            The official structure for minor and major disciplinary review procedures.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Minor penalties include: Warning, censure, fine, suspension up to 7 days.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Major penalties include: Reduction in rank, compulsory retirement, termination.</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const currentSections = activeTab === "students" ? studentsSections : employeesSections;

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setOpenIds(currentSections.map((s) => s.id));
    } else {
      setOpenIds(["overview"]);
    }
  }, [activeTab]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-8 font-sans select-none animate-fadeIn">
      {/* Top action/header block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-outfit text-2xl font-black text-slate-800 leading-tight">
            Code of Conduct
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
            Institutional Values & Standards
          </p>
        </div>

        {/* Action button to download the PDF */}
        <a
          href={
            activeTab === "students"
              ? "/documents/code-of-conduct/3.8 Students Code of Conduct.pdf"
              : "/documents/code-of-conduct/Code of Conduct for Employees.pdf"
          }
          download
          className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-xs md:text-sm py-3 px-5 shadow-md transition-all active:scale-95 w-fit"
        >
          <Download className="h-4 w-4" /> Download Official PDF
        </a>
      </div>

      {/* Tab switches */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 border border-slate-200/50 rounded-2xl max-w-md select-none">
        <button
          onClick={() => setActiveTab("students")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "students"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Users className="h-4 w-4 shrink-0" /> Students
        </button>
        <button
          onClick={() => setActiveTab("employees")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "employees"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="h-4 w-4 shrink-0" /> Employees
        </button>
      </div>

      {/* Accordions List Area */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col gap-4">
        {currentSections.map((section) => (
          <div
            key={section.id}
            className={`overflow-hidden border transition-all duration-300 rounded-2xl ${
              openIds.includes(section.id)
                ? "bg-indigo-50/20 border-indigo-200/80 shadow-md"
                : "bg-white border-slate-100 hover:border-indigo-100 hover:shadow-sm"
            }`}
          >
            <button
              onClick={() => toggleAccordion(section.id)}
              className="w-full flex items-center justify-between px-6 py-4 outline-none text-left select-none"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 text-xs shrink-0 select-none">
                  {section.icon}
                </span>
                <h4 className="font-outfit font-black text-slate-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                  {section.title}
                </h4>
              </div>
            </button>

            {openIds.includes(section.id) && (
              <div className="px-6 pb-5 pt-1 border-t border-indigo-100/40 animate-fadeIn">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
