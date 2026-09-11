import { NextRequest, NextResponse } from "next/server";
import {
  verifySanityMember,
  createAdminSessionToken,
} from "@/lib/admin-auth";

const COOKIE_NAME = "stanns_admin_session";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const baseUrl = url.origin;

  // Extract sid or token from query parameters
  let sid = url.searchParams.get("sid");
  const urlParam = url.searchParams.get("url");

  if (!sid && urlParam) {
    try {
      const parsed = new URL(urlParam);
      sid = parsed.searchParams.get("sid");
    } catch {
      // Ignore
    }
  }

  let token = url.searchParams.get("token");

  // If we have an sid (session ID), exchange it for the auth token
  if (sid && !token) {
    try {
      const fetchRes = await fetch(`https://api.sanity.io/v1/auth/fetch?sid=${sid}`, {
        cache: "no-store",
      });
      if (fetchRes.ok) {
        const data = await fetchRes.json();
        token = data.token;
      } else {
        console.warn("Could not exchange sid for token, status:", fetchRes.status);
      }
    } catch (err) {
      console.error("Error exchanging sid for token:", err);
    }
  }

  // If still no token, redirect back with error
  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login?error=oauth_failed", baseUrl)
    );
  }

  // Retrieve user identity from Sanity with this token
  try {
    const userRes = await fetch("https://api.sanity.io/v2021-06-07/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!userRes.ok) {
      return NextResponse.redirect(
        new URL("/admin/login?error=invalid_user_session", baseUrl)
      );
    }

    const userData = await userRes.json();
    const email = userData.email?.toLowerCase().trim();

    if (!email) {
      return NextResponse.redirect(
        new URL("/admin/login?error=missing_email", baseUrl)
      );
    }

    // Verify if this Google account belongs to an authorized member of the Sanity project
    const sanityMember = await verifySanityMember(email);

    if (!sanityMember) {
      // User authenticated with Google, but does NOT have admin access to this college project
      return NextResponse.redirect(
        new URL(
          `/admin/login?error=access_denied&email=${encodeURIComponent(email)}`,
          baseUrl
        )
      );
    }

    // Grant Admin Session!
    const sessionUser = {
      ...sanityMember,
      name: userData.displayName || `${userData.givenName || ""} ${userData.familyName || ""}`.trim() || sanityMember.name,
    };
    const sessionToken = createAdminSessionToken(sessionUser, 7);

    const isProduction = process.env.NODE_ENV === "production";
    const response = NextResponse.redirect(new URL("/admin", baseUrl));

    response.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in auth callback:", error);
    return NextResponse.redirect(
      new URL("/admin/login?error=server_error", baseUrl)
    );
  }
}
