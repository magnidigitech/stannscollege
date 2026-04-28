import prisma from "@/lib/prisma";
import CourseCard from "@/components/courses/CourseCard";

export const revalidate = 3600;

async function getCourses() {
  try {
    return await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.error("Failed to fetch courses:", e);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="bg-white">
      <div className="bg-blue-900 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold md:text-6xl">Our Courses</h1>
          <p className="mt-6 max-w-2xl text-lg text-blue-100">
            Explore our wide range of undergraduate and postgraduate programs 
            designed to prepare you for the challenges of the modern world.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">No courses found</h2>
            <p className="mt-2 text-slate-600">Please check back later or contact us for more information.</p>
          </div>
        )}
      </div>
    </div>
  );
}
