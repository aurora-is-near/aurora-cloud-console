import Card from "@/components/Card"
import { Team } from "@/types/types"
import { TeamForm } from "./TeamForm"

type TeamDetailsCardProps = {
  team?: Team
}

export const TeamDetailsCard = ({ team }: TeamDetailsCardProps) => (
  <Card>
    <Card.Title tag="h3">Team details</Card.Title>
    <Card.Body>
      <TeamForm team={team} />
    </Card.Body>
  </Card>
)
