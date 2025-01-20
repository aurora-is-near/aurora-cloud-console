import { dedupe, flag } from "@vercel/flags/next"
import { type ReadonlyRequestCookies } from "@vercel/flags"

interface Entities {
  user?: {
    id: string
  }
}

const identify = dedupe(
  ({ cookies }: { cookies: ReadonlyRequestCookies }): Entities => {
    const userId = cookies.get("dashboard-user-id")?.value

    return { user: userId ? { id: userId } : undefined }
  },
)

export const stripeTestModeFlag = flag({
  key: "stripe-test-mode",
  identify,
  decide: () => true,
})
