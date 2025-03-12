import {
  FEATURE_FLAG_COOKIE_PREFIX,
  FEATURE_FLAGS,
  FEATURE_FLAGS_DEFAULTS,
} from "@/feature-flags/config"
import {
  FeatureFlagId,
  FeatureFlags,
  FeatureFlagsClient,
} from "@/types/feature-flags"

const getFeatureFlagName = (id: FeatureFlagId) => {
  return `${FEATURE_FLAG_COOKIE_PREFIX}_${id}`
}

export const createFeatureFlagsClient = (
  getCookie: (id: string) => string | undefined,
  setCookie: (id: string, value: string) => void,
): FeatureFlagsClient => {
  const set = (id: FeatureFlagId, value: boolean) => {
    setCookie(getFeatureFlagName(id), String(value))
  }

  const get = (id: FeatureFlagId): boolean => {
    const value = getCookie(getFeatureFlagName(id))

    return value === "true"
  }

  const getAll = (): FeatureFlags => {
    return FEATURE_FLAGS.reduce<FeatureFlags>((acc, id) => {
      const value = get(id)

      return {
        ...acc,
        [id]: value,
      }
    }, FEATURE_FLAGS_DEFAULTS)
  }

  return {
    set,
    get,
    getAll,
  }
}
