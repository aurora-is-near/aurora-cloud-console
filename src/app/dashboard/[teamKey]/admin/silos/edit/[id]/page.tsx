import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { SiloForm } from "../../SiloForm"
import { getSilo } from "@/actions/silos/get-silo"
import { DashboardPage } from "@/components/DashboardPage"
import { getTokens } from "@/actions/tokens/get-tokens"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { DeleteSiloButton } from "./DeleteSiloButton"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: number; teamKey: string }
}) => {
  const [silo, tokens, team] = await Promise.all([
    getSilo(id),
    getTokens(),
    getTeamByKey(teamKey),
  ])

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage
      heading={silo.name}
      actions={<DeleteSiloButton teamKey={teamKey} silo={silo} />}
    >
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <Card.Body>
          <SiloForm silo={silo} tokens={tokens} teamId={team.id} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
