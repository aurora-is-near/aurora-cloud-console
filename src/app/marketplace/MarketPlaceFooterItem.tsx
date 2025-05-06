import Link from "next/link"
import Image from "next/image"
import { ReactNode } from "react"

type MarketplaceFooterItemProps = {
  children?: ReactNode
  href: string
  iconSrc: string
}

export const MarketplaceFooterItem = ({
  children,
  href,
  iconSrc,
}: MarketplaceFooterItemProps) => {
  return (
    <li className="flex flex-row items-center space-x-3">
      <div className="relative min-h-8 min-w-8 rounded-full bg-slate-200 flex items-center justify-center">
        <Image src={iconSrc} width={16} height={16} alt="" />
      </div>
      <Link
        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors -tracking-[0.25px]"
        href={href}
        target="_blank"
      >
        {children}
      </Link>
    </li>
  )
}
