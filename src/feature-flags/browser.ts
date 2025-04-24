"use client"

import { getCookie, setCookie } from "cookies-next"
import { FeatureFlagsClient } from "@/types/feature-flags"
import { createFeatureFlagsClient } from "./utils"

export const featureFlags: FeatureFlagsClient = createFeatureFlagsClient(
  (id: string) => {
    const value = getCookie(id)

    return typeof value === "string" ? value : undefined
  },
  setCookie,
)
