"use client"

import { cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { paramCase } from "change-case"
import { Tooltip } from "@/components/Tooltip"

type BaseMenuButtonProps = {
  href: string
  name: string
  icon?: ReactNode
}

type SubMenuButtonProps = BaseMenuButtonProps & {
  disabled?: boolean
}

const generateIcon = (icon: ReactNode, className: string) => {
  return isValidElement(icon)
    ? cloneElement(icon as ReactElement, {
        className,
        "aria-hidden": true,
      })
    : null
}

const MainMenuButton = ({ href, name, icon }: BaseMenuButtonProps) => {
  const pathname = usePathname()
  const isCurrentRoute = pathname.startsWith(href)

  icon = generateIcon(icon, "w-6 h-6 shrink-0 text-slate-300")

  return (
    <Tooltip
      id={`menu-item-${paramCase(name)}`}
      content={name}
      place="right"
      type="white"
    >
      <Link
        href={href}
        className={clsx(
          isCurrentRoute
            ? "bg-green-500 text-gray-900"
            : "text-gray-400 hover:text-white hover:bg-gray-800",
          "group flex rounded-lg p-3 text-sm leading-6 font-semibold items-center justify-center",
        )}
      >
        {icon}
        <span className="sr-only">{name}</span>
      </Link>
    </Tooltip>
  )
}

const SubMenuButton = ({ href, name, icon, disabled }: SubMenuButtonProps) => {
  const pathname = usePathname()
  const isCurrentRoute = pathname === href

  icon = generateIcon(
    icon,
    clsx(
      isCurrentRoute
        ? "text-gray-900"
        : "text-gray-500 group-hover:text-gray-900",
      "w-6 h-6 shrink-0",
    ),
  )

  const commonClasses =
    "w-full flex items-center gap-x-2.5 rounded-lg py-3 px-3.5 text-base leading-4 font-medium"

  if (disabled) {
    return (
      <button
        disabled
        type="button"
        className={clsx(commonClasses, "text-gray-500 opacity-50")}
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
        isCurrentRoute
          ? "bg-gray-100 text-gray-900"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
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
          ? "bg-green-500 text-gray-900"
          : "text-gray-400 hover:text-white hover:bg-gray-800 bg-gray-800",
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
    clsx(isCurrentRoute ? "text-white" : "text-gray-500", "w-5 h-5 shrink-0"),
  )

  return (
    <Link
      href={href}
      className={clsx(
        isCurrentRoute ? "bg-gray-800 text-white" : "text-gray-500",
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
