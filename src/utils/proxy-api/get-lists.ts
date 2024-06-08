import { ProxyApiListOfListsData } from "@/types/deal"
import { proxyApiClient } from "@/utils/proxy-api/client"

/**
 * Get all lists for a customer.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#querying-list-of-lists
 */
export const getLists = async (
  teamId: number,
): Promise<ProxyApiListOfListsData[]> => {
  const result = await proxyApiClient.view([
    {
      var_type: "set",
      begin_key: `deal::acc::customers::${teamId}::lists::0`,
      end_key: `deal::acc::customers::${teamId}::lists::999999`,
      keys_only: true,
    },
  ])

  return (
    result.responses?.[0]?.objects?.map((obj): ProxyApiListOfListsData => {
      const listId = Number(obj.key.split("::").pop())

      return {
        id: listId,
      }
    }) ?? []
  )
}
