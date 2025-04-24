import { NetworksCard } from "./NetworksCard"
import { DeployedTokensCard } from "./DeployedTokensCard"

export const BridgeWidgetConfigurationTab = ({
  siloId,
}: {
  siloId: number
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <DeployedTokensCard siloId={siloId} />
      <NetworksCard siloId={siloId} />
    </div>
  )
}
