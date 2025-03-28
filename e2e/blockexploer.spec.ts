import { test, expect } from "@playwright/test"
import { createClientComponentClient } from "@/supabase/create-client-component-client"

import { PLAYWRIGHT_BASE_URL } from "../playwright.config"

test("has title", async ({ page, context }) => {
  await page.goto(`${PLAYWRIGHT_BASE_URL}/dashboard`)
  await expect(page).toHaveTitle(/Aurora Cloud Console/)

  const supabase = createClientComponentClient()
  const { data, error } = await supabase.auth.getSession()
  console.log(data, error)

  // const cookies = await context.cookies();
  // console.log("Cookies:", cookies);
  // const authToken = await page.evaluate(() => {
  //   return window.localStorage.getItem("sb-xqharbhfobwuhpcdsapg-auth-token");
  // });
  // console.log("Auth token:", authToken);
  await page.pause()
})
