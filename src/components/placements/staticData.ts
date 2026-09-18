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
  name: string;
  sector: string;
  tier?: "top" | "major" | "emerging";
}

export const tpoOfficer: TPOOfficerInfo = {
  name: "Dr. J. Pratapa Reddy",
  degrees: "M.Sc., M.Phil., Ph.D.",
  designation: "Training & Placement Officer",
  institution: "St. Ann’s College for Women, Gorantla, Guntur",
  mobile: "+91 9440542609",
  landline: "0863-2236470",
  placementEmail: "gntstannsplacementcell@gmail.com",
  institutionEmail: "st_anns_coll@yahoo.co.in"
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
  { name: "Tata Consultancy Services (TCS)", sector: "IT & Digital Services", tier: "top" },
  { name: "Infosys", sector: "IT & Enterprise Consulting", tier: "top" },
  { name: "Wipro Technologies", sector: "IT & Cloud Solutions", tier: "top" },
  { name: "Capgemini", sector: "Global IT Services", tier: "top" },
  { name: "Tech Mahindra", sector: "IT & Telecom Services", tier: "top" },
  { name: "Cognizant Technology Solutions", sector: "Digital Transformation", tier: "top" },
  { name: "Accenture", sector: "Strategy & Technology", tier: "top" },
  { name: "HCL Technologies", sector: "IT Infrastructure & Cloud", tier: "top" },
  { name: "ICICI Bank", sector: "Banking & Financial Services", tier: "major" },
  { name: "HDFC Bank", sector: "Retail & Corporate Banking", tier: "major" },
  { name: "Hetero Drugs Ltd.", sector: "Pharmaceuticals & Healthcare", tier: "major" },
  { name: "Divi's Laboratories", sector: "Life Sciences & Biotech", tier: "major" },
  { name: "Genpact", sector: "BPO & Analytics", tier: "major" },
  { name: "Sutherland Global Services", sector: "Customer Experience & ITES", tier: "major" },
  { name: "Omega Healthcare", sector: "Healthcare IT & RCM", tier: "emerging" },
  { name: "Sri Chaitanya Institutions", sector: "Academic & EdTech", tier: "emerging" }
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
