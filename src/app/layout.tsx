import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Award, Sparkles, Bell } from "lucide-react";

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
  title: "St. Ann's College for Women, Gorantla",
  description: "Fostering premium education, empowerment, and academic excellence for women in Guntur, AP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen bg-slate-50/50 font-sans text-slate-800 flex flex-col justify-between selection:bg-indigo-50 selection:text-indigo-900">
        
        {/* Strip line at the very top for announcements */}
        <div className="w-full bg-slate-950 border-b border-slate-900 overflow-hidden select-none">
          <div className="mx-auto max-w-7xl px-6 h-10 flex items-center justify-between text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded bg-[#002147] border border-[#003875] px-2 py-0.5 text-white font-bold tracking-wider uppercase animate-pulse select-none">
                <Bell className="h-3 w-3" /> Announcement
              </span>
              <span className="hidden sm:inline font-sans font-medium text-slate-200 truncate max-w-sm md:max-w-md">
                Admissions are officially open for UG and PG programs for the 2026-2027 academic year.
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="hidden md:inline font-medium">AISHE Code: C-32612</span>
              <span className="font-medium">Call Us: +91 86322 34222</span>
            </div>
          </div>
        </div>

        {/* Top bar with College Logo on left, Accreditations on right */}
        <div className="w-full bg-white border-b border-slate-100 select-none">
          <div className="mx-auto max-w-7xl px-6 h-28 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4 group">
              <img 
                src="/images/collegelogo.png" 
                alt="College Logo" 
                className="h-16 w-auto object-contain select-none hover:scale-105 transition-all duration-300"
              />
              <div className="flex flex-col">
                <span className="font-outfit text-lg md:text-2xl font-black text-[#002147] tracking-tight leading-tight select-none uppercase">
                  St. Ann&apos;s College for Women
                </span>
                <span className="font-sans text-xs md:text-sm font-semibold text-slate-500 tracking-wide select-none">
                  Run by the Society of St Anne
                </span>
              </div>
            </Link>

            {/* Accreditations and Anniversary Icons on the right */}
            <div className="hidden md:flex items-center gap-6">
              <img 
                src="/images/30 Years Icon.png" 
                alt="30 Years Excellence" 
                className="h-16 w-auto object-contain select-none"
              />
              <div className="h-10 w-px bg-slate-200" />
              <img 
                src="/images/naac logo.png" 
                alt="NAAC Logo" 
                className="h-16 w-auto object-contain select-none"
              />
            </div>
          </div>
        </div>

        {/* Sticky Header below top bar for navigation */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-sm select-none">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="flex h-14 items-center justify-between">
              <Navigation />
            </div>
          </div>
        </header>

        <main className="flex-1 w-full">
          {children}
        </main>

        <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 selection:bg-indigo-500/20 selection:text-indigo-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2">
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
                    <span className="font-sans text-xs font-semibold text-slate-400">
                      Run by the Society of St Anne
                    </span>
                  </div>
                </Link>
                <p className="mt-5 text-slate-400 font-sans text-sm max-w-sm leading-relaxed">
                  Dedicated to shaping visionaries and cultivating top-notch academic excellence since our inception. Fostering future female leaders of the modern world.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-outfit text-white font-bold text-sm uppercase tracking-wider">Quick Menu</h4>
                <Link href="/" className="hover:text-[#005fb8] text-sm transition-colors duration-200">Home</Link>
                <Link href="/about" className="hover:text-[#005fb8] text-sm transition-colors duration-200">About Us</Link>
                <Link href="/courses" className="hover:text-[#005fb8] text-sm transition-colors duration-200">Courses</Link>
                <Link href="/admission" className="hover:text-[#005fb8] text-sm transition-colors duration-200">Admissions</Link>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-outfit text-white font-bold text-sm uppercase tracking-wider">Connect</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-sans">
                  Gorantla, Guntur - 522034<br />
                  Andhra Pradesh, India
                </p>
                <p className="text-sm text-slate-400 font-sans">principal@stannscollege.ac.in</p>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-900/60 text-center text-xs text-slate-600 font-sans select-none tracking-wide">
              © {new Date().getFullYear()} St. Ann&apos;s College for Women, Gorantla. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
