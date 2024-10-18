import { WidgetCard } from "@/components/UniversalWidgetPage/WidgetCard"
import { DeployedTokensCard } from "@/components/UniversalWidgetPage/DeployedTokensCard"
import { NetworksCard } from "@/components/UniversalWidgetPage/NetworksCard"

const UniversalWidgetConfigurationTab = ({ siloId }: { siloId: number }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <DeployedTokensCard siloId={siloId} />
      <NetworksCard siloId={siloId} />
      <WidgetCard siloId={siloId} />
    </div>
  )
}

export default UniversalWidgetConfigurationTab
