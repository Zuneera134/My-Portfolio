import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zuneera Tariq — Digital Experiences That Shouldn't Feel Ordinary",
  description:
    "Personal portfolio of Zuneera Tariq — a creative developer building premium digital experiences at the intersection of design, code, and motion.",
  keywords: [
    "portfolio",
    "creative developer",
    "frontend",
    "web design",
    "motion design",
  ],
  openGraph: {
    title: "Zuneera Tariq — Creative Developer",
    description: "Building digital experiences that shouldn't feel ordinary.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
