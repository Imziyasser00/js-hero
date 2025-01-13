import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {FloatingNav} from "@jshero/components/ui/FloatingNavbar";
import {navItems} from "@jshero/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JS Hero",
  description: "\n" +
      "JS Hero is a gamified platform designed to teach JavaScript in a fun and interactive way. Users progress through personalized lessons, challenges, and quizzes while earning points and rewards to stay motivated. It combines modern technologies like React and Node.js to deliver an engaging learning experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <FloatingNav  navItems={navItems}/>

        {children}
      </body>
    </html>
  );
}
