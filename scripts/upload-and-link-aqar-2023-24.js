const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@sanity/client');

require('dotenv').config({ path: '.env' });

const PROJECT_ID = 'fhjwqub5';
const DATASET = 'production';
const QA_DOC_ID = 'quality-assurance-portal-singleton';
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('ERROR: SANITY_WRITE_TOKEN not found in environment.');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-03-01',
  token: token,
  useCdn: false,
});

const CACHE_FILE = path.join(__dirname, 'aqar-2023-24-upload-cache.json');
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    cache = {};
  }
}

function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
}

function getFileHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha1').update(buf).digest('hex');
}

async function uploadFileWithRetry(filePath, fileName, retries = 3) {
  const hash = getFileHash(filePath);
  if (cache[hash]) {
    console.log(`  [CACHE HIT] ${fileName} -> ${cache[hash]}`);
    return cache[hash];
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`  [UPLOADING] (${attempt}/${retries}) ${fileName} ...`);
      const stream = fs.createReadStream(filePath);
      const asset = await client.assets.upload('file', stream, {
        filename: fileName
      });
      cache[hash] = asset.url;
      saveCache();
      console.log(`  [UPLOAD SUCCESS] -> ${asset.url}`);
      return asset.url;
    } catch (err) {
      console.warn(`  [UPLOAD FAILED] Attempt ${attempt}: ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
}

function generateKey() {
  return crypto.randomBytes(6).toString('hex');
}

const BASE_DIR = path.join(process.cwd(), 'ignore folder', 'WEB-AQAR-2023-24');

// Target items to upload and map
const uploads = [
  // Metric 7.3.1
  {
    targetMetric: '7.3.1',
    label: 'Institutional Distinctiveness - Rural Women Development (Final Report)',
    relPath: 'MISC/CRITERION-7/7-CRITERIAN-FINAL - word&pdf/7.3/7.3.1 Rural women development-final.pdf'
  },
  {
    targetMetric: '7.3.1',
    label: 'Institutional Distinctiveness - Rural Women Development (Website Document)',
    relPath: 'MISC/CRITERION-7/7-CRITERIAN-FINAL - word&pdf/7.3/7.3.1 Rural women development-WEBSITE.pdf'
  },

  // Metric 7.2.1
  {
    targetMetric: '7.2.1',
    label: 'Best Practice 1 - Institutional Best Practice Report',
    relPath: 'MISC/CRITERION-7/7-CRITERIAN-FINAL - word&pdf/7.2/7.2.1 Best Practice1_organized.pdf'
  },
  {
    targetMetric: '7.2.1',
    label: 'Best Practice 2 - Institutional Best Practice Report',
    relPath: 'MISC/CRITERION-7/7-CRITERIAN-FINAL - word&pdf/7.2/7.2.1 Best Practice2_organized.pdf'
  },

  // Metric 6.5.2
  {
    targetMetric: '6.5.2',
    label: 'Minutes of IQAC Meetings 2023-24',
    relPath: 'MISC/CRITERION-VI-2023-24/6.5.2 Qnm/6.5.2 Link to Minute of IQAC meetings, hosted on HEI website/6.5.2 IQAC Meeting Minutes 2023-24.pdf'
  },
  {
    targetMetric: '6.5.2',
    label: 'AAA & NIRF Reports with Follow-up Actions 2023-24',
    relPath: 'MISC/CRITERION-VI-2023-24/6.5.2 Qnm/6.5.2 NIRF report ,AAA report and details on fallow up Actions/6.5.2 AAA Reports With fallowup actions 2023-24.pdf'
  },
  {
    targetMetric: '6.5.2',
    label: 'Quality Audit Reports & Institutional Review',
    relPath: 'MISC/CRITERION-VI-2023-24/6.5.2 Qnm/6.5.2 Provide Links for any other relevant document to support the claim (if any)/6.5.2 Any Other Quality audit reports.pdf'
  },

  // Metric 6.3.3
  {
    targetMetric: '6.3.3',
    label: 'Annual Reports Highlighting Programmes Undertaken by Teachers',
    relPath: 'MISC/CRITERION-VI-2023-24/6.3.3 Qnm/6.3.3 Annual Reports highiliting the programmes under taken by the teachers/6.3.3 Annual report Highlighiting the programmes under taken by the teachers.pdf'
  },
  {
    targetMetric: '6.3.3',
    label: 'Copy of Certificates Attended by Teachers',
    relPath: 'MISC/CRITERION-VI-2023-24/6.3.3 Qnm/6.3.3 copy of certificates of the program attended by teachers/6.3.3 Copy of Certificates Attended by the teachers.pdf'
  },
  {
    targetMetric: '6.3.3',
    label: 'List of Faculty Attended Professional Development Programmes',
    relPath: 'MISC/CRITERION-VI-2023-24/6.3.3 Qnm/6.3.3 Provide links for any other relevant document to support the claim( if Any)/6.3.3 List of Faculty Attended.pdf'
  },
  {
    targetMetric: '6.3.3',
    label: 'Professional Development Programmes - Data Template',
    relPath: 'CRITERION-6/6.3.4 Qnm/6.3.3 Details of teachers-data template.xlsx'
  },

  // Metric 5.2.3.1
  {
    targetMetric: '5.2.3.1',
    label: 'Qualifying Students - Additional Information',
    relPath: 'CRITERION-5/5.2.3/5.2.3 Any additional information.pdf'
  },
  {
    targetMetric: '5.2.3.1',
    label: 'Supporting Data for Students Qualifying in Competitive Exams',
    relPath: 'CRITERION-5/5.2.3/5.2.3 Upload supporting data.pdf'
  },
  {
    targetMetric: '5.2.3.1',
    label: 'Number of Students Qualifying - Data Template',
    relPath: 'CRITERION-5/5.2.3/5.2.3. Number of students qualifying-Data template.xlsx'
  },

  // Metric 4.2.2
  {
    targetMetric: '4.2.2',
    label: 'Details of Subscriptions for E-Resources (E-Journals, Databases)',
    relPath: 'MISC/WEB-AQAR-2023-24/CRITERION-4/4.2.2_2023-2024/4.2.2 UPLOAD ADDITIONAL INFORMATION.pdf'
  },

  // Metric 4.1.4
  {
    targetMetric: '4.1.4',
    label: 'Expenditure for Infrastructure Augmentation - Additional Information',
    relPath: 'CRITERION-4/4.1.4_2023-2024/4.1.4 UPLOAD ADDITIONAL  INFORMATION.pdf'
  },
  {
    targetMetric: '4.1.4',
    label: 'Audited Statement & Link for Additional Information',
    relPath: 'CRITERION-4/4.1.4_2023-2024/4.1.4  PROVIDE LINK FOR ADDITIONAL  INFORMATION.pdf'
  },

  // Metric 1.3.2
  {
    targetMetric: '1.3.2',
    label: 'APSCHE Internship Guidelines',
    relPath: 'MISC/1.3.2   2023-24/1.3.2 UPLOAD SUPPORTING DOCUMENTS/(1).1.3.2APSCHE Internship – Guidelines.pdf'
  },
  {
    targetMetric: '1.3.2',
    label: 'Percentage of Students Undertaking Project Work / Internship',
    relPath: 'MISC/1.3.2   2023-24/1.3.2 UPLOAD SUPPORTING DOCUMENTS/(2)1.3.2 Percentage of students under taking project work-2-3.pdf'
  },
  {
    targetMetric: '1.3.2',
    label: 'List of Students Who Undertook Projects & Internships with Place and Duration',
    relPath: 'MISC/1.3.2   2023-24/1.3.2 UPLOAD SUPPORTING DOCUMENTS/(3)1.3.2 List of Students who undertook ProjectsInternships with Place and Duration_organized_organized.pdf'
  },
  {
    targetMetric: '1.3.2',
    label: 'Details of Mentors & Mentees for Projects / Internships',
    relPath: 'MISC/1.3.2   2023-24/1.3.2 UPLOAD SUPPORTING DOCUMENTS/(5)1.3.2 Details Of Mentor & Mentees for the ProjectsInternships.pdf'
  },

  // Metric 1.3.3.1 (slot for DataTemplate)
  {
    targetMetric: '1.3.3.1.',
    matchLabel: 'DataTemplate',
    label: '- List of programmes and number of students undertaking project work/field work/ /internships (DataTemplate)',
    relPath: 'CRITERION-1-FINAL-2023-24/1.3.3/1.3.3-LIST OF PROGRAMS-DATA-TEMPLATE.xlsx'
  },

  // Metric 1.2.1
  {
    targetMetric: '1.2.1',
    label: 'Declaration of Programmes with Choice Based Credit System (CBCS) / Elective Course System',
    relPath: 'MISC/1.2.1  2023-24/1.2.1 To Whomsoever It May Concern.pdf'
  }
];

async function run() {
  console.log('=== Step 1: Uploading files to Sanity ===');
  const uploadResults = [];

  for (const item of uploads) {
    const fullPath = path.join(BASE_DIR, item.relPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`ERROR: File does not exist: ${fullPath}`);
      process.exit(1);
    }
    const fileName = path.basename(fullPath);
    const url = await uploadFileWithRetry(fullPath, fileName);
    uploadResults.push({
      ...item,
      fileName,
      url
    });
  }

  console.log('\n=== Step 2: Updating local quality-assurance-data.json ===');
  const dataPath = path.join(process.cwd(), 'src/components/quality-assurance/quality-assurance-data.json');
  const qaData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const rep = qaData.aqarReports.find(r => r.year === '2023-2024');
  if (!rep) {
    console.error('ERROR: AQAR report for 2023-2024 not found.');
    process.exit(1);
  }

  // 1. Ensure Criterion 7 has Section 7.3 and Metric 7.3.1
  const crit7 = rep.criteria.find(c => c.id === 7);
  if (!crit7) {
    console.error('ERROR: Criterion 7 not found in 2023-2024 report.');
    process.exit(1);
  }

  let sec73 = crit7.sections.find(s => s.number === '7.3');
  if (!sec73) {
    console.log('Adding Section 7.3 to Criterion 7...');
    sec73 = {
      number: '7.3',
      title: 'Key Indicator – 7.3 Institutional Distinctiveness',
      metrics: [
        {
          number: '7.3.1',
          title: 'Portray the performance of the Institution in one area distinctive to its priority and thrust within 200 words',
          documents: [],
          _key: 'crit7_sec73_met731'
        }
      ],
      _key: 'crit7_sec73'
    };
    crit7.sections.push(sec73);
  }

  // Also check if naacCycles[0] has 7.3.1 (we saw earlier it already does)

  // 2. Map and attach documents
  for (const res of uploadResults) {
    // Find metric across all criteria in 2023-2024 report
    let foundMetric = null;
    for (const c of rep.criteria) {
      for (const s of c.sections) {
        for (const m of s.metrics) {
          if (m.number.trim() === res.targetMetric.trim()) {
            foundMetric = m;
            break;
          }
        }
        if (foundMetric) break;
      }
      if (foundMetric) break;
    }

    if (!foundMetric) {
      console.warn(`⚠️ Warning: Metric ${res.targetMetric} not found in 2023-2024 report.`);
      continue;
    }

    if (res.matchLabel) {
      // Find document matching label substring
      const existingDoc = foundMetric.documents.find(d => d.label.includes(res.matchLabel));
      if (existingDoc) {
        existingDoc.documentUrl = res.url;
        console.log(`Updated existing document in Metric ${res.targetMetric}: "${existingDoc.label}" -> ${res.url}`);
      } else {
        foundMetric.documents.push({
          label: res.label,
          documentUrl: res.url,
          _key: generateKey()
        });
        console.log(`Added new document to Metric ${res.targetMetric}: "${res.label}"`);
      }
    } else {
      // Check if document with same URL or label already exists
      const alreadyHas = foundMetric.documents.some(d => d.documentUrl === res.url || d.label === res.label);
      if (!alreadyHas) {
        foundMetric.documents.push({
          label: res.label,
          documentUrl: res.url,
          _key: generateKey()
        });
        console.log(`Added document to Metric ${res.targetMetric}: "${res.label}"`);
      } else {
        console.log(`Document already present in Metric ${res.targetMetric}: "${res.label}"`);
      }
    }
  }

  // Save updated local json
  fs.writeFileSync(dataPath, JSON.stringify(qaData, null, 2), 'utf8');
  console.log('Successfully updated local quality-assurance-data.json!');

  console.log('\n=== Step 3: Syncing updated structure to Sanity QA Singleton ===');
  const sanityPayload = {
    _id: QA_DOC_ID,
    _type: 'qualityAssurancePortal',
    title: 'Quality Assurance & Accreditation Portal Data',
    lastUpdated: new Date().toISOString(),
    portalData: qaData
  };

  const syncRes = await client.createOrReplace(sanityPayload);
  console.log('Successfully synced to Sanity! Document ID:', syncRes._id, 'at', syncRes.lastUpdated);

  console.log('\n=== DONE: AQAR 2023-2024 updated and synchronized! ===');
}

run().catch(err => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
