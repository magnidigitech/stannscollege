import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | St. Ann's College for Women",
  description: "Management & Customizer Admin Panel for St. Ann's College for Women, Gorantla.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[90] bg-slate-100 overflow-y-auto">
      {children}
    </div>
  );
}
