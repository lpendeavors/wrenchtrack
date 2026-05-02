import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SentryErrorBoundary } from "@/components/error-boundary";
import { WebVitalsReporter } from "@/components/web-vitals";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WrenchTrack — Track Every Bolt, Every Dollar, Every Flip",
  description:
    "The project-management operating system for the garage warrior. Track builds, parts, costs, and profits — even offline.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WrenchTrack",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c4a6e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        </head>
        <body className={inter.className}>
          <SentryErrorBoundary>{children}</SentryErrorBoundary>
          <WebVitalsReporter />
        </body>
      </html>
    </ClerkProvider>
  );
}
