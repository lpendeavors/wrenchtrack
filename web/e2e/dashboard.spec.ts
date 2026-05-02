import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test("dashboard page loads structure", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: /Dashboard/i })).toBeVisible();
  });

  test("new project button is present", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("link", { name: /New Project/i })).toBeVisible();
  });
});
