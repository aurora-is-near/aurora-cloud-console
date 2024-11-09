import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import ConfigurationPanel from "@/components/FiatOnrampPage/ConfigurationPanel"
import { Pill } from "@/components/Pill"
import { LinkButton } from "@/components/LinkButton"
import { ForwarderWidgetOpenButton } from "@/components/ForwarderOpenButton"
import { Silo } from "@/types/types"

type ForwarderConfigurationTabProps = {
  silo: Silo
}

const ForwarderConfigurationTab = ({
  silo,
}: ForwarderConfigurationTabProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <ConfigurationPanel>
        <div className="flex flex-col gap-2">
          <Pill>Option 1</Pill>
          <h3 className="text-lg text-slate-900 tracking-tighter font-semibold">
            Forwarder Widget
          </h3>
          <p className="text-sm text-slate-500">
            The Forwarder Widget provides the easiest way to integrate the
            Forwarder into your application.
          </p>
          <div className="flex flex-row mt-4 gap-2.5">
            <ForwarderWidgetOpenButton silo={silo} />
          </div>
        </div>
      </ConfigurationPanel>
      <ConfigurationPanel>
        <div className="flex flex-col gap-2">
          <Pill>Option 2</Pill>
          <h3 className="text-lg text-slate-900 tracking-tighter font-semibold">
            API Integration
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Use the Forwarder API to build your own frontend and fully integrate
            it into your application. It’s especially suited for mobile and
            gaming apps.
          </p>
          <div className="flex flex-row mt-4 gap-2.5">
            <LinkButton variant="border" href="/api">
              <div className="flex flex-row items-center gap-1">
                View API
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </div>
            </LinkButton>
          </div>
        </div>
        <div className="flex flex-col gap-2" />
      </ConfigurationPanel>
    </div>
  )
}

export default ForwarderConfigurationTab
