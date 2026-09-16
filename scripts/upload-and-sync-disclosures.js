const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// 1. Read token
const envPath = path.join(__dirname, "../.env");
let SANITY_WRITE_TOKEN = "";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match && match[1] === "SANITY_WRITE_TOKEN") {
      let val = match[2] || "";
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      SANITY_WRITE_TOKEN = val;
    }
  });
}

const DEFAULT_TOKEN = "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";
const token = SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

const PPPP_DIR = path.join(__dirname, "../pppp");
const PUBLIC_DOCS = path.join(__dirname, "../public/documents");
const CACHE_FILE = path.join(__dirname, "disclosures-upload-cache.json");

let uploadCache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    uploadCache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  } catch (e) {
    uploadCache = {};
  }
}

function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(uploadCache, null, 2), "utf8");
}

async function uploadFileToSanity(filePath, originalFilename) {
  const fileKey = path.basename(filePath);
  if (uploadCache[fileKey] && uploadCache[fileKey].assetId && uploadCache[fileKey].url) {
    console.log(`[Cache Hit] ${fileKey} -> ${uploadCache[fileKey].url}`);
    return uploadCache[fileKey];
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  console.log(`[Uploading to Sanity] ${fileKey} (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)...`);
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("file", buffer, {
    filename: originalFilename || path.basename(filePath),
    contentType: "application/pdf",
  });

  uploadCache[fileKey] = {
    assetId: asset._id,
    url: asset.url,
    originalFilename: originalFilename || path.basename(filePath),
  };
  saveCache();

  console.log(`  ✓ Uploaded! Asset ID: ${asset._id} -> URL: ${asset.url}`);
  return uploadCache[fileKey];
}

async function run() {
  console.log("=== St. Ann's College: Mandatory Disclosures Sanity Upload & Sync ===");
  console.log("Checking connection to Sanity...");
  
  // Ensure directories exist in public/documents
  const dirsToEnsure = ["aicte", "apsche", "cce", "ugc", "nirf", "policies", "affiliations", "aishe"];
  dirsToEnsure.forEach((d) => {
    const p = path.join(PUBLIC_DOCS, d);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  });

  // 1. ANU Affiliations (from public/documents/affiliations)
  console.log("\n--- Processing ANU Affiliations ---");
  const anuSourceMap = [
    { type: "ug", year: "2025–2026", title: "UG Affiliation Order", file: "ANU_UG_Affiliation_2025-2026.pdf" },
    { type: "ug", year: "2024–2025", title: "UG Affiliation Order", file: "ANU_UG_Affiliation_2024-2025.pdf" },
    { type: "ug", year: "2023–2024", title: "UG Affiliation Order", file: "ANU_UG_Affiliation_2023-2024.pdf" },
    { type: "pg", year: "2025–2026", title: "PG Affiliation Order", file: "ANU_PG_Affiliation_2025-2026.pdf" },
    { type: "pg", year: "2024–2025", title: "PG Affiliation Order", file: "ANU_PG_Affiliation_2024-2025.pdf" },
    { type: "pg", year: "2023–2024", title: "PG Affiliation Order", file: "ANU_PG_Affiliation_2023-2024.pdf" },
  ];

  const anuAffiliations = [];
  for (let idx = 0; idx < anuSourceMap.length; idx++) {
    const item = anuSourceMap[idx];
    const srcPath = path.join(PUBLIC_DOCS, "affiliations", item.file);
    const uploaded = await uploadFileToSanity(srcPath, item.file);
    anuAffiliations.push({
      _key: `anu_${item.type}_${idx + 1}`,
      programmeType: item.type,
      year: item.year,
      title: item.title,
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: uploaded.assetId,
        },
      },
      fileUrl: uploaded.url,
    });
  }

  // 2. AISHE Reports (from public/documents/aishe)
  console.log("\n--- Processing AISHE Certificates ---");
  const aisheSourceMap = [
    { sNo: 1, year: "2024–2025", title: "AISHE Certificate 2024–2025", file: "AISHE_Certificate_2024-2025.pdf" },
    { sNo: 2, year: "2023–2024", title: "AISHE Certificate 2023–2024", file: "AISHE_Certificate_2023-2024.pdf" },
    { sNo: 3, year: "2022–2023", title: "AISHE Certificate 2022–2023", file: "AISHE_Certificate_2022-2023.pdf" },
    { sNo: 4, year: "2021–2022", title: "AISHE Certificate 2021–2022", file: "AISHE_Certificate_2021-2022.pdf" },
    { sNo: 5, year: "2020–2021", title: "AISHE Certificate 2020–2021", file: "AISHE_Certificate_2020-2021.pdf" },
  ];

  const aisheReports = [];
  for (const item of aisheSourceMap) {
    const srcPath = path.join(PUBLIC_DOCS, "aishe", item.file);
    const uploaded = await uploadFileToSanity(srcPath, item.file);
    aisheReports.push({
      _key: `aishe_${item.sNo}`,
      sNo: item.sNo,
      year: item.year,
      title: item.title,
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: uploaded.assetId,
        },
      },
      fileUrl: uploaded.url,
    });
  }

  // 3. AICTE Approvals (from pppp/)
  console.log("\n--- Processing AICTE Approvals from pppp/ ---");
  const aicteFiles = [
    { year: "2026–2027", title: "AICTE Extension of Approval (EoA) 2026-2027", filename: "1.AICTE  Approval 2026-2027.pdf", dest: "AICTE_Approval_2026-2027.pdf" },
    { year: "2025–2026", title: "AICTE Extension of Approval (EoA) 2025-2026", filename: "2.AICTE Approval 2025-2026.pdf", dest: "AICTE_Approval_2025-2026.pdf" },
    { year: "2024–2025", title: "AICTE Extension of Approval (EoA) 2024-2025", filename: "3.AICTE Approval 2024-2025.pdf", dest: "AICTE_Approval_2024-2025.pdf" },
    { year: "2023–2024", title: "AICTE Extension of Approval (EoA) 2023-2024", filename: "4.AICTE Approval 2023-2024.pdf", dest: "AICTE_Approval_2023-2024.pdf" },
    { year: "2022–2023", title: "AICTE Extension of Approval (EoA) 2022-2023", filename: "5.AICTE Approval 2022-2023.pdf", dest: "AICTE_Approval_2022-2023.pdf" },
    { year: "2021–2022", title: "AICTE Extension of Approval (EoA) 2021-2022", filename: "6.AICTE Approval 2021-2022.pdf", dest: "AICTE_Approval_2021-2022.pdf" },
  ];

  const filesToDeleteFromPppp = [];
  const aicteApprovals = [];

  for (let idx = 0; idx < aicteFiles.length; idx++) {
    const item = aicteFiles[idx];
    const srcPath = path.join(PPPP_DIR, item.filename);
    const destPath = path.join(PUBLIC_DOCS, "aicte", item.dest);
    
    // Copy to public/documents/aicte if exists in pppp
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      filesToDeleteFromPppp.push(srcPath);
    }
    const uploadSource = fs.existsSync(destPath) ? destPath : srcPath;
    const uploaded = await uploadFileToSanity(uploadSource, item.dest);

    aicteApprovals.push({
      _key: `aicte_${idx + 1}`,
      year: item.year,
      title: item.title,
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: uploaded.assetId,
        },
      },
      fileUrl: uploaded.url,
    });
  }

  // 4. APSCHE Orders (from pppp/)
  console.log("\n--- Processing APSCHE Orders from pppp/ ---");
  const apscheFiles = [
    { year: "2025–2026", title: "APSCHE Proceedings & Sanction Order 2025-2026", filename: "-APSCHE proceedings  2025-2026.pdf", dest: "APSCHE_Proceedings_2025-2026.pdf" },
    { year: "2024–2025", title: "APSCHE Proceedings & Communication 2024-2025", filename: "2.APSCHE 2024-2025.pdf", dest: "APSCHE_Proceedings_2024-2025.pdf" },
    { year: "2023–2024", title: "APSCHE Proceedings & Communication 2023-2024", filename: "3.APSCHE 2023-2024.pdf", dest: "APSCHE_Proceedings_2023-2024.pdf" },
    { year: "2022–2023", title: "APSCHE Proceedings & Communication 2022-2023", filename: "4.APSCHE 2022-2023.pdf", dest: "APSCHE_Proceedings_2022-2023.pdf" },
    { year: "2021–2022", title: "APSCHE Proceedings & Communication 2021-2022", filename: "5.APSCHE 2021-2022.pdf", dest: "APSCHE_Proceedings_2021-2022.pdf" },
  ];

  const apscheOrders = [];
  for (let idx = 0; idx < apscheFiles.length; idx++) {
    const item = apscheFiles[idx];
    const srcPath = path.join(PPPP_DIR, item.filename);
    const destPath = path.join(PUBLIC_DOCS, "apsche", item.dest);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      filesToDeleteFromPppp.push(srcPath);
    }
    const uploadSource = fs.existsSync(destPath) ? destPath : srcPath;
    const uploaded = await uploadFileToSanity(uploadSource, item.dest);

    apscheOrders.push({
      _key: `apsche_${idx + 1}`,
      year: item.year,
      title: item.title,
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: uploaded.assetId,
        },
      },
      fileUrl: uploaded.url,
    });
  }

  // 5. CCE Order (from pppp/)
  console.log("\n--- Processing CCE Orders from pppp/ ---");
  const cceSrcPath = path.join(PPPP_DIR, "6.A CHE Order.pdf");
  const cceDestPath = path.join(PUBLIC_DOCS, "cce", "CCE_CHE_Order_2025-2026.pdf");
  if (fs.existsSync(cceSrcPath)) {
    fs.copyFileSync(cceSrcPath, cceDestPath);
    filesToDeleteFromPppp.push(cceSrcPath);
  }
  const cceUploaded = await uploadFileToSanity(fs.existsSync(cceDestPath) ? cceDestPath : cceSrcPath, "CCE_CHE_Order_2025-2026.pdf");
  const cceOrders = [
    {
      _key: "cce_1",
      year: "2025–2026",
      title: "CCE / Collegiate Higher Education Order & Proceedings 2025-2026",
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: cceUploaded.assetId,
        },
      },
      fileUrl: cceUploaded.url,
    }
  ];

  // 6. UGC 2(f) Order (from pppp/)
  console.log("\n--- Processing UGC Recognition Document from pppp/ ---");
  const ugcSrcPath = path.join(PPPP_DIR, "UGC 2(f) 2019 (1).pdf");
  const ugcDestPath = path.join(PUBLIC_DOCS, "ugc", "UGC_2f_Recognition_Order.pdf");
  if (fs.existsSync(ugcSrcPath)) {
    fs.copyFileSync(ugcSrcPath, ugcDestPath);
    filesToDeleteFromPppp.push(ugcSrcPath);
  }
  const ugcUploaded = await uploadFileToSanity(fs.existsSync(ugcDestPath) ? ugcDestPath : ugcSrcPath, "UGC_2f_Recognition_Order.pdf");
  const ugcDocuments = [
    {
      _key: "ugc_1",
      sNo: 1,
      title: "UGC Section 2(f) Recognition Order & Certificate",
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: ugcUploaded.assetId,
        },
      },
      fileUrl: ugcUploaded.url,
    }
  ];

  // 7. Financial & Policies Documents
  console.log("\n--- Processing Financial & Policy Documents ---");
  const budgetUpload = await uploadFileToSanity(path.join(PUBLIC_DOCS, "policies", "Annual_Budget.pdf"), "Annual_Budget.pdf");
  const finPolicyUpload = await uploadFileToSanity(path.join(PUBLIC_DOCS, "policies", "Financial_Management_Policy.pdf"), "Financial_Management_Policy.pdf");
  const procurementUpload = await uploadFileToSanity(path.join(PUBLIC_DOCS, "policies", "Purchase_Procurement_Policy_SOP.pdf"), "Purchase_Procurement_Policy_SOP.pdf");

  const financialDocuments = [
    {
      _key: "fin_budget",
      sNo: 1,
      code: "budget",
      title: "Annual Budget",
      btnLabel: "Annual Budget",
      description: "The annual budget reflects the institution's financial planning and allocation of resources towards academic, administrative, infrastructure, student welfare and other institutional activities.",
      fileUrl: budgetUpload.url,
      file: { _type: "file", asset: { _type: "reference", _ref: budgetUpload.assetId } }
    },
    {
      _key: "fin_audit",
      sNo: 2,
      code: "audit",
      title: "Audited Financial Statements",
      btnLabel: "Audited Financial Statements",
      description: "Audited financial statements and relevant financial records are maintained in accordance with applicable accounting and statutory requirements.",
      fileUrl: "/documents/DefaultFile_1.pdf"
    },
    {
      _key: "fin_income",
      sNo: 3,
      code: "income",
      title: "Financial Resources / Sources of Income",
      btnLabel: "Financial Resources / Sources of Income",
      description: "Relevant information regarding the institution's financial resources and applicable sources of income is maintained and disclosed wherever required.",
      fileUrl: "/documents/DefaultFile_1.pdf"
    },
    {
      _key: "fin_corpus",
      sNo: 4,
      code: "corpus",
      title: "Endowment & Corpus Funds",
      btnLabel: "Endowment & Corpus Funds",
      description: "Details relating to endowment and corpus funds, wherever applicable, are maintained in accordance with institutional financial procedures.",
      fileUrl: "/documents/DefaultFile_1.pdf"
    },
    {
      _key: "fin_utilization",
      sNo: 5,
      code: "utilization",
      title: "Utilization Certificates",
      btnLabel: "Utilization Certificates",
      description: "Relevant Utilization Certificates relating to grants or funds received from competent authorities are maintained and provided wherever applicable.",
      fileUrl: "/documents/DefaultFile_1.pdf"
    },
    {
      _key: "fin_policy",
      sNo: 6,
      code: "finance_policy",
      title: "Finance Policy",
      btnLabel: "Finance Policy",
      description: "The institution follows appropriate financial procedures relating to budgeting, expenditure, accounting, financial control and resource management.",
      fileUrl: finPolicyUpload.url,
      file: { _type: "file", asset: { _type: "reference", _ref: finPolicyUpload.assetId } }
    },
    {
      _key: "fin_procurement",
      sNo: 7,
      code: "procurement",
      title: "Purchase & Procurement Policy",
      btnLabel: "Purchase & Procurement Policy",
      description: "The institution follows transparent and appropriate procedures for the purchase and procurement of goods, services, equipment and other institutional requirements.",
      fileUrl: procurementUpload.url,
      file: { _type: "file", asset: { _type: "reference", _ref: procurementUpload.assetId } }
    },
    {
      _key: "fin_fee_afrc",
      sNo: 8,
      code: "fee_structure",
      title: "Approved Fee Structure / AFRC Orders",
      btnLabel: "Approved Fee Structure",
      secondBtnLabel: "AFRC Orders",
      description: "Applicable approved fee structures and relevant AFRC orders are provided for the information of students and stakeholders, wherever applicable.",
      fileUrl: "/documents/DefaultFile_1.pdf",
      secondFileUrl: "/documents/DefaultFile_1.pdf"
    },
    {
      _key: "fin_scholarship",
      sNo: 9,
      code: "scholarship",
      title: "Scholarship Details",
      btnLabel: "Scholarship Details",
      description: "The institution facilitates and provides information regarding scholarships, fee reimbursement, financial assistance and other student support schemes available to eligible students through Government, statutory authorities and other competent agencies.\n\nRelevant scholarship-related notifications, guidelines, eligibility criteria, application procedures and supporting documents are maintained and made available for the information of students and stakeholders, wherever applicable.",
      fileUrl: "/documents/DefaultFile_1.pdf"
    }
  ];

  // 8. NIRF Submissions (from pppp/)
  console.log("\n--- Processing NIRF Submissions (15 files) from pppp/ ---");
  const nirfYears = [
    {
      year: "2025–2026",
      college: { file: "DOC-01 College_2025-2026.pdf", dest: "NIRF_2025-2026_College.pdf" },
      mgmt: { file: "DOC-02 Management_2025-2026.pdf", dest: "NIRF_2025-2026_Management.pdf" },
      overall: { file: "DOC-03 Overall_2025-2026.pdf", dest: "NIRF_2025-2026_Overall.pdf" },
    },
    {
      year: "2024–2025",
      college: { file: "DOC-01 2024-2025 COLLEGE.pdf", dest: "NIRF_2024-2025_College.pdf" },
      mgmt: { file: "DOC-02 2024-2025_MANAGEMENT.pdf", dest: "NIRF_2024-2025_Management.pdf" },
      overall: { file: "DOC-03 2024-2025 OVERALL.pdf", dest: "NIRF_2024-2025_Overall.pdf" },
    },
    {
      year: "2023–2024",
      college: { file: "DOC-01 2023–2024_College.pdf", dest: "NIRF_2023-2024_College.pdf" },
      mgmt: { file: "DOC-02 2023–2024_Management.pdf", dest: "NIRF_2023-2024_Management.pdf" },
      overall: { file: "DOC-03 2023–2024_Overall.pdf", dest: "NIRF_2023-2024_Overall.pdf" },
    },
    {
      year: "2022–2023",
      college: { file: "DOC-01 2022–2023_College.pdf", dest: "NIRF_2022-2023_College.pdf" },
      mgmt: { file: "DOC-02 2022–2023_Management.pdf", dest: "NIRF_2022-2023_Management.pdf" },
      overall: { file: "DOC-03 2022–2023_Overall.pdf", dest: "NIRF_2022-2023_Overall.pdf" },
    },
    {
      year: "2021–2022",
      college: { file: "DOC-01 2021–2022_COllege.pdf", dest: "NIRF_2021-2022_College.pdf" },
      mgmt: { file: "DOC-2 2021–2022_Managemetn.pdf", dest: "NIRF_2021-2022_Management.pdf" },
      overall: { file: "DOC-03 2021–2022_Overall.pdf", dest: "NIRF_2021-2022_Overall.pdf" },
    },
  ];

  const nirfSubmissions = [];
  for (let idx = 0; idx < nirfYears.length; idx++) {
    const item = nirfYears[idx];
    
    // College
    const cSrc = path.join(PPPP_DIR, item.college.file);
    const cDest = path.join(PUBLIC_DOCS, "nirf", item.college.dest);
    if (fs.existsSync(cSrc)) {
      fs.copyFileSync(cSrc, cDest);
      filesToDeleteFromPppp.push(cSrc);
    }
    const cUp = await uploadFileToSanity(fs.existsSync(cDest) ? cDest : cSrc, item.college.dest);

    // Mgmt
    const mSrc = path.join(PPPP_DIR, item.mgmt.file);
    const mDest = path.join(PUBLIC_DOCS, "nirf", item.mgmt.dest);
    if (fs.existsSync(mSrc)) {
      fs.copyFileSync(mSrc, mDest);
      filesToDeleteFromPppp.push(mSrc);
    }
    const mUp = await uploadFileToSanity(fs.existsSync(mDest) ? mDest : mSrc, item.mgmt.dest);

    // Overall
    const oSrc = path.join(PPPP_DIR, item.overall.file);
    const oDest = path.join(PUBLIC_DOCS, "nirf", item.overall.dest);
    if (fs.existsSync(oSrc)) {
      fs.copyFileSync(oSrc, oDest);
      filesToDeleteFromPppp.push(oSrc);
    }
    const oUp = await uploadFileToSanity(fs.existsSync(oDest) ? oDest : oSrc, item.overall.dest);

    nirfSubmissions.push({
      _key: `nirf_${idx + 1}`,
      year: item.year,
      collegeDataUrl: cUp.url,
      managementDataUrl: mUp.url,
      overallDataUrl: oUp.url,
    });
  }

  // 9. Standard RTI Documents & Members
  const rtiMembers = [
    { _key: "rti_1", sNo: 1, name: "Dr. Sr. Fatima Rani P", designation: "Correspondent", role: "Chairperson / First Appellate Authority", mobile: "8978012987" },
    { _key: "rti_2", sNo: 2, name: "Sr. Sandhya Thumma", designation: "Principal", role: "Member", mobile: "9347238194" },
    { _key: "rti_3", sNo: 3, name: "Mr. G. Bala Show Reddy", designation: "Physical Director", role: "Nodal Officer / Public Information Officer (PIO)", mobile: "9959085038" },
    { _key: "rti_4", sNo: 4, name: "Mrs. R. Sharon Rose", designation: "Vice Principal & IQAC Coordinator", role: "Member", mobile: "9948686170" },
    { _key: "rti_5", sNo: 5, name: "Sr. Margaret Priyanka", designation: "Administrator", role: "Member / Asst. Public Information Officer (PIO)", mobile: "7981468359" },
  ];

  // Upload existing RTI PDFs if in public/documents
  const rtiDoc1Src = path.join(PUBLIC_DOCS, "RTI_Act_2005.pdf");
  const rtiDoc2Src = path.join(PUBLIC_DOCS, "RTI_Office_Order.pdf");
  const rtiDoc1Up = fs.existsSync(rtiDoc1Src) ? await uploadFileToSanity(rtiDoc1Src, "RTI_Act_2005.pdf") : { url: "https://cdn.sanity.io/files/fhjwqub5/production/32a3d5b540315384535c90682d86a0b23c71d808.pdf", assetId: "" };
  const rtiDoc2Up = fs.existsSync(rtiDoc2Src) ? await uploadFileToSanity(rtiDoc2Src, "RTI_Office_Order.pdf") : { url: "https://cdn.sanity.io/files/fhjwqub5/production/cd25e5f7d45a56b103d932b451c31b914238be8b.pdf", assetId: "" };

  const rtiDocuments = [
    {
      _key: "rti_doc_1",
      title: "Official Gazette / Government Notification – Right to Information Act, 2005",
      description: "The complete Right to Information Act, 2005 enacted by the Parliament of India, setting out the practical regime of right to information for citizens to secure access to information under the control of public authorities.",
      fileUrl: rtiDoc1Up.url,
      ...(rtiDoc1Up.assetId ? { file: { _type: "file", asset: { _type: "reference", _ref: rtiDoc1Up.assetId } } } : {})
    },
    {
      _key: "rti_doc_2",
      title: "RTI Committee / Authority Constitution Order",
      description: "Official administrative office order of St. Ann's College for Women designating the First Appellate Authority, Public Information Officer (PIO), and Assistant PIO to ensure adherence to statutory disclosure standards.",
      fileUrl: rtiDoc2Up.url,
      ...(rtiDoc2Up.assetId ? { file: { _type: "file", asset: { _type: "reference", _ref: rtiDoc2Up.assetId } } } : {})
    },
  ];

  // 10. Regulatory Compliance Documents
  const regulatoryComplianceDocs = [
    { _key: "reg_aicte", code: "aicte", title: "AICTE Compliance", description: "Relevant compliance information and documents relating to AICTE requirements are provided wherever applicable.", fileUrl: aicteApprovals[0]?.fileUrl || "/documents/DefaultFile_1.pdf" },
    { _key: "reg_ugc", code: "ugc", title: "UGC Compliance", description: "Applicable UGC regulations, guidelines, declarations and compliance-related information are maintained and made available for reference.", fileUrl: ugcDocuments[0]?.fileUrl || "/documents/DefaultFile_1.pdf" },
    { _key: "reg_apsche", code: "apsche", title: "APSCHE Compliance", description: "Relevant APSCHE-related compliance information, orders and institutional submissions are provided as applicable.", fileUrl: apscheOrders[0]?.fileUrl || "/documents/DefaultFile_1.pdf" },
    { _key: "reg_other", code: "other", title: "Other Statutory / Regulatory Compliance", description: "Other compliance documents, declarations and information required by competent government, statutory and regulatory authorities are provided wherever applicable.", fileUrl: "/documents/DefaultFile_1.pdf" },
  ];

  // 11. Disclosure Archives Matrix
  const disclosureArchives = [
    { _key: "arc_1", year: "2025–2026", mandatoryDisclosuresUrl: aicteApprovals[1]?.fileUrl || "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: apscheOrders[0]?.fileUrl || "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: financialDocuments[0]?.fileUrl || "/documents/DefaultFile_1.pdf" },
    { _key: "arc_2", year: "2024–2025", mandatoryDisclosuresUrl: aicteApprovals[2]?.fileUrl || "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: apscheOrders[1]?.fileUrl || "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: financialDocuments[1]?.fileUrl || "/documents/DefaultFile_1.pdf" },
    { _key: "arc_3", year: "2023–2024", mandatoryDisclosuresUrl: aicteApprovals[3]?.fileUrl || "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: apscheOrders[2]?.fileUrl || "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: financialDocuments[2]?.fileUrl || "/documents/DefaultFile_1.pdf" },
    { _key: "arc_4", year: "2022–2023", mandatoryDisclosuresUrl: aicteApprovals[4]?.fileUrl || "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: apscheOrders[3]?.fileUrl || "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: "/documents/DefaultFile_1.pdf" },
    { _key: "arc_5", year: "2021–2022", mandatoryDisclosuresUrl: aicteApprovals[5]?.fileUrl || "/documents/DefaultFile_1.pdf", complianceDocumentsUrl: apscheOrders[4]?.fileUrl || "/documents/DefaultFile_1.pdf", annualReportUrl: "/documents/DefaultFile_1.pdf", statutoryReportsUrl: "/documents/DefaultFile_1.pdf", policiesUrl: "/documents/DefaultFile_1.pdf" },
  ];

  // 12. Create document payload
  const mandatoryDoc = {
    _id: "mandatory-disclosures-singleton",
    _type: "mandatoryDisclosures",
    title: "Mandatory Disclosures & Compliance",
    lastUpdated: new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
    verifiedBy: "Principal / IQAC Coordinator",
    aicteApprovals,
    ugcDocuments,
    cceOrders,
    apscheOrders,
    anuAffiliations,
    aisheReports,
    nirfSubmissions,
    regulatoryComplianceDocs,
    financialDocuments,
    annualReports: [
      { _key: "ar_1", year: "2025–2026", title: "Annual Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "ar_2", year: "2024–2025", title: "Annual Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "ar_3", year: "2023–2024", title: "Annual Report 2023–2024", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "ar_4", year: "2022–2023", title: "Annual Report 2022–2023", fileUrl: "/documents/DefaultFile_1.pdf" },
      { _key: "ar_5", year: "2021–2022", title: "Annual Report 2021–2022", fileUrl: "/documents/DefaultFile_1.pdf" },
    ],
    disclosureArchives,
    rtiMembers,
    rtiDocuments,
  };

  console.log("\n--- Saving Mandatory Disclosures Singleton to Sanity ---");
  const result = await client.createOrReplace(mandatoryDoc);
  console.log(`✓ Document saved successfully! Document ID: ${result._id}`);

  // Verify by fetching
  console.log("\n--- Verifying Sanity Fetch ---");
  const verified = await client.fetch(`*[_type == "mandatoryDisclosures" && _id == "mandatory-disclosures-singleton"][0]`);
  if (!verified) {
    throw new Error("Verification failed: Could not fetch created document!");
  }
  console.log("✓ Verification successful! Document fetched with fields:");
  console.log(`  - aicteApprovals: ${verified.aicteApprovals?.length || 0}`);
  console.log(`  - apscheOrders: ${verified.apscheOrders?.length || 0}`);
  console.log(`  - cceOrders: ${verified.cceOrders?.length || 0}`);
  console.log(`  - ugcDocuments: ${verified.ugcDocuments?.length || 0}`);
  console.log(`  - anuAffiliations: ${verified.anuAffiliations?.length || 0}`);
  console.log(`  - aisheReports: ${verified.aisheReports?.length || 0}`);
  console.log(`  - nirfSubmissions: ${verified.nirfSubmissions?.length || 0}`);
  console.log(`  - financialDocuments: ${verified.financialDocuments?.length || 0}`);

  // Now delete uploaded files from pppp/
  console.log(`\n--- Removing categorized/uploaded files from pppp/ (${filesToDeleteFromPppp.length} files) ---`);
  let deletedCount = 0;
  for (const f of filesToDeleteFromPppp) {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log(`  Removed: ${path.basename(f)}`);
      deletedCount++;
    }
  }
  console.log(`✓ Successfully removed ${deletedCount} files from pppp/!`);

  // Check what remains in pppp
  const remainingInPppp = fs.existsSync(PPPP_DIR) ? fs.readdirSync(PPPP_DIR) : [];
  console.log(`\nRemaining files in pppp/ (${remainingInPppp.length}):`, remainingInPppp);

  console.log("\n🎉 ALL DONE! Mandatory Disclosures uploaded to Sanity & Synced!");
}

run().catch((err) => {
  console.error("FATAL ERROR during sync:", err);
  process.exit(1);
});
