import Link from "next/link"
import { ComponentType, ReactNode } from "react"

type MarketplaceFooterItemProps = {
  children?: ReactNode
  href: string
  Icon: ComponentType<{ className?: string }>
}

export const MarketplaceFooterItem = ({
  children,
  href,
  Icon,
}: MarketplaceFooterItemProps) => {
  return (
    <li className="flex flex-row items-center space-x-3 text-slate-600 dark:text-slate-300">
      <div className="relative min-h-8 min-w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        <Icon className="w-4 h-4" width={16} height={16} />
      </div>
      <Link
        className="text-sm font-medium hover:text-slate-900 dark:hover:text-slate-50 transition-colors -tracking-[0.25px]"
        href={href}
        target="_blank"
      >
        {children}
      </Link>
    </li>
  )
}
