"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"
import { generateIcon } from "@/utils/buttons"
import { MenuItem } from "@/types/menu"
import { clsx } from "@/uikit"

type SidebarMenuItemProps = {
  menuItem: MenuItem
  isChild?: boolean
  isDark?: boolean
}

export const SidebarMenuItem = ({
  menuItem: { href, name, icon, items, variant = "primary", isExternal },
  isChild,
  isDark,
}: SidebarMenuItemProps) => {
  const pathname = usePathname()
  const isCurrentRoute = pathname === href

  icon = generateIcon(
    icon,
    clsx("text-slate-500", {
      "text-slate-900 group-hover:text-slate-900":
        isCurrentRoute && variant === "primary",
      "text-slate-50 group-hover:text-slate-50":
        isCurrentRoute && variant === "secondary",
      "w-6 h-6 shrink-0": variant === "primary",
    }),
  )

  return (
    <>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        aria-current={isCurrentRoute ? "page" : undefined}
        className={clsx(
          "group w-full flex items-center gap-x-2.5 rounded-lg font-medium select-none leading-none px-3",
          isChild ? "py-2.5 text-sm" : "py-1.5 text-base",
          isCurrentRoute
            ? clsx("text-slate-900", isDark ? "bg-slate-200" : "bg-slate-100")
            : clsx(
                "text-slate-500 hover:text-slate-900",
                isDark ? "hover:bg-slate-200" : "hover:bg-slate-100",
              ),
        )}
      >
        {variant === "secondary" ? (
          <div
            className={clsx(
              "flex items-center justify-center rounded-md bg-slate-200 w-7 h-7",
              {
                "bg-slate-900 text-slate-50": isCurrentRoute,
              },
            )}
          >
            {icon}
          </div>
        ) : (
          icon
        )}
        <span>{name}</span>
        {!!items?.length && (
          <ChevronRightIcon
            className={clsx(
              "ml-auto w-4 h-4 text-slate-500",
              pathname.startsWith(href) && "rotate-90",
            )}
          />
        )}
        {isExternal && (
          <ArrowTopRightOnSquareIcon className="ml-auto w-4 h-4 text-slate-500" />
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
