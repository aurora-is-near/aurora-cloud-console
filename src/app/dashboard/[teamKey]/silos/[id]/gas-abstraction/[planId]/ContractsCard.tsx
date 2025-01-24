"use client"

import { ConfigurationCard } from "@/components/ConfigurationCard"
import ContractsConfigurationCard from "@/components/GasAbstraction/ContractsConfigurationCard"
import { Silo } from "@/types/types"

export const ContractsCard = ({ silo }: { silo: Silo }) => {
  return (
    <ConfigurationCard
      title="Target contracts"
      description="Contracts that users will interact with."
    >
      <ContractsConfigurationCard silo={silo} />
    </ConfigurationCard>
  )
}
