'use server';

import prisma from "@/lib/prisma";

export async function createEnquiryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const course = formData.get("course") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !phone) {
    return { error: "Name, email, and phone are required fields." };
  }

  try {
    const newEnquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        phone,
        course: course || "General Inquiry",
        message: message || "No explicit message provided.",
      }
    });

    return { success: `Successfully submitted your inquiry! ID: ${newEnquiry.id}` };
  } catch (err: any) {
    console.error("Enquiry insertion failed:", err);
    return { error: err.message || "Something went wrong while submitting the inquiry." };
  }
}
