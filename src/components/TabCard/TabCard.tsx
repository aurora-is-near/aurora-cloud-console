import { ReactNode } from "react"
import Card from "@/components/Card"

type TabCardProps = {
  children: ReactNode
  attribution?: {
    icon?: ReactNode
    text: string
  }
}

export const TabCard = ({ children, attribution }: TabCardProps) => (
  <Card className="divide-y flex flex-col gap-5">
    {children}
    {attribution && (
      <div className="pt-5 flex flex-row items-center gap-3">
        {attribution.icon}
        <span className="text-sm text-slate-600">{attribution.text}</span>
      </div>
    )}
  </Card>
)
