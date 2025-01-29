import { ReactNode } from "react"
import Card from "@/components/Card"

type ConfigurationCardProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export const ConfigurationCard = ({
  title,
  description,
  children,
  footer,
}: ConfigurationCardProps) => {
  return (
    <Card borderRadius="xl" tag="section">
      <div className="flex flex-col xl:flex-row gap-y-4 xl:gap-x-6 xl:gap-y-0">
        <div className="xl:w-1/2 xl:pr-10">
          <Card.Title tag="h2">{title}</Card.Title>
          <p className="text-slate-500 text-sm my-2">{description}</p>
        </div>
        <div className="w-full xl:w-1/2">{children}</div>
      </div>
      {!!footer && (
        <div className="mt-6 pt-6 border-t border-slate-200">{footer}</div>
      )}
    </Card>
  )
}
