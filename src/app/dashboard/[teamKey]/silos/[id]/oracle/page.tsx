import { getSiloOracle } from "@/actions/silo-oracle/get-silo-oracle"
import { OraclePage } from "@/components/OraclePage/OraclePage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)
  const oracle = await getSiloOracle(siloId)

  return <OraclePage siloId={siloId} oracle={oracle} teamKey={teamKey} />
}

export default Page
