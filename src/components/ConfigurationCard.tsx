import { ReactNode } from "react"
import Card from "@/components/Card"

type ConfigurationCardProps = {
  title: string
  description: string
  children: ReactNode
}

export const ConfigurationCard = ({
  title,
  description,
  children,
}: ConfigurationCardProps) => {
  return (
    <Card borderRadius="xl" tag="section">
      <div className="flex flex-col xl:flex-row xl:gap-x-6">
        <div className="xl:w-1/2 xl:pr-10">
          <Card.Title tag="h2">{title}</Card.Title>
          <p className="text-slate-500 text-sm my-2">{description}</p>
        </div>
        {children}
      </div>
    </Card>
  )
}
