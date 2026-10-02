/**
 * Faculty Utilities & Dynamic Experience Calculator
 * St. Ann's College for Women
 */

/**
 * Parses diverse date strings into a JavaScript Date object.
 * Supports:
 * - DD-MM-YYYY (e.g. 06-06-1996, 01-03-2022, 10-06-2022)
 * - DD/MM/YYYY or D/M/YYYY (e.g. 1/11/2022, 01/07/2010)
 * - YYYY-MM-DD (e.g. 1996-06-06)
 * - DD Month YYYY (e.g. 11 June 2015, 20 June 2024, 01 August 2024, 31 July 2023)
 * - Month DD YYYY (e.g. June 11 2015)
 * - YYYY (e.g. 1996)
 */
export function parseDateString(dateStr?: string): Date | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const trimmed = dateStr.trim();
  if (!trimmed || trimmed === "—" || trimmed === "-" || trimmed.toLowerCase() === "n/a") return null;

  // 1. DD-MM-YYYY or DD/MM/YYYY or DD.MM.YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    if (month >= 0 && month < 12 && day >= 1 && day <= 31) {
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) return d;
    }
  }

  // 2. YYYY-MM-DD
  const ymdMatch = trimmed.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    if (month >= 0 && month < 12 && day >= 1 && day <= 31) {
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) return d;
    }
  }

  // 3. DD Month YYYY (e.g. "11 June 2015", "01 August 2024", "6 June 2013")
  const words = trimmed.split(/[\s,]+/);
  if (words.length === 3) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    let day = parseInt(words[0], 10);
    let monthStr = words[1].toLowerCase().slice(0, 3);
    let year = parseInt(words[2], 10);

    // check if month is first (e.g. "June 11 2015")
    if (isNaN(day) && months.includes(words[0].toLowerCase().slice(0, 3))) {
      monthStr = words[0].toLowerCase().slice(0, 3);
      day = parseInt(words[1], 10);
    }

    const monthIdx = months.indexOf(monthStr);
    if (monthIdx !== -1 && !isNaN(day) && !isNaN(year)) {
      const d = new Date(year, monthIdx, day);
      if (!isNaN(d.getTime())) return d;
    }
  }

  // 4. Standard Date parse
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime()) && parsed.getFullYear() > 1950) {
    return parsed;
  }

  // 5. Single 4-digit Year (e.g. "2015")
  const yearMatch = trimmed.match(/^(\d{4})$/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10);
    return new Date(year, 5, 1);
  }

  return null;
}

/**
 * Automatically calculates experience in years from date of joining (or rejoining) to current date.
 *
 * @param dateOfJoining - The faculty/staff member's official joining date
 * @param rejoiningDate - Optional rejoining date
 * @param fallbackExp - Optional hardcoded/prior experience string or number
 * @param options - Suffix and format options
 * @returns Formatted experience string (e.g., "30 Years", "4 Years", "1 Year", "< 1 Year")
 */
export function calculateFacultyExperience(
  dateOfJoining?: string,
  rejoiningDate?: string,
  fallbackExp?: string | number,
  options?: { suffix?: boolean; short?: boolean }
): string {
  const { suffix = true, short = false } = options || {};

  const parsedDoj = parseDateString(dateOfJoining);

  if (parsedDoj) {
    const now = new Date();
    let years = now.getFullYear() - parsedDoj.getFullYear();
    const m = now.getMonth() - parsedDoj.getMonth();
    const d = now.getDate() - parsedDoj.getDate();

    if (m < 0 || (m === 0 && d < 0)) {
      years--;
    }

    if (years > 0) {
      if (!suffix) return String(years);
      return short ? `${years} Yrs` : `${years} ${years === 1 ? "Year" : "Years"}`;
    } else {
      // If joined in the current year, check if fallbackExp has prior career experience (e.g. for guest faculty)
      if (
        fallbackExp !== undefined &&
        fallbackExp !== null &&
        String(fallbackExp).trim() !== "" &&
        String(fallbackExp).trim() !== "—"
      ) {
        const cleanFallback = String(fallbackExp).replace(/[^0-9]/g, "");
        const fallbackNum = parseInt(cleanFallback, 10);
        if (!isNaN(fallbackNum) && fallbackNum > 0) {
          if (!suffix) return String(fallbackNum);
          return short ? `${fallbackNum} Yrs` : `${fallbackNum} ${fallbackNum === 1 ? "Year" : "Years"}`;
        }
      }

      const totalMonths =
        (now.getFullYear() - parsedDoj.getFullYear()) * 12 + (now.getMonth() - parsedDoj.getMonth());
      if (totalMonths >= 6) {
        if (!suffix) return "1";
        return short ? "1 Yr" : "1 Year";
      }
      if (!suffix) return "< 1";
      return "< 1 Year";
    }
  }

  // If date cannot be parsed, use fallbackExp
  if (fallbackExp !== undefined && fallbackExp !== null && String(fallbackExp).trim() !== "") {
    const expStr = String(fallbackExp).trim();
    if (expStr === "—" || expStr === "-") return "—";
    const numMatch = expStr.match(/\d+/);
    if (numMatch) {
      const num = parseInt(numMatch[0], 10);
      if (!suffix) return String(num);
      return short ? `${num} Yrs` : `${num} ${num === 1 ? "Year" : "Years"}`;
    }
    return expStr;
  }

  return "—";
}
