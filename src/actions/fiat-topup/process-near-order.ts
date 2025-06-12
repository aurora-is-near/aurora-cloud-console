"use server"

import { connect, KeyPair, keyStores, utils } from "near-api-js"
import type { KeyPairString } from "near-api-js/lib/utils"
import type { Silo, SiloConfigTransactionStatus } from "@/types/types"
import { getRelayerAccount } from "@/utils/relayer"
import { coinGeckoApiClient } from "@/utils/coingecko-api/client"

export const processNearOrder = async ({
  silo,
  amount,
}: {
  silo: Silo
  amount: number
}): Promise<SiloConfigTransactionStatus> => {
  if (!silo.engine_account) {
    return "FAILED"
  }

  const nearUsdPrice = await coinGeckoApiClient.getNearUsdPrice()
  const nearAmount: string = (amount / nearUsdPrice.near.usd).toString()

  const relayerAccount = getRelayerAccount(silo)
  const receiver = relayerAccount ?? silo.engine_account

  if (!receiver) {
    return "FAILED"
  }

  try {
    const NEAR_WALLET_PRIVATE_KEY = process.env
      .NEAR_WALLET_PRIVATE_KEY as KeyPairString

    const NEAR_WALLET_ACCOUNT_ID = process.env.NEAR_WALLET_ACCOUNT_ID as string

    if (!NEAR_WALLET_PRIVATE_KEY || !NEAR_WALLET_ACCOUNT_ID) {
      throw new Error(
        "NEAR_WALLET_PRIVATE_KEY or NEAR_WALLET_ACCOUNT_ID not set",
      )
    }

    const keyStore = new keyStores.InMemoryKeyStore()
    const keyPair = KeyPair.fromString(NEAR_WALLET_PRIVATE_KEY)

    await keyStore.setKey("mainnet", NEAR_WALLET_ACCOUNT_ID, keyPair)

    const config = {
      networkId: "mainnet",
      keyStore,
      nodeUrl: "https://rpc.mainnet.near.org",
    }

    const near = await connect(config)
    const account = await near.account(NEAR_WALLET_ACCOUNT_ID)

    const parsedAmount = utils.format.parseNearAmount(nearAmount)

    if (!parsedAmount) {
      throw new Error("Invalid NEAR amount")
    }

    await account.sendMoney(receiver, BigInt(parsedAmount))

    return "SUCCESSFUL"
  } catch (error) {
    console.error("Failed to process NEAR transfer:", error)

    return "FAILED"
  }
}
