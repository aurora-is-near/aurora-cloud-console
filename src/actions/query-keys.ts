/**
 * Query keys used for our server action queries.
 *
 * These are defined separately from the queries as there are cases where we
 * would want to use them separately, to invalidate queries and so on.
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
 */
export const queryKeys = {
  getTeamSummaries: (options: { searchQuery?: string } = {}) => [
    "team-summaries",
    options,
  ],
  getTeamSiloByKey: (teamKey: string, siloId: number | null) => [
    "team-silo-by-key",
    teamKey,
    siloId,
  ],
  getTeamDealsByKey: (teamKey: string) => ["team-deals-by-key", teamKey],
  getTeamByKey: (teamKey: string) => ["team-by-key", teamKey],
  getSiloOracle: (siloId: number | null) => ["silo-oracle", siloId],
  getApiKeys: (teamKey: string) => ["api-keys", teamKey],
  getTeamMembers: (teamKey: string) => ["team-members", teamKey],
  getSiloRelayer: (siloId: number | null) => ["silo-relayer", siloId],
  getRelayerBalance: (siloId: number | null) => ["relayer-balance", siloId],
  getSiloIntegrationRequest: (siloId: number, integrationType: string) => [
    "integration-requests",
    siloId,
    integrationType,
  ],
} as const
