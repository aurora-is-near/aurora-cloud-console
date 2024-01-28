import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

type DropdownMenuProps = {
  menuItems: {
    Icon: any
    text: string
    onClick: () => void
  }[]
}

const DropdownMenu = ({ menuItems }: DropdownMenuProps) => {
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
            {menuItems.map((item) => (
              <Menu.Item key={item.text}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={clsx(
                      "flex w-full items-center p-2.5 text-sm space-x-1",
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    )}
                  >
                    <item.Icon className="w-5 h-5" />
                    <span>{item.text}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownMenu
