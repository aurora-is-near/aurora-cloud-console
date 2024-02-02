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
  ]
}
