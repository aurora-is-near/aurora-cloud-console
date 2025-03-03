"use client"

import toast from "react-hot-toast"
import { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Team } from "@/types/types"
import { updateTeam } from "@/actions/teams/update-team"
import { HorizontalForm } from "@/components/HorizontalForm"
import { HOME_ROUTE } from "@/constants/routes"
import { createTeam } from "@/actions/teams/create-team"

type TeamFormProps = {
  team?: Team
}

type Inputs = Omit<Team, "id" | "created_at"> & { siloIds?: number[] }

export const TeamForm = ({ team }: TeamFormProps) => {
  const router = useRouter()

  const submitHandler: SubmitHandler<Inputs> = async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    siloIds,
    ...teamInputs
  }: Inputs) => {
    if (team) {
      await updateTeam(team.id, teamInputs)

      toast.success("Team updated")

      return
    }

    await createTeam(teamInputs)
    window.location.href = `${HOME_ROUTE}/${teamInputs.team_key}`
  }

  const onCancel = () => {
    if (!team) {
      router.push(HOME_ROUTE)

      return
    }
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
      onCancel={!team ? onCancel : undefined}
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
      ]}
    />
  )
}
