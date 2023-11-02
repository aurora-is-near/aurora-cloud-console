"use client"

import Heading from "@/components/Heading"
import Table from "@/components/Table"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import AddApiKeyButton from "./AddApiKeyButton"
import { useApiKeys } from "@/utils/api/queries"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import Loader from "@/components/Loader"
import { relativeTime } from "human-date"
import TableButton from "@/components/TableButton"
import { Modals, useModals } from "@/hooks/useModals"
import { useQueryState } from "next-usequerystate"

const Page = () => {
  const { data: apiKeys, isInitialLoading } = useApiKeys()
  const [, setId] = useQueryState("id")
  const getApiKeysUpdater = useOptimisticUpdater('getApiKeys')
  const { openModal } = useModals()

  const { mutate: deleteApiKey } = useMutation({
    mutationFn: apiClient.deleteApiKey,
    onMutate: ({ id }) => {
      getApiKeysUpdater.replace(
        apiKeys?.filter((apiKey) => apiKey.id !== id) || []
      )
    },
    onSettled: getApiKeysUpdater.invalidate,
  });

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
        <>
          <Loader className="rounded-lg h-12" />
          <Loader className="rounded-lg h-12" />
        </>
      ) : (
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
              <Table.TD>{apiKey.scopes.join(', ')}</Table.TD>
              <Table.TD>{apiKey.last_used_at ? relativeTime(apiKey.last_used_at) : 'Never'}</Table.TD>
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
      )}

    </>
  )
}

export default Page
