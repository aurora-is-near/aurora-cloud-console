"use client"

import { useModals } from "@/hooks/useModals"
import { RateLimitRow } from "./RateLimitRow"
import Card from "@/components/Card"
import { Modals } from "@/utils/modals"

export const RateLimitsCard = () => {
  const { openModal } = useModals()

  const onUserRateLimitEditClick = () => {
    openModal(Modals.UserRateLimitsModal)
  }

  const onDealRateLimitEditClick = () => {
    openModal(Modals.DealRateLimitsModal)
  }

  return (
    <Card tag="section">
      <Card.Title>Limit</Card.Title>
      <Card.Subtitle>
        Set user and deal limits for controlled and secure transaction
        management.
      </Card.Subtitle>

      <RateLimitRow
        title="User rate limit"
        subtitle="3 limits"
        onEditClick={onUserRateLimitEditClick}
      />

      <RateLimitRow
        title="Deal rate limit"
        subtitle="1 limit"
        onEditClick={onDealRateLimitEditClick}
      />
    </Card>
  )
}
