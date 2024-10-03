"use client"

import { usePathname } from "next/navigation"
import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { MenuItem } from "@/types/menu"
import { useMenu } from "@/hooks/useMenu"
import Heading from "../Heading"

export const SidebarMenu = ({
  menuItems,
  fallbackMenu,
}: {
  menuItems: MenuItem[]
  fallbackMenu?: MenuItem
}) => {
  const pathname = usePathname()
  const { isMenuOpen, closeMenu } = useMenu()
  const activeMenu = menuItems.find((item) => pathname.startsWith(item.href))

  const { name, Menu } = activeMenu ?? fallbackMenu ?? {}

  if (!Menu) {
    return null
  }

  return (
    <div
      className={clsx(
        "fixed lg:relative inset-0 z-50",
        !isMenuOpen && "pointer-events-none lg:pointer-events-auto",
      )}
    >
      {/* Backdrop */}
      <div
        className={clsx(
          "lg:hidden transition-opacity ease-linear duration-300 fixed inset-0 bg-gray-900/80",
          isMenuOpen ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Menu */}
      <aside
        className={clsx(
          "flex inset-y-0 flex-col p-6 overflow-y-auto bg-white sm:border-r border-slate-200 w-full sm:w-72 sm:min-w-72 gap-y-7 h-screen lg:transform-none transition ease-in-out duration-300",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-row justify-between items-center">
          <Heading tag="span" textColorClassName="text-slate-900">
            {name}
          </Heading>
          <button
            type="button"
            className="p-2 -mr-2 lg:hidden"
            onClick={closeMenu}
          >
            <span className="sr-only">Close sidebar</span>
            <XMarkIcon className="h-6 w-6 text-slate-900" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col flex-1 gap-y-4">{Menu && <Menu />}</nav>
      </aside>
    </div>
  )
}
