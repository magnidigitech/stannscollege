import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Award, Sparkles, Bell, ArrowRight } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stannscollegeforwomen.ac.in"),
  title: "St. Ann's College for Women, Gorantla",
  description: "Fostering premium education, empowerment, and academic excellence for women in Guntur, AP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Intercept failed CSS chunk loads and retry with cache-buster query parameter
                window.addEventListener('error', function(e) {
                  var target = e.target;
                  if (target && target.tagName === 'LINK' && target.rel === 'stylesheet') {
                    var href = target.href;
                    if (href && !href.includes('_cb=')) {
                      var separator = href.includes('?') ? '&' : '?';
                      var newLink = document.createElement('link');
                      newLink.rel = 'stylesheet';
                      newLink.href = href + separator + '_cb=' + Date.now();
                      document.head.appendChild(newLink);
                    }
                  }
                  if (e.message && (e.message.indexOf('Loading CSS chunk') !== -1 || e.message.indexOf('ChunkLoadError') !== -1)) {
                    var reloadKey = '_css_reload_ts';
                    var lastReload = sessionStorage.getItem(reloadKey);
                    var now = Date.now();
                    if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
                      sessionStorage.setItem(reloadKey, now.toString());
                      window.location.reload();
                    }
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  var reason = e.reason ? (e.reason.message || e.reason.toString()) : '';
                  if (reason && (reason.indexOf('Loading CSS chunk') !== -1 || reason.indexOf('ChunkLoadError') !== -1)) {
                    var reloadKey = '_css_reload_ts';
                    var lastReload = sessionStorage.getItem(reloadKey);
                    var now = Date.now();
                    if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
                      sessionStorage.setItem(reloadKey, now.toString());
                      window.location.reload();
                    }
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50/50 font-sans text-slate-800 flex flex-col justify-between selection:bg-indigo-50 selection:text-indigo-900" suppressHydrationWarning>


        {/* Strip line at the very top for announcements */}
        <div id="top-announcement-bar" className="w-full bg-slate-950 border-b border-slate-900 overflow-hidden select-none">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full h-10 flex items-center justify-between text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded bg-[#002147] border border-[#003875] px-2 py-0.5 text-white font-bold tracking-wider uppercase animate-pulse select-none">
                <Bell className="h-3 w-3" /> Announcement
              </span>
              <span className="hidden sm:inline font-sans font-medium text-slate-200 truncate max-w-sm md:max-w-md">
                Admissions are officially open for UG and PG programs for the 2026-2027 academic year.
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="hidden md:inline font-medium">AISHE Code: C-39493</span>
              <span className="font-medium">Call Us: 0863-2236470 | 7382104655</span>
            </div>
          </div>
        </div>

        {/* Top bar with College Logo, Accreditations & Apply Now in a single centered row */}
        <div id="top-logo-bar" className="w-full bg-white border-b border-slate-100 select-none">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full py-6 flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8 flex-wrap">
              <Link href="/" className="flex flex-col md:flex-row items-center gap-4 group">
                <img
                  src="/images/collegelogo.png"
                  alt="College Logo"
                  className="h-16 w-auto object-contain select-none hover:scale-105 transition-all duration-300"
                />
                <div className="flex flex-col items-center md:items-start">
                  <span className="font-outfit text-lg md:text-2xl font-black text-[#002147] tracking-tight leading-tight select-none uppercase">
                    St. Ann&apos;s College for Women
                  </span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-slate-500 tracking-wide select-none">
                    Run by the Society of St Anne
                  </span>
                </div>
              </Link>

              {/* Accreditations and Anniversary Icons in the same row on desktop */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src="/images/30 Years Icon.png"
                  alt="30 Years Excellence"
                  className="h-14 w-auto object-contain select-none"
                />
                <div className="h-8 w-px bg-slate-200" />
                <img
                  src="/images/naac logo.png"
                  alt="NAAC Logo"
                  className="h-14 w-auto object-contain select-none"
                />
              </div>

              {/* Apply Now button beautifully placed in the same row */}
              <Link
                href="/admissions/policy-process"
                className="hidden lg:flex items-center gap-2 rounded-full bg-[#002147] hover:bg-emerald-600 px-6 py-2.5 font-bold text-white text-xs hover:shadow-xl hover:shadow-emerald-500/20 transition-all active:scale-95 duration-350 hover:-translate-y-0.5 group/btn select-none shrink-0"
              >
                Apply Now
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Header below top bar for navigation (dynamic height to support dual row) */}
        <header id="main-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm select-none">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full relative">
            <Navigation />
          </div>
        </header>

        <main className="flex-1 w-full">
          {children}
        </main>

        <footer id="main-footer" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 selection:bg-indigo-500/20 selection:text-indigo-200">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10">
              
              {/* Column 1: Info & Contact (4/12 width) */}
              <div className="md:col-span-4 flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-3.5 group select-none">
                  <img
                    src="/images/collegelogo.png"
                    alt="College Logo"
                    className="h-12 w-auto object-contain bg-white p-1.5 rounded-xl shadow-lg group-hover:scale-105 transition-all duration-300 select-none"
                  />
                  <div className="flex flex-col">
                    <span className="font-outfit text-white font-black tracking-tight text-sm md:text-base uppercase leading-tight">
                      St. Ann&apos;s College for Women
                    </span>
                    <span className="font-sans text-[11px] font-semibold text-slate-400">
                      Run by the Society of St Anne
                    </span>
                  </div>
                </Link>
                <p className="text-slate-400 font-sans text-xs md:text-sm max-w-sm leading-relaxed">
                  Dedicated to shaping visionaries and cultivating top-notch academic excellence since our inception. Fostering future female leaders of the modern world.
                </p>
                <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-sans border-t border-slate-900 pt-4">
                  <p className="leading-relaxed">
                    <strong>Address:</strong> Gorantla, Guntur - 522034, Andhra Pradesh, India.
                  </p>
                  <p>
                    <strong>Email:</strong> <a href="mailto:principal@stannscollege.ac.in" className="hover:text-emerald-400 transition-colors">principal@stannscollege.ac.in</a>
                  </p>
                  <p>
                    <strong>Call:</strong> <a href="tel:08632236470" className="hover:text-emerald-400 transition-colors">0863-2236470</a> | <a href="tel:7382104655" className="hover:text-emerald-400 transition-colors">7382104655</a>
                  </p>
                </div>
              </div>

              {/* Column 2: The Institution (2/12 width) */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <h4 className="font-outfit text-white font-bold text-xs uppercase tracking-wider border-b border-slate-900 pb-2">The Institution</h4>
                <div className="flex flex-col gap-2.5 text-xs">
                  <Link href="/about/the-institution/history-of-the-college" className="hover:text-emerald-400 transition-colors duration-150">History of College</Link>
                  <Link href="/about/the-institution/vision-mission-and-core-values" className="hover:text-emerald-400 transition-colors duration-150">Vision & Mission</Link>
                  <Link href="/about/governance-administration/governing-body" className="hover:text-emerald-400 transition-colors duration-150">Governing Body</Link>
                  <Link href="/about/governance-administration/key-functionaries-iqac" className="hover:text-emerald-400 transition-colors duration-150">IQAC Committee</Link>
                  <Link href="/about/governance-administration/statutory-non-statutory-committees" className="hover:text-emerald-400 transition-colors duration-150">College Committees</Link>
                  <Link href="/strategic-plans-and-future-directions" className="hover:text-emerald-400 transition-colors duration-150">Strategic Development</Link>
                </div>
              </div>

              {/* Column 3: Statutory & Compliance (3/12 width) */}
              <div className="md:col-span-3 flex flex-col gap-4">
                <h4 className="font-outfit text-white font-bold text-xs uppercase tracking-wider border-b border-slate-900 pb-2">Statutory & Compliance</h4>
                <div className="flex flex-col gap-2.5 text-xs">
                  <Link href="/about/statutory-affiliations-recognitions/apsche-orders" className="hover:text-emerald-400 transition-colors duration-150">APSCHE Orders</Link>
                  <Link href="/about/statutory-affiliations-recognitions/anu-affiliation-orders-ug-pg" className="hover:text-emerald-400 transition-colors duration-150">ANU Affiliation Orders</Link>
                  <Link href="/about/statutory-affiliations-recognitions/aicte-approvals" className="hover:text-emerald-400 transition-colors duration-150">AICTE Approvals</Link>
                  <Link href="/about/statutory-affiliations-recognitions/aishe-certificates" className="hover:text-emerald-400 transition-colors duration-150">AISHE Certificates</Link>
                  <Link href="/about/statutory-affiliations-recognitions/naac-accreditation" className="hover:text-emerald-400 transition-colors duration-150">NAAC Accreditation</Link>
                  <Link href="/naac-peer-team" className="hover:text-emerald-400 transition-colors duration-150">NAAC Peer Team Visit</Link>
                  <Link href="/about/statutory-affiliations-recognitions/nirf" className="hover:text-emerald-400 transition-colors duration-150">NIRF Reports</Link>
                </div>
              </div>

              {/* Column 4: Academics & Support (3/12 width) */}
              <div className="md:col-span-3 flex flex-col gap-4">
                <h4 className="font-outfit text-white font-bold text-xs uppercase tracking-wider border-b border-slate-900 pb-2">Academics & Support</h4>
                <div className="flex flex-col gap-2.5 text-xs">
                  <Link href="/academics/academic-programmes/undergraduate-programmes" className="hover:text-emerald-400 transition-colors duration-150">UG Programmes</Link>
                  <Link href="/academics/academic-programmes/postgraduate-programmes" className="hover:text-emerald-400 transition-colors duration-150">PG Programmes</Link>
                  <Link href="/academics/departments" className="hover:text-emerald-400 transition-colors duration-150">Academic Departments</Link>
                  <Link href="/academics/curriculum-academic-planning/academic-calendar-ug-pg" className="hover:text-emerald-400 transition-colors duration-150">Academic Calendar</Link>
                  <Link href="/placements/training-placements" className="hover:text-emerald-400 transition-colors duration-150">Training & Placement Cell</Link>
                  <Link href="/student-support/mentor-mentee" className="hover:text-emerald-400 transition-colors duration-150">Student Support Services</Link>
                  <Link href="/alumni" className="hover:text-emerald-400 transition-colors duration-150">Alumni Association</Link>
                  <Link href="/alumni/gallery" className="hover:text-emerald-400 transition-colors duration-150">Alumni Photo Gallery</Link>
                </div>
              </div>

            </div>

            <div className="mt-16 pt-8 border-t border-slate-900/60 text-center text-xs text-slate-600 font-sans select-none tracking-wide flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>© {new Date().getFullYear()} St. Ann&apos;s College for Women, Gorantla. All rights reserved.</span>
              <div className="flex items-center gap-4 text-slate-500">
                <Link href="/mandatory-disclosures" className="hover:text-slate-350 transition-colors">Mandatory Disclosures</Link>
                <span>|</span>
                <Link href="/about/governance-administration/code-of-conduct" className="hover:text-slate-350 transition-colors">Code of Conduct</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
