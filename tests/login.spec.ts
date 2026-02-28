import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  // Navigate to the login page.
  await page.goto("https://saucedemo.com");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  // Expect an Inventory page.
  await expect(page).toHaveURL(/.*inventory.html/);

  // Expect to have Products.
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
  await expect(page.locator(".inventory_item")).toHaveCount(6);
});
