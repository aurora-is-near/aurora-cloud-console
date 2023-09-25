"use client"

import CopyButton from "@/components/CopyButton"
import { midTruncate } from "@/utils/helpers"
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"

const ContractItem = ({ address, name }: { address: string; name: string }) => {
  return (
    <li className="flex items-center px-6 py-[18px] space-x-6">
      <div className="flex-1 flex items-center space-x-6">
        <div className="w-24 xl:w-44 truncate overflow-hidden text-gray-900 text-sm leading-none font-medium">
          {name}
        </div>
        <div className="flex items-center space-x-2.5">
          <div className="text-cyan-600 text-sm">
            <span className="hidden md:block xl:block lg:hidden">
              {address}
            </span>
            <span className="block md:hidden lg:block xl:hidden">
              {midTruncate(address, 32)}
            </span>
          </div>

          <CopyButton value={address} />
        </div>
      </div>
      <div className="flex space-x-5">
        <button
          onClick={() => console.log("edit contract")}
          className="text-gray-500 hover:text-gray-900"
        >
          <span className="sr-only">Edit contract</span>
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => console.log("delete contract")}
          className="text-gray-500 hover:text-gray-900"
        >
          <span className="sr-only">Remove contract</span>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </li>
  )
}

export default ContractItem
