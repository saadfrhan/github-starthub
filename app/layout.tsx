import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const segoeUI = localFont({
  src: "./SegoeUI.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github-starthub.vercel.app"),
  title: "GitHub StartHub",
  description: "Explore your GitHub profile in a beautiful way",
  openGraph: {
    title: "GitHub StartHub",
    description: "Explore your GitHub profile in a beautiful way",
    url: "https://github-starthub.vercel.app",
    siteName: "GitHub StartHub",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "GitHub StartHub",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${segoeUI.className} dark`}>{children}</body>
      <Toaster />
    </html>
  );
}
