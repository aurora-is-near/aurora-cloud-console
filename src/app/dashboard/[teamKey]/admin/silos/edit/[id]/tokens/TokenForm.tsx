"use client"

import { Token, TokenType } from "@/types/types"
import { updateToken } from "@/actions/tokens/update-token"
import { createToken } from "@/actions/tokens/create-token"
import { SubmitHandler } from "react-hook-form"
import { HorizontalForm } from "@/components/HorizontalForm"
import { SelectInputOption } from "@/components/SelectInput"
import { usePathname } from "next/navigation"

type TokenFormProps = {
  siloId: number
  token?: Token
}

type Inputs = Omit<Token, "id" | "created_at">

const TOKEN_TYPES: TokenType[] = ["ERC20", "ERC721", "ERC1155"]
const BRIDGE_ORIGINS = ["ethereum", "near"]

export const TokenForm = ({ siloId, token }: TokenFormProps) => {
  const pathname = usePathname()

  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (token) {
      await updateToken(token.id, inputs)
      window.location.href = pathname.split("/").slice(0, -2).join("/")

      return
    }

    await createToken({
      ...inputs,
      silo_id: siloId,
    })

    window.location.href = pathname.split("/").slice(0, -1).join("/")
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
        {
          name: "decimals",
          label: "Decimals",
          type: "number",
          defaultValue: token?.decimals ?? "",
          required: true,
        },
        {
          type: "divider",
        },
        {
          name: "bridge_origin",
          label: "Bridge origin",
          defaultValue: token?.bridge_origin
            ? {
                label: token.bridge_origin,
                value: token.bridge_origin,
              }
            : undefined,
          options: BRIDGE_ORIGINS.map((origin) => ({
            label: origin,
            value: origin,
          })),
          getValue: (option?: SelectInputOption) => option?.value,
        },
        {
          name: "fast_bridge",
          label: "Fast bridge",
          type: "toggle",
          defaultChecked: !!token?.fast_bridge,
          required: true,
        },
      ]}
    />
  )
}
