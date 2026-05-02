import { WrenchTrackDB } from "@/lib/db";

export async function createMockData() {
  const db = new WrenchTrackDB();
  
  // Add a sample project for demo
  await db.projects.add({
    localId: "local_demo_001",
    userId: "demo",
    name: "Honda GX200 Generator Flip",
    description: "Bought a non-running generator for $25. Plan to replace carburetor and gaskets, then sell.",
    vehicleType: "small_engine",
    make: "Honda",
    model: "GX200",
    year: 2018,
    status: "in_progress",
    buyPrice: 25,
    buyDate: new Date("2026-04-15"),
    buySource: "Facebook Marketplace",
    laborHours: 2.5,
    hourlyRate: 25,
    otherCosts: 35,
    aiEstimateMid: 140,
    aiConfidence: 70,
    isPublic: false,
    syncStatus: "synced",
    createdAt: new Date("2026-04-15"),
    updatedAt: new Date(),
  });

  console.log("Mock data created!");
}
