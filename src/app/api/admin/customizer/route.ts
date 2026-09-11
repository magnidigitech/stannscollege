import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import {
  INITIAL_PAGES_CONFIG,
  INITIAL_CUSTOMIZATION_DATA,
  SiteCustomizationData,
} from "@/lib/customizer-schema";
import { verifyAdminSessionToken } from "@/lib/admin-auth";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const DOCUMENT_ID = "siteCustomization";

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

/**
 * Merges saved custom pages with default pages so newly added sections or fields are never undefined.
 */
function mergeWithDefaults(savedPages: any): Record<string, any> {
  const result: Record<string, any> = JSON.parse(JSON.stringify(INITIAL_PAGES_CONFIG));
  if (!savedPages || typeof savedPages !== "object") return result;

  for (const pageKey of Object.keys(result)) {
    if (savedPages[pageKey] && savedPages[pageKey].sections) {
      const savedPage = savedPages[pageKey];
      const defaultPage = result[pageKey];

      // Map saved sections by ID
      const savedSectionMap = new Map<string, any>();
      for (const sec of savedPage.sections || []) {
        if (sec.id) savedSectionMap.set(sec.id, sec);
      }

      // Aliases for backwards compatibility with earlier draft saves
      const ALIASES: Record<string, string[]> = {
        "why-choose": ["academic-programs"],
        "campus-facilities": ["campus-life"],
        "mandates-compliance": ["bottom-actions"],
      };

      // Merge saved section values over defaults
      defaultPage.sections = defaultPage.sections.map((defaultSec: any) => {
        let savedSec = savedSectionMap.get(defaultSec.id);
        if (!savedSec && ALIASES[defaultSec.id]) {
          for (const alias of ALIASES[defaultSec.id]) {
            if (savedSectionMap.has(alias)) {
              savedSec = savedSectionMap.get(alias);
              break;
            }
          }
        }
        const mergedColors = {
          ...defaultSec.colors,
          ...(savedSec.colors || {}),
        };
        // Normalize specific aliases so legacy or dual fields stay in sync
        if (defaultSec.id === "main-logo-bar" && savedSec.colors?.logoBarColor) {
          if (!savedSec.colors.bgColor || savedSec.colors.bgColor === "#ffffff") {
            mergedColors.bgColor = savedSec.colors.logoBarColor;
          }
        }
        if (defaultSec.id === "announcement-ticker" && savedSec.colors?.announcementBg) {
          if (!savedSec.colors.bgColor || savedSec.colors.bgColor === "#ffffff") {
            mergedColors.bgColor = savedSec.colors.announcementBg;
          }
        }
        if (defaultSec.id === "main-navigation" && savedSec.colors?.topNavColor) {
          if (!savedSec.colors.bgColor || savedSec.colors.bgColor === "#ffffff") {
            mergedColors.bgColor = savedSec.colors.topNavColor;
          }
        }
        const mergedLayout = {
          ...defaultSec.layout,
          ...(savedSec.layout || {}),
        };
        // Ensure topnav font size is at least 18px and topnavPaddingY is compact
        if (defaultSec.id === "main-navigation") {
          if (!mergedLayout.topnavFontSize || mergedLayout.topnavFontSize < 18) {
            mergedLayout.topnavFontSize = 18;
          }
          mergedLayout.topnavPaddingY = 4;
        }
        return {
          ...defaultSec,
          colors: mergedColors,
          layout: mergedLayout,
        };
      });
    }
  }

  return result;
}

/**
 * GET /api/admin/customizer
 * Returns active customization data from Sanity, falling back to default configuration.
 */
export async function GET() {
  try {
    const client = getSanityClient();
    const doc = await client.fetch(
      `*[_id == $id][0]{
        _id,
        version,
        lastUpdated,
        updatedBy,
        pages
      }`,
      { id: DOCUMENT_ID }
    );

    if (!doc || !doc.pages) {
      return NextResponse.json({
        success: true,
        data: INITIAL_CUSTOMIZATION_DATA,
        isDefault: true,
      });
    }

    const mergedPages = mergeWithDefaults(doc.pages);

    const fullData: SiteCustomizationData = {
      version: doc.version || 1,
      lastUpdated: doc.lastUpdated || new Date().toISOString(),
      updatedBy: doc.updatedBy || "admin",
      pages: mergedPages,
    };

    return NextResponse.json({
      success: true,
      data: fullData,
      isDefault: false,
    });
  } catch (error: any) {
    console.warn("Could not read siteCustomization from Sanity, using defaults:", error.message);
    return NextResponse.json({
      success: true,
      data: INITIAL_CUSTOMIZATION_DATA,
      isDefault: true,
    });
  }
}

/**
 * POST /api/admin/customizer
 * Requires authenticated admin session. Saves updated pages configuration to Sanity.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify admin session
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = verifyAdminSessionToken(token || "");

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please log in to save changes." },
        { status: 401 }
      );
    }

    // 2. Parse payload
    const body = await req.json();
    const { pages } = body;

    if (!pages || typeof pages !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload: 'pages' object is required." },
        { status: 400 }
      );
    }

    // 3. Write to Sanity
    const client = getSanityClient();
    const docToSave = {
      _id: DOCUMENT_ID,
      _type: "siteCustomization",
      version: (body.version || 1) + 1,
      lastUpdated: new Date().toISOString(),
      updatedBy: session.email,
      pages,
    };

    await client.createOrReplace(docToSave);

    return NextResponse.json({
      success: true,
      message: "Customization saved successfully to Sanity!",
      lastUpdated: docToSave.lastUpdated,
      version: docToSave.version,
    });
  } catch (error: any) {
    console.error("Error saving customization to Sanity:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save customization" },
      { status: 500 }
    );
  }
}
