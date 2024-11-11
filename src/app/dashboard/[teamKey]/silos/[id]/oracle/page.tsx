import { getSiloOracle } from "@/actions/silo-oracle/get-silo-oracle"
import OraclePage from "@/components/OraclePage/OraclePage"
import { auroraOracleApiClient } from "@/utils/aurora-oracle-api/client"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)
  const [oracle, { items: tokens }] = await Promise.all([
    getSiloOracle(siloId),
    auroraOracleApiClient.getTokens(),
  ])

  return (
    <OraclePage
      siloId={siloId}
      oracle={oracle}
      teamKey={teamKey}
      tokens={tokens}
    />
  )
}

export default Page
