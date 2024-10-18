import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { TabCard } from "@/components/TabCard/TabCard"
import Pill from "@/components/Pill"
import ConfigureUniversalWidgetTabCard from "@/components/Tabs/ConfigureUniversalWidgetTabCard"
import Card from "@/components/Card"
import { LinkButton } from "@/components/LinkButton"
import CopyButton from "@/components/CopyButton"

const BulletPoint = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-slate-100 bg-slate-900 rounded-full w-5 h-5 font-medium flex items-center justify-center">
      {children}
    </div>
  )
}

const FiatOnrampStep = ({
  number,
  description,
  action,
}: {
  number: string | number
  description: string
  action: React.ReactNode
}) => {
  return (
    <Card className="p-2 md:p-2">
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row justify-between items-center gap-2">
          <BulletPoint>{number}</BulletPoint>
          <span className="text-sm font-bold">{description}</span>
        </div>
        {action}
      </div>
    </Card>
  )
}

const FiatOnrampConfigurationTab = ({ linkPrefix }: { linkPrefix: string }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <ConfigureUniversalWidgetTabCard linkPrefix={linkPrefix} />
      <TabCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <Pill label="Option 2" />
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
        </div>
      </TabCard>
    </div>
  )
}

export default FiatOnrampConfigurationTab
