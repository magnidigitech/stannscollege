"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import { getDepartment } from "@/lib/sanity";
import { 
  Building, Target, GraduationCap, Briefcase, Award, Handshake, Users, BookOpen, 
  Settings, Sparkles, Loader2, Save, Key, Plus, Trash2, ChevronRight, HelpCircle, 
  CheckCircle, AlertTriangle, BarChart3, Trophy
} from "lucide-react";

// List of departments with slugs
const DEPARTMENTS = [
  { id: "department-of-commerce", name: "Department of Commerce" },
  { id: "department-of-computer-applications-bca", name: "Department of Computer Applications (BCA)" },
  { id: "department-of-computer-science-cs-artificial-intelligence", name: "Department of Computer Science & AI" },
  { id: "department-of-mathematics", name: "Department of Mathematics" },
  { id: "department-of-physics", name: "Department of Physics" },
  { id: "department-of-statistics", name: "Department of Statistics" },
  { id: "department-of-chemistry", name: "Department of Chemistry" },
  { id: "department-of-biotechnology", name: "Department of Biotechnology" },
  { id: "department-of-microbiology", name: "Department of Microbiology" },
  { id: "department-of-botany", name: "Department of Botany" },
  { id: "department-of-mca", name: "Department of MCA" },
  { id: "department-of-mba", name: "Department of MBA" },
  { id: "department-of-english", name: "Department of English" },
  { id: "department-of-oriental-languages-telugu-sanskrit-hindi", name: "Oriental Languages" }
];

function getSanityImageUrl(ref: string) {
  if (!ref) return "";
  const parts = ref.split("-");
  if (parts.length < 4) return "";
  const assetId = parts[1];
  const dimensions = parts[2];
  const extension = parts[3];
  return `https://cdn.sanity.io/images/fhjwqub5/production/${assetId}-${dimensions}.${extension}`;
}

export function DepartmentUpdateForm() {
  const [step, setStep] = useState<"login" | "editor">("login");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS[0].id);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });  // Form states matching Sanity department schema
  const [established, setEstablished] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState<string[]>([]);
  const [infrastructure, setInfrastructure] = useState<string[]>([]);
  const [careerOpps, setCareerOpps] = useState<string[]>([]);
  
  // Structured lists
  const [programmes, setProgrammes] = useState<Array<{ title: string; intake: string; duration: string }>>([]);
  const [valueAddedCourses, setValueAddedCourses] = useState<Array<{ 
    sNo: number; title: string; duration: string; fromTo: string; academicYear: string; 
    studentsEnrolled: string; certificateIssued: string; agency: string 
  }>>([]);
  const [mous, setMous] = useState<Array<{ 
    sNo: number; title: string; type: string; dateOfSigning: string; duration: string; 
    purpose: string; documentUrl: string; status: string 
  }>>([]);
  const [bestPractices, setBestPractices] = useState<Array<{
    title: string;
    category: string;
    objectives: string[];
    context: string;
    practice: string[];
    success: string[];
    problems: string[];
  }>>([]);
  const [activities, setActivities] = useState<Array<{ label: string; desc: string }>>([]);
  
  // New structured arrays
  const [facultyMembers, setFacultyMembers] = useState<Array<{ 
    name: string; designation: string; qualification: string; experience: string; email: string 
  }>>([]);
  const [passPercentage, setPassPercentage] = useState<Array<{ 
    year: string; programme: string; finalYearStudents: string; studentsPassed: string; percentage: string 
  }>>([]);
  const [mouActivities, setMouActivities] = useState<Array<{ 
    sNo: number; organization: string; activity: string; date: string; participants: string; documentUrl: string 
  }>>([]);
  const [studentAchievements, setStudentAchievements] = useState<Array<{ 
    sNo: number; date: string; name: string; activity: string; level: string; achievement: string 
  }>>([]);
  const [academicAchievements, setAcademicAchievements] = useState<Array<{ 
    sNo: number; year: string; name: string; programme: string; award: string; marks: string 
  }>>([]);
  const [placements, setPlacements] = useState<Array<{ 
    year: string; finalYearStudents: string; studentsPlaced: string; highestSalary: string; averageSalary: string; percentage: string 
  }>>([]);
  const [activitiesList, setActivitiesList] = useState<Array<{ 
    sNo: number; date: string; title: string; type: string; resourcePerson: string; participants: string; documentUrl: string 
  }>>([]);
  const [activitiesSummary, setActivitiesSummary] = useState<Array<{ 
    sNo: number; year: string; category: string; count: string; studentsBenefited: string; keyActivities: string; documentUrl: string 
  }>>([]);
  const [internships, setInternships] = useState<Array<{ 
    sNo: number; year: string; name: string; duration: string; organization: string; areaOfWork: string; programme: string 
  }>>([]);
  const [bestPracticesImpact, setBestPracticesImpact] = useState<string[]>([]);
  const [gallery, setGallery] = useState<Array<{ image?: any; file?: File | null; caption: string }>>([]);
  const [otherStudentAchievements, setOtherStudentAchievements] = useState<string[]>([]);
  const [focusOnWomenEmpowerment, setFocusOnWomenEmpowerment] = useState("");
  const [overallApproach, setOverallApproach] = useState("");

  // Load existing data for selected department
  const loadDeptData = async () => {
    setLoading(true);
    setStatusMsg({ type: "", text: "" });
    try {
      const data = await getDepartment(selectedDeptId);
      if (data) {
        setEstablished(data.established || "");
        setTagline(data.tagline || "");
        setDescription(data.description || "");
        setVision(data.vision || "");
        setMission(data.mission || []);
        setInfrastructure(data.infrastructure || []);
        setCareerOpps(data.careerOpps || []);
        setProgrammes(data.programmes || []);
        setValueAddedCourses(data.valueAddedCourses || []);
        setMous(data.mous || []);
        setBestPractices(data.bestPractices || []);
        setActivities(data.activities || []);
        setFacultyMembers(data.facultyMembers || []);
        setPassPercentage(data.passPercentage || []);
        setMouActivities(data.mouActivities || []);
        setStudentAchievements(data.studentAchievements || []);
        setAcademicAchievements(data.academicAchievements || []);
        setPlacements(data.placements || []);
        setActivitiesList(data.activitiesList || []);
        setActivitiesSummary(data.activitiesSummary || []);
        setInternships(data.internships || []);
        setBestPracticesImpact(data.bestPracticesImpact || []);
        const mappedGallery = (data.gallery || []).map((g: any) => ({
          ...g,
          file: null
        }));
        setGallery(mappedGallery);
        setOtherStudentAchievements(data.otherStudentAchievements || []);
        setFocusOnWomenEmpowerment(data.focusOnWomenEmpowerment || "");
        setOverallApproach(data.overallApproach || "");
      }
    } catch (err) {
      console.error("Failed to load department data:", err);
      setStatusMsg({ type: "error", text: "Failed to fetch existing department details." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === "editor") {
      loadDeptData();
    }
  }, [selectedDeptId, step]);
  // Form list item handlers
  const handleAddStringItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[]) => {
    setter([...list, ""]);
  };

  const handleUpdateStringItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[], index: number, value: string) => {
    const next = [...list];
    next[index] = value;
    setter(next);
  };

  const handleRemoveStringItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[], index: number) => {
    setter(list.filter((_, i) => i !== index));
  };

  // Publish changes to Sanity via secure API endpoint
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg({ type: "", text: "" });

    const fd = new window.FormData();
    fd.append("password", password);
    fd.append("selectedDeptId", selectedDeptId);

    const galleryPayload = gallery.map((item, idx) => {
      if (item.file) {
        fd.append(`galleryImage_${idx}`, item.file);
      }
      return {
        image: item.image,
        caption: item.caption
      };
    });

    const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId);
    const name = selectedDept ? selectedDept.name : "Department Profile";

    const documentData = {
      _id: `department-${selectedDeptId}`,
      _type: "department",
      name: name,
      slug: {
        _type: "slug",
        current: selectedDeptId
      },
      established,
      tagline,
      description,
      vision,
      mission,
      programmes,
      valueAddedCourses,
      mous,
      bestPractices,
      activities,
      infrastructure,
      careerOpps,
      facultyMembers,
      passPercentage,
      mouActivities,
      studentAchievements,
      academicAchievements,
      placements,
      activitiesList,
      activitiesSummary,
      internships,
      bestPracticesImpact,
      gallery: galleryPayload,
      otherStudentAchievements,
      focusOnWomenEmpowerment,
      overallApproach
    };

    fd.append("departmentData", JSON.stringify(documentData));

    try {
      const res = await fetch("/api/department-update", {
        method: "POST",
        body: fd
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: data.message });
        await loadDeptData();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Save failed." });
      }
    } catch (err: any) {
      console.error("Publish error:", err);
      setStatusMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (step === "login") {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === "Stannsf@2026") {
        setStep("editor");
        setStatusMsg({ type: "", text: "" });
      } else {
        setStatusMsg({ type: "error", text: "Incorrect password. Access denied." });
      }
    };

    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-150 animate-fadeIn">
          <div className="bg-gradient-to-r from-[#002147] to-[#0a4d96] px-8 py-7 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-200" />
              </div>
              <div>
                <div className="font-outfit font-black text-xl">Department Portal</div>
                <div className="text-blue-200 font-semibold text-xs mt-0.5">St. Ann's College for Women</div>
              </div>
            </div>
            <p className="text-blue-200/80 text-xs font-semibold leading-relaxed">
              Select your department and enter the portal password to customize content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="px-8 py-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Target Department</label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-400 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-slate-700 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter portal password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-400 rounded-xl px-4 py-2.5 pl-4 pr-12 text-xs md:text-sm font-bold text-slate-700 focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-indigo-650 transition-colors focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {statusMsg.text && statusMsg.type === "error" && (
              <div className="p-3 bg-red-50 border-2 border-red-100 rounded-2xl text-red-950 text-xs font-bold flex items-center gap-2">
                <span>⚠️ {statusMsg.text}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#002147] to-[#0a4d96] hover:from-[#003070] hover:to-[#0c5cb0] text-white font-black py-3.5 rounded-2xl text-xs md:text-sm transition-all shadow-lg hover:shadow-xl active:scale-[0.98] uppercase tracking-wider"
            >
              Access Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 font-sans">
      
      {/* Sticky top nav for editor */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm px-6 py-3.5 flex items-center justify-between gap-4 rounded-3xl">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-[#002147] flex items-center justify-center shrink-0">
            <Building className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-black text-[#002147] text-xs md:text-sm truncate">
              {DEPARTMENTS.find(d => d.id === selectedDeptId)?.name || "Department Details"}
            </div>
            <div className="text-[10px] font-semibold text-slate-400">
              Editing Portal
            </div>
          </div>
        </div>
        <button 
          onClick={() => { setStep("login"); setPassword(""); setStatusMsg({ type: "", text: "" }); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-black text-xs transition-colors shrink-0"
        >
          Logout
        </button>
      </div>

      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#002147] to-[#0a3d75] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Settings className="h-96 w-96" />
        </div>
        <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 px-4 py-1.5 rounded-full w-fit">
            <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" /> Content Manager
          </span>
          <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Academic Department Customizer
          </h2>
          <p className="text-blue-150/90 font-medium text-xs md:text-sm mt-1 leading-relaxed">
            Fill in the profiles for each department and publish them directly to Sanity CMS. Pushed edits will be visible on the site immediately.
          </p>
        </div>
      </div>

      {/* Status Indicators */}
      {statusMsg.text && (
        <div className={`p-5 rounded-3xl border flex items-start gap-4 shadow-sm animate-fade-in ${
          statusMsg.type === "success" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-950" 
            : "bg-red-50 border-red-200 text-red-950"
        }`}>
          {statusMsg.type === "success" ? (
            <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-6 w-6 text-red-650 shrink-0 mt-0.5" />
          )}
          <div className="flex flex-col gap-1">
            <span className="font-black text-sm uppercase tracking-wider">
              {statusMsg.type === "success" ? "Publish Successful" : "Transaction Failed"}
            </span>
            <p className="font-semibold text-xs leading-relaxed opacity-90">{statusMsg.text}</p>
          </div>
        </div>
      )}

      {/* Form Area */}
      <form onSubmit={handlePublish} className="flex flex-col gap-10">
        
        {/* Setup Configuration Panel */}
        <div className="bg-white border border-slate-200/85 rounded-[2rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Key className="h-5 w-5 text-[#002147]" />
            <h3 className="font-outfit font-black text-lg text-[#002147]">1. Selected Department</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Target Department</label>
              <input
                type="text"
                readOnly
                value={DEPARTMENTS.find(d => d.id === selectedDeptId)?.name || ""}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-bold text-slate-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white border border-slate-100 rounded-[2rem]">
            <Loader2 className="h-8 w-8 text-[#002147] animate-spin" />
            <p className="text-slate-500 font-bold text-xs tracking-wide animate-pulse">Syncing Department Configuration...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            
            {/* 2. Core Profile Card */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <Building className="h-5 w-5 text-[#002147]" />
                <h3 className="font-outfit font-black text-lg text-[#002147]">2. Core Profile Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">Established Year</label>
                  <input
                    type="text"
                    placeholder="e.g. 1997-98"
                    value={established}
                    onChange={(e) => setEstablished(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-bold text-slate-700 focus:bg-white focus:outline-none focus:border-indigo-400 transition-all"
                  />
                </div>
                <div className="md:col-span-3 flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">Tagline / Motto</label>
                  <input
                    type="text"
                    placeholder="e.g. Commerce Wonder World – Emphasizing Holistic Student Development"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-bold text-slate-700 focus:bg-white focus:outline-none focus:border-indigo-400 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">About / Overview</label>
                <textarea
                  rows={4}
                  placeholder="Provide a detailed overview of the department, its history, values, and objectives..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs md:text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:border-indigo-400 transition-all leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Vision Statement</label>
                <textarea
                  rows={3}
                  placeholder="State the primary vision of this academic department..."
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs md:text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:border-indigo-400 transition-all leading-relaxed"
                />
              </div>

              {/* Mission Points */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">Mission Points</label>
                  <button
                    type="button"
                    onClick={() => handleAddStringItem(setMission, mission)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Point
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {mission.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder={`Mission point ${idx + 1}`}
                        value={item}
                        onChange={(e) => handleUpdateStringItem(setMission, mission, idx, e.target.value)}
                        className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:border-indigo-400 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveStringItem(setMission, mission, idx)}
                        className="p-2.5 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                  {mission.length === 0 && (
                    <span className="text-[11px] text-slate-400 font-semibold italic">No mission points added yet.</span>
                  )}
                </div>
              </div>
            </div>            {/* 3. Academic Programmes Offered */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">3. Programmes Offered</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setProgrammes([...programmes, { title: "", intake: "", duration: "" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Programme
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {programmes.map((p, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60 flex flex-col gap-4 relative">
                    <button
                      type="button"
                      onClick={() => setProgrammes(programmes.filter((_, i) => i !== idx))}
                      className="absolute right-4 top-4 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                    <h4 className="font-outfit text-xs font-black uppercase text-[#002147]">Programme #{idx + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Programme Title</label>
                        <input
                          type="text"
                          placeholder="e.g. B.Com Honours (General)"
                          value={p.title}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].title = e.target.value;
                            setProgrammes(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Intake Capacity</label>
                        <input
                          type="text"
                          placeholder="e.g. 20 (14 Convener + 6 Mgmt)"
                          value={p.intake}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].intake = e.target.value;
                            setProgrammes(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Course Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 3 Years (6 Semesters)"
                          value={p.duration}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].duration = e.target.value;
                            setProgrammes(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {programmes.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No academic programmes added.</span>
                )}
              </div>
            </div>

            {/* 4. Faculty Directory */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">4. Faculty Directory</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setFacultyMembers([...facultyMembers, { name: "", designation: "", qualification: "", experience: "", email: "" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Faculty
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {facultyMembers.map((fac, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60 flex flex-col gap-4 relative">
                    <button
                      type="button"
                      onClick={() => setFacultyMembers(facultyMembers.filter((_, i) => i !== idx))}
                      className="absolute right-4 top-4 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                    <h4 className="font-outfit text-xs font-black uppercase text-[#002147]">Faculty Member #{idx + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Dr. A. Srinivas"
                          value={fac.name}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].name = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Designation</label>
                        <input
                          type="text"
                          placeholder="e.g. Assistant Professor"
                          value={fac.designation}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].designation = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Qualifications</label>
                        <input
                          type="text"
                          placeholder="e.g. M.Com, MBA, Ph.D"
                          value={fac.qualification}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].qualification = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Experience</label>
                        <input
                          type="text"
                          placeholder="e.g. 15 Years"
                          value={fac.experience}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].experience = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Email ID</label>
                        <input
                          type="email"
                          placeholder="e.g. fac@stannscollege.org"
                          value={fac.email}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].email = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {facultyMembers.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No faculty directory members added.</span>
                )}
              </div>
            </div>

            {/* 5. Outgoing Pass Percentages */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">5. Students' Pass Percentage</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPassPercentage([...passPercentage, { year: "", programme: "", finalYearStudents: "", studentsPassed: "", percentage: "" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Result Log
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {passPercentage.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setPassPercentage(passPercentage.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Academic Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2025-2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].year = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Programme</label>
                        <input
                          type="text"
                          placeholder="e.g. B.Com Honours CA"
                          value={item.programme}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].programme = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Final Year Students</label>
                        <input
                          type="text"
                          placeholder="e.g. 78"
                          value={item.finalYearStudents}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].finalYearStudents = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Students Passed</label>
                        <input
                          type="text"
                          placeholder="e.g. 74"
                          value={item.studentsPassed}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].studentsPassed = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Pass Percentage</label>
                        <input
                          type="text"
                          placeholder="e.g. 94.8%"
                          value={item.percentage}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].percentage = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {passPercentage.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No pass percentages logged yet.</span>
                )}
              </div>
            </div>

            {/* 6. Value-Added & Certificate Courses */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">6. Value-Added & Certificate Courses</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setValueAddedCourses([...valueAddedCourses, { sNo: valueAddedCourses.length + 1, title: "", duration: "", fromTo: "", academicYear: "", studentsEnrolled: "", certificateIssued: "Yes", agency: "" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Course
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {valueAddedCourses.map((c, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setValueAddedCourses(valueAddedCourses.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-4 flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Course Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Tally & GST Accounting"
                          value={c.title}
                          onChange={(e) => {
                            const next = [...valueAddedCourses];
                            next[idx].title = e.target.value;
                            setValueAddedCourses(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Duration (Hours)</label>
                        <input
                          type="text"
                          placeholder="e.g. 40 Hours"
                          value={c.duration}
                          onChange={(e) => {
                            const next = [...valueAddedCourses];
                            next[idx].duration = e.target.value;
                            setValueAddedCourses(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3 flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">From - To Dates</label>
                        <input
                          type="text"
                          placeholder="e.g. 12-08-2025 to 31-08-2025"
                          value={c.fromTo}
                          onChange={(e) => {
                            const next = [...valueAddedCourses];
                            next[idx].fromTo = e.target.value;
                            setValueAddedCourses(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="sm:col-span-3 flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Collaborating Agency</label>
                        <input
                          type="text"
                          placeholder="e.g. Nitya Computers"
                          value={c.agency}
                          onChange={(e) => {
                            const next = [...valueAddedCourses];
                            next[idx].agency = e.target.value;
                            setValueAddedCourses(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Academic Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2025-2026"
                          value={c.academicYear}
                          onChange={(e) => {
                            const next = [...valueAddedCourses];
                            next[idx].academicYear = e.target.value;
                            setValueAddedCourses(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">No. of Students Enrolled</label>
                        <input
                          type="text"
                          placeholder="e.g. 60"
                          value={c.studentsEnrolled}
                          onChange={(e) => {
                            const next = [...valueAddedCourses];
                            next[idx].studentsEnrolled = e.target.value;
                            setValueAddedCourses(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Certificate Issued (Yes/No)</label>
                        <input
                          type="text"
                          placeholder="e.g. Yes"
                          value={c.certificateIssued}
                          onChange={(e) => {
                            const next = [...valueAddedCourses];
                            next[idx].certificateIssued = e.target.value;
                            setValueAddedCourses(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {valueAddedCourses.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No certificate courses logged.</span>
                )}
              </div>
            </div>

            {/* 7. Student Internships */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">7. Student Internships</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInternships([...internships, { sNo: internships.length + 1, year: "", name: "", duration: "", organization: "", areaOfWork: "", programme: "" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Internship
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {internships.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setInternships(internships.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Academic Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2025-2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...internships];
                            next[idx].year = e.target.value;
                            setInternships(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Student Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Mary Jones"
                          value={item.name}
                          onChange={(e) => {
                            const next = [...internships];
                            next[idx].name = e.target.value;
                            setInternships(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 6 Weeks"
                          value={item.duration}
                          onChange={(e) => {
                            const next = [...internships];
                            next[idx].duration = e.target.value;
                            setInternships(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Organization Name</label>
                        <input
                          type="text"
                          placeholder="e.g. HDFC Bank"
                          value={item.organization}
                          onChange={(e) => {
                            const next = [...internships];
                            next[idx].organization = e.target.value;
                            setInternships(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Area of Work</label>
                        <input
                          type="text"
                          placeholder="e.g. Finance & Auditing"
                          value={item.areaOfWork}
                          onChange={(e) => {
                            const next = [...internships];
                            next[idx].areaOfWork = e.target.value;
                            setInternships(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Programme</label>
                        <input
                          type="text"
                          placeholder="e.g. B.Com Honours"
                          value={item.programme}
                          onChange={(e) => {
                            const next = [...internships];
                            next[idx].programme = e.target.value;
                            setInternships(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {internships.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No internships registered.</span>
                )}
              </div>
            </div>

            {/* 8. Partnerships & MoUs */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Handshake className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">8. Partnerships & MoUs</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMous([...mous, { sNo: mous.length + 1, title: "", type: "MoU", dateOfSigning: "", duration: "", purpose: "", documentUrl: "", status: "Active" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add MoU
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {mous.map((m, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setMous(mous.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Organization Name</label>
                        <input
                          type="text"
                          placeholder="e.g. ABC Chartered Firm"
                          value={m.title}
                          onChange={(e) => {
                            const next = [...mous];
                            next[idx].title = e.target.value;
                            setMous(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Partnership Type</label>
                        <input
                          type="text"
                          placeholder="e.g. MoU / Collaboration"
                          value={m.type}
                          onChange={(e) => {
                            const next = [...mous];
                            next[idx].type = e.target.value;
                            setMous(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Signing Date</label>
                        <input
                          type="text"
                          placeholder="e.g. 12-08-2025"
                          value={m.dateOfSigning}
                          onChange={(e) => {
                            const next = [...mous];
                            next[idx].dateOfSigning = e.target.value;
                            setMous(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 3 Years"
                          value={m.duration}
                          onChange={(e) => {
                            const next = [...mous];
                            next[idx].duration = e.target.value;
                            setMous(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Purpose / Scope</label>
                        <input
                          type="text"
                          placeholder="Detailed purpose of the collaboration..."
                          value={m.purpose}
                          onChange={(e) => {
                            const next = [...mous];
                            next[idx].purpose = e.target.value;
                            setMous(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Status (Active/Inactive)</label>
                        <input
                          type="text"
                          placeholder="e.g. Active"
                          value={m.status}
                          onChange={(e) => {
                            const next = [...mous];
                            next[idx].status = e.target.value;
                            setMous(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Document PDF URL</label>
                      <input
                        type="text"
                        placeholder="Link to file on Sanity or external document..."
                        value={m.documentUrl}
                        onChange={(e) => {
                          const next = [...mous];
                          next[idx].documentUrl = e.target.value;
                          setMous(next);
                        }}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                      />
                    </div>
                  </div>
                ))}
                {mous.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No partnerships listed.</span>
                )}
              </div>
            </div>

            {/* 9. MoU Activity Details */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Handshake className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">9. MoU Activities Conducted</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMouActivities([...mouActivities, { sNo: mouActivities.length + 1, organization: "", activity: "", date: "", participants: "", documentUrl: "" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add MoU Activity
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {mouActivities.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setMouActivities(mouActivities.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Partner Organization</label>
                        <input
                          type="text"
                          placeholder="e.g. ABC Chartered Accountants"
                          value={item.organization}
                          onChange={(e) => {
                            const next = [...mouActivities];
                            next[idx].organization = e.target.value;
                            setMouActivities(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Activity Conducted</label>
                        <input
                          type="text"
                          placeholder="e.g. Tally Training Seminar"
                          value={item.activity}
                          onChange={(e) => {
                            const next = [...mouActivities];
                            next[idx].activity = e.target.value;
                            setMouActivities(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Date</label>
                        <input
                          type="text"
                          placeholder="e.g. 15-09-2025"
                          value={item.date}
                          onChange={(e) => {
                            const next = [...mouActivities];
                            next[idx].date = e.target.value;
                            setMouActivities(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Participants Count</label>
                        <input
                          type="text"
                          placeholder="e.g. 80"
                          value={item.participants}
                          onChange={(e) => {
                            const next = [...mouActivities];
                            next[idx].participants = e.target.value;
                            setMouActivities(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Activity Report PDF URL</label>
                      <input
                        type="text"
                        placeholder="Link to file on Sanity or external document..."
                        value={item.documentUrl}
                        onChange={(e) => {
                          const next = [...mouActivities];
                          next[idx].documentUrl = e.target.value;
                          setMouActivities(next);
                        }}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                      />
                    </div>
                  </div>
                ))}
                {mouActivities.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No MoU activities registered.</span>
                )}
              </div>
            </div>

            {/* 10. Student Achievements & Laurels */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">10. Co-Curricular & Academic Laurels</h3>
                </div>
              </div>

              {/* General Achievements */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2 pt-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Co-Curricular / Extracurricular Achievements</span>
                  <button
                    type="button"
                    onClick={() => setStudentAchievements([...studentAchievements, { sNo: studentAchievements.length + 1, date: "", name: "", activity: "", level: "", achievement: "" }])}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded"
                  >
                    + Add Achievement
                  </button>
                </div>
                {studentAchievements.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setStudentAchievements(studentAchievements.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Date</label>
                        <input
                          type="text"
                          placeholder="e.g. 15-09-2025"
                          value={item.date}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].date = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Student Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Mary Jones"
                          value={item.name}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].name = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Activity / Competition</label>
                        <input
                          type="text"
                          placeholder="e.g. Elocution Contest"
                          value={item.activity}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].activity = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Level (State/National)</label>
                        <input
                          type="text"
                          placeholder="e.g. State Level"
                          value={item.level}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].level = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Achievement</label>
                        <input
                          type="text"
                          placeholder="e.g. First Prize"
                          value={item.achievement}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].achievement = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* University Ranks */}
              <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Academic University Ranks & Awards</span>
                  <button
                    type="button"
                    onClick={() => setAcademicAchievements([...academicAchievements, { sNo: academicAchievements.length + 1, year: "", name: "", programme: "", award: "", marks: "" }])}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded"
                  >
                    + Add Academic Honour
                  </button>
                </div>
                {academicAchievements.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setAcademicAchievements(academicAchievements.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Academic Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2025-2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...academicAchievements];
                            next[idx].year = e.target.value;
                            setAcademicAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Student Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Sarah Smith"
                          value={item.name}
                          onChange={(e) => {
                            const next = [...academicAchievements];
                            next[idx].name = e.target.value;
                            setAcademicAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Programme</label>
                        <input
                          type="text"
                          placeholder="e.g. B.Com Honours CA"
                          value={item.programme}
                          onChange={(e) => {
                            const next = [...academicAchievements];
                            next[idx].programme = e.target.value;
                            setAcademicAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Rank / Award Details</label>
                        <input
                          type="text"
                          placeholder="e.g. 1st Rank, Gold Medal"
                          value={item.award}
                          onChange={(e) => {
                            const next = [...academicAchievements];
                            next[idx].award = e.target.value;
                            setAcademicAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Marks/CGPA</label>
                        <input
                          type="text"
                          placeholder="e.g. 9.85 CGPA"
                          value={item.marks}
                          onChange={(e) => {
                            const next = [...academicAchievements];
                            next[idx].marks = e.target.value;
                            setAcademicAchievements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Other Student Achievements */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Other Student Achievements (Bullets)</span>
                  <button
                    type="button"
                    onClick={() => handleAddStringItem(setOtherStudentAchievements, otherStudentAchievements)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#002147]/5 text-[#002147] hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    <Plus className="h-3 w-3" /> Add Achievement Bullet
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {otherStudentAchievements.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder={`Achievement bullet ${idx + 1}`}
                        value={item}
                        onChange={(e) => handleUpdateStringItem(setOtherStudentAchievements, otherStudentAchievements, idx, e.target.value)}
                        className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveStringItem(setOtherStudentAchievements, otherStudentAchievements, idx)}
                        className="p-2 text-slate-450 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {otherStudentAchievements.length === 0 && (
                    <span className="text-[10px] text-slate-400 font-semibold italic">No other student achievements added.</span>
                  )}
                </div>
              </div>

              {/* Focus on Women Empowerment & Employability */}
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Focus on Women Empowerment & Employability</label>
                <textarea
                  rows={3}
                  placeholder="Describe the department's focus or initiatives on women empowerment & employability..."
                  value={focusOnWomenEmpowerment}
                  onChange={(e) => setFocusOnWomenEmpowerment(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:border-indigo-400 transition-all leading-relaxed"
                />
              </div>
            </div>

            {/* 11. Placement Summaries */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">11. Year-wise Placement Summaries</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPlacements([...placements, { year: "", finalYearStudents: "", studentsPlaced: "", highestSalary: "", averageSalary: "", percentage: "" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Placement Log
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {placements.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setPlacements(placements.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Academic Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2025-2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].year = e.target.value;
                            setPlacements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Final Year Students</label>
                        <input
                          type="text"
                          placeholder="e.g. 150"
                          value={item.finalYearStudents}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].finalYearStudents = e.target.value;
                            setPlacements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Students Placed</label>
                        <input
                          type="text"
                          placeholder="e.g. 120"
                          value={item.studentsPlaced}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].studentsPlaced = e.target.value;
                            setPlacements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Highest Salary (LPA)</label>
                        <input
                          type="text"
                          placeholder="e.g. 6.5"
                          value={item.highestSalary}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].highestSalary = e.target.value;
                            setPlacements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Average Salary (LPA)</label>
                        <input
                          type="text"
                          placeholder="e.g. 3.2"
                          value={item.averageSalary}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].averageSalary = e.target.value;
                            setPlacements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Placement %</label>
                        <input
                          type="text"
                          placeholder="e.g. 80%"
                          value={item.percentage}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].percentage = e.target.value;
                            setPlacements(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {placements.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No placement summaries logged yet.</span>
                )}
              </div>
            </div>

            {/* 12. Best Practices */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">12. Best Practices</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBestPractices([...bestPractices, { title: "", category: "", objectives: [], context: "", practice: [], success: [], problems: [] }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Practice
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {bestPractices.map((bp, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-4 relative">
                    <button
                      type="button"
                      onClick={() => setBestPractices(bestPractices.filter((_, i) => i !== idx))}
                      className="absolute right-4 top-4 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                    <h4 className="font-outfit text-xs font-black uppercase text-[#002147] border-b border-slate-200/60 pb-2">Best Practice #{idx + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Practice Title</label>
                        <input
                          type="text"
                          placeholder="e.g. 1. GST & Accounting Practical Training"
                          value={bp.title}
                          onChange={(e) => {
                            const next = [...bestPractices];
                            next[idx].title = e.target.value;
                            setBestPractices(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400">Category / Focus Tag</label>
                        <input
                          type="text"
                          placeholder="e.g. Skill-Oriented Learning Initiative"
                          value={bp.category}
                          onChange={(e) => {
                            const next = [...bestPractices];
                            next[idx].category = e.target.value;
                            setBestPractices(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400">Context Description</label>
                      <textarea
                        rows={3}
                        placeholder="State the background context for this practice..."
                        value={bp.context || ""}
                        onChange={(e) => {
                          const next = [...bestPractices];
                          next[idx].context = e.target.value;
                          setBestPractices(next);
                        }}
                        className="bg-white border border-slate-200 rounded-lg p-3 text-xs font-semibold text-slate-700"
                      />
                    </div>

                    {/* Objectives Sub-List */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-slate-500">Objectives</span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...bestPractices];
                            next[idx].objectives = [...bp.objectives, ""];
                            setBestPractices(next);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded"
                        >
                          + Add Objective
                        </button>
                      </div>
                      {bp.objectives.map((obj, oIdx) => (
                        <div key={oIdx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder={`Objective ${oIdx + 1}`}
                            value={obj}
                            onChange={(e) => {
                              const next = [...bestPractices];
                              next[idx].objectives[oIdx] = e.target.value;
                              setBestPractices(next);
                            }}
                            className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...bestPractices];
                              next[idx].objectives = bp.objectives.filter((_, i) => i !== oIdx);
                              setBestPractices(next);
                            }}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* The Practice Sub-List */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-slate-500">The Practice</span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...bestPractices];
                            next[idx].practice = [...bp.practice, ""];
                            setBestPractices(next);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded"
                        >
                          + Add Practice Line
                        </button>
                      </div>
                      {bp.practice.map((prac, pIdx) => (
                        <div key={pIdx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder={`Practice point ${pIdx + 1}`}
                            value={prac}
                            onChange={(e) => {
                              const next = [...bestPractices];
                              next[idx].practice[pIdx] = e.target.value;
                              setBestPractices(next);
                            }}
                            className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...bestPractices];
                              next[idx].practice = bp.practice.filter((_, i) => i !== pIdx);
                              setBestPractices(next);
                            }}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Success Sub-List */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-emerald-800">Evidence of Success</span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...bestPractices];
                            next[idx].success = [...bp.success, ""];
                            setBestPractices(next);
                          }}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded"
                        >
                          + Add Success Point
                        </button>
                      </div>
                      {bp.success.map((succ, sIdx) => (
                        <div key={sIdx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder={`Evidence of Success ${sIdx + 1}`}
                            value={succ}
                            onChange={(e) => {
                              const next = [...bestPractices];
                              next[idx].success[sIdx] = e.target.value;
                              setBestPractices(next);
                            }}
                            className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-950"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...bestPractices];
                              next[idx].success = bp.success.filter((_, i) => i !== sIdx);
                              setBestPractices(next);
                            }}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Problems Sub-List */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-red-800">Problems Encountered & Resources Required</span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...bestPractices];
                            next[idx].problems = [...(bp.problems || []), ""];
                            setBestPractices(next);
                          }}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-bold rounded"
                        >
                          + Add Problem Line
                        </button>
                      </div>
                      {(bp.problems || []).map((prob, prIdx) => (
                        <div key={prIdx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder={`Problem point ${prIdx + 1}`}
                            value={prob}
                            onChange={(e) => {
                              const next = [...bestPractices];
                              if (!next[idx].problems) next[idx].problems = [];
                              next[idx].problems[prIdx] = e.target.value;
                              setBestPractices(next);
                            }}
                            className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-950"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...bestPractices];
                              next[idx].problems = bp.problems.filter((_, i) => i !== prIdx);
                              setBestPractices(next);
                            }}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
                {bestPractices.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No custom best practices declared.</span>
                )}
              </div>

              {/* Best Practices Overall Impact */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">Overall Impact of Best Practices</label>
                  <button
                    type="button"
                    onClick={() => handleAddStringItem(setBestPracticesImpact, bestPracticesImpact)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#002147]/5 text-[#002147] hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    + Add Impact Point
                  </button>
                </div>
                <div className="flex flex-col gap-2.5">
                  {bestPracticesImpact.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="e.g. Promotes experiential learning and student-centric methodology"
                        value={item}
                        onChange={(e) => handleUpdateStringItem(setBestPracticesImpact, bestPracticesImpact, idx, e.target.value)}
                        className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveStringItem(setBestPracticesImpact, bestPracticesImpact, idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                  {bestPracticesImpact.length === 0 && (
                    <span className="text-[11px] text-slate-400 font-semibold italic">No overall impact points registered.</span>
                  )}
                </div>
              </div>
            </div>

            {/* 13. Activities Logs & Summaries */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">13. Activity Logs & Strategic Pillars</h3>
                </div>
              </div>

              {/* Activities Log List */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2 pt-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Individual Departmental Activities Log</span>
                  <button
                    type="button"
                    onClick={() => setActivitiesList([...activitiesList, { sNo: activitiesList.length + 1, date: "", title: "", type: "", resourcePerson: "", participants: "", documentUrl: "" }])}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded"
                  >
                    + Add Activity Log
                  </button>
                </div>
                {activitiesList.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setActivitiesList(activitiesList.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Date</label>
                        <input
                          type="text"
                          placeholder="e.g. 15-07-2025"
                          value={item.date}
                          onChange={(e) => {
                            const next = [...activitiesList];
                            next[idx].date = e.target.value;
                            setActivitiesList(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Title of the Activity</label>
                        <input
                          type="text"
                          placeholder="e.g. Workshop on GST filing"
                          value={item.title}
                          onChange={(e) => {
                            const next = [...activitiesList];
                            next[idx].title = e.target.value;
                            setActivitiesList(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Type of Activity</label>
                        <input
                          type="text"
                          placeholder="e.g. Workshop"
                          value={item.type}
                          onChange={(e) => {
                            const next = [...activitiesList];
                            next[idx].type = e.target.value;
                            setActivitiesList(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Resource Person/Org</label>
                        <input
                          type="text"
                          placeholder="e.g. CA Professional"
                          value={item.resourcePerson}
                          onChange={(e) => {
                            const next = [...activitiesList];
                            next[idx].resourcePerson = e.target.value;
                            setActivitiesList(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">No. of Participants</label>
                        <input
                          type="text"
                          placeholder="e.g. 80"
                          value={item.participants}
                          onChange={(e) => {
                            const next = [...activitiesList];
                            next[idx].participants = e.target.value;
                            setActivitiesList(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Report Document URL</label>
                      <input
                        type="text"
                        placeholder="Link to file or document..."
                        value={item.documentUrl}
                        onChange={(e) => {
                          const next = [...activitiesList];
                          next[idx].documentUrl = e.target.value;
                          setActivitiesList(next);
                        }}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Activities Annual Summary */}
              <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Category-wise Annual Summary of Activities</span>
                  <button
                    type="button"
                    onClick={() => setActivitiesSummary([...activitiesSummary, { sNo: activitiesSummary.length + 1, year: "", category: "", count: "", studentsBenefited: "", keyActivities: "", documentUrl: "" }])}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded"
                  >
                    + Add Annual Summary
                  </button>
                </div>
                {activitiesSummary.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setActivitiesSummary(activitiesSummary.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Academic Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2025-2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...activitiesSummary];
                            next[idx].year = e.target.value;
                            setActivitiesSummary(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Category of Activity</label>
                        <input
                          type="text"
                          placeholder="e.g. Academic Enrichment"
                          value={item.category}
                          onChange={(e) => {
                            const next = [...activitiesSummary];
                            next[idx].category = e.target.value;
                            setActivitiesSummary(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Activities Conducted</label>
                        <input
                          type="text"
                          placeholder="e.g. 4"
                          value={item.count}
                          onChange={(e) => {
                            const next = [...activitiesSummary];
                            next[idx].count = e.target.value;
                            setActivitiesSummary(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">No. of Students Benefited</label>
                        <input
                          type="text"
                          placeholder="e.g. 250"
                          value={item.studentsBenefited}
                          onChange={(e) => {
                            const next = [...activitiesSummary];
                            next[idx].studentsBenefited = e.target.value;
                            setActivitiesSummary(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Key Activities Conducted</label>
                        <input
                          type="text"
                          placeholder="e.g. Seminars, Guest Lectures"
                          value={item.keyActivities}
                          onChange={(e) => {
                            const next = [...activitiesSummary];
                            next[idx].keyActivities = e.target.value;
                            setActivitiesSummary(next);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Report Document URL</label>
                      <input
                        type="text"
                        placeholder="Link to file or document..."
                        value={item.documentUrl}
                        onChange={(e) => {
                          const next = [...activitiesSummary];
                          next[idx].documentUrl = e.target.value;
                          setActivitiesSummary(next);
                        }}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Activity Strategic Pillars (Activities descriptions) */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">Core Strategic Activity Pillars (Original Descriptions)</label>
                  <button
                    type="button"
                    onClick={() => setActivities([...activities, { label: "", desc: "" }])}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#002147]/5 text-[#002147] hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    + Add Pillar
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {activities.map((item, idx) => (
                    <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-150 flex flex-col gap-3 relative">
                      <button
                        type="button"
                        onClick={() => setActivities(activities.filter((_, i) => i !== idx))}
                        className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Pillar Label</label>
                          <input
                            type="text"
                            placeholder="e.g. Academic Enrichment"
                            value={item.label}
                            onChange={(e) => {
                              const next = [...activities];
                              next[idx].label = e.target.value;
                              setActivities(next);
                            }}
                            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                          />
                        </div>
                        <div className="sm:col-span-3 flex flex-col gap-1">
                          <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Description</label>
                          <input
                            type="text"
                            placeholder="State key objectives and focus fields..."
                            value={item.desc}
                            onChange={(e) => {
                              const next = [...activities];
                              next[idx].desc = e.target.value;
                              setActivities(next);
                            }}
                            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall Approach */}
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Overall Approach (Activities)</label>
                <textarea
                  rows={3}
                  placeholder="Describe the department's overall approach to activities (e.g. balanced focus on academic excellence, skill development, industry exposure, and community engagement)..."
                  value={overallApproach}
                  onChange={(e) => setOverallApproach(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-705 focus:bg-white focus:outline-none focus:border-indigo-400 transition-all leading-relaxed"
                />
              </div>
            </div>

            {/* 14. Infrastructure & Progression */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Physical Assets list */}
              <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Settings className="h-4.5 w-4.5 text-[#002147]" />
                    <h3 className="font-outfit font-black text-base text-[#002147]">14. Infrastructure Assets</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddStringItem(setInfrastructure, infrastructure)}
                    className="px-3 py-1 bg-[#002147]/5 text-[#002147] hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    + Add Asset
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  {infrastructure.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="e.g. Specialized Computer Lab"
                        value={item}
                        onChange={(e) => handleUpdateStringItem(setInfrastructure, infrastructure, idx, e.target.value)}
                        className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveStringItem(setInfrastructure, infrastructure, idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                  {infrastructure.length === 0 && (
                    <span className="text-[11px] text-slate-400 font-semibold italic">No facilities declared.</span>
                  )}
                </div>
              </div>

              {/* Career opportunities list */}
              <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="h-4.5 w-4.5 text-[#002147]" />
                    <h3 className="font-outfit font-black text-base text-[#002147]">15. Progression Pathways</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddStringItem(setCareerOpps, careerOpps)}
                    className="px-3 py-1 bg-[#002147]/5 text-[#002147] hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    + Add Career
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  {careerOpps.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="e.g. Investment Banking Analyst"
                        value={item}
                        onChange={(e) => handleUpdateStringItem(setCareerOpps, careerOpps, idx, e.target.value)}
                        className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveStringItem(setCareerOpps, careerOpps, idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                  {careerOpps.length === 0 && (
                    <span className="text-[11px] text-slate-400 font-semibold italic">No career progressions declared.</span>
                  )}
                </div>
              </div>

            </div>

            {/* 15. Photo Gallery */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">16. Photo Gallery</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setGallery([...gallery, { image: undefined, file: null, caption: "" }])}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Photo Reference
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {gallery.map((item, idx) => {
                  const previewUrl = item.file 
                    ? URL.createObjectURL(item.file) 
                    : (item.image?.asset?._ref ? getSanityImageUrl(item.image.asset._ref) : "");

                  return (
                    <div key={idx} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60 flex flex-col md:flex-row gap-5 items-start md:items-center relative">
                      <button
                        type="button"
                        onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                        className="absolute right-4 top-4 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>

                      {/* Image Preview / Upload Area */}
                      <div className="shrink-0 mx-auto md:mx-0">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt={item.caption || "Gallery Preview"}
                            className="h-24 w-24 md:h-28 md:w-28 rounded-2xl object-cover border-2 border-indigo-150 shadow-sm"
                          />
                        ) : (
                          <div className="h-24 w-24 md:h-28 md:w-28 rounded-2xl bg-indigo-50 border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center text-indigo-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 w-full grid grid-cols-1 gap-4">
                        {/* File Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Select Image File</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0] || null;
                              const next = [...gallery];
                              next[idx].file = f;
                              setGallery(next);
                            }}
                            className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-50 file:text-indigo-700 file:cursor-pointer hover:file:bg-indigo-100 transition-colors bg-white border border-slate-200 rounded-xl p-2 focus:outline-none"
                          />
                        </div>

                        {/* Caption Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Image Caption</label>
                          <input
                            type="text"
                            placeholder="e.g. Seminar on GST Filing by CA Professional"
                            value={item.caption || ""}
                            onChange={(e) => {
                              const next = [...gallery];
                              next[idx].caption = e.target.value;
                              setGallery(next);
                            }}
                            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-400 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {gallery.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No gallery images registered.</span>
                )}
              </div>
            </div>

            {/* Save Action Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white shadow-lg">
              <div className="flex flex-col gap-1.5 text-center sm:text-left">
                <h4 className="font-outfit font-black text-lg">Commit to Sanity Studio</h4>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  This transaction will update the records in your Sanity dataset. Next.js fetches will refresh dynamically.
                </p>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black transition-all shadow-md active:scale-95 disabled:opacity-50 text-xs md:text-sm shrink-0 uppercase tracking-wider"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                    Publishing Profile...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 shrink-0" />
                    Publish to Sanity
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </form>
    </div>
  );
}
