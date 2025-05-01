"use client"

import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useEffect } from "react"
import { useMenu } from "@/hooks/useMenu"
import { MenuSection } from "@/types/menu"
import { SidebarMenuItem } from "@/components/menu/SidebarMenuItem"
import Heading from "../Heading"

export type SidebarMenuProps = {
  heading?: string | JSX.Element
  action?: JSX.Element
  sections: MenuSection[]
  variant?: "default" | "compact"
}

export const SidebarMenu = ({
  heading,
  action,
  sections,
  variant,
}: SidebarMenuProps) => {
  const { isMenuOpen, closeMenu, setHasMenu } = useMenu()

  useEffect(() => {
    setHasMenu(!!sections.length)
  }, [sections, setHasMenu])

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
          "flex inset-y-0 flex-col overflow-y-auto w-full h-full lg:transform-none transition ease-in-out duration-300",
          "bg-white sm:border-r border-slate-200 p-6",
          variant === "compact"
            ? "sm:w-64 sm:min-w-64 lg:w-52 lg:min-w-52 lg:border-none lg:bg-transparent lg:p-0"
            : "sm:w-72 sm:min-w-72",

          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div
          className={clsx(
            "flex flex-row items-center",
            heading ? "justify-between" : "justify-end",
          )}
        >
          {!!heading && (
            <Heading tag="span" textColorClassName="text-slate-900">
              {heading}
            </Heading>
          )}
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

        <nav
          className={clsx(
            "flex flex-col flex-1 divide-y divide-slate-200",
            variant !== "compact" && "mt-4",
          )}
        >
          {sections.map((section, index) => {
            return (
              <section
                className={clsx({
                  "mt-4 pt-4": index && variant !== "compact",
                  "mt-5 pt-6": index && variant === "compact",
                })}
                key={section.heading ?? index}
              >
                {!!section.heading && (
                  <h3
                    className={clsx(
                      "font-bold",
                      variant === "compact"
                        ? "text-slate-900 text-lg mb-3 tracking-[-0.5px]"
                        : "px-3 text-slate-500 uppercase text-xs tracking-[1.5px] py-2.5 mb-1",
                    )}
                  >
                    {section.heading}
                  </h3>
                )}
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <SidebarMenuItem
                        menuItem={item}
                        isDark={variant === "compact"}
                      />
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
