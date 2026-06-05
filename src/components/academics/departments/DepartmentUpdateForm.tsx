"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import { getDepartment } from "@/lib/sanity";
import { 
  Building, Target, GraduationCap, Briefcase, Award, Handshake, Users, BookOpen, 
  Settings, Sparkles, Loader2, Save, Key, Plus, Trash2, ChevronRight, HelpCircle, 
  CheckCircle, AlertTriangle 
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

export function DepartmentUpdateForm() {
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS[0].id);
  const [writeToken, setWriteToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });

  // Form states matching Sanity department schema
  const [established, setEstablished] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState<string[]>([]);
  const [infrastructure, setInfrastructure] = useState<string[]>([]);
  const [careerOpps, setCareerOpps] = useState<string[]>([]);
  
  // Structured lists
  const [programmes, setProgrammes] = useState<Array<{ title: string; intake: string; duration: string }>>([]);
  const [valueAddedCourses, setValueAddedCourses] = useState<Array<{ sNo: number; title: string; duration: string; agency: string }>>([]);
  const [mous, setMous] = useState<Array<{ title: string; type: string; duration: string; purpose: string }>>([]);
  const [bestPractices, setBestPractices] = useState<Array<{
    title: string;
    category: string;
    objectives: string[];
    practice: string[];
    success: string[];
  }>>([]);
  const [activities, setActivities] = useState<Array<{ label: string; desc: string }>>([]);

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
      }
    } catch (err) {
      console.error("Failed to load department data:", err);
      setStatusMsg({ type: "error", text: "Failed to fetch existing department details." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeptData();
  }, [selectedDeptId]);

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

  // Publish changes to Sanity
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!writeToken.trim()) {
      setStatusMsg({ type: "error", text: "Please provide a valid Sanity Write Token to authorize the transaction." });
      return;
    }

    setSaving(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const client = createClient({
        projectId: "fhjwqub5",
        dataset: "production",
        apiVersion: "2024-03-01",
        token: writeToken.trim(),
        useCdn: false,
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
        careerOpps
      };

      await client.createOrReplace(documentData);
      setStatusMsg({ type: "success", text: `Successfully published ${name} changes to Sanity CMS!` });
    } catch (err: any) {
      console.error("Sanity publish error:", err);
      setStatusMsg({ type: "error", text: `Failed to publish to Sanity: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 font-sans">
      
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
        <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Key className="h-5 w-5 text-[#002147]" />
            <h3 className="font-outfit font-black text-lg text-[#002147]">1. Select Department & Authorize</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Target Department</label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-bold text-slate-700 focus:bg-white focus:outline-none focus:border-indigo-400 transition-all"
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                Sanity Write Token
                <span className="group relative cursor-pointer text-slate-400 hover:text-slate-600">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-900 text-white text-[10px] leading-relaxed p-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50 font-medium font-sans">
                    Obtain this by logging into sanity.io/manage, going to the project API tab, and creating an API token with 'Editor' permissions.
                  </span>
                </span>
              </label>
              <input
                type="password"
                placeholder="Pasted token will be stored in-memory during edit session..."
                value={writeToken}
                onChange={(e) => setWriteToken(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-bold text-slate-700 focus:bg-white focus:outline-none focus:border-indigo-400 transition-all"
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
            </div>

            {/* 3. Academic Programmes Offered */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">3. Programmes Offered</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setProgrammes([...programmes, { title: "", intake: "", duration: "" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all animate-pulse"
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
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-400"
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
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-400"
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
                          className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-400"
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

            {/* 4. Value-Added & Certificate Courses */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">4. Value-Added & Certificate Courses</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setValueAddedCourses([...valueAddedCourses, { sNo: valueAddedCourses.length + 1, title: "", duration: "", agency: "" }])}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 hover:bg-[#002147] hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Course
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {valueAddedCourses.map((c, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row gap-4 items-stretch relative">
                    <button
                      type="button"
                      onClick={() => setValueAddedCourses(valueAddedCourses.filter((_, i) => i !== idx))}
                      className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-12 gap-3 pr-6">
                      <div className="sm:col-span-6 flex flex-col gap-1">
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
                      <div className="sm:col-span-3 flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Duration</label>
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
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Agency</label>
                        <input
                          type="text"
                          placeholder="Collaborating partner..."
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
                  </div>
                ))}
                {valueAddedCourses.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No certificate courses logged.</span>
                )}
              </div>
            </div>

            {/* 5. MoUs */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Handshake className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">5. Partnerships & MoUs</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMous([...mous, { title: "", type: "MoU", duration: "", purpose: "" }])}
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    <div className="flex flex-col gap-1">
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
                  </div>
                ))}
                {mous.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No partnerships listed.</span>
                )}
              </div>
            </div>

            {/* 6. Best Practices */}
            <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-[#002147]" />
                  <h3 className="font-outfit font-black text-lg text-[#002147]">6. Best Practices</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBestPractices([...bestPractices, { title: "", category: "", objectives: [], practice: [], success: [] }])}
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
                          placeholder="e.g. 1. GST & Accounting Training"
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

                  </div>
                ))}
                {bestPractices.length === 0 && (
                  <span className="text-xs text-slate-400 font-semibold italic">No custom best practices declared.</span>
                )}
              </div>
            </div>

            {/* 7. Facilities & Careers lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Physical Assets list */}
              <div className="bg-white border border-slate-200/85 rounded-[2.5rem] p-6 md:p-8 shadow-xs flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Settings className="h-4.5 w-4.5 text-[#002147]" />
                    <h3 className="font-outfit font-black text-base text-[#002147]">7. Infrastructure Assets</h3>
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
                    <h3 className="font-outfit font-black text-base text-[#002147]">8. Progression Pathways</h3>
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
