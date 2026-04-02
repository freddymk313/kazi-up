"use client";
import dynamic from "next/dynamic";

const BuilderClient = dynamic(() => import("@/components/BuilderClient"), {
  ssr: false,
});

export default function Page() {
  return <BuilderClient />;
}
