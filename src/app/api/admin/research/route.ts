import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import { DEFAULT_RESEARCH_DATA } from "@/lib/sanity";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const RESEARCH_DOC_ID = "research-singleton";

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

/**
 * GET /api/admin/research
 * Returns current research & innovation data
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
    const query = `*[_type == "research-singleton" && !(_id in path("drafts.**"))][0] {
      _id,
      aboutOverview,
      researchPolicy {
        title,
        tagline,
        description,
        redirectUrl,
        "policyFileUrl": coalesce(policyFile.asset->url, policyFileUrl),
        "policyAssetId": policyFile.asset->_id
      },
      rdc {
        title,
        description,
        vision,
        mission,
        objectives,
        initiatives,
        commitment,
        "rdcPolicyFileUrl": coalesce(rdcPolicyFile.asset->url, rdcPolicyFileUrl),
        "rdcPolicyAssetId": rdcPolicyFile.asset->_id,
        activityReports[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl),
          "assetId": file.asset->_id
        }
      },
      infrastructure {
        description,
        facilities[] {
          _key,
          title,
          description
        }
      },
      scholarlyContributions {
        description,
        publications[] {
          _key,
          year,
          redirectUrl,
          "facultyFileUrl": coalesce(facultyFile.asset->url, facultyFileUrl),
          "facultyAssetId": facultyFile.asset->_id,
          "studentFileUrl": coalesce(studentFile.asset->url, studentFileUrl),
          "studentAssetId": studentFile.asset->_id
        },
        paperPresentations[] {
          _key,
          year,
          redirectUrl,
          "facultyFileUrl": coalesce(facultyFile.asset->url, facultyFileUrl),
          "facultyAssetId": facultyFile.asset->_id,
          "studentFileUrl": coalesce(studentFile.asset->url, studentFileUrl),
          "studentAssetId": studentFile.asset->_id
        },
        booksAndChapters[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl),
          "assetId": file.asset->_id
        }
      },
      patentsAndInnovations {
        description,
        initiatives,
        activitiesMatrix[] {
          _key,
          year,
          "innovationFileUrl": coalesce(innovationFile.asset->url, innovationFileUrl),
          "innovationAssetId": innovationFile.asset->_id,
          "startupFileUrl": coalesce(startupFile.asset->url, startupFileUrl),
          "startupAssetId": startupFile.asset->_id,
          "patentIprFileUrl": coalesce(patentIprFile.asset->url, patentIprFileUrl),
          "patentIprAssetId": patentIprFile.asset->_id
        }
      },
      iprCell {
        title,
        constitutedDate,
        description,
        objectives,
        majorActivities,
        expectedOutcomes,
        policyDescription,
        "policyFileUrl": coalesce(policyFile.asset->url, policyFileUrl),
        "policyAssetId": policyFile.asset->_id,
        activityReports[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl),
          "assetId": file.asset->_id
        }
      },
      entrepreneurshipCentre {
        title,
        description,
        vision,
        objectives,
        majorActivities,
        industryEngagement,
        womenEntrepreneurship,
        expectedOutcomes,
        policyDescription,
        "policyFileUrl": coalesce(policyFile.asset->url, policyFileUrl),
        "policyAssetId": policyFile.asset->_id,
        activityReports[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl),
          "assetId": file.asset->_id
        }
      },
      iicCell {
        title,
        description,
        objectives,
        keyActivities,
        expectedOutcomes,
        micLink,
        policyDescription,
        "policyFileUrl": coalesce(policyFile.asset->url, policyFileUrl),
        "policyAssetId": policyFile.asset->_id,
        activityReports[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl),
          "assetId": file.asset->_id
        }
      }
    }`;

    const data = await client.fetch(query);
    if (data) {
      return NextResponse.json({
        success: true,
        data: {
          ...DEFAULT_RESEARCH_DATA,
          ...data,
          researchPolicy: { ...DEFAULT_RESEARCH_DATA.researchPolicy, ...(data.researchPolicy || {}) },
          rdc: { ...DEFAULT_RESEARCH_DATA.rdc, ...(data.rdc || {}) },
          infrastructure: { ...DEFAULT_RESEARCH_DATA.infrastructure, ...(data.infrastructure || {}) },
          scholarlyContributions: { ...DEFAULT_RESEARCH_DATA.scholarlyContributions, ...(data.scholarlyContributions || {}) },
          patentsAndInnovations: { ...DEFAULT_RESEARCH_DATA.patentsAndInnovations, ...(data.patentsAndInnovations || {}) },
          iprCell: { ...DEFAULT_RESEARCH_DATA.iprCell, ...(data.iprCell || {}) },
          entrepreneurshipCentre: { ...DEFAULT_RESEARCH_DATA.entrepreneurshipCentre, ...(data.entrepreneurshipCentre || {}) },
          iicCell: { ...DEFAULT_RESEARCH_DATA.iicCell, ...(data.iicCell || {}) }
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: DEFAULT_RESEARCH_DATA,
      isDefault: true,
    });
  } catch (err: any) {
    console.error("Admin API Error fetching Research data:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch research data" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/research
 * Updates research & innovation singleton document in Sanity
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

    const doc = {
      _id: RESEARCH_DOC_ID,
      _type: "research-singleton",
      title: "Research & Innovation",
      lastUpdated: new Date().toISOString(),
      aboutOverview: body.aboutOverview || DEFAULT_RESEARCH_DATA.aboutOverview,
      
      researchPolicy: {
        title: body.researchPolicy?.title || DEFAULT_RESEARCH_DATA.researchPolicy.title,
        tagline: body.researchPolicy?.tagline || DEFAULT_RESEARCH_DATA.researchPolicy.tagline,
        description: body.researchPolicy?.description || DEFAULT_RESEARCH_DATA.researchPolicy.description,
        policyFileUrl: body.researchPolicy?.policyFileUrl || "/documents/DefaultFile_1.pdf",
        redirectUrl: body.researchPolicy?.redirectUrl || "",
        ...(body.researchPolicy?.policyAssetId ? { policyFile: { _type: "file", asset: { _type: "reference", _ref: body.researchPolicy.policyAssetId } } } : {})
      },

      rdc: {
        title: body.rdc?.title || DEFAULT_RESEARCH_DATA.rdc.title,
        description: body.rdc?.description || DEFAULT_RESEARCH_DATA.rdc.description,
        vision: body.rdc?.vision || DEFAULT_RESEARCH_DATA.rdc.vision,
        mission: body.rdc?.mission || DEFAULT_RESEARCH_DATA.rdc.mission,
        objectives: body.rdc?.objectives || DEFAULT_RESEARCH_DATA.rdc.objectives,
        initiatives: body.rdc?.initiatives || DEFAULT_RESEARCH_DATA.rdc.initiatives,
        commitment: body.rdc?.commitment || DEFAULT_RESEARCH_DATA.rdc.commitment,
        rdcPolicyFileUrl: body.rdc?.rdcPolicyFileUrl || "/documents/DefaultFile_1.pdf",
        ...(body.rdc?.rdcPolicyAssetId ? { rdcPolicyFile: { _type: "file", asset: { _type: "reference", _ref: body.rdc.rdcPolicyAssetId } } } : {}),
        activityReports: (body.rdc?.activityReports || []).map((rep: any, idx: number) => ({
          _key: rep._key || `rdc_ar_${idx}_${Date.now()}`,
          year: rep.year || "",
          title: rep.title || "",
          fileUrl: rep.fileUrl || "/documents/DefaultFile_1.pdf",
          redirectUrl: rep.redirectUrl || "",
          ...(rep.assetId ? { file: { _type: "file", asset: { _type: "reference", _ref: rep.assetId } } } : {})
        }))
      },

      infrastructure: {
        description: body.infrastructure?.description || DEFAULT_RESEARCH_DATA.infrastructure.description,
        facilities: (body.infrastructure?.facilities || []).map((fac: any, idx: number) => ({
          _key: fac._key || `inf_${idx}_${Date.now()}`,
          title: fac.title || "",
          description: fac.description || ""
        }))
      },

      scholarlyContributions: {
        description: body.scholarlyContributions?.description || DEFAULT_RESEARCH_DATA.scholarlyContributions.description,
        publications: (body.scholarlyContributions?.publications || []).map((pub: any, idx: number) => ({
          _key: pub._key || `pub_${idx}_${Date.now()}`,
          year: pub.year || "",
          facultyFileUrl: pub.facultyFileUrl || "/documents/DefaultFile_1.pdf",
          studentFileUrl: pub.studentFileUrl || "/documents/DefaultFile_1.pdf",
          redirectUrl: pub.redirectUrl || "",
          ...(pub.facultyAssetId ? { facultyFile: { _type: "file", asset: { _type: "reference", _ref: pub.facultyAssetId } } } : {}),
          ...(pub.studentAssetId ? { studentFile: { _type: "file", asset: { _type: "reference", _ref: pub.studentAssetId } } } : {})
        })),
        paperPresentations: (body.scholarlyContributions?.paperPresentations || []).map((pres: any, idx: number) => ({
          _key: pres._key || `pres_${idx}_${Date.now()}`,
          year: pres.year || "",
          facultyFileUrl: pres.facultyFileUrl || "/documents/DefaultFile_1.pdf",
          studentFileUrl: pres.studentFileUrl || "/documents/DefaultFile_1.pdf",
          redirectUrl: pres.redirectUrl || "",
          ...(pres.facultyAssetId ? { facultyFile: { _type: "file", asset: { _type: "reference", _ref: pres.facultyAssetId } } } : {}),
          ...(pres.studentAssetId ? { studentFile: { _type: "file", asset: { _type: "reference", _ref: pres.studentAssetId } } } : {})
        })),
        booksAndChapters: (body.scholarlyContributions?.booksAndChapters || []).map((book: any, idx: number) => ({
          _key: book._key || `book_${idx}_${Date.now()}`,
          year: book.year || "",
          title: book.title || "",
          fileUrl: book.fileUrl || "/documents/DefaultFile_1.pdf",
          redirectUrl: book.redirectUrl || "",
          ...(book.assetId ? { file: { _type: "file", asset: { _type: "reference", _ref: book.assetId } } } : {})
        }))
      },

      patentsAndInnovations: {
        description: body.patentsAndInnovations?.description || DEFAULT_RESEARCH_DATA.patentsAndInnovations.description,
        initiatives: body.patentsAndInnovations?.initiatives || DEFAULT_RESEARCH_DATA.patentsAndInnovations.initiatives,
        activitiesMatrix: (body.patentsAndInnovations?.activitiesMatrix || []).map((act: any, idx: number) => ({
          _key: act._key || `act_${idx}_${Date.now()}`,
          year: act.year || "",
          innovationFileUrl: act.innovationFileUrl || "/documents/DefaultFile_1.pdf",
          startupFileUrl: act.startupFileUrl || "/documents/DefaultFile_1.pdf",
          patentIprFileUrl: act.patentIprFileUrl || "/documents/DefaultFile_1.pdf",
          ...(act.innovationAssetId ? { innovationFile: { _type: "file", asset: { _type: "reference", _ref: act.innovationAssetId } } } : {}),
          ...(act.startupAssetId ? { startupFile: { _type: "file", asset: { _type: "reference", _ref: act.startupAssetId } } } : {}),
          ...(act.patentIprAssetId ? { patentIprFile: { _type: "file", asset: { _type: "reference", _ref: act.patentIprAssetId } } } : {})
        }))
      },

      iprCell: {
        title: body.iprCell?.title || DEFAULT_RESEARCH_DATA.iprCell.title,
        constitutedDate: body.iprCell?.constitutedDate || DEFAULT_RESEARCH_DATA.iprCell.constitutedDate,
        description: body.iprCell?.description || DEFAULT_RESEARCH_DATA.iprCell.description,
        objectives: body.iprCell?.objectives || DEFAULT_RESEARCH_DATA.iprCell.objectives,
        majorActivities: body.iprCell?.majorActivities || DEFAULT_RESEARCH_DATA.iprCell.majorActivities,
        expectedOutcomes: body.iprCell?.expectedOutcomes || DEFAULT_RESEARCH_DATA.iprCell.expectedOutcomes,
        policyDescription: body.iprCell?.policyDescription || DEFAULT_RESEARCH_DATA.iprCell.policyDescription,
        policyFileUrl: body.iprCell?.policyFileUrl || "/documents/DefaultFile_1.pdf",
        ...(body.iprCell?.policyAssetId ? { policyFile: { _type: "file", asset: { _type: "reference", _ref: body.iprCell.policyAssetId } } } : {}),
        activityReports: (body.iprCell?.activityReports || []).map((rep: any, idx: number) => ({
          _key: rep._key || `ipr_ar_${idx}_${Date.now()}`,
          year: rep.year || "",
          title: rep.title || "",
          fileUrl: rep.fileUrl || "/documents/DefaultFile_1.pdf",
          redirectUrl: rep.redirectUrl || "",
          ...(rep.assetId ? { file: { _type: "file", asset: { _type: "reference", _ref: rep.assetId } } } : {})
        }))
      },

      entrepreneurshipCentre: {
        title: body.entrepreneurshipCentre?.title || DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.title,
        description: body.entrepreneurshipCentre?.description || DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.description,
        vision: body.entrepreneurshipCentre?.vision || DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.vision,
        objectives: body.entrepreneurshipCentre?.objectives || DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.objectives,
        majorActivities: body.entrepreneurshipCentre?.majorActivities || DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.majorActivities,
        industryEngagement: body.entrepreneurshipCentre?.industryEngagement || DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.industryEngagement,
        womenEntrepreneurship: body.entrepreneurshipCentre?.womenEntrepreneurship || DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.womenEntrepreneurship,
        expectedOutcomes: body.entrepreneurshipCentre?.expectedOutcomes || DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.expectedOutcomes,
        policyDescription: body.entrepreneurshipCentre?.policyDescription || DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.policyDescription,
        policyFileUrl: body.entrepreneurshipCentre?.policyFileUrl || "/documents/DefaultFile_1.pdf",
        ...(body.entrepreneurshipCentre?.policyAssetId ? { policyFile: { _type: "file", asset: { _type: "reference", _ref: body.entrepreneurshipCentre.policyAssetId } } } : {}),
        activityReports: (body.entrepreneurshipCentre?.activityReports || []).map((rep: any, idx: number) => ({
          _key: rep._key || `ed_ar_${idx}_${Date.now()}`,
          year: rep.year || "",
          title: rep.title || "",
          fileUrl: rep.fileUrl || "/documents/DefaultFile_1.pdf",
          redirectUrl: rep.redirectUrl || "",
          ...(rep.assetId ? { file: { _type: "file", asset: { _type: "reference", _ref: rep.assetId } } } : {})
        }))
      },

      iicCell: {
        title: body.iicCell?.title || DEFAULT_RESEARCH_DATA.iicCell.title,
        description: body.iicCell?.description || DEFAULT_RESEARCH_DATA.iicCell.description,
        objectives: body.iicCell?.objectives || DEFAULT_RESEARCH_DATA.iicCell.objectives,
        keyActivities: body.iicCell?.keyActivities || DEFAULT_RESEARCH_DATA.iicCell.keyActivities,
        expectedOutcomes: body.iicCell?.expectedOutcomes || DEFAULT_RESEARCH_DATA.iicCell.expectedOutcomes,
        micLink: body.iicCell?.micLink || DEFAULT_RESEARCH_DATA.iicCell.micLink,
        policyDescription: body.iicCell?.policyDescription || DEFAULT_RESEARCH_DATA.iicCell.policyDescription,
        policyFileUrl: body.iicCell?.policyFileUrl || "/documents/DefaultFile_1.pdf",
        ...(body.iicCell?.policyAssetId ? { policyFile: { _type: "file", asset: { _type: "reference", _ref: body.iicCell.policyAssetId } } } : {}),
        activityReports: (body.iicCell?.activityReports || []).map((rep: any, idx: number) => ({
          _key: rep._key || `iic_ar_${idx}_${Date.now()}`,
          year: rep.year || "",
          title: rep.title || "",
          fileUrl: rep.fileUrl || "/documents/DefaultFile_1.pdf",
          redirectUrl: rep.redirectUrl || "",
          ...(rep.assetId ? { file: { _type: "file", asset: { _type: "reference", _ref: rep.assetId } } } : {})
        }))
      }
    };

    const result = await client.createOrReplace(doc);

    return NextResponse.json({
      success: true,
      message: "Research & Innovation data saved successfully",
      documentId: result._id,
      data: doc,
    });
  } catch (err: any) {
    console.error("Admin API Error saving Research data:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to save research data" },
      { status: 500 }
    );
  }
}
