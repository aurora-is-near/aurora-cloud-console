import { proxyApiClient } from "@/utils/proxy-api/client"

/**
 * Remove a list via the Proxy API.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#removing-list
 */
export const deleteList = async (
  teamId: number,
  listId: number,
): Promise<void> => {
  const key = `deal::acc::customers::${teamId}::lists::${listId}`

  const viewResult = await proxyApiClient.view([
    {
      var_type: "set",
      key,
    },
  ])

  // If an empty array is returned the list doesn't exist
  const listExists = !!viewResult.responses?.[0].objects.length

  if (!listExists) {
    return
  }

  await proxyApiClient.update([
    {
      op_type: "unset",
      var_type: "set",
      var_key: key,
    },
  ])
}
