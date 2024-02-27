"use client"

import { AddToMetaMaskButton } from "@/app/(dashboard)/silos/[id]/configuration/AddToMetaMaskButton"
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
    watchAsset(token.type, {
      address: token.address,
      symbol: token.name,
      decimals: 18,
    })
  }

  return <AddToMetaMaskButton onClick={onClick} />
}
