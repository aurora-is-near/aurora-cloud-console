import { getSiloOracle } from "@/actions/silo-oracle/get-silo-oracle"
import { IntegrationsPage } from "@/components/IntegrationsPage/IntegrationsPage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const oracle = await getSiloOracle(Number(id))

  return (
    <IntegrationsPage
      teamKey={teamKey}
      siloId={Number(id)}
      oracle={oracle ?? undefined}
    />
  )
}

export default Page
