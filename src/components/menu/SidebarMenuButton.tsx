"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { generateIcon } from "@/utils/buttons"
import { SidebarMenuItem } from "@/types/menu"

type SidebarMenuButtonProps = {
  menuItem: SidebarMenuItem
}

export const SidebarMenuButton = ({
  menuItem: { href, name, icon, disabled },
}: SidebarMenuButtonProps) => {
  const pathname = usePathname()
  const isCurrentRoute = pathname === href

  icon = generateIcon(
    icon,
    clsx(
      isCurrentRoute
        ? "text-slate-900"
        : "text-slate-500 group-hover:text-slate-900",
      "w-6 h-6 shrink-0",
    ),
  )

  const commonClasses =
    "w-full flex items-center gap-x-2.5 rounded-lg py-3 px-3.5 text-base leading-4 font-medium select-none"

  if (disabled) {
    return (
      <button
        disabled
        type="button"
        className={clsx(commonClasses, "text-slate-500 opacity-50")}
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
          ? "bg-slate-100 text-slate-900"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
        commonClasses,
        "group",
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  )
}
