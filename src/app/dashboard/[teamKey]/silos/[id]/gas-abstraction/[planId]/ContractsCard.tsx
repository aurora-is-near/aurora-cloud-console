import { ConfigurationCard } from "@/components/ConfigurationCard"
import ContractsConfigurationCard from "@/components/GasAbstraction/ContractsConfigurationCard"

export const ContractsCard = () => {
  return (
    <ConfigurationCard
      title="Target contracts"
      description="Contracts that users will interact with."
    >
      <ContractsConfigurationCard />
    </ConfigurationCard>
  )
}
