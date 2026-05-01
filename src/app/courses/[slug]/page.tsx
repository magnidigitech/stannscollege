import { GraduationCap, Clock, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const detailedCourseInfo: Record<string, { title: string; category: string; duration: string; fullDesc: string; curriculum: string[] }> = {
  "bachelor-of-computer-science": {
    title: "Bachelor of Computer Science (B.Sc CS)",
    category: "Technology",
    duration: "3 Years",
    fullDesc: "Learn essential theories and advanced modern technologies. This degree focuses heavily on practical code development, algorithms, artificial intelligence, cloud architecture, and web systems, giving students a serious competitive advantage in the IT landscape.",
    curriculum: [
      "Software Systems Design & Patterns",
      "Advanced Web Apps & React Ecosystem",
      "DBMS, SQL, and NoSQL Infrastructures",
      "Applied AI & Real-time Edge Data",
    ],
  },
  "master-of-business-administration": {
    title: "Master of Business Administration (MBA)",
    category: "Business",
    duration: "2 Years",
    fullDesc: "An advanced, deeply rigorous management degree structured for next-generation leaders. Delivers cutting-edge insights on dynamic international commerce, scalable investments, human resource capital, and creative entrepreneurship.",
    curriculum: [
      "Core Quantitative Analytical Modeling",
      "Investment Analysis & Portfolio Strategy",
      "Global Operational Management",
      "Product Positioning and Brand Equity",
    ],
  },
  "bcom-computer-applications": {
    title: "B.Com in Computer Applications",
    category: "Commerce",
    duration: "3 Years",
    fullDesc: "A forward-thinking program that converges robust accounting practices and business law frameworks with software tools. Empowers you with everything needed for effective corporate accounting, commercial data governance, and strategic planning.",
    curriculum: [
      "Advanced Auditing & GST Reporting",
      "E-Commerce Security & Architectures",
      "Analytical Information Systems",
      "Strategic Financial Management",
    ],
  },
  "ba-psychology-literature": {
    title: "B.A. in Psychology & Literature",
    category: "Humanities",
    duration: "3 Years",
    fullDesc: "A multidimensional curriculum evaluating critical narrative framing alongside quantitative and cognitive psychological analysis. Broadens perception, human pattern mapping, and creative communication competencies.",
    curriculum: [
      "Cognitive Patterns and Perception",
      "Classic & Contemporary Fiction Analysis",
      "Empirical Social Psychology Methods",
      "World Literature and Critical Theory",
    ],
  },
};

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = detailedCourseInfo[slug];

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-slate-50/50 min-h-screen py-16 md:py-24 select-none">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link 
          href="/courses" 
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors duration-200 select-none"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
        </Link>

        <div className="mt-8 rounded-3xl bg-white border border-slate-200/60 p-8 md:p-12 shadow-xl shadow-indigo-50/20 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 px-3 py-1 font-outfit text-xs font-black text-indigo-700 uppercase tracking-wide">
                <GraduationCap className="h-4 w-4" /> {course.category}
              </span>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/50 px-3 py-1 rounded-full">
                <Clock className="h-3.5 w-3.5" /> {course.duration}
              </span>
            </div>

            <h1 className="mt-8 font-outfit text-3xl font-black text-slate-900 md:text-4xl lg:text-5xl tracking-tight leading-none">
              {course.title}
            </h1>
            
            <p className="mt-6 font-sans text-base leading-relaxed text-slate-600 max-w-2xl font-normal">
              {course.fullDesc}
            </p>

            <div className="mt-12">
              <h3 className="font-outfit text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" /> Core Curriculum Modules
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.curriculum.map((mod, index) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-50/60 p-5 border border-slate-100/80 rounded-2xl hover:bg-indigo-50/30 transition-colors duration-200 cursor-default">
                    <CheckCircle className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
                    <p className="font-sans text-sm font-semibold text-slate-700 leading-normal">{mod}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-4">
            <Link 
              href="/admission" 
              className="rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 px-8 py-3.5 font-extrabold text-white shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-95 transition-all duration-300 select-none"
            >
              Apply to this Course
            </Link>
            <Link 
              href="/contact" 
              className="rounded-full border border-slate-200 bg-white/75 px-8 py-3.5 font-extrabold text-slate-700 hover:bg-white active:scale-95 transition-all duration-300 select-none hover:shadow-md"
            >
              Submit Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
