import { TeamSilosForm } from "@/app/admin/teams/TeamSilosForm"
import Card from "@/components/Card"
import { Silo } from "@/types/types"

type TeamSilosCardProps = {
  teamId: number
  teamSilos?: Silo[]
  allSilos: Silo[]
}

export const TeamSilosCard = async ({
  teamId,
  teamSilos,
  allSilos,
}: TeamSilosCardProps) => (
  <Card>
    <Card.Title tag="h3">Silos</Card.Title>
    <div className="px-6 pb-7">
      <TeamSilosForm
        teamId={teamId}
        teamSilos={teamSilos}
        allSilos={allSilos}
      />
    </div>
  </Card>
)
