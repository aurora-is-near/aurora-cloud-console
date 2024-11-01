import { DeployedTokensCard } from "@/components/UniversalWidgetPage/DeployedTokensCard"
import { NetworksCard } from "@/components/UniversalWidgetPage/NetworksCard"

const UniversalWidgetConfigurationTab = async ({
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

export default UniversalWidgetConfigurationTab
