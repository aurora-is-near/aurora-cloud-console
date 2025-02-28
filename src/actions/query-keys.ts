/**
 * Query keys used for our server action queries.
 *
 * These are defined separately from the queries as there are cases where we
 * would want to use them separately, to invalidate queries and so on.
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
 */
export const queryKeys = {
  getTeamByKey: (teamKey: string) => ["team", teamKey],
  getTeamSiloByKey: (teamKey: string, siloId: number) => [
    "team-silo",
    teamKey,
    siloId,
  ],
  getTeamSilosByKey: (teamKey: string) => ["team-silos", teamKey],
  getSiloConfigTransactions: (siloId: number) => ["silo-config-tx", siloId],
  getTeamOnboardingFormByKey: (teamKey: string) => [
    "team-onboarding-form",
    teamKey,
  ],
  getTeamDealsByKey: (teamKey: string) => ["team-deals", teamKey],
  isAdminUser: () => ["is-admin"],
  getUnassignedSiloId: () => ["unassigned-silo-id"],
} as const
