import * as ReactDropdownMenu from "@radix-ui/react-dropdown-menu"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { ComponentType } from "react"

type DropdownMenuProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  menuItems: {
    Icon: ComponentType<{ className?: string }>
    text: string
    onClick: () => void
  }[]
}

const DropdownMenu = ({ menuItems, open, onOpenChange }: DropdownMenuProps) => {
  return (
    <ReactDropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <ReactDropdownMenu.Trigger asChild>
        <button
          type="button"
          className="flex items-center text-gray-600 rounded-full hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          aria-label="Open option"
          onClick={(e) => e.preventDefault()}
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
                <span className="whitespace-nowrap">{item.text}</span>
              </button>
            </ReactDropdownMenu.Item>
          ))}
        </ReactDropdownMenu.Content>
      </ReactDropdownMenu.Portal>
    </ReactDropdownMenu.Root>
  )
}

export default DropdownMenu
