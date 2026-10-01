export interface ProgrammeIntake {
  sNo: number;
  name: string;
  sanctionedIntake: number;
  convenerQuota: number;
  managementQuota: number;
  ewsQuota: number;
  aboutDocumentUrl?: string;
  brochureUrl?: string;
}

export interface EligibilityItem {
  sNo: number;
  programme: string;
  eligibilityCriteria: string;
  streamBadge?: string;
  preferredStream?: string;
}

export interface AdmissionYearlyRecord {
  year: string;
  affiliationDocUrl: string;
  affiliationDocTitle: string;
  sanctionedIntakeDocUrl: string;
  sanctionedIntakeDocTitle: string;
  admittedStudentsDocUrl: string;
  admittedStudentsDocTitle: string;
  categoryAdmissionsDocUrl: string;
  categoryAdmissionsDocTitle: string;
}

// ==========================================
// A. Programmes Offered - UG & PG Data
// ==========================================

export const UG_PROGRAMMES_INTAKE: ProgrammeIntake[] = [
  {
    sNo: 1,
    name: "B.Com. Honours-General",
    sanctionedIntake: 20,
    convenerQuota: 14,
    managementQuota: 6,
    ewsQuota: 2,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 2,
    name: "B.Com. Honours-Computer Applications",
    sanctionedIntake: 105,
    convenerQuota: 74,
    managementQuota: 31,
    ewsQuota: 11,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 3,
    name: "BCA Honours-Computer Applications",
    sanctionedIntake: 60,
    convenerQuota: 42,
    managementQuota: 18,
    ewsQuota: 6,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 4,
    name: "B.Sc. Honours -Computer Science",
    sanctionedIntake: 35,
    convenerQuota: 25,
    managementQuota: 10,
    ewsQuota: 4,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 5,
    name: "B.Sc. Honours -Artificial Intelligence",
    sanctionedIntake: 60,
    convenerQuota: 42,
    managementQuota: 18,
    ewsQuota: 6,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 6,
    name: "B.Sc. Honours -Mathematics",
    sanctionedIntake: 25,
    convenerQuota: 18,
    managementQuota: 7,
    ewsQuota: 3,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 7,
    name: "B.Sc. Honours -Physics",
    sanctionedIntake: 25,
    convenerQuota: 18,
    managementQuota: 7,
    ewsQuota: 3,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 8,
    name: "B.Sc. Honours -Statistics",
    sanctionedIntake: 25,
    convenerQuota: 18,
    managementQuota: 7,
    ewsQuota: 3,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 9,
    name: "B.Sc. Honours-Biotechnology",
    sanctionedIntake: 25,
    convenerQuota: 18,
    managementQuota: 7,
    ewsQuota: 3,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 10,
    name: "B.Sc. Honours -Microbiology",
    sanctionedIntake: 25,
    convenerQuota: 18,
    managementQuota: 7,
    ewsQuota: 3,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 11,
    name: "B.Sc. Honours-Chemistry",
    sanctionedIntake: 20,
    convenerQuota: 14,
    managementQuota: 6,
    ewsQuota: 2,
    aboutDocumentUrl: "/documents/admissions/ug-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
];

export const PG_PROGRAMMES_INTAKE: ProgrammeIntake[] = [
  {
    sNo: 1,
    name: "MCA – Master of Computer Applications",
    sanctionedIntake: 60,
    convenerQuota: 42,
    managementQuota: 18,
    ewsQuota: 6,
    aboutDocumentUrl: "/documents/admissions/pg-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
  {
    sNo: 2,
    name: "MBA – Master of Business Administration",
    sanctionedIntake: 60,
    convenerQuota: 42,
    managementQuota: 18,
    ewsQuota: 6,
    aboutDocumentUrl: "/documents/admissions/pg-admission-required-documents.pdf",
    brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf",
  },
];

// ==========================================
// B. Eligibility Criteria - UG & PG Data
// ==========================================

export const UG_ELIGIBILITY_CRITERIA: EligibilityItem[] = [
  {
    sNo: 1,
    programme: "B.Com. Honours – General/Computer Applications",
    eligibilityCriteria:
      "Candidates who have passed Intermediate (10+2) or equivalent examination from CEC, MEC, MPC, BiPC or Vocational streams are eligible. A Commerce background is preferred but not mandatory.",
    streamBadge: "CEC / MEC / MPC / BiPC / Vocational",
    preferredStream: "Commerce background is preferred but not mandatory",
  },
  {
    sNo: 2,
    programme: "BCA Honours – Computer Applications",
    eligibilityCriteria:
      "Candidates who have passed Intermediate (10+2) or equivalent examination from MPC, MEC, CEC, BiPC or relevant Vocational streams are eligible. MPC (Mathematics) students are preferred.",
    streamBadge: "MPC / MEC / CEC / BiPC / Vocational",
    preferredStream: "MPC (Mathematics) students are preferred",
  },
  {
    sNo: 3,
    programme: "B.Sc. Honours Computer Science",
    eligibilityCriteria:
      "Candidates must have passed Intermediate (10+2) or equivalent examination with Mathematics as a subject. MPC students are eligible and preferred.",
    streamBadge: "10+2 with Mathematics",
    preferredStream: "MPC students are eligible and preferred",
  },
  {
    sNo: 4,
    programme: "B.Sc. Honours Artificial Intelligence",
    eligibilityCriteria:
      "Candidates must have passed Intermediate (10+2) or equivalent examination with Mathematics as a subject. MPC students are eligible and preferred.",
    streamBadge: "10+2 with Mathematics",
    preferredStream: "MPC students are eligible and preferred",
  },
  {
    sNo: 5,
    programme: "B.Sc. Honours Mathematics",
    eligibilityCriteria:
      "Candidates must have passed Intermediate (10+2) or equivalent examination with Mathematics as a subject. Primarily suitable for MPC students.",
    streamBadge: "10+2 with Mathematics",
    preferredStream: "Primarily suitable for MPC students",
  },
  {
    sNo: 6,
    programme: "B.Sc. Honours – Physics",
    eligibilityCriteria:
      "Candidates who have passed Intermediate (10+2) or equivalent examination from MPC or BiPC streams are eligible.",
    streamBadge: "MPC / BiPC",
    preferredStream: "MPC or BiPC streams",
  },
  {
    sNo: 7,
    programme: "B.Sc. Honours – Statistics",
    eligibilityCriteria:
      "Candidates must have passed Intermediate (10+2) or equivalent examination with Mathematics as a subject. Primarily suitable for MPC students.",
    streamBadge: "10+2 with Mathematics",
    preferredStream: "Primarily suitable for MPC students",
  },
  {
    sNo: 8,
    programme: "B.Sc. Honours Microbiology",
    eligibilityCriteria:
      "Candidates who have passed Intermediate (10+2) or equivalent examination with BiPC (Biology, Physics and Chemistry) are eligible for admission.",
    streamBadge: "BiPC (Biology, Physics, Chemistry)",
    preferredStream: "BiPC stream candidates",
  },
  {
    sNo: 9,
    programme: "B.Sc. Honours Biotechnology",
    eligibilityCriteria:
      "Candidates who have passed Intermediate (10+2) or equivalent examination with BiPC (Biology, Physics and Chemistry) are eligible for admission.",
    streamBadge: "BiPC (Biology, Physics, Chemistry)",
    preferredStream: "BiPC stream candidates",
  },
  {
    sNo: 10,
    programme: "B.Sc. Honours Chemistry",
    eligibilityCriteria:
      "Candidates who have passed Intermediate (10+2) or equivalent examination with MPC (Mathematics, Physics and Chemistry) or BiPC (Biology, Physics and Chemistry) are eligible for admission.",
    streamBadge: "MPC / BiPC",
    preferredStream: "MPC or BiPC streams",
  },
];

export const PG_ELIGIBILITY_CRITERIA: EligibilityItem[] = [
  {
    sNo: 1,
    programme: "MCA – Master of Computer Applications",
    eligibilityCriteria:
      "Candidates must have passed a Bachelor’s Degree of minimum three years duration from a recognized university with Mathematics as a subject at Intermediate (10+2) or Degree level, subject to the eligibility conditions prescribed by the affiliating university and competent authorities.",
    streamBadge: "3-Year Degree + Maths at 10+2 / Degree Level",
    preferredStream: "AP ICET Qualified / Recognized Bachelor Degree",
  },
  {
    sNo: 2,
    programme: "MBA – Master of Business Administration",
    eligibilityCriteria:
      "Candidates must have passed a Bachelor’s Degree of minimum three years duration from a recognized university, subject to the eligibility conditions prescribed by the affiliating university and competent authorities.",
    streamBadge: "3-Year Recognized Bachelor Degree",
    preferredStream: "AP ICET Qualified / Recognized Bachelor Degree",
  },
];

// ==========================================
// C. Admission Documents & Forms (from 77)
// ==========================================

export const ADMISSION_DOCUMENTS = {
  ugRequiredDocsPdf: "/documents/admissions/UG Programmes Admission Reuired Documents.pdf",
  ugApplicationFormPdf: "/documents/admissions/UG Application Form.pdf",
  pgRequiredDocsPdf: "/documents/admissions/PG -Documents Reuired for Admissions.pdf",
  pgApplicationFormPdf: "/documents/admissions/PG Application Form.pdf",
  capPortalUrl: "https://cap.apcfss.in/",
  prospectusPdf: "/documents/admissions/Prospectus 2025-26.pdf",
  pamphlet1: "/images/cbnew2.webp",
  pamphlet2: "/images/cbnew2.webp",
};

// ==========================================
// E. Admission Desk Contacts
// ==========================================

export const ADMISSION_DESK_INFO = {
  phoneNumbers: [
    { label: "Landline Office", number: "0863-2236470", tel: "+918632236470" },
    { label: "Mobile Helpline 1", number: "7382104655", tel: "+917382104655" },
    { label: "Mobile Helpline 2", number: "8500656134", tel: "+918500656134" },
  ],
  emails: [
    { label: "Principal / Office", email: "st_anns_coll@yahoo.co.in" },
    { label: "Admissions Desk", email: "stannscollegegnt@gmail.com" },
  ],
  officeHours: "9:00 AM – 4:30 PM (Monday – Saturday)",
  collegeAddress: "St. Ann’s College for Women, Gorantla, Guntur - 522034, Andhra Pradesh, India",
};

// ==========================================
// F. Admission Information - Table 3 Records
// ==========================================

export const ADMISSION_YEARLY_RECORDS: AdmissionYearlyRecord[] = [
  {
    year: "2026-2027",
    affiliationDocUrl: "/documents/affiliations/ANU_UG_Affiliation_2025-2026.pdf",
    affiliationDocTitle: "ANU Affiliation & Approval Orders (2026-2027)",
    sanctionedIntakeDocUrl: "/documents/admissions/UG Programmes Admission Reuired Documents.pdf",
    sanctionedIntakeDocTitle: "Sanctioned Intake Orders (2026-2027)",
    admittedStudentsDocUrl: "/documents/DefaultFile_1.pdf",
    admittedStudentsDocTitle: "List of Admitted Students (2026-2027)",
    categoryAdmissionsDocUrl: "/documents/DefaultFile_1.pdf",
    categoryAdmissionsDocTitle: "Category-wise Admissions (2026-2027)",
  },
  {
    year: "2025–2026",
    affiliationDocUrl: "/documents/affiliations/ANU_UG_Affiliation_2025-2026.pdf",
    affiliationDocTitle: "ANU Affiliation & Approval Orders (2025–2026)",
    sanctionedIntakeDocUrl: "/documents/admissions/UG Programmes Admission Reuired Documents.pdf",
    sanctionedIntakeDocTitle: "Sanctioned Intake Orders (2025–2026)",
    admittedStudentsDocUrl: "/documents/DefaultFile_1.pdf",
    admittedStudentsDocTitle: "List of Admitted Students (2025–2026)",
    categoryAdmissionsDocUrl: "/documents/DefaultFile_1.pdf",
    categoryAdmissionsDocTitle: "Category-wise Admissions (2025–2026)",
  },
  {
    year: "2024–2025",
    affiliationDocUrl: "/documents/affiliations/ANU_UG_Affiliation_2024-2025.pdf",
    affiliationDocTitle: "ANU Affiliation & Approval Orders (2024–2025)",
    sanctionedIntakeDocUrl: "/documents/admissions/UG Programmes Admission Reuired Documents.pdf",
    sanctionedIntakeDocTitle: "Sanctioned Intake Orders (2024–2025)",
    admittedStudentsDocUrl: "/documents/DefaultFile_1.pdf",
    admittedStudentsDocTitle: "List of Admitted Students (2024–2025)",
    categoryAdmissionsDocUrl: "/documents/DefaultFile_1.pdf",
    categoryAdmissionsDocTitle: "Category-wise Admissions (2024–2025)",
  },
  {
    year: "2023–2024",
    affiliationDocUrl: "/documents/affiliations/ANU_UG_Affiliation_2023-2024.pdf",
    affiliationDocTitle: "ANU Affiliation & Approval Orders (2023–2024)",
    sanctionedIntakeDocUrl: "/documents/admissions/UG Programmes Admission Reuired Documents.pdf",
    sanctionedIntakeDocTitle: "Sanctioned Intake Orders (2023–2024)",
    admittedStudentsDocUrl: "/documents/DefaultFile_1.pdf",
    admittedStudentsDocTitle: "List of Admitted Students (2023–2024)",
    categoryAdmissionsDocUrl: "/documents/DefaultFile_1.pdf",
    categoryAdmissionsDocTitle: "Category-wise Admissions (2023–2024)",
  },
];
