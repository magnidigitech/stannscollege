import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://stannscollegeforwomen.org';

  // 1. Root and standard static routes
  const staticPaths = [
    '',
    '/admission',
    '/contact',
    '/courses',
    '/mandatory-disclosures',
    '/naac-peer-team',
    '/strategic-plans-and-future-directions',
  ];

  // 2. About section sub-pages
  const aboutPaths = [
    'history',
    'vision-mission',
    'logo-motto',
    'governing-body',
    'organizational-structure',
    'institutional-values',
    'sisters-st-ann',
  ].map(slug => `/about/${slug}`);

  // 3. Admissions sub-pages
  const admissionsPaths = [
    'procedure',
    'fee-structure',
    'rules-regulations',
    'guidelines',
  ].map(slug => `/admissions/${slug}`);

  // 4. Alumni sub-pages
  const alumniPaths = [
    'about',
    'registration',
    'governing-body',
    'distinguished',
    'meet-reports',
    'gallery',
  ].map(slug => `/alumni/${slug}`);

  // 5. Faculty sub-pages
  const facultyPaths = [
    'visiting',
    'recruitment',
    'professional-dev',
    'achievements',
    'exchange',
    'consultancy',
    'appraisal',
  ].map(slug => `/faculty/${slug}`);

  // 6. Infrastructure sub-pages
  const infrastructurePaths = [
    'campus-buildings',
    'classrooms',
    'laboratories',
    'library',
    'seminar-hall',
    'hostel',
    'canteen',
    'sports-facilities',
    'green-campus',
    'ict-facilities',
  ].map(slug => `/infrastructure/${slug}`);

  // 7. Placements sub-pages
  const placementsPaths = [
    'about-cell',
    'placement-policy',
    'placement-process',
    'our-recruiters',
    'placement-statistics',
    'training-programmes',
    'student-registrations',
    'annual-reports',
  ].map(slug => `/placements/${slug}`);

  // 8. Quality Assurance sub-pages
  const qaPaths = [
    'iqac',
    'composition',
    'functions',
    'aqar',
    'minutes',
    'audits',
    'naac',
    'best-practices',
    'institutional-distinctiveness',
  ].map(slug => `/quality-assurance/${slug}`);

  // 9. Research & Innovation sub-pages
  const researchPaths = [
    'research-development-cell',
    'research-infrastructure',
    'research-supervisors-scholars',
    'centres-of-excellence',
    'patents-innovations',
    'funded-projects',
    'ipr-cell',
    'institution-innovation-cell',
    'entrepreneurship-development',
    'publications',
  ].map(slug => `/research-innovation/${slug}`);

  // 10. Student Support sub-pages
  const studentSupportPaths = [
    'mentor-mentee',
    'student-counselling',
    'grievance-redressal',
    'internal-complaints',
    'anti-ragging',
    'parent-association',
    'women-empowerment',
    'academic-achievements',
    'sports-cultural-achievements',
    'sports-infrastructure',
    'ncc-activities',
    'mother-gnanamma',
    'environmental-social',
    'red-ribbon-club',
  ].map(slug => `/student-support/${slug}`);

  // Combine all paths into sitemap format
  const allPaths = [
    ...staticPaths,
    ...aboutPaths,
    ...admissionsPaths,
    ...alumniPaths,
    ...facultyPaths,
    ...infrastructurePaths,
    ...placementsPaths,
    ...qaPaths,
    ...researchPaths,
    ...studentSupportPaths,
  ];

  return allPaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.split('/').length > 2 ? 0.6 : 0.8,
  }));
}
