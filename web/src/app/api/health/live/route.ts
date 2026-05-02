import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "alive",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      pid: process.pid,
      memory: process.memoryUsage(),
    },
    { status: 200 }
  );
}
