"use client"

import { useRouter } from "next/navigation"
import { DeleteButton } from "@/components/DeleteButton"
import { BridgedToken } from "@/types/types"
import { deleteBridgedToken } from "@/actions/bridged-tokens/delete-bridged-token"

type DeleteBridgedTokenButtonProps = {
  token: BridgedToken
}

export const DeleteBridgedTokenButton = ({
  token,
}: DeleteBridgedTokenButtonProps) => {
  const router = useRouter()

  const onConfirmClick = async () => {
    await deleteBridgedToken(token.id)
    router.push("/admin/bridged-tokens")
  }

  return (
    <DeleteButton
      title="Delete token"
      description={`Are you sure you want to delete the token "${token.name}"?`}
      onDelete={onConfirmClick}
    />
  )
}
