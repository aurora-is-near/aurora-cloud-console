"use client"

import Table from "@/components/Table"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useParams, useSearchParams } from "next/navigation"
import TableButton from "@/components/TableButton"
import { Pagination } from "@/components/Pagination"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useQueryState } from "next-usequerystate"

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

  const onRemoveListItemClick = (listItem: string) => {
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
              <TableButton
                Icon={TrashIcon}
                srOnlyText="Remove item"
                onClick={() => {
                  onRemoveListItemClick(listItem)
                }}
              />
            </Table.TD>
          </Table.TR>
        ))}
      </Table>
      <Pagination itemsPerPage={itemsPerPage} total={total} />
    </>
  )
}
