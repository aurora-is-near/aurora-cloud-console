"use client"

import Table from "@/components/Table"
import {
  KeyIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { AddListButton } from "./AddListButton"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { relativeTime } from "human-date"
import TableButton from "@/components/TableButton"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useQueryState } from "next-usequerystate"
import TableLoader from "../../../components/TableLoader"
import { useLists } from "@/hooks/useLists"
import { NoDataCta } from "@/components/NoDataCta"
import { ListBulletIcon } from "@heroicons/react/20/solid"
import { formatDate } from "@/utils/helpers"

export const ListsTable = () => {
  const { data: lists, isLoading } = useLists()
  const [, setId] = useQueryState("id")
  const getListsUpdater = useOptimisticUpdater("getLists")
  const { openModal } = useModals()

  const { mutate: deleteList } = useMutation({
    mutationFn: apiClient.deleteList,
    onMutate: ({ id }) => {
      getListsUpdater.replace({
        items: lists?.items.filter((list) => list.id !== id) ?? [],
      })
    },
    onSettled: getListsUpdater.invalidate,
  })

  const onEditListClick = (id: number) => {
    setId(String(id))
    openModal(Modals.EditList)
  }

  const onRemoveListClick = (id: number) => {
    if (confirm("Are you sure you want to delete this API key?")) {
      deleteList({ id })
    }
  }

  if (isLoading) {
    return <TableLoader />
  }

  if (!!lists?.items && !lists?.items.length) {
    return (
      <NoDataCta
        title="No lists"
        description="Get started by creating a your first list."
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
          <Table.TD dark>{formatDate(list.created_at)}</Table.TD>
          <Table.TD align="right">
            <TableButton
              srOnlyText="Edit list"
              Icon={PencilSquareIcon}
              onClick={() => {
                onEditListClick(list.id)
              }}
            />
            <TableButton
              Icon={TrashIcon}
              srOnlyText="Remove list"
              onClick={() => {
                onRemoveListClick(list.id)
              }}
            />
          </Table.TD>
        </Table.TR>
      ))}
    </Table>
  )
}
