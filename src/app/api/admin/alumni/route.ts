import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import { DEFAULT_ALUMNI_DATA } from "@/lib/sanity";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const ALUMNI_DOC_ID = "alumni-singleton";

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
 * GET /api/admin/alumni
 * Returns all current alumni records, tables, reports, and testimonials
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
    const query = `*[_type == "alumniPage" && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      lastUpdated,
      registrationFormUrl,
      feedbackFormUrl,
      googleFormUrl,
      registrationDetails,
      committeeMembers[] {
        _key,
        sNo,
        name,
        designation,
        role
      },
      committeeReports[] {
        _key,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      associationOfficeBearers[] {
        _key,
        sNo,
        name,
        designation,
        occupation
      },
      statutoryDocuments[] {
        _key,
        sNo,
        documentTitle,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      contributionsRegister[] {
        _key,
        sNo,
        date,
        alumniName,
        programmeBatch,
        activity,
        natureOfSupport,
        beneficiaries,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      prideAlumni[] {
        _key,
        name,
        programmeBatch,
        designation,
        organization,
        achievement,
        featured,
        redirectUrl,
        "photoUrl": coalesce(photo.asset->url, photoUrl),
        "photoAssetId": photo.asset->_id
      },
      testimonials[] {
        _key,
        title,
        quote,
        alumnaName,
        programmeBatch
      },
      events[] {
        _key,
        title,
        category,
        status,
        academicYear,
        date,
        time,
        venue,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      },
      galleryCategories[] {
        _key,
        title,
        description,
        count
      },
      videos[] {
        _key,
        title,
        category,
        videoType,
        youtubeUrl,
        "videoFileUrl": coalesce(videoFile.asset->url, videoFileUrl),
        "assetId": videoFile.asset->_id,
        speakerName,
        programmeBatch,
        designation,
        description,
        date
      },
      contactInfo
    }`;

    const data = await client.fetch(query);
    if (data) {
      return NextResponse.json({
        success: true,
        data: {
          ...DEFAULT_ALUMNI_DATA,
          ...data,
          registrationFormUrl: data.registrationFormUrl || DEFAULT_ALUMNI_DATA.registrationFormUrl,
          feedbackFormUrl: data.feedbackFormUrl || DEFAULT_ALUMNI_DATA.feedbackFormUrl,
          googleFormUrl: data.googleFormUrl || DEFAULT_ALUMNI_DATA.googleFormUrl,
          registrationDetails: {
            ...DEFAULT_ALUMNI_DATA.registrationDetails,
            ...(data.registrationDetails || {}),
          },
          contactInfo: {
            ...DEFAULT_ALUMNI_DATA.contactInfo,
            ...(data.contactInfo || {}),
          },
          committeeMembers: data.committeeMembers?.length ? data.committeeMembers : DEFAULT_ALUMNI_DATA.committeeMembers,
          committeeReports: data.committeeReports?.length ? data.committeeReports : DEFAULT_ALUMNI_DATA.committeeReports,
          associationOfficeBearers: data.associationOfficeBearers?.length ? data.associationOfficeBearers : DEFAULT_ALUMNI_DATA.associationOfficeBearers,
          statutoryDocuments: data.statutoryDocuments?.length ? data.statutoryDocuments : DEFAULT_ALUMNI_DATA.statutoryDocuments,
          contributionsRegister: data.contributionsRegister?.length ? data.contributionsRegister : DEFAULT_ALUMNI_DATA.contributionsRegister,
          prideAlumni: data.prideAlumni?.length ? data.prideAlumni : DEFAULT_ALUMNI_DATA.prideAlumni,
          testimonials: data.testimonials?.length ? data.testimonials : DEFAULT_ALUMNI_DATA.testimonials,
          events: data.events?.length ? data.events : DEFAULT_ALUMNI_DATA.events,
          galleryCategories: data.galleryCategories?.length ? data.galleryCategories : DEFAULT_ALUMNI_DATA.galleryCategories,
          videos: data.videos?.length ? data.videos : DEFAULT_ALUMNI_DATA.videos,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: DEFAULT_ALUMNI_DATA,
    });
  } catch (err: any) {
    console.error("Error fetching alumni in admin API:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch from Sanity." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/alumni
 * Updates or creates the singleton alumniPage document in Sanity
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
            },
          };
        }
        delete cleaned.assetId;
        return cleaned;
      });
    };

    const cleanVideosArray = (arr: any[]) => {
      if (!Array.isArray(arr)) return [];
      return arr.map((item, idx) => {
        const cleaned: any = {
          _key: item._key || `vid_${Date.now()}_${idx}`,
          title: item.title || "",
          category: item.category || "General",
          videoType: item.videoType || "youtube",
          youtubeUrl: item.youtubeUrl || "",
          videoFileUrl: item.videoFileUrl || "",
          speakerName: item.speakerName || "",
          programmeBatch: item.programmeBatch || "",
          designation: item.designation || "",
          description: item.description || "",
          date: item.date || "",
        };
        if (item.assetId) {
          cleaned.videoFile = {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: item.assetId,
            },
          };
        }
        return cleaned;
      });
    };

    const docToSave = {
      _id: ALUMNI_DOC_ID,
      _type: "alumniPage",
      title: body.title || "Alumni Engagement & Network",
      lastUpdated: body.lastUpdated || new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
      registrationFormUrl: body.registrationFormUrl || DEFAULT_ALUMNI_DATA.registrationFormUrl,
      feedbackFormUrl: body.feedbackFormUrl || DEFAULT_ALUMNI_DATA.feedbackFormUrl,
      googleFormUrl: body.feedbackFormUrl || body.googleFormUrl || DEFAULT_ALUMNI_DATA.googleFormUrl,
      registrationDetails: body.registrationDetails || DEFAULT_ALUMNI_DATA.registrationDetails,
      committeeMembers: Array.isArray(body.committeeMembers) ? body.committeeMembers.map((m: any, idx: number) => ({
        _key: m._key || `cm_${Date.now()}_${idx}`,
        sNo: Number(m.sNo) || idx + 1,
        name: m.name || "",
        designation: m.designation || "",
        role: m.role || "Member",
      })) : [],
      committeeReports: cleanArrayWithFile(body.committeeReports),
      associationOfficeBearers: Array.isArray(body.associationOfficeBearers) ? body.associationOfficeBearers.map((b: any, idx: number) => ({
        _key: b._key || `ob_${Date.now()}_${idx}`,
        sNo: Number(b.sNo) || idx + 1,
        name: b.name || "",
        designation: b.designation || "",
        occupation: b.occupation || "",
      })) : [],
      statutoryDocuments: cleanArrayWithFile(body.statutoryDocuments),
      contributionsRegister: cleanArrayWithFile(body.contributionsRegister),
      prideAlumni: Array.isArray(body.prideAlumni) ? body.prideAlumni.map((p: any, idx: number) => {
        const item: any = {
          _key: p._key || `pride_${Date.now()}_${idx}`,
          name: p.name || "",
          programmeBatch: p.programmeBatch || "",
          designation: p.designation || "",
          organization: p.organization || "",
          achievement: p.achievement || "",
          featured: p.featured !== undefined ? !!p.featured : true,
          redirectUrl: p.redirectUrl || "",
          photoUrl: p.photoUrl || "",
        };
        if (p.photoAssetId) {
          item.photo = {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: p.photoAssetId,
            }
          };
        }
        return item;
      }) : [],
      testimonials: Array.isArray(body.testimonials) ? body.testimonials.map((t: any, idx: number) => ({
        _key: t._key || `test_${Date.now()}_${idx}`,
        title: t.title || "",
        quote: t.quote || "",
        alumnaName: t.alumnaName || "",
        programmeBatch: t.programmeBatch || "",
      })) : [],
      events: cleanArrayWithFile(body.events),
      galleryCategories: Array.isArray(body.galleryCategories) ? body.galleryCategories.map((g: any, idx: number) => ({
        _key: g._key || `gal_${Date.now()}_${idx}`,
        title: g.title || "",
        description: g.description || "",
        count: g.count || "Gallery Active",
      })) : [],
      videos: cleanVideosArray(body.videos),
      contactInfo: body.contactInfo ? { ...DEFAULT_ALUMNI_DATA.contactInfo, ...body.contactInfo } : DEFAULT_ALUMNI_DATA.contactInfo,
    };

    const result = await client.createOrReplace(docToSave);

    return NextResponse.json({
      success: true,
      message: "Alumni records and documents updated successfully in Sanity!",
      documentId: result._id,
    });
  } catch (err: any) {
    console.error("Error updating alumni in admin API:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save records in Sanity." },
      { status: 500 }
    );
  }
}
