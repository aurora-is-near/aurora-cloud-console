"use client"

import { Silo, Team } from "@/types/types"
import { updateSilo } from "@/actions/admin/silos/update-silo"
import { createSilo } from "@/actions/admin/silos/create-silo"
import { AdminForm } from "@/components/AdminForm"

type SiloFormProps = {
  silo?: Silo
  teams: Team[]
}

export const SiloForm = ({ silo, teams }: SiloFormProps) => {
  return (
    <AdminForm
      item={silo}
      updateItem={updateSilo}
      createItem={createSilo}
      href="/admin/silos"
      inputs={[
        {
          name: "name",
          label: "Name",
          defaultValue: silo?.name ?? "",
          autoComplete: "name",
          required: true,
        },
        {
          name: "chain_id",
          label: "Chain ID",
          defaultValue: silo?.chain_id ?? "",
          autoComplete: "chain_id",
          required: true,
        },
        {
          name: "team_id",
          label: "Team",
          defaultValue: silo?.team_id ?? "",
          autoComplete: "team_id",
          required: true,
          options: teams.map((team) => ({
            label: team.name,
            value: team.id,
          })),
        },
      ]}
    />
  )
}
