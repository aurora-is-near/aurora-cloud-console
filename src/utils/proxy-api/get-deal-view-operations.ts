import { ProxyApiViewOperation } from "@/types/proxy-api"

export const getDealViewOperations = (
  teamId: number,
  dealId: number,
): ProxyApiViewOperation[] => {
  const baseVarKey = `deal::acc::customers::${teamId}::deals::${dealId}`

  return [
    {
      var_type: "number",
      key: `${baseVarKey}::enabled`,
    },
    {
      var_type: "number",
      key: `${baseVarKey}::startTime`,
    },
    {
      var_type: "number",
      key: `${baseVarKey}::endTime`,
    },
    {
      var_type: "string",
      key: `${baseVarKey}::chainFilter`,
    },
    {
      var_type: "string",
      key: `${baseVarKey}::contractFilter`,
    },
    {
      var_type: "string",
      key: `${baseVarKey}::eoaFilter`,
    },
    {
      var_type: "string",
      key: `${baseVarKey}::eoaBlacklist`,
    },
  ]
}
