import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  // Navigate to the login page.
  await page.goto("https://saucedemo.com");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  //   Adding a backpack to the cart.
  const backpack = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });
  await backpack.getByRole("button", { name: "Add to cart" }).click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  //   Adding a bike light to the cart.
  const bikeLight = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Bike Light" });
  await bikeLight.getByRole("button", { name: "Add to cart" }).click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("2");

  //   Removing a backpack from the cart.
  await backpack.getByRole("button", { name: "Remove" }).click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});
