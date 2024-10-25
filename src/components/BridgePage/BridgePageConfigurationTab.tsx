import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { LinkButton } from "@/components/LinkButton"
import Pill from "@/components/Pill"
import ConfigureUniversalWidgetTabCard from "@/components/Tabs/ConfigureUniversalWidgetTabCard"
import ConfigurationPanel from "@/components/FiatOnrampPage/ConfigurationPanel"

const BridgePageConfigurationTab = ({ linkPrefix }: { linkPrefix: string }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <ConfigureUniversalWidgetTabCard linkPrefix={linkPrefix} />
      <ConfigurationPanel>
        <div className="flex flex-col gap-2">
          <Pill label="Option 2" />
          <h3 className="text-lg text-slate-900 tracking-tighter font-semibold">
            Rainbow Bridge
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            The Rainbow Bridge is the official bridge for transferring tokens
            between Ethereum, NEAR and the Aurora networks.
          </p>
          <div className="flex flex-row gap-2 mt-2">
            <LinkButton
              href="https://rainbowbridge.app/"
              variant="border"
              className="self-start"
              isExternal
            >
              <span>Visit Rainbow Bridge</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </LinkButton>
            <LinkButton
              href="https://rainbowbridge.app/deploy"
              variant="border"
              className="self-start"
              isExternal
            >
              <span>Deploy token</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </LinkButton>
          </div>
        </div>
      </ConfigurationPanel>
    </div>
  )
}

export default BridgePageConfigurationTab
