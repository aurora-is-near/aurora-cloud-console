import { TokensCard } from "@/components/UniversalWidgetPage/TokensCard"
import { WidgetCard } from "@/components/UniversalWidgetPage/WidgetCard"
import { DeployedTokensCard } from "@/components/UniversalWidgetPage/DeployedTokensCard"
import { NetworksCard } from "@/components/UniversalWidgetPage/NetworksCard"

const UniversalWidgetConfigurationTab = ({ siloId }: { siloId: number }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <TokensCard siloId={siloId} />
      <DeployedTokensCard siloId={siloId} />
      <NetworksCard siloId={siloId} />
      <WidgetCard siloId={siloId} />
    </div>
  )
}

export default UniversalWidgetConfigurationTab
