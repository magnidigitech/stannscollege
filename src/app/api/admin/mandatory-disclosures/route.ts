import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import { DEFAULT_MANDATORY_DISCLOSURES } from "@/lib/sanity";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const MANDATORY_DOC_ID = "mandatory-disclosures-singleton";

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
 * GET /api/admin/mandatory-disclosures
 * Returns all current mandatory disclosure records, tables, and documents
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
    const query = `*[_type == "mandatoryDisclosures" && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      lastUpdated,
      verifiedBy,
      mandatoryDisclosureDocs[] {
        _key,
        sNo,
        title,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      institutionalProfile {
        title,
        subtitle,
        description,
        programmesBtnLabel,
        programmesLink,
        sanctionedOrderBtnLabel,
        "sanctionedOrderFileUrl": coalesce(sanctionedOrderFile.asset->url, sanctionedOrderFileUrl),
        "sanctionedOrderAssetId": sanctionedOrderFile.asset->_id
      },
      aicteApprovals[] {
        _key,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      ugcDocuments[] {
        _key,
        sNo,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      cceOrders[] {
        _key,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      apscheOrders[] {
        _key,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      anuAffiliations[] {
        _key,
        programmeType,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      aisheReports[] {
        _key,
        sNo,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      nirfSubmissions[] {
        _key,
        year,
        collegeDataUrl,
        collegeRedirectUrl,
        managementDataUrl,
        managementRedirectUrl,
        overallDataUrl,
        overallRedirectUrl
      },
      regulatoryComplianceDocs[] {
        _key,
        code,
        title,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      financialDocuments[] {
        _key,
        sNo,
        code,
        title,
        description,
        redirectUrl,
        btnLabel,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id,
        secondBtnLabel,
        "secondFileUrl": coalesce(secondFile.asset->url, secondFileUrl),
        "secondAssetId": secondFile.asset->_id
      },
      annualReports[] {
        _key,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      disclosureArchives[] {
        _key,
        year,
        mandatoryDisclosuresUrl,
        complianceDocumentsUrl,
        annualReportUrl,
        statutoryReportsUrl,
        policiesUrl
      },
      rtiMembers[] {
        _key,
        sNo,
        name,
        designation,
        role,
        mobile
      },
      rtiDocuments[] {
        _key,
        title,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      studentWelfareCards[] {
        _key,
        title,
        href,
        description,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      governanceCards[] {
        _key,
        title,
        href,
        description,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      dataStatsCards[] {
        _key,
        title,
        href,
        description,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      }
    }`;

    const data = await client.fetch(query);
    if (data) {
      return NextResponse.json({
        success: true,
        data: {
          ...DEFAULT_MANDATORY_DISCLOSURES,
          ...data,
          mandatoryDisclosureDocs: data.mandatoryDisclosureDocs?.length ? data.mandatoryDisclosureDocs : DEFAULT_MANDATORY_DISCLOSURES.mandatoryDisclosureDocs,
          institutionalProfile: data.institutionalProfile || DEFAULT_MANDATORY_DISCLOSURES.institutionalProfile,
          aicteApprovals: data.aicteApprovals?.length ? data.aicteApprovals : DEFAULT_MANDATORY_DISCLOSURES.aicteApprovals,
          ugcDocuments: data.ugcDocuments?.length ? data.ugcDocuments : DEFAULT_MANDATORY_DISCLOSURES.ugcDocuments,
          cceOrders: data.cceOrders?.length ? data.cceOrders : DEFAULT_MANDATORY_DISCLOSURES.cceOrders,
          apscheOrders: data.apscheOrders?.length ? data.apscheOrders : DEFAULT_MANDATORY_DISCLOSURES.apscheOrders,
          anuAffiliations: data.anuAffiliations?.length ? data.anuAffiliations : DEFAULT_MANDATORY_DISCLOSURES.anuAffiliations,
          aisheReports: data.aisheReports?.length ? data.aisheReports : DEFAULT_MANDATORY_DISCLOSURES.aisheReports,
          nirfSubmissions: data.nirfSubmissions?.length ? data.nirfSubmissions : DEFAULT_MANDATORY_DISCLOSURES.nirfSubmissions,
          regulatoryComplianceDocs: data.regulatoryComplianceDocs?.length ? data.regulatoryComplianceDocs : DEFAULT_MANDATORY_DISCLOSURES.regulatoryComplianceDocs,
          financialDocuments: data.financialDocuments?.length ? data.financialDocuments : DEFAULT_MANDATORY_DISCLOSURES.financialDocuments,
          annualReports: data.annualReports?.length ? data.annualReports : DEFAULT_MANDATORY_DISCLOSURES.annualReports,
          disclosureArchives: data.disclosureArchives?.length ? data.disclosureArchives : DEFAULT_MANDATORY_DISCLOSURES.disclosureArchives,
          rtiMembers: data.rtiMembers?.length ? data.rtiMembers : DEFAULT_MANDATORY_DISCLOSURES.rtiMembers,
          rtiDocuments: data.rtiDocuments?.length ? data.rtiDocuments : DEFAULT_MANDATORY_DISCLOSURES.rtiDocuments,
          studentWelfareCards: data.studentWelfareCards?.length ? data.studentWelfareCards : (DEFAULT_MANDATORY_DISCLOSURES as any).studentWelfareCards,
          governanceCards: data.governanceCards?.length ? data.governanceCards : (DEFAULT_MANDATORY_DISCLOSURES as any).governanceCards,
          dataStatsCards: data.dataStatsCards?.length ? data.dataStatsCards : (DEFAULT_MANDATORY_DISCLOSURES as any).dataStatsCards,
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: DEFAULT_MANDATORY_DISCLOSURES,
    });
  } catch (err: any) {
    console.error("Error fetching mandatory disclosures in admin API:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch from Sanity." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/mandatory-disclosures
 * Updates or creates the singleton mandatoryDisclosures document in Sanity
 */
export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Active admin session required." },
      { status: 401 }
    );
  }

  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { success: false, error: "SANITY_WRITE_TOKEN is not configured in server environment." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const client = getSanityClient();

    const cleanArrayWithFile = (arr: any[]) => {
      if (!Array.isArray(arr)) return [];
      return arr.map((item, idx) => {
        const cleaned: any = {
          ...item,
          _key: item._key || `key_${Date.now()}_${idx}`,
        };
        if (item.assetId) {
          cleaned.file = {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: item.assetId,
            }
          };
        }
        if (item.secondAssetId) {
          cleaned.secondFile = {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: item.secondAssetId,
            }
          };
        }
        delete cleaned.assetId;
        delete cleaned.secondAssetId;
        return cleaned;
      });
    };

    const docToSave = {
      _id: MANDATORY_DOC_ID,
      _type: "mandatoryDisclosures",
      title: body.title || "Mandatory Disclosures & Compliance",
      lastUpdated: body.lastUpdated || new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
      verifiedBy: body.verifiedBy || "Principal / IQAC Coordinator",
      mandatoryDisclosureDocs: cleanArrayWithFile(body.mandatoryDisclosureDocs),
      institutionalProfile: body.institutionalProfile ? {
        title: body.institutionalProfile.title || "2. Institutional Profile & Programme Details",
        subtitle: body.institutionalProfile.subtitle || "Academic programmes, duration, eligibility, and sanctioned intake",
        description: body.institutionalProfile.description || "",
        programmesBtnLabel: body.institutionalProfile.programmesBtnLabel || "View All Academic Programmes",
        programmesLink: body.institutionalProfile.programmesLink || "/courses",
        sanctionedOrderBtnLabel: body.institutionalProfile.sanctionedOrderBtnLabel || "Institutional Profile",
        sanctionedOrderFileUrl: body.institutionalProfile.sanctionedOrderFileUrl || "",
        buttonOrder: body.institutionalProfile.buttonOrder || "profileFirst",
        ...(body.institutionalProfile.sanctionedOrderAssetId ? {
          sanctionedOrderFile: {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: body.institutionalProfile.sanctionedOrderAssetId,
            }
          }
        } : {})
      } : DEFAULT_MANDATORY_DISCLOSURES.institutionalProfile,
      aicteApprovals: cleanArrayWithFile(body.aicteApprovals),
      ugcDocuments: cleanArrayWithFile(body.ugcDocuments),
      cceOrders: cleanArrayWithFile(body.cceOrders),
      apscheOrders: cleanArrayWithFile(body.apscheOrders),
      anuAffiliations: cleanArrayWithFile(body.anuAffiliations),
      aisheReports: cleanArrayWithFile(body.aisheReports),
      nirfSubmissions: Array.isArray(body.nirfSubmissions) ? body.nirfSubmissions.map((d: any, idx: number) => ({
        _key: d._key || `nirf_${Date.now()}_${idx}`,
        year: d.year || "",
        collegeDataUrl: d.collegeDataUrl || "",
        collegeRedirectUrl: d.collegeRedirectUrl || "",
        managementDataUrl: d.managementDataUrl || "",
        managementRedirectUrl: d.managementRedirectUrl || "",
        overallDataUrl: d.overallDataUrl || "",
        overallRedirectUrl: d.overallRedirectUrl || "",
      })) : [],
      regulatoryComplianceDocs: cleanArrayWithFile(body.regulatoryComplianceDocs),
      financialDocuments: cleanArrayWithFile(body.financialDocuments),
      annualReports: cleanArrayWithFile(body.annualReports),
      disclosureArchives: Array.isArray(body.disclosureArchives) ? body.disclosureArchives.map((d: any, idx: number) => ({
        _key: d._key || `arc_${Date.now()}_${idx}`,
        year: d.year || "",
        mandatoryDisclosuresUrl: d.mandatoryDisclosuresUrl || "",
        complianceDocumentsUrl: d.complianceDocumentsUrl || "",
        annualReportUrl: d.annualReportUrl || "",
        statutoryReportsUrl: d.statutoryReportsUrl || "",
        policiesUrl: d.policiesUrl || "",
      })) : [],
      rtiMembers: Array.isArray(body.rtiMembers) ? body.rtiMembers.map((m: any, idx: number) => ({
        _key: m._key || `rti_${Date.now()}_${idx}`,
        sNo: Number(m.sNo) || idx + 1,
        name: m.name || "",
        designation: m.designation || "",
        role: m.role || "",
        mobile: m.mobile || "",
      })) : [],
      rtiDocuments: cleanArrayWithFile(body.rtiDocuments),
      studentWelfareCards: cleanArrayWithFile(body.studentWelfareCards),
      governanceCards: cleanArrayWithFile(body.governanceCards),
      dataStatsCards: cleanArrayWithFile(body.dataStatsCards),
    };

    const result = await client.createOrReplace(docToSave);

    return NextResponse.json({
      success: true,
      message: "Mandatory Disclosures updated successfully in Sanity!",
      documentId: result._id,
    });
  } catch (err: any) {
    console.error("Error updating mandatory disclosures in admin API:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save records in Sanity." },
      { status: 500 }
    );
  }
}
