"use client"

import { SubmitHandler } from "react-hook-form"
import { Silo, Team } from "@/types/types"
import { updateTeam } from "@/actions/admin/teams/update-team"
import { createTeam } from "@/actions/admin/teams/create-team"
import { PROXY_DATABASES } from "@/constants/databases"
import { SelectInputOption } from "@/components/SelectInput"
import { setTeamSilos } from "@/actions/admin/team-silos/set-team-silos"
import { HorizontalForm } from "@/components/HorizontalForm"

type TeamFormProps = {
  team?: Team
  teamSilos?: Silo[]
  allSilos: Silo[]
}

type Inputs = Omit<Team, "id" | "created_at"> & { siloIds?: number[] }

const getSiloOptions = (silos: Silo[]) =>
  silos.map((silo) => ({
    label: `${silo.name} (${silo.chain_id})`,
    value: silo.id,
  }))

export const TeamForm = ({ team, teamSilos, allSilos }: TeamFormProps) => {
  const submitHandler: SubmitHandler<Inputs> = async ({
    siloIds,
    ...teamInputs
  }: Inputs) => {
    if (team) {
      await Promise.all([
        updateTeam(team.id, teamInputs),
        setTeamSilos(team.id, siloIds ?? []),
      ])

      window.location.href = "/admin/teams?operation=updated"

      return
    }

    const newTeam = await createTeam(teamInputs)

    await setTeamSilos(newTeam.id, siloIds ?? [])

    window.location.href = "/admin/teams?operation=created"
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
      inputs={[
        {
          name: "name",
          label: "Name",
          defaultValue: team?.name ?? "",
          autoComplete: "name",
          required: true,
        },
        {
          name: "team_key",
          label: "Team key",
          defaultValue: team?.team_key ?? "",
          autoComplete: "team_key",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          defaultValue: team?.email ?? "",
          autoComplete: "email",
          required: true,
        },
        {
          name: "website",
          label: "Website",
          defaultValue: team?.website ?? "",
          autoComplete: "website",
          required: true,
        },
        {
          name: "transaction_database",
          label: "Transaction database",
          getValue: (option?: SelectInputOption) => option?.value,
          defaultValue: team?.transaction_database
            ? {
                label: team.transaction_database,
                value: team.transaction_database,
              }
            : undefined,

          options: PROXY_DATABASES.map((db) => ({
            label: db,
            value: db,
          })),
        },
        {
          name: "siloIds",
          label: "Silos",
          isMulti: true,
          defaultValue: getSiloOptions(teamSilos ?? []),
          options: getSiloOptions(allSilos),
          getValue: (options) => options.map((option) => option.value),
        },
      ]}
    />
  )
}
