import Dexie, { type Table } from "dexie";

export interface OfflineProject {
  id?: number;
  localId: string;
  userId: string;
  name: string;
  description?: string;
  vehicleType: "small_engine" | "motorcycle" | "atv" | "car" | "other";
  make?: string;
  model?: string;
  year?: number;
  status: "acquired" | "in_progress" | "ready_for_sale" | "sold" | "archived";
  buyPrice?: number;
  buyDate?: Date;
  buySource?: string;
  sellPrice?: number;
  sellDate?: Date;
  buyer?: string;
  laborHours?: number;
  hourlyRate?: number;
  otherCosts?: number;
  aiEstimateLow?: number;
  aiEstimateMid?: number;
  aiEstimateHigh?: number;
  aiConfidence?: number;
  isPublic: boolean;
  syncStatus: "synced" | "pending" | "conflict";
  createdAt: Date;
  updatedAt: Date;
}

export interface OfflineProjectPhoto {
  id?: number;
  localId: string;
  projectLocalId: string;
  file: Blob;
  thumbnailFile?: Blob;
  note?: string;
  stepOrder: number;
  stepType: "disassembly" | "assembly" | "progress";
  takenAt: Date;
  syncStatus: "synced" | "pending" | "conflict";
  createdAt: Date;
}

export interface OfflineProjectPart {
  id?: number;
  localId: string;
  projectLocalId: string;
  name: string;
  partNumber?: string;
  description?: string;
  cost?: number;
  vendor?: string;
  vendorUrl?: string;
  status: "ordered" | "shipped" | "received" | "installed" | "returned";
  orderedAt?: Date;
  receivedAt?: Date;
  installedAt?: Date;
  syncStatus: "synced" | "pending" | "conflict";
  createdAt: Date;
  updatedAt: Date;
}

export class WrenchTrackDB extends Dexie {
  projects!: Table<OfflineProject>;
  photos!: Table<OfflineProjectPhoto>;
  parts!: Table<OfflineProjectPart>;

  constructor(dbName = "WrenchTrackDB") {
    super(dbName);
    this.version(1).stores({
      projects: "++id, localId, userId, status, syncStatus, updatedAt",
      photos: "++id, localId, projectLocalId, stepOrder, syncStatus",
      parts: "++id, localId, projectLocalId, status, syncStatus, updatedAt",
    });
  }
}

export const db = new WrenchTrackDB();

export function generateLocalId(): string {
  return `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
