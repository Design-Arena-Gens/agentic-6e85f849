import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Level Maths Studio",
  description:
    "Interactive learning environment for A Level Maths and Further Maths with guided theory, diagnostics, and revision planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 text-slate-100 antialiased`}
      >
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_65%)] pb-16">
          {children}
        </div>
      </body>
    </html>
  );
}
