const { createClient } = require("@sanity/client");

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const API_VERSION = "2024-03-01";
const DEFAULT_TOKEN = "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: DEFAULT_TOKEN,
  useCdn: false,
});

async function run() {
  console.log("=== CHECKING NAAC CRITERION ===");
  const naac = await client.fetch(`*[_type == "naacCriterion"] | order(id asc) { _id, id, title }`);
  console.log(naac);

  console.log("\n=== CHECKING AQAR CRITERION ===");
  const aqar = await client.fetch(`*[_type == "aqarCriterion"] | order(id asc) { _id, id, title }`);
  console.log(aqar);
}

run();
