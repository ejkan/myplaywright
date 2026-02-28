import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  // Navigate to the login page.
  await page.goto("https://saucedemo.com");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  // Expect to sort by price (low to high).
  await page.locator('[data-test="product-sort-container"]').selectOption("lohi");

  // Expect a first product to be priced at 7.99.
  const firstProduct = page.locator(".inventory_item").first();
  await expect(firstProduct).toContainText("$7.99");
});
