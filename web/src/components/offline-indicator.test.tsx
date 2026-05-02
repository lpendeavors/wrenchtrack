import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { OfflineIndicator } from "./offline-indicator";

describe("OfflineIndicator", () => {
  let onlineGetter: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    onlineGetter = vi.spyOn(navigator, "onLine", "get").mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders nothing when online", () => {
    const { container } = render(<OfflineIndicator />);
    expect(container.firstChild).toBeNull();
  });

  it("renders offline banner when offline", () => {
    onlineGetter.mockReturnValue(false);
    render(<OfflineIndicator />);
    expect(screen.getByText(/Offline mode/)).toBeInTheDocument();
  });
});
