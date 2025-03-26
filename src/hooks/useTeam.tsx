import { useQuery } from "@tanstack/react-query"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { queryKeys } from "@/actions/query-keys"

export const useTeam = (teamKey: string) => {
  const query = useQuery({
    queryKey: queryKeys.getTeamByKey(teamKey),
    queryFn: async () => getTeamByKey(teamKey),
  })

  return query
}
