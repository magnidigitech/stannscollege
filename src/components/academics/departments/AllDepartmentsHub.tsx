"use client";

import React from "react";
import Link from "next/link";
import { Building, GraduationCap, ArrowRight, Sparkles, BookOpen } from "lucide-react";

interface DepartmentCardData {
  id: string;
  name: string;
  shortName: string;
  quote: string;
  imageUrl: string;
  established?: string;
}

const departmentHubCards: DepartmentCardData[] = [
  {
    id: "department-of-commerce",
    name: "Department of Commerce",
    shortName: "Commerce",
    quote: "“The Department of Commerce is committed to imparting quality education in commerce, accounting, finance, taxation and business management.”",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
    established: "1997"
  },
  {
    id: "department-of-computer-science-applications",
    name: "Department of Computer Science & Applications",
    shortName: "Computer Science",
    quote: "“Innovating algorithms, transforming software, and shaping the digital future with computational excellence.”",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
    established: "1997"
  },
  {
    id: "department-of-mathematics",
    name: "Department of Mathematics",
    shortName: "Mathematics",
    quote: "“The poetry of logical ideas and the universal language of science and abstract truth.”",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800",
    established: "1997"
  },
  {
    id: "department-of-physics",
    name: "Department of Physics",
    shortName: "Physics",
    quote: "“Exploring the fundamental laws governing matter, energy, light, and the cosmos.”",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800",
    established: "1997"
  },
  {
    id: "department-of-statistics",
    name: "Department of Statistics",
    shortName: "Statistics",
    quote: "“Transforming raw data into predictive insight, probability, and actionable truth.”",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    established: "1997"
  },
  {
    id: "department-of-biotechnology",
    name: "Department of Biotechnology",
    shortName: "Biotechnology",
    quote: "“Harnessing cellular and biomolecular processes for scientific advancement and human health.”",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800",
    established: "2003"
  },
  {
    id: "department-of-microbiology",
    name: "Department of Microbiology",
    shortName: "Microbiology",
    quote: "“Unveiling the microscopic realm of microorganisms that sustains and protects life.”",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800",
    established: "2003"
  },
  {
    id: "department-of-botany",
    name: "Department of Botany",
    shortName: "Botany",
    quote: "“Nurturing botanical biodiversity, plant science, ecology, and sustainable ecosystems.”",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800",
    established: "1997"
  },
  {
    id: "department-of-chemistry",
    name: "Department of Chemistry",
    shortName: "Chemistry",
    quote: "“Decoding molecular structures, synthesis, and catalyzing chemical innovations.”",
    imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=800",
    established: "1997"
  },
  {
    id: "department-of-english",
    name: "Department of English",
    shortName: "English",
    quote: "“To delight and to instruct is the end of all learning – François Rabelais”",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800",
    established: "1997"
  },
  {
    id: "department-of-oriental-languages",
    name: "Department of Oriental Languages",
    shortName: "Oriental Languages",
    quote: "“Desa Bhashalandu Telugu Lessa – Preserving classical languages, culture, and rich heritage.”",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800",
    established: "1997"
  },
  {
    id: "department-of-mca",
    name: "Department of MCA",
    shortName: "Master of Computer Applications",
    quote: "“Architecting enterprise software solutions, cloud systems, and computational intelligence.”",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
    established: "2001"
  },
  {
    id: "department-of-mba",
    name: "Department of MBA",
    shortName: "Master of Business Administration",
    quote: "“Cultivating visionary executives, strategic minds, and transformative business leaders.”",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    established: "2008"
  }
];

export function AllDepartmentsHub() {
  return (
    <div className="flex flex-col gap-8 animate-fadeIn font-sans pb-12">
      {/* Site-wide Clean Header */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Building className="h-3.5 w-3.5 text-[#002147]" /> Academic Department Overview
        </span>
        <h1 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-black text-[#002147] tracking-tight">
          Academic Departments
        </h1>
        <div className="h-1 w-16 bg-[#002147] rounded-full mt-1"></div>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-3xl leading-relaxed mt-1">
          Explore our specialized academic departments across Sciences, Commerce &amp; Management, Computing, and Languages, driving experiential learning, research orientation, and student achievement.
        </p>
      </div>

      {/* Grid of 13 Department Cards matching Image 2 style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {departmentHubCards.map((dept) => (
          <Link
            key={dept.id}
            href={`/academics/departments/${dept.id}`}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[16/10] sm:aspect-[16/10] flex flex-col justify-between p-6 sm:p-7 border border-slate-700/20 bg-slate-950"
          >
            {/* Subject Related Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dept.imageUrl}
              alt={dept.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-80 group-hover:opacity-100"
            />

            {/* Dark Gradient Overlay for readability - dissolves on hover so darkening effect disappears */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 group-hover:opacity-0 transition-opacity duration-300" />

            {/* Top Content: Department Name & Authentic Quote */}
            <div className="relative z-10 flex flex-col gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              <h3 className="font-outfit text-xl sm:text-2xl font-black text-white tracking-wide leading-tight group-hover:text-blue-100 transition-colors">
                {dept.shortName}
              </h3>
              <p className="text-slate-100 text-xs sm:text-sm font-medium leading-relaxed line-clamp-3">
                {dept.quote}
              </p>
            </div>

            {/* Bottom Content: "View More" Button */}
            <div className="relative z-10 pt-3">
              <span className="inline-flex items-center justify-center border-2 border-white text-white group-hover:bg-white group-hover:text-slate-950 px-4 py-1.5 rounded-lg text-xs font-bold transition-all w-fit uppercase tracking-wider shadow-md">
                View More
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
