import { proxyApiClient } from "@/utils/proxy-api/client"
import { getList } from "@/utils/proxy-api/get-list"

/**
 * Remove a list via the Proxy API.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#removing-list
 */
export const deleteList = async (
  teamId: number,
  listId: number,
): Promise<void> => {
  const list = await getList(teamId, listId)

  if (!list) {
    return
  }

  await proxyApiClient.update([
    {
      op_type: "unset",
      var_type: "set",
      var_key: `deal::acc::customers::${teamId}::lists::${listId}`,
    },
  ])
}
