import { proxyApiClient } from "@/utils/proxy-api/client"

export const removeDealPriority = async (teamId: number, priority: string) => {
  await proxyApiClient.update([
    {
      // Remove priority from execution list
      op_type: "erase",
      var_type: "set",
      var_key: `deal::acc::customers::${teamId}::dealPrios`,
      set_element: String(priority),
    },
    {
      // Remove prio -> ID pointer
      op_type: "unset",
      var_type: "string",
      var_key: `deal::acc::customers::${teamId}::dealByPrio::${priority}`,
    },
  ])
}
