import Card from "@/components/Card"
import { ComponentType } from "react"

type ServiceHighlightCardsProps = {
  highlights: {
    title: string
    description: string
    Icon: ComponentType<{ className?: string }>
  }[]
}

export const ServiceHighlightCards = ({
  highlights,
}: ServiceHighlightCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {highlights.map(({ title, description, Icon }) => (
        <Card
          key={title}
          borderRadius="xl"
          className="flex flex-col items-center"
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
        </Card>
      ))}
    </div>
  )
}
