import { PrismaClient } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

prisma.$use(async (params, next) => {
  const { model, action } = params;
  const operation = model ? `${model}.${action}` : action;

  const span = Sentry.startInactiveSpan({ op: "db.query", name: operation, onlyIfParent: true });
  if (span) {
    span.setAttribute("db.system", "postgresql");
    if (model) span.setAttribute("db.table", model);
    span.setAttribute("db.operation", action);
  }

  const start = performance.now();
  let error: unknown;

  try {
    const result = await next(params);
    return result;
  } catch (err) {
    error = err;
    throw err;
  } finally {
    const duration = performance.now() - start;
    if (span) {
      span.setAttribute("db.duration_ms", Math.round(duration));
      if (error) {
        span.setStatus({ code: 2, message: "internal_error" });
        span.setAttribute("error", error instanceof Error ? error.message : String(error));
      } else {
        span.setStatus({ code: 1, message: "ok" });
      }
      span.end();
    }
    if (duration > 500) {
      console.warn(`[prisma] Slow query detected: ${operation} took ${Math.round(duration)}ms`);
    }
  }
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
