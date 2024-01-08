"use client"

import { Team } from "@/types/types"
import { updateTeam } from "@/actions/admin/teams/update-team"
import { createTeam } from "@/actions/admin/teams/create-team"
import { AdminForm } from "@/components/AdminForm"

type TeamFormProps = {
  team?: Team
}

export const TeamForm = ({ team }: TeamFormProps) => {
  return (
    <AdminForm
      item={team}
      updateItem={updateTeam}
      createItem={createTeam}
      href="/admin/teams"
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
      ]}
    />
  )
}
