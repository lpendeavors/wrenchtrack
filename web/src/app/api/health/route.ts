export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const checks = {
    database: false,
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || "unknown",
    environment: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || "unknown",
  };

  let status = 200;
  let dbLatencyMs = 0;

  try {
    const dbStart = performance.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Math.round(performance.now() - dbStart);
    checks.database = true;
  } catch (err) {
    checks.database = false;
    status = 503;
    console.error("[health] Database check failed:", err);
  }

  return NextResponse.json(
    { status: status === 200 ? "healthy" : "degraded", checks, latency: { database: dbLatencyMs } },
    { status }
  );
}
