import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { Toaster } from "@/components/ui/sonner";

const segoeUI = localFont({
  src: "./SegoeUI.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Explore Repositories",
  description: "Explore repositories from GitHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <HydrationOverlay>
        <body className={`${segoeUI.className} dark`}>{children}</body>
        <Toaster />
      </HydrationOverlay>
    </html>
  );
}
