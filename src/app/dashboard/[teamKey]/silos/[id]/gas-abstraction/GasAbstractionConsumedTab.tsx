"use client"

import type { Silo } from "@/types/types"

import { GasConsumedChart } from "./GasConsumedChart"
import { GasConsumedMonthToDate } from "./GasConsumedMonthToDate"

type Props = {
  silo: Silo
}

export const GasAbstractionConsumedTab = ({ silo }: Props) => (
  <section className="w-full space-y-5">
    <GasConsumedChart silo={silo} />
    <GasConsumedMonthToDate silo={silo} />
  </section>
)
