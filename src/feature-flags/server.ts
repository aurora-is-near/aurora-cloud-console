"use server"

import { cookies } from "next/headers"
import { FeatureFlagsClient } from "@/types/feature-flags"
import { createFeatureFlagsClient } from "./utils"

const getCookie = (id: string) => {
  const cookieStore = cookies()
  const { value } = cookieStore.get(id) ?? {}

  return value
}

const setCookie = (id: string, value: string) => {
  const cookieStore = cookies()

  cookieStore.set(id, value)
}

export const featureFlags: FeatureFlagsClient = createFeatureFlagsClient(
  getCookie,
  setCookie,
)
