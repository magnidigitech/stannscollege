import { Sparkles, Award, Users, CheckCircle, GraduationCap } from "lucide-react";
import { getFaculty, getAffiliations } from "@/lib/sanity";

export default async function AboutPage() {
  const coreValues = [
    {
      title: "Vision",
      desc: "To be an innovative beacon of academic distinction, cultivating creative problem solvers and ethical leaders who shape the world with compassion and knowledge.",
    },
    {
      title: "Mission",
      desc: "To provide quality, research-infused programs, build high-performance infrastructure, and empower women in all disciplines of arts, commerce, and advanced sciences.",
    },
  ];

  const facultyList = await getFaculty();
  const affiliationsList = await getAffiliations();

  return (
    <div className="bg-slate-50/50 min-h-screen py-16 md:py-24 select-none">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* About Header */}
        <div className="max-w-3xl text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 px-4 py-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider shadow-sm select-none">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" /> Our Legacy & Story
          </span>
          <h1 className="mt-6 font-outfit text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1] md:leading-[1.1]">
            About St. Ann&apos;s College
          </h1>
          <p className="mt-4 font-sans text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
            An iconic institution in Gorantla, Guntur, shaping outstanding educational opportunities, lifelong critical skills, and holistic empowerment since 1997.
          </p>
        </div>

        {/* Detailed Narrative Section with Vision/Mission cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-slate-200/50 pb-16">
          <div className="lg:col-span-7 flex flex-col gap-6 text-slate-600 leading-relaxed font-sans text-base md:text-lg max-w-2xl">
            <p>
              Founded in 1997, St. Ann&apos;s College for Women has evolved into a formidable center of excellence, continually providing students from all walks of life with an inspiring, supportive academic ecosystem. From cutting-edge research modules to comprehensive business management studies, our focus remains squarely on building confidence, technical prowess, and innovative problem-solving capability.
            </p>
            <p>
              We firmly believe that high-quality higher education serves as the vital gateway to total personal development and successful professional integration. Our distinguished faculty members act not merely as teachers, but as dedicated mentors who nurture intellectual curiosity, critical assessment, and sound judgment.
            </p>
            <div className="mt-4 flex items-center gap-3 bg-white p-5 border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-indigo-700 font-bold text-white shadow-md">
                <CheckCircle className="h-6 w-6" />
              </span>
              <div>
                <h4 className="font-outfit font-black text-slate-800 text-base leading-tight">Committed to Continuous Progress</h4>
                <p className="font-sans text-xs font-semibold text-slate-500 leading-normal mt-1">
                  Continuously upgrading technology, digital classrooms, and laboratory apparatus.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            {coreValues.map((val, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-8 border border-slate-200/60 shadow-md hover:shadow-xl hover:shadow-indigo-50 hover:border-indigo-100 hover:-translate-y-0.5 duration-300 transition-all cursor-default"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 font-outfit text-xs font-black text-indigo-600 uppercase tracking-wide">
                    <Award className="h-4 w-4" /> {val.title}
                  </span>
                  <p className="mt-4 font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Section for Faculty from Sanity */}
        <div className="mt-20">
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100/80 px-3.5 py-1 text-xs font-bold text-indigo-700 uppercase tracking-wide">
              <Users className="h-3.5 w-3.5 text-indigo-600" /> Leading Faculty
            </span>
            <h2 className="mt-4 font-outfit text-3xl font-black text-slate-900 md:text-4xl">Meet our Visionary Educators</h2>
            <p className="mt-3 font-sans text-sm text-slate-500 leading-relaxed max-w-xl">
              Distinguished professors, mentors, and administrators dedicated to building tomorrow&apos;s female leaders.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyList.map((fac: any, idx: number) => (
              <div key={idx} className="p-6 bg-white border border-slate-200/60 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-default">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-outfit text-xs font-black text-indigo-600 uppercase tracking-wide">{fac.department}</span>
                  </div>
                  <h4 className="mt-4 font-outfit text-xl font-black text-slate-800 leading-snug">{fac.name}</h4>
                  <p className="font-sans text-xs font-bold text-slate-400 mt-0.5">{fac.role}</p>
                  <p className="mt-3 font-sans text-sm text-slate-500 leading-relaxed">{fac.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Section for Affiliations from Sanity */}
        <div className="mt-24 border-t border-slate-200/50 pt-20">
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-100/80 px-3.5 py-1 text-xs font-bold text-purple-700 uppercase tracking-wide">
              <GraduationCap className="h-3.5 w-3.5 text-purple-600" /> Validated Accreditation
            </span>
            <h2 className="mt-4 font-outfit text-3xl font-black text-slate-900 md:text-4xl">Official Affiliations</h2>
            <p className="mt-3 font-sans text-sm text-slate-500 leading-relaxed max-w-xl">
              Certified educational standards that ensure our curriculum delivers top academic recognition.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {affiliationsList.map((aff: any, idx: number) => (
              <div key={idx} className="p-6 bg-white border border-slate-200/60 rounded-3xl flex items-center gap-4 hover:shadow-lg transition-all duration-300">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-600 text-white font-bold text-base shadow-md">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <h4 className="font-outfit font-bold text-slate-800 text-base leading-tight">{aff.name}</h4>
                  <p className="font-sans text-xs font-semibold text-slate-400 leading-normal mt-1">{aff.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
