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
            name: "valueAddedCourses",
            title: "Value-Added / Certificate Courses",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "sNo", title: "S.No", type: "number" },
                  { name: "title", title: "Course Title", type: "string" },
                  { name: "duration", title: "Duration", type: "string" },
                  { name: "agency", title: "Collaborating Agency", type: "string" },
                ]
              }
            ]
          },
          {
            name: "mous",
            title: "Departmental MoUs",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", title: "Organization Name", type: "string" },
                  { name: "type", title: "Partnership Type", type: "string" },
                  { name: "duration", title: "Duration", type: "string" },
                  { name: "purpose", title: "Purpose/Goal", type: "string" },
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
                  { name: "practice", title: "The Practice Details", type: "array", of: [{ type: "string" }] },
                  { name: "success", title: "Evidence of Success", type: "array", of: [{ type: "string" }] },
                ]
              }
            ]
          },
          {
            name: "activities",
            title: "Category-wise Activities",
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
      }
    ],
  },
});

