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
      documents[] {
        title,
        "fileUrl": file.asset->url,
        googleFormUrl
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
export async function getFacultyProfile(slug: string) {
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
}

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



