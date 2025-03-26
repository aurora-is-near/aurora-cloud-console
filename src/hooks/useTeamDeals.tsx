import { useQuery } from "@tanstack/react-query"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import { queryKeys } from "@/actions/query-keys"

export const useTeamDeals = (teamKey: string) => {
  const query = useQuery({
    queryKey: queryKeys.getTeamDealsByKey(teamKey),
    queryFn: async () => getTeamDealsByKey(teamKey),
  })

  return query
}
