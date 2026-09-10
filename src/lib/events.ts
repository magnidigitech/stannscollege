// Helper utilities for Event & Activity Lifecycles and Documents

export interface EventDocument {
  title?: string;
  url: string;
  originalFilename?: string;
}

export interface EventLifecycleResult {
  isVisible: boolean;
  status: "upcoming" | "new" | "none" | "hidden";
}

/**
 * Event lifecycle rule:
 * 1) start date: date which tells us from when it should appear on website (if today < startDate => hidden)
 * 2) event date: date of when the event takes place
 *    - till the end of this date: status = "upcoming"
 *    - after this date: status = "new" for 3 days
 *    - later: status = "none" (nothing)
 */
export function getEventLifecycle(event: any, currentDate = new Date()): EventLifecycleResult {
  // 1. Visibility check based on startDate
  if (event.startDate) {
    const startVisDate = new Date(
      event.startDate.includes("T") ? event.startDate : `${event.startDate}T00:00:00`
    );
    const todayZero = new Date(currentDate);
    todayZero.setHours(0, 0, 0, 0);
    if (todayZero < startVisDate) {
      return { isVisible: false, status: "hidden" };
    }
  }

  // 2. Determine end of event date
  let eventEndStr = event.eventEndDate || event.eventDate;
  if (!eventEndStr && event.date) {
    const rangeMatch = event.date.match(/[–-](\d{1,2})\s+September\s+(\d{4})/i);
    if (rangeMatch) {
      eventEndStr = `${rangeMatch[2]}-09-${rangeMatch[1].padStart(2, "0")}`;
    } else {
      const singleMatch = event.date.match(/(\d{1,2})\s+September\s+(\d{4})/i);
      if (singleMatch) {
        eventEndStr = `${singleMatch[2]}-09-${singleMatch[1].padStart(2, "0")}`;
      }
    }
  }

  if (!eventEndStr) {
    return { isVisible: true, status: "upcoming" };
  }

  const endDay = new Date(
    eventEndStr.includes("T") ? eventEndStr : `${eventEndStr}T23:59:59`
  );
  const today = new Date(currentDate);

  // Till the end of event date: "Upcoming"
  if (today <= endDay) {
    return { isVisible: true, status: "upcoming" };
  }

  // After this date: "New" for 3 days
  const threeDaysAfter = new Date(endDay.getTime() + 3 * 24 * 60 * 60 * 1000);
  if (today <= threeDaysAfter) {
    return { isVisible: true, status: "new" };
  }

  // Later: nothing
  return { isVisible: true, status: "none" };
}

/**
 * Extracts and consolidates all uploaded documents for an event
 */
export function getEventDocuments(item: any): EventDocument[] {
  const docs: EventDocument[] = [];
  if (Array.isArray(item.documents)) {
    for (const d of item.documents) {
      if (d?.url) {
        docs.push({
          title: d.title || d.originalFilename || "Event Circular / Brochure",
          url: d.url,
          originalFilename: d.originalFilename,
        });
      }
    }
  }
  const singleUrl = item.pdfUrl || item.fileUrl;
  if (singleUrl && !docs.some((d) => d.url === singleUrl)) {
    docs.unshift({
      title: "Event Circular & Brochure (PDF)",
      url: singleUrl,
    });
  }
  return docs;
}

/**
 * Extracts a numeric timestamp for sorting events chronologically
 */
export function getEventTimestamp(event: any): number {
  let dateStr = event.eventEndDate || event.eventDate;
  if (!dateStr && event.date) {
    const rangeMatch = event.date.match(/[–-](\d{1,2})\s+September\s+(\d{4})/i);
    if (rangeMatch) {
      dateStr = `${rangeMatch[2]}-09-${rangeMatch[1].padStart(2, "0")}`;
    } else {
      const singleMatch = event.date.match(/(\d{1,2})\s+September\s+(\d{4})/i);
      if (singleMatch) {
        dateStr = `${singleMatch[2]}-09-${singleMatch[1].padStart(2, "0")}`;
      }
    }
  }

  if (dateStr) {
    const d = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T12:00:00`);
    if (!isNaN(d.getTime())) {
      return d.getTime();
    }
  }

  return 0;
}

export const fallbackEventsHistory = [
  {
    _id: "event-2026-09-01-nutrition-week",
    title: "National Nutrition Week",
    date: "1–7 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-01",
    eventEndDate: "2026-09-07",
    organizer: "Department of Biotechnology",
    location: "Campus Auditorium / Biotechnology Labs",
    description: "Health & Nutrition Awareness Session and Competitions.",
    pdfUrl: "https://cdn.sanity.io/files/fhjwqub5/production/32a3d5b540315384535c90682d86a0b23c71d808.pdf",
  },
  {
    _id: "event-2026-09-05-teachers-freshers-day",
    title: "Teachers’ Day & Fresher’s Day Celebration",
    date: "5 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-05",
    organizer: "Cultural & Co-Curricular Committee / Student Council",
    location: "Main Auditorium Hall",
    description: "Teachers’ Day Celebration and Fresher’s Day Programme.",
  },
  {
    _id: "event-2026-09-07-clean-air-day",
    title: "International Day of Clean Air for Blue Skies",
    date: "7 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-07",
    organizer: "Department of Chemistry / Eco Club / RRC",
    location: "Seminar Hall & Campus Grounds",
    description: "Clean-Air Awareness Campaign, Poster Presentation and Dental Camp.",
  },
  {
    _id: "event-2026-09-08-literacy-day",
    title: "International Literacy Day",
    date: "8 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-08",
    organizer: "Department of English / Department of Library",
    location: "Central Library Conference Hall",
    description: "Literacy Awareness, Reading Activity, Essay and Poster Competitions.",
  },
  {
    _id: "event-2026-09-09-sudoku-day",
    title: "International Sudoku Day",
    date: "9 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-09",
    organizer: "Department of Mathematics",
    location: "Mathematics Department Activity Hall",
    description: "Sudoku Competition and Puzzle Activities.",
  },
  {
    _id: "event-2026-09-09-empowering-her-workshop",
    title: "Two-Day Skill Development & Career Readiness Workshop: “EMPOWERING HER: GROOMING, CONFIDENCE & ENTREPRENEURIAL SKILLS”",
    date: "9–10 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-09",
    eventEndDate: "2026-09-10",
    organizer: "Women Empowerment Cell",
    location: "PG Block Seminar Hall",
    description: "A two-day skill-development programme focusing on grooming, confidence building, career readiness and entrepreneurial skills.",
    documents: [
      {
        title: "Workshop Schedule & Sessions Circular",
        url: "https://cdn.sanity.io/files/fhjwqub5/production/32a3d5b540315384535c90682d86a0b23c71d808.pdf",
        originalFilename: "Workshop_Schedule_Circular.pdf",
      },
      {
        title: "Registration Guidelines & Resource Person Bio",
        url: "https://cdn.sanity.io/files/fhjwqub5/production/cd25e5f7d45a56b103d932b451c31b914238be8b.pdf",
        originalFilename: "Resource_Person_Profile.pdf",
      },
    ],
  },
  {
    _id: "event-2026-09-12-programmers-day",
    title: "Programmers’ Day",
    date: "12 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-12",
    organizer: "Department of MCA",
    location: "Informatics & Computer Science Lab",
    description: "Puzzle Making, Problem Solving and Competitions.",
  },
  {
    _id: "event-2026-09-16-ozone-day",
    title: "World Ozone Day",
    date: "16 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-16",
    organizer: "Department of Chemistry",
    location: "Chemistry Lecture Theatre & Campus Gardens",
    description: "Awareness Programme, Poster Presentation and Plantation Activity.",
  },
  {
    _id: "event-2026-09-17-microorganisms-day",
    title: "World Microorganisms Day",
    date: "17 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-17",
    organizer: "Department of Microbiology",
    location: "Microbiology Laboratory & Health Centre",
    description: "Seminar / Awareness Session, Poster Making and Blood Grouping Camp.",
  },
  {
    _id: "event-2026-09-19-cleanup-day",
    title: "World Cleanup Day",
    date: "19 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-19",
    organizer: "Eco Club / Student Volunteers",
    location: "St. Ann's Campus & Surrounding Area",
    description: "Campus Cleanliness Drive and Waste-Management Awareness.",
  },
  {
    _id: "event-2026-09-21-peace-day",
    title: "International Day of Peace",
    date: "21 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-21",
    organizer: "Gnanamma Outreach Committee",
    location: "Open Air Amphitheatre",
    description: "Peace Pledge, Poster Presentation and Awareness Talk.",
  },
  {
    _id: "event-2026-09-24-nss-day",
    title: "NSS Day",
    date: "24 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-24",
    organizer: "NSS Unit",
    location: "College Auditorium & Community Centre",
    description: "NSS Awareness Programme, Service Activities and Volunteer Interaction.",
  },
  {
    _id: "event-2026-09-26-tourism-day",
    title: "World Tourism Day & Gurram Jashuva Jayanthi",
    date: "26 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-26",
    organizer: "Department of MBA / Department of Oriental Languages",
    location: "Conference Hall 2",
    description: "Heritage, Tourism and Cultural Awareness Activity.",
  },
  {
    _id: "event-2026-09-28-rabies-access-info-day",
    title: "World Rabies Day & Universal Access to Information",
    date: "28 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-28",
    organizer: "Department of Library / IQAC",
    location: "Digital Knowledge Centre / Library",
    description: "Awareness Programme on Rabies Prevention and Universal Access to Information.",
  },
  {
    _id: "event-2026-09-29-heart-day",
    title: "World Heart Day",
    date: "29 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-29",
    organizer: "NSS / Department of Physical Education / Health Centre",
    location: "Sports Complex & Wellness Centre",
    description: "Health Awareness Programme, Fitness/Yoga Activity and Expert Talk.",
  },
  {
    _id: "event-2026-09-30-translation-day",
    title: "International Translation Day",
    date: "30 September 2026",
    startDate: "2026-09-01",
    eventDate: "2026-09-30",
    organizer: "Department of Oriental Languages / Department of English",
    location: "Language Lab & Seminar Hall",
    description: "Translation Competition and Multilingual Activity.",
  },
];
