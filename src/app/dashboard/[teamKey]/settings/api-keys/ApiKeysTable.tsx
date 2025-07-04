"use client"

import { KeyIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import { relativeTime } from "human-date"
import { useQueryState } from "next-usequerystate"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import Table from "@/components/Table"
import { NoDataCta } from "@/components/NoDataCta"
import { ApiKey } from "@/types/types"
import TableButton from "@/components/TableButton"
import AddApiKeyButton from "./AddApiKeyButton"

type ApiKeysTableProps = {
  apiKeys: ApiKey[]
}

export const ApiKeysTable = ({ apiKeys }: ApiKeysTableProps) => {
  const [, setId] = useQueryState("id")
  const { openModal } = useModals()

  const onEditClick = async (id: number) => {
    await setId(String(id))
    openModal(Modals.EditApiKey)
  }

  const onDeleteClick = async (id: number) => {
    await setId(String(id))
    openModal(Modals.DeleteApiKey)
  }

  if (!!apiKeys && !apiKeys?.length) {
    return (
      <NoDataCta
        title="No API keys"
        description="Get started by creating a your first API key."
        Icon={KeyIcon}
      >
        <AddApiKeyButton />
      </NoDataCta>
    )
  }

  return (
    <Table>
      <Table.TH>Key</Table.TH>
      <Table.TH>Scopes</Table.TH>
      <Table.TH>Note</Table.TH>
      <Table.TH>Last Used</Table.TH>
      <Table.TH hidden>Edit</Table.TH>
      {apiKeys?.map((apiKey) => {
        const apiScopes = apiKey.scopes.slice(0, 3)
        const remainingScopes = apiKey.scopes.length - apiScopes.length

        return (
          <Table.TR key={apiKey.id}>
            <Table.TD dark>{apiKey.key}</Table.TD>
            <Table.TD>
              <div className="flex flex-wrap gap-1">
                <span>{apiScopes.join(", ")}</span>
                <button
                  type="button"
                  onClick={() => {
                    void onEditClick(apiKey.id)
                  }}
                  className="text-blue-500 underline"
                >
                  {remainingScopes > 0 && ` and ${remainingScopes} more`}
                </button>
              </div>
            </Table.TD>
            <Table.TD>{apiKey.note}</Table.TD>
            <Table.TD>
              {apiKey.last_used_at
                ? relativeTime(apiKey.last_used_at)
                : "Never"}
            </Table.TD>
            <Table.TD align="right">
              <TableButton
                Icon={PencilSquareIcon}
                srOnlyText="Edit key"
                onClick={() => {
                  void onEditClick(apiKey.id)
                }}
              />
              <TableButton
                Icon={TrashIcon}
                srOnlyText="Delete key"
                onClick={() => {
                  void onDeleteClick(apiKey.id)
                }}
              />
            </Table.TD>
          </Table.TR>
        )
      })}
    </Table>
  )
}
