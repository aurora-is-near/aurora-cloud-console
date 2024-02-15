"use client"

import { Deal, Team } from "@/types/types"
import { updateDeal } from "@/actions/admin/deals/update-deal"
import { createDeal } from "@/actions/admin/deals/create-deal"
import { SubmitHandler } from "react-hook-form"
import { HorizontalForm } from "@/components/HorizontalForm"
import { SelectInputOption } from "@/components/SelectInput"

type DealFormProps = {
  deal?: Deal
  allTeams: Team[]
}

type Inputs = Omit<Deal, "id" | "created_at">

export const DealForm = ({ deal, allTeams }: DealFormProps) => {
  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (deal) {
      await updateDeal(deal.id, inputs)
      window.location.href = "/admin/deals?operation=updated"

      return
    }

    await createDeal(inputs)
    window.location.href = "/admin/deals?operation=created"
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
      inputs={[
        {
          name: "name",
          label: "Name",
          defaultValue: deal?.name ?? "",
          autoComplete: "name",
          required: true,
        },
        {
          name: "team_id",
          label: "Team",
          getValue: (option?: SelectInputOption) => option?.value,
          defaultValue: deal?.team_id,
          required: true,
          options: allTeams.map((team) => ({
            label: team.name,
            value: team.id,
          })),
        },
      ]}
    />
  )
}
