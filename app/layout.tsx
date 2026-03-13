import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Importation de Inter au lieu de Poppins
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  // Inter est une font variable, on n'a généralement pas besoin de spécifier les weights
  variable: '--font-inter', 
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}