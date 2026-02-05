import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quest for Data Security",
  description: "An interactive journey through the mathematical concepts that protect the digital world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
