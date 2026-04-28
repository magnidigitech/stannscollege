import { getSession, logout } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Users, Newspaper, Calendar, MessageSquare, LogOut } from "lucide-react";

async function logoutAction() {
  'use server';
  await logout();
  redirect("/admin/login");
}

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = [
    { name: "Courses", icon: BookOpen, href: "/admin/courses", color: "bg-blue-50 text-blue-600" },
    { name: "Faculty", icon: Users, href: "/admin/faculty", color: "bg-purple-50 text-purple-600" },
    { name: "Blog Posts", icon: Newspaper, href: "/admin/blog", color: "bg-emerald-50 text-emerald-600" },
    { name: "Events", icon: Calendar, href: "/admin/events", color: "bg-amber-50 text-amber-600" },
    { name: "Enquiries", icon: MessageSquare, href: "/admin/enquiries", color: "bg-rose-50 text-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">Welcome, {session.username}</span>
            <form action={logoutAction}>
              <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="group rounded-2xl bg-white p-8 shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-slate-200"
            >
              <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
              <p className="mt-2 text-slate-500 text-sm">Manage all {item.name.toLowerCase()} items</p>
              <div className="mt-6 flex items-center text-sm font-bold text-blue-600 group-hover:gap-2 transition-all">
                Go to management <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
