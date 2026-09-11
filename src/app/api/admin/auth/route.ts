import { NextRequest, NextResponse } from "next/server";
import {
  verifySanityMember,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

const COOKIE_NAME = "stanns_admin_session";

/**
 * Validates a Google OAuth ID token using Google's official public tokeninfo endpoint.
 * This guarantees the token was signed by Google, is unexpired, and the email is verified.
 */
async function verifyGoogleIdToken(idToken: string): Promise<{ email: string; name?: string } | null> {
  try {
    const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("Google token verification failed with status:", res.status);
      return null;
    }

    const data = await res.json();

    // Ensure email is verified and present
    if (!data.email || (data.email_verified !== "true" && data.email_verified !== true)) {
      console.warn("Google token email not verified:", data);
      return null;
    }

    return {
      email: data.email.toLowerCase().trim(),
      name: data.name || data.given_name,
    };
  } catch (err) {
    console.error("Error verifying Google ID token:", err);
    return null;
  }
}

/**
 * Validates a Sanity session token/ID by querying Sanity's /users/me endpoint.
 * This verifies the user authenticated via Sanity's Google OAuth bridge.
 */
async function verifySanitySessionToken(token: string): Promise<{ email: string; name?: string } | null> {
  try {
    const res = await fetch("https://api.sanity.io/v2021-06-07/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("Sanity session token verification failed with status:", res.status);
      return null;
    }

    const data = await res.json();
    if (!data.email) {
      return null;
    }

    return {
      email: data.email.toLowerCase().trim(),
      name: data.name || `${data.givenName || ""} ${data.familyName || ""}`.trim() || data.email,
    };
  } catch (err) {
    console.error("Error verifying Sanity session token:", err);
    return null;
  }
}

/**
 * GET /api/admin/auth
 * Checks if the current request has a valid admin session cookie.
 */
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({
        authenticated: true,
        user: {
          email: "admin@stannscollege.ac.in",
          name: "Administrator (Dev)",
          role: "administrator",
        },
      });
    }
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const session = verifyAdminSessionToken(token);
  if (!session) {
    const response = NextResponse.json({ authenticated: false }, { status: 200 });
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });
}

/**
 * POST /api/admin/auth
 * Authenticates the user via:
 *  1. Google OAuth ID Token (`credential`), OR
 *  2. Sanity Google OAuth Session Token (`sanityToken`)
 * 
 * Plain-text email submission is strictly disallowed.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { credential, sanityToken } = body;

    let verifiedUser: { email: string; name?: string } | null = null;

    // 1. Authenticate with Google ID token
    if (credential) {
      verifiedUser = await verifyGoogleIdToken(credential);
      if (!verifiedUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid or expired Google login session. Please sign in with Google again.",
          },
          { status: 401 }
        );
      }
    }
    // 2. Authenticate with Sanity Google Session token
    else if (sanityToken) {
      verifiedUser = await verifySanitySessionToken(sanityToken);
      if (!verifiedUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid Sanity Studio session. Please log in through Sanity Studio with your Google account.",
          },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Security Requirement: You must log in through Google. Manual email entry is not permitted.",
        },
        { status: 400 }
      );
    }

    const { email, name } = verifiedUser;

    // 3. Verify that this verified Google email is an invited collaborator in the Sanity project
    const sanityMember = await verifySanityMember(email);

    if (!sanityMember) {
      return NextResponse.json(
        {
          success: false,
          error: `Access Denied: The Google account "${email}" does not have administrator privileges for St. Ann's College. Please sign in with an authorized administrator account.`,
        },
        { status: 403 }
      );
    }

    // 4. Create secure admin session
    const sessionUser = {
      ...sanityMember,
      name: name || sanityMember.name,
    };
    const sessionToken = createAdminSessionToken(sessionUser, 7);

    const isProduction = process.env.NODE_ENV === "production";
    const response = NextResponse.json({
      success: true,
      user: {
        email: sessionUser.email,
        name: sessionUser.name,
        role: sessionUser.role,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin Auth error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Authentication failed" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/auth
 * Logs the admin out by clearing the session cookie.
 */
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
