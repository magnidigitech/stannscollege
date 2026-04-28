import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-blue-50/50 skew-x-12 transform translate-x-1/2" />
      <div className="absolute -bottom-24 -left-24 -z-10 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold tracking-wide text-blue-900 uppercase">
            Welcome to St. Anns College
          </span>
          <h1 className="mt-8 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
            Shaping Minds, <br />
            <span className="text-blue-600">Building Futures</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            A tradition of academic excellence combined with modern innovation. 
            Join our diverse community of learners and prepare for a successful career.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses"
              className="group flex items-center gap-2 rounded-full bg-blue-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-800 hover:shadow-lg active:scale-95"
            >
              Explore Courses
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-900 border border-slate-200 transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              Contact Us
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-slate-100 pt-10 md:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-blue-900">50+</p>
              <p className="text-sm font-medium text-slate-500">Expert Faculty</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-900">10k+</p>
              <p className="text-sm font-medium text-slate-500">Successful Alumni</p>
            </div>
            <div className="hidden md:block">
              <p className="text-3xl font-bold text-blue-900">20+</p>
              <p className="text-sm font-medium text-slate-500">Specialized Programs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
