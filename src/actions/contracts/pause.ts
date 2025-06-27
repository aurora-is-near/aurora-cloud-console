"use server"

import { isPausable, pause as pauseContract } from "@auroraisnear/pauser-sdk"

type PauseContractArgs = {
  networkId: "ethereum" | "near"
  chainId: string
  accountId: string
  target: string
  sender?: string
  methodName?: string
  methodArgs?: { key: string }
}

export const pause = async ({
  networkId,
  chainId,
  accountId,
  target,
  sender,
  methodName,
  methodArgs,
}: PauseContractArgs): Promise<void> => {
  const pausable = await isPausable({ networkId, chainId, accountId })

  if (!pausable) {
    return
  }

  if (networkId === "near") {
    await pauseContract({
      networkId,
      chainId,
      accountId,
      target,
      sender,
      methodName,
      methodArgs,
      derivationPath: "m/44'/397'/0'",
    })
  }
}
