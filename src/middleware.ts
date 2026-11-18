import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("stanns_admin_session")?.value;

    // If no session cookie is present, redirect to /admin/login immediately before any page HTML renders
    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      redirectResponse.headers.set("Pragma", "no-cache");
      redirectResponse.headers.set("Expires", "0");
      redirectResponse.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
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
