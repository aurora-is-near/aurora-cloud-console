import { ConfigurationCard } from "@/components/ConfigurationCard"
import { DealDurationSetting } from "./DealDurationSetting"
import { DealDurationModal } from "./DealDurationModal"

export const RulesCard = () => {
  return (
    <>
      <ConfigurationCard
        title="Define rules"
        description="Define specifics about this gas plan."
      >
        <DealDurationSetting />
      </ConfigurationCard>
      <DealDurationModal />
    </>
  )
}
