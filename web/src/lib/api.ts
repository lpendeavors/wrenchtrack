import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

type RouteHandler = (req: NextRequest) => Promise<NextResponse>;

export function withSentryAPI(name: string, handler: RouteHandler): RouteHandler {
  return async (req: NextRequest) => {
    return Sentry.withScope(async (scope) => {
      scope.setTag("route", name);
      scope.setContext("request", {
        url: req.url,
        method: req.method,
        headers: Object.fromEntries(req.headers.entries()),
      });
      try {
        return await Sentry.startSpan({ name, op: "http.server" }, async () => handler(req));
      } catch (error) {
        Sentry.captureException(error, { tags: { route: name, section: "api-route" }, level: "error" });
        throw error;
      }
    });
  };
}
