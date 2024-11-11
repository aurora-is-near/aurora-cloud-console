import { ConfigurationCard } from "@/components/ConfigurationCard"
import { DealDurationSetting } from "./DealDurationSetting"
import { DealDurationModal } from "./DealDurationModal"
import { RuleSetting } from "./RuleSetting"

export const RulesCard = () => {
  return (
    <>
      <ConfigurationCard
        title="Define rules"
        description="Define specifics about this gas plan."
      >
        <div className="flex flex-col gap-y-2.5 w-full xl:w-1/2">
          <DealDurationSetting />
          <RuleSetting
            title="Total transactions limit"
            description="No limit"
          />
          <RuleSetting title="Monthly limit, per user" description="No limit" />
        </div>
      </ConfigurationCard>
      <DealDurationModal />
    </>
  )
}
