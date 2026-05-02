import type { OfflineProject } from "./db";

export interface ValuationResult {
  estimatedValueLow: number;
  estimatedValueMid: number;
  estimatedValueHigh: number;
  confidenceScore: number;
  method: "ai" | "rule" | "cost_plus" | "comparable";
  reasoning: string[];
}

export function ruleBasedValuation(project: OfflineProject): ValuationResult {
  const buyPrice = project.buyPrice || 0;
  const otherCosts = project.otherCosts || 0;
  const laborHours = project.laborHours || 0;
  const hourlyRate = project.hourlyRate || 25;
  const laborCost = laborHours * hourlyRate;
  const totalCost = buyPrice + otherCosts + laborCost;

  const reasoning: string[] = [];

  // Cost-plus method: 1.5x-3x total costs depending on vehicle type
  const vehicleMultipliers: Record<string, number> = {
    small_engine: 2.0,
    motorcycle: 2.2,
    atv: 1.8,
    car: 2.5,
    other: 2.0,
  };

  const multiplier = vehicleMultipliers[project.vehicleType] || 2.0;
  reasoning.push(
    `Cost-plus: ${project.vehicleType} uses ${multiplier}x cost multiplier`
  );

  // Condition adjustments
  let conditionFactor = 1.0;
  const hasPhotos = true;
  const hasParts = (project as { parts?: unknown[] }).parts && (project as { parts?: unknown[] }).parts!.length > 0;
  const hasLaborLogged = laborHours > 0;

  if (hasPhotos) {
    conditionFactor += 0.1;
    reasoning.push("Photo documentation adds 10% confidence");
  }
  if (hasParts) {
    conditionFactor += 0.05;
    reasoning.push("Parts tracking adds 5% confidence");
  }
  if (hasLaborLogged) {
    conditionFactor += 0.05;
    reasoning.push("Labor logging adds 5% confidence");
  }

  // Status adjustments
  let statusFactor = 1.0;
  if (project.status === "ready_for_sale") {
    statusFactor = 1.15;
    reasoning.push("Ready for sale status adds 15% premium");
  } else if (project.status === "sold") {
    statusFactor = 1.0;
    reasoning.push("Sold at actual price");
  } else if (project.status === "in_progress") {
    statusFactor = 0.85;
    reasoning.push("In-progress discount: 15%");
  }

  const baseEstimate = totalCost * multiplier * conditionFactor * statusFactor;
  const variance = 0.2;
  const low = Math.round(baseEstimate * (1 - variance));
  const mid = Math.round(baseEstimate);
  const high = Math.round(baseEstimate * (1 + variance));

  // Confidence score based on data completeness
  let confidenceScore = 50;
  if (buyPrice > 0) confidenceScore += 15;
  if (otherCosts > 0) confidenceScore += 10;
  if (laborHours > 0) confidenceScore += 10;
  if (project.year && project.year > 0) confidenceScore += 5;
  if (project.make) confidenceScore += 5;
  if (project.model) confidenceScore += 5;
  confidenceScore = Math.min(95, confidenceScore);

  reasoning.push(`Data completeness confidence: ${confidenceScore}%`);

  return {
    estimatedValueLow: low,
    estimatedValueMid: mid,
    estimatedValueHigh: high,
    confidenceScore,
    method: "rule",
    reasoning,
  };
}

export function selectValuationMethod(project: OfflineProject): ValuationResult {
  if (project.aiEstimateMid && project.aiConfidence && project.aiConfidence > 60) {
    return {
      estimatedValueLow: project.aiEstimateLow || project.aiEstimateMid * 0.8,
      estimatedValueMid: project.aiEstimateMid,
      estimatedValueHigh: project.aiEstimateHigh || project.aiEstimateMid * 1.2,
      confidenceScore: project.aiConfidence,
      method: "ai",
      reasoning: ["AI valuation available with high confidence"],
    };
  }

  return ruleBasedValuation(project);
}
