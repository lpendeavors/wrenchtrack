import { test, expect } from "@playwright/test";

test.describe("Offline indicator", () => {
  test("landing page shows no offline banner by default", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".offline-indicator")).not.toBeVisible();
  });
});
