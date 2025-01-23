import { useEffect, useState } from "react"
import { featureFlags } from "@/feature-flags/browser"
import { FeatureFlags } from "@/types/feature-flags"

export const useFeatureFlags = () => {
  const [flags, setFlags] = useState<Partial<FeatureFlags>>({})

  useEffect(() => {
    setFlags(featureFlags.getAll())
  }, [])

  return { flags }
}
