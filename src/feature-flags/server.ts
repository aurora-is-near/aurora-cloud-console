"use server"

import { cookies } from "next/headers"
import { FeatureFlagsClient } from "@/types/feature-flags"
import { createFeatureFlagsClient } from "./utils"

export const getCookie = (id: string) => {
  const cookieStore = cookies()
  const { value } = cookieStore.get(id) ?? {}

  return value
}

export const setCookie = (id: string, value: string) => {
  const cookieStore = cookies()

  cookieStore.set(id, value)
}

export const featureFlags: FeatureFlagsClient = createFeatureFlagsClient(
  getCookie,
  setCookie,
)
