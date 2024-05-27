import Card from "@/components/Card"
import { SiloForm } from "../SiloForm"
import { DashboardPage } from "@/components/DashboardPage"
import { getTokens } from "@/actions/tokens/get-tokens"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const [tokens, team] = await Promise.all([getTokens(), getTeamByKey(teamKey)])

  return (
    <DashboardPage heading="Add silo">
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <Card.Body>
          <SiloForm tokens={tokens} teamId={team.id} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
