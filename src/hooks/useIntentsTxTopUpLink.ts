import { useCallback, useEffect, useState } from "react"
import { logger } from "@/logger"
import { type Team } from "@/types/types"
import { createTeamFundingWallet } from "@/actions/teams-funding/create-funding-wallet"

const INTENTS_BASE_URL = "https://app.near-intents.org/withdraw"
const BASE_AMOUNT = 69.42
const BASE_NETWORK = "aurora"
const BASE_TOKEN = "USDT"

export const useIntentsTxTopUpLink = (
  team: Team,
): {
  topupLink: string | null
  error: Error | null
  loading: boolean
} => {
  const [topupLink, setTopupLink] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const checkSiloFundingWallet: () => Promise<string | null> =
    useCallback(async () => {
      return team.funding_wallet_address
    }, [team])

  useEffect(() => {
    checkSiloFundingWallet()
      .then(async (address) => {
        if (!address) {
          const res = await createTeamFundingWallet(team.id)

          if (!res.funding_wallet_address) {
            throw new Error("Funding wallet not created")
          }

          setTopupLink(
            `${INTENTS_BASE_URL}?amount=${BASE_AMOUNT}&token=${BASE_TOKEN}&network=${BASE_NETWORK}&recipient=${res.funding_wallet_address}`,
          )
        } else {
          setTopupLink(
            `${INTENTS_BASE_URL}?amount=${BASE_AMOUNT}&token=${BASE_TOKEN}&network=${BASE_NETWORK}&recipient=${address}`,
          )
        }
      })
      .catch((err) => {
        logger.error("Error creating funding wallet", err)
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [team, checkSiloFundingWallet])

  return {
    topupLink,
    error,
    loading,
  }
}
