import cleanDeep from "clean-deep"
import { ProxyApiViewOperation } from "@/types/proxy-api"
import { proxyApiClient } from "@/utils/proxy-api/client"

const getLimit = (hasCursor: boolean, limit?: number | null) => {
  if (!limit) {
    return undefined
  }

  // If we have a cursor that cursor becomes the first item fetched but we will
  // not want to return it with the response as it will have been included as
  // the last item of the previous response. So we request one more item then
  // strip that first item from the response.
  if (hasCursor) {
    return limit + 1
  }

  return limit
}

/**
 * Insert one or more items into a list.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#querying-multiple-elements-of-list
 */
export const getListItems = async (
  teamId: number,
  listId: number,
  options?: {
    beginKey?: string | null
    endKey?: string | null
    limit?: number | null
  },
) => {
  const result = await proxyApiClient.view([
    cleanDeep<ProxyApiViewOperation>({
      elements_of_set: `deal::acc::customers::${teamId}::lists::${listId}`,
      keys_only: true, // Shorten response by getting rid from time metadata
      begin_key: options?.beginKey ?? undefined,
      end_key: options?.endKey ?? undefined,
      limit: getLimit(!!options?.beginKey, options?.limit),
    }),
  ])

  if (options?.beginKey) {
    result.responses?.[0]?.objects.shift()
  }

  return result
}
