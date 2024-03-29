"use client"

import { AddToMetaMaskButton } from "@/app/dashboard/[team]/silos/[id]/configuration/AddToMetaMaskButton"
import { useMetaMask } from "@/hooks/useMetaMask"
import { Token } from "@/types/types"

type AddTokenToMetaMaskButtonProps = {
  token: Token
}

export const AddTokenToMetaMaskButton = ({
  token,
}: AddTokenToMetaMaskButtonProps) => {
  const { watchAsset } = useMetaMask()

  const onClick = () => {
    watchAsset(token)
  }

  return <AddToMetaMaskButton onClick={onClick} />
}
