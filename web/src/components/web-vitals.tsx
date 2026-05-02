"use client";

import { useReportWebVitals } from "next/web-vitals";
import * as Sentry from "@sentry/nextjs";

const THRESHOLDS: Record<string, { good: number; poor: number; unit: string }> = {
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  FID: { good: 100, poor: 300, unit: "ms" },
  INP: { good: 200, poor: 500, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
};

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const { id, name, value, rating, delta, navigationType } = metric;
    const threshold = THRESHOLDS[name];

    Sentry.captureMessage(`Web Vital: ${name}`, {
      level: rating === "poor" ? "warning" : "info",
      tags: { web_vital: name, rating, navigation_type: navigationType || "unknown" },
      extra: { webVitalId: id, value, delta, unit: threshold?.unit || "" },
    });

    if (rating === "poor") {
      console.warn(`[web-vitals] Poor ${name}: ${value}${threshold?.unit || ""} (threshold: ${threshold?.poor}${threshold?.unit || ""})`);
    }
  });

  return null;
}
