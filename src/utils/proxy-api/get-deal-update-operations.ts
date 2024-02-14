import { ListMap, ListType } from "@/types/lists"
import { ProxyApiUpateOperation } from "@/types/proxy-api"

const getTimeOperations = (
  varKey: string,
  time?: number | null,
): ProxyApiUpateOperation[] => {
  // Remove the start/end time if null is provided
  // https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#removing-deal-start-time
  if (time === null) {
    return [
      {
        op_type: "unset",
        var_type: "number",
        var_key: varKey,
      },
    ]
  }

  // Set a start/end time if a number is provided
  // https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#setting-deal-start-time
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

const getListOperations = (
  varKey: string,
  listId?: number | null,
): ProxyApiUpateOperation[] => [
  {
    op_type: listId ? "set_value" : "unset",
    var_type: "string",
    var_key: varKey,
    string_value: listId ? String(listId) : undefined,
  },
]

const getEnabledOperations = (
  varKey: string,
  enabled?: boolean,
): ProxyApiUpateOperation[] => {
  // Enable or disable the deal if a boolean is provided
  // https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#enablingdisabling-deal
  if (enabled !== undefined) {
    return [
      {
        op_type: "set_value",
        var_type: "number",
        var_key: varKey,
        number_value: enabled ? 1 : 0,
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
    lists,
  }: {
    enabled?: boolean
    startTime?: number | null
    endTime?: number | null
    lists: Partial<ListMap>
  },
): ProxyApiUpateOperation[] => {
  const baseVarKey = `deal::acc::customers::${customerId}::deals::${dealId}`

  return [
    ...getEnabledOperations(`${baseVarKey}::enabled`, enabled),
    ...getTimeOperations(`${baseVarKey}::startTime`, startTime),
    ...getTimeOperations(`${baseVarKey}::endTime`, endTime),
    ...Object.entries(lists || {})
      .map(([listKey, listId]) =>
        getListOperations(`${baseVarKey}::${listKey}`, listId),
      )
      .flat(),
  ]
}
