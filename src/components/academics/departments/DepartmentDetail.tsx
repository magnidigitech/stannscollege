"use client";

import React, { useState, useEffect } from "react";
import { getDepartment } from "@/lib/sanity";
import { 
  Building, Target, GraduationCap, Briefcase, Award, Handshake, Users, BookOpen, Image as ImageIcon, CheckCircle2, Compass, HeartHandshake, Trophy, BarChart3, Settings, Sparkles, Loader2, ArrowRight
} from "lucide-react";

interface DepartmentDetailProps {
  itemSlug: string;
}

export function DepartmentDetail({ itemSlug }: DepartmentDetailProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const result = await getDepartment(itemSlug);
        setData(result);
      } catch (err) {
        console.error("Failed to load department detail:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [itemSlug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 text-[#002147] animate-spin" />
        <p className="text-slate-500 font-sans font-bold text-base">Syncing Department Profile...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-[2rem] p-10 text-center text-red-950 font-sans flex flex-col items-center gap-4 shadow-sm">
        <Building className="h-12 w-12 text-red-600" />
        <h3 className="font-outfit font-black text-2xl">Profile Not Found</h3>
        <p className="font-semibold text-base opacity-80 max-w-md">
          We were unable to locate data for this specific department namespace. Please verify the identifier.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 animate-fadeIn font-sans pb-12">
      
      {/* 1. Dynamic Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0e50a3] rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Building className="h-[500px] w-[500px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-4 md:max-w-3xl">
          <span className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest bg-white/15 backdrop-blur px-5 py-2 rounded-full w-fit shadow-inner text-blue-50">
            <Sparkles className="h-4 w-4 text-amber-300" /> Established {data.established || "1997-98"}
          </span>
          <h2 className="font-outfit text-4xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-sm">
            {data.name}
          </h2>
          {data.tagline && (
            <p className="text-blue-100/95 font-semibold text-lg md:text-xl mt-3 italic border-l-4 border-blue-200/40 pl-5 py-1">
              “{data.tagline}”
            </p>
          )}
        </div>
      </div>

      {/* 2. About Section */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-11 w-11 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">About & Institutional Vision</h3>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col gap-10">
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 font-medium leading-relaxed text-base md:text-[18px]">
              {data.description}
            </p>
          </div>

          <div className="flex flex-col gap-8 mt-2">
            {/* Vision Row */}
            <div className="bg-indigo-50/40 border border-indigo-100/80 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start hover:shadow-md hover:border-indigo-200 transition-all">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-white border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                <Compass className="h-7 w-7" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-outfit font-black text-indigo-950 text-xl md:text-2xl tracking-tight">Vision Statement</h4>
                <p className="text-slate-700 font-semibold text-base md:text-lg leading-relaxed max-w-5xl">
                  {data.vision}
                </p>
              </div>
            </div>

            {/* Mission Row */}
            <div className="bg-teal-50/40 border border-teal-100/80 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start hover:shadow-md hover:border-teal-200 transition-all">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-white border border-teal-100 text-teal-700 flex items-center justify-center shadow-sm">
                <Target className="h-7 w-7" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-outfit font-black text-teal-950 text-xl md:text-2xl tracking-tight">Mission Statement</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-2 max-w-5xl">
                  {(data.mission || []).map((pt: string, i: number) => (
                    <div key={i} className="flex items-start gap-3.5 text-slate-700 font-semibold text-base md:text-[17px] leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Programmes Offered (SEPARATED) */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-11 w-11 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Programmes Offered</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col gap-6">
          <h4 className="font-outfit font-black text-slate-800 text-lg mb-2 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#002147]" /> Specialized Academic Pathways
          </h4>
          <div className="flex flex-col gap-5">
            {(data.programmes || []).map((p: any, idx: number) => (
              <div key={idx} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white border-2 border-slate-100 hover:border-[#002147]/30 p-8 rounded-[2rem] hover:shadow-md transition-all relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#002147] opacity-80 group-hover:opacity-100"></div>
                <div className="flex items-center gap-4 z-10 pl-2">
                  <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] flex items-center justify-center shadow-sm shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h4 className="font-outfit text-xl md:text-2xl font-black text-slate-900 tracking-tight">{p.title}</h4>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 z-10">
                  <div className="bg-[#002147]/5 border border-[#002147]/10 text-[#002147] px-6 py-3.5 rounded-2xl font-bold text-sm md:text-base flex items-center gap-3 shadow-sm min-w-[240px]">
                    <Users className="h-5 w-5 opacity-80 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider font-black opacity-60">Intake Capacity</span>
                      <span className="leading-tight">{p.intake}</span>
                    </div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-900 px-6 py-3.5 rounded-2xl font-bold text-sm md:text-base flex items-center gap-3 shadow-sm min-w-[200px]">
                    <BookOpen className="h-5 w-5 text-emerald-700 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider font-black text-emerald-700 opacity-80">Course Duration</span>
                      <span className="leading-tight">{p.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Faculty Profiles (SEPARATED) */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-11 w-11 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Departmental Faculty</h3>
        </div>

        <div className="bg-slate-50/70 border border-slate-200/70 rounded-[2.5rem] p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="h-20 w-20 shrink-0 rounded-full bg-[#002147] text-white flex items-center justify-center shadow-lg">
            <Users className="h-10 w-10" />
          </div>
          <div className="flex flex-col gap-3 flex-grow">
            <h4 className="font-outfit font-black text-slate-850 text-xl">Qualified Lecturers & Academicians</h4>
            <p className="text-slate-600 font-semibold text-base md:text-lg leading-relaxed max-w-3xl">
              Our faculty consists of highly competent educationists guiding active academic pursuits. Detailed credentials and research listings are accessible in the central directory.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-200/60 flex gap-4 flex-wrap">
              <span className="inline-flex items-center bg-white border border-slate-200 text-[#002147] px-4 py-2 rounded-full text-sm font-black tracking-wide uppercase">NAAC Qualified</span>
              <span className="inline-flex items-center bg-white border border-slate-200 text-[#002147] px-4 py-2 rounded-full text-sm font-black tracking-wide uppercase">Subject Experts</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Value Added Offerings & MoUs */}
      {( (data.valueAddedCourses && data.valueAddedCourses.length > 0) || (data.mous && data.mous.length > 0) ) && (
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
            <div className="h-11 w-11 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Highlights & Industry Collaborations</h3>
          </div>

          <div className="flex flex-col gap-8">
            {data.valueAddedCourses && data.valueAddedCourses.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <span className="font-outfit font-black text-slate-800 text-lg">Value-Added & Professional Offerings</span>
                  <span className="bg-indigo-100 text-indigo-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">Active Curriculum</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-base font-sans">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-black border-b border-slate-200 uppercase tracking-widest text-xs">
                        <th className="py-4 px-8 text-center w-20">S.No</th>
                        <th className="py-4 px-8">Course Title</th>
                        <th className="py-4 px-8 text-center">Duration</th>
                        <th className="py-4 px-8">Collaborating / Guiding Agency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                      {data.valueAddedCourses.map((course: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-5 px-8 text-center text-slate-400 font-black">{course.sNo || i + 1}</td>
                          <td className="py-5 px-8 font-black text-[#002147] text-base">{course.title}</td>
                          <td className="py-5 px-8 text-center text-slate-500">{course.duration || "---"}</td>
                          <td className="py-5 px-8 font-bold text-teal-800">{course.agency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {data.mous && data.mous.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm border border-blue-100 shrink-0">
                      <Handshake className="h-5 w-5" />
                    </div>
                    <h4 className="font-outfit font-black text-slate-850 text-lg">Institutional Partnerships / MoUs</h4>
                  </div>
                  <div className="flex flex-col gap-4">
                    {data.mous.map((mou: any, i: number) => (
                      <div key={i} className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                        <h5 className="font-outfit font-black text-slate-900 text-base md:text-lg mb-2">{mou.title}</h5>
                        <div className="text-sm md:text-base text-slate-600 flex flex-col gap-1 font-semibold">
                          <span><span className="font-black text-slate-450">Type:</span> {mou.type || "MoU"}</span>
                          <span><span className="font-black text-slate-450">Term:</span> {mou.duration}</span>
                          <p className="mt-2 text-[#002147]"><span className="font-black text-slate-450 block mb-1">Objective:</span> {mou.purpose}</p>
                        </div>
                        <span className="inline-flex items-center mt-4 rounded-full bg-emerald-100 border border-emerald-200 px-3.5 py-1 text-xs font-black text-emerald-800 uppercase tracking-wider">Active</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <h4 className="font-outfit font-black text-slate-850 text-lg flex items-center gap-3">
                      <BarChart3 className="h-5 w-5 text-indigo-600" /> Employability Track Records
                    </h4>
                    <p className="text-slate-600 text-base md:text-lg font-semibold leading-relaxed">
                      We consistently log strong results, with highly active employment conversions across registered recruiters. Special emphasis is placed on industrial integration and dynamic skills acquisition.
                    </p>
                  </div>
                  <div className="bg-white shadow-inner rounded-2xl p-5 border border-indigo-100/80 text-center font-black text-[#002147] uppercase tracking-widest text-xs md:text-sm">
                    Active Career Guidance Cell Support
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Best Practices */}
      {data.bestPractices && data.bestPractices.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
            <div className="h-11 w-11 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Quality Assurance & Best Practices</h3>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 bg-white/5 h-80 w-80 rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/20 px-4 py-1.5 text-xs font-black tracking-widest uppercase w-fit text-indigo-100">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Continuous Quality Assessment
                </span>
                <h3 className="font-outfit text-xl md:text-2xl font-black mt-2 tracking-tight">Outcome-Based Education Standards</h3>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed font-semibold max-w-4xl mt-1">
                  Implementing NAAC outcome matrices, emphasizing practical workflows and active societal consciousness. We facilitate local industrial tours, real-time projects, and continuous assessment schemas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {data.bestPractices.map((practice: any, idx: number) => (
                <div key={idx} className="bg-white border-2 border-slate-100 hover:border-indigo-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/40 flex flex-col gap-1">
                    <h4 className="font-outfit text-lg md:text-xl font-black text-[#002147]">{practice.title}</h4>
                    <span className="text-xs uppercase tracking-widest text-indigo-600 font-black">{practice.category}</span>
                  </div>
                  <div className="flex flex-col divide-y divide-slate-100 font-sans">
                    {/* Objectives */}
                    <div className="p-8 md:p-10">
                      <span className="text-xs font-black uppercase tracking-widest text-[#002147]/60 block mb-4 border-l-4 border-[#002147] pl-3">Objectives</span>
                      <ul className="flex flex-col gap-3.5 max-w-4xl">
                        {(practice.objectives || []).map((o: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 font-semibold text-slate-700 text-base md:text-[17px] leading-relaxed">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#002147] mt-2 shrink-0"></span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* The Practice */}
                    <div className="p-8 md:p-10 bg-slate-50/30">
                      <span className="text-xs font-black uppercase tracking-widest text-[#002147]/60 block mb-4 border-l-4 border-[#002147] pl-3">The Practice</span>
                      <ul className="flex flex-col gap-3.5 max-w-4xl">
                        {(practice.practice || []).map((p: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 font-semibold text-slate-700 text-base md:text-[17px] leading-relaxed">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#002147] mt-2 shrink-0"></span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Success */}
                    <div className="p-8 md:p-10 bg-emerald-50/40">
                      <span className="text-xs font-black uppercase tracking-widest text-emerald-800 flex items-center gap-2 mb-4 border-l-4 border-emerald-600 pl-3">
                        <Award className="h-5 w-5 text-emerald-600" /> Evidence of Success
                      </span>
                      <ul className="flex flex-col gap-3.5 max-w-4xl text-emerald-950 font-bold text-base md:text-[18px] leading-relaxed">
                        {(practice.success || []).map((s: string, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. Activities */}
      {data.activities && data.activities.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
            <div className="h-11 w-11 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Activities & Engagement</h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-6 shadow-sm">
            <h4 className="font-outfit font-black text-[#002147] text-lg pb-2 border-b border-slate-100">Core Strategic Activity Pillars</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.activities.map((cat: any, i: number) => (
                <div key={i} className="bg-slate-50/80 border border-slate-200/70 p-6 md:p-8 rounded-3xl flex flex-col gap-3 hover:bg-white hover:shadow-md transition-all">
                  <h4 className="font-outfit font-black text-slate-900 text-base md:text-lg">{cat.label}</h4>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. Facilities & Careers */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-11 w-11 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <Settings className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Facilities & Assets</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Assets */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col gap-6">
            <h4 className="font-outfit font-black text-slate-800 text-xl flex items-center gap-3">
              <Settings className="h-5 w-5 text-[#002147]" /> Physical Infrastructure
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {(data.infrastructure || []).map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3.5 px-5 py-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-800 font-bold text-sm md:text-base shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Progression */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col gap-6">
            <h4 className="font-outfit font-black text-slate-800 text-xl flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-[#002147]" /> Career Pathways
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {(data.careerOpps || []).map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3.5 px-5 py-4 bg-[#002147]/5 border border-[#002147]/10 rounded-2xl text-[#002147] font-bold text-sm md:text-base shadow-sm">
                  <GraduationCap className="h-5 w-5 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Banner */}
      <div className="bg-[#002147]/5 border border-[#002147]/10 rounded-[2.5rem] p-10 md:p-12 flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-12 w-12 rounded-2xl bg-[#002147] text-white flex items-center justify-center shadow-md border border-[#002147]/20">
            <ImageIcon className="h-6 w-6" />
          </div>
          <h4 className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight">Captured Moments & Galleries</h4>
        </div>
        <p className="text-slate-700 text-base md:text-lg font-semibold leading-relaxed max-w-3xl">
          Check memorable highlights of academic summits, co-curricular programs, extension meets and industry visits organized by {data.name}.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 font-outfit mt-2">
          {["Academics", "Skill Labs", "Student Meets", "Outreach"].map((gallery, i) => (
            <div key={i} className="aspect-[4/3] bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 text-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
              <ImageIcon className="h-8 w-8 text-slate-300 group-hover:text-[#002147] transition-colors" />
              <span className="font-bold text-slate-850 text-xs md:text-sm uppercase tracking-wider leading-tight">{gallery}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
