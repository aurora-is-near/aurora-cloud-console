import { useEffect, useState } from "react"

import { logger } from "@/logger"
import { createPaymentLink } from "@/actions/stripe/create-payment-link"
import type { Team } from "@/types/types"

export const useStripePaymentLink = (team: Team): string | null => {
  const [topupLink, setTopupLink] = useState<string | null>(null)

  useEffect(() => {
    createPaymentLink(
      "initial_setup",
      team.id,
      `${window.location.origin}/dashboard/${team.team_key}`,
    )
      .then(setTopupLink)
      .catch((error) => {
        logger.error("Unable to get Stripe payment link", error)
        setTopupLink(null)
      })
  }, [team])

  return topupLink
}
