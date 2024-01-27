"use client"

import Table from "@/components/Table"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useSearchParams } from "next/navigation"
import TableButton from "@/components/TableButton"
import { Pagination } from "@/components/Pagination"

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
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? 1)

  console.log("page", page)

  const onRemoveListItemClick = (listItem: string) => {
    if (confirm(`Are you sure you want to remove ${listItem}?`)) {
      // deleteListItem({ id })
    }
  }

  return (
    <>
      <Table>
        <Table.TH>Item</Table.TH>
        <Table.TH hidden>Options</Table.TH>
        {listItems.map((listItem) => (
          <Table.TR key={listItem}>
            <Table.TD>{listItem}</Table.TD>
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
