import { ReactNode } from "react"

interface CardProps {
  title: string
  description: string
  icon: ReactNode
}

const FeatureCard = ({ card }: { card: CardProps }) => {
  return (
    <div className="flex flex-row items-start justify-around gap-3">
      <div className="max-w-fit w-fit">{card.icon}</div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-[16px] text-slate-900 font-medium">{card.title}</h2>
        <span className="text-slate-500 text-xs">{card.description}</span>
      </div>
      <div className="w-[30px] h-[20px] border border-red-500">
        {/* Placeholder for Check/Radio */}
      </div>
    </div>
  )
}

export default FeatureCard
