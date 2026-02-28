import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  // Navigate to the login page.
  await page.goto("https://saucedemo.com");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret");
  await page.locator('[data-test="login-button"]').click();

  // Expect to catch error logins and shown a error message.
  await expect(page.locator('[data-test="error"]')).toBeVisible;
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Username and password do not match",
  );

  // Expect to remove error message.
  await expect(page.getByPlaceholder("Username")).toHaveClass("error");
  await page.locator(".error-button").click();
  await expect(page.getByTestId("error")).toBeHidden();
});
