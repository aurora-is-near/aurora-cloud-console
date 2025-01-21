import { FEATURE_FLAGS } from "@/feature-flags/config"

export type FeatureFlagId = (typeof FEATURE_FLAGS)[number]

export type FeatureFlags = Record<FeatureFlagId, boolean>

export type FeatureFlagsClient = {
  get: (id: FeatureFlagId) => boolean
  getAll: () => Record<FeatureFlagId, boolean>
  set: (id: FeatureFlagId, value: boolean) => void
}
