"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import type { OfflineProject } from "@/lib/db";
import {
  Wrench,
  Plus,
  ArrowRight,
  Camera,
  DollarSign,
  Clock,
  Tag,
  AlertCircle,
} from "lucide-react";
import { formatCurrency, formatDate, formatDuration } from "@/lib/utils";

export default function DashboardPage() {
  const [projects, setProjects] = useState<OfflineProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const allProjects = await db.projects.orderBy("updatedAt").reverse().toArray();
      setProjects(allProjects);
      setIsLoading(false);
    };
    loadProjects();
  }, []);

  const activeProjects = projects.filter((p) => p.status !== "sold" && p.status !== "archived");
  const soldProjects = projects.filter((p) => p.status === "sold");

  const totalProfit = soldProjects.reduce((sum, p) => {
    const revenue = p.sellPrice || 0;
    const costs = (p.buyPrice || 0) + (p.otherCosts || 0);
    return sum + (revenue - costs);
  }, 0);

  return (
    <main className="min-h-screen bg-garage-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-garage-800 bg-garage-950/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-wrench" />
            <span className="font-bold">WrenchTrack</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-garage-400">Free tier — 2 projects</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-2xl">
          {/* Stats */}
          {projects.length > 0 && (
            <div className="mb-6 grid grid-cols-3 gap-3">
              <StatCard
                label="Active"
                value={activeProjects.length.toString()}
                icon={<Clock className="h-4 w-4" />}
              />
              <StatCard
                label="Sold"
                value={soldProjects.length.toString()}
                icon={<Tag className="h-4 w-4" />}
              />
              <StatCard
                label="Profit"
                value={formatCurrency(totalProfit)}
                icon={<DollarSign className="h-4 w-4" />}
                highlight={totalProfit > 0}
              />
            </div>
          )}

          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-bold">My Projects</h1>
            <Link href="/dashboard/new">
              <Button
                size="sm"
                className="bg-wrench hover:bg-wrench-dark text-white gap-1 garage-touch"
              >
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>

          {/* Projects List */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-xl bg-garage-900/50"
                />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-garage-700 bg-garage-900/30 p-8 text-center">
              <Wrench className="mx-auto mb-4 h-12 w-12 text-garage-600" />
              <h3 className="mb-2 font-semibold">No projects yet</h3>
              <p className="mb-4 text-sm text-garage-400">
                Start tracking your first flip or restoration. Add photos, parts,
                and costs — see if you actually made money.
              </p>
              <Link href="/dashboard/new">
                <Button className="bg-wrench hover:bg-wrench-dark text-white garage-touch">
                  <Plus className="mr-1 h-4 w-4" />
                  Start First Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <ProjectCard key={project.localId} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl bg-garage-900/50 p-3 text-center ring-1 ring-garage-800">
      <div className={`mb-1 flex justify-center ${highlight ? "text-green-400" : "text-garage-400"}`}>
        {icon}
      </div>
      <div className={`text-lg font-bold ${highlight ? "text-green-400" : ""}`}>{value}</div>
      <div className="text-xs text-garage-500">{label}</div>
    </div>
  );
}

function ProjectCard({ project }: { project: OfflineProject }) {
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
