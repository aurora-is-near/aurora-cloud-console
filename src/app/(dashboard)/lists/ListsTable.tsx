"use client"

import Table from "@/components/Table"
import {
  ArrowUpTrayIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { AddListButton } from "./AddListButton"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useQueryState } from "next-usequerystate"
import TableLoader from "../../../components/TableLoader"
import { useLists } from "@/hooks/useLists"
import { NoDataCta } from "@/components/NoDataCta"
import { ListBulletIcon } from "@heroicons/react/20/solid"
import { formatDate } from "@/utils/helpers"
import DropdownMenu from "@/components/DropdownMenu"
import { useRouter } from "next/navigation"

export const ListsTable = () => {
  const { data: lists, isLoading } = useLists()
  const [, setId] = useQueryState("id")
  const { openModal } = useModals()
  const router = useRouter()

  const onEditListClick = (id: number) => {
    setId(String(id))
    openModal(Modals.EditList)
  }

  const onImportListItemsClick = (id: number) => {
    setId(String(id))
    openModal(Modals.ImportListItems)
  }

  const onDeleteClick = (id: number) => {
    setId(String(id))
    openModal(Modals.DeleteList)
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
        <Table.TR key={list.id}>
          <Table.TD dark>{list.name}</Table.TD>
          <Table.TD dark>{formatDate(list.createdAt)}</Table.TD>
          <Table.TD align="right">
            <DropdownMenu
              menuItems={[
                {
                  Icon: PencilSquareIcon,
                  text: "Edit",
                  onClick: () => {
                    onEditListClick(list.id)
                  },
                },
                {
                  Icon: ArrowUpTrayIcon,
                  text: "Import",
                  onClick: () => {
                    onImportListItemsClick(list.id)
                  },
                },
                {
                  Icon: TrashIcon,
                  text: "Delete",
                  onClick: () => {
                    onDeleteClick(list.id)
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
