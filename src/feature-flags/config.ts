export const FEATURE_FLAG_COOKIE_PREFIX = "ff"

// The available feature flags are defined below.
export const FEATURE_FLAGS = [
  "stripe_test_payments",
  "gas_plans_configuration",
  "automate_silo_configuration",
] as const

// The default values for each feature flag are defined below. In general, we
// will want the defaults for a flag to be `false`.
export const FEATURE_FLAGS_DEFAULTS: Record<
  (typeof FEATURE_FLAGS)[number],
  false
> = {
  stripe_test_payments: false,
  gas_plans_configuration: false,
  automate_silo_configuration: false,
}
