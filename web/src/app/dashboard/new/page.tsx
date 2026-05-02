"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { db, generateLocalId } from "@/lib/db";
import {
  Wrench,
  ArrowLeft,
  Camera,
  DollarSign,
  Calendar,
  Tag,
  FileText,
} from "lucide-react";
import Link from "next/link";

const VEHICLE_TYPES = [
  { value: "small_engine", label: "Small Engine", icon: "🔧" },
  { value: "motorcycle", label: "Motorcycle", icon: "🏍️" },
  { value: "atv", label: "ATV / Quad", icon: "🛵" },
  { value: "car", label: "Car / Truck", icon: "🚗" },
  { value: "other", label: "Other", icon: "🔨" },
];

const BUY_SOURCES = [
  "Facebook Marketplace",
  "Craigslist",
  "Auction",
  "Scrap / Junkyard",
  "Gift / Free",
  "Other",
];

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    vehicleType: "small_engine" as const,
    make: "",
    model: "",
    year: "",
    buyPrice: "",
    buySource: "Facebook Marketplace",
    buyDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userId = "temp_user"; // Will be replaced with Clerk user ID
      const localId = generateLocalId();

      await db.projects.add({
        localId,
        userId,
        name: formData.name,
        description: formData.description || undefined,
        vehicleType: formData.vehicleType,
        make: formData.make || undefined,
        model: formData.model || undefined,
        year: formData.year ? parseInt(formData.year) : undefined,
        status: "acquired",
        buyPrice: formData.buyPrice ? parseFloat(formData.buyPrice) : undefined,
        buyDate: formData.buyDate ? new Date(formData.buyDate) : undefined,
        buySource: formData.buySource,
        laborHours: 0,
        hourlyRate: 25,
        otherCosts: 0,
        isPublic: false,
        syncStatus: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Wrench className="h-5 w-5 text-wrench" />
          <span className="font-bold">New Project</span>
        </div>
      </header>

      {/* Form */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Project Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Honda GX200 Generator Flip"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-garage-700 bg-garage-900 px-4 py-3 text-sm text-white placeholder-garage-500 focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Vehicle Type *
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {VEHICLE_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, vehicleType: type.value as any })
                    }
                    className={`rounded-lg border px-3 py-3 text-center text-sm transition-colors garage-touch ${
                      formData.vehicleType === type.value
                        ? "border-wrench bg-wrench/20 text-wrench-light"
                        : "border-garage-700 bg-garage-900 text-garage-400 hover:border-garage-600"
                    }`}
                  >
                    <div className="mb-1 text-lg">{type.icon}</div>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Make / Model / Year */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-2 block text-sm font-medium">Make</label>
                <input
                  type="text"
                  placeholder="Honda"
                  value={formData.make}
                  onChange={(e) =>
                    setFormData({ ...formData, make: e.target.value })
                  }
                  className="w-full rounded-lg border border-garage-700 bg-garage-900 px-3 py-2.5 text-sm text-white placeholder-garage-500 focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Model</label>
                <input
                  type="text"
                  placeholder="GX200"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full rounded-lg border border-garage-700 bg-garage-900 px-3 py-2.5 text-sm text-white placeholder-garage-500 focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Year</label>
                <input
                  type="number"
                  placeholder="2020"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="w-full rounded-lg border border-garage-700 bg-garage-900 px-3 py-2.5 text-sm text-white placeholder-garage-500 focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
                />
              </div>
            </div>

            {/* Buy Info */}
            <div className="rounded-xl border border-garage-800 bg-garage-900/50 p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-garage-200">
                <DollarSign className="h-4 w-4 text-wrench" />
                Acquisition
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-garage-400">
                      Buy Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-garage-500">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="25.00"
                        value={formData.buyPrice}
                        onChange={(e) =>
                          setFormData({ ...formData, buyPrice: e.target.value })
                        }
                        className="w-full rounded-lg border border-garage-700 bg-garage-900 py-2.5 pl-7 pr-3 text-sm text-white placeholder-garage-500 focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-garage-400">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.buyDate}
                      onChange={(e) =>
                        setFormData({ ...formData, buyDate: e.target.value })
                      }
                      className="w-full rounded-lg border border-garage-700 bg-garage-900 px-3 py-2.5 text-sm text-white focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-garage-400">
                    Source
                  </label>
                  <select
                    value={formData.buySource}
                    onChange={(e) =>
                      setFormData({ ...formData, buySource: e.target.value })
                    }
                    className="w-full rounded-lg border border-garage-700 bg-garage-900 px-3 py-2.5 text-sm text-white focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
                  >
                    {BUY_SOURCES.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Notes (optional)
              </label>
              <textarea
                rows={3}
                placeholder="What's the project? What's broken? What's the plan?"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full rounded-lg border border-garage-700 bg-garage-900 px-4 py-3 text-sm text-white placeholder-garage-500 focus:border-wrench focus:outline-none focus:ring-1 focus:ring-wrench"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Link href="/dashboard" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-garage-700 text-garage-300 hover:bg-garage-800 garage-touch"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-wrench hover:bg-wrench-dark text-white garage-touch"
              >
                {isSubmitting ? "Creating..." : "Start Project"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
