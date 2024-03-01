"use client"

import { Deal, Team } from "@/types/types"
import { updateDeal } from "@/actions/deals/update-deal"
import { createDeal } from "@/actions/deals/create-deal"
import { SubmitHandler } from "react-hook-form"
import { HorizontalForm } from "@/components/HorizontalForm"
import { SelectInputOption } from "@/components/SelectInput"

type DealFormProps = {
  deal?: Deal
  allTeams: Team[]
}

type Inputs = {
  name: string
  team_id: number
}

const getTeamOption = (team: Team) => ({
  label: team.name,
  value: team.id,
})

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

  const selectedTeam = allTeams.find((team) => team.id === deal?.team_id)

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
          defaultValue: selectedTeam ? getTeamOption(selectedTeam) : undefined,
          required: true,
          options: allTeams.map(getTeamOption),
        },
      ]}
    />
  )
}
