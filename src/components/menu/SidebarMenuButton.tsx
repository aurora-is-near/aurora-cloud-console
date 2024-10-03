"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { generateIcon } from "@/utils/buttons"

type SidebarMenuButtonProps = {
  href: string
  name: string
  icon?: ReactNode
  disabled?: boolean
  dark?: boolean
}

export const SidebarMenuButton = ({
  href,
  name,
  icon,
  disabled,
  dark = false,
}: SidebarMenuButtonProps) => {
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
    "w-full flex items-center gap-x-2.5 rounded-lg py-3 px-3.5 text-base leading-4 font-medium select-none"

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
