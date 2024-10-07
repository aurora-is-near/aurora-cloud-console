"use client"

import { KeyIcon } from "@heroicons/react/24/outline"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import { relativeTime } from "human-date"
import { useModals } from "@/hooks/useModals"
import Table from "@/components/Table"
import { NoDataCta } from "@/components/NoDataCta"
import DropdownMenu from "@/components/DropdownMenu"
import { ApiKey } from "@/types/types"
import AddApiKeyButton from "./AddApiKeyButton"

type ApiKeysTableProps = {
  teamKey: string
  apiKeys: ApiKey[]
}

export const ApiKeysTable = ({ teamKey, apiKeys }: ApiKeysTableProps) => {
  const { openModal } = useModals()

  const onEditClick = async (id: number) => {
    openModal("EditApiKey", { id, apiKeys })
  }

  const onDeleteClick = async (id: number) => {
    openModal("DeleteApiKey", { id })
  }

  if (!!apiKeys && !apiKeys?.length) {
    return (
      <NoDataCta
        title="No API keys"
        description="Get started by creating a your first API key."
        className="mt-20"
        Icon={KeyIcon}
      >
        <AddApiKeyButton teamKey={teamKey} />
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
                    void onEditClick(apiKey.id)
                  },
                },
                {
                  Icon: TrashIcon,
                  text: "Delete",
                  onClick: () => {
                    void onDeleteClick(apiKey.id)
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
