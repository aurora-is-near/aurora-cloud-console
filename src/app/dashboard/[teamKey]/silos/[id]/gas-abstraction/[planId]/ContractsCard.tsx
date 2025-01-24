import { ConfigurationCard } from "@/components/ConfigurationCard"
import ContractsConfigurationCard from "@/components/GasAbstraction/ContractsConfigurationCard"
import { Silo } from "@/types/types"

export const ContractsCard = ({
  silo,
  disabled,
}: {
  silo: Silo
  disabled: boolean
}) => {
  return (
    <ConfigurationCard
      title="Target contracts"
      description="Contracts that users will interact with."
    >
      <ContractsConfigurationCard silo={silo} disabled={disabled} />
    </ConfigurationCard>
  )
}
