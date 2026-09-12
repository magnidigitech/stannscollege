"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  User,
  Lock,
  KeyRound,
  ArrowRight,
  UserX,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Checking session...");
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(false);

  // 1. Check tab session
  useEffect(() => {
    // If the current tab does NOT have an active tab session, clear lingering credentials in background
    const isTabActive = typeof window !== "undefined" && sessionStorage.getItem("stanns_admin_tab_active") === "1";
    if (!isTabActive) {
      sessionStorage.removeItem("stanns_admin_tab_active");
      fetch("/api/admin/auth", { method: "DELETE" }).catch(() => {});
      return;
    }

    // Only if tab is marked active, verify session and redirect to /admin if valid
    setCheckingAuth(true);
    async function initAuth() {
      try {
        const res = await fetch("/api/admin/auth", { cache: "no-store" });
        const data = await res.json();
        if (data.authenticated) {
          window.location.replace("/admin");
          return;
        }
      } catch (err) {
        // Not authenticated
      } finally {
        setCheckingAuth(false);
      }
    }

    initAuth();
  }, [router]);

  // 2. Handle Username & Password Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your administrator username.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your administrator password.");
      return;
    }

    setLoading(true);
    setLoadingMessage("Verifying administrator credentials...");
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid username or password. Please verify and try again.");
        setLoading(false);
        return;
      }

      // Mark this tab session as active
      sessionStorage.setItem("stanns_admin_tab_active", "1");

      // Hard navigation to admin panel
      window.location.replace("/admin");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-white">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-300">Checking credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001226] via-[#002147] to-[#0d2a4a] flex items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative">
          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#002147] text-white shadow-lg mb-4 ring-4 ring-blue-500/20">
              <Shield className="w-8 h-8 text-blue-300" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              St. Ann&apos;s College
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-800 mt-1">
              Admin &amp; Customizer Portal
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-[11px] font-semibold text-slate-700 mt-3">
              <span>Authorized Personnel Only</span>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-rose-50 border-2 border-rose-300/80 rounded-2xl p-4 mb-6 text-left shadow-xs animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-rose-100 rounded-lg text-rose-600 shrink-0 mt-0.5">
                  <UserX className="w-4 h-4" />
                </div>
                <div className="text-xs text-rose-950 leading-relaxed flex-1">
                  <span className="font-bold text-xs text-rose-900 block mb-0.5">
                    Authentication Notice
                  </span>
                  <p className="text-rose-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 mb-6">
              <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-700">{loadingMessage}</p>
            </div>
          )}

          {/* Administrator Login Form */}
          {!loading && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Administrator Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username (e.g. admin)..."
                    className="w-full px-4 py-3 pl-10 pr-4 text-sm font-medium bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-all shadow-xs"
                    autoFocus
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Administrator Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter administrator password..."
                    className="w-full px-4 py-3 pl-10 pr-10 text-sm font-medium bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-all shadow-xs"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    tabIndex={-1}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#002147] hover:bg-[#002b5c] active:bg-[#001730] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-blue-900/40 mt-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Sign In as Administrator</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </form>
          )}

          {/* Clean Footer Navigation */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              ← Back to Main Website
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6 select-none">
          © {new Date().getFullYear()} St. Ann&apos;s College for Women, Gorantla.
        </p>
      </div>
    </div>
  );
}
