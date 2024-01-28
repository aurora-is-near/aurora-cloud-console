"use client"

import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { TrashIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useQueryState } from "next-usequerystate"
import clsx from "clsx"

const DropdownMenu = ({ address }: { address: string }) => {
  const [, setAddress] = useQueryState("address")
  const { openModal } = useModals()

  const setModalParams = (modalType: Modals) => {
    setAddress(address)
    openModal(modalType)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center text-gray-600 rounded-full hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="w-5 h-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-32 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-0.5">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setModalParams(Modals.BlockAddress)}
                  className={clsx(
                    "flex w-full items-center p-2.5 text-sm space-x-1",
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  )}
                >
                  <XCircleIcon className="w-5 h-5" />
                  <span>Block</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setModalParams(Modals.deleteListItem)}
                  className={clsx(
                    "flex w-full items-center p-2.5 text-sm space-x-1",
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  )}
                >
                  <TrashIcon className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownMenu
