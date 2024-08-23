import { BridgeDeployedTokensCard } from "@/app/dashboard_v1/[teamKey]/silos/[id]/bridge/BridgeDeployedTokensCard"
import { BridgeEmbedCodeCard } from "@/app/dashboard_v1/[teamKey]/silos/[id]/bridge/BridgeEmbedCodeCard"
import { BridgeTokensCard } from "@/app/dashboard_v1/[teamKey]/silos/[id]/bridge/BridgeTokensCard"
import { BridgeWidgetCard } from "@/app/dashboard_v1/[teamKey]/silos/[id]/bridge/BridgeWidgetCard"

type BridgeConfigurationProps = {
  siloId: number
}

export const BridgeConfiguration = ({ siloId }: BridgeConfigurationProps) => {
  return (
    <div className="pt-4">
      <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
      <div className="flex flex-col mt-6 space-y-6">
        <BridgeTokensCard siloId={siloId} />
        <BridgeDeployedTokensCard siloId={siloId} />
        <BridgeWidgetCard siloId={siloId} />
        <BridgeEmbedCodeCard />
      </div>
    </div>
  )
}
