const { createClient } = require("@sanity/client");
const crypto = require("crypto");

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const API_VERSION = "2024-03-01";
const DEFAULT_TOKEN = "sk2B6oq7TV44M3rCRTu17hThjlyGyarJzispWzZsPMcc6LUgrAcxlKKYnJPiSPCizWCGIkwCCYmXTwzDHZaVTxrDkyhFAyxNnStQZj6wCcxo0z1aaz4tnH8vgMPApmF5Z8u7rXN87IVVPA1rYJPX4VoDSDF4ekCdENzvyRLSraWWowOhBKOw";

const token = process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

if (!process.env.SANITY_WRITE_TOKEN) {
  console.warn("⚠️ WARNING: SANITY_WRITE_TOKEN environment variable not set. Using default token.");
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: token,
  useCdn: false,
});

const commerceData = {
  _id: "department-of-commerce",
  _type: "department",
  name: "Department of Commerce",
  slug: {
    _type: "slug",
    current: "department-of-commerce",
  },
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
    {
      title: "B.Com Honours (General)",
      intake: "20 (14 Convener + 06 Management)",
      duration: "3 Years (6 Semesters)",
    },
    {
      title: "B.Com Honours (Computer Applications)",
      intake: "80 (56 Convener + 24 Management)",
      duration: "3 Years (6 Semesters)",
    },
  ],
  facultyMembers: [
    {
      name: "Mrs. M. Prameela",
      designation: "Head of the Department & Assistant Professor",
      qualification: "M.Com, MBA, (Ph.D)",
      experience: "18 Years",
      email: "commerce.hod@stannscollege.org"
    },
    {
      name: "Dr. K. Srilatha",
      designation: "Assistant Professor",
      qualification: "M.Com, Ph.D",
      experience: "12 Years",
      email: "srilatha.k@stannscollege.org"
    }
  ],
  passPercentage: [
    {
      year: "2025-2026",
      programme: "B.Com Honours General",
      finalYearStudents: "20",
      studentsPassed: "20",
      percentage: "100%"
    },
    {
      year: "2025-2026",
      programme: "B.Com Honours CA",
      finalYearStudents: "78",
      studentsPassed: "74",
      percentage: "94.8%"
    },
    {
      year: "2024-2025",
      programme: "B.Com Honours CA",
      finalYearStudents: "80",
      studentsPassed: "76",
      percentage: "95%"
    }
  ],
  valueAddedCourses: [
    {
      sNo: 1,
      title: "Tally & GST Accounting",
      duration: "40 Hours",
      fromTo: "12-08-2025 to 31-08-2025",
      academicYear: "2025-2026",
      studentsEnrolled: "60",
      certificateIssued: "Yes",
      agency: "Nitya Computers",
    },
    {
      sNo: 2,
      title: "Income Tax Practice",
      duration: "30 Hours",
      fromTo: "01-09-2025 to 20-09-2025",
      academicYear: "2025-2026",
      studentsEnrolled: "45",
      certificateIssued: "Yes",
      agency: "Tax Consultant",
    },
    {
      sNo: 3,
      title: "Banking & Financial Services",
      duration: "30 Hours",
      fromTo: "05-10-2025 to 25-10-2025",
      academicYear: "2025-2026",
      studentsEnrolled: "50",
      certificateIssued: "Yes",
      agency: "Bank Officials",
    },
    {
      sNo: 4,
      title: "Digital Marketing & E-Commerce",
      duration: "40 Hours",
      fromTo: "10-11-2025 to 30-11-2025",
      academicYear: "2025-2026",
      studentsEnrolled: "55",
      certificateIssued: "Yes",
      agency: "Industry Trainer",
    },
    {
      sNo: 5,
      title: "Entrepreneurship Development Programme",
      duration: "30 Hours",
      fromTo: "05-12-2025 to 25-12-2025",
      academicYear: "2025-2026",
      studentsEnrolled: "40",
      certificateIssued: "Yes",
      agency: "ED Cell",
    },
    {
      sNo: 6,
      title: "Retail & Sales Management",
      duration: "30 Hours",
      fromTo: "---",
      academicYear: "2025-2026",
      studentsEnrolled: "---",
      certificateIssued: "Yes",
      agency: "Retail Association"
    },
    {
      sNo: 7,
      title: "Office Automation & Business Communication",
      duration: "30 Hours",
      fromTo: "---",
      academicYear: "2025-2026",
      studentsEnrolled: "---",
      certificateIssued: "Yes",
      agency: "Language Lab"
    },
    {
      sNo: 8,
      title: "Financial Literacy & Investment Awareness",
      duration: "30 Hours",
      fromTo: "---",
      academicYear: "2025-2026",
      studentsEnrolled: "---",
      certificateIssued: "Yes",
      agency: "SEBI Certified Trainer"
    }
  ],
  mous: [
    {
      sNo: 1,
      title: "ABC Chartered Accountants Firm",
      type: "MoU",
      dateOfSigning: "10-06-2024",
      duration: "3 Years",
      purpose: "GST & Accounting Training",
      documentUrl: "",
      status: "Active"
    },
  ],
  mouActivities: [
    {
      sNo: 1,
      organization: "ABC Chartered Accountants Firm",
      activity: "Hands-on Tally Workshop",
      date: "15-07-2025",
      participants: "80",
      documentUrl: ""
    }
  ],
  studentAchievements: [
    {
      sNo: 1,
      date: "10-12-2025",
      name: "Anusha G.",
      activity: "National Commerce Quiz",
      level: "National",
      achievement: "First Place"
    }
  ],
  academicAchievements: [
    {
      sNo: 1,
      year: "2024-2025",
      name: "K. Divya",
      programme: "B.Com Honours CA",
      award: "Gold Medalist (1st Rank)",
      marks: "9.82 CGPA"
    }
  ],
  placements: [
    {
      year: "2024-2025",
      finalYearStudents: "85",
      studentsPlaced: "68",
      highestSalary: "6.5 LPA",
      averageSalary: "3.2 LPA",
      percentage: "80%"
    },
    {
      year: "2023-2024",
      finalYearStudents: "78",
      studentsPlaced: "60",
      highestSalary: "5.8 LPA",
      averageSalary: "3.0 LPA",
      percentage: "77%"
    }
  ],
  bestPractices: [
    {
      title: "1. GST & Accounting Practical Training (Skill-Oriented Learning Initiative)",
      category: "Skill Development",
      objectives: [
        "To provide hands-on training in GST and accounting practices",
        "To enhance employability in accounting, taxation, and finance sectors",
        "To bridge the gap between theoretical knowledge and industry requirements",
      ],
      context: "With increasing demand for skilled accounting professionals, practical exposure to GST filing, Tally, and financial documentation has become essential.",
      practice: [
        "Training in GST concepts, billing, and return filing procedures",
        "Hands-on sessions using accounting software such as Tally",
        "Preparation of financial statements and real-time accounting exercises",
        "Workshops by practicing accountants and tax consultants",
      ],
      success: [
        "Students gaining practical competency in GST and accounting",
        "Increased placement opportunities in accounting firms",
        "Positive student feedback on skill-based learning",
      ],
      problems: [
        "Need for licensed software and updated tools",
        "Continuous updates due to changing tax regulations",
        "Requirement of expert trainers",
      ]
    },
    {
      title: "2. Entrepreneurship & Small Business Development Activities",
      category: "Entrepreneurship",
      objectives: [
        "To develop entrepreneurial mindset among students",
        "To promote self-employment and local business initiatives",
        "To build leadership and managerial skills",
      ],
      context: "Guntur region offers scope for small-scale businesses, retail, and agro-based enterprises. Students are encouraged to explore entrepreneurship as a career option.",
      practice: [
        "Business plan competitions and startup idea presentations",
        "Workshops on small business management and digital marketing",
        "Interaction with local entrepreneurs and women business owners",
        "Collaboration with ED Cell for entrepreneurship awareness",
      ],
      success: [
        "Students presenting innovative business ideas",
        "Participation in entrepreneurship competitions",
        "Alumni initiating small business ventures",
      ],
      problems: [
        "Limited funding support for startups",
        "Need for incubation and mentorship",
        "Strengthening industry linkages",
      ]
    },
    {
      title: "3. Financial Literacy & Community Outreach Programme",
      category: "Community Outreach",
      objectives: [
        "To promote financial awareness among rural and semi-urban communities",
        "To educate students on practical financial management",
        "To encourage social responsibility",
      ],
      context: "Many communities around Gorantla lack awareness of banking, savings, taxation, and digital transactions.",
      practice: [
        "Conducting financial literacy camps in nearby villages",
        "Awareness programmes on savings, budgeting, and digital payments",
        "Sessions on banking services, insurance, and taxation basics",
        "Student participation in outreach and extension activities",
      ],
      success: [
        "Increased awareness among community participants",
        "Active student involvement in outreach programmes",
        "Development of communication and leadership skills",
      ],
      problems: [
        "Limited outreach resources and logistics",
        "Need for collaboration with financial institutions",
        "Language and awareness barriers in rural areas",
      ]
    },
    {
      title: "4. Student-Managed Commerce Activities (Mini Business / Cooperative Model)",
      category: "Experiential Learning",
      objectives: [
        "To provide real-time business exposure",
        "To develop managerial and decision-making skills",
        "To encourage teamwork and leadership",
      ],
      context: "Commerce education requires experiential learning beyond textbooks. Students gain better understanding through real business activities.",
      practice: [
        "Organizing student-led mini business activities (sales stalls, exhibitions)",
        "Managing procurement, pricing, and sales",
        "Maintaining accounts and profit analysis",
        "Faculty supervision for guidance and evaluation",
      ],
      success: [
        "Practical understanding of business operations",
        "Improved confidence and teamwork among students",
        "Successful execution of student-led activities",
      ],
      problems: [
        "Initial financial support for activities",
        "Risk management and planning",
        "Space and infrastructure requirements",
      ]
    },
    {
      title: "5. Career-Oriented Training & Industry Interaction",
      category: "Industry Interaction",
      objectives: [
        "To enhance employability skills",
        "To expose students to industry practices",
        "To prepare students for competitive careers",
      ],
      context: "Students require industry exposure to meet job market expectations in commerce and management sectors.",
      practice: [
        "Guest lectures by Chartered Accountants, bankers, and professionals",
        "Industrial visits to banks, firms, and business units",
        "Internship opportunities in local organizations",
        "Training in soft skills, communication, and interview techniques",
      ],
      success: [
        "Improved placement and internship opportunities",
        "Better industry awareness among students",
        "Skill enhancement in communication and professionalism",
      ],
      problems: [
        "Limited industry collaborations",
        "Scheduling constraints for visits and internships",
        "Need for continuous industry engagement",
      ]
    }
  ],
  bestPracticesImpact: [
    "Promotes experiential and student-centric learning",
    "Enhances employability and entrepreneurial readiness",
    "Strengthens practical knowledge in commerce disciplines",
    "Encourages community engagement and social responsibility",
    "Aligns with NAAC quality indicators and outcome-based education"
  ],
  activities: [
    {
      label: "Academic Enrichment Activities",
      desc: "Seminars, workshops on accounting, taxation, and finance; guest lectures by industry experts; conferences and paper presentations.",
    },
    {
      label: "Skill Development Activities",
      desc: "Tally and GST training sessions, communication and soft skills development, resume writing and interview preparation workshops.",
    },
    {
      label: "Student-Centric Activities",
      desc: "Business quizzes, debates, presentations, commerce exhibitions, project displays, group discussions, and case study analysis.",
    },
    {
      label: "Extension & Outreach Activities",
      desc: "Financial literacy programmes in rural areas, consumer awareness campaigns, and community engagement initiatives.",
    },
    {
      label: "Industry Interaction Activities",
      desc: "Industrial visits to business/financial institutions, internships, field-based projects, and interaction sessions with entrepreneurs.",
    },
  ],
  activitiesList: [
    {
      sNo: 1,
      date: "15-07-2025",
      title: "Workshop on GST & Tax Filing",
      type: "Workshop",
      resourcePerson: "CA Professional",
      participants: "80",
      documentUrl: ""
    }
  ],
  activitiesSummary: [
    {
      sNo: 1,
      year: "2025-2026",
      category: "Academic Enrichment",
      count: "4",
      studentsBenefited: "250",
      keyActivities: "Seminars, Guest Lectures",
      documentUrl: ""
    },
    {
      sNo: 2,
      year: "2025-2026",
      category: "Skill Development",
      count: "3",
      studentsBenefited: "180",
      keyActivities: "Tally, GST Training",
      documentUrl: ""
    },
    {
      sNo: 3,
      year: "2025-2026",
      category: "Student-Centric Activities",
      count: "5",
      studentsBenefited: "200",
      keyActivities: "Quiz, Presentations",
      documentUrl: ""
    },
    {
      sNo: 4,
      year: "2025-2026",
      category: "Extension & Outreach",
      count: "2",
      studentsBenefited: "120",
      keyActivities: "Financial Literacy Programmes",
      documentUrl: ""
    },
    {
      sNo: 5,
      year: "2025-2026",
      category: "Industry Interaction",
      count: "2",
      studentsBenefited: "90",
      keyActivities: "Industrial Visit",
      documentUrl: ""
    }
  ],
  internships: [
    {
      sNo: 1,
      year: "2025-2026",
      name: "Priyah K.",
      duration: "4 Weeks",
      organization: "ABC Tax Solutions",
      areaOfWork: "Taxation & GST",
      programme: "B.Com Honours CA"
    }
  ],
  infrastructure: [
    "Commerce Lab / Computer Lab",
    "ICT-enabled classrooms",
    "Library resources (books, journals)",
    "Internet & digital learning facilities",
  ],
  careerOpps: [
    "Accounting & Taxation",
    "Banking & Finance",
    "Entrepreneurship",
    "Higher Education (M.Com, MBA, CA, etc.)",
  ],
  otherStudentAchievements: [
    "Winners of District-level Business Plan Competition 2025",
    "Active student representation in State-level Young Entrepreneurs Summit"
  ],
  focusOnWomenEmpowerment: "The Department of Commerce actively prioritizes women empowerment and employability by integrating professional training, entrepreneurship initiatives, and career guidance tailored to women's leadership in business and finance.",
  overallApproach: "Through these year-round activities, the Department of Commerce ensures a balanced focus on academic excellence, skill development, industry exposure, and community engagement, aligning with NAAC quality benchmarks and outcome-based education."
};

function addKeysToObj(obj) {
  if (!obj || typeof obj !== "object") return;
  
  if (Array.isArray(obj)) {
    for (let item of obj) {
      if (item && typeof item === "object") {
        if (!item._key) {
          item._key = crypto.randomBytes(6).toString("hex");
        }
        addKeysToObj(item);
      }
    }
  } else {
    for (let k in obj) {
      if (typeof obj[k] === "object") {
        addKeysToObj(obj[k]);
      }
    }
  }
}

async function run() {
  console.log("Pushing Department of Commerce content to Sanity...");
  try {
    // Add unique _key to array items for Sanity compliance
    addKeysToObj(commerceData);

    const res = await client.createOrReplace(commerceData);
    console.log("✅ Success! Published Department of Commerce. ID:", res._id);
  } catch (err) {
    console.error("❌ Failed to push Department of Commerce:", err.message);
    process.exit(1);
  }
}

run();
