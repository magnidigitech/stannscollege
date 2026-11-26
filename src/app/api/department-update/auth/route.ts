import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionToken, SanityMemberUser } from "@/lib/admin-auth";
import { getAcademicsPortalData } from "@/lib/sanity";

const DEFAULT_PASSWORDS: Record<string, string> = {
  "department-of-commerce": "commerce@2026",
  "department-of-bca": "bca@2026",
  "department-of-computer-science": "computerscience@2026",
  "department-of-artificial-intelligence": "ai@2026",
  "department-of-computer-science-applications": "computerscience@2026",
  "department-of-computer-applications-bca": "bca@2026",
  "department-of-computer-science-cs-artificial-intelligence": "ai@2026",
  "department-of-mathematics": "mathematics@2026",
  "department-of-physics": "physics@2026",
  "department-of-statistics": "statistics@2026",
  "department-of-biotechnology": "biotechnology@2026",
  "department-of-microbiology": "microbiology@2026",
  "department-of-botany": "botany@2026",
  "department-of-chemistry": "chemistry@2026",
  "department-of-english": "english@2026",
  "department-of-telugu": "telugu@2026",
  "department-of-telugu-wing": "telugu@2026",
  "department-of-sanskrit-hindi": "sanskirthindi@2026",
  "department-of-sanskrit-hindi-wing": "sanskirthindi@2026",
  "department-of-oriental-languages": "orientallanguages@2026",
  "department-of-oriental-languages-telugu-sanskrit-hindi": "orientallanguages@2026",
  "department-of-mca": "mca@2026",
  "department-of-mba": "mba@2026",
  // Institutional Committees & Cells
  "publications": "publications@2026",
  "events": "events@2026",
  "notices": "notices@2026",
  "naac-aqar": "naac@2026",
  "qa": "naac@2026",
};

const MASTER_PASSWORD = process.env.STAFF_MASTER_PASSWORD || process.env.DEPARTMENT_MASTER_PASSWORD || "Stannsf@2026";

async function getDepartmentPassword(deptId: string): Promise<string> {
  try {
    const portalData = await getAcademicsPortalData();
    if (portalData && portalData.departmentPasswords && portalData.departmentPasswords[deptId]) {
      return portalData.departmentPasswords[deptId];
    }
  } catch (err) {
    console.error("Error reading live department passwords from Sanity:", err);
  }
  return DEFAULT_PASSWORDS[deptId] || MASTER_PASSWORD;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { departmentId, password } = body;

    if (!departmentId || !password) {
      return NextResponse.json(
        { success: false, error: "Selection and password are required." },
        { status: 400 }
      );
    }

    const expectedPassword = await getDepartmentPassword(departmentId);

    if (password === expectedPassword || password === MASTER_PASSWORD) {
      const isCommittee = ["publications", "events", "notices", "naac-aqar", "qa"].includes(departmentId);
      const sessionUser: SanityMemberUser = {
        id: `staff-${departmentId}`,
        email: `${departmentId}@stannscollegeforwomen.ac.in`,
        name: isCommittee 
          ? departmentId === "publications" ? "Publications & Media Team" 
          : departmentId === "events" ? "Events & Activities Coordinator"
          : departmentId === "notices" ? "Notice Board & Circulars Coordinator"
          : "NAAC & AQAR Quality Cell Coordinator"
          : `${departmentId.replace("department-of-", "").replace(/-/g, " ")} Head`,
        role: isCommittee ? departmentId : "department-head",
      };

      const sessionToken = createAdminSessionToken(sessionUser, 1);
      const res = NextResponse.json({
        success: true,
        message: "Authentication successful.",
        role: sessionUser.role,
        name: sessionUser.name,
      });

      res.cookies.set("stanns_admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 86400, // 1 day
      });

      return res;
    }

    return NextResponse.json(
      {
        success: false,
        error: "Incorrect password. Please enter the valid departmental or committee password.",
      },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out successfully." });
  res.cookies.delete("stanns_admin_session");
  return res;
}
