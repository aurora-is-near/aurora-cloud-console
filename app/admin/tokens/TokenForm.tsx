"use client"

import { SubmitHandler } from "react-hook-form"
import { Token } from "@/types/types"
import { updateToken } from "@/actions/admin/tokens/update-token"
import { createToken } from "@/actions/admin/tokens/create-token"
import { HorizontalForm } from "@/components/HorizontalForm"

type TokenFormProps = {
  token?: Token
}

type Inputs = Omit<Token, "id" | "created_at">

export const TokenForm = ({ token }: TokenFormProps) => {
  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (token) {
      await updateToken(token.id, inputs)
      window.location.href = "/admin/token?operation=updated"

      return
    }

    await createToken(inputs)
    window.location.href = "/admin/token?operation=created"
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
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
