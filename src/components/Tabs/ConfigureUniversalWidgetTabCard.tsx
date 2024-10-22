import { LinkButton } from "@/components/LinkButton"
import Pill from "@/components/Pill"
import { TabCard } from "@/components/TabCard/TabCard"

const ConfigureUniversalWidgetTabCard = ({
  linkPrefix,
}: {
  linkPrefix: string
}) => {
  return (
    <TabCard>
      <div className="flex flex-col gap-2 max">
        <Pill label="Option 1" />
        <h3 className="text-lg text-slate-900 tracking-tighter font-semibold">
          Universal Widget
        </h3>
        <p className="text-sm text-slate-500 max-w-sm">
          The Universal Widget provides the easiest way to integrate multiple
          onramp solutions into your application.
        </p>
        <LinkButton
          href={`${linkPrefix}/universal-widget`}
          variant="border"
          className="self-start  mt-2"
        >
          Configure
        </LinkButton>
      </div>
    </TabCard>
  )
}

export default ConfigureUniversalWidgetTabCard
