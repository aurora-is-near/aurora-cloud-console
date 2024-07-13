"use client"

import { useParams } from "next/navigation"
import { useQueryState } from "next-usequerystate"
import {
  InformationCircleIcon,
  ListBulletIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import Table from "@/components/Table"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import DropdownMenu from "@/components/DropdownMenu"
import { isWalletAddress } from "@/utils/wallets"
import { Button } from "@/components/Button"
import { NoDataCta } from "@/components/NoDataCta"
import { ImportListItemsButton } from "./ImportListItemsButton"

type ListItemsTableProps = {
  listId: number
  listItems: string[]
  total: number
  perPage: number
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  isSearching: boolean
}

export const ListItemsTable = ({
  listId,
  listItems,
  isFetchingNextPage,
  fetchNextPage,
  total,
  perPage,
  isSearching,
}: ListItemsTableProps) => {
  const { id } = useParams()
  const { openModal } = useModals()
  const [, setId] = useQueryState("id")
  const [, setItem] = useQueryState("item")

  const onDeleteClick = async (listItem: string) => {
    await Promise.all([setId(String(id)), setItem(listItem)])
    openModal(Modals.DeleteListItem)
  }

  const onViewDetailsClick = async (listItem: string) => {
    await setItem(listItem)
    openModal(Modals.ViewListItemDetails)
  }

  if (!listItems.length) {
    return (
      <NoDataCta
        title={isSearching ? "No results" : "No list items"}
        description={
          isSearching
            ? `No matches found for that search term.`
            : "Get started by importing your data."
        }
        className="mt-20"
        Icon={ListBulletIcon}
      >
        {!isSearching && <ImportListItemsButton id={listId} />}
      </NoDataCta>
    )
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
                void onDeleteClick(listItem)
              },
            },
          ]

          if (isWalletAddress(listItem)) {
            menuItems.unshift({
              Icon: InformationCircleIcon,
              text: "View details",
              onClick: () => {
                void onViewDetailsClick(listItem)
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
          <Button
            variant="secondary"
            onClick={fetchNextPage}
            loading={isFetchingNextPage}
          >
            Load {Math.min(perPage, total - listItems.length)} more
          </Button>
        </div>
      )}
    </>
  )
}
