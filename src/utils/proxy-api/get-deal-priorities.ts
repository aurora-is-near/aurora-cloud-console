import { proxyApiClient } from "@/utils/proxy-api/client"

export const getDealPriorities = async (teamId: number) => {
  return proxyApiClient.view([
    {
      // Will return array with all elements of priority list
      elements_of_set: `deal::acc::customers::${teamId}::dealPrios`,
    },
    {
      // Will return array with all priority -> id pointers and their values
      var_type: "string",
      begin_key: `deal::acc::customers::${teamId}::dealByPrio::0`,
      end_key: `deal::acc::customers::${teamId}::dealByPrio::999999`,
    },
  ])
}
