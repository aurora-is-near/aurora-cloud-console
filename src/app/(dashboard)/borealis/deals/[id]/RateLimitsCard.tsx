"use client"

import { RateLimitRow } from "./RateLimitRow"
import Card from "@/components/Card"

export const RateLimitsCard = () => {
  const onRateLimitEditClick = () => {
    console.log("Edit rate limit")
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
        onEditClick={onRateLimitEditClick}
      />

      <RateLimitRow
        title="Deal rate limit"
        subtitle="1 limit"
        onEditClick={onRateLimitEditClick}
      />
    </Card>
  )
}
