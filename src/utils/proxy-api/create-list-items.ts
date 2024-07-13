import { proxyApiClient } from "@/utils/proxy-api/client"

// The Proxy API limits the number of items that can be inserted in a single request.
const BATCH_SIZE = 1000

const createListItemsBatch = async (
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

/**
 * Insert one or more items into a list.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#inserting-to-list
 */
export const createListItems = async (
  teamId: number,
  listId: number,
  values: string[],
) => {
  const batches = Math.ceil(values.length / BATCH_SIZE)

  for (let index = 0; index < batches; index += 1) {
    const start = index * BATCH_SIZE
    const end = start + BATCH_SIZE

    // eslint-disable-next-line no-await-in-loop
    await createListItemsBatch(teamId, listId, values.slice(start, end))
  }
}
