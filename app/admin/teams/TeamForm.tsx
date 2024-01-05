"use client"

import { SubmitHandler } from "react-hook-form"
import { Team } from "@/types/types"
import { updateTeam } from "@/actions/admin/teams/update-team"
import { useState } from "react"
import { Alert } from "@/components/Alert"
import { createTeam } from "@/actions/admin/teams/create-team"
import { HorizontalForm } from "@/components/HorizontalForm"

type TeamFormProps = {
  team?: Team
}

type Inputs = {
  name: string
  team_key: string
  email: string
  website: string
}

export const TeamForm = ({ team }: TeamFormProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const update: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    setSuccessMessage(null)

    if (team) {
      await updateTeam(team.id, inputs)
      setSuccessMessage("Team updated")

      return
    }

    const newTeam = await createTeam(inputs)

    window.location.href = `/admin/teams?new_team=${newTeam?.id}`
  }

  return (
    <>
      {successMessage && (
        <Alert dismissable type="success" className="mb-6">
          {successMessage}
        </Alert>
      )}
      <HorizontalForm<Inputs>
        submitHandler={update}
        inputs={[
          {
            name: "name",
            label: "Name",
            value: team?.name ?? "",
            autoComplete: "name",
            required: true,
          },
          {
            name: "team_key",
            label: "Team key",
            value: team?.team_key ?? "",
            autoComplete: "team_key",
            required: true,
          },
          {
            name: "email",
            label: "Email",
            value: team?.email ?? "",
            autoComplete: "email",
            required: true,
          },
          {
            name: "website",
            label: "Website",
            value: team?.website ?? "",
            autoComplete: "website",
            required: true,
          },
        ]}
      />
    </>
  )
}
