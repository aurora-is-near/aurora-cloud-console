"use client"

import type { Silo } from "@/types/types"

import { GasConsumedMonthToDate } from "./GasConsumedMonthToDate"

type Props = {
  silo: Silo
}

export const GasAbstractionConsumedTab = ({ silo }: Props) => {
  return (
    <section className="w-full space-y-5">
      <GasConsumedMonthToDate silo={silo} />
    </section>
  )
}
