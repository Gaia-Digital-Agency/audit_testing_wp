const { test, expect } = require("@playwright/test");

test.describe("Homepage", () => {
  test("should have the correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Twenty Twenty-Four/);
  });
});
