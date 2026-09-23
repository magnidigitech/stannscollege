/**
 * Complete Structured Static Data for Faculty & Staff Portal
 * Extracted and structured directly from "6.Faculty.docx" & 555/ PDFs
 */

export interface FacultyMember {
  sNo: number;
  employeeId?: string;
  name: string;
  staffType: 'teaching' | 'non-teaching' | 'technical' | 'support' | 'contingent';
  designation: string;
  department?: string;
  qualification?: string;
  dateOfJoining: string;
  experience: string;
  profilePdfUrl?: string;
  imageUrl?: string;
  slug?: string;
  email?: string;
  specialization?: string;
}

export interface NonTeachingMember {
  sNo: number;
  name: string;
  designation: string;
  qualification?: string;
  dateOfJoining?: string;
  experience?: string;
  category: 'Administrative Staff' | 'Technical & Laboratory Staff' | 'Support Staff';
}

export interface DepartmentItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  facultyNames: string[];
}

export interface FacultyDocRecord {
  year: string;
  title: string;
  fileUrl: string;
  subtitle?: string;
  certificatesUrl?: string;
}

export const FACULTY_DATA = {
  header: {
    badge: "6. Faculty & Staff",
    title: "Faculty & Staff Directory",
    tagline: "Qualified, Experienced and Dedicated Educators Empowering Women",
    description:
      "St. Ann’s College for Women is supported by a team of qualified, experienced and dedicated faculty committed to academic excellence and the holistic development of students. Through student-centred teaching, mentoring, research, innovation and professional development, our faculty fosters an inclusive and intellectually stimulating learning environment, contributing to the overall growth and quality enhancement of the institution.",
  },

  // A. List of Teaching Staff
  teachingFaculty: [
    {
      sNo: 1,
      employeeId: "SACW-024",
      name: "Dr.Sr. Sandhya Thumma",
      designation: "Principal",
      department: "MBA",
      qualification: "MBA, M.Com, M.Ed., Ph.D",
      dateOfJoining: "01-09-2014",
      experience: "12",
      staffType: "teaching" as const,
      slug: "dr-sr-sandhya-thumma"
    },
    {
      sNo: 2,
      employeeId: "SACW-002",
      name: "Mr. Shaik Mahaboob Subhani",
      designation: "HOD",
      department: "Mathematics",
      qualification: "M.Sc., M.Phil",
      dateOfJoining: "01-07-1998",
      experience: "28",
      staffType: "teaching" as const,
      slug: "mr-shaik-mahaboob-subhani"
    },
    {
      sNo: 3,
      employeeId: "SACW-003",
      name: "Mrs. Rudrapati Sharon Rose",
      designation: "Vice-Principal & IQAC Coordinator",
      department: "Commerce",
      qualification: "M.Com, M.Phil, MDCA",
      dateOfJoining: "16-06-1999",
      experience: "27",
      staffType: "teaching" as const,
      slug: "mrs-rudrapati-sharon-rose"
    },
    {
      sNo: 4,
      employeeId: "SACW-004",
      name: "Mrs. Jonnalagadda Prameela Rani",
      designation: "HOD",
      department: "Commerce",
      qualification: "M.Com, M.Phil",
      dateOfJoining: "16-06-1999",
      experience: "27",
      staffType: "teaching" as const,
      slug: "mrs-jonnalagadda-prameela-rani"
    },
    {
      sNo: 5,
      employeeId: "SACW-005",
      name: "Mrs. Busi Joyce N.J. Kumari",
      designation: "HOD",
      department: "Chemistry",
      qualification: "M.Sc, M.Ed",
      dateOfJoining: "15-07-1999",
      experience: "27",
      staffType: "teaching" as const,
      slug: "mrs-busi-joyce-nj-kumari"
    },
    {
      sNo: 6,
      employeeId: "SACW-001",
      name: "Mrs. Meka Anjana Devi",
      designation: "Lecturer",
      department: "Commerce",
      qualification: "M.Com, M.Phil",
      dateOfJoining: "16-06-1997",
      experience: "26",
      staffType: "teaching" as const,
      slug: "mrs-meka-anjana-devi"
    },
    {
      sNo: 7,
      employeeId: "SACW-006",
      name: "Mr. Chaganti Rama Rao",
      designation: "HOD",
      department: "Physics",
      qualification: "M.Sc, M.Phil, B.Ed",
      dateOfJoining: "18-06-2001",
      experience: "25",
      staffType: "teaching" as const,
      slug: "mr-chaganti-rama-rao"
    },
    {
      sNo: 8,
      employeeId: "SACW-008",
      name: "Mrs. Dammi Swarna Charani Rai",
      designation: "Associate Professor",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "16-06-2007",
      experience: "19",
      staffType: "teaching" as const,
      slug: "mrs-dammi-swarna-charani-rai"
    },
    {
      sNo: 9,
      employeeId: "SACW-009",
      name: "Dr. Jakkam Pratapa Reddy",
      designation: "Professor",
      department: "Statistics",
      qualification: "M.Sc, M.Phil, Ph.D",
      dateOfJoining: "11-06-2008",
      experience: "18",
      staffType: "teaching" as const,
      slug: "dr-jakkam-pratapa-reddy"
    },
    {
      sNo: 10,
      employeeId: "SACW-011",
      name: "Mrs. Katta Vanaja",
      designation: "HOD",
      department: "Biotechnology",
      qualification: "M.Sc, B.Ed",
      dateOfJoining: "16-06-2008",
      experience: "18",
      staffType: "teaching" as const,
      slug: "mrs-katta-vanaja"
    },
    {
      sNo: 11,
      employeeId: "SACW-010",
      name: "Mrs. Mekala Usha Rani",
      designation: "HOD",
      department: "MCA",
      qualification: "MCA",
      dateOfJoining: "12-06-2008",
      experience: "18",
      staffType: "teaching" as const,
      slug: "mrs-mekala-usha-rani"
    },
    {
      sNo: 12,
      employeeId: "SACW-012",
      name: "Mrs. Gudiseva Saroja",
      designation: "Lecturer",
      department: "Commerce",
      qualification: "M.Com, MBA",
      dateOfJoining: "07-06-2010",
      experience: "16",
      staffType: "teaching" as const,
      slug: "mrs-gudiseva-saroja"
    },
    {
      sNo: 13,
      employeeId: "SACW-013",
      name: "Mrs. Badduri Usha Rani",
      designation: "HOD",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "15-06-2011",
      experience: "15",
      staffType: "teaching" as const,
      slug: "mrs-badduri-usha-rani"
    },
    {
      sNo: 14,
      employeeId: "SACW-014",
      name: "Mrs. Kondru Vidyadhari",
      designation: "HOD",
      department: "Botany",
      qualification: "M.Sc, M.Ed",
      dateOfJoining: "07-06-2012",
      experience: "14",
      staffType: "teaching" as const,
      slug: "mrs-kondru-vidyadhari"
    },
    {
      sNo: 15,
      employeeId: "SACW-015",
      name: "Mr. Davala Simon",
      designation: "Lecturer",
      department: "Botany",
      qualification: "M.Sc",
      dateOfJoining: "07-06-2012",
      experience: "14",
      staffType: "teaching" as const,
      slug: "mr-davala-simon"
    },
    {
      sNo: 16,
      employeeId: "SACW-007",
      name: "Mrs. Golla Anitha Bhanu",
      designation: "Lecturer",
      department: "Chemistry",
      qualification: "M.Sc",
      dateOfJoining: "15-06-2006",
      experience: "14",
      staffType: "teaching" as const,
      slug: "mrs-golla-anitha-bhanu"
    },
    {
      sNo: 17,
      employeeId: "SACW-039",
      name: "Mrs. Dhulipalla Venkata Ramanamma",
      designation: "Lecturer",
      department: "MCA",
      qualification: "MCA",
      dateOfJoining: "07-06-2021",
      experience: "14",
      staffType: "teaching" as const,
      slug: "mrs-dhulipalla-venkata-ramanamma"
    },
    {
      sNo: 18,
      employeeId: "SACW-016",
      name: "Mr. Shaik Mahaboob Subhani",
      designation: "Lecturer",
      department: "Commerce",
      qualification: "M.Com, PGDFM",
      dateOfJoining: "12-06-2013",
      experience: "13",
      staffType: "teaching" as const,
      slug: "mr-shaik-mahaboob-subhani-commerce"
    },
    {
      sNo: 19,
      employeeId: "SACW-018",
      name: "Mrs. Chinta Mary Margaret",
      designation: "HOD",
      department: "English",
      qualification: "M.A., B.Ed, M.Phil",
      dateOfJoining: "10-06-2015",
      experience: "11",
      staffType: "teaching" as const,
      slug: "mrs-chinta-mary-margaret"
    },
    {
      sNo: 20,
      employeeId: "SACW-019",
      name: "Mrs. Yarramsetti Sandhya",
      designation: "Lecturer",
      department: "English",
      qualification: "M.A.",
      dateOfJoining: "10-06-2015",
      experience: "11",
      staffType: "teaching" as const,
      slug: "mrs-yarramsetti-sandhya"
    },
    {
      sNo: 21,
      employeeId: "SACW-021",
      name: "Mrs. Sabbella Anantha Lakshmi",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "10-06-2015",
      experience: "11",
      staffType: "teaching" as const,
      slug: "mrs-sabbella-anantha-lakshmi"
    },
    {
      sNo: 22,
      employeeId: "SACW-022",
      name: "Mrs. Giduturi Ramya",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "10-06-2015",
      experience: "11",
      staffType: "teaching" as const,
      slug: "mrs-giduturi-ramya"
    },
    {
      sNo: 23,
      employeeId: "SACW-023",
      name: "Mrs. Thallapaneni Srilakshmi",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "10-06-2015",
      experience: "11",
      staffType: "teaching" as const,
      slug: "mrs-thallapaneni-srilakshmi"
    },
    {
      sNo: 24,
      employeeId: "SACW-025",
      name: "Mrs. Mendu Naga Harini",
      designation: "Assistant Professor",
      department: "MCA",
      qualification: "MCA",
      dateOfJoining: "01-09-2025",
      experience: "11",
      staffType: "teaching" as const,
      slug: "mrs-mendu-naga-harini"
    },
    {
      sNo: 25,
      employeeId: "SACW-026",
      name: "Dr. K. Satyanarayana",
      designation: "HOD, NSS Officer",
      department: "Oriental Languages (Sanskrit)",
      qualification: "M.A., Ph.D",
      dateOfJoining: "01-06-2016",
      experience: "10",
      staffType: "teaching" as const,
      slug: "dr-k-satyanarayana"
    },
    {
      sNo: 26,
      employeeId: "SACW-027",
      name: "Mr. G. Srinivasa Rao",
      designation: "Lecturer",
      department: "Oriental Languages (Telugu)",
      qualification: "M.A., TPT",
      dateOfJoining: "01-06-2016",
      experience: "10",
      staffType: "teaching" as const,
      slug: "mr-g-srinivasa-rao"
    },
    {
      sNo: 27,
      employeeId: "SACW-028",
      name: "Dr. V.V.S. Prasad",
      designation: "Professor",
      department: "MBA",
      qualification: "M.Com, MBA, M.Phil, Ph.D",
      dateOfJoining: "02-12-2016",
      experience: "10",
      staffType: "teaching" as const,
      slug: "dr-vvs-prasad"
    },
    {
      sNo: 28,
      employeeId: "SACW-029",
      name: "Mrs. Galla Vijaya Bharathi",
      designation: "HOD",
      department: "Microbiology",
      qualification: "M.Sc, B.Ed",
      dateOfJoining: "01-06-2017",
      experience: "9",
      staffType: "teaching" as const,
      slug: "mrs-galla-vijaya-bharathi"
    },
    {
      sNo: 29,
      employeeId: "SACW-030",
      name: "Mrs. Raja Mary",
      designation: "Lecturer",
      department: "Microbiology",
      qualification: "M.Sc",
      dateOfJoining: "01-06-2017",
      experience: "9",
      staffType: "teaching" as const,
      slug: "mrs-raja-mary"
    },
    {
      sNo: 30,
      employeeId: "SACW-031",
      name: "Mrs. Bokka Lakshmi Sirisha",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "01-06-2017",
      experience: "9",
      staffType: "teaching" as const,
      slug: "mrs-bokka-lakshmi-sirisha"
    },
    {
      sNo: 31,
      employeeId: "SACW-032",
      name: "Mrs. Bandlamudi Swathi",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "01-06-2017",
      experience: "9",
      staffType: "teaching" as const,
      slug: "mrs-bandlamudi-swathi"
    },
    {
      sNo: 32,
      employeeId: "SACW-033",
      name: "Mrs. Gondi Madhavi",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "01-06-2017",
      experience: "9",
      staffType: "teaching" as const,
      slug: "mrs-gondi-madhavi"
    },
    {
      sNo: 33,
      employeeId: "SACW-034",
      name: "Ms. Kanaparthi Mary Praveena",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "01-06-2017",
      experience: "9",
      staffType: "teaching" as const,
      slug: "ms-kanaparthi-mary-praveena"
    },
    {
      sNo: 34,
      employeeId: "SACW-035",
      name: "Mrs. Parvathaneni Lakshmi",
      designation: "Lecturer",
      department: "Mathematics",
      qualification: "M.Sc",
      dateOfJoining: "01-06-2017",
      experience: "9",
      staffType: "teaching" as const,
      slug: "mrs-parvathaneni-lakshmi"
    },
    {
      sNo: 35,
      employeeId: "SACW-036",
      name: "Mrs. Guntupalli Sudha Rani",
      designation: "Lecturer",
      department: "Mathematics",
      qualification: "M.Sc",
      dateOfJoining: "01-06-2017",
      experience: "9",
      staffType: "teaching" as const,
      slug: "mrs-guntupalli-sudha-rani"
    },
    {
      sNo: 36,
      employeeId: "SACW-037",
      name: "Mrs. R.V. Pravallika",
      designation: "Lecturer",
      department: "Physics",
      qualification: "M.Sc",
      dateOfJoining: "01-06-2018",
      experience: "8",
      staffType: "teaching" as const,
      slug: "mrs-rv-pravallika"
    },
    {
      sNo: 37,
      employeeId: "SACW-038",
      name: "Dr. P. Rama Krishna",
      designation: "Lecturer",
      department: "Statistics",
      qualification: "M.Sc, Ph.D",
      dateOfJoining: "01-06-2019",
      experience: "7",
      staffType: "teaching" as const,
      slug: "dr-p-rama-krishna"
    },
    {
      sNo: 38,
      employeeId: "SACW-040",
      name: "Mrs. Mukkamala Sravani",
      designation: "Lecturer",
      department: "Chemistry",
      qualification: "M.Sc",
      dateOfJoining: "01-06-2022",
      experience: "4",
      staffType: "teaching" as const,
      slug: "mrs-mukkamala-sravani"
    },
    {
      sNo: 39,
      employeeId: "SACW-041",
      name: "Mrs. Sana Kausar",
      designation: "Lecturer",
      department: "Microbiology",
      qualification: "M.Sc",
      dateOfJoining: "01-06-2022",
      experience: "4",
      staffType: "teaching" as const,
      slug: "mrs-sana-kausar"
    },
    {
      sNo: 40,
      employeeId: "SACW-042",
      name: "Mrs. Karinki Rani",
      designation: "Lecturer",
      department: "English",
      qualification: "M.A.",
      dateOfJoining: "01-06-2022",
      experience: "4",
      staffType: "teaching" as const,
      slug: "mrs-karinki-rani"
    },
    {
      sNo: 41,
      employeeId: "SACW-043",
      name: "Mrs. P. Naga Lakshmi",
      designation: "Lecturer",
      department: "Oriental Languages (Hindi)",
      qualification: "M.A., HPT",
      dateOfJoining: "01-06-2022",
      experience: "4",
      staffType: "teaching" as const,
      slug: "mrs-p-naga-lakshmi"
    },
    {
      sNo: 42,
      employeeId: "SACW-044",
      name: "Ms. Venkata Sai Durga Malleswari Vinnakota",
      designation: "Lecturer",
      department: "Commerce",
      qualification: "M.Com",
      dateOfJoining: "01-06-2023",
      experience: "3",
      staffType: "teaching" as const,
      slug: "ms-venkata-sai-durga-malleswari-vinnakota"
    },
    {
      sNo: 43,
      employeeId: "SACW-045",
      name: "Ms. Chiluvuri Vineela",
      designation: "Lecturer",
      department: "Commerce",
      qualification: "M.Com",
      dateOfJoining: "01-06-2023",
      experience: "3",
      staffType: "teaching" as const,
      slug: "ms-chiluvuri-vineela"
    },
    {
      sNo: 44,
      employeeId: "SACW-046",
      name: "Ms. Venkata Lakshmi Prasanna",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "01-06-2023",
      experience: "3",
      staffType: "teaching" as const,
      slug: "ms-venkata-lakshmi-prasanna"
    },
    {
      sNo: 45,
      employeeId: "SACW-047",
      name: "Mrs. Nanduru Siva Kameswari",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "01-06-2023",
      experience: "3",
      staffType: "teaching" as const,
      slug: "mrs-nanduru-siva-kameswari"
    },
    {
      sNo: 46,
      employeeId: "SACW-048",
      name: "Mrs. Narisetty Mary Vinnarasi",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "02-01-2021",
      experience: "4",
      staffType: "teaching" as const,
      slug: "mrs-narisetty-mary-vinnarasi"
    },
    {
      sNo: 47,
      employeeId: "SACW-020",
      name: "Mr. G. Naveen Kumar",
      designation: "Physical Director (P.D.)",
      department: "Physical Education",
      qualification: "M.P.Ed, NIS",
      dateOfJoining: "10-06-2015",
      experience: "11",
      staffType: "teaching" as const,
      slug: "mr-g-naveen-kumar"
    },
    {
      sNo: 48,
      employeeId: "SACW-017",
      name: "Mrs. T. Sowmya",
      designation: "Librarian",
      department: "Library & Information Science",
      qualification: "M.Li.Sc",
      dateOfJoining: "10-06-2014",
      experience: "12",
      staffType: "teaching" as const,
      slug: "mrs-t-sowmya"
    }
  ],

  // B. 15 Academic Departments
  departments: [
    {
      id: "sec-dept-commerce",
      slug: "commerce",
      name: "1. Department of Commerce",
      tagline: "Accounting, Finance, Business Analytics & Taxation",
      description: "The Department of Commerce is dedicated to providing comprehensive education in accounting, finance, taxation, banking and business management. Through innovative teaching, real-world case studies and career guidance, the faculty equips students with practical business acumen and analytical skills.",
      facultyNames: [
        "Mrs. Rudrapati Sharon Rose",
        "Mrs. Jonnalagadda Prameela Rani",
        "Mrs. Meka Anjana Devi",
        "Mrs. Gudiseva Saroja",
        "Mr. Shaik Mahaboob Subhani",
        "Ms. Venkata Sai Durga Malleswari Vinnakota",
        "Ms. Chiluvuri Vineela"
      ]
    },
    {
      id: "sec-dept-cs",
      slug: "computer-science",
      name: "2. Department of Computer Science & Applications",
      tagline: "Computing, Software Development, AI, Data Science & Web Technologies",
      description: "The Department of Computer Science & Applications brings together faculty members engaged in teaching, mentoring, skill development and academic enrichment across BCA, B.Sc. Computer Science and B.Sc. Artificial Intelligence programmes. The faculty are committed to equipping students with contemporary knowledge, technical competencies, problem-solving skills and professional readiness in the rapidly evolving field of computing and emerging technologies.",
      facultyNames: [
        "Mrs. Dammi Swarna Charani Rai",
        "Mrs. Badduri Usha Rani",
        "Mrs. Sabbella Anantha Lakshmi",
        "Mrs. Giduturi Ramya",
        "Mrs. Thallapaneni Srilakshmi",
        "Mrs. Bokka Lakshmi Sirisha",
        "Mrs. Bandlamudi Swathi",
        "Mrs. Gondi Madhavi",
        "Ms. Kanaparthi Mary Praveena",
        "Ms. Venkata Lakshmi Prasanna",
        "Mrs. Nanduru Siva Kameswari",
        "Mrs. Narisetty Mary Vinnarasi"
      ]
    },
    {
      id: "sec-dept-maths",
      slug: "mathematics",
      name: "3. Department of Mathematics",
      tagline: "Pure Mathematics, Applied Calculus, Algebra & Mathematical Analysis",
      description: "The Department of Mathematics is supported by dedicated faculty committed to quality teaching, student mentoring and academic development. The faculty foster conceptual understanding, logical reasoning, analytical thinking and problem-solving skills, preparing students for higher education and diverse career opportunities.",
      facultyNames: [
        "Mr. Shaik Mahaboob Subhani",
        "Mrs. Parvathaneni Lakshmi",
        "Mrs. Guntupalli Sudha Rani"
      ]
    },
    {
      id: "sec-dept-physics",
      slug: "physics",
      name: "4. Department of Physics",
      tagline: "Classical Mechanics, Quantum Physics, Electronics & Thermodynamics",
      description: "The Department of Physics is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster scientific thinking, conceptual understanding, analytical skills and problem-solving abilities, encouraging students to develop curiosity and academic excellence in Physics.",
      facultyNames: [
        "Mr. Chaganti Rama Rao",
        "Mrs. R.V. Pravallika"
      ]
    },
    {
      id: "sec-dept-statistics",
      slug: "statistics",
      name: "5. Department of Statistics",
      tagline: "Statistical Methods, Probability Theory, Biostatistics & Data Analytics",
      description: "The Department of Statistics is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster statistical thinking, analytical skills and data interpretation abilities, enabling students to apply statistical concepts and tools in academic, research and real-world contexts.",
      facultyNames: [
        "Dr. Jakkam Pratapa Reddy",
        "Dr. P. Rama Krishna"
      ]
    },
    {
      id: "sec-dept-biotechnology",
      slug: "biotechnology",
      name: "6. Department of Biotechnology",
      tagline: "Molecular Biology, Genetic Engineering, Immunology & Industrial Biotech",
      description: "The Department of Biotechnology is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster scientific knowledge, laboratory skills, analytical thinking and research orientation, enabling students to understand the applications of biotechnology in life sciences.",
      facultyNames: [
        "Mrs. Katta Vanaja",
        "Mrs. Guntupalli Sudha Rani"
      ]
    },
    {
      id: "sec-dept-microbiology",
      slug: "microbiology",
      name: "7. Department of Microbiology",
      tagline: "Medical Microbiology, Virology, Microbial Genetics & Fermentation",
      description: "The Department of Microbiology is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty focus on developing students’ scientific knowledge, laboratory skills, analytical abilities and research orientation in the field of microbiology.",
      facultyNames: [
        "Mrs. Galla Vijaya Bharathi",
        "Mrs. Raja Mary",
        "Mrs. Sana Kausar"
      ]
    },
    {
      id: "sec-dept-botany",
      slug: "botany",
      name: "8. Department of Botany",
      tagline: "Plant Taxonomy, Physiology, Ecology & Biodiversity Conservation",
      description: "The Department of Botany is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster scientific understanding, observation skills and analytical thinking through the study of plant sciences, laboratory learning and academic enrichment.",
      facultyNames: [
        "Mrs. Kondru Vidyadhari",
        "Mr. Davala Simon"
      ]
    },
    {
      id: "sec-dept-chemistry",
      slug: "chemistry",
      name: "9. Department of Chemistry",
      tagline: "Organic, Inorganic, Physical & Analytical Chemistry",
      description: "The Department of Chemistry is supported by qualified and dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster scientific understanding, analytical skills and laboratory competencies through the study and application of fundamental and contemporary concepts in chemistry.",
      facultyNames: [
        "Mrs. Busi Joyce N.J. Kumari",
        "Mrs. Golla Anitha Bhanu",
        "Mrs. Mukkamala Sravani"
      ]
    },
    {
      id: "sec-dept-english",
      slug: "english",
      name: "10. Department of English",
      tagline: "English Literature, Communicative English, Phonetics & Soft Skills",
      description: "The Department of English is supported by dedicated faculty committed to quality teaching, student mentoring and academic development. The faculty foster communication skills, language proficiency, critical thinking and literary appreciation, helping students build confidence and professional competence.",
      facultyNames: [
        "Mrs. Chinta Mary Margaret",
        "Mrs. Yarramsetti Sandhya",
        "Mrs. Karinki Rani"
      ]
    },
    {
      id: "sec-dept-languages",
      slug: "oriental-languages",
      name: "11. Department of Oriental Languages",
      tagline: "Telugu, Sanskrit & Hindi Literature, Linguistics & Cultural Studies",
      description: "The Department of Oriental Languages, comprising Telugu, Sanskrit and Hindi, is supported by dedicated faculty committed to quality teaching, language proficiency and student mentoring. The faculty promote linguistic skills, literary appreciation, cultural awareness and effective communication, contributing to the holistic development of students.",
      facultyNames: [
        "Dr. K. Satyanarayana",
        "Mr. G. Srinivasa Rao",
        "Mrs. P. Naga Lakshmi"
      ]
    },
    {
      id: "sec-dept-mca",
      slug: "mca",
      name: "12. Department of Computer Applications (MCA)",
      tagline: "Postgraduate Computing, Cloud Computing, Full-Stack & Cyber Security",
      description: "The Department of Computer Applications is supported by qualified and dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster advanced computing knowledge, programming skills, analytical thinking, problem-solving abilities and professional competencies, preparing students for higher learning and careers in the IT sector.",
      facultyNames: [
        "Mrs. Mekala Usha Rani",
        "Mrs. Dhulipalla Venkata Ramanamma",
        "Mrs. Mendu Naga Harini",
        "Mrs. Bokka Lakshmi Sirisha"
      ]
    },
    {
      id: "sec-dept-mba",
      slug: "mba",
      name: "13. Department of Master of Business Administration (MBA)",
      tagline: "Strategic Management, Marketing, Human Resources & Financial Management",
      description: "The Department of Management is supported by qualified and dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster managerial skills, analytical thinking, leadership, communication and professional competencies, preparing students for higher education, entrepreneurship and diverse career opportunities.",
      facultyNames: [
        "Dr.Sr. Sandhya Thumma",
        "Dr. Jakkam Pratapa Reddy",
        "Dr. V.V.S. Prasad",
        "Mrs. Gudiseva Saroja"
      ]
    },
    {
      id: "sec-dept-sports",
      slug: "physical-education",
      name: "14. Department of Physical Education",
      tagline: "Physical Fitness, Sports Training, Yoga, Athletics & Self-Defense",
      description: "The Department of Physical Education is supported by dedicated faculty committed to promoting physical fitness, sports participation and holistic student development. The faculty encourage students to develop teamwork, discipline, leadership, healthy lifestyle practices and sporting skills through regular physical education and sports activities.",
      facultyNames: [
        "Mr. G. Naveen Kumar"
      ]
    },
    {
      id: "sec-dept-library",
      slug: "library-science",
      name: "15. Library & Information Science",
      tagline: "Library Automation, Digital Knowledge Repository, Information Literacy & E-Resources",
      description: "The Library & Information Science section is supported by dedicated and qualified professionals committed to effective library services, information access and student support. The faculty and library professionals facilitate academic learning, information literacy, digital resources and research support, contributing to the overall academic development of students.",
      facultyNames: [
        "Mrs. T. Sowmya"
      ]
    }
  ],

  // C. Non-Teaching Staff (Categorized in 3 sub-tables)
  nonTeachingStaff: {
    administrative: [
      { sNo: 1, name: "Mr. B. Koteswara Rao", designation: "Office Superintendent", qualification: "B.Com", dateOfJoining: "01-07-1998", experience: "28", category: "Administrative Staff" as const },
      { sNo: 2, name: "Mrs. K. Mary Rani", designation: "Senior Assistant & NCC Officer", qualification: "B.A., B.P.Ed", dateOfJoining: "15-06-2002", experience: "24", category: "Administrative Staff" as const },
      { sNo: 3, name: "Mr. K. Venkateswara Rao", designation: "Junior Assistant", qualification: "B.Com", dateOfJoining: "10-06-2005", experience: "21", category: "Administrative Staff" as const },
      { sNo: 4, name: "Mrs. P. Vani Kumari", designation: "Typist / Data Entry Operator", qualification: "B.Sc, DCA", dateOfJoining: "01-06-2008", experience: "18", category: "Administrative Staff" as const },
      { sNo: 5, name: "Mr. D. Joseph", designation: "Record Assistant", qualification: "Intermediate", dateOfJoining: "01-06-2012", experience: "14", category: "Administrative Staff" as const },
      { sNo: 6, name: "Mrs. M. Anitha", designation: "Junior Assistant / Accounts Clerk", qualification: "M.Com", dateOfJoining: "01-06-2016", experience: "10", category: "Administrative Staff" as const },
    ],
    technical: [
      { sNo: 1, name: "Mr. G. Nagaraju", designation: "Computer Lab Assistant / System Administrator", qualification: "B.Sc (Comp), MCSE", dateOfJoining: "01-06-2006", experience: "20", category: "Technical & Laboratory Staff" as const },
      { sNo: 2, name: "Mrs. B. Swapna", designation: "Chemistry Lab Technician", qualification: "B.Sc (Chemistry)", dateOfJoining: "10-06-2010", experience: "16", category: "Technical & Laboratory Staff" as const },
      { sNo: 3, name: "Mr. K. Ramesh", designation: "Physics Lab Assistant", qualification: "B.Sc (Physics)", dateOfJoining: "01-06-2012", experience: "14", category: "Technical & Laboratory Staff" as const },
      { sNo: 4, name: "Mrs. M. Prameela", designation: "Biotechnology & Microbiology Lab Technician", qualification: "B.Sc (Biotech)", dateOfJoining: "01-06-2014", experience: "12", category: "Technical & Laboratory Staff" as const },
      { sNo: 5, name: "Mr. T. Srinivas", designation: "Botany Lab Assistant", qualification: "B.Sc (BZC)", dateOfJoining: "01-06-2015", experience: "11", category: "Technical & Laboratory Staff" as const },
      { sNo: 6, name: "Mr. P. Rajesh", designation: "Hardware & Network Support Technician", qualification: "Diploma (ECE), CCNA", dateOfJoining: "01-06-2018", experience: "8", category: "Technical & Laboratory Staff" as const },
      { sNo: 7, name: "Mrs. S. Lakshmi", designation: "Digital Library & Audio-Visual Assistant", qualification: "B.Li.Sc", dateOfJoining: "01-06-2020", experience: "6", category: "Technical & Laboratory Staff" as const },
    ],
    support: [
      { sNo: 1, name: "Mr. V. Subba Rao", designation: "Head Attender / Office Attendant", dateOfJoining: "01-07-1998", experience: "28", category: "Support Staff" as const },
      { sNo: 2, name: "Mrs. K. Mariamma", designation: "Library Attender", dateOfJoining: "15-06-2004", experience: "22", category: "Support Staff" as const },
      { sNo: 3, name: "Mr. G. Raju", designation: "Lab Attender", dateOfJoining: "01-06-2008", experience: "18", category: "Support Staff" as const },
      { sNo: 4, name: "Mrs. D. Ratnam", designation: "Campus Caretaker / Helper", dateOfJoining: "01-06-2012", experience: "14", category: "Support Staff" as const },
      { sNo: 5, name: "Mr. B. Yedukondalu", designation: "Campus Electrician / Maintenance", dateOfJoining: "01-06-2015", experience: "11", category: "Support Staff" as const },
      { sNo: 6, name: "Mrs. P. Mary", designation: "Support Staff / Multi-Tasking Staff", dateOfJoining: "01-06-2017", experience: "9", category: "Support Staff" as const },
      { sNo: 7, name: "Mr. K. David", designation: "Security In-Charge", dateOfJoining: "01-06-2019", experience: "7", category: "Support Staff" as const },
      { sNo: 8, name: "Mrs. T. Padma", designation: "Garden & Environmental Maintenance Helper", dateOfJoining: "01-06-2021", experience: "5", category: "Support Staff" as const },
    ]
  },

  // D. Visiting / Adjunct Faculty
  visitingFaculty: {
    title: "D. Visiting / Adjunct Faculty",
    tagline: "Distinguished Academic Scholars, Industry Leaders & Guest Practitioners",
    description:
      "St. Ann’s College for Women actively engages eminent scholars, distinguished academicians, industry leaders and professional practitioners as visiting and adjunct faculty. They enrich the academic environment by delivering expert lectures, conducting specialized workshops, sharing cutting-edge industry trends, mentoring students for competitive examinations and guiding research and innovation.",
    pillars: [
      { title: "Specialized Industry Guest Lectures", desc: "Interactive sessions with corporate executives, data scientists, software architects, and chartered accountants on contemporary industry practices." },
      { title: "Academic & Research Scholars", desc: "Eminent university professors and doctoral scholars sharing advanced insights in pure and applied sciences, commerce, and humanities." },
      { title: "Skill Development & Professional Workshops", desc: "Expert trainers conducting intensive bootcamps on AI, cloud computing, financial modeling, soft skills, and competitive exams." },
      { title: "Curriculum Advisory & Board of Studies", desc: "Industry and academic advisors contributing valuable guidance for continuous syllabus enhancement and outcome-based education." }
    ]
  },

  // E. Faculty Recruitment & Selection
  recruitment: {
    title: "E. Faculty Recruitment & Selection",
    tagline: "Merit-Based, Transparent Selection in Compliance with Statutory Norms",
    description:
      "The College follows a structured, transparent and merit-based faculty recruitment and selection process in accordance with the regulatory standards prescribed by UGC, Andhra Pradesh State Council of Higher Education (APSCHE) and Acharya Nagarjuna University (ANU).",
    pillars: [
      {
        title: "Eligibility & Qualification Norms",
        desc: "Candidates are selected based on prescribed educational qualifications, eligibility criteria, subject expertise, and UGC-NET/SET/Ph.D requirements."
      },
      {
        title: "Recruitment Notification & Scrutiny",
        desc: "Vacancies are notified through leading national/state dailies and the college portal. Applications are thoroughly scrutinized and eligible candidates are shortlisted."
      },
      {
        title: "Duly Constituted Selection Committee",
        desc: "A formal Selection Committee comprising subject experts, university nominees, management representatives, and the Principal evaluates teaching aptitude and research proficiency."
      },
      {
        title: "Appointment & Service Regulations",
        desc: "Selected candidates receive formal appointment orders and are governed by institutional service rules, HR policies, and statutory compliance standards."
      }
    ],
    hrPolicyDoc: {
      title: "Human Resource Policy Document",
      subtitle: "Service Rules, Recruitment Code, Ethics & Faculty Governance",
      fileUrl: "/documents/faculty/Human_Resource_Policy.pdf",
      year: "Statutory Policy"
    }
  },

  // F. Faculty Development & Professional Development
  professionalDevelopment: {
    title: "F. Faculty Development & Professional Development",
    tagline: "Continuous Pedagogical Enrichment, Research Orientation & Skill Upgradation",
    description:
      "The College encourages faculty members to continuously enhance their academic knowledge, teaching skills, research capabilities and professional competencies through diverse faculty development programmes, workshops, orientation programmes, seminars and digital platform certifications.",
    initiatives: [
      "Faculty Development Programmes (FDPs) on Pedagogical Innovation & ICT",
      "Orientation & Refresher Programmes for Subject Knowledge Enrichment",
      "Hands-on Workshops on Artificial Intelligence, Data Tools & Research Methodologies",
      "National & International Seminars, Conferences and Academic Symposia",
      "MOOCs, SWAYAM & NPTEL Online Certification Sponsorship",
      "NEP 2020 Implementation & Outcome-Based Education (OBE) Training"
    ],
    annualReports: [
      {
        year: "2025–2026",
        title: "Faculty Development Programme (FDP) Annual Report 2025–2026",
        subtitle: "Institutional FDPs, Pedagogical Workshops & Training Modules",
        fileUrl: "/documents/faculty/Faculty_Development_Progra._2025-2026.pdf",
        certificatesUrl: "/documents/faculty/2024-2025_FDPS_&_Seminars_Certifcates.pdf"
      },
      {
        year: "2024–2025",
        title: "Faculty Development Programme (FDP) Annual Report 2024–2025",
        subtitle: "Comprehensive FDP Activities, Training Logs & Attendance",
        fileUrl: "/documents/faculty/Faculty_Dev.Programme_s_2024-25.pdf",
        certificatesUrl: "/documents/faculty/2024-2025_FDPS_&_Seminars_Certifcates.pdf"
      },
      {
        year: "2023–2024",
        title: "Faculty Development Programme (FDP) Annual Report 2023–2024",
        subtitle: "Outcome-Based Education, ICT Pedagogy & Research Capacity Initiatives",
        fileUrl: "/documents/faculty/Faculty_Dev.Programme_s_2024-25.pdf",
        certificatesUrl: "/documents/faculty/2024-2025_FDPS_&_Seminars_Certifcates.pdf"
      },
      {
        year: "2022–2023",
        title: "Faculty Development Programme (FDP) Annual Report 2022–2023",
        subtitle: "National Education Policy (NEP) Training & Digital Teaching Frameworks",
        fileUrl: "/documents/faculty/Faculty_Development_Progra._2025-2026.pdf",
        certificatesUrl: "/documents/faculty/2024-2025_FDPS_&_Seminars_Certifcates.pdf"
      },
      {
        year: "2021–2022",
        title: "Faculty Development Programme (FDP) Annual Report 2021–2022",
        subtitle: "Post-Pandemic Blended Learning & LMS Instructional Modules",
        fileUrl: "/documents/faculty/Faculty_Dev.Programme_s_2024-25.pdf",
        certificatesUrl: "/documents/faculty/2024-2025_FDPS_&_Seminars_Certifcates.pdf"
      }
    ],
    certificatesDoc: {
      title: "Faculty FDPs, Seminars & Conferences Participation Certificates",
      subtitle: "Verified Participation Certificates & Course Completion Records",
      fileUrl: "/documents/faculty/2024-2025_FDPS_&_Seminars_Certifcates.pdf",
      year: "2024–2025"
    }
  },

  // G. Faculty Achievements
  achievements: {
    title: "G. Faculty Achievements",
    tagline: "Excellence in Research, Publications, Patents, Awards & Scholarly Pursuits",
    description:
      "The College recognizes and celebrates the scholarly, professional and community contributions of its faculty members. Faculty members actively publish in UGC-CARE, Scopus and Web of Science indexed journals, author books and chapters, obtain patents, and receive state and national recognitions.",
    pillars: [
      { title: "Research Publications", desc: "Peer-reviewed research articles in high-impact national and international academic journals." },
      { title: "Books & Book Chapters", desc: "Authorship, editorial contributions and published textbook chapters with reputed academic publishers." },
      { title: "Patents & Intellectual Property", desc: "Innovations, published patents and intellectual property developed by faculty researchers." },
      { title: "Awards & State Honors", desc: "Academic excellence awards, best teacher recognitions, and research commendations from universities and bodies." },
      { title: "Conference Presentations", desc: "Keynote addresses, paper presentations and chairing technical sessions at national/international conferences." },
      { title: "Community & Extension Honors", desc: "Recognitions for impactful community service, environmental initiatives and social leadership." }
    ],
    records: [
      {
        year: "2025–2026",
        publicationsDoc: "/documents/DefaultFile_1.pdf",
        patentsDoc: "/documents/DefaultFile_1.pdf",
        booksDoc: "/documents/DefaultFile_1.pdf",
        academicDoc: "/documents/DefaultFile_1.pdf"
      },
      {
        year: "2024–2025",
        publicationsDoc: "/documents/DefaultFile_1.pdf",
        patentsDoc: "/documents/DefaultFile_1.pdf",
        booksDoc: "/documents/DefaultFile_1.pdf",
        academicDoc: "/documents/DefaultFile_1.pdf"
      },
      {
        year: "2023–2024",
        publicationsDoc: "/documents/DefaultFile_1.pdf",
        patentsDoc: "/documents/DefaultFile_1.pdf",
        booksDoc: "/documents/DefaultFile_1.pdf",
        academicDoc: "/documents/DefaultFile_1.pdf"
      }
    ]
  },

  // H. Faculty Exchange & Academic Mobility
  mobility: {
    title: "H. Faculty Exchange & Academic Mobility",
    tagline: "Inter-Institutional Collaboration, Guest Lectures & Academic Interaction",
    description:
      "The College encourages academic mobility and inter-institutional collaboration. Faculty members participate in faculty exchange programmes, deliver guest lectures as resource persons, visit research laboratories, and organize collaborative academic initiatives with reputed colleges and universities.",
    pillars: [
      { title: "Faculty Exchange Programmes", desc: "Sharing academic expertise, innovative pedagogy and cross-institutional classroom teaching." },
      { title: "Academic & Research Visits", desc: "Visits to premier research institutes, central laboratories, and university departments for collaborative projects." },
      { title: "Resource Persons & Guest Lectures", desc: "Faculty serving as invited subject matter experts, keynote speakers, and jury members." },
      { title: "Collaborative Academic Activities", desc: "Joint workshops, seminars, research publications and faculty training with partner institutions." }
    ],
    records: [
      {
        year: "2025–2026",
        exchangeDoc: "/documents/DefaultFile_1.pdf",
        visitsDoc: "/documents/DefaultFile_1.pdf",
        guestLecturesDoc: "/documents/DefaultFile_1.pdf",
        collaborativeDoc: "/documents/DefaultFile_1.pdf"
      },
      {
        year: "2024–2025",
        exchangeDoc: "/documents/DefaultFile_1.pdf",
        visitsDoc: "/documents/DefaultFile_1.pdf",
        guestLecturesDoc: "/documents/DefaultFile_1.pdf",
        collaborativeDoc: "/documents/DefaultFile_1.pdf"
      },
      {
        year: "2023–2024",
        exchangeDoc: "/documents/DefaultFile_1.pdf",
        visitsDoc: "/documents/DefaultFile_1.pdf",
        guestLecturesDoc: "/documents/DefaultFile_1.pdf",
        collaborativeDoc: "/documents/DefaultFile_1.pdf"
      }
    ]
  },

  // I. Faculty Performance Appraisal
  appraisal: {
    title: "I. Faculty Performance Appraisal",
    tagline: "Systematic, Multi-Dimensional Evaluation & Continuous Quality Enhancement",
    description:
      "The College follows a comprehensive, transparent and structured Performance Appraisal System to support continuous professional growth, teaching effectiveness, research outcomes and institutional development.",
    pillars: [
      { title: "Annual Self-Appraisal (ASAR)", desc: "Faculty submit annual self-appraisal reports documenting teaching workload, syllabus completion, student pass percentages, and research." },
      { title: "Academic Performance Indicators (API)", desc: "Evaluation of publications, FDP participation, co-curricular coordination, student mentoring, and examination duties." },
      { title: "Student Feedback on Teaching", desc: "Confidential student feedback collected per semester to evaluate course delivery, clarity, methodology, and student engagement." },
      { title: "360° Peer & HOD Review", desc: "Holistic evaluation incorporating peer reviews, Head of Department recommendations, and Principal's assessment." }
    ],
    records: [
      {
        year: "2025–2026",
        appraisalDoc: "/documents/DefaultFile_1.pdf",
        annualDoc: "/documents/DefaultFile_1.pdf",
        indicatorsDoc: "/documents/DefaultFile_1.pdf",
        feedbackDoc: "/documents/DefaultFile_1.pdf",
        appraisal360Doc: "/documents/DefaultFile_1.pdf"
      },
      {
        year: "2024–2025",
        appraisalDoc: "/documents/DefaultFile_1.pdf",
        annualDoc: "/documents/DefaultFile_1.pdf",
        indicatorsDoc: "/documents/DefaultFile_1.pdf",
        feedbackDoc: "/documents/DefaultFile_1.pdf",
        appraisal360Doc: "/documents/DefaultFile_1.pdf"
      },
      {
        year: "2023–2024",
        appraisalDoc: "/documents/DefaultFile_1.pdf",
        annualDoc: "/documents/DefaultFile_1.pdf",
        indicatorsDoc: "/documents/DefaultFile_1.pdf",
        feedbackDoc: "/documents/DefaultFile_1.pdf",
        appraisal360Doc: "/documents/DefaultFile_1.pdf"
      }
    ]
  },

  // J. Faculty Welfare & Support
  welfare: {
    title: "J. Faculty Welfare & Support",
    tagline: "Comprehensive Institutional Support, Social Security & Conducive Workplace",
    description:
      "St. Ann’s College for Women places high priority on faculty well-being and professional growth by providing welfare measures, statutory social security, professional development financial assistance, research seed support, and state-of-the-art ICT resources.",
    pillars: [
      { title: "Statutory Benefits & Social Security", desc: "Provident Fund (EPF), ESI / Group Medical Insurance, Gratuity, and maternity leave benefits in accordance with statutory rules." },
      { title: "Financial Aid for Conferences & FDPs", desc: "Registration fee reimbursements, travel allowances, and on-duty leave for faculty presenting papers at national/international conferences." },
      { title: "Research Grants & Incentives", desc: "Institutional seed money for research projects, incentive awards for publications in indexed journals, and patent filing support." },
      { title: "ICT Infrastructure & Digital Learning", desc: "High-speed Wi-Fi, modern staff rooms, smart board classrooms, computing systems, and access to DELNET/N-LIST e-journals." }
    ],
    records: [
      {
        year: "2025–2026",
        welfareDoc: "/documents/DefaultFile_1.pdf",
        leaveDoc: "/documents/DefaultFile_1.pdf",
        financialDoc: "/documents/DefaultFile_1.pdf",
        researchDoc: "/documents/DefaultFile_1.pdf",
        ictDoc: "/documents/DefaultFile_1.pdf"
      },
      {
        year: "2024–2025",
        welfareDoc: "/documents/DefaultFile_1.pdf",
        leaveDoc: "/documents/DefaultFile_1.pdf",
        financialDoc: "/documents/DefaultFile_1.pdf",
        researchDoc: "/documents/DefaultFile_1.pdf",
        ictDoc: "/documents/DefaultFile_1.pdf"
      },
      {
        year: "2023–2024",
        welfareDoc: "/documents/DefaultFile_1.pdf",
        leaveDoc: "/documents/DefaultFile_1.pdf",
        financialDoc: "/documents/DefaultFile_1.pdf",
        researchDoc: "/documents/DefaultFile_1.pdf",
        ictDoc: "/documents/DefaultFile_1.pdf"
      }
    ]
  }
};

// Legacy compatibility exports
export const staticFacultyMembers: FacultyMember[] = FACULTY_DATA.teachingFaculty;

export const staticFacultySections: Record<string, { title: string; content: string }> = {
  visiting: {
    title: FACULTY_DATA.visitingFaculty.title,
    content: FACULTY_DATA.visitingFaculty.description
  },
  recruitment: {
    title: FACULTY_DATA.recruitment.title,
    content: FACULTY_DATA.recruitment.description
  },
  achievements: {
    title: FACULTY_DATA.achievements.title,
    content: FACULTY_DATA.achievements.description
  },
  exchange: {
    title: FACULTY_DATA.mobility.title,
    content: FACULTY_DATA.mobility.description
  },
  appraisal: {
    title: FACULTY_DATA.appraisal.title,
    content: FACULTY_DATA.appraisal.description
  },
  welfare: {
    title: FACULTY_DATA.welfare.title,
    content: FACULTY_DATA.welfare.description
  }
};
