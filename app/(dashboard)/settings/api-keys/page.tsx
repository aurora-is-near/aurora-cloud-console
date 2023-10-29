"use client"

import Heading from "@/components/Heading"
import Table from "@/components/Table"
import { TrashIcon } from "@heroicons/react/24/outline"
import AddApiKeyButton from "./AddApiKeyButton"
import { useApiKeys } from "@/utils/api/queries"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import Loader from "@/components/Loader"
import { relativeTime } from "human-date"

const Page = () => {
  const { data: apiKeys, isInitialLoading } = useApiKeys()
  const getApiKeysUpdater = useOptimisticUpdater('getApiKeys')

  const { mutate: deleteApiKey } = useMutation({
    mutationFn: apiClient.deleteApiKey,
    onMutate: (id) => {
      getApiKeysUpdater.replace(
        apiKeys?.filter((apiKey) => apiKey.id !== id) || []
      )
    },
    onError: getApiKeysUpdater.revert,
    onSettled: getApiKeysUpdater.invalidate,
  });

  const onRemoveApiKeyClick = (id: number) => {
    if (confirm("Are you sure you want to delete this API key?")) {
      deleteApiKey(id)
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
                <button
                  className="text-gray-900 hover:text-red-500"
                  onClick={() => {
                    onRemoveApiKeyClick(apiKey.id)
                  }}
                >
                  <span className="sr-only">Remove API key</span>
                  <TrashIcon className="w-5 h-5" />
                </button>
              </Table.TD>
            </Table.TR>
          ))}
        </Table>
      )}

    </>
  )
}

export default Page
