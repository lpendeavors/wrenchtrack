import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";

globalThis.indexedDB = indexedDB;
globalThis.IDBKeyRange = IDBKeyRange;

import { WrenchTrackDB, generateLocalId } from "./db";

describe("WrenchTrackDB", () => {
  let db: WrenchTrackDB;

  beforeEach(() => {
    db = new WrenchTrackDB("TestDB" + Date.now());
  });

  afterEach(async () => {
    await db.delete();
  });

  it("has projects table", async () => {
    const count = await db.projects.count();
    expect(typeof count).toBe("number");
  });

  it("has photos table", async () => {
    const count = await db.photos.count();
    expect(typeof count).toBe("number");
  });

  it("has parts table", async () => {
    const count = await db.parts.count();
    expect(typeof count).toBe("number");
  });

  it("stores and retrieves a project", async () => {
    const localId = generateLocalId();
    const project = {
      localId,
      userId: "user_1",
      name: "Test Bike",
      vehicleType: "motorcycle" as const,
      status: "acquired" as const,
      isPublic: false,
      syncStatus: "synced" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const id = await db.projects.add(project);
    expect(typeof id).toBe("number");
    expect(id).toBeGreaterThan(0);

    const retrieved = await db.projects.get(id);
    expect(retrieved).toBeDefined();
    expect(retrieved!.name).toBe("Test Bike");
    expect(retrieved!.localId).toBe(localId);
  });

  it("stores project with optional fields", async () => {
    const project = {
      localId: generateLocalId(),
      userId: "user_1",
      name: "Full Bike",
      description: "A nice bike",
      vehicleType: "motorcycle" as const,
      make: "Honda",
      model: "CBR600RR",
      year: 2020,
      status: "in_progress" as const,
      buyPrice: 3000,
      buyDate: new Date("2024-01-01"),
      buySource: "Craigslist",
      sellPrice: 4500,
      sellDate: new Date("2024-03-01"),
      buyer: "John Doe",
      laborHours: 20,
      hourlyRate: 50,
      otherCosts: 500,
      aiEstimateLow: 4000,
      aiEstimateMid: 4500,
      aiEstimateHigh: 5000,
      aiConfidence: 80,
      isPublic: true,
      syncStatus: "synced" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const id = await db.projects.add(project);
    const retrieved = await db.projects.get(id);
    expect(retrieved!.make).toBe("Honda");
    expect(retrieved!.model).toBe("CBR600RR");
    expect(retrieved!.year).toBe(2020);
    expect(retrieved!.buyPrice).toBe(3000);
    expect(retrieved!.sellPrice).toBe(4500);
    expect(retrieved!.laborHours).toBe(20);
    expect(retrieved!.hourlyRate).toBe(50);
    expect(retrieved!.aiConfidence).toBe(80);
  });

  it("uses ++id auto-increment for projects", async () => {
    const id1 = await db.projects.add({
      localId: generateLocalId(),
      userId: "u1",
      name: "P1",
      vehicleType: "car" as const,
      status: "acquired" as const,
      isPublic: false,
      syncStatus: "synced" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const id2 = await db.projects.add({
      localId: generateLocalId(),
      userId: "u1",
      name: "P2",
      vehicleType: "car" as const,
      status: "acquired" as const,
      isPublic: false,
      syncStatus: "synced" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(id2).toBe(id1 + 1);
  });

  it("queries projects by status", async () => {
    await db.projects.bulkAdd([
      {
        localId: generateLocalId(),
        userId: "u1",
        name: "Sold Bike",
        vehicleType: "motorcycle" as const,
        status: "sold" as const,
        isPublic: false,
        syncStatus: "synced" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        localId: generateLocalId(),
        userId: "u1",
        name: "Active Bike",
        vehicleType: "motorcycle" as const,
        status: "in_progress" as const,
        isPublic: false,
        syncStatus: "synced" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const sold = await db.projects.where("status").equals("sold").toArray();
    expect(sold.length).toBe(1);
    expect(sold[0].name).toBe("Sold Bike");
  });

  it("queries projects by localId", async () => {
    const localId = generateLocalId();
    await db.projects.add({
      localId,
      userId: "u1",
      name: "Target",
      vehicleType: "car" as const,
      status: "acquired" as const,
      isPublic: false,
      syncStatus: "synced" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const found = await db.projects.where("localId").equals(localId).first();
    expect(found).toBeDefined();
    expect(found!.name).toBe("Target");
  });

  it("stores and retrieves a photo", async () => {
    const blob = new Blob(["photo"], { type: "image/jpeg" });
    const id = await db.photos.add({
      localId: generateLocalId(),
      projectLocalId: "proj_1",
      file: blob,
      stepOrder: 1,
      stepType: "progress" as const,
      takenAt: new Date(),
      syncStatus: "synced" as const,
      createdAt: new Date(),
    });
    const retrieved = await db.photos.get(id);
    expect(retrieved).toBeDefined();
    expect(retrieved!.stepType).toBe("progress");
    expect(retrieved!.stepOrder).toBe(1);
  });

  it("stores and retrieves a part", async () => {
    const id = await db.parts.add({
      localId: generateLocalId(),
      projectLocalId: "proj_1",
      name: "Brake Pad",
      partNumber: "BP-123",
      description: "Front brake pad",
      cost: 45.99,
      vendor: "RevZilla",
      vendorUrl: "https://revzilla.com",
      status: "installed" as const,
      orderedAt: new Date("2024-01-01"),
      receivedAt: new Date("2024-01-05"),
      installedAt: new Date("2024-01-10"),
      syncStatus: "synced" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const retrieved = await db.parts.get(id);
    expect(retrieved).toBeDefined();
    expect(retrieved!.name).toBe("Brake Pad");
    expect(retrieved!.cost).toBe(45.99);
    expect(retrieved!.status).toBe("installed");
  });
});

describe("generateLocalId", () => {
  it("generates unique ids", () => {
    const id1 = generateLocalId();
    const id2 = generateLocalId();
    expect(id1).not.toBe(id2);
  });

  it("starts with local_ prefix", () => {
    const id = generateLocalId();
    expect(id.startsWith("local_")).toBe(true);
  });

  it("contains timestamp and random parts", () => {
    const id = generateLocalId();
    const parts = id.split("_");
    expect(parts.length).toBe(3);
    expect(Number(parts[1])).toBeGreaterThan(0);
    expect(parts[2].length).toBeGreaterThan(0);
  });
});
