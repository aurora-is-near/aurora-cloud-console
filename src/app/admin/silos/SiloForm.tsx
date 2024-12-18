"use client"

import { SubmitHandler } from "react-hook-form"
import { sentenceCase } from "change-case"
import { usePathname } from "next/navigation"
import { BlockscoutDatabase, Silo, Team, Token } from "@/types/types"
import { updateSilo } from "@/actions/silos/update-silo"
import { createSilo } from "@/actions/silos/create-silo"
import {
  HorizontalForm,
  HorizontalFormProps,
} from "@/components/HorizontalForm"
import { SelectInputOption } from "@/components/SelectInput"

type SiloFormProps = {
  silo?: Silo
  tokens?: Token[]
  blockscoutDatabases: BlockscoutDatabase[]
  teams: Team[]
}

type Inputs = Omit<Silo, "id" | "created_at">

const NETWORK_OPTIONS = ["public", "permissioned", "private"] as const

type NetworkOption = (typeof NETWORK_OPTIONS)[number]

const getNetworkOption = (value: NetworkOption): SelectInputOption => ({
  label: sentenceCase(value),
  value,
})

const getTokenOption = (token: Token): SelectInputOption => ({
  label: token.symbol,
  value: token.id,
})

const getTeamOption = (team: Team): SelectInputOption => ({
  label: team.name,
  value: team.id,
})

const getBlockscoutDatabaseOption = (
  database: BlockscoutDatabase,
): SelectInputOption => ({
  label: database.name,
  value: database.id,
})

const isNetworkOption = (value?: string): value is NetworkOption =>
  !!value && NETWORK_OPTIONS.includes(value as NetworkOption)

export const SiloForm = ({
  silo,
  tokens,
  teams,
  blockscoutDatabases,
}: SiloFormProps) => {
  const pathname = usePathname()

  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (silo) {
      await updateSilo(silo.id, inputs)

      window.location.href = pathname.split("/").slice(0, -2).join("/")

      return
    }

    await createSilo(inputs)

    window.location.href = pathname.split("/").slice(0, -1).join("/")
  }

  const baseToken = tokens?.find((token) => token.id === silo?.base_token_id)
  const blockscoutDatabase = blockscoutDatabases?.find(
    (database) => database.id === silo?.blockscout_database_id,
  )

  const currentTeam = teams.find((team) => team.id === silo?.team_id)
  const inputs: HorizontalFormProps<Inputs>["inputs"] = [
    {
      name: "team_id",
      label: "Team",
      defaultValue: currentTeam ? getTeamOption(currentTeam) : undefined,
      getValue: (option?: SelectInputOption) => option?.value,
      options: teams.map(getTeamOption),
      required: true,
    },
    {
      name: "name",
      label: "Name",
      defaultValue: silo?.name ?? "",
      autoComplete: "name",
      required: true,
    },
    {
      name: "network",
      label: "Network",
      defaultValue:
        silo && isNetworkOption(silo.network)
          ? getNetworkOption(silo.network)
          : getNetworkOption("public"),
      autoComplete: "network",
      required: true,
      getValue: (option?: SelectInputOption) => option?.value ?? "public",
      options: [
        getNetworkOption("public"),
        getNetworkOption("permissioned"),
        getNetworkOption("private"),
      ],
    },
    {
      name: "chain_id",
      label: "Chain ID",
      defaultValue: silo?.chain_id ?? "",
      autoComplete: "chain_id",
      required: true,
    },
    {
      name: "genesis",
      label: "Genesis",
      defaultValue: silo?.genesis ?? "",
      autoComplete: "genesis",
      required: true,
    },
    {
      name: "engine_account",
      label: "Engine account",
      defaultValue: silo?.engine_account ?? "",
      autoComplete: "engine_account",
      required: true,
    },
    {
      name: "engine_version",
      label: "Engine version",
      defaultValue: silo?.engine_version ?? "",
      autoComplete: "engine_version",
      required: true,
    },
    {
      name: "rpc_url",
      label: "RPC URL",
      defaultValue: silo?.rpc_url ?? "",
      autoComplete: "rpc_url",
      required: true,
    },
    {
      name: "explorer_url",
      label: "Explorer URL",
      defaultValue: silo?.explorer_url ?? "",
      autoComplete: "explorer_url",
    },
    {
      name: "blockscout_database_id",
      label: "Blockscout database",
      defaultValue: blockscoutDatabase
        ? getBlockscoutDatabaseOption(blockscoutDatabase)
        : undefined,
      getValue: (option?: SelectInputOption) => option?.value,
      options: blockscoutDatabases.map(getBlockscoutDatabaseOption),
    },
    {
      name: "grafana_network_key",
      label: "Grafanana network key",
      defaultValue: silo?.grafana_network_key ?? "",
      autoComplete: "grafanana_network_key",
    },
  ]

  if (tokens) {
    inputs.push({
      name: "base_token_id",
      label: "Base token",
      defaultValue: baseToken ? getTokenOption(baseToken) : undefined,
      getValue: (option?: SelectInputOption) => option?.value,
      options: tokens.map(getTokenOption),
    })
  } else {
    inputs.push({
      name: "base_token_id",
      label: "Base token",
      getValue: (option?: SelectInputOption) => option?.value,
      disabled: true,
      placeholder: "You can add tokens after creating the silo",
    })
  }

  return <HorizontalForm submitHandler={submitHandler} inputs={inputs} />
}
