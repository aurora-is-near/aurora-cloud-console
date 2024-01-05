"use client"

import { SubmitHandler } from "react-hook-form"
import { Silo } from "@/types/types"
import { updateSilo } from "@/actions/admin/silos/update-silo"
import { useState } from "react"
import { Alert } from "@/components/Alert"
import { createSilo } from "@/actions/admin/silos/create-silo"
import { HorizontalForm } from "@/components/HorizontalFormInputs"

type SiloFormProps = {
  silo?: Silo
}

type Inputs = {
  chain_id: string
  name: string
  team_id: number
}

export const SiloForm = ({ silo }: SiloFormProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const update: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    setSuccessMessage(null)

    if (silo) {
      await updateSilo(silo.id, inputs)
      setSuccessMessage("Silo updated")

      return
    }

    const newSilo = await createSilo(inputs)

    window.location.href = `/admin/silos?new_silo=${newSilo?.id}`
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
            value: silo?.name ?? "",
            autoComplete: "name",
            required: true,
          },
          {
            name: "chain_id",
            label: "Chain ID",
            value: silo?.chain_id ?? "",
            autoComplete: "chain_id",
            required: true,
          },
          {
            name: "team_id",
            label: "Team ID",
            value: silo?.team_id ?? "",
            autoComplete: "team_id",
            required: true,
          },
        ]}
      />
    </>
  )
}
