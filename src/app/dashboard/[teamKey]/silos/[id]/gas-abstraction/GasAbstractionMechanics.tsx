"use client"

import { Card, InfoList, Typography } from "@/uikit"
import type { Silo } from "@/types/types"

type Props = {
  silo: Silo
  baseTokenSymbol: string
}

export const GasAbstractionMechanics = (props: Props) => {
  const { baseTokenSymbol } = props

  return (
    <Card className="flex flex-col gap-6 md:gap-12 md:flex-row">
      <aside className="w-full">
        <Typography variant="heading" size={4} className="text-slate-900 mb-1">
          Gas mechanics
        </Typography>
        <Typography variant="paragraph" size={4} className="text-slate-500">
          Provides access to the NEAR Explorer for tracking transactions and
          activity.
        </Typography>
      </aside>

      <InfoList className="md:max-w-[50%]">
        <InfoList.Item
          label="Gas method"
          labelTooltip="The way gas is collected on your chain."
        >
          Gas is collected as a variable amount based on the transaction
          complexity.
        </InfoList.Item>
        <InfoList.Item
          label="Gas value"
          labelTooltip="The price of gas on your chain, which defines how much gas is charged per transaction. Refer to the table to have an estimate of price per transaction."
        >
          {baseTokenSymbol}
        </InfoList.Item>
      </InfoList>
    </Card>
  )
}
