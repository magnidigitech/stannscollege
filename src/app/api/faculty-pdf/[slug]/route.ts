import { NextRequest } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { FACULTY_DATA } from "@/components/faculty/staticData";
import { getFacultyProfile } from "@/lib/sanity";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const decodedSlug = decodeURIComponent(slug || "").replace(/\.pdf$/i, "");
    const searchParams = request.nextUrl.searchParams;

    // Retrieve query parameters or fallback to static data lookup
    let name = searchParams.get("name") || "";
    let designation = searchParams.get("designation") || "";
    let department = searchParams.get("department") || "";
    let qualification = searchParams.get("qualification") || "";
    let dateOfJoining = searchParams.get("doj") || "";
    let experience = searchParams.get("exp") || "";
    let employeeId = searchParams.get("empId") || "";
    let photoUrl = searchParams.get("photo") || "";
    const isDownload = searchParams.get("dl") === "1" || searchParams.get("download") === "1";

    // Try finding in static teachingFaculty if missing info
    const staticMember = FACULTY_DATA.teachingFaculty.find(
      (m) =>
        (m.slug && m.slug.toLowerCase() === decodedSlug.toLowerCase()) ||
        (m.employeeId && m.employeeId.toLowerCase() === decodedSlug.toLowerCase()) ||
        m.name.toLowerCase().includes(decodedSlug.toLowerCase()) ||
        decodedSlug.toLowerCase().includes(m.name.toLowerCase().replace(/[^a-z0-9]/g, "-"))
    );

    if (staticMember) {
      if (!name) name = staticMember.name;
      if (!designation) designation = staticMember.designation;
      if (!department) department = staticMember.department || "";
      if (!qualification) qualification = staticMember.qualification || "";
      if (!dateOfJoining) dateOfJoining = staticMember.dateOfJoining || "";
      if (!experience) experience = staticMember.experience || "";
      if (!employeeId) employeeId = staticMember.employeeId || "";
      if (!photoUrl && staticMember.imageUrl) photoUrl = staticMember.imageUrl;
    }

    // Try fetching full profile from Sanity if available
    let sanityProfile: any = null;
    if (decodedSlug && decodedSlug !== "default") {
      try {
        sanityProfile = await getFacultyProfile(decodedSlug);
      } catch {}
    }

    if (sanityProfile) {
      if (sanityProfile.facultyName) name = sanityProfile.facultyName;
      if (sanityProfile.designation) designation = sanityProfile.designation;
      if (sanityProfile.department) department = sanityProfile.department;
      if (sanityProfile.highestQualification) qualification = sanityProfile.highestQualification;
      if (sanityProfile.dateOfJoining) dateOfJoining = sanityProfile.dateOfJoining;
      if (sanityProfile.teachingExperience || sanityProfile.totalExperience) {
        experience = sanityProfile.teachingExperience || sanityProfile.totalExperience;
      }
      if (sanityProfile.facultyId) employeeId = sanityProfile.facultyId;
      if (!photoUrl && sanityProfile.profilePhotoUrl) photoUrl = sanityProfile.profilePhotoUrl;
    }

    // Default fallbacks
    if (!name) name = "Faculty Member";
    if (!designation) designation = "Teaching Faculty";
    if (!department) department = "Academic Department";
    if (!qualification) qualification = "Postgraduate / Doctoral Degree";
    if (!dateOfJoining) dateOfJoining = "—";
    if (!experience) experience = "—";
    if (!employeeId) employeeId = "—";

    // Clean experience format
    if (experience && !experience.toLowerCase().includes("yr") && experience !== "—") {
      experience = `${experience} Years`;
    }

    // Create PDF document using pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size: 595.28 x 841.89 pt
    const { width, height } = page.getSize();

    // Fonts
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Color Palette
    const navy = rgb(0 / 255, 33 / 255, 71 / 255);          // #002147
    const gold = rgb(245 / 255, 158 / 255, 11 / 255);        // #F59E0B
    const lightBg = rgb(248 / 255, 250 / 255, 252 / 255);    // #F8FAFC
    const cardBorder = rgb(226 / 255, 232 / 255, 240 / 255); // #E2E8F0
    const textDark = rgb(15 / 255, 23 / 255, 42 / 255);      // #0F172A
    const textMuted = rgb(100 / 255, 116 / 255, 139 / 255);  // #64748B
    const textWhite = rgb(1, 1, 1);

    // Fetch and embed photo if available, or fallback to college crest
    let embeddedPhoto: any = null;
    let isCrestFallback = false;
    
    if (photoUrl) {
      try {
        let imgBuffer: Buffer | null = null;
        if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
          const res = await fetch(photoUrl);
          if (res.ok) {
            const arrayBuf = await res.arrayBuffer();
            imgBuffer = Buffer.from(arrayBuf);
          }
        } else {
          const cleanLocal = photoUrl.replace(/^\/+/, "");
          const localPath = path.join(process.cwd(), "public", cleanLocal);
          if (fs.existsSync(localPath) && fs.statSync(localPath).isFile()) {
            imgBuffer = fs.readFileSync(localPath);
          }
        }

        if (imgBuffer) {
          try {
            embeddedPhoto = await pdfDoc.embedJpg(imgBuffer);
          } catch {
            try {
              embeddedPhoto = await pdfDoc.embedPng(imgBuffer);
            } catch (e) {
              console.warn("Could not embed image format:", e);
            }
          }
        }
      } catch (e) {
        console.warn("Failed to fetch faculty photo for PDF:", e);
      }
    }

    // If no photo or photo loading failed, embed College Crest
    if (!embeddedPhoto) {
      try {
        const crestPath = path.join(process.cwd(), "public", "images", "Crest_Logo.png");
        if (fs.existsSync(crestPath)) {
          const crestBuffer = fs.readFileSync(crestPath);
          embeddedPhoto = await pdfDoc.embedPng(crestBuffer);
          isCrestFallback = true;
        }
      } catch (e) {
        console.warn("Could not embed Crest logo:", e);
      }
    }

    // 1. Header Banner
    const headerHeight = 110;
    page.drawRectangle({
      x: 0,
      y: height - headerHeight,
      width,
      height: headerHeight,
      color: navy,
    });

    // Gold Accent Stripe
    page.drawRectangle({
      x: 0,
      y: height - headerHeight - 4,
      width,
      height: 4,
      color: gold,
    });

    // Header Content
    const collegeTitle = "ST. ANN'S COLLEGE FOR WOMEN";
    const collegeTitleWidth = fontBold.widthOfTextAtSize(collegeTitle, 19);
    page.drawText(collegeTitle, {
      x: (width - collegeTitleWidth) / 2,
      y: height - 34,
      size: 19,
      font: fontBold,
      color: textWhite,
    });

    const sub1 = "Run by The Society of St. Anne, Guntur | Affiliated to Acharya Nagarjuna University";
    const sub1Width = fontRegular.widthOfTextAtSize(sub1, 9.5);
    page.drawText(sub1, {
      x: (width - sub1Width) / 2,
      y: height - 52,
      size: 9.5,
      font: fontRegular,
      color: rgb(219 / 255, 234 / 255, 254 / 255),
    });

    const sub2 = "Recognized under Section 2(f) of UGC Act 1956 | NAAC Accredited 'A' Grade | AISHE: C-39493";
    const sub2Width = fontRegular.widthOfTextAtSize(sub2, 9);
    page.drawText(sub2, {
      x: (width - sub2Width) / 2,
      y: height - 68,
      size: 9,
      font: fontRegular,
      color: rgb(219 / 255, 234 / 255, 254 / 255),
    });

    const sub3 = "Gorantla, Guntur - 522034, Andhra Pradesh, India";
    const sub3Width = fontRegular.widthOfTextAtSize(sub3, 8.5);
    page.drawText(sub3, {
      x: (width - sub3Width) / 2,
      y: height - 84,
      size: 8.5,
      font: fontRegular,
      color: rgb(254 / 255, 240 / 255, 138 / 255),
    });

    // 2. Document Title Pill
    const pillY = height - headerHeight - 34;
    page.drawRectangle({
      x: 36,
      y: pillY - 4,
      width: width - 72,
      height: 28,
      color: rgb(238 / 255, 242 / 255, 255 / 255),
      borderColor: rgb(199 / 255, 210 / 255, 254 / 255),
      borderWidth: 1,
    });

    const docTitle = "OFFICIAL FACULTY PROFILE & ACADEMIC RECORD";
    const docTitleWidth = fontBold.widthOfTextAtSize(docTitle, 11);
    page.drawText(docTitle, {
      x: (width - docTitleWidth) / 2,
      y: pillY + 5,
      size: 11,
      font: fontBold,
      color: navy,
    });

    // 3. Main Profile Card
    const cardX = 36;
    const cardW = width - 72;
    const cardH = 142;
    const cardY = pillY - cardH - 18;

    page.drawRectangle({
      x: cardX,
      y: cardY,
      width: cardW,
      height: cardH,
      color: lightBg,
      borderColor: cardBorder,
      borderWidth: 1.5,
    });

    // Left Border Accent on Card
    page.drawRectangle({
      x: cardX,
      y: cardY,
      width: 5,
      height: cardH,
      color: navy,
    });

    // Faculty Details (Left side of card)
    const textLeft = cardX + 22;
    
    // Name
    page.drawText(name, {
      x: textLeft,
      y: cardY + cardH - 30,
      size: 16.5,
      font: fontBold,
      color: navy,
    });

    // Designation
    page.drawText(designation, {
      x: textLeft,
      y: cardY + cardH - 52,
      size: 12,
      font: fontBold,
      color: rgb(180 / 255, 83 / 255, 9 / 255), // Amber 700
    });

    // Department
    page.drawText(`Department of ${department.replace(/^\d+\.\s*/, "")}`, {
      x: textLeft,
      y: cardY + cardH - 72,
      size: 10.5,
      font: fontBold,
      color: textDark,
    });

    // Qualifications summary
    page.drawText(`Qualification: ${qualification}`, {
      x: textLeft,
      y: cardY + cardH - 92,
      size: 9.5,
      font: fontRegular,
      color: textMuted,
    });

    // Affiliation
    page.drawText("Affiliated to: Acharya Nagarjuna University, Guntur", {
      x: textLeft,
      y: cardY + 16,
      size: 9,
      font: fontRegular,
      color: textMuted,
    });

    // ── Photo & ID Badge (Right side of card) ───────────────────────────
    const photoBoxW = 75;
    const photoBoxH = 92;
    const photoBoxX = cardX + cardW - photoBoxW - 16;
    const photoBoxY = cardY + 38;

    if (embeddedPhoto) {
      // White frame behind photo
      page.drawRectangle({
        x: photoBoxX - 2,
        y: photoBoxY - 2,
        width: photoBoxW + 4,
        height: photoBoxH + 4,
        color: textWhite,
        borderColor: rgb(203 / 255, 213 / 255, 225 / 255),
        borderWidth: 1.5,
      });

      page.drawImage(embeddedPhoto, {
        x: photoBoxX,
        y: photoBoxY,
        width: photoBoxW,
        height: photoBoxH,
      });
    } else {
      // Clean framed avatar placeholder
      page.drawRectangle({
        x: photoBoxX,
        y: photoBoxY,
        width: photoBoxW,
        height: photoBoxH,
        color: rgb(241 / 255, 245 / 255, 249 / 255), // Slate 100
        borderColor: rgb(203 / 255, 213 / 255, 225 / 255), // Slate 300
        borderWidth: 1,
      });

      const photoLabel1 = "PHOTO";
      const photoLabel1W = fontBold.widthOfTextAtSize(photoLabel1, 8.5);
      page.drawText(photoLabel1, {
        x: photoBoxX + (photoBoxW - photoLabel1W) / 2,
        y: photoBoxY + photoBoxH / 2 + 2,
        size: 8.5,
        font: fontBold,
        color: textMuted,
      });

      const photoLabel2 = "St. Ann's";
      const photoLabel2W = fontRegular.widthOfTextAtSize(photoLabel2, 7.5);
      page.drawText(photoLabel2, {
        x: photoBoxX + (photoBoxW - photoLabel2W) / 2,
        y: photoBoxY + photoBoxH / 2 - 10,
        size: 7.5,
        font: fontRegular,
        color: textMuted,
      });
    }

    // Employee ID Badge right below the photo
    if (employeeId && employeeId !== "—") {
      const badgeW = photoBoxW + 4;
      const badgeH = 20;
      const badgeX = photoBoxX - 2;
      const badgeY = photoBoxY - 26;

      page.drawRectangle({
        x: badgeX,
        y: badgeY,
        width: badgeW,
        height: badgeH,
        color: rgb(238 / 255, 242 / 255, 255 / 255),
        borderColor: rgb(199 / 255, 210 / 255, 254 / 255),
        borderWidth: 1,
      });

      const idText = `ID: ${employeeId}`;
      const idWidth = fontBold.widthOfTextAtSize(idText, 8.5);
      page.drawText(idText, {
        x: badgeX + (badgeW - idWidth) / 2,
        y: badgeY + 6,
        size: 8.5,
        font: fontBold,
        color: navy,
      });
    }

    // 4. Detailed Academic Record Table
    const tableY = cardY - 24;

    // Table Section Header
    page.drawText("I. ACADEMIC & PROFESSIONAL PARTICULARS", {
      x: cardX,
      y: tableY,
      size: 11,
      font: fontBold,
      color: navy,
    });

    const rows = [
      { label: "Full Faculty Name", value: name },
      { label: "Employee Identifier (ID)", value: employeeId || "SACW-REGISTERED" },
      { label: "Current Designation", value: designation },
      { label: "Academic Department", value: department || "All Departments" },
      { label: "Highest Qualification", value: qualification },
      { label: "Date of Joining Institution", value: dateOfJoining },
      { label: "Total Teaching Experience", value: experience },
      { label: "Employment Classification", value: "Permanent / Full-Time Teaching Faculty" },
      { label: "Institutional Affiliation", value: "Acharya Nagarjuna University, Nagarjuna Nagar, Guntur" },
      { label: "Accreditation & Approvals", value: "UGC 2(f), NAAC 'A' Grade, AISHE Certified (C-39493)" },
    ];

    let currentY = tableY - 14;
    const rowHeight = 23;

    rows.forEach((row, idx) => {
      const isEven = idx % 2 === 0;
      currentY -= rowHeight;

      // Row background
      page.drawRectangle({
        x: cardX,
        y: currentY,
        width: cardW,
        height: rowHeight,
        color: isEven ? lightBg : textWhite,
        borderColor: cardBorder,
        borderWidth: 0.75,
      });

      // Label (Left Column)
      page.drawText(row.label, {
        x: cardX + 12,
        y: currentY + 7,
        size: 9,
        font: fontBold,
        color: textDark,
      });

      // Value (Right Column)
      const valText = row.value || "—";
      page.drawText(valText.length > 55 ? valText.substring(0, 52) + "..." : valText, {
        x: cardX + 185,
        y: currentY + 7,
        size: 9,
        font: fontRegular,
        color: row.label.includes("Designation") || row.label.includes("Qualification") ? navy : textDark,
      });
    });

    // 5. Verification & Institutional Quality Assurance Box
    const verifY = currentY - 50;
    page.drawRectangle({
      x: cardX,
      y: verifY,
      width: cardW,
      height: 44,
      color: rgb(240 / 255, 253 / 255, 244 / 255), // Emerald 50
      borderColor: rgb(187 / 255, 247 / 255, 208 / 255), // Emerald 200
      borderWidth: 1,
    });

    page.drawText("INSTITUTIONAL VERIFICATION STATEMENT", {
      x: cardX + 14,
      y: verifY + 29,
      size: 8.5,
      font: fontBold,
      color: rgb(21 / 255, 128 / 255, 61 / 255), // Emerald 700
    });

    page.drawText(
      "This document is an authentic academic profile record maintained by the Internal Quality Assurance Cell (IQAC)",
      {
        x: cardX + 14,
        y: verifY + 16,
        size: 8,
        font: fontRegular,
        color: textDark,
      }
    );
    page.drawText(
      "and Faculty Affairs Division of St. Ann's College for Women, Gorantla, Guntur.",
      {
        x: cardX + 14,
        y: verifY + 6,
        size: 8,
        font: fontRegular,
        color: textDark,
      }
    );

    // 6. Official Footer
    const footerY = 26;
    page.drawLine({
      start: { x: cardX, y: footerY + 16 },
      end: { x: cardX + cardW, y: footerY + 16 },
      thickness: 1,
      color: cardBorder,
    });

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    page.drawText(`Official Portal Document | Generated on: ${dateStr}`, {
      x: cardX,
      y: footerY,
      size: 8,
      font: fontRegular,
      color: textMuted,
    });

    const portalUrl = "stannscollegeforwomen.ac.in";
    const portalUrlWidth = fontBold.widthOfTextAtSize(portalUrl, 8);
    page.drawText(portalUrl, {
      x: cardX + cardW - portalUrlWidth,
      y: footerY,
      size: 8,
      font: fontBold,
      color: navy,
    });

    // Save and send PDF bytes
    const pdfBytes = await pdfDoc.save();
    const cleanFilename = `${name.replace(/[/\\?%*:|"<>]/g, " ")} - Faculty Profile.pdf`;
    const dispositionType = isDownload ? "attachment" : "inline";

    return new Response(pdfBytes as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${dispositionType}; filename="${cleanFilename}"; filename*=UTF-8''${encodeURIComponent(cleanFilename)}`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("[Faculty Dynamic PDF Generation Error]:", error);
    const fallbackPath = path.join(process.cwd(), "public", "documents", "faculty", "Faculty_Website_Profile_View.pdf");
    if (fs.existsSync(fallbackPath)) {
      const fileBuffer = fs.readFileSync(fallbackPath);
      return new Response(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="Faculty Profile.pdf"`,
        },
      });
    }
    return new Response("PDF Generation Error", { status: 500 });
  }
}
