"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { generateIcon } from "@/utils/buttons"
import { MenuItem } from "@/types/menu"

type SidebarMenuItemProps = {
  menuItem: MenuItem
  isChild?: boolean
}

export const SidebarMenuItem = ({
  menuItem: { href, name, icon, items },
  isChild,
}: SidebarMenuItemProps) => {
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

  return (
    <>
      <Link
        href={href}
        aria-current={isCurrentRoute ? "page" : undefined}
        className={clsx(
          "group w-full flex items-center gap-x-2.5 rounded-lg font-medium select-none leading-none px-3",
          isChild ? "py-2.5 text-sm" : "py-2 text-base",
          isCurrentRoute
            ? "bg-slate-100 text-slate-900"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
        )}
      >
        {icon}
        <span>{name}</span>
        {!!items?.length && (
          <ChevronRightIcon
            className={clsx(
              "ml-auto w-4 h-4 text-slate-500",
              pathname.startsWith(href) && "rotate-90",
            )}
          />
        )}
      </Link>
      {!!items && pathname.startsWith(href) && (
        <ul className="pl-9 space-y-1 mt-1">
          {items.map((subItem) => (
            <li key={subItem.name}>
              <SidebarMenuItem isChild menuItem={subItem} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
