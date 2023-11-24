"use client"

import CopyButton from "@/components/CopyButton"
import { midTruncate } from "@/utils/helpers"
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"

type ContractItemProps = {
  address: string
  name: string
  onDelete: () => void
  onEdit: () => void
}

const ContractItem = ({
  address,
  name,
  onDelete,
  onEdit,
}: ContractItemProps) => {
  return (
    <li className="flex items-center px-4 sm:px-5 md:px-6 py-4 md:py-[18px] space-x-6">
      <div className="flex flex-col flex-1 space-y-1.5 sm:space-x-6 sm:items-center sm:flex-row sm:space-y-0">
        <div className="w-24 overflow-hidden text-sm font-medium leading-none text-gray-900 truncate xl:w-44">
          {name}
        </div>
        <div className="flex items-center space-x-2.5">
          <div className="text-sm text-cyan-600">
            <span className="block md:hidden">{midTruncate(address, 20)}</span>
            <span className="hidden md:block">{midTruncate(address, 32)}</span>
          </div>

          <CopyButton value={address} />
        </div>
      </div>
      <div className="flex space-x-4 sm:space-x-5">
        <button
          onClick={onEdit}
          className="p-2 -m-2 text-gray-500 hover:text-gray-900"
        >
          <span className="sr-only">Edit contract</span>
          <PencilSquareIcon className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 -m-2 text-gray-500 hover:text-gray-900"
        >
          <span className="sr-only">Remove contract</span>
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  )
}

export default ContractItem
