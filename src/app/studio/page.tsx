"use client";

import dynamic from "next/dynamic";
import config from "../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <NextStudio config={config} />
    </div>
  );
}
