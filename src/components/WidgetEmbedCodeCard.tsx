import { TabCard } from "@/components/TabCard/TabCard"
import { WidgetName } from "@/types/widgets"
import { getWidgetUrl } from "@/utils/widgets"

type WidgetEmbedCodeCardProps = {
  teamKey: string
  siloId: number
  widgetName: WidgetName
}

export const WidgetEmbedCodeCard = ({
  teamKey,
  siloId,
  widgetName,
}: WidgetEmbedCodeCardProps) => {
  return (
    <TabCard className="space-y-2">
      <p className="text-sm">
        Copy and paste the following code into your website, immediately after
        the opening <pre className="font-mono inline-block">&lt;body&gt;</pre>{" "}
        tag.
      </p>
      <pre className="text-sm font-mono bg-slate-100 p-4 rounded-md whitespace-pre-wrap">
        {`<script src="${getWidgetUrl(teamKey, siloId, widgetName)}"></script>`}
      </pre>
      <p className="text-sm mt-1 pt-3">
        Open the widget by calling the following function:
      </p>
      <pre className="text-sm font-mono bg-slate-100 p-4 rounded-md whitespace-pre-wrap">
        window.acc.{widgetName}Widget.open()
      </pre>
    </TabCard>
  )
}
