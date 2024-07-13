"use client"

import { useMetaMask } from "@/hooks/useMetaMask"
import { Silo, Token } from "@/types/types"
import { AddToMetaMaskButton } from "./AddToMetaMaskButton"

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
