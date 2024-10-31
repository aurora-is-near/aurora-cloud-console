import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import ConfigureUniversalWidgetTabCard from "@/components/Tabs/ConfigureUniversalWidgetTabCard"
import ConfigurationPanel from "@/components/FiatOnrampPage/ConfigurationPanel"
import { Pill } from "@/components/Pill"
import { LinkButton } from "@/components/LinkButton"
import CopyButton from "@/components/CopyButton"
import { FiatOnrampStep } from "@/components/FiatOnrampPage/FiatOnrampStep"

type FiatOnrampConfigurationTabProps = {
  linkPrefix: string
  siloId: number
}

const FiatOnrampConfigurationTab = ({
  linkPrefix,
  siloId,
}: FiatOnrampConfigurationTabProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <ConfigureUniversalWidgetTabCard
        linkPrefix={linkPrefix}
        siloId={siloId}
      />
      <ConfigurationPanel>
        <div className="flex flex-col gap-2">
          <Pill>Option 2</Pill>
          <h3 className="text-lg text-slate-900 tracking-tighter font-semibold">
            Embed Munzen Widget
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            You can also choose to embed Munzen's widget directly into your
            website or application if you're looking for a more integrated
            onramp experience. This method will also allow you to add your own
            fees to the onramp.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <FiatOnrampStep
            number="1"
            description="Get in touch with Munzen"
            action={
              <div className="flex flex-row gap-2 items-center">
                <span className="text-sm">hello@munzen.io</span>
                <CopyButton value="hello@munzen.io" />
              </div>
            }
          />
          <FiatOnrampStep
            number="2"
            description="Pass KYB (know your business)"
            action={
              <LinkButton
                isExternal
                href="https://docs.munzen.io/kikimora-labs/KYB-Process-e7b932c4143e4d4ebb83b1e307dd1a49"
                size="sm"
                variant="border"
              >
                <span>More about KYB</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </LinkButton>
            }
          />
          <FiatOnrampStep
            number="3"
            description="Get an API key"
            action={
              <LinkButton
                isExternal
                href="https://developers.munzen.io/getting-started"
                size="sm"
                variant="border"
              >
                <span>Documentation</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </LinkButton>
            }
          />
        </div>
      </ConfigurationPanel>
    </div>
  )
}

export default FiatOnrampConfigurationTab
