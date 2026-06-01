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

export async function getDepartment(slug: string) {
  try {
    const query = `*[_type == "department" && slug.current == $slug][0]{
      name,
      established,
      tagline,
      description,
      vision,
      mission,
      programmes,
      valueAddedCourses,
      mous,
      bestPractices,
      activities,
      infrastructure,
      careerOpps
    }`;
    const data = await sanityClient.fetch(query, { slug });
    if (data && data.name) return data;
  } catch (err) {
    console.error("Sanity fetch error (department):", err);
  }

  // Fallback static data map
  if (slug === "department-of-commerce") {
    return {
      name: "Department of Commerce",
      established: "1997-98",
      tagline: "Commerce Wonder World – Emphasizing Holistic Student Development",
      description: "The Department of Commerce was established in the academic year 1997–98 in response to the growing demand for commerce education. It initially offered the B.Com (General) programme and later introduced the restructured curriculum in 1999–2000, aligning with evolving academic and industry needs. The department is committed to delivering quality education with a strong practical orientation, preparing students for careers in business, finance, entrepreneurship, and research.",
      vision: "To achieve academic excellence with a strong commitment to providing quality education in commerce, management, and related fields, while fostering a holistic approach towards life, environment, and global competitiveness.",
      mission: [
        "To empower students with knowledge, skills, and practical training",
        "To nurture entrepreneurial spirit and enhance employability",
        "To promote learning through doing methodologies",
        "To develop socially responsible individuals with global outlook",
        "To prepare students to meet modern challenges with confidence and competence",
      ],
      programmes: [
        { title: "B.Com Honours (General)", intake: "20 (14 Convener + 6 Management)", duration: "3 Years (6 Semesters)" },
        { title: "B.Com Honours (Comp Apps)", intake: "80 (56 Convener + 24 Management)", duration: "3 Years (6 Semesters)" },
      ],
      valueAddedCourses: [
        { sNo: 1, title: "Tally & GST Accounting", duration: "40 Hours", agency: "Nitya Computers" },
        { sNo: 2, title: "Income Tax Practice", duration: "---", agency: "Tax Consultant" },
        { sNo: 3, title: "Banking & Financial Services", duration: "---", agency: "Bank Officials" },
        { sNo: 4, title: "Digital Marketing & E-Commerce", duration: "---", agency: "Industry Trainer" },
        { sNo: 5, title: "Entrepreneurship Development Programme", duration: "---", agency: "ED Cell" },
      ],
      mous: [
        { title: "ABC Chartered Accountants Firm", type: "MoU", duration: "3 Years", purpose: "GST & Accounting Training" }
      ],
      bestPractices: [
        {
          title: "1. GST & Accounting Practical Training",
          category: "Skill-Oriented Learning Initiative",
          objectives: ["Provide hands-on training in GST & accounting practices", "Enhance employability in accounting, taxation, and finance", "Bridge gap between theoretical knowledge and industry requirements"],
          practice: ["Training in GST concepts, billing, and return filing procedures", "Hands-on sessions using accounting software such as Tally", "Workshops by practicing accountants and tax consultants"],
          success: ["Students gaining practical competency in GST & accounting", "Increased placement opportunities in accounting firms"]
        },
        {
          title: "2. Entrepreneurship & Small Business Development",
          category: "Entrepreneurial Mindset",
          objectives: ["Develop entrepreneurial mindset among students", "Promote self-employment and local business initiatives", "Build leadership and managerial skills"],
          practice: ["Business plan competitions and startup idea presentations", "Workshops on small business management and digital marketing", "Interaction with local entrepreneurs and women business owners"],
          success: ["Students presenting innovative business ideas", "Alumni initiating small business ventures"]
        },
        {
          title: "3. Financial Literacy & Community Outreach Programme",
          category: "Social Responsibility",
          objectives: ["Promote financial awareness in rural communities", "Educate students on practical financial management", "Encourage social responsibility"],
          practice: ["Conducting financial literacy camps in nearby villages", "Awareness programmes on savings, budgeting, and digital payments", "Student participation in outreach and extension activities"],
          success: ["Increased awareness among community participants", "Active student involvement in outreach programmes"]
        }
      ],
      activities: [
        { label: "Academic Enrichment", desc: "Seminars, guest lectures, and workshops on accounting, taxation, and finance." },
        { label: "Skill Development", desc: "Tally & GST training sessions, and interview preparation workshops." },
        { label: "Student-Centric", desc: "Business quizzes, debates, commerce exhibitions and project displays." },
        { label: "Extension & Outreach", desc: "Financial literacy programmes and consumer awareness campaigns in rural areas." },
        { label: "Industry Interaction", desc: "Industrial visits, internships and interaction sessions with entrepreneurs." }
      ],
      infrastructure: [
        "Commerce Lab / Computer Lab",
        "ICT-enabled classrooms",
        "Library resources (books, journals)",
        "Internet & digital learning facilities"
      ],
      careerOpps: [
        "Accounting & Taxation",
        "Banking & Finance",
        "Entrepreneurship",
        "Higher Education (M.Com, MBA, CA, etc.)"
      ]
    };
  }

  // Generic Fallback to ensure page compiles dynamically
  const prettyName = slug
    .replace("department-of-", "")
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    name: `Department of ${prettyName === "Mca" ? "MCA" : prettyName === "Mba" ? "MBA" : prettyName}`,
    established: "1997-98",
    tagline: "Facilitating holistic student empowerment & development",
    description: `The Department of ${prettyName === "Mca" ? "MCA" : prettyName === "Mba" ? "MBA" : prettyName} is dedicated to providing premium education, offering modern state-of-the-art theoretical frameworks and extensive experiential workloads to prepare upcoming cohorts for standard industrial tracks.`,
    vision: "To develop global competencies in students through value-oriented education and innovative practical platforms.",
    mission: [
      "To nurture skill sets tailored towards active industrial expectations",
      "To provide experimental laboratory and computational infrastructure",
      "To guide research avenues for modern challenges in the ecosystem",
      "To encourage extension and societal-focused initiatives"
    ],
    programmes: [
      { 
        title: prettyName.includes("Mca") ? "Master of Computer Applications" : prettyName.includes("Mba") ? "Master of Business Administration" : `B.Sc / B.Com Honours (${prettyName})`, 
        intake: "TBD", 
        duration: prettyName.includes("Mc") || prettyName.includes("Mb") ? "2 Years" : "3 Years" 
      }
    ],
    valueAddedCourses: [],
    mous: [],
    bestPractices: [],
    activities: [],
    infrastructure: [
      "Equipped Laboratories",
      "ICT-enabled Lecture Halls",
      "Departmental Learning Resources"
    ],
    careerOpps: [
      "Professional Placement Sectors",
      "Postgraduate Academics & Research Pathways"
    ]
  };
}

export async function getFacultyMembers() {
  try {
    const data = await sanityClient.fetch(`*[_type == "facultyMember"] | order(sNo asc) {
      sNo,
      name,
      staffType,
      designation,
      department,
      qualification,
      dateOfJoining,
      experience,
      "profilePdfUrl": profilePdf.asset->url,
      "imageUrl": image.asset->url
    }`);
    return data;
  } catch (err) {
    console.error("Sanity fetch error (facultyMembers):", err);
    return [];
  }
}

export async function getFacultySections() {
  try {
    const data = await sanityClient.fetch(`*[_type == "facultySection"] {
      category,
      title,
      content,
      "images": images[].asset->url,
      "files": files[] {
        description,
        "url": asset->url
      }
    }`);
    return data;
  } catch (err) {
    console.error("Sanity fetch error (facultySections):", err);
    return [];
  }
}

// NAAC Accreditation Data Fetcher with Local JSON Fallback
export async function getNaacData() {
  try {
    const data = await sanityClient.fetch(`*[_type == "naacCriterion"] | order(id asc) {
      id,
      title,
      sections[] {
        number,
        title,
        metrics[] {
          number,
          title,
          documents[] {
            label,
            documentUrl,
            subDocuments[] {
              name,
              year,
              url,
              subDocuments[] {
                name,
                year,
                url
              }
            }
          }
        }
      }
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (naacCriterion):", err);
  }
  
  // Dynamic fallback to the crawled local backup naac-data.json
  try {
    const localData = require("../components/quality-assurance/naac-data.json");
    return localData;
  } catch (err) {
    console.error("Error loading local NAAC data backup:", err);
    return [];
  }
}

// AQAR Reports Data Fetcher with Local JSON Fallback
export async function getAqarData() {
  try {
    const data = await sanityClient.fetch(`*[_type == "aqarCriterion"] | order(id asc) {
      id,
      title,
      sections[] {
        number,
        title,
        metrics[] {
          number,
          title,
          documents[] {
            label,
            documentUrl,
            subDocuments[] {
              name,
              year,
              url,
              subDocuments[] {
                name,
                year,
                url
              }
            }
          }
        }
      }
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (aqarCriterion):", err);
  }
  
  // Dynamic fallback to the crawled local backup aqar-data.json
  try {
    const localData = require("../components/quality-assurance/aqar-data.json");
    return localData;
  } catch (err) {
    console.error("Error loading local AQAR data backup:", err);
    return [];
  }
}


