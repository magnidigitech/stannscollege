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

export async function getLaurels() {
  try {
    const data = await sanityClient.fetch(`*[_type == "studentLaurel"] | order(year desc)`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (laurels):", err);
  }
  return [
    { year: "2022-2025", group: "B.Com (G)", hallTicketNumber: "Y222158013", studentName: "Gundala Usha Rani", achievement: "2 Place in Top 5" },
    { year: "2015-2018", group: "BBC", hallTicketNumber: "Y153158018", studentName: "K. Anuja", achievement: "Pratibha Puraskar Award" },
    { year: "2015-2018", group: "BBC", hallTicketNumber: "Y153158030", studentName: "V Bala Sri", achievement: "Pratibha Puraskar Award" },
    { year: "2015-2018", group: "B.Com (G)", hallTicketNumber: "Y152158015", studentName: "K Pratima", achievement: "Pratibha Puraskar Award" },
    { year: "2015-2018", group: "MCA", hallTicketNumber: "Y16MC58018", studentName: "Sk.Mastanbi", achievement: "Pratibha Puraskar Award" },
    { year: "2015-2018", group: "MCA", hallTicketNumber: "Y16MC58044", studentName: "N. Suchandrika", achievement: "Pratibha Puraskar Award" },
    { year: "2014-2017", group: "MCA", hallTicketNumber: "Y15MC58020", studentName: "S.Ravali", achievement: "Gold Medals (03)" },
    { year: "2014-2017", group: "B.Com(G)", hallTicketNumber: "Y142158008", studentName: "D.Sai Swetha", achievement: "Pratibha Puraskar Award" },
    { year: "2013-2016", group: "MBC", hallTicketNumber: "Y133158030", studentName: "Gayathri Thirumala", achievement: "Pratibha Puraskar Award" },
    { year: "2012-2015", group: "MCA", hallTicketNumber: "Y13MC58010", studentName: "K.Naga Lakshmi", achievement: "Pratibha Puraskar Award" },
    { year: "2012-2015", group: "BBC", hallTicketNumber: "", studentName: "S Hima Bindu", achievement: "Gold Medal" },
    { year: "2012-2015", group: "B.Com (G)", hallTicketNumber: "Y122158049", studentName: "Y Satya Vani", achievement: "Pratibha Puraskar Award" },
    { year: "2011-2024", group: "MBC", hallTicketNumber: "Y113158051", studentName: "V Anitha", achievement: "Pratibha Puraskar Award" },
    { year: "2011-2014", group: "BBC", hallTicketNumber: "Y113158001", studentName: "P. Amala Mary", achievement: "Pratibha Puraskar Award" },
    { year: "2011-2014", group: "MBC", hallTicketNumber: "Y113158033", studentName: "B. Maha Lakshmi", achievement: "Pratibha Puraskar Award" },
    { year: "2011-2014", group: "MBC", hallTicketNumber: "Y113158050", studentName: "V.Sivaparvathi Devi", achievement: "Pratibha Puraskar Award" },
    { year: "2011-2014", group: "MPC", hallTicketNumber: "", studentName: "P Hemalatha", achievement: "Pratibha Puraskar Award" },
    { year: "1998-2001", group: "BCA", hallTicketNumber: "", studentName: "G. Neelima", achievement: "University Rank Holder" }
  ];
}

export async function getLaurelImages() {
  try {
    const data = await sanityClient.fetch(`*[_type == "laurelImage"]{ "imageUrl": image.asset->url, title }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (laurel images):", err);
  }
  return [];
}

export async function getApscheOrders() {
  try {
    const data = await sanityClient.fetch(`*[_type == "apscheOrder"]{
      _id,
      title,
      academicYear,
      "fileUrl": file.asset->url
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (apsche orders):", err);
  }
  return [
    {
      _id: "mock1",
      title: "APSCHE Orders 2025–2026",
      academicYear: "2025–2026",
      fileUrl: "/pdf-placeholder.pdf"
    },
    {
      _id: "mock2",
      title: "APSCHE Orders 2023–2024",
      academicYear: "2023–2024",
      fileUrl: "/pdf-placeholder.pdf"
    }
  ];
}

export async function getAnuAffiliations() {
  try {
    const data = await sanityClient.fetch(`*[_type == "anuAffiliation"]{
      _id,
      title,
      academicYear,
      "fileUrl": file.asset->url
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (anu affiliations):", err);
  }
  return [];
}

export async function getAicteApprovals() {
  try {
    const data = await sanityClient.fetch(`*[_type == "aicteApproval"]{
      _id,
      title,
      academicYear,
      "fileUrl": file.asset->url
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (aicte approvals):", err);
  }
  return [];
}

export async function getNirfReports() {
  try {
    const data = await sanityClient.fetch(`*[_type == "nirfReport"]{
      _id,
      title,
      academicYear,
      category,
      "fileUrl": file.asset->url
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (nirf reports):", err);
  }
  return [];
}

export async function getNaacCertificates() {
  try {
    const data = await sanityClient.fetch(`*[_type == "naacCertificate"]{
      _id,
      title,
      "imageUrl": image.asset->url
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (naac certificates):", err);
  }
  return [];
}

export async function getAisheCertifications() {
  try {
    const data = await sanityClient.fetch(`*[_type == "aisheCertification"]{
      _id,
      title,
      academicYear,
      "fileUrl": file.asset->url
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (aishe certifications):", err);
  }
  return [];
}
