import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: "sk2B6oq7TV44M3rCRTu17hThjlyGyarJzispWzZsPMcc6LUgrAcxlKKYnJPiSPCizWCGIkwCCYmXTwzDHZaVTxrDkyhFAyxNnStQZj6wCcxo0z1aaz4tnH8vgMPApmF5Z8u7rXN87IVVPA1rYJPX4VoDSDF4ekCdENzvyRLSraWWowOhBKOw",
  useCdn: false,
});

// Default/mock data fallback functions
export async function getFaculty() {
  try {
    const data = await sanityClient.fetch(`*[_type == "faculty"] | order(_createdAt desc)`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (faculty):", err);
  }
  return [
    {
      name: "Dr. K. Swaroopa Rani",
      role: "Principal & Head of Commerce",
      department: "Commerce",
      bio: "Distinguished academician with over 25 years of educational and administrative leadership.",
    },
    {
      name: "Mrs. V. Lakshmi Devi",
      role: "Dean of Academic Affairs",
      department: "Science",
      bio: "Leading advanced research in computing and physical sciences over the past two decades.",
    },
    {
      name: "Dr. P. Mary Sunanda",
      role: "Professor of Psychology",
      department: "Humanities",
      bio: "Focusing on community, mental health, cognitive mapping, and behavioral patterns.",
    },
  ];
}

export async function getEvents() {
  try {
    const data = await sanityClient.fetch(`*[_type == "event"] | order(date desc)`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (events):", err);
  }
  return [
    {
      title: "Annual Sports Meet 2026",
      date: "May 12, 2026",
      location: "Main Campus Grounds",
      description: "A grand celebration of athleticism, teamwork, and dynamic talent across all departments.",
    },
    {
      title: "Silver Jubilee Convocation",
      date: "May 28, 2026",
      location: "Auditorium",
      description: "Graduation ceremony for the outgoing cohort with distinguished guests and alumni.",
    },
  ];
}

export async function getNotices() {
  try {
    const data = await sanityClient.fetch(`*[_type == "notice"] | order(_createdAt desc)`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (notices):", err);
  }
  return [
    {
      title: "Admissions Extended for UG & PG",
      date: "May 01, 2026",
      description: "Due to high demand, the deadline for submitting online inquiry forms has been extended.",
      category: "Admissions",
    },
    {
      title: "Hostel Fee Revision Notice",
      date: "April 29, 2026",
      description: "Details regarding the new fee structure for the 2026-2027 academic year are now available.",
      category: "Hostel",
    },
  ];
}

export async function getAffiliations() {
  try {
    const data = await sanityClient.fetch(`*[_type == "affiliation"] | order(_createdAt desc)`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (affiliations):", err);
  }
  return [
    {
      name: "Acharya Nagarjuna University",
      details: "Official Academic and Examination Affiliation",
    },
    {
      name: "UGC (University Grants Commission)",
      details: "Recognized Higher Educational Standards",
    },
    {
      name: "NAAC A+ Accreditation",
      details: "Premier Assessment & Academic Grade",
    },
  ];
}
