const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  useCdn: false,
});

async function main() {
  const query = `*[_type == "admissionsPortal"]{
    _id,
    _type,
    _updatedAt,
    "ugCount": count(portalData.ugProgrammes),
    "pgCount": count(portalData.pgProgrammes),
    "docCount": count(portalData.documents),
    "yearlyCount": count(portalData.yearlyRecords),
    "documents": portalData.documents
  }`;
  const res = await client.fetch(query);
  console.log("Admissions document verified in Sanity:", JSON.stringify(res, null, 2));
}

main().catch(console.error);
