import crypto from "crypto";

const PROJECT_ID = "fhjwqub5";
const SANITY_API_VERSION = "v2021-06-07";

export interface SanityMemberUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AdminSession {
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

// In-memory cache for Sanity project members (TTL: 10 minutes)
let membersCache: {
  timestamp: number;
  members: SanityMemberUser[];
} | null = null;

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getAuthSecret(): string {
  const secret = process.env.SANITY_WRITE_TOKEN || "st-anns-admin-auth-secret-key-2026";
  return secret;
}

/**
 * Fetches all members of the Sanity project fhjwqub5 and resolves their email addresses.
 */
export async function getSanityProjectMembers(): Promise<SanityMemberUser[]> {
  const now = Date.now();
  if (membersCache && now - membersCache.timestamp < CACHE_TTL_MS) {
    return membersCache.members;
  }

  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    console.error("SANITY_WRITE_TOKEN is not configured");
    return [];
  }

  try {
    const projectRes = await fetch(`https://api.sanity.io/${SANITY_API_VERSION}/projects/${PROJECT_ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 600 },
    });

    if (!projectRes.ok) {
      console.error("Failed to fetch Sanity project:", await projectRes.text());
      return [];
    }

    const projectData = await projectRes.json();
    const membersList: any[] = projectData.members || [];

    const resolvedMembers: SanityMemberUser[] = [];

    // Fetch user details for each member to retrieve email
    for (const member of membersList) {
      if (!member.id || member.isRobot) continue;
      try {
        const userRes = await fetch(`https://api.sanity.io/${SANITY_API_VERSION}/users/${member.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          if (userData.email) {
            const roleName = member.roles?.[0]?.title || member.roles?.[0]?.name || "Editor";
            resolvedMembers.push({
              id: member.id,
              email: userData.email.toLowerCase().trim(),
              name: userData.displayName || `${userData.givenName || ""} ${userData.familyName || ""}`.trim() || userData.email,
              role: roleName,
            });
          }
        }
      } catch (err) {
        console.error(`Error resolving user ${member.id}:`, err);
      }
    }

    membersCache = {
      timestamp: now,
      members: resolvedMembers,
    };

    return resolvedMembers;
  } catch (error) {
    console.error("Error in getSanityProjectMembers:", error);
    return [];
  }
}

/**
 * Verifies if an email belongs to an authorized member of the Sanity project.
 */
export async function verifySanityMember(email: string): Promise<SanityMemberUser | null> {
  if (!email) return null;
  const cleanEmail = email.toLowerCase().trim();

  const members = await getSanityProjectMembers();
  const match = members.find((m) => m.email === cleanEmail);

  if (match) return match;

  // Fallback: If cache was slightly stale or invite was newly accepted, force a fresh fetch
  if (membersCache) {
    membersCache = null;
    const freshMembers = await getSanityProjectMembers();
    return freshMembers.find((m) => m.email === cleanEmail) || null;
  }

  return null;
}

/**
 * Creates a signed session token using HMAC-SHA256
 */
export function createAdminSessionToken(user: SanityMemberUser, maxAgeDays = 7): string {
  const secret = getAuthSecret();
  const now = Math.floor(Date.now() / 1000);
  const exp = now + maxAgeDays * 24 * 60 * 60;

  const payload: AdminSession = {
    email: user.email,
    name: user.name,
    role: user.role,
    iat: now,
    exp,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies a signed session token. Returns the session payload if valid and unexpired.
 */
export function verifyAdminSessionToken(token: string): AdminSession | null {
  if (!token || !token.includes(".")) return null;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const secret = getAuthSecret();
  const expectedSignature = crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const payload: AdminSession = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8"));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}
