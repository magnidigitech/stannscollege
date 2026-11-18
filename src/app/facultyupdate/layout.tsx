import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty Profile Update Portal | St. Ann's College for Women",
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

export default function FacultyUpdateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

