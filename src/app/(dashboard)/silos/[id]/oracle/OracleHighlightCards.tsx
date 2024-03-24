import {
  BoltIcon,
  ClipboardDocumentCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid"
import { ComponentType, ReactNode } from "react"

const HIGHLIGHTS: {
  title: string
  description: string
  Icon: ComponentType<{ className?: string }>
}[] = [
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
]

export const OracleHighlightCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {HIGHLIGHTS.map(({ title, description, Icon }) => (
        <div
          key={title}
          className="flex flex-col items-center bg-white rounded-xl border shadow-sm px-4 py-5 sm:px-5 md:px-6 sm:py-6"
        >
          <div className="bg-slate-100 border border-slate-300 rounded-full flex items-center justify-center text-grey-800 p-2.5">
            <Icon className="w-8 h-8 text-slate-500" />
          </div>
          <h2 className="text-gray-900 font-medium mt-4 lg:px-8 2xl:px-20 text-center">
            {title}
          </h2>
          <p className="text-gray-600 text-sm mt-4 text-center">
            {description}
          </p>
        </div>
      ))}
    </div>
  )
}
