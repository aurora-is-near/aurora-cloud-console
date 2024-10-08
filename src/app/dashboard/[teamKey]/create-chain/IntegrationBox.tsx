import { ComponentType } from "react"
import { Toggle } from "@/components/Toggle"
import Card from "@/components/Card"
import { Integration } from "../../../../hooks/useChainCreationForm"
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
    onramp: "Onramp",
    oracle: "Oracle",
    bridge_widget: "Bridge Widget",
    cex_withdrawals_widget: "CEX Withdrawals Widget",
  }

  const DESCRIPTIONS: Record<Integration, string> = {
    onramp:
      "Enable your users to onramp from fiat to crypto directly on your chain.",
    oracle:
      "Fuel your smart contracts with reliable, low-latency market data from institutional sources.",
    bridge_widget:
      "Attract liquidity by enabling bridging from other chains and transfers from CEXes to your chain.",
    cex_withdrawals_widget:
      "Allow your users to deposit assets directly from centralized exchanges to your chain.",
  }

  const ICONS: Record<
    Integration,
    ComponentType<React.SVGProps<SVGSVGElement>>
  > = {
    onramp: IntegrationOracle,
    oracle: IntegrationBridgeWidget,
    bridge_widget: IntegrationCexWithdrawalsWidget,
    cex_withdrawals_widget: IntegrationOnramp,
  }

  const Icon = ICONS[integration]

  return (
    <Card className="w-full p-4">
      <div className="flex items-center mb-2">
        {Icon && <Icon className="w-14 h-10" />}
        <div className="w-full px-3">
          <h3 className="font-semibold text-xl text-slate-900 tracking-tighter">
            {TITLES[integration]}
          </h3>
          <p className="text-sm text-slate-700">{DESCRIPTIONS[integration]}</p>
        </div>

        <div className="flex items-center gap-4">
          <Toggle checked={isEnabled} onChange={onToggle} />
        </div>
      </div>
    </Card>
  )
}

export default IntegrationBox
