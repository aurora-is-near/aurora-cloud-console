"use client"

import { deleteToken } from "@/actions/tokens/delete-token"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { Token } from "@/types/types"

type RemoveTokenButtonProps = {
  token: Token
}

export const RemoveTokenButton = async ({ token }: RemoveTokenButtonProps) => {
  const onDelete = async () => deleteToken(token.id)

  return (
    <TableDeleteButton
      title="Remove token"
      description={`Are you sure you want to delete the token "${token.symbol}"?`}
      onDelete={onDelete}
    />
  )
}
