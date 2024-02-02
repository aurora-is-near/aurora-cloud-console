import { ProxyApiUpateOperation } from "@/types/proxy-api"

const getTimeOperations = (
  varKey: string,
  time?: number | null,
): ProxyApiUpateOperation[] => {
  if (time === null) {
    return [
      {
        op_type: "unset",
        var_type: "number",
        var_key: varKey,
      },
    ]
  }

  if (typeof time === "number") {
    return [
      {
        op_type: "set",
        var_type: "number",
        var_key: varKey,
        template_key: "template::deal::acc::time",
      },
      {
        op_type: "set_value",
        var_type: "number",
        var_key: varKey,
        number_value: time,
      },
    ]
  }

  return []
}

export const getDealUpdateOperations = (
  customerId: number,
  dealId: number,
  {
    enabled,
    startTime,
    endTime,
  }: {
    enabled?: boolean
    startTime?: number | null
    endTime?: number | null
  },
): ProxyApiUpateOperation[] => {
  const operations: ProxyApiUpateOperation[] = []
  const baseVarKey = `deal::acc::customers::${customerId}::deals::${dealId}`

  if (enabled !== undefined) {
    operations.push({
      op_type: "set_value",
      var_type: "number",
      var_key: `${baseVarKey}::enabled`,
      number_value: enabled ? 1 : 0,
    })
  }

  operations.push(...getTimeOperations(`${baseVarKey}::startTime`, startTime))
  operations.push(...getTimeOperations(`${baseVarKey}::endTime`, endTime))

  return operations
}
