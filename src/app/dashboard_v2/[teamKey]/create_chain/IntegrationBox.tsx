import React, { ComponentType } from "react"
import RoundedBox from "@/components/v2/dashboard/RoundedBox"
import { Toggle } from "@/components/Toggle"
import { Button } from "@/components/Button"
import { Integration } from "./useChainCreationForm"
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
  const getTitle = (int: Integration) => {
    switch (int) {
      case "onramp":
        return "Onramp"
      case "oracle":
        return "Oracle"
      case "bridge_widget":
        return "Bridge Widget"
      case "cex_withdrawals_widget":
        return "CEX Withdrawals Widget"
      default:
        return "Unknown"
    }
  }

  const getDescription = (int: Integration) => {
    switch (int) {
      case "onramp":
        return "Enable your users to onramp from fiat to crypto directly on your chain."
      case "oracle":
        return "Fuel your smart contracts with reliable, low-latency market data from institutional sources."
      case "bridge_widget":
        return "Attract liquidity by enabling bridging from other chains and transfers from CEXes to your chain."
      case "cex_withdrawals_widget":
        return "Allow your users to deposit assets directly from centralized exchanges to your chain."
      default:
        return "Unknown"
    }
  }

  const getIcon = (int: Integration) => {
    switch (int) {
      case "onramp":
        return IntegrationOracle as ComponentType<React.SVGProps<SVGSVGElement>>
      case "oracle":
        return IntegrationBridgeWidget as ComponentType<
          React.SVGProps<SVGSVGElement>
        >
      case "bridge_widget":
        return IntegrationCexWithdrawalsWidget as ComponentType<
          React.SVGProps<SVGSVGElement>
        >
      case "cex_withdrawals_widget":
        return IntegrationOnramp as ComponentType<React.SVGProps<SVGSVGElement>>
      default:
        return null
    }
  }

  const Icon = getIcon(integration)

  return (
    <RoundedBox className="w-full p-4">
      <div className="flex items-center mb-2">
        {Icon && <Icon className="w-14 h-10" />}
        <div className="w-full px-3">
          <h3 className="font-semibold text-xl text-slate-900 tracking-tighter">
            {getTitle(integration)}
          </h3>
          <p className="text-sm text-slate-700">
            {getDescription(integration)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="border" className="text-sm">
            Learn more
          </Button>
          <Toggle checked={isEnabled} onChange={onToggle} />
        </div>
      </div>
    </RoundedBox>
  )
}

export default IntegrationBox
