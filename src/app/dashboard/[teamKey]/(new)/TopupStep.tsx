"use client"

import { useStripePaymentLink } from "@/hooks/useStripePaymentLink"
import type { Team } from "@/types/types"

import { StepCard } from "./StepCard"

type Props = {
  team: Team
  state: "active" | "upcoming"
}

export const TopupStep = ({ team, state }: Props) => {
  const topupLink = useStripePaymentLink(team)

  return (
    <StepCard
      index={2}
      state={state}
      title="Top up your transaction credits"
      description="Aurora does not charge a deployment fee or ongoing services fees for your Virtual Chain. You do however require transaction credits to settle transactions on NEAR Protocol. Your Virtual Chain can be set with custom gas fee to cover these transaction costs or to create an additional revenue stream for your project."
      link={
        topupLink
          ? {
              isDisabled: false,
              label: "Top up now",
              url: topupLink,
            }
          : {
              isDisabled: true,
              label: "Top up now",
            }
      }
    />
  )
}
