import * as Sentry from "@sentry/nextjs";

export function captureException(
  error: unknown,
  context?: {
    tags?: Record<string, string | number>;
    extra?: Record<string, unknown>;
    level?: Sentry.SeverityLevel;
  }
): string | undefined {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return undefined;
  return Sentry.withScope((scope) => {
    if (context?.tags) Object.entries(context.tags).forEach(([k, v]) => scope.setTag(k, String(v)));
    if (context?.extra) Object.entries(context.extra).forEach(([k, v]) => scope.setExtra(k, v));
    if (context?.level) scope.setLevel(context.level);
    return Sentry.captureException(error);
  });
}

export function captureMessage(
  message: string,
  context?: {
    tags?: Record<string, string | number>;
    extra?: Record<string, unknown>;
    level?: Sentry.SeverityLevel;
  }
): string | undefined {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return undefined;
  return Sentry.withScope((scope) => {
    if (context?.tags) Object.entries(context.tags).forEach(([k, v]) => scope.setTag(k, String(v)));
    if (context?.extra) Object.entries(context.extra).forEach(([k, v]) => scope.setExtra(k, v));
    if (context?.level) scope.setLevel(context.level);
    return Sentry.captureMessage(message, context?.level ?? "info");
  });
}

export function startSpan(
  name: string,
  op: string,
  attributes?: Record<string, unknown>
): Sentry.Span | undefined {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return undefined;
  return Sentry.startInactiveSpan({
    name,
    op,
    attributes: attributes as Record<string, string | number | boolean>,
  });
}

export function setUserContext(userId: string, clerkId?: string) {
  Sentry.setUser({ id: userId, clerkId });
}

export function clearUserContext() {
  Sentry.setUser(null);
}
