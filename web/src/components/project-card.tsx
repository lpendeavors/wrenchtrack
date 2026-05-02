"use client";

import Link from "next/link";
import { Clock, DollarSign, AlertCircle, Tag } from "lucide-react";
import { formatCurrency, formatDuration } from "@/lib/utils";
import type { OfflineProject } from "@/lib/db";

export function ProjectCard({ project }: { project: OfflineProject }) {
  const daysActive = Math.floor(
    (Date.now() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  const statusColors: Record<string, string> = {
    acquired: "bg-yellow-500/20 text-yellow-400",
    in_progress: "bg-blue-500/20 text-blue-400",
    ready_for_sale: "bg-green-500/20 text-green-400",
    sold: "bg-wrench/20 text-wrench-light",
    archived: "bg-garage-700 text-garage-400",
  };

  const statusLabels: Record<string, string> = {
    acquired: "Acquired",
    in_progress: "In Progress",
    ready_for_sale: "Ready for Sale",
    sold: "Sold",
    archived: "Archived",
  };

  const totalCost =
    (project.buyPrice || 0) +
    (project.otherCosts || 0) +
    (project.laborHours || 0) * (project.hourlyRate || 25);

  const estimatedProfit =
    (project.sellPrice || project.aiEstimateMid || 0) - totalCost;

  return (
    <Link href={`/dashboard/projects/${project.localId}`}>
      <div className="rounded-xl border border-garage-800 bg-garage-900/40 p-4 transition-colors hover:border-garage-700 hover:bg-garage-900/60">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold">{project.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-garage-400">
              <span>
                {project.make} {project.model}
              </span>
              {project.year && <span>· {project.year}</span>}
            </div>
          </div>
          <span
            className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
              statusColors[project.status]
            }`}
          >
            {statusLabels[project.status]}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-garage-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDuration(daysActive)}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            Invested: {formatCurrency(totalCost)}
          </span>
          {estimatedProfit !== 0 && project.status !== "sold" && (
            <span
              className={`flex items-center gap-1 ${
                estimatedProfit > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              <AlertCircle className="h-3 w-3" />
              Est. {estimatedProfit > 0 ? "+" : ""}
              {formatCurrency(estimatedProfit)}
            </span>
          )}
          {project.status === "sold" && project.sellPrice && (
            <span
              className={`flex items-center gap-1 ${
                project.sellPrice - totalCost > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              <Tag className="h-3 w-3" />
              {project.sellPrice - totalCost > 0 ? "+" : ""}
              {formatCurrency(project.sellPrice - totalCost)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
