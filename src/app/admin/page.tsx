"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  INITIAL_PAGES_CONFIG,
  PageConfig,
  SectionConfig,
} from "@/lib/customizer-schema";
import SectionConfigurator from "@/components/admin/SectionConfigurator";
import EventsManager from "@/components/admin/EventsManager";
import NoticesManager from "@/components/admin/NoticesManager";
import { StrategicPlanFeedbackManager } from "@/components/admin/StrategicPlanFeedbackManager";
import {
  Home,
  Info,
  GraduationCap,
  BookOpen,
  Building,
  Users,
  HeartHandshake,
  Briefcase,
  Lightbulb,
  Globe2,
  ShieldCheck,
  FileCheck,
  Compass,
  Phone,
  Save,
  RotateCcw,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Sliders,
  ChevronRight,
  Megaphone,
  Menu,
  LayoutTemplate,
  Calendar,
  Bell,
  Zap,
} from "lucide-react";

const CONTENT_TABS = [
  { id: "events-management", label: "Events & Activities", icon: Calendar, slug: "/#events", tag: "Live Content" },
  { id: "notices-management", label: "Notice Board", icon: Bell, slug: "/notices", tag: "Live Content" },
];

const HEADER_TABS = [
  { id: "announcement-bar", label: "Announcement Section", icon: Megaphone, slug: "/#announcements", tag: "Header" },
  { id: "top-nav", label: "Top Nav", icon: Menu, slug: "/#navigation", tag: "Header" },
];

const PAGE_TABS = [
  { id: "home", label: "1. Home", icon: Home, slug: "/" },
  { id: "about", label: "2. About Us", icon: Info, slug: "/about" },
  { id: "academics", label: "3. Academics", icon: GraduationCap, slug: "/academics" },
  { id: "admissions", label: "4. Admissions", icon: BookOpen, slug: "/admissions" },
  { id: "infrastructure", label: "5. Infrastructure", icon: Building, slug: "/infrastructure" },
  { id: "faculty", label: "6. Faculty", icon: Users, slug: "/faculty" },
  { id: "student-support", label: "7. Student Support", icon: HeartHandshake, slug: "/student-support" },
  { id: "placements", label: "8. Placements", icon: Briefcase, slug: "/placements" },
  { id: "research-innovation", label: "9. Research & Innovation", icon: Lightbulb, slug: "/research-innovation" },
  { id: "alumni", label: "10. Alumni", icon: Globe2, slug: "/alumni" },
  { id: "quality-assurance", label: "11. Quality Assurance (IQAC)", icon: ShieldCheck, slug: "/quality-assurance" },
  { id: "mandatory-disclosures", label: "12. Mandatory Disclosures", icon: FileCheck, slug: "/mandatory-disclosures" },
  { id: "strategic-plans", label: "13. Strategic Plans", icon: Compass, slug: "/strategic-plans-and-future-directions" },
  { id: "contact", label: "14. Contact Us", icon: Phone, slug: "/contact" },
];

const ALL_TABS = [...CONTENT_TABS, ...HEADER_TABS, ...PAGE_TABS];

export default function AdminPage() {
  const router = useRouter();

  // Auth state
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Customization state
  const [pages, setPages] = useState<Record<string, PageConfig>>(INITIAL_PAGES_CONFIG);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // 1. Verify Authentication & Tab Session
  useEffect(() => {
    // Check if the current browser tab has an active admin session
    const isTabActive = typeof window !== "undefined" && sessionStorage.getItem("stanns_admin_tab_active") === "1";
    if (!isTabActive) {
      // Tab was closed or opened anew without logging in on this tab!
      // Invalidate cookie on server and redirect to /admin/login immediately
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

  // 2. Load Saved Customization Data
  useEffect(() => {
    async function loadCustomization() {
      try {
        const res = await fetch("/api/admin/customizer");
        const data = await res.json();
        if (data.success && data.data?.pages) {
          setPages(data.data.pages);
        }
      } catch (err) {
        console.error("Failed to load saved customization:", err);
      }
    }
    loadCustomization();
  }, []);

  // Update a single section's settings for the currently active tab
  const handleSectionChange = (updatedSection: SectionConfig) => {
    setPages((prev) => {
      const currentPage = prev[activeTab];
      if (!currentPage) return prev;

      const newSections = currentPage.sections.map((sec) =>
        sec.id === updatedSection.id ? updatedSection : sec
      );

      return {
        ...prev,
        [activeTab]: {
          ...currentPage,
          sections: newSections,
        },
      };
    });
    setIsDirty(true);
    setSaveSuccess(false);
  };


  // Save changes explicitly
  const handleSaveChanges = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/customizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save customization");
      }

      setIsDirty(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 5000);
    } catch (err: any) {
      setSaveError(err.message || "Failed to save customization");
    } finally {
      setSaving(false);
    }
  };

  // Logout
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
          <span className="text-sm font-medium text-slate-300">Loading Admin Portal...</span>
        </div>
      </div>
    );
  }

  const currentPage = pages[activeTab] || INITIAL_PAGES_CONFIG[activeTab];
  const activeTabMeta = ALL_TABS.find((t) => t.id === activeTab);
  const isHeaderTab = HEADER_TABS.some((t) => t.id === activeTab);
  const isContentTab = CONTENT_TABS.some((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#002147] text-white border-b border-blue-900 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sliders className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-tight">
                  St. Ann&apos;s Admin Panel
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  Customizer Studio
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                2 Live Content Modules • 3 Header Elements • 14 Website Pages
              </p>
            </div>
          </div>

          {/* User & Actions */}
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            {isContentTab ? (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/20 border border-sky-400/40 rounded-full text-xs font-semibold text-sky-200">
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>Live Sanity Sync Active</span>
              </div>
            ) : isDirty ? (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-400/40 rounded-full text-xs font-semibold text-amber-200">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                <span>Unsaved changes</span>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-xs font-semibold text-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>All changes saved</span>
              </div>
            )}

            {/* SAVE BUTTON */}
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={saving || !isDirty}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                isDirty
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-900/30 hover:shadow-lg animate-pulse"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600"
              }`}
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving to Sanity...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            {/* User Info & Logout */}
            <div className="flex items-center gap-2 pl-3 border-l border-blue-900">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold leading-none">{user?.name || "Admin"}</p>
                <p className="text-[10px] text-blue-200/70 mt-0.5">{user?.email}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign out of Admin Panel"
                className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Save Success Alert Banner */}
      {saveSuccess && (
        <div className="bg-emerald-600 text-white py-2.5 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-inner transition-all animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>Changes saved successfully to Sanity! The live website is now showing your updated customizations.</span>
        </div>
      )}

      {/* Save Error Alert Banner */}
      {saveError && (
        <div className="bg-rose-600 text-white py-2.5 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-inner">
          <AlertTriangle className="w-4 h-4 text-rose-200" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Sidebar: 19 Tabs (2 Live Content + 3 Global Header + 14 Website Pages) */}
        <aside className="w-full lg:w-80 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4 shrink-0 space-y-5">
          
          {/* Group 1: Live Dynamic Website Content */}
          <div>
            <div className="px-3 py-2 mb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Live Content Management
              </span>
              <span className="text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200/60 px-2 py-0.5 rounded-full">
                {CONTENT_TABS.length} Modules
              </span>
            </div>

            <div className="space-y-1">
              {CONTENT_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-full px-3.5 py-3 rounded-2xl text-left text-xs font-semibold flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#002147] text-white shadow-md shadow-blue-950/20"
                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-300" : tab.id === "notices-management" ? "text-rose-600" : "text-sky-600"}`} />
                      <span className="truncate font-bold">{tab.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isActive
                            ? "bg-emerald-500 text-white"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        Sanity
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-blue-300" : "text-slate-300"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Global Header & Navigation */}
          <div>
            <div className="px-3 py-2 mb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Global Header &amp; Navigation
              </span>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-full">
                {HEADER_TABS.length} Tabs
              </span>
            </div>

            <div className="space-y-1">
              {HEADER_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const pageSecs = pages[tab.id]?.sections?.length || 0;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-full px-3.5 py-3 rounded-2xl text-left text-xs font-semibold flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#002147] text-white shadow-md shadow-blue-950/20"
                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-300" : "text-amber-600"}`} />
                      <span className="truncate font-bold">{tab.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-200/70 text-slate-600"
                        }`}
                      >
                        {pageSecs} sec
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-blue-300" : "text-slate-300"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Website Pages */}
          <div>
            <div className="px-3 py-2 mb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Website Pages (14 Tabs)
              </span>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 rounded-full">
                {PAGE_TABS.length} Pages
              </span>
            </div>

            <div className="space-y-1">
              {PAGE_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const pageSecs = pages[tab.id]?.sections?.length || 0;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-full px-3.5 py-3 rounded-2xl text-left text-xs font-semibold flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#002147] text-white shadow-md shadow-blue-950/20"
                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-300" : "text-slate-400"}`} />
                      <span className="truncate">{tab.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-200/70 text-slate-600"
                        }`}
                      >
                        {pageSecs} sec
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-blue-300" : "text-slate-300"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 w-full">
          {activeTab === "events-management" ? (
            <EventsManager />
          ) : activeTab === "notices-management" ? (
            <NoticesManager />
          ) : (
            <>
              {/* Page Meta Header Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
                    {isHeaderTab ? (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                        Global Header Element
                      </span>
                    ) : (
                      <span className="text-blue-700">Customizing Page:</span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentPage?.title || activeTabMeta?.label}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isHeaderTab
                      ? "Configure colors, layout, typography, and badges for this global header component. Changes apply site-wide upon saving."
                      : "Configure color palette and layout structures for each section on this page. Remember to click 'Save Changes' when done."}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={activeTabMeta?.slug || "/"}
                    target="_blank"
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <span>Preview {isHeaderTab ? "on Website" : "Page"}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </div>
              </div>

              {/* Strategic Plan Live Sanity Feedback Form Manager */}
              {activeTab === "strategic-plans" && <StrategicPlanFeedbackManager />}

              {/* Sections List */}
              <div>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Sections in this {isHeaderTab ? "component" : "page"} ({currentPage?.sections?.length || 0})
                  </h3>
                  <span className="text-xs text-slate-400">
                    Expand any section below to customize
                  </span>
                </div>

                {currentPage?.sections?.map((section) => (
                  <SectionConfigurator
                    key={section.id}
                    section={section}
                    onChange={handleSectionChange}
                    onReset={() => {
                      const defaultSec = INITIAL_PAGES_CONFIG[activeTab]?.sections?.find(
                        (s) => s.id === section.id
                      );
                      if (defaultSec) {
                        handleSectionChange(JSON.parse(JSON.stringify(defaultSec)));
                      }
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Bottom Floating/Sticky Save Action Bar */}
          {isDirty && (
            <div className="sticky bottom-6 z-30 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-between gap-4 mt-8 animate-bounce-short">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping shrink-0" />
                <div>
                  <p className="text-xs font-bold">You have unsaved changes</p>
                  <p className="text-[11px] text-slate-400">
                    Changes will not take effect on the live website until you click Save.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
