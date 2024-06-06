"use client"

import { deleteToken } from "@/actions/tokens/delete-token"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { Token } from "@/types/types"

type DeleteTokenTableButtonProps = {
  token: Token
}

export const DeleteTokenTableButton = async ({
  token,
}: DeleteTokenTableButtonProps) => {
  const onDelete = async () => deleteToken(token.id)

  return (
    <TableDeleteButton
      title="Delete token"
      description={`Are you sure you want to delete the token "${token.symbol}"?`}
      onDelete={onDelete}
    />
  )
}
