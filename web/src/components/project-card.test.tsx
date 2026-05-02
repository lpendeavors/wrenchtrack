import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./project-card";
import type { OfflineProject } from "@/lib/db";

function makeProject(overrides: Partial<OfflineProject> = {}): OfflineProject {
  return {
    id: 1,
    localId: "local_test_1",
    userId: "user_test",
    name: "Honda CBR600RR",
    make: "Honda",
    model: "CBR600RR",
    year: 2020,
    vehicleType: "motorcycle",
    status: "in_progress",
    isPublic: false,
    syncStatus: "synced",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(),
    buyPrice: 3000,
    otherCosts: 500,
    laborHours: 10,
    hourlyRate: 25,
    ...overrides,
  };
}

describe("ProjectCard", () => {
  it("renders project name and make/model", () => {
    render(<ProjectCard project={makeProject()} />);
    expect(screen.getByRole("heading", { name: "Honda CBR600RR" })).toBeInTheDocument();
    expect(screen.getAllByText(/Honda\s+CBR600RR/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders year when present", () => {
    render(<ProjectCard project={makeProject()} />);
    expect(screen.getByText(/2020/)).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<ProjectCard project={makeProject({ status: "ready_for_sale" })} />);
    expect(screen.getByText("Ready for Sale")).toBeInTheDocument();
  });

  it("renders link to project detail", () => {
    render(<ProjectCard project={makeProject({ localId: "abc123" })} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/dashboard/projects/abc123");
  });

  it("shows invested amount", () => {
    render(<ProjectCard project={makeProject()} />);
    expect(screen.getByText(/Invested:/)).toBeInTheDocument();
    expect(screen.getByText(/Invested:.*\$3,750\.00/)).toBeInTheDocument();
  });

  it("shows estimated profit for non-sold projects", () => {
    render(
      <ProjectCard
        project={makeProject({
          status: "in_progress",
          sellPrice: 5000,
        })}
      />
    );
    expect(screen.getByText(/Est\.\s*\+/)).toBeInTheDocument();
  });

  it("shows actual profit for sold projects", () => {
    render(
      <ProjectCard
        project={makeProject({
          status: "sold",
          sellPrice: 5000,
        })}
      />
    );
    expect(screen.getByText(/\+\$1,250\.00/)).toBeInTheDocument();
  });

  it("does not show estimated profit when it is zero", () => {
    render(
      <ProjectCard
        project={makeProject({
          status: "in_progress",
          sellPrice: 3750,
        })}
      />
    );
    expect(screen.queryByText(/Est\./)).not.toBeInTheDocument();
  });

  it("shows loss in red for sold project", () => {
    render(
      <ProjectCard
        project={makeProject({
          status: "sold",
          sellPrice: 2000,
          buyPrice: 3000,
        })}
      />
    );
    expect(screen.getByText(/-\$1,750\.00/)).toBeInTheDocument();
  });

  it("shows days active duration", () => {
    render(<ProjectCard project={makeProject()} />);
    expect(screen.getByText(/5 days/)).toBeInTheDocument();
  });

  it("handles missing make/model gracefully", () => {
    render(<ProjectCard project={makeProject({ make: undefined, model: undefined })} />);
    expect(screen.getByText("Honda CBR600RR")).toBeInTheDocument();
  });
});
