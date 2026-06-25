import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  projectId: "fhjwqub5",
  dataset: "production",
  title: "St Ann's College Management Studio",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: "facultyMember",
        title: "Faculty Member",
        type: "document",
        fields: [
          { name: "sNo", title: "S.No / Order", type: "number" },
          { name: "name", title: "Name", type: "string" },
          {
            name: "staffType",
            title: "Staff Type",
            type: "string",
            options: {
              list: [
                { title: "Teaching Staff", value: "teaching" },
                { title: "Non-Teaching Staff", value: "non-teaching" },
                { title: "Contingent Staff", value: "contingent" },
              ],
              layout: "radio",
            },
          },
          { name: "designation", title: "Designation", type: "string" },
          { name: "department", title: "Department", type: "string" },
          { name: "qualification", title: "Qualification", type: "string" },
          { name: "dateOfJoining", title: "Date of Joining", type: "string" },
          { name: "experience", title: "Experience (Years)", type: "string" },
          { name: "profilePdf", title: "Profile PDF (CV)", type: "file" },
          { name: "image", title: "Photo", type: "image", options: { hotspot: true } },
        ],
      },
      {
        name: "facultySection",
        title: "Faculty Page Section",
        type: "document",
        fields: [
          {
            name: "category",
            title: "Category",
            type: "string",
            options: {
              list: [
                { title: "Visiting / Adjunct / Emeritus Professors", value: "visiting" },
                { title: "Recruitment Policy & Process", value: "recruitment" },
                { title: "Professional Development", value: "professional-dev" },
                { title: "Faculty Achievements", value: "achievements" },
                { title: "Faculty Exchange & Sabbaticals", value: "exchange" },
                { title: "Consultancy Assignments", value: "consultancy" },
                { title: "360° Performance Appraisal", value: "appraisal" },
              ],
            },
          },
          { name: "title", title: "Title", type: "string" },
          {
            name: "content",
            title: "Text Content",
            type: "array",
            of: [
              {
                type: "block",
                styles: [
                  { title: "Normal", value: "normal" },
                  { title: "H1", value: "h1" },
                  { title: "H2", value: "h2" },
                  { title: "H3", value: "h3" },
                  { title: "Quote", value: "blockquote" },
                ],
                lists: [
                  { title: "Bullet", value: "bullet" },
                  { title: "Numbered", value: "number" },
                ],
              },
            ],
          },
          {
            name: "images",
            title: "Gallery / Snapshots",
            type: "array",
            of: [{ type: "image", options: { hotspot: true } }],
          },
          {
            name: "files",
            title: "Related Documents / PDFs",
            type: "array",
            of: [
              {
                type: "file",
                fields: [{ name: "description", title: "Description", type: "string" }],
              },
            ],
          },
        ],
      },
      {
        name: "facultyPdfDocument",
        title: "Faculty PDF Document (FDP & Seminars)",
        type: "document",
        fields: [
          { name: "title", title: "Document Title", type: "string" },
          {
            name: "category",
            title: "Category",
            type: "string",
            options: {
              list: [
                { title: "Faculty Professional Development (FDP)", value: "professional-development" },
                { title: "Seminars & Conferences", value: "seminars-conferences" },
              ],
            },
          },
          { name: "pdfFile", title: "PDF File", type: "file" },
          { name: "displayOrder", title: "Display Order", type: "number" },
        ],
      },
      {
        name: "event",
        title: "Events",
        type: "document",
        fields: [
          { name: "title", title: "Event Title", type: "string" },
          { name: "date", title: "Event Date", type: "string" },
          { name: "location", title: "Location", type: "string" },
          { name: "description", title: "Description", type: "text" },
        ],
      },
      {
        name: "notice",
        title: "Notices",
        type: "document",
        fields: [
          { name: "title", title: "Notice Title", type: "string" },
          { name: "date", title: "Date", type: "string" },
          { name: "category", title: "Category", type: "string" },
          { name: "description", title: "Description", type: "text" },
        ],
      },
      {
        name: "affiliation",
        title: "Affiliations",
        type: "document",
        fields: [
          { name: "name", title: "Organization Name", type: "string" },
          { name: "details", title: "Description/Details", type: "text" },
        ],
      },
      {
        name: "studentLaurel",
        title: "Student Laurels",
        type: "document",
        fields: [
          { name: "year", title: "Academic Year", type: "string" },
          { name: "group", title: "Group/Stream", type: "string" },
          { name: "hallTicketNumber", title: "Hall Ticket Number", type: "string" },
          { name: "studentName", title: "Student Name", type: "string" },
          { name: "achievement", title: "Achievement", type: "string" },
        ],
      },
      {
        name: "laurelImage",
        title: "Laurel Images",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "image", title: "Image", type: "image", options: { hotspot: true } },
        ],
      },
      {
        name: "apscheOrder",
        title: "APSCHE Orders",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "academicYear", title: "Academic Year", type: "string" },
          { name: "file", title: "PDF File", type: "file" },
        ],
      },
      {
        name: "anuAffiliation",
        title: "ANU Affiliations",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "academicYear", title: "Academic Year", type: "string" },
          { name: "file", title: "PDF File", type: "file" },
        ],
      },
      {
        name: "aicteApproval",
        title: "AICTE Approvals",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "academicYear", title: "Academic Year", type: "string" },
          { name: "file", title: "PDF File", type: "file" },
        ],
      },
      {
        name: "nirfReport",
        title: "NIRF Reports",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "academicYear", title: "Academic Year", type: "string" },
          { name: "category", title: "NIRF Category", type: "string" },
          { name: "file", title: "PDF File", type: "file" },
        ],
      },
      {
        name: "naacCertificate",
        title: "NAAC Certificates",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "image", title: "Certificate Image", type: "image", options: { hotspot: true } },
        ],
      },
      {
        name: "naacPeerTeam",
        title: "NAAC Peer Team Visit",
        type: "document",
        fields: [
          { name: "title", title: "Page Title", type: "string" },
          { name: "description", title: "Description", type: "text" },
          { name: "certificatePdf", title: "NAAC Certificate (PDF)", type: "file" },
          { name: "certificateImage", title: "NAAC Certificate Image (for rendering)", type: "image", options: { hotspot: true } },
          {
            name: "gallery",
            title: "Gallery Images",
            type: "array",
            of: [
              {
                type: "image",
                options: { hotspot: true },
                fields: [
                  { name: "caption", title: "Caption", type: "string" }
                ]
              }
            ]
          },
          {
            name: "videos",
            title: "Peer Team Videos",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", title: "Video Title", type: "string" },
                  { name: "videoFile", title: "Video File", type: "file" },
                  { name: "videoUrl", title: "Alternative Video URL", type: "string" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "studentSupportImages",
        title: "Student Support Images",
        type: "document",
        fields: [
          { name: "category", title: "Category Slug", type: "string" },
          {
            name: "images",
            title: "Gallery Images",
            type: "array",
            of: [
              {
                type: "image",
                options: { hotspot: true },
                fields: [
                  { name: "caption", title: "Caption", type: "string" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "placementsImages",
        title: "Placements Images",
        type: "document",
        fields: [
          { name: "category", title: "Category Slug", type: "string" },
          {
            name: "images",
            title: "Gallery Images",
            type: "array",
            of: [
              {
                type: "image",
                options: { hotspot: true },
                fields: [
                  { name: "caption", title: "Caption", type: "string" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "studentSupport",
        title: "Student Support Documents",
        type: "document",
        fields: [
          { name: "title", title: "Document Title", type: "string" },
          { name: "academicYear", title: "Academic Year", type: "string" },
          {
            name: "section",
            title: "Section",
            type: "string",
            options: {
              list: [
                { title: "Mentor–Mentee System", value: "mentor-mentee" },
                { title: "Student Counselling", value: "student-counselling" },
                { title: "Grievance Redressal Cell", value: "grievance-redressal" },
                { title: "Internal Complaints (ICC)", value: "internal-complaints" },
                { title: "Anti-Ragging Committee", value: "anti-ragging" },
                { title: "Parent Association", value: "parent-association" },
                { title: "Women Empowerment Cell", value: "women-empowerment" },
                { title: "Sports & Games", value: "sports-games" },
                { title: "Academic Achievements", value: "academic-achievements" },
              ]
            }
          },
          { name: "pdfFile", title: "PDF File", type: "file" }
        ],
        orderings: [
          {
            title: 'Academic Year, Newest First',
            name: 'academicYearDesc',
            by: [
              {field: 'academicYear', direction: 'desc'}
            ]
          }
        ]
      },
      {
        name: "universityRankHolder",
        title: "University Rank Holders",
        type: "document",
        fields: [
          { name: "academicYear", title: "Academic Year", type: "string" },
          { name: "programme", title: "Programme", type: "string" },
          { name: "studentName", title: "Name of the Student", type: "string" },
          { name: "achievement", title: "Achievement", type: "string" },
          { name: "displayOrder", title: "Display Order", type: "number" }
        ]
      },
      {
        name: "alumniGallery",
        title: "Alumni Gallery",
        type: "document",
        fields: [
          { name: "folderName", title: "Folder Name", type: "string" },
          { name: "slug", title: "Slug", type: "slug", options: { source: "folderName", maxLength: 96 } },
          { name: "order", title: "Display Order", type: "number" },
          {
            name: "images",
            title: "Gallery Images",
            type: "array",
            of: [
              {
                type: "image",
                options: { hotspot: true },
                fields: [
                  { name: "caption", title: "Caption", type: "string" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "researchPublications",
        title: "Research Publications Page",
        type: "document",
        fields: [
          { name: "title", title: "Section Title", type: "string" },
          { name: "description", title: "Description", type: "text" },
          {
            name: "documents",
            title: "Publication Documents",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", title: "Document Title", type: "string" },
                  {
                    name: "category",
                    title: "Category",
                    type: "string",
                    options: {
                      list: [
                        { title: "Faculty Publications", value: "faculty" },
                        { title: "Student Publications", value: "student" },
                        { title: "Paper Presentations", value: "presentations" },
                      ],
                    },
                  },
                  { name: "file", title: "PDF File", type: "file" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "researchSection",
        title: "Research & Innovation Sections",
        type: "document",
        fields: [
          { name: "title", title: "Section Title", type: "string" },
          {
            name: "sectionSlug",
            title: "Section Slug",
            type: "string",
            options: {
              list: [
                { title: "Research Development Cell", value: "research-development-cell" },
                { title: "Research Infrastructure", value: "research-infrastructure" },
                { title: "Supervisors & Scholars", value: "research-supervisors-scholars" },
                { title: "Centres of Excellence", value: "centres-of-excellence" },
                { title: "Patents & Innovations", value: "patents-innovations" },
                { title: "Funded Projects", value: "funded-projects" },
                { title: "Intellectual Property Cell", value: "ipr-cell" },
                { title: "Institution Innovation Cell", value: "institution-innovation-cell" },
                { title: "Entrepreneurship Development", value: "entrepreneurship-development" },
              ],
            },
          },
          { name: "description", title: "Intro Description", type: "text" },
          {
            name: "content",
            title: "Page Content (Markdown / Text)",
            type: "text",
            description: "Use standard markdown headings, lists, tables, etc.",
          },
          {
            name: "documents",
            title: "Related Documents / PDFs",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", title: "Document Title", type: "string" },
                  { name: "file", title: "PDF File", type: "file" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "aisheCertification",
        title: "AISHE Certifications",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "academicYear", title: "Academic Year", type: "string" },
          { name: "file", title: "PDF File", type: "file" },
        ],
      },
      {
        name: "department",
        title: "Departments",
        type: "document",
        fields: [
          { name: "name", title: "Department Name", type: "string" },
          { name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } },
          { name: "established", title: "Established Year", type: "string" },
          { name: "tagline", title: "Tagline/Quote", type: "string" },
          { name: "description", title: "Description/About", type: "text" },
          { name: "vision", title: "Vision Statement", type: "text" },
          { name: "mission", title: "Mission Points", type: "array", of: [{ type: "string" }] },
          {
            name: "programmes",
            title: "Programmes Offered",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", title: "Programme Title", type: "string" },
                  { name: "intake", title: "Intake Capacity", type: "string" },
                  { name: "duration", title: "Duration Details", type: "string" },
                ]
              }
            ]
          },
          {
            name: "facultyMembers",
            title: "Faculty Details",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "name", title: "Name of the Faculty", type: "string" },
                  { name: "designation", title: "Designation", type: "string" },
                  { name: "qualification", title: "Qualifications", type: "string" },
                  { name: "experience", title: "Experience", type: "string" },
                  { name: "email", title: "Email ID", type: "string" },
                ]
              }
            ]
          },
          {
            name: "passPercentage",
            title: "Students' Pass Percentage - Outgoing Batch",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "year", title: "Academic Year", type: "string" },
                  { name: "programme", title: "Programme", type: "string" },
                  { name: "finalYearStudents", title: "No. of Final Year Students", type: "string" },
                  { name: "studentsPassed", title: "No. of Final Year Students Passed", type: "string" },
                  { name: "percentage", title: "Pass Percentage", type: "string" },
                ]
              }
            ]
          },
          {
            name: "valueAddedCourses",
            title: "Value-Added / Certificate Courses",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "sNo", title: "S.No", type: "number" },
                  { name: "title", title: "Course Title", type: "string" },
                  { name: "duration", title: "Duration (Hours)", type: "string" },
                  { name: "fromTo", title: "From - To", type: "string" },
                  { name: "academicYear", title: "Academic Year", type: "string" },
                  { name: "studentsEnrolled", title: "No. of Students Enrolled", type: "string" },
                  { name: "certificateIssued", title: "Certificate Issued", type: "string" },
                  { name: "agency", title: "Collaborating Agency", type: "string" },
                ]
              }
            ]
          },
          {
            name: "mous",
            title: "Departmental MoUs / Linkages",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "sNo", title: "S.No", type: "number" },
                  { name: "title", title: "Name of the Organization", type: "string" },
                  { name: "type", title: "Type of MoU/Linkage", type: "string" },
                  { name: "dateOfSigning", title: "Date of Signing", type: "string" },
                  { name: "duration", title: "Duration", type: "string" },
                  { name: "purpose", title: "Purpose & Collaboration", type: "string" },
                  { name: "documentUrl", title: "Document URL", type: "string" },
                  { name: "status", title: "Status", type: "string" },
                ]
              }
            ]
          },
          {
            name: "mouActivities",
            title: "MoU Activity Details",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "sNo", title: "S.No", type: "number" },
                  { name: "organization", title: "Name of the Organization", type: "string" },
                  { name: "activity", title: "Activity Conducted", type: "string" },
                  { name: "date", title: "Date", type: "string" },
                  { name: "participants", title: "No. of Participants", type: "string" },
                  { name: "documentUrl", title: "Document URL", type: "string" },
                ]
              }
            ]
          },
          {
            name: "studentAchievements",
            title: "Students' Achievements / University Ranks/Prathibha Awards Etc.",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "sNo", title: "S.No", type: "number" },
                  { name: "date", title: "Date", type: "string" },
                  { name: "name", title: "Student Name", type: "string" },
                  { name: "activity", title: "Activity / Competition", type: "string" },
                  { name: "level", title: "Level (College/State/National)", type: "string" },
                  { name: "achievement", title: "Achievement", type: "string" },
                ]
              }
            ]
          },
          {
            name: "academicAchievements",
            title: "Academic Achievements (Ranks & Awards)",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "sNo", title: "S.No", type: "number" },
                  { name: "year", title: "Academic Year", type: "string" },
                  { name: "name", title: "Student Name", type: "string" },
                  { name: "programme", title: "Programme", type: "string" },
                  { name: "award", title: "University Rank / Prathibha Awards", type: "string" },
                  { name: "marks", title: "Marks / Percentage / CGPA", type: "string" },
                ]
              }
            ]
          },
          {
            name: "placements",
            title: "Year-wise Placement Summary",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "year", title: "Academic Year", type: "string" },
                  { name: "finalYearStudents", title: "No. of Final Year Students", type: "string" },
                  { name: "studentsPlaced", title: "No. of Students Placed", type: "string" },
                  { name: "highestSalary", title: "Highest Salary (LPA)", type: "string" },
                  { name: "averageSalary", title: "Average Salary (LPA)", type: "string" },
                  { name: "percentage", title: "Placement Percentage", type: "string" },
                ]
              }
            ]
          },
          {
            name: "bestPractices",
            title: "Best Practices",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", title: "Practice Title", type: "string" },
                  { name: "category", title: "Category Tag", type: "string" },
                  { name: "objectives", title: "Objectives", type: "array", of: [{ type: "string" }] },
                  { name: "context", title: "Context Description", type: "text" },
                  { name: "practice", title: "The Practice Details", type: "array", of: [{ type: "string" }] },
                  { name: "success", title: "Evidence of Success", type: "array", of: [{ type: "string" }] },
                  { name: "problems", title: "Problems Encountered & Resources Required", type: "array", of: [{ type: "string" }] },
                ]
              }
            ]
          },
          {
            name: "activitiesList",
            title: "Departmental Activities",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "sNo", title: "S.No", type: "number" },
                  { name: "date", title: "Date", type: "string" },
                  { name: "title", title: "Title of the Activity", type: "string" },
                  { name: "type", title: "Type of Activity", type: "string" },
                  { name: "resourcePerson", title: "Resource Persons / Organization", type: "string" },
                  { name: "participants", title: "No. of Participants", type: "string" },
                  { name: "documentUrl", title: "Document URL", type: "string" },
                ]
              }
            ]
          },
          {
            name: "activitiesSummary",
            title: "Category-wise Annual Summary of Activities",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "sNo", title: "S.No", type: "number" },
                  { name: "year", title: "Academic Year", type: "string" },
                  { name: "category", title: "Category of Activity", type: "string" },
                  { name: "count", title: "No. of Activities Conducted", type: "string" },
                  { name: "studentsBenefited", title: "No. of Students Benefited", type: "string" },
                  { name: "keyActivities", title: "Key Activities Conducted", type: "string" },
                  { name: "documentUrl", title: "Document URL", type: "string" },
                ]
              }
            ]
          },
          {
            name: "internships",
            title: "Student Internships",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "sNo", title: "S.No", type: "number" },
                  { name: "year", title: "Academic Year", type: "string" },
                  { name: "name", title: "Name of the Student", type: "string" },
                  { name: "duration", title: "Duration From-To", type: "string" },
                  { name: "organization", title: "Name of the Organization", type: "string" },
                  { name: "areaOfWork", title: "Area of Work", type: "string" },
                  { name: "programme", title: "Programme", type: "string" },
                ]
              }
            ]
          },
          {
            name: "activities",
            title: "Category-wise Activities (Pillars)",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "label", title: "Activity Pillar/Label", type: "string" },
                  { name: "desc", title: "Short Description", type: "text" },
                ]
              }
            ]
          },
          { name: "infrastructure", title: "Infrastructure & Assets", type: "array", of: [{ type: "string" }] },
          { name: "careerOpps", title: "Career Progression Opportunities", type: "array", of: [{ type: "string" }] },
          { name: "bestPracticesImpact", title: "Overall Impact of Best Practices", type: "array", of: [{ type: "string" }] },
          { name: "otherStudentAchievements", title: "Other Student Achievements", type: "array", of: [{ type: "string" }] },
          { name: "focusOnWomenEmpowerment", title: "Focus on Women Empowerment & Employability", type: "text" },
          { name: "overallApproach", title: "Overall Approach (Activities)", type: "text" },
          {
            name: "gallery",
            title: "Photo Gallery",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "image", title: "Image", type: "image", options: { hotspot: true } },
                  { name: "caption", title: "Caption", type: "string" },
                ]
              }
            ]
          },
        ]
      },
      {
        name: "naacCriterion",
        title: "NAAC Criteria",
        type: "document",
        fields: [
          { name: "id", title: "ID", type: "number" },
          { name: "title", title: "Title", type: "string" },
          {
            name: "sections",
            title: "Sections",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "number", title: "Section Number", type: "string" },
                  { name: "title", title: "Section Title", type: "string" },
                  {
                    name: "metrics",
                    title: "Metrics",
                    type: "array",
                    of: [
                      {
                        type: "object",
                        fields: [
                          { name: "number", title: "Metric Number", type: "string" },
                          { name: "title", title: "Metric Title", type: "string" },
                          {
                            name: "documents",
                            title: "Documents",
                            type: "array",
                            of: [
                              {
                                type: "object",
                                fields: [
                                  { name: "label", title: "Document Label", type: "string" },
                                  { name: "documentUrl", title: "Document URL", type: "string" },
                                  {
                                    name: "subDocuments",
                                    title: "Sub Documents",
                                    type: "array",
                                    of: [
                                      {
                                        type: "object",
                                        name: "subDoc",
                                        fields: [
                                          { name: "name", title: "Name", type: "string" },
                                          { name: "year", title: "Year / Subtitle", type: "string" },
                                          { name: "url", title: "URL", type: "string" },
                                          {
                                            name: "subDocuments",
                                            title: "Nested Sub Documents",
                                            type: "array",
                                            of: [
                                              {
                                                type: "object",
                                                name: "nestedSubDoc",
                                                fields: [
                                                  { name: "name", title: "Name", type: "string" },
                                                  { name: "year", title: "Year / Subtitle", type: "string" },
                                                  { name: "url", title: "URL", type: "string" }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "aqarCriterion",
        title: "AQAR Criteria",
        type: "document",
        fields: [
          { name: "id", title: "ID", type: "number" },
          { name: "title", title: "Title", type: "string" },
          {
            name: "sections",
            title: "Sections",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "number", title: "Section Number", type: "string" },
                  { name: "title", title: "Section Title", type: "string" },
                  {
                    name: "metrics",
                    title: "Metrics",
                    type: "array",
                    of: [
                      {
                        type: "object",
                        fields: [
                          { name: "number", title: "Metric Number", type: "string" },
                          { name: "title", title: "Metric Title", type: "string" },
                          {
                            name: "documents",
                            title: "Documents",
                            type: "array",
                            of: [
                              {
                                type: "object",
                                fields: [
                                  { name: "label", title: "Document Label", type: "string" },
                                  { name: "documentUrl", title: "Document URL", type: "string" },
                                  {
                                    name: "subDocuments",
                                    title: "Sub Documents",
                                    type: "array",
                                    of: [
                                      {
                                        type: "object",
                                        name: "subDoc",
                                        fields: [
                                          { name: "name", title: "Name", type: "string" },
                                          { name: "year", title: "Year / Subtitle", type: "string" },
                                          { name: "url", title: "URL", type: "string" },
                                          {
                                            name: "subDocuments",
                                            title: "Nested Sub Documents",
                                            type: "array",
                                            of: [
                                              {
                                                type: "object",
                                                name: "nestedSubDoc",
                                                fields: [
                                                  { name: "name", title: "Name", type: "string" },
                                                  { name: "year", title: "Year / Subtitle", type: "string" },
                                                  { name: "url", title: "URL", type: "string" }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "academicProgramme",
        title: "Academic Programme",
        type: "document",
        fields: [
          { name: "sNo", title: "S.No", type: "number" },
          {
            name: "programmeType",
            title: "Programme Type",
            type: "string",
            options: {
              list: [
                { title: "Undergraduate (UG)", value: "ug" },
                { title: "Postgraduate (PG)", value: "pg" },
              ]
            }
          },
          { name: "name", title: "Programme Name", type: "string" },
          { name: "convenerQuota", title: "Convener Quota Seats", type: "number" },
          { name: "managementQuota", title: "Management Quota Seats", type: "number" },
          { name: "totalIntake", title: "Total Seats / Intake", type: "number" },
          { name: "aboutDocument", title: "About Programme Document", type: "file" },
          { name: "brochure", title: "Programme Brochure", type: "file" }
        ]
      },
      {
        name: "committee",
        title: "College Committees",
        type: "document",
        fields: [
          { name: "sNo", title: "S.No", type: "number" },
          { name: "name", title: "Committee Name", type: "string" },
          { name: "constitutionOrder", title: "Constitution Order (PDF)", type: "file" },
          {
            name: "activitiesReports",
            title: "Activities / Reports (PDFs)",
            type: "array",
            of: [
              {
                type: "file",
                fields: [
                  { name: "title", title: "Report Title / Year", type: "string" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "committeeYearwiseList",
        title: "Committee Lists (Year-wise)",
        type: "document",
        fields: [
          { name: "academicYear", title: "Academic Year", type: "string" },
          { name: "file", title: "Committee List PDF", type: "file" },
          { name: "order", title: "Order", type: "number" }
        ]
      },
      {
        name: "strategicPlan",
        title: "Strategic Development Plan",
        type: "document",
        fields: [
          { name: "title", title: "Page Title", type: "string" },
          { name: "executiveSummary", title: "Executive Summary", type: "text" },
          { name: "googleFormUrl", title: "General Feedback Google Form Link", type: "url" },
          { name: "studentFeedbackFormUrl", title: "Student Feedback Google Form Link", type: "url" },
          { name: "facultyFeedbackFormUrl", title: "Faculty Engagement Google Form Link", type: "url" },
          { name: "parentFeedbackFormUrl", title: "Parent & Community Google Form Link", type: "url" },
          { name: "alumniFeedbackFormUrl", title: "Alumni Engagement Google Form Link", type: "url" },
          {
            name: "documents",
            title: "Strategic Plan Documents",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", title: "Document Title", type: "string" },
                  { name: "file", title: "PDF File", type: "file" },
                  { name: "googleFormUrl", title: "Google Form Link", type: "url" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "studentHandbook",
        title: "Student Handbook",
        type: "document",
        fields: [
          { name: "year", title: "Academic Year", type: "string" },
          { name: "file", title: "Handbook PDF File", type: "file" },
          { name: "order", title: "Sorting Order", type: "number" }
        ]
      },
      {
        name: "placementSection",
        title: "Placement Section",
        type: "document",
        fields: [
          {
            name: "id",
            title: "Section ID",
            type: "string",
            options: {
              list: [
                // Group 1: Training & Placements
                { title: "I-1. About Training & Placement Cell", value: "about-cell" },
                { title: "I-2. Annual Reports", value: "annual-reports" },
                { title: "I-3. Placement Statistics", value: "placement-statistics" },
                { title: "I-4. Campus Recruitment Drives", value: "recruitment-drives" },
                { title: "I-5. Skill Development Initiatives", value: "skill-development" },
                { title: "I-6. Soft Skills & Personality Development", value: "soft-skills" },
                { title: "I-7. Internships & Industry Exposure", value: "internships-exposure" },
                { title: "I-8. Competitive Exam Coaching", value: "competitive-coaching" },
                { title: "I-9. Career Guidance & Counselling", value: "career-guidance" },
                { title: "I-10. Entrepreneurship Development", value: "entrepreneurship" },
                { title: "I-11. Industry Linkages / Placement Partnerships", value: "placement-partnerships" },
                { title: "I-12. Capacity Building & Skill Enhancement", value: "capacity-building" },
                { title: "I-13. Alumni Career Support", value: "alumni-support" },
                { title: "I-14. Training Calendar / Activity Gallery", value: "training-calendar" },
                
                // Group 2: Industry Linkages & Employability
                { title: "II-1. Industry Partnerships", value: "industry-partnerships" },
                { title: "II-2. Internships & Apprenticeships", value: "internships-apprenticeships" },
                { title: "II-3. MoUs / Agreements", value: "mous-agreements" },
                { title: "II-4. MoU Activities", value: "mou-activities" },
                { title: "II-5. CSR Initiatives", value: "csr-initiatives" },
                { title: "II-6. Placement Partnerships", value: "industry-placement-partnerships" },
                { title: "II-7. Professional Certification Programmes", value: "certifications" },
                { title: "II-8. Industry Expert Lectures", value: "expert-lectures" },
                { title: "II-9. Industrial Visits", value: "industrial-visits" },
                { title: "II-10. Skill-Based Training Programmes", value: "skill-training" },
                { title: "II-11. Employability Enhancement Activities", value: "employability-activities" },
                
                // Group 3: Internationalization & Global Outreach
                { title: "III-1. International Collaborations", value: "international-collaborations" },
                { title: "III-2. Internationalization Policy", value: "internationalization-policy" },
                { title: "III-3. International Accreditations & Memberships", value: "accreditations-memberships" },
                { title: "III-4. Global Alumni & Outreach Engagement", value: "global-alumni" },
                { title: "III-5. Global Research Collaborations", value: "global-research" },
                { title: "III-6. Student Exchange / Faculty Exchange", value: "student-faculty-exchange" },
                { title: "III-7. International Webinars & Conferences", value: "webinars-conferences" },
                { title: "III-8. Cross-Cultural Learning Activities", value: "cross-cultural-learning" }
              ]
            }
          },
          { name: "title", title: "Title", type: "string" },
          { name: "content", title: "Content Markdown Text", type: "text" }
        ]
      },
      // ─────────────────────────────────────────────────────────────────
      // FACULTY PROFILE (Full CMS — 17 sections)
      // ─────────────────────────────────────────────────────────────────
      {
        name: "facultyProfile",
        title: "Faculty Profiles",
        type: "document",
        groups: [
          { name: "basic",       title: "1. Basic Profile" },
          { name: "academic",    title: "2. Academic Qualifications" },
          { name: "experience",  title: "3. Professional Experience" },
          { name: "summary",     title: "4. Profile Summary" },
          { name: "teaching",    title: "5. Teaching Details" },
          { name: "research",    title: "6. Research Details" },
          { name: "publications",title: "7. Publications" },
          { name: "books",       title: "8. Books, Patents & Copyrights" },
          { name: "events",      title: "9. Conferences, FDPs & Workshops" },
          { name: "awards",      title: "10. Awards & Achievements" },
          { name: "roles",       title: "11. Roles & Responsibilities" },
          { name: "guidance",    title: "12. Student Guidance" },
          { name: "memberships", title: "13. Professional Memberships" },
          { name: "online",      title: "14. Online Profile Links" },
          { name: "documents",   title: "15. Documents & Files" },
          { name: "seo",         title: "16. SEO Fields" },
          { name: "admin",       title: "17. Admin Control" },
        ],
        fields: [
          // ── 1. BASIC PROFILE ──────────────────────────────────────────
          { name: "facultyName",      title: "Faculty Name",               type: "string",  group: "basic" },
          { name: "slug",             title: "URL Slug",                   type: "slug",    group: "basic", options: { source: "facultyName", maxLength: 96 } },
          { name: "profilePhoto",     title: "Profile Photo",              type: "image",   group: "basic", options: { hotspot: true } },
          { name: "designation",      title: "Designation",                type: "string",  group: "basic" },
          {
            name: "department", title: "Department", type: "string", group: "basic",
            options: { list: [
              "Commerce", "Computer Applications", "Mathematics", "Physics",
              "Chemistry", "Zoology", "Botany", "English", "Telugu",
              "Hindi", "Economics", "Psychology", "History", "Political Science",
              "Physical Education", "Library", "Administration", "MCA", "MBA", "Other"
            ]}
          },
          { name: "facultyId",        title: "Faculty ID",                 type: "string",  group: "basic" },
          {
            name: "gender", title: "Gender", type: "string", group: "basic",
            options: { list: ["Female", "Male", "Other"], layout: "radio" }
          },
          { name: "dateOfBirth",      title: "Date of Birth",              type: "date",    group: "basic" },
          { name: "dateOfJoining",    title: "Date of Joining",            type: "date",    group: "basic" },
          {
            name: "employmentType", title: "Employment Type", type: "string", group: "basic",
            options: { list: ["Regular", "Contract", "Visiting", "Adjunct", "Part-Time"], layout: "radio" }
          },
          { name: "officialEmail",    title: "Official Email",             type: "string",  group: "basic" },
          { name: "contactNumber",    title: "Contact Number",             type: "string",  group: "basic" },
          { name: "officeLocation",   title: "Office / Cabin Location",    type: "string",  group: "basic" },
          {
            name: "facultyStatus", title: "Faculty Status", type: "string", group: "basic",
            options: { list: [{ title: "Active", value: "active" }, { title: "Inactive", value: "inactive" }], layout: "radio" }
          },

          // ── 2. ACADEMIC QUALIFICATIONS ────────────────────────────────
          { name: "highestQualification", title: "Highest Qualification", type: "string", group: "academic" },
          {
            name: "qualifications", title: "Qualification Details", type: "array", group: "academic",
            of: [{
              type: "object",
              name: "qualificationEntry",
              title: "Qualification",
              fields: [
                { name: "degreeName",      title: "Degree Name",             type: "string" },
                { name: "specialization",  title: "Specialization",          type: "string" },
                { name: "university",      title: "University / Institution", type: "string" },
                { name: "yearOfPassing",   title: "Year of Passing",         type: "string" },
                { name: "gradePercentage", title: "Grade / Percentage",      type: "string" },
              ]
            }]
          },

          // ── 3. PROFESSIONAL EXPERIENCE ────────────────────────────────
          { name: "totalExperience",    title: "Total Experience (Years)",    type: "string", group: "experience" },
          { name: "teachingExperience", title: "Teaching Experience (Years)", type: "string", group: "experience" },
          { name: "industryExperience", title: "Industry Experience (Years)", type: "string", group: "experience" },
          {
            name: "professionalExperience", title: "Previous Experience Details", type: "array", group: "experience",
            of: [{
              type: "object",
              name: "experienceEntry",
              title: "Experience",
              fields: [
                { name: "organization",  title: "Organization Name",         type: "string" },
                { name: "designation",   title: "Designation / Role",        type: "string" },
                { name: "fromDate",      title: "From Date",                 type: "string" },
                { name: "toDate",        title: "To Date (or 'Present')",    type: "string" },
                { name: "description",   title: "Experience Description",    type: "text" },
              ]
            }]
          },

          // ── 4. PROFILE SUMMARY ────────────────────────────────────────
          { name: "shortBio",           title: "Short Bio",           type: "text",   group: "summary" },
          { name: "careerObjective",    title: "Career Objective",    type: "text",   group: "summary" },
          { name: "teachingPhilosophy", title: "Teaching Philosophy", type: "text",   group: "summary" },
          {
            name: "areaOfExpertise", title: "Area of Expertise (Tags)", type: "array", group: "summary",
            of: [{ type: "string" }], options: { layout: "tags" }
          },
          {
            name: "languagesKnown", title: "Languages Known (Tags)", type: "array", group: "summary",
            of: [{ type: "string" }], options: { layout: "tags" }
          },

          // ── 5. TEACHING DETAILS ───────────────────────────────────────
          {
            name: "subjectsHandled", title: "Subjects Handled", type: "array", group: "teaching",
            of: [{
              type: "object",
              name: "subjectEntry",
              title: "Subject",
              fields: [
                { name: "subjectName",     title: "Subject Name",        type: "string" },
                { name: "courseProgram",   title: "Course / Program",    type: "string" },
                { name: "semesterYear",    title: "Semester / Year",     type: "string" },
                { name: "academicYear",    title: "Academic Year",       type: "string" },
                { name: "materialsLink",   title: "Course Materials Link (URL)", type: "url" },
              ]
            }]
          },

          // ── 6. RESEARCH DETAILS ───────────────────────────────────────
          {
            name: "researchAreas", title: "Research Areas (Tags)", type: "array", group: "research",
            of: [{ type: "string" }], options: { layout: "tags" }
          },
          { name: "researchInterests", title: "Research Interests", type: "text", group: "research" },
          {
            name: "ongoingProjects", title: "Ongoing Research Projects", type: "array", group: "research",
            of: [{
              type: "object",
              name: "ongoingProject",
              title: "Ongoing Project",
              fields: [
                { name: "projectTitle",   title: "Project Title",    type: "string" },
                { name: "fundingAgency",  title: "Funding Agency",   type: "string" },
                { name: "amountReceived", title: "Amount Received",  type: "string" },
                { name: "duration",       title: "Duration",         type: "string" },
                { name: "role",           title: "Role (PI/Co-PI)",  type: "string" },
                {
                  name: "projectStatus", title: "Project Status", type: "string",
                  options: { list: ["Ongoing", "Completed", "Submitted", "Sanctioned"] }
                },
              ]
            }]
          },
          {
            name: "completedProjects", title: "Completed Research Projects", type: "array", group: "research",
            of: [{
              type: "object",
              name: "completedProject",
              title: "Completed Project",
              fields: [
                { name: "projectTitle",   title: "Project Title",    type: "string" },
                { name: "fundingAgency",  title: "Funding Agency",   type: "string" },
                { name: "amountReceived", title: "Amount Received",  type: "string" },
                { name: "duration",       title: "Duration",         type: "string" },
                { name: "role",           title: "Role (PI/Co-PI)",  type: "string" },
                {
                  name: "projectStatus", title: "Project Status", type: "string",
                  options: { list: ["Ongoing", "Completed", "Submitted", "Sanctioned"] }
                },
              ]
            }]
          },

          // ── 7. PUBLICATIONS ───────────────────────────────────────────
          {
            name: "publications", title: "Publications", type: "array", group: "publications",
            of: [{
              type: "object",
              name: "publicationEntry",
              title: "Publication",
              fields: [
                { name: "publicationTitle",  title: "Publication Title",       type: "string" },
                { name: "journalName",       title: "Journal / Conference Name",type: "string" },
                {
                  name: "publicationType", title: "Publication Type", type: "string",
                  options: { list: ["Journal", "Conference", "Book", "Book Chapter", "Patent", "Article"] }
                },
                { name: "authors",           title: "Authors",                 type: "string" },
                { name: "year",              title: "Year",                    type: "string" },
                { name: "volumeIssuePages",  title: "Volume / Issue / Pages",  type: "string" },
                { name: "doiLink",           title: "DOI Link (URL)",          type: "url" },
                {
                  name: "indexing", title: "Indexing", type: "string",
                  options: { list: ["SCOPUS", "Web of Science", "UGC-CARE", "PubMed", "IEEE", "Springer", "Elsevier", "Other"] }
                },
                { name: "publicationPdf",    title: "Publication PDF",         type: "file" },
              ]
            }]
          },

          // ── 8. BOOKS, PATENTS & COPYRIGHTS ────────────────────────────
          {
            name: "booksPublished", title: "Books Published", type: "array", group: "books",
            of: [{
              type: "object",
              name: "bookEntry",
              title: "Book",
              fields: [
                { name: "bookTitle",     title: "Book Title",     type: "string" },
                { name: "publisherName", title: "Publisher Name", type: "string" },
                { name: "isbnNumber",    title: "ISBN Number",    type: "string" },
                { name: "publishedYear", title: "Published Year", type: "string" },
              ]
            }]
          },
          {
            name: "patents", title: "Patent Details", type: "array", group: "books",
            of: [{
              type: "object",
              name: "patentEntry",
              title: "Patent",
              fields: [
                { name: "patentTitle",  title: "Patent Title",  type: "string" },
                { name: "patentNumber", title: "Patent Number", type: "string" },
                {
                  name: "patentStatus", title: "Patent Status", type: "string",
                  options: { list: ["Filed", "Published", "Granted", "Abandoned"] }
                },
                { name: "filedDate", title: "Filed / Published Date", type: "string" },
              ]
            }]
          },

          // ── 9. CONFERENCES, SEMINARS, FDPs & WORKSHOPS ────────────────
          {
            name: "conferencesAttended", title: "Conferences Attended", type: "array", group: "events",
            of: [{
              type: "object",
              name: "conferenceEntry",
              title: "Conference",
              fields: [
                { name: "eventTitle",   title: "Event Title / Paper Title", type: "string" },
                { name: "organizedBy",  title: "Organized By",              type: "string" },
                { name: "location",     title: "Location",                  type: "string" },
                { name: "fromDate",     title: "From Date",                 type: "string" },
                { name: "toDate",       title: "To Date",                   type: "string" },
                { name: "certificate",  title: "Certificate Upload",        type: "file" },
              ]
            }]
          },
          {
            name: "seminarsAttended", title: "Seminars Attended", type: "array", group: "events",
            of: [{
              type: "object",
              name: "seminarEntry",
              title: "Seminar",
              fields: [
                { name: "eventTitle",  title: "Seminar Title", type: "string" },
                { name: "organizedBy", title: "Organized By",  type: "string" },
                { name: "location",    title: "Location",      type: "string" },
                { name: "fromDate",    title: "From Date",     type: "string" },
                { name: "toDate",      title: "To Date",       type: "string" },
                { name: "certificate", title: "Certificate",   type: "file" },
              ]
            }]
          },
          {
            name: "fdpsAttended", title: "FDPs Attended", type: "array", group: "events",
            of: [{
              type: "object",
              name: "fdpEntry",
              title: "FDP",
              fields: [
                { name: "eventTitle",  title: "FDP Title",     type: "string" },
                { name: "organizedBy", title: "Organized By",  type: "string" },
                { name: "location",    title: "Location",      type: "string" },
                { name: "fromDate",    title: "From Date",     type: "string" },
                { name: "toDate",      title: "To Date",       type: "string" },
                { name: "certificate", title: "Certificate",   type: "file" },
              ]
            }]
          },
          {
            name: "workshopsAttended", title: "Workshops Attended", type: "array", group: "events",
            of: [{
              type: "object",
              name: "workshopEntry",
              title: "Workshop",
              fields: [
                { name: "eventTitle",  title: "Workshop Title", type: "string" },
                { name: "organizedBy", title: "Organized By",   type: "string" },
                { name: "location",    title: "Location",       type: "string" },
                { name: "fromDate",    title: "From Date",      type: "string" },
                { name: "toDate",      title: "To Date",        type: "string" },
                { name: "certificate", title: "Certificate",    type: "file" },
              ]
            }]
          },

          // ── 10. AWARDS & ACHIEVEMENTS ─────────────────────────────────
          {
            name: "awards", title: "Awards & Achievements", type: "array", group: "awards",
            of: [{
              type: "object",
              name: "awardEntry",
              title: "Award",
              fields: [
                { name: "awardTitle",   title: "Award Title",             type: "string" },
                { name: "awardedBy",    title: "Awarded By",              type: "string" },
                { name: "awardYear",    title: "Year",                    type: "string" },
                { name: "description",  title: "Description",             type: "text" },
                { name: "certificate",  title: "Award Certificate / Image", type: "image", options: { hotspot: true } },
              ]
            }]
          },

          // ── 11. ROLES & RESPONSIBILITIES ──────────────────────────────
          { name: "currentAdministrativeRole", title: "Current Administrative Role", type: "string", group: "roles" },
          {
            name: "departmentResponsibilities", title: "Department Responsibilities", type: "array", group: "roles",
            of: [{
              type: "object",
              name: "responsibilityEntry",
              title: "Responsibility",
              fields: [
                { name: "roleName",     title: "Role Name",               type: "string" },
                { name: "academicYear", title: "Academic Year",           type: "string" },
                { name: "description",  title: "Responsibility Description", type: "text" },
              ]
            }]
          },
          {
            name: "committeeMemberships", title: "Committee Memberships", type: "array", group: "roles",
            of: [{
              type: "object",
              name: "committeeEntry",
              title: "Committee",
              fields: [
                { name: "committeeName", title: "Committee Name",         type: "string" },
                { name: "academicYear",  title: "Academic Year",          type: "string" },
                { name: "description",   title: "Responsibility Description", type: "text" },
              ]
            }]
          },

          // ── 12. STUDENT GUIDANCE ──────────────────────────────────────
          {
            name: "projectsGuided", title: "Projects Guided", type: "array", group: "guidance",
            of: [{
              type: "object",
              name: "projectGuidedEntry",
              title: "Project Guided",
              fields: [
                { name: "studentName",  title: "Student Name",     type: "string" },
                { name: "projectTitle", title: "Project Title",    type: "string" },
                { name: "course",       title: "Programme / Course",type: "string" },
                { name: "academicYear", title: "Academic Year",    type: "string" },
                {
                  name: "projectStatus", title: "Project Status", type: "string",
                  options: { list: ["Ongoing", "Completed", "Submitted"] }
                },
              ]
            }]
          },
          {
            name: "researchScholars", title: "Research Scholars Guided", type: "array", group: "guidance",
            of: [{
              type: "object",
              name: "scholarEntry",
              title: "Research Scholar",
              fields: [
                { name: "scholarName",    title: "Scholar Name",    type: "string" },
                { name: "researchTopic",  title: "Research Topic",  type: "string" },
                {
                  name: "guidanceStatus", title: "Guidance Status", type: "string",
                  options: { list: ["Ongoing", "Submitted", "Awarded"] }
                },
              ]
            }]
          },

          // ── 13. PROFESSIONAL MEMBERSHIPS ──────────────────────────────
          {
            name: "professionalMemberships", title: "Professional Memberships", type: "array", group: "memberships",
            of: [{
              type: "object",
              name: "membershipEntry",
              title: "Membership",
              fields: [
                { name: "organization",    title: "Organization Name", type: "string" },
                { name: "membershipId",    title: "Membership ID",     type: "string" },
                { name: "membershipType",  title: "Membership Type",   type: "string" },
                { name: "validity",        title: "Validity / Expiry", type: "string" },
              ]
            }]
          },

          // ── 14. ONLINE PROFILE LINKS ──────────────────────────────────
          { name: "linkedinUrl",       title: "LinkedIn Profile URL",       type: "url",    group: "online" },
          { name: "googleScholarUrl",  title: "Google Scholar Profile URL", type: "url",    group: "online" },
          { name: "orcidId",           title: "ORCID ID / URL",             type: "string", group: "online" },
          { name: "scopusId",          title: "Scopus ID / URL",            type: "string", group: "online" },
          { name: "researchGateUrl",   title: "ResearchGate Profile URL",   type: "url",    group: "online" },
          { name: "personalWebsite",   title: "Personal Website URL",       type: "url",    group: "online" },

          // ── 15. DOCUMENTS ─────────────────────────────────────────────
          { name: "cvPdf",             title: "CV / Resume PDF",            type: "file",   group: "documents" },
          { name: "facultyProfilePdf", title: "Faculty Profile PDF",        type: "file",   group: "documents" },
          {
            name: "certificates", title: "Certificates (Multiple)", type: "array", group: "documents",
            of: [{
              type: "file",
              fields: [{ name: "description", title: "Certificate Description", type: "string" }]
            }]
          },

          // ── 16. SEO FIELDS ────────────────────────────────────────────
          { name: "metaTitle",       title: "Meta Title",       type: "string", group: "seo" },
          { name: "metaDescription", title: "Meta Description", type: "text",   group: "seo" },
          {
            name: "metaKeywords", title: "Meta Keywords (Tags)", type: "array", group: "seo",
            of: [{ type: "string" }], options: { layout: "tags" }
          },
          { name: "imageAltText", title: "Profile Photo Alt Text", type: "string", group: "seo" },

          // ── 17. ADMIN CONTROL ─────────────────────────────────────────
          { name: "displayOrder",    title: "Display Order (lower = first)", type: "number",  group: "admin" },
          { name: "featuredFaculty", title: "Featured Faculty?",             type: "boolean", group: "admin" },
          { name: "showOnWebsite",   title: "Show on Website?",              type: "boolean", group: "admin" },
          { name: "passwordHash",    title: "Password Hash (System — Do Not Edit)", type: "string", group: "admin" },
        ],

        preview: {
          select: {
            title: "facultyName",
            subtitle: "designation",
            media: "profilePhoto",
          }
        }
      },
    ],
  },
});

