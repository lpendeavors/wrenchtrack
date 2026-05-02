export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ready", timestamp: new Date().toISOString() }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "not_ready", timestamp: new Date().toISOString() }, { status: 503 });
  }
}
