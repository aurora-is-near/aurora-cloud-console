import React, { ComponentType } from "react"
import RoundedBox from "@/app/dashboard_v2/[teamKey]/create_chain/RoundedBox"
import { Integration } from "./useChainCreationForm"
import {
  IntegrationBridgeWidget,
  IntegrationCexWithdrawalsWidget,
  IntegrationOnramp,
  IntegrationOracle,
} from "../../../../../public/static/v2/images/icons"

interface IntegrationBoxProps {
  integration: Integration
}

const IntegrationBox: React.FC<IntegrationBoxProps> = ({ integration }) => {
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
        return "Enable fiat to crypto conversions for your users."
      case "oracle":
        return "Access real-world data and off-chain computation."
      case "bridge_widget":
        return "Allow users to bridge assets between chains."
      case "cex_withdrawals_widget":
        return "Enable withdrawals from centralized exchanges."
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
        {Icon && <Icon />}
        <div>
          <h3 className="font-semibold text-base">{getTitle(integration)}</h3>
          <p className="text-sm">{getDescription(integration)}</p>
        </div>
      </div>
    </RoundedBox>
  )
}

export default IntegrationBox
