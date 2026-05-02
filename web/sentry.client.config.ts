import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 1.0,
  environment: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || "development",
  release: process.env.NEXT_PUBLIC_APP_VERSION || undefined,
  beforeSend(event) {
    if (event.user) {
      delete event.user.email;
      delete event.user.name;
      delete event.user.username;
      delete event.user.ip_address;
    }
    if (event.request?.url) {
      try {
        const url = new URL(event.request.url);
        const sensitiveParams = ["token", "auth", "password", "secret", "key", "code"];
        for (const param of sensitiveParams) url.searchParams.delete(param);
        event.request.url = url.toString();
      } catch { /* ignore */ }
    }
    if (event.request?.headers) {
      const headers = event.request.headers as Record<string, string>;
      delete headers["authorization"];
      delete headers["cookie"];
      delete headers["x-api-key"];
    }
    return event;
  },
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  debug: process.env.NODE_ENV === "development" && !!process.env.NEXT_PUBLIC_SENTRY_DSN,
});
