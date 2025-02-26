import { getSiloOracle } from "@/actions/silo-oracle/get-silo-oracle"
import { getSilo } from "@/actions/silos/get-silo"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import OraclePage from "@/components/OraclePage/OraclePage"
import { auroraOracleApiClient } from "@/utils/aurora-oracle-api/client"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)
  const [silo, team, oracle, { items: tokens }] = await Promise.all([
    getSilo(siloId),
    getTeamByKey(teamKey),
    getSiloOracle(siloId),
    auroraOracleApiClient.getTokens(),
  ])

  return <OraclePage silo={silo} oracle={oracle} team={team} tokens={tokens} />
}

export default Page
