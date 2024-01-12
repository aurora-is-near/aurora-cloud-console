"use client"

import { Silo } from "@/types/types"
import { AdminForm } from "@/components/AdminForm"
import { setTeamSilos } from "@/actions/admin/team-silos/set-team-silos"

type TeamSilosFormProps = {
  teamId?: number
  teamSilos?: Silo[]
  allSilos: Silo[]
}

type Inputs = { siloIds: number[] }

const getOptions = (silos: Silo[]) =>
  silos.map((silo) => ({
    label: `${silo.name} (${silo.chain_id})`,
    value: silo.id,
  }))

export const TeamSilosForm = ({
  teamId,
  teamSilos,
  allSilos,
}: TeamSilosFormProps) => {
  const updateItem = async (teamId: number, inputs: Inputs) => ({
    id: teamId,
    teamSilos: await setTeamSilos(teamId, inputs.siloIds),
  })

  const createItem = async (inputs: Inputs) => {
    if (!teamId) {
      throw new Error("Missing team ID")
    }

    return {
      id: teamId,
      teamSilos: await setTeamSilos(teamId, inputs.siloIds),
    }
  }

  return (
    <AdminForm
      itemName="Team silos"
      nextPath="/admin/teams"
      item={teamId ? { id: teamId, teamSilos } : undefined}
      updateItem={updateItem}
      createItem={createItem}
      inputs={[
        {
          name: "siloIds",
          label: "Team silos",
          isMulti: true,
          defaultValue: getOptions(teamSilos ?? []),
          options: getOptions(allSilos),
          getValue: (options) => options.map((option) => option.value),
        },
      ]}
    />
  )
}
