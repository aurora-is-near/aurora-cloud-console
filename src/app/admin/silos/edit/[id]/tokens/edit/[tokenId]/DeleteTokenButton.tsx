"use client"

import { useRouter } from "next/navigation"
import { deleteToken } from "@/actions/tokens/delete-token"
import { DeleteButton } from "@/components/DeleteButton"
import { Token } from "@/types/types"

type DeleteTokenButtonProps = {
  siloId: number
  token: Token
}

export const DeleteTokenButton = ({
  siloId,
  token,
}: DeleteTokenButtonProps) => {
  const router = useRouter()

  const onConfirmClick = async () => {
    await deleteToken(token.id)
    router.push(`/admin/silos/edit/${siloId}/tokens`)
  }

  return (
    <DeleteButton
      title="Delete token"
      description={`Are you sure you want to delete the token "${token.symbol}"?`}
      onDelete={onConfirmClick}
    />
  )
}
