import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BookOpen, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

async function getCourse(slug: string) {
  try {
    return await prisma.course.findUnique({
      where: { slug }
    });
  } catch (e) {
    return null;
  }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-white pb-20">
      {/* Breadcrumbs / Back button */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/courses" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-900 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image Section */}
          <div className="rounded-3xl overflow-hidden bg-slate-100 aspect-video lg:aspect-square flex items-center justify-center">
            {course.image ? (
              <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
            ) : (
              <BookOpen className="h-32 w-32 text-slate-300" />
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-900 uppercase">
              <Clock className="h-3.5 w-3.5" />
              {course.duration || 'Full Time'}
            </div>
            <h1 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">{course.title}</h1>
            <div className="mt-8 prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-slate-600 whitespace-pre-wrap">
                {course.description}
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4">
              <Link 
                href="/admission" 
                className="rounded-full bg-blue-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-800 shadow-md hover:shadow-lg active:scale-95"
              >
                Apply for this Course
              </Link>
              <Link 
                href="/contact" 
                className="rounded-full bg-slate-100 px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-200 active:scale-95"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
