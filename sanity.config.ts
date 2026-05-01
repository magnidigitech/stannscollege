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
    ],
  },
});
