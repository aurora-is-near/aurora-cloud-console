import ListItem from "@/components/ListItem"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

const AccessLists = () => {
  return (
    <ul className="border-t divide-y">
      <ListItem>
        <ListItem.Title>Blocked addresses</ListItem.Title>
        <ListItem.Subtitle>84 users</ListItem.Subtitle>
        <ListItem.Actions>
          <button className="text-gray-500 hover:text-gray-900">
            <span className="sr-only">Settings</span>
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </ListItem.Actions>
      </ListItem>
    </ul>
  )
}

export default AccessLists
