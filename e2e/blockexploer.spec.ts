import { test, expect } from "@playwright/test"

import { PLAYWRIGHT_BASE_URL } from "../playwright.config"

test("auth check", async ({ page, context }) => {
  await page.goto(`${PLAYWRIGHT_BASE_URL}/dashboard`)
  await expect(page).toHaveTitle(/Aurora Cloud Console/)
  // for debugging
  await page.pause()
})
