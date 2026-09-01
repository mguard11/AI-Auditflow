import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "MangoLogic — AI Audit Engine",
    template: "%s | MangoLogic",
  },
  description:
    "MangoLogic installs an AI audit engine into your VPC. Your compliance data never leaves your infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-primary text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
