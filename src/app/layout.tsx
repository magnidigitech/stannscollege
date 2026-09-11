import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { TopLogoBar } from "@/components/TopLogoBar";
import { CustomizationProvider } from "@/components/CustomizationProvider";
import { FooterLastUpdated } from "@/components/FooterLastUpdated";
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
        <Script
          id="customization-preload"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var c = localStorage.getItem('stanns_customization_cache');
                if (c) {
                  var p = JSON.parse(c);
                  var lb = p['logo-bar'] && p['logo-bar'].sections && p['logo-bar'].sections[0];
                  if (lb && lb.colors) {
                    var bg = lb.colors.logoBarColor || (lb.colors.bgColor !== '#ffffff' ? lb.colors.bgColor : null);
                    if (bg) document.documentElement.style.setProperty('--logo-bar-bg', bg);
                  }
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50/50 font-sans text-slate-800 flex flex-col justify-between selection:bg-indigo-50 selection:text-indigo-900" suppressHydrationWarning>
        <Script
          id="css-chunk-retry"
          strategy="beforeInteractive"
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


        <CustomizationProvider>
        {/* Top Announcement Bar - Rendered across all pages */}
        <AnnouncementBar />

        {/* Sticky Header: Logo Bar + Navigation (stays fixed together at the top on scroll) */}
        <header
          id="main-header"
          className="sticky top-0 z-50 shadow-md select-none transition-colors duration-200"
        >
          {/* Top bar with College Logo, Accreditations & Apply Now */}
          <TopLogoBar />

          {/* Navigation Bar below top logo bar */}
          <div
            className="w-full border-b select-none transition-colors duration-200"
            style={{
              backgroundColor: "#007c74",
              borderColor: "#00625c"
            }}
          >
            <div className="mx-auto max-w-[1780px] px-4 sm:px-6 lg:px-8 w-full relative">
              <Navigation />
            </div>
          </div>
        </header>

        <main className="flex-1 w-full">
          {children}
        </main>

        <footer id="main-footer" className="bg-slate-950 text-slate-400 py-8 sm:py-10 border-t border-slate-900 selection:bg-indigo-500/20 selection:text-indigo-200">
          <div className="mx-auto max-w-[1780px] px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
              
              {/* Column 1: Info & Contact (4/12 width) */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-3.5 group select-none">
                  <img
                    src="/images/collegelogo.png"
                    alt="College Logo"
                    className="h-12 w-auto object-contain bg-white p-1.5 rounded-xl shadow-lg group-hover:scale-105 transition-all duration-300 select-none"
                  />
                  <div className="flex flex-col">
                    <span className="font-outfit text-white font-black tracking-tight text-base md:text-lg uppercase leading-tight">
                      St. Ann&apos;s College for Women
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-slate-400">
                      Run by the Society of St Anne
                    </span>
                  </div>
                </Link>
                <p className="text-slate-300 font-sans text-sm md:text-base max-w-sm leading-relaxed">
                  Dedicated to shaping visionaries and cultivating top-notch academic excellence since our inception. Fostering future female leaders of the modern world.
                </p>
                <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300 font-sans border-t border-slate-900 pt-4">
                  <p className="leading-relaxed">
                    <strong className="text-white font-semibold">Address:</strong> Gorantla, Guntur - 522034, Andhra Pradesh, India.
                  </p>
                  <p>
                    <strong className="text-white font-semibold">Email:</strong> <a href="mailto:principal@stannscollege.ac.in" className="hover:text-emerald-400 transition-colors">principal@stannscollege.ac.in</a>
                  </p>
                  <p>
                    <strong className="text-white font-semibold">Call:</strong> <a href="tel:08632236470" className="hover:text-emerald-400 transition-colors">0863-2236470</a> | <a href="tel:7382104655" className="hover:text-emerald-400 transition-colors">7382104655</a>
                  </p>
                </div>
              </div>

              {/* Column 2: The Institution (2/12 width) */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <h4 className="font-outfit text-white font-extrabold text-sm uppercase tracking-wider border-b border-slate-900 pb-2">The Institution</h4>
                <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300">
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
                <h4 className="font-outfit text-white font-extrabold text-sm uppercase tracking-wider border-b border-slate-900 pb-2">Statutory & Compliance</h4>
                <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300">
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
                <h4 className="font-outfit text-white font-extrabold text-sm uppercase tracking-wider border-b border-slate-900 pb-2">Academics & Support</h4>
                <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300">
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

            <div className="mt-8 sm:mt-10 pt-4 sm:pt-5 border-t border-slate-900/60 text-center text-xs sm:text-sm text-slate-400 font-sans select-none tracking-wide flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <span>© {new Date().getFullYear()} St. Ann&apos;s College for Women, Gorantla. All rights reserved.</span>
                <span className="hidden sm:inline text-slate-700">•</span>
                <FooterLastUpdated />
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <Link href="/mandatory-disclosures" className="hover:text-slate-200 transition-colors">Mandatory Disclosures</Link>
                <span>|</span>
                <Link href="/about/governance-administration/code-of-conduct" className="hover:text-slate-200 transition-colors">Code of Conduct</Link>
              </div>
            </div>
          </div>
        </footer>

        </CustomizationProvider>
      </body>
    </html>
  );
}
