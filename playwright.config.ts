import path from "path"
import dotenv from "dotenv"
import { defineConfig, devices } from "@playwright/test"

export const PLAYWRIGHT_BASE_URL = "http://localhost:3000"

if (!process.env.CI) {
  dotenv.config({ path: path.resolve(__dirname, ".env.local") })
}

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: PLAYWRIGHT_BASE_URL,
    trace: "on-first-retry",
  },

  globalSetup: "e2e/auth.setup.ts",

  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/storage-state.json",
        headless: process.env.CI ? true : false,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    url: PLAYWRIGHT_BASE_URL,
    command: process.env.CI ? "yarn run start" : "yarn dev",
    reuseExistingServer: !process.env.CI,
  },
})
