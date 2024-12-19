import { ReactNode } from "react"
import Card from "@/components/Card"

import { clsx } from "@/uikit"

type TabCardProps = {
  children: ReactNode
  className?: string
  attribution?: {
    icon?: ReactNode
    text: string
  }
}

export const TabCard = ({ children, attribution, className }: TabCardProps) => (
  <Card className={clsx("w-full", className)}>
    {children}
    {attribution && (
      <div className="pt-5 mt-5 flex flex-row items-center gap-x-3 border-t">
        {attribution.icon}
        <span className="text-sm text-slate-600">{attribution.text}</span>
      </div>
    )}
  </Card>
)
