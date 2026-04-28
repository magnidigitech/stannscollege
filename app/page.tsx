import Hero from "@/components/home/Hero";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Calendar, Newspaper } from "lucide-react";
import prisma from "@/lib/prisma";

export const revalidate = 3600; // Revalidate every hour

async function getCourseCount() {
  try {
    return await prisma.course.count();
  } catch (e) {
    return 0;
  }
}

export default async function Home() {
  const courseCount = await getCourseCount();

  return (
    <div className="flex flex-col gap-0">
      <Hero />
      
      {/* Features section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Why Choose St. Anns?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We provide a supportive environment that fosters growth and innovation.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { title: "Diverse Courses", icon: BookOpen, desc: "Wide range of undergraduate and postgraduate programs." },
              { title: "Expert Faculty", icon: Users, desc: "Learn from industry experts and experienced academics." },
              { title: "Modern Facilities", icon: Calendar, desc: "State-of-the-art labs, libraries, and campus infrastructure." },
              { title: "Career Support", icon: Newspaper, desc: "Dedicated placement cell and career counseling." }
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md border border-slate-100">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-blue-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">Ready to Start Your Journey?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Admissions for the upcoming academic year are now open. Apply today and secure your spot at one of the top institutions.
          </p>
          <div className="mt-10">
            <Link 
              href="/admission" 
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-blue-900 transition-all hover:bg-blue-50 active:scale-95"
            >
              Apply Online
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
