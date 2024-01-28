import * as ReactDropdownMenu from "@radix-ui/react-dropdown-menu"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"

type DropdownMenuProps = {
  menuItems: {
    Icon: any
    text: string
    onClick: () => void
  }[]
}

const DropdownMenu = ({ menuItems }: DropdownMenuProps) => {
  return (
    <ReactDropdownMenu.Root>
      <ReactDropdownMenu.Trigger asChild>
        <button
          className="flex items-center text-gray-600 rounded-full hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          aria-label="Open option"
        >
          <EllipsisHorizontalIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </ReactDropdownMenu.Trigger>
      <ReactDropdownMenu.Portal>
        <ReactDropdownMenu.Content
          className="absolute right-0 origin-top-right bg-white rounded-md shadow-lg"
          sideOffset={5}
        >
          {menuItems.map((item) => (
            <ReactDropdownMenu.Item key={item.text}>
              <button
                type="button"
                onClick={item.onClick}
                className="flex w-full items-center py-2.5 text-sm space-x-1 text-gray-700 px-4"
              >
                <item.Icon className="w-5 h-5" />
                <span>{item.text}</span>
              </button>
            </ReactDropdownMenu.Item>
          ))}
        </ReactDropdownMenu.Content>
      </ReactDropdownMenu.Portal>
    </ReactDropdownMenu.Root>
  )
}

export default DropdownMenu
