import { ReactNode } from "react"
import Link from "next/link"
import clsx from "clsx"
import { generateIcon } from "@/utils/buttons"

type MainMenuButtonProps = {
  name: string
  icon?: ReactNode
  className?: string
} & (
  | {
      onClick?: () => void
      href?: never
    }
  | {
      href: string
      onClick?: never
    }
)

export const MainMenuButton = ({
  href,
  onClick,
  name,
  icon,
  className,
}: MainMenuButtonProps) => {
  icon = generateIcon(icon, "w-6 h-6 shrink-0 text-slate-300")

  const containerClassName = clsx(
    "text-slate-400 hover:text-white hover:bg-slate-800",
    "group flex rounded-lg p-3 text-sm leading-6 font-semibold items-center justify-center",
    className,
  )

  const content = (
    <>
      {icon}
      <span className="sr-only">{name}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={containerClassName}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={containerClassName} onClick={onClick}>
      {content}
    </button>
  )
}
