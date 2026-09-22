import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import {
  tpoOfficer,
  annualReportsList,
  placementAboutDoc,
  skillDomains,
  apssdcSupportAreas,
  competitiveExamsList,
  defaultInternshipGalleries,
  defaultCompetitiveGalleries,
  defaultPlacementExternalLinks
} from "@/components/placements/staticData";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const PLACEMENTS_DOC_ID = "placements-singleton";

function getSanityClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-03-01",
    token: token || undefined,
    useCdn: false,
  });
}

function checkAdminAuth(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const session = verifyAdminSessionToken(token);
  return !!session;
}

const DEFAULT_PLACEMENTS_DATA = {
  _id: PLACEMENTS_DOC_ID,
  _type: "placements-singleton",
  tpoOfficer: { ...tpoOfficer },
  aboutOverview: {
    title: "About the Training & Placement Cell Overview",
    description: "The Training & Placement (T&P) Cell of St. Ann’s College for Women, Gorantla, Guntur supports students in developing employability, career readiness and professional skills.",
    vision: "To empower women students with knowledge, skills, confidence and professional competence for successful careers and responsible citizenship.",
    mission: "To provide systematic training, career guidance, industry exposure and placement support, enabling students to confidently pursue employment, higher education, entrepreneurship and lifelong learning.",
    aboutPdfUrl: placementAboutDoc.fileUrl,
    objectives: [
      "Enhance students’ employability and career readiness.",
      "Facilitate campus placements, internships and industry interactions.",
      "Develop communication, aptitude, technical and soft skills.",
      "Provide training in resume preparation, GDs and interviews.",
      "Offer guidance for higher education and competitive examinations.",
      "Encourage entrepreneurship, innovation and self-employment.",
      "Strengthen interaction with recruiters, industries, alumni and professionals.",
      "Maintain placement and training records for quality improvement and institutional development."
    ]
  },
  statistics: {
    highestPackage: "₹ 8.50 LPA",
    averagePackage: "₹ 3.80 LPA",
    placementRate: "85%+",
    recruitingCompaniesCount: "50+",
    companyWiseStats: [
      {
        year: "2025-2026",
        title: "Company-wise Placed Students 2025–2026",
        fileUrl: "/documents/placements/Students palced company wise data 2025-2026.png"
      },
      {
        year: "2024-2025",
        title: "Placement Statistics Summary 2024–2025",
        fileUrl: "/documents/placements/2024-2025 Placement statisitcs.png"
      }
    ],
    programmeWiseStats: [
      {
        year: "2025-2026",
        title: "Programme-wise Placement Statistics 2025–2026",
        fileUrl: "/documents/placements/Programmewsie palcement statitics 2025-2026.pdf"
      },
      {
        year: "2024-2025",
        title: "Programme-wise Placement Statistics 2024–2025",
        fileUrl: "/documents/placements/Programme Wise Placement statisicts 2024-2025.pdf"
      }
    ]
  },
  recruiters: [
    { id: "tcs", name: "Tata Consultancy Services", short: "TCS", sector: "IT & Digital Services", roles: "Software Trainee / Associate", color: "from-blue-900 to-indigo-950", tag: "IT Services" },
    { id: "infosys", name: "Infosys Limited", short: "INF", sector: "IT & Enterprise Consulting", roles: "Systems Engineer Trainee", color: "from-sky-700 to-blue-900", tag: "IT Services" },
    { id: "wipro", name: "Wipro Technologies", short: "WIP", sector: "Cloud & Digital Solutions", roles: "Project Engineer / Analyst", color: "from-emerald-700 to-teal-900", tag: "IT Services" },
    { id: "capgemini", name: "Capgemini", short: "CAP", sector: "Global IT Services", roles: "Senior Analyst / Tech Associate", color: "from-blue-600 to-indigo-800", tag: "IT Services" },
    { id: "techm", name: "Tech Mahindra", short: "TM", sector: "Telecom & Software Solutions", roles: "Associate Software Engineer", color: "from-rose-700 to-red-900", tag: "IT Services" },
    { id: "cts", name: "Cognizant Technology Solutions", short: "CTS", sector: "Digital Transformation", roles: "Programmer Analyst Trainee", color: "from-blue-800 to-cyan-900", tag: "IT Services" },
    { id: "accenture", name: "Accenture", short: "ACN", sector: "Strategy & Technology", roles: "Application Development Associate", color: "from-purple-800 to-indigo-950", tag: "IT Services" },
    { id: "hcl", name: "HCL Technologies", short: "HCL", sector: "IT Infrastructure & Cloud", roles: "Graduate Trainee Engineer", color: "from-blue-700 to-blue-950", tag: "IT Services" },
    { id: "icici", name: "ICICI Bank", short: "ICICI", sector: "Banking & Financial Services", roles: "Relationship Manager / Officer", color: "from-amber-700 to-orange-900", tag: "Banking & Finance" },
    { id: "hdfc", name: "HDFC Bank", short: "HDFC", sector: "Retail & Corporate Banking", roles: "Branch Operations Executive", color: "from-blue-900 to-sky-950", tag: "Banking & Finance" },
    { id: "hetero", name: "Hetero Drugs Ltd.", short: "HET", sector: "Pharmaceuticals & Healthcare", roles: "QC / QA Trainee Analyst", color: "from-teal-800 to-emerald-950", tag: "Pharma & Science" },
    { id: "divis", name: "Divi's Laboratories", short: "DIV", sector: "Life Sciences & Biotech", roles: "Chemist / Research Associate", color: "from-indigo-800 to-slate-900", tag: "Pharma & Science" },
    { id: "genpact", name: "Genpact", short: "GEN", sector: "Analytics & Digital Operations", roles: "Process Associate / Finance", color: "from-amber-600 to-red-900", tag: "EdTech & Analytics" },
    { id: "sutherland", name: "Sutherland Global", short: "SUTH", sector: "Customer Experience & ITES", roles: "Associate / Digital Support", color: "from-blue-700 to-indigo-900", tag: "EdTech & Analytics" },
    { id: "omega", name: "Omega Healthcare", short: "OMG", sector: "Healthcare IT & RCM", roles: "Medical Coding Trainee", color: "from-cyan-800 to-blue-950", tag: "Pharma & Science" },
    { id: "chaitanya", name: "Sri Chaitanya Institutions", short: "SCI", sector: "Academic & EdTech", roles: "Faculty Trainee / Coordinator", color: "from-red-800 to-amber-950", tag: "EdTech & Analytics" }
  ],
  mous: [
    { id: "mou-1", title: "EXCER Edtech Pvt. Ltd. (Skill & Placement Integration)", department: "Institutional / Placement Cell", year: "2025-2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: "mou-2", title: "Dimensions Coaching Centre (Competitive Exams Coaching)", department: "Career Development Cell", year: "2025-2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: "mou-3", title: "Datavalley India Pvt. Ltd. (Long Term Digital Internships)", department: "Computer Science & IT", year: "2025-2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: "mou-4", title: "Ala Hospital (Healthcare Sciences & Clinical Exposure)", department: "Life Sciences / Biotech", year: "2025-2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: "mou-5", title: "APSSDC (Skill Hub & Employability Support)", department: "All Departments", year: "2025-2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: "mou-6", title: "EXCER Edtech Pvt. Ltd. (2023-2024 & 2024-2025)", department: "Institution / Placement Cell", year: "2024-2025", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: "mou-7", title: "Dimensions Coaching Centre 2020-2025", department: "Career Development Cell", year: "2024-2025", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: "mou-8", title: "Datavalley India Pvt. Ltd. (Long Term Internship)", department: "Computer Applications", year: "2024-2025", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: "mou-9", title: "Ala Hospital 2017-2026", department: "Botany & Zoology", year: "2024-2025", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: "mou-10", title: "Pidilite Industries Ltd., Guntur", department: "Chemistry & Commerce", year: "2024-2025", fileUrl: "/documents/DefaultFile_1.pdf" }
  ],
  mousMasterPdfUrl: "/documents/placements/Training & Placement Cell.pdf",
  mouActivities: [
    { id: 1, title: "Industry 4.0 & Cloud Tech Training Workshop", partner: "EXCER Edtech Pvt. Ltd.", dept: "Institutional Placement Cell", date: "Dec 2025", year: "2025-2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: 2, title: "6-Month Full Stack Web Development Internship", partner: "Datavalley India Pvt. Ltd.", dept: "Computer Science & IT", date: "Nov 2025", year: "2025-2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: 3, title: "Banking & SSC Fast-Track Coaching Modules", partner: "Dimensions Coaching Centre", dept: "Career Development Cell", date: "Oct 2025", year: "2025-2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: 4, title: "Clinical Diagnostics & Biochemical Testing Exposure", partner: "Ala Hospital", dept: "Life Sciences / Zoology", date: "Sep 2025", year: "2025-2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: 5, title: "Industrial Chemistry Workshop & Polymer Demo", partner: "Pidilite Industries Ltd., Guntur", dept: "Chemistry & Commerce", date: "Aug 2024", year: "2024-2025", fileUrl: "/documents/DefaultFile_1.pdf" },
    { id: 6, title: "Faculty & Student Botanical Field Exposure", partner: "Hindu College Collaboration", dept: "Botany", date: "Jul 2024", year: "2024-2025", fileUrl: "/documents/DefaultFile_1.pdf" }
  ],
  annualReports: [...annualReportsList],
  skillDomains: [...skillDomains],
  skillTrainingPdfUrl: "/documents/DefaultFile_1.pdf",
  apssdcSupportAreas: [...apssdcSupportAreas],
  apssdcPdfUrl: "/documents/DefaultFile_1.pdf",
  internshipReports: [
    { year: "2025-2026", title: "Internships & Industry Exposure 2025–2026 Report", fileUrl: "/documents/DefaultFile_1.pdf" },
    { year: "2024-2025", title: "Internships & Industry Exposure 2024–2025 Report", fileUrl: "/documents/DefaultFile_1.pdf" }
  ],
  internshipGalleries: [...defaultInternshipGalleries],
  competitiveExamsList: [...competitiveExamsList],
  competitiveExamReports: [
    { year: "2025-2026", title: "Competitive Exam Coaching 2025–2026 Syllabus & Report", fileUrl: "/documents/DefaultFile_1.pdf" },
    { year: "2024-2025", title: "Competitive Exam Coaching 2024–2025 Syllabus & Report", fileUrl: "/documents/DefaultFile_1.pdf" }
  ],
  competitiveExamGalleries: [...defaultCompetitiveGalleries],
  externalLinks: { ...defaultPlacementExternalLinks },
  industryEngagementPdfUrl: "/documents/DefaultFile_1.pdf",
  internationalPolicyPdfUrl: "/documents/DefaultFile_1.pdf"
};

/**
 * GET /api/admin/placements
 * Returns current Placements data from Sanity or default fallback
 */
export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Active admin session required." },
      { status: 401 }
    );
  }

  try {
    const client = getSanityClient();
    const query = `*[_type == "placements-singleton" && !(_id in path("drafts.**"))][0] {
      _id,
      tpoOfficer,
      aboutOverview,
      statistics,
      recruiters,
      mous,
      mousMasterPdfUrl,
      mouActivities,
      annualReports,
      skillDomains,
      skillTrainingPdfUrl,
      apssdcSupportAreas,
      apssdcPdfUrl,
      internshipReports,
      internshipGalleries,
      competitiveExamsList,
      competitiveExamReports,
      competitiveExamGalleries,
      externalLinks,
      industryEngagementPdfUrl,
      internationalPolicyPdfUrl
    }`;

    const sanityDoc = await client.fetch(query);
    if (sanityDoc && sanityDoc._id) {
      return NextResponse.json({
        success: true,
        data: {
          ...DEFAULT_PLACEMENTS_DATA,
          ...sanityDoc,
          internshipGalleries: sanityDoc.internshipGalleries?.length ? sanityDoc.internshipGalleries : DEFAULT_PLACEMENTS_DATA.internshipGalleries,
          competitiveExamGalleries: sanityDoc.competitiveExamGalleries?.length ? sanityDoc.competitiveExamGalleries : DEFAULT_PLACEMENTS_DATA.competitiveExamGalleries,
          externalLinks: {
            ...DEFAULT_PLACEMENTS_DATA.externalLinks,
            ...(sanityDoc.externalLinks || {})
          }
        }
      });
    }

    // Return default template
    return NextResponse.json({ success: true, data: DEFAULT_PLACEMENTS_DATA });
  } catch (err: any) {
    console.error("GET /api/admin/placements error:", err);
    return NextResponse.json({ success: true, data: DEFAULT_PLACEMENTS_DATA, fallback: true });
  }
}

/**
 * POST /api/admin/placements
 * Saves / updates Placements singleton document in Sanity
 */
export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Active admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const client = getSanityClient();

    const docToSave = {
      _id: PLACEMENTS_DOC_ID,
      _type: "placements-singleton",
      tpoOfficer: body.tpoOfficer || DEFAULT_PLACEMENTS_DATA.tpoOfficer,
      aboutOverview: body.aboutOverview || DEFAULT_PLACEMENTS_DATA.aboutOverview,
      statistics: body.statistics || DEFAULT_PLACEMENTS_DATA.statistics,
      recruiters: body.recruiters || DEFAULT_PLACEMENTS_DATA.recruiters,
      mous: body.mous || DEFAULT_PLACEMENTS_DATA.mous,
      mousMasterPdfUrl: body.mousMasterPdfUrl || DEFAULT_PLACEMENTS_DATA.mousMasterPdfUrl,
      mouActivities: body.mouActivities || DEFAULT_PLACEMENTS_DATA.mouActivities,
      annualReports: body.annualReports || DEFAULT_PLACEMENTS_DATA.annualReports,
      skillDomains: body.skillDomains || DEFAULT_PLACEMENTS_DATA.skillDomains,
      skillTrainingPdfUrl: body.skillTrainingPdfUrl || DEFAULT_PLACEMENTS_DATA.skillTrainingPdfUrl,
      apssdcSupportAreas: body.apssdcSupportAreas || DEFAULT_PLACEMENTS_DATA.apssdcSupportAreas,
      apssdcPdfUrl: body.apssdcPdfUrl || DEFAULT_PLACEMENTS_DATA.apssdcPdfUrl,
      internshipReports: body.internshipReports || DEFAULT_PLACEMENTS_DATA.internshipReports,
      internshipGalleries: body.internshipGalleries || DEFAULT_PLACEMENTS_DATA.internshipGalleries,
      competitiveExamsList: body.competitiveExamsList || DEFAULT_PLACEMENTS_DATA.competitiveExamsList,
      competitiveExamReports: body.competitiveExamReports || DEFAULT_PLACEMENTS_DATA.competitiveExamReports,
      competitiveExamGalleries: body.competitiveExamGalleries || DEFAULT_PLACEMENTS_DATA.competitiveExamGalleries,
      externalLinks: body.externalLinks || DEFAULT_PLACEMENTS_DATA.externalLinks,
      industryEngagementPdfUrl: body.industryEngagementPdfUrl || DEFAULT_PLACEMENTS_DATA.industryEngagementPdfUrl,
      internationalPolicyPdfUrl: body.internationalPolicyPdfUrl || DEFAULT_PLACEMENTS_DATA.internationalPolicyPdfUrl,
      updatedAt: new Date().toISOString()
    };

    await client.createOrReplace(docToSave);

    return NextResponse.json({
      success: true,
      message: "Placements data successfully saved to Sanity.",
      data: docToSave
    });
  } catch (err: any) {
    console.error("POST /api/admin/placements error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save placements data." },
      { status: 500 }
    );
  }
}
