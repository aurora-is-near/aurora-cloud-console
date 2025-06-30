import { ComponentType } from "react"

import { Typography } from "@/uikit"
import SelectableBox from "@/components/onboarding/SelectableBox"
import { Integration } from "@/types/chain-creation"

import {
  IntegrationBlockExplorerWidget,
  IntegrationBridgeWidget,
  IntegrationCexWithdrawalsWidget,
  IntegrationDex,
  IntegrationIntenseSupport,
  IntegrationOnramp,
  IntegrationOracle,
} from "../../../../../public/static/images/icons"

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
    onramp: "Fiat onramp",
    oracle: "Oracle",
    bridge_widget: "Bridge",
    cex_withdrawals_widget: "CEX withdrawals",
    block_explorer: "Block explorer",
    intense_support: "Intents listing",
    dex: "DEX by Trisolaris",
  }

  const DESCRIPTIONS: Record<Integration, string> = {
    onramp:
      "Enable your users to onramp from fiat to crypto directly on your chain.",
    oracle:
      "Access reliable data from over 95 top publishers and integrate precise pricing data.",
    bridge_widget:
      "Bridge assets between Ethereum, Near, Aurora and your chain. Configure your bridge widget and embed it.",
    cex_withdrawals_widget:
      "Allow your users to deposit assets directly from centralized exchanges to your chain.",
    block_explorer: "Enjoy a blockchain explorer dedicated to your chain.",
    intense_support:
      "Get your chain listed on Intents, the first cross chain DEX leveraging chain abstraction and connect to Near, Solana, Base, Ethereum and all the virtual chains.",
    dex: "Create pools on your chain and start trading on Trisolaris.",
  }

  const ICONS: Record<
    Integration,
    ComponentType<React.SVGProps<SVGSVGElement>>
  > = {
    onramp: IntegrationOnramp,
    oracle: IntegrationOracle,
    bridge_widget: IntegrationBridgeWidget,
    cex_withdrawals_widget: IntegrationCexWithdrawalsWidget,
    block_explorer: IntegrationBlockExplorerWidget,
    intense_support: IntegrationIntenseSupport,
    dex: IntegrationDex,
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
          <Typography variant="heading" size={3} className="mb-1">
            {TITLES[integration]}
          </Typography>
          <p className="text-sm text-slate-700">{DESCRIPTIONS[integration]}</p>
        </div>
      </div>
    </SelectableBox>
  )
}

export default IntegrationBox
