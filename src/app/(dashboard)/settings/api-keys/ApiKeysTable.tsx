"use client"

import Table from "@/components/Table"
import { KeyIcon } from "@heroicons/react/24/outline"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import AddApiKeyButton from "./AddApiKeyButton"
import { relativeTime } from "human-date"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useQueryState } from "next-usequerystate"
import TableLoader from "../../../../components/TableLoader"
import { useApiKeys } from "@/hooks/useApiKeys"
import { NoDataCta } from "@/components/NoDataCta"
import DropdownMenu from "@/components/DropdownMenu"

export const ApiKeysTable = () => {
  const { data: apiKeys, isLoading } = useApiKeys()
  const [, setId] = useQueryState("id")
  const { openModal } = useModals()

  const onEditClick = (id: number) => {
    setId(String(id))
    openModal(Modals.EditApiKey)
  }

  const onDeleteClick = (id: number) => {
    setId(String(id))
    openModal(Modals.DeleteApiKey)
  }

  if (isLoading) {
    return <TableLoader />
  }

  if (!!apiKeys && !apiKeys?.length) {
    return (
      <NoDataCta
        title="No API keys"
        description="Get started by creating a your first API key."
        className="mt-20"
        Icon={KeyIcon}
      >
        <AddApiKeyButton />
      </NoDataCta>
    )
  }

  return (
    <Table>
      <Table.TH>Key</Table.TH>
      <Table.TH>Note</Table.TH>
      <Table.TH>Scopes</Table.TH>
      <Table.TH>Last Used</Table.TH>
      <Table.TH hidden>Edit</Table.TH>
      {apiKeys?.map((apiKey) => (
        <Table.TR key={apiKey.id}>
          <Table.TD dark>{apiKey.key}</Table.TD>
          <Table.TD>{apiKey.note}</Table.TD>
          <Table.TD>{apiKey.scopes.join(", ")}</Table.TD>
          <Table.TD>
            {apiKey.last_used_at ? relativeTime(apiKey.last_used_at) : "Never"}
          </Table.TD>
          <Table.TD align="right">
            <DropdownMenu
              menuItems={[
                {
                  Icon: PencilSquareIcon,
                  text: "Edit",
                  onClick: () => {
                    onEditClick(apiKey.id)
                  },
                },
                {
                  Icon: TrashIcon,
                  text: "Delete",
                  onClick: () => {
                    onDeleteClick(apiKey.id)
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
