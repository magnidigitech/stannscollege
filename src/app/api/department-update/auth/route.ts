import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createAdminSessionToken, SanityMemberUser } from "@/lib/admin-auth";

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
  "department-of-telugu-wing": "telugu@2026",
  "department-of-sanskrit-hindi-wing": "sanskirthindi@2026",
  "department-of-oriental-languages": "orientallanguages@2026",
  "department-of-oriental-languages-telugu-sanskrit-hindi": "orientallanguages@2026",
  "department-of-mca": "mca@2026",
  "department-of-mba": "mba@2026",
  // Institutional Committees & Cells
  "publications": "publications@2026",
  "events": "events@2026",
  "notices": "notices@2026",
};

const MASTER_PASSWORD = "Stannsf@2026";

function getDepartmentPassword(deptId: string): string {
  try {
    const filePath = path.join(process.cwd(), "src/components/academics/academics-data.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const json = JSON.parse(fileContent);
      if (json.departmentPasswords && json.departmentPasswords[deptId]) {
        return json.departmentPasswords[deptId];
      }
    }
  } catch (err) {
    console.error("Error reading department passwords from file:", err);
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

    const expectedPassword = getDepartmentPassword(departmentId);

    if (password === expectedPassword || password === MASTER_PASSWORD) {
      const isCommittee = ["publications", "events", "notices"].includes(departmentId);
      const sessionUser: SanityMemberUser = {
        id: `staff-${departmentId}`,
        email: `${departmentId}@stannscollegeforwomen.ac.in`,
        name: isCommittee 
          ? departmentId === "publications" ? "Publications & Media Team" 
          : departmentId === "events" ? "Events & Activities Coordinator"
          : "Notice Board & Circulars Coordinator"
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
