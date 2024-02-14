"use client"

import Table from "@/components/Table"
import { useParams } from "next/navigation"
import { Pagination } from "@/components/Pagination"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useQueryState } from "next-usequerystate"
import DropdownMenu from "@/components/DropdownMenu"
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/20/solid"
import { isWalletAddress } from "@/utils/wallets"
import Button from "@/components/Button"

type ListItemsTableProps = {
  listItems: string[]
  total: number
  perPage: number
  onLoadMoreClick: () => void
}

export const ListItemsTable = ({
  listItems,
  onLoadMoreClick,
  total,
  perPage,
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

  const onViewDetailsClick = (listItem: string) => {
    setItem(listItem)
    openModal(Modals.ViewListItemDetails)
  }

  return (
    <>
      <Table>
        <Table.TH>Item</Table.TH>
        <Table.TH hidden>Options</Table.TH>
        {listItems.map((listItem) => {
          const menuItems = [
            {
              Icon: TrashIcon,
              text: "Delete",
              onClick: () => {
                onDeleteClick(listItem)
              },
            },
          ]

          if (isWalletAddress(listItem)) {
            menuItems.unshift({
              Icon: InformationCircleIcon,
              text: "View details",
              onClick: () => {
                onViewDetailsClick(listItem)
              },
            })
          }

          return (
            <Table.TR key={listItem}>
              <Table.TD dark>{listItem}</Table.TD>
              <Table.TD align="right">
                <DropdownMenu menuItems={menuItems} />
              </Table.TD>
            </Table.TR>
          )
        })}
      </Table>
      {listItems.length < total && (
        <div className="flex justify-center w-full mt-8">
          <Button style="secondary" onClick={onLoadMoreClick}>
            Load {Math.min(perPage, total - listItems.length)} more
          </Button>
        </div>
      )}
    </>
  )
}
