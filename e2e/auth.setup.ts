import { createClient } from "@supabase/supabase-js"
import { chromium, FullConfig, Cookie } from "@playwright/test"

import { PLAYWRIGHT_BASE_URL } from "../playwright.config"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const TEST_USER_EMAIL = "maksim.vashchuk+e2e@aurora.dev"
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD

const getSupabaseProjectId = () => {
  return SUPABASE_URL.split("//")[1].split(".")[0]
}

async function authSetup(config: FullConfig) {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  if (!TEST_USER_PASSWORD) {
    throw new Error("TEST_USER_PASSWORD is not set")
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
  })

  if (error || !data.session) {
    throw new Error(`Login failed: ${error?.message}`)
  }

  const { access_token, refresh_token } = data.session

  await page.goto(`${PLAYWRIGHT_BASE_URL}/dashboard`)

  await page.evaluate(
    async ([supabaseUrl, supabaseAnonKey, access_token, refresh_token]) => {
      const { createClient } = await import(
        // @ts-expect-error
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
      )
      const supabase = createClient(supabaseUrl, supabaseAnonKey)

      await supabase.auth.setSession({
        access_token,
        refresh_token,
      })
    },
    [SUPABASE_URL, SUPABASE_KEY, access_token, refresh_token],
  )

  const sessionCookies: Cookie[] = [
    {
      name: `sb-${getSupabaseProjectId()}-auth-token.0`,
      value: access_token,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Strict" as const,
      expires: Math.floor((Date.now() + 3600 * 1000) / 1000),
    },
    {
      name: `sb-${getSupabaseProjectId()}-auth-token.1`,
      value: refresh_token,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Strict" as const,
      expires: Math.floor((Date.now() + 3600 * 1000) / 1000),
    },
  ]

  await await page.context().addCookies(sessionCookies)
  await context.storageState({ path: "e2e/storage-state.json" })
  await browser.close()
}

export default authSetup
