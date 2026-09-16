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
  mandatoryDisclosureDocs: [
    { _key: "md_1", sNo: 1, title: "Mandatory Disclosure", description: "Official prescribed mandatory institutional disclosure", fileUrl: "/documents/DefaultFile_1.pdf", redirectUrl: "" },
    { _key: "md_2", sNo: 2, title: "Institutional Profile", description: "Comprehensive profile, history, and statutory status of the institution", fileUrl: "/documents/DefaultFile_1.pdf", redirectUrl: "" },
    { _key: "md_3", sNo: 3, title: "Programme Details", description: "Academic programmes, curriculum, and course structures", fileUrl: "/documents/DefaultFile_1.pdf", redirectUrl: "" },
    { _key: "md_4", sNo: 4, title: "Approved Intake / Sanctioned Strength", description: "Statutory approved intake capacity and student strength", fileUrl: "/documents/DefaultFile_1.pdf", redirectUrl: "" },
    { _key: "md_5", sNo: 5, title: "Faculty and Infrastructure Details", description: "Faculty directory, campus infrastructure, and laboratory facilities", fileUrl: "/documents/DefaultFile_1.pdf", redirectUrl: "" },
  ],
  institutionalProfile: {
    title: "2. Institutional Profile & Programme Details",
    subtitle: "Academic programmes, duration, eligibility, and sanctioned intake",
    description: "This section provides comprehensive information about the institution and its academic programmes, including programme names, duration, eligibility, sanctioned intake and other relevant academic particulars.",
    programmesBtnLabel: "View All Academic Programmes",
    programmesLink: "/courses",
    sanctionedOrderBtnLabel: "Sanctioned Strength Order (PDF)",
    sanctionedOrderFileUrl: "/documents/DefaultFile_1.pdf",
  },
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
    { _key: "fin_budget", sNo: 1, code: "budget", title: "Annual Budget", btnLabel: "Annual Budget", description: "The annual budget reflects the institution's financial planning and allocation of resources towards academic, administrative, infrastructure, student welfare and other institutional activities.", fileUrl: "/documents/policies/Annual_Budget.pdf" },
    { _key: "fin_audit", sNo: 2, code: "audit", title: "Audited Financial Statements", btnLabel: "Audited Financial Statements", description: "Audited financial statements and relevant financial records are maintained in accordance with applicable accounting and statutory requirements.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_income", sNo: 3, code: "income", title: "Financial Resources / Sources of Income", btnLabel: "Financial Resources", description: "Relevant information regarding the institution's financial resources and applicable sources of income is maintained and disclosed wherever required.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_corpus", sNo: 4, code: "corpus", title: "Endowment & Corpus Funds", btnLabel: "Endowment & Corpus Funds", description: "Details relating to endowment and corpus funds, wherever applicable, are maintained in accordance with institutional financial procedures.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_utilization", sNo: 5, code: "utilization", title: "Utilization Certificates", btnLabel: "Utilization Certificates", description: "Relevant Utilization Certificates relating to grants or funds received from competent authorities are maintained and provided wherever applicable.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_policy", sNo: 6, code: "finance_policy", title: "Finance Policy", btnLabel: "Finance Policy", description: "The institution follows appropriate financial procedures relating to budgeting, expenditure, accounting, financial control and resource management.", fileUrl: "/documents/policies/Financial_Management_Policy.pdf" },
    { _key: "fin_procurement", sNo: 7, code: "procurement", title: "Purchase & Procurement Policy", btnLabel: "Purchase & Procurement Policy", description: "The institution follows transparent and appropriate procedures for the purchase and procurement of goods, services, equipment and other institutional requirements.", fileUrl: "/documents/policies/Purchase_Procurement_Policy_SOP.pdf" },
    { _key: "fin_infra", sNo: 8, code: "infrastructure_policy", title: "Infrastructure Development and Augmentation Policy", btnLabel: "Infrastructure Policy", description: "Policy framework governing institutional infrastructure planning, development, physical expansion, modernization, and resource augmentation.", fileUrl: "/documents/policies/Infrastructure_Development_Augmentation_Policy.pdf" },
    { _key: "fin_fee", sNo: 9, code: "fee_structure", title: "Approved Fee Structure", btnLabel: "Fee Structure", description: "Applicable approved fee structures provided for the information of students and stakeholders.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_afrc", sNo: 10, code: "afrc_orders", title: "AFRC Orders", btnLabel: "AFRC Orders", description: "Relevant AFRC orders and governmental regulatory fee notifications.", fileUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "fin_scholarship", sNo: 11, code: "scholarship", title: "Scholarship Details", btnLabel: "Scholarship Details", description: "Information regarding scholarships, fee reimbursement, financial assistance and student support schemes available through Government and statutory bodies.", fileUrl: "/documents/DefaultFile_1.pdf" },
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
  ],
  studentWelfareCards: [
    { _key: "swc_1", title: "Anti-Ragging Policy & Committee", href: "/student-support/anti-ragging-cell", description: "Proactive campus measures, anti-ragging squad, undertaking forms, and emergency reporting cell.", fileUrl: "" },
    { _key: "swc_2", title: "Grievance Redressal Cell", href: "/student-support/grievance-redressal-cell", description: "Statutory student mechanism for lodging and addressing academic and non-academic grievances.", fileUrl: "" },
    { _key: "swc_3", title: "Internal Complaints Committee (ICC)", href: "/student-support/internal-complaints-committee", description: "Statutory mechanism as per POSH Act, 2013 ensuring a safe, respectful environment.", fileUrl: "" },
    { _key: "swc_4", title: "Women Empowerment & Safety", href: "/student-support/women-empowerment-cell", description: "Dedicated cell fostering female leadership, safety guidelines, and gender sensitization programmes.", fileUrl: "" },
    { _key: "swc_5", title: "Student Counselling & Support", href: "/student-support/counseling-centre", description: "Professional psychological, emotional, and academic counselling support for all students.", fileUrl: "" },
    { _key: "swc_6", title: "EOC / SC / ST / Minority Cell", href: "/student-support/sc-st-minority-cell", description: "Ensuring social equity, statutory scholarships, and institutional assistance for underprivileged groups.", fileUrl: "" },
  ],
  governanceCards: [
    { _key: "gov_1", title: "Governance Structure & Organogram", href: "/about/governance-administration", description: "Comprehensive administrative organogram, leadership hierarchy, and academic council frameworks.", fileUrl: "" },
    { _key: "gov_2", title: "Institutional Policies Compendium", href: "/about/policies", description: "Official compendium of institutional statutes, operational procedures, and governance mandates.", fileUrl: "" },
    { _key: "gov_3", title: "Code of Conduct & Ethics", href: "/about/code-of-conduct", description: "Professional, student, and faculty ethical standards, code of conduct, and disciplinary policies.", fileUrl: "" },
    { _key: "gov_4", title: "Administrative & Service Policies", href: "/about/service-rules", description: "Staff service rules, administrative welfare policies, recruitment regulations, and service norms.", fileUrl: "" },
    { _key: "gov_5", title: "Academic Policies & Regulations", href: "/academics/academic-regulations", description: "CBCS examination regulations, curriculum guidelines, attendance standards, and academic credits.", fileUrl: "" },
    { _key: "gov_6", title: "Student Charter & Conduct Policies", href: "/student-support/student-charter", description: "Institutional commitments, student privileges, responsibilities, and code of citizenship.", fileUrl: "" },
  ],
  dataStatsCards: [
    { _key: "ds_1", title: "Students Enrolment & Demographic Profile", href: "/academics/programmes", description: "Detailed intake capacity, current student strength, demographic diversity, and gender ratio data.", fileUrl: "" },
    { _key: "ds_2", title: "Examination Results & Academic Performance", href: "/academics/academic-calendar", description: "Pass percentages, university gold medallists, merit ranks, and progression statistics.", fileUrl: "" },
  ]
};

export async function getMandatoryDisclosures() {
  try {
    const query = `*[_type == "mandatoryDisclosures" && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      lastUpdated,
      verifiedBy,
      mandatoryDisclosureDocs[] {
        _key,
        sNo,
        title,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      institutionalProfile {
        title,
        subtitle,
        description,
        programmesBtnLabel,
        programmesLink,
        sanctionedOrderBtnLabel,
        "sanctionedOrderFileUrl": coalesce(sanctionedOrderFile.asset->url, sanctionedOrderFileUrl)
      },
      aicteApprovals[] {
        _key,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      ugcDocuments[] {
        _key,
        sNo,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      cceOrders[] {
        _key,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      apscheOrders[] {
        _key,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      anuAffiliations[] {
        _key,
        programmeType,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      aisheReports[] {
        _key,
        sNo,
        year,
        title,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      nirfSubmissions[] {
        _key,
        year,
        collegeDataUrl,
        collegeRedirectUrl,
        managementDataUrl,
        managementRedirectUrl,
        overallDataUrl,
        overallRedirectUrl
      },
      regulatoryComplianceDocs[] {
        _key,
        code,
        title,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      financialDocuments[] {
        _key,
        sNo,
        code,
        title,
        description,
        redirectUrl,
        btnLabel,
        "fileUrl": coalesce(file.asset->url, fileUrl),
        secondBtnLabel,
        "secondFileUrl": coalesce(secondFile.asset->url, secondFileUrl)
      },
      annualReports[] {
        _key,
        year,
        title,
        redirectUrl,
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
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      studentWelfareCards[] {
        _key,
        title,
        href,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      governanceCards[] {
        _key,
        title,
        href,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      dataStatsCards[] {
        _key,
        title,
        href,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      }
    }`;
    const data = await sanityClient.fetch(query);
    if (data) {
      return {
        ...DEFAULT_MANDATORY_DISCLOSURES,
        ...data,
        mandatoryDisclosureDocs: data.mandatoryDisclosureDocs?.length ? data.mandatoryDisclosureDocs : DEFAULT_MANDATORY_DISCLOSURES.mandatoryDisclosureDocs,
        institutionalProfile: data.institutionalProfile || DEFAULT_MANDATORY_DISCLOSURES.institutionalProfile,
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
        studentWelfareCards: data.studentWelfareCards?.length ? data.studentWelfareCards : (DEFAULT_MANDATORY_DISCLOSURES as any).studentWelfareCards,
        governanceCards: data.governanceCards?.length ? data.governanceCards : (DEFAULT_MANDATORY_DISCLOSURES as any).governanceCards,
        dataStatsCards: data.dataStatsCards?.length ? data.dataStatsCards : (DEFAULT_MANDATORY_DISCLOSURES as any).dataStatsCards,
      };
    }
    return DEFAULT_MANDATORY_DISCLOSURES;
  } catch (err) {
    console.error("Sanity fetch error (getMandatoryDisclosures):", err);
    return DEFAULT_MANDATORY_DISCLOSURES;
  }
}

/**
 * ============================================================================
 * ALUMNI MODULE SCHEMA & DEFAULT VALUES (Matching 10.Alumni (13-09-2026).docx)
 * ============================================================================
 */
export const DEFAULT_ALUMNI_DATA = {
  title: "Alumni Engagement & Network",
  lastUpdated: "16 September 2026",
  googleFormUrl: "https://forms.gle/7QMzJvrAsYVT3YZd7",
  registrationDetails: {
    societyName: "St. Ann's College for Women Alumni Association",
    actName: "Andhra Pradesh Societies Registration Act, 2001",
    registrationNo: "307 of 2022",
    registrationDate: "18 September 2022",
  },
  committeeMembers: [
    { _key: "cm_1", sNo: 1, name: "Dr. Sr. Sandhya Thumma", designation: "Principal, Department of MBA", role: "Chairperson" },
    { _key: "cm_2", sNo: 2, name: "Mrs. R. Sharon Rose", designation: "IQAC Coordinator, Department of Commerce", role: "Member" },
    { _key: "cm_3", sNo: 3, name: "Mrs. G. Saroja", designation: "Department of Commerce", role: "Convener" },
    { _key: "cm_4", sNo: 4, name: "Mrs. D. V. Ramanamma", designation: "President, Alumni Association", role: "Co-Convener" },
    { _key: "cm_5", sNo: 5, name: "Mrs. B. Manasa", designation: "Secretary, Alumni Association", role: "Member" },
    { _key: "cm_6", sNo: 6, name: "Mrs. L. Mary Anusha", designation: "Treasurer, Alumni Association", role: "Member" },
    { _key: "cm_7", sNo: 7, name: "Miss G. Santha Kumari", designation: "Joint Secretary, Alumni Association", role: "Member" },
    { _key: "cm_8", sNo: 8, name: "Mrs. J. Sirisha", designation: "Faculty Representative – Alumni", role: "Member" },
    { _key: "cm_9", sNo: 9, name: "Miss V. Deepika", designation: "Faculty Representative – Alumni", role: "Member" },
    { _key: "cm_10", sNo: 10, name: "Miss A. Sarala", designation: "Faculty Representative – Alumni", role: "Member" },
    { _key: "cm_11", sNo: 11, name: "Student Representative", designation: "Student Representative", role: "Member" },
  ],
  committeeReports: [
    { _key: "cr_1", year: "2025–2026", title: "Annual Alumni Committee Report 2025–2026", fileUrl: "/documents/alumni/Alumni_Annual_Report_2025-2026.pdf" },
    { _key: "cr_2", year: "2024–2025", title: "Annual Alumni Committee Report 2024–2025", fileUrl: "/documents/alumni/Alumni_Annual_Report_2024-2025.pdf" },
    { _key: "cr_3", year: "2023–2024", title: "Annual Alumni Committee Report 2023–2024", fileUrl: "/documents/alumni/Alumni_Annual_Report_2022-2023.pdf" },
  ],
  associationOfficeBearers: [
    { _key: "ob_1", sNo: 1, name: "Mrs. Venkata Ramana Matte", designation: "President", occupation: "Lecturer" },
    { _key: "ob_2", sNo: 2, name: "Mrs. Vani Gundabommu", designation: "Member", occupation: "Lecturer" },
    { _key: "ob_3", sNo: 3, name: "Mrs. Santha Kumari Gangula", designation: "Secretary", occupation: "Lecturer" },
    { _key: "ob_4", sNo: 4, name: "Mrs. Mary Anusha Lingareddy", designation: "Joint Secretary", occupation: "Lecturer" },
    { _key: "ob_5", sNo: 5, name: "Mrs. Naga Ramya Sindhu Pochiraju", designation: "Treasurer", occupation: "Banker" },
    { _key: "ob_6", sNo: 6, name: "Mrs. Anusha Dev Thotakura", designation: "Executive Member", occupation: "Faculty" },
    { _key: "ob_7", sNo: 7, name: "Sr. Jancy Edakkalathur", designation: "Vice President", occupation: "Teacher" },
  ],
  statutoryDocuments: [
    { _key: "sd_1", sNo: 1, documentTitle: "Society Registration Certificate", description: "Official Registration Certificate under AP Societies Registration Act, 2001 (Reg. No. 307 of 2022)", fileUrl: "/documents/alumni/Alumni_Registration_Certificate.pdf" },
    { _key: "sd_2", sNo: 2, documentTitle: "Memorandum / Bye-Laws", description: "Constitution, aims, objectives and governing bylaws of the Alumni Association", fileUrl: "/documents/alumni/Alumni_MOU_Bylaws.pdf" },
    { _key: "sd_3", sNo: 3, documentTitle: "Renewal Certificates (Year Wise)", description: "Society renewal certificate and proceedings for statutory compliance", fileUrl: "/documents/alumni/Alumni_Society_RC_2025.pdf" },
    { _key: "sd_4", sNo: 4, documentTitle: "PAN Card", description: "Permanent Account Number of St. Ann's College for Women Alumni Association", fileUrl: "/documents/alumni/Alumni_PAN.pdf" },
    { _key: "sd_5", sNo: 5, documentTitle: "Other Relevant Statutory Documents", description: "Consolidated statutory filings, bank declarations, and official proceedings", fileUrl: "/documents/alumni/Alumni_Other_Statutory_Documents.pdf" },
  ],
  contributionsRegister: [
    {
      _key: "contrib_1",
      sNo: 1,
      date: "14-08-2026",
      alumniName: "Mrs. Sowjanya Bindu Katari",
      programmeBatch: "I Year & II Year UG",
      activity: "Legal Awareness and Interactive Session organized by the Anti-Ragging Committee",
      natureOfSupport: "Professional Guidance & Legal Awareness",
      beneficiaries: "423",
      fileUrl: "/documents/alumni/Alumni_Legal_Awareness_14-08-2026.pdf",
    },
    {
      _key: "contrib_2",
      sNo: 2,
      date: "25-08-2026",
      alumniName: "Sr. Sowjanya Kumari Mandala",
      programmeBatch: "II Year UG & PG",
      activity: "“Empowering Young Minds: Life Skills for Personal & Professional Excellence” organized by the Student Counselling Committee",
      natureOfSupport: "Mentoring & Guidance",
      beneficiaries: "296",
      fileUrl: "/documents/alumni/Alumni_Student_Counselling_25-08-2026.pdf",
    },
    {
      _key: "contrib_3",
      sNo: 3,
      date: "09–10-09-2026",
      alumniName: "Ms. I. Rani",
      programmeBatch: "UG & PG",
      activity: "Two-Day Skill Development & Career Readiness Workshop – “Empowering Her: Grooming, Confidence & Entrepreneurial Skills” organized by the Women Empowerment Cell (WEC)",
      natureOfSupport: "Skill Development & Career Guidance",
      beneficiaries: "105",
      fileUrl: "/documents/alumni/Alumni_WEC_Workshop_09-09-2026.pdf",
    },
  ],
  prideAlumni: [
    {
      _key: "pride_1",
      name: "Mrs. Sowjanya Bindu Katari",
      programmeBatch: "B.Com – 2004–2007",
      designation: "Advocate & Legal Consultant",
      organization: "High Court of AP",
      achievement: "Distinguished legal practitioner conducting state-wide legal awareness & student rights workshops.",
      photoUrl: "",
    },
    {
      _key: "pride_2",
      name: "Sr. Sowjanya Kumari Mandala",
      programmeBatch: "B.Sc – 2006–2009",
      designation: "Senior Counselor & Life Coach",
      organization: "Institutional Student Welfare",
      achievement: "Empowering young women through professional mental health advocacy and motivational leadership.",
      photoUrl: "",
    },
    {
      _key: "pride_3",
      name: "Ms. I. Rani",
      programmeBatch: "MBA – 2012–2014",
      designation: "Entrepreneur & Corporate Trainer",
      organization: "SkillEdge Solutions",
      achievement: "Founder of women-led skill development venture training 10,000+ graduates across AP.",
      photoUrl: "",
    },
  ],
  testimonials: [
    {
      _key: "test_1",
      title: "1. A Foundation for My Career",
      quote: "My journey at St. Ann’s College for Women was a beautiful combination of learning, friendship and personal growth. The academic knowledge, discipline and confidence I gained here gave me a strong foundation for my career. I will always be grateful to my teachers for their guidance and encouragement.",
      alumnaName: "Pravlika",
      programmeBatch: "B.Com | 2005–2008",
    },
    {
      _key: "test_2",
      title: "2. Learning Beyond the Classroom",
      quote: "St. Ann’s taught me that education goes beyond textbooks and examinations. Through academic activities, events, teamwork and interactions with teachers, I developed communication skills, confidence and a sense of responsibility. These experiences continue to help me in my professional life.",
      alumnaName: "Jayanthi",
      programmeBatch: "B.Sc | 2006–2009",
    },
    {
      _key: "test_3",
      title: "3. Teachers Who Made a Difference",
      quote: "The encouragement and support of my teachers at St. Ann’s played an important role in shaping my career. They always motivated us to work hard, believe in ourselves and pursue our goals with determination. The values I learned here remain an important part of who I am today.",
      alumnaName: "Anitha",
      programmeBatch: "B.Sc | 2009–2011",
    },
    {
      _key: "test_4",
      title: "4. Confidence to Face the World",
      quote: "My college years at St. Ann’s helped me discover my strengths and overcome my limitations. The supportive environment gave me the confidence to communicate, take responsibility and face new challenges. I proudly carry the lessons and memories of St. Ann’s wherever I go.",
      alumnaName: "Fatima",
      programmeBatch: "B.Sc | 2008–2011",
    },
    {
      _key: "test_5",
      title: "5. A Journey of Growth and Discovery",
      quote: "When I joined St. Ann’s, I came with dreams and aspirations. When I graduated, I left with greater confidence, clarity and a stronger belief in myself. The opportunities provided by the College helped me grow academically, professionally and personally.",
      alumnaName: "Sowjanya",
      programmeBatch: "B.Sc | 2003–2006",
    },
    {
      _key: "test_6",
      title: "6. Values That Continue to Guide Me",
      quote: "The most valuable things I received from St. Ann’s were not only academic knowledge but also values such as discipline, compassion, responsibility and perseverance. These values continue to guide me in my professional decisions and personal life.",
      alumnaName: "Raga Sudha",
      programmeBatch: "MCA | 2007–2011",
    },
    {
      _key: "test_7",
      title: "7. From Student to Professional",
      quote: "My education at St. Ann’s prepared me to confidently enter the professional world. The combination of classroom learning, practical exposure and extracurricular activities helped me develop skills that I use every day in my career. I am proud to be an alumna of St. Ann’s.",
      alumnaName: "Sowjanya",
      programmeBatch: "MBA | 2012–2014",
    },
  ],
  events: [
    { _key: "ev_1", title: "Annual Alumni Meet 2026", date: "Upcoming / Scheduled Annually", description: "Grand annual gathering of all alumni batches celebrating institutional milestones and reconnecting alma mater bonds.", redirectUrl: "https://forms.gle/7QMzJvrAsYVT3YZd7" },
    { _key: "ev_2", title: "Batch Reunions & Milestone Celebrations", date: "Periodic", description: "Dedicated Silver Jubilee & decade reunion gatherings organized across departments.", redirectUrl: "https://forms.gle/7QMzJvrAsYVT3YZd7" },
    { _key: "ev_3", title: "Departmental Alumni Interaction Sessions", date: "Monthly", description: "Subject-specific guest lectures, curriculum feedback forums, and career guidance workshops.", redirectUrl: "https://forms.gle/7QMzJvrAsYVT3YZd7" },
    { _key: "ev_4", title: "Alumni Mentorship & Career Guidance Drives", date: "Ongoing", description: "Direct mentorship pairing graduating seniors with industry-experienced alumni.", redirectUrl: "https://forms.gle/7QMzJvrAsYVT3YZd7" },
  ],
  galleryCategories: [
    { _key: "gal_1", title: "Alumni Meets & Reunions", description: "Memorable glimpses of annual meets and reunion gatherings.", count: "Gallery Active" },
    { _key: "gal_2", title: "Alumni Mentoring & Guest Talks", description: "Interactive lectures, workshops, and student mentorship sessions.", count: "Gallery Active" },
    { _key: "gal_3", title: "Contributions & Recognitions", description: "Moments of philanthropic contributions and alumni awards.", count: "Gallery Active" },
    { _key: "gal_4", title: "Departmental Alumni Events", description: "Department-wise student-alumni collaborative activities.", count: "Gallery Active" },
  ],
  contactInfo: {
    associationName: "St. Ann's College for Women Alumni Association",
    institution: "St. Ann's College for Women",
    address: "Gorantla, Guntur – 522 034, Andhra Pradesh, India",
    phone: "+91 863 2231381",
    mobile: "+91 93472 38194",
    email: "alumni@stannscollege.com",
    officeHours: "Monday to Saturday: 9:00 AM – 5:00 PM",
  }
};

export async function getAlumniData() {
  try {
    const query = `*[_type == "alumniPage" && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      lastUpdated,
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
        "fileUrl": coalesce(file.asset->url, fileUrl)
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
        "fileUrl": coalesce(file.asset->url, fileUrl)
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
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      prideAlumni[] {
        _key,
        name,
        programmeBatch,
        designation,
        organization,
        achievement,
        "photoUrl": coalesce(photo.asset->url, photoUrl),
        redirectUrl
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
        date,
        description,
        redirectUrl,
        "fileUrl": coalesce(file.asset->url, fileUrl)
      },
      galleryCategories[] {
        _key,
        title,
        description,
        count
      },
      contactInfo
    }`;

    const data = await sanityClient.fetch(query);
    if (data) {
      return {
        ...DEFAULT_ALUMNI_DATA,
        ...data,
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
      };
    }
    return DEFAULT_ALUMNI_DATA;
  } catch (err) {
    console.error("Sanity fetch error (getAlumniData):", err);
    return DEFAULT_ALUMNI_DATA;
  }
}

// ============================================================================
// RESEARCH & INNOVATION DATA MODEL & SANITY SYNC
// ============================================================================

export const DEFAULT_RESEARCH_DATA = {
  aboutOverview: "At St. Ann’s College for Women, Gorantla, Guntur, research and innovation foster academic excellence, creativity, critical thinking and societal impact. The College encourages faculty and students to engage in research, innovative projects, interdisciplinary collaboration, publications and knowledge sharing.\n\nThrough a supportive research ecosystem, St. Ann’s promotes ethical research, emerging technologies, practical solutions and community-oriented initiatives, nurturing women researchers and innovators prepared to contribute to a knowledge-driven and Viksit Bharat.\n\nResearch inspires discovery. Innovation transforms ideas into impact.",
  
  researchPolicy: {
    title: "1. Research Promotion, Ethics & Funding Policy",
    tagline: "Research with Integrity • Innovation with Purpose • Knowledge for Society",
    description: "At St. Ann’s College for Women, Gorantla, Guntur, research is promoted as a key component of academic excellence, innovation, and societal development. The College encourages faculty and students to undertake meaningful, multidisciplinary, and socially relevant research.\n\nThe policy provides a framework for research promotion, ethical conduct, plagiarism prevention, intellectual property, funding, publications, and collaborations, ensuring integrity, transparency, accountability, and originality in all research activities.\n\nThe College is committed to fostering a responsible research culture that supports innovation, higher studies, women’s empowerment, and community development.",
    policyFileUrl: "/documents/research/1.Rsearch Promotion & Development Policy.pdf",
    redirectUrl: ""
  },

  rdc: {
    title: "2. Research & Development Cell (RDC)",
    description: "The Research & Development Cell (RDC) of St. Ann’s College for Women, Gorantla, Guntur promotes a vibrant culture of research, innovation, consultancy, collaboration, and academic excellence in alignment with UGC guidelines, NEP-2020, and institutional quality initiatives.\n\nThe RDC facilitates and monitors research activities, encourages ethical research practices, supports publications and funded projects, and provides opportunities for faculty and students to engage in innovative, interdisciplinary, and socially relevant research.",
    vision: "To foster a dynamic research ecosystem that promotes innovation, knowledge creation, academic excellence, and societal transformation.",
    mission: [
      "Nurture research aptitude among faculty and students.",
      "Promote innovative and socially relevant research.",
      "Strengthen research collaborations and consultancy.",
      "Uphold research integrity and ethical standards."
    ],
    objectives: [
      "Promote quality research and publications.",
      "Encourage funded projects, patents, and consultancy.",
      "Facilitate interdisciplinary and collaborative research.",
      "Organize research methodology, IPR, and publication ethics programmes.",
      "Support research proposal preparation and funding opportunities.",
      "Promote student research, innovation, and project-based learning.",
      "Develop linkages with universities, industries, NGOs, and research organizations.",
      "Maintain institutional records of research, publications, projects, patents, and collaborations."
    ],
    initiatives: [
      "Research Methodology & FDP Programmes",
      "Publication and Research Guidance",
      "Research Ethics, Plagiarism & IPR Awareness",
      "Seed Funding & Research Incentives",
      "Patent and Innovation Support",
      "Funded Project & Consultancy Guidance",
      "Student Research & Project Activities",
      "Interdisciplinary and Collaborative Research",
      "Academic and Industry Collaborations",
      "Research Grant and Fellowship Awareness"
    ],
    commitment: "St. Ann’s College for Women is committed to building a responsible, innovative, and collaborative research ecosystem that contributes to academic excellence, women’s empowerment, community development, and sustainable societal progress.\n\nResearch • Innovation • Integrity • Impact",
    rdcPolicyFileUrl: "/documents/research/1.Rsearch Promotion & Development Policy.pdf",
    activityReports: [
      { _key: "rdc_ar_1", year: "2025–2026", title: "RDC Activity Report 2025–2026", fileUrl: "/documents/research/RDC Acivity Report 2025-2026.pdf" },
      { _key: "rdc_ar_2", year: "2024–2025", title: "RDC Activity Report 2024–2025", fileUrl: "/documents/research/RDC Acitivty Report 2024-2025.pdf" }
    ]
  },

  infrastructure: {
    description: "St. Ann’s College for Women, Gorantla, Guntur provides a supportive academic environment for research, innovation, experimentation and knowledge development. The institution utilizes its departmental laboratories, library resources, digital facilities and ICT infrastructure to facilitate faculty and student research activities.",
    facilities: [
      { _key: "inf_1", title: "Research Laboratories", description: "The College has departmental laboratories that support practical learning, experimentation, project work and research-oriented academic activities across Science, Computer Science and other disciplines." },
      { _key: "inf_2", title: "Laboratory Facilities & Equipment", description: "The laboratories are equipped with essential instruments, equipment and learning resources required for practical training, student projects, demonstrations and faculty research activities." },
      { _key: "inf_3", title: "Departmental Research Facilities", description: "Academic departments provide discipline-specific facilities that encourage faculty research, student projects, interdisciplinary learning and innovative academic practices." },
      { _key: "inf_4", title: "Library & E-Resources", description: "The College Library provides access to a wide range of books, journals, reference materials and digital learning resources that support teaching, learning and research." },
      { _key: "inf_5", title: "DELNET / Digital Resources", description: "The institution provides access to DELNET and digital resources, enabling students and faculty to explore scholarly literature, bibliographic databases, e-resources and academic information beyond the physical library collection." },
      { _key: "inf_6", title: "ICT & Computational Facilities", description: "ICT-enabled classrooms, computer facilities, internet connectivity and relevant software applications support data analysis, digital research, project development, online learning and academic collaboration." }
    ]
  },

  scholarlyContributions: {
    description: "St. Ann’s College for Women, Gorantla, Guntur promotes quality research and scholarly contributions by faculty members and students. The institution encourages publication of research findings in peer-reviewed, UGC-recognized, Scopus/Web of Science indexed, and other reputed journals, subject to applicable norms.",
    publications: [
      { _key: "pub_1", year: "2026–2027", facultyFileUrl: "/documents/DefaultFile_1.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "pub_2", year: "2025–2026", facultyFileUrl: "/documents/research/Faculty Research Publications -2025-2026.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "pub_3", year: "2024–2025", facultyFileUrl: "/documents/research/Faculty Reearch Publications - 2024-2025.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" }
    ],
    paperPresentations: [
      { _key: "pres_1", year: "2025–2026", facultyFileUrl: "/documents/research/Faculty Research in COnfenrece 2025-2026.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "pres_2", year: "2024–2025", facultyFileUrl: "/documents/research/Faculty Research in COnfenrece 2024-2025.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" }
    ],
    booksAndChapters: [
      { _key: "book_1", year: "2026–2027", title: "Faculty Journals, Books & Book Chapters 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "book_2", year: "2025–2026", title: "Faculty Journals, Books & Book Chapters 2025–2026", fileUrl: "/documents/research/Faculty Publications in Books 2025-2026.pdf" },
      { _key: "book_3", year: "2024–2025", title: "Faculty Journals, Books & Book Chapters 2024–2025", fileUrl: "/documents/research/Faculty publications in Books 2024-2025.pdf" }
    ]
  },

  patentsAndInnovations: {
    description: "St. Ann’s College for Women, Gorantla, Guntur promotes innovation, creativity, entrepreneurship, and problem-solving among faculty and students. The institution provides opportunities to develop innovative ideas, projects, prototypes, start-up concepts, and intellectual property.",
    initiatives: [
      "Innovation and Idea Presentation Programmes",
      "Student Project Exhibitions and Project Expos",
      "Entrepreneurship & Start-up Awareness Programmes",
      "Patent & IPR Awareness Programmes",
      "Innovation and Prototype Development Activities",
      "Incubation and Entrepreneurship Support"
    ],
    activitiesMatrix: [
      { _key: "act_1", year: "2026–2027", innovationFileUrl: "/documents/DefaultFile_1.pdf", startupFileUrl: "/documents/DefaultFile_1.pdf", patentIprFileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "act_2", year: "2025–2026", innovationFileUrl: "/documents/research/Patents 2025-2026.pdf", startupFileUrl: "/documents/DefaultFile_1.pdf", patentIprFileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "act_3", year: "2024–2025", innovationFileUrl: "/documents/research/Patents2024-2025.pdf", startupFileUrl: "/documents/DefaultFile_1.pdf", patentIprFileUrl: "/documents/DefaultFile_1.pdf" }
    ]
  },

  iprCell: {
    title: "6. Intellectual Property Rights (IPR) Cell",
    constitutedDate: "1 September 2022",
    description: "The Intellectual Property Rights (IPR) Cell of St. Ann’s College for Women, Gorantla, Guntur, was constituted on 1 September 2022 to create awareness and promote the effective protection of intellectual property among faculty and students. The Cell encourages innovation, creativity, research ethics, academic integrity, and responsible use of intellectual property.\n\nThe IPR Cell provides awareness and guidance on patents, copyrights, trademarks, designs, plagiarism prevention, and related IPR procedures. It also supports research-oriented and innovation-driven academic activities in collaboration with departments and the IQAC.",
    objectives: [
      "Create awareness of Intellectual Property Rights among faculty and students.",
      "Promote innovation, creativity, and ethical research practices.",
      "Create awareness of patents, copyrights, trademarks, and designs.",
      "Guide faculty and students on IPR protection and filing procedures.",
      "Promote academic integrity and prevention of plagiarism.",
      "Encourage documentation and protection of innovative academic work."
    ],
    majorActivities: [
      "IPR awareness programmes, workshops, and seminars.",
      "Expert lectures and FDPs on patents, copyrights, and research ethics.",
      "Awareness programmes on plagiarism and academic integrity.",
      "Guidance on patent and copyright filing procedures.",
      "Innovation, creativity, quiz, and poster-presentation activities.",
      "Student project exhibitions and idea-presentation sessions.",
      "Collaboration with IQAC, departments, experts, and academic institutions.",
      "Maintenance of records and reports of IPR-related activities."
    ],
    expectedOutcomes: [
      "Enhanced awareness of IPR and research ethics.",
      "Greater protection of innovative and creative work.",
      "Promotion of academic integrity and research culture.",
      "Increased student participation in innovation and entrepreneurship.",
      "Strengthening of institutional research and innovation practices."
    ],
    activityReports: [
      { _key: "ipr_ar_1", year: "2025–2026", title: "IPR Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "ipr_ar_2", year: "2024–2025", title: "IPR Activity Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "ipr_ar_3", year: "2023–2024", title: "IPR Activity Report 2023–2024", fileUrl: "/documents/DefaultFile_1.pdf" }
    ],
    policyDescription: "The institution recognizes Intellectual Property as an important component of academic, research, and innovation development. The IPR Cell facilitates awareness, documentation, protection, and ethical use of intellectual property generated through academic and research activities. Faculty and students are encouraged to protect their original work while maintaining confidentiality and adhering to institutional and ethical standards.",
    policyFileUrl: "/documents/DefaultFile_1.pdf"
  },

  entrepreneurshipCentre: {
    title: "7. Entrepreneurship Development / Innovation & Start-Up Centre",
    description: "St. Ann’s College for Women, Gorantla, Guntur promotes entrepreneurship, innovation, creativity, leadership, and self-employment among students. The Entrepreneurship Development / Innovation & Start-Up Centre facilitates entrepreneurial learning, skill development, industry interaction, and awareness of start-up opportunities, contributing to employability and women empowerment.",
    vision: "To nurture an entrepreneurial and innovation-oriented environment that empowers women students with creativity, leadership, business skills, and self-employment capabilities.",
    objectives: [
      "Promote entrepreneurial and innovative thinking among students.",
      "Create awareness of start-ups, entrepreneurship, and government support schemes.",
      "Develop leadership, communication, financial literacy, and business management skills.",
      "Encourage innovative ideas, projects, prototypes, and business plans.",
      "Facilitate interaction with entrepreneurs, industry experts, and professionals.",
      "Promote women entrepreneurship and economic empowerment.",
      "Strengthen employability through skill-based and industry-oriented learning."
    ],
    majorActivities: [
      "Entrepreneurship Awareness Programmes",
      "Workshops, seminars, and training programmes",
      "Business idea and business-plan competitions",
      "Skill development and employability programmes",
      "Financial literacy and entrepreneurship awareness",
      "Interaction with entrepreneurs and industry experts",
      "Innovation exhibitions and entrepreneurial activities",
      "Awareness programmes on government schemes and funding opportunities",
      "Add-on and certificate programmes related to entrepreneurship"
    ],
    industryEngagement: "The Centre encourages collaboration with industries, entrepreneurs, professional bodies, and community organizations to provide practical exposure, internships, training, mentoring, and entrepreneurial learning opportunities.",
    womenEntrepreneurship: "As a women’s institution, St. Ann’s encourages students to explore self-employment, entrepreneurship, leadership, financial independence, and innovative career pathways through skill development and entrepreneurship awareness initiatives.",
    expectedOutcomes: [
      "Entrepreneurial mindset and innovative thinking",
      "Leadership and managerial competencies",
      "Creativity and problem-solving skills",
      "Start-up and self-employment awareness",
      "Employability and professional skills",
      "Confidence and economic empowerment among women students"
    ],
    activityReports: [
      { _key: "ed_ar_1", year: "2025–2026", title: "ED Centre Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "ed_ar_2", year: "2024–2025", title: "ED Centre Activity Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "ed_ar_3", year: "2023–2024", title: "ED Centre Activity Report 2023–2024", fileUrl: "/documents/DefaultFile_1.pdf" }
    ],
    policyDescription: "The Entrepreneurship Development / Innovation & Start-Up Policy of St. Ann’s College for Women, Gorantla, Guntur provides a framework for promoting entrepreneurship, innovation, creativity, and self-employment among students and faculty. The policy encourages entrepreneurial learning, skill development, mentoring, industry interaction, innovative idea development, and start-up awareness. It aims to create a supportive ecosystem that strengthens employability, innovation, leadership, and women entrepreneurship, in alignment with institutional quality enhancement practices.",
    policyFileUrl: "/documents/DefaultFile_1.pdf"
  },

  iicCell: {
    title: "8. Institution Innovation Council (IIC) / Institution–Industry Cell",
    description: "The Institution Innovation Council (IIC) / Institution–Industry Cell of St. Ann’s College for Women, Gorantla, Guntur promotes innovation, entrepreneurship, creativity, skill development, and industry-oriented learning among students and faculty. The Cell facilitates industry interaction, expert engagement, innovative projects, start-up awareness, incubation support, and academic–industry collaboration in association with the IQAC and academic departments.",
    objectives: [
      "Promote innovation, creativity, and entrepreneurship",
      "Develop problem-solving and design-thinking skills",
      "Encourage innovative projects and prototypes",
      "Strengthen industry–academia interaction",
      "Promote start-up and incubation awareness",
      "Facilitate research, consultancy, and skill development",
      "Enhance employability and industry readiness"
    ],
    keyActivities: [
      "Innovation and entrepreneurship programmes",
      "Workshops, seminars, FDPs, and expert lectures",
      "Hackathons, idea competitions, and project exhibitions",
      "Industry interaction and industrial visits",
      "Start-up and incubation awareness programmes",
      "Skill development and employability training",
      "Industry-oriented projects and collaborations",
      "MoUs and collaborative initiatives"
    ],
    expectedOutcomes: "The Cell aims to foster an innovative and entrepreneurial mindset, enhance students' creativity, leadership, problem-solving and professional skills, and strengthen industry–academia collaboration and employability.",
    activityReports: [
      { _key: "iic_ar_1", year: "2025–2026", title: "IIC Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "iic_ar_2", year: "2024–2025", title: "IIC Activity Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "iic_ar_3", year: "2023–2024", title: "IIC Activity Report 2023–2024", fileUrl: "/documents/DefaultFile_1.pdf" }
    ],
    policyDescription: "The Institution has formulated an Institution Innovation Council (IIC) Policy to foster a culture of innovation, entrepreneurship, research, creativity, and industry collaboration. The policy provides a framework for promoting innovative ideas, mentoring, prototype development, start-up awareness, industry interaction, incubation activities, and student participation in innovation-oriented programmes.",
    policyFileUrl: "/documents/DefaultFile_1.pdf"
  }
};

export async function getResearchData() {
  try {
    const query = `*[_type == "research-singleton" && !(_id in path("drafts.**"))][0] {
      _id,
      aboutOverview,
      researchPolicy {
        title,
        tagline,
        description,
        redirectUrl,
        "policyFileUrl": coalesce(policyFile.asset->url, policyFileUrl)
      },
      rdc {
        title,
        description,
        vision,
        mission,
        objectives,
        initiatives,
        commitment,
        "rdcPolicyFileUrl": coalesce(rdcPolicyFile.asset->url, rdcPolicyFileUrl),
        activityReports[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl)
        }
      },
      infrastructure {
        description,
        facilities[] {
          _key,
          title,
          description
        }
      },
      scholarlyContributions {
        description,
        publications[] {
          _key,
          year,
          redirectUrl,
          "facultyFileUrl": coalesce(facultyFile.asset->url, facultyFileUrl),
          "studentFileUrl": coalesce(studentFile.asset->url, studentFileUrl)
        },
        paperPresentations[] {
          _key,
          year,
          redirectUrl,
          "facultyFileUrl": coalesce(facultyFile.asset->url, facultyFileUrl),
          "studentFileUrl": coalesce(studentFile.asset->url, studentFileUrl)
        },
        booksAndChapters[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl)
        }
      },
      patentsAndInnovations {
        description,
        initiatives,
        activitiesMatrix[] {
          _key,
          year,
          "innovationFileUrl": coalesce(innovationFile.asset->url, innovationFileUrl),
          "startupFileUrl": coalesce(startupFile.asset->url, startupFileUrl),
          "patentIprFileUrl": coalesce(patentIprFile.asset->url, patentIprFileUrl)
        }
      },
      iprCell {
        title,
        constitutedDate,
        description,
        objectives,
        majorActivities,
        expectedOutcomes,
        policyDescription,
        "policyFileUrl": coalesce(policyFile.asset->url, policyFileUrl),
        activityReports[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl)
        }
      },
      entrepreneurshipCentre {
        title,
        description,
        vision,
        objectives,
        majorActivities,
        industryEngagement,
        womenEntrepreneurship,
        expectedOutcomes,
        policyDescription,
        "policyFileUrl": coalesce(policyFile.asset->url, policyFileUrl),
        activityReports[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl)
        }
      },
      iicCell {
        title,
        description,
        objectives,
        keyActivities,
        expectedOutcomes,
        policyDescription,
        "policyFileUrl": coalesce(policyFile.asset->url, policyFileUrl),
        activityReports[] {
          _key,
          year,
          title,
          redirectUrl,
          "fileUrl": coalesce(file.asset->url, fileUrl)
        }
      }
    }`;

    const data = await sanityClient.fetch(query);
    if (data) {
      return {
        ...DEFAULT_RESEARCH_DATA,
        ...data,
        researchPolicy: {
          ...DEFAULT_RESEARCH_DATA.researchPolicy,
          ...(data.researchPolicy || {})
        },
        rdc: {
          ...DEFAULT_RESEARCH_DATA.rdc,
          ...(data.rdc || {}),
          activityReports: data.rdc?.activityReports?.length ? data.rdc.activityReports : DEFAULT_RESEARCH_DATA.rdc.activityReports
        },
        infrastructure: {
          ...DEFAULT_RESEARCH_DATA.infrastructure,
          ...(data.infrastructure || {}),
          facilities: data.infrastructure?.facilities?.length ? data.infrastructure.facilities : DEFAULT_RESEARCH_DATA.infrastructure.facilities
        },
        scholarlyContributions: {
          ...DEFAULT_RESEARCH_DATA.scholarlyContributions,
          ...(data.scholarlyContributions || {}),
          publications: data.scholarlyContributions?.publications?.length ? data.scholarlyContributions.publications : DEFAULT_RESEARCH_DATA.scholarlyContributions.publications,
          paperPresentations: data.scholarlyContributions?.paperPresentations?.length ? data.scholarlyContributions.paperPresentations : DEFAULT_RESEARCH_DATA.scholarlyContributions.paperPresentations,
          booksAndChapters: data.scholarlyContributions?.booksAndChapters?.length ? data.scholarlyContributions.booksAndChapters : DEFAULT_RESEARCH_DATA.scholarlyContributions.booksAndChapters
        },
        patentsAndInnovations: {
          ...DEFAULT_RESEARCH_DATA.patentsAndInnovations,
          ...(data.patentsAndInnovations || {}),
          activitiesMatrix: data.patentsAndInnovations?.activitiesMatrix?.length ? data.patentsAndInnovations.activitiesMatrix : DEFAULT_RESEARCH_DATA.patentsAndInnovations.activitiesMatrix
        },
        iprCell: {
          ...DEFAULT_RESEARCH_DATA.iprCell,
          ...(data.iprCell || {}),
          activityReports: data.iprCell?.activityReports?.length ? data.iprCell.activityReports : DEFAULT_RESEARCH_DATA.iprCell.activityReports
        },
        entrepreneurshipCentre: {
          ...DEFAULT_RESEARCH_DATA.entrepreneurshipCentre,
          ...(data.entrepreneurshipCentre || {}),
          activityReports: data.entrepreneurshipCentre?.activityReports?.length ? data.entrepreneurshipCentre.activityReports : DEFAULT_RESEARCH_DATA.entrepreneurshipCentre.activityReports
        },
        iicCell: {
          ...DEFAULT_RESEARCH_DATA.iicCell,
          ...(data.iicCell || {}),
          activityReports: data.iicCell?.activityReports?.length ? data.iicCell.activityReports : DEFAULT_RESEARCH_DATA.iicCell.activityReports
        }
      };
    }
    return DEFAULT_RESEARCH_DATA;
  } catch (err) {
    console.error("Sanity fetch error (getResearchData):", err);
    return DEFAULT_RESEARCH_DATA;
  }
}

