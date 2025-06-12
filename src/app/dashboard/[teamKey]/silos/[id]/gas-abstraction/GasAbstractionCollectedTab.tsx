import type { Silo, Team } from "@/types/types"

import { GasCollectedChart } from "./GasCollectedChart"
import { GasAbstractionSettings } from "./GasAbstractionSettings"
import { GasAbstractionMechanics } from "./GasAbstractionMechanics"

type Props = {
  silo: Silo
  team: Team
}

export const GasAbstractionCollectedTab = ({ silo, team }: Props) => {
  return (
    <section className="w-full space-y-5">
      <GasCollectedChart silo={silo} />
      <GasAbstractionSettings team={team} />
      <GasAbstractionMechanics silo={silo} team={team} />
    </section>
  )
}
