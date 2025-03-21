"use server"

import mixpanel from "mixpanel"
import { User } from "@supabase/supabase-js"
import { getCurrentUser } from "@/actions/current-user/get-current-user"

const mpNoop = { track: () => {}, people: { set_once: () => {} } }

const mp = process.env.MIXPANEL_SERVER_TOKEN
  ? mixpanel.init(process.env.MIXPANEL_SERVER_TOKEN, {
      verbose: true,
    })
  : mpNoop

export function setUser(authUser: User) {
  mp.people.set_once(authUser.id.toString(), {
    email: authUser.email,
  })
}

export async function trackEvent(
  event: string,
  properties: Record<string, string | number> = {},
) {
  const user = await getCurrentUser()

  mp.track(event, { user, ...properties })
}
