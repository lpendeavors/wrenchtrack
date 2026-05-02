import { describe, it, expect } from "vitest";
import { cn, formatCurrency, formatDate, formatDuration } from "./utils";

describe("cn", () => {
  it("merges class names with tailwind-merge", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });
});

describe("formatCurrency", () => {
  it("formats positive amount", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats negative amount", () => {
    expect(formatCurrency(-100)).toBe("-$100.00");
  });

  it("returns $0.00 for null", () => {
    expect(formatCurrency(null)).toBe("$0.00");
  });

  it("returns $0.00 for undefined", () => {
    expect(formatCurrency(undefined)).toBe("$0.00");
  });

  it("formats whole dollars", () => {
    expect(formatCurrency(100)).toBe("$100.00");
  });
});

describe("formatDate", () => {
  it("formats a Date object", () => {
    const d = new Date("2024-03-15T00:00:00");
    expect(formatDate(d)).toBe("Mar 15, 2024");
  });

  it("formats a date string", () => {
    expect(formatDate("2024-03-15")).toBe("Mar 15, 2024");
  });

  it("returns em-dash for null", () => {
    expect(formatDate(null)).toBe("—");
  });

  it("returns em-dash for undefined", () => {
    expect(formatDate(undefined)).toBe("—");
  });
});

describe("formatDuration", () => {
  it('returns "Just started" for less than 1 day', () => {
    expect(formatDuration(0)).toBe("Just started");
    expect(formatDuration(0.5)).toBe("Just started");
  });

  it('returns "1 day" for exactly 1 day', () => {
    expect(formatDuration(1)).toBe("1 day");
  });

  it("returns days for < 30 days", () => {
    expect(formatDuration(2)).toBe("2 days");
    expect(formatDuration(29)).toBe("29 days");
  });

  it("returns months for 30-364 days", () => {
    expect(formatDuration(30)).toBe("1 month");
    expect(formatDuration(59)).toBe("1 month");
    expect(formatDuration(60)).toBe("2 months");
    expect(formatDuration(364)).toBe("12 months");
  });

  it("returns years for >= 365 days", () => {
    expect(formatDuration(365)).toBe("1 year");
    expect(formatDuration(730)).toBe("2 years");
  });

  it("returns years and months when there are remaining months", () => {
    expect(formatDuration(395)).toBe("1 year 1 month");
    expect(formatDuration(425)).toBe("1 year 2 months");
    expect(formatDuration(790)).toBe("2 years 2 months");
  });
});
