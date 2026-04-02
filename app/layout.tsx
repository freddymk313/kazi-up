import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}