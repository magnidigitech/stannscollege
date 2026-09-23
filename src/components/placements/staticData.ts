export interface PlacementSection {
  id: string;
  title: string;
  category: "training" | "industry" | "global";
  categoryTitle: string;
  description?: string;
  content?: string;
}

export interface TPOOfficerInfo {
  name: string;
  degrees: string;
  designation: string;
  institution: string;
  mobile: string;
  landline: string;
  placementEmail: string;
  institutionEmail: string;
  photoUrl?: string;
}

export interface AnnualReportDoc {
  year: string;
  title: string;
  fileUrl: string;
  isAvailable: boolean;
}

export interface PlacementStatDoc {
  year: string;
  title: string;
  fileUrl: string;
  type: "pdf" | "image";
}

export interface RecruiterItem {
  id?: string;
  name: string;
  short?: string;
  sector: string;
  roles?: string;
  color?: string;
  tag?: string;
  tier?: "top" | "major" | "emerging";
  logoUrl?: string;
}

export const tpoOfficer: TPOOfficerInfo = {
  name: "Dr. J. Pratapa Reddy",
  degrees: "M.Sc., M.Phil., Ph.D.",
  designation: "Training & Placement Officer",
  institution: "St. Ann’s College for Women, Gorantla, Guntur",
  mobile: "+91 9440542609",
  landline: "0863-2236470",
  placementEmail: "gntstannsplacementcell@gmail.com",
  institutionEmail: "st_anns_coll@yahoo.co.in",
  photoUrl: "https://cdn.sanity.io/images/fhjwqub5/production/e51fc6bdd34d43e095f1eeb43c95ba5e8704c932-700x900.jpg"
};

export const annualReportsList: AnnualReportDoc[] = [
  {
    year: "2025–2026",
    title: "Annual Activity Report 2025–2026",
    fileUrl: "/documents/placements/Placement Cell Annual Report 2025-2026.pdf",
    isAvailable: true
  },
  {
    year: "2024–2025",
    title: "Annual Activity Report 2024–2025",
    fileUrl: "/documents/placements/Placement Cell Annual Report 2024-2025.pdf",
    isAvailable: true
  },
  {
    year: "2023–2024",
    title: "Annual Activity Report 2023–2024",
    fileUrl: "/documents/placements/Placement Cell Annual Report 2024-2025.pdf",
    isAvailable: true
  },
  {
    year: "2022–2023",
    title: "Annual Activity Report 2022–2023",
    fileUrl: "/documents/placements/Placement Cell Annual Report 2022-2023.pdf",
    isAvailable: true
  }
];

export const placementAboutDoc = {
  title: "About the Training & Placement Cell Overview",
  fileUrl: "/documents/placements/Training & Placement Cell.pdf"
};

export const companyWiseStatsImages: Record<string, { title: string; imageUrl: string }> = {
  "2025-2026": {
    title: "Company-wise Placed Students 2025–2026",
    imageUrl: "/documents/placements/Students palced company wise data 2025-2026.png"
  },
  "2024-2025": {
    title: "Placement Statistics Summary 2024–2025",
    imageUrl: "/documents/placements/2024-2025 Placement statisitcs.png"
  }
};

export const programmeWiseStatsPdfs: Record<string, { title: string; fileUrl: string }> = {
  "2025-2026": {
    title: "Programme-wise Placement Statistics 2025–2026",
    fileUrl: "/documents/placements/Programmewsie palcement statitics 2025-2026.pdf"
  },
  "2024-2025": {
    title: "Programme-wise Placement Statistics 2024–2025",
    fileUrl: "/documents/placements/Programme Wise Placement statisicts 2024-2025.pdf"
  }
};

export const recruitersList: RecruiterItem[] = [
  { name: "Tata Consultancy Services (TCS)", sector: "IT & Digital Services", tier: "top", logoUrl: "https://cdn.simpleicons.org/tataconsultancyservices/002147" },
  { name: "Infosys", sector: "IT & Enterprise Consulting", tier: "top", logoUrl: "https://cdn.simpleicons.org/infosys/007CC3" },
  { name: "Wipro Technologies", sector: "IT & Cloud Solutions", tier: "top", logoUrl: "https://cdn.simpleicons.org/wipro/000000" },
  { name: "Capgemini", sector: "Global IT Services", tier: "top", logoUrl: "https://cdn.simpleicons.org/capgemini/0070AD" },
  { name: "Tech Mahindra", sector: "IT & Telecom Services", tier: "top", logoUrl: "https://cdn.simpleicons.org/techmahindra/E31837" },
  { name: "Cognizant Technology Solutions", sector: "Digital Transformation", tier: "top", logoUrl: "https://cdn.simpleicons.org/cognizant/0033A0" },
  { name: "Accenture", sector: "Strategy & Technology", tier: "top", logoUrl: "https://cdn.simpleicons.org/accenture/A100FF" },
  { name: "HCL Technologies", sector: "IT Infrastructure & Cloud", tier: "top", logoUrl: "https://cdn.simpleicons.org/hcl/0076CE" },
  { name: "ICICI Bank", sector: "Banking & Financial Services", tier: "major", logoUrl: "https://cdn.simpleicons.org/icicibank/F37024" },
  { name: "HDFC Bank", sector: "Retail & Corporate Banking", tier: "major", logoUrl: "https://cdn.simpleicons.org/hdfcbank/004B87" },
  { name: "Hetero Drugs Ltd.", sector: "Pharmaceuticals & Healthcare", tier: "major" },
  { name: "Divi's Laboratories", sector: "Life Sciences & Biotech", tier: "major" },
  { name: "Genpact", sector: "BPO & Analytics", tier: "major", logoUrl: "https://cdn.simpleicons.org/genpact/FF4F00" },
  { name: "Sutherland Global Services", sector: "Customer Experience & ITES", tier: "major" },
  { name: "Omega Healthcare", sector: "Healthcare IT & RCM", tier: "emerging" },
  { name: "Sri Chaitanya Institutions", sector: "Academic & EdTech", tier: "emerging" },
  { name: "Institute of Language Management (ILM)", sector: "Language & Communication Skills", tier: "major", logoUrl: "/images/recruiters/ilm.png" },
  { name: "English For You Institution", sector: "English Language & Professional Training", tier: "major", logoUrl: "/images/recruiters/english-for-you.png" }
];

export const skillDomains = [
  {
    number: "01",
    title: "Employability & Career Skills",
    icon: "Briefcase",
    desc: "Resume Building, Aptitude Mastery, Interview Skills, Group Discussions, and Workplace Readiness.",
    topics: ["Resume Crafting", "Quantitative Aptitude", "Mock Interviews", "Group Discussions", "Workplace Etiquette"]
  },
  {
    number: "02",
    title: "Communication & Soft Skills",
    icon: "MessageSquare",
    desc: "Spoken English, Presentation Skills, Public Speaking, Interpersonal and Professional Communication.",
    topics: ["Spoken English Fluency", "Public Speaking", "Active Listening", "Professional Emailing", "Body Language"]
  },
  {
    number: "03",
    title: "Life Skills & Personal Effectiveness",
    icon: "HeartHandshake",
    desc: "Critical Thinking, Problem-Solving, Decision-Making, Time Management, Emotional Intelligence, and Leadership.",
    topics: ["Critical Thinking", "Stress Management", "Emotional Intelligence (EQ)", "Leadership Skills", "Time Planning"]
  },
  {
    number: "04",
    title: "ICT & Digital Skills",
    icon: "Laptop",
    desc: "Digital Literacy, MS Office Suite, Data Analysis, Cyber Safety, Cloud Tools, and Digital Applications.",
    topics: ["Advanced Excel", "Data Analytics", "Cloud Tools (Google/MS)", "Cyber Hygiene", "Web Literacy"]
  },
  {
    number: "05",
    title: "Industry & Professional Skills",
    icon: "Building2",
    desc: "Workplace Ethics, Professional Conduct, Team Dynamics, Project Management, and Corporate Orientation.",
    topics: ["Corporate Ethics", "Team Collaboration", "Agile & Project Basics", "Industry Compliance", "Professionalism"]
  },
  {
    number: "06",
    title: "Entrepreneurship & Innovation Skills",
    icon: "Lightbulb",
    desc: "Entrepreneurship Awareness, Design Thinking, Innovation Labs, Start-up Incubation, and IPR Awareness.",
    topics: ["Design Thinking", "Start-up Development", "Business Modelling", "IPR & Patents", "Venture Creation"]
  },
  {
    number: "07",
    title: "Financial Literacy Skills",
    icon: "Coins",
    desc: "Personal Finance, Banking Principles, Savings, Investment Schemes, Digital Payments, and Financial Safety.",
    topics: ["Personal Budgeting", "Digital Payments & UPI", "Mutual Funds & Savings", "Financial Fraud Prevention", "Tax Basics"]
  },
  {
    number: "08",
    title: "Language & Professional Communication",
    icon: "Languages",
    desc: "English Language Enhancement, Academic Writing, Business Communication, and Translation Competencies.",
    topics: ["Academic Writing", "Business Correspondence", "Grammar Mastery", "Translation Skills", "Accent Neutralization"]
  },
  {
    number: "09",
    title: "Placement & Career Preparation",
    icon: "GraduationCap",
    desc: "Pre-Placement Training, Technical & HR Mock Interviews, Assessment Test Simulations, and Domain Preparation.",
    topics: ["HR Round Preparation", "Technical Assessments", "Company-specific Drills", "Portfolio Creation", "Career Mapping"]
  },
  {
    number: "10",
    title: "Social, Ethical & Citizenship Skills",
    icon: "ShieldCheck",
    desc: "Human Values, Gender Sensitization, Environmental Awareness, Social Responsibility, Disaster Management, and First Aid.",
    topics: ["Human Values & Ethics", "Gender Sensitization", "Green Practices", "Disaster Response", "First Aid Training"]
  },
  {
    number: "11",
    title: "Emerging Technology & AI Skills",
    icon: "Cpu",
    desc: "Artificial Intelligence, Generative AI, Digital Tools, Data Analytics, and Next-Generation Tech.",
    topics: ["Generative AI Tools", "Prompt Engineering", "Data Visualization", "AI Ethics", "Automation Tools"]
  }
];

export const apssdcSupportAreas = [
  { title: "Skill Development & Employability Training", desc: "Structured foundational training in key job sectors." },
  { title: "Industry-Oriented Training Programmes", desc: "Domain-specific modular certifications tailored to corporate demand." },
  { title: "Communication & Soft Skills Development", desc: "Immersive spoken language and soft-skill workshops." },
  { title: "Aptitude & Interview Preparation", desc: "Comprehensive reasoning, quantitative test practice, and mock interviews." },
  { title: "Career Guidance & Counselling", desc: "One-on-one and cohort sessions mapping students to relevant career tracks." },
  { title: "Entrepreneurship & Self-Employment", desc: "Incubation support, business ideation, and government MSME schemes." },
  { title: "Industry Interaction & Career Exposure", desc: "Direct interactions with industry leaders, experts, and hiring panels." },
  { title: "Job Fairs & Mega Placement Drives", desc: "Access to state-level APSSDC job melas and recruiter fairs." }
];

export const competitiveExamsList = [
  {
    exam: "Banking Examinations",
    agency: "IBPS / SBI / RBI",
    roles: "Probationary Officers (PO), Clerical Cadres, Specialist Officers (SO)"
  },
  {
    exam: "Staff Selection Commission (SSC)",
    agency: "SSC",
    roles: "CGL (Combined Graduate Level), CHSL, MTS, CPO"
  },
  {
    exam: "Post-Graduate Entrance Tests (ICET / PGCET)",
    agency: "State Universities / APSCHE",
    roles: "MBA, MCA, M.Sc., M.Com. Admissions & Scholarships"
  },
  {
    exam: "Teacher Eligibility Tests (TET / CTET / DSC)",
    agency: "Central & State Education Boards",
    roles: "School Assistants, Secondary Grade Teachers, Central School Faculty"
  },
  {
    exam: "UPSC & State Public Service (APPSC)",
    agency: "UPSC / APPSC",
    roles: "Civil Services, Group 1, Group 2 Executive and Non-Executive Cadres"
  }
];

export const staticPlacementSections: Record<string, PlacementSection> = {
  "about-cell": {
    id: "about-cell",
    title: "About the Training & Placement Cell",
    category: "training",
    categoryTitle: "I. Training & Placement Cell",
    description: "Empowering women students with knowledge, skills, confidence, and professional competence for successful careers."
  },
  "placements-recruitment": {
    id: "placements-recruitment",
    title: "Placements & Recruitment",
    category: "training",
    categoryTitle: "I. Training & Placement Cell",
    description: "Transparent year-wise placement statistics, recruiting partners, campus placement drives, and career outcomes."
  },
  "apssdc": {
    id: "apssdc",
    title: "APSSDC – Skill Development & Employability Support",
    category: "training",
    categoryTitle: "I. Training & Placement Cell",
    description: "Collaborative skill enhancement and employability training in partnership with Andhra Pradesh State Skill Development Corporation."
  },
  "skill-development-areas": {
    id: "skill-development-areas",
    title: "Skill Development Training Areas",
    category: "training",
    categoryTitle: "I. Training & Placement Cell",
    description: "11 comprehensive training domains covering soft skills, ICT, AI, life skills, career counselling, and alumni support."
  },
  "internships-industry-exposure": {
    id: "internships-industry-exposure",
    title: "Internships & Industry Exposure",
    category: "training",
    categoryTitle: "I. Training & Placement Cell",
    description: "Industry-based internships, industrial visits, guest lectures, and experiential learning opportunities."
  },
  "competitive-exam-coaching": {
    id: "competitive-exam-coaching",
    title: "Competitive Exam Coaching",
    category: "training",
    categoryTitle: "I. Training & Placement Cell",
    description: "Specialized coaching for Banking, SSC, ICET/PGCET, TET, and UPSC competitive examinations."
  },
  "industry-professional-engagement": {
    id: "industry-professional-engagement",
    title: "Industry & Professional Engagement",
    category: "industry",
    categoryTitle: "II. Industry Linkages",
    description: "Bridging academia and industry through professional certifications, industrial visits, and corporate linkages."
  },
  "mous": {
    id: "mous",
    title: "MoUs – Memoranda of Understanding",
    category: "industry",
    categoryTitle: "II. Industry Linkages",
    description: "Institutional partnerships with leading industries, healthcare institutes, EdTech platforms, and research organizations."
  },
  "international-collaborations-global-engagement": {
    id: "international-collaborations-global-engagement",
    title: "International Collaborations & Global Engagement",
    category: "global",
    categoryTitle: "III. Internalization & Global Outreach",
    description: "Fostering global perspectives through international partnerships, cross-cultural learning, research, and global alumni networks."
  }
};

export interface MoUActivityItem {
  id: number;
  title: string;
  partner: string;
  dept: string;
  date: string;
  year: string;
  fileUrl: string;
}

export interface PlacementAlbumImage {
  url: string;
  caption?: string;
  title?: string;
  _key?: string;
}

export interface PlacementPhotoAlbum {
  _id?: string;
  id?: string;
  folderName: string;
  year: string;
  eventDate?: string;
  images: PlacementAlbumImage[];
}

export interface PlacementGalleryPhoto {
  id: string;
  year: string;
  title: string;
  caption: string;
  url: string;
}

export interface PlacementExternalLinks {
  nypunyamPortalUrl: string;
  apssdcPortalUrl?: string;
  aicteInternshipUrl?: string;
}

export const defaultPlacementExternalLinks: PlacementExternalLinks = {
  nypunyamPortalUrl: "https://naipunyam.ap.gov.in/",
  apssdcPortalUrl: "https://jobskills.apssdc.in/",
  aicteInternshipUrl: "https://internship.aicte-india.org/"
};

export const defaultInternshipAlbums: PlacementPhotoAlbum[] = [
  {
    id: "intern-album-2026",
    folderName: "2025-2026 Internships & Industry Visits",
    year: "2025-2026",
    eventDate: "2026-03-15",
    images: [
      {
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200",
        title: "Datavalley Full Stack Cloud Internship Batch",
        caption: "Students engaged in live full-stack web application development and cloud deployment training."
      },
      {
        url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1200",
        title: "Ala Hospital Clinical Laboratory Exposure",
        caption: "Life Sciences & Biotech students undergoing diagnostic testing and microbiology lab protocols."
      },
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
        title: "Tech Park & IT Solutions Industrial Visit",
        caption: "Industrial field tour to IT software development center exploring Agile sprint methodologies."
      },
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
        title: "Summer Apprenticeship Project Review",
        caption: "Students presenting summer internship project findings and system prototypes to industry mentors."
      }
    ]
  },
  {
    id: "intern-album-2025",
    folderName: "2024-2025 Industrial Exposure & Field Work",
    year: "2024-2025",
    eventDate: "2025-02-20",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
        title: "Pidilite Industries Polymer Plant Industrial Visit",
        caption: "Chemistry & Commerce students visiting manufacturing unit for hands-on polymer processing exposure."
      },
      {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
        title: "EXCER EdTech AI & Data Analytics Internship",
        caption: "Cohort working on machine learning datasets and predictive data visualization models."
      },
      {
        url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200",
        title: "Botanical Research Field Exposure",
        caption: "Botany students conducting botanical sample collection and biodiversity mapping."
      }
    ]
  },
  {
    id: "intern-album-2024",
    folderName: "2023-2024 Banking & Retail Internships",
    year: "2023-2024",
    eventDate: "2024-01-10",
    images: [
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
        title: "Banking & Financial Services Internship Cohort",
        caption: "Commerce students undergoing retail banking operations training at regional branches."
      }
    ]
  }
];

export const defaultCompetitiveAlbums: PlacementPhotoAlbum[] = [
  {
    id: "coach-album-2026",
    folderName: "2025-2026 Competitive Exam Coaching Batches",
    year: "2025-2026",
    eventDate: "2026-02-18",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200",
        title: "Banking & Financial Awareness Intensive Workshop",
        caption: "Dimensions Coaching experts delivering SBI & IBPS PO quantitative reasoning problem-solving tricks."
      },
      {
        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200",
        title: "Staff Selection Commission (SSC-CGL) Training Session",
        caption: "Interactive speed mathematics and logical deduction classroom session for final year aspirants."
      },
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
        title: "AP ICET / PGCET Masterclass & Mock Exam",
        caption: "Students solving simulated entrance test papers under time-bound exam hall conditions."
      },
      {
        url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200",
        title: "APPSC Group II & Civil Services Foundation Seminar",
        caption: "Guest lecture on General Studies, Indian Constitution, and Current Affairs strategy."
      }
    ]
  },
  {
    id: "coach-album-2025",
    folderName: "2024-2025 Teacher Eligibility & Entrance Prep",
    year: "2024-2025",
    eventDate: "2025-01-25",
    images: [
      {
        url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200",
        title: "TET & DSC Teacher Eligibility Preparation Cohort",
        caption: "Pedagogy and child psychology interactive guidance workshop for aspiring educators."
      },
      {
        url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
        title: "English Comprehension & Verbal Ability Bootcamp",
        caption: "Vocabulary building and critical reading comprehension drills for competitive examinations."
      }
    ]
  },
  {
    id: "coach-album-2024",
    folderName: "2023-2024 Analytical Reasoning Workshops",
    year: "2023-2024",
    eventDate: "2024-03-12",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
        title: "Banking Reasoning & Syllogism Shortcut Workshop",
        caption: "Focus session on analytical reasoning, data interpretation, and seating arrangement puzzles."
      }
    ]
  }
];

// Helper to flatten albums into individual photo cards for grid/lightbox
export function flattenAlbumsToPhotos(albums: PlacementPhotoAlbum[] = []): PlacementGalleryPhoto[] {
  const result: PlacementGalleryPhoto[] = [];
  albums.forEach((alb) => {
    (alb.images || []).forEach((img, idx) => {
      result.push({
        id: `${alb.id || alb.year}-${idx}`,
        year: alb.year,
        title: img.title || alb.folderName,
        caption: img.caption || "",
        url: img.url
      });
    });
  });
  return result;
}

export const defaultInternshipGalleries: PlacementGalleryPhoto[] = flattenAlbumsToPhotos(defaultInternshipAlbums);
export const defaultCompetitiveGalleries: PlacementGalleryPhoto[] = flattenAlbumsToPhotos(defaultCompetitiveAlbums);

export const mouActivitiesList: MoUActivityItem[] = [
  {
    id: 1,
    title: "Industry 4.0 & Cloud Tech Training Workshop",
    partner: "EXCER Edtech Pvt. Ltd.",
    dept: "Institutional Placement Cell",
    date: "Dec 2025",
    year: "2025-2026",
    fileUrl: "/documents/DefaultFile_1.pdf"
  },
  {
    id: 2,
    title: "6-Month Full Stack Web Development Internship",
    partner: "Datavalley India Pvt. Ltd.",
    dept: "Computer Science & IT",
    date: "Nov 2025",
    year: "2025-2026",
    fileUrl: "/documents/DefaultFile_1.pdf"
  },
  {
    id: 3,
    title: "Banking & SSC Fast-Track Coaching Modules",
    partner: "Dimensions Coaching Centre",
    dept: "Career Development Cell",
    date: "Oct 2025",
    year: "2025-2026",
    fileUrl: "/documents/DefaultFile_1.pdf"
  },
  {
    id: 4,
    title: "Clinical Diagnostics & Biochemical Testing Exposure",
    partner: "Ala Hospital",
    dept: "Life Sciences / Zoology",
    date: "Sep 2025",
    year: "2025-2026",
    fileUrl: "/documents/DefaultFile_1.pdf"
  },
  {
    id: 5,
    title: "Industrial Chemistry Workshop & Polymer Demo",
    partner: "Pidilite Industries Ltd., Guntur",
    dept: "Chemistry & Commerce",
    date: "Aug 2024",
    year: "2024-2025",
    fileUrl: "/documents/DefaultFile_1.pdf"
  },
  {
    id: 6,
    title: "Faculty & Student Botanical Field Exposure",
    partner: "Hindu College Collaboration",
    dept: "Botany",
    date: "Jul 2024",
    year: "2024-2025",
    fileUrl: "/documents/DefaultFile_1.pdf"
  }
];

