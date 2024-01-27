"use client"

import Button from "@/components/Button"
import Table from "@/components/Table"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { useSearchParams } from "next/navigation"
import TableButton from "@/components/TableButton"

const PER_PAGE = 20

type ListItemsTableProps = {
  listItems: string[]
  total: number
}

export const ListItemsTable = ({ listItems, total }: ListItemsTableProps) => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? 1)

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
      <div className="flex items-center justify-between mt-6">
        <PreviousPage page={page} />
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold">{(page - 1) * PER_PAGE + 1}</span> to{" "}
          <span className="font-semibold">
            {Math.min(page * PER_PAGE, total)}
          </span>{" "}
          of <span className="font-semibold">{total.toLocaleString()}</span>{" "}
          users
        </p>
        <NextPage page={page} totalPages={Math.ceil(total / PER_PAGE)} />
      </div>
    </>
  )
}

function PreviousPage({ page }: { page: number }) {
  const searchParams = new URLSearchParams(useSearchParams())

  if (page > 2) {
    searchParams.set("page", `${page - 1}`)
  } else {
    searchParams.delete("page")
  }

  const active = page > 1

  return (
    <Button
      style="secondary"
      disabled={!active}
      href={active ? `/lists?${searchParams}` : undefined}
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span>Previous</span>
    </Button>
  )
}

function NextPage({ page, totalPages }: { page: number; totalPages: number }) {
  const searchParams = new URLSearchParams(useSearchParams())

  searchParams.set("page", `${page + 1}`)

  const active = page < totalPages

  return (
    <Button
      style="secondary"
      disabled={!active}
      href={active ? `/lists?${searchParams}` : undefined}
    >
      <span>Next</span>
      <ArrowRightIcon className="w-5 h-5" />
    </Button>
  )
}
