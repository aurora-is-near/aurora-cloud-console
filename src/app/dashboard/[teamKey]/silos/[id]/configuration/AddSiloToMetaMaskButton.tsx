"use client"

import { AddToMetaMaskButton } from "./AddToMetaMaskButton"
import { useMetaMask } from "@/hooks/useMetaMask"
import { Silo, Token } from "@/types/types"

type AddTokenToMetaMaskButtonProps = {
  silo: Silo
  token: Token
}

export const AddSiloToMetaMaskButton = ({
  silo,
  token,
}: AddTokenToMetaMaskButtonProps) => {
  const { addEthereumChain } = useMetaMask()

  const onClick = () => {
    addEthereumChain(silo, token)
  }

  return <AddToMetaMaskButton onClick={onClick} />
}
