import { proxyApiClient } from "@/utils/proxy-api/client"

export const createDealPriority = async (
  teamId: number,
  dealId: number,
  priority: string,
) => {
  const baseKey = `deal::acc::customers::${teamId}`

  await proxyApiClient.update([
    {
      // Create priority -> ID pointer
      op_type: "set",
      var_type: "string",
      var_key: `${baseKey}::dealByPrio::${priority}`,
      template_key: "template::deal::acc::pointer",
    },
    {
      // Populate priority -> ID pointer
      op_type: "set_value",
      var_type: "string",
      var_key: `${baseKey}::dealByPrio::${priority}`,
      string_value: String(dealId),
    },
    {
      // Add priority to the execution list
      op_type: "insert",
      var_type: "set",
      var_key: `${baseKey}::dealPrios`,
      set_element: priority,
    },
  ])
}
