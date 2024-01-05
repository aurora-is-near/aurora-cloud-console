"use client"

import { HorizontalInput } from "@/components/HorizontalInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { Team } from "@/types/types"
import Button from "@/components/Button"
import { CheckIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { Alert } from "@/components/Alert"
import { createTeam } from "@/actions/admin/teams/create-team"
import { updateTeam } from "@/actions/admin/teams/update-team"

type TeamFormProps = {
  team?: Team
}

type Inputs = {
  created_at: string
  email: string | null
  id: number
  name: string
  team_key: string
  website: string | null
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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>()

  return (
    <>
      {successMessage && (
        <Alert dismissable type="success" className="mb-6">
          {successMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit(update)}>
        <div className="space-y-4">
          <HorizontalInput
            required
            id="name"
            name="name"
            label="Name"
            autoComplete="name"
            register={register}
            error={errors.name}
            registerOptions={{
              value: team?.name ?? "",
              required: "Name is required",
            }}
          />
        </div>
        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            onClick={handleSubmit(update)}
            loading={isSubmitting}
          >
            <CheckIcon className="w-5 h-5" />
            <span>Save</span>
          </Button>
        </div>
      </form>
    </>
  )
}
