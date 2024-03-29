"use client"

import CopyButton from "@/components/CopyButton"
import ListItem from "@/components/ListItem"
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline"

const DeployAccessList = () => {
  return (
    <ul className="border-t divide-y">
      <ListItem>
        <ListItem.Title>All users</ListItem.Title>
        <ListItem.Subtitle>5,223 users</ListItem.Subtitle>
        <div className="flex items-center gap-x-2.5">
          <span className="text-gray-500 text-sm leading-none">
            auroracloud.api/lsjkh4lkfjsd9
          </span>
          <CopyButton value="auroracloud.api/lsjkh4lkfjsd9" />
        </div>
        <ListItem.Actions>
          <button className="text-gray-500 hover:text-gray-900">
            <span className="sr-only">Edit list</span>
            <Cog6ToothIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => console.log("remove list")}
            className="text-gray-500 hover:text-gray-900"
          >
            <span className="sr-only">Remove list</span>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </ListItem.Actions>
      </ListItem>
    </ul>
  )
}

export default DeployAccessList
