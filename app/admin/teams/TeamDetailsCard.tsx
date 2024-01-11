import { TeamForm } from "@/app/admin/teams/TeamForm"
import Card from "@/components/Card"
import { Team } from "@/types/types"

type TeamDetailsCardProps = {
  team?: Team
}

export const TeamDetailsCard = ({ team }: TeamDetailsCardProps) => (
  <Card>
    <Card.Title tag="h3">Team details</Card.Title>
    <div className="px-6 pb-7">
      <TeamForm team={team} />
    </div>
  </Card>
)
