import { ConfigurationCard } from "@/components/ConfigurationCard"
import { Deal } from "@/types/types"
import { DealDurationSetting } from "./DealDurationSetting"
import { DealDurationModal } from "./DealDurationModal"
import { RuleSetting } from "./RuleSetting"

export const RulesCard = ({ deal }: { deal: Deal }) => {
  return (
    <>
      <ConfigurationCard
        title="Define rules"
        description="Define specifics about this gas plan."
      >
        <div className="flex flex-col gap-y-2.5 w-full xl:w-1/2">
          <DealDurationSetting deal={deal} />
          <RuleSetting
            title="Total transactions limit"
            description="No limit"
          />
          <RuleSetting title="Monthly limit, per user" description="No limit" />
        </div>
      </ConfigurationCard>
      <DealDurationModal deal={deal} />
    </>
  )
}
