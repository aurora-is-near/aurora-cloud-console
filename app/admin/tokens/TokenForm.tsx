"use client"

import { Token } from "@/types/types"
import { updateToken } from "@/actions/admin/tokens/update-token"
import { createToken } from "@/actions/admin/tokens/create-token"
import { AdminForm } from "@/components/AdminForm"

type TokenFormProps = {
  token?: Token
}

export const TokenForm = ({ token }: TokenFormProps) => {
  return (
    <AdminForm
      item={token}
      updateItem={updateToken}
      createItem={createToken}
      href="/admin/tokens"
      inputs={[
        {
          name: "name",
          label: "Name",
          defaultValue: token?.name ?? "",
          autoComplete: "name",
          required: true,
        },
        {
          name: "address",
          label: "Address",
          defaultValue: token?.address ?? "",
          autoComplete: "address",
          required: true,
        },
        {
          name: "type",
          label: "Type",
          defaultValue: token?.type ?? "",
          autoComplete: "type",
          required: true,
        },
      ]}
    />
  )
}
