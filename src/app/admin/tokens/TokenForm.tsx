"use client"

import { Token, TokenType } from "@/types/types"
import { updateToken } from "@/actions/tokens/update-token"
import { createToken } from "@/actions/tokens/create-token"
import { SubmitHandler } from "react-hook-form"
import { HorizontalForm } from "@/components/HorizontalForm"
import { SelectInputOption } from "@/components/SelectInput"

type TokenFormProps = {
  token?: Token
}

type Inputs = Omit<Token, "id" | "created_at">

const TOKEN_TYPES: TokenType[] = ["ERC20", "ERC721", "ERC1155"]

export const TokenForm = ({ token }: TokenFormProps) => {
  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (token) {
      await updateToken(token.id, inputs)
      window.location.href = "/admin/tokens?operation=updated"

      return
    }

    await createToken(inputs)
    window.location.href = "/admin/tokens?operation=created"
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
      inputs={[
        {
          name: "symbol",
          label: "Symbol",
          defaultValue: token?.symbol ?? "",
          autoComplete: "symbol",
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
          defaultValue: token?.type
            ? {
                label: token.type,
                value: token.type,
              }
            : undefined,
          required: true,
          options: TOKEN_TYPES.map((tokenType) => ({
            label: tokenType,
            value: tokenType,
          })),
          getValue: (option?: SelectInputOption) => option?.value,
        },
      ]}
    />
  )
}
