import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getAuthSecret(): string {
  return process.env.SANITY_WRITE_TOKEN || "st-anns-admin-auth-secret-key-2026";
}

function base64UrlToUint8Array(base64Url: string): Uint8Array {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function verifyAdminSession(token: string | undefined): Promise<boolean> {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return false;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 2) {
      return false;
    }

    const [payloadB64, signature] = parts;
    if (!payloadB64 || !signature) {
      return false;
    }

    const secret = getAuthSecret();
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = base64UrlToUint8Array(signature);
    const dataBytes = enc.encode(payloadB64);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as unknown as BufferSource,
      dataBytes
    );
    if (!isValid) {
      return false;
    }

    const pad = payloadB64.length % 4;
    const padded = pad ? payloadB64 + "=".repeat(4 - pad) : payloadB64;
    const payloadJson = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && typeof payload.exp === "number" && payload.exp < now) {
      return false; // Expired
    }

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("stanns_admin_session")?.value;
    const isValid = await verifyAdminSession(sessionCookie);

    // If no valid signed unexpired session is present, redirect to /admin/login immediately
    if (!isValid) {
      const loginUrl = new URL("/admin/login", request.url);
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      redirectResponse.headers.set("Pragma", "no-cache");
      redirectResponse.headers.set("Expires", "0");
      redirectResponse.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
      if (sessionCookie) {
        redirectResponse.cookies.delete("stanns_admin_session");
      }
      return redirectResponse;
    }
  }

  const response = NextResponse.next();

  // Attach anti-indexing and no-cache headers to private/management portals
  const isPrivatePortal =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/update") ||
    pathname.startsWith("/facultyupdate") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/academics/departments/update");

  if (isPrivatePortal) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/update/:path*",
    "/facultyupdate/:path*",
    "/studio/:path*",
    "/academics/departments/update/:path*",
  ],
};
