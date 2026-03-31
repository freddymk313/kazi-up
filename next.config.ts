import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "pdf-parse", "mammoth"],

  allowedDevOrigins: ["*.replit.dev", "*.worf.replit.dev", "*.repl.co"],

  turbopack: {},
};

export default nextConfig;
