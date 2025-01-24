"use client"

import type { Silo, Team } from "@/types/types"

import { GasConsumedChart } from "./GasConsumedChart"
import { GasConsumedMonthToDate } from "./GasConsumedMonthToDate"

type Props = {
  team: Team
  silo: Silo
}

export const GasAbstractionConsumedTab = ({ silo, team }: Props) => (
  <section className="w-full space-y-5">
    <GasConsumedChart silo={silo} />
    <GasConsumedMonthToDate silo={silo} team={team} />
  </section>
)
