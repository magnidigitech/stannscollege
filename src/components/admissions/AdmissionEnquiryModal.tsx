"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  BookOpen,
  Sparkles,
  HelpCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

interface AdmissionEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UG_PROGRAMMES = [
  "B.Com Honours – General",
  "B.Com Honours – Computer Applications",
  "BCA – Computer Applications",
  "B.Sc Honours – Computer Science",
  "B.Sc Honours – Artificial Intelligence",
  "B.Sc Honours – Mathematics",
  "B.Sc Honours – Physics",
  "B.Sc Honours – Statistics",
  "B.Sc Honours – Biotechnology",
  "B.Sc Honours – Microbiology",
  "B.Sc Honours – Botany",
  "B.Sc Honours – Chemistry",
];

const PG_PROGRAMMES = ["MCA", "MBA"];


const PASSING_YEARS = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020 or earlier",
];

const INFO_OPTIONS = [
  "Eligibility & Admission Process",
  "Fee Structure",
  "Scholarships / Financial Assistance",
  "Hostel Facilities",
  "Transport Facilities",
  "Placements & Career Opportunities",
  "Programme Details",
  "Other",
];

export function AdmissionEnquiryModal({ isOpen, onClose }: AdmissionEnquiryModalProps) {
  const [studentName, setStudentName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [districtCity, setDistrictCity] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [yearOfPassing, setYearOfPassing] = useState("");
  const [levelOfStudy, setLevelOfStudy] = useState<"UG" | "PG">("UG");
  const [programmeInterested, setProgrammeInterested] = useState("");
  const [informationRequired, setInformationRequired] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceNumber: string;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset programme selection when level changes
  const handleLevelChange = (lvl: "UG" | "PG") => {
    setLevelOfStudy(lvl);
    setProgrammeInterested("");
  };

  const toggleInfoOption = (option: string) => {
    setInformationRequired((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleCopyReference = () => {
    if (successData?.referenceNumber && navigator.clipboard) {
      navigator.clipboard.writeText(successData.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const resetForm = () => {
    setStudentName("");
    setMobileNumber("");
    setEmail("");
    setDistrictCity("");
    setHighestQualification("");
    setYearOfPassing("");
    setLevelOfStudy("UG");
    setProgrammeInterested("");
    setInformationRequired([]);
    setErrorMessage(null);
    setSuccessData(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form Validations
    if (!studentName.trim()) {
      setErrorMessage("Please enter the student's full name.");
      return;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!highestQualification) {
      setErrorMessage("Please select Current / Highest Qualification.");
      return;
    }

    if (!programmeInterested) {
      setErrorMessage("Please select the programme you are interested in.");
      return;
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setErrorMessage("Please enter a valid email address, or leave it blank.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admission-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: studentName.trim(),
          mobileNumber: mobileNumber.trim(),
          email: email.trim(),
          districtCity: districtCity.trim(),
          highestQualification,
          yearOfPassing,
          levelOfStudy: levelOfStudy === "UG" ? "Undergraduate (UG)" : "Postgraduate (PG)",
          programmeInterested,
          informationRequired,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit admission enquiry. Please try again.");
      }

      setSuccessData({
        referenceNumber: data.referenceNumber,
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentProgrammes = levelOfStudy === "UG" ? UG_PROGRAMMES : PG_PROGRAMMES;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Admission Enquiry Form"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp max-h-[92vh]">
        {/* Header - Sleek, compact padding as requested */}
        <div className="flex items-center justify-between px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white shrink-0 border-b border-indigo-950">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
              <GraduationCap className="h-4 w-4 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <h3 className="font-outfit text-sm sm:text-base font-bold leading-tight truncate">
                Admission Enquiry Form
              </h3>
              <p className="text-[10px] sm:text-[10.5px] text-sky-200/80 leading-tight truncate">
                St. Ann&apos;s College for Women, Gorantla, Guntur
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10 shrink-0"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50 space-y-5">
          {successData ? (
            /* =======================================================
               SUCCESS CONFIRMATION SCREEN (After Submission)
               ======================================================= */
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200/80 shadow-xs text-center space-y-5 animate-fadeIn">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-xs">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  Enquiry Submitted Successfully
                </span>
                <h4 className="font-outfit text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  Thank you for your enquiry!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
                  Your admission enquiry has been successfully submitted to the{" "}
                  <strong className="text-slate-900 font-bold">Admission Cell, St. Ann&apos;s College for Women, Guntur</strong>.
                </p>
              </div>

              {/* Reference Number Card */}
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-2xl p-4 sm:p-5 border border-indigo-100 max-w-md mx-auto shadow-2xs">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Enquiry Reference Number
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-lg sm:text-xl font-extrabold text-[#002147] tracking-wider selection:bg-indigo-200">
                    {successData.referenceNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyReference}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-indigo-700 border border-indigo-200 transition-all cursor-pointer shadow-2xs"
                    title="Copy reference number"
                  >
                    {copiedRef ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Please keep this reference number for future communication with our admissions team.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium max-w-md mx-auto leading-relaxed">
                ✨ <strong className="text-slate-900">Our Admission Team will contact you shortly</strong> with complete details regarding eligibility, course structure, hostel, and fee schedules.
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#002147] hover:bg-indigo-900 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Close Window
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Submit Another Enquiry</span>
                </button>
              </div>
            </div>
          ) : (
            /* =======================================================
               ADMISSION ENQUIRY FORM (Matching user's questionnaire)
               ======================================================= */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Intro Note Card */}
              <div className="bg-gradient-to-r from-indigo-900/5 via-sky-900/5 to-emerald-900/5 rounded-2xl p-4 border border-indigo-100/80 text-xs text-slate-700 leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 font-outfit text-xs sm:text-sm font-bold text-[#002147]">
                  <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>ADMISSION ENQUIRY FORM</span>
                </div>
                <p className="text-[11.5px] text-slate-600 pt-0.5">
                  Interested in joining St. Ann&apos;s College for Women? Please fill in the details below. Our Admission Cell will contact you with information regarding programmes, eligibility, admission procedure, fees, hostel, scholarships and other facilities.
                </p>
              </div>

              {/* Error Message Box */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-fadeIn">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
                  <p className="font-medium leading-relaxed">{errorMessage}</p>
                </div>
              )}

              {/* SECTION 1: Student Details */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3.5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-black text-xs">
                    1
                  </span>
                  <h4 className="font-outfit text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Student Details
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Student Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength={14}
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Email ID */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email ID <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* District / City */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      District / City
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={districtCity}
                        onChange={(e) => setDistrictCity(e.target.value)}
                        placeholder="e.g. Guntur, Vijayawada"
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Educational Qualification */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3.5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-black text-xs">
                    2
                  </span>
                  <h4 className="font-outfit text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Educational Qualification
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Current / Highest Qualification */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current / Highest Qualification <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={highestQualification}
                        onChange={(e) => setHighestQualification(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:bg-white transition-all font-medium cursor-pointer"
                      >
                        <option value="">Select Qualification</option>
                        <optgroup label="Intermediate / 12th">
                          <option value="Intermediate (MPC)">MPC</option>
                          <option value="Intermediate (BiPC)">BiPC</option>
                          <option value="Intermediate (CEC)">CEC</option>
                          <option value="Intermediate (MEC)">MEC</option>
                          <option value="Intermediate (Other / Vocational)">Other / Vocational</option>
                        </optgroup>
                        <optgroup label="Higher Education">
                          <option value="Degree">Degree</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Year of Passing */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Year of Passing
                    </label>
                    <div className="relative">
                      <select
                        value={yearOfPassing}
                        onChange={(e) => setYearOfPassing(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:bg-white transition-all font-medium cursor-pointer"
                      >
                        <option value="">Select Year of Passing</option>
                        {PASSING_YEARS.map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Programme Interested In */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3.5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-black text-xs">
                    3
                  </span>
                  <h4 className="font-outfit text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Programme Interested In
                  </h4>
                </div>

                {/* Level of Study - Radio Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Level of Study <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        levelOfStudy === "UG"
                          ? "bg-indigo-50/80 border-[#002147] text-[#002147] shadow-2xs font-bold"
                          : "bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100 font-medium"
                      }`}
                    >
                      <input
                        type="radio"
                        name="levelOfStudy"
                        checked={levelOfStudy === "UG"}
                        onChange={() => handleLevelChange("UG")}
                        className="h-4 w-4 text-[#002147] focus:ring-[#002147] cursor-pointer"
                      />
                      <span className="text-xs">Undergraduate (UG)</span>
                    </label>

                    <label
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        levelOfStudy === "PG"
                          ? "bg-indigo-50/80 border-[#002147] text-[#002147] shadow-2xs font-bold"
                          : "bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100 font-medium"
                      }`}
                    >
                      <input
                        type="radio"
                        name="levelOfStudy"
                        checked={levelOfStudy === "PG"}
                        onChange={() => handleLevelChange("PG")}
                        className="h-4 w-4 text-[#002147] focus:ring-[#002147] cursor-pointer"
                      />
                      <span className="text-xs">Postgraduate (PG)</span>
                    </label>
                  </div>
                </div>

                {/* Programme Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Programme Interested In <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={programmeInterested}
                    onChange={(e) => setProgrammeInterested(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:bg-white transition-all font-medium cursor-pointer"
                  >
                    <option value="">Select Programme</option>
                    {currentProgrammes.map((prog) => (
                      <option key={prog} value={prog}>
                        {prog}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SECTION 4: Information Required */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-black text-xs">
                    4
                  </span>
                  <h4 className="font-outfit text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Information Required
                  </h4>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  I would like information about:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {INFO_OPTIONS.map((item) => {
                    const isChecked = informationRequired.includes(item);
                    return (
                      <label
                        key={item}
                        className={`flex items-start gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold"
                            : "bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100 font-medium"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleInfoOption(item)}
                          className="mt-0.5 h-3.5 w-3.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="leading-snug">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Admission Enquiry</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdmissionEnquiryModal;
