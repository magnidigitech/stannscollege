import React from "react";
import { Award, Trophy, Calendar, Sparkles, Star, CheckCircle2 } from "lucide-react";
import { getLaurels, getLaurelImages } from "@/lib/sanity";

export async function StudentLaurels() {
  const laurelsList = await getLaurels();
  const laurelImages = await getLaurelImages();

  // Static fallback images in case Sanity hasn't been populated with dynamic laurel images yet
  const defaultImages = [
    { imageUrl: "/images/about/the-institution/student-lareuls/UG-2018.jpg", title: "UG Pratibha Award Winners" },
    { imageUrl: "/images/about/the-institution/student-lareuls/GOLD MEDAL.jpg", title: "ANU Gold Medalist" },
    { imageUrl: "/images/about/the-institution/student-lareuls/2014.jpg", title: "Historical Achievements" }
  ];

  const galleryToUse = laurelImages && laurelImages.length > 0 ? laurelImages : defaultImages;

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Narrative Section Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-900 via-indigo-950 to-purple-950 p-6 md:p-10 text-white shadow-xl border border-rose-800/40 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-400/30 px-3.5 py-1 text-xs font-bold text-rose-200 tracking-wider uppercase">
              <Trophy className="h-3.5 w-3.5 animate-pulse" /> Student Laurels
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Student Laurels & Awards
            </h2>
            <p className="mt-2 text-rose-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              A Legacy of Academic Excellence — Nurturing scholars who reach the pinnacle of success.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-400/30 text-rose-200 backdrop-blur-md shadow-inner">
            <Star className="h-6 w-6" />
          </span>
        </div>
      </div>

      {/* Legacy Narrative Paragraphs */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          A Tradition of Merit
        </h3>
        <p className="leading-relaxed font-normal text-slate-600 text-sm md:text-base">
          At St. Ann’s College for Women, we believe that academic brilliance is the harvest of disciplined effort, intellectual curiosity, and a value-based learning environment. Our institution has a long-standing tradition of nurturing scholars who consistently reach the pinnacle of academic success.
        </p>
        <p className="mt-4 leading-relaxed font-normal text-slate-600 text-sm md:text-base">
          We take immense pride in celebrating the &quot;St. Ann’s Stars&quot;—our outstanding achievers who have brought great distinction to the college through Pratibha Puraskar Awards, University Ranks, and Gold Medals. Their success is a testament to the academic rigor fostered by our dedicated faculty and the unwavering perseverance of our students in their pursuit of excellence.
        </p>
      </div>

      {/* Laurels Data Grid / Table */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          Historical Student Achievers
        </h3>
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="py-3 px-4 font-outfit text-xs font-black text-slate-700 uppercase tracking-wider">Academic Year</th>
                <th className="py-3 px-4 font-outfit text-xs font-black text-slate-700 uppercase tracking-wider">Group</th>
                <th className="py-3 px-4 font-outfit text-xs font-black text-slate-700 uppercase tracking-wider">Name of Student</th>
                <th className="py-3 px-4 font-outfit text-xs font-black text-slate-700 uppercase tracking-wider">Achievement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-600">
              {laurelsList.map((st: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 font-sans font-bold text-slate-800">{st.year}</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-600">{st.group}</td>
                  <td className="py-3 px-4 font-outfit font-bold text-slate-800">{st.studentName}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-rose-600 flex items-center gap-1.5 leading-tight">
                    <Trophy className="h-4 w-4 text-rose-500 shrink-0" /> {st.achievement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Highlight/Why St. Ann's Stars Shine Brighter */}
      <div className="bg-gradient-to-br from-rose-50/40 via-white to-purple-50/30 p-6 md:p-8 border border-slate-200/60 rounded-3xl shadow-sm">
        <h4 className="font-outfit text-lg font-black text-slate-900 select-none">Why St. Ann’s Stars Shine Brighter</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="flex items-start gap-2.5 text-xs md:text-sm font-normal text-slate-600">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
            <p className="leading-normal"><strong>Academic Rigor:</strong> Curriculum-driven excellence supported by experienced faculty.</p>
          </div>
          <div className="flex items-start gap-2.5 text-xs md:text-sm font-normal text-slate-600">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
            <p className="leading-normal"><strong>Holistic Support:</strong> Mentorship programs that guide students toward competitive rankings.</p>
          </div>
          <div className="flex items-start gap-2.5 text-xs md:text-sm font-normal text-slate-600">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
            <p className="leading-normal"><strong>Empowering Environment:</strong> A culture that celebrates merit and inspires future generations to set new benchmarks.</p>
          </div>
        </div>
      </div>

      {/* Success Motivation Quote */}
      <div className="bg-rose-50/50 border border-rose-100/50 p-5 rounded-2xl flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-rose-600 shrink-0 animate-pulse" />
        <p className="text-xs md:text-sm italic font-semibold text-rose-900/80 leading-relaxed">
          &quot;Success is where preparation and opportunity meet. We provide the opportunity; our students provide the excellence.&quot;
        </p>
      </div>

      {/* Photo Gallery of Pratibha Awards & Gold Medals */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          Awards & Achievements Gallery
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
          {galleryToUse.map((pic: any, index: number) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 hover:border-rose-400/40 shadow-sm aspect-[4/3] bg-slate-50 relative group transition-all">
              <img src={pic.imageUrl} alt={pic.title || "Laurel Image"} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-bold leading-tight line-clamp-2">{pic.title || "Laurel Image"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
