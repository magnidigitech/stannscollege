const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/);
      if (match) {
        let value = match[2].trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[match[1].trim()] = value;
      }
    });
  }
}

loadEnv();

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Error: SANITY_WRITE_TOKEN not found in .env");
  process.exit(1);
}

const client = createClient({
  projectId: 'fhjwqub5',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: token,
  useCdn: false
});

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/^(dr|mr|mrs|ms|miss|prof|sr)\.?\s+/gi, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const NON_TEACHING_DATA = [
  // Administrative Staff
  { sNo: 1, name: "Mr. B. Koteswara Rao", designation: "Office Superintendent", qualification: "B.Com", dateOfJoining: "01-07-1998", experience: "28", staffType: "non-teaching", department: "Administration" },
  { sNo: 2, name: "Mrs. K. Mary Rani", designation: "Senior Assistant & NCC Officer", qualification: "B.A., B.P.Ed", dateOfJoining: "15-06-2002", experience: "24", staffType: "non-teaching", department: "Administration" },
  { sNo: 3, name: "Mr. K. Venkateswara Rao", designation: "Junior Assistant", qualification: "B.Com", dateOfJoining: "10-06-2005", experience: "21", staffType: "non-teaching", department: "Administration" },
  { sNo: 4, name: "Mrs. P. Vani Kumari", designation: "Typist / Data Entry Operator", qualification: "B.Sc, DCA", dateOfJoining: "01-06-2008", experience: "18", staffType: "non-teaching", department: "Administration" },
  { sNo: 5, name: "Mr. D. Joseph", designation: "Record Assistant", qualification: "Intermediate", dateOfJoining: "01-06-2012", experience: "14", staffType: "non-teaching", department: "Administration" },
  { sNo: 6, name: "Mrs. M. Anitha", designation: "Junior Assistant / Accounts Clerk", qualification: "M.Com", dateOfJoining: "01-06-2016", experience: "10", staffType: "non-teaching", department: "Administration" },

  // Technical & Laboratory Staff
  { sNo: 1, name: "Mr. G. Nagaraju", designation: "Computer Lab Assistant / System Administrator", qualification: "B.Sc (Comp), MCSE", dateOfJoining: "01-06-2006", experience: "20", staffType: "technical", department: "Technical & Laboratory" },
  { sNo: 2, name: "Mrs. B. Swapna", designation: "Chemistry Lab Technician", qualification: "B.Sc (Chemistry)", dateOfJoining: "10-06-2010", experience: "16", staffType: "technical", department: "Technical & Laboratory" },
  { sNo: 3, name: "Mr. K. Ramesh", designation: "Physics Lab Assistant", qualification: "B.Sc (Physics)", dateOfJoining: "01-06-2012", experience: "14", staffType: "technical", department: "Technical & Laboratory" },
  { sNo: 4, name: "Mrs. M. Prameela", designation: "Biotechnology & Microbiology Lab Technician", qualification: "B.Sc (Biotech)", dateOfJoining: "01-06-2014", experience: "12", staffType: "technical", department: "Technical & Laboratory" },
  { sNo: 5, name: "Mr. T. Srinivas", designation: "Botany Lab Assistant", qualification: "B.Sc (BZC)", dateOfJoining: "01-06-2015", experience: "11", staffType: "technical", department: "Technical & Laboratory" },
  { sNo: 6, name: "Mr. P. Rajesh", designation: "Hardware & Network Support Technician", qualification: "Diploma (ECE), CCNA", dateOfJoining: "01-06-2018", experience: "8", staffType: "technical", department: "Technical & Laboratory" },
  { sNo: 7, name: "Mrs. S. Lakshmi", designation: "Digital Library & Audio-Visual Assistant", qualification: "B.Li.Sc", dateOfJoining: "01-06-2020", experience: "6", staffType: "technical", department: "Technical & Laboratory" },

  // Support Staff
  { sNo: 1, name: "Mr. V. Subba Rao", designation: "Head Attender / Office Attendant", qualification: "Secondary Education", dateOfJoining: "01-07-1998", experience: "28", staffType: "support", department: "Support Staff" },
  { sNo: 2, name: "Mrs. K. Mariamma", designation: "Library Attender", qualification: "Secondary Education", dateOfJoining: "15-06-2004", experience: "22", staffType: "support", department: "Support Staff" },
  { sNo: 3, name: "Mr. G. Raju", designation: "Lab Attender", qualification: "Secondary Education", dateOfJoining: "01-06-2008", experience: "18", staffType: "support", department: "Support Staff" },
  { sNo: 4, name: "Mrs. D. Ratnam", designation: "Campus Caretaker / Helper", qualification: "Secondary Education", dateOfJoining: "01-06-2012", experience: "14", staffType: "support", department: "Support Staff" },
  { sNo: 5, name: "Mr. B. Yedukondalu", designation: "Campus Electrician / Maintenance", qualification: "ITI (Electrical)", dateOfJoining: "01-06-2015", experience: "11", staffType: "support", department: "Support Staff" },
  { sNo: 6, name: "Mrs. P. Mary", designation: "Support Staff / Multi-Tasking Staff", qualification: "Secondary Education", dateOfJoining: "01-06-2017", experience: "9", staffType: "support", department: "Support Staff" },
  { sNo: 7, name: "Mr. K. David", designation: "Security In-Charge", qualification: "Ex-Serviceman / Security Training", dateOfJoining: "01-06-2019", experience: "7", staffType: "support", department: "Support Staff" },
  { sNo: 8, name: "Mrs. T. Padma", designation: "Garden & Environmental Maintenance Helper", qualification: "Secondary Education", dateOfJoining: "01-06-2021", experience: "5", staffType: "support", department: "Support Staff" },
];

async function seed() {
  console.log(`Seeding ${NON_TEACHING_DATA.length} non-teaching staff to Sanity...`);
  
  for (let i = 0; i < NON_TEACHING_DATA.length; i++) {
    const item = NON_TEACHING_DATA[i];
    const slug = slugify(item.name) || `staff-${i + 1}`;
    const docId = `non-teaching-${slug}`;

    const doc = {
      _id: docId,
      _type: 'facultyProfileNew',
      facultyName: item.name,
      slug: { _type: 'slug', current: slug },
      designation: item.designation,
      department: item.department,
      staffType: item.staffType,
      highestQualification: item.qualification || '',
      dateOfJoining: item.dateOfJoining || '',
      totalExperience: item.experience || '',
      facultyStatus: 'active',
      showOnWebsite: true,
      sNo: item.sNo,
      displayOrder: item.sNo,
    };

    await client.createOrReplace(doc);
    console.log(`[${i + 1}/${NON_TEACHING_DATA.length}] Saved: ${item.name} (${item.staffType})`);
  }

  console.log("Non-teaching staff seed completed successfully!");
}

seed().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
