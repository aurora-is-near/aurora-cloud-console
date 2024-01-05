"use client"

import { SubmitHandler } from "react-hook-form"
import { Token } from "@/types/types"
import { updateToken } from "@/actions/admin/tokens/update-token"
import { useState } from "react"
import { Alert } from "@/components/Alert"
import { createToken } from "@/actions/admin/tokens/create-token"
import { HorizontalForm } from "@/components/HorizontalForm"

type TokenFormProps = {
  token?: Token
}

type Inputs = {
  name: string
  address: string
  type: string
}
export const TokenForm = ({ token }: TokenFormProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const update: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    setSuccessMessage(null)

    if (token) {
      await updateToken(token.id, inputs)
      setSuccessMessage("Token updated")

      return
    }

    const newToken = await createToken(inputs)

    window.location.href = `/admin/tokens?new_token=${newToken?.id}`
  }

  return (
    <>
      {successMessage && (
        <Alert dismissable type="success" className="mb-6">
          {successMessage}
        </Alert>
      )}
      <HorizontalForm
        submitHandler={update}
        inputs={[
          {
            name: "name",
            label: "Name",
            value: token?.name ?? "",
            autoComplete: "name",
            required: true,
          },
          {
            name: "address",
            label: "Address",
            value: token?.address ?? "",
            autoComplete: "address",
            required: true,
          },
          {
            name: "type",
            label: "Type",
            value: token?.type ?? "",
            autoComplete: "type",
            required: true,
          },
        ]}
      />
    </>
  )
}
