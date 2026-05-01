"use client";

import { createEnquiryAction } from "@/app/actions";
import { Sparkles, CheckCircle, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const res = await createEnquiryAction(formData);

    setSubmitting(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else if (res?.success) {
      setSuccessMsg(res.success);
      e.currentTarget.reset();
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-16 md:py-24 select-none">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Detailed Context and Contact Blocks */}
          <div className="lg:col-span-5 max-w-xl flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 px-4 py-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider shadow-sm select-none">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" /> Reach Out Anytime
              </span>
              <h1 className="mt-6 font-outfit text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1] md:leading-[1.1]">
                Get in Touch
              </h1>
              <p className="mt-4 font-sans text-base md:text-lg text-slate-600 leading-relaxed max-w-lg font-normal">
                Have an inquiry about courses, scheduling, or campus amenities? We are here to help.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white font-bold text-sm shadow-md">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-outfit font-black text-slate-800 text-base leading-tight select-none">Visit Us</h4>
                  <p className="font-sans text-sm font-semibold text-slate-500 leading-normal mt-1.5 select-none max-w-xs">
                    Gorantla, Guntur - 522034<br />
                    Andhra Pradesh, India
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-500 to-purple-700 text-white font-bold text-sm shadow-md">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-outfit font-black text-slate-800 text-base leading-tight select-none">Direct Inquiries</h4>
                  <p className="font-sans text-sm font-semibold text-slate-500 leading-normal mt-1.5 select-none">
                    +91 863 2221234
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 text-white font-bold text-sm shadow-md">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-outfit font-black text-slate-800 text-base leading-tight select-none">Direct Email</h4>
                  <p className="font-sans text-sm font-semibold text-slate-500 leading-normal mt-1.5 select-none">
                    principal@stannscollege.ac.in
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white border border-slate-200/60 p-8 md:p-10 shadow-xl shadow-indigo-50/20 rounded-3xl backdrop-blur-sm relative hover:border-indigo-100 transition-all duration-300">
            <h3 className="font-outfit text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="h-6 w-6 text-indigo-600" /> General Inquiry Form
            </h3>
            <p className="mt-2.5 font-sans text-sm text-slate-500 leading-normal max-w-sm">
              We aim to respond to all inquiries within 24 business hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-700" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Radhika Rao"
                    className="mt-1.5 block w-full rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100/40 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-700" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. radhika@example.com"
                    className="mt-1.5 block w-full rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100/40 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-700" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  className="mt-1.5 block w-full rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100/40 transition-all duration-200"
                />
              </div>

              <div>
                <label className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-700" htmlFor="message">
                  How Can We Assist You?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe your question, scheduling queries, or comments here..."
                  className="mt-1.5 block w-full rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100/40 transition-all duration-200 resize-none"
                />
              </div>

              {successMsg && (
                <div className="flex items-start gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200/60 p-4 rounded-xl font-sans">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-emerald-600 shrink-0" />
                  <p>{successMsg}</p>
                </div>
              )}

              {errorMsg && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200/60 p-4 rounded-xl font-sans">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 px-6 py-4 text-base font-extrabold text-white shadow-xl shadow-indigo-100 hover:shadow-indigo-200 active:scale-95 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed select-none flex items-center justify-center gap-2"
              >
                {submitting ? "Sending Inquiry..." : "Submit Inquiry Form"}
                {!submitting && <ArrowRight className="h-5 w-5" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
