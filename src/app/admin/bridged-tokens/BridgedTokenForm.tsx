"use client"

import { SubmitHandler } from "react-hook-form"
import { usePathname } from "next/navigation"
import { BridgedToken } from "@/types/types"
import {
  HorizontalForm,
  HorizontalFormProps,
} from "@/components/HorizontalForm"
import { createBridgedToken } from "@/actions/bridged-tokens/create-bridged-token"
import { updateBridgedToken } from "@/actions/bridged-tokens/update-bridged-token"

type BridgedTokenFormProps = {
  token?: BridgedToken
}

type Inputs = Omit<BridgedToken, "id" | "created_at">

export const BridgedTokenForm = ({ token }: BridgedTokenFormProps) => {
  const pathname = usePathname()

  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (token) {
      await updateBridgedToken(token.id, inputs)

      window.location.href = pathname.split("/").slice(0, -2).join("/")

      return
    }

    await createBridgedToken(inputs)

    window.location.href = pathname.split("/").slice(0, -1).join("/")
  }

  const inputs: HorizontalFormProps<Inputs>["inputs"] = [
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
      name: "decimals",
      label: "Decimals",
      type: "number",
      defaultValue: token?.decimals ?? undefined,
      required: true,
    },
    {
      name: "aurora_address",
      label: "Aurora address",
      defaultValue: token?.aurora_address ?? "",
    },
    {
      name: "ethereum_address",
      label: "Ethereum address",
      defaultValue: token?.ethereum_address ?? "",
    },
    {
      name: "near_address",
      label: "Near address",
      defaultValue: token?.near_address ?? "",
      required: true,
    },
    {
      name: "icon_url",
      label: "Icon URL",
      defaultValue: token?.icon_url ?? "",
    },
  ]

  return <HorizontalForm submitHandler={submitHandler} inputs={inputs} />
}
