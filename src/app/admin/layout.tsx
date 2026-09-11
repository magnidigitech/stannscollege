import React from "react";

export const metadata = {
  title: "Admin Panel | St. Ann's College for Women",
  description: "Management & Customizer Admin Panel for St. Ann's College for Women, Gorantla.",
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
