import { ReactNode } from "react"
import { Tooltip } from "@/uikit/Tooltip"

type Props = {
  children: string
  icon: ReactNode
}

export const BrandAssetsConsumerIcon = ({ children, icon }: Props) => (
  <Tooltip
    trigger={
      <div className="w-7 h-7 bg-slate-200 rounded-lg inline-block">{icon}</div>
    }
    width={260}
  >
    {children}
  </Tooltip>
)
