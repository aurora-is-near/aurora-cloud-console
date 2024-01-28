"use client"

import Table from "@/components/Table"
import { useParams } from "next/navigation"
import { Pagination } from "@/components/Pagination"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useQueryState } from "next-usequerystate"
import DropdownMenu from "@/components/DropdownMenu"
import { TrashIcon } from "@heroicons/react/20/solid"

type ListItemsTableProps = {
  listItems: string[]
  total: number
  itemsPerPage: number
}

export const ListItemsTable = ({
  listItems,
  total,
  itemsPerPage,
}: ListItemsTableProps) => {
  const { id } = useParams()
  const { openModal } = useModals()
  const [, setId] = useQueryState("id")
  const [, setItem] = useQueryState("item")

  const onDeleteClick = (listItem: string) => {
    setId(String(id))
    setItem(listItem)
    openModal(Modals.DeleteListItem)
  }

  return (
    <>
      <Table>
        <Table.TH>Item</Table.TH>
        <Table.TH hidden>Options</Table.TH>
        {listItems.map((listItem) => (
          <Table.TR key={listItem}>
            <Table.TD dark>{listItem}</Table.TD>
            <Table.TD align="right">
              <DropdownMenu
                menuItems={[
                  {
                    Icon: TrashIcon,
                    text: "Delete",
                    onClick: () => {
                      onDeleteClick(listItem)
                    },
                  },
                ]}
              />
            </Table.TD>
          </Table.TR>
        ))}
      </Table>
      <Pagination itemsPerPage={itemsPerPage} total={total} />
    </>
  )
}
