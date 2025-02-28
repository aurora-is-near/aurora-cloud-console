import { getTeamOnboardingFormByKey } from "@/actions/onboarding/get-team-onboarding-form-by-key"
import { getSiloConfigTransactions } from "@/actions/silo-config-transactions/get-silo-config-transactions"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getTeamSilosByKey } from "@/actions/team-silos/get-team-silos-by-key"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getUnassignedSiloId } from "@/actions/silos/get-unassigned-silo-id"
import { isAdminUser } from "@/utils/admin"
import { queryKeys } from "@/actions/query-keys"

/**
 * A set of queries to be used with `useSuspenseQuery` or `useSuspenseQueries`.
 *
 * This gives us a way of calling asynchronous server actions but without
 * blocking the rendering of the entire page.
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
 */
export const queries = {
  getTeamByKey: (teamKey: string) => ({
    queryKey: queryKeys.getTeamByKey(teamKey),
    queryFn: () => getTeamByKey(teamKey),
  }),
  getTeamSiloByKey: (teamKey: string, siloId: number) => ({
    queryKey: queryKeys.getTeamSiloByKey(teamKey, siloId),
    queryFn: () => getTeamSiloByKey(teamKey, siloId),
  }),
  getTeamSilosByKey: (teamKey: string) => ({
    queryKey: queryKeys.getTeamSilosByKey(teamKey),
    queryFn: () => getTeamSilosByKey(teamKey),
  }),
  getSiloConfigTransactions: (siloId: number) => ({
    queryKey: queryKeys.getSiloConfigTransactions(siloId),
    queryFn: () => getSiloConfigTransactions(siloId),
  }),
  getTeamOnboardingFormByKey: (teamKey: string) => ({
    queryKey: queryKeys.getTeamOnboardingFormByKey(teamKey),
    queryFn: () => getTeamOnboardingFormByKey(teamKey),
  }),
  getTeamDealsByKey: (teamKey: string) => ({
    queryKey: queryKeys.getTeamDealsByKey(teamKey),
    queryFn: () => getTeamDealsByKey(teamKey),
  }),
  isAdminUser: () => ({
    queryKey: queryKeys.isAdminUser(),
    queryFn: () => isAdminUser(),
  }),
  getUnassignedSiloId: () => ({
    queryKey: queryKeys.getUnassignedSiloId(),
    queryFn: () => getUnassignedSiloId(),
  }),
} as const
