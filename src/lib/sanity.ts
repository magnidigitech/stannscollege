import { createClient } from "@sanity/client";
import { cache } from "react";

export const sanityClient = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: "sk2B6oq7TV44M3rCRTu17hThjlyGyarJzispWzZsPMcc6LUgrAcxlKKYnJPiSPCizWCGIkwCCYmXTwzDHZaVTxrDkyhFAyxNnStQZj6wCcxo0z1aaz4tnH8vgMPApmF5Z8u7rXN87IVVPA1rYJPX4VoDSDF4ekCdENzvyRLSraWWowOhBKOw",
  useCdn: true,
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
    const data = await sanityClient.fetch(`*[_type == "event" && !(_id in path("drafts.**"))] | order(displayOrder asc, eventDate asc, date desc) {
      _id,
      title,
      startDate,
      eventDate,
      eventEndDate,
      date,
      organizer,
      location,
      description,
      isNew,
      displayOrder,
      "bannerUrl": coalesce(banner.asset->url, image.asset->url, null),
      "pdfUrl": pdfFile.asset->url,
      "documents": documents[]{
        "title": title,
        "url": asset->url,
        "originalFilename": asset->originalFilename
      }
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (events):", err);
  }
  return [];
}

export async function getNotices() {
  try {
    const data = await sanityClient.fetch(`*[_type == "notice" && !(_id in path("drafts.**"))] | order(displayOrder asc, date desc, _createdAt desc) {
      _id,
      title,
      date,
      category,
      description,
      isNew,
      displayOrder,
      linkUrl,
      linkLabel,
      links[] {
        title,
        url
      },
      "pdfUrl": pdfFile.asset->url,
      documents[] {
        title,
        "url": asset->url,
        "originalFilename": asset->originalFilename
      }
    }`);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (notices):", err);
  }
  return [];
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
      facultyMembers,
      passPercentage,
      valueAddedCourses,
      mous,
      mouActivities,
      studentAchievements,
      academicAchievements,
      placements,
      bestPractices,
      activitiesList,
      activitiesSummary,
      internships,
      activities,
      infrastructure,
      careerOpps,
      bestPracticesImpact,
      gallery,
      otherStudentAchievements,
      focusOnWomenEmpowerment,
      overallApproach
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
      ],
      facultyMembers: [
        { name: "Mrs. M. Prameela", designation: "Head of the Department & Assistant Professor", qualification: "M.Com, MBA, (Ph.D)", experience: "18 Years", email: "commerce.hod@stannscollege.org" },
        { name: "Dr. K. Srilatha", designation: "Assistant Professor", qualification: "M.Com, Ph.D", experience: "12 Years", email: "srilatha.k@stannscollege.org" }
      ],
      passPercentage: [
        { year: "2025-2026", programme: "B.Com Honours General", finalYearStudents: "20", studentsPassed: "20", percentage: "100%" },
        { year: "2025-2026", programme: "B.Com Honours CA", finalYearStudents: "78", studentsPassed: "74", percentage: "94.8%" },
        { year: "2024-2025", programme: "B.Com Honours CA", finalYearStudents: "80", studentsPassed: "76", percentage: "95%" }
      ],
      placements: [
        { year: "2024-2025", finalYearStudents: "85", studentsPlaced: "68", highestSalary: "6.5 LPA", averageSalary: "3.2 LPA", percentage: "80%" },
        { year: "2023-2024", finalYearStudents: "78", studentsPlaced: "60", highestSalary: "5.8 LPA", averageSalary: "3.0 LPA", percentage: "77%" }
      ],
      bestPracticesImpact: [
        "Promotes experiential and student-centric learning",
        "Enhances employability and entrepreneurial readiness",
        "Strengthens practical knowledge in commerce disciplines",
        "Encourages community engagement and social responsibility",
        "Aligns with NAAC quality indicators and outcome-based education"
      ],
      otherStudentAchievements: [
        "Winners of District-level Business Plan Competition 2025",
        "Active student representation in State-level Young Entrepreneurs Summit"
      ],
      focusOnWomenEmpowerment: "The Department of Commerce actively prioritizes women empowerment and employability by integrating professional training, entrepreneurship initiatives, and career guidance tailored to women's leadership in business and finance.",
      overallApproach: "Through these year-round activities, the Department of Commerce ensures a balanced focus on academic excellence, skill development, industry exposure, and community engagement, aligning with NAAC quality benchmarks and outcome-based education."
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
    const data = await sanityClient.fetch(`*[_type == "facultyProfileNew"] | order(sNo asc) {
      sNo,
      "name": facultyName,
      staffType,
      designation,
      department,
      "qualification": highestQualification,
      dateOfJoining,
      "experience": totalExperience,
      "profilePdfUrl": facultyProfilePdf.asset->url,
      "imageUrl": profilePhoto.asset->url,
      "slug": slug.current
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
    const data = await sanityClient.fetch(`*[_type == "naacCriterion" && !(_id in path("drafts.**"))] | order(id asc) {
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
    const data = await sanityClient.fetch(`*[_type == "aqarCriterion" && !(_id in path("drafts.**"))] | order(id asc) {
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

export async function getAcademicProgrammes() {
  try {
    const query = `*[_type == "academicProgramme" && !(_id in path("drafts.**"))] | order(sNo asc) {
      sNo,
      programmeType,
      name,
      convenerQuota,
      managementQuota,
      totalIntake,
      "aboutDocumentUrl": aboutDocument.asset->url,
      "brochureUrl": brochure.asset->url
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (academic programmes):", err);
    return [];
  }
}

export async function getCommittees() {
  try {
    const query = `*[_type == "committee" && !(_id in path("drafts.**"))] | order(sNo asc) {
      sNo,
      name,
      "constitutionOrderUrl": constitutionOrder.asset->url,
      activitiesReports[] {
        title,
        "fileUrl": asset->url
      }
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (committees):", err);
    return [];
  }
}

export async function getCommitteeYearwiseLists() {
  try {
    const query = `*[_type == "committeeYearwiseList" && !(_id in path("drafts.**"))] | order(order asc) {
      academicYear,
      "fileUrl": file.asset->url,
      order
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (committee year-wise lists):", err);
    return [];
  }
}

export async function getStrategicPlan() {
  try {
    const query = `*[_type == "strategicPlan" && !(_id in path("drafts.**"))][0]{
      title,
      executiveSummary,
      googleFormUrl,
      studentFeedbackFormUrl,
      facultyFeedbackFormUrl,
      parentFeedbackFormUrl,
      alumniFeedbackFormUrl,
      communityFeedbackFormUrl,
      employerFeedbackFormUrl,
      documents[] {
        _key,
        title,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        "assetId": file.asset->_id
      }
    }`;
    const data = await sanityClient.fetch(query);
    return data || null;
  } catch (err) {
    console.error("Sanity fetch error (strategic plan):", err);
    return null;
  }
}

export async function getStudentHandbooks() {
  try {
    const query = `*[_type == "studentHandbook" && !(_id in path("drafts.**"))] | order(order asc) {
      year,
      "fileUrl": file.asset->url,
      order
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (student handbooks):", err);
    return [];
  }
}

export async function getPlacementSections() {
  try {
    const query = `*[_type == "placementSection" && !(_id in path("drafts.**"))] {
      id,
      title,
      content
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (placementSection):", err);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FACULTY PROFILE FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns minimal data for all published faculty profiles.
 * Used to build the name → slug mapping for "View Profile" links in the roster.
 */
export async function getAllFacultyProfiles() {
  try {
    const query = `*[_type == "facultyProfileNew" && showOnWebsite == true && !(_id in path("drafts.**"))] | order(sNo asc) {
      "facultyName": facultyName,
      "slug": slug.current,
      designation,
      department,
      "profilePhotoUrl": profilePhoto.asset->url,
      featuredFaculty,
      sNo
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (getAllFacultyProfiles):", err);
    return [];
  }
}

/**
 * Returns the full profile for a single faculty member by slug.
 * Used by the individual profile page /faculty/profile/[slug].
 */
export const getFacultyProfile = cache(async (slug: string) => {
  try {
    const query = `*[_type == "facultyProfileNew" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      facultyName,
      "slug": slug.current,
      "profilePhotoUrl": profilePhoto.asset->url,
      designation,
      department,
      facultyId,
      gender,
      dateOfBirth,
      dateOfJoining,
      employmentType,
      officialEmail,
      contactNumber,
      officeLocation,
      facultyStatus,
      highestQualification,
      qualifications,
      totalExperience,
      teachingExperience,
      industryExperience,
      professionalExperience,
      shortBio,
      careerObjective,
      teachingPhilosophy,
      areaOfExpertise,
      languagesKnown,
      subjectsHandled,
      researchAreas,
      researchInterests,
      ongoingProjects,
      completedProjects,
      publications[] {
        publicationTitle,
        journalName,
        publicationType,
        authors,
        year,
        volumeIssuePages,
        doiLink,
        indexing,
        "publicationPdfUrl": publicationPdf.asset->url
      },
      booksPublished,
      patents,
      conferencesAttended[] {
        eventTitle,
        organizedBy,
        location,
        fromDate,
        toDate,
        "certificateUrl": certificate.asset->url
      },
      seminarsAttended[] {
        eventTitle,
        organizedBy,
        location,
        fromDate,
        toDate,
        "certificateUrl": certificate.asset->url
      },
      fdpsAttended[] {
        eventTitle,
        organizedBy,
        location,
        fromDate,
        toDate,
        "certificateUrl": certificate.asset->url
      },
      workshopsAttended[] {
        eventTitle,
        organizedBy,
        location,
        fromDate,
        toDate,
        "certificateUrl": certificate.asset->url
      },
      awards[] {
        awardTitle,
        awardedBy,
        awardYear,
        description,
        "certificateUrl": certificate.asset->url
      },
      currentAdministrativeRole,
      departmentResponsibilities,
      committeeMemberships,
      projectsGuided,
      researchScholars,
      professionalMemberships,
      linkedinUrl,
      googleScholarUrl,
      orcidId,
      scopusId,
      researchGateUrl,
      personalWebsite,
      "cvPdfUrl": cvPdf.asset->url,
      "facultyProfilePdfUrl": facultyProfilePdf.asset->url,
      certificates[] {
        description,
        "fileUrl": asset->url
      },
      metaTitle,
      metaDescription,
      metaKeywords,
      imageAltText,
      displayOrder,
      featuredFaculty,
      showOnWebsite
    }`;
    const data = await sanityClient.fetch(query, { slug });
    return data || null;
  } catch (err) {
    console.error("Sanity fetch error (getFacultyProfile):", err);
    return null;
  }
});

/**
 * Returns all faculty PDF documents (e.g. FDP and Seminars PDFs) sorted by displayOrder.
 */
export async function getFacultyPdfDocuments() {
  try {
    const query = `*[_type == "facultyPdfDocument" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
      _id,
      title,
      category,
      "pdfUrl": pdfFile.asset->url,
      displayOrder
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (getFacultyPdfDocuments):", err);
    return [];
  }
}

export async function getNaacPeerTeam() {
  try {
    const data = await sanityClient.fetch(`*[_type == "naacPeerTeam" && !(_id in path("drafts.**"))][0] {
      title,
      description,
      "certificatePdfUrl": certificatePdf.asset->url,
      "certificateImageUrl": certificateImage.asset->url,
      gallery[] {
        "url": asset->url,
        caption
      },
      videos[] {
        title,
        "videoFileUrl": videoFile.asset->url,
        videoUrl
      }
    }`);
    return data || null;
  } catch (err) {
    console.error("Sanity fetch error (getNaacPeerTeam):", err);
    return null;
  }
}

export async function getStudentSupportImages(category: string) {
  try {
    const query = `*[_type == "studentSupportImages" && category == $category && !(_id in path("drafts.**"))][0] {
      category,
      images[] {
        "url": asset->url,
        caption
      }
    }`;
    const data = await sanityClient.fetch(query, { category });
    return data || null;
  } catch (err) {
    console.error(`Sanity fetch error (getStudentSupportImages) for ${category}:`, err);
    return null;
  }
}

export async function getPlacementsImages(category: string) {
  try {
    const query = `*[_type == "placementsImages" && category == $category && !(_id in path("drafts.**"))][0] {
      category,
      images[] {
        "url": asset->url,
        caption
      }
    }`;
    const data = await sanityClient.fetch(query, { category });
    return data || null;
  } catch (err) {
    console.error(`Sanity fetch error (getPlacementsImages) for ${category}:`, err);
    return null;
  }
}

export async function getPlacementsData(slug: string) {
  try {
    const query = `*[_type == "placements" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      title,
      "slug": slug.current,
      "policyUrl": policy.asset->url,
      annualReports[] {
        year,
        "fileUrl": file.asset->url
      },
      "cellConstitutionOrderUrl": cellConstitutionOrder.asset->url,
      workshopReports[] {
        description,
        "fileUrl": file.asset->url
      },
      awarenessReports[] {
        description,
        "fileUrl": file.asset->url
      },
      skillDevelopmentReports[] {
        description,
        "fileUrl": file.asset->url
      },
      startupActivities[] {
        description,
        "fileUrl": file.asset->url
      },
      certificateReports[] {
        description,
        "fileUrl": file.asset->url
      },
      mouAgreements[] {
        academicYear,
        mous[] {
          sNo,
          department,
          organization,
          yearOfSigning,
          duration,
          purpose,
          years,
          "fileUrl": file.asset->url
        }
      },
      mouActivities[] {
        academicYear,
        activities[] {
          sNo,
          department,
          organization,
          yearOfSigning,
          duration,
          purpose,
          years,
          "fileUrl": file.asset->url
        }
      }
    }`;
    const data = await sanityClient.fetch(query, { slug });
    return data || null;
  } catch (err) {
    console.error(`Sanity fetch error (getPlacementsData) for ${slug}:`, err);
    return null;
  }
}

export async function getAlumniGallery() {
  try {
    const query = `*[_type == "alumniGallery" && !(_id in path("drafts.**"))] | order(order asc) {
      _id,
      folderName,
      "slug": slug.current,
      order,
      images[] {
        "url": asset->url,
        caption
      }
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (getAlumniGallery):", err);
    return [];
  }
}

export async function getResearchPublications() {
  try {
    const query = `*[_type == "researchPublications" && !(_id in path("drafts.**"))][0] {
      title,
      description,
      documents[] {
        title,
        category,
        "fileUrl": file.asset->url
      }
    }`;
    const data = await sanityClient.fetch(query);
    return data || null;
  } catch (err) {
    console.error("Sanity fetch error (getResearchPublications):", err);
    return null;
  }
}

export async function getResearchSection(slug: string) {
  try {
    const query = `*[_type == "researchSection" && sectionSlug == $slug && !(_id in path("drafts.**"))][0] {
      title,
      sectionSlug,
      description,
      content,
      documents[] {
        title,
        "fileUrl": file.asset->url
      }
    }`;
    const data = await sanityClient.fetch(query, { slug });
    return data || null;
  } catch (err) {
    console.error(`Sanity fetch error (getResearchSection) for ${slug}:`, err);
    return null;
  }
}

export async function getStudentSupportDocuments(sectionSlug: string) {
  try {
    const query = `*[_type == "studentSupport" && section == $sectionSlug && !(_id in path("drafts.**"))][0] {
      "policyUrl": policy.asset->url,
      reports[] {
        title,
        academicYear,
        "fileUrl": file.asset->url
      }
    }`;
    const data = await sanityClient.fetch(query, { sectionSlug });
    return data || null;
  } catch (err) {
    console.error(`Sanity fetch error (getStudentSupportDocuments) for ${sectionSlug}:`, err);
    return null;
  }
}

export async function getUniversityRankHolders() {
  try {
    const query = `*[_type == "universityRankHolder" && !(_id in path("drafts.**"))] | order(academicYear desc, displayOrder asc) {
      _id,
      academicYear,
      programme,
      studentName,
      achievement,
      displayOrder
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (getUniversityRankHolders):", err);
    return [];
  }
}

export async function getPlacementYearlyStats() {
  try {
    const query = `*[_type == "placementYearlyStats" && !(_id in path("drafts.**"))] | order(academicYear desc) {
      _id,
      academicYear,
      outgoingOverview,
      packages,
      programmePlacements,
      higherEducation,
      internships
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (err) {
    console.error("Sanity fetch error (getPlacementYearlyStats):", err);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE QUERY FUNCTIONS (Magazines, Newsletters, Banners, Gallery)
// ─────────────────────────────────────────────────────────────────────────────

export async function getCollegeMagazines() {
  try {
    const query = `*[_type == "collegeMagazine" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
      _id,
      title,
      academicYear,
      displayOrder,
      "pdfUrl": pdfFile.asset->url,
      "coverUrl": coverImage.asset->url
    }`;
    const data = await sanityClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (getCollegeMagazines):", err);
  }
  return [];
}

export async function getNewsletters() {
  try {
    const query = `*[_type == "newsletter" && !(_id in path("drafts.**"))] | order(academicYear desc, displayOrder asc) {
      _id,
      title,
      academicYear,
      month,
      displayOrder,
      "pdfUrl": pdfFile.asset->url
    }`;
    const data = await sanityClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (getNewsletters):", err);
  }
  return [];
}

export async function getHomeBanners() {
  try {
    const query = `*[_type == "homeBanner" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
      _id,
      title,
      displayOrder,
      "linkUrl": coalesce(linkUrl, cta1Link, null),
      "imageUrl": image.asset->url,
      "assetId": image.asset._ref
    }`;
    const data = await sanityClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (getHomeBanners):", err);
  }
  return [];
}

export async function getHomeGalleries() {
  try {
    const query = `*[_type == "homeGallery" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
      _id,
      title,
      academicYear,
      category,
      displayOrder,
      images[] {
        caption,
        "imageUrl": asset->url
      }
    }`;
    const data = await sanityClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (getHomeGalleries):", err);
  }
  return [];
}

export async function getRtiDocuments() {
  try {
    const query = `*[_type == "rtiDocument" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
      _id,
      title,
      tag,
      badge,
      description,
      displayOrder,
      "fileUrl": file.asset->url
    }`;
    const data = await sanityClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error("Sanity fetch error (getRtiDocuments):", err);
  }
  return [
    {
      id: "rti-act-2005",
      title: "Official Gazette / Government Notification – Right to Information Act, 2005",
      tag: "STATUTORY ACT",
      badge: "ACT NO. 22 OF 2005",
      description: "The complete Right to Information Act, 2005 enacted by the Parliament of India, setting out the practical regime of right to information for citizens to secure access to information under the control of public authorities.",
      fileUrl: "https://cdn.sanity.io/files/fhjwqub5/production/32a3d5b540315384535c90682d86a0b23c71d808.pdf"
    },
    {
      id: "rti-office-order",
      title: "RTI Committee / Authority Constitution Order",
      tag: "INSTITUTIONAL ORDER",
      badge: "OFFICE ORDER",
      description: "Official administrative office order of St. Ann's College for Women designating the First Appellate Authority, Public Information Officer (PIO), and Assistant PIO to ensure adherence to statutory disclosure standards.",
      fileUrl: "https://cdn.sanity.io/files/fhjwqub5/production/cd25e5f7d45a56b103d932b451c31b914238be8b.pdf"
    }
  ];
}

/**
 * Default fallback data matching Mandatory Disclosures Content & Data PDFs
 */
export const DEFAULT_MANDATORY_DISCLOSURES = {
  title: "Mandatory Disclosures & Compliance",
  lastUpdated: "15 September 2026",
  verifiedBy: "Principal / IQAC Coordinator",
  aicteApprovals: [
    { _key: "aicte_1", year: "2026–2027", title: "AICTE Extension of Approval (EoA) 2026-2027", fileUrl: "/documents/aicte/AICTE_Approval_2026-2027.pdf" },
    { _key: "aicte_2", year: "2025–2026", title: "AICTE Extension of Approval (EoA) 2025-2026", fileUrl: "/documents/aicte/AICTE_Approval_2025-2026.pdf" },
    { _key: "aicte_3", year: "2024–2025", title: "AICTE Extension of Approval (EoA) 2024-2025", fileUrl: "/documents/aicte/AICTE_Approval_2024-2025.pdf" },
    { _key: "aicte_4", year: "2023–2024", title: "AICTE Extension of Approval (EoA) 2023-2024", fileUrl: "/documents/aicte/AICTE_Approval_2023-2024.pdf" },
    { _key: "aicte_5", year: "2022–2023", title: "AICTE Extension of Approval (EoA) 2022-2023", fileUrl: "/documents/aicte/AICTE_Approval_2022-2023.pdf" },
    { _key: "aicte_6", year: "2021–2022", title: "AICTE Extension of Approval (EoA) 2021-2022", fileUrl: "/documents/aicte/AICTE_Approval_2021-2022.pdf" },
    { _key: "aicte_7", year: "Previous Years", title: "AICTE Approval / EoA Archive", fileUrl: "/documents/DefaultFile_1.pdf" },
  ],
  ugcDocuments: [
    { _key: "ugc_1", sNo: 1, title: "UGC Section 2(f) Recognition Order & Certificate", fileUrl: "/documents/ugc/UGC_2f_Recognition_Order.pdf" },
  ],
  cceOrders: [
    { _key: "cce_1", year: "2025–2026", title: "CCE / Collegiate Higher Education Order & Proceedings 2025-2026", fileUrl: "/documents/cce/CCE_CHE_Order_2025-2026.pdf" },
  ],
  apscheOrders: [
    { _key: "apsche_1", year: "2025–2026", title: "APSCHE Proceedings & Sanction Order 2025-2026", fileUrl: "/documents/apsche/APSCHE_Proceedings_2025-2026.pdf" },
    { _key: "apsche_2", year: "2024–2025", title: "APSCHE Proceedings & Communication 2024-2025", fileUrl: "/documents/apsche/APSCHE_Proceedings_2024-2025.pdf" },
    { _key: "apsche_3", year: "2023–2024", title: "APSCHE Proceedings & Communication 2023-2024", fileUrl: "/documents/apsche/APSCHE_Proceedings_2023-2024.pdf" },
    { _key: "apsche_4", year: "2022–2023", title: "APSCHE Proceedings & Communication 2022-2023", fileUrl: "/documents/apsche/APSCHE_Proceedings_2022-2023.pdf" },
    { _key: "apsche_5", year: "2021–2022", title: "APSCHE Proceedings & Communication 2021-2022", fileUrl: "/documents/apsche/APSCHE_Proceedings_2021-2022.pdf" },
    { _key: "apsche_6", year: "Previous Years", title: "APSCHE Orders & Communications Archive", fileUrl: "/documents/DefaultFile_1.pdf" },
  ],
  anuAffiliations: [
    { _key: "anu_ug_1", programmeType: "ug", year: "2025–2026", title: "UG Affiliation Order", fileUrl: "/documents/affiliations/ANU_UG_Affiliation_2025-2026.pdf" },
    { _key: "anu_ug_2", programmeType: "ug", year: "2024–2025", title: "UG Affiliation Order", fileUrl: "/documents/affiliations/ANU_UG_Affiliation_2024-2025.pdf" },
    { _key: "anu_ug_3", programmeType: "ug", year: "2023–2024", title: "UG Affiliation Order", fileUrl: "/documents/affiliations/ANU_UG_Affiliation_2023-2024.pdf" },
    { _key: "anu_ug_4", programmeType: "ug", year: "2022–2023", title: "UG Affiliation Order", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "anu_ug_5", programmeType: "ug", year: "2021–2022", title: "UG Affiliation Order", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "anu_ug_6", programmeType: "ug", year: "Previous Years", title: "UG Affiliation Orders Archive", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "anu_pg_1", programmeType: "pg", year: "2025–2026", title: "PG Affiliation Order", fileUrl: "/documents/affiliations/ANU_PG_Affiliation_2025-2026.pdf" },
    { _key: "anu_pg_2", programmeType: "pg", year: "2024–2025", title: "PG Affiliation Order", fileUrl: "/documents/affiliations/ANU_PG_Affiliation_2024-2025.pdf" },
    { _key: "anu_pg_3", programmeType: "pg", year: "2023–2024", title: "PG Affiliation Order", fileUrl: "/documents/affiliations/ANU_PG_Affiliation_2023-2024.pdf" },
    { _key: "anu_pg_4", programmeType: "pg", year: "2022–2023", title: "PG Affiliation Order", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "anu_pg_5", programmeType: "pg", year: "2021–2022", title: "PG Affiliation Order", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "anu_pg_6", programmeType: "pg", year: "Previous Years", title: "PG Affiliation Orders Archive", fileUrl: "/documents/DefaultFile_1.pdf" },
  ],
  aisheReports: [
    { _key: "aishe_1", sNo: 1, year: "2024–2025", title: "AISHE Certificate 2024–2025", fileUrl: "/documents/aishe/AISHE_Certificate_2024-2025.pdf" },
    { _key: "aishe_2", sNo: 2, year: "2023–2024", title: "AISHE Certificate 2023–2024", fileUrl: "/documents/aishe/AISHE_Certificate_2023-2024.pdf" },
    { _key: "aishe_3", sNo: 3, year: "2022–2023", title: "AISHE Certificate 2022–2023", fileUrl: "/documents/aishe/AISHE_Certificate_2022-2023.pdf" },
    { _key: "aishe_4", sNo: 4, year: "2021–2022", title: "AISHE Certificate 2021–2022", fileUrl: "/documents/aishe/AISHE_Certificate_2021-2022.pdf" },
    { _key: "aishe_5", sNo: 5, year: "2020–2021", title: "AISHE Certificate 2020–2021", fileUrl: "/documents/aishe/AISHE_Certificate_2020-2021.pdf" },
  ],
  nirfSubmissions: [
    { _key: "nirf_1", year: "2025–2026", collegeDataUrl: "/documents/nirf/NIRF_2025-2026_College.pdf", managementDataUrl: "/documents/nirf/NIRF_2025-2026_Management.pdf", overallDataUrl: "/documents/nirf/NIRF_2025-2026_Overall.pdf" },
    { _key: "nirf_2", year: "2024–2025", collegeDataUrl: "/documents/nirf/NIRF_2024-2025_College.pdf", managementDataUrl: "/documents/nirf/NIRF_2024-2025_Management.pdf", overallDataUrl: "/documents/nirf/NIRF_2024-2025_Overall.pdf" },
    { _key: "nirf_3", year: "2023–2024", collegeDataUrl: "/documents/nirf/NIRF_2023-2024_College.pdf", managementDataUrl: "/documents/nirf/NIRF_2023-2024_Management.pdf", overallDataUrl: "/documents/nirf/NIRF_2023-2024_Overall.pdf" },
    { _key: "nirf_4", year: "2022–2023", collegeDataUrl: "/documents/nirf/NIRF_2022-2023_College.pdf", managementDataUrl: "/documents/nirf/NIRF_2022-2023_Management.pdf", overallDataUrl: "/documents/nirf/NIRF_2022-2023_Overall.pdf" },
    { _key: "nirf_5", year: "2021–2022", collegeDataUrl: "/documents/nirf/NIRF_2021-2022_College.pdf", managementDataUrl: "/documents/nirf/NIRF_2021-2022_Management.pdf", overallDataUrl: "/documents/nirf/NIRF_2021-2022_Overall.pdf" },
  ],
  regulatoryComplianceDocs: [
    { _key: "reg_aicte", code: "aicte", title: "AICTE Compliance", description: "Relevant compliance information and documents relating to AICTE requirements are provided wherever applicable.", fileUrl: "/documents/aicte/AICTE_Approval_2026-2027.pdf" },
    { _key: "reg_ugc", code: "ugc", title: "UGC Compliance", description: "Applicable UGC regulations, guidelines, declarations and compliance-related information are maintained and made available for reference.", fileUrl: "/documents/ugc/UGC_2f_Recognition_Order.pdf" },
    { _key: "reg_apsche", code: "apsche", title: "APSCHE Compliance", description: "Relevant APSCHE-related compliance information, orders and institutional submissions are provided as applicable.", fileUrl: "/documents/apsche/APSCHE_Proceedings_2025-2026.pdf" },
    { _key: "reg_other", code: "other", title: "Other Statutory / Regulatory Compliance", description: "Other compliance documents, declarations and information required by competent government, statutory and regulatory authorities are provided wherever applicable.", fileUrl: "/documents/DefaultFile_1.pdf" },
  ],
  financialDocuments: [
    { _key: "fin_budget", code: "budget", title: "Annual Budget", description: "The annual budget reflects the institution's financial planning and allocation of resources towards academic, administrative, infrastructure, student welfare and other institutional activities.", fileUrl: "/documents/policies/Annual_Budget.pdf" },
    { _key: "fin_audit", code: "audit", title: "Audited Financial Statements", description: "Audited financial statements and relevant financial records are maintained in accordance with applicable accounting and statutory requirements.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_income", code: "income", title: "Financial Resources / Sources of Income", description: "Relevant information regarding the institution's financial resources and applicable sources of income is maintained and disclosed wherever required.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_corpus", code: "corpus", title: "Endowment & Corpus Funds", description: "Details relating to endowment and corpus funds, wherever applicable, are maintained in accordance with institutional financial procedures.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_utilization", code: "utilization", title: "Utilization Certificates", description: "Relevant Utilization Certificates relating to grants or funds received from competent authorities are maintained and provided wherever applicable.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_policy", code: "finance_policy", title: "Finance Policy", description: "The institution follows appropriate financial procedures relating to budgeting, expenditure, accounting, financial control and resource management.", fileUrl: "/documents/policies/Financial_Management_Policy.pdf" },
    { _key: "fin_procurement", code: "procurement", title: "Purchase & Procurement Policy", description: "The institution follows transparent and appropriate procedures for the purchase and procurement of goods, services, equipment and other institutional requirements.", fileUrl: "/documents/policies/Purchase_Procurement_Policy_SOP.pdf" },
    { _key: "fin_infra", code: "infrastructure_policy", title: "Infrastructure Development and Augmentation Policy", description: "Policy framework governing institutional infrastructure planning, development, physical expansion, modernization, and resource augmentation.", fileUrl: "/documents/policies/Infrastructure_Development_Augmentation_Policy.pdf" },
    { _key: "fin_fee", code: "fee_structure", title: "Approved Fee Structure", description: "Applicable approved fee structures provided for the information of students and stakeholders.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_afrc", code: "afrc_orders", title: "AFRC Orders", description: "Relevant AFRC orders and governmental regulatory fee notifications.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_scholarship", code: "scholarship", title: "Scholarship Details", description: "Information regarding scholarships, fee reimbursement, financial assistance and student support schemes available through Government and statutory bodies.", fileUrl: "/documents/DefaultFile_1.pdf" },
  ],
  annualReports: [
    { _key: "ar_1", year: "2025–2026", title: "Annual Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "ar_2", year: "2024–2025", title: "Annual Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "ar_3", year: "2023–2024", title: "Annual Report 2023–2024", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "ar_4", year: "2022–2023", title: "Annual Report 2022–2023", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "ar_5", year: "2021–2022", title: "Annual Report 2021–2022", fileUrl: "/documents/DefaultFile_1.pdf" },
  ],
  disclosureArchives: [
    { _key: "arc_1", year: "2025–2026", mandatoryDisclosuresUrl: "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "arc_2", year: "2024–2025", mandatoryDisclosuresUrl: "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "arc_3", year: "2023–2024", mandatoryDisclosuresUrl: "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "arc_4", year: "2022–2023", mandatoryDisclosuresUrl: "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "arc_5", year: "2021–2022", mandatoryDisclosuresUrl: "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: "/documents/DefaultFile_1.pdf" },
  ],
  rtiMembers: [
    { _key: "rti_1", sNo: 1, name: "Dr. Sr. Fatima Rani P", designation: "Correspondent", role: "Chairperson / First Appellate Authority", mobile: "8978012987" },
    { _key: "rti_2", sNo: 2, name: "Sr. Sandhya Thumma", designation: "Principal", role: "Member", mobile: "9347238194" },
    { _key: "rti_3", sNo: 3, name: "Mr. G. Bala Show Reddy", designation: "Physical Director", role: "Nodal Officer / Public Information Officer (PIO)", mobile: "9959085038" },
    { _key: "rti_4", sNo: 4, name: "Mrs. R. Sharon Rose", designation: "Vice Principal & IQAC Coordinator", role: "Member", mobile: "9948686170" },
    { _key: "rti_5", sNo: 5, name: "Sr. Margaret Priyanka", designation: "Administrator", role: "Member / Asst. Public Information Officer (PIO)", mobile: "7981468359" },
  ],
  rtiDocuments: [
    { _key: "rti_doc_1", title: "Official Gazette / Government Notification – Right to Information Act, 2005", description: "The complete Right to Information Act, 2005 enacted by the Parliament of India, setting out the practical regime of right to information for citizens to secure access to information under the control of public authorities.", fileUrl: "https://cdn.sanity.io/files/fhjwqub5/production/32a3d5b540315384535c90682d86a0b23c71d808.pdf" },
    { _key: "rti_doc_2", title: "RTI Committee / Authority Constitution Order", description: "Official administrative office order of St. Ann's College for Women designating the First Appellate Authority, Public Information Officer (PIO), and Assistant PIO to ensure adherence to statutory disclosure standards.", fileUrl: "https://cdn.sanity.io/files/fhjwqub5/production/cd25e5f7d45a56b103d932b451c31b914238be8b.pdf" },
  ]
};

export async function getMandatoryDisclosures() {
  try {
    const query = `*[_type == "mandatoryDisclosures" && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      lastUpdated,
      verifiedBy,
      aicteApprovals[] {
        _key,
        year,
        title,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      ugcDocuments[] {
        _key,
        sNo,
        title,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      cceOrders[] {
        _key,
        year,
        title,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      apscheOrders[] {
        _key,
        year,
        title,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      anuAffiliations[] {
        _key,
        programmeType,
        year,
        title,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      aisheReports[] {
        _key,
        sNo,
        year,
        title,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      nirfSubmissions[] {
        _key,
        year,
        collegeDataUrl,
        managementDataUrl,
        overallDataUrl
      },
      regulatoryComplianceDocs[] {
        _key,
        code,
        title,
        description,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      financialDocuments[] {
        _key,
        code,
        title,
        description,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      annualReports[] {
        _key,
        year,
        title,
        "fileUrl": coalesce(file.asset->url, fileUrl)
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
        "fileUrl": coalesce(file.asset->url, fileUrl)
      }
    }`;
    const data = await sanityClient.fetch(query);
    if (data) {
      return {
        ...DEFAULT_MANDATORY_DISCLOSURES,
        ...data,
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
      };
    }
  } catch (err) {
    console.error("Sanity fetch error (getMandatoryDisclosures):", err);
  }
  return DEFAULT_MANDATORY_DISCLOSURES;
}
