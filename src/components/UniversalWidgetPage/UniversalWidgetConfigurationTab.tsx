import { BridgeDeployedTokensCard } from "@/components/UniversalWidgetPage/BridgeDeployedTokensCard"
import { BridgeTokensCard } from "@/components/UniversalWidgetPage/BridgeTokensCard"
import { BridgeWidgetCard } from "@/components/UniversalWidgetPage/BridgeWidgetCard"

const UniversalWidgetConfigurationTab = ({ siloId }: { siloId: number }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <BridgeTokensCard siloId={siloId} />
      <BridgeDeployedTokensCard siloId={siloId} />
      <BridgeWidgetCard siloId={siloId} />
    </div>
  )
}

export default UniversalWidgetConfigurationTab
