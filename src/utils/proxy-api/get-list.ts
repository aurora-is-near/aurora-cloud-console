import { ProxyApiListData } from "@/types/deal"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { findVarByKey } from "@/utils/proxy-api/find-var-by-key"

/**
 * Get basic details about a list.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#querying-list
 */
export const getList = async (
  teamId: number,
  listId: number,
): Promise<ProxyApiListData | null> => {
  const key = `deal::acc::customers::${teamId}::lists::${listId}`
  const result = await proxyApiClient.view([
    {
      var_type: "set",
      key,
    },
  ])

  const objectVar = findVarByKey(key, "SetVar", result.responses)

  if (!objectVar) {
    return null
  }

  return {
    id: listId,
    length: objectVar.length ?? 0,
  }
}
