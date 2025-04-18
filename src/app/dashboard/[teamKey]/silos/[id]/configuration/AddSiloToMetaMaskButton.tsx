"use client"

import { useCallback } from "react"
import { Silo } from "@/types/types"
import { useMetaMask } from "@/hooks/useMetaMask"
import { AddToMetaMaskButton } from "./AddToMetaMaskButton"

type AddTokenToMetaMaskButtonProps = {
  silo: Silo
}

export const AddSiloToMetaMaskButton = ({
  silo,
}: AddTokenToMetaMaskButtonProps) => {
  const { addEthereumChain } = useMetaMask()

  const onClick = useCallback(async () => {
    await addEthereumChain(silo)
  }, [silo, addEthereumChain])

  return <AddToMetaMaskButton onClick={onClick} />
}
