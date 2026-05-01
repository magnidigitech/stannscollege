import Link from "next/link";
import { ArrowRight, BookOpen, Users, Calendar, Award, CheckCircle, Sparkles, Building, Briefcase, Bell } from "lucide-react";
import { getEvents, getNotices } from "@/lib/sanity";

export default async function HomePage() {
  const highlightFeatures = [
    {
      title: "Visionary Faculty",
      icon: Users,
      desc: "Learn from esteemed, highly experienced academics and leading industry professionals.",
      gradient: "from-blue-600 via-indigo-600 to-indigo-700",
    },
    {
      title: "Top Tier Courses",
      icon: BookOpen,
      desc: "Comprehensive undergraduate and postgraduate programs built for dynamic corporate success.",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
    },
    {
      title: "Advanced Campus",
      icon: Building,
      desc: "State-of-the-art labs, vast digital reading rooms, and comfortable academic spaces.",
      gradient: "from-purple-600 via-pink-600 to-rose-600",
    },
    {
      title: "Career Placement",
      icon: Briefcase,
      desc: "Dedicated cell supporting industry training, networking, and direct placement opportunities.",
      gradient: "from-teal-500 via-emerald-600 to-teal-700",
    },
  ];

  const collegeStats = [
    { label: "Founded Year", value: "1997" },
    { label: "Successful Alumni", value: "15,000+" },
    { label: "Corporate Partners", value: "85+" },
    { label: "Student Placement", value: "92%" },
  ];

  const notices = await getNotices();
  const events = await getEvents();

  return (
    <div className="flex flex-col gap-0 select-none overflow-hidden bg-slate-50/50">
      {/* Hero section with glassmorphism and modern gradient */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36 border-b border-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-20" />
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-gradient-to-bl from-indigo-200/30 via-purple-200/30 to-rose-100/20 blur-3xl rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-gradient-to-tr from-blue-200/20 via-indigo-200/20 to-transparent blur-3xl rounded-full -z-10" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 px-4 py-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider shadow-sm select-none">
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-600" /> Shaping Bright Futures Since 1997
              </span>

              <h1 className="mt-8 font-outfit text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] md:leading-[1.05]">
                St. Ann&apos;s College <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">For Women, Gorantla</span>
              </h1>

              <p className="mt-6 font-sans text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl font-normal">
                An institution of academic distinction dedicated to high-quality education, empowering modern female visionaries, and launching impactful global careers in Guntur.
              </p>

              <div className="mt-10 flex flex-wrap gap-4 items-center">
                <Link 
                  href="/admission" 
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 select-none"
                >
                  Admissions Open <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  href="/courses" 
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 backdrop-blur-sm px-8 py-4 text-base font-extrabold text-slate-700 hover:bg-white hover:border-slate-300 active:scale-95 transition-all duration-300 select-none hover:shadow-lg hover:shadow-slate-100"
                >
                  Explore Courses
                </Link>
              </div>
            </div>

            {/* Right Column Visual Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/20 via-purple-300/20 to-pink-300/20 blur-3xl rounded-full -z-10 animate-pulse" />
              <div className="p-8 md:p-12 bg-white/60 backdrop-blur-md border border-white/70 shadow-2xl shadow-indigo-50 rounded-3xl relative max-w-sm w-full hover:scale-[1.02] transition-all duration-500 cursor-default">
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 font-bold text-white shadow-lg shadow-indigo-200 select-none">
                      <Award className="h-6 w-6" />
                    </span>
                    <div>
                      <h4 className="font-outfit font-black text-slate-900 text-lg leading-tight select-none">Top Rank Institution</h4>
                      <p className="font-sans text-xs font-semibold text-slate-500 leading-normal mt-1.5 select-none">
                        Accredited for remarkable standards and consistent institutional distinction.
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-rose-600 font-bold text-white shadow-lg shadow-purple-200 select-none">
                      <Sparkles className="h-6 w-6" />
                    </span>
                    <div>
                      <h4 className="font-outfit font-black text-slate-900 text-lg leading-tight select-none">Dynamic Curriculum</h4>
                      <p className="font-sans text-xs font-semibold text-slate-500 leading-normal mt-1.5 select-none">
                        Tailored coursework that integrates theoretical insights with hands-on corporate skills.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numerical Stats section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {collegeStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center p-4">
                <h3 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent select-none">
                  {stat.value}
                </h3>
                <p className="mt-2 font-sans text-xs md:text-sm font-bold text-slate-500 tracking-wide uppercase select-none">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Sanity Notices & Events section */}
      <section className="py-24 bg-white border-b border-slate-200/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Side: Notices */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100/80 px-3.5 py-1 text-xs font-bold text-indigo-700 uppercase tracking-wide">
                <Bell className="h-3.5 w-3.5 text-indigo-600" /> Recent Notices
              </span>
              <h3 className="mt-4 font-outfit text-3xl font-black text-slate-900">Important Updates</h3>
              <div className="mt-10 flex flex-col gap-6">
                {notices.map((notice: any, idx: number) => (
                  <div key={idx} className="p-6 bg-slate-50/60 border border-slate-200/50 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-outfit text-xs font-black text-indigo-600 uppercase tracking-wide">{notice.category || "General"}</span>
                        <span className="font-sans text-xs font-semibold text-slate-400">{notice.date}</span>
                      </div>
                      <h4 className="mt-3 font-outfit text-xl font-bold text-slate-800 leading-snug">{notice.title}</h4>
                      <p className="mt-2 font-sans text-sm text-slate-500 leading-relaxed">{notice.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Events */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-100/80 px-3.5 py-1 text-xs font-bold text-purple-700 uppercase tracking-wide">
                <Calendar className="h-3.5 w-3.5 text-purple-600" /> Upcoming Events
              </span>
              <h3 className="mt-4 font-outfit text-3xl font-black text-slate-900">On Campus Activities</h3>
              <div className="mt-10 flex flex-col gap-6">
                {events.map((ev: any, idx: number) => (
                  <div key={idx} className="p-6 bg-slate-50/60 border border-slate-200/50 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-outfit text-xs font-black text-purple-600 uppercase tracking-wide">{ev.location}</span>
                        <span className="font-sans text-xs font-semibold text-slate-400">{ev.date}</span>
                      </div>
                      <h4 className="mt-3 font-outfit text-xl font-bold text-slate-800 leading-snug">{ev.title}</h4>
                      <p className="mt-2 font-sans text-sm text-slate-500 leading-relaxed">{ev.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid Highlights section */}
      <section className="py-24 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <h2 className="font-outfit text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-none">
              Academic Excellence in Focus
            </h2>
            <p className="mt-4 font-sans text-base md:text-lg text-slate-600 leading-relaxed font-normal">
              Experience an unparalleled educational environment tailored for development, success, and growth.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {highlightFeatures.map((feature, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-50/60 hover:border-indigo-200/60 hover:-translate-y-1 duration-300 transition-all select-none cursor-default"
              >
                <div className="flex flex-col gap-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${feature.gradient} text-white shadow-lg`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-outfit text-xl font-bold text-slate-900 group-hover:text-indigo-600 duration-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm text-slate-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beautiful Rich Call to Action section */}
      <section className="relative overflow-hidden bg-slate-950 text-white selection:bg-indigo-500/30 selection:text-indigo-100">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-10 -z-10" />
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-gradient-to-l from-indigo-800/30 to-purple-800/30 blur-3xl rounded-full -z-10" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 text-center flex flex-col items-center justify-center">
          <h2 className="font-outfit text-3xl font-black md:text-5xl leading-tight tracking-tight max-w-3xl">
            Ignite Your Academic & Professional Journey Today
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base md:text-lg text-indigo-100/80 leading-relaxed">
            Ready to embrace premier higher education in Gorantla, Guntur? Submit your inquiry or online application today to join St. Ann&apos;s College for Women.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 items-center justify-center">
            <Link 
              href="/admission" 
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all active:scale-95 duration-300"
            >
              Start Admission Process
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
