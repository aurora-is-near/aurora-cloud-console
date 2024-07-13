import cleanDeep from "clean-deep"
import { ProxyApiViewOperation } from "@/types/proxy-api"
import { proxyApiClient } from "@/utils/proxy-api/client"

/**
 * Get a single element from a list.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#querying-single-element-of-list
 */
export const getListItem = async (
  teamId: number,
  listId: number,
  key: string,
) => {
  const result = await proxyApiClient.view([
    cleanDeep<ProxyApiViewOperation>({
      elements_of_set: `deal::acc::customers::${teamId}::lists::${listId}`,
      key,
    }),
  ])

  return result
}
