/**
 * Structured Static Dataset for Infrastructure
 * Strictly adhering to 5.infrastructure (1).docx
 * St. Ann's College for Women, Gorantla, Guntur
 */

export interface LibraryActivityEvent {
  id: string;
  title: string;
  academicYear: string;
  dateStr: string;
  description: string;
  category: string;
  images: string[];
}

export interface InfrastructureSubsection {
  title: string;
  subtitle?: string;
  description?: string;
  vision?: string;
  mission?: string[];
  objectives?: string[];
  role?: string;
  highlights?: string;
  items?: string[];
  blocks?: {
    heading: string;
    points?: string[];
    description?: string;
    links?: { title: string; url: string; note?: string }[];
  }[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  links?: { title: string; url: string; note?: string }[];
  policyPoints?: string[];
  activitiesList?: string[];
  activityEvents?: LibraryActivityEvent[];
  yearsList?: string[];
}

export interface InfrastructureSectionItem {
  id: string;
  slug: string;
  sectionNumber: number;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  subsections?: InfrastructureSubsection[];
  images: string[];
}

export const INFRASTRUCTURE_SUBTEXT = {
  institution: "St. Ann’s College for Women, Gorantla, Guntur",
  overview:
    "St. Ann’s College for Women provides a safe, accessible, technology-enabled and student-friendly campus environment that supports teaching, learning, research, skill development, sports and holistic student development. The infrastructure is periodically maintained and upgraded to meet academic and institutional requirements.",
  tagline: "Safe, accessible, technology-enabled and student-friendly campus environment."
};

// Activity-wise events data for Library Part K
export const LIBRARY_ACTIVITY_EVENTS: LibraryActivityEvent[] = [
  {
    id: "lib-act-1",
    title: "National Library Week & Book Fair Exhibition",
    academicYear: "2025–2026",
    dateStr: "14 – 20 November 2025",
    category: "Exhibitions & Awareness",
    description:
      "A grand 7-day National Library Week celebration featuring extensive multi-publisher book exhibitions, student book review competitions, author interactions, and awards for Best Library User students.",
    images: [
      "/images/infrastructure/library/img-1.jpg",
      "/images/infrastructure/library/img-2.jpg",
      "/images/infrastructure/library/img-3.jpg"
    ]
  },
  {
    id: "lib-act-2",
    title: "E-Resource & DELNET Hands-On Demonstration Session",
    academicYear: "2025–2026",
    dateStr: "28 August 2025",
    category: "Digital Literacy",
    description:
      "Comprehensive training workshop for UG & PG final year students on accessing DELNET union catalogues, downloading peer-reviewed research papers, and utilizing NDLI and e-PG Pathshala repositories.",
    images: [
      "/images/infrastructure/library/img-4.jpg",
      "/images/infrastructure/library/img-5.jpg"
    ]
  },
  {
    id: "lib-act-3",
    title: "National Librarian's Day Commemoration",
    academicYear: "2025–2026",
    dateStr: "12 August 2025",
    category: "Literary Celebrations",
    description:
      "Commemoration of the birth anniversary of Dr. S. R. Ranganathan, the father of Library Science in India. Included essay writing and quiz competitions on 'Role of Digital Libraries in Higher Education'.",
    images: [
      "/images/infrastructure/library/img-6.jpg",
      "/images/infrastructure/library/img-7.jpg"
    ]
  },
  {
    id: "lib-act-4",
    title: "Annual Library User Orientation for First-Year Students",
    academicYear: "2024–2025",
    dateStr: "18 July 2024",
    category: "Orientation",
    description:
      "Familiarization programme for newly admitted Degree, MCA, and MBA students explaining book circulation rules, OPAC software search, stack section layout, and digital library facilities.",
    images: [
      "/images/infrastructure/library/img-8.jpg",
      "/images/infrastructure/library/img-9.jpg"
    ]
  },
  {
    id: "lib-act-5",
    title: "Educational Study Visit to Vijayawada Book Festival",
    academicYear: "2024–2025",
    dateStr: "06 January 2025",
    category: "Educational Visits",
    description:
      "Organized field trip for faculty members and student library representatives to inspect, evaluate, and recommend newly published textbooks and reference editions for the college central library collection.",
    images: [
      "/images/infrastructure/library/img-10.jpg",
      "/images/infrastructure/library/img-11.jpg"
    ]
  },
  {
    id: "lib-act-6",
    title: "Information Literacy & Scholarly Research Database Workshop",
    academicYear: "2023–2024",
    dateStr: "22 February 2024",
    category: "Research Support",
    description:
      "Specialized interactive session on literature review techniques, academic writing, citation referencing tools (Google Scholar, Crossref, ORCID), and ethical use of open-access publications.",
    images: [
      "/images/infrastructure/library/img-1.jpg",
      "/images/infrastructure/library/img-4.jpg"
    ]
  }
];

export const INFRASTRUCTURE_SECTIONS: InfrastructureSectionItem[] = [
  // 1. Campus & Buildings
  {
    id: "campus-buildings",
    slug: "campus-buildings",
    sectionNumber: 1,
    title: "1. Campus & Buildings",
    subtitle: "St. Ann’s Block & Gnanam Block, Academic, Administrative & Support Facilities",
    iconName: "Building2",
    description:
      "The College has a well-maintained campus with St. Ann’s Block and Gnanam Block, housing academic, administrative and student-support facilities. The campus provides a conducive environment for academic and co-curricular activities.",
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
    description: "",
    subsections: [
      // A. About the Library
      {
        title: "A. About the Library",
        subtitle: "Introduction / Profile, Vision, Mission & Objectives",
        description:
          "The Library & Information Centre of St. Ann’s College for Women is an integral part of the academic environment, supporting teaching, learning, research, self-study and intellectual development. It provides students and faculty with access to print and digital resources, reference materials, e-resources and online learning platforms.",
        vision:
          "To promote a knowledge-enriched learning community committed to the development and empowerment of society with integrity.",
        mission: [
          "To support teaching, learning and research through quality information resources.",
          "To promote reflective thinking and intellectual growth.",
          "To facilitate access to contemporary knowledge in relevant fields."
        ],
        objectives: [
          "To promote reading habits among students and faculty.",
          "To encourage effective use of library resources and services.",
          "To develop and maintain relevant and updated collections in support of the Teaching-Learning Process.",
          "To encourage students to explore knowledge beyond the prescribed curriculum.",
          "To provide guidance in the effective use of print and digital resources.",
          "To develop the Library as a dynamic and growing knowledge centre."
        ],
        role:
          "The Library supports the academic needs of UG Degree, MCA and MBA programmes by providing access to books, journals, reference materials, project resources, digital resources and online learning platforms. It facilitates independent learning, project work, information literacy and research-oriented learning, thereby contributing to academic excellence, knowledge enrichment and lifelong learning."
      },

      // B. Library at a Glance
      {
        title: "B. Library at a Glance",
        subtitle: "Key Statistics & Collection Metrics",
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

      // C. Library Infrastructure & Facilities
      {
        title: "C. Library Infrastructure & Facilities",
        subtitle: "Key Facilities & Reading Environment",
        description:
          "The Library & Information Centre provides a well-organized, spacious and learner-friendly environment equipped with facilities that support academic learning, reference work, self-study and digital access.",
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

      // D. Library Resources
      {
        title: "D. Library Resources",
        subtitle: "Comprehensive Print, Periodical & Multimedia Collections",
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
        ],
        highlights:
          "23,459 Books | 5,679 Titles | 24 Journals & Magazines | 05 Newspapers | 1,448 Project Reports | 857 Book CDs | 331 Magazine CDs | 51 Back Volumes"
      },

      // E. Library Services
      {
        title: "E. Library Services",
        subtitle: "Academic Support, Circulation & Information Services",
        description:
          "The Library & Information Centre provides a range of services to facilitate effective access to information resources and support the academic needs of students and faculty.",
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

      // F. Digital Library & E-Resources
      {
        title: "F. Digital Library & E-Resources",
        subtitle: "Institutional Subscriptions, National Learning Platforms & MOOCs",
        description:
          "The Library & Information Centre of St. Ann’s College for Women facilitates access to a wide range of digital learning resources, e-books, e-journals, databases, Massive Open Online Courses (MOOCs), theses and dissertations, institutional repositories and open educational resources.\n\nThese resources complement the print collection and support the academic and research requirements of students and faculty across Undergraduate Degree Programmes, MCA and MBA. Students and faculty are encouraged to make effective use of these platforms for curriculum enrichment, project work, research, competitive examinations, skill development and lifelong learning.",
        blocks: [
          {
            heading: "1. Institutional Digital Resources",
            description:
              "The College Library facilitates access to DELNET, a major resource-sharing library network providing access to union catalogues and a wide range of bibliographic and digital resources. (Access: Institutional subscription / authorised access).",
            links: [
              {
                title: "Visit DELNET",
                url: "https://delnet.in",
                note: "Useful for UG Students, MCA, MBA, Faculty, Project Work & Research"
              }
            ]
          },
          {
            heading: "2. National Digital Learning Platforms",
            links: [
              {
                title: "National Digital Library of India (NDLI)",
                url: "https://ndl.iitkgp.ac.in",
                note: "Single-window platform for books, articles, and multidisciplinary resources"
              },
              {
                title: "SWAYAM Portal",
                url: "https://swayam.gov.in",
                note: "Government of India's national online learning platform"
              },
              {
                title: "NPTEL Online Courses",
                url: "https://nptel.ac.in",
                note: "Quality technical courses developed by IITs & IISc"
              },
              {
                title: "Consortium for Educational Communication (CEC)",
                url: "https://cec.nic.in",
                note: "Undergraduate e-content, educational videos & digital resources"
              },
              {
                title: "e-PG Pathshala",
                url: "https://epgp.inflibnet.ac.in",
                note: "UGC postgraduate curriculum e-content for MCA & MBA"
              },
              {
                title: "eGyanKosh (IGNOU)",
                url: "https://egyankosh.ac.in",
                note: "National digital repository for Commerce, Management & Computing"
              }
            ]
          },
          {
            heading: "3. MOOCs & Online Certification Courses",
            description:
              "The Library encourages students and faculty to make use of Massive Open Online Courses (MOOCs) to supplement classroom learning, develop multidisciplinary knowledge and acquire additional skills and certifications. Students may select appropriate courses in consultation with their departments wherever academic credit, certification or curriculum integration is applicable."
          }
        ],
        table: {
          headers: ["Platform", "Major Use", "Access Link"],
          rows: [
            ["SWAYAM", "UG, PG, Management, Commerce, Sciences, Computer Applications", "https://swayam.gov.in"],
            ["NPTEL", "Computer Science, Technology, Mathematics, Sciences & Management", "https://nptel.ac.in"],
            ["SWAYAM Plus", "Employability & industry-oriented learning", "https://swayam-plus.co.in"],
            ["CEC", "Undergraduate e-content and MOOCs", "https://cec.nic.in"]
          ]
        }
      },

      // G. Programme-Specific Digital Resources
      {
        title: "G. Programme-Specific Digital Resources",
        subtitle: "Subject Gateways, Open Access Research, E-Theses & Regulatory Portals",
        blocks: [
          {
            heading: "A. Resources for Undergraduate Degree Students",
            description:
              "• Commerce & Management: SWAYAM, eGyanKosh, DOAJ, SSRN.\n• Computer Science & Applications: NPTEL, SWAYAM, Virtual Labs, arXiv.\n• Mathematics & Physical Sciences: NPTEL, Virtual Labs, Indian Academy of Sciences (IAS), arXiv.\n• Life Sciences (Biotechnology, Microbiology, Botany, Chemistry): DBT, CSIR, PubMed, DOAJ, Virtual Labs."
          },
          {
            heading: "B. Digital Resources for MCA",
            description:
              "Platforms: NPTEL (Computer Science & Engineering), SWAYAM, Virtual Labs, arXiv (Computer Science), DOAJ, DELNET.\nSuggested Focus Areas: Artificial Intelligence, Machine Learning, Data Science, Programming, Cloud Computing, Cyber Security, Database Systems, Software Engineering, Data Structures, Computer Networks, Emerging Technologies."
          },
          {
            heading: "C. Digital Resources for MBA",
            description:
              "Platforms: SWAYAM (Management & Commerce), NPTEL (Management), SSRN, DOAJ, eGyanKosh, DELNET.\nSuggested Focus Areas: Finance, Marketing, Human Resource Management, Business Analytics, Entrepreneurship, Operations Management, Strategic Management, Business Research, Economics, Organisational Behaviour."
          },
          {
            heading: "5. E-Journals & Open Access Research Resources",
            description:
              "The Library facilitates awareness and access to reputable open-access journals and academic platforms for teaching, learning, project work and research.",
            links: [
              { title: "DOAJ – Directory of Open Access Journals", url: "https://doaj.org", note: "Peer-reviewed open-access journals across disciplines" },
              { title: "Indian Academy of Sciences", url: "https://www.ias.ac.in", note: "Academic and scientific research publications" },
              { title: "SpringerOpen", url: "https://springeropen.com", note: "Open-access journals and books across sciences" },
              { title: "Cambridge Core", url: "https://cambridge.org/core", note: "Academic books and scholarly journals" },
              { title: "SSRN – Social Science Research Network", url: "https://ssrn.com", note: "Research and working papers for management & commerce" }
            ]
          },
          {
            heading: "6. E-Books & Open Access Books",
            links: [
              { title: "DOAB – Directory of Open Access Books", url: "https://doabooks.org", note: "Scholarly, peer-reviewed open-access books" },
              { title: "Internet Archive", url: "https://archive.org", note: "Large digital collection of books and learning resources" },
              { title: "Project Gutenberg", url: "https://gutenberg.org", note: "Freely accessible public-domain e-books" }
            ]
          },
          {
            heading: "7. Electronic Theses & Dissertations",
            description:
              "Repositories particularly useful for Literature Review, Research Methodology, Dissertation and Project Work, Identification of Research Areas, Academic Writing, and Citation:",
            links: [
              { title: "Shodhganga (INFLIBNET)", url: "https://shodhganga.inflibnet.ac.in", note: "Digital repository of Indian Electronic Theses and Dissertations" },
              { title: "Shodhgangotri", url: "https://shodhgangotri.inflibnet.ac.in", note: "Repository of approved research synopses" },
              { title: "NDLTD", url: "http://ndltd.org", note: "Networked Digital Library of Theses and Dissertations (International)" }
            ]
          },
          {
            heading: "8. Research & Funding Resources",
            description:
              "Students and faculty may refer to official organizations for information regarding research opportunities, projects, fellowships, grants, academic schemes and capacity-building programmes."
          }
        ],
        table: {
          headers: ["Organisation", "Official Portal Link"],
          rows: [
            ["University Grants Commission – UGC", "https://www.ugc.gov.in"],
            ["All India Council for Technical Education – AICTE", "https://www.aicte-india.org"],
            ["Ministry of Education, Government of India", "https://www.education.gov.in"],
            ["Department of Science & Technology – DST", "https://dst.gov.in"],
            ["Department of Biotechnology – DBT", "https://dbtindia.nic.in"],
            ["Council of Scientific & Industrial Research – CSIR", "https://www.csir.res.in"],
            ["Indian Council of Social Science Research – ICSSR", "https://icssr.org"]
          ]
        },
        policyPoints: [
          "Students and faculty are encouraged to use digital resources strictly for academic, teaching, learning and research purposes.",
          "Open-access resources may generally be accessed directly from their respective platforms.",
          "Subscription-based resources shall be accessed subject to the institution's current subscription and authentication arrangements.",
          "Users shall comply with the copyright, licensing and usage conditions prescribed by individual publishers and digital platforms.",
          "Login credentials, wherever provided for institutional resources, shall not be shared with unauthorised persons.",
          "Students may approach the Library staff for assistance in accessing e-resources, databases and digital learning platforms.",
          "Users are encouraged to verify the authenticity and academic credibility of online information before using it in assignments, projects or research work.",
          "Appropriate acknowledgement and citation of sources shall be followed to promote academic integrity and ethical use of information."
        ]
      },

      // H. Library Team
      {
        title: "H. Library Team",
        subtitle: "Librarians & Professional Information Staff",
        table: {
          headers: ["S. No.", "Name", "Qualification", "Designation", "Experience"],
          rows: [
            ["1", "Mrs. G. Sailaja", "M.A., M.L.I.Sc., B.Ed.", "Librarian", "24 Years"],
            ["2", "Mrs. D. Anitha", "M.A., M.L.I.Sc.", "Librarian", "14 Years"]
          ]
        }
      },

      // I. Library Rules & Regulations
      {
        title: "I. Library Rules & Regulations",
        subtitle: "General Conduct, Issue/Return Guidelines & User Discipline",
        description:
          "The Library & Information Centre expects all users to maintain a quiet, clean, disciplined and learner-friendly environment and to use Library resources responsibly.",
        blocks: [
          {
            heading: "Book Issue & Renewal",
            points: [
              "Books are issued and renewed according to the prescribed Library rules.",
              "Books should be returned within the specified loan period.",
              "Renewal is subject to availability and demand."
            ]
          },
          {
            heading: "Overdue, Lost & Damaged Books",
            points: [
              "Books must be returned on or before the due date.",
              "Overdue books may attract a fine as per Library rules.",
              "Damaged books must be compensated for as prescribed.",
              "Lost books should be replaced with the same or latest edition, or the prescribed amount/fine shall be paid."
            ]
          },
          {
            heading: "Library Discipline",
            points: [
              "Maintain strict silence inside the Library.",
              "Eating and drinking are not permitted.",
              "Mobile phones must be switched off or kept on silent mode.",
              "Library books, furniture and equipment must be handled with care.",
              "Cleanliness must be maintained at all times."
            ]
          },
          {
            heading: "User Responsibilities",
            points: [
              "Follow Library procedures and instructions.",
              "Return resources within the prescribed period.",
              "Maintain discipline and respect other users.",
              "Use Library resources and facilities responsibly for academic purposes.",
              "Comply with the instructions of Library staff and applicable Library rules."
            ]
          }
        ]
      },

      // J. Library Best Practices
      {
        title: "J. Library Best Practices",
        subtitle: "User-Oriented & Learner-Centred Academic Practices",
        description:
          "The Library & Information Centre follows user-oriented and learner-centred practices to enhance the effective use of library resources, promote reading habits, strengthen digital information literacy and support teaching, learning and research.",
        items: [
          "1. Need-Based Collection Development: Books and other learning resources are selected and updated based on academic requirements, curriculum needs and recommendations from students and faculty.",
          "2. New Arrivals Display: Newly acquired books and other resources are displayed to create awareness among users and encourage wider utilization of the collection.",
          "3. Digital & E-Resource Awareness: Students and faculty are encouraged to use DELNET, digital resources, e-resources and online learning platforms to supplement classroom learning and research.",
          "4. Library User Orientation: Orientation programmes are conducted for newly admitted students to familiarize them with library facilities, resources, services, OPAC and digital resources.",
          "5. Promotion of Reading Culture: The Library promotes reading through book displays, reading activities, Library Week, literary activities and awareness programmes.",
          "6. Information Literacy: Users are guided in identifying, accessing, evaluating and effectively using print and digital information resources for academic purposes.",
          "7. Academic & Project Support: The Library supports students in assignments and project work through access to reference materials, previous question papers, project reports, journals and digital resources.",
          "8. Library Awareness & Student Engagement: The Library organizes activities such as Library Week, Librarian’s Day, e-resource awareness programmes, quizzes, essay writing, painting and other student-oriented activities to encourage active participation.",
          "9. User-Centred Services: Library services are organized to facilitate convenient access to resources through circulation, reference services, OPAC, digital library facilities and reprographic services.",
          "10. Feedback & Continuous Improvement: User needs and feedback are considered for the continuous improvement of library resources, facilities and services, wherever applicable.",
          "11. Preservation & Responsible Use of Resources: Library materials are systematically organized and preserved, while users are encouraged to handle books, journals, digital equipment and other library facilities responsibly."
        ]
      },

      // K. Library Activities & Programmes (with Event Gallery)
      {
        title: "K. Library Activities & Programmes",
        subtitle: "Academic, Literary & Awareness Programmes and Event Photo Gallery",
        description:
          "The Library & Information Centre organizes a variety of academic, literary and awareness programmes to promote reading habits, information literacy, digital resource utilization and active student engagement.",
        activitiesList: [
          "Library Orientation Programmes",
          "Library Week Celebrations",
          "Librarian’s Day",
          "E-Resource Awareness Programmes",
          "Reading Promotion Activities",
          "Quiz, Essay & Painting Competitions",
          "Book Exhibitions",
          "Educational Visits",
          "Information Literacy Programmes"
        ],
        yearsList: ["2025–2026", "2024–2025", "2023–2024"],
        activityEvents: LIBRARY_ACTIVITY_EVENTS
      },

      // L. Library Timings & Contact
      {
        title: "L. Library Timings & Contact",
        subtitle: "Working Hours & Assistance Contact Details",
        table: {
          headers: ["Day", "Timings"],
          rows: [
            ["Monday – Friday", "8:00 AM – 4:00 PM"],
            ["Saturday", "8:00 AM – 1:00 PM"]
          ]
        },
        description:
          "Contact Address:\nLibrary & Information Centre, St. Ann’s College for Women, Amaravathi Road, Gorantla, Guntur – Andhra Pradesh\nEmail: st_anns_coll@yahoo.co.in\n\nFor assistance regarding Library resources, services, digital resources and academic information, students and faculty may contact the Library during working hours."
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

  // 4. Computer Labs
  {
    id: "ict-digital",
    slug: "ict-digital",
    sectionNumber: 4,
    title: "4. Computer Labs",
    subtitle: "Computing Facilities, Programming & Software-Based Training",
    iconName: "Cpu",
    description:
      "The College provides well-equipped computer laboratories with modern computing facilities and internet connectivity to support practical learning, programming, software-based training, digital literacy, and academic activities. The computer labs cater to the requirements of students across various programmes and promote technology-enabled learning.",
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
    subtitle: "Specialized Science, Mathematics & Statistics Practical Facilities",
    iconName: "FlaskConical",
    description:
      "The College provides well-equipped laboratories that facilitate practical learning, experimentation, research, and skill development across various disciplines. The laboratories provide students with opportunities for hands-on learning and practical application of subject knowledge.",
    subsections: [
      {
        title: "Discipline-Wise Specialized Laboratories",
        items: [
          "Science Laboratories: Physics, Chemistry, Botany, Microbiology and Biotechnology",
          "Mathematics & Statistics Laboratories: Mathematics and Statistics"
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
    subtitle: "Employability, Communication, Technical & Vocational Training",
    iconName: "Briefcase",
    description:
      "The Skill Development Centre provides opportunities for students to develop employability, communication, technical, entrepreneurial, and vocational skills through training programmes and workshops.",
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
    subtitle: "Safe, Comfortable & Supportive Residential Accommodation",
    iconName: "Home",
    description:
      "The College provides hostel accommodation with essential facilities to ensure a safe, comfortable, and supportive residential environment for students.",
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
    subtitle: "Hygienic and Affordable Food & Refreshments",
    iconName: "UtensilsCrossed",
    description:
      "The College canteen provides hygienic and affordable food and refreshments in a comfortable environment for students and staff.",
    images: [
      "/images/infrastructure/canteen/img-1.jpg",
      "/images/infrastructure/canteen/img-2.jpg",
      "/images/infrastructure/canteen/img-3.jpeg",
      "/images/infrastructure/canteen/img-4.jpeg",
      "/images/infrastructure/canteen/img-5.jpeg",
      "/images/infrastructure/canteen/img-6.jpeg"
    ]
  },

  // 9. Health Centre (Retaining bullet points as instructed)
  {
    id: "health-centre",
    slug: "health-centre",
    sectionNumber: 9,
    title: "9. Health Centre",
    subtitle: "Basic Healthcare, First-Aid Support & Health Awareness",
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
    subtitle: "Indoor & Outdoor Sports, Fitness Activities & Gymnasium",
    iconName: "Dumbbell",
    description:
      "The College encourages physical fitness and sports participation through indoor and outdoor sports facilities, games, fitness activities, and gym facilities.",
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
    subtitle: "Artistic, Literary & Co-Curricular Student Spaces",
    iconName: "Music",
    description:
      "The College provides facilities that encourage students to participate in cultural, literary, artistic, recreational, and co-curricular activities, promoting creativity and holistic development.",
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
    subtitle: "Surveillance, Emergency Preparedness & Fire Safety",
    iconName: "ShieldAlert",
    description:
      "The College maintains a safe campus through security measures, surveillance systems, emergency preparedness, fire-safety arrangements, and disaster management practices.",
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
    subtitle: "Plantation, Waste & Water Conservation, Solar & Environmental Awareness",
    iconName: "Leaf",
    description:
      "The College promotes a clean, green, and sustainable campus through plantation, herbal and botanical initiatives, waste management, water conservation, energy conservation, and environmental awareness activities.",
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
    subtitle: "Accessible Campus Provisions for Differently-Abled Persons",
    iconName: "Accessibility",
    description:
      "The College promotes an inclusive and accessible campus by providing appropriate facilities and access provisions to support the mobility, participation, and educational needs of persons with disabilities.",
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
