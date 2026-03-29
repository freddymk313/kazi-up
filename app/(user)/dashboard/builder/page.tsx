import dynamic from "next/dynamic";

export default dynamic(() => import("@/components/BuilderClient"), {
  ssr: false,
});