"use client"

import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  Bars3Icon,
  ClipboardDocumentCheckIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"
import { MenuItem } from "@/types/menu"
import { MobileMainMenuButton, MobileSubMenuButton } from "./MenuButtons"
import { useSelectedLayoutSegments } from "next/navigation"
import { capitalizeFirstLetter } from "@/utils/helpers"
import SignoutButton from "./SignoutButton"
import { AuroraTriangle } from "../icons"
import { useDeals } from "@/hooks/useDeals"
import { useLists } from "@/hooks/useLists"
import { Modals } from "@/utils/modals"
import { useSubroutes } from "@/hooks/useSubroutes"

const DealsSubrouteMenu = () => {
  const { data } = useDeals()
  const [, , teamKey] = useSelectedLayoutSegments()

  return (
    <ul className="space-y-2">
      {data?.items.map((deal) => (
        <li key={deal.id}>
          <MobileSubMenuButton
            href={`/dashboard/${teamKey}/borealis/deals/${deal.id}`}
            name={deal.name}
            icon={<ClipboardDocumentCheckIcon />}
          />
        </li>
      ))}
    </ul>
  )
}

const ListsSubrouteMenu = () => {
  const { data } = useLists()
  const [, , teamKey] = useSelectedLayoutSegments()

  return (
    <ul className="space-y-2">
      {data?.items.map((list) => (
        <li key={list.id}>
          <MobileSubMenuButton
            href={`/dashboard/${teamKey}/lists/${list.id}`}
            name={list.name}
            icon={<ClipboardDocumentCheckIcon />}
          />
        </li>
      ))}
      <li>
        <MobileSubMenuButton
          href={`/dashboard/${teamKey}/lists?modal=${Modals.AddList}`}
          name="New list"
          icon={<PlusIcon />}
        />
      </li>
    </ul>
  )
}

const SubrouteMenu = () => {
  const routeSegments = useSelectedLayoutSegments()
  const { menuItems } = useSubroutes(routeSegments)
  const isDashboardRoute = routeSegments[0] === "dashboard"

  return (
    <nav className="mt-6 flex-1 pt-6 border-t border-gray-800 space-y-2">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <MobileSubMenuButton {...item} />
          </li>
        ))}
      </ul>

      {isDashboardRoute && (
        <>
          {routeSegments[2] === "borealis" && <DealsSubrouteMenu />}
          {routeSegments[2] === "lists" && <ListsSubrouteMenu />}
        </>
      )}
    </nav>
  )
}

type MobileMenuProps = {
  menuItems: MenuItem[]
}

export default function MobileMenu({ menuItems }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const routeSegments = useSelectedLayoutSegments()
  const isDashboardRoute = routeSegments[0] === "dashboard"
  const isSettingsRoute = isDashboardRoute && routeSegments[2] === "settings"
  const routeTitle = isDashboardRoute ? routeSegments[2] : routeSegments[1]
  const routeSubtitle = isDashboardRoute ? routeSegments[3] : routeSegments[2]

  useEffect(() => setMenuOpen(false), [routeSegments])

  return (
    <>
      <Transition.Root show={menuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col overflow-y-auto bg-gray-900 p-6 ring-1 ring-white/10">
                  <div className="shrink-0">
                    <AuroraTriangle className="w-6 h-6" />
                  </div>

                  <nav className="mt-6">
                    <ul className="grid grid-cols-2 gap-2">
                      {menuItems.map((item) => (
                        <li key={item.name}>
                          <MobileMainMenuButton {...item} />
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <SubrouteMenu />

                  {isSettingsRoute && <SignoutButton />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <div className="flex-1 text-sm font-semibold leading-6 text-white space-x-2">
          <span>{capitalizeFirstLetter(routeTitle)}</span>
          {routeSubtitle && (
            <>
              <span className="text-gray-500">/</span>
              <span>{capitalizeFirstLetter(routeSubtitle)}</span>
            </>
          )}
        </div>

        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <span className="sr-only">Open navigation</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </>
  )
}
