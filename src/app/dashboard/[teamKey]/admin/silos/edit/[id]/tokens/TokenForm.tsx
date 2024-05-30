"use client"

import { Token, TokenType } from "@/types/types"
import { updateToken } from "@/actions/tokens/update-token"
import { createToken } from "@/actions/tokens/create-token"
import { SubmitHandler } from "react-hook-form"
import { HorizontalForm } from "@/components/HorizontalForm"
import { SelectInputOption } from "@/components/SelectInput"
import { usePathname } from "next/navigation"
import { DEPLOYMENT_STATUSES } from "@/constants/deployment"

type TokenFormProps = {
  siloId: number
  token?: Token
}

type Inputs = Omit<Token, "id" | "created_at">

const TOKEN_TYPES: TokenType[] = ["ERC20", "ERC721", "ERC1155"]
const BRIDGE_ORIGINS = ["ethereum", "near"]

const getBridgeAddressOptions = (bridgeAddresses: string[]) =>
  bridgeAddresses.map((address) => ({
    label: address,
    value: address,
  }))

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
          name: "deployment_status",
          label: "Deployment status",
          defaultValue: token?.deployment_status
            ? {
                label: token.deployment_status,
                value: token.deployment_status,
              }
            : undefined,
          options: DEPLOYMENT_STATUSES.map((status) => ({
            label: status,
            value: status,
          })),
          getValue: (option?: SelectInputOption) => option?.value,
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
          name: "name",
          label: "Name",
          defaultValue: token?.name ?? "",
          autoComplete: "name",
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
          name: "icon_url",
          label: "Icon URL",
          defaultValue: token?.icon_url ?? "",
        },
        {
          type: "divider",
        },
        {
          name: "bridge_deployment_status",
          label: "Bridge deployment status",
          defaultValue: token?.bridge_deployment_status
            ? {
                label: token.bridge_deployment_status,
                value: token.bridge_deployment_status,
              }
            : undefined,
          options: DEPLOYMENT_STATUSES.map((status) => ({
            label: status,
            value: status,
          })),
          getValue: (option?: SelectInputOption) => option?.value,
        },
        {
          name: "fast_bridge",
          label: "Fast bridge",
          type: "toggle",
          defaultChecked: !!token?.fast_bridge,
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
          name: "bridge_addresses",
          label: "Bridge addresses",
          isMulti: true,
          isCreatable: true,
          placeholder: "e.g. ethereum:0x1234, near:0x5678",
          noOptionsMessage: () =>
            "Type to create a new bridge address (e.g. ethereum:0x1234)",
          defaultValue: getBridgeAddressOptions(token?.bridge_addresses ?? []),
          options: [],
          getValue: (options) => options.map((option) => option.value),
        },
      ]}
    />
  )
}
