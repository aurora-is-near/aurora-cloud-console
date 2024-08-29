"use client"

import { useMetaMask } from "@/hooks/useMetaMask"
import { Token } from "@/types/types"
import { AddToMetaMaskButton } from "./AddToMetaMaskButton"

type AddTokenToMetaMaskButtonProps = {
  token: Token
}

export const AddTokenToMetaMaskButton = ({
  token,
}: AddTokenToMetaMaskButtonProps) => {
  const { watchAsset } = useMetaMask()

  const onClick = async () => {
    await watchAsset(token)
  }

  return <AddToMetaMaskButton onClick={onClick} />
}
