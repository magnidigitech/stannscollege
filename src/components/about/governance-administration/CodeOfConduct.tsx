"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ShieldCheck, Download, Users, FileText, Sparkles, Compass, Target, BookOpen, AlertCircle, Bookmark } from "lucide-react";

export function CodeOfConduct() {
  const [activeTab, setActiveTab] = useState<"students" | "employees">("students");
  const [openIds, setOpenIds] = useState<string[]>([]);

  const studentsSections = [
    {
      id: "std-overview",
      title: "Overview",
      icon: <Compass className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            The Students’ Code of Conduct at St. Ann’s College for Women defines the rules, responsibilities, and expected behavior of students to maintain a disciplined, safe, and academically focused environment. This policy is designed in alignment with institutional values and NAAC guidelines to promote responsible student conduct and holistic development.
          </p>
        </div>
      )
    },
    {
      id: "std-discipline",
      title: "1. General Discipline",
      icon: <Target className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            All students are expected to maintain high standards of discipline and behavior within the campus.
          </p>
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Students shall strictly adhere to all rules and regulations laid down by the college.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Any violation of rules or instructions will be recorded in the Identity Card and college records as a warning.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Upon three recorded violations, the college reserves the right to suspend or expel the student at any stage.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-timings",
      title: "2. College Timings & Assembly",
      icon: <FileText className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            The institution follows structured working hours to ensure academic discipline.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Working Hours</h5>
              <ul className="flex flex-col gap-1 text-xs md:text-sm text-slate-600 font-medium">
                <li>Monday to Friday: 8:55 AM – 3:00 PM</li>
                <li>Saturday: 8:55 AM – 12:30 PM</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Morning Assembly</h5>
              <p className="text-xs md:text-sm leading-relaxed text-slate-600 font-medium">
                Attendance is mandatory for all students. Must maintain absolute discipline, respect, and attentiveness during assembly.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "std-dress-code",
      title: "3. Dress Code",
      icon: <Bookmark className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Students must follow the prescribed dress code to maintain institutional decorum.
          </p>
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Students must attend college in the prescribed uniform only.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Dress should be modest, neat, and appropriate.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Excessive jewelry is discouraged to maintain a healthy and disciplined environment.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-id-cards",
      title: "4. Identity Card",
      icon: <ShieldCheck className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            The Identity Card is an essential requirement for all students.
          </p>
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Every student must carry her Identity Card at all times within the campus.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>The card must be produced when requested by college authorities.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Loss of ID card must be reported immediately; a duplicate will be issued on payment.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>The Identity Card must be surrendered during transfer or withdrawal for clearance.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-mobile",
      title: "5. Mobile Phone Usage",
      icon: <AlertCircle className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Mobile phones must be used responsibly and only for academic purposes.
          </p>
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Mobile phones are permitted only for academic activities such as internships and online learning.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Unauthorized use within classrooms, corridors, or offices is strictly prohibited.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Violation will result in confiscation and disciplinary action.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Students are strictly prohibited from taking photos or videos without official permission.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-certificates",
      title: "6. Certificates & Administrative Procedures",
      icon: <Bookmark className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Students must approach the College Office for certificates, testimonials, and official documents.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Direct approach to the Principal for such matters is discouraged unless permitted.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Original certificates submitted at the time of admission will not be returned. Students must retain photocopies.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>The original Transfer Certificate (T.C.) will not be returned after admission.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-cleanliness",
      title: "7. Cleanliness & Campus Discipline",
      icon: <Sparkles className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Maintaining a clean and disciplined campus is the responsibility of every student.
          </p>
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Students must maintain cleanliness and hygiene of the campus and buildings.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Loitering near the Principal’s chamber, corridors, or classrooms without purpose is prohibited.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Students should use designated areas such as the Waiting Hall during free time.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Sitting on parked vehicles or misuse of vehicles is strictly prohibited and may attract a fine.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-vehicles",
      title: "8. Two-Wheeler Regulations",
      icon: <Users className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Students using two-wheelers must follow strict safety rules.
          </p>
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Students must submit: Proof of Date of Birth, valid Driving License, and an undertaking to wear a helmet.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Triple riding and unsafe driving practices are strictly prohibited.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-notices",
      title: "9. Notice Board & Communication",
      icon: <FileText className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Students must stay informed about academic and administrative updates.
          </p>
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Students must regularly check the College Notice Board.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Must respond promptly to official communications via WhatsApp/SMS alerts.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Important updates include: APSCHE & ANU notifications, fee payments, and examination schedules/results.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-anti-ragging",
      title: "10. Anti-Ragging Policy",
      icon: <AlertCircle className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            The institution strictly enforces anti-ragging regulations.
          </p>
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Ragging in any form is strictly prohibited.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Violations will be dealt with under the Prohibition of Ragging Act, 1996.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Strict disciplinary action, including expulsion, will be taken against offenders.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-parents",
      title: "11. Guidelines for Parents",
      icon: <Users className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Parents play a vital role in supporting student discipline and academic success.
          </p>
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Parents/Guardians must ensure regularity and punctuality of their wards.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>They should monitor academic progress and behavior.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Parents are encouraged to communicate with the institution for any concerns.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Attendance at Parent-Teacher Meetings is mandatory when invited.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "std-conclusion",
      title: "Conclusion & Approval",
      icon: <Bookmark className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            The Students’ Code of Conduct ensures a disciplined, respectful, and supportive academic environment. By adhering to these guidelines, students contribute to maintaining the institution’s standards of excellence and uphold its values of integrity, responsibility, and academic commitment.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs md:text-sm">
            <h5 className="font-outfit font-black text-slate-800 mb-1">Policy Scope & Compliance</h5>
            <p className="text-slate-500">
              Policy Aligned with Institutional and NAAC Guidelines. Applicable to all students of the institution.
            </p>
          </div>
        </div>
      )
    }
  ];

  const employeesSections = [
    {
      id: "emp-overview",
      title: "Overview",
      icon: <Compass className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            The Code of Conduct for employees of St. Ann’s College for Women establishes the professional standards, ethical values, and responsibilities expected from all teaching and non-teaching staff. It ensures a disciplined, respectful, transparent, and academically focused institutional environment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Purpose</h5>
              <ul className="flex flex-col gap-1 text-xs md:text-sm font-medium text-slate-600">
                <li>Uphold integrity, professionalism, and values</li>
                <li>Ensure ethical conduct and accountability</li>
                <li>Maintain discipline and institutional reputation</li>
                <li>Promote a safe and respectful workplace</li>
              </ul>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Scope</h5>
              <ul className="flex flex-col gap-1 text-xs md:text-sm font-medium text-slate-600">
                <li>All teaching staff</li>
                <li>All non-teaching staff</li>
                <li>All employees irrespective of designation</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "emp-general",
      title: "1. General Rules & Responsibilities",
      icon: <Target className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Mandatory to wear ID card on campus at all times and surrender upon resignation.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Any change in address must be reported within 3 days.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Maintain integrity, punctuality, and dedication.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Act as role models for students and maintain cordial colleague relationships.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Follow "No Work – No Pay" policy for unauthorized absences.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Avoid use of substances and maintain professional public and campus conduct.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "emp-employment",
      title: "2. Employment Rules",
      icon: <Bookmark className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Working Hours: Standard 8 hours per day, varying by institutional needs.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Restrictions: No other external employment or trade activities without official approval.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Safety Responsibilities: Report hazards or risks immediately and follow safety procedures.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "emp-leave",
      title: "3. Leave & Vacation Policy",
      icon: <FileText className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Casual Leave</h5>
              <p className="text-xs md:text-sm text-slate-500">15 days per year, maximum 3 days at a time. Non-cumulative.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Medical Leave</h5>
              <p className="text-xs md:text-sm text-slate-500">Up to 5 days, extendable to 10. Requires a certificate beyond 3 days.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Maternity & Official</h5>
              <p className="text-xs md:text-sm text-slate-500">3 months with pay. Official leave for academic duties/trainings.</p>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs md:text-sm mt-1">
            <h5 className="font-outfit font-black text-slate-800 mb-1">General & Vacation Rules</h5>
            <p className="text-slate-500 font-medium leading-relaxed">
              Teaching staff are eligible for a minimum of 45 days, and non-teaching staff a minimum of 30 days of vacation, subject to administrative requirements.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "emp-disciplinary",
      title: "4. Disciplinary Framework",
      icon: <ShieldCheck className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            Covers various cases of misconduct, minor/major penalties, processes, and review systems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Minor Penalties</h5>
              <ul className="flex flex-col gap-1 text-xs md:text-sm text-slate-500 font-medium">
                <li>Warning / Censure</li>
                <li>Fines & deductions</li>
                <li>Suspension up to 7 days</li>
                <li>Withholding increment/promotion</li>
              </ul>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1">Major Penalties</h5>
              <ul className="flex flex-col gap-1 text-xs md:text-sm text-slate-500 font-medium">
                <li>Reduction in rank/pay</li>
                <li>Compulsory retirement</li>
                <li>Termination / dismissal</li>
                <li>Official Enquiry process</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "emp-separation",
      title: "5. Separation & Retirement",
      icon: <Users className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <ul className="grid grid-cols-1 gap-2.5 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Resignation requires a written notice or salary in lieu with a proper handover.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Termination based on misconduct or institutional needs under proper rules.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Superannuation/Retirement age is strictly set at 58 years.</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>All institutional property must be returned; damages may be recovered.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "emp-values",
      title: "6. Institutional Values",
      icon: <Sparkles className="h-4 w-4 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <p className="text-sm md:text-base font-normal leading-relaxed mb-1">
            All administrative and instructional staff must uphold high standards of professionalism and integrity.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Professionalism & Integrity</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Transparency & Accountability</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Respect & Inclusivity</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Commitment to Excellence</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const currentSections = activeTab === "students" ? studentsSections : employeesSections;

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setOpenIds(currentSections.map((s) => s.id));
    } else {
      setOpenIds(["std-overview", "emp-overview"]);
    }
  }, [activeTab]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-8 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <ShieldCheck className="h-3.5 w-3.5" /> Institutional Values
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Code of Conduct
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Establishing standard rules, ethical values, and professional behaviors expected of students and employees.
            </p>
          </div>
          <a
            href={
              activeTab === "students"
                ? "/documents/code-of-conduct/3.8 Students Code of Conduct.pdf"
                : "/documents/code-of-conduct/Code of Conduct for Employees.pdf"
            }
            download
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 text-xs md:text-sm font-bold text-white transition-all shadow-md active:scale-95 backdrop-blur-md shrink-0"
          >
            <Download className="h-4 w-4" /> Download Official PDF
          </a>
        </div>
      </div>

      {/* Tab switches */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 border border-slate-200/50 rounded-2xl max-w-md select-none">
        <button
          onClick={() => setActiveTab("students")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "students"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Users className="h-4 w-4 shrink-0" /> Students
        </button>
        <button
          onClick={() => setActiveTab("employees")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "employees"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="h-4 w-4 shrink-0" /> Employees
        </button>
      </div>

      {/* Accordions List Area */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col gap-4">
        {currentSections.map((section) => (
          <div
            key={section.id}
            className={`overflow-hidden border transition-all duration-300 rounded-2xl ${
              openIds.includes(section.id)
                ? "bg-indigo-50/20 border-indigo-200/80 shadow-md"
                : "bg-white border-slate-100 hover:border-indigo-100 hover:shadow-sm"
            }`}
          >
            <button
              onClick={() => toggleAccordion(section.id)}
              className="w-full flex items-center justify-between px-6 py-4 outline-none text-left select-none"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 text-xs shrink-0 select-none">
                  {section.icon}
                </span>
                <h4 className="font-outfit font-black text-slate-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                  {section.title}
                </h4>
              </div>
            </button>

            {openIds.includes(section.id) && (
              <div className="px-6 pb-5 pt-1 border-t border-indigo-100/40 animate-fadeIn">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
