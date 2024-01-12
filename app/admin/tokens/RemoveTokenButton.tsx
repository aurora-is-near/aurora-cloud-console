"use client"

import { deleteToken } from "@/actions/admin/tokens/delete-token"
import TableButton from "@/components/TableButton"
import { Token } from "@/types/types"
import { TrashIcon } from "@heroicons/react/24/outline"

type RemoveTokenButtonProps = {
  token: Token
}

export const RemoveTokenButton = async ({ token }: RemoveTokenButtonProps) => {
  const onClick = () => {
    if (
      !confirm(`Are you sure you want to delete the token "${token.name}"?`)
    ) {
      return
    }

    deleteToken(token.id)
    window.location.href = `${window.location.pathname}?operation=deleted`
  }

  return (
    <TableButton
      Icon={TrashIcon}
      srOnlyText={`Remove ${token.name}`}
      onClick={onClick}
    />
  )
}
