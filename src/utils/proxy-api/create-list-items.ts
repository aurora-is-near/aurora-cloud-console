import { proxyApiClient } from "@/utils/proxy-api/client"

/**
 * Insert one or more items into a list.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#inserting-to-list
 */
export const createListItems = async (
  teamId: number,
  listId: number,
  values: string[],
) => {
  await proxyApiClient.update(
    values.map((value) => ({
      op_type: "insert",
      var_type: "set",
      var_key: `deal::acc::customers::${teamId}::lists::${listId}`,
      set_element: value,
    })),
  )
}
