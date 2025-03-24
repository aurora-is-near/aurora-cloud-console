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
} as const
