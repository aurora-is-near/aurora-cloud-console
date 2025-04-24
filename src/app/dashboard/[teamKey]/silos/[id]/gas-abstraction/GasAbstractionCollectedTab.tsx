import type { Silo, Team } from "@/types/types"

import { GasCollectedChart } from "./GasCollectedChart"
import { GasAbstractionSettings } from "./GasAbstractionSettings"
import { GasAbstractionMechanics } from "./GasAbstractionMechanics"

type Props = {
  silo: Silo
  team: Team
}

export const _active = ({ silo, team }: Props) => {
  return (
    <section className="w-full space-y-5">
      <GasCollectedChart silo={silo} />
      <GasAbstractionSettings silo={silo} team={team} />
      <GasAbstractionMechanics silo={silo} />
    </section>
  )
}
