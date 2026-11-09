export interface UgProgrammeRow {
  sNo: number;
  name: string;
  sanctionedIntake: number;
  convenerQuota: number;
  managementQuota: number;
  ewsQuota: number;
  aboutDocumentUrl?: string;
  brochureUrl?: string;
}

export interface PgProgrammeRow {
  sNo: number;
  name: string;
  sanctionedIntake: number;
  convenerQuota: number;
  managementQuota: number;
  ewsQuota: number;
  aboutDocumentUrl?: string;
  brochureUrl?: string;
}

export interface CalendarRow {
  year: string;
  anuCalendarUrl: string;
  aipUrl: string;
}

export interface TimetableRow {
  year: string;
  oddSemUrl: string;
  evenSemUrl: string;
}

export interface FrameworkDocRow {
  sNo: number;
  title: string;
  applicableFrom: string;
  docUrl: string;
}

export interface SyllabusItemRow {
  sNo: number | string;
  title: string;
  docUrl: string;
  extra?: string;
}

export interface IlmsEvidenceRow {
  sNo: number;
  title: string;
  year: string;
  docUrl: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  established: string;
  overviewDocUrl?: string;
  description: string;
  activityReports?: { year: string; docUrl: string }[];
  annualReports?: { year: string; docUrl: string }[];
  galleryImages?: { title: string; src: string }[];
}

