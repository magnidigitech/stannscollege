import React from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Database, 
  GraduationCap, 
  Award, 
  FileText, 
  Lightbulb, 
  Briefcase, 
  ShieldCheck, 
  Rocket, 
  ArrowRight 
} from "lucide-react";

const categories = [
  {
    title: "I. Policy & Infrastructure",
    description: "The foundations of research guidelines, core facilities, active supervisors, and specialized hubs of excellence.",
    items: [
      {
        text: "Research Development Cell",
        slug: "research-development-cell",
        desc: "Promoting a vibrant research culture, academic excellence, ethical practices, and societal contribution.",
        icon: BookOpen,
        color: "from-blue-500/10 to-indigo-500/10 hover:border-blue-500/30",
        iconColor: "text-blue-600"
      },
      {
        text: "Research Infrastructure",
        slug: "research-infrastructure",
        desc: "Modern research laboratories, high-end equipment, and specialized databases supporting academic inquiry.",
        icon: Database,
        color: "from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/30",
        iconColor: "text-emerald-600"
      },
      {
        text: "Supervisors & Scholars",
        slug: "research-supervisors-scholars",
        desc: "Profiles of recognized research supervisors and scholars pursuing doctoral research at the institution.",
        icon: GraduationCap,
        color: "from-violet-500/10 to-purple-500/10 hover:border-violet-500/30",
        iconColor: "text-violet-600"
      },
      {
        text: "Centres of Excellence",
        slug: "centres-of-excellence",
        desc: "Multidisciplinary hubs focusing on advanced research areas to foster cutting-edge research outputs.",
        icon: Award,
        color: "from-amber-500/10 to-orange-500/10 hover:border-amber-500/30",
        iconColor: "text-amber-600"
      }
    ]
  },
  {
    title: "II. Outputs & Grants",
    description: "Track records of peer-reviewed publications, patent publications, and external research grants.",
    items: [
      {
        text: "Research Publications",
        slug: "research-publications",
        desc: "A compiled directory of research publications in UGC CARE, Scopus, and peer-reviewed journals.",
        icon: FileText,
        color: "from-cyan-500/10 to-blue-500/10 hover:border-cyan-500/30",
        iconColor: "text-cyan-600"
      },
      {
        text: "Patents & Innovations",
        slug: "patents-innovations",
        desc: "Fostering creative designs, product prototypes, and patent filings across all departments.",
        icon: Lightbulb,
        color: "from-yellow-500/10 to-amber-500/10 hover:border-yellow-500/30",
        iconColor: "text-yellow-600"
      },
      {
        text: "Funded Projects",
        slug: "funded-projects",
        desc: "Details of ongoing and completed minor/major projects funded by external academic agencies.",
        icon: Briefcase,
        color: "from-rose-500/10 to-pink-500/10 hover:border-rose-500/30",
        iconColor: "text-rose-600"
      }
    ]
  },
  {
    title: "III. Innovation & IPR",
    description: "Nurturing startup mindset, managing intellectual property rights, and promoting campus entrepreneurship.",
    items: [
      {
        text: "Intellectual Property Cell",
        slug: "ipr-cell",
        desc: "Managing intellectual property rights, patent awareness workshops, and copyright clearance procedures.",
        icon: ShieldCheck,
        color: "from-indigo-500/10 to-violet-500/10 hover:border-indigo-500/30",
        iconColor: "text-indigo-600"
      },
      {
        text: "Institution Innovation Cell",
        slug: "institution-innovation-cell",
        desc: "Encouraging a collaborative ecosystem of student innovation challenges, project expos, and startup ideas.",
        icon: Rocket,
        color: "from-teal-500/10 to-emerald-500/10 hover:border-teal-500/30",
        iconColor: "text-teal-600"
      },
      {
        text: "Entrepreneurship Development",
        slug: "entrepreneurship-development",
        desc: "Supporting the startup mindset and student incubation opportunities in modern areas of business.",
        icon: Briefcase,
        color: "from-fuchsia-500/10 to-rose-500/10 hover:border-fuchsia-500/30",
        iconColor: "text-fuchsia-600"
      }
    ]
  }
];

export const ResearchInnovationLanding = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#002147] to-[#0b3360] p-8 md:p-12 text-white shadow-md">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl flex flex-col gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
            Overview & Hub
          </span>
          <h2 className="font-outfit text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Research & Innovation
          </h2>
          <p className="text-blue-100/90 text-sm md:text-base leading-relaxed font-medium">
            St. Ann's College for Women is committed to promoting a vibrant research culture. 
            Explore our policies, infrastructure, publications, patents, and incubation units 
            designed to foster academic inquiry and entrepreneurial excellence.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="flex flex-col gap-12">
        {categories.map((category, catIdx) => (
          <div key={catIdx} className="flex flex-col gap-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight">
                {category.title}
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item, itemIdx) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={itemIdx}
                    href={`/research-innovation/${item.slug}`}
                    className={`group border border-slate-100 rounded-3xl p-6 bg-gradient-to-br ${item.color} shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between gap-6 cursor-pointer`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-white rounded-2xl shadow-xs group-hover:scale-110 transition-transform ${item.iconColor}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-outfit font-black text-slate-800 text-lg leading-snug group-hover:text-[#002147] transition-colors">
                          {item.text}
                        </h4>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#002147] self-end group-hover:gap-2.5 transition-all">
                      <span>Explore Section</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
