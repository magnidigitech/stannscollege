"use client";

import React, { useState } from "react";
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
  AlertCircle
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        subject: "General Inquiry",
        message: ""
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <a href="tel:7382104655" className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-700 select-none group/btn">
              Call Admissions <ArrowRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
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
                  <a href="mailto:st_anns_coll@yahoo.co.in" className="text-slate-600 text-xs font-bold hover:text-amber-600 transition-colors break-all">st_anns_coll@yahoo.co.in</a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Alternate Contact</span>
                  <a href="mailto:stannscollegegnt@gmail.com" className="text-slate-600 text-xs font-bold hover:text-amber-600 transition-colors break-all">stannscollegegnt@gmail.com</a>
                </div>
              </div>
            </div>
            <a href="mailto:st_anns_coll@yahoo.co.in" className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-amber-600 hover:text-amber-700 select-none group/btn">
              Send Email <ArrowRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
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
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-500 border border-slate-100 hover:border-red-200 transition-all group/icon"
                  title="YouTube: @stannscollegeforwomen"
                >
                  <svg className="h-5 w-5 fill-current group-hover/icon:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61593155107273"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-500 border border-slate-100 hover:border-blue-200 transition-all group/icon"
                  title="Facebook: St. Ann's College for Women"
                >
                  <svg className="h-5 w-5 fill-current group-hover/icon:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/stannscollegeforwomengnt"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 hover:text-pink-600 text-slate-500 border border-slate-100 hover:border-pink-200 transition-all group/icon"
                  title="Instagram: @stannscollegeforwomengnt"
                >
                  <svg className="h-5 w-5 stroke-current fill-none stroke-2 group-hover/icon:scale-110 transition-transform" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://whatsapp.com/channel/0029Vb9FPmy0bIdpHlLFXY3c"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 text-slate-500 border border-slate-100 hover:border-emerald-200 transition-all group/icon"
                  title="WhatsApp Channel"
                >
                  <svg className="h-5 w-5 fill-current group-hover/icon:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.115.547 4.179 1.586 6.002L.07 23.93l6.094-1.554a11.96 11.96 0 0 0 5.867 1.528c6.637 0 12.031-5.394 12.031-12.031C24.062 5.394 18.668 0 12.031 0zm0 21.875a9.83 9.83 0 0 1-5.01-1.373l-.36-.214-3.623.924.965-3.533-.234-.372A9.83 9.83 0 0 1 2.2 12.031C2.2 6.61 6.61 2.2 12.031 2.2c5.422 0 9.832 4.41 9.832 9.831 0 5.422-4.41 9.844-9.832 9.844zm5.385-7.375c-.295-.148-1.748-.862-2.02-.96-.27-.098-.468-.148-.665.148-.198.295-.765.96-.938 1.158-.172.197-.345.222-.64.074-.296-.148-1.25-.461-2.38-1.47-.88-.785-1.474-1.756-1.646-2.052-.172-.295-.018-.455.13-.602.133-.133.296-.345.444-.517.148-.172.197-.295.295-.492.098-.197.05-.37-.025-.518-.074-.148-.665-1.603-.912-2.194-.24-.576-.484-.498-.665-.508-.172-.01-.37-.01-.567-.01-.197 0-.518.074-.789.37-.27.295-1.036 1.012-1.036 2.467 0 1.455 1.06 2.862 1.208 3.059.148.197 2.086 3.185 5.054 4.468.706.305 1.258.487 1.688.624.71.226 1.356.194 1.867.118.57-.085 1.748-.714 1.995-1.403.246-.69.246-1.28.172-1.403-.074-.123-.271-.197-.566-.345z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-500 border border-slate-100 hover:border-blue-200 transition-all group/icon"
                  title="LinkedIn"
                >
                  <svg className="h-5 w-5 fill-current group-hover/icon:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
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
                  className="mt-6 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-100"
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
                      <option>General Inquiry</option>
                      <option>Admissions UG (Degree)</option>
                      <option>Admissions PG (MBA/MCA)</option>
                      <option>Academic Audits & IQAC</option>
                      <option>Industry Collaborations</option>
                      <option>Careers & Employment</option>
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

    </div>
  );
}
