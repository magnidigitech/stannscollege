"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  BookOpen,
  FlaskConical,
  FileText,
  Award,
  Users,
  Globe,
  Download,
  ExternalLink,
  ChevronRight,
  Link2,
  Building2,
  Microscope,
  ClipboardList,
  BookMarked,
  Trophy,
  Target,
  Network,
  Languages,
  Star,
  ArrowLeft,
  Shield,
  Lightbulb,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Publication {
  publicationTitle: string;
  journalName: string;
  publicationType: string;
  authors: string;
  year: string;
  volumeIssuePages: string;
  doiLink?: string;
  indexing: string;
  publicationPdfUrl?: string;
}

interface FacultyProfile {
  facultyName: string;
  slug: string;
  profilePhotoUrl?: string;
  designation: string;
  department: string;
  facultyId?: string;
  gender?: string;
  dateOfBirth?: string;
  dateOfJoining?: string;
  employmentType?: string;
  officialEmail?: string;
  contactNumber?: string;
  officeLocation?: string;
  facultyStatus?: string;
  highestQualification?: string;
  qualifications?: any[];
  totalExperience?: string;
  teachingExperience?: string;
  industryExperience?: string;
  professionalExperience?: any[];
  shortBio?: string;
  careerObjective?: string;
  teachingPhilosophy?: string;
  areaOfExpertise?: string[];
  languagesKnown?: string[];
  subjectsHandled?: any[];
  researchAreas?: string[];
  researchInterests?: string;
  ongoingProjects?: any[];
  completedProjects?: any[];
  publications?: Publication[];
  booksPublished?: any[];
  patents?: any[];
  conferencesAttended?: any[];
  seminarsAttended?: any[];
  fdpsAttended?: any[];
  workshopsAttended?: any[];
  awards?: any[];
  currentAdministrativeRole?: string;
  departmentResponsibilities?: any[];
  committeeMemberships?: any[];
  projectsGuided?: any[];
  researchScholars?: any[];
  professionalMemberships?: any[];
  linkedinUrl?: string;
  googleScholarUrl?: string;
  orcidId?: string;
  scopusId?: string;
  researchGateUrl?: string;
  personalWebsite?: string;
  cvPdfUrl?: string;
  facultyProfilePdfUrl?: string;
  certificates?: any[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  imageAltText?: string;
  displayOrder?: number;
  featuredFaculty?: boolean;
  showOnWebsite?: boolean;
}

interface FacultyProfilePageProps {
  profile: FacultyProfile;
}

// ─── Tab Config ───────────────────────────────────────────────────────────────
const TABS = [
  { id: "about",        label: "About",          icon: User },
  { id: "qualifications", label: "Qualifications", icon: GraduationCap },
  { id: "experience",   label: "Experience",      icon: Briefcase },
  { id: "teaching",     label: "Teaching",        icon: BookOpen },
  { id: "research",     label: "Research",        icon: FlaskConical },
  { id: "publications", label: "Publications",    icon: FileText },
  { id: "books",        label: "Books & Patents", icon: BookMarked },
  { id: "events",       label: "Events & FDPs",   icon: Calendar },
  { id: "awards",       label: "Awards",          icon: Trophy },
  { id: "roles",        label: "Roles",           icon: Shield },
  { id: "guidance",     label: "Guidance",        icon: Target },
  { id: "memberships",  label: "Memberships",     icon: Network },
];

// ─── Small Helper Components ──────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, count }: { icon: any; title: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-outfit text-xl font-black text-[#002147] leading-none">{title}</h3>
        {count !== undefined && (
          <span className="text-xs text-slate-400 font-semibold mt-0.5 block">{count} {count === 1 ? "entry" : "entries"}</span>
        )}
      </div>
    </div>
  );
}

function Tag({ label, color = "indigo" }: { label: string; color?: string }) {
  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${colorMap[color] || colorMap.indigo}`}>
      {label}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <FileText className="h-6 w-6 text-slate-400" />
      </div>
      <p className="text-slate-400 font-semibold text-sm">{message}</p>
    </div>
  );
}

function InfoBadge({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm">
      <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider font-black text-slate-400">{label}</div>
        <div className="font-semibold text-slate-800 text-sm leading-snug truncate">{value}</div>
      </div>
    </div>
  );
}

// ─── Section Renders ──────────────────────────────────────────────────────────

function AboutSection({ p }: { p: FacultyProfile }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Bio */}
      {p.shortBio && (
        <div>
          <SectionHeader icon={User} title="Short Biography" />
          <p className="text-slate-600 font-semibold text-sm md:text-base leading-relaxed text-justify">{p.shortBio}</p>
        </div>
      )}

      {/* Career Objective */}
      {p.careerObjective && (
        <div className="bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-indigo-600" />
            <span className="font-black text-[#002147] text-sm uppercase tracking-wider">Career Objective</span>
          </div>
          <p className="text-slate-600 font-semibold text-sm leading-relaxed">{p.careerObjective}</p>
        </div>
      )}

      {/* Teaching Philosophy */}
      {p.teachingPhilosophy && (
        <div className="bg-gradient-to-br from-amber-50 to-transparent border border-amber-100 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <span className="font-black text-amber-900 text-sm uppercase tracking-wider">Teaching Philosophy</span>
          </div>
          <p className="text-slate-600 font-semibold text-sm leading-relaxed italic">{p.teachingPhilosophy}</p>
        </div>
      )}

      {/* Expertise & Languages */}
      <div className="grid md:grid-cols-2 gap-6">
        {(p.areaOfExpertise?.length ?? 0) > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-indigo-600" />
              <span className="font-black text-[#002147] text-sm uppercase tracking-wider">Areas of Expertise</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {p.areaOfExpertise!.map((tag, i) => (
                <Tag key={i} label={tag} color="indigo" />
              ))}
            </div>
          </div>
        )}
        {(p.languagesKnown?.length ?? 0) > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Languages className="h-4 w-4 text-emerald-600" />
              <span className="font-black text-[#002147] text-sm uppercase tracking-wider">Languages Known</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {p.languagesKnown!.map((lang, i) => (
                <Tag key={i} label={lang} color="emerald" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Research Interests */}
      {p.researchInterests && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Microscope className="h-4 w-4 text-purple-600" />
            <span className="font-black text-[#002147] text-sm uppercase tracking-wider">Research Interests</span>
          </div>
          <p className="text-slate-600 font-semibold text-sm leading-relaxed">{p.researchInterests}</p>
          {(p.researchAreas?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {p.researchAreas!.map((tag, i) => <Tag key={i} label={tag} color="purple" />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QualificationsSection({ p }: { p: FacultyProfile }) {
  const quals = p.qualifications || [];
  return (
    <div>
      {p.highestQualification && (
        <div className="bg-gradient-to-r from-[#002147] to-[#053d79] text-white rounded-3xl px-6 py-4 flex items-center gap-4 mb-6">
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <GraduationCap className="h-5 w-5 text-indigo-200" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest font-black text-indigo-200">Highest Qualification</div>
            <div className="font-outfit font-black text-base">{p.highestQualification}</div>
          </div>
        </div>
      )}
      <SectionHeader icon={GraduationCap} title="Qualification Details" count={quals.length} />
      {quals.length > 0 ? (
        <div className="space-y-4">
          {quals.map((q: any, i: number) => (
            <div key={i} className="bg-white border-2 border-slate-100 rounded-3xl p-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-indigo-100 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="font-black text-[#002147] text-base">{q.degreeName}</div>
                {q.specialization && <div className="text-indigo-600 font-bold text-sm mt-0.5">{q.specialization}</div>}
                {q.university && (
                  <div className="flex items-center gap-1.5 mt-1 text-slate-500 font-semibold text-xs">
                    <Building2 className="h-3 w-3 shrink-0" />
                    {q.university}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {q.yearOfPassing && (
                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-xs px-3 py-1.5 rounded-xl">{q.yearOfPassing}</span>
                )}
                {q.gradePercentage && (
                  <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-black text-xs px-3 py-1.5 rounded-xl">{q.gradePercentage}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No qualification details have been added yet." />
      )}
    </div>
  );
}

function ExperienceSection({ p }: { p: FacultyProfile }) {
  const exp = p.professionalExperience || [];
  return (
    <div>
      {/* Summary Cards */}
      {(p.totalExperience || p.teachingExperience || p.industryExperience) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {p.totalExperience && (
            <div className="bg-gradient-to-br from-[#002147] to-[#083b75] text-white rounded-3xl p-5 text-center">
              <div className="font-outfit font-black text-3xl">{p.totalExperience}</div>
              <div className="text-blue-200 font-semibold text-xs mt-1 uppercase tracking-wider">Total Experience</div>
            </div>
          )}
          {p.teachingExperience && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-5 text-center">
              <div className="font-outfit font-black text-3xl text-indigo-700">{p.teachingExperience}</div>
              <div className="text-indigo-400 font-semibold text-xs mt-1 uppercase tracking-wider">Teaching Exp.</div>
            </div>
          )}
          {p.industryExperience && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-5 text-center">
              <div className="font-outfit font-black text-3xl text-emerald-700">{p.industryExperience}</div>
              <div className="text-emerald-400 font-semibold text-xs mt-1 uppercase tracking-wider">Industry Exp.</div>
            </div>
          )}
        </div>
      )}

      <SectionHeader icon={Briefcase} title="Professional Experience" count={exp.length} />
      {exp.length > 0 ? (
        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-indigo-100" />
          <div className="space-y-6">
            {exp.map((e: any, i: number) => (
              <div key={i} className="relative">
                <div className="absolute -left-[27px] top-1.5 h-5 w-5 rounded-full border-2 border-indigo-400 bg-white" />
                <div className="bg-white border-2 border-slate-100 rounded-3xl p-5 hover:border-indigo-100 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <div className="font-black text-[#002147] text-base">{e.designation}</div>
                      <div className="text-indigo-600 font-bold text-sm">{e.organization}</div>
                    </div>
                    {(e.fromDate || e.toDate) && (
                      <span className="shrink-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 whitespace-nowrap">
                        {e.fromDate} — {e.toDate || "Present"}
                      </span>
                    )}
                  </div>
                  {e.description && <p className="text-slate-500 font-semibold text-sm leading-relaxed">{e.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState message="No professional experience details have been added yet." />
      )}
    </div>
  );
}

function TeachingSection({ p }: { p: FacultyProfile }) {
  const subjects = p.subjectsHandled || [];
  return (
    <div>
      <SectionHeader icon={BookOpen} title="Subjects Handled" count={subjects.length} />
      {subjects.length > 0 ? (
        <div className="overflow-x-auto rounded-3xl border-2 border-slate-100 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-widest font-black text-slate-500">
                <th className="px-4 py-4">Subject</th>
                <th className="px-4 py-4">Course / Program</th>
                <th className="px-4 py-4">Semester</th>
                <th className="px-4 py-4">Academic Year</th>
                <th className="px-4 py-4 text-center">Materials</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subjects.map((s: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-[#002147] text-sm">{s.subjectName}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-600 text-sm">{s.courseProgram || "—"}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-500 text-xs">{s.semesterYear || "—"}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-500 text-xs">{s.academicYear || "—"}</td>
                  <td className="px-4 py-3.5 text-center">
                    {s.materialsLink ? (
                      <a href={s.materialsLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-indigo-600 font-black text-xs hover:text-indigo-800 transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" /> View
                      </a>
                    ) : <span className="text-slate-300 text-xs">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState message="No subjects have been added yet." />
      )}
    </div>
  );
}

function ResearchSection({ p }: { p: FacultyProfile }) {
  const ongoing = p.ongoingProjects || [];
  const completed = p.completedProjects || [];
  const allProjects = [...ongoing.map((x: any) => ({ ...x, _status: "Ongoing" })), ...completed.map((x: any) => ({ ...x, _status: "Completed" }))];

  return (
    <div className="flex flex-col gap-8">
      {p.researchInterests && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Microscope className="h-4 w-4 text-indigo-600" />
            <span className="font-black text-[#002147] text-sm uppercase tracking-wider">Research Interests</span>
          </div>
          <p className="text-slate-600 font-semibold text-sm leading-relaxed">{p.researchInterests}</p>
          {(p.researchAreas?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {p.researchAreas!.map((tag, i) => <Tag key={i} label={tag} color="indigo" />)}
            </div>
          )}
        </div>
      )}

      <div>
        <SectionHeader icon={FlaskConical} title="Research Projects" count={allProjects.length} />
        {allProjects.length > 0 ? (
          <div className="space-y-4">
            {allProjects.map((proj: any, i: number) => (
              <div key={i} className="bg-white border-2 border-slate-100 rounded-3xl p-5 hover:border-indigo-100 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="font-black text-[#002147] text-base leading-snug">{proj.projectTitle}</div>
                  <span className={`shrink-0 px-3 py-1 rounded-xl text-xs font-black ${proj._status === "Ongoing" ? "bg-emerald-50 border border-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {proj._status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {proj.fundingAgency && <div><div className="text-[9px] uppercase tracking-widest font-black text-slate-400">Funding Agency</div><div className="font-semibold text-slate-700 text-xs mt-0.5">{proj.fundingAgency}</div></div>}
                  {proj.amountReceived && <div><div className="text-[9px] uppercase tracking-widest font-black text-slate-400">Amount</div><div className="font-semibold text-slate-700 text-xs mt-0.5">{proj.amountReceived}</div></div>}
                  {proj.duration && <div><div className="text-[9px] uppercase tracking-widest font-black text-slate-400">Duration</div><div className="font-semibold text-slate-700 text-xs mt-0.5">{proj.duration}</div></div>}
                  {proj.role && <div><div className="text-[9px] uppercase tracking-widest font-black text-slate-400">Role</div><div className="font-semibold text-slate-700 text-xs mt-0.5">{proj.role}</div></div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No research projects have been added yet." />
        )}
      </div>
    </div>
  );
}

function PublicationsSection({ p }: { p: FacultyProfile }) {
  const pubs = p.publications || [];
  const [filter, setFilter] = useState("All");
  const types = ["All", ...Array.from(new Set(pubs.map((pub) => pub.publicationType).filter(Boolean)))];
  const filtered = filter === "All" ? pubs : pubs.filter((pub) => pub.publicationType === filter);

  return (
    <div>
      <SectionHeader icon={FileText} title="Publications" count={pubs.length} />
      {pubs.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {types.map((t) => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === t ? "bg-[#002147] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-200"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filtered.map((pub, i) => (
              <div key={i} className="bg-white border-2 border-slate-100 rounded-3xl p-5 hover:border-indigo-100 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-[#002147] text-sm leading-snug mb-1">{pub.publicationTitle}</div>
                    {pub.journalName && <div className="text-indigo-600 font-bold text-xs italic mb-2">{pub.journalName}</div>}
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-semibold">
                      {pub.authors && <span>👤 {pub.authors}</span>}
                      {pub.year && <span>📅 {pub.year}</span>}
                      {pub.volumeIssuePages && <span>📄 {pub.volumeIssuePages}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-col sm:items-end">
                    {pub.publicationType && <Tag label={pub.publicationType} color="indigo" />}
                    {pub.indexing && <Tag label={pub.indexing} color="emerald" />}
                    {pub.doiLink && (
                      <a href={pub.doiLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl text-xs font-black transition-colors">
                        <ExternalLink className="h-3 w-3" /> DOI
                      </a>
                    )}
                    {pub.publicationPdfUrl && (
                      <a href={pub.publicationPdfUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-black transition-colors">
                        <Download className="h-3 w-3" /> PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyState message="No publications have been added yet." />
      )}
    </div>
  );
}

function BooksPatentsSection({ p }: { p: FacultyProfile }) {
  const books = p.booksPublished || [];
  const patents = p.patents || [];
  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionHeader icon={BookMarked} title="Books Published" count={books.length} />
        {books.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {books.map((b: any, i: number) => (
              <div key={i} className="bg-white border-2 border-slate-100 rounded-3xl p-5 hover:border-indigo-100 transition-colors">
                <div className="font-black text-[#002147] text-sm mb-2">{b.bookTitle}</div>
                {b.publisherName && <div className="text-slate-500 font-semibold text-xs mb-1">📚 {b.publisherName}</div>}
                <div className="flex gap-2 flex-wrap mt-2">
                  {b.isbnNumber && <Tag label={`ISBN: ${b.isbnNumber}`} color="slate" />}
                  {b.publishedYear && <Tag label={b.publishedYear} color="indigo" />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No books published yet." />
        )}
      </div>
      <div>
        <SectionHeader icon={Shield} title="Patents" count={patents.length} />
        {patents.length > 0 ? (
          <div className="space-y-4">
            {patents.map((pat: any, i: number) => (
              <div key={i} className="bg-white border-2 border-slate-100 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="font-black text-[#002147] text-sm">{pat.patentTitle}</div>
                  {pat.patentNumber && <div className="text-slate-500 font-semibold text-xs mt-1">Patent No: {pat.patentNumber}</div>}
                  {pat.filedDate && <div className="text-slate-400 font-semibold text-xs mt-0.5">{pat.filedDate}</div>}
                </div>
                {pat.patentStatus && (
                  <Tag label={pat.patentStatus} color={pat.patentStatus === "Granted" ? "emerald" : pat.patentStatus === "Filed" ? "amber" : "indigo"} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No patents recorded yet." />
        )}
      </div>
    </div>
  );
}

function EventCard({ event, type }: { event: any; type: string }) {
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 hover:border-indigo-100 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-black text-[#002147] text-sm leading-snug">{event.eventTitle}</div>
          {event.organizedBy && <div className="text-indigo-600 font-bold text-xs mt-1">🏛 {event.organizedBy}</div>}
          <div className="flex flex-wrap gap-2 mt-1.5 text-xs text-slate-400 font-semibold">
            {event.location && <span>📍 {event.location}</span>}
            {(event.fromDate || event.toDate) && <span>📅 {event.fromDate} {event.toDate ? `– ${event.toDate}` : ""}</span>}
          </div>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <Tag label={type} color={type === "Conference" ? "indigo" : type === "FDP" ? "emerald" : type === "Workshop" ? "amber" : "slate"} />
          {event.certificateUrl && (
            <a href={event.certificateUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-black text-slate-500 hover:text-indigo-600 transition-colors">
              <Download className="h-3 w-3" /> Cert.
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function EventsSection({ p }: { p: FacultyProfile }) {
  const [activeEventTab, setActiveEventTab] = useState("conferences");
  const eventTabs = [
    { id: "conferences", label: "Conferences", data: p.conferencesAttended || [], type: "Conference" },
    { id: "seminars",    label: "Seminars",    data: p.seminarsAttended || [],    type: "Seminar" },
    { id: "fdps",        label: "FDPs",        data: p.fdpsAttended || [],        type: "FDP" },
    { id: "workshops",  label: "Workshops",   data: p.workshopsAttended || [],   type: "Workshop" },
  ];
  const activeEvTab = eventTabs.find((t) => t.id === activeEventTab)!;

  return (
    <div>
      <SectionHeader icon={Calendar} title="Conferences, Seminars, FDPs & Workshops" />
      <div className="flex gap-2 flex-wrap mb-6">
        {eventTabs.map((t) => (
          <button key={t.id} onClick={() => setActiveEventTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeEventTab === t.id ? "bg-[#002147] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-200"}`}>
            {t.label}
            <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${activeEventTab === t.id ? "bg-white/20" : "bg-slate-100"}`}>
              {t.data.length}
            </span>
          </button>
        ))}
      </div>
      {activeEvTab.data.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {activeEvTab.data.map((ev: any, i: number) => (
            <EventCard key={i} event={ev} type={activeEvTab.type} />
          ))}
        </div>
      ) : (
        <EmptyState message={`No ${activeEvTab.label.toLowerCase()} have been added yet.`} />
      )}
    </div>
  );
}

function AwardsSection({ p }: { p: FacultyProfile }) {
  const awards = p.awards || [];
  return (
    <div>
      <SectionHeader icon={Trophy} title="Awards & Achievements" count={awards.length} />
      {awards.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {awards.map((aw: any, i: number) => (
            <div key={i} className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-3xl p-5 hover:border-amber-200 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-[#002147] text-sm leading-snug">{aw.awardTitle}</div>
                  {aw.awardedBy && <div className="text-amber-700 font-bold text-xs mt-1">🏛 {aw.awardedBy}</div>}
                  {aw.awardYear && <Tag label={aw.awardYear} color="amber" />}
                  {aw.description && <p className="text-slate-500 font-semibold text-xs mt-2 leading-relaxed">{aw.description}</p>}
                  {aw.certificateUrl && (
                    <a href={aw.certificateUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-black text-amber-600 hover:text-amber-800 transition-colors">
                      <Download className="h-3.5 w-3.5" /> Download Certificate
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No awards have been added yet." />
      )}
    </div>
  );
}

function RolesSection({ p }: { p: FacultyProfile }) {
  const responsibilities = p.departmentResponsibilities || [];
  const committees = p.committeeMemberships || [];

  return (
    <div className="flex flex-col gap-8">
      {p.currentAdministrativeRole && (
        <div className="bg-gradient-to-r from-[#002147] to-[#083b75] text-white rounded-3xl px-6 py-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-indigo-200" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest font-black text-indigo-200">Current Administrative Role</div>
            <div className="font-outfit font-black text-base">{p.currentAdministrativeRole}</div>
          </div>
        </div>
      )}

      <div>
        <SectionHeader icon={ClipboardList} title="Department Responsibilities" count={responsibilities.length} />
        {responsibilities.length > 0 ? (
          <div className="space-y-3">
            {responsibilities.map((r: any, i: number) => (
              <div key={i} className="bg-white border-2 border-slate-100 rounded-2xl p-4 hover:border-indigo-100 transition-colors">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="font-black text-[#002147] text-sm">{r.roleName}</div>
                  {r.academicYear && <Tag label={r.academicYear} color="slate" />}
                </div>
                {r.description && <p className="text-slate-500 font-semibold text-xs leading-relaxed">{r.description}</p>}
              </div>
            ))}
          </div>
        ) : <EmptyState message="No department responsibilities added yet." />}
      </div>

      <div>
        <SectionHeader icon={Users} title="Committee Memberships" count={committees.length} />
        {committees.length > 0 ? (
          <div className="space-y-3">
            {committees.map((c: any, i: number) => (
              <div key={i} className="bg-white border-2 border-slate-100 rounded-2xl p-4 hover:border-indigo-100 transition-colors">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="font-black text-[#002147] text-sm">{c.committeeName}</div>
                  {c.academicYear && <Tag label={c.academicYear} color="slate" />}
                </div>
                {c.description && <p className="text-slate-500 font-semibold text-xs leading-relaxed">{c.description}</p>}
              </div>
            ))}
          </div>
        ) : <EmptyState message="No committee memberships added yet." />}
      </div>
    </div>
  );
}

function GuidanceSection({ p }: { p: FacultyProfile }) {
  const projects = p.projectsGuided || [];
  const scholars = p.researchScholars || [];
  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionHeader icon={Target} title="Projects Guided" count={projects.length} />
        {projects.length > 0 ? (
          <div className="overflow-x-auto rounded-3xl border-2 border-slate-100 bg-white shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-widest font-black text-slate-500">
                  <th className="px-4 py-4">Student Name</th>
                  <th className="px-4 py-4">Project Title</th>
                  <th className="px-4 py-4">Course</th>
                  <th className="px-4 py-4">Academic Year</th>
                  <th className="px-4 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {projects.map((pg: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-[#002147] text-sm">{pg.studentName}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-600 text-xs">{pg.projectTitle}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-500 text-xs">{pg.course || "—"}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-500 text-xs">{pg.academicYear || "—"}</td>
                    <td className="px-4 py-3.5 text-center">
                      {pg.projectStatus && <Tag label={pg.projectStatus} color={pg.projectStatus === "Completed" ? "emerald" : "amber"} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyState message="No projects guided yet." />}
      </div>
      <div>
        <SectionHeader icon={Microscope} title="Research Scholars Guided" count={scholars.length} />
        {scholars.length > 0 ? (
          <div className="space-y-3">
            {scholars.map((sc: any, i: number) => (
              <div key={i} className="bg-white border-2 border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-black text-[#002147] text-sm">{sc.scholarName}</div>
                  {sc.researchTopic && <div className="text-slate-500 font-semibold text-xs mt-1">{sc.researchTopic}</div>}
                </div>
                {sc.guidanceStatus && (
                  <Tag label={sc.guidanceStatus} color={sc.guidanceStatus === "Awarded" ? "emerald" : sc.guidanceStatus === "Submitted" ? "amber" : "indigo"} />
                )}
              </div>
            ))}
          </div>
        ) : <EmptyState message="No research scholars guided yet." />}
      </div>
    </div>
  );
}

function MembershipsSection({ p }: { p: FacultyProfile }) {
  const memberships = p.professionalMemberships || [];
  return (
    <div>
      <SectionHeader icon={Network} title="Professional Memberships" count={memberships.length} />
      {memberships.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {memberships.map((mem: any, i: number) => (
            <div key={i} className="bg-white border-2 border-slate-100 rounded-3xl p-5 hover:border-indigo-100 transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <Network className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-[#002147] text-sm">{mem.organization}</div>
                  {mem.membershipType && <div className="text-indigo-600 font-bold text-xs mt-0.5">{mem.membershipType}</div>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mem.membershipId && <Tag label={`ID: ${mem.membershipId}`} color="slate" />}
                    {mem.validity && <Tag label={`Valid: ${mem.validity}`} color="emerald" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : <EmptyState message="No professional memberships added yet." />}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FacultyProfilePage({ profile: p }: FacultyProfilePageProps) {
  const [activeTab, setActiveTab] = useState("about");

  const visibleTabs = TABS.filter((tab) => {
    if (tab.id === "about") return true;
    if (tab.id === "qualifications") return (p.qualifications?.length ?? 0) > 0 || !!p.highestQualification;
    if (tab.id === "experience") return (p.professionalExperience?.length ?? 0) > 0 || !!p.totalExperience;
    if (tab.id === "teaching") return (p.subjectsHandled?.length ?? 0) > 0;
    if (tab.id === "research") return (p.ongoingProjects?.length ?? 0) > 0 || (p.completedProjects?.length ?? 0) > 0 || !!p.researchInterests;
    if (tab.id === "publications") return (p.publications?.length ?? 0) > 0;
    if (tab.id === "books") return (p.booksPublished?.length ?? 0) > 0 || (p.patents?.length ?? 0) > 0;
    if (tab.id === "events") return (p.conferencesAttended?.length ?? 0) + (p.seminarsAttended?.length ?? 0) + (p.fdpsAttended?.length ?? 0) + (p.workshopsAttended?.length ?? 0) > 0;
    if (tab.id === "awards") return (p.awards?.length ?? 0) > 0;
    if (tab.id === "roles") return (p.departmentResponsibilities?.length ?? 0) > 0 || (p.committeeMemberships?.length ?? 0) > 0 || !!p.currentAdministrativeRole;
    if (tab.id === "guidance") return (p.projectsGuided?.length ?? 0) > 0 || (p.researchScholars?.length ?? 0) > 0;
    if (tab.id === "memberships") return (p.professionalMemberships?.length ?? 0) > 0;
    return true;
  });

  const socialLinks = [
    { url: p.linkedinUrl, icon: Link2, label: "LinkedIn", color: "bg-blue-600 hover:bg-blue-700" },
    { url: p.googleScholarUrl, icon: BookOpen, label: "Google Scholar", color: "bg-indigo-600 hover:bg-indigo-700" },
    { url: p.researchGateUrl, icon: FlaskConical, label: "ResearchGate", color: "bg-teal-600 hover:bg-teal-700" },
    { url: p.personalWebsite, icon: Globe, label: "Website", color: "bg-slate-700 hover:bg-slate-800" },
  ].filter((l) => !!l.url);

  const identityBadges = [
    { icon: Mail, label: "Email", value: p.officialEmail },
    { icon: MapPin, label: "Office", value: p.officeLocation },
    { icon: Calendar, label: "Joined", value: p.dateOfJoining },
    { icon: Briefcase, label: "Employment", value: p.employmentType },
    { icon: GraduationCap, label: "Qualification", value: p.highestQualification },
  ].filter((b) => !!b.value);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-14 font-sans">

      {/* ← Back link */}
      <Link href="/faculty/teaching-staff"
        className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-indigo-700 transition-colors mb-8 uppercase tracking-wider">
        <ArrowLeft className="h-4 w-4" /> Back to Faculty List
      </Link>

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#002147] via-[#053d79] to-[#0a4d96] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl mb-10">
        {/* decorative circles */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 h-40 w-40 rounded-full bg-white/5 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Photo */}
          <div className="shrink-0">
            {p.profilePhotoUrl ? (
              <img
                src={p.profilePhotoUrl}
                alt={p.imageAltText || p.facultyName}
                className="h-32 w-32 md:h-40 md:w-40 rounded-[2rem] object-cover border-4 border-white/20 shadow-xl"
              />
            ) : (
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-[2rem] bg-white/10 border-4 border-white/20 flex items-center justify-center shadow-xl">
                <User className="h-16 w-16 text-white/30" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {p.featuredFaculty && (
              <span className="inline-flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <Star className="h-3.5 w-3.5" /> Featured Faculty
              </span>
            )}
            <h1 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none mb-2">
              {p.facultyName}
            </h1>
            <div className="text-blue-200 font-bold text-base md:text-lg mb-1">{p.designation}</div>
            <div className="flex items-center gap-2 text-blue-300/80 font-semibold text-sm mb-4">
              <Building2 className="h-4 w-4 shrink-0" /> Department of {p.department}
              {p.facultyId && <span className="bg-white/10 border border-white/10 rounded-lg px-2 py-0.5 text-xs ml-2">ID: {p.facultyId}</span>}
              {p.facultyStatus && (
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border ml-2 ${p.facultyStatus === "active" ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-300" : "bg-slate-500/20 border-slate-400/30 text-slate-300"}`}>
                  {p.facultyStatus}
                </span>
              )}
            </div>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.url!} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${link.color} text-white px-4 py-2 rounded-xl text-xs font-black transition-all hover:scale-105 shadow-md`}>
                    <link.icon className="h-3.5 w-3.5" /> {link.label}
                  </a>
                ))}
                {p.orcidId && (
                  <span className="inline-flex items-center gap-2 bg-emerald-600/80 text-white px-4 py-2 rounded-xl text-xs font-black">
                    ORCID: {p.orcidId}
                  </span>
                )}
                {p.scopusId && (
                  <span className="inline-flex items-center gap-2 bg-orange-600/80 text-white px-4 py-2 rounded-xl text-xs font-black">
                    Scopus: {p.scopusId}
                  </span>
                )}
              </div>
            )}

            {/* Download buttons */}
            <div className="flex flex-wrap gap-3">
              {p.cvPdfUrl && (
                <a href={p.cvPdfUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#002147] px-5 py-2.5 rounded-xl font-black text-xs hover:bg-blue-50 transition-colors shadow-md">
                  <Download className="h-4 w-4" /> Download CV
                </a>
              )}
              {p.facultyProfilePdfUrl && (
                <a href={p.facultyProfilePdfUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white px-5 py-2.5 rounded-xl font-black text-xs hover:bg-white/20 transition-colors">
                  <Download className="h-4 w-4" /> Faculty Profile PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── QUICK INFO BADGES ─────────────────────────────────────────── */}
      {identityBadges.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {identityBadges.map((badge, i) => (
            <InfoBadge key={i} icon={badge.icon} label={badge.label} value={badge.value!} />
          ))}
        </div>
      )}

      {/* ─── MAIN GRID ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        {/* ── SIDEBAR TABS ─────────────────────────────────────────────── */}
        <div className="lg:sticky lg:top-24 bg-white border border-slate-200/70 rounded-[2rem] p-3 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 px-3 pt-2 pb-1 block">Profile Sections</span>
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-bold transition-all text-left ${isActive ? "bg-gradient-to-r from-[#002147] to-[#083b75] text-white shadow-md" : "text-slate-600 hover:bg-slate-50 hover:text-[#002147]"}`}>
                <span className={`flex items-center justify-center h-7 w-7 rounded-lg shrink-0 border transition-colors ${isActive ? "bg-white/20 border-white/10 text-white" : "bg-slate-100 border-transparent text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"}`}>
                  <tab.icon className="h-3.5 w-3.5" />
                </span>
                <span className="leading-tight text-xs">{tab.label}</span>
                {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60" />}
              </button>
            );
          })}
        </div>

        {/* ── CONTENT AREA ─────────────────────────────────────────────── */}
        <div className="lg:col-span-3 bg-white border border-slate-200/70 rounded-[2rem] p-6 md:p-8 shadow-sm min-h-[500px]">
          {activeTab === "about"         && <AboutSection        p={p} />}
          {activeTab === "qualifications"&& <QualificationsSection p={p} />}
          {activeTab === "experience"    && <ExperienceSection    p={p} />}
          {activeTab === "teaching"      && <TeachingSection      p={p} />}
          {activeTab === "research"      && <ResearchSection      p={p} />}
          {activeTab === "publications"  && <PublicationsSection  p={p} />}
          {activeTab === "books"         && <BooksPatentsSection  p={p} />}
          {activeTab === "events"        && <EventsSection        p={p} />}
          {activeTab === "awards"        && <AwardsSection        p={p} />}
          {activeTab === "roles"         && <RolesSection         p={p} />}
          {activeTab === "guidance"      && <GuidanceSection      p={p} />}
          {activeTab === "memberships"   && <MembershipsSection   p={p} />}
        </div>
      </div>
    </div>
  );
}
