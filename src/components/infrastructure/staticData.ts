/**
 * Structured Static Dataset for Infrastructure
 * Strictly adhering to 5.infrastructure (1).docx
 */

export interface InfrastructureSectionItem {
  id: string;
  slug: string;
  sectionNumber: number;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  contentMarkdown?: string;
  subsections?: {
    title: string;
    description?: string;
    items?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    links?: { title: string; url: string; note?: string }[];
  }[];
  images: string[];
}

export const INFRASTRUCTURE_SUBTEXT = {
  institution: "St. Ann’s College for Women, Gorantla, Guntur",
  overview:
    "St. Ann’s College for Women provides a safe, accessible, technology-enabled and student-friendly campus environment that supports teaching, learning, research, skill development, sports and holistic student development. The infrastructure is periodically maintained and upgraded to meet academic and institutional requirements.",
  tagline: "Safe, accessible, technology-enabled and student-friendly campus environment."
};

export const INFRASTRUCTURE_SECTIONS: InfrastructureSectionItem[] = [
  // 1. Campus & Buildings
  {
    id: "campus-buildings",
    slug: "campus-buildings",
    sectionNumber: 1,
    title: "1. Campus & Buildings",
    subtitle: "St. Ann’s Block (UG) & Gnanam Block (PG), Academic, Administrative & Support Facilities",
    iconName: "Building2",
    description:
      "The College has a well-maintained campus with St. Ann’s Block and Gnanam Block, housing academic, administrative and student-support facilities. The campus provides a conducive environment for academic and co-curricular activities.",
    subsections: [
      {
        title: "Campus Architecture & Blocks Overview",
        items: [
          "Spacious and well-maintained campus with lush greenery and serene ambience.",
          "St. Ann’s Block dedicated to Undergraduate (UG) academic programmes, administrative offices, and central facilities.",
          "Gnanam Block dedicated to Postgraduate (PG) programmes (MCA & MBA), research facilities, and specialised departments.",
          "Well-equipped air-conditioned seminar halls and auditorium for academic conferences, guest lectures, and co-curricular events.",
          "Clean, well-laid internal roads, pedestrian pathways, and organized open common spaces.",
          "Regular institutional maintenance schedule ensuring a hygienic, safe, and eco-friendly campus environment."
        ]
      }
    ],
    images: [
      "/images/infrastructure/campus-buildings/img-1.jpg",
      "/images/infrastructure/campus-buildings/img-2.jpg",
      "/images/infrastructure/campus-buildings/img-3.jpg",
      "/images/infrastructure/campus-buildings/img-4.jpg",
      "/images/infrastructure/campus-buildings/img-5.jpg",
      "/images/infrastructure/campus-buildings/img-6.jpg",
      "/images/infrastructure/campus-buildings/img-7.jpg"
    ]
  },

  // 2. Classrooms
  {
    id: "classrooms",
    slug: "classrooms",
    sectionNumber: 2,
    title: "2. Classrooms",
    subtitle: "Spacious, Ventilated & ICT-Enabled Interactive Learning Spaces",
    iconName: "Presentation",
    description:
      "The College provides spacious and well-ventilated classrooms equipped with essential teaching facilities. ICT-enabled classrooms and digital teaching resources support interactive and technology-integrated learning.",
    subsections: [
      {
        title: "Key Classroom Features",
        items: [
          "Spacious, naturally lit, and well-ventilated classrooms ensuring an optimal learning atmosphere.",
          "ICT-enabled lecture rooms equipped with ceiling-mounted LCD projectors, interactive smart boards, and digital podiums.",
          "Smart classrooms supporting multimedia presentations, virtual lectures, and blended pedagogical methodologies.",
          "Ergonomic dual-desk seating arrangements with clear sightlines and optimal acoustics.",
          "High-speed campus Wi-Fi connectivity enabling digital resource access during classroom sessions.",
          "Continuous facility management and periodic technology upgrades ensuring flawless classroom operations."
        ]
      }
    ],
    images: [
      "/images/infrastructure/classrooms/img-1.jpg",
      "/images/infrastructure/classrooms/img-2.jpg",
      "/images/infrastructure/classrooms/img-3.jpg",
      "/images/infrastructure/classrooms/img-4.jpg",
      "/images/infrastructure/classrooms/img-5.jpg",
      "/images/infrastructure/classrooms/img-6.jpg",
      "/images/infrastructure/classrooms/img-7.jpg",
      "/images/infrastructure/classrooms/img-8.jpg",
      "/images/infrastructure/classrooms/img-9.jpg",
      "/images/infrastructure/classrooms/img-10.jpg",
      "/images/infrastructure/classrooms/img-11.jpg",
      "/images/infrastructure/classrooms/img-12.jpg",
      "/images/infrastructure/classrooms/img-13.jpg"
    ]
  },

  // 3. Library & Information Centre
  {
    id: "library",
    slug: "library",
    sectionNumber: 3,
    title: "3. Library & Information Centre",
    subtitle: "Central Knowledge Resource Hub, Digital Repositories, DELNET & E-Learning",
    iconName: "BookOpen",
    description:
      "The Library & Information Centre of St. Ann’s College for Women is an integral part of the academic environment, supporting teaching, learning, research, self-study and intellectual development.",
    subsections: [
      {
        title: "A. About the Library",
        description:
          "The Library & Information Centre of St. Ann’s College for Women is an integral part of the academic environment, supporting teaching, learning, research, self-study and intellectual development. It provides students and faculty with access to print and digital resources, reference materials, e-resources and online learning platforms.\n\n" +
          "• Vision: To promote a knowledge-enriched learning community committed to the development and empowerment of society with integrity.\n" +
          "• Mission:\n" +
          "  - To support teaching, learning and research through quality information resources.\n" +
          "  - To promote reflective thinking and intellectual growth.\n" +
          "  - To facilitate access to contemporary knowledge in relevant fields.\n" +
          "• Objectives:\n" +
          "  - To promote reading habits among students and faculty.\n" +
          "  - To encourage effective use of library resources and services.\n" +
          "  - To develop and maintain relevant and updated collections in support of the Teaching-Learning Process.\n" +
          "  - To encourage students to explore knowledge beyond the prescribed curriculum.\n" +
          "  - To provide guidance in the effective use of print and digital resources.\n" +
          "  - To develop the Library as a dynamic and growing knowledge centre.\n" +
          "• Role in Teaching, Learning & Research:\n" +
          "The Library supports the academic needs of UG Degree, MCA and MBA programmes by providing access to books, journals, reference materials, project resources, digital resources and online learning platforms. It facilitates independent learning, project work, information literacy and research-oriented learning, thereby contributing to academic excellence, knowledge enrichment and lifelong learning."
      },
      {
        title: "B. Library at a Glance",
        description:
          "The Library & Information Centre provides a well-equipped and learner-friendly environment with print, digital and reference resources to support the academic requirements of students and faculty.",
        table: {
          headers: ["Particular", "Details"],
          rows: [
            ["Library Built-up Area", "203.45 sq. mt."],
            ["Books", "23,459"],
            ["Titles", "5,679"],
            ["Journals & Magazines", "24"],
            ["Newspapers", "05"],
            ["Project Reports", "1,448"],
            ["Book CDs", "857"],
            ["Magazine CDs", "331"],
            ["Back Volumes of Journals", "51"],
            ["Internet-enabled Systems", "07"],
            ["E-Subscription", "DELNET"],
            ["DELNET Union Catalogues & Databases", "75,00,000"],
            ["Library Software", "NewGenLib 3.0"]
          ]
        }
      },
      {
        title: "C. Library Infrastructure & Facilities",
        items: [
          "Reading Hall: Spacious and conducive reading area for students and faculty.",
          "Stack Area: Systematically organized collection of books and other learning resources.",
          "Reference Section: Reference materials to support academic study, assignments and project work.",
          "Digital Library: Dedicated facility providing access to digital and online academic resources.",
          "Internet-enabled Systems: Computer systems supporting access to online learning resources and digital services.",
          "OPAC Facility: Online Public Access Catalogue for searching and locating Library resources.",
          "Reprographic Facility: Facility for photocopying and reproduction of permitted academic materials.",
          "Newspaper & Magazine Section: Access to newspapers, magazines and current-awareness resources.",
          "CD / Multimedia Resources: Academic book CDs and magazine CDs supporting supplementary learning.",
          "Learner-friendly Environment: A peaceful and disciplined atmosphere conducive to reading, self-study and academic engagement."
        ]
      },
      {
        title: "D. Library Resources",
        description:
          "The Library & Information Centre maintains a diverse and continually developing collection of print, multimedia and digital resources to support the academic requirements of UG Degree, MCA and MBA programmes, as well as faculty teaching, project work and research.",
        items: [
          "Books: A comprehensive collection of textbooks, reference books and supplementary reading materials.",
          "Titles: A wide range of titles covering various academic disciplines and areas of study.",
          "Journals & Magazines: Current academic journals, periodicals and magazines supporting subject knowledge and current awareness.",
          "Newspapers: Newspapers providing access to current affairs, educational, social and general information.",
          "Back Volumes: Preserved back volumes of journals for reference and academic use.",
          "Project Reports: Student project reports providing useful reference material for academic and project work.",
          "Book CDs: Supplementary multimedia resources accompanying selected academic books.",
          "Magazine CDs: Digital multimedia resources supporting additional learning and information access.",
          "E-Subscriptions: Access to subscribed digital resources, including DELNET, as applicable.",
          "DELNET: Access to union catalogues and shared library resources through the Developing Library Network.",
          "Digital Resources: Access to digital libraries, e-books, e-journals, online learning platforms, open-access resources and academic repositories."
        ]
      },
      {
        title: "E. Library Services",
        items: [
          "Circulation Service: Efficient issue, return and management of Library resources.",
          "Issue / Return / Renewal: Facility for borrowing, returning and renewing books as per Library rules.",
          "Reference Service: Assistance in locating and using reference materials for academic and research needs.",
          "OPAC: Online Public Access Catalogue for searching and locating Library resources.",
          "Previous Question Papers: Access to previous examination question papers to support examination preparation and academic practice.",
          "Project Reference Support: Assistance in identifying relevant books, reports and other resources for student projects.",
          "Reprographic Service: Photocopying and reproduction of permitted academic materials.",
          "Digital Library: Access to digital and online academic resources through the Library.",
          "Newspaper Clipping Service: Selected newspaper information maintained for current awareness and reference.",
          "Overnight Reference Book Facility: Provision for overnight use of designated reference books, subject to Library rules.",
          "New Arrivals Display: Display of newly added books and other resources to create awareness among users."
        ]
      },
      {
        title: "F. Digital Library & E-Resources",
        description:
          "The Library & Information Centre of St. Ann’s College for Women facilitates access to a wide range of digital learning resources, e-books, e-journals, databases, Massive Open Online Courses (MOOCs), theses and dissertations, institutional repositories and open educational resources.\n\n" +
          "1. Institutional Digital Resources:\n" +
          "• DELNET – Developing Library Network (Access: Institutional subscription / authorised access. Useful for UG, MCA, MBA, Faculty, Project Work & Research).\n\n" +
          "2. National Digital Learning Platforms:\n" +
          "• National Digital Library of India (NDLI) – Single-window portal for multidisciplinary resources.\n" +
          "• SWAYAM – National online learning platform for Management, Commerce, CS, Math, Sciences & Humanities.\n" +
          "• NPTEL – Quality online technical courses developed by IITs and IISc.\n" +
          "• CEC – Consortium for Educational Communication for UG digital e-content.\n" +
          "• e-PG Pathshala – UGC postgraduate e-content for MCA & MBA.\n" +
          "• eGyanKosh – IGNOU national digital repository for commerce, management & computing.\n\n" +
          "3. MOOCs & Online Certification Courses (Table below):",
        table: {
          headers: ["Platform", "Major Use", "Access"],
          rows: [
            ["SWAYAM", "UG, PG, Management, Commerce, Sciences, Computer Applications", "https://swayam.gov.in"],
            ["NPTEL", "Computer Science, Technology, Mathematics, Sciences & Management", "https://nptel.ac.in"],
            ["SWAYAM Plus", "Employability & industry-oriented learning", "https://swayam-plus.co.in"],
            ["CEC", "Undergraduate e-content and MOOCs", "https://cec.nic.in"]
          ]
        }
      },
      {
        title: "G. Programme-Specific Digital Resources",
        description:
          "• A. Resources for Undergraduate Degree Students:\n" +
          "  - Commerce & Management: SWAYAM, eGyanKosh, DOAJ, SSRN.\n" +
          "  - Computer Science & Applications: NPTEL, SWAYAM, Virtual Labs, arXiv.\n" +
          "  - Mathematics & Physical Sciences: NPTEL, Virtual Labs, Indian Academy of Sciences (IAS), arXiv.\n" +
          "  - Life Sciences (Biotechnology, Microbiology, Botany, Chemistry): DBT, CSIR, PubMed, DOAJ, Virtual Labs.\n\n" +
          "• B. Digital Resources for MCA:\n" +
          "  - Platforms: NPTEL (CS), SWAYAM, Virtual Labs, arXiv (CS), DOAJ, DELNET.\n" +
          "  - Suggested Focus Areas: AI, Machine Learning, Data Science, Cloud Computing, Cyber Security, Database Systems, Software Engineering, Networks.\n\n" +
          "• C. Digital Resources for MBA:\n" +
          "  - Platforms: SWAYAM (Management), NPTEL (Management), SSRN, DOAJ, eGyanKosh, DELNET.\n" +
          "  - Suggested Focus Areas: Finance, Marketing, HR, Business Analytics, Entrepreneurship, Operations, Strategic Management, Research.\n\n" +
          "• 5. E-Journals & Open Access Research: DOAJ, IAS, SpringerOpen, Cambridge Core, SSRN.\n" +
          "• 6. E-Books: DOAB, Internet Archive, Project Gutenberg.\n" +
          "• 7. Electronic Theses & Dissertations: Shodhganga, Shodhgangotri, NDLTD.\n" +
          "• 8. Research & Funding Bodies (Table below):\n" +
          "• 9. Academic Writing & Research Support: Purdue OWL, Google Scholar, Crossref, ORCID.\n" +
          "• 10. Telugu & Indian Knowledge: Vedic Heritage Portal, AP Public Libraries, Internet Archive (Telugu).\n" +
          "• 11. Competitive Exams & Skills: National Career Service (NCS), Skill India Digital, SWAYAM, NPTEL.\n" +
          "• 12. Regulatory Links: UGC, AICTE, MoE, NAAC, SWAYAM, NDLI.\n" +
          "• 13. Digital Resource Policy: For academic purposes only, compliance with copyright, credentials protection, verification of sources and proper citations.\n" +
          "• 14. Support for Digital Learning: Orientation, DELNET sessions, literature search guidance, and information literacy.",
        table: {
          headers: ["Organisation", "Access Link"],
          rows: [
            ["University Grants Commission – UGC", "https://ugc.ac.in"],
            ["All India Council for Technical Education – AICTE", "https://aicte-india.org"],
            ["Ministry of Education, Government of India", "https://education.gov.in"],
            ["Department of Science & Technology – DST", "https://dst.gov.in"],
            ["Department of Biotechnology – DBT", "https://dbtindia.nic.in"],
            ["Council of Scientific & Industrial Research – CSIR", "https://csir.res.in"],
            ["Indian Council of Social Science Research – ICSSR", "https://icssr.org"]
          ]
        }
      },
      {
        title: "H. Library Team",
        table: {
          headers: ["S. No.", "Name", "Qualification", "Designation", "Experience"],
          rows: [
            ["1", "Mrs. G. Sailaja", "M.A., M.L.I.Sc., B.Ed.", "Librarian", "24 Years"],
            ["2", "Mrs. D. Anitha", "M.A., M.L.I.Sc.", "Librarian", "14 Years"]
          ]
        }
      },
      {
        title: "I. Library Rules & Regulations",
        items: [
          "Book Issue & Renewal: Books are issued and renewed according to prescribed Library rules. Books should be returned within the specified loan period. Renewal is subject to availability and demand.",
          "Overdue, Lost & Damaged Books: Books must be returned on or before due date. Overdue books attract a fine. Damaged/lost books must be replaced with the latest edition or compensated.",
          "Library Discipline: Maintain strict silence inside the Library. Eating and drinking are prohibited. Mobile phones must be kept on silent or switched off. Library furniture and equipment must be handled with care.",
          "User Responsibilities: Follow Library procedures, return resources on time, maintain discipline, and comply with instructions of Library staff."
        ]
      },
      {
        title: "J. Library Best Practices",
        items: [
          "1. Need-Based Collection Development: Books and learning resources updated based on curriculum needs and recommendations from students and faculty.",
          "2. New Arrivals Display: Newly acquired books and resources regularly displayed to encourage wider utilization.",
          "3. Digital & E-Resource Awareness: Active encouragement to use DELNET, digital resources, and online platforms.",
          "4. Library User Orientation: Annual orientation sessions conducted for newly admitted students.",
          "5. Promotion of Reading Culture: Organized book displays, reading sessions, Library Week, and literary contests.",
          "6. Information Literacy: Training students to locate, evaluate, and use print and digital scholarly materials.",
          "7. Academic & Project Support: Access to reference books, previous question papers, and project repositories.",
          "8. Library Awareness & Student Engagement: Quizzes, essay writing, painting, and theme-based competitions.",
          "9. User-Centred Services: Smooth circulation, OPAC search, reprography, and digital assistance.",
          "10. Feedback & Continuous Improvement: Regular user feedback collected to upgrade library services.",
          "11. Preservation & Responsible Use: Systematic shelving, maintenance, and conservation of learning assets."
        ]
      },
      {
        title: "K. Library Activities & Programmes",
        description:
          "The Library & Information Centre organizes a variety of academic, literary and awareness programmes to promote reading habits, information literacy, digital resource utilization and active student engagement.",
        items: [
          "Library Orientation Programmes for First-Year Students",
          "Library Week Celebrations & National Librarian's Day",
          "E-Resource & DELNET Awareness Demonstrations",
          "Reading Promotion Sessions & Book Exhibitions",
          "Literary Competitions: Essay Writing, Quiz & Painting",
          "Educational Visits to Book Fairs and Vijayawada Book Festival",
          "Information Literacy & Research Database Workshops"
        ]
      },
      {
        title: "L. Library Timings & Contact",
        table: {
          headers: ["Day", "Timings"],
          rows: [
            ["Monday – Friday", "8:00 AM – 4:00 PM"],
            ["Saturday", "8:00 AM – 1:00 PM"]
          ]
        },
        description:
          "Contact Address:\n" +
          "Library & Information Centre, St. Ann’s College for Women, Amaravathi Road, Gorantla, Guntur – Andhra Pradesh\n" +
          "Email: st_anns_coll@yahoo.co.in\n" +
          "For assistance regarding Library resources, services, digital resources and academic information, students and faculty may contact the Library during working hours."
      }
    ],
    images: [
      "/images/infrastructure/library/img-1.jpg",
      "/images/infrastructure/library/img-2.jpg",
      "/images/infrastructure/library/img-3.jpg",
      "/images/infrastructure/library/img-4.jpg",
      "/images/infrastructure/library/img-5.jpg",
      "/images/infrastructure/library/img-6.jpg",
      "/images/infrastructure/library/img-7.jpg",
      "/images/infrastructure/library/img-8.jpg",
      "/images/infrastructure/library/img-9.jpg",
      "/images/infrastructure/library/img-10.jpg",
      "/images/infrastructure/library/img-11.jpg"
    ]
  },

  // 4. ICT & Digital Infrastructure
  {
    id: "ict-digital",
    slug: "ict-digital",
    sectionNumber: 4,
    title: "4. ICT & Digital Infrastructure",
    subtitle: "High-Speed Campus Wi-Fi, Programme-Wise Computer Labs, LMS & Language Lab",
    iconName: "Cpu",
    description:
      "The institution provides a comprehensive ICT-enabled ecosystem to support academic excellence, skill development, and digital learning. The infrastructure is designed to meet the diverse needs of various programmes and ensure hands-on learning experiences.",
    subsections: [
      {
        title: "Campus-Wide Wi-Fi Connectivity",
        description:
          "The entire campus is equipped with high-speed Wi-Fi connectivity, enabling students and faculty to access academic resources, e-content, and online platforms seamlessly across all departments."
      },
      {
        title: "Programme-Wise Computer Laboratories",
        description:
          "The institution maintains separate, well-equipped, and specialized computer laboratories to meet the academic and practical requirements of various programmes:",
        items: [
          "B.Sc. Programmes – Facilities for scientific computing, data analysis, and practical-based learning.",
          "B.Com. Programme – Equipped with accounting software such as Tally and other business applications.",
          "BCA Programme – Advanced infrastructure for programming, database management, and application development.",
          "B.Sc. (Artificial Intelligence) – Access to AI tools, machine learning environments, and data analytics platforms.",
          "B.Sc. (Statistics) – Dedicated Statistics Laboratory for data analysis, statistical computing, and research activities.",
          "MCA Programme – High-end systems supporting software development, project work, and advanced computing.",
          "MBA Programme – ICT-enabled facilities for business analytics, presentations, simulations, and case study analysis."
        ]
      },
      {
        title: "Learning Management System (LMS) & Digital Teaching",
        items: [
          "Faculty utilize digital platforms such as Google Classroom, Microsoft Teams, and WhatsApp for academic activities.",
          "Course materials, lecture notes, PPTs, and e-resources are regularly shared through these platforms.",
          "Online quizzes and assessments are conducted using digital tools such as Google Forms.",
          "Assignments and internal assessments are assigned, submitted, and evaluated digitally.",
          "Continuous learning and doubt clarification are facilitated through interactive online channels.",
          "Digital teaching enhanced through projectors, smart boards, and structured evaluation portals."
        ]
      },
      {
        title: "Language Lab",
        description:
          "The Language Lab is a dedicated facility designed to enhance students’ communication skills, particularly in English and other languages. It provides an interactive and technology-enabled environment that supports listening, speaking, reading, and writing (LSRW) skill development.",
        items: [
          "Audio-visual based language training with modern headsets and interactive software.",
          "Computer-assisted learning modules supporting self-paced phonetics and vocabulary exercises.",
          "Focus on pronunciation, spoken clarity, and conversational fluency.",
          "Interactive practice sessions for group discussions, mock interviews, and public speaking.",
          "Support for placement preparation, campus interviews, and professional presentation skills."
        ]
      }
    ],
    images: [
      "/images/infrastructure/ict-digital/img-1.jpg",
      "/images/infrastructure/ict-digital/img-2.jpg",
      "/images/infrastructure/ict-digital/img-3.jpg",
      "/images/infrastructure/ict-digital/img-4.jpg",
      "/images/infrastructure/ict-digital/img-5.jpg",
      "/images/infrastructure/ict-digital/img-6.jpg",
      "/images/infrastructure/ict-digital/img-7.jpg",
      "/images/infrastructure/ict-digital/img-8.jpg",
      "/images/infrastructure/ict-digital/img-9.jpg",
      "/images/infrastructure/ict-digital/img-10.jpg",
      "/images/infrastructure/ict-digital/img-11.jpg",
      "/images/infrastructure/ict-digital/img-12.jpg",
      "/images/infrastructure/ict-digital/img-13.jpg",
      "/images/infrastructure/ict-digital/img-14.jpg",
      "/images/infrastructure/ict-digital/img-15.jpg",
      "/images/infrastructure/ict-digital/img-16.jpg",
      "/images/infrastructure/ict-digital/img-17.jpg",
      "/images/infrastructure/ict-digital/img-18.jpg",
      "/images/infrastructure/ict-digital/img-19.jpg",
      "/images/infrastructure/ict-digital/img-20.jpg"
    ]
  },

  // 5. Laboratories
  {
    id: "laboratories",
    slug: "laboratories",
    sectionNumber: 5,
    title: "5. Laboratories",
    subtitle: "Specialized Science, Analytical & Computational Laboratories",
    iconName: "FlaskConical",
    description:
      "The College provides well-equipped laboratories that facilitate practical learning, experimentation, research, and skill development across various disciplines. These labs enable students to gain hands-on experience, reinforce theoretical concepts, and develop scientific and problem-solving skills in alignment with academic requirements.",
    subsections: [
      {
        title: "Science Laboratories",
        description:
          "The college maintains specialized laboratories for core science subjects, equipped with essential instruments, chemical supplies, and safety facilities to facilitate practical sessions and experimental learning:",
        items: [
          "Physics Lab – Supports experiments in mechanics, optics, electronics, thermodynamics, and modern physics.",
          "Chemistry Lab – Equipped for organic, inorganic, and physical chemistry experiments, titrations, and analysis.",
          "Botany Lab – Provides facilities for plant morphology, taxonomy, physiology, microscopy, and specimen preservation.",
          "Microbiology Lab – Enables study of microorganisms through sterile culture, staining, isolation, and incubation techniques.",
          "Biotechnology Lab – Supports molecular biology, electrophoresis, tissue culture, and genetic engineering experiments."
        ]
      },
      {
        title: "Mathematics & Statistics Laboratories",
        description:
          "These laboratories are designed to strengthen analytical, statistical, and mathematical problem-solving capabilities through practical applications:",
        items: [
          "Statistics Lab – Provides computer-aided statistical software, data analytics packages, and data visualization tools for survey analysis and research.",
          "Mathematics Lab – Supports concept-based learning, mathematical modeling, geometric visualization, and computational problem-solving."
        ]
      },
      {
        title: "Safety Standards & Quality Highlights",
        items: [
          "Well-maintained laboratories with calibrated precision instruments and safety equipment.",
          "Mandatory laboratory safety guidelines, fire extinguishers, first-aid boxes, and fume cupboards.",
          "Hands-on experimental curriculum bridging the gap between theoretical knowledge and real-world application.",
          "Active promotion of scientific temper, inquiry-based learning, and undergraduate research projects."
        ]
      }
    ],
    images: [
      "/images/infrastructure/laboratories/img-1.jpg",
      "/images/infrastructure/laboratories/img-2.jpg",
      "/images/infrastructure/laboratories/img-3.jpg",
      "/images/infrastructure/laboratories/img-4.jpg",
      "/images/infrastructure/laboratories/img-5.jpg",
      "/images/infrastructure/laboratories/img-6.jpg",
      "/images/infrastructure/laboratories/img-7.jpg",
      "/images/infrastructure/laboratories/img-8.jpg",
      "/images/infrastructure/laboratories/img-9.jpg",
      "/images/infrastructure/laboratories/img-10.jpg",
      "/images/infrastructure/laboratories/img-11.jpg",
      "/images/infrastructure/laboratories/img-12.jpg",
      "/images/infrastructure/laboratories/img-13.jpg",
      "/images/infrastructure/laboratories/img-14.jpg",
      "/images/infrastructure/laboratories/img-15.jpg",
      "/images/infrastructure/laboratories/img-16.jpg",
      "/images/infrastructure/laboratories/img-17.jpg",
      "/images/infrastructure/laboratories/img-18.jpg",
      "/images/infrastructure/laboratories/img-19.jpg",
      "/images/infrastructure/laboratories/img-20.jpg",
      "/images/infrastructure/laboratories/img-21.jpg",
      "/images/infrastructure/laboratories/img-22.jpg",
      "/images/infrastructure/laboratories/img-23.jpg",
      "/images/infrastructure/laboratories/img-24.jpg",
      "/images/infrastructure/laboratories/img-25.jpg",
      "/images/infrastructure/laboratories/img-26.jpg",
      "/images/infrastructure/laboratories/img-27.jpg",
      "/images/infrastructure/laboratories/img-28.jpg",
      "/images/infrastructure/laboratories/img-29.jpg",
      "/images/infrastructure/laboratories/img-30.jpg",
      "/images/infrastructure/laboratories/img-31.jpg"
    ]
  },

  // 6. Skill Development Centre
  {
    id: "skill-development",
    slug: "skill-development",
    sectionNumber: 6,
    title: "6. Skill Development Centre",
    subtitle: "APSSDC Collaboration, Employability Skills, Technical Certification & Career Readiness",
    iconName: "Briefcase",
    description:
      "The Skill Development Centre provides opportunities for students to develop employability, communication, technical, entrepreneurial, and vocational skills through training programmes and workshops.",
    subsections: [
      {
        title: "APSSDC Skill Development Centre Collaboration",
        description:
          "The institution has established an APSSDC Skill Development Centre in collaboration with the Andhra Pradesh State Skill Development Corporation to enhance students’ employability and professional competencies. The centre plays a vital role in preparing students to meet industry expectations through structured training programmes:",
        items: [
          "Soft Skills & Communication – Development of interpersonal skills, presentation skills, body language, and workplace communication.",
          "Aptitude & Logical Reasoning – Intensive training in quantitative aptitude, numerical analysis, and analytical problem-solving.",
          "Technical Skill Training – Domain-specific technical training aligned with contemporary IT, commerce, and industrial trends.",
          "Career Guidance & Placement Preparation – Resume building workshops, mock interview sessions, group discussions, and career counselling.",
          "Certification Modules – Short-term certified skill-oriented courses conducted by certified APSSDC and corporate trainers."
        ]
      }
    ],
    images: [
      "/images/infrastructure/skill-development/img-1.jpg",
      "/images/infrastructure/skill-development/img-2.jpg",
      "/images/infrastructure/skill-development/img-3.jpg",
      "/images/infrastructure/skill-development/img-4.jpg",
      "/images/infrastructure/skill-development/img-5.jpg"
    ]
  },

  // 7. Hostel
  {
    id: "hostel",
    slug: "hostel",
    sectionNumber: 7,
    title: "7. Hostel",
    subtitle: "Secure, Safe & Comfortable Residential Living for Outstation Students",
    iconName: "Home",
    description:
      "The College provides hostel accommodation with essential facilities to ensure a safe, comfortable, and supportive residential environment for students.",
    subsections: [
      {
        title: "Residential Facilities & Amenities",
        items: [
          "Spacious, well-ventilated, and fully furnished student living rooms.",
          "24/7 round-the-clock security, CCTV surveillance, and resident warden supervision ensuring female student safety.",
          "Hygienic dining hall serving wholesome, nutritious, and balanced meals prepared under strict sanitary standards.",
          "Continuous clean drinking water supply with commercial RO filtration systems.",
          "Uninterrupted power supply with standby diesel generator backup.",
          "Quiet study halls and supportive community living conducive to academic concentration and personal growth."
        ]
      }
    ],
    images: [
      "/images/infrastructure/hostel/img-1.jpg",
      "/images/infrastructure/hostel/img-2.jpg"
    ]
  },

  // 8. Canteen
  {
    id: "canteen",
    slug: "canteen",
    sectionNumber: 8,
    title: "8. Canteen",
    subtitle: "Hygienic Food Services, Fresh Meals, Nutritious Refreshments & Socializing Space",
    iconName: "UtensilsCrossed",
    description:
      "The College canteen provides hygienic and affordable food and refreshments in a comfortable environment for students and staff.",
    subsections: [
      {
        title: "Cafeteria Services & Hygiene Standards",
        items: [
          "Serves a wide variety of freshly prepared, healthy, and nutritious vegetarian meals, breakfast items, and snacks.",
          "Strict adherence to food safety, water purity, and kitchen hygiene protocols.",
          "Subsidized and pocket-friendly pricing structure ensuring affordability for all students.",
          "Comfortable seating area offering a relaxing environment for dining, socializing, and peer interaction during breaks."
        ]
      }
    ],
    images: [
      "/images/infrastructure/canteen/img-1.jpg",
      "/images/infrastructure/canteen/img-2.jpg",
      "/images/infrastructure/canteen/img-3.jpeg",
      "/images/infrastructure/canteen/img-4.jpeg",
      "/images/infrastructure/canteen/img-5.jpeg",
      "/images/infrastructure/canteen/img-6.jpeg"
    ]
  },

  // 9. Health Centre
  {
    id: "health-centre",
    slug: "health-centre",
    sectionNumber: 9,
    title: "9. Health Centre",
    subtitle: "Immediate Medical Care, First-Aid Support & Health Awareness",
    iconName: "HeartPulse",
    description:
      "The College provides basic healthcare and first-aid support to address the immediate health needs of students and staff and promotes health and well-being.",
    subsections: [
      {
        title: "Medical Facilities & Healthcare Services",
        items: [
          "Strategically located in Gnanam Block with dedicated examination beds and first-aid facilities.",
          "Immediate first-aid care, basic medicines, and rest facilities for students and faculty during college hours.",
          "Organization of periodic health checkup camps, eye checkups, hemoglobin screening, and blood donation drives.",
          "Expert guest lectures and awareness programmes on women's health, nutrition, hygiene, and mental wellness.",
          "Tie-ups and emergency ambulance access with nearby specialty hospitals for advanced medical emergencies."
        ]
      }
    ],
    images: [
      "/images/infrastructure/health-centre/img-1.jpg",
      "/images/infrastructure/health-centre/img-2.jpg",
      "/images/infrastructure/health-centre/img-3.jpg",
      "/images/infrastructure/health-centre/img-4.jpg",
      "/images/infrastructure/health-centre/img-5.jpg",
      "/images/infrastructure/health-centre/img-6.jpg",
      "/images/infrastructure/health-centre/img-7.jpg",
      "/images/infrastructure/health-centre/img-8.jpg",
      "/images/infrastructure/health-centre/img-9.jpg",
      "/images/infrastructure/health-centre/img-10.jpg",
      "/images/infrastructure/health-centre/img-11.jpg",
      "/images/infrastructure/health-centre/img-12.jpg",
      "/images/infrastructure/health-centre/img-13.jpg",
      "/images/infrastructure/health-centre/img-14.jpg",
      "/images/infrastructure/health-centre/img-15.jpg",
      "/images/infrastructure/health-centre/img-16.jpg",
      "/images/infrastructure/health-centre/img-17.jpg",
      "/images/infrastructure/health-centre/img-18.jpg",
      "/images/infrastructure/health-centre/img-19.jpg",
      "/images/infrastructure/health-centre/img-20.jpg",
      "/images/infrastructure/health-centre/img-21.jpg",
      "/images/infrastructure/health-centre/img-22.jpg",
      "/images/infrastructure/health-centre/img-23.jpg",
      "/images/infrastructure/health-centre/img-24.jpg",
      "/images/infrastructure/health-centre/img-25.jpg",
      "/images/infrastructure/health-centre/img-26.jpg",
      "/images/infrastructure/health-centre/img-27.jpg",
      "/images/infrastructure/health-centre/img-28.jpg",
      "/images/infrastructure/health-centre/img-29.jpg",
      "/images/infrastructure/health-centre/img-30.jpg",
      "/images/infrastructure/health-centre/img-31.jpg",
      "/images/infrastructure/health-centre/img-32.jpg",
      "/images/infrastructure/health-centre/img-33.jpg",
      "/images/infrastructure/health-centre/img-34.jpeg",
      "/images/infrastructure/health-centre/img-35.jpeg",
      "/images/infrastructure/health-centre/img-36.jpeg",
      "/images/infrastructure/health-centre/img-37.jpeg",
      "/images/infrastructure/health-centre/img-38.jpeg"
    ]
  },

  // 10. Sports, Games & Gym
  {
    id: "sports-games",
    slug: "sports-games",
    sectionNumber: 10,
    title: "10. Sports, Games & Gym",
    subtitle: "Playgrounds, Indoor Sports, Gymnasium, Yoga & Traditional Martial Arts",
    iconName: "Dumbbell",
    description:
      "The College encourages physical fitness and sports participation through indoor and outdoor sports facilities, games, fitness activities, and gym facilities.",
    subsections: [
      {
        title: "Department of Physical Education & Leadership",
        description:
          "The Department of Physical Education is committed to nurturing physical fitness, discipline, and team spirit among students. The department is led by Mr. Ganji Bala Show Reddy, Physical Director, with the support of Lft. Kankanampati Susmitha, Assistant Physical Director & NCC Officer, who consistently guide and motivate students towards sporting excellence."
      },
      {
        title: "Outdoor & Indoor Sports Infrastructure",
        items: [
          "Spacious multi-sport outdoor grounds for Cricket, Volleyball, Kho-Kho, Kabaddi, and Track & Field athletics.",
          "Indoor sports arena equipped for Table Tennis, Chess, Carrom, and Badminton.",
          "Well-maintained play courts with regulatory dimensions, marking lines, and sports kits.",
          "Modern Gymnasium equipped with cardio units, resistance machines, and strength training equipment."
        ]
      },
      {
        title: "Coaching, Martial Arts & Wellness Initiatives",
        items: [
          "Structured training and coaching camps for intercollegiate, university, and state tournaments.",
          "Specialised self-defense training in traditional martial arts: Karrasamu (stick fighting) & Karate.",
          "Celebration of International Yoga Day and National Sports Day to promote lifetime fitness habits.",
          "Consistent record of university-level medals, championship trophies, and merit certificates."
        ]
      }
    ],
    images: [
      "/images/infrastructure/sports-games/img-1.jpg",
      "/images/infrastructure/sports-games/img-2.jpg",
      "/images/infrastructure/sports-games/img-3.jpg",
      "/images/infrastructure/sports-games/img-4.jpg",
      "/images/infrastructure/sports-games/img-5.jpg",
      "/images/infrastructure/sports-games/img-6.png",
      "/images/infrastructure/sports-games/img-7.jpg",
      "/images/infrastructure/sports-games/img-8.png",
      "/images/infrastructure/sports-games/img-9.jpg",
      "/images/infrastructure/sports-games/img-10.jpeg",
      "/images/infrastructure/sports-games/img-11.jpeg",
      "/images/infrastructure/sports-games/img-12.jpeg"
    ]
  },

  // 11. Cultural & Recreation Facilities
  {
    id: "cultural-recreation",
    slug: "cultural-recreation",
    sectionNumber: 11,
    title: "11. Cultural & Recreation Facilities",
    subtitle: "Auditorium, Fine Arts Spaces, Student Activity Clubs & Annual Fests",
    iconName: "Music",
    description:
      "The College provides facilities that encourage students to participate in cultural, literary, artistic, recreational, and co-curricular activities, promoting creativity and holistic development.",
    subsections: [
      {
        title: "Auditorium, Stage & Creative Spaces",
        items: [
          "Spacious main auditorium with acoustic treatment, stage lighting, and sound reinforcement systems for institutional ceremonies and cultural fests.",
          "Dedicated rehearsal and practice rooms for Music, Classical/Contemporary Dance, and Fine Arts.",
          "Active student-led bodies: Literary Club, Cultural Club, Fine Arts Club, and Youth Red Cross.",
          "Platforms for debating competitions, quizzes, theater productions, painting exhibitions, and intercollegiate youth festivals.",
          "Annual cultural celebrations recognizing outstanding artistic talents through awards and honors."
        ]
      }
    ],
    images: [
      "/images/infrastructure/cultural-recreation/img-1.jpg",
      "/images/infrastructure/cultural-recreation/img-2.jpg",
      "/images/infrastructure/cultural-recreation/img-3.jpg",
      "/images/infrastructure/cultural-recreation/img-4.jpg",
      "/images/infrastructure/cultural-recreation/img-5.jpg",
      "/images/infrastructure/cultural-recreation/img-6.jpg",
      "/images/infrastructure/cultural-recreation/img-7.jpg",
      "/images/infrastructure/cultural-recreation/img-8.jpg",
      "/images/infrastructure/cultural-recreation/img-9.jpg",
      "/images/infrastructure/cultural-recreation/img-10.jpg",
      "/images/infrastructure/cultural-recreation/img-11.jpg"
    ]
  },

  // 12. Safety, Security & Disaster Management
  {
    id: "safety-security",
    slug: "safety-security",
    sectionNumber: 12,
    title: "12. Safety, Security & Disaster Management",
    subtitle: "24/7 CCTV Surveillance, Fire Safety Systems, Emergency Preparedness & Drills",
    iconName: "ShieldAlert",
    description:
      "The College maintains a safe campus through security measures, surveillance systems, emergency preparedness, fire-safety arrangements, and disaster management practices.",
    subsections: [
      {
        title: "Comprehensive Campus Safety Measures",
        items: [
          "Round-the-clock 24/7 CCTV surveillance network monitoring campus gates, corridors, and sensitive zones.",
          "Trained security personnel stationed at all institutional entry and exit access points.",
          "Fire safety equipment, fire extinguishers, and clear emergency evacuation exit signage installed across all blocks.",
          "Periodic mock evacuation drills and disaster management preparedness exercises.",
          "First-aid training and rapid response protocols for accidental and medical contingencies."
        ]
      }
    ],
    images: [
      "/images/infrastructure/safety-security/img-1.jpg",
      "/images/infrastructure/safety-security/img-2.jpg",
      "/images/infrastructure/safety-security/img-3.jpg",
      "/images/infrastructure/safety-security/img-4.jpg",
      "/images/infrastructure/safety-security/img-5.jpg",
      "/images/infrastructure/safety-security/img-6.jpg",
      "/images/infrastructure/safety-security/img-7.jpg",
      "/images/infrastructure/safety-security/img-8.jpg"
    ]
  },

  // 13. Green Campus & Sustainability Initiatives
  {
    id: "green-campus",
    slug: "green-campus",
    sectionNumber: 13,
    title: "13. Green Campus & Sustainability Initiatives",
    subtitle: "Solar Energy, Rainwater Harvesting, Green Landscaping & Eco-Friendly Waste Management",
    iconName: "Leaf",
    description:
      "The College promotes a clean, green, and sustainable campus through plantation, herbal and botanical initiatives, waste management, water conservation, energy conservation, and environmental awareness activities.",
    subsections: [
      {
        title: "Sustainability Programs & Ecological Assets",
        items: [
          "Lush green landscaping with avenue trees, botanical garden, and medicinal herbal garden.",
          "Rooftop solar photovoltaic panel generation units promoting renewable energy usage across the campus.",
          "Installation of 7 dedicated solar-powered street lighting fixtures throughout the premises.",
          "Functional rainwater harvesting pits recharging groundwater tables and conserving rainwater.",
          "Systematic waste segregation into biodegradable and non-biodegradable bins with compost pits.",
          "Strict enforcement of a plastic-free campus and regular student-led environmental awareness rallies."
        ]
      }
    ],
    images: [
      "/images/infrastructure/green-campus/img-1.jpg",
      "/images/infrastructure/green-campus/img-2.jpg",
      "/images/infrastructure/green-campus/img-3.jpg",
      "/images/infrastructure/green-campus/img-4.jpg",
      "/images/infrastructure/green-campus/img-5.jpg",
      "/images/infrastructure/green-campus/img-6.jpg",
      "/images/infrastructure/green-campus/img-7.jpg",
      "/images/infrastructure/green-campus/img-8.jpg",
      "/images/infrastructure/green-campus/img-9.jpg",
      "/images/infrastructure/green-campus/img-10.jpg",
      "/images/infrastructure/green-campus/img-11.jpg",
      "/images/infrastructure/green-campus/img-12.jpg",
      "/images/infrastructure/green-campus/img-13.jpg",
      "/images/infrastructure/green-campus/img-14.jpg",
      "/images/infrastructure/green-campus/img-15.jpg",
      "/images/infrastructure/green-campus/img-16.jpg",
      "/images/infrastructure/green-campus/img-17.jpg",
      "/images/infrastructure/green-campus/img-18.jpg",
      "/images/infrastructure/green-campus/img-19.jpg",
      "/images/infrastructure/green-campus/img-20.jpg",
      "/images/infrastructure/green-campus/img-21.jpg",
      "/images/infrastructure/green-campus/img-22.jpg"
    ]
  },

  // 14. Barrier-Free & Inclusive Access
  {
    id: "inclusive-access",
    slug: "inclusive-access",
    sectionNumber: 14,
    title: "14. Barrier-Free & Inclusive Access",
    subtitle: "Ramps with Handrails, Accessible Washrooms & Equal Learning Opportunities",
    iconName: "Accessibility",
    description:
      "The College promotes an inclusive and accessible campus by providing appropriate facilities and access provisions to support the mobility, participation, and educational needs of persons with disabilities.",
    subsections: [
      {
        title: "Accessibility Infrastructure for Divyangjan",
        items: [
          "Graded entrance ramps with secure safety handrails at key entry points of academic and administrative blocks.",
          "Specially designed barrier-free and accessible washroom facilities for differently-abled students.",
          "Smooth, non-slippery, and barrier-free ground-floor pathways connecting vital academic zones.",
          "Institutional policy prioritizing ground-floor classroom allotment and examination accommodations for students with mobility needs.",
          "Supportive staff culture ensuring dignity, equal participation, and academic empowerment for all learners."
        ]
      }
    ],
    images: [
      "/images/infrastructure/inclusive-access/img-1.jpg",
      "/images/infrastructure/inclusive-access/img-2.jpg",
      "/images/infrastructure/inclusive-access/img-3.jpg",
      "/images/infrastructure/inclusive-access/img-4.jpg",
      "/images/infrastructure/inclusive-access/img-5.jpg",
      "/images/infrastructure/inclusive-access/img-6.jpg",
      "/images/infrastructure/inclusive-access/img-7.jpg",
      "/images/infrastructure/inclusive-access/img-8.jpg",
      "/images/infrastructure/inclusive-access/img-9.jpg",
      "/images/infrastructure/inclusive-access/img-10.jpg",
      "/images/infrastructure/inclusive-access/img-11.jpg",
      "/images/infrastructure/inclusive-access/img-12.jpg"
    ]
  }
];

// Backwards-compatible map for legacy components
export const staticInfrastructureSections: Record<string, { title: string; content: string; images: string[] }> = {};
INFRASTRUCTURE_SECTIONS.forEach((s) => {
  staticInfrastructureSections[s.slug] = {
    title: s.title,
    content: s.description,
    images: s.images
  };
});
