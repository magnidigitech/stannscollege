import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Department Update Portal | St. Ann's College for Women",
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

export default function UpdateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

