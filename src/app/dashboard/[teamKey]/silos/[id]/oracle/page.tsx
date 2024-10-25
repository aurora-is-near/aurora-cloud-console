import { getSiloOracle } from "@/actions/silo-oracle/get-silo-oracle"
import OraclePage from "@/components/OraclePage/OraclePage"
import { auroraOracleApiClient } from "@/utils/aurora-oracle-api/client"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)
  const oracle = await getSiloOracle(siloId)
  const tokens = await auroraOracleApiClient.getTokens()

  return (
    <OraclePage
      siloId={siloId}
      oracle={oracle}
      teamKey={teamKey}
      tokens={tokens.items}
    />
  )
}

export default Page
