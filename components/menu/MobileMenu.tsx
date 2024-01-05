"use client"

import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  Bars3Icon,
  ClipboardDocumentCheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { MenuItem } from "@/constants/navigation"
import { MobileMainMenuButton, MobileSubMenuButton } from "./MenuButtons"
import { usePathname, useSelectedLayoutSegments } from "next/navigation"
import { capitalizeFirstLetter } from "@/utils/helpers"
import SignoutButton from "./SignoutButton"
import { AuroraTriangle } from "../icons"
import { useDeals } from "@/utils/api/queries"
import { getSubroutes } from "@/utils/menu"

const SubrouteMenu = () => {
  const pathname = usePathname()
  const [route] = useSelectedLayoutSegments()
  const subroutes = getSubroutes(pathname, route)
  const { data } = useDeals()

  return (
    <nav className="mt-6 flex-1 pt-6 border-t border-gray-800 space-y-2">
      <ul role="list" className="space-y-2">
        {subroutes.map((item) => (
          <li key={item.name}>
            <MobileSubMenuButton {...item} />
          </li>
        ))}
      </ul>

      {route === "borealis" &&
      !!data?.deals.length &&
      !pathname.startsWith("/admin") ? (
        <ul role="list" className="space-y-2">
          {data.deals.map((deal) => (
            <li key={deal.id}>
              <MobileSubMenuButton
                href={"/borealis/deals/" + deal.id}
                name={deal.name}
                icon={<ClipboardDocumentCheckIcon />}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  )
}

type MobileMenuProps = {
  menuItems: MenuItem[]
}

export default function MobileMenu({ menuItems }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [route, subroute] = useSelectedLayoutSegments()
  const isSettingsRoute = route === "settings"

  useEffect(() => setMenuOpen(false), [route, subroute])

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
                    <ul role="list" className="grid grid-cols-2 gap-2">
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
          <span>{capitalizeFirstLetter(route)}</span>
          {subroute && (
            <>
              <span className="text-gray-500">/</span>
              <span>{capitalizeFirstLetter(subroute)}</span>
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
