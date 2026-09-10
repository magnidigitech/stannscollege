import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentName,
      mobileNumber,
      email,
      districtCity,
      highestQualification,
      yearOfPassing,
      levelOfStudy,
      programmeInterested,
      informationRequired,
    } = body;

    // Validate required fields
    if (!studentName?.trim()) {
      return NextResponse.json(
        { error: "Student Name is required." },
        { status: 400 }
      );
    }

    if (!mobileNumber?.trim()) {
      return NextResponse.json(
        { error: "Mobile Number is required." },
        { status: 400 }
      );
    }

    if (!highestQualification?.trim()) {
      return NextResponse.json(
        { error: "Current / Highest Qualification is required." },
        { status: 400 }
      );
    }

    if (!levelOfStudy?.trim()) {
      return NextResponse.json(
        { error: "Level of Study (UG / PG) is required." },
        { status: 400 }
      );
    }

    if (!programmeInterested?.trim()) {
      return NextResponse.json(
        { error: "Programme Interested In is required." },
        { status: 400 }
      );
    }

    // Email format check if provided
    if (email?.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { error: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    // Generate unique Enquiry Reference Number: SACW/ENQ/2026/XXXX
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `SACW/ENQ/2026/${randomDigits}`;

    // Sanitization helpers
    const cleanCredential = (val?: string) =>
      (val || "")
        .replace(/[<>"'`\s]/g, "")
        .trim();

    const gmailUser = cleanCredential(process.env.GMAIL_USER) || "stannsofficegorantla@gmail.com";
    const gmailAppPassword = cleanCredential(process.env.GMAIL_APP_PASSWORD) || "bujcmngktmmfhcjk";
    const receiverEmail = cleanCredential(process.env.CONTACT_RECEIVER_EMAIL) || "stannsofficegorantla@gmail.com";

    // Nodemailer transporter with direct SSL on port 465
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const infoList: string[] = Array.isArray(informationRequired) ? informationRequired : [];

    // Branded HTML email template for college administration
    const adminHtmlContent = `
      <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #001730 0%, #002147 50%, #0a3d78 100%); padding: 30px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">St. Ann's College for Women</h1>
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #bae6fd; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Gorantla, Guntur • Admission Cell</p>
          <div style="display: inline-block; background-color: #059669; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;">
            NEW ADMISSION ENQUIRY
          </div>
        </div>

        <!-- Reference Banner -->
        <div style="background-color: #f0fdf4; border-bottom: 1px solid #bbf7d0; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 13px; color: #166534; font-weight: 600;">Enquiry Ref No:</span>
          <strong style="font-size: 15px; color: #15803d; font-family: monospace;">${referenceNumber}</strong>
        </div>

        <!-- Body -->
        <div style="padding: 24px 24px 16px 24px;">
          
          <!-- Section 1: Student Details -->
          <div style="margin-bottom: 22px;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #002147; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
              1. Student Details
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 38%;">Student Name:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${studentName.trim()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Mobile Number:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #0284c7;">
                  <a href="tel:${mobileNumber.trim()}" style="color: #0284c7; text-decoration: none;">${mobileNumber.trim()}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Email Address:</td>
                <td style="padding: 8px 0; color: #0f172a;">
                  ${
                    email?.trim()
                      ? `<a href="mailto:${email.trim()}" style="color: #059669; font-weight: 600; text-decoration: none;">${email.trim()}</a>`
                      : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'
                  }
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #64748b;">District / City:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">
                  ${districtCity?.trim() || '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                </td>
              </tr>
            </table>
          </div>

          <!-- Section 2: Educational Qualification -->
          <div style="margin-bottom: 22px;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #002147; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
              2. Educational Qualification
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 38%;">Current / Highest Qualification:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${highestQualification.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Year of Passing:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">
                  ${yearOfPassing?.trim() || '<span style="color: #94a3b8; font-style: italic;">Not specified</span>'}
                </td>
              </tr>
            </table>
          </div>

          <!-- Section 3: Programme Interested In -->
          <div style="margin-bottom: 22px;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #002147; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
              3. Programme Interested In
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 38%;">Level of Study:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #4338ca;">${levelOfStudy.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Selected Programme:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #047857; font-size: 15px;">${programmeInterested.trim()}</td>
              </tr>
            </table>
          </div>

          <!-- Section 4: Information Required -->
          <div style="margin-bottom: 22px;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #002147; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
              4. Information Required by Student
            </h3>
            ${
              infoList.length > 0
                ? `<ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155; line-height: 1.8;">
                    ${infoList.map((item) => `<li style="margin-bottom: 4px;"><strong>${item}</strong></li>`).join("")}
                   </ul>`
                : '<p style="margin: 0; font-size: 14px; color: #94a3b8; font-style: italic;">No specific information options selected.</p>'
            }
          </div>

          <!-- Quick Action Bar -->
          <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; text-align: center;">
            <span style="font-size: 13px; color: #475569; font-weight: 600; margin-right: 12px;">Direct Contact:</span>
            <a href="tel:${mobileNumber.trim()}" style="display: inline-block; background-color: #0284c7; color: #ffffff; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; margin: 4px;">
              📞 Call Student
            </a>
            ${
              email?.trim()
                ? `<a href="mailto:${email.trim()}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; margin: 4px;">
                     ✉️ Email Student
                   </a>`
                : ""
            }
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748b;">St. Ann's College for Women, Gorantla, Guntur</p>
          <p style="margin: 0;">Submission Timestamp: ${formattedDate}</p>
        </div>
      </div>
    `;

    // 1. Send email to Admissions Office
    await transporter.sendMail({
      from: `"St. Ann's Admissions" <${gmailUser}>`,
      to: receiverEmail,
      replyTo: email?.trim() ? `"${studentName.trim()}" <${email.trim()}>` : undefined,
      subject: `[Admission Enquiry] ${referenceNumber} - ${studentName.trim()} (${programmeInterested.trim()})`,
      text: `New Admission Enquiry:
Reference Number: ${referenceNumber}
Student Name: ${studentName.trim()}
Mobile Number: ${mobileNumber.trim()}
Email: ${email?.trim() || "Not provided"}
District / City: ${districtCity?.trim() || "Not provided"}
Highest Qualification: ${highestQualification.trim()}
Year of Passing: ${yearOfPassing?.trim() || "Not specified"}
Level of Study: ${levelOfStudy.trim()}
Programme Interested In: ${programmeInterested.trim()}
Information Required: ${infoList.join(", ") || "None selected"}
Date: ${formattedDate}`,
      html: adminHtmlContent,
    });

    // 2. If student provided an email, send them a confirmation copy
    if (email?.trim()) {
      try {
        const studentHtmlContent = `
          <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
            <div style="background: linear-gradient(135deg, #001730 0%, #002147 50%, #0a3d78 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800;">St. Ann's College for Women</h1>
              <p style="margin: 0; font-size: 12px; color: #bae6fd; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Gorantla, Guntur • Admission Cell</p>
            </div>
            <div style="padding: 28px 24px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <div style="display: inline-block; background-color: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; margin-bottom: 12px;">
                  ✓ Enquiry Successfully Received
                </div>
                <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #0f172a; font-weight: 800;">Dear ${studentName.trim()},</h2>
                <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">
                  Thank you for your interest in joining St. Ann's College for Women! Your admission enquiry has been successfully registered with our Admission Cell.
                </p>
              </div>

              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">Your Enquiry Reference Number:</p>
                <div style="font-size: 20px; font-weight: 800; color: #002147; font-family: monospace; letter-spacing: 1px;">
                  ${referenceNumber}
                </div>
                <p style="margin: 8px 0 0 0; font-size: 13px; color: #475569;">
                  <strong>Programme:</strong> ${programmeInterested.trim()} (${levelOfStudy.trim()})
                </p>
              </div>

              <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 16px;">
                Our Admission Team will review your details and contact you shortly with comprehensive information regarding eligibility, fee structure, admission procedures, and facilities.
              </p>

              <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; font-size: 13px; color: #64748b;">
                <p style="margin: 0 0 4px 0;"><strong>Admission Help Desk:</strong></p>
                <p style="margin: 0 0 4px 0;">📞 Phone: +91 7382104655 / +91 8500656134 / 0863-2236470</p>
                <p style="margin: 0;">✉️ Email: st_anns_coll@yahoo.co.in / stannscollegegnt@gmail.com</p>
              </div>
            </div>
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 24px; text-align: center; font-size: 12px; color: #94a3b8;">
              St. Ann's College for Women, Gorantla, Guntur - 522034, Andhra Pradesh
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"St. Ann's Admissions" <${gmailUser}>`,
          to: email.trim(),
          subject: `Admission Enquiry Registered: ${referenceNumber} - St. Ann's College for Women`,
          html: studentHtmlContent,
        });
      } catch (clientMailError) {
        console.warn("Could not send confirmation copy to student:", clientMailError);
        // Do not fail the whole request if client confirmation fails
      }
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: "Your admission enquiry has been successfully submitted.",
    });
  } catch (error: any) {
    console.error("Error submitting admission enquiry:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to submit admission enquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}
