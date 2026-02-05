import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-website-one-mu-68.vercel.app"),
  title: "M. Scott \u2014 Louisville, KY",
  description: "Nine years translating healthcare regulations into working systems. Portfolio of deployed software, automation, and strategic documents.",
  openGraph: {
    title: "M. Scott \u2014 Louisville, KY",
    description: "Complexity, untangled. Systems, software, proof.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Scott \u2014 Louisville, KY",
    description: "Complexity, untangled. Systems, software, proof.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
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
