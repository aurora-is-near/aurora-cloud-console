import { DeployedTokensCard } from "@/components/UniversalWidgetPage/DeployedTokensCard"
import { NetworksCard } from "@/components/UniversalWidgetPage/NetworksCard"
import { getWidget } from "@/actions/widget/get-widget"

const UniversalWidgetConfigurationTab = async ({
  siloId,
}: {
  siloId: number
}) => {
  const widget = await getWidget(siloId)

  return (
    <div className="w-full flex flex-col gap-4">
      <DeployedTokensCard siloId={siloId} />
      <NetworksCard siloId={siloId} widget={widget} />
    </div>
  )
}

export default UniversalWidgetConfigurationTab
