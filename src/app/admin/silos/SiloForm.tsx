"use client"

import { SubmitHandler } from "react-hook-form"
import { sentenceCase } from "change-case"
import { usePathname } from "next/navigation"
import { BlockscoutDatabase, Silo, SilosTeams, Team } from "@/types/types"
import { updateSilo } from "@/actions/silos/update-silo"
import { createSilo } from "@/actions/silos/create-silo"
import {
  HorizontalForm,
  HorizontalFormProps,
} from "@/components/HorizontalForm"
import { SelectInputOption } from "@/components/SelectInput"
import { addTeamsToSilo } from "@/actions/silos/add-teams-to-silo"
import { removeTeamsFromSilo } from "@/actions/silos/remove-teams-from-silo"

type SiloFormProps = {
  silo?: Silo
  blockscoutDatabases: BlockscoutDatabase[]
  teams: Team[]
  silosTeams: SilosTeams[]
}

type Inputs = Omit<Silo, "id" | "created_at"> & { silos_teams: string[] }

const NETWORK_OPTIONS = ["public", "permissioned", "private"] as const

type NetworkOption = (typeof NETWORK_OPTIONS)[number]

const getNetworkOption = (value: NetworkOption): SelectInputOption => ({
  label: sentenceCase(value),
  value,
})

const getBlockscoutDatabaseOption = (
  database: BlockscoutDatabase,
): SelectInputOption => ({
  label: database.name,
  value: database.id,
})

const getTeamOption = (team: Team): SelectInputOption => ({
  label: team.name,
  value: team.id,
})

const isNetworkOption = (value?: string): value is NetworkOption =>
  !!value && NETWORK_OPTIONS.includes(value as NetworkOption)

export const SiloForm = ({
  silo,
  teams,
  silosTeams,
  blockscoutDatabases,
}: SiloFormProps) => {
  const pathname = usePathname()

  console.log('---1', teams, silosTeams)

  const submitHandler: SubmitHandler<Inputs> = async ({
    silos_teams,
    ...inputs
  }: Inputs) => {
    const siloTeamIds = silos_teams.map(Number)

    if (silo) {
      await Promise.all([
        updateSilo(silo.id, inputs),
        removeTeamsFromSilo(silo.id),
      ])

      await addTeamsToSilo(silo.id, siloTeamIds)

      window.location.href = pathname.split("/").slice(0, -2).join("/")

      return
    }

    const newSilo = await createSilo(inputs)

    await addTeamsToSilo(newSilo.id, siloTeamIds)

    window.location.href = pathname.split("/").slice(0, -1).join("/")
  }

  const blockscoutDatabase = blockscoutDatabases?.find(
    (database) => database.id === silo?.blockscout_database_id,
  )

  const siloTeamIds = silosTeams
    .filter(({ silo_id }) => silo_id === silo?.id)
    .map(({ team_id }) => team_id)

  const currentTeams = teams.filter((team) => siloTeamIds.includes(team.id))
  const inputs: HorizontalFormProps<Inputs>["inputs"] = [
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
      name: "silo_to_silo_bridge_address",
      label: "Silo to silo bridge address",
      defaultValue: silo?.silo_to_silo_bridge_address ?? "",
      autoComplete: "silo_to_silo_bridge_address",
    },
    {
      name: "grafana_network_key",
      label: "Grafanana network key",
      defaultValue: silo?.grafana_network_key ?? "",
      autoComplete: "grafanana_network_key",
    },
    {
      name: "base_token_name",
      label: "Base token name",
      defaultValue: silo?.base_token_name ?? "",
      required: true,
    },
    {
      name: "base_token_symbol",
      label: "Base token symbol",
      defaultValue: silo?.base_token_symbol ?? "",
      required: true,
    },
    {
      name: "base_token_decimals",
      label: "Base token decimals",
      defaultValue: silo?.base_token_decimals,
      required: true,
    },
    {
      name: "silos_teams",
      label: "Teams",
      isMulti: true,
      defaultValue: currentTeams.map(getTeamOption),
      options: teams.map(getTeamOption),
      getValue: (options) => options.map((option) => option.value),
    },
  ]

  return <HorizontalForm submitHandler={submitHandler} inputs={inputs} />
}
