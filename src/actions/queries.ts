import { getTeamOnboardingFormByKey } from "@/actions/onboarding/get-team-onboarding-form-by-key"
import { getSiloConfigTransactions } from "@/actions/silo-config-transactions/get-silo-config-transactions"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getTeamSilosByKey } from "@/actions/team-silos/get-team-silos-by-key"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { isAdminUser } from "@/utils/admin"

/**
 * A set of queries to be used with `useSuspenseQuery` or `useSuspenseQueries`.
 *
 * This gives us a way of calling asynchronous server actions but without
 * blocking the rendering of the entire page.
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
 */
export const queries = {
  getTeamByKey: (teamKey: string) => ({
    queryKey: ["team", teamKey],
    queryFn: () => getTeamByKey(teamKey),
  }),
  getTeamSiloByKey: (teamKey: string, siloId?: number) => ({
    queryKey: ["team-silo", teamKey, siloId],
    queryFn: () => (siloId ? getTeamSiloByKey(teamKey, siloId) : undefined),
  }),
  getTeamSilosByKey: (teamKey: string) => ({
    queryKey: ["team-silos", teamKey],
    queryFn: () => getTeamSilosByKey(teamKey),
  }),
  getSiloConfigTransactions: (siloId?: number) => ({
    queryKey: ["silo-config-tx", siloId],
    queryFn: () => (siloId ? getSiloConfigTransactions(siloId) : []),
  }),
  getTeamOnboardingFormByKey: (teamKey: string) => ({
    queryKey: ["team-onboarding-form", teamKey],
    queryFn: () => getTeamOnboardingFormByKey(teamKey),
  }),
  getTeamDealsByKey: (teamKey: string) => ({
    queryKey: ["team-deals", teamKey],
    queryFn: () => getTeamDealsByKey(teamKey),
  }),
  isAdminUser: () => ({
    queryKey: ["is-admin"],
    queryFn: () => isAdminUser(),
  }),
} as const
