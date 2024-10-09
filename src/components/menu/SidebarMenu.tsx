"use client"

import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useMenu } from "@/hooks/useMenu"
import { SidebarMenuButton } from "@/components/menu/SidebarMenuButton"
import { MenuSection } from "@/types/menu"
import Heading from "../Heading"

export type SidebarMenuProps = {
  heading?: string
  action?: JSX.Element
  sections: MenuSection[]
}

export const SidebarMenu = ({
  heading,
  action,
  sections,
}: SidebarMenuProps) => {
  const { isMenuOpen, closeMenu } = useMenu()

  return (
    <div
      className={clsx(
        "fixed lg:relative inset-0 z-50",
        !isMenuOpen && "pointer-events-none lg:pointer-events-auto",
      )}
    >
      {/* Backdrop */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={clsx(
          "lg:hidden transition-opacity ease-linear duration-300 fixed inset-0 bg-gray-900/80",
          isMenuOpen ? "opacity-100" : "opacity-0",
        )}
        tabIndex={-1}
        onClick={closeMenu}
      />

      {/* Menu */}
      <aside
        className={clsx(
          "flex inset-y-0 flex-col p-6 overflow-y-auto bg-white sm:border-r border-slate-200 w-full sm:w-72 sm:min-w-72 h-screen lg:transform-none transition ease-in-out duration-300",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div
          className={clsx(
            "flex flex-row justify-between items-center",
            action && "mb-6",
          )}
        >
          <Heading tag="span" textColorClassName="text-slate-900">
            {heading}
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

        {action}

        <nav className="flex flex-col flex-1 mt-4 divide-y divide-slate-200">
          {sections.map((section, index) => {
            return (
              <section
                className={clsx(index && "mt-4 pt-4")}
                key={section.heading ?? index}
              >
                {section.heading && (
                  <h3 className="text-slate-500 uppercase text-xs font-bold px-3 py-2.5">
                    {section.heading}
                  </h3>
                )}
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <SidebarMenuButton menuItem={item} />
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}
