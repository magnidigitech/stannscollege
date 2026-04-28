import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: {
    title: string;
    slug: string;
    description: string;
    duration?: string | null;
    image?: string | null;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-xl">
      <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
        {course.image ? (
          <img 
            src={course.image} 
            alt={course.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <BookOpen className="h-12 w-12" />
          </div>
        )}
        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-900 backdrop-blur">
          {course.duration || 'Full Time'}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-slate-600 text-sm leading-relaxed">
          {course.description}
        </p>
        <div className="mt-6 pt-6 border-t border-slate-50">
          <Link 
            href={`/courses/${course.slug}`}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View Details
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
