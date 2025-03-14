"use client"

import { deleteBridgedToken } from "@/actions/bridged-tokens/delete-bridged-token"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { BridgedToken } from "@/types/types"

type DeleteBridgedTokenTableButtonProps = {
  token: BridgedToken
}

export const DeleteBridgedTokenTableButton = async ({
  token,
}: DeleteBridgedTokenTableButtonProps) => {
  const onDelete = async () => {
    await deleteBridgedToken(token.id)
  }

  return (
    <TableDeleteButton
      title="Delete token"
      description={`Are you sure you want to delete the token "${token.name}"?`}
      onDelete={onDelete}
    />
  )
}
