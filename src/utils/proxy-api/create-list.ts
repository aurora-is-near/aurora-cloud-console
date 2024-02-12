import { proxyApiClient } from "@/utils/proxy-api/client"

/**
 * Create a list via the Proxy API.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#creating-list
 */
export const createList = async (
  teamId: number,
  listId: number,
): Promise<void> => {
  await proxyApiClient.update([
    {
      op_type: "set",
      var_type: "set",
      var_key: `deal::acc::customers::${teamId}::lists::${listId}`,
      template_key: `template::deal::acc::customers::${teamId}::list`,
    },
  ])
}
