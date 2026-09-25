/**
 * Complete Structured Static Data for Faculty & Staff Portal
 * Extracted and structured directly from "6.Faculty.docx" & Institutional Records
 */

export interface FacultyMember {
  sNo: number;
  employeeId?: string;
  name: string;
  staffType?: 'teaching' | 'non-teaching' | 'technical' | 'support' | 'contingent' | 'visiting' | string;
  designation: string;
  department?: string;
  qualification?: string;
  dateOfJoining: string;
  rejoiningDate?: string;
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
  category: 'Administrative Staff' | 'Laboratory & Technical Support Staff' | 'Contingent Staff' | 'Technical & Laboratory Staff' | 'Support Staff';
}

export interface DepartmentFacultyDetail {
  name: string;
  employeeId?: string;
  designation?: string;
  qualification?: string;
  dateOfJoining?: string;
  rejoiningDate?: string;
  experience?: string;
}

export interface DepartmentItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  facultyNames: string[];
  members?: DepartmentFacultyDetail[];
}

export interface FacultyDocRecord {
  year: string;
  title: string;
  fileUrl: string;
  subtitle?: string;
  certificatesUrl?: string;
}

export interface FacultyEventMedia {
  id: string;
  mediaType: "photo" | "video";
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  assetId?: string;
}

export interface FacultyEventAlbum {
  id: string;
  _id?: string;
  title: string;
  date: string;
  year: string;
  category?: string;
  description?: string;
  coverImage?: string;
  media: FacultyEventMedia[];
}

export interface FacultyGalleryItem {
  id: string;
  title: string;
  mediaType: "photo" | "video";
  url: string;
  thumbnailUrl?: string;
  year: string;
  caption?: string;
  date?: string;
}

export const FACULTY_DATA = {
  header: {
    badge: "6. Faculty & Staff",
    title: "Faculty & Staff Directory",
    tagline: "Qualified, Experienced and Dedicated Educators Empowering Women",
    description:
      "St. Ann’s College for Women is supported by a team of qualified, experienced and dedicated faculty committed to academic excellence and the holistic development of students. Through student-centred teaching, mentoring, research, innovation and professional development, our faculty fosters an inclusive and intellectually stimulating learning environment, contributing to the overall growth and quality enhancement of the institution.",
  },

  // A. List of Teaching Staff (Table 0 from 6.Faculty.docx - 47 Faculty Members)
  teachingFaculty: [
    {
      sNo: 1,
      employeeId: "SACW-024",
      name: "Dr.Sr. Sandhya Thumma",
      designation: "Principal",
      department: "MBA",
      qualification: "MBA, M. Com, M.Ed., Ph. D",
      dateOfJoining: "1-09-2014",
      experience: "12",
      staffType: "teaching" as const,
      slug: "drsr-sandhya-thumma"
    },
    {
      sNo: 2,
      employeeId: "SACW-002",
      name: "Mr. Shaik Mahaboob Subhani",
      designation: "HOD",
      department: "Mathematics",
      qualification: "M.Sc., M. Phil",
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
      qualification: "M.COM, M. Phil, MDCA",
      dateOfJoining: "16-06-1999",
      experience: "27",
      staffType: "teaching" as const,
      slug: "mrs-rudrapati-sharon-rose"
    },
    {
      sNo: 4,
      employeeId: "SACW-004",
      name: "Mrs.Jonnalagadda Prameela Rani",
      designation: "HOD",
      department: "Commerce",
      qualification: "M.Com, M. Phil",
      dateOfJoining: "16-06-1999",
      experience: "27",
      staffType: "teaching" as const,
      slug: "mrsjonnalagadda-prameela-rani"
    },
    {
      sNo: 5,
      employeeId: "SACW-005",
      name: "Mrs. Busi Joyce N.J. Kumari",
      designation: "HOD",
      department: "Chemistry",
      qualification: "M.Sc, M. Ed",
      dateOfJoining: "15-07-1999",
      experience: "27",
      staffType: "teaching" as const,
      slug: "mrs-busi-joyce-nj-kumari"
    },
    {
      sNo: 6,
      employeeId: "SACW-001",
      name: "Mrs.Meka Anjana Devi",
      designation: "Lecturer",
      department: "Commerce",
      qualification: "M.Com, M. Phil",
      dateOfJoining: "16-06-1997",
      experience: "26",
      staffType: "teaching" as const,
      slug: "mrsmeka-anjana-devi"
    },
    {
      sNo: 7,
      employeeId: "SACW-006",
      name: "Mr.Chaganti Rama Rao",
      designation: "HOD",
      department: "Physics",
      qualification: "M.Sc,M.Phil,B.Ed",
      dateOfJoining: "18-06-2001",
      experience: "25",
      staffType: "teaching" as const,
      slug: "mrchaganti-rama-rao"
    },
    {
      sNo: 8,
      employeeId: "SACW-008",
      name: "Mrs.Dammi Swarna Charani Rai",
      designation: "Associate Professor",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "16-06-2007",
      experience: "19",
      staffType: "teaching" as const,
      slug: "mrsdammi-swarna-charani-rai"
    },
    {
      sNo: 9,
      employeeId: "SACW-009",
      name: "Dr.Jakkam Pratapa Reddy",
      designation: "Professor",
      department: "Statistics",
      qualification: "M.Sc,M.Phil,Ph.D",
      dateOfJoining: "11-06-2008",
      experience: "18",
      staffType: "teaching" as const,
      slug: "drjakkam-pratapa-reddy"
    },
    {
      sNo: 10,
      employeeId: "SACW-011",
      name: "Mrs. Katta Vanaja",
      designation: "HOD",
      department: "Biotechnology",
      qualification: "M.Sc, B. Ed",
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
      name: "Dr.Gudavalli Radhika",
      designation: "Associate Professor",
      department: "MBA",
      qualification: "M.Com, MBA,  M. Phil, Ph. D",
      dateOfJoining: "16-7-2008",
      experience: "18",
      staffType: "teaching" as const,
      slug: "drgudavalli-radhika"
    },
    {
      sNo: 13,
      employeeId: "SACW-013",
      name: "Dr.Pisapati Lakshmi Narasimha Rao",
      designation: "Professor",
      department: "MBA",
      qualification: "M.Com, M.Phil, Ph.D",
      dateOfJoining: "16-07-2008",
      experience: "18",
      staffType: "teaching" as const,
      slug: "drpisapati-lakshmi-narasimha-rao"
    },
    {
      sNo: 14,
      employeeId: "SACW-014",
      name: "Mrs .Gudiseva Saroja",
      designation: "Lecturer",
      department: "Commerce",
      qualification: "M.Com, MBA, SET",
      dateOfJoining: "07-06-2010",
      experience: "16",
      staffType: "teaching" as const,
      slug: "mrs-gudiseva-saroja"
    },
    {
      sNo: 15,
      employeeId: "SACW-015",
      name: "Mrs.Badduri Usha Rani",
      designation: "HOD",
      department: "Computer Science & Applications (BCA)",
      qualification: "MCA",
      dateOfJoining: "15-06-2011",
      experience: "15",
      staffType: "teaching" as const,
      slug: "mrsbadduri-usha-rani"
    },
    {
      sNo: 16,
      employeeId: "SACW-017",
      name: "Mrs. Kondru Vidyadhari",
      designation: "HOD",
      department: "Botany",
      qualification: "M.Sc, M. Ed",
      dateOfJoining: "07-06-2012",
      experience: "14",
      staffType: "teaching" as const,
      slug: "mrs-kondru-vidyadhari"
    },
    {
      sNo: 17,
      employeeId: "SACW-018",
      name: "Mrs. Dhulipalla Venkata Ramanamma",
      designation: "Associate Professor",
      department: "MCA",
      qualification: "MCA",
      dateOfJoining: "07-06-2012",
      experience: "14",
      staffType: "teaching" as const,
      slug: "mrs-dhulipalla-venkata-ramanamma"
    },
    {
      sNo: 18,
      employeeId: "SACW-019",
      name: "Mr.Davala Simon",
      designation: "Lecturer",
      department: "Botany",
      qualification: "M.Sc",
      dateOfJoining: "07-06-2012",
      experience: "14",
      staffType: "teaching" as const,
      slug: "mrdavala-simon"
    },
    {
      sNo: 19,
      employeeId: "SACW-021",
      name: "Mrs. Golla Anitha Bhanu",
      designation: "Lecturer",
      department: "Chemistry",
      qualification: "M.Sc",
      dateOfJoining: "06-06-2013",
      experience: "13",
      staffType: "teaching" as const,
      slug: "mrs-golla-anitha-bhanu"
    },
    {
      sNo: 20,
      employeeId: "SACW-016",
      name: "Mrs. Gorre VijayaLakshmi",
      designation: "Lecturer",
      department: "Statistics",
      qualification: "M.Sc",
      dateOfJoining: "20-06-2011",
      experience: "13",
      staffType: "teaching" as const,
      slug: "mrs-gorre-vijayalakshmi"
    },
    {
      sNo: 21,
      employeeId: "SACW-020",
      name: "Mrs.Perumalla Sandhya",
      designation: "HOD",
      department: "English",
      qualification: "M.A English",
      dateOfJoining: "07-06-2012",
      experience: "12",
      staffType: "teaching" as const,
      slug: "mrsperumalla-sandhya"
    },
    {
      sNo: 22,
      employeeId: "SACW-022",
      name: "Mr. Shaik Mahaboob Subhani",
      designation: "Lecturer",
      department: "Commerce",
      qualification: "M.Com, PGDFM",
      dateOfJoining: "12-06-2013",
      experience: "13",
      staffType: "teaching" as const,
      slug: "mr-shaik-mahaboob-subhani"
    },
    {
      sNo: 23,
      employeeId: "SACW-025",
      name: "Mrs.Irugula Adi Lakshmi",
      designation: "HOD,NSS Officer",
      department: "Oriental Languages (Sanskrit)",
      qualification: "M.Com, M.Phil",
      dateOfJoining: "04-06-2015",
      experience: "11",
      staffType: "teaching" as const,
      slug: "mrsirugula-adi-lakshmi"
    },
    {
      sNo: 24,
      employeeId: "SACW-028",
      name: "Sr. Gade Margaret Priyanka",
      designation: "Lecturer",
      department: "Biotechnology",
      qualification: "M.Sc,B.Ed, (Ph. D)",
      dateOfJoining: "06-06-2018",
      experience: "8",
      staffType: "teaching" as const,
      slug: "sr-gade-margaret-priyanka"
    },
    {
      sNo: 25,
      employeeId: "SACW-029",
      name: "Mrs. Bhimisetty Ranjitha",
      designation: "HOD",
      department: "Microbiology",
      qualification: "M.Sc",
      dateOfJoining: "10-06-2019",
      experience: "7",
      staffType: "teaching" as const,
      slug: "mrs-bhimisetty-ranjitha"
    },
    {
      sNo: 26,
      employeeId: "SACW-032",
      name: "Mrs.LingaReddy Mary Anusha",
      designation: "Lecturer",
      department: "Mathematics",
      qualification: "M.Sc,B.Ed",
      dateOfJoining: "15-09-2021",
      experience: "5",
      staffType: "teaching" as const,
      slug: "mrslingareddy-mary-anusha"
    },
    {
      sNo: 27,
      employeeId: "SACW-034",
      name: "Mrs. Burri Manasa",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "23-06-2022",
      experience: "4",
      staffType: "teaching" as const,
      slug: "mrs-burri-manasa"
    },
    {
      sNo: 28,
      employeeId: "SACW-036",
      name: "Mrs.R.Phani Rjaya Lakshmi",
      designation: "Lecturer",
      department: "Oriental Languages",
      qualification: "M.A-Telugu",
      dateOfJoining: "06-06-2023",
      experience: "3",
      staffType: "teaching" as const,
      slug: "mrsrphani-rjaya-lakshmi"
    },
    {
      sNo: 29,
      employeeId: "SACW-038",
      name: "Mrs. Jujuri Sirisha",
      designation: "Lecturer",
      department: "MBA",
      qualification: "M.Com,MBA",
      dateOfJoining: "31-07-2023",
      experience: "3",
      staffType: "teaching" as const,
      slug: "mrs-jujuri-sirisha"
    },
    {
      sNo: 30,
      employeeId: "SACW-039",
      name: "Miss.Gangula Santha Kumari",
      designation: "Lecturer",
      department: "Physics",
      qualification: "M.Sc,B.Ed",
      dateOfJoining: "01-06-2024",
      experience: "2",
      staffType: "teaching" as const,
      slug: "missgangula-santha-kumari"
    },
    {
      sNo: 31,
      employeeId: "SACW-040",
      name: "Mrs. Thota Durga Bhavani",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "20-06-2024",
      experience: "2",
      staffType: "teaching" as const,
      slug: "mrs-thota-durga-bhavani"
    },
    {
      sNo: 32,
      employeeId: "SACW-045",
      name: "Miss. Vikkurthi Deepika",
      designation: "Lecturer",
      department: "MCA",
      qualification: "MCA",
      dateOfJoining: "01-09-2025",
      experience: "1",
      staffType: "teaching" as const,
      slug: "miss-vikkurthi-deepika"
    },
    {
      sNo: 33,
      employeeId: "SACW-046",
      name: "Miss. Arigala Sarala",
      designation: "Lecturer",
      department: "MCA",
      qualification: "MCA",
      dateOfJoining: "01-09-2025",
      experience: "1",
      staffType: "teaching" as const,
      slug: "miss-arigala-sarala"
    },
    {
      sNo: 34,
      employeeId: "SACW-042",
      name: "Mrs.Sanikommu Jaswantha Mary",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "01-12-2024",
      experience: "1",
      staffType: "teaching" as const,
      slug: "mrssanikommu-jaswantha-mary"
    },
    {
      sNo: 35,
      employeeId: "SACW-047",
      name: "Mrs.Karumanchi Swathi",
      designation: "Lecturer",
      department: "Physics",
      qualification: "M.Sc",
      dateOfJoining: "01-07-2026",
      experience: "10",
      staffType: "teaching" as const,
      slug: "mrskarumanchi-swathi"
    },
    {
      sNo: 36,
      employeeId: "SACW-030",
      name: "Mr.Jonnada Venkateswara Rao",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "02-01-2021",
      experience: "5",
      staffType: "teaching" as const,
      slug: "mrjonnada-venkateswara-rao"
    },
    {
      sNo: 37,
      employeeId: "SACW-043",
      name: "Mrs.Gummalla Mani Deepika",
      designation: "Lecturer",
      department: "Chemistry",
      qualification: "M.Sc",
      dateOfJoining: "02-12-2024",
      experience: "2",
      staffType: "teaching" as const,
      slug: "mrsgummalla-mani-deepika"
    },
    {
      sNo: 38,
      employeeId: "SACW-007",
      name: "Mrs.Gochipatala Sailaja",
      designation: "Librarian",
      department: "Library",
      qualification: "M.A,M.L.I.SC,B.Ed",
      dateOfJoining: "01-09-2002",
      experience: "24",
      staffType: "teaching" as const,
      slug: "mrsgochipatala-sailaja"
    },
    {
      sNo: 39,
      employeeId: "SACW-023",
      name: "Mrs. Dodda Anitha",
      designation: "Librarian",
      department: "Library",
      qualification: "M.A, M.L.I,SC",
      dateOfJoining: "01-09-2013",
      experience: "13",
      staffType: "teaching" as const,
      slug: "mrs-dodda-anitha"
    },
    {
      sNo: 40,
      employeeId: "SACW-027",
      name: "Mr.Ganji Bala Show Reddy",
      designation: "Physical Director",
      department: "Physical Education",
      qualification: "M.p.Ed,M.Phill,(Ph.D)",
      dateOfJoining: "01-06-2017",
      experience: "10",
      staffType: "teaching" as const,
      slug: "mrganji-bala-show-reddy"
    },
    {
      sNo: 41,
      employeeId: "SACW-031",
      name: "Lft.Kankanampati Susmitha",
      designation: "NCC Officer",
      department: "Physical Education",
      qualification: "MPEd",
      dateOfJoining: "01-02-2021",
      experience: "5",
      staffType: "teaching" as const,
      slug: "lftkankanampati-susmitha"
    },
    {
      sNo: 42,
      employeeId: "SACW-033",
      name: "Mrs.Gundabommu Vani",
      designation: "Lecturer",
      department: "MCA",
      qualification: "MCA",
      dateOfJoining: "21-02-2022",
      experience: "4",
      staffType: "teaching" as const,
      slug: "mrsgundabommu-vani"
    },
    {
      sNo: 43,
      employeeId: "SACW-035",
      name: "Mrs.Pagadala Anitha",
      designation: "Lecturer",
      department: "Computer Science & Applications",
      qualification: "MCA",
      dateOfJoining: "01-12-2022",
      experience: "4",
      staffType: "teaching" as const,
      slug: "mrspagadala-anitha"
    },
    {
      sNo: 44,
      employeeId: "SACW-037",
      name: "Mrs.Kommuri Grace Santhi Anne",
      designation: "Lecturer",
      department: "English",
      qualification: "MA (English),B.Ed",
      dateOfJoining: "12-07-2023",
      experience: "3",
      staffType: "teaching" as const,
      slug: "mrskommuri-grace-santhi-anne"
    },
    {
      sNo: 45,
      employeeId: "SACW-041",
      name: "Mrs. Nelapati Madhavi",
      designation: "Lecturer",
      department: "MBA",
      qualification: "MBA",
      dateOfJoining: "13-11-2024",
      experience: "2",
      staffType: "teaching" as const,
      slug: "mrs-nelapati-madhavi"
    },
    {
      sNo: 46,
      employeeId: "SACW-026",
      name: "Dr.Sr. Fatima Rani.P",
      designation: "Professor",
      department: "English",
      qualification: "MA LITT, M. Phill, Ph D",
      dateOfJoining: "10-06-2016",
      experience: "10",
      staffType: "teaching" as const,
      slug: "drsr-fatima-ranip"
    },
    {
      sNo: 47,
      employeeId: "SACW-044",
      name: "Sr. Vanga Lakshmi Jyothi",
      designation: "Lecturer",
      department: "Biotechnology",
      qualification: "M.Sc",
      dateOfJoining: "02-12-2024",
      experience: "2",
      staffType: "teaching" as const,
      slug: "sr-vanga-lakshmi-jyothi"
    }
  ] as FacultyMember[],

  // B. 15 Academic Departments (Section B from 6.Faculty.docx)
  departments: [
    {
      id: "sec-dept-commerce",
      slug: "commerce",
      name: "1. Department of Commerce",
      tagline: "Accounting, Finance, Business Analytics & Taxation",
      description: "The Department of Commerce is supported by qualified and dedicated faculty committed to quality teaching, student mentoring and academic development. The faculty foster conceptual understanding, practical skills, analytical thinking and professional competencies in commerce, accounting, finance and business.",
      facultyNames: ["Mrs.R Rudrapati Sharon Rose", "Mrs. Jonnalagadda Prameela Rani", "Mrs. Meka Anjana Devi", "Mrs. Gudiseva Saroja", "Mr. Shaik Mahaboob Subhani"],
      members: [
        {
                "name": "Mrs.R Rudrapati Sharon Rose",
                "employeeId": "SACW-003",
                "designation": "Vice Principal/IQAC Coordinator",
                "qualification": "M.Com, M.Phil, MDCA",
                "dateOfJoining": "16 June 1999",
                "rejoiningDate": "",
                "experience": "27 Years"
        },
        {
                "name": "Mrs. Jonnalagadda Prameela Rani",
                "employeeId": "SACW-004",
                "designation": "Lecturer",
                "qualification": "M.Com, M.Phil",
                "dateOfJoining": "16 June 1999",
                "rejoiningDate": "",
                "experience": "27 Years"
        },
        {
                "name": "Mrs. Meka Anjana Devi",
                "employeeId": "SACW-001",
                "designation": "Lecturer",
                "qualification": "M.Com, M.Phil",
                "dateOfJoining": "16 September 1997",
                "rejoiningDate": "11 June 2015",
                "experience": "26 Years"
        },
        {
                "name": "Mrs. Gudiseva Saroja",
                "employeeId": "SACW-014",
                "designation": "Lecturer",
                "qualification": "M.Com, MBA",
                "dateOfJoining": "07 June 2010",
                "rejoiningDate": "",
                "experience": "16 Years"
        },
        {
                "name": "Mr. Shaik Mahaboob Subhani",
                "employeeId": "SACW-022",
                "designation": "Lecturer",
                "qualification": "M.Com, PGDFM",
                "dateOfJoining": "12 June 2013",
                "rejoiningDate": "",
                "experience": "13 Years"
        }
]
    },
    {
      id: "sec-dept-cs",
      slug: "computer-science",
      name: "2. Department of Computer Science & Applications",
      tagline: "Computing, Software Development, AI, Data Science & Web Technologies",
      description: "The Department of Computer Science & Applications brings together faculty members engaged in teaching, mentoring, skill development and academic enrichment across BCA, B.Sc. Computer Science and B.Sc. Artificial Intelligence programmes. The faculty are committed to equipping students with contemporary knowledge, technical competencies, problem-solving skills and professional readiness in the rapidly evolving field of computing and emerging technologies.",
      facultyNames: ["Mrs. Dammi Swarna Charani Rai", "Mrs. Mekala Usha Rani", "Mrs. Badduri Usha Rani", "Mrs. Dhuliplla Venkata Ramanamma", "Mrs. Burri Manasa", "Mrs. Thota Durga Bhavani", "Miss V. Deepika", "Miss Arigela Sarala", "Ms. Sanikommu Jaswathmary", "Mrs. Gundabommu Vani", "Mrs. Pagadala Anitha", "Mr. Jonnada Venkateswara Rao"],
      members: [
        {
                "name": "Mrs. Dammi Swarna Charani Rai",
                "employeeId": "SACW-008",
                "designation": "HOD \u2013 CS & AI",
                "qualification": "MCA",
                "dateOfJoining": "16 June 2007",
                "rejoiningDate": "",
                "experience": "19 Years"
        },
        {
                "name": "Mrs. Mekala Usha Rani",
                "employeeId": "SACW-010",
                "designation": "HOD-MCA",
                "qualification": "MCA",
                "dateOfJoining": "12 June 2008",
                "rejoiningDate": "",
                "experience": "18 Years"
        },
        {
                "name": "Mrs. Badduri Usha Rani",
                "employeeId": "SACW-015",
                "designation": "HOD-BCA",
                "qualification": "MCA",
                "dateOfJoining": "15 June 2011",
                "rejoiningDate": "",
                "experience": "15 Years"
        },
        {
                "name": "Mrs. Dhuliplla Venkata Ramanamma",
                "employeeId": "SACW-018",
                "designation": "Associate Professor",
                "qualification": "MCA",
                "dateOfJoining": "07 June 2012",
                "rejoiningDate": "",
                "experience": "14 Years"
        },
        {
                "name": "Mrs. Burri Manasa",
                "employeeId": "SACW-034",
                "designation": "Lecturer",
                "qualification": "MCA",
                "dateOfJoining": "23 June 2022",
                "rejoiningDate": "",
                "experience": "4 Years"
        },
        {
                "name": "Mrs. Thota Durga Bhavani",
                "employeeId": "SACW-040",
                "designation": "Lecturer",
                "qualification": "MCA",
                "dateOfJoining": "24 June 2019",
                "rejoiningDate": "20 June 2024",
                "experience": "5 Years"
        },
        {
                "name": "Miss V. Deepika",
                "employeeId": "SACW-045",
                "designation": "Lecturer",
                "qualification": "MCA",
                "dateOfJoining": "01 September 2025",
                "rejoiningDate": "",
                "experience": "Below One Year"
        },
        {
                "name": "Miss Arigela Sarala",
                "employeeId": "SACW-046",
                "designation": "Lecturer",
                "qualification": "MCA",
                "dateOfJoining": "01 September 2025",
                "rejoiningDate": "",
                "experience": "Below 1 Year"
        },
        {
                "name": "Ms. Sanikommu Jaswathmary",
                "employeeId": "SACW-042",
                "designation": "Lecturer",
                "qualification": "MCA",
                "dateOfJoining": "01 December 2024",
                "rejoiningDate": "",
                "experience": "1"
        },
        {
                "name": "Mrs. Gundabommu Vani",
                "employeeId": "SACW-033",
                "designation": "Assistant Professor",
                "qualification": "MCA",
                "dateOfJoining": "21 February 2022",
                "rejoiningDate": "",
                "experience": "4 Years"
        },
        {
                "name": "Mrs. Pagadala Anitha",
                "employeeId": "SACW-035",
                "designation": "Lecturer",
                "qualification": "MCA",
                "dateOfJoining": "01 December 2022",
                "rejoiningDate": "",
                "experience": "4 Years"
        },
        {
                "name": "Mr. Jonnada Venkateswara Rao",
                "employeeId": "SACW-030",
                "designation": "Lecturer",
                "qualification": "MCA",
                "dateOfJoining": "02 January 2021",
                "rejoiningDate": "",
                "experience": "4"
        }
]
    },
    {
      id: "sec-dept-maths",
      slug: "mathematics",
      name: "3. Department of Mathematics",
      tagline: "Pure Mathematics, Applied Calculus, Algebra & Mathematical Analysis",
      description: "The Department of Mathematics is supported by dedicated faculty committed to quality teaching, student mentoring and academic development. The faculty foster conceptual understanding, logical reasoning, analytical thinking and problem-solving skills, preparing students for higher education and diverse career opportunities.",
      facultyNames: ["Mr. Shaik Mahaboob Subhani", "Mrs. Lingareddy Mary Anusha"],
      members: [
        {
                "name": "Mr. Shaik Mahaboob Subhani",
                "employeeId": "SACW-002",
                "designation": "HOD \u2013 Mathematics",
                "qualification": "M.Sc, M.Phil",
                "dateOfJoining": "01 July 1998",
                "rejoiningDate": "",
                "experience": "28 Years"
        },
        {
                "name": "Mrs. Lingareddy Mary Anusha",
                "employeeId": "032",
                "designation": "Lecturer",
                "qualification": "M.Sc, B.Ed",
                "dateOfJoining": "15 September 2021",
                "rejoiningDate": "",
                "experience": "5 Years"
        }
]
    },
    {
      id: "sec-dept-physics",
      slug: "physics",
      name: "4. Department of Physics",
      tagline: "Classical Mechanics, Quantum Physics, Electronics & Thermodynamics",
      description: "The Department of Physics is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster scientific thinking, conceptual understanding, analytical skills and problem-solving abilities, encouraging students to develop curiosity and academic excellence in Physics.",
      facultyNames: ["Mr. Chaganti Rama Rao", "Miss Gangula Santha Kumari", "Mrs.Karumanchi Swathi"],
      members: [
        {
                "name": "Mr. Chaganti Rama Rao",
                "employeeId": "SACW-006",
                "designation": "Lecturer",
                "qualification": "M.Sc, M.Phil, B.Ed",
                "dateOfJoining": "18 June 2001",
                "rejoiningDate": "",
                "experience": "25 Years"
        },
        {
                "name": "Miss Gangula Santha Kumari",
                "employeeId": "SACW-039",
                "designation": "Lecturer",
                "qualification": "M.Sc ,B.Ed",
                "dateOfJoining": "",
                "rejoiningDate": "01 June 2024",
                "experience": "4 Years"
        },
        {
                "name": "Mrs.Karumanchi Swathi",
                "employeeId": "SACW-047",
                "designation": "Lecturer",
                "qualification": "M.Sc",
                "dateOfJoining": "01 July 2026",
                "rejoiningDate": "",
                "experience": "4 Years"
        }
]
    },
    {
      id: "sec-dept-statistics",
      slug: "statistics",
      name: "5. Department of Statistics",
      tagline: "Statistical Methods, Probability Theory, Biostatistics & Data Analytics",
      description: "The Department of Statistics is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster statistical thinking, analytical skills and data interpretation abilities, enabling students to apply statistical concepts and tools in academic, research and real-world contexts.",
      facultyNames: ["Dr. Jakkam Pratapa Reddy", "Mrs. Gorre Vijaya Lakshmi"],
      members: [
        {
                "name": "Dr. Jakkam Pratapa Reddy",
                "employeeId": "SACW009",
                "designation": "Professor",
                "qualification": "M. Sc, M. Phil, Ph. D",
                "dateOfJoining": "11 June 2008",
                "rejoiningDate": "",
                "experience": "17 Years"
        },
        {
                "name": "Mrs. Gorre Vijaya Lakshmi",
                "employeeId": "SACW016",
                "designation": "Lecturer",
                "qualification": "M.Sc",
                "dateOfJoining": "20 June 2011",
                "rejoiningDate": "",
                "experience": "14 Years"
        }
]
    },
    {
      id: "sec-dept-biotechnology",
      slug: "biotechnology",
      name: "6. Department of Biotechnology",
      tagline: "Molecular Biology, Genetic Engineering, Immunology & Industrial Biotech",
      description: "The Department of Biotechnology is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster scientific knowledge, laboratory skills, analytical thinking and research orientation, enabling students to understand the applications of biotechnology in life sciences.",
      facultyNames: ["Mrs. Katta Vanaja", "Sr. Gade Margaret Priyanka"],
      members: [
        {
                "name": "Mrs. Katta Vanaja",
                "employeeId": "SACW-011",
                "designation": "Lecturer",
                "qualification": "M.Sc, B.Ed",
                "dateOfJoining": "16 June 2008",
                "rejoiningDate": "",
                "experience": "18 Years"
        },
        {
                "name": "Sr. Gade Margaret Priyanka",
                "employeeId": "SACW-028",
                "designation": "Lecturer",
                "qualification": "M.Sc",
                "dateOfJoining": "06 June 2018",
                "rejoiningDate": "",
                "experience": "8 Years"
        }
]
    },
    {
      id: "sec-dept-microbiology",
      slug: "microbiology",
      name: "7. Department of Microbiology",
      tagline: "Medical Microbiology, Virology, Microbial Genetics & Fermentation",
      description: "The Department of Microbiology is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty focus on developing students\u2019 scientific knowledge, laboratory skills, analytical abilities and research orientation in the field of microbiology.",
      facultyNames: ["Mrs. Bhimisetty Ranjitha", "Sr. Vanga Lakshmi Jyothi"],
      members: [
        {
                "name": "Mrs. Bhimisetty Ranjitha",
                "employeeId": "SACW-029",
                "designation": "Lecturer",
                "qualification": "M.Sc",
                "dateOfJoining": "10 June 2019",
                "rejoiningDate": "",
                "experience": "7 Years"
        },
        {
                "name": "Sr. Vanga Lakshmi Jyothi",
                "employeeId": "0SACW-044",
                "designation": "Lecturer",
                "qualification": "M.Sc",
                "dateOfJoining": "02 December 2024",
                "rejoiningDate": "",
                "experience": "Below 2 Years"
        }
]
    },
    {
      id: "sec-dept-botany",
      slug: "botany",
      name: "8. Department of Botany",
      tagline: "Plant Taxonomy, Physiology, Ecology & Biodiversity Conservation",
      description: "The Department of Botany is supported by dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster scientific understanding, observation skills and analytical thinking through the study of plant sciences, laboratory learning and academic enrichment.",
      facultyNames: ["Mrs. Kondru Vidyadhari", "Mr. Davala Simon"],
      members: [
        {
                "name": "Mrs. Kondru Vidyadhari",
                "employeeId": "SACW-017",
                "designation": "Lecturer",
                "qualification": "M.Sc, M.Ed",
                "dateOfJoining": "07 June 2012",
                "rejoiningDate": "",
                "experience": "14 Years"
        },
        {
                "name": "Mr. Davala Simon",
                "employeeId": "SACW-019",
                "designation": "Lecturer",
                "qualification": "M.Sc",
                "dateOfJoining": "07 June 2012",
                "rejoiningDate": "",
                "experience": "14 Years"
        }
]
    },
    {
      id: "sec-dept-chemistry",
      slug: "chemistry",
      name: "9. Department of Chemistry",
      tagline: "Organic, Inorganic, Physical & Analytical Chemistry",
      description: "The Department of Chemistry is supported by qualified and dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster scientific understanding, analytical skills and laboratory competencies through the study and application of fundamental and contemporary concepts in chemistry.",
      facultyNames: ["Mrs. Busi Joyce N. J. Kumari", "Mrs. Golla Anitha Bhanu", "Mrs. Gummalla Mani Deepika"],
      members: [
        {
                "name": "Mrs. Busi Joyce N. J. Kumari",
                "employeeId": "SACW-005",
                "designation": "Lecturer",
                "qualification": "M.Sc, M.Ed",
                "dateOfJoining": "15 July 1999",
                "rejoiningDate": "01 August 2024",
                "experience": "27 Years"
        },
        {
                "name": "Mrs. Golla Anitha Bhanu",
                "employeeId": "SACW-021",
                "designation": "Lecturer",
                "qualification": "M.Sc",
                "dateOfJoining": "",
                "rejoiningDate": "06 June 2013",
                "experience": "14 Years"
        },
        {
                "name": "Mrs. Gummalla Mani Deepika",
                "employeeId": "SACW-043",
                "designation": "Lecturer",
                "qualification": "M.Sc",
                "dateOfJoining": "02 December 2024",
                "rejoiningDate": "",
                "experience": "Below 2 Years"
        }
]
    },
    {
      id: "sec-dept-english",
      slug: "english",
      name: "10. Department of English",
      tagline: "English Literature, Communicative English, Phonetics & Soft Skills",
      description: "The Department of English is supported by dedicated faculty committed to quality teaching, student mentoring and academic development. The faculty foster communication skills, language proficiency, critical thinking and literary appreciation, helping students build confidence and professional competence.",
      facultyNames: ["Mrs. Perumalla Sandhya", "Mrs. Kommuri Grace Shanthi Ann", "Dr. SR. Fatima Rani P"],
      members: [
        {
                "name": "Mrs. Perumalla Sandhya",
                "employeeId": "SACW-020",
                "designation": "Lecturer",
                "qualification": "M.A (English)",
                "dateOfJoining": "06 July 2012",
                "rejoiningDate": "",
                "experience": "12 Years"
        },
        {
                "name": "Mrs. Kommuri Grace Shanthi Ann",
                "employeeId": "SACW-037",
                "designation": "Lecturer",
                "qualification": "M.A (English)",
                "dateOfJoining": "12 July 2023",
                "rejoiningDate": "",
                "experience": "3 Years"
        },
        {
                "name": "Dr. SR. Fatima Rani P",
                "employeeId": "SACW-026",
                "designation": "Professor",
                "qualification": "M.A. Litt., M.Phil, Ph.D",
                "dateOfJoining": "01 June 2016",
                "rejoiningDate": "",
                "experience": "10 Years"
        }
]
    },
    {
      id: "sec-dept-languages",
      slug: "oriental-languages",
      name: "11. Department of Oriental Languages",
      tagline: "Telugu, Sanskrit & Hindi Literature, Linguistics & Cultural Studies",
      description: "The Department of Oriental Languages, comprising Telugu, Sanskrit and Hindi, is supported by dedicated faculty committed to quality teaching, language proficiency and student mentoring. The faculty promote linguistic skills, literary appreciation, cultural awareness and effective communication, contributing to the holistic development of students.",
      facultyNames: ["Mrs. Irugula Adilakshmi", "Mrs. R. Phani Rajya Lakshmi"],
      members: [
        {
                "name": "Mrs. Irugula Adilakshmi",
                "employeeId": "SACW-025",
                "designation": "HOD, Oriental Languages (Sanskrit) NSS Officer",
                "qualification": "M.Com, M.Phil",
                "dateOfJoining": "04 June 2015",
                "rejoiningDate": "",
                "experience": "11 Years"
        },
        {
                "name": "Mrs. R. Phani Rajya Lakshmi",
                "employeeId": "SACW-036",
                "designation": "Lecturer ,Oriental Languages (Telugu)",
                "qualification": "M.A (Telugu)",
                "dateOfJoining": "06 June 2023",
                "rejoiningDate": "",
                "experience": "3 Years"
        }
]
    },
    {
      id: "sec-dept-mca",
      slug: "mca",
      name: "12. Department of Computer Applications (MCA)",
      tagline: "Postgraduate Computing, Cloud Computing, Full-Stack & Cyber Security",
      description: "The Department of Computer Applications is supported by qualified and dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster advanced computing knowledge, programming skills, analytical thinking, problem-solving abilities and professional competencies, preparing students for higher learning and careers in the IT sector.",
      facultyNames: ["Mrs. Mekala Usha Rani", "Mrs. Dhuliplla Venkata Ramanamma", "Miss V. Deepika", "Miss Arigela Sarala", "Mrs. Gundabommu Vani"],
      members: [
        {
                "name": "Mrs. Mekala Usha Rani",
                "employeeId": "SACW-010",
                "designation": "HOD-MCA",
                "qualification": "MCA",
                "dateOfJoining": "12 June 2008",
                "rejoiningDate": "",
                "experience": "18 Years"
        },
        {
                "name": "Mrs. Dhuliplla Venkata Ramanamma",
                "employeeId": "SACW-018",
                "designation": "Associate Professor",
                "qualification": "MCA",
                "dateOfJoining": "07 June 2012",
                "rejoiningDate": "",
                "experience": "14 Years"
        },
        {
                "name": "Miss V. Deepika",
                "employeeId": "SACW-045",
                "designation": "Assistant Professor",
                "qualification": "MCA",
                "dateOfJoining": "01 September 2025",
                "rejoiningDate": "",
                "experience": "Below One Year"
        },
        {
                "name": "Miss Arigela Sarala",
                "employeeId": "SACW-046",
                "designation": "Assistant Professor",
                "qualification": "MCA",
                "dateOfJoining": "01 September 2025",
                "rejoiningDate": "",
                "experience": "Below 1 Year"
        },
        {
                "name": "Mrs. Gundabommu Vani",
                "employeeId": "SACW-033",
                "designation": "Assistant Professor",
                "qualification": "MCA",
                "dateOfJoining": "21 February 2022",
                "rejoiningDate": "",
                "experience": "4 Years"
        }
]
    },
    {
      id: "sec-dept-mba",
      slug: "mba",
      name: "13. Department of Master of Business Administration (MBA)",
      tagline: "Strategic Management, Marketing, Human Resources & Financial Management",
      description: "The Department of Management is supported by qualified and dedicated faculty committed to quality teaching, practical learning and student mentoring. The faculty foster managerial skills, analytical thinking, leadership, communication and professional competencies, preparing students for higher education, entrepreneurship and diverse career opportunities.",
      facultyNames: ["Dr. Sr. Sandhya Thumma", "Dr. Gudavalli Radhika", "Dr. Pisapati Lakshmi Narasimha Rao", "Mrs. Juijuri Sirisha", "Mrs. Nelapati Madhavi"],
      members: [
        {
                "name": "Dr. Sr. Sandhya Thumma",
                "employeeId": "SACW-024",
                "designation": "Principal",
                "qualification": "MBA, M.Com, M.Ed, Ph.D",
                "dateOfJoining": "01 September 2014",
                "rejoiningDate": "",
                "experience": "11 Years"
        },
        {
                "name": "Dr. Gudavalli Radhika",
                "employeeId": "SACW-012",
                "designation": "Associate Professor",
                "qualification": "M.Com, MBA, M.Phil, Ph.D",
                "dateOfJoining": "07 January 2008",
                "rejoiningDate": "",
                "experience": "18 Years"
        },
        {
                "name": "Dr. Pisapati Lakshmi Narasimha Rao",
                "employeeId": "SACW-013",
                "designation": "Professor",
                "qualification": "M. Com, M. Phil, Ph. D",
                "dateOfJoining": "16 July 2008",
                "rejoiningDate": "",
                "experience": "18 Years"
        },
        {
                "name": "Mrs. Juijuri Sirisha",
                "employeeId": "SACW-038",
                "designation": "Lecturer",
                "qualification": "M.Com, MBA",
                "dateOfJoining": "",
                "rejoiningDate": "31 July 2023",
                "experience": "4 Years"
        },
        {
                "name": "Mrs. Nelapati Madhavi",
                "employeeId": "SACW-041",
                "designation": "Lecturer",
                "qualification": "MBA",
                "dateOfJoining": "13 November 2024",
                "rejoiningDate": "",
                "experience": "Below 2 Years"
        }
]
    },
    {
      id: "sec-dept-sports",
      slug: "physical-education",
      name: "14. Department of Physical Education",
      tagline: "Physical Fitness, Sports Training, Yoga, Athletics & Self-Defense",
      description: "The Department of Physical Education is supported by dedicated faculty committed to promoting physical fitness, sports participation and holistic student development. The faculty encourage students to develop teamwork, discipline, leadership, healthy lifestyle practices and sporting skills through regular physical education and sports activities.",
      facultyNames: ["Mr. Ganji Bala show Reddy", "Lft. Kankanampati Susmitha"],
      members: [
        {
                "name": "Mr. Ganji Bala show Reddy",
                "employeeId": "SACW-027",
                "designation": "Physical Director (P.D.)",
                "qualification": "M.P.Ed, M.Phil ,(Ph.D)",
                "dateOfJoining": "01 June 2017",
                "rejoiningDate": "",
                "experience": "10 Years"
        },
        {
                "name": "Lft. Kankanampati Susmitha",
                "employeeId": "SACW-031",
                "designation": "Asst.Physical Educator, NCC Officer",
                "qualification": "M.P.Ed",
                "dateOfJoining": "01 February 2021",
                "rejoiningDate": "",
                "experience": "5 Years"
        }
]
    },
    {
      id: "sec-dept-library",
      slug: "library-science",
      name: "15. Library & Information Science",
      tagline: "Library Automation, Digital Knowledge Repository, Information Literacy & E-Resources",
      description: "The Library & Information Science section is supported by dedicated and qualified professionals committed to effective library services, information access and student support. The faculty and library professionals facilitate academic learning, information literacy, digital resources and research support, contributing to the overall academic development of students.",
      facultyNames: ["Mrs. Gochipatala Sailaja", "Mrs. Dodda Anitha"],
      members: [
        {
                "name": "Mrs. Gochipatala Sailaja",
                "employeeId": "SACW-007",
                "designation": "Librarian",
                "qualification": "M.A, M.L.I.Sc, B.Ed",
                "dateOfJoining": "01 September 2002",
                "rejoiningDate": "",
                "experience": "24 Years"
        },
        {
                "name": "Mrs. Dodda Anitha",
                "employeeId": "SACW-023",
                "designation": "Librarian",
                "qualification": "M.A, M.L.I.Sc",
                "dateOfJoining": "01 September 2013",
                "rejoiningDate": "14 July 2023",
                "experience": "11 Years"
        }
]
    }
  ] as DepartmentItem[],

  // C. Non-Teaching Staff (Section C from 6.Faculty.docx)
  nonTeachingStaff: {
    administrative: [
      { sNo: 1, name: "Sr. Jasintha I.", designation: "Office Superintendent", qualification: "B.A. Litt., B.Ed.", dateOfJoining: "1/7/2024", experience: "2 Years", category: "Administrative Staff" as const },
      { sNo: 2, name: "Mrs. Vemula Ratna Kumari", designation: "Senior Assistant", qualification: "B.A., PGDCA", dateOfJoining: "3/7/2002", experience: "2 Years", category: "Administrative Staff" as const },
      { sNo: 3, name: "Mrs. Ravela Veeramma", designation: "Senior Assistant", qualification: "B.Com., PGDCA", dateOfJoining: "1/6/2013", experience: "16 Years", category: "Administrative Staff" as const },
      { sNo: 4, name: "Mr. Tadigiri Kishore Babu", designation: "Computer Operator", qualification: "B.A., PGDCA", dateOfJoining: "15-06-2005", experience: "21 Years", category: "Administrative Staff" as const },
      { sNo: 5, name: "Mr. Pentareddy Joseph Vijay Kumar Reddy", designation: "Record Assistant", qualification: "SSC, ITI", dateOfJoining: "1/6/2019", experience: "7 Years", category: "Administrative Staff" as const },
      { sNo: 6, name: "Mrs. Nelaturi Aneesha", designation: "Junior Assistant", qualification: "M.A., B.L.I.Sc.", dateOfJoining: "17-01-2010", experience: "13 Years", category: "Administrative Staff" as const },
    ],
    technical: [
      { sNo: 1, name: "Mrs. Govindu Mary Aswini", designation: "Lab Assistant", qualification: "B.A.", dateOfJoining: "23-07-2007", experience: "19 Years", category: "Laboratory & Technical Support Staff" as const },
      { sNo: 2, name: "Mr. Yarla Badaraiah", designation: "Lab Assistant", qualification: "B.A.", dateOfJoining: "1/10/2010", experience: "16 Years", category: "Laboratory & Technical Support Staff" as const },
      { sNo: 3, name: "Mrs. Yamarthi Sundari", designation: "Lab Assistant", qualification: "B.A.", dateOfJoining: "10/9/2015", experience: "11 Years", category: "Laboratory & Technical Support Staff" as const },
      { sNo: 4, name: "Mrs. Madasu Prema Latha", designation: "Lab Assistant", qualification: "B.A.", dateOfJoining: "4/1/2012", experience: "7 Years", category: "Laboratory & Technical Support Staff" as const },
      { sNo: 5, name: "Mrs. Nelaturi Geetha", designation: "Lab Assistant", qualification: "B.A.", dateOfJoining: "18-06-2012", experience: "14 Years", category: "Laboratory & Technical Support Staff" as const },
      { sNo: 6, name: "Mr. Yedluri Sekhar Babu", designation: "Lab Assistant", qualification: "B.A.", dateOfJoining: "3/7/2023", experience: "3 Years", category: "Laboratory & Technical Support Staff" as const },
      { sNo: 7, name: "Mrs.Mercy", designation: "Lab Assistant", qualification: "B.A.", dateOfJoining: "01-07-2026", experience: "2 Years", category: "Laboratory & Technical Support Staff" as const },
    ],
    support: [
      { sNo: 1, name: "Mr. M. Ratna Kumari", designation: "Sweeper", qualification: "—", dateOfJoining: "14-06-2004", experience: "22 Years", category: "Contingent Staff" as const },
      { sNo: 2, name: "Mrs. Pedda Jyothi", designation: "Sweeper", qualification: "—", dateOfJoining: "17-06-2003", experience: "22 Years", category: "Contingent Staff" as const },
      { sNo: 3, name: "Mrs. S. Savithri", designation: "Sweeper", qualification: "—", dateOfJoining: "6/4/2015", experience: "11 Years", category: "Contingent Staff" as const },
      { sNo: 4, name: "Mrs. T. Rajini", designation: "Sweeper", qualification: "—", dateOfJoining: "20-09-2021", experience: "5 Years", category: "Contingent Staff" as const },
      { sNo: 5, name: "Mrs. G. Suvartha", designation: "Sweeper", qualification: "—", dateOfJoining: "6/1/2016", experience: "10 Years", category: "Contingent Staff" as const },
      { sNo: 6, name: "Mrs. T. Papa", designation: "Sweeper", qualification: "—", dateOfJoining: "1/6/2016", experience: "8 Years", category: "Contingent Staff" as const },
      { sNo: 7, name: "Mrs. B. Sailaja", designation: "Sweeper", qualification: "—", dateOfJoining: "4/1/2018", experience: "—", category: "Contingent Staff" as const },
      { sNo: 8, name: "Mrs. A. Anitha", designation: "Sweeper", qualification: "—", dateOfJoining: "1/11/2022", experience: "3 Years", category: "Contingent Staff" as const },
    ],
    contingent: [
      { sNo: 1, name: "Mr. M. Ratna Kumari", designation: "Sweeper", qualification: "—", dateOfJoining: "14-06-2004", experience: "22 Years", category: "Contingent Staff" as const },
      { sNo: 2, name: "Mrs. Pedda Jyothi", designation: "Sweeper", qualification: "—", dateOfJoining: "17-06-2003", experience: "22 Years", category: "Contingent Staff" as const },
      { sNo: 3, name: "Mrs. S. Savithri", designation: "Sweeper", qualification: "—", dateOfJoining: "6/4/2015", experience: "11 Years", category: "Contingent Staff" as const },
      { sNo: 4, name: "Mrs. T. Rajini", designation: "Sweeper", qualification: "—", dateOfJoining: "20-09-2021", experience: "5 Years", category: "Contingent Staff" as const },
      { sNo: 5, name: "Mrs. G. Suvartha", designation: "Sweeper", qualification: "—", dateOfJoining: "6/1/2016", experience: "10 Years", category: "Contingent Staff" as const },
      { sNo: 6, name: "Mrs. T. Papa", designation: "Sweeper", qualification: "—", dateOfJoining: "1/6/2016", experience: "8 Years", category: "Contingent Staff" as const },
      { sNo: 7, name: "Mrs. B. Sailaja", designation: "Sweeper", qualification: "—", dateOfJoining: "4/1/2018", experience: "—", category: "Contingent Staff" as const },
      { sNo: 8, name: "Mrs. A. Anitha", designation: "Sweeper", qualification: "—", dateOfJoining: "1/11/2022", experience: "3 Years", category: "Contingent Staff" as const },
    ]
  },

  // D. Visiting / Adjunct Faculty
  visitingFaculty: {
    title: "D. Visiting / Adjunct Faculty",
    tagline: "Distinguished Academic Scholars, Industry Leaders & Guest Practitioners",
    description:
      "The college engages Visiting Faculty, Adjunct Faculty, Industry Experts and Academic Experts/Resource Persons to enrich the academic environment through specialized knowledge, practical insights, expert lectures and interaction with students.",
    members: [
      {
        sNo: 1,
        employeeId: "SACW-VF-001",
        name: "Prof. K. Rama Krishna Rao",
        designation: "Visiting Professor",
        department: "Computer Science & AI",
        qualification: "M.Tech., Ph.D., Post-Doc (USA)",
        dateOfJoining: "10-06-2022",
        experience: "25",
        staffType: "visiting" as const,
        slug: "prof-k-rama-krishna-rao",
        specialization: "Artificial Intelligence, Data Analytics & Machine Learning",
        profilePdfUrl: "/documents/faculty/Faculty_Website_Profile_View.pdf"
      },
      {
        sNo: 2,
        employeeId: "SACW-VF-002",
        name: "Dr. V. Sudhakar Reddy",
        designation: "Adjunct Professor",
        department: "Commerce & Management",
        qualification: "M.Com., M.B.A., Ph.D., FCA",
        dateOfJoining: "15-07-2021",
        experience: "22",
        staffType: "visiting" as const,
        slug: "dr-v-sudhakar-reddy",
        specialization: "Corporate Taxation, Strategic Financial Management & IFRS",
        profilePdfUrl: "/documents/faculty/Faculty_Website_Profile_View.pdf"
      },
      {
        sNo: 3,
        employeeId: "SACW-VF-003",
        name: "Dr. Mary Anuradha Fernandez",
        designation: "Visiting Faculty / Resource Person",
        department: "Life Sciences & Biotechnology",
        qualification: "M.Sc., Ph.D., CSIR-NET",
        dateOfJoining: "01-08-2023",
        experience: "18",
        staffType: "visiting" as const,
        slug: "dr-mary-anuradha-fernandez",
        specialization: "Molecular Biology, Immunology & Recombinant DNA Technology",
        profilePdfUrl: "/documents/faculty/Faculty_Website_Profile_View.pdf"
      },
      {
        sNo: 4,
        employeeId: "SACW-VF-004",
        name: "Mr. P. Venkata Subbaiah",
        designation: "Industry Expert & Adjunct Faculty",
        department: "Physics & Electronics",
        qualification: "M.Sc., M.Phil. (VLSI)",
        dateOfJoining: "05-09-2022",
        experience: "15",
        staffType: "visiting" as const,
        slug: "mr-p-venkata-subbaiah",
        specialization: "Embedded Systems, IoT & Nanoelectronics",
        profilePdfUrl: "/documents/faculty/Faculty_Website_Profile_View.pdf"
      }
    ]
  },

  // E. Faculty Recruitment & Selection
  recruitment: {
    title: "E. Faculty Recruitment & Selection",
    tagline: "Merit-Based, Transparent Selection in Compliance with Statutory Norms",
    description:
      "The college follows a transparent, merit-based and institutional recruitment process for appointing qualified and competent faculty in accordance with institutional policies and applicable regulatory and university norms.",
    pillars: [
      {
        title: "Recruitment Policy",
        desc: "Recruitment is undertaken in accordance with institutional policies and applicable regulatory and university norms."
      },
      {
        title: "Eligibility & Qualification Norms",
        desc: "Candidates are selected based on prescribed educational qualifications, eligibility, experience and subject expertise."
      },
      {
        title: "Recruitment Process",
        desc: "Vacancies are notified, applications are scrutinized, eligible candidates are shortlisted and assessed through the prescribed selection process."
      },
      {
        title: "Selection Committee",
        desc: "A duly constituted Selection Committee evaluates candidates based on qualifications, experience, subject knowledge and overall suitability."
      },
      {
        title: "Appointment & Service Regulations",
        desc: "Selected candidates are appointed through formal appointment orders and governed by the applicable institutional service rules and regulations."
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
      "The College encourages faculty members to continuously enhance their academic knowledge, teaching skills, research capabilities and professional competencies through various development activities.",
    pillars: [
      {
        title: "Faculty Development Programmes (FDPs)",
        desc: "Faculty Development Programmes (FDPs) for enhancing teaching, research and professional skills."
      },
      {
        title: "Orientation / Refresher Programmes",
        desc: "Orientation / Refresher Programmes for academic enrichment and updating subject knowledge."
      },
      {
        title: "Workshops & Training Programmes",
        desc: "Workshops & Training Programmes to develop pedagogical, technical and digital competencies."
      },
      {
        title: "Seminars / Conferences",
        desc: "Encouragement to participate in seminars, conferences and academic forums for knowledge sharing and professional networking."
      },
      {
        title: "MOOCs / SWAYAM / NPTEL",
        desc: "Encouragement to undertake relevant online courses and certifications through recognized platforms."
      },
      {
        title: "FDP Participation",
        desc: "Faculty participation in recognized FDPs is encouraged and documented as part of professional development."
      },
      {
        title: "Professional Certifications",
        desc: "Faculty members are encouraged to pursue relevant professional certifications to strengthen their expertise and career growth."
      }
    ],
    // Table 4: Year-wise Faculty Development & Professional Development Activities
    annualReports: [
      {
        year: "2025–2026",
        title: "Faculty Development Programme (FDP) Annual Report 2025–2026",
        subtitle: "Institutional FDPs, Pedagogical Workshops & Training Modules",
        fileUrl: "/documents/faculty/Faculty_Development_Progra._2025-2026.pdf",
        certificatesUrl: "" // Empty to demonstrate "Will be updated soon"
      },
      {
        year: "2024–2025",
        title: "Faculty Development Programme (FDP) Annual Report 2024–2025",
        subtitle: "Comprehensive FDP Activities, Training Logs & Attendance",
        fileUrl: "/documents/faculty/Faculty_Dev.Programme_s_2024-25.pdf",
        certificatesUrl: "/documents/faculty/2024-2025_FDPS_&_Seminars_Certifcates.pdf"
      }
    ]
  },

  // G. Faculty Achievements
  achievements: {
    title: "G. Faculty Achievements",
    tagline: "Excellence in Research, Publications, Patents, Awards & Scholarly Pursuits",
    description:
      "The College recognizes and promotes the academic, research, professional and social contributions of its faculty members through various achievements and scholarly activities.",
    pillars: [
      { title: "Research Publications", desc: "Faculty contributions through research papers published in reputed journals and academic publications." },
      { title: "Books / Chapters", desc: "Authorship and contribution to books, edited volumes and book chapters." },
      { title: "Patents", desc: "Faculty innovations and intellectual property developed through patents and related initiatives." },
      { title: "Awards & Recognitions", desc: "Academic, research and professional awards, honours and recognitions received by faculty members." },
      { title: "Conferences / Presentations", desc: "Participation and paper presentations in national and international seminars, conferences and academic forums." },
      { title: "Research Projects", desc: "Faculty involvement in funded and institutional research projects." },
      { title: "Academic Contributions", desc: "Contributions to curriculum development, academic committees, examinations, mentoring and other scholarly activities." },
      { title: "Extension & Community Engagement", desc: "Faculty participation in extension activities, outreach programmes and community development initiatives." }
    ],
    // Table 5: Year-wise Faculty Research & Academic Contributions
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
      }
    ]
  },

  // H. Faculty Exchange & Academic Mobility
  mobility: {
    title: "H. Faculty Exchange & Academic Mobility",
    tagline: "Inter-Institutional Collaboration, Guest Lectures & Academic Interaction",
    description:
      "The College encourages academic mobility and professional interaction of faculty members to promote knowledge sharing, collaboration and exposure to diverse academic practices.",
    pillars: [
      { title: "Faculty Exchange", desc: "Encouragement of faculty exchange and interaction with other higher education institutions for sharing academic expertise and best practices." },
      { title: "Academic Visits", desc: "Faculty visits to universities, colleges, research institutions and other academic organizations for academic and professional enrichment." },
      { title: "Guest Lectures", desc: "Participation as invited speakers or resource persons in guest lectures, seminars, workshops and academic programmes." },
      { title: "Collaborative Academic Activities", desc: "Promotion of joint academic initiatives such as seminars, workshops, conferences, research activities and other collaborative programmes with institutions and academic bodies." }
    ],
    // Table 6: Year-wise Record of Faculty Exchange & Academic Mobility
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
      }
    ]
  },

  // I. Faculty Performance Appraisal
  appraisal: {
    title: "I. Faculty Performance Appraisal",
    tagline: "Systematic, Multi-Dimensional Evaluation & Continuous Quality Enhancement",
    description:
      "The College follows a systematic and transparent faculty performance appraisal process to support continuous professional growth, teaching effectiveness and academic excellence.",
    pillars: [
      { title: "Performance Appraisal System", desc: "Faculty performance is periodically reviewed based on academic responsibilities, teaching effectiveness, professional conduct and institutional contributions." },
      { title: "Annual Faculty Appraisal", desc: "Faculty members are evaluated annually based on their academic performance, assigned responsibilities, professional development and contributions to the institution." },
      { title: "Academic Performance Indicators", desc: "Assessment may include teaching-learning activities, syllabus completion, student mentoring, research and publications, participation in FDPs, academic activities and institutional responsibilities." },
      { title: "Feedback Mechanisms", desc: "Feedback from students and other relevant stakeholders may be considered to identify areas for improvement and strengthen teaching effectiveness." },
      { title: "360° Feedback / Appraisal", desc: "Where implemented, feedback may be obtained from multiple stakeholders, such as students, peers, Heads of Departments and institutional authorities, to provide a broader assessment of faculty performance." }
    ],
    // Table 7: Year-wise Faculty Performance Appraisal Records
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
      }
    ]
  },

  // J. Faculty Welfare & Support
  welfare: {
    title: "J. Faculty Welfare & Support",
    tagline: "Comprehensive Institutional Support, Social Security & Conducive Workplace",
    description:
      "The College provides various welfare and professional support measures to promote faculty well-being, professional growth and effective academic engagement.",
    pillars: [
      { title: "Faculty Welfare Measures", desc: "Provides welfare facilities and a supportive work environment for the well-being of faculty members." },
      { title: "Leave & Professional Development Support", desc: "Facilitates eligible leave and encourages participation in professional development and capacity-building programmes." },
      { title: "Financial Assistance for FDPs / Conferences", desc: "Provides financial support, wherever applicable, for participation in FDPs, seminars, workshops and conferences." },
      { title: "Research Support", desc: "Encourages and facilitates research activities, publications, projects, patents and other scholarly initiatives." },
      { title: "ICT / Digital Learning Support", desc: "Provides access to ICT facilities, digital resources and online learning platforms to support effective teaching and continuous learning." }
    ],
    // Table 8: Year-wise Faculty Welfare & Support Activities
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
      }
    ]
  },

  // K. Faculty & Staff Photo and Video Gallery (Event Albums)
  eventAlbums: [
    {
      id: "event-fdp-2025",
      title: "Faculty Orientation & Development Program (FDP 2025–2026)",
      date: "2025-08-18",
      year: "2025–2026",
      category: "Faculty Development",
      description:
        "Comprehensive week-long pedagogical training program on Outcome-Based Education, ICT-enabled pedagogy, and student mentorship for newly joined and senior faculty.",
      coverImage: "/images/college_crest_gold.png",
      media: [
        {
          id: "m-101",
          mediaType: "photo" as const,
          url: "/images/college_crest_gold.png",
          caption: "Inaugural lighting of the lamp by Principal and Chief Guests."
        },
        {
          id: "m-102",
          mediaType: "photo" as const,
          url: "/images/college_crest_gold.png",
          caption: "Interactive technical workshop on LMS & Hybrid Learning."
        },
        {
          id: "m-103",
          mediaType: "photo" as const,
          url: "/images/college_crest_gold.png",
          caption: "Group faculty deliberation and curriculum structuring session."
        },
        {
          id: "m-104",
          mediaType: "video" as const,
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          caption: "Valedictory address and participant feedback highlights video."
        }
      ]
    },
    {
      id: "event-teachers-day-2024",
      title: "Annual Teachers' Day Felicitation & Academic Excellence Awards",
      date: "2024-09-05",
      year: "2024–2025",
      category: "Celebrations & Honors",
      description:
        "Special felicitation ceremony organized by the Management honoring teaching faculty for 100% pass percentages, PhD accomplishments, and research citations.",
      coverImage: "/images/college_crest_gold.png",
      media: [
        {
          id: "m-201",
          mediaType: "photo" as const,
          url: "/images/college_crest_gold.png",
          caption: "Management awarding Best Teacher trophies and cash incentives."
        },
        {
          id: "m-202",
          mediaType: "photo" as const,
          url: "/images/college_crest_gold.png",
          caption: "Faculty gathering and cultural program performance."
        },
        {
          id: "m-203",
          mediaType: "video" as const,
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          caption: "Event summary video of Teachers' Day celebrations."
        }
      ]
    },
    {
      id: "event-ai-workshop-2024",
      title: "Hands-on National Workshop on AI Tools for Academic Research",
      date: "2024-11-12",
      year: "2024–2025",
      category: "Workshops & Research",
      description:
        "Two-day intensive workshop for arts, science, and commerce faculty exploring Generative AI, data analytics, Scopus indexing, and plagiarism ethics.",
      coverImage: "/images/college_crest_gold.png",
      media: [
        {
          id: "m-301",
          mediaType: "photo" as const,
          url: "/images/college_crest_gold.png",
          caption: "Hands-on computer lab session with resource person Dr. K. Rama Krishna."
        },
        {
          id: "m-302",
          mediaType: "photo" as const,
          url: "/images/college_crest_gold.png",
          caption: "Faculty certificate distribution ceremony."
        }
      ]
    },
    {
      id: "event-wellness-2024",
      title: "Staff Health, Wellness & Mental Rejuvenation Camp",
      date: "2024-03-22",
      year: "2023–2024",
      category: "Staff Welfare",
      description:
        "Annual institutional wellness day featuring free preventive health check-ups, yoga, stress-management workshops, and fellowship games for all staff.",
      coverImage: "/images/college_crest_gold.png",
      media: [
        {
          id: "m-401",
          mediaType: "photo" as const,
          url: "/images/college_crest_gold.png",
          caption: "Yoga & mindfulness meditation session for staff."
        },
        {
          id: "m-402",
          mediaType: "photo" as const,
          url: "/images/college_crest_gold.png",
          caption: "Health check-up camp in partnership with Apollo Hospitals."
        }
      ]
    }
  ],

  // Backwards compatible flat gallery list
  gallery: [
    {
      id: "gal-1",
      title: "Faculty Orientation & Development Program 2025–2026",
      mediaType: "photo" as const,
      url: "/images/college_crest_gold.png",
      year: "2025–2026",
      caption: "Interactive workshop on Outcome-Based Education and Digital Pedagogies for faculty members.",
      date: "August 2025"
    }
  ]
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

export interface FacultyPolicyDocument {
  id: string;
  _id?: string;
  title: string;
  subtitle?: string;
  category: "recruitment" | "fdp" | "achievements" | "exchange" | "appraisal" | "welfare";
  year?: string;
  fileUrl: string;
  certificatesUrl?: string;
  displayOrder?: number;
}

export const DEFAULT_FACULTY_POLICY_DOCS: FacultyPolicyDocument[] = [
  {
    id: "doc-hr-policy",
    title: "Human Resource Policy Document",
    subtitle: "Service Rules, Recruitment Code, Ethics & Faculty Governance",
    category: "recruitment",
    year: "2024–2025",
    fileUrl: "/documents/faculty/Human_Resource_Policy.pdf",
    certificatesUrl: "",
    displayOrder: 1,
  },
  {
    id: "doc-fdp-2025-2026",
    title: "Faculty Development Programme (FDP) Annual Report 2025–2026",
    subtitle: "Institutional FDPs, Pedagogical Workshops & Training Modules",
    category: "fdp",
    year: "2025–2026",
    fileUrl: "/documents/faculty/Faculty_Development_Progra._2025-2026.pdf",
    certificatesUrl: "",
    displayOrder: 2,
  },
  {
    id: "doc-fdp-2024-2025",
    title: "Faculty Development Programme (FDP) Annual Report 2024–2025",
    subtitle: "Comprehensive FDP Activities, Training Logs & Attendance",
    category: "fdp",
    year: "2024–2025",
    fileUrl: "/documents/faculty/Faculty_Dev.Programme_s_2024-25.pdf",
    certificatesUrl: "/documents/faculty/2024-2025_FDPS_&_Seminars_Certifcates.pdf",
    displayOrder: 3,
  },
  {
    id: "doc-achievements",
    title: "Faculty Research, Awards & Publication Register",
    subtitle: "Compendium of faculty honors and journal publications",
    category: "achievements",
    year: "2025–2026",
    fileUrl: "/documents/DefaultFile_1.pdf",
    certificatesUrl: "",
    displayOrder: 4,
  },
  {
    id: "doc-exchange",
    title: "Academic Mobility & Collaborative Exchange Reports",
    subtitle: "Inter-institutional guest faculty exchange initiatives",
    category: "exchange",
    year: "2025–2026",
    fileUrl: "/documents/DefaultFile_1.pdf",
    certificatesUrl: "",
    displayOrder: 5,
  },
  {
    id: "doc-asar-appraisal",
    title: "Faculty Performance Appraisal (ASAR) Guidelines & Form",
    subtitle: "Annual self-appraisal report and API score calculation",
    category: "appraisal",
    year: "2025–2026",
    fileUrl: "/documents/DefaultFile_1.pdf",
    certificatesUrl: "",
    displayOrder: 6,
  },
  {
    id: "doc-welfare",
    title: "Institutional Faculty Welfare Schemes & Benefit Circulars",
    subtitle: "Maternity, medical, provident fund, and financial support policies",
    category: "welfare",
    year: "2025–2026",
    fileUrl: "/documents/DefaultFile_1.pdf",
    certificatesUrl: "",
    displayOrder: 7,
  },
];
