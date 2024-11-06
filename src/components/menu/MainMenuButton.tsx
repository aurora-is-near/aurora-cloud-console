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
  icon = generateIcon(icon, "w-5 h-5 shrink-0")

  const containerClassName = clsx(
    "text-slate-300 hover:text-slate-50 hover:bg-slate-700",
    "group flex rounded-lg p-1.5 text-sm leading-6 font-semibold items-center justify-center",
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
