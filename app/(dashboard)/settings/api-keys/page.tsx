"use client"

import Heading from "@/components/Heading"
import Table from "@/components/Table"
import { TrashIcon } from "@heroicons/react/24/outline"
import AddApiKeyButton from "./AddApiKeyButton"
import { useApiKeys } from "@/utils/api/queries"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"

const Page = () => {
  const { data: apiKeys } = useApiKeys()
  const getApiKeysUpdater = useOptimisticUpdater('getApiKeys')

  const { mutate: deleteApiKey } = useMutation({
    mutationFn: apiClient.deleteApiKey,
    onMutate: (id) => {
      getApiKeysUpdater.replace(
        apiKeys?.filter((apiKey) => apiKey.id !== id) || []
      )
    },
  });

  const onRemoveApiKeyClick = (id: number) => {
    if (confirm("Are you sure you want to delete this API key?")) {
      deleteApiKey(id)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading tag="h2">API Keys</Heading>
        <div className="flex items-center gap-3">
          <AddApiKeyButton />
        </div>
      </div>

      <Table className="mt-7">
        <Table.TH>Key</Table.TH>
        <Table.TH>Description</Table.TH>
        <Table.TH>Scopes</Table.TH>
        <Table.TH hidden>Edit</Table.TH>
        {apiKeys?.map((apiKey) => (
          <Table.TR key={apiKey.id}>
            <Table.TD dark>{apiKey.key}</Table.TD>
            <Table.TD dark>{apiKey.description}</Table.TD>
            <Table.TD>{apiKey.scopes.join(', ')}</Table.TD>
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
    </>
  )
}

export default Page
