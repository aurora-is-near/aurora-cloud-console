import { ConfigurationCard } from "@/components/ConfigurationCard"
import ContractsConfigurationCard from "@/components/GasAbstraction/ContractsConfigurationCard"
import { Silo } from "@/types/types"

type ContractsCardProps = {
  silo: Silo
}

export const ContractsCard = ({ silo }: ContractsCardProps) => {
  return (
    <ConfigurationCard
      title="Target contracts"
      description="Contracts that users will interact with."
    >
      <ContractsConfigurationCard silo={silo} />
    </ConfigurationCard>
  )
}
