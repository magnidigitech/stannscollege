"use client";

import { Database, CheckCircle2, Computer, Server, ClipboardCheck, BarChart2 } from "lucide-react";

export function LearningManagementSystem() {
  const lmsFeatures = [
    "Upload of Study Materials & Notes",
    "Assignment Submission & Evaluation",
    "Online Quizzes & Assessments",
    "Attendance Monitoring",
    "Communication between Faculty & Students"
  ];

  const lmsTable = [
    { sNo: 1, component: "Study Material Upload", desc: "Sharing notes & resources", platform: "Google Classroom / Moodle", purpose: "Easy access to content", icon: Computer },
    { sNo: 2, component: "Assignment Submission", desc: "Online submission of tasks", platform: "Google Classroom", purpose: "Continuous assessment", icon: Server },
    { sNo: 3, component: "Online Assessment", desc: "Conducting quizzes/tests", platform: "Moodle / LMS", purpose: "Evaluation", icon: ClipboardCheck },
    { sNo: 4, component: "Attendance Tracking", desc: "Monitoring attendance", platform: "LMS Portal", purpose: "Record maintenance", icon: BarChart2 }
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Database className="h-4 w-4 text-[#002147]" /> Teaching & Learning
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Learning Management System (LMS)
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The college utilizes digital platforms to support continuous learning and effective academic management. The Learning Management System (LMS) facilitates content delivery, assessments, student engagement, and academic tracking.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 bg-gradient-to-br from-[#002147] to-slate-900 text-white p-8 rounded-[2rem] shadow-md flex flex-col gap-6">
          <h3 className="font-outfit text-lg font-black tracking-tight border-b border-white/10 pb-3">Core LMS Capabilities</h3>
          <div className="flex flex-col gap-4">
            {lmsFeatures.map((f, idx) => (
              <div key={idx} className="flex items-start gap-3 text-blue-100 text-xs md:text-sm font-semibold leading-snug">
                <CheckCircle2 className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 bg-white border border-slate-200/60 rounded-[2rem] p-6 md:p-8 flex flex-col gap-4 shadow-sm">
          <h3 className="font-outfit text-base font-black text-[#002147]">LMS Component & Platforms Mapping</h3>
          <div className="flex flex-col gap-4 mt-2">
            {lmsTable.map((item) => (
              <div key={item.sNo} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:shadow-sm hover:border-[#002147]/10 transition-all gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white text-[#002147] shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-outfit font-black text-slate-800 text-xs md:text-sm leading-tight">{item.component}</h4>
                    <span className="text-[10px] text-slate-400 font-bold mt-1">{item.platform}</span>
                  </div>
                </div>
                <span className="hidden sm:inline-block font-sans text-[11px] text-[#002147] font-bold bg-[#002147]/5 px-3 py-1 rounded-full shrink-0 text-right">
                  {item.purpose}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
