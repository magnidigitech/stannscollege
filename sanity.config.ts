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
          { name: "activitiesReports", title: "Activities / Reports (PDF)", type: "file" }
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
          {
            name: "pillars",
            title: "Core Strategic Pillars",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", title: "Pillar Title", type: "string" },
                  { name: "description", title: "Pillar Description", type: "text" }
                ]
              }
            ]
          },
          {
            name: "phases",
            title: "Roadmap Phases",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", title: "Phase Title", type: "string" },
                  { name: "description", title: "Phase Description", type: "text" }
                ]
              }
            ]
          },
          {
            name: "targets",
            title: "Key Performance Tracking Targets",
            type: "array",
            of: [{ type: "string" }]
          },
          { name: "documentFile", title: "Strategic Plan PDF File", type: "file" }
        ]
      }
    ],
  },
});

