import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { LinkButton } from "@/components/LinkButton"
import { TabCard } from "@/components/TabCard/TabCard"
import Pill from "@/components/Pill"

const BridgePageConfigurationTab = ({ linkPrefix }: { linkPrefix: string }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <TabCard>
        <div className="flex flex-col gap-2">
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

      <TabCard>
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
      </TabCard>
    </div>
  )
}

export default BridgePageConfigurationTab
