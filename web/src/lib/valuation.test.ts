import { describe, it, expect } from "vitest";
import { ruleBasedValuation, selectValuationMethod } from "./valuation";
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
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

describe("ruleBasedValuation", () => {
  it("returns valuation for basic project", () => {
    const project = makeProject({
      buyPrice: 500,
      otherCosts: 100,
      laborHours: 4,
      hourlyRate: 25,
      vehicleType: "motorcycle",
    });
    const result = ruleBasedValuation(project);
    expect(result.estimatedValueMid).toBeGreaterThan(0);
    expect(result.estimatedValueLow).toBeLessThan(result.estimatedValueMid);
    expect(result.estimatedValueHigh).toBeGreaterThan(result.estimatedValueMid);
    expect(result.confidenceScore).toBeGreaterThanOrEqual(0);
    expect(result.confidenceScore).toBeLessThanOrEqual(100);
    expect(result.method).toBe("rule");
    expect(result.reasoning.length).toBeGreaterThan(0);
  });

  it("applies motorcycle multiplier of 2.2", () => {
    const project = makeProject({
      buyPrice: 1000,
      otherCosts: 0,
      laborHours: 0,
      vehicleType: "motorcycle",
      status: "sold",
    });
    const result = ruleBasedValuation(project);
    const expectedBase = 1000 * 2.2 * 1.1 * 1.0; // cost * mult * photos * status
    expect(result.estimatedValueMid).toBe(Math.round(expectedBase));
  });

  it("applies car multiplier of 2.5", () => {
    const project = makeProject({
      buyPrice: 1000,
      otherCosts: 0,
      laborHours: 0,
      vehicleType: "car",
      status: "sold",
    });
    const result = ruleBasedValuation(project);
    const expectedBase = 1000 * 2.5 * 1.1 * 1.0;
    expect(result.estimatedValueMid).toBe(Math.round(expectedBase));
  });

  it("applies atv multiplier of 1.8", () => {
    const project = makeProject({
      buyPrice: 1000,
      otherCosts: 0,
      laborHours: 0,
      vehicleType: "atv",
      status: "sold",
    });
    const result = ruleBasedValuation(project);
    const expectedBase = 1000 * 1.8 * 1.1 * 1.0;
    expect(result.estimatedValueMid).toBe(Math.round(expectedBase));
  });

  it("applies small_engine multiplier of 2.0", () => {
    const project = makeProject({
      buyPrice: 1000,
      otherCosts: 0,
      laborHours: 0,
      vehicleType: "small_engine",
      status: "sold",
    });
    const result = ruleBasedValuation(project);
    const expectedBase = 1000 * 2.0 * 1.1 * 1.0;
    expect(result.estimatedValueMid).toBe(Math.round(expectedBase));
  });

  it("uses default multiplier of 2.0 for unknown type", () => {
    const project = makeProject({
      buyPrice: 1000,
      otherCosts: 0,
      laborHours: 0,
      vehicleType: "other" as any,
      status: "sold",
    });
    const result = ruleBasedValuation(project);
    const expectedBase = 1000 * 2.0 * 1.1 * 1.0;
    expect(result.estimatedValueMid).toBe(Math.round(expectedBase));
  });

  it("adds labor cost to total cost", () => {
    const project = makeProject({
      buyPrice: 500,
      otherCosts: 0,
      laborHours: 10,
      hourlyRate: 50,
      vehicleType: "motorcycle",
      status: "sold",
    });
    const result = ruleBasedValuation(project);
    const totalCost = 500 + 500;
    // photos 1.1 + labor 0.05 = 1.15 condition factor
    const expectedBase = totalCost * 2.2 * 1.15 * 1.0;
    expect(result.estimatedValueMid).toBe(Math.round(expectedBase));
  });

  it("applies ready_for_sale premium", () => {
    const project = makeProject({
      buyPrice: 1000,
      vehicleType: "motorcycle",
      status: "ready_for_sale",
    });
    const result = ruleBasedValuation(project);
    // photos 1.1, status 1.15
    const expectedBase = 1000 * 2.2 * 1.15 * 1.1;
    expect(result.estimatedValueMid).toBe(Math.round(expectedBase));
    expect(result.reasoning.some((r) => r.includes("15% premium"))).toBe(true);
  });

  it("applies in_progress discount", () => {
    const project = makeProject({
      buyPrice: 1000,
      vehicleType: "motorcycle",
      status: "in_progress",
    });
    const result = ruleBasedValuation(project);
    // photos 1.1, status 0.85
    const expectedBase = 1000 * 2.2 * 0.85 * 1.1;
    expect(result.estimatedValueMid).toBe(Math.round(expectedBase));
    expect(result.reasoning.some((r) => r.includes("In-progress discount"))).toBe(true);
  });

  it("includes labor logging in reasoning when laborHours > 0", () => {
    const project = makeProject({
      buyPrice: 1000,
      laborHours: 5,
    });
    const result = ruleBasedValuation(project);
    expect(result.reasoning.some((r) => r.includes("Labor logging"))).toBe(true);
  });

  it("includes parts tracking in reasoning when parts exist", () => {
    const project = makeProject({
      buyPrice: 1000,
      parts: [{ name: "Brake Pad" }],
    } as any);
    const result = ruleBasedValuation(project);
    expect(result.reasoning.some((r) => r.includes("Parts tracking"))).toBe(true);
  });

  it("variance is 20% (low = 0.8x, high = 1.2x)", () => {
    const project = makeProject({
      buyPrice: 1000,
      vehicleType: "motorcycle",
      status: "sold",
    });
    const result = ruleBasedValuation(project);
    expect(result.estimatedValueLow).toBe(Math.round(result.estimatedValueMid * 0.8));
    expect(result.estimatedValueHigh).toBe(Math.round(result.estimatedValueMid * 1.2));
  });

  it("confidence score increases with data completeness", () => {
    const minimal = makeProject({ buyPrice: 0 });
    const complete = makeProject({
      buyPrice: 500,
      otherCosts: 100,
      laborHours: 5,
      year: 2020,
      make: "Honda",
      model: "CBR",
    });
    const minimalResult = ruleBasedValuation(minimal);
    const completeResult = ruleBasedValuation(complete);
    expect(completeResult.confidenceScore).toBeGreaterThan(minimalResult.confidenceScore);
  });

  it("caps confidence score at 95", () => {
    const project = makeProject({
      buyPrice: 500,
      otherCosts: 100,
      laborHours: 5,
      year: 2020,
      make: "Honda",
      model: "CBR",
    });
    const result = ruleBasedValuation(project);
    expect(result.confidenceScore).toBeLessThanOrEqual(95);
  });
});

describe("selectValuationMethod", () => {
  it("returns AI valuation when AI estimate exists with high confidence", () => {
    const project = makeProject({
      aiEstimateMid: 5000,
      aiConfidence: 75,
      aiEstimateLow: 4000,
      aiEstimateHigh: 6000,
    });
    const result = selectValuationMethod(project);
    expect(result.method).toBe("ai");
    expect(result.estimatedValueMid).toBe(5000);
    expect(result.confidenceScore).toBe(75);
    expect(result.reasoning[0]).toBe("AI valuation available with high confidence");
  });

  it("computes low/high from mid when not provided for AI", () => {
    const project = makeProject({
      aiEstimateMid: 5000,
      aiConfidence: 75,
    });
    const result = selectValuationMethod(project);
    expect(result.estimatedValueLow).toBe(4000);
    expect(result.estimatedValueHigh).toBe(6000);
  });

  it("falls back to rule-based when AI confidence is low", () => {
    const project = makeProject({
      aiEstimateMid: 5000,
      aiConfidence: 50,
    });
    const result = selectValuationMethod(project);
    expect(result.method).toBe("rule");
  });

  it("falls back to rule-based when no AI estimate", () => {
    const project = makeProject({
      buyPrice: 500,
    });
    const result = selectValuationMethod(project);
    expect(result.method).toBe("rule");
  });
});
