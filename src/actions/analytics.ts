"use server"

import mixpanel from "mixpanel"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"

const mpNoop = {
  track: () => {},
  people: {
    set_once: () => {},
    unset: () => {},
  },
}

const mp = process.env.MIXPANEL_SERVER_TOKEN
  ? mixpanel.init(process.env.MIXPANEL_SERVER_TOKEN, {
      verbose: true,
    })
  : mpNoop

export async function setUser() {
  const user = await getAuthUser()

  if (user) {
    mp.people.set_once(user.id.toString(), {
      email: user.email,
    })
  }
}

export async function clearUser() {
  const user = await getAuthUser()

  if (user) {
    mp.people.unset(user.id.toString(), "email")
  }
}

export async function trackEvent(
  event: string,
  properties: Record<string, string | number> = {},
) {
  const user = await getCurrentUser()

  mp.track(event, { user, ...properties })
}
