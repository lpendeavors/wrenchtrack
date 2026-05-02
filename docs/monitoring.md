# WrenchTrack Monitoring & Observability Guide

Production-grade error tracking, performance monitoring, and alerting for WrenchTrack.

---

## Sentry Integration

Sentry is configured across three runtime contexts:

| File | Runtime | Purpose |
|------|---------|---------|
| `sentry.client.config.ts` | Browser | React errors, Web Vitals, replay on error |
| `sentry.server.config.ts` | Node.js (API routes) | Server exceptions, DB query spans |
| `sentry.edge.config.ts` | Edge (middleware) | Edge function errors |

### Source Maps

Source maps are automatically uploaded during production builds via `next.config.js`. Requires:

- `SENTRY_AUTH_TOKEN` — Sentry internal integration token
- `SENTRY_ORG` — your Sentry organization slug
- `SENTRY_PROJECT` — your Sentry project slug

### Manual Error Capture

Use helpers in `src/lib/sentry.ts`:

```ts
import { captureException, startSpan } from "@/lib/sentry";

captureException(err, { tags: { section: "project-creation" }, level: "error" });
const span = startSpan("Photo Upload", "upload");
span?.end();
```

---

## Performance Monitoring

### Web Vitals

The `WebVitalsReporter` component sends every Core Web Vital to Sentry with rating context.

**Alert thresholds:**

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤2.5s | ≤4.0s | >4.0s |
| INP/FID | ≤100ms | ≤300ms | >300ms |
| CLS | ≤0.1 | ≤0.25 | >0.25 |
| TTFB | ≤800ms | ≤1.8s | >1.8s |
| FCP | ≤1.8s | ≤3.0s | >3.0s |

### Database Query Monitoring

Prisma queries are instrumented via middleware in `src/lib/prisma.ts`. Each query becomes a Sentry span with operation name, duration, and status. Slow queries (>500ms) are logged to console.

### API Route Performance

API routes inherit Next.js automatic instrumentation. Custom spans can be added with `withSentryAPI()` from `src/lib/api.ts`.

---

## Health Checks

| Endpoint | Purpose | HTTP 200 Criteria |
|----------|---------|-------------------|
| `GET /api/health` | Comprehensive status | DB reachable |
| `GET /api/health/ready` | Readiness probe | DB reachable |
| `GET /api/health/live` | Liveness probe | Process running |

### Kubernetes Probe Configuration

```yaml
livenessProbe:
  httpGet:
    path: /api/health/live
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /api/health/ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

---

## Uptime Monitoring

### Recommended: UptimeRobot (Free Tier)

1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Create an HTTP(s) monitor for `https://your-domain.com/api/health`
3. Set interval to 5 minutes and alert contacts to Discord webhook + email

### Alert Thresholds

| Condition | Severity | Action |
|-----------|----------|--------|
| Error rate >1% for 5 min | Warning | Discord alert |
| API latency p95 >500ms for 10 min | Warning | Discord alert |
| Uptime <99% over 1 hour | Critical | Discord + email |
| `/api/health` returns 503 | Critical | Page on-call |

---

## Discord Alert Webhook

### Setup

1. In your Discord server, go to **Server Settings → Integrations → Webhooks**
2. Create a webhook for a dedicated `#alerts` channel
3. Set `DISCORD_ALERT_WEBHOOK` environment variable

### Alert Payload Template

```json
{
  "username": "WrenchTrack Alerts",
  "avatar_url": "https://your-cdn.com/wrenchtrack-icon.png",
  "embeds": [
    {
      "title": "🚨 Production Alert",
      "description": "Error rate exceeded 1% threshold",
      "color": 15158332,
      "fields": [
        { "name": "Service", "value": "wrenchtrack-web", "inline": true },
        { "name": "Environment", "value": "production", "inline": true },
        { "name": "Severity", "value": "critical", "inline": true },
        { "name": "Error Rate", "value": "2.3% (threshold: 1%)", "inline": false },
        { "name": "Sentry Link", "value": "[View Issues](https://sentry.io/...)" },
        { "name": "Time", "value": "2024-05-02T03:40:00Z" }
      ],
      "timestamp": "2024-05-02T03:40:00Z"
    }
  ]
}
```

### Sentry Discord Integration

1. In Sentry, go to **Settings → Integrations → Discord**
2. Connect your Discord server and map projects to channels
3. Configure alert rules for new issues, regressions, and error rate thresholds

---

## Privacy & Compliance

### No PII in Error Logs

Sentry `beforeSend` automatically scrubs:

- User `email`, `name`, `username`, `ip_address`
- Authorization and Cookie headers
- URL query parameters: `token`, `auth`, `password`, `secret`, `key`, `code`

### Opt-Out Option

Users can opt out of error tracking in **Settings → Privacy**:

```ts
export function setPrivacyOptOut(optOut: boolean) {
  localStorage.setItem("wt_error_tracking_opt_out", String(optOut));
}
export function isPrivacyOptedOut(): boolean {
  return localStorage.getItem("wt_error_tracking_opt_out") === "true";
}
```

### Data Retention

| Data Type | Retention | Notes |
|-----------|-----------|-------|
| Error events | 90 days | Sentry default |
| Performance transactions | 30 days | Sentry default |
| Replay sessions | 30 days | Sentry default |
| Health check logs | 7 days | Hosting provider |

### GDPR Considerations

- IP addresses are scrubbed
- No user emails or names in error events
- Users can request data deletion per Sentry issue

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SENTRY_DSN` | Yes (production) | Sentry project DSN |
| `SENTRY_AUTH_TOKEN` | Yes (CI builds) | Auth token for source maps |
| `SENTRY_ORG` | Yes (CI builds) | Sentry organization slug |
| `SENTRY_PROJECT` | Yes (CI builds) | Sentry project slug |
| `NEXT_PUBLIC_APP_ENV` | No | Environment label |
| `NEXT_PUBLIC_APP_VERSION` | No | App version tag |
| `DISCORD_ALERT_WEBHOOK` | No | Discord webhook URL |

---

## Runbook

### Sentry not receiving events

1. Check `NEXT_PUBLIC_SENTRY_DSN` is set
2. Verify `tunnelRoute: "/monitoring"` in `next.config.js`
3. Enable `debug: true` in `sentry.client.config.ts` temporarily

### Source maps not working

1. Confirm `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` in CI
2. Check Sentry release matches `NEXT_PUBLIC_APP_VERSION`

### Health checks failing

1. Check `DATABASE_URL` is valid
2. Review hosting function logs for timeouts

---

*Last updated: 2026-05-02*
