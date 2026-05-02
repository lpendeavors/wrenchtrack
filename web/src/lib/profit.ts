import type { OfflineProject } from "./db";

export interface ProfitResult {
  revenue: number;
  totalCosts: number;
  grossProfit: number;
  grossMarginPercent: number;
  laborCost: number;
  partsCost: number;
  buyCost: number;
  otherCosts: number;
  roiPercent: number;
  daysHeld: number;
  profitPerDay: number;
}

export function calculateProjectProfit(project: OfflineProject): ProfitResult {
  const revenue = project.sellPrice || 0;
  const buyCost = project.buyPrice || 0;
  const otherCosts = project.otherCosts || 0;
  const laborHours = project.laborHours || 0;
  const hourlyRate = project.hourlyRate || 25;
  const laborCost = laborHours * hourlyRate;
  const partsCost = otherCosts;
  const totalCosts = buyCost + partsCost + laborCost;
  const grossProfit = revenue - totalCosts;
  const grossMarginPercent = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const roiPercent = buyCost > 0 ? (grossProfit / buyCost) * 100 : 0;

  const buyDate = project.buyDate ? new Date(project.buyDate) : null;
  const sellDate = project.sellDate ? new Date(project.sellDate) : null;
  const endDate = sellDate || new Date();
  const daysHeld = buyDate
    ? Math.max(1, Math.floor((endDate.getTime() - buyDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const profitPerDay = daysHeld > 0 ? grossProfit / daysHeld : 0;

  return {
    revenue,
    totalCosts,
    grossProfit,
    grossMarginPercent,
    laborCost,
    partsCost,
    buyCost,
    otherCosts,
    roiPercent,
    daysHeld,
    profitPerDay,
  };
}

export function calculatePortfolioProfit(projects: OfflineProject[]): {
  totalRevenue: number;
  totalCosts: number;
  totalProfit: number;
  avgMarginPercent: number;
  totalProjects: number;
  profitableProjects: number;
} {
  const results = projects.map(calculateProjectProfit);
  const totalRevenue = results.reduce((s, r) => s + r.revenue, 0);
  const totalCosts = results.reduce((s, r) => s + r.totalCosts, 0);
  const totalProfit = totalRevenue - totalCosts;
  const avgMarginPercent =
    results.length > 0
      ? results.reduce((s, r) => s + r.grossMarginPercent, 0) / results.length
      : 0;
  const profitableProjects = results.filter((r) => r.grossProfit > 0).length;

  return {
    totalRevenue,
    totalCosts,
    totalProfit,
    avgMarginPercent,
    totalProjects: projects.length,
    profitableProjects,
  };
}
