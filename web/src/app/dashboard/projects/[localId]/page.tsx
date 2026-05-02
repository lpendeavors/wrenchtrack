"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import type { OfflineProject } from "@/lib/db";
import {
  ArrowLeft,
  Camera,
  DollarSign,
  Package,
  FileText,
  TrendingUp,
  Trash2,
  Edit3,
  Wrench,
} from "lucide-react";
import { formatCurrency, formatDate, formatDuration } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
  { id: "photos", label: "Photos", icon: <Camera className="h-4 w-4" /> },
  { id: "parts", label: "Parts", icon: <Package className="h-4 w-4" /> },
  { id: "costs", label: "Costs", icon: <DollarSign className="h-4 w-4" /> },
  { id: "valuation", label: "Valuation", icon: <TrendingUp className="h-4 w-4" /> },
];

const STATUS_FLOW = [
  "acquired",
  "in_progress",
  "ready_for_sale",
  "sold",
  "archived",
];

const STATUS_LABELS: Record<string, string> = {
  acquired: "Acquired",
  in_progress: "In Progress",
  ready_for_sale: "Ready for Sale",
  sold: "Sold",
  archived: "Archived",
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const localId = params.localId as string;

  const [project, setProject] = useState<OfflineProject | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      const p = await db.projects.where("localId").equals(localId).first();
      if (p) {
        setProject(p);
      }
      setIsLoading(false);
    };
    loadProject();
  }, [localId]);

  const advanceStatus = async () => {
    if (!project) return;
    const currentIndex = STATUS_FLOW.indexOf(project.status);
    const nextStatus = STATUS_FLOW[currentIndex + 1];
    if (!nextStatus) return;

    await db.projects.update(project.id, {
      status: nextStatus as OfflineProject["status"],
      updatedAt: new Date(),
      syncStatus: "pending",
      ...(nextStatus === "sold" ? {} : {}),
    });

    const updated = await db.projects.where("localId").equals(localId).first();
    setProject(updated || null);
  };

  const deleteProject = async () => {
    if (!confirm("Delete this project? This can't be undone.")) return;
    await db.projects.where("localId").equals(localId).delete();
    router.push("/dashboard");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-garage-950 text-white">
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-wrench border-t-transparent" />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-garage-950 text-white">
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <Wrench className="h-12 w-12 text-garage-600" />
          <p className="text-garage-400">Project not found</p>
          <Link href="/dashboard">
            <Button className="bg-wrench hover:bg-wrench-dark text-white">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const daysActive = Math.floor(
    (Date.now() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  const totalCost =
    (project.buyPrice || 0) +
    (project.otherCosts || 0) +
    (project.laborHours || 0) * (project.hourlyRate || 25);

  const estimatedValue = project.aiEstimateMid || 0;
  const estimatedProfit = estimatedValue - totalCost;
  const actualProfit = project.sellPrice ? project.sellPrice - totalCost : null;

  return (
    <main className="min-h-screen bg-garage-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-garage-800 bg-garage-950/80 backdrop-blur-md">
        <div className="flex h-14 items-center gap-3 px-4">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="text-garage-300 hover:text-white garage-touch"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold">{project.name}</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={deleteProject}
            className="text-red-400 hover:bg-red-500/10 hover:text-red-300 garage-touch"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-14 z-30 border-b border-garage-800 bg-garage-950/90 backdrop-blur-sm">
        <div className="flex overflow-x-auto px-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 px-3 py-3 text-sm font-medium transition-colors garage-touch ${
                activeTab === tab.id
                  ? "border-b-2 border-wrench text-wrench-light"
                  : "text-garage-400 hover:text-garage-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-2xl">
          {activeTab === "overview" && (
            <OverviewTab
              project={project}
              daysActive={daysActive}
              totalCost={totalCost}
              estimatedProfit={estimatedProfit}
              actualProfit={actualProfit}
              onAdvanceStatus={advanceStatus}
            />
          )}
          {activeTab === "photos" && <PhotosTab project={project} />}
          {activeTab === "parts" && <PartsTab project={project} />}
          {activeTab === "costs" && (
            <CostsTab
              project={project}
              totalCost={totalCost}
              onUpdate={(updated) => setProject(updated)}
            />
          )}
          {activeTab === "valuation" && (
            <ValuationTab
              project={project}
              totalCost={totalCost}
              onUpdate={(updated) => setProject(updated)}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function OverviewTab({
  project,
  daysActive,
  totalCost,
  estimatedProfit,
  actualProfit,
  onAdvanceStatus,
}: {
  project: OfflineProject;
  daysActive: number;
  totalCost: number;
  estimatedProfit: number;
  actualProfit: number | null;
  onAdvanceStatus: () => void;
}) {
  const currentIndex = STATUS_FLOW.indexOf(project.status);
  const nextStatus = STATUS_FLOW[currentIndex + 1];

  return (
    <div className="space-y-6">
      {/* Status Badge + Action */}
      <div className="flex items-center justify-between rounded-xl bg-garage-900/50 p-4 ring-1 ring-garage-800">
        <div>
          <div className="text-xs text-garage-400">Status</div>
          <div className="text-lg font-semibold">{STATUS_LABELS[project.status]}</div>
        </div>
        {nextStatus && (
          <Button
            onClick={onAdvanceStatus}
            className="bg-wrench hover:bg-wrench-dark text-white gap-1 garage-touch"
          >
            Mark {STATUS_LABELS[nextStatus]}
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        )}
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-garage-900/50 p-4 ring-1 ring-garage-800">
          <div className="text-xs text-garage-400">Total Invested</div>
          <div className="mt-1 text-xl font-bold">{formatCurrency(totalCost)}</div>
        </div>
        <div className="rounded-xl bg-garage-900/50 p-4 ring-1 ring-garage-800">
          <div className="text-xs text-garage-400">
            {actualProfit !== null ? "Actual Profit" : "Est. Profit"}
          </div>
          <div
            className={`mt-1 text-xl font-bold ${
              (actualProfit ?? estimatedProfit) >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {(actualProfit ?? estimatedProfit) >= 0 ? "+" : ""}
            {formatCurrency(actualProfit ?? estimatedProfit)}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-xl border border-garage-800 bg-garage-900/30 p-4">
        <h3 className="mb-3 font-semibold">Project Details</h3>
        <div className="space-y-2 text-sm">
          <DetailRow label="Vehicle Type" value={project.vehicleType.replace("_", " ")} />
          <DetailRow label="Make" value={project.make || "—"} />
          <DetailRow label="Model" value={project.model || "—"} />
          <DetailRow label="Year" value={project.year?.toString() || "—"} />
          <DetailRow label="Buy Price" value={formatCurrency(project.buyPrice)} />
          <DetailRow label="Buy Source" value={project.buySource || "—"} />
          <DetailRow label="Buy Date" value={formatDate(project.buyDate)} />
          <DetailRow label="Duration" value={formatDuration(daysActive)} />
          <DetailRow label="Labor Hours" value={`${project.laborHours || 0} hrs @ ${formatCurrency(project.hourlyRate || 25)}/hr`} />
        </div>
      </div>

      {project.description && (
        <div className="rounded-xl border border-garage-800 bg-garage-900/30 p-4">
          <h3 className="mb-2 font-semibold">Notes</h3>
          <p className="text-sm text-garage-300">{project.description}</p>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-garage-800/50 py-2 last:border-0">
      <span className="text-garage-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function PhotosTab({ project }: { project: OfflineProject }) {
  return (
    <div className="text-center py-12">
      <Camera className="mx-auto mb-4 h-12 w-12 text-garage-600" />
      <h3 className="mb-2 font-semibold">No photos yet</h3>
      <p className="mb-4 text-sm text-garage-400">
        Start documenting your disassembly. Photos help you remember how
        everything goes back together.
      </p>
      <Button className="bg-wrench hover:bg-wrench-dark text-white gap-1 garage-touch">
        <Camera className="h-4 w-4" />
        Add First Photo
      </Button>
    </div>
  );
}

function PartsTab({ project }: { project: OfflineProject }) {
  return (
    <div className="text-center py-12">
      <Package className="mx-auto mb-4 h-12 w-12 text-garage-600" />
      <h3 className="mb-2 font-semibold">No parts logged</h3>
      <p className="mb-4 text-sm text-garage-400">
        Track every part you buy. Know exactly what you&apos;ve invested.
      </p>
      <Button className="bg-wrench hover:bg-wrench-dark text-white gap-1 garage-touch">
        <Package className="h-4 w-4" />
        Add First Part
      </Button>
    </div>
  );
}

function CostsTab({
  project,
  totalCost,
  onUpdate,
}: {
  project: OfflineProject;
  totalCost: number;
  onUpdate: (p: OfflineProject) => void;
}) {
  const [hourlyRate, setHourlyRate] = useState(project.hourlyRate || 25);
  const [laborHours, setLaborHours] = useState(project.laborHours || 0);
  const [otherCosts, setOtherCosts] = useState(project.otherCosts || 0);

  const saveCosts = async () => {
    await db.projects.update(project.id, {
      hourlyRate,
      laborHours,
      otherCosts,
      updatedAt: new Date(),
      syncStatus: "pending",
    });
    const updated = await db.projects.where("localId").equals(project.localId).first();
    if (updated) onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-garage-900/50 p-4 ring-1 ring-garage-800">
          <div className="text-xs text-garage-400">Buy Price</div>
          <div className="mt-1 text-lg font-bold">{formatCurrency(project.buyPrice)}</div>
        </div>
        <div className="rounded-xl bg-garage-900/50 p-4 ring-1 ring-garage-800">
          <div className="text-xs text-garage-400">Parts (from log)</div>
          <div className="mt-1 text-lg font-bold">$0.00</div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-garage-800 bg-garage-900/30 p-4">
        <h3 className="font-semibold">Labor & Other Costs</h3>

        <div>
          <label className="mb-1 block text-sm text-garage-400">Hourly Rate</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-garage-500">$</span>
            <input
              type="number"
              step="0.01"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-garage-700 bg-garage-900 py-2.5 pl-7 pr-3 text-sm text-white focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-garage-400">Labor Hours</label>
          <input
            type="number"
            step="0.5"
            value={laborHours}
            onChange={(e) => setLaborHours(parseFloat(e.target.value) || 0)}
            className="w-full rounded-lg border border-garage-700 bg-garage-900 px-3 py-2.5 text-sm text-white focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-garage-400">Other Costs (tools, supplies, transport)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-garage-500">$</span>
            <input
              type="number"
              step="0.01"
              value={otherCosts}
              onChange={(e) => setOtherCosts(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-garage-700 bg-garage-900 py-2.5 pl-7 pr-3 text-sm text-white focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
            />
          </div>
        </div>

        <Button onClick={saveCosts} className="w-full bg-wrench hover:bg-wrench-dark text-white garage-touch">
          Save Costs
        </Button>
      </div>

      <div className="rounded-xl bg-garage-900/50 p-4 ring-1 ring-garage-800">
        <div className="flex justify-between text-sm">
          <span className="text-garage-400">Total Investment</span>
          <span className="font-bold">{formatCurrency(totalCost)}</span>
        </div>
      </div>
    </div>
  );
}

function ValuationTab({
  project,
  totalCost,
  onUpdate,
}: {
  project: OfflineProject;
  totalCost: number;
  onUpdate: (p: OfflineProject) => void;
}) {
  const [userEstimate, setUserEstimate] = useState(project.aiEstimateMid || 0);
  const [isEstimating, setIsEstimating] = useState(false);

  const runAIValuation = async () => {
    setIsEstimating(true);
    // Placeholder: In real implementation, call OpenAI API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockLow = Math.max(totalCost * 1.2, 50);
    const mockMid = mockLow * 1.3;
    const mockHigh = mockMid * 1.4;

    await db.projects.update(project.id, {
      aiEstimateLow: mockLow,
      aiEstimateMid: mockMid,
      aiEstimateHigh: mockHigh,
      aiConfidence: 65,
      updatedAt: new Date(),
      syncStatus: "pending",
    });

    const updated = await db.projects.where("localId").equals(project.localId).first();
    if (updated) onUpdate(updated);
    setIsEstimating(false);
  };

  const saveUserEstimate = async () => {
    await db.projects.update(project.id, {
      aiEstimateMid: userEstimate,
      updatedAt: new Date(),
      syncStatus: "pending",
    });
    const updated = await db.projects.where("localId").equals(project.localId).first();
    if (updated) onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      {/* AI Estimate */}
      <div className="rounded-xl border border-garage-800 bg-garage-900/30 p-4">
        <h3 className="mb-3 font-semibold">AI Valuation</h3>
        {project.aiEstimateMid ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-garage-400">Confidence</span>
              <span className="text-sm font-medium">{project.aiConfidence}%</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-garage-900/50 p-3 text-center">
                <div className="text-xs text-garage-400">Low</div>
                <div className="font-bold">{formatCurrency(project.aiEstimateLow)}</div>
              </div>
              <div className="rounded-lg bg-wrench/20 p-3 text-center ring-1 ring-wrench/30">
                <div className="text-xs text-wrench-light">Estimate</div>
                <div className="font-bold text-wrench-light">{formatCurrency(project.aiEstimateMid)}</div>
              </div>
              <div className="rounded-lg bg-garage-900/50 p-3 text-center">
                <div className="text-xs text-garage-400">High</div>
                <div className="font-bold">{formatCurrency(project.aiEstimateHigh)}</div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-garage-900/50 p-3">
              <span className="text-sm">Est. Profit</span>
              <span className={`font-bold ${(project.aiEstimateMid - totalCost) >= 0 ? "text-green-400" : "text-red-400"}`}>
                {(project.aiEstimateMid - totalCost) >= 0 ? "+" : ""}
                {formatCurrency(project.aiEstimateMid - totalCost)}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="mb-3 text-sm text-garage-400">
              Get an AI-powered estimate based on marketplace comps.
            </p>
            <Button
              onClick={runAIValuation}
              disabled={isEstimating}
              className="bg-wrench hover:bg-wrench-dark text-white gap-1 garage-touch"
            >
              {isEstimating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4" />
                  Run AI Valuation
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* User Override */}
      <div className="rounded-xl border border-garage-800 bg-garage-900/30 p-4">
        <h3 className="mb-3 font-semibold">Your Estimate</h3>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-garage-500">$</span>
            <input
              type="number"
              step="0.01"
              value={userEstimate}
              onChange={(e) => setUserEstimate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-garage-700 bg-garage-900 py-2.5 pl-7 pr-3 text-sm text-white focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
            />
          </div>
          <Button
            onClick={saveUserEstimate}
            className="bg-garage-700 hover:bg-garage-600 text-white garage-touch"
          >
            Save
          </Button>
        </div>
        <p className="mt-2 text-xs text-garage-500">
          Override the AI estimate with your own market knowledge.
        </p>
      </div>
    </div>
  );
}
