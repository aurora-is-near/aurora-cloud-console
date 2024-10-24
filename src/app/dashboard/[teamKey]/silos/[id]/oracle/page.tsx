import { getSiloOracle } from "@/actions/silo-oracle/get-silo-oracle"
// import { getSiloTokens } from "@/actions/silo-tokens/get-silo-tokens"
import { getTokens } from "@/actions/tokens/get-tokens"
import OraclePage from "@/components/OraclePage/OraclePage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)
  const oracle = await getSiloOracle(siloId)
  // const tokens = await getSiloTokens(siloId)
  const tokens = await getTokens()

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
