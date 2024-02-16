import Card from "@/components/Card"
import { Modals } from "@/utils/modals"
import { EditRow } from "./EditRow"
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

        <EditRow
          title="Restrict deal duration"
          modalKey={Modals.DealDuration}
          Modal={DealDurationModal}
        />
      </Card>
    </>
  )
}
