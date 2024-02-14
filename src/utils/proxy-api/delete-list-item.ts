import { proxyApiClient } from "@/utils/proxy-api/client"

/**
 * Remove an item from a list.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#removing-from-list
 */
export const deleteListItem = async (
  teamId: number,
  listId: number,
  value: string,
) => {
  await proxyApiClient.update([
    {
      op_type: "erase",
      var_type: "set",
      var_key: `deal::acc::customers::${teamId}::lists::${listId}`,
      set_element: value,
    },
  ])
}
