import { BridgeDeployedTokensCard } from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeDeployedTokensCard"
import { BridgeEmbedCodeCard } from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeEmbedCodeCard"
import { BridgeTokensCard } from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeTokensCard"
import { BridgeWidgetCard } from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeWidgetCard"
import Card from "@/components/Card"

type BridgeConfigurationProps = {
  siloId: number
}

export const BridgeConfiguration = ({ siloId }: BridgeConfigurationProps) => {
  return (
    <>
      <div className="pt-4">
        <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
        <div className="flex flex-col mt-6 space-y-6">
          <BridgeTokensCard siloId={siloId} />
          <BridgeDeployedTokensCard siloId={siloId} />
          <BridgeWidgetCard siloId={siloId} />
          <BridgeEmbedCodeCard siloId={siloId} />
        </div>
      </div>
    </>
  )
}
