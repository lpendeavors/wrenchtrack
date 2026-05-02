import { test, expect } from "@playwright/test";

test.describe("Project creation", () => {
  test("new project form page loads", async ({ page }) => {
    await page.goto("/dashboard/new");
    await expect(page.getByRole("heading", { name: /New Project/i })).toBeVisible();
  });

  test("form has required fields", async ({ page }) => {
    await page.goto("/dashboard/new");
    await expect(page.getByLabel(/Project Name/i)).toBeVisible();
    await expect(page.getByLabel(/Vehicle Type/i)).toBeVisible();
  });
});
