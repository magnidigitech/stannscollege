"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Send,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Building,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  X,
  PhoneCall
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry / Others",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selection modals state for multiple phone numbers and emails
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(userAgent) || (typeof window !== "undefined" && window.innerWidth < 768));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields (Name, Email, and Message).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit inquiry. Please try again.");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Enquiry / Others",
        message: ""
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const phoneNumbers = [
    { label: "Mobile Admissions 1", number: "7382104655", display: "+91 7382104655" },
    { label: "Mobile Admissions 2", number: "8500656134", display: "+91 8500656134" },
    { label: "Landline Office Desk", number: "08632236470", display: "0863-2236470" }
  ];

  const emailAddresses = [
    {
      label: "Official College Email",
      email: "st_anns_coll@yahoo.co.in",
      badge: "Administration"
    },
    {
      label: "Alternate Contact Desk",
      email: "stannscollegegnt@gmail.com",
      badge: "General"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-20 select-none">

      {/* 1. HERO BANNER HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001730] via-[#002147] to-[#0d3b66] text-white pt-10 pb-16 px-6 select-none">
        {/* Animated Background Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_45%)]" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 w-full text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-4.5 py-1.5 text-xs font-black text-indigo-300 uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-300" /> Connect with St. Ann&apos;s
          </span>
          <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Have questions about admissions, academic programs, or campus life? Reach out to our dedicated administrative office or send an instant message below.
          </p>
        </div>
      </section>

      {/* 2. DIRECT CONTACT CHANNELS (GRID) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 w-full -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: Postal Location */}
          <div className="bg-white border border-slate-100/80 shadow-xl shadow-slate-100/50 hover:shadow-2xl rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-outfit font-black text-slate-800 text-lg mb-2">College Campus</h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                St. Ann&apos;s College for Women<br />
                D. No: 10 – 209 / 2,<br />
                Amaravathi Road, Gorantla,<br />
                Guntur, Andhra Pradesh, India,<br />
                522034.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=St.Ann's+College+for+Women+Gorantla+Guntur"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 hover:text-emerald-700 select-none group/btn"
            >
              Get Directions <ArrowRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Card 2: Voice Desk */}
          <div className="bg-white border border-slate-100/80 shadow-xl shadow-slate-100/50 hover:shadow-2xl rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-outfit font-black text-slate-800 text-lg mb-2">Communications</h3>
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Landline Office</span>
                  <a href="tel:08632236470" className="text-slate-600 text-xs font-bold hover:text-indigo-600 transition-colors">0863-2236470</a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Mobile Admissions</span>
                  <div className="flex flex-col text-xs font-bold text-slate-600">
                    <a href="tel:7382104655" className="hover:text-indigo-600 transition-colors">7382104655</a>
                    <a href="tel:8500656134" className="hover:text-indigo-600 transition-colors">8500656134</a>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPhoneModalOpen(true)}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-700 select-none group/btn text-left cursor-pointer"
            >
              Call Admissions <ArrowRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 3: Electronic Inbox */}
          <div className="bg-white border border-slate-100/80 shadow-xl shadow-slate-100/50 hover:shadow-2xl rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-outfit font-black text-slate-800 text-lg mb-2">Email Desk</h3>
              <div className="flex flex-col gap-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Inquiry</span>
                  <button
                    type="button"
                    onClick={() => setEmailModalOpen(true)}
                    className="text-slate-600 text-xs font-bold hover:text-amber-600 transition-colors break-all text-left cursor-pointer"
                  >
                    st_anns_coll@yahoo.co.in
                  </button>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Alternate Contact</span>
                  <button
                    type="button"
                    onClick={() => setEmailModalOpen(true)}
                    className="text-slate-600 text-xs font-bold hover:text-amber-600 transition-colors break-all text-left cursor-pointer"
                  >
                    stannscollegegnt@gmail.com
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEmailModalOpen(true)}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-amber-600 hover:text-amber-700 select-none group/btn text-left cursor-pointer"
            >
              Send Email <ArrowRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 4: Web & Socials */}
          <div className="bg-white border border-slate-100/80 shadow-xl shadow-slate-100/50 hover:shadow-2xl rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#002147] mb-5 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-outfit font-black text-slate-800 text-lg mb-2">Social Ecosystem</h3>
              <p className="text-slate-500 text-xs font-bold leading-normal mb-3">
                Official Website:<br />
                <a href="https://www.stannscollegeforwomen.ac.in" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">www.stannscollegeforwomen.ac.in</a>
              </p>
              <div className="flex flex-wrap gap-2.5 mt-2">
                <a
                  href="https://www.youtube.com/@stannscollegeforwomen"
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="h-9 w-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-200 border border-red-100"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61593155107273"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-200 border border-blue-100"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/stannscollegeforwomengnt"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="h-9 w-9 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all duration-200 border border-pink-100"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://whatsapp.com/channel/0029Vb9FPmy0bIdpHlLFXY3c"
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp Channel"
                  className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-200 border border-emerald-100"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="h-9 w-9 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-700 hover:text-white flex items-center justify-center transition-all duration-200 border border-sky-100"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            <span className="mt-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">
              Follow Us Online
            </span>
          </div>

        </div>
      </section>

      {/* 3. SPLIT AREA: INTERACTIVE FORM + INTERACTIVE GOOGLE MAP */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 w-full mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-none">

        {/* ENQUIRY FORM COLUMN (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/60 shadow-xl rounded-3xl p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-650">
                <Building className="h-4 w-4" />
              </span>
              <h2 className="font-outfit font-black text-slate-800 text-xl sm:text-2xl">Send us an Enquiry</h2>
            </div>

            {isSuccess ? (
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 text-center animate-fadeIn my-6">
                <CheckCircle2 className="h-16 w-16 text-emerald-650 mx-auto mb-4 animate-bounce" />
                <h3 className="font-outfit font-black text-slate-800 text-xl mb-2">Inquiry Sent Successfully!</h3>
                <p className="text-slate-600 text-xs md:text-sm font-semibold max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting St. Ann&apos;s College for Women. Your message has been directly dispatched to our administrative desk at <strong className="text-[#002147]">stannsofficegorantla@gmail.com</strong>. We will follow up with you within 24–48 working hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-100 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-black text-slate-600 uppercase tracking-wider">Your Full Name <span className="text-rose-500">*</span></label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Priyadarshini Rao"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white px-4.5 py-3 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-black text-slate-600 uppercase tracking-wider">Email Address <span className="text-rose-500">*</span></label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white px-4.5 py-3 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-black text-slate-600 uppercase tracking-wider">Mobile Number</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white px-4.5 py-3 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs font-black text-slate-600 uppercase tracking-wider">Inquiry Subject</label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-700 outline-none transition-all focus:ring-4 focus:ring-indigo-100 appearance-none cursor-pointer"
                    >
                      <option value="General Enquiry / Others">General Enquiry / Others</option>
                      <option value="Admissions UG (Degree)">Admissions UG (Degree)</option>
                      <option value="Admissions PG (MBA/MCA)">Admissions PG (MBA/MCA)</option>
                      <option value="Academic Audits & IQAC">Academic Audits & IQAC</option>
                      <option value="Industry Collaborations">Industry Collaborations</option>
                      <option value="Careers & Employment">Careers & Employment</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-black text-slate-600 uppercase tracking-wider">Your Message <span className="text-rose-500">*</span></label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Write your comprehensive enquiry details here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white px-4.5 py-3 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-4 focus:ring-indigo-100 resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2.5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 animate-fadeIn">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#002147] hover:bg-[#003166] text-white px-6 py-4 font-black text-xs tracking-wider uppercase shadow-xl hover:shadow-indigo-900/10 active:scale-98 transition-all disabled:opacity-50 select-none cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-400 font-bold gap-3">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Office Hours: Monday – Saturday (9:00 AM – 5:00 PM)</span>
            </div>
            <span>Statutory Response SLA: 48 Hours</span>
          </div>

        </div>

        {/* MAP COLUMN (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/60 shadow-xl rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex flex-col h-full gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-650">
                <MapPin className="h-4 w-4" />
              </span>
              <h2 className="font-outfit font-black text-slate-800 text-xl">Campus Map</h2>
            </div>

            {/* Embedded Google Map */}
            <div className="flex-1 w-full rounded-2xl overflow-hidden border border-slate-100 relative min-h-[300px] lg:min-h-0 bg-slate-50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.63467652756!2d80.40763867498762!3d16.43851508428383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0f35316315d%3A0x67a31b402809e530!2sSt.Ann's%20College%20for%20Women!5e0!3m2!1sen!2sin!4v1716260000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            {/* Quick Map Coordinates / Help */}
            <div className="bg-slate-50/50 border border-slate-100/60 rounded-xl p-4 text-[11px] text-slate-500 font-bold leading-normal">
              <span className="text-[#002147] font-extrabold uppercase block mb-1">Geographic Coordinates</span>
              <span>Latitude: 16.4385° N | Longitude: 80.4076° E</span>
              <span className="block mt-1">Landmark: Opposite Gorantla Substation, Amaravathi Road.</span>
            </div>
          </div>
        </div>

      </section>

      {/* 4. INTERACTIVE PHONE SELECTION MODAL */}
      {phoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative animate-fadeInUp">
            <button
              onClick={() => setPhoneModalOpen(false)}
              className="absolute top-5 right-5 h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <PhoneCall className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-outfit font-black text-slate-800 text-lg sm:text-xl">Choose Number to Call</h3>
                <p className="text-slate-400 text-xs font-bold">St. Ann&apos;s Communications Desk</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {phoneNumbers.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-indigo-50/30 border border-slate-200/80 rounded-2xl p-4 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black text-indigo-600 tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-slate-800 font-extrabold text-sm sm:text-base tracking-tight mt-0.5">
                      {item.display}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.number)}
                      className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-all"
                      title="Copy Number"
                    >
                      {copiedText === item.number ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`tel:${item.number}`}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black tracking-wide flex items-center gap-1.5 shadow-md shadow-indigo-100 transition-all"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 font-medium mt-5 text-center">
              Available Monday – Saturday during college office hours (9:00 AM – 5:00 PM).
            </p>
          </div>
        </div>
      )}

      {/* 5. INTERACTIVE EMAIL SELECTION MODAL */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-100 relative animate-fadeInUp">
            <button
              onClick={() => setEmailModalOpen(false)}
              className="absolute top-5 right-5 h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-outfit font-black text-slate-800 text-lg">Send Email</h3>
                <p className="text-slate-400 text-xs font-bold">St. Ann&apos;s Electronic Communications Desk</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {emailAddresses.map((item, idx) => {
                const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=${encodeURIComponent("Inquiry regarding St. Ann's College for Women")}`;
                return (
                  <div
                    key={idx}
                    className="bg-slate-50 hover:bg-amber-50/20 border border-slate-200/80 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-slate-800 font-extrabold text-xs sm:text-sm tracking-tight break-all font-mono select-all mt-0.5">
                        {item.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(item.email)}
                        className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Copy Email Address"
                      >
                        {copiedText === item.email ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {isMobile ? (
                        <a
                          href={`mailto:${item.email}`}
                          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Open in App</span>
                        </a>
                      ) : (
                        <a
                          href={gmailComposeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Open in Email</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
