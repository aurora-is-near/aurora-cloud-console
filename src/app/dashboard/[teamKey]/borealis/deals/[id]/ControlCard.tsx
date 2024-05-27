import Card from "@/components/Card"
import { Modals } from "@/utils/modals"
import { DealDurationModal } from "./DealDurationModal"
import { CardConfigRow } from "@/components/CardConfigRow"
import { CardConfigGrid } from "@/components/CardConfigGrid"

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
            modalKey={Modals.DealDuration}
          />
        </CardConfigGrid>
      </Card>
      <DealDurationModal />
    </>
  )
}
