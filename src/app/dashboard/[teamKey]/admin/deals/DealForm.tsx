"use client"

import { Deal } from "@/types/types"
import { updateDeal } from "@/actions/deals/update-deal"
import { createDeal } from "@/actions/deals/create-deal"
import { SubmitHandler } from "react-hook-form"
import { HorizontalForm } from "@/components/HorizontalForm"
import { usePathname } from "next/navigation"

type DealFormProps = {
  deal?: Deal
  teamId: number
}

type Inputs = {
  name: string
}

export const DealForm = ({ deal, teamId }: DealFormProps) => {
  const pathname = usePathname()

  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (deal) {
      await updateDeal(deal.id, inputs)
      window.location.href = pathname.split("/").slice(0, -2).join("/")

      return
    }

    await createDeal({
      ...inputs,
      team_id: teamId,
    })

    window.location.href = pathname.split("/").slice(0, -1).join("/")
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
      ]}
    />
  )
}
