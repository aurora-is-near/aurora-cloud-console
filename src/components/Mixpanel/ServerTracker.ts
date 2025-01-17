"use server"

import mixpanel from "mixpanel"
import { getCurrentUser } from "@/actions/current-user/get-current-user"

const mp = mixpanel.init(process.env.MIXPANEL_SERVER_TOKEN ?? "", {
  verbose: true,
})

export async function setUser() {
  const user = await getCurrentUser()

  mp.people.set_once(user.id.toString(), {
    email: user.email,
  })
}

export async function trackPageview(path: string) {
  const user = await getCurrentUser()

  mp.track("pageview", { path, user })
}

export async function trackEvent(
  event: string,
  properties: Record<string, string | number>,
) {
  const user = await getCurrentUser()

  mp.track(event, { user, ...properties })
}
