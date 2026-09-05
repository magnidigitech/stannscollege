import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Sanitization helpers to strip accidental quotes and spaces added in hosting dashboards
    const cleanString = (val?: string) =>
      (val || "")
        .replace(/^["'`\s]+|["'`\s]+$/g, "")
        .trim();

    const cleanPassword = (val?: string) =>
      (val || "")
        .replace(/["'`]/g, "")
        .replace(/\s+/g, "")
        .trim();

    const gmailUser = cleanString(process.env.GMAIL_USER) || "stannsofficegorantla@gmail.com";
    const gmailAppPassword = cleanPassword(process.env.GMAIL_APP_PASSWORD) || "bujcmngktmmfhcjk";
    const receiverEmail = cleanString(process.env.CONTACT_RECEIVER_EMAIL) || "stannsofficegorantla@gmail.com";

    // Configure Nodemailer transporter with robust direct SSL on port 465
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

    const inquirySubject = subject?.trim() || "General Inquiry";
    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Elegant, branded HTML email template
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #004225 0%, #065f38 100%); padding: 32px 28px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">St. Ann's College for Women</h1>
          <p style="margin: 0; font-size: 13px; color: #d1fae5; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Website Contact Inquiry</p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 28px 24px 28px;">
          <div style="background-color: #f8fafc; border-left: 4px solid #004225; padding: 14px 18px; border-radius: 6px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.5;">
              You have received a new inquiry from the college website contact form.
            </p>
          </div>

          <!-- Sender Details Table -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b; width: 32%;">Sender Name:</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${name.trim()}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b;">Email Address:</td>
              <td style="padding: 10px 0; color: #0f172a;">
                <a href="mailto:${email.trim()}" style="color: #059669; font-weight: 600; text-decoration: none;">${email.trim()}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b;">Phone Number:</td>
              <td style="padding: 10px 0; color: #0f172a;">
                ${
                  phone?.trim()
                    ? `<a href="tel:${phone.trim()}" style="color: #0284c7; font-weight: 600; text-decoration: none;">${phone.trim()}</a>`
                    : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'
                }
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b;">Subject:</td>
              <td style="padding: 10px 0; font-weight: 700; color: #004225;">${inquirySubject}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #64748b;">Date & Time:</td>
              <td style="padding: 10px 0; color: #475569; font-size: 13px;">${formattedDate}</td>
            </tr>
          </table>

          <!-- Message Box -->
          <div style="margin-top: 10px;">
            <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b;">Inquiry Message:</p>
            <div style="background-color: #f1f5f9; border-radius: 10px; padding: 18px; color: #1e293b; font-size: 14px; line-height: 1.7; white-space: pre-wrap; font-family: inherit;">
${message.trim()}
            </div>
          </div>

          <!-- Quick Reply Hint -->
          <div style="margin-top: 24px; padding: 14px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #065f46; font-weight: 600;">
              💡 Simply click <strong>Reply</strong> in your email client to respond directly to ${name.trim()} (${email.trim()}).
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 28px; text-align: center; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0 0 4px 0;">St. Ann's College for Women, Gorantla, Guntur</p>
          <p style="margin: 0;">Automated notification from the official college web portal.</p>
        </div>
      </div>
    `;

    // Send Mail
    await transporter.sendMail({
      from: `"St. Ann's College Website" <${gmailUser}>`,
      to: receiverEmail,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: `[Website Inquiry] ${inquirySubject} - from ${name.trim()}`,
      text: `New Website Inquiry:\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone?.trim() || "Not provided"}\nSubject: ${inquirySubject}\nDate: ${formattedDate}\n\nMessage:\n${message.trim()}`,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
