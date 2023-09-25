import ListItem from "@/components/ListItem"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

const RulesList = () => {
  return (
    <ul className="border-t divide-y">
      <ListItem>
        <ListItem.Title>Time limit</ListItem.Title>
        <ListItem.Subtitle>Valid until 23/03/2024</ListItem.Subtitle>
        <ListItem.Actions>
          <button className="text-gray-500 hover:text-gray-900">
            <span className="sr-only">Edit rule</span>
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        </ListItem.Actions>
      </ListItem>
    </ul>
  )
}

export default RulesList
