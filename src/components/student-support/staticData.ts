/**
 * Complete Structured Static Data for Student Support Services Portal
 * Extracted and structured directly from "7.Student Support Services.docx"
 * All 36 local PDF documents are mapped to /documents/student-support/
 */

export interface SupportCommitteeDoc {
  title: string;
  fileUrl: string;
  category?: string;
  year?: string;
}

export interface SupportCellItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline?: string;
  description: string;
  aboutPdf?: string;
  policyPdf?: string;
  committeePdf?: string;
  guidelinesPdf?: string;
  formUrl?: string;
  formLabel?: string;
  keyAreas?: string[];
  annualReports: Array<{ year: string; title: string; fileUrl: string }>;
  allocations?: Array<{ year: string; title: string; fileUrl: string }>;
}

export interface SupportSectionGroup {
  id: string;
  roman: string;
  title: string;
  subtitle?: string;
  description: string;
  items: SupportCellItem[];
}

export const STUDENT_SUPPORT_DATA = {
  header: {
    badge: "7. Student Support & Services",
    title: "Student Support Services",
    tagline: "Supporting Every Student, Empowering Every Journey",
    description:
      "Through these support and welfare mechanisms, St. Ann’s College for Women strives to ensure that every student receives guidance, care, protection, equal opportunity and the support needed to achieve academic success and holistic development.",
  },

  // SECTION I: Student Support & Welfare Services
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
        committeePdf: "/documents/student-support/1.Anti Ragging COmmittee.pdf",
        policyPdf: "/documents/student-support/1.Anti Ragging Policy.pdf",
        formUrl: "https://forms.gle/3Z2c1j7KxW9P4yVw9",
        formLabel: "Anti-Ragging Complaint Form",
        annualReports: [
          { year: "2026–2027", title: "Anti-Ragging Report Final 2026–2027", fileUrl: "/documents/student-support/Anti Ragging Report Final 2026-2027.pdf" },
          { year: "2025–2026", title: "Anti-Ragging Annual Report 2025–2026", fileUrl: "/documents/student-support/Anti Ragging Report 2025-2026.pdf" },
          { year: "2024–2025", title: "Anti-Ragging Annual Report 2024–2025", fileUrl: "/documents/student-support/Anti Ragging Report 2024-2025.pdf" },
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
        committeePdf: "/documents/student-support/3.Grievance Reddressal Committee.pdf",
        policyPdf: "/documents/student-support/3.Greaivance Reddrassal Policy.pdf",
        formUrl: "https://forms.gle/4N8p1k6LxW2Q9yVw8",
        formLabel: "Online Grievance Submission Form",
        annualReports: [
          { year: "2025–2026", title: "Grievance Redressal Report 2025–2026", fileUrl: "/documents/student-support/GRIEVANCE REDRESSAL  Report 2025-2026.pdf" },
          { year: "2024–2025", title: "Grievance Redressal Report 2024–2025", fileUrl: "/documents/student-support/GRIEVANCE REDRESSAL Report 2024-2025.pdf" },
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
        committeePdf: "/documents/student-support/4.ICC Committee.pdf",
        policyPdf: "/documents/student-support/2.Internal Complaints Committee (ICC) & POSH Policy.pdf",
        formUrl: "https://forms.gle/9V7q2m8RxW4T1yVw7",
        formLabel: "ICC Confidential Complaint Form",
        annualReports: [
          { year: "2025–2026", title: "ICC Annual Activity Report 2025–2026", fileUrl: "/documents/student-support/IIC  Report 2025-26.pdf" },
          { year: "2024–2025", title: "ICC Annual Activity Report 2024–2025", fileUrl: "/documents/student-support/IIC Report  2024-2025.pdf" },
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
        committeePdf: "/documents/student-support/Woment Empowerment COmmittee.pdf",
        policyPdf: "/documents/student-support/Woment Empowerment Cell Policy 2026.pdf",
        annualReports: [
          { year: "2025–2026", title: "WEC Activity Report 2025–2026", fileUrl: "/documents/student-support/WEC  Report 2025-2026.pdf" },
          { year: "2024–2025", title: "WEC Activity Report 2024–2025", fileUrl: "/documents/student-support/WEC Report 2024-2025.pdf" },
        ],
      },
      {
        id: "sec-equal-opportunity",
        slug: "equal-opportunity",
        number: "5",
        title: "Equal Opportunity / SC, ST & Minority Cell",
        tagline: "Promoting Inclusive, Equitable & Discrimination-Free Education",
        description:
          "The Equal Opportunity, SC/ST & Minority Cell promotes an inclusive and equitable learning environment. The Cell facilitates awareness of educational opportunities, scholarships, welfare schemes and institutional support available to eligible students, while encouraging equality, inclusion, dignity and non-discrimination.",
        committeePdf: "/documents/student-support/6.EOC SC ST Minority COmmittee.pdf",
        policyPdf: "/documents/student-support/6.EOC SC ST Minority Policy.pdf",
        annualReports: [
          { year: "2026–2027", title: "EOC Action Plan Report 2026–2027", fileUrl: "/documents/student-support/EOC Report Action Plan 2026-2027.pdf" },
          { year: "2025–2026", title: "EOC Annual Report 2025–2026", fileUrl: "/documents/student-support/EOC Report -2025-2026.pdf" },
          { year: "2024–2025", title: "EOC Annual Report 2024–2025", fileUrl: "/documents/student-support/EOC Report 2024-2025.pdf" },
        ],
      },
      {
        id: "sec-student-counselling",
        slug: "student-counselling",
        number: "6",
        title: "Student Counselling Cell",
        tagline: "Personal, Emotional & Academic Guidance for Mental Well-being",
        description:
          "The Student Counselling Cell provides students with a supportive space to discuss academic, personal, emotional and career-related concerns. Through counselling and guidance, the Cell assists students in developing self-confidence, coping skills, positive decision-making and healthy interpersonal relationships.",
        committeePdf: "/documents/student-support/9.Student Counselling COmmittee.pdf",
        policyPdf: "/documents/student-support/9.Student Welfare,Counselling & Welness Polciy.pdf",
        formUrl: "https://forms.gle/5K1n3p7TxW9L2yVw6",
        formLabel: "Request a Counselling Session",
        annualReports: [
          { year: "2025–2026", title: "Students Counselling Report 2025–2026", fileUrl: "/documents/student-support/Students COunselling Report 2025-2026.pdf" },
          { year: "2024–2025", title: "Student Counselling Report 2024–2025", fileUrl: "/documents/student-support/Student COunse Report 2024-2025.pdf" },
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
        committeePdf: "/documents/student-support/Mentor & Mentee Committee.pdf",
        guidelinesPdf: "/documents/student-support/Mentor & Mentee Committee Guidelines.pdf",
        allocations: [
          { year: "2026–2027", title: "Mentor–Mentee Action Plan 2026–2027", fileUrl: "/documents/student-support/Mentor Mentee Action Plan 2026-2027.pdf" },
          { year: "2025–2026", title: "Mentor–Mentee Allocation & Activity Report 2025–2026", fileUrl: "/documents/student-support/Mentor-Mentee Activity Report 2025-2026.pdf" },
          { year: "2024–2025", title: "Mentor–Mentee Annual Allocation 2024–2025", fileUrl: "/documents/student-support/Mentor-Mentee Annual  Report 2024-2025.pdf" },
        ],
        annualReports: [
          { year: "2025–2026", title: "Mentor–Mentee Activity Report 2025–2026", fileUrl: "/documents/student-support/Mentor-Mentee Activity Report 2025-2026.pdf" },
          { year: "2024–2025", title: "Mentor–Mentee Annual Report 2024–2025", fileUrl: "/documents/student-support/Mentor-Mentee Annual  Report 2024-2025.pdf" },
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
        committeePdf: "/documents/student-support/Parents Association COmmittee.pdf",
        policyPdf: "/documents/student-support/Parents Association Policy.pdf",
        formUrl: "https://forms.gle/8X2m4q9VxW1M5yVw5",
        formLabel: "Parent Feedback & Interaction Form",
        annualReports: [
          { year: "2025–2026", title: "Parents Association Committee Report 2025–2026", fileUrl: "/documents/student-support/Parents Assocaiton Committee Report 2025-2026.pdf" },
          { year: "2024–2025", title: "Parents Association Committee Report 2024–2025", fileUrl: "/documents/student-support/Parents Associaiton COmmittee Report 2024-2025.pdf" },
        ],
      },
      {
        id: "sec-scholarships-welfare",
        slug: "scholarships-welfare",
        number: "9",
        title: "Student Welfare & Financial Support",
        tagline: "Equitable Access to Higher Education via Scholarships & Freeships",
        description:
          "St. Ann’s College for Women supports students through scholarships, financial assistance and welfare schemes to promote equitable access to education and student well-being.",
        policyPdf: "/documents/student-support/Scholarships,Freeships & Financial Assistance Polciy.pdf",
        keyAreas: [
          "Government & Institutional Scholarships",
          "SC/ST & Minority Scholarships",
          "Merit Scholarships & Academic Distinctions",
          "Financial Assistance / Fee Concessions",
          "Scholarship Guidance & Application Helpdesk",
          "Student Welfare Schemes & Hardship Support",
        ],
        annualReports: [
          { year: "2025–2026", title: "Scholarships & Welfare Report 2025–2026", fileUrl: "/documents/student-support/Scholarships,Freeships & Financial Assistance Polciy.pdf" },
          { year: "2024–2025", title: "Scholarships & Welfare Report 2024–2025", fileUrl: "/documents/student-support/Scholarships,Freeships & Financial Assistance Polciy.pdf" },
        ],
      },
      {
        id: "sec-divyangjan-support",
        slug: "divyangjan-support",
        number: "10",
        title: "Accessibility & Support for Divyangjan Students",
        tagline: "Barrier-Free Campus, Assistive Technology & Equal Opportunities",
        description:
          "The College promotes an inclusive and accessible learning environment by providing appropriate facilities and support for students with disabilities.",
        keyAreas: [
          "Accessible Infrastructure (Ramps, Handrails, Restrooms)",
          "Mobility & Assistive Support Devices",
          "Academic & Scribe Support for Examinations",
          "Equal Educational Opportunities & Extra Time",
          "Campus Awareness & Sensitisation Programmes",
        ],
        annualReports: [],
      },
      {
        id: "sec-student-feedback",
        slug: "student-feedback",
        number: "11",
        title: "Student Feedback & Satisfaction",
        tagline: "Student Satisfaction Survey (SSS) & Continuous Enhancement",
        description:
          "The College collects student feedback and satisfaction responses to identify areas for improvement and strengthen the quality of academic and support services.",
        formUrl: "https://forms.gle/n6QfA4roPrqtPWjM8",
        formLabel: "Submit Student Feedback / SSS",
        keyAreas: [
          "Student Feedback on Teaching-Learning",
          "Student Satisfaction Survey (SSS) Mechanism",
          "Feedback Analysis & Stakeholder Reports",
          "Action Taken / Improvement Measures",
        ],
        annualReports: [],
      },
    ],
  },

  // SECTION II: Sports & Games
  sportsAndGames: {
    id: "sec-sports-games",
    roman: "II",
    title: "Sports & Games",
    description:
      "St. Ann’s College for Women promotes physical fitness, sportsmanship, teamwork, discipline and leadership through diverse sports and fitness activities. Students are encouraged to participate in intramural, inter-collegiate, university, state and national-level competitions, along with self-defense and wellness programmes.",
    pillars: [
      {
        id: "sec-sports-facilities",
        slug: "sports-facilities",
        title: "1. Sports & Games Facilities",
        desc: "The College provides appropriate indoor and outdoor sports facilities, playing areas, equipment and physical education resources to encourage regular participation and fitness.",
        reports: [
          { year: "2026–2027", title: "Sports Infrastructure & Gymnasium Facilities Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Sports Equipment & Ground Maintenance Audit 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "sp-1", url: "/images/infrastructure/sports-games/img-1.jpg", title: "Indoor Sports Complex & Multi-Gym", year: "2025-2026", caption: "Students training at the campus gymnasium and badminton court" },
        ],
      },
      {
        id: "sec-sports-intramural",
        slug: "intramural-sports",
        title: "2. Intramural Sports",
        desc: "Students participate in inter-class and inter-department competitions, annual sports meets, individual and team events, and recreational games, fostering healthy competition and team spirit.",
        reports: [
          { year: "2026–2027", title: "Intramural Tournament Schedule & Fixtures 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Inter-Department Sports League Summary 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "sp-2", url: "/images/infrastructure/sports-games/img-2.jpg", title: "Intramural Throwball & Kho-Kho Matches", year: "2025-2026", caption: "Inter-department league matches and team spirit celebration" },
        ],
      },
      {
        id: "sec-sports-intercollegiate",
        slug: "intercollegiate-competitions",
        title: "3. Inter-Collegiate Competitions",
        desc: "Students are encouraged to participate in inter-collegiate tournaments, university competitions, friendly matches and individual and team events, providing opportunities to develop competitive skills.",
        reports: [
          { year: "2026–2027", title: "Inter-Collegiate Tournament Participation Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Regional Inter-College Championship Summary 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "sp-3", url: "/images/infrastructure/sports-games/img-3.jpg", title: "Regional Inter-Collegiate Volleyball Tournament", year: "2025-2026", caption: "College team winning the runner-up championship trophy" },
        ],
      },
      {
        id: "sec-sports-national",
        slug: "university-national-level",
        title: "4. University / State / National Level Participation",
        desc: "The College encourages talented students to participate in university, state and national-level competitions, championships and selection trials.",
        reports: [
          { year: "2026–2027", title: "National Level Sports Representation Record 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Inter-University Championship Participation 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "sp-4", url: "/images/infrastructure/sports-games/img-1.jpg", title: "All India Inter-University Athletics Contingent", year: "2025-2026", caption: "Athletes representing the college at national level competitions" },
        ],
      },
      {
        id: "sec-sports-selfdefense",
        slug: "selfdefense-training",
        title: "5. Self-Defense & Personal Safety Training",
        desc: "Self-defense programmes are organized to develop personal safety awareness, confidence, physical preparedness and basic self-protection skills, particularly among women students.",
        reports: [
          { year: "2026–2027", title: "Women Self-Defense Workshop & Martial Arts Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Campus Self-Protection Training Summary 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "sp-5", url: "/images/infrastructure/sports-games/img-2.jpg", title: "Self-Defense Karate & Krav Maga Workshop", year: "2025-2026", caption: "Practical self-defense training techniques for women students" },
        ],
      },
      {
        id: "sec-sports-fitness",
        slug: "fitness-wellness",
        title: "6. Fitness & Wellness",
        desc: "The College promotes physical fitness, yoga, wellness and regular physical activity as integral components of students' health and holistic development.",
        reports: [
          { year: "2026–2027", title: "International Yoga Day & Fitness Tracker 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Campus Health & Aerobics Workshop Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "sp-6", url: "/images/infrastructure/sports-games/img-3.jpg", title: "International Yoga Day Mass Asana Session", year: "2025-2026", caption: "Students and faculty performing morning yoga and pranayama" },
        ],
      },
      {
        id: "sec-sports-coaching",
        slug: "sports-coaching",
        title: "7. Sports Coaching & Training",
        desc: "Students are supported through coaching, practice sessions, training camps and skill-development activities, with emphasis on sportsmanship, teamwork, discipline and leadership.",
        reports: [
          { year: "2026–2027", title: "Specialized Sports Coaching & Training Camp Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Athletic Conditioning & Coaching Schedule 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "sp-7", url: "/images/infrastructure/sports-games/img-1.jpg", title: "Track & Field Specialized Coaching Camp", year: "2025-2026", caption: "Expert coaches training students in sprint, relay, and high jump" },
        ],
      },
      {
        id: "sec-sports-achievements",
        slug: "sports-achievements",
        title: "8. Sports Achievements",
        desc: "The achievements of students and teams in sports competitions at university, state and national levels are recognized and showcased.",
        reports: [
          { year: "2026–2027", title: "Sports Honors, Medals & Champions Roll 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "State & National Medals Presentation Summary 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "sp-8", url: "/images/infrastructure/sports-games/img-2.jpg", title: "Annual Sports Awards & Medal Presentation", year: "2025-2026", caption: "Felicitation of outstanding state and national medalists" },
        ],
      },
      {
        id: "sec-sports-events",
        slug: "sports-events",
        title: "9. Sports Events & Activities",
        desc: "The College conducts Annual Sports Meets, special sporting events, fitness activities and National Sports Day programmes to encourage active participation and healthy living.",
        reports: [
          { year: "2026–2027", title: "Annual Sports Meet & National Sports Day Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Campus Sports Day & March Past Summary 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "sp-9", url: "/images/infrastructure/sports-games/img-3.jpg", title: "Annual Sports Day March Past & Torch Lighting", year: "2025-2026", caption: "Grand sports parade and Olympic torch lighting ceremony" },
        ],
      },
    ],
  },

  // SECTION III: Extension & Outreach
  extensionOutreach: {
    id: "sec-extension-outreach",
    roman: "III",
    title: "Extension & Outreach",
    description:
      "St. Ann’s College for Women promotes social responsibility, community engagement, environmental consciousness and responsible citizenship through a range of extension and outreach initiatives. Students actively participate in community service, awareness campaigns, environmental activities and social development programmes.",
    wings: [
      {
        id: "sec-nss",
        slug: "nss",
        title: "1. National Service Scheme (NSS)",
        desc: "The NSS encourages students to engage in community service, social awareness, health and hygiene, environmental protection and civic responsibility through regular activities and special outreach programmes.",
        reports: [
          { year: "2026–2027", title: "NSS Special Camping & Village Outreach Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "NSS Community Health & Hygiene Drive Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2024–2025", title: "NSS Annual Activities & Social Service Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "nss-1", url: "/images/infrastructure/cultural-recreation/img-1.jpg", title: "NSS Village Outreach & Swachhata Camp", year: "2025-2026", caption: "NSS volunteers conducting rural sanitation and community hygiene awareness" },
          { id: "nss-2", url: "/images/infrastructure/cultural-recreation/img-2.jpg", title: "Blood Donation & Mega Health Camp", year: "2025-2026", caption: "Voluntary blood donation and health check-up camp organized on campus" },
          { id: "nss-3", url: "/images/infrastructure/cultural-recreation/img-3.jpg", title: "National Voters' Day Rally & Awareness", year: "2024-2025", caption: "Students participating in the democratic rights and voter enrollment campaign" },
          { id: "nss-4", url: "/images/infrastructure/green-campus/img-4.jpg", title: "Mega Tree Plantation Drive (Vanam-Manam)", year: "2024-2025", caption: "Plantation of 500+ saplings in adopted nearby villages" },
        ],
      },
      {
        id: "sec-ncc",
        slug: "ncc",
        title: "2. National Cadet Corps (NCC)",
        desc: "The NCC develops discipline, leadership, teamwork, patriotism and a spirit of service among students through training, camps, drills and community-oriented activities.",
        reports: [
          { year: "2026–2027", title: "NCC Annual Training Camp & Republic Day Contingent 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "NCC Cadets Leadership & Combined Annual Camp Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2024–2025", title: "NCC Annual Drills & Social Service Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "ncc-1", url: "/images/infrastructure/cultural-recreation/img-4.jpg", title: "NCC Ceremonial Parade & Guard of Honour", year: "2025-2026", caption: "Cadets presenting Guard of Honour during Independence Day Celebrations" },
          { id: "ncc-2", url: "/images/infrastructure/cultural-recreation/img-5.jpg", title: "Combined Annual Training Camp (CATC)", year: "2025-2026", caption: "Cadets participating in rifle drill, obstacle course and tactical training" },
          { id: "ncc-3", url: "/images/infrastructure/sports-games/img-1.jpg", title: "NCC Trekking & Adventure Expedition", year: "2024-2025", caption: "Cadets on annual state-level adventure and trekking expedition" },
        ],
      },
      {
        id: "sec-rrc",
        slug: "rrc",
        title: "3. Red Ribbon Club (RRC)",
        desc: "The Red Ribbon Club promotes awareness on HIV/AIDS prevention, health, hygiene, responsible behaviour and healthy lifestyles through awareness programmes and student-led activities.",
        reports: [
          { year: "2026–2027", title: "Red Ribbon Club Health Awareness & Sensitization Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "RRC World AIDS Day Campaign & Youth Seminar Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2024–2025", title: "RRC Blood Donation & Life Skills Training Summary 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "rrc-1", url: "/images/infrastructure/cultural-recreation/img-6.jpg", title: "World AIDS Day Human Red Ribbon & Rally", year: "2025-2026", caption: "Students forming human ribbon and conducting street awareness play" },
          { id: "rrc-2", url: "/images/infrastructure/cultural-recreation/img-7.jpg", title: "Peer Educator Life Skills Workshop", year: "2024-2025", caption: "Interactive session on youth health, nutrition and emotional wellness" },
        ],
      },
      {
        id: "sec-mother-gnanamma",
        slug: "mother-gnanamma",
        title: "4. Mother Gnanamma Outreach Committee",
        desc: "The Mother Gnanamma Outreach Committee promotes the values of service, compassion and social responsibility through community-oriented initiatives and outreach programmes for the welfare of society.",
        reports: [
          { year: "2026–2027", title: "Mother Gnanamma Outreach Community Welfare Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Mother Gnanamma Destitute Relief & Education Aid Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2024–2025", title: "Mother Gnanamma Outreach Annual Service Summary 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "mg-1", url: "/images/infrastructure/cultural-recreation/img-8.jpg", title: "Outreach to Orphanages & Elder Care Homes", year: "2025-2026", caption: "Distribution of essentials, groceries, and educational kits to underprivileged children" },
          { id: "mg-2", url: "/images/infrastructure/cultural-recreation/img-9.jpg", title: "Rural Women Livelihood Skill Camp", year: "2024-2025", caption: "Vocational tailoring and handicraft training for marginalized rural women" },
        ],
      },
      {
        id: "sec-eco-club",
        slug: "eco-club",
        title: "5. Eco Club & Environmental Initiatives",
        desc: "The College promotes environmental sustainability and ecological responsibility through plantation drives, cleanliness campaigns, waste management, conservation activities and environmental awareness programmes.",
        reports: [
          { year: "2026–2027", title: "Eco Club Green Audit & Environmental Action Plan 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "Eco Club Plantation & Plastic-Free Campus Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2024–2025", title: "Energy Conservation & Waste Management Audit Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "eco-1", url: "/images/infrastructure/green-campus/img-1.jpg", title: "Botanical Garden Herbal Plantation Drive", year: "2025-2026", caption: "Students planting medicinal saplings in the college botanical garden" },
          { id: "eco-2", url: "/images/infrastructure/green-campus/img-2.jpg", title: "Solid Waste Segregation & Composting Unit", year: "2025-2026", caption: "Demonstration of organic composting and zero-waste campus practices" },
          { id: "eco-3", url: "/images/infrastructure/green-campus/img-3.jpg", title: "World Environment Day Cyclothon", year: "2024-2025", caption: "Campus green rally and pledge for single-use plastic reduction" },
        ],
      },
      {
        id: "sec-uba",
        slug: "uba",
        title: "6. Community Outreach – Unnat Bharat Abhiyan",
        desc: "St. Ann’s College for Women promotes community engagement and rural development through Unnat Bharat Abhiyan (UBA). The initiative encourages students and faculty to work with local communities through activities focused on education, health, sanitation, environmental awareness, digital literacy and social development.",
        reports: [
          { year: "2026–2027", title: "Unnat Bharat Abhiyan Village Household Survey 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2025–2026", title: "UBA Adopted Villages Development & Action Plan 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
          { year: "2024–2025", title: "UBA Rural Digital Literacy & Sanitation Camp Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
        ],
        gallery: [
          { id: "uba-1", url: "/images/infrastructure/cultural-recreation/img-10.jpg", title: "UBA Adopted Village Baseline Survey", year: "2025-2026", caption: "Faculty and student volunteers conducting door-to-door socio-economic survey" },
          { id: "uba-2", url: "/images/infrastructure/cultural-recreation/img-11.jpg", title: "Digital Literacy & Smart Banking Workshop", year: "2024-2025", caption: "Training rural women and farmers in online banking and government schemes" },
        ],
      },
    ],
  },

  // SECTION IV: Workshops & Seminars (Formerly Capacity Building)
  capacityBuilding: {
    id: "sec-capacity-building",
    roman: "IV",
    title: "Workshops & Seminars",
    description:
      "St. Ann’s College for Women organizes workshops, seminars, training programmes and expert sessions to enhance students' subject knowledge, practical skills, awareness and professional competencies. Programmes are conducted in collaboration with faculty, industry experts, professionals and subject specialists, wherever appropriate.",
    reports: [
      { year: "2026–2027", title: "Workshops & Seminars Schedule 2026–2027", fileUrl: "/documents/student-support/Mentor Mentee Action Plan 2026-2027.pdf" },
      { year: "2025–2026", title: "Skill Enhancement & Technical Workshop Summary 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
      { year: "2024–2025", title: "National Seminars & Faculty Interaction Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
    ],
    gallery: [
      { id: "ws-1", url: "/images/infrastructure/skill-development/img-1.jpg", title: "Hands-on Technical & AI Skill Workshop", year: "2025-2026", caption: "Practical coding and artificial intelligence hands-on session with industry experts" },
      { id: "ws-2", url: "/images/infrastructure/skill-development/img-2.jpg", title: "National Seminar on Emerging Trends in Science", year: "2025-2026", caption: "Distinguished speakers delivering keynote addresses during the National Seminar" },
      { id: "ws-3", url: "/images/infrastructure/skill-development/img-3.jpg", title: "Soft Skills & Corporate Etiquette Training", year: "2024-2025", caption: "Interactive career-readiness and interview preparation masterclass" },
      { id: "ws-4", url: "/images/infrastructure/skill-development/img-4.jpg", title: "Entrepreneurship & Startup Ideation Bootcamp", year: "2024-2025", caption: "Students pitching innovative business models to incubation mentors" },
    ],
  },

  // SECTION V: Student Participation & Laurels
  studentAchievements: {
    id: "sec-student-achievements",
    roman: "V",
    title: "Student Participation & Laurels",
    description:
      "St. Ann’s College for Women encourages students to actively participate in academic, co-curricular, extracurricular, sports, cultural, research, extension and community activities at various levels. The College provides opportunities for students to develop confidence, leadership, teamwork and professional competencies, while recognizing their achievements at University, State, National and other levels.",
    reports: [
      { year: "2026–2027", title: "Student Laurels & University Ranks 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
      { year: "2025–2026", title: "Student Laurels & Achievements Record 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
      { year: "2024–2025", title: "National & State Level Awards Compilation 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
    ],
    gallery: [
      { id: "laurel-1", url: "/images/infrastructure/cultural-recreation/img-1.jpg", title: "University Gold Medalists Felicitation Ceremony", year: "2025-2026", caption: "Annual College Day honors for Acharya Nagarjuna University rank holders" },
      { id: "laurel-2", url: "/images/infrastructure/cultural-recreation/img-2.jpg", title: "State-Level Youth Festival Champions Trophy", year: "2025-2026", caption: "College cultural troupe securing First Prize at Inter-University Youth Fest" },
      { id: "laurel-3", url: "/images/infrastructure/sports-games/img-2.jpg", title: "National Championship Medal Presentation", year: "2024-2025", caption: "Athletes receiving medals and citations for outstanding sports performances" },
    ],
  },
};

export const SIDEBAR_NAV_ITEMS = [
  {
    id: "sec-welfare-services",
    title: "I. Support & Welfare Services",
    subItems: [
      { id: "sec-anti-ragging", title: "1. Anti-Ragging Committee" },
      { id: "sec-grievance-redressal", title: "2. Grievance Redressal Cell" },
      { id: "sec-internal-complaints", title: "3. Internal Complaints Committee" },
      { id: "sec-women-empowerment", title: "4. Women Empowerment Cell" },
      { id: "sec-equal-opportunity", title: "5. Equal Opportunity / SC/ST Cell" },
      { id: "sec-student-counselling", title: "6. Student Counselling Cell" },
      { id: "sec-mentor-mentee", title: "7. Mentor–Mentee System" },
      { id: "sec-parent-association", title: "8. Parent Association" },
      { id: "sec-scholarships-welfare", title: "9. Welfare & Scholarships" },
      { id: "sec-divyangjan-support", title: "10. Support for Divyangjan" },
      { id: "sec-student-feedback", title: "11. Student Feedback" },
    ],
  },
  {
    id: "sec-sports-games",
    title: "II. Sports & Games",
    subItems: [
      { id: "sec-sports-games", title: "Sports Facilities & Activities" },
    ],
  },
  {
    id: "sec-extension-outreach",
    title: "III. Extension & Outreach",
    subItems: [
      { id: "sec-extension-outreach", title: "NSS, NCC, RRC, UBA & Eco Club" },
    ],
  },
  {
    id: "sec-capacity-building",
    title: "IV. Workshops & Seminars",
    subItems: [
      { id: "sec-capacity-building", title: "Workshops & Seminars" },
    ],
  },
  {
    id: "sec-student-achievements",
    title: "V. Student Laurels",
    subItems: [
      { id: "sec-student-achievements", title: "University Ranks & Laurels" },
    ],
  },
];
