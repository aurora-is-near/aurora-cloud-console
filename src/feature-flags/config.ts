export const FEATURE_FLAG_COOKIE_PREFIX = "ff"

// The available feature flags are defined below.
export const FEATURE_FLAGS = [
  "stripe_test_payments",
  "silo_whitelist_permissions",
] as const

// The default values for each feature flag are defined below. In general, we
// will want the defaults for a flag to be `false`.
export const FEATURE_FLAGS_DEFAULTS: Record<
  (typeof FEATURE_FLAGS)[number],
  false
> = {
  stripe_test_payments: false,
  silo_whitelist_permissions: false,
}
