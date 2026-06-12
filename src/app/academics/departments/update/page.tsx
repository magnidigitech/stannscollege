"use client";

import React, { useEffect } from "react";
import { DepartmentUpdateForm } from "@/components/academics/departments/DepartmentUpdateForm";

export default function DepartmentUpdatePage() {
  useEffect(() => {
    document.documentElement.classList.add("no-layout");
    return () => {
      document.documentElement.classList.remove("no-layout");
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100 min-h-screen py-8 md:py-12 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <DepartmentUpdateForm />
      </div>
    </div>
  );
}
