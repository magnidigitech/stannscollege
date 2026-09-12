"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventsManager from "@/components/admin/EventsManager";
import NoticesManager from "@/components/admin/NoticesManager";
import { StrategicPlanFeedbackManager } from "@/components/admin/StrategicPlanFeedbackManager";
import {
  Calendar,
  Bell,
  Compass,
  LogOut,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Database,
  Globe,
  Sliders,
} from "lucide-react";

interface AdminUser {
  email: string;
  name: string;
  role: string;
}

const ADMIN_MODULES = [
  {
    id: "events-management",
    label: "Events & Activities",
    badge: "Live Sanity Sync",
    icon: Calendar,
    description: "Manage upcoming college events, celebrations, workshops, seminars, photos, and document attachments.",
    component: EventsManager,
  },
  {
    id: "notices-management",
    label: "Notice Board & Circulars",
    badge: "Live Sanity Sync",
    icon: Bell,
    description: "Publish official college circulars, notifications, examination alerts, admissions updates, and downloadable PDFs.",
    component: NoticesManager,
  },
  {
    id: "strategic-plans",
    label: "Strategic Plan Feedback",
    badge: "Stakeholder Submissions",
    icon: Compass,
    description: "Review public feedback, community suggestions, and stakeholder submissions submitted via the Strategic Plans portal.",
    component: StrategicPlanFeedbackManager,
  },
];

export default function AdminPage() {
  const router = useRouter();

  // Auth state
  const [user, setUser] = useState<AdminUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Active module tab
  const [activeTab, setActiveTab] = useState<string>("events-management");

  // 1. Verify Authentication & Tab Session
  useEffect(() => {
    // Check if current browser tab has an active admin session
    const isTabActive = typeof window !== "undefined" && sessionStorage.getItem("stanns_admin_tab_active") === "1";
    if (!isTabActive) {
      // Tab was closed or opened anew without logging in on this tab
      window.location.replace("/admin/login");
      fetch("/api/admin/auth", { method: "DELETE" }).catch(() => {});
      return;
    }

    async function verifyAuth() {
      try {
        const res = await fetch("/api/admin/auth", { cache: "no-store" });
        const data = await res.json();
        if (!data.authenticated) {
          sessionStorage.removeItem("stanns_admin_tab_active");
          window.location.replace("/admin/login");
          return;
        }
        setUser(data.user);
        setAuthLoading(false);
      } catch (err) {
        sessionStorage.removeItem("stanns_admin_tab_active");
        window.location.replace("/admin/login");
      }
    }
    verifyAuth();
  }, [router]);

  // Logout handler
  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("stanns_admin_tab_active");
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.replace("/admin/login");
    }
  };

  // Immediate redirect if tab is inactive before React hydration
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (typeof window !== 'undefined' && sessionStorage.getItem('stanns_admin_tab_active') !== '1') {
                  window.location.replace('/admin/login');
                }
              } catch (e) {}
            `,
          }}
        />
        <div className="flex flex-col items-center gap-3 text-white">
          <div className="w-9 h-9 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-300">Loading Administrator Portal...</span>
        </div>
      </div>
    );
  }

  const currentModule = ADMIN_MODULES.find((m) => m.id === activeTab) || ADMIN_MODULES[0];
  const ActiveComponent = currentModule.component;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#002147] text-white border-b border-blue-900 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Portal Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-tight">
                  St. Ann&apos;s Administrator Portal
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  Live Management
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                Official Content &amp; Communications Management Hub
              </p>
            </div>
          </div>

          {/* Actions & User Profile */}
          <div className="flex items-center gap-3">
            {/* Live Sanity Status */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>Sanity Live Sync Connected</span>
            </div>

            {/* Quick Links */}
            <Link
              href="/"
              target="_blank"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-xs font-semibold text-white transition-colors"
              title="Open Live College Website in new tab"
            >
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              <span>View Website</span>
              <ExternalLink className="w-3 h-3 text-white/60" />
            </Link>

            <Link
              href="/studio"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 rounded-xl text-xs font-semibold text-blue-100 transition-colors"
              title="Open Sanity Studio in new tab"
            >
              <Database className="w-3.5 h-3.5 text-sky-300" />
              <span>Sanity Studio</span>
              <ExternalLink className="w-3 h-3 text-sky-200" />
            </Link>

            {/* User Details & Logout */}
            <div className="flex items-center gap-3 pl-3 border-l border-blue-900">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold leading-none">{user?.name || "Administrator"}</p>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider">
                    {user?.role || "Admin"}
                  </span>
                  <span className="text-[10px] text-blue-200/60">•</span>
                  <span className="text-[10px] text-blue-200/70">{user?.email}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign out of Administrator Portal"
                className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Sidebar: Core Content Modules */}
        <aside className="w-full lg:w-80 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4 shrink-0 space-y-4">
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Content Modules
            </span>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 rounded-full">
              {ADMIN_MODULES.length} Active
            </span>
          </div>

          <nav className="space-y-1.5">
            {ADMIN_MODULES.map((mod) => {
              const Icon = mod.icon;
              const isActive = activeTab === mod.id;

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(mod.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full px-3.5 py-3 rounded-2xl text-left text-xs font-semibold flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#002147] text-white shadow-md shadow-blue-950/20"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-300" : mod.id === "notices-management" ? "text-rose-600" : mod.id === "strategic-plans" ? "text-purple-600" : "text-sky-600"}`} />
                    <span className="truncate font-bold">{mod.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-blue-300" : "text-slate-300"}`} />
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Helpful Quick Links Card */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Quick Shortcuts
            </span>
            <Link
              href="/studio"
              target="_blank"
              className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-white hover:shadow-xs transition-all border border-transparent hover:border-slate-200"
            >
              <span className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                Sanity Studio
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-white hover:shadow-xs transition-all border border-transparent hover:border-slate-200"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                Live Website
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 w-full min-w-0">
          {/* Module Banner */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-md font-bold text-[10px]">
                  {currentModule.badge}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {currentModule.label}
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {currentModule.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live in Production
              </span>
            </div>
          </div>

          {/* Active Manager Component */}
          <div>
            <ActiveComponent />
          </div>
        </main>

      </div>
    </div>
  );
}
