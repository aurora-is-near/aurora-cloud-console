"use client"

import {
  ArrowUpTrayIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { useQueryState } from "next-usequerystate"
import { ListBulletIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useLists } from "@/hooks/useLists"
import { NoDataCta } from "@/components/NoDataCta"
import { formatDate } from "@/utils/helpers"
import DropdownMenu from "@/components/DropdownMenu"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import Table from "@/components/Table"
import TableLoader from "../../../../components/TableLoader"
import { AddListButton } from "./AddListButton"

type ListsTableProps = {
  teamKey: string
}

export const ListsTable = ({ teamKey }: ListsTableProps) => {
  const { data: lists, isLoading } = useLists()
  const [, setId] = useQueryState("id")
  const { openModal } = useModals()
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState<number>()

  const onEditListClick = async (id: number) => {
    await setId(String(id))
    openModal(Modals.EditList)
  }

  const onImportListItemsClick = async (id: number) => {
    await setId(String(id))
    openModal(Modals.ImportListItems)
  }

  const onDeleteClick = async (id: number) => {
    await setId(String(id))
    openModal(Modals.DeleteList)
  }

  const onMenuOpenChange = (id: number, open: boolean) => {
    // See https://github.com/radix-ui/primitives/issues/1241
    if (!open) {
      document.body.style.pointerEvents = "auto"
    }

    setOpenMenu(open ? id : undefined)
  }

  if (isLoading) {
    return <TableLoader />
  }

  if (!!lists?.items && !lists?.items.length) {
    return (
      <NoDataCta
        title="No lists"
        description="Get started by creating your first list."
        className="mt-20"
        Icon={ListBulletIcon}
      >
        <AddListButton />
      </NoDataCta>
    )
  }

  return (
    <Table>
      <Table.TH>Name</Table.TH>
      <Table.TH>Created at</Table.TH>
      <Table.TH hidden>Edit</Table.TH>
      {lists?.items.map((list) => (
        <Table.TR
          key={list.id}
          onClick={() => {
            if (!openMenu) {
              router.push(`/dashboard/${teamKey}/lists/${list.id}`)
            }
          }}
        >
          <Table.TD dark isLink>
            {list.name}
          </Table.TD>
          <Table.TD dark>{formatDate(list.createdAt)}</Table.TD>
          <Table.TD align="right">
            <DropdownMenu
              open={openMenu === list.id}
              onOpenChange={(open: boolean) => {
                onMenuOpenChange(list.id, open)
              }}
              menuItems={[
                {
                  Icon: PencilSquareIcon,
                  text: "Edit",
                  onClick: async () => {
                    await onEditListClick(list.id)
                  },
                },
                {
                  Icon: ArrowUpTrayIcon,
                  text: "Import",
                  onClick: async () => {
                    await onImportListItemsClick(list.id)
                  },
                },
                {
                  Icon: TrashIcon,
                  text: "Delete",
                  onClick: async () => {
                    await onDeleteClick(list.id)
                  },
                },
              ]}
            />
          </Table.TD>
        </Table.TR>
      ))}
    </Table>
  )
}
