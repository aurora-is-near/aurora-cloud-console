"use client"

import Heading from "@/components/Heading"
import Table from "@/components/Table"
import useApiKeys, { API_KEYS_QUERY_KEY } from "@/hooks/useApiKeys"
import { TrashIcon } from "@heroicons/react/24/outline"
import AddApiKeyButton from "./AddApiKeyButton"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const Page = () => {
  const { apiKeys } = useApiKeys()
  const queryClient = useQueryClient()

  const { mutate: deleteApiKey } = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/api-keys/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw "Delete failed."
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY })
    }
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
        {apiKeys.map((apiKey) => (
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
