const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// Load .env variables
const envPath = path.join(__dirname, "../.env");
let SANITY_WRITE_TOKEN = "";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      if (key === "SANITY_WRITE_TOKEN") {
        SANITY_WRITE_TOKEN = value;
      }
    }
  });
}

const DEFAULT_TOKEN =
  "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";
const token = SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

const docsDir = path.join(__dirname, "../public/documents/student-support");

async function main() {
  console.log("🚀 Starting Student Support PDF sync to Sanity CDN...");

  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".pdf"));
  console.log(`📁 Found ${files.length} PDF files in public/documents/student-support/`);

  const assetMap = {};

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const filePath = path.join(docsDir, filename);
    console.log(`[${i + 1}/${files.length}] Uploading: ${filename}...`);

    try {
      const stream = fs.createReadStream(filePath);
      const asset = await client.assets.upload("file", stream, {
        filename: filename,
        contentType: "application/pdf",
      });
      assetMap[filename] = asset.url;
      console.log(`   ✅ Uploaded -> ${asset.url}`);
    } catch (err) {
      console.error(`   ❌ Failed uploading ${filename}:`, err.message);
      assetMap[filename] = `/documents/student-support/${encodeURIComponent(filename)}`;
    }
  }

  // Construct the updated portal data structure
  const portalData = {
    header: {
      badge: "7. Student Support & Services",
      title: "Student Support Services",
      tagline: "Supporting Every Student, Empowering Every Journey",
      description:
        "Through these support and welfare mechanisms, St. Ann’s College for Women strives to ensure that every student receives guidance, care, protection, equal opportunity and the support needed to achieve academic success and holistic development.",
    },
    welfareServices: {
      id: "sec-welfare-services",
      roman: "I",
      title: "Student Support & Welfare Services",
      description:
        "St. Ann’s College for Women is committed to providing a safe, inclusive, supportive and student-friendly campus environment. The institution has established various support systems and welfare mechanisms to address the academic, personal, social and developmental needs of students. These initiatives promote student well-being, equity, dignity, safety, effective grievance redressal and holistic development.",
      items: [
        {
          id: "sec-anti-ragging",
          slug: "anti-ragging",
          number: "1",
          title: "Anti-Ragging Committee",
          tagline: "Committed to a Safe, Respectful and Ragging-Free Campus",
          description:
            "The Anti-Ragging Committee works towards maintaining a ragging-free campus and creating awareness among students about the prevention of ragging. The Committee undertakes preventive measures, sensitization programmes and appropriate action in accordance with applicable regulations.",
          committeePdf: assetMap["1.Anti Ragging COmmittee.pdf"] || "/documents/student-support/1.Anti Ragging COmmittee.pdf",
          policyPdf: assetMap["1.Anti Ragging Policy.pdf"] || "/documents/student-support/1.Anti Ragging Policy.pdf",
          formUrl: "",
          formLabel: "Anti-Ragging Complaint Form",
          annualReports: [
            {
              year: "2026–2027",
              title: "Anti-Ragging Report Final 2026–2027",
              fileUrl: assetMap["Anti Ragging Report Final 2026-2027.pdf"] || "/documents/student-support/Anti Ragging Report Final 2026-2027.pdf",
            },
            {
              year: "2025–2026",
              title: "Anti-Ragging Annual Report 2025–2026",
              fileUrl: assetMap["Anti Ragging Report 2025-2026.pdf"] || "/documents/student-support/Anti Ragging Report 2025-2026.pdf",
            },
            {
              year: "2024–2025",
              title: "Anti-Ragging Annual Report 2024–2025",
              fileUrl: assetMap["Anti Ragging Report 2024-2025.pdf"] || "/documents/student-support/Anti Ragging Report 2024-2025.pdf",
            },
          ],
        },
        {
          id: "sec-grievance-redressal",
          slug: "grievance-redressal",
          number: "2",
          title: "Grievance Redressal Cell / Ombudsperson",
          tagline: "Fair, Confidential and Time-Bound Dispute Resolution",
          description:
            "The Grievance Redressal Cell provides an accessible mechanism for students to submit grievances, complaints and suggestions related to academic, administrative and other student-support matters. Grievances are addressed in a fair, confidential and time-bound manner in accordance with institutional and regulatory provisions. The Ombudsperson mechanism is made available as per applicable university/regulatory guidelines.",
          committeePdf: assetMap["3.Grievance Reddressal Committee.pdf"] || "/documents/student-support/3.Grievance Reddressal Committee.pdf",
          policyPdf: assetMap["3.Greaivance Reddrassal Policy.pdf"] || "/documents/student-support/3.Greaivance Reddrassal Policy.pdf",
          formUrl: "",
          formLabel: "Online Grievance Submission Form",
          annualReports: [
            {
              year: "2025–2026",
              title: "Grievance Redressal Report 2025–2026",
              fileUrl: assetMap["GRIEVANCE REDRESSAL  Report 2025-2026.pdf"] || "/documents/student-support/GRIEVANCE REDRESSAL  Report 2025-2026.pdf",
            },
            {
              year: "2024–2025",
              title: "Grievance Redressal Report 2024–2025",
              fileUrl: assetMap["GRIEVANCE REDRESSAL Report 2024-2025.pdf"] || "/documents/student-support/GRIEVANCE REDRESSAL Report 2024-2025.pdf",
            },
          ],
        },
        {
          id: "sec-internal-complaints",
          slug: "internal-complaints",
          number: "3",
          title: "Internal Complaints Committee (ICC)",
          tagline: "Prevention of Sexual Harassment & Gender Dignity on Campus",
          description:
            "The Internal Complaints Committee promotes a safe and respectful campus environment and addresses complaints relating to sexual harassment in accordance with applicable statutory provisions. The Committee also undertakes awareness and sensitization programmes to promote dignity, equality and a culture of respect.",
          committeePdf: assetMap["4.ICC Committee.pdf"] || "/documents/student-support/4.ICC Committee.pdf",
          policyPdf: assetMap["2.Internal Complaints Committee (ICC) & POSH Policy.pdf"] || "/documents/student-support/2.Internal Complaints Committee (ICC) & POSH Policy.pdf",
          formUrl: "",
          formLabel: "ICC Confidential Complaint Form",
          annualReports: [
            {
              year: "2025–2026",
              title: "ICC Annual Activity Report 2025–2026",
              fileUrl: assetMap["IIC  Report 2025-26.pdf"] || "/documents/student-support/IIC  Report 2025-26.pdf",
            },
            {
              year: "2024–2025",
              title: "ICC Annual Activity Report 2024–2025",
              fileUrl: assetMap["IIC Report  2024-2025.pdf"] || "/documents/student-support/IIC Report  2024-2025.pdf",
            },
          ],
        },
        {
          id: "sec-women-empowerment",
          slug: "women-empowerment",
          number: "4",
          title: "Women Empowerment Cell",
          tagline: "Confidence Building, Leadership & Holistic Development",
          description:
            "The Women Empowerment Cell works towards the empowerment, confidence-building and holistic development of women students. It organizes awareness programmes, capacity-building activities, counselling support and other initiatives that encourage leadership, self-reliance, safety and equal opportunities.",
          committeePdf: assetMap["Woment Empowerment COmmittee.pdf"] || "/documents/student-support/Woment Empowerment COmmittee.pdf",
          policyPdf: assetMap["Woment Empowerment Cell Policy 2026.pdf"] || "/documents/student-support/Woment Empowerment Cell Policy 2026.pdf",
          formUrl: "",
          annualReports: [
            {
              year: "2025–2026",
              title: "WEC Activity Report 2025–2026",
              fileUrl: assetMap["WEC  Report 2025-2026.pdf"] || "/documents/student-support/WEC  Report 2025-2026.pdf",
            },
            {
              year: "2024–2025",
              title: "WEC Activity Report 2024–2025",
              fileUrl: assetMap["WEC Report 2024-2025.pdf"] || "/documents/student-support/WEC Report 2024-2025.pdf",
            },
          ],
        },
        {
          id: "sec-equal-opportunity",
          slug: "equal-opportunity",
          number: "5",
          title: "Equal Opportunity Cell (SC/ST/OBC/Minority/General)",
          tagline: "Social Inclusion, Diversity & Equitable Opportunity",
          description:
            "The Equal Opportunity Cell oversees the effective implementation of policies, schemes and programmes for students belonging to SC, ST, OBC, minority and other marginalized groups. The Cell promotes diversity, equity and inclusive participation across all academic and institutional activities.",
          committeePdf: assetMap["6.EOC SC ST Minority COmmittee.pdf"] || "/documents/student-support/6.EOC SC ST Minority COmmittee.pdf",
          policyPdf: assetMap["6.EOC SC ST Minority Policy.pdf"] || "/documents/student-support/6.EOC SC ST Minority Policy.pdf",
          formUrl: "",
          annualReports: [
            {
              year: "2026–2027",
              title: "EOC Action Plan 2026–2027",
              fileUrl: assetMap["EOC Report Action Plan 2026-2027.pdf"] || "/documents/student-support/EOC Report Action Plan 2026-2027.pdf",
            },
            {
              year: "2025–2026",
              title: "EOC Annual Activity Report 2025–2026",
              fileUrl: assetMap["EOC Report -2025-2026.pdf"] || "/documents/student-support/EOC Report -2025-2026.pdf",
            },
            {
              year: "2024–2025",
              title: "EOC Annual Activity Report 2024–2025",
              fileUrl: assetMap["EOC Report 2024-2025.pdf"] || "/documents/student-support/EOC Report 2024-2025.pdf",
            },
          ],
        },
        {
          id: "sec-student-counselling",
          slug: "student-counselling",
          number: "6",
          title: "Student Counselling & Wellness Cell",
          tagline: "Mental Well-Being, Emotional Support & Holistic Growth",
          description:
            "The Student Counselling and Wellness Cell provides confidential professional and peer counselling support to help students cope with academic stress, emotional challenges, career dilemmas and personal issues. The Cell promotes psychological well-being, mindfulness, emotional resilience and positive mental health.",
          committeePdf: assetMap["9.Student Counselling COmmittee.pdf"] || "/documents/student-support/9.Student Counselling COmmittee.pdf",
          policyPdf: assetMap["9.Student Welfare,Counselling & Welness Polciy.pdf"] || "/documents/student-support/9.Student Welfare,Counselling & Welness Polciy.pdf",
          formUrl: "",
          formLabel: "Book Counselling Session",
          annualReports: [
            {
              year: "2025–2026",
              title: "Counselling Cell Report 2025–2026",
              fileUrl: assetMap["Students COunselling Report 2025-2026.pdf"] || "/documents/student-support/Students COunselling Report 2025-2026.pdf",
            },
            {
              year: "2024–2025",
              title: "Counselling Cell Report 2024–2025",
              fileUrl: assetMap["Student COunse Report 2024-2025.pdf"] || "/documents/student-support/Student COunse Report 2024-2025.pdf",
            },
          ],
        },
        {
          id: "sec-mentor-mentee",
          slug: "mentor-mentee",
          number: "7",
          title: "Mentor–Mentee System",
          tagline: "Continuous Academic Monitoring, Guidance & Personal Care",
          description:
            "The Mentor–Mentee System provides continuous academic and personal guidance to students. Faculty mentors monitor students' academic progress, attendance, participation and overall development, identify areas requiring support and guide students towards appropriate academic, career and welfare resources.",
          committeePdf: assetMap["Mentor & Mentee Committee.pdf"] || "/documents/student-support/Mentor & Mentee Committee.pdf",
          policyPdf: assetMap["Mentor & Mentee Committee Guidelines.pdf"] || "/documents/student-support/Mentor & Mentee Committee Guidelines.pdf",
          formUrl: "",
          annualReports: [
            {
              year: "2026–2027",
              title: "Mentor Mentee Action Plan 2026–2027",
              fileUrl: assetMap["Mentor Mentee Action Plan 2026-2027.pdf"] || "/documents/student-support/Mentor Mentee Action Plan 2026-2027.pdf",
            },
            {
              year: "2025–2026",
              title: "Mentor-Mentee Activity Report 2025–2026",
              fileUrl: assetMap["Mentor-Mentee Activity Report 2025-2026.pdf"] || "/documents/student-support/Mentor-Mentee Activity Report 2025-2026.pdf",
            },
            {
              year: "2024–2025",
              title: "Mentor-Mentee Annual Report 2024–2025",
              fileUrl: assetMap["Mentor-Mentee Annual  Report 2024-2025.pdf"] || "/documents/student-support/Mentor-Mentee Annual  Report 2024-2025.pdf",
            },
          ],
        },
        {
          id: "sec-parent-association",
          slug: "parent-association",
          number: "8",
          title: "Parent Association",
          tagline: "Institutional Partnership & Constructive Stakeholder Engagement",
          description:
            "The Parent Association facilitates meaningful interaction and collaboration between parents, students and the institution. It provides a platform for communication, feedback and constructive engagement concerning students' academic progress, welfare and overall development, thereby strengthening the partnership between the College and parents.",
          committeePdf: assetMap["Parents Association COmmittee.pdf"] || "/documents/student-support/Parents Association COmmittee.pdf",
          policyPdf: assetMap["Parents Association Policy.pdf"] || "/documents/student-support/Parents Association Policy.pdf",
          formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd2pZ_9yfBtOIDLiB9iKgq-6CTU38QMNPN4eUbvfomF-n21fQ/viewform",
          formLabel: "Parent Feedback Form",
          annualReports: [
            {
              year: "2025–2026",
              title: "Parent Association Report 2025–2026",
              fileUrl: assetMap["Parents Assocaiton Committee Report 2025-2026.pdf"] || "/documents/student-support/Parents Assocaiton Committee Report 2025-2026.pdf",
            },
            {
              year: "2024–2025",
              title: "Parent Association Report 2024–2025",
              fileUrl: assetMap["Parents Associaiton COmmittee Report 2024-2025.pdf"] || "/documents/student-support/Parents Associaiton COmmittee Report 2024-2025.pdf",
            },
          ],
        },
        {
          id: "sec-scholarships-welfare",
          slug: "scholarships-welfare",
          number: "9",
          title: "Student Welfare & Financial Support",
          tagline: "Government Scholarships, Freeships & Financial Assistance",
          description:
            "St. Ann’s College for Women supports students through scholarships, financial assistance and welfare schemes to promote equitable access to education and student well-being.",
          policyPdf: assetMap["Scholarships,Freeships & Financial Assistance Polciy.pdf"] || "/documents/student-support/Scholarships,Freeships & Financial Assistance Polciy.pdf",
          formUrl: "",
          formLabel: "Scholarship Enquiry / Application",
          annualReports: [],
        },
        {
          id: "sec-divyangjan-support",
          slug: "divyangjan-support",
          number: "10",
          title: "Support for Divyangjan Students (Persons with Disabilities)",
          tagline: "Accessible Campus, Assistive Facilities & Equal Inclusion",
          description:
            "The institution provides barrier-free infrastructure, assistive facilities, learning resources and dedicated guidance to ensure the comfort, safety and academic success of differently-abled students.",
          policyPdf: "/documents/DefaultFile_1.pdf",
          formUrl: "",
          annualReports: [],
        },
        {
          id: "sec-student-feedback",
          slug: "student-feedback",
          number: "11",
          title: "Student Feedback & Satisfaction Mechanism",
          tagline: "Student Voice, Stakeholder Suggestions & Continuous Improvement",
          description:
            "Feedback is collected regularly from students regarding curriculum, teaching-learning, evaluation, infrastructure, support services and campus life to drive continuous institutional enhancement.",
          policyPdf: "/documents/DefaultFile_1.pdf",
          formUrl: "",
          formLabel: "Student Satisfaction Survey (SSS)",
          annualReports: [],
        },
      ],
    },
  };

  console.log("💾 Writing studentSupportPortal singleton document to Sanity...");
  const doc = {
    _id: "student-support-portal-singleton",
    _type: "studentSupportPortal",
    title: "Student Support Services Portal Data",
    lastUpdated: new Date().toISOString(),
    portalData: portalData,
  };

  const result = await client.createOrReplace(doc);
  console.log("✨ Successfully synchronized to Sanity!", result._id);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
