import { describe, it, expect } from "vitest";
import { calculateProjectProfit, calculatePortfolioProfit } from "./profit";
import type { OfflineProject } from "./db";

function makeProject(overrides: Partial<OfflineProject> = {}): OfflineProject {
  return {
    localId: "local_test",
    userId: "user_test",
    name: "Test Project",
    vehicleType: "motorcycle",
    status: "in_progress",
    isPublic: false,
    syncStatus: "synced",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    ...overrides,
  };
}

describe("calculateProjectProfit", () => {
  it("returns zero profit for empty project", () => {
    const result = calculateProjectProfit(makeProject());
    expect(result.revenue).toBe(0);
    expect(result.totalCosts).toBe(0);
    expect(result.grossProfit).toBe(0);
    expect(result.grossMarginPercent).toBe(0);
    expect(result.roiPercent).toBe(0);
    expect(result.daysHeld).toBe(0);
    expect(result.profitPerDay).toBe(0);
  });

  it("calculates profit for sold project with labor", () => {
    const project = makeProject({
      buyPrice: 500,
      sellPrice: 1500,
      otherCosts: 200,
      laborHours: 10,
      hourlyRate: 50,
      buyDate: new Date("2024-01-01"),
      sellDate: new Date("2024-01-11"),
    });
    const result = calculateProjectProfit(project);
    expect(result.revenue).toBe(1500);
    expect(result.buyCost).toBe(500);
    expect(result.partsCost).toBe(200);
    expect(result.laborCost).toBe(500);
    expect(result.totalCosts).toBe(1200);
    expect(result.grossProfit).toBe(300);
    expect(result.grossMarginPercent).toBe(20);
    expect(result.roiPercent).toBe(60);
    expect(result.daysHeld).toBe(10);
    expect(result.profitPerDay).toBe(30);
  });

  it("uses default hourly rate of 25 when not set", () => {
    const project = makeProject({
      buyPrice: 100,
      laborHours: 4,
    });
    const result = calculateProjectProfit(project);
    expect(result.laborCost).toBe(100);
    expect(result.totalCosts).toBe(200);
  });

  it("returns 0 margin percent when revenue is 0", () => {
    const project = makeProject({
      buyPrice: 100,
      otherCosts: 50,
    });
    const result = calculateProjectProfit(project);
    expect(result.grossMarginPercent).toBe(0);
  });

  it("returns 0 roi percent when buy cost is 0", () => {
    const project = makeProject({
      sellPrice: 200,
    });
    const result = calculateProjectProfit(project);
    expect(result.roiPercent).toBe(0);
  });

  it("calculates daysHeld from buyDate to sellDate", () => {
    const project = makeProject({
      buyDate: new Date("2024-01-01"),
      sellDate: new Date("2024-01-05"),
    });
    const result = calculateProjectProfit(project);
    expect(result.daysHeld).toBe(4);
  });

  it("calculates daysHeld from buyDate to now when not sold", () => {
    const buyDate = new Date();
    buyDate.setDate(buyDate.getDate() - 7);
    const project = makeProject({ buyDate });
    const result = calculateProjectProfit(project);
    expect(result.daysHeld).toBe(7);
  });

  it("returns daysHeld of 0 when no buyDate", () => {
    const project = makeProject();
    const result = calculateProjectProfit(project);
    expect(result.daysHeld).toBe(0);
    expect(result.profitPerDay).toBe(0);
  });

  it("returns at least 1 day when buyDate equals sellDate", () => {
    const sameDay = new Date("2024-01-01T10:00:00");
    const project = makeProject({
      buyDate: sameDay,
      sellDate: new Date("2024-01-01T12:00:00"),
    });
    const result = calculateProjectProfit(project);
    expect(result.daysHeld).toBe(1);
  });

  it("calculates negative profit (loss) correctly", () => {
    const project = makeProject({
      buyPrice: 1000,
      sellPrice: 500,
      otherCosts: 200,
    });
    const result = calculateProjectProfit(project);
    expect(result.grossProfit).toBe(-700);
    expect(result.grossMarginPercent).toBe(-140);
    expect(result.roiPercent).toBe(-70);
  });
});

describe("calculatePortfolioProfit", () => {
  it("returns zeros for empty array", () => {
    const result = calculatePortfolioProfit([]);
    expect(result.totalRevenue).toBe(0);
    expect(result.totalCosts).toBe(0);
    expect(result.totalProfit).toBe(0);
    expect(result.avgMarginPercent).toBe(0);
    expect(result.totalProjects).toBe(0);
    expect(result.profitableProjects).toBe(0);
  });

  it("aggregates multiple projects", () => {
    const projects = [
      makeProject({ sellPrice: 1000, buyPrice: 500, otherCosts: 100 }),
      makeProject({ sellPrice: 2000, buyPrice: 800, otherCosts: 200 }),
    ];
    const result = calculatePortfolioProfit(projects);
    expect(result.totalRevenue).toBe(3000);
    expect(result.totalCosts).toBe(1600);
    expect(result.totalProfit).toBe(1400);
    expect(result.totalProjects).toBe(2);
    expect(result.profitableProjects).toBe(2);
  });

  it("counts only profitable projects", () => {
    const projects = [
      makeProject({ sellPrice: 1000, buyPrice: 500 }),
      makeProject({ sellPrice: 300, buyPrice: 500 }),
    ];
    const result = calculatePortfolioProfit(projects);
    expect(result.profitableProjects).toBe(1);
  });

  it("calculates average margin across projects", () => {
    const projects = [
      makeProject({ sellPrice: 1000, buyPrice: 500 }),
      makeProject({ sellPrice: 2000, buyPrice: 1000 }),
    ];
    const result = calculatePortfolioProfit(projects);
    expect(result.avgMarginPercent).toBe(50);
  });
});
