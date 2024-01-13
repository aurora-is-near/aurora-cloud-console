"use client"

import { Silo } from "@/types/types"
import { updateSilo } from "@/actions/admin/silos/update-silo"
import { createSilo } from "@/actions/admin/silos/create-silo"
import { SubmitHandler } from "react-hook-form"
import { HorizontalForm } from "@/components/HorizontalForm"

type SiloFormProps = {
  silo?: Silo
}

type Inputs = Omit<Silo, "id" | "created_at">

export const SiloForm = ({ silo }: SiloFormProps) => {
  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (silo) {
      await updateSilo(silo.id, inputs)
      window.location.href = "/admin/silos?operation=updated"

      return
    }

    await createSilo(inputs)
    window.location.href = "/admin/silos?operation=created"
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
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
      ]}
    />
  )
}
