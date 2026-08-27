import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zuneera Tariq — CS Student & Full-Stack Developer in the Making",
  description:
    "Personal portfolio of Zuneera Tariq — a BS Computer Science student at COMSATS University Islamabad, building full-stack web applications with React, Node.js, and databases.",
  keywords: [
    "Zuneera Tariq",
    "portfolio",
    "full-stack developer",
    "React",
    "Node.js",
    "MySQL",
    "computer science student",
  ],
  openGraph: {
    title: "Zuneera Tariq — Creative Developer",
    description:
      "Building digital experiences that shouldn't feel ordinary.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${jetbrains.variable} min-h-full`}>
        {children}
      </body>
    </html>
  );
}
