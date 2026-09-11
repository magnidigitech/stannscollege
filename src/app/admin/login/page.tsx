"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  ExternalLink,
  RotateCcw,
  KeyRound,
  ArrowRight,
  UserX,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

declare global {
  interface Window {
    google?: any;
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Checking session...");
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // 1. Check if already authenticated or if returning with token/error
  useEffect(() => {
    async function initAuth() {
      try {
        // A. Check existing admin session
        const res = await fetch("/api/admin/auth", { cache: "no-store" });
        const data = await res.json();
        if (data.authenticated) {
          window.location.href = "/admin";
          return;
        }

        // B. Check URL query & hash for returning token or errors from OAuth
        if (typeof window !== "undefined") {
          const search = window.location.search || "";
          const hash = window.location.hash || "";
          const searchParams = new URLSearchParams(search);
          const hashParams = new URLSearchParams(hash.replace(/^#/, "?"));

          // Check if token was returned in hash or search
          const incomingToken = hashParams.get("token") || searchParams.get("token");
          if (incomingToken) {
            setLoading(true);
            setLoadingMessage("Validating administrator credentials...");
            const resToken = await fetch("/api/admin/auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sanityToken: incomingToken }),
            });
            const dataToken = await resToken.json();
            if (dataToken.success) {
              window.location.href = "/admin";
              return;
            } else {
              setError(dataToken.error || "Authentication failed.");
            }
          }

          // Check if an error was returned in URL
          const urlError =
            searchParams.get("error") ||
            hashParams.get("error") ||
            searchParams.get("error_description") ||
            hashParams.get("error_description");

          const deniedEmail = searchParams.get("email") || hashParams.get("email");

          if (urlError) {
            if (urlError === "access_denied") {
              setError(
                deniedEmail
                  ? `Access Denied: The Google account "${deniedEmail}" is authenticated, but it does NOT have administrator privileges for St. Ann's College.`
                  : "Access Denied: This account is not recognized as an authorized administrator of St. Ann's College."
              );
            } else if (urlError === "oauth_failed") {
              setError("Authentication could not be completed. Please try again or use the Administrator Passkey.");
            } else {
              setError(urlError);
            }

            // Clean URL query params so refreshed page is clean
            if (window.history?.replaceState) {
              window.history.replaceState(null, "", window.location.pathname);
            }
            return;
          }
        }
      } catch (err) {
        // Not authenticated
      } finally {
        setCheckingAuth(false);
        setLoading(false);
      }
    }

    initAuth();
  }, [router]);

  // 2. Handle Password / Passkey Authentication
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the administrator passkey.");
      return;
    }

    setLoading(true);
    setLoadingMessage("Verifying administrator passkey...");
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid Administrator Passkey. Please verify and try again.");
        setLoading(false);
        return;
      }

      // Hard navigation to admin panel
      window.location.href = "/admin";
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
      setLoading(false);
    }
  };

  // 3. Handle Google Identity Services (GIS) Response
  const handleGoogleCredentialResponse = async (response: any) => {
    if (!response.credential) {
      setError("Google authentication was cancelled or interrupted.");
      return;
    }

    setLoading(true);
    setLoadingMessage("Verifying Google credentials & administrator rights...");
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data.error ||
            "Access Denied: This Google account is not recognized as an authorized administrator of St. Ann's College."
        );
        setLoading(false);
        return;
      }

      window.location.href = "/admin";
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during Google Sign-In.");
      setLoading(false);
    }
  };

  const renderGoogleButton = () => {
    if (
      typeof window !== "undefined" &&
      window.google?.accounts?.id &&
      googleClientId &&
      googleBtnRef.current
    ) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredentialResponse,
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "pill",
          text: "signin_with",
          logo_alignment: "left",
          width: 340,
        });
      } catch (e) {
        console.warn("Could not render Google Sign-In button:", e);
      }
    }
  };

  // 4. Initiate Google OAuth Flow through Sanity OAuth Bridge
  const handleGoogleLogin = () => {
    if (typeof window === "undefined") return;
    setError(null);
    setLoading(true);
    setLoadingMessage("Connecting to Google Sign-In...");
    const origin = window.location.origin;
    // Use clean origin for CORS compatibility
    window.location.href = `https://api.sanity.io/v1/auth/login/google?type=token&origin=${encodeURIComponent(origin)}`;
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
      {googleClientId && (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onLoad={renderGoogleButton}
        />
      )}

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

          {/* Main Passkey Form */}
          {!loading && (
            <div className="space-y-5">
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Administrator Passkey
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter administrator passkey..."
                      className="w-full px-4 py-3 pl-10 pr-10 text-sm font-medium bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-all shadow-xs"
                      autoFocus
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#002147] hover:bg-[#002b5c] active:bg-[#001730] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-blue-900/40"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Sign In as Administrator</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-2 w-full my-2">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10px] uppercase font-bold text-slate-400">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Alternative Auth: Google Sign-In */}
              <div className="space-y-2.5">
                {googleClientId && (
                  <div className="w-full flex justify-center" ref={googleBtnRef}></div>
                )}

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 rounded-xl font-semibold text-xs border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Sign in with Google Account</span>
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-tight px-2">
                  Tip: For instant access without third-party OAuth, enter your Administrator Passkey above.
                </p>

                {/* Sanity Studio Direct Login */}
                <Link
                  href="/studio"
                  target="_blank"
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-200/80"
                >
                  <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                  <span>Open College Management Studio</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 ml-auto" />
                </Link>
              </div>
            </div>
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
