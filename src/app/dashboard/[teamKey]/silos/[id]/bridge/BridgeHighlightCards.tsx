import { ServiceHighlightCards } from "@/components/ServiceHighlightCards"
import {
  BoltIcon,
  ClipboardDocumentCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid"

export const BridgeHighlightCards = () => {
  return (
    <ServiceHighlightCards
      highlights={[
        {
          title: "Deliver lightning-fast trading experiences",
          description:
            "Sub-second data delivery via battle-tested infrastructure enables a highly performant user experience without compromising on decentralization.",
          Icon: BoltIcon,
        },
        {
          title: "Enable advanced onchain risk management",
          description:
            "Supplementary market data, including granular market liquidity data, enables dynamic updates of risk management parameters.",
          Icon: LockClosedIcon,
        },
        {
          title: "Protect users against frontrunning",
          description:
            "Conflict-of-interest free data providers and ‘commit and reveal’ architecture help protect against malicious price manipulation and arbitrage.",
          Icon: ClipboardDocumentCheckIcon,
        },
      ]}
    />
  )
}
