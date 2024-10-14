import { BridgeDeployedTokensCard } from "@/components/BridgePage/BridgeDeployedTokensCard"
import { BridgeTokensCard } from "@/components/BridgePage/BridgeTokensCard"
import { BridgeWidgetCard } from "@/components/BridgePage/BridgeWidgetCard"

const BridgeConfigurationTab = ({ siloId }: { siloId: number }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <BridgeTokensCard siloId={siloId} />
      <BridgeDeployedTokensCard siloId={siloId} />
      <BridgeWidgetCard siloId={siloId} />
    </div>
  )
}

export default BridgeConfigurationTab
