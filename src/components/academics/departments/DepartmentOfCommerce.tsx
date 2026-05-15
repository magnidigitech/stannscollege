"use client";

import { 
  Building, Target, GraduationCap, Briefcase, Award, Handshake, Users, BookOpen, Image as ImageIcon, FileText, CheckCircle2, Compass, HeartHandshake, Trophy, BarChart3, Lightbulb, Settings 
} from "lucide-react";

export function DepartmentOfCommerce() {
  const missionPoints = [
    "To empower students with knowledge, skills, and practical training",
    "To nurture entrepreneurial spirit and enhance employability",
    "To promote learning through doing methodologies",
    "To develop socially responsible individuals with global outlook",
    "To prepare students to meet modern challenges with confidence and competence",
  ];

  const valueAddedCourses = [
    { sNo: 1, title: "Tally & GST Accounting", duration: "40 Hours", dates: "12-08-2025 to 31-08-2025", year: "2025-2026", students: 60, certificate: "Yes", agency: "Nitya Computers" },
    { sNo: 2, title: "Income Tax Practice", agency: "Tax Consultant" },
    { sNo: 3, title: "Banking & Financial Services", agency: "Bank Officials" },
    { sNo: 4, title: "Digital Marketing & E-Commerce", agency: "Industry Trainer" },
    { sNo: 5, title: "Entrepreneurship Development Programme", agency: "ED Cell" },
  ];

  const bestPractices = [
    {
      title: "1. GST & Accounting Practical Training",
      category: "Skill-Oriented Learning Initiative",
      objectives: ["Provide hands-on training in GST & accounting practices", "Enhance employability in accounting, taxation, and finance", "Bridge gap between theoretical knowledge and industry requirements"],
      practice: ["Training in GST concepts, billing, and return filing procedures", "Hands-on sessions using accounting software such as Tally", "Workshops by practicing accountants and tax consultants"],
      success: ["Students gaining practical competency in GST & accounting", "Increased placement opportunities in accounting firms"]
    },
    {
      title: "2. Entrepreneurship & Small Business Development",
      category: "Entrepreneurial Mindset",
      objectives: ["Develop entrepreneurial mindset among students", "Promote self-employment and local business initiatives", "Build leadership and managerial skills"],
      practice: ["Business plan competitions and startup idea presentations", "Workshops on small business management and digital marketing", "Interaction with local entrepreneurs and women business owners"],
      success: ["Students presenting innovative business ideas", "Alumni initiating small business ventures"]
    },
    {
      title: "3. Financial Literacy & Community Outreach Programme",
      category: "Social Responsibility",
      objectives: ["Promote financial awareness in rural communities", "Educate students on practical financial management", "Encourage social responsibility"],
      practice: ["Conducting financial literacy camps in nearby villages", "Awareness programmes on savings, budgeting, and digital payments", "Student participation in outreach and extension activities"],
      success: ["Increased awareness among community participants", "Active student involvement in outreach programmes"]
    }
  ];

  const infrastructure = [
    "Commerce Lab / Computer Lab",
    "ICT-enabled classrooms",
    "Library resources (books, journals)",
    "Internet & digital learning facilities"
  ];

  const careerOpps = [
    "Accounting & Taxation",
    "Banking & Finance",
    "Entrepreneurship",
    "Higher Education (M.Com, MBA, CA, etc.)"
  ];

  return (
    <div className="flex flex-col gap-12 animate-fadeIn font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#002147] to-[#0b4b96] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Building className="h-[400px] w-[400px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-3 md:max-w-3xl">
          <span className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider bg-white/15 backdrop-blur px-4 py-1.5 rounded-full w-fit">
            Established 1997-98
          </span>
          <h2 className="font-outfit text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Department of Commerce
          </h2>
          <p className="text-blue-100/90 font-medium text-sm md:text-base mt-2 italic">
            “Commerce Wonder World – Emphasizing Holistic Student Development”
          </p>
        </div>
      </div>

      {/* 2. About the Department Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="h-9 w-9 rounded-xl bg-[#002147]/5 text-[#002147] flex items-center justify-center">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-xl font-black text-[#002147]">About & Vision</h3>
        </div>
        
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
          <div>
            <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">
              The Department of Commerce was established in the academic year 1997–98 in response to the growing demand for commerce education. It initially offered the B.Com (General) programme and later introduced the restructured curriculum in 1999–2000, aligning with evolving academic and industry needs.
            </p>
            <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base mt-4">
              The department is committed to delivering quality education with a strong practical orientation, preparing students for careers in business, finance, entrepreneurship, and research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-2xl p-6 flex flex-col gap-3 hover:shadow-sm transition-all">
              <div className="h-10 w-10 rounded-xl bg-white border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-outfit font-black text-indigo-950 text-base mb-2">Vision</h4>
                <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed">
                  To achieve academic excellence with a strong commitment to providing quality education in commerce, management, and related fields, while fostering a holistic approach towards life, environment, and global competitiveness.
                </p>
              </div>
            </div>

            <div className="bg-teal-50/40 border border-teal-100/50 rounded-2xl p-6 flex flex-col gap-3 hover:shadow-sm transition-all">
              <div className="h-10 w-10 rounded-xl bg-white border border-teal-100 text-teal-700 flex items-center justify-center shadow-sm">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-outfit font-black text-teal-950 text-base mb-2">Mission</h4>
                <div className="flex flex-col gap-2">
                  {missionPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600 font-medium text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Programmes Offered & Faculty Details */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="h-9 w-9 rounded-xl bg-[#002147]/5 text-[#002147] flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-xl font-black text-[#002147]">Programmes & Faculty</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-4 bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
            <h4 className="font-outfit font-black text-slate-800 text-base mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#002147]" /> Academic Portfolios
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#002147]/5 border border-[#002147]/10 p-5 rounded-2xl flex flex-col gap-2">
                <h4 className="font-outfit text-sm md:text-base font-black text-[#002147]">B.Com Honours (General)</h4>
                <div className="flex flex-col text-[11px] md:text-xs text-slate-600 font-semibold mt-1">
                  <span>Intake: 20 (14 Convener + 6 Management)</span>
                  <span>Duration: 3 Years (6 Semesters)</span>
                </div>
              </div>
              <div className="bg-teal-50 border border-teal-100 p-5 rounded-2xl flex flex-col gap-2">
                <h4 className="font-outfit text-sm md:text-base font-black text-teal-950">B.Com Honours (Comp Apps)</h4>
                <div className="flex flex-col text-[11px] md:text-xs text-slate-700 font-semibold mt-1">
                  <span>Intake: 80 (56 Convener + 24 Management)</span>
                  <span>Duration: 3 Years (6 Semesters)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center text-center gap-2 relative overflow-hidden">
            <Users className="h-8 w-8 text-slate-300 mb-1" />
            <h4 className="font-outfit font-black text-slate-700 text-sm">Faculty Directory</h4>
            <p className="text-slate-400 font-medium text-[11px] leading-relaxed max-w-[200px]">
              Visit Key Functionaries in About Us or contact department for comprehensive profiles.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Value Added Courses & MoUs */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="h-9 w-9 rounded-xl bg-[#002147]/5 text-[#002147] flex items-center justify-center">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-xl font-black text-[#002147]">Highlights & MoUs</h3>
        </div>

        <div className="flex flex-col gap-6">
          {/* Table Container */}
          <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="font-outfit font-black text-slate-800 text-sm">Value-Added / Certificate Offerings</span>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">Active Curriculum</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm font-sans">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider">
                    <th className="py-3 px-6 text-center w-16">S.No</th>
                    <th className="py-3 px-6">Course Title</th>
                    <th className="py-3 px-6 text-center">Duration</th>
                    <th className="py-3 px-6">Collaborating Agency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {valueAddedCourses.map((course) => (
                    <tr key={course.sNo} className="hover:bg-slate-50/60 transition-colors text-slate-700">
                      <td className="py-3.5 px-6 text-center text-slate-400 font-bold">{course.sNo}</td>
                      <td className="py-3.5 px-6 font-bold">{course.title}</td>
                      <td className="py-3.5 px-6 text-center text-slate-500">{course.duration || "---"}</td>
                      <td className="py-3.5 px-6 font-semibold text-[#002147]">{course.agency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                  <Handshake className="h-4 w-4" />
                </div>
                <h4 className="font-outfit font-black text-slate-800 text-sm">Institutional Partnerships</h4>
              </div>
              <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100/50">
                <h5 className="font-sans font-bold text-slate-800 text-xs md:text-sm mb-1">ABC Chartered Accountants Firm</h5>
                <div className="text-[11px] text-slate-500 flex flex-col gap-1 mt-2 font-medium">
                  <span><span className="font-bold">Type:</span> MoU</span>
                  <span><span className="font-bold">Duration:</span> 3 Years</span>
                  <span><span className="font-bold">Purpose:</span> GST & Accounting Training</span>
                </div>
                <span className="inline-flex items-center mt-3 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">Active</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="font-outfit font-black text-slate-800 text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-indigo-600" /> Results & Job Placements
                </h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  The department consistently records robust academic pass percentages and successful job placement summaries across prominent local and national employers.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-center text-[10px] font-black text-[#002147] uppercase tracking-wider">
                Focus on Women Empowerment & Employability
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Best Practices */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="h-9 w-9 rounded-xl bg-[#002147]/5 text-[#002147] flex items-center justify-center">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-xl font-black text-[#002147]">Best Practices</h3>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-indigo-950 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-900/30 h-60 w-60 rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wider uppercase w-fit">NAAC Compliance Alignment</span>
              <h3 className="font-outfit text-base md:text-lg font-black mt-1">Outcome-Based Education Framework</h3>
              <p className="text-indigo-200 text-xs md:text-sm leading-relaxed font-medium">
                Adopts need-based, skill-oriented, and socially relevant practices. We emphasize experiential learning, professional employability, and rural community engagement suited to Guntur’s context.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {bestPractices.map((practice, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:border-indigo-100 transition-all">
                <div className="p-5 border-b border-slate-100 bg-slate-50/40 flex flex-col gap-0.5">
                  <h4 className="font-outfit text-sm md:text-base font-black text-[#002147]">{practice.title}</h4>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-black">{practice.category}</span>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block mb-2.5">Objectives</span>
                    <ul className="flex flex-col gap-2 text-xs text-slate-600 font-medium">
                      {practice.objectives.map((o, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="h-1 w-1 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 block mb-2.5">The Practice</span>
                    <ul className="flex flex-col gap-2 text-xs text-slate-600 font-medium">
                      {practice.practice.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="h-1 w-1 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/30 h-fit">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block mb-2 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-emerald-600" /> Evidence of Success
                    </span>
                    <ul className="flex flex-col gap-1.5 text-xs text-emerald-900/80 font-semibold leading-tight">
                      {practice.success.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="h-1 w-1 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
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

      {/* 6. Activities & Success Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="h-9 w-9 rounded-xl bg-[#002147]/5 text-[#002147] flex items-center justify-center">
            <Trophy className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-xl font-black text-[#002147]">Activities & Success</h3>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
            <h4 className="font-outfit font-black text-[#002147] text-sm border-b border-slate-50 pb-2">Category-wise Strategic Pillars</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Academic Enrichment", desc: "Seminars, guest lectures, and workshops on accounting, taxation, and finance." },
                { label: "Skill Development", desc: "Tally & GST training sessions, and interview preparation workshops." },
                { label: "Student-Centric", desc: "Business quizzes, debates, commerce exhibitions and project displays." },
                { label: "Extension & Outreach", desc: "Financial literacy programmes and consumer awareness campaigns in rural areas." },
                { label: "Industry Interaction", desc: "Industrial visits, internships and interaction sessions with entrepreneurs." }
              ].map((cat, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200/50 p-5 rounded-2xl flex flex-col gap-2">
                  <h4 className="font-outfit font-black text-slate-800 text-xs md:text-sm">{cat.label}</h4>
                  <p className="text-slate-500 text-[10px] md:text-[11px] leading-relaxed font-medium">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex items-center justify-between gap-6 flex-wrap">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-widest font-black text-indigo-600">Flagship Training Record</span>
              <h4 className="font-outfit font-black text-slate-800 text-sm md:text-base">Workshop on GST & Tax Filing (Led by Registered CAs)</h4>
            </div>
            <span className="bg-[#002147]/5 border border-[#002147]/10 text-[#002147] text-[11px] font-black px-4 py-2 rounded-xl shrink-0 flex items-center gap-2">
              <Users className="h-3.5 w-3.5" /> 80+ Core Participants
            </span>
          </div>
        </div>
      </div>

      {/* 7. Infrastructure & Careers */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="h-9 w-9 rounded-xl bg-[#002147]/5 text-[#002147] flex items-center justify-center">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-xl font-black text-[#002147]">Facilities & Careers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
            <h4 className="font-outfit font-black text-slate-800 text-base flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#002147]" /> Facilities & Assets
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {infrastructure.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-bold text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
            <h4 className="font-outfit font-black text-slate-800 text-base flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-[#002147]" /> Progression Pathways
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {careerOpps.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-3 bg-[#002147]/5 border border-[#002147]/10 rounded-xl text-[#002147] font-bold text-xs">
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 8. Photo Highlights Section */}
      <div className="bg-[#002147]/5 border border-[#002147]/10 rounded-[2rem] p-8 md:p-10 flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-2xl bg-[#002147] text-white flex items-center justify-center shadow-md">
            <ImageIcon className="h-5 w-5" />
          </div>
          <h4 className="font-outfit text-lg font-black text-[#002147]">Photo Gallery Highlights</h4>
        </div>
        <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-3xl mb-4">
          Memorable captures of academic, co-curricular, and extension milestones. Includes global seminars, GST workshops, industry tours, and student-led exhibitions.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-outfit">
          {["Academic Activities", "Skill & Training", "Student Activities", "Extension & Outreach"].map((gallery, i) => (
            <div key={i} className="aspect-[4/3] bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col items-center justify-center p-4 text-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
              <ImageIcon className="h-6 w-6 text-slate-300 group-hover:text-[#002147] transition-colors" />
              <span className="font-bold text-slate-700 text-[11px] leading-tight">{gallery}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

