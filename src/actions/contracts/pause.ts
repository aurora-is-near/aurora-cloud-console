"use server"

import { pause as pauseContract } from "@auroraisnear/pauser-sdk"

type PauseContractArgs = {
  networkId: "ethereum" | "near"
  chainId: string
  accountId: string
  target?: string
  sender?: string
}

export const pause = async ({
  networkId,
  chainId,
  accountId,
  target,
  sender,
}: PauseContractArgs): Promise<void> => {
  if (networkId === "near" && target) {
    await pauseContract({ networkId, chainId, accountId, target, sender })
  } else if (networkId === "ethereum") {
    await pauseContract({
      networkId,
      chainId: parseInt(chainId, 10),
      accountId,
    })
  }
}
