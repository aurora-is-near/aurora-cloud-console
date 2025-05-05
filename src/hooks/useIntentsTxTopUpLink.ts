import { useEffect, useState } from "react"
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

  async function checkSiloFundingWallet(): Promise<string | null> {
    try {

      if (!team.funding_wallet_address) {
        return null
      }

      return team.funding_wallet_address
    } catch (err) {
      logger.error("Error checking silo funding wallet", err)
      setError(err as Error)
      setLoading(false)

      return null
    }
  }

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
          setLoading(false)
        } else {
          setTopupLink(
            `${INTENTS_BASE_URL}?amount=${BASE_AMOUNT}&token=${BASE_TOKEN}&network=${BASE_NETWORK}&recipient=${address}`,
          )
          setLoading(false)
        }
      })
      .catch((err) => {
        logger.error("Error creating funding wallet", err)
        setError(err)
        setLoading(false)
      })
  }, [])

  return {
    topupLink,
    error,
    loading,
  }
}
