"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Lock, Phone, Eye, EyeOff, CheckCircle, AlertCircle, LogOut, Save,
  Plus, Trash2, ChevronDown, ChevronUp, User, GraduationCap, Briefcase,
  BookOpen, FlaskConical, FileText, Award, Calendar, Network, Globe,
  Building2, Star, Shield, Target, BookMarked, Languages, Lightbulb,
  Upload, ImageIcon, FileIcon, RefreshCw, ExternalLink, Key,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Entry = Record<string, string>;
type Step = "login" | "editor";

interface FormData {
  facultyName: string; designation: string; department: string; facultyId: string;
  gender: string; dateOfBirth: string; dateOfJoining: string; employmentType: string;
  officialEmail: string; officeLocation: string; facultyStatus: string;
  highestQualification: string; qualifications: Entry[];
  totalExperience: string; teachingExperience: string; industryExperience: string;
  professionalExperience: Entry[];
  shortBio: string; careerObjective: string; teachingPhilosophy: string;
  areaOfExpertise: string; languagesKnown: string;
  subjectsHandled: Entry[];
  researchAreas: string; researchInterests: string;
  ongoingProjects: Entry[]; completedProjects: Entry[];
  publications: Entry[];
  booksPublished: Entry[]; patents: Entry[];
  conferencesAttended: Entry[]; seminarsAttended: Entry[];
  fdpsAttended: Entry[]; workshopsAttended: Entry[];
  awards: Entry[];
  currentAdministrativeRole: string;
  departmentResponsibilities: Entry[]; committeeMemberships: Entry[];
  projectsGuided: Entry[]; researchScholars: Entry[];
  professionalMemberships: Entry[];
  linkedinUrl: string; googleScholarUrl: string; orcidId: string;
  scopusId: string; researchGateUrl: string; personalWebsite: string;
  metaTitle: string; metaDescription: string; metaKeywords: string; imageAltText: string;
  displayOrder: string; featuredFaculty: boolean; showOnWebsite: boolean;
}

const EMPTY_FORM: FormData = {
  facultyName: "", designation: "", department: "", facultyId: "",
  gender: "", dateOfBirth: "", dateOfJoining: "", employmentType: "",
  officialEmail: "", officeLocation: "", facultyStatus: "active",
  highestQualification: "", qualifications: [],
  totalExperience: "", teachingExperience: "", industryExperience: "",
  professionalExperience: [],
  shortBio: "", careerObjective: "", teachingPhilosophy: "",
  areaOfExpertise: "", languagesKnown: "",
  subjectsHandled: [],
  researchAreas: "", researchInterests: "",
  ongoingProjects: [], completedProjects: [],
  publications: [],
  booksPublished: [], patents: [],
  conferencesAttended: [], seminarsAttended: [],
  fdpsAttended: [], workshopsAttended: [],
  awards: [],
  currentAdministrativeRole: "",
  departmentResponsibilities: [], committeeMemberships: [],
  projectsGuided: [], researchScholars: [],
  professionalMemberships: [],
  linkedinUrl: "", googleScholarUrl: "", orcidId: "",
  scopusId: "", researchGateUrl: "", personalWebsite: "",
  metaTitle: "", metaDescription: "", metaKeywords: "", imageAltText: "",
  displayOrder: "999", featuredFaculty: false, showOnWebsite: false,
};

const DEPTS = ["Commerce","Computer Applications","Mathematics","Physics","Chemistry","Zoology","Botany","English","Telugu","Hindi","Economics","Psychology","History","Political Science","Physical Education","Library","Administration","MCA","MBA","Other"];
const PUB_TYPES = ["Journal","Conference","Book","Book Chapter","Patent","Article"];
const INDEXING = ["SCOPUS","Web of Science","UGC-CARE","PubMed","IEEE","Springer","Elsevier","Other"];
const PROJ_STATUS = ["Ongoing","Completed","Submitted","Sanctioned"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function blankEntry(keys: string[]): Entry {
  return Object.fromEntries(keys.map(k => [k, ""]));
}

function hydrateProfile(p: any): FormData {
  const tags = (arr: any) => Array.isArray(arr) ? arr.join(", ") : "";
  const clean = (arr: any[]) => (arr || []).map((e: any) => {
    const { _key, _type, ...rest } = e;
    return Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, String(v ?? "")]));
  });
  return {
    facultyName: p.facultyName || "",
    designation: p.designation || "",
    department: p.department || "",
    facultyId: p.facultyId || "",
    gender: p.gender || "",
    dateOfBirth: p.dateOfBirth || "",
    dateOfJoining: p.dateOfJoining || "",
    employmentType: p.employmentType || "",
    officialEmail: p.officialEmail || "",
    officeLocation: p.officeLocation || "",
    facultyStatus: p.facultyStatus || "active",
    highestQualification: p.highestQualification || "",
    qualifications: clean(p.qualifications),
    totalExperience: p.totalExperience || "",
    teachingExperience: p.teachingExperience || "",
    industryExperience: p.industryExperience || "",
    professionalExperience: clean(p.professionalExperience),
    shortBio: p.shortBio || "",
    careerObjective: p.careerObjective || "",
    teachingPhilosophy: p.teachingPhilosophy || "",
    areaOfExpertise: tags(p.areaOfExpertise),
    languagesKnown: tags(p.languagesKnown),
    subjectsHandled: clean(p.subjectsHandled),
    researchAreas: tags(p.researchAreas),
    researchInterests: p.researchInterests || "",
    ongoingProjects: clean(p.ongoingProjects),
    completedProjects: clean(p.completedProjects),
    publications: clean(p.publications),
    booksPublished: clean(p.booksPublished),
    patents: clean(p.patents),
    conferencesAttended: clean(p.conferencesAttended),
    seminarsAttended: clean(p.seminarsAttended),
    fdpsAttended: clean(p.fdpsAttended),
    workshopsAttended: clean(p.workshopsAttended),
    awards: clean(p.awards),
    currentAdministrativeRole: p.currentAdministrativeRole || "",
    departmentResponsibilities: clean(p.departmentResponsibilities),
    committeeMemberships: clean(p.committeeMemberships),
    projectsGuided: clean(p.projectsGuided),
    researchScholars: clean(p.researchScholars),
    professionalMemberships: clean(p.professionalMemberships),
    linkedinUrl: p.linkedinUrl || "",
    googleScholarUrl: p.googleScholarUrl || "",
    orcidId: p.orcidId || "",
    scopusId: p.scopusId || "",
    researchGateUrl: p.researchGateUrl || "",
    personalWebsite: p.personalWebsite || "",
    metaTitle: p.metaTitle || "",
    metaDescription: p.metaDescription || "",
    metaKeywords: tags(p.metaKeywords),
    imageAltText: p.imageAltText || "",
    displayOrder: String(p.displayOrder || 999),
    featuredFaculty: !!p.featuredFaculty,
    showOnWebsite: !!p.showOnWebsite,
  };
}

// ─── UI Atoms ─────────────────────────────────────────────────────────────────
const base = "w-full border-2 border-slate-100 focus:border-indigo-400 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none transition-colors bg-slate-50 focus:bg-white placeholder:text-slate-300";

function Inp({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={base} />;
}
function Sel({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: (string | { label: string; value: string })[] }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className={base + " cursor-pointer"}>
      <option value="">— Select —</option>
      {options.map(o => { const v = typeof o === "string" ? o : o.value; const l = typeof o === "string" ? o : o.label; return <option key={v} value={v}>{l}</option>; })}
    </select>
  );
}
function Txt({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={base + " resize-y"} />;
}
function Lbl({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">{label}{req && <span className="text-rose-500 ml-1">*</span>}</label>
      {children}
    </div>
  );
}

// ─── Accordion Section ────────────────────────────────────────────────────────
function Acc({ icon: Icon, title, open, onToggle, children }: { icon: any; title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden transition-shadow hover:shadow-md">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-6 py-5 group text-left">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-100 transition-colors">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-outfit font-black text-[#002147] text-[15px]">{title}</span>
        </div>
        {open ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
      </button>
      {open && <div className="px-6 pb-6 border-t border-slate-100 pt-5">{children}</div>}
    </div>
  );
}

// ─── Repeatable Editor ────────────────────────────────────────────────────────
function Rep({ label, items, onAdd, onRemove, onUpdate, fields }: {
  label: string; items: Entry[];
  onAdd: () => void; onRemove: (i: number) => void; onUpdate: (i: number, k: string, v: string) => void;
  fields: { key: string; label: string; type?: "text" | "textarea" | "select" | "url"; options?: string[] }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={i} className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 relative">
          <button onClick={() => onRemove(i)} className="absolute top-3 right-3 h-7 w-7 rounded-lg bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">{label} #{i + 1}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map(f => (
              <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <Lbl label={f.label}>
                  {f.type === "textarea" ? <Txt value={item[f.key] || ""} onChange={v => onUpdate(i, f.key, v)} />
                    : f.type === "select" && f.options ? <Sel value={item[f.key] || ""} onChange={v => onUpdate(i, f.key, v)} options={f.options} />
                    : <Inp value={item[f.key] || ""} onChange={v => onUpdate(i, f.key, v)} type={f.type === "url" ? "url" : "text"} />}
                </Lbl>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-indigo-200 text-indigo-600 font-black text-xs hover:border-indigo-400 hover:bg-indigo-50 transition-all w-fit">
        <Plus className="h-4 w-4" /> Add {label}
      </button>
    </div>
  );
}

// ─── File Upload Widget ───────────────────────────────────────────────────────
function FileUpload({ label, accept, file, onFile, existingUrl, preview = false, icon: Icon }: {
  label: string; accept: string; file: File | null; onFile: (f: File | null) => void;
  existingUrl?: string; preview?: boolean; icon: any;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const previewUrl = file ? URL.createObjectURL(file) : existingUrl;

  return (
    <div className="flex flex-col gap-3">
      <Lbl label={label}>
        <div
          onClick={() => ref.current?.click()}
          className="relative flex flex-col items-center justify-center gap-3 border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50 rounded-2xl p-6 cursor-pointer transition-all group"
        >
          {preview && previewUrl ? (
            <img src={previewUrl} alt="Preview" className="h-24 w-24 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm" />
          ) : (
            <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-400 group-hover:text-indigo-600 transition-colors">
              <Icon className="h-7 w-7" />
            </div>
          )}
          <div className="text-center">
            {file ? (
              <div className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> {file.name}
              </div>
            ) : existingUrl ? (
              <div className="text-xs font-bold text-indigo-600 flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5" /> Click to replace existing file
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-500 group-hover:text-indigo-700 transition-colors">
                <Upload className="h-4 w-4 inline mr-1.5" />Click to upload {label.toLowerCase()}
              </div>
            )}
            <div className="text-[10px] text-slate-400 font-semibold mt-1">{accept.replace(/\./g, "").toUpperCase()}</div>
          </div>
          <input ref={ref} type="file" accept={accept} className="hidden"
            onChange={e => { const f = e.target.files?.[0]; onFile(f || null); }} />
        </div>
      </Lbl>
      {existingUrl && !file && (
        <a href={existingUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] font-black text-indigo-600 hover:text-indigo-800 transition-colors w-fit">
          <ExternalLink className="h-3.5 w-3.5" /> View current file
        </a>
      )}
    </div>
  );
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onSuccess }: { onSuccess: (phone: string, password: string, isNew: boolean, profile: any) => void }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!phone.trim()) { setError("Please enter your phone number."); return; }
    if (!password) { setError("Please enter your password."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/faculty-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), password }),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(phone.trim(), password, data.isNew, data.profile);
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001533] via-[#002147] to-[#001030] flex items-center justify-center p-4">
      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          {/* Top bar */}
          <div className="bg-gradient-to-r from-[#002147] to-[#0a4d96] px-8 py-7 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                <Lock className="h-6 w-6 text-blue-200" />
              </div>
              <div>
                <div className="font-outfit font-black text-xl">Faculty Profile Portal</div>
                <div className="text-blue-200 font-semibold text-xs mt-0.5">St. Ann's College for Women</div>
              </div>
            </div>
            <p className="text-blue-200/80 text-xs font-semibold leading-relaxed">
              Enter your registered phone number and password to access your faculty profile.
              New faculty: use the <span className="text-white font-black">default password</span> to create your profile.
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-7 flex flex-col gap-5">
            <Lbl label="Phone Number" req>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="+91 XXXXX XXXXX"
                  className={base + " pl-10"}
                />
              </div>
            </Lbl>

            <Lbl label="Password" req>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="Enter password"
                  className={base + " pl-10 pr-12"}
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Lbl>

            {error && (
              <div className="flex items-start gap-3 bg-rose-50 border-2 border-rose-100 rounded-2xl px-4 py-3">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-rose-700 font-bold text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#002147] to-[#0a4d96] hover:from-[#003070] hover:to-[#0c5cb0] disabled:opacity-60 text-white font-black py-3.5 rounded-2xl text-sm transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              {loading ? (
                <><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying…</>
              ) : (
                <><Lock className="h-4 w-4" /> Access Profile</>
              )}
            </button>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Default Password (First-time login)</div>
              <div className="font-mono text-sm font-black text-[#002147] tracking-wider">Stannsf@2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN EDITOR ──────────────────────────────────────────────────────────────
export default function FacultyUpdatePage() {
  const [step, setStep] = useState<Step>("login");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  // File states
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [profilePdfFile, setProfilePdfFile] = useState<File | null>(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState("");
  const [existingCvUrl, setExistingCvUrl] = useState("");
  const [existingProfilePdfUrl, setExistingProfilePdfUrl] = useState("");

  // Password change
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);

  // UI
  const [openSection, setOpenSection] = useState<string>("basic");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; url?: string } | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────
  const set = useCallback((key: keyof FormData, val: any) => setForm(f => ({ ...f, [key]: val })), []);
  const addEntry = (key: keyof FormData, keys: string[]) => setForm(f => ({ ...f, [key]: [...(f[key] as Entry[]), blankEntry(keys)] }));
  const remEntry = (key: keyof FormData, i: number) => setForm(f => ({ ...f, [key]: (f[key] as Entry[]).filter((_: any, j: number) => j !== i) }));
  const updEntry = (key: keyof FormData, i: number, field: string, val: string) =>
    setForm(f => { const a = [...(f[key] as Entry[])]; a[i] = { ...a[i], [field]: val }; return { ...f, [key]: a }; });

  // ── Login callback ────────────────────────────────────────────────────
  const handleLoginSuccess = (phone: string, password: string, isNew: boolean, profile: any) => {
    setPhone(phone);
    setCurrentPassword(password);
    setIsNew(isNew);
    setForm(hydrateProfile(profile || {}));
    setExistingPhotoUrl(profile?.profilePhotoUrl || "");
    setExistingCvUrl(profile?.cvPdfUrl || "");
    setExistingProfilePdfUrl(profile?.facultyProfilePdfUrl || "");
    setStep("editor");
  };

  // ── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.facultyName.trim()) {
      setResult({ success: false, message: "Faculty Name is required." });
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setResult({ success: false, message: "New passwords do not match. Please check and retry." });
      return;
    }
    if (newPassword && newPassword.length < 8) {
      setResult({ success: false, message: "New password must be at least 8 characters." });
      return;
    }

    setSubmitting(true);
    setResult(null);

    const fd = new window.FormData();
    fd.append("phone", phone);
    fd.append("password", currentPassword);
    if (newPassword.trim()) fd.append("newPassword", newPassword.trim());
    if (photoFile) fd.append("profilePhoto", photoFile);
    if (cvFile) fd.append("cvPdf", cvFile);
    if (profilePdfFile) fd.append("facultyProfilePdf", profilePdfFile);

    const payload = {
      ...form,
      areaOfExpertise: form.areaOfExpertise.split(",").map(s => s.trim()).filter(Boolean),
      languagesKnown: form.languagesKnown.split(",").map(s => s.trim()).filter(Boolean),
      researchAreas: form.researchAreas.split(",").map(s => s.trim()).filter(Boolean),
      metaKeywords: form.metaKeywords.split(",").map(s => s.trim()).filter(Boolean),
    };
    fd.append("profileData", JSON.stringify(payload));

    try {
      const res = await fetch("/api/faculty-update", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: `Profile ${data.action} successfully!`, url: data.profileUrl });
        if (newPassword.trim()) {
          setCurrentPassword(newPassword.trim());
          setNewPassword("");
          setConfirmPassword("");
        }
        setIsNew(false);
      } else {
        setResult({ success: false, message: data.error || "Something went wrong." });
      }
    } catch {
      setResult({ success: false, message: "Network error. Please try again." });
    }

    setSubmitting(false);
  };

  // ── Login Screen ──────────────────────────────────────────────────────
  if (step === "login") {
    return <LoginScreen onSuccess={handleLoginSuccess} />;
  }

  // ── Editor ────────────────────────────────────────────────────────────
  const tog = (id: string) => setOpenSection(s => s === id ? "" : id);

  const sections = [
    {
      id: "files", icon: Upload, title: "📁 Profile Files (Photo & PDFs)",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FileUpload label="Profile Photo" accept="image/*" file={photoFile} onFile={setPhotoFile}
            existingUrl={existingPhotoUrl} preview icon={ImageIcon} />
          <FileUpload label="CV / Resume PDF" accept=".pdf,application/pdf" file={cvFile} onFile={setCvFile}
            existingUrl={existingCvUrl} icon={FileIcon} />
          <FileUpload label="Faculty Profile PDF" accept=".pdf,application/pdf" file={profilePdfFile} onFile={setProfilePdfFile}
            existingUrl={existingProfilePdfUrl} icon={FileIcon} />
        </div>
      )
    },
    {
      id: "basic", icon: User, title: "1. Basic Profile Details",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Lbl label="Faculty Name" req><Inp value={form.facultyName} onChange={v => set("facultyName", v)} placeholder="Dr. / Mrs. / Ms. Full Name" /></Lbl>
          <Lbl label="Designation"><Inp value={form.designation} onChange={v => set("designation", v)} placeholder="Assistant Professor" /></Lbl>
          <Lbl label="Department"><Sel value={form.department} onChange={v => set("department", v)} options={DEPTS} /></Lbl>
          <Lbl label="Faculty ID"><Inp value={form.facultyId} onChange={v => set("facultyId", v)} placeholder="FAC-001" /></Lbl>
          <Lbl label="Gender"><Sel value={form.gender} onChange={v => set("gender", v)} options={["Female","Male","Other"]} /></Lbl>
          <Lbl label="Date of Birth"><Inp type="date" value={form.dateOfBirth} onChange={v => set("dateOfBirth", v)} /></Lbl>
          <Lbl label="Date of Joining"><Inp type="date" value={form.dateOfJoining} onChange={v => set("dateOfJoining", v)} /></Lbl>
          <Lbl label="Employment Type"><Sel value={form.employmentType} onChange={v => set("employmentType", v)} options={["Regular","Contract","Visiting","Adjunct","Part-Time"]} /></Lbl>
          <Lbl label="Official Email"><Inp value={form.officialEmail} onChange={v => set("officialEmail", v)} placeholder="email@stannscollege.org" /></Lbl>
          <Lbl label="Office / Cabin Location"><Inp value={form.officeLocation} onChange={v => set("officeLocation", v)} placeholder="Room 201, Block B" /></Lbl>
          <Lbl label="Faculty Status"><Sel value={form.facultyStatus} onChange={v => set("facultyStatus", v)} options={[{label:"Active",value:"active"},{label:"Inactive",value:"inactive"}]} /></Lbl>
        </div>
      )
    },
    {
      id: "academic", icon: GraduationCap, title: "2. Academic Qualifications",
      content: (
        <div className="flex flex-col gap-4">
          <Lbl label="Highest Qualification"><Inp value={form.highestQualification} onChange={v => set("highestQualification", v)} placeholder="Ph.D." /></Lbl>
          <Rep label="Qualification" items={form.qualifications}
            onAdd={() => addEntry("qualifications", ["degreeName","specialization","university","yearOfPassing","gradePercentage"])}
            onRemove={i => remEntry("qualifications", i)} onUpdate={(i,k,v) => updEntry("qualifications",i,k,v)}
            fields={[{key:"degreeName",label:"Degree"},{key:"specialization",label:"Specialization"},{key:"university",label:"University / Institution"},{key:"yearOfPassing",label:"Year of Passing"},{key:"gradePercentage",label:"Grade / %"}]} />
        </div>
      )
    },
    {
      id: "experience", icon: Briefcase, title: "3. Professional Experience",
      content: (
        <div className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <Lbl label="Total Experience (Yrs)"><Inp value={form.totalExperience} onChange={v => set("totalExperience", v)} placeholder="15" /></Lbl>
            <Lbl label="Teaching Exp. (Yrs)"><Inp value={form.teachingExperience} onChange={v => set("teachingExperience", v)} placeholder="12" /></Lbl>
            <Lbl label="Industry Exp. (Yrs)"><Inp value={form.industryExperience} onChange={v => set("industryExperience", v)} placeholder="3" /></Lbl>
          </div>
          <Rep label="Experience" items={form.professionalExperience}
            onAdd={() => addEntry("professionalExperience", ["organization","designation","fromDate","toDate","description"])}
            onRemove={i => remEntry("professionalExperience", i)} onUpdate={(i,k,v) => updEntry("professionalExperience",i,k,v)}
            fields={[{key:"organization",label:"Organization"},{key:"designation",label:"Role"},{key:"fromDate",label:"From"},{key:"toDate",label:"To"},{key:"description",label:"Description",type:"textarea"}]} />
        </div>
      )
    },
    {
      id: "summary", icon: Lightbulb, title: "4. Profile Summary",
      content: (
        <div className="flex flex-col gap-4">
          <Lbl label="Short Bio"><Txt value={form.shortBio} onChange={v => set("shortBio", v)} rows={4} placeholder="Brief professional biography..." /></Lbl>
          <Lbl label="Career Objective"><Txt value={form.careerObjective} onChange={v => set("careerObjective", v)} /></Lbl>
          <Lbl label="Teaching Philosophy"><Txt value={form.teachingPhilosophy} onChange={v => set("teachingPhilosophy", v)} /></Lbl>
          <Lbl label="Area of Expertise (comma-separated)"><Inp value={form.areaOfExpertise} onChange={v => set("areaOfExpertise", v)} placeholder="Pharmacology, Drug Design, Research" /></Lbl>
          <Lbl label="Languages Known (comma-separated)"><Inp value={form.languagesKnown} onChange={v => set("languagesKnown", v)} placeholder="Telugu, English, Hindi" /></Lbl>
        </div>
      )
    },
    {
      id: "teaching", icon: BookOpen, title: "5. Teaching Details",
      content: (
        <Rep label="Subject" items={form.subjectsHandled}
          onAdd={() => addEntry("subjectsHandled", ["subjectName","courseProgram","semesterYear","academicYear","materialsLink"])}
          onRemove={i => remEntry("subjectsHandled", i)} onUpdate={(i,k,v) => updEntry("subjectsHandled",i,k,v)}
          fields={[{key:"subjectName",label:"Subject"},{key:"courseProgram",label:"Course"},{key:"semesterYear",label:"Semester"},{key:"academicYear",label:"Academic Year"},{key:"materialsLink",label:"Materials URL",type:"url"}]} />
      )
    },
    {
      id: "research", icon: FlaskConical, title: "6. Research Details",
      content: (
        <div className="flex flex-col gap-5">
          <Lbl label="Research Areas (comma-separated)"><Inp value={form.researchAreas} onChange={v => set("researchAreas", v)} placeholder="Bioinformatics, Drug Discovery" /></Lbl>
          <Lbl label="Research Interests"><Txt value={form.researchInterests} onChange={v => set("researchInterests", v)} /></Lbl>
          <div className="text-xs font-black text-[#002147] uppercase tracking-wider pt-1">Ongoing Projects</div>
          <Rep label="Ongoing Project" items={form.ongoingProjects}
            onAdd={() => addEntry("ongoingProjects", ["projectTitle","fundingAgency","amountReceived","duration","role","projectStatus"])}
            onRemove={i => remEntry("ongoingProjects", i)} onUpdate={(i,k,v) => updEntry("ongoingProjects",i,k,v)}
            fields={[{key:"projectTitle",label:"Title"},{key:"fundingAgency",label:"Funding Agency"},{key:"amountReceived",label:"Amount"},{key:"duration",label:"Duration"},{key:"role",label:"Role (PI/Co-PI)"},{key:"projectStatus",label:"Status",type:"select",options:PROJ_STATUS}]} />
          <div className="text-xs font-black text-[#002147] uppercase tracking-wider pt-1">Completed Projects</div>
          <Rep label="Completed Project" items={form.completedProjects}
            onAdd={() => addEntry("completedProjects", ["projectTitle","fundingAgency","amountReceived","duration","role","projectStatus"])}
            onRemove={i => remEntry("completedProjects", i)} onUpdate={(i,k,v) => updEntry("completedProjects",i,k,v)}
            fields={[{key:"projectTitle",label:"Title"},{key:"fundingAgency",label:"Funding Agency"},{key:"amountReceived",label:"Amount"},{key:"duration",label:"Duration"},{key:"role",label:"Role"},{key:"projectStatus",label:"Status",type:"select",options:PROJ_STATUS}]} />
        </div>
      )
    },
    {
      id: "publications", icon: FileText, title: "7. Publications",
      content: (
        <Rep label="Publication" items={form.publications}
          onAdd={() => addEntry("publications", ["publicationTitle","journalName","publicationType","authors","year","volumeIssuePages","doiLink","indexing"])}
          onRemove={i => remEntry("publications", i)} onUpdate={(i,k,v) => updEntry("publications",i,k,v)}
          fields={[{key:"publicationTitle",label:"Title"},{key:"journalName",label:"Journal / Conference"},{key:"publicationType",label:"Type",type:"select",options:PUB_TYPES},{key:"authors",label:"Authors"},{key:"year",label:"Year"},{key:"volumeIssuePages",label:"Vol / Issue / Pages"},{key:"doiLink",label:"DOI Link",type:"url"},{key:"indexing",label:"Indexing",type:"select",options:INDEXING}]} />
      )
    },
    {
      id: "books", icon: BookMarked, title: "8. Books, Patents & Copyrights",
      content: (
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-xs font-black text-[#002147] uppercase tracking-wider mb-3">Books Published</div>
            <Rep label="Book" items={form.booksPublished}
              onAdd={() => addEntry("booksPublished", ["bookTitle","publisherName","isbnNumber","publishedYear"])}
              onRemove={i => remEntry("booksPublished", i)} onUpdate={(i,k,v) => updEntry("booksPublished",i,k,v)}
              fields={[{key:"bookTitle",label:"Book Title"},{key:"publisherName",label:"Publisher"},{key:"isbnNumber",label:"ISBN"},{key:"publishedYear",label:"Year"}]} />
          </div>
          <div>
            <div className="text-xs font-black text-[#002147] uppercase tracking-wider mb-3">Patents</div>
            <Rep label="Patent" items={form.patents}
              onAdd={() => addEntry("patents", ["patentTitle","patentNumber","patentStatus","filedDate"])}
              onRemove={i => remEntry("patents", i)} onUpdate={(i,k,v) => updEntry("patents",i,k,v)}
              fields={[{key:"patentTitle",label:"Title"},{key:"patentNumber",label:"Number"},{key:"patentStatus",label:"Status",type:"select",options:["Filed","Published","Granted","Abandoned"]},{key:"filedDate",label:"Filed Date"}]} />
          </div>
        </div>
      )
    },
    {
      id: "events", icon: Calendar, title: "9. Conferences, FDPs & Workshops",
      content: (
        <div className="flex flex-col gap-6">
          {([["conferencesAttended","Conference"],["seminarsAttended","Seminar"],["fdpsAttended","FDP"],["workshopsAttended","Workshop"]] as [keyof FormData, string][]).map(([key, label]) => (
            <div key={key as string}>
              <div className="text-xs font-black text-[#002147] uppercase tracking-wider mb-3">{label}s</div>
              <Rep label={label} items={form[key] as Entry[]}
                onAdd={() => addEntry(key, ["eventTitle","organizedBy","location","fromDate","toDate"])}
                onRemove={i => remEntry(key, i)} onUpdate={(i,k,v) => updEntry(key,i,k,v)}
                fields={[{key:"eventTitle",label:"Title"},{key:"organizedBy",label:"Organized By"},{key:"location",label:"Location"},{key:"fromDate",label:"From"},{key:"toDate",label:"To"}]} />
            </div>
          ))}
        </div>
      )
    },
    {
      id: "awards", icon: Award, title: "10. Awards & Achievements",
      content: (
        <Rep label="Award" items={form.awards}
          onAdd={() => addEntry("awards", ["awardTitle","awardedBy","awardYear","description"])}
          onRemove={i => remEntry("awards", i)} onUpdate={(i,k,v) => updEntry("awards",i,k,v)}
          fields={[{key:"awardTitle",label:"Award Title"},{key:"awardedBy",label:"Awarded By"},{key:"awardYear",label:"Year"},{key:"description",label:"Description",type:"textarea"}]} />
      )
    },
    {
      id: "roles", icon: Shield, title: "11. Roles & Responsibilities",
      content: (
        <div className="flex flex-col gap-5">
          <Lbl label="Current Administrative Role"><Inp value={form.currentAdministrativeRole} onChange={v => set("currentAdministrativeRole", v)} placeholder="HoD / IQAC Coordinator" /></Lbl>
          <div className="text-xs font-black text-[#002147] uppercase tracking-wider">Department Responsibilities</div>
          <Rep label="Responsibility" items={form.departmentResponsibilities}
            onAdd={() => addEntry("departmentResponsibilities", ["roleName","academicYear","description"])}
            onRemove={i => remEntry("departmentResponsibilities", i)} onUpdate={(i,k,v) => updEntry("departmentResponsibilities",i,k,v)}
            fields={[{key:"roleName",label:"Role"},{key:"academicYear",label:"Academic Year"},{key:"description",label:"Description",type:"textarea"}]} />
          <div className="text-xs font-black text-[#002147] uppercase tracking-wider">Committee Memberships</div>
          <Rep label="Committee" items={form.committeeMemberships}
            onAdd={() => addEntry("committeeMemberships", ["committeeName","academicYear","description"])}
            onRemove={i => remEntry("committeeMemberships", i)} onUpdate={(i,k,v) => updEntry("committeeMemberships",i,k,v)}
            fields={[{key:"committeeName",label:"Committee"},{key:"academicYear",label:"Year"},{key:"description",label:"Description",type:"textarea"}]} />
        </div>
      )
    },
    {
      id: "guidance", icon: Target, title: "12. Student Guidance",
      content: (
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-xs font-black text-[#002147] uppercase tracking-wider mb-3">Projects Guided</div>
            <Rep label="Project" items={form.projectsGuided}
              onAdd={() => addEntry("projectsGuided", ["studentName","projectTitle","course","academicYear","projectStatus"])}
              onRemove={i => remEntry("projectsGuided", i)} onUpdate={(i,k,v) => updEntry("projectsGuided",i,k,v)}
              fields={[{key:"studentName",label:"Student Name"},{key:"projectTitle",label:"Project Title"},{key:"course",label:"Course"},{key:"academicYear",label:"Year"},{key:"projectStatus",label:"Status",type:"select",options:["Ongoing","Completed","Submitted"]}]} />
          </div>
          <div>
            <div className="text-xs font-black text-[#002147] uppercase tracking-wider mb-3">Research Scholars</div>
            <Rep label="Scholar" items={form.researchScholars}
              onAdd={() => addEntry("researchScholars", ["scholarName","researchTopic","guidanceStatus"])}
              onRemove={i => remEntry("researchScholars", i)} onUpdate={(i,k,v) => updEntry("researchScholars",i,k,v)}
              fields={[{key:"scholarName",label:"Scholar Name"},{key:"researchTopic",label:"Research Topic"},{key:"guidanceStatus",label:"Status",type:"select",options:["Ongoing","Submitted","Awarded"]}]} />
          </div>
        </div>
      )
    },
    {
      id: "memberships", icon: Network, title: "13. Professional Memberships",
      content: (
        <Rep label="Membership" items={form.professionalMemberships}
          onAdd={() => addEntry("professionalMemberships", ["organization","membershipId","membershipType","validity"])}
          onRemove={i => remEntry("professionalMemberships", i)} onUpdate={(i,k,v) => updEntry("professionalMemberships",i,k,v)}
          fields={[{key:"organization",label:"Organization"},{key:"membershipId",label:"ID"},{key:"membershipType",label:"Type"},{key:"validity",label:"Valid Until"}]} />
      )
    },
    {
      id: "online", icon: Globe, title: "14. Online Profile Links",
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <Lbl label="LinkedIn URL"><Inp type="url" value={form.linkedinUrl} onChange={v => set("linkedinUrl", v)} placeholder="https://linkedin.com/in/..." /></Lbl>
          <Lbl label="Google Scholar URL"><Inp type="url" value={form.googleScholarUrl} onChange={v => set("googleScholarUrl", v)} placeholder="https://scholar.google.com/..." /></Lbl>
          <Lbl label="ORCID ID"><Inp value={form.orcidId} onChange={v => set("orcidId", v)} placeholder="0000-0000-0000-0000" /></Lbl>
          <Lbl label="Scopus ID"><Inp value={form.scopusId} onChange={v => set("scopusId", v)} placeholder="57XXXXXXXXX" /></Lbl>
          <Lbl label="ResearchGate URL"><Inp type="url" value={form.researchGateUrl} onChange={v => set("researchGateUrl", v)} placeholder="https://researchgate.net/..." /></Lbl>
          <Lbl label="Personal Website"><Inp type="url" value={form.personalWebsite} onChange={v => set("personalWebsite", v)} placeholder="https://..." /></Lbl>
        </div>
      )
    },
    {
      id: "seo", icon: Star, title: "16. SEO Fields",
      content: (
        <div className="flex flex-col gap-4">
          <Lbl label="Meta Title"><Inp value={form.metaTitle} onChange={v => set("metaTitle", v)} placeholder="Dr. Name | Faculty | St. Ann's College" /></Lbl>
          <Lbl label="Meta Description"><Txt value={form.metaDescription} onChange={v => set("metaDescription", v)} /></Lbl>
          <Lbl label="Meta Keywords (comma-separated)"><Inp value={form.metaKeywords} onChange={v => set("metaKeywords", v)} placeholder="faculty, pharmacy, research" /></Lbl>
          <Lbl label="Photo Alt Text"><Inp value={form.imageAltText} onChange={v => set("imageAltText", v)} /></Lbl>
        </div>
      )
    },
    {
      id: "admin", icon: Building2, title: "17. Admin & Visibility",
      content: (
        <div className="grid sm:grid-cols-2 gap-6">
          <Lbl label="Display Order (lower = first)"><Inp value={form.displayOrder} onChange={v => set("displayOrder", v)} placeholder="1" /></Lbl>
          <div className="flex flex-col gap-3 sm:pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.featuredFaculty} onChange={e => set("featuredFaculty", e.target.checked)} className="h-5 w-5 accent-indigo-600 rounded cursor-pointer" />
              <span className="font-bold text-slate-700 text-sm">Featured Faculty</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.showOnWebsite} onChange={e => set("showOnWebsite", e.target.checked)} className="h-5 w-5 accent-emerald-600 rounded cursor-pointer" />
              <span className="font-bold text-slate-700 text-sm">Show on Website (Publish)</span>
            </label>
          </div>
        </div>
      )
    },
    {
      id: "password", icon: Key, title: "🔐 Change Password",
      content: (
        <div className="flex flex-col gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-amber-800 text-xs font-bold">
            Leave blank to keep your current password. After changing, use the new password on your next login.
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Lbl label="New Password">
              <div className="relative">
                <input type={showNewPw ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters" className={base + " pr-12"} />
                <button type="button" onClick={() => setShowNewPw(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                  {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Lbl>
            <Lbl label="Confirm New Password">
              <div className="relative">
                <input type={showNewPw ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password" className={base} />
                {newPassword && confirmPassword && (
                  <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${newPassword === confirmPassword ? "text-emerald-500" : "text-rose-400"}`}>
                    {newPassword === confirmPassword ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  </div>
                )}
              </div>
            </Lbl>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100 font-sans">

      {/* Top Nav */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-[#002147] flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="font-black text-[#002147] text-sm truncate">
                {form.facultyName || "Faculty Profile"}
              </div>
              <div className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Phone className="h-3 w-3" />{phone}
                {isNew && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-black text-[9px] uppercase ml-1">New Profile</span>}
                {!isNew && <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-black text-[9px] uppercase ml-1">Existing Profile</span>}
              </div>
            </div>
          </div>
          <button onClick={() => { setStep("login"); setForm(EMPTY_FORM); setPhotoFile(null); setCvFile(null); setProfilePdfFile(null); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-black text-xs transition-colors shrink-0">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Result Banner */}
        {result && (
          <div className={`flex flex-col gap-1.5 px-5 py-4 rounded-2xl border-2 mb-6 ${result.success ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
            <div className={`flex items-center gap-3 font-black text-sm ${result.success ? "text-emerald-800" : "text-rose-800"}`}>
              {result.success ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
              {result.message}
            </div>
            {result.url && (
              <a href={result.url} target="_blank" rel="noopener noreferrer"
                className="text-emerald-700 font-black text-xs hover:underline ml-8 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" /> View Published Profile
              </a>
            )}
          </div>
        )}

        {/* Accordion sections */}
        <div className="flex flex-col gap-4">
          {sections.map(s => (
            <Acc key={s.id} icon={s.icon} title={s.title} open={openSection === s.id} onToggle={() => tog(s.id)}>
              {s.content}
            </Acc>
          ))}
        </div>

        {/* Submit bar */}
        <div className="mt-6 bg-white border-2 border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <div className="font-black text-[#002147] text-base">
              {isNew ? "Create New Profile" : "Save & Update Profile"}
            </div>
            <p className="text-slate-400 font-semibold text-xs mt-0.5">
              {isNew
                ? "This will create a new faculty profile in Sanity. Remember to check 'Show on Website' to publish it."
                : "Updates your existing profile. Changes are live immediately after saving."}
            </p>
          </div>
          <button onClick={handleSubmit} disabled={submitting}
            className="shrink-0 flex items-center gap-3 bg-gradient-to-r from-[#002147] to-[#083b75] hover:from-[#003070] hover:to-[#0a4d96] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black px-8 py-4 rounded-2xl text-sm transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
            {submitting
              ? <><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
              : <><Save className="h-5 w-5" />{isNew ? "Create Profile" : "Save Changes"}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
