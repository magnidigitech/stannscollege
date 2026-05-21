import React from "react";
import { Sparkles, Award, CheckCircle, CheckCircle2, ShieldCheck, BookOpen, GraduationCap } from "lucide-react";

export function VisionMissionCoreValues() {
  const pillars = [
    {
      title: "Innovative Pedagogy",
      desc: "Implementing novel teaching-learning techniques to achieve excellence in higher education."
    },
    {
      title: "Character Building",
      desc: "Enhancing ethical and moral values for the holistic development and character-building of students."
    },
    {
      title: "Inclusive Environment",
      desc: "Providing an ideal and diversified learning environment that brightens the lives of rural and urban Women."
    },
    {
      title: "Skill Integration",
      desc: "Bridging the gap between Academic knowledge and Practical skills aligning with 'Skill India' goals for career readiness and entrepreneurship."
    }
  ];

  const objectives = [
    "To Cultivate Academic Rigor: Continuously upgrading the curriculum to meet global standards and stimulate a spirit of scientific inquiry.",
    "To Leverage Digital Innovation: Integrating modern pedagogical tools, such as e-learning platforms and project-based learning.",
    "To Promote Mentorship: Nurturing students through a robust Mentor-Mentee System and student-centric support services.",
    "To Instill Resilience: Transforming students into balanced personalities capable of navigating professional and personal challenges.",
    "To Foster Economic Self-Reliance: Training students in employability skills and entrepreneurship to ensure financial independence.",
    "To Uphold Civic Duty: Sensitizing students to social responsibility, environmental sustainability, and cultural heritage."
  ];

  const attributes = [
    { label: "Academic Proficiency", text: "Mastery of subject-specific knowledge with an analytical mindset." },
    { label: "Critical & Creative Thinking", text: "The ability to analyze complex issues objectively and devise innovative solutions." },
    { label: "Leadership & Empowerment", text: "The confidence to lead teams with empathy and make ethical, value-driven decisions." },
    { label: "Ethical Integrity", text: "A commitment to transparency, simplicity, and high professional standards." },
    { label: "Effective Communication", text: "Proficiency in clear, concise expression and empathetic interpersonal collaboration." },
    { label: "Social Responsibility", text: "A deep-rooted sense of duty toward the common good and nation-building." },
    { label: "Entrepreneurial Mindset", text: "A proactive drive for self-reliance and the ability to identify economic opportunities." },
    { label: "Lifelong Learning", text: "The resilience to adapt, upskill, and thrive in a fast-evolving global landscape." }
  ];

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Banner Component Card with Badge */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#311042] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <GraduationCap className="h-3.5 w-3.5" /> Identity & Strategy
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Institutional Identity & Framework
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Educate • Enrich • Empower — Where Knowledge Ignites Empowerment
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Emblem & Motto Narrative Section */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          Our Emblem & Motto: Educate • Enrich • Empower
        </h3>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
          The emblem of St. Ann&apos;s College for Women is a visual representation of our philosophical foundation. Established in 1997, it serves as a daily reminder of our mission to shape the future of women through three sacred symbols:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
            <h5 className="font-outfit font-black text-indigo-900 text-sm md:text-base leading-tight">The Candle</h5>
            <span className="text-xs font-bold text-indigo-400 block mt-0.5 uppercase tracking-wide">The Light of Knowledge</span>
            <p className="text-xs text-slate-500 font-normal leading-relaxed mt-2">
              Symbolizes the light of hope and wisdom. It represents our mission to dispel the darkness of ignorance and inspire confidence and joy in learning.
            </p>
          </div>
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
            <h5 className="font-outfit font-black text-indigo-900 text-sm md:text-base leading-tight">The Book</h5>
            <span className="text-xs font-bold text-indigo-400 block mt-0.5 uppercase tracking-wide">The Foundation of Wisdom</span>
            <p className="text-xs text-slate-500 font-normal leading-relaxed mt-2">
              Signifies the depth of understanding and the academic foundation required for an educated mind.
            </p>
          </div>
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
            <h5 className="font-outfit font-black text-indigo-900 text-sm md:text-base leading-tight">The Lotus</h5>
            <span className="text-xs font-bold text-indigo-400 block mt-0.5 uppercase tracking-wide">The Spirit of Resilience</span>
            <p className="text-xs text-slate-500 font-normal leading-relaxed mt-2">
              Reflecting purity and an open mind, the lotus signifies our commitment to nurturing personal growth and social responsibility.
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-gradient-to-br from-indigo-50/40 via-white to-indigo-50/20 p-6 md:p-8 border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4 border border-indigo-100 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </span>
            <h3 className="font-outfit text-lg font-black text-slate-900 uppercase tracking-wide leading-none select-none">Vision</h3>
            <p className="mt-3 font-sans text-sm text-slate-600 leading-relaxed font-normal">
              To be a premier center of Academic Excellence that fosters Value-Based Education and Innovative Skills, transforming Women into empowered leaders who contribute to the spirit of Viksit Bharat with integrity, professional ethics, and global purpose.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50/40 via-white to-purple-50/20 p-6 md:p-8 border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-lg hover:border-purple-100 transition-all duration-300 flex flex-col justify-between">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-4 border border-purple-100 shadow-sm">
              <Award className="h-5 w-5" />
            </span>
            <h3 className="font-outfit text-lg font-black text-slate-900 uppercase tracking-wide leading-none select-none">Mission</h3>
            <p className="mt-3 font-sans text-sm text-slate-600 leading-relaxed font-normal">
              To realize our vision, we are committed to four pillars: <strong>Innovative Pedagogy</strong>, <strong>Character Building</strong>, <strong>Inclusive Environment</strong>, and <strong>Skill Integration</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Four Pillars details */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm">
        <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          Four Pillars of Institutional Growth
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl flex items-start gap-3 hover:bg-white hover:border-indigo-100 transition-all">
              <CheckCircle className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
              <div>
                <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight">{p.title}</h5>
                <p className="text-slate-500 font-sans text-xs mt-1 leading-relaxed font-normal">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Goals Section */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm">
        <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          Institutional Objectives (Strategic Goals)
        </h3>
        <p className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">Quality Mandate of Higher Education</p>
        <div className="grid grid-cols-1 gap-3 text-slate-600">
          {objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm font-normal text-slate-600">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
              <p className="leading-normal">{obj}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Graduate Attributes Section */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300">
        <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          Graduate Attributes: The &quot;St. Ann&apos;s Woman&quot; Profile
        </h3>
        <p className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">The hallmark of a St. Ann&apos;s Graduate</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {attributes.map((attr, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all">
              <ShieldCheck className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
              <div>
                <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight">{attr.label}</h5>
                <p className="text-slate-500 font-sans text-xs mt-1 leading-relaxed font-normal">{attr.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
