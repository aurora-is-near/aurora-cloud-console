import { TabCard } from "@/components/TabCard/TabCard"
import { getWidgetUrl } from "@/utils/widgets"

type EmbedCodeCardProps = {
  teamKey: string
  siloId: number
}

export const EmbedCodeCard = ({ teamKey, siloId }: EmbedCodeCardProps) => {
  return (
    <TabCard>
      <p className="text-sm">
        Copy and paste the following code into your website, immediately after
        the opening <pre className="font-mono inline-block">&lt;body&gt;</pre>{" "}
        tag.
      </p>
      <pre className="text-sm font-mono bg-slate-100 p-4 rounded-md whitespace-pre-wrap">
        {`<script src="${getWidgetUrl(teamKey, siloId, "universal")}"></script>`}
      </pre>
      <p className="text-sm mt-1 pt-3">
        Open the widget by calling the following function:
      </p>
      <pre className="text-sm font-mono bg-slate-100 p-4 rounded-md whitespace-pre-wrap">
        window.acc.universalWidget.open()
      </pre>
    </TabCard>
  )
}
