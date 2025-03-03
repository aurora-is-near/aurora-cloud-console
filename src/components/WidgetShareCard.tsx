import CopyButton from "@/components/CopyButton"
import { TabCard } from "@/components/TabCard/TabCard"
import { WidgetName } from "@/types/widgets"
import { getWidgetUrl } from "@/utils/widgets"

type WidgetShareCardProps = {
  teamKey: string
  siloId: number
  widgetName: WidgetName
}

export const WidgetShareCard = ({
  teamKey,
  siloId,
  widgetName,
}: WidgetShareCardProps) => {
  const widgetUrl = getWidgetUrl(teamKey, siloId, widgetName, {
    isShareableUrl: true,
  })

  return (
    <TabCard className="space-y-2">
      <p className="text-sm">
        You can access your fully configured {widgetName} widget URL via:
      </p>
      <div className="text-sm font-mono bg-slate-100 px-4 py-3 rounded-md whitespace-pre-wrap flex flex-row justify-between items-center">
        {widgetUrl}
        <div>
          <CopyButton hasBorder value={widgetUrl} size="sm" />
        </div>
      </div>
    </TabCard>
  )
}
