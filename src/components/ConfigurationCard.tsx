import { ReactNode } from "react"
import Card from "@/components/Card"

type ConfigurationCardProps = {
  title: string
  description: string
  belowDescription?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

export const ConfigurationCard = ({
  title,
  description,
  belowDescription,
  children,
  footer,
}: ConfigurationCardProps) => {
  return (
    <Card borderRadius="xl" tag="section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 xl:gap-x-6 xl:gap-y-0">
        <div className="xl:pr-10">
          <Card.Title tag="h2">{title}</Card.Title>
          <p className="text-slate-500 text-sm my-2">{description}</p>
          {!!belowDescription && <div className="mt-4">{belowDescription}</div>}
        </div>
        <div className="w-full">{children}</div>
      </div>
      {!!footer && (
        <div className="mt-6 pt-6 border-t border-slate-200">{footer}</div>
      )}
    </Card>
  )
}
