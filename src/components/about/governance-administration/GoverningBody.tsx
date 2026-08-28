"use client";

import { ShieldCheck, Award, GraduationCap, CheckCircle, Eye, Download, Info, Landmark, Users } from "lucide-react";

export function GoverningBody() {
  const societyMembers = [
    { id: 1, name: "Sr Anthonamma Pyreddy", designation: "President" },
    { id: 2, name: "Sr Kommareddy Anthonamma", designation: "Vice President" },
    { id: 3, name: "Sr Y Theresamma", designation: "General Bursar" },
    { id: 4, name: "Sr. Aduri Anitha Mary", designation: "General Secretary" },
    { id: 5, name: "Sr Tirumalareddy Alphonsa", designation: "Executive Member" },
    { id: 6, name: "Sr Rachamalla Suman kumari", designation: "Executive Member" },
    { id: 7, name: "Sr Reena V", designation: "Executive Member" },
    { id: 8, name: "Sr. Fatima Mary B", designation: "Executive Member" },
    { id: 9, name: "Sr. Medabalimi Raymund", designation: "Executive Member" }
  ];

  const dieckmannMembers = [
    { id: 1, name: "Sr Anthonamma Pyreddy", designation: "President", occupation: "Superior General" },
    { id: 2, name: "Dr. Sr. Thumma Theresamma", designation: "Secretary", occupation: "Provincial Superior" },
    { id: 3, name: "Dr. Sr. Fatima Rani P", designation: "Executive Member", occupation: "Correspondent" },
    { id: 4, name: "Sr Sandhya Thumma", designation: "Vice President", occupation: "Principal" },
    { id: 5, name: "Sr. Margaret Priyanka", designation: "Treasurer", occupation: "Lecturer" },
    { id: 6, name: "Sr Josephe Showrilu", designation: "Executive Member", occupation: "Lecturer" },
    { id: 7, name: "Sr. Lourdamma Pyreddy", designation: "Executive Member", occupation: "Office" },
    { id: 8, name: "Sr Irudayasamy Jesintha", designation: "Executive Member", occupation: "Accountant" }
  ];

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Governing Body
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              The Society of St. Anne, Phirangipuram, traces its roots to the 19th century visionary <strong className="text-white font-bold">Mother Thatipatri Gnanamma</strong>. Grounded in this legacy, the institution follows a multi-tiered governance model to fulfill academic goals with absolute integrity.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Landmark className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Narrative Section 1: Legacy & Evolution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Legacy */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <Landmark className="h-5 w-5 text-indigo-600" /> Legacy of Empowerment
          </h4>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
            Mother Gnanamma established the first school exclusively for girls in 1863, setting off the primary catalyst for deep social transformation:
          </p>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-600 font-normal">
            <li className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Founded in 1874 specifically to empower women through education.</span>
            </li>
            <li className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Evolved to receive <strong className="text-indigo-600">Pontifical Status</strong> from Pope John Paul II in 1999.</span>
            </li>
            <li className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Administrative units elevated to Provinces in 2008 for enhanced growth.</span>
            </li>
          </ul>
        </div>

        {/* Visionary Leadership */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-600" /> Visionary Governing Structure
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              To guarantee focused administrative efficiency, operations follow structured administrative tiers:
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 font-normal">
              <li className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                <span><strong className="text-slate-800">Apex Body</strong> - Overarching legal framework & overarching values.</span>
              </li>
              <li className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                <span><strong className="text-slate-800">Primary Operating Authority</strong> - Budget approvals & statutory compliance.</span>
              </li>
              <li className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                <span><strong className="text-slate-800">Institutional Management</strong> - Academic administration & student development.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Society Members Table Block */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-1 flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" /> Society of St. Anne Governing Members
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6">
          Registered Society No. 67 of 1972 (Apex Body).
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm select-none">
            <thead className="bg-slate-50/60">
              <tr className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                <th className="px-5 py-4">S. No</th>
                <th className="px-5 py-4">Name of the Member</th>
                <th className="px-5 py-4">Designation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {societyMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-400">{member.id}</td>
                  <td className="px-5 py-3.5 font-black text-slate-800">{member.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50/50 hover:bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider transition-colors">
                      {member.designation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dieckmann Convent Operating Board Table Block */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-1 flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" /> Dieckmann Convent Operating Authority
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6">
          Registered Society No. 157 of 2020 (Primary Operating Authority).
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm select-none">
            <thead className="bg-slate-50/60">
              <tr className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                <th className="px-5 py-4">S. No</th>
                <th className="px-5 py-4">Name of the Member</th>
                <th className="px-5 py-4">Designation</th>
                <th className="px-5 py-4">Occupation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {dieckmannMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-400">{member.id}</td>
                  <td className="px-5 py-3.5 font-black text-slate-800">{member.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50/50 hover:bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider transition-colors">
                      {member.designation}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-500">{member.occupation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
