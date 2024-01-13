import { TeamForm } from "@/app/admin/teams/TeamForm"
import Card from "@/components/Card"
import { Silo, Team } from "@/types/types"

type TeamDetailsCardProps = {
  team?: Team
  teamSilos?: Silo[]
  allSilos: Silo[]
}

export const TeamDetailsCard = ({
  team,
  teamSilos,
  allSilos,
}: TeamDetailsCardProps) => (
  <Card>
    <Card.Title tag="h3">Team details</Card.Title>
    <div className="px-6 pb-7">
      <TeamForm team={team} teamSilos={teamSilos} allSilos={allSilos} />
    </div>
  </Card>
)
