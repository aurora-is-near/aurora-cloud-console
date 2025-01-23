"use client"

import { getCookie, setCookie } from "cookies-next"
import { FeatureFlagsClient } from "@/types/feature-flags"
import { createFeatureFlagsClient } from "./utils"

export const featureFlags: FeatureFlagsClient = createFeatureFlagsClient(
  getCookie,
  setCookie,
)
