import { ComponentType } from "react"

import SelectableBox from "@/components/onboarding/SelectableBox"
import { Integration } from "@/types/chain-creation"

import {
  IntegrationBridgeWidget,
  IntegrationCexWithdrawalsWidget,
  IntegrationOnramp,
  IntegrationOracle,
} from "../../../../../public/static/v2/images/icons"

interface IntegrationBoxProps {
  integration: Integration
  isEnabled: boolean
  onToggle: () => void
}

const IntegrationBox: React.FC<IntegrationBoxProps> = ({
  integration,
  isEnabled,
  onToggle,
}) => {
  const TITLES: Record<Integration, string> = {
    onramp: "Fiat to crypto",
    oracle: "Oracle",
    bridge_widget: "Bridge widget",
    cex_withdrawals_widget: "CEX withdrawals",
  }

  const DESCRIPTIONS: Record<Integration, string> = {
    onramp:
      "Enable your users to onramp from fiat to crypto directly on your silo.",
    oracle:
      "Access reliable data from over 95 top publishers and integrate precise pricing data.",
    bridge_widget:
      "Attract liquidity by enabling bridging from other chains and transfers from CEXes to your chain.",
    cex_withdrawals_widget:
      "Allow your users to deposit assets directly from centralized exchanges to your chain.",
  }

  const ICONS: Record<
    Integration,
    ComponentType<React.SVGProps<SVGSVGElement>>
  > = {
    onramp: IntegrationOnramp,
    oracle: IntegrationOracle,
    bridge_widget: IntegrationBridgeWidget,
    cex_withdrawals_widget: IntegrationCexWithdrawalsWidget,
  }

  const Icon = ICONS[integration]

  return (
    <SelectableBox
      selected={isEnabled}
      onClick={onToggle}
      className="w-full p-6"
    >
      <div className="flex flex-col mb-2">
        {Icon && <Icon className="w-14 h-10" />}
        <div className="w-full mt-4">
          <h3 className="font-bold text-lg leading-6 text-slate-900 mb-1">
            {TITLES[integration]}
          </h3>
          <p className="text-sm text-slate-700">{DESCRIPTIONS[integration]}</p>
        </div>
      </div>
    </SelectableBox>
  )
}

export default IntegrationBox
