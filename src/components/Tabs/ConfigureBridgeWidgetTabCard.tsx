import ConfigurationPanel from "@/components/FiatOnrampPage/ConfigurationPanel"
import { LinkButton } from "@/components/LinkButton"
import { Pill } from "@/components/Pill"
import { BridgeWidgetOpenButton } from "@/components/BridgeWidgetOpenButton"

type ConfigureBridgeWidgetTabCardProps = {
  linkPrefix: string
  siloId: number
  isComingSoon?: boolean
}

const ConfigureBridgeWidgetTabCard = ({
  linkPrefix,
  siloId,
  isComingSoon,
}: ConfigureBridgeWidgetTabCardProps) => {
  return (
    <ConfigurationPanel>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-x-2">
          <Pill>Option 1</Pill>
          {isComingSoon && <Pill variant="active">Coming soon</Pill>}
        </div>
        <h3 className="text-lg text-slate-900 tracking-tighter font-semibold">
          Bridge
        </h3>
        <p className="text-sm text-slate-500">
          The Bridge provides the easiest way to integrate multiple onramp
          solutions into your application.
        </p>
        {!isComingSoon && (
          <div className="flex flex-row mt-4 gap-2.5">
            <BridgeWidgetOpenButton siloId={siloId} />
            <LinkButton href={`${linkPrefix}/bridge`} variant="border">
              Configure
            </LinkButton>
          </div>
        )}
      </div>
    </ConfigurationPanel>
  )
}

export default ConfigureBridgeWidgetTabCard
