"use client"

import Heading from "@/components/Heading"
import Table from "@/components/Table"
import {
  KeyIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { PlusIcon } from "@heroicons/react/20/solid"
import AddApiKeyButton from "./AddApiKeyButton"
import { useApiKeys } from "@/utils/api/queries"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { relativeTime } from "human-date"
import TableButton from "@/components/TableButton"
import { Modals, useModals } from "@/hooks/useModals"
import { useQueryState } from "next-usequerystate"
import TableLoader from "../../../../components/TableLoader"
import Button from "../../../../components/Button"

const Page = () => {
  const { data: apiKeys, isInitialLoading } = useApiKeys()
  const [, setId] = useQueryState("id")
  const getApiKeysUpdater = useOptimisticUpdater("getApiKeys")
  const { openModal } = useModals()

  const { mutate: deleteApiKey } = useMutation({
    mutationFn: apiClient.deleteApiKey,
    onMutate: ({ id }) => {
      getApiKeysUpdater.replace(
        apiKeys?.filter((apiKey) => apiKey.id !== id) || [],
      )
    },
    onSettled: getApiKeysUpdater.invalidate,
  })

  const onEditApiKeyClick = (id: number) => {
    setId(String(id))
    openModal(Modals.EditApiKey)
  }

  const onRemoveApiKeyClick = (id: number) => {
    if (confirm("Are you sure you want to delete this API key?")) {
      deleteApiKey({ id })
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <Heading tag="h2">API Keys</Heading>
        <div className="flex items-center gap-3">
          <AddApiKeyButton />
        </div>
      </div>

      {isInitialLoading ? (
        <TableLoader />
      ) : apiKeys?.length && apiKeys?.length > 0 ? (
        <Table>
          <Table.TH>Key</Table.TH>
          <Table.TH>Note</Table.TH>
          <Table.TH>Scopes</Table.TH>
          <Table.TH>Last Used</Table.TH>
          <Table.TH hidden>Edit</Table.TH>
          {apiKeys?.map((apiKey) => (
            <Table.TR key={apiKey.id}>
              <Table.TD dark>{apiKey.key}</Table.TD>
              <Table.TD dark>{apiKey.note}</Table.TD>
              <Table.TD>{apiKey.scopes.join(", ")}</Table.TD>
              <Table.TD>
                {apiKey.last_used_at
                  ? relativeTime(apiKey.last_used_at)
                  : "Never"}
              </Table.TD>
              <Table.TD align="right">
                <TableButton
                  srOnlyText="Edit API key"
                  Icon={PencilSquareIcon}
                  onClick={() => {
                    onEditApiKeyClick(apiKey.id)
                  }}
                />
                <TableButton
                  Icon={TrashIcon}
                  srOnlyText="Remove API key"
                  onClick={() => {
                    onRemoveApiKeyClick(apiKey.id)
                  }}
                />
              </Table.TD>
            </Table.TR>
          ))}
        </Table>
      ) : (
        <div className="text-center flex flex-col items-center">
          <div className="bg-gray-200 rounded-lg p-3 flex justify-center items-center mx-auto">
            <KeyIcon className="text-gray-900 w-6 h-6 shrink-0" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            No API keys
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a your first API key.
          </p>
          <div className="mt-6">
            <AddApiKeyButton />
          </div>
        </div>
      )}
    </>
  )
}

export default Page
