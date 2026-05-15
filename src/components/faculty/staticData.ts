export interface FacultyMember {
  sNo: number;
  name: string;
  staffType: 'teaching' | 'non-teaching' | 'contingent';
  designation: string;
  department?: string;
  qualification?: string;
  dateOfJoining: string;
  experience: string;
}

export interface FacultySection {
  title: string;
  content: string;
}

export const staticFacultyMembers: FacultyMember[] = [
  {
    "sNo": 1,
    "staffType": "teaching",
    "name": "Dr.Sr.Sandhya Thumma",
    "designation": "Principal",
    "department": "MBA",
    "qualification": "MBA,M.COM.m,B.Ed,Ph.D",
    "dateOfJoining": "09-1-22014",
    "experience": "11"
  },
  {
    "sNo": 2,
    "staffType": "teaching",
    "name": "Mr. Shaik Mahaboob Subhani",
    "designation": "HOD",
    "department": "Mathematics",
    "qualification": "m.Sc,M.Phil",
    "dateOfJoining": "01-07-1998",
    "experience": "28"
  },
  {
    "sNo": 3,
    "staffType": "teaching",
    "name": "Mrs. Rudrapati Sharon Rose",
    "designation": "Lecturer",
    "department": "Commerce",
    "qualification": "M.COM,M.PHIL,MDCA",
    "dateOfJoining": "16-06-1999",
    "experience": "27"
  },
  {
    "sNo": 4,
    "staffType": "teaching",
    "name": "Mrs.Jonnalagadda Prameela Rani",
    "designation": "Lecturer",
    "department": "Commerce",
    "qualification": "M.Com,M.Phil",
    "dateOfJoining": "16-06-1999",
    "experience": "27"
  },
  {
    "sNo": 5,
    "staffType": "teaching",
    "name": "Mrs.Busi Joyce N.J.Kumari",
    "designation": "Lecturer",
    "department": "Chemistry",
    "qualification": "M.Sc,M.Ed",
    "dateOfJoining": "15-07-1999",
    "experience": "27"
  },
  {
    "sNo": 6,
    "staffType": "teaching",
    "name": "Mr.Chaganti Rama Rao",
    "designation": "Lecturer",
    "department": "Physics",
    "qualification": "M.Sc,M.Phil,B.Ed",
    "dateOfJoining": "18-06-2001",
    "experience": "25"
  },
  {
    "sNo": 7,
    "staffType": "teaching",
    "name": "Dr.Jakkam Pratapa Reddy",
    "designation": "Professor",
    "department": "Statistics",
    "qualification": "M.Sc,M.Phil,Ph.D",
    "dateOfJoining": "19-06-2003",
    "experience": "17"
  },
  {
    "sNo": 8,
    "staffType": "teaching",
    "name": "Mrs.Meka Anjana Devi",
    "designation": "Lecturer",
    "department": "Commerce",
    "qualification": "M.Com, M.Phil",
    "dateOfJoining": "16-06-1997",
    "experience": "26"
  },
  {
    "sNo": 9,
    "staffType": "teaching",
    "name": "Mrs.Dammi Swarna Charani Rai",
    "designation": "Associate Professor",
    "department": "Computer Science",
    "qualification": "MCA",
    "dateOfJoining": "16-06-2007",
    "experience": "19"
  },
  {
    "sNo": 10,
    "staffType": "teaching",
    "name": "Mrs. Katta Vanaja",
    "designation": "Lecturer",
    "department": "Biotechnology",
    "qualification": "M.Sc,B.Ed",
    "dateOfJoining": "16-06-2008",
    "experience": "18"
  },
  {
    "sNo": 11,
    "staffType": "teaching",
    "name": "Mrs.Mekala Usha Rani",
    "designation": "Lecturer",
    "department": "MCA",
    "qualification": "MCA",
    "dateOfJoining": "12-06-2008",
    "experience": "18"
  },
  {
    "sNo": 12,
    "staffType": "teaching",
    "name": "Mrs .Gudiseva Saroja",
    "designation": "Lecturer",
    "department": "Commerce",
    "qualification": "M.Com,MBA",
    "dateOfJoining": "07-06-2010",
    "experience": "16"
  },
  {
    "sNo": 13,
    "staffType": "teaching",
    "name": "Mrs.Badduri Usha Rani",
    "designation": "Lecturer",
    "department": "BCA",
    "qualification": "MCA",
    "dateOfJoining": "15-06-2011",
    "experience": "15"
  },
  {
    "sNo": 14,
    "staffType": "teaching",
    "name": "Mrs. Kondru  Vidyadhari",
    "designation": "Lecturer",
    "department": "Botany",
    "qualification": "M.Sc,M.Ed",
    "dateOfJoining": "07-06-2012",
    "experience": "14"
  },
  {
    "sNo": 15,
    "staffType": "teaching",
    "name": "Mr.Davala Simon",
    "designation": "Lecturer",
    "department": "Botany",
    "qualification": "M.Sc",
    "dateOfJoining": "07-06-2012",
    "experience": "14"
  },
  {
    "sNo": 16,
    "staffType": "teaching",
    "name": "Mrs. Golla Anitha Bhanu",
    "designation": "Lecturer",
    "department": "Chemistry",
    "qualification": "M.Sc",
    "dateOfJoining": "15-06-2006   ,06-06-2013",
    "experience": "14"
  },
  {
    "sNo": 17,
    "staffType": "teaching",
    "name": "Mrs. Dhulipalla Venkata Ramanamma",
    "designation": "Lecturer",
    "department": "MCA",
    "qualification": "MCA",
    "dateOfJoining": "07-06-2021",
    "experience": "14"
  },
  {
    "sNo": 18,
    "staffType": "teaching",
    "name": "Mr .Shaik Mahaboob Subhani",
    "designation": "Lecturer",
    "department": "Commerce",
    "qualification": "M.Com,PGDFM",
    "dateOfJoining": "12-06-2013",
    "experience": "13"
  },
  {
    "sNo": 19,
    "staffType": "teaching",
    "name": "Mrs.Irugula Adi Lakshmi",
    "designation": "Lecturer",
    "department": "Oriental Languages",
    "qualification": "M.Com, M.Phil",
    "dateOfJoining": "04-06-2015",
    "experience": "11"
  },
  {
    "sNo": 20,
    "staffType": "teaching",
    "name": "Mrs. Bhimisetty Ranjitha",
    "designation": "Lecturer",
    "department": "Microbiology",
    "qualification": "M.Sc",
    "dateOfJoining": "10-06-2019",
    "experience": "7"
  },
  {
    "sNo": 21,
    "staffType": "teaching",
    "name": "Mrs.LingaReddy Mary Anusha",
    "designation": "Lecturer",
    "department": "Mathematics",
    "qualification": "M.Sc,B.Ed",
    "dateOfJoining": "15-09-2021",
    "experience": "5"
  },
  {
    "sNo": 22,
    "staffType": "teaching",
    "name": "Mrs. Gorre VijayaLakshmi",
    "designation": "Lecturer",
    "department": "Statistics",
    "qualification": "M.Sc",
    "dateOfJoining": "20-06-2011",
    "experience": "14"
  },
  {
    "sNo": 23,
    "staffType": "teaching",
    "name": "Mrs.Perumall Sandhya",
    "designation": "Lecturer",
    "department": "English",
    "qualification": "M.A English",
    "dateOfJoining": "07-06-2012",
    "experience": "12"
  },
  {
    "sNo": 24,
    "staffType": "teaching",
    "name": "Mrs.Gundabommu Vani",
    "designation": "Lecturer",
    "department": "MCA",
    "qualification": "MCA",
    "dateOfJoining": "21-02-2022",
    "experience": "4"
  },
  {
    "sNo": 25,
    "staffType": "teaching",
    "name": "Mrs. Burri Manasa",
    "designation": "Lecturer",
    "department": "Computer Science",
    "qualification": "MCA",
    "dateOfJoining": "23-06-2022",
    "experience": "4"
  },
  {
    "sNo": 26,
    "staffType": "teaching",
    "name": "Mrs.Pagadala Anitha",
    "designation": "Lecturer",
    "department": "Computer Science",
    "qualification": "MCA",
    "dateOfJoining": "01-12-2022",
    "experience": "4"
  },
  {
    "sNo": 27,
    "staffType": "teaching",
    "name": "Mrs.R.Phani Rjaya LakshMI",
    "designation": "Lecturer",
    "department": "Oriental Languages",
    "qualification": "M.A-Telugu",
    "dateOfJoining": "06-06-2023",
    "experience": "3"
  },
  {
    "sNo": 28,
    "staffType": "teaching",
    "name": "Mrs.Kommuri Grace Santhi Ann",
    "designation": "Lecturer",
    "department": "English",
    "qualification": "M.A- English",
    "dateOfJoining": "12-07-2023",
    "experience": "3"
  },
  {
    "sNo": 29,
    "staffType": "teaching",
    "name": "Sr.Gade Margaret Priyanka",
    "designation": "Lecturer",
    "department": "Biotechnology",
    "qualification": "M.Sc",
    "dateOfJoining": "06-06-2018",
    "experience": "8"
  },
  {
    "sNo": 30,
    "staffType": "teaching",
    "name": "Dr.Pisapati Lakshmi Narasimha Rao",
    "designation": "Professor",
    "department": "MBA",
    "qualification": "M.Com,M.Phil,Ph.D",
    "dateOfJoining": "16-07-2008",
    "experience": "18"
  },
  {
    "sNo": 31,
    "staffType": "teaching",
    "name": "Dr.Gudavalli Radhika",
    "designation": "Associate Professor",
    "department": "MBA",
    "qualification": "M.Com,MBA,M.Phil,Ph.D",
    "dateOfJoining": "07-01-2008",
    "experience": "18"
  },
  {
    "sNo": 32,
    "staffType": "teaching",
    "name": "Dr.Vyyuru Vani",
    "designation": "Associate Professor",
    "department": "MBA",
    "qualification": "MBA,Ph.D",
    "dateOfJoining": "01-03-2022",
    "experience": "4"
  },
  {
    "sNo": 33,
    "staffType": "teaching",
    "name": "Mrs. Jujuri Sirisha",
    "designation": "Lecturer",
    "department": "MBA",
    "qualification": "M.Com,MBA",
    "dateOfJoining": "18-03-2014",
    "experience": ",31-07-2023"
  },
  {
    "sNo": 34,
    "staffType": "teaching",
    "name": "Mrs.Gochipatala Sailaja",
    "designation": "Librarian",
    "department": "Library",
    "qualification": "M.A,M.L.I.SC,B.Ed",
    "dateOfJoining": "01-09-2002",
    "experience": "24"
  },
  {
    "sNo": 35,
    "staffType": "teaching",
    "name": "Mrs. Dodda Anitha",
    "designation": "Librarian",
    "department": "Library",
    "qualification": "M.A, M.L.I,SC",
    "dateOfJoining": "01-09-2013",
    "experience": "14-07-2023"
  },
  {
    "sNo": 36,
    "staffType": "teaching",
    "name": "Mr.Ganji Bala Show Reddy",
    "designation": "P.D",
    "department": "Physical Education",
    "qualification": "m.p.Ed,M.Phill",
    "dateOfJoining": "01-07-2003",
    "experience": "01-06-2017"
  },
  {
    "sNo": 37,
    "staffType": "teaching",
    "name": "Mrs .Kankanampati Susmitha",
    "designation": "NCC Officer",
    "department": "Physical Education",
    "qualification": "MPEd",
    "dateOfJoining": "01-02-2021",
    "experience": "5"
  },
  {
    "sNo": 38,
    "staffType": "teaching",
    "name": "Miss.Gangula Santha Kumari",
    "designation": "Lecturer",
    "department": "Physics",
    "qualification": "M.Sc",
    "dateOfJoining": "01-09-2021",
    "experience": "01-06-2024"
  },
  {
    "sNo": 39,
    "staffType": "teaching",
    "name": "Dr.Sr.Fatima Rani.P",
    "designation": "Professor",
    "department": "English",
    "qualification": "MA LITT,M.Phill,Ph D",
    "dateOfJoining": "10-06-2016",
    "experience": "10"
  },
  {
    "sNo": 40,
    "staffType": "teaching",
    "name": "Mrs .Nelapati Madhavi",
    "designation": "Lecturer",
    "department": "MBA",
    "qualification": "MBA",
    "dateOfJoining": "13-11-2024",
    "experience": "Below 2 Years"
  },
  {
    "sNo": 41,
    "staffType": "teaching",
    "name": "Sr.Vanga Lakshmi Jyothi",
    "designation": "Lecturer",
    "department": "Biotechnology",
    "qualification": "M.Sc",
    "dateOfJoining": "02-12-2024",
    "experience": "Below 2 Years"
  },
  {
    "sNo": 42,
    "staffType": "teaching",
    "name": "Miss. V.Deepika",
    "designation": "Lecturer",
    "department": "MCA",
    "qualification": "MCA",
    "dateOfJoining": "01-09-2025",
    "experience": "Below 2 Years"
  },
  {
    "sNo": 43,
    "staffType": "teaching",
    "name": "Miss. A.Sarala",
    "designation": "Lecturer",
    "department": "MCA",
    "qualification": "MCA",
    "dateOfJoining": "01-09-2025",
    "experience": "Below 2 Years"
  },
  {
    "sNo": 44,
    "staffType": "teaching",
    "name": "Mrs. Thota Durga Bhavani",
    "designation": "Lecturer",
    "department": "Computer Science",
    "qualification": "MCA",
    "dateOfJoining": "24-06-2019",
    "experience": "20-06-2024"
  },
  {
    "sNo": 45,
    "staffType": "teaching",
    "name": "Mrs.Gummalla Mani Deepika",
    "designation": "Lecturer",
    "department": "Chemistry",
    "qualification": "M.Sc",
    "dateOfJoining": "02-12-2024",
    "experience": " Below 2 Years"
  },
  {
    "sNo": 1,
    "staffType": "non-teaching",
    "name": "Sr.Jasintha.I",
    "designation": "Office Superintendent",
    "department": "Accounts Office",
    "qualification": "B.A.Litt,B.Ed",
    "dateOfJoining": "01-07-2024",
    "experience": "1"
  },
  {
    "sNo": 2,
    "staffType": "non-teaching",
    "name": "Mrs.Vemula Ratna Kumari",
    "designation": "Senior Assistant",
    "department": "Administstarative Office",
    "qualification": "B.A,PGDCA",
    "dateOfJoining": "03-07-2002",
    "experience": "22"
  },
  {
    "sNo": 3,
    "staffType": "non-teaching",
    "name": "Mrs.Ravela Veeramma",
    "designation": "Senior Assistant",
    "department": "Administstarative Office",
    "qualification": "B.Com,PGDCA",
    "dateOfJoining": "01-06-2013",
    "experience": "16"
  },
  {
    "sNo": 4,
    "staffType": "non-teaching",
    "name": "Mr.Tadigiri Kishore Babu",
    "designation": "Computer Operator",
    "department": "Administstarative Office",
    "qualification": "BA,PGDCA",
    "dateOfJoining": "15-06-2005",
    "experience": "21"
  },
  {
    "sNo": 5,
    "staffType": "non-teaching",
    "name": "Mr.Pentareddy Joseph Vijay Kumar Reddy",
    "designation": "Record Assistant",
    "department": "Administstarative Office",
    "qualification": "SSC,ITI",
    "dateOfJoining": "01-06-2019",
    "experience": "7"
  },
  {
    "sNo": 6,
    "staffType": "non-teaching",
    "name": "Mr.Jonnada Venkateswara Rao",
    "designation": "Examinations& Scholarships &ANU Works",
    "department": "Administstarative Office",
    "qualification": "MCA",
    "dateOfJoining": "02-01-2021",
    "experience": "5"
  },
  {
    "sNo": 7,
    "staffType": "non-teaching",
    "name": "Mrs.Nelaturi Aneesha",
    "designation": "Junior Assistant",
    "department": "Administstarative Office",
    "qualification": "M.A,B.L.I.Sc",
    "dateOfJoining": "17-01-2010",
    "experience": "13"
  },
  {
    "sNo": 8,
    "staffType": "non-teaching",
    "name": "Mrs.Govindu Mary Aswini",
    "designation": "Lab.Assistant",
    "department": "Computer Lab I&II",
    "qualification": "B.A",
    "dateOfJoining": "23-07-2007",
    "experience": "19"
  },
  {
    "sNo": 9,
    "staffType": "non-teaching",
    "name": "Mr.Yarla Badaraiah",
    "designation": "Lab.Assistant",
    "department": "Chemistry Lab",
    "qualification": "B.A",
    "dateOfJoining": "01-10-2010",
    "experience": "16"
  },
  {
    "sNo": 10,
    "staffType": "non-teaching",
    "name": "Mrs.Yamarthi Sundari",
    "designation": "Lab.Assistant",
    "department": "Biotechnology",
    "qualification": "BA",
    "dateOfJoining": "10-09-2015",
    "experience": "11"
  },
  {
    "sNo": 11,
    "staffType": "non-teaching",
    "name": "Mrs.Madasu Prema Latha",
    "designation": "Lab.Assistant",
    "department": "Microbiology",
    "qualification": "BA",
    "dateOfJoining": "04-01-2012",
    "experience": "7"
  },
  {
    "sNo": 12,
    "staffType": "non-teaching",
    "name": "Mrs.Nelaturi Geetha",
    "designation": "Lab.Assistant",
    "department": "PG Computer Lab-IV",
    "qualification": "BA",
    "dateOfJoining": "18-06-2012",
    "experience": "14"
  },
  {
    "sNo": 13,
    "staffType": "non-teaching",
    "name": "Mrs.Dodda Chitty",
    "designation": "Library Assistant",
    "department": "Computer Lab-III & APSSDC",
    "qualification": "B.Sc,B.Ed,B.L.I.Sc",
    "dateOfJoining": "01-08-2016",
    "experience": "8"
  },
  {
    "sNo": 14,
    "staffType": "non-teaching",
    "name": "Mr.Yedluri Sekhar Babu",
    "designation": "Lab.Assistant",
    "department": "Chemistry Lab",
    "qualification": "BA",
    "dateOfJoining": "03-07-2023",
    "experience": "3"
  },
  {
    "sNo": 15,
    "staffType": "non-teaching",
    "name": "Mr.Chukka Manoj Kumar",
    "designation": "Lab.Assistant",
    "department": "Botany Lab",
    "qualification": "BA",
    "dateOfJoining": "07-12-2023",
    "experience": "2"
  },
  {
    "sNo": 1,
    "staffType": "contingent",
    "name": "Mr.M.Ratna Kumari",
    "designation": "Sweeper",
    "dateOfJoining": "14-06-2004",
    "experience": "22"
  },
  {
    "sNo": 2,
    "staffType": "contingent",
    "name": "Mrs.Pedda Jyothi",
    "designation": "Sweeper",
    "dateOfJoining": "17-06-2003",
    "experience": "22"
  },
  {
    "sNo": 3,
    "staffType": "contingent",
    "name": "Mrs.S.Savithri",
    "designation": "Sweeper",
    "dateOfJoining": "06-04-2015",
    "experience": "11"
  },
  {
    "sNo": 4,
    "staffType": "contingent",
    "name": "Mrs.T.Rajini",
    "designation": "Sweeper",
    "dateOfJoining": "20-09-2021",
    "experience": "5"
  },
  {
    "sNo": 5,
    "staffType": "contingent",
    "name": "Mrs.G.Suvartha",
    "designation": "Sweeper",
    "dateOfJoining": "06-01-2016",
    "experience": "10"
  },
  {
    "sNo": 6,
    "staffType": "contingent",
    "name": "Mrs.T.Papa",
    "designation": "Sweeper",
    "dateOfJoining": "01-06-2016",
    "experience": "8"
  },
  {
    "sNo": 7,
    "staffType": "contingent",
    "name": "Mrs.B.Sailaja",
    "designation": "Sweeper",
    "dateOfJoining": "04-01-2018",
    "experience": "8"
  },
  {
    "sNo": 8,
    "staffType": "contingent",
    "name": "Mrs A Anitha",
    "designation": "Sweeper",
    "dateOfJoining": "01-11-2022",
    "experience": "3"
  }
];

export const staticFacultySections: Record<string, FacultySection> = {
  "visiting": {
    "title": "Visiting / Adjunct / Emeritus Professors (Domestic & International Experts)",
    "content": "Visiting / Adjunct / Emeritus Professors (Domestic & International Experts)\n\nThe institution enriches its academic ecosystem by engaging Visiting, Adjunct, and Emeritus Professors, including distinguished domestic and international experts from academia, industry, and research organizations. Their association enhances the quality of teaching\u2013learning processes and strengthens the institution\u2019s academic and research profile through global and interdisciplinary exposure.\n\nVisiting Professors\n\nDistinguished academicians and industry experts, both from India and abroad, are invited as Visiting Professors to deliver guest lectures, conduct workshops, and share contemporary knowledge with students and faculty. Their contributions help:\n\n- Bridge the gap between theory and practice \n- Introduce current trends and global industry insights \n- Provide exposure to diverse academic and cultural perspectives \n\nAdjunct Professors\n\nAdjunct faculty members, including experienced industry professionals and subject experts, are engaged on a part-time basis. Their involvement ensures:\n\n- Teaching of specialized and skill-oriented courses \n- Curriculum enrichment aligned with industry and global standards \n- Mentoring students for projects, internships, and career development \n\nEmeritus Professors\n\nThe institution honors eminent retired academicians by appointing them as Emeritus Professors. Their expertise supports:\n\n- Academic guidance and mentorship for faculty and students \n- Research development and scholarly publications \n- Curriculum design and institutional academic initiatives \n\nDomestic & International Collaboration\n\nThe institution actively collaborates with national and international experts through:\n\n- Guest lectures, webinars, and virtual sessions \n- Academic exchange and collaborative research activities \n- Participation in international conferences and knowledge-sharing platforms \n\nKey Benefits\n\n- Enhanced academic quality and interdisciplinary learning \n- Strengthened national and global academic collaborations \n- Exposure to real-world practices and international standards \n- Mentorship and professional guidance for students and faculty \n\nInstitutional Approach\n\nThe institution follows a structured and quality-driven approach in engaging Visiting, Adjunct, and Emeritus Professors. Their contributions are aligned with institutional goals and are periodically reviewed to ensure maximum academic impact and continuous improvement."
  },
  "recruitment": {
    "title": "Recruitment Policy & Process",
    "content": "[Refer to Detailed Documents and Gallery in the Section]\n\nST.ANN\u2019S COLLEGE FOR WOMEN\n\nRun by the Society of St. Anne, A Catholic Christian Minority Institution \n\nAffiliated to Acharya Nagarjuna University, Approved by AICTE\n\nRecognised under 2(f) of UGC Act 1956, New Delhi\n\nAccredited by NAAC with \u201cA \u201cGrade in the First Cycle\n\nAMARAVATHI ROAD, GORANTLA, GUNTUR \u2013 522034, A. P\n\nEmail: [st_anns_coll@yahoo.co.in](mailto:st_anns_coll@yahoo.co.in)Website: www.stannscollegeforwomen.org\n\nCriterion:\n\nVI\n\nMetric: 6.2.1\n\nCHAPTER \u2013 IV: HUMAN RESOURCE POLICY\n\n*Statutory Reference: Manual of Procedures of Higher Education (2021), The Society of St. Anne (Pages 55-60).*\n\nAPPOINTMENT OF STAFF & SERVICE RULES\n\nLEADERSHIP APPOINTMENTS\n\nPrincipal, Dean and Secretaries cum correspondents of Higher Educational Institutions, who are members of the society, shall be appointed by the President/Chairperson of the Governing Body in consultation with the members of the Governing Body.\n\nI. APPOINTMENT OF STAFF:\n\n1. The appointment of staff of the Institutions, administered by the society is governed by the terms and conditions contained in the appointment letter of the Education Society service rules and Regulations. Such agreements determine the Rights and duties of the staff concerned including service conditions.\n2. The Governing Body is the ultimate appointing authority which shall exercise the authority through the Correspondent/Principal for all classes of employees of the institution.\n3. A Selection Committee consists of 4/5 members including Subject experts, Correspondent, Principal, and Faculty members nominated by the management (UGC, NCTE, AICTE, SCRT and norms to be followed) and all university/Govt. guidelines will be followed.\n4. Criteria for Retention and Tenure\n\n- Performance-Based Retention: Employment at the institution is strictly merit-based. No employee shall be considered 'permanent' by virtue of time served alone. The retention of any staff member is exclusively contingent upon two non-negotiable factors:\n- Annual Performance Appraisal: A formal, documented evaluation by the principal regarding the employee's teaching effectiveness, administrative contributions, and overall value to the institution.\n- Institutional Conduct: Strict adherence to the Code of Conduct, Rules, and Regulations of the College and the Society.\n- The Principal and Management reserve the absolute right to terminate or non-renew the services of any employee whose Performance Appraisal is found unsatisfactory or who fails to comply with institutional discipline. The Performance Appraisal is the primary instrument for determining the suitability of an employee for continued service.\n\nII.RECRUITMENT PROCEDURE :\n\n The Correspondent is responsible for intimating the Employment exchange of vacancies (wherever it is applicable) and for advertising the vacant posts in the local Daily calling for applications.\n\n1. The correspondent of the concerned Institution shall receive the applications.\n2. After the preliminary scrutiny of the applications only eligible candidates shall be called for interviews at their own cost.\n3. The selection committee shall conduct the interviews of the eligible candidates who present themselves for the interview.\n4. It shall recommend a panel of names for each post and arrange them in the order of merit giving due weightage to Catholics.\n5. The selections of the candidates shall be made by the selection committee, on the basis of merit and performance, both in the demonstration and in the personal interview.\n6. Due consideration of the academic qualifications, professional experience and suitability of the applicant for the appointment to the posts for which they have applied shall be given.\n7. All the selections made by the selection committee shall be submitted to the Correspondent who issues the appointment orders.\n8. The selected candidate shall receive the appointment letter from the Correspondent signed by the Correspondent.\n9. All new appointments are made on a contract basis for eleven months or less, till the end of the academic year, after which their services automatically stand, cancelled.\n10. The selected candidate, if accepting the appointment, shall enter into agreement, in the prescribed manner and form with the institution concerned at the time of appointment.\n11. Service in any other institution except St.Ann\u2019s Institutions shall not be counted for the purpose of pension or other benefits.\n12. During the contract period they are not eligible for the summer vacation period salary.\n\nAPPOINTMENT OF SUBSTITUTE TEACHERS:\n\nTemporary vacancies (due to resignation, maternity, long sickness, study leave, etc.) shall be filled in by the Correspondent.\n\nIII. CERTIFICATES AND DOCUMENTS\n\nSelected candidates must submit the following documents to the Correspondent:\n\n1. SSC Certificate: Proof of date of birth.\n2. Academic Certificates: UG/PG/Ph.D. degree certificates.\n3. Professional Eligibility: Training certificates, NET, SLET, or SET qualifications.\n4. Experience: Official experience certificates from previous employers.\n5. Identification: Aadhaar Card and PAN Card.\n\nIV. PAY SCALES AND ALLOWANCES\n\n- Pay for the teaching and non-teaching staff members may be paid as per the Norms of the St. Ann's Society.\n- Pay scales/ as per norms of each independent Society of St. Ann's Educational Institutions.\n- The Governing Body shall fix the allowances subject the following conditions\n- Since the salary to the staff is to be paid from the fee collected from the students and the strength of the students in the institution are inter-linked factors, any raise in the Dearness Allowances payable to staff, shall be declared only once in an academic year i.e. June of every year. D.A and other allowance are fixed in every Institution according to its means (income). Hence there may not be uniformity in D.A. and other allowances in all the St. Ann's Society Institutions.\n- No employee will be entitled to annual or periodical increments as a matter of right but will depend upon the prosperity of the Institutions and the future prospects.\n- Irrespective of the fact whether any scale of pay and increments have been prescribed or not, the employer on account of recession or other sufficient reason, reserve the right to suspend or postpone the increment to which an employee may be entitled in accordance with the grade in respect of individual cases/categories of employee.\n- Considering the financial constraints of the Institutions the Management may impose a ceiling on the Salary of the teaching staff.\n\nSUPERANNUATION\n\n- Every staff member shall retire from service in accordance with the prevailing rules of the State, i.e., at the age of 58 years. \n- Voluntary Retirement: In exceptional cases, the Management may, at its discretion, permit voluntary retirement with benefits after completion of 25 years of continuous service and attainment of 50 years of age. \n\nCHAPETR \u2013 VII : RULES REGARDING LEAVE AND VACATION \n\nThis chapter is based on the guidelines outlined in the Manual of Procedures of Higher Education (2021) issued by The Society of St. Anne (Page Nos. 93 to 97).\n\nI.LEAVE RULES IN GENERAL\n\nThe purpose of granting leave to an employee is to facilitate her/him sufficient relaxation and rest so that her/his efficiency can be enhanced and does not deteriorate .Keeping this in view all leaves shall be granted as per the feasibility prevailing in the unit /department concerned and will be governed by the exigencies of services there in and the possibilities of alternative arrangements that can be made to ensure the efficient discharge of the duties of the employee in his /her absence.\n\nAll leaves will be allowed to employee subject to the exigencies of work.\n\n1. Any employee who desires to obtain leaves shall apply to the principal or correspondent in writing.\n2. Application for leave of absence for duration of less than three days must be made at least 48 hours prior to the time from which this leave _ is required, except on compassionate\u2019 grounds.\n3. Application for leave of absence for a duration of more than one week shall be made at least 15 days in advance from the date from which the leave is required.\n4. A record shall be maintained of all leave of absence, which is sanctioned, in the personal sheet of each employee.\n5. An employee who absents himself for 15 consecutive days or overstays leaves (including Sunday and holidays) beyond the period of leave originally granted or subsequently extended by eight consecutive days will be deemed to have lost his lien on his employment.\n6. Leave shall be granted in accordance with the \u201cleave rules\u201d.\n7. Leave cannot be claimed by any employee as a right. \n8. For the purpose of leave, the leave year shall be reckoned from 1 January to 31 December.\n9. Sundays and /or holidays falling within the period of leave shall be counted as part of the leave. \n10. All leave applications forwarded to the principal for sanctioning shall contain the recommendation of head of the department.\n11. A record of all sanctioned leave shall be maintained in a proper register in the department.\n12. No leave shall be \u2018granted to any employee against whom any disciplinary procedure is pending.\n13. An employee who has been granted leave should not take up any service or employment elsewhere without obtaining prior sanction of the competent authority.\n14. The temporary and part \u2013 time staff are not eligible to any leave except casual leave, proportionate to the duration of their appointment. \n\nII.CASUAL LEAVE\n\n1. It is granted to meet the special and urgent personal affairs.\n2. Every employee shall be entitled to have \u2013 15 days of casual leave in each calendar year subject to the necessities and exigencies of work. Employee joining the services in the middle \u2018of a calendar year shall be eligible for casual leave proportionate to the remaining period of the year for which she/he is employed.\n3. Casual leave may be either prefixed or suffixed to Sundays, weekly day off or statutory holidays.\n4. Casual leave is not granted for more than three days at a time.\n5. Casual leave may be availed of for half a day. \n6. Unveiled casual leave shall lapse on the close of the leave year. This leave cannot be added.\n7. Monthly Ceiling: Faculty shall ordinarily avail only one (1) day of CL per month. Utilization of leave beyond this monthly limit, even if within the annual 15-day quota, requires specific justification and Principal\u2019s sanction.\n\nIII.SUPPLEMENTARY PROCEDURES\n\n- Leave Forms: All Casual Leave requests must be submitted using the official printed forms available from the Office Superintendent.\n- Punctuality: To maintain discipline, every three (3) instances of late arrival will be recorded as one (1) full day of Casual Leave deducted from the employee's balance.\n- Workload Management: It is the responsibility of the faculty member to ensure teaching hours lost due to absence are compensated. A work adjustment plan, signed by the HOD, must be submitted alongside the leave application.\n- Emergency Notification: In unforeseen circumstances, the principal must be notified via telephone immediately. The formal written application must then be submitted in person within 24 hours of returning.\n\n IV. SPECIAL LEAVE CATEGORIES\n\nMATERNITY LEAVE\n\nA married permanent female employee can avail 3 months maternity leave on full pay. If a female employee applies for maternity leave after two surviving children, it will be treated as level of loss of pay. If an employee already has two surviving children before joining the institution, that employee will not be entitled for maternity leave with pay\n\nMEDICAL LEAVE\n\nA staff member may be granted 5 days of leave with full pay on medical grounds. It may be extended to 10 days at the discretion of the institution authority. In case of medical leave for more than three days, a medical certificate must he submitted from the authorized medical practitioner for computing the number of days of medical leave, all intervening holidays and Sundays shall be counted. However institution vacations cannot be prefixed or suffixed such leave in which case the whole period including the college vacation shall be treated as medical leave and the rules of leave without pay and shall apply.\n\nEXTRA- ORDINARY LEAVE (LEAVEWITHOUT PAY)\n\n1. Under extraordinary circumstances leave on loss of pay up to 10 days in a leave year may be held at the discretion of the principal concerned. The nature of the exigency shall be clearly recorded\n2. Leave for more than 10 days or extension of leave already granted may be permitted by the principal only to cover periods of sickness or other extraordinary personal situation.\n3. All leave on loss of pay shall be promptly intimated by the principal to the office accountant for necessary salary adjustments.\n4. An employee who continues to be absent for 10 days without permission in excess of the period for which leave without pay has been granted shall be liable for disciplinary action\n\nV.OFFICIAL LEAVE (ON DUTY)\n\nThe purpose of official leave is to carry out official work outside the institution. Members of the staff will be considered to be \"On Duty\" under the following circumstances:\n\n1. Administrative Assignments: Carrying out official work at the direction of the Principal such as invigilation, paper valuation, or practical examinations. This ordinarily varies from one day to two weeks and is approved by the principal.\n2. In-Service Education: Participation in short-term training or in-service education.\n3. Professional Development (FDP): To foster academic excellence, faculty are encouraged to attend seminars, workshops, and Faculty Development Programs (FDP).\n\t- Requirement: Permission is subject to the submission of the official event brochure.\n\t- Accountability: Upon return, a participation report and certificate must be submitted to the Internal Quality Assurance Cell (IQAC) for institutional records.\n\nVI. ADMINISTRATIVE CONTROLS\n\n1. Sanctioning Authority: The Principal is the authority for all leave, except Long/Extraordinary leave, which is granted by the Correspondent/President.\n2. Interpretation: In the event of ambiguity, the decision of the principal, in consultation with the Management, shall be final.\n3. Maintenance of Records: The Office Superintendent shall maintain digitized and physical records. A quarterly summary of leave and punctuality shall be submitted to the principal.\n\nCODE OF CONDUCT FOR EMPLOYEES\n\nIntroduction\n\nThe *Code of Conduct* for the staff of St. Ann\u2019s College for Women is formulated in accordance with the guidelines prescribed in Chapter VI of the Manual of Procedures of Higher Education (2021) issued by *The Society of St. Anne*. This Code serves as a foundational document that defines the professional standards, ethical values, and institutional responsibilities expected of all teaching and non-teaching staff members.\n\nThe purpose of this Code is to ensure that every staff member upholds the dignity, integrity, and mission of the institution, while contributing to a disciplined, respectful, and academically enriching environment. It reflects the core values of the Society, emphasizing commitment to excellence, accountability, transparency, and service.\n\nThis Code of Conduct provides a structured framework for professional behavior, guiding staff in their interactions with students, colleagues, management, and the wider community. It also reinforces adherence to institutional policies, statutory regulations, and ethical responsibilities essential for maintaining the reputation and effective functioning of the college.\n\nBy adhering to this Code, staff members are expected to demonstrate professionalism, fairness, integrity, and dedication in all aspects of their duties, thereby supporting the vision and mission of St. Ann\u2019s College for Women.\n\nScope of the Code\n\nThe provisions relating to the Code of Conduct, rules, and regulations governing staff are comprehensively detailed in the following chapters of the *Manual of Procedures of Higher Education (2021)*:\n\n- Chapter VI \u2013 General Institutional Code of Conduct  \nThis chapter outlines the fundamental principles, expected behavior, duties, and professional ethics to be followed by all staff members. \n- Chapter VII \u2013 Rules Regarding Leave and Vacation  \nThis chapter specifies the policies, procedures, and entitlements related to various types of leave and vacation applicable to staff. \n- Chapter VIII \u2013 Disciplinary Action  \nThis chapter defines the rules, procedures, and measures related to disciplinary actions in cases of misconduct, violation of institutional norms, or non-compliance with regulations. \n\nCHAPTER \u2013 VI : GENERAL INSTITUTIONAL CODE OF CONDUCT\n\nThis chapter is based on the guidelines outlined in the *Manual of Procedures of Higher Education (2021)* issued by *The Society of St. Anne*.\n\nGENERAL RULES FOR STAFF\n\nThese rules shall apply to all employees (teaching and non-teaching), irrespective of the nature of their appointment, working in St. Ann\u2019s Institutions. Every staff member is required to adhere to the following code of conduct.\n\nIDENTITY CARD\n\n- Every employee shall be issued an identity card and must wear it at all times while on the college premises. The card shall be produced for inspection whenever required by the Management or any authorized person. \n- Upon cessation of employment, the employee shall surrender the identity card to the Appointing Authority before settlement of accounts. \n- In case of loss or damage, a duplicate identity card may be issued on payment of the prescribed fee. \n\nRECORD OF ADDRESS\n\nAll employees shall promptly inform the Administration/Personnel Department of any change in their local or permanent address, within three days of such change. Any communication sent by the Management to the recorded address shall be deemed valid and sufficient.\n\nMAINTENANCE OF DISCIPLINE\n\n- Every employee shall assist the Head of the Institution in maintaining discipline and order. \n- All staff shall function as a cohesive and disciplined team, prioritizing institutional goals over personal preferences. \n- No employee shall participate in or encourage any activity that disrupts discipline or harms the interests of the institution. \n- Staff members shall act as role models, upholding the dignity of the teaching profession. \n- Employees shall not remain absent from duty without proper permission or as per prescribed rules. \n- Every employee shall remain available for institutional responsibilities as required. \n- Employees shall maintain absolute integrity, devotion to duty, and perform their work diligently and efficiently. \n- All staff shall comply with lawful orders, instructions, and directions issued by the competent authorities. \n- Employees shall ensure that their duties are not affected by the influence of alcohol or any intoxicating substances. \n- Smoking is strictly prohibited within the college premises. \n- Employees shall be responsible for the proper use and safe custody of institutional property entrusted to them. \n- Staff shall cooperate with the institution in maintaining discipline, enhancing work efficiency, and promoting institutional interests. \n- Employees shall maintain cordial relationships and cooperate with colleagues and non-teaching staff for smooth functioning of work. \n- Staff shall not engage in private tuition or coaching for students without prior authorization. \n- Prior permission from the Management must be obtained before applying for any examination or enrolling in any course of study. \n- Employees shall not use abusive, offensive, or inappropriate language within the campus. \n- Corporal punishment in any form is strictly prohibited. Issues of student indiscipline shall be reported to the Head of the Institution for appropriate action through the Discipline Committee. \n- Employees shall avoid public statements or expressions that may adversely affect the relationship between the Management, staff, students, or Government. \n- No employee shall disclose official information or documents to unauthorized persons or the media without prior permission from the Management. \n- Employees shall comply with all rules, orders, and instructions issued by the institution from time to time. \n- Visitors or outsiders shall not be allowed into staff rooms without permission. \n- Staff shall integrate value education into their teaching as part of the academic process. \n- Employees shall respect institutional authority and adhere to all rules and regulations of the institution. \n\nPROFESSIONAL NORMS\n\n- Every lecturer shall uphold the highest standards of professional ethics in the discharge of duties and conduct themselves in a manner that inspires confidence in their honesty, integrity, and impartiality. \n- Any form of bias in student assessment, including deliberate over-marking, under-marking, or victimization on any grounds, shall be considered misconduct. \n- No lecturer shall indulge in, support, or encourage any malpractice related to examinations or any other institutional activity. \n\nLATE COMING AND ABSENTEEISM\n\n- All employees shall report for duty at the prescribed time and commence their work promptly. \n- Employees reporting late, within 30 minutes of the scheduled time, may be permitted to join duty at the discretion of the Principal; however, such instances shall be treated as late attendance. \n- One Casual Leave (C.L.) shall be deducted for every third instance of late attendance. \n- Any employee who absents themselves without valid reason, or who refuses to perform assigned duties despite being present, shall be subject to disciplinary action as per institutional rules. \n\nPRIVATE EMPLOYMENT / TRADE / INVESTMENT\n\n- No employee shall directly or indirectly disclose or communicate any official information relating to the institution, its services, or its finances to any unauthorized person or authority. \n- Employees shall not engage in any trade or business activities within the premises of the institution. \n- Employees shall not undertake any other employment, assignment, or professional engagement, whether remunerative or otherwise, without prior approval of the Management. \n- No employee shall collect or receive money from students for any purpose unless duly authorized by the Head of the Institution. \n\nPARTICIPATION IN UNION ACTIVITIES / POLITICS / ELECTIONS\n\n- Formation of trade unions is not permitted within the institutions. \n- Any grievances shall be brought to the notice of the Correspondent, who will address them through dialogue and discussion in a spirit of understanding and mutual respect. \n- Employees shall not bring or attempt to bring political or external pressure from any union, association, parents, or other extraneous sources upon the Management in matters relating to their service conditions. \n\nBEHAVIOUR IN PUBLIC\n\n- Employees shall maintain dignity and professionalism in all interactions and shall not misbehave with or ill-treat any parent, guardian, student, colleague, or other employee of the institution. \n- No employee shall encourage, incite, or participate in any form of disorderly conduct within the institution. \n- Employees shall not organize or attend meetings during working hours without prior permission from the Head of the Institution. \n- No employee shall engage in acts of violence, moral misconduct, or damage to institutional property, nor instigate others to do so. \n- Employees shall not promote or encourage casteism, communalism, sectarianism, untouchability, or discrimination on the basis of caste, creed, language, place of origin, or social and cultural background. \n\nRESPONSIBILITY AT THE WORK SPOT\n\n- All employees shall report to their designated workplace at the appointed time and commence duties promptly. \n- Employees shall accurately record their attendance and departure in the prescribed manner. Failure to do so may result in being marked absent, leading to loss of salary and disciplinary action. \n- No employee shall leave the workplace during working hours without prior permission from the Principal. \n- Leaving the workplace without permission after reporting for duty shall be treated as absence without leave for the entire day. \n- Absence without permission after coffee or lunch break shall be treated as absence without leave for the respective period or for half a day, whichever is greater. \n- In addition to salary or leave forfeiture, the Management reserves the right to initiate further disciplinary action for violation of attendance rules. \n\nNO WORK \u2013 NO PAY\n\n- In all cases of absence from duty or workplace without prior permission, or failure to discharge assigned duties, the principle of *\u201cNo Work \u2013 No Pay\u201d* shall apply, without prejudice to other disciplinary provisions. \n\nWORKING HOURS\n\n- Employees shall adhere to the prescribed working hours of the institution. \n- The standard working duration is eight hours per day; however, this may vary across departments, roles, and institutional requirements. \n- Employees may be required to work beyond scheduled hours in case of academic or administrative exigencies. \n- The Management reserves the right to modify working hours or shifts based on institutional needs. \n- No employee shall engage in similar professional work outside the institution without prior written permission from the Appointing Authority. \n\nOBLIGATIONS OF STAFF\n\n- Courteous Behaviour:  \nEvery staff member shall, at all times, be courteous, respectful, and considerate towards fellow employees, students, parents, visitors, trainees, the public, and all persons in authority. \n- Conscientious Performance of Duties:  \nEvery staff member shall carry out duties assigned by their supervisors and the Management diligently, faithfully, and in accordance with instructions. They shall maintain discipline at all times within the department and on the college premises, and extend full cooperation to superiors and colleagues. \n- Care of Institutional Property:  \nEmployees shall take due care of all institutional property, including vehicles, equipment, computers, laboratory instruments, furniture, materials, and other assets of the College/Hostel.  \nAny damage or loss caused due to negligence, misuse, or mishandling shall render the employee liable for disciplinary action, and the Management reserves the right to recover the cost of such damage or loss. \n- Reporting of Injuries:  \nAny injury sustained during the course of employment shall be reported immediately to the Principal for necessary action. \n\nSAFETY RESPONSIBILITIES\n\n- Employees shall promptly report any incident, hazard, or defect that may endanger the safety of individuals or cause damage to institutional property. \n- Staff shall take all necessary precautions to prevent accidents and shall properly use all safety devices and measures provided by the Management. \n\nTERMINATION OF PERMANENT EMPLOYEES\n\nThe Appointing Authority may terminate the services of a permanent employee under the following conditions:\n\n- By giving three months\u2019 notice or salary in lieu of notice. \n- On proven misconduct, following due disciplinary procedures as per applicable laws. \n- On administrative grounds in the interest of the institution. \n- By operation of prevailing law. \n- On medical grounds, as specified (refer Chapter VII, relevant provisions). \n\nRESIGNATION\n\n- A permanent employee may resign by submitting notice as prescribed or by paying salary in lieu of notice to the Principal. \n- The employee shall be relieved only after properly handing over all responsibilities to a designated staff member. \n- The Head of the Institution reserves the right to accept or refuse resignation if disciplinary proceedings are pending or for valid administrative reasons. \n- Every employee shall be entitled to a *Service Certificate* upon leaving the institution, issued by the Appointing Authority. \n\nSUPERANNUATION\n\n- Every staff member shall retire from service in accordance with the prevailing rules of the State, i.e., at the age of 58 years. \n- Voluntary Retirement: In exceptional cases, the Management may, at its discretion, permit voluntary retirement with benefits after completion of 25 years of continuous service and attainment of 50 years of age. \n\nHANDING OVER OF INSTITUTIONAL PROPERTY\n\n- Upon resignation or termination, the employee shall return all institutional property, including identity cards, records, files, books, tools, instruments, and any other materials entrusted to them, before final settlement of dues. \n- Employees shall compensate the institution for any loss or damage caused to property under their custody. \n- Failure to comply with these provisions may result in withholding of dues, recovery of losses, and initiation of appropriate legal or disciplinary action by the Management. \n\nApproved by the President \n\nRev.Mother Anthonamma\n\nPresident of Schools & Colleges\n\nThe Society of St.Anne"
  },
  "professional-dev": {
    "title": "Professional Development",
    "content": "[Refer to Detailed Documents and Gallery in the Section]\n\nProfessional Development Programmes attended by the Faculty for the A.Y 2025-2026  \n\nNo\n\nName of the Faculty\n\nDepartment\n\nTitle of FDP / Programme\n\nType (FDP / Workshop / Refresher / Orientation)\n\nMode (Online/Offline/Blended)\n\nOrganized by (Institution)\n\nDuration (From\u2013To)\n\nNo. of Days\n\nLevel (State/National/International)\n\n1\n\nDr.Sr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nAICTE ATAL Academy Faculty Development Programme\n\nFDP\n\nOnline\n\nAICTE ATAL Academy  & Oriental College  of Management\n\n12-01-2026 to 17-01-2026\n\n6\n\nNational\n\n2\n\nDr.Sr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nAICTE ATAL Academy Faculty Development Programme\n\nFDP\n\nOnline\n\nACITE ATAL Academy & NASSCOM\n\n26-01-2026 to 31-01-2026\n\n6\n\nNational\n\n3\n\nDr.Sr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nAICTE ATAL Academy Faculty Development Programme\n\nFDP\n\nOnline\n\nACITE ATAL Academy & School of Technology\n\n02-02-2026 to 02-02-2026\n\n6\n\nNational\n\n4\n\nDr.Sr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nAICTE ATAL Academy Faculty Development Programme\n\nFDP\n\nOnline\n\nACITE ATAL Academy & Vikas College of Engineering & Technology\n\n09-02-2026 to 14-02-2026\n\n6\n\nNational\n\n5\n\nDr.Sr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n6\n\nDr.Sr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of English ,JMJ College for Women(A),Tenali\n\n8-12-2025 to 12-12-2025\n\n5\n\nInternational\n\n7\n\nSr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nFive -Day Online Faculty Development  Programme\n\nFDP\n\nOnline\n\nJKC (Autonomous),Guntur ,Andhra Pradesh 522 006 & IQAC Cluster India\n\n13-06-2025 to 17-06-2025\n\n5\n\nNational\n\n8\n\nDr.Sr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nHar Ghar Tiranga\n\nAwareness Programme\n\nOnline\n\nMinistry of Culture\n\n14-08-2025\n\n1\n\nNational\n\n9\n\nSr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nIntegrity Pledge\n\nAwareness Programme\n\nOnline\n\nAndhra Pradesh\n\n31-10-2025\n\n1\n\nState\n\n10\n\nDr.Sr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nQuiz World Immunization Day\n\nAwarneses Proegramme/Acivity\n\nOnline\n\nDept.of Biotechnology,St.Ann's College for Women,Gorantla,Guntur\n\n10-11-2025\n\n1\n\nState\n\n11\n\nSr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nYogandhra-2025\n\nTraining Programme\n\nOnline\n\nDept.of AYUSH,Governemtn of Andhra Pradesh\n\n20-06-2025\n\n1\n\nState\n\n12\n\nDr.Sr.Sandhya Thumma\n\nPrincipal/Dept.of MBA\n\nExamination Audit Framework for Higher Education Institutions\n\nOrientation\n\nOnline\n\nWhite Code & IQAC cluster\n\n06-02-2026\n\n1\n\nNational\n\n13\n\nMr. Sk. Mehaboob Subhani\n\nHOD/Mathematics\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n14\n\nMrs.R.Sharon Rose\n\nVice-Principal\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\nFDP\n\nOnline\n\nJKC College & IQAC Cluster India\n\n13-06-2026 to 17-06-2026\n\n5\n\nNational\n\n15\n\nMrs.R.Sharon Rose\n\nVice-Principal\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\nFDP\n\nOnline\n\nJMJ College for Women, Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n16\n\nMrs.R.Sharon Rose\n\nVice-Principal\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\nFDP\n\nOnline\n\nJMJ College for Women, Tenali\n\n08-12-2025 to 12-12-2025\n\n5\n\nInernational\n\n17\n\nMrs.B.Joyce NJKumari\n\nHOD/Chemistry\n\nFive -Day Online Faculty Development  Programme\n\nFDP\n\nOnline\n\nJKC College & IQAC Cluster India\n\n13-06-2026 to 17-06-2026\n\n5\n\nNational\n\n18\n\nMrs.B.Joyce NJKumari\n\nHOD/Chemistry\n\nDepartment of Chemistry,PBSCAS\n\nFDP\n\nOnline\n\nParvathaneni Brahmayya Siddhartha College of Arts & Science\n\n27-10-2025 to 31-10-2025\n\n5\n\nNational\n\n19\n\nMrs.B.Joyce NJKumari\n\nHOD/Chemistry\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n20\n\nMrs.B.Joyce NJKumari\n\nHOD/Chemistry\n\nFive - Day Online Faculty Development Programme\n\nFDP\n\nOnline\n\nDBT STAR College,Coimbator\n\n09-03-2026 to 13-03-2026\n\n5\n\nInternational\n\n21\n\nMr.Ch.Rama Rao\n\nHOD/Physics\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n22\n\nMrs.G.Sailaja\n\nLibrarian\n\nYogandhra-2025\n\nTraining Programme\n\nOnline\n\nDept.of AYUSH,Governemtn of Andhra pradesh\n\n20-06-2025\n\n1\n\nState\n\n23\n\nMrs.D.Swarna Charani Rai\n\nHOD/Computer Science\n\nFive - Day Online Faculty Development Programme\n\nFDP\n\nOnline\n\nRama Rao Adik Institute of Technology,Hoizen College of Engineering, Bengaluru\n\n11-08-2025 to 18-08-2025\n\n5\n\nInternational\n\n24\n\nMrs.D. Swarna Charani Rai\n\nHOD/Computer Science\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n25\n\nDr.J. Pratapa Reddy\n\nHOD/Statistics\n\nFive -Day Online Faculty Development Programme\n\nFDP\n\nOnline\n\nJKC (Autonomous),Guntur ,Andhra Pradesh 522 006 & IQAC Cluster India\n\n13-06-2025 to 17-06-2025\n\n5\n\nNational\n\n26\n\nDr.J.Pratapa Reddy\n\nHOD/Statistics\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n27\n\nDr.J.Pratap Reddy\n\nHOD/Statistics\n\nStatistics in Data Science and Machine Learning\n\nFDP\n\nOnline\n\nRamaiah University of Applied Sciences CMS Ramaiah University Applied Sciences\n\n29-10-2025 to 30-10-2025\n\n2\n\nInternational\n\n28\n\nMrs.K.Vanaja\n\nHOD/Bio Technology\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n29\n\nMrs.M.Usha Rani\n\nHOD/MCA\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n30\n\nDr.G.Radhika\n\nHOD/Dept.of MBA\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n31\n\nMrs.G.Saroja\n\nLecturer/Commerce\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n32\n\nMrs.B.Usha Rani\n\nHOD/BCA\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n33\n\nMrs.K.Vidyadhari\n\nHOD/Botany\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n34\n\nMrs.D.V.Ramanamma\n\nLecturer/Computer Science\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n35\n\nMrs.G.Anitha Bhanu\n\nLecturer/Chemistry\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n36\n\nMr.Sk.M.Subhai\n\nLecturer/Commerce\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n37\n\nMrs.I.Adi Lakshmi\n\nHOD/Sanskrit\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n38\n\nMrs.B.Ranjitha\n\nHOD/Microbiology\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n39\n\nLt.K.Susmitha\n\nNCC ANO\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n40\n\nMrs.B.Manasa\n\nLecturer/Computer Science\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n41\n\nMrs.G.Vijaya Lakshmi\n\nLecturer/Statistics\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n42\n\nMrs.R.Phani Rajya Lakshmi\n\nHOD/Telugu\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n43\n\nMrs.D.Anitha\n\nLibrarian\n\nFive Day International FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n44\n\nMrs.J.Sirisha\n\nLecturer/MBA\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n45\n\nMiss.G.Santha Kumari\n\nLecturer/Physics\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n46\n\nMiss.V.Deepika\n\nLecturer/Computer Science\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational\n\n47\n\nMiss.A.Sarala\n\nLecturer/Computer Science\n\nFive Day Intenrational FDP\n\nFDP\n\nOnline\n\nDept.of Home Science & Physical Education  ,JMJ College for Women(A),Tenali\n\n11-11-2025 to 15-11-2025\n\n5\n\nInternational"
  },
  "achievements": {
    "title": "Faculty Achievements",
    "content": "Faculty Achievements\n\nThe institution takes pride in the accomplishments of its faculty members, whose dedication to teaching, research, and service contributes significantly to academic excellence and institutional growth. Faculty achievements reflect a strong commitment to continuous learning, innovation, and professional development.\n\nAcademic & Research Achievements\n\nFaculty members actively engage in research and scholarly activities, contributing to knowledge creation and dissemination through:\n\n- Publications in reputed national and international journals\n- Presentation of research papers at conferences, seminars, and workshops\n- Participation in funded research projects and academic collaborations\n- Guiding student research, projects, and dissertations\n\nProfessional Development\n\nFaculty continuously upgrade their skills and knowledge through:\n\n- Participation in Faculty Development Programmes (FDPs), Orientation and Refresher Courses\n- Attending workshops, seminars, and training programmes\n- Acquiring additional qualifications and certifications\n\nAwards & Recognitions\n\nFaculty members have received recognition for their excellence in teaching, research, and community service, including:\n\n- Best Teacher Awards\n- Research excellence awards\n- Certificates of appreciation from academic and professional bodies\n\nInnovations in Teaching\n\nFaculty adopt innovative teaching methodologies to enhance student learning, such as:\n\n- ICT-enabled teaching and learning practices\n- Outcome-based education (OBE) approaches\n- Development of e-content and digital learning resources\n- Implementation of experiential and project-based learning\n\nExtension & Community Engagement\n\nFaculty actively participate in extension activities and outreach programmes, contributing to societal development through:\n\n- Awareness programmes and community service initiatives\n- Skill development and training programmes\n- Collaboration with NGOs and local organizations\n\nInstitutional Contribution\n\nFaculty play a vital role in institutional development by:\n\n- Coordinating academic and administrative committees\n- Organizing seminars, workshops, and academic events\n- Contributing to curriculum design and quality assurance initiatives"
  },
  "exchange": {
    "title": "Faculty Exchange & Sabbaticals",
    "content": "Faculty Exchange & Sabbaticals (National & International)\n\nThe institution promotes academic collaboration and professional growth through faculty exchange programmes and sabbatical opportunities at both national and international levels. These initiatives enable faculty members to engage with diverse academic environments, share expertise, and adopt innovative teaching and research practices.\n\nFaculty Exchange Programmes\n\nFaculty members are encouraged to participate in exchange programmes with reputed universities, colleges, and research institutions. These exchanges facilitate:\n\n- Sharing of knowledge, teaching methodologies, and best practices\n- Joint academic activities such as lectures, workshops, and seminars\n- Collaborative research and publications\n- Exposure to interdisciplinary and global perspectives\n\nNational Exchanges\n\nAt the national level, the institution collaborates with higher education institutions and organizations to enable short-term and long-term faculty exchanges, guest lectures, and academic interactions that enrich curriculum delivery and research output.\n\nInternational Exchanges\n\nThe institution seeks to establish linkages with international universities and academic bodies to promote global exposure. International exchanges provide opportunities for:\n\n- Cross-cultural academic engagement\n- Participation in global conferences and research initiatives\n- Adoption of international standards in teaching and learning\n\nSabbatical Leave\n\nFaculty members are supported through sabbatical leave policies to pursue advanced research, higher studies, or specialized training. Sabbaticals help faculty:\n\n- Enhance subject expertise and research capabilities\n- Develop innovative curriculum and teaching strategies\n- Contribute to institutional academic excellence\n\nOutcomes\n\n- Strengthened academic collaborations\n- Improved teaching\u2013learning practices\n- Increased research productivity and publications\n- Global exposure and institutional visibility"
  },
  "consultancy": {
    "title": "Consultancy Assignments",
    "content": "Consultancy & Assignments\n\nThe institution encourages faculty members to actively engage in consultancy services and professional assignments that contribute to academic enrichment, industry collaboration, and societal development. These activities help bridge the gap between theoretical knowledge and real-world applications.\n\nFaculty undertake consultancy in areas of their expertise, offering guidance and solutions to industries, organizations, and community bodies. Such engagements enhance institutional visibility and provide valuable exposure to emerging trends and practices.\n\nKey Objectives\n\n- Promote industry\u2013academia collaboration \n- Provide expert services to external organizations \n- Encourage applied research and problem-solving \n- Enhance faculty professional development \n- Contribute to community and societal needs \n\nAreas of Consultancy\n\n- Information Technology & Software Development \n- Business Management & Entrepreneurship \n- Data Analysis & Research Support \n- Training & Skill Development Programmes \n- Academic Projects and Internships Guidance \n\nStudent Involvement\n\nStudents are encouraged to participate in consultancy-linked projects and assignments under faculty guidance, enabling them to gain practical exposure, develop industry-relevant skills, and improve employability.\n\nOutcomes\n\n- Strengthened industry linkages \n- Enhanced practical learning opportunities \n- Increased research and innovation culture \n- Improved institutional reputation"
  },
  "appraisal": {
    "title": "360\u00b0 Performance Appraisal",
    "content": "St. Ann's College implements a comprehensive 360\u00b0 Performance Appraisal system for both teaching and non-teaching staff. This includes:\n\n1. Annual Self-Appraisal Reports (ASAR)\n2. Peer Reviews and Feedback\n3. Student Evaluation & Feedback Reports\n4. Principal and Management Assessment\n\nThis developmental tool helps faculty identify areas of improvement and recognizes exceptional educational contributions."
  }
};
