import { useQuery } from "@tanstack/react-query"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { queryKeys } from "@/actions/query-keys"

export const useTeamSilo = (teamKey: string, siloId: number | null) => {
  const query = useQuery({
    queryKey: queryKeys.getTeamSiloByKey(teamKey, siloId),
    queryFn: async () => (siloId ? getTeamSiloByKey(teamKey, siloId) : null),
  })

  return query
}
