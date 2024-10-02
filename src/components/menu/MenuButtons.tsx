"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { paramCase } from "change-case"
import { Tooltip } from "@/components/Tooltip"
import { generateIcon } from "@/utils/buttons"

type BaseMenuButtonProps = {
  href: string
  name: string
  icon?: ReactNode
}

type SubMenuButtonProps = BaseMenuButtonProps & {
  disabled?: boolean
}

const MainMenuButton = ({ href, name, icon }: BaseMenuButtonProps) => {
  const pathname = usePathname()
  const isCurrentRoute = pathname.startsWith(href)

  icon = generateIcon(icon, "w-6 h-6 shrink-0 text-slate-300")

  return (
    <Tooltip
      id={`menu-item-${paramCase(name)}`}
      content={name}
      place="bottom"
      type="white"
    >
      <Link
        href={href}
        className={clsx(
          isCurrentRoute
            ? "bg-green-500 text-slate-900"
            : "text-slate-400 hover:text-white hover:bg-slate-800",
          "group flex rounded-lg p-3 text-sm leading-6 font-semibold items-center justify-center",
        )}
      >
        {icon}
        <span className="sr-only">{name}</span>
      </Link>
    </Tooltip>
  )
}

const SubMenuButton = ({
  href,
  name,
  icon,
  disabled,
  dark = false,
}: SubMenuButtonProps & { dark?: boolean }) => {
  const pathname = usePathname()
  const isCurrentRoute = pathname === href

  const getIconColor = () => {
    if (isCurrentRoute) {
      return dark ? "text-slate-100" : "text-slate-900"
    }

    return dark ? "text-slate-100" : "text-slate-500 group-hover:text-slate-900"
  }

  icon = generateIcon(icon, clsx(getIconColor(), "w-6 h-6 shrink-0"))

  const commonClasses =
    "w-full flex items-center gap-x-2.5 rounded-lg py-3 px-3.5 text-base leading-4 font-medium"

  if (disabled) {
    return (
      <button
        disabled
        type="button"
        className={clsx(
          commonClasses,
          dark
            ? "text-slate-100 bg-slate-900 opacity-50"
            : "text-slate-500 opacity-50",
        )}
      >
        {icon}
        <span>{name}</span>
      </button>
    )
  }

  return (
    <Link
      href={href}
      className={clsx(
        (() => {
          if (isCurrentRoute) {
            return dark
              ? "bg-slate-800 text-slate-100"
              : "bg-slate-100 text-slate-900"
          }

          return dark
            ? "text-slate-100 hover:text-slate-100 bg-slate-800"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
        })(),
        commonClasses,
        "group",
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  )
}

const MobileMainMenuButton = ({ href, name, icon }: BaseMenuButtonProps) => {
  const pathname = usePathname()
  const isCurrentRoute = pathname.startsWith(href)

  icon = generateIcon(icon, "w-6 h-6 shrink-0 text-slate-300")

  return (
    <Link
      href={href}
      className={clsx(
        isCurrentRoute
          ? "bg-green-500 text-slate-900"
          : "text-slate-400 hover:text-white hover:bg-slate-800 bg-slate-800",
        "group flex rounded-lg gap-x-3 p-3 text-sm leading-6 font-semibold",
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  )
}

const MobileSubMenuButton = ({ href, name, icon }: BaseMenuButtonProps) => {
  const pathname = usePathname()
  const isCurrentRoute = pathname === href

  icon = generateIcon(
    icon,
    clsx(isCurrentRoute ? "text-white" : "text-slate-500", "w-5 h-5 shrink-0"),
  )

  return (
    <Link
      href={href}
      className={clsx(
        isCurrentRoute ? "bg-slate-800 text-white" : "text-slate-500",
        "group flex items-center gap-x-2.5 rounded-lg py-3 px-3 text-base leading-4 font-semibold",
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  )
}

export {
  MainMenuButton,
  SubMenuButton,
  MobileMainMenuButton,
  MobileSubMenuButton,
}
