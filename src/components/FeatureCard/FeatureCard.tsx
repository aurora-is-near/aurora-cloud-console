import { ReactNode } from "react"
import { CheckIcon } from "@heroicons/react/20/solid"
import Card from "@/components/Card"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  checked?: boolean
}

export const FeatureCard = ({
  title,
  description,
  icon,
  checked,
}: FeatureCardProps) => {
  return (
    <Card borderRadius="xl">
      <div className="flex flex-row items-start justify-around gap-4">
        <div className="max-w-fit w-fit">{icon}</div>
        <div className="flex flex-col gap-1.5 w-full">
          <h2 className="text-base text-slate-900 font-medium">{title}</h2>
          <span className="text-slate-500 text-sm">{description}</span>
        </div>
        {checked && (
          <div className="text-slate-900 bg-green-400 p-1 rounded-full">
            <CheckIcon className="w-4 h-4" />
          </div>
        )}
      </div>
    </Card>
  )
}
