export interface SubDocument {
  name: string;
  year?: string;
  url: string;
  subDocuments?: SubDocument[];
  _key?: string;
}

export interface DocumentEntry {
  label: string;
  documentUrl: string;
  subDocuments?: SubDocument[];
  _key?: string;
}

export interface Metric {
  number: string;
  title: string;
  documents: DocumentEntry[];
  _key?: string;
}

export interface Section {
  number: string;
  title: string;
  metrics: Metric[];
  _key?: string;
}

export interface Criterion {
  id: number;
  title: string;
  sections: Section[];
  _key?: string;
}

export interface AqarYearReport {
  year: string; // e.g. "2024-2025", "2023-2024", "2022-2023", "2021-2022"
  label: string; // e.g. "AQAR 2023–2024", "AQAR 2024–2025 (In Progress)"
  status: "Published" | "In Progress" | "Draft";
  fullReportPdfUrl?: string;
  criteria: Criterion[];
}

export interface NaacCycleReport {
  cycleId: string; // e.g. "cycle-1", "cycle-2"
  cycleName: string; // e.g. "Cycle 1 (2024 – 2029)", "Cycle 2 (Upcoming)"
  grade?: string; // e.g. "A Grade (CGPA 3.09)"
  status: "Accredited" | "In Progress" | "Upcoming";
  accreditationDate?: string;
  validity?: string;
  ssrPdfUrl?: string;
  certificatePdfUrl?: string;
  criteria: Criterion[];
}

export interface SteeringCommitteeMember {
  id: string;
  criterion: string;
  name: string;
  role: string;
  designation: string;
}

export interface CriterionConvenorGroup {
  criterionId: number;
  criterionTitle: string;
  members: {
    name: string;
    role: string;
    designation: string;
  }[];
}

export interface QualityMeetingDoc {
  id: string;
  title: string;
  date?: string;
  fileUrl: string;
  type: "Minutes" | "ATR" | "Resolution";
}

export interface QualityAuditDoc {
  id: string;
  title: string;
  academicYear: string;
  type: "Academic" | "Administrative" | "Green" | "Energy" | "Environment";
  fileUrl: string;
}

export interface QualityFeedbackDoc {
  id: string;
  stakeholder: "Students" | "Teachers" | "Alumni" | "Employers" | "Parents";
  academicYear: string;
  fileUrl: string;
  atrFileUrl?: string;
}

export interface QualitySurveyDoc {
  id: string;
  title: string;
  academicYear: string;
  category: "SSS" | "Pass Percentage" | "Outcome Assessment";
  fileUrl: string;
}

export interface QualityAssuranceData {
  aqarReports: AqarYearReport[];
  naacCycles: NaacCycleReport[];
  steeringCommittee: SteeringCommitteeMember[];
  criterionConvenors: CriterionConvenorGroup[];
  meetingsAndAtrs: QualityMeetingDoc[];
  auditReports: QualityAuditDoc[];
  feedbackSystem: QualityFeedbackDoc[];
  surveysAndEvaluations: QualitySurveyDoc[];
}

