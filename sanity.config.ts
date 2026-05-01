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
        name: "faculty",
        title: "Faculty",
        type: "document",
        fields: [
          { name: "name", title: "Name", type: "string" },
          { name: "role", title: "Role/Title", type: "string" },
          { name: "department", title: "Department", type: "string" },
          { name: "bio", title: "Biography", type: "text" },
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
    ],
  },
});
