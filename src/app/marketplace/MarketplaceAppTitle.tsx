import { ComponentType } from "react"
import Lightning from "../../../public/static/images/icons/marketplace/lightning.svg"

type MarketplaceAppTitleProps = {
  title: string
  icon?: string
}

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  lightning: Lightning,
}

export const MarketplaceAppTitle = ({
  title,
  icon,
}: MarketplaceAppTitleProps) => {
  const Icon = icon ? ICONS[icon] : null

  return (
    <div className="flex flex-row items-center">
      {Icon && <Icon className="w-6 h-6 mr-2.5" />}
      <h2 className="text-slate-900 dark:text-slate-50 text-2xl font-bold tracking-[-1px]">
        {title}
      </h2>
    </div>
  )
}
