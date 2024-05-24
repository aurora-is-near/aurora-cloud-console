import Card from "@/components/Card"
import { Modals } from "@/utils/modals"
import { DealDurationModal } from "./DealDurationModal"
import { CardConfigRow } from "@/components/CardConfigRow"

export const ControlCard = () => {
  return (
    <>
      <Card tag="section">
        <Card.Title>Control</Card.Title>
        <Card.Subtitle>
          Manage transaction limits, durations, and renewals for deals and
          users.
        </Card.Subtitle>

        <CardConfigRow
          title="Restrict deal duration"
          modalConfig={{
            showEditButton: true,
            Modal: DealDurationModal,
            modalKey: Modals.DealDuration,
          }}
        />
      </Card>
    </>
  )
}
