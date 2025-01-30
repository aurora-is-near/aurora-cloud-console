import type { Silo } from "@/types/types"

import { GasCollectedChart } from "./GasCollectedChart"
import { GasAbstractionSettings } from "./GasAbstractionSettings"
import { GasAbstractionMechanics } from "./GasAbstractionMechanics"

type Props = {
  silo: Silo
}

export const GasAbstractionCollectedTab = ({ silo }: Props) => {
  return (
    <section className="w-full space-y-5">
      <GasCollectedChart silo={silo} />
      <GasAbstractionSettings silo={silo} />
      <GasAbstractionMechanics silo={silo} />
    </section>
  )
}
