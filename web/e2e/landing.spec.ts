import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("has correct title and brand mention", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/WrenchTrack/i);
    await expect(page.getByText(/WrenchTrack/i).first()).toBeVisible();
  });

  test("navigates to sign-in from CTA", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Start Building Free/i }).click();
    await expect(page).toHaveURL(/.*sign-in.*/);
  });
});
