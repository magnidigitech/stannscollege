import Link from "next/link";
import { GraduationCap, Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export default function CoursesPage() {
  const allCourses = [
    {
      title: "Bachelor of Computer Science (B.Sc CS)",
      slug: "bachelor-of-computer-science",
      duration: "3 Years",
      category: "Technology",
      desc: "Comprehensive coverage of core computing theory, backend/frontend engineering, artificial intelligence, and cloud frameworks.",
    },
    {
      title: "Master of Business Administration (MBA)",
      slug: "master-of-business-administration",
      duration: "2 Years",
      category: "Business",
      desc: "Advanced analytical education covering business operations, quantitative models, global finance, and team leadership.",
    },
    {
      title: "B.Com in Computer Applications",
      slug: "bcom-computer-applications",
      duration: "3 Years",
      category: "Commerce",
      desc: "Integrates essential financial accounting standards, business legalities, and modern algorithmic commerce modules.",
    },
    {
      title: "B.A. in Psychology & Literature",
      slug: "ba-psychology-literature",
      duration: "3 Years",
      category: "Humanities",
      desc: "Examines human cognitive development alongside exhaustive critical appraisal of classical and contemporary fiction.",
    },
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-16 md:py-24 select-none">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 px-4 py-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider shadow-sm select-none">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" /> Rigorous Course Catalog
          </span>
          <h1 className="mt-6 font-outfit text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1] md:leading-[1.1]">
            Our Academic Courses
          </h1>
          <p className="mt-4 font-sans text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
            Browse through our versatile spectrum of graduate and postgraduate degree programs built to support your educational and career advancement.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {allCourses.map((course, i) => (
            <div 
              key={i} 
              className="group flex flex-col justify-between rounded-3xl bg-white p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 hover:-translate-y-1 hover:border-indigo-200/50 duration-300 transition-all select-none cursor-default"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center gap-1.5 font-outfit text-xs font-black text-indigo-600 uppercase tracking-wider">
                    <GraduationCap className="h-4 w-4" /> {course.category}
                  </span>
                  <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/50 px-3 py-1 rounded-full">
                    <Clock className="h-3.5 w-3.5" /> {course.duration}
                  </span>
                </div>
                <h3 className="mt-6 font-outfit text-2xl font-black text-slate-900 group-hover:text-indigo-600 duration-200 transition-colors">
                  {course.title}
                </h3>
                <p className="mt-3 font-sans text-sm text-slate-500 leading-relaxed max-w-xl">
                  {course.desc}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between group-hover:border-indigo-100 transition-all">
                <Link 
                  href={`/courses/${course.slug}`} 
                  className="font-outfit font-bold text-sm text-indigo-600 flex items-center gap-1.5 group-hover:text-indigo-700"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="/admission" 
                  className="font-outfit font-semibold text-xs text-indigo-900 hover:underline"
                >
                  Quick Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
