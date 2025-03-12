import { useEffect, useState } from "react"

import { logger } from "@/logger"
import { createPaymentLink } from "@/actions/stripe/create-payment-link"
import type { Team } from "@/types/types"
import { ProductType } from "@/types/products"

export const useStripePaymentLink = (
  team: Team,
  productType: ProductType,
): string | null => {
  const [topupLink, setTopupLink] = useState<string | null>(null)

  useEffect(() => {
    createPaymentLink(
      productType,
      team.id,
      `${window.location.origin}/dashboard/${team.team_key}`,
    )
      .then(setTopupLink)
      .catch((error) => {
        logger.error("Unable to get Stripe payment link", error)
        setTopupLink(null)
      })
  }, [team, productType])

  return topupLink
}
