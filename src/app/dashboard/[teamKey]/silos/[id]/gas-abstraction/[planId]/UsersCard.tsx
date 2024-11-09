import { ConfigurationCard } from "@/components/ConfigurationCard"
import UsersConfigurationCard from "@/components/GasAbstraction/UsersConfigurationCard"
import { DealDurationModal } from "./DealDurationModal"

export const UsersCard = () => {
  return (
    <>
      <ConfigurationCard
        title="Users"
        description="Choose who will benefit from this plan."
      >
        <UsersConfigurationCard />
      </ConfigurationCard>
      <DealDurationModal />
    </>
  )
}
