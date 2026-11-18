import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Department Portal Update | St. Ann's College for Women",
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

export default function DepartmentUpdateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

