import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "pdfjs-dist"],

  allowedDevOrigins: ["*.replit.dev", "*.worf.replit.dev", "*.repl.co"],

  turbopack: {},
};

export default nextConfig;
