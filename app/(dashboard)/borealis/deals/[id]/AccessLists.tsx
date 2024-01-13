import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { useQueryState } from "next-usequerystate"
import { useModals } from "@/hooks/useModals"
import ListItem from "@/components/ListItem"
import { Modals } from "@/utils/modals"
import ManageListModal from "./ManageListModal"

type AccessListItem = {
  id: string
  name: string
  users: number
}

export const accessLists: AccessListItem[] = [
  {
    id: "1",
    name: "Premium subscribers",
    users: 12,
  },
  {
    id: "2",
    name: "Blocked addresses",
    users: 84,
  },
]

const AccessList = ({ list }: { list: AccessListItem }) => {
  const [, setListId] = useQueryState("listId")
  const { openModal } = useModals()

  const handleOpenModal = () => {
    setListId(list.id)
    openModal(Modals.ManageList)
  }

  return (
    <ListItem>
      <ListItem.Title>{list.name}</ListItem.Title>
      <ListItem.Subtitle>
        {list.users} user{list.users !== 1 ? "s" : ""}
      </ListItem.Subtitle>
      <ListItem.Actions>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-900"
          onClick={handleOpenModal}
        >
          <span className="sr-only">Manage list</span>
          <Cog6ToothIcon className="w-5 h-5" />
        </button>
      </ListItem.Actions>
    </ListItem>
  )
}

const AccessLists = () => (
  <>
    <ul className="border-t divide-y">
      {accessLists.map((list) => (
        <AccessList key={list.id} list={list} />
      ))}
    </ul>
    <ManageListModal />
  </>
)

export default AccessLists
