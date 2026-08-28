import React from "react";
import { Users, Award, ShieldCheck, Landmark, GraduationCap, Briefcase, FileText } from "lucide-react";

interface LeaderRow {
  sNo: number;
  name: string;
  qualifications: string;
  duration: string;
  designation?: string;
}

const presidents: LeaderRow[] = [
  { sNo: 1, name: "Rev. Mother Mary Ignatius Layola Mekala (Late)", qualifications: "M.Sc, B.Ed", duration: "1997 - 2002" },
  { sNo: 2, name: "Rev. Mother Fatima Mary Boyapati", qualifications: "M.Sc, B.Ed", duration: "2003 - 2014" },
  { sNo: 3, name: "Rev. Mother Anthonamma Pyreddy", qualifications: "M.Sc, B.Ed", duration: "2015 - Present" },
];

const secretaries: LeaderRow[] = [
  { sNo: 1, name: "Dr. Sr. Fatima Mary Rani P", qualifications: "MA, M.Phil, Ph.D", duration: "2010 - 2016" },
  { sNo: 2, name: "Rev. Ratna Mary Raya", qualifications: "M.Sc, B.Ed", duration: "2016 - 2021" },
  { sNo: 3, name: "Dr. Sr. Thumma Theresamma", qualifications: "M.Sc, Ph.D", duration: "2022 - Present" },
];

const correspondents: LeaderRow[] = [
  { sNo: 1, name: "Dr. Sr. Amrutha P", qualifications: "M.Sc, Ph.D", duration: "1997 - 2001" },
  { sNo: 2, name: "Dr. Sr. Fatima Mary Rani P", qualifications: "MA, M.Phil, Ph.D", duration: "2001 - 2007" },
  { sNo: 3, name: "Dr. Sr. Anthony Mary K", qualifications: "M.Sc, B.Ed, Ph.D", duration: "2010 - 2014" },
  { sNo: 4, name: "Sr. Inyasamma Y (Mary of the Cross)", qualifications: "M.Ed, M.Phil", duration: "2010 - 2014" },
  { sNo: 5, name: "Dr. Sr. Anthony Mary K", qualifications: "M.Sc, B.Ed, Ph.D", duration: "2014 - 2016" },
  { sNo: 6, name: "Dr. Sr. Fatima Mary Rani P", qualifications: "MA, M.Phil, Ph.D", duration: "2016 - Present" },
];

const principals: LeaderRow[] = [
  { sNo: 1, name: "Dr. Sr. Amrutha P", qualifications: "M.Sc, Ph.D", duration: "1997 - 2001" },
  { sNo: 2, name: "Dr. Sr. Fatima Mary Rani P", qualifications: "MA, M.Phil, Ph.D", duration: "2001 - 2007" },
  { sNo: 3, name: "Dr. Sr. Anthony Mary K", qualifications: "M.Sc, B.Ed, Ph.D", duration: "2010 - 2014" },
  { sNo: 4, name: "Sr. Inyasamma Y (Mary of the Cross)", qualifications: "M.Ed, M.Phil", duration: "2010 - 2014" },
  { sNo: 5, name: "Dr. Sr. Anthony Mary K", qualifications: "M.Sc, B.Ed, Ph.D", duration: "2014 - 2016" },
  { sNo: 6, name: "Dr. Sr. Fatima Mary Rani P", qualifications: "MA, M.Phil, Ph.D", duration: "2016 - 2024" },
  { sNo: 7, name: "Dr. Sr. Sandhya Thumma", qualifications: "MBA, M.Com, M.Ed, Ph.D", duration: "26-06-2024 - Present" },
];

const administrators: LeaderRow[] = [
  { sNo: 1, name: "Sr. Anila Tirumala Reddy", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 2, name: "Sr. Vimala / Mary Auxilia", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 3, name: "Sr. Rose Merly", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 4, name: "Sr. Shiny Joseph", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 5, name: "Sr. Mary Brigit (Late)", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 6, name: "Sr. Sandhya T", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 7, name: "Sr. Nirmala Pushpa Kumari K", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 8, name: "Sr. B. Santha Kumari / Nirupama", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 9, name: "Sr. Joseph Showrilu", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 10, name: "Sr. Vanga Lakshmi Jyothi V", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 11, name: "Sr. Amitha Allam", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 12, name: "Sr. G. Margaret Priyanka", qualifications: "—", designation: "Administrator", duration: "" },
  { sNo: 13, name: "Sr. Jesintha Irudayasamy", qualifications: "—", designation: "Administrator", duration: "" },
];

function LeaderTable({ data, isAdmin }: { data: LeaderRow[]; isAdmin?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-xs md:text-sm">
        <thead className="bg-slate-50 font-outfit">
          <tr>
            <th scope="col" className="px-4 py-3.5 font-bold text-slate-800 text-center w-16">S. No</th>
            <th scope="col" className="px-6 py-3.5 font-bold text-slate-800">Name</th>
            {!isAdmin && <th scope="col" className="px-6 py-3.5 font-bold text-slate-800">Qualifications</th>}
            {isAdmin && <th scope="col" className="px-6 py-3.5 font-bold text-slate-800">Designation</th>}
            {!isAdmin && <th scope="col" className="px-6 py-3.5 font-bold text-slate-800">Duration</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-sans text-slate-600">
          {data.map((row) => (
            <tr key={row.sNo} className="hover:bg-slate-50/50 transition-colors duration-150">
              <td className="px-4 py-3 text-center font-bold text-[#002147]">{row.sNo}</td>
              <td className="px-6 py-3 font-semibold text-slate-800">{row.name}</td>
              {!isAdmin && <td className="px-6 py-3 font-medium text-slate-500">{row.qualifications}</td>}
              {isAdmin && <td className="px-6 py-3 font-bold text-emerald-600">{row.designation}</td>}
              {!isAdmin && <td className="px-6 py-3 font-bold text-indigo-600">{row.duration}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegacyOfLeadership() {
  return (
    <div className="flex flex-col gap-10 font-sans select-none animate-fadeIn">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#0f172a] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-3xl bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 text-indigo-100 shadow-inner">
              <Landmark className="h-8 w-8 md:h-10 md:w-10 text-indigo-200" />
            </span>
            <div className="text-center md:text-left">
              <h2 className="mt-3 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight">
                A Legacy of Leadership
              </h2>
              <p className="text-xs font-medium text-slate-300 mt-1.5 max-w-xl leading-relaxed">
                Our institution&apos;s journey is shaped by the dedication and vision of its remarkable leaders. We proudly acknowledge the contributions of our former presidents, correspondents, principals, and administrators who have guided the college toward excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Presidential Guidance */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-indigo-600" /> Presidential Guidance
        </h3>
        <p className="text-slate-500 font-sans text-xs md:text-sm leading-relaxed mb-6 font-normal">
          The highest office of guidance has been held with great distinction by our Presidents, directing the overarching spiritual, structural, and educational growth of St. Ann&apos;s College.
        </p>
        <LeaderTable data={presidents} />
      </div>

      {/* 2. College Secretaries */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" /> College Secretaries / Provincial Superiors
        </h3>
        <p className="text-slate-500 font-sans text-xs md:text-sm leading-relaxed mb-6 font-normal">
          Our College Secretaries and Provincial Superiors play a central role in managing statutory relations, structural administration, and strategic resource allocation.
        </p>
        <LeaderTable data={secretaries} />
      </div>

      {/* 3. Correspondents */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-indigo-600" /> Correspondents
        </h3>
        <p className="text-slate-500 font-sans text-xs md:text-sm leading-relaxed mb-6 font-normal">
          The correspondents have played a crucial role in steering the institution&apos;s vision and governance. With their guidance and strategic direction, the college has grown in strength, reputation, and purpose.
        </p>
        <LeaderTable data={correspondents} />
      </div>

      {/* 4. Principals */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-indigo-600" /> Principals
        </h3>
        <p className="text-slate-500 font-sans text-xs md:text-sm leading-relaxed mb-6 font-normal">
          Our principals have been the academic pillars of the institution, fostering excellence in education and nurturing generations of students. Their leadership, wisdom, and commitment have laid a strong foundation for our continued success.
        </p>
        <LeaderTable data={principals} />
      </div>

      {/* 5. Administrators */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" /> Administrators
        </h3>
        <p className="text-slate-500 font-sans text-xs md:text-sm leading-relaxed mb-6 font-normal">
          Our administrators have been the backbone of efficient functioning, ensuring smooth operations and supporting both academic and institutional development. Their dedication has helped sustain a culture of discipline, organization, and progress.
        </p>
        <LeaderTable data={administrators} isAdmin />
      </div>
    </div>
  );
}
