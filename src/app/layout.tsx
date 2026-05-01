import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

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
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-3.5 group">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-700 via-purple-700 to-indigo-600 font-serif font-black text-white text-xl shadow-md shadow-indigo-100 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 select-none">
                    A
                  </span>
                  <div>
                    <h1 className="font-outfit text-base md:text-lg font-black tracking-tight bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-900 bg-clip-text text-transparent select-none leading-tight">
                      St. Ann&apos;s College for Women
                    </h1>
                    <p className="font-sans text-xs font-bold text-slate-400 tracking-wider uppercase select-none leading-tight mt-0.5">
                      Gorantla, Guntur
                    </p>
                  </div>
                </Link>
              </div>

              <nav className="hidden md:flex items-center gap-8 font-sans font-semibold text-sm text-slate-600">
                <Link href="/" className="hover:text-indigo-600 transition-all duration-200">
                  Home
                </Link>
                <Link href="/about" className="hover:text-indigo-600 transition-all duration-200">
                  About
                </Link>
                <Link href="/courses" className="hover:text-indigo-600 transition-all duration-200">
                  Courses
                </Link>
                <Link href="/admission" className="hover:text-indigo-600 transition-all duration-200">
                  Admissions
                </Link>
                <Link href="/contact" className="hover:text-indigo-600 transition-all duration-200">
                  Contact
                </Link>
                <Link 
                  href="/admission" 
                  className="rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 px-6 py-2.5 font-bold text-white text-xs hover:shadow-xl hover:shadow-indigo-100 transition-all active:scale-95 duration-300 hover:-translate-y-0.5"
                >
                  Apply Now
                </Link>
              </nav>
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
                <Link href="/" className="flex items-center gap-3.5 group">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-serif font-extrabold text-indigo-950 text-xl shadow-lg group-hover:scale-105 transition-all duration-300">
                    A
                  </span>
                  <span className="font-outfit text-white font-black tracking-tight text-lg">
                    St. Ann&apos;s College
                  </span>
                </Link>
                <p className="mt-5 text-slate-400 font-sans text-sm max-w-sm leading-relaxed">
                  Dedicated to shaping visionaries and cultivating top-notch academic excellence since our inception. Fostering future female leaders of the modern world.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-outfit text-white font-bold text-sm uppercase tracking-wider">Quick Menu</h4>
                <Link href="/" className="hover:text-indigo-400 text-sm transition-colors duration-200">Home</Link>
                <Link href="/about" className="hover:text-indigo-400 text-sm transition-colors duration-200">About Us</Link>
                <Link href="/courses" className="hover:text-indigo-400 text-sm transition-colors duration-200">Courses</Link>
                <Link href="/admission" className="hover:text-indigo-400 text-sm transition-colors duration-200">Admissions</Link>
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
