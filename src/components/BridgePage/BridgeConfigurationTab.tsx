import { BridgeDeployedTokensCard } from "@/components/BridgePage/BridgeDeployedTokensCard"
import { BridgeEmbedCodeCard } from "@/components/BridgePage/BridgeEmbedCodeCard"
import { BridgeTokensCard } from "@/components/BridgePage/BridgeTokensCard"
import { BridgeWidgetCard } from "@/components/BridgePage/BridgeWidgetCard"

const BridgeConfigurationTab = ({ siloId }: { siloId: number }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <BridgeTokensCard siloId={siloId} />
      <BridgeDeployedTokensCard siloId={siloId} />
      <BridgeWidgetCard siloId={siloId} />
      <BridgeEmbedCodeCard />
    </div>
  )
}

export default BridgeConfigurationTab
