// @ts-check
const { withSentryConfig } = require("@sentry/nextjs");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
};

const pwaConfig = withPWA(nextConfig);

module.exports = withSentryConfig(pwaConfig, {
  silent: !process.env.CI,
  org: process.env.SENTRY_ORG || undefined,
  project: process.env.SENTRY_PROJECT || undefined,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  webpack: {
    treeShake: {
      removeDebugLogging: true,
    },
    automaticVercelMonitors: true,
  },
});
