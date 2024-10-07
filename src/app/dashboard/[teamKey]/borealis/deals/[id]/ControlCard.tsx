import Card from "@/components/Card"
import { CardConfigGrid } from "@/components/CardConfigGrid"
import { DealDurationModal } from "./DealDurationModal"

export const ControlCard = () => {
  return (
    <>
      <Card tag="section">
        <Card.Title>Control</Card.Title>
        <Card.Subtitle>
          Manage transaction limits, durations, and renewals for deals and
          users.
        </Card.Subtitle>

        <CardConfigGrid>
          <CardConfigGrid.Row
            title="Restrict deal duration"
            modalKey="DealDuration"
          />
        </CardConfigGrid>
      </Card>
      <DealDurationModal />
    </>
  )
}
