import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { type Silo } from "@/types/types"
import { getSiloRelayer } from "@/actions/silo-relayers/get-silo-relayer"
import { queryKeys } from "@/actions/query-keys"

const INTENTS_BASE_URL = "https://app.near-intents.org/withdraw"
const BASE_AMOUNT = 69.42
const BASE_NETWORK = "near"
const BASE_TOKEN = "NEAR"

export const useIntentsTxTopUpLink = (
  silo?: Silo,
): {
  isLoading: boolean
  link: string
  relayerAccount: string
} => {
  const { data: relayerAccount, isLoading: queryIsLoading } = useQuery({
    queryKey: queryKeys.getSiloRelayer(silo?.id ?? null),
    queryFn: () => (silo?.id ? getSiloRelayer(silo) : Promise.resolve(null)),
    enabled: Boolean(silo?.id),
  })

  const link = useMemo(() => {
    if (!silo?.id) {
      return ""
    }

    if (relayerAccount) {
      return `${INTENTS_BASE_URL}?amount=${BASE_AMOUNT}&network=${BASE_NETWORK}&token=${BASE_TOKEN}&recipient=${relayerAccount.account_id}`
    }

    return `${INTENTS_BASE_URL}?amount=${BASE_AMOUNT}&network=${BASE_NETWORK}&token=${BASE_TOKEN}&recipient=${silo.engine_account}`
  }, [relayerAccount, silo])

  const relayerAccountId = silo?.id
    ? (relayerAccount?.account_id ?? silo.engine_account)
    : ""

  return {
    isLoading: queryIsLoading,
    link,
    relayerAccount: relayerAccountId,
  }
}
