import ConfigurationPanel from "@/components/FiatOnrampPage/ConfigurationPanel"
import { LinkButton } from "@/components/LinkButton"
import { Pill } from "@/components/Pill"
import { UniversalWidgetOpenButton } from "@/components/UniversalWidgetOpenButton"

type ConfigureUniversalWidgetTabCardProps = {
  linkPrefix: string
  siloId: number
  isComingSoon?: boolean
}

const ConfigureUniversalWidgetTabCard = ({
  linkPrefix,
  siloId,
  isComingSoon,
}: ConfigureUniversalWidgetTabCardProps) => {
  return (
    <ConfigurationPanel>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-x-2">
          <Pill>Option 1</Pill>
          {isComingSoon && <Pill variant="active">Coming soon</Pill>}
        </div>
        <h3 className="text-lg text-slate-900 tracking-tighter font-semibold">
          Universal Widget
        </h3>
        <p className="text-sm text-slate-500">
          The Universal Widget provides the easiest way to integrate multiple
          onramp solutions into your application.
        </p>
        {!isComingSoon && (
          <div className="flex flex-row mt-4 gap-2.5">
            <UniversalWidgetOpenButton siloId={siloId} />
            <LinkButton
              href={`${linkPrefix}/universal-widget`}
              variant="border"
            >
              Configure
            </LinkButton>
          </div>
        )}
      </div>
    </ConfigurationPanel>
  )
}

export default ConfigureUniversalWidgetTabCard
