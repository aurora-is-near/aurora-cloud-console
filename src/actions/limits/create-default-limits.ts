import { createLimit } from "@/actions/limits/create-limit"
import { getLimits } from "@/actions/limits/get-limits"
import { Limit } from "@/types/types"

const defaultLimits: Pick<
  Limit,
  "limit_type" | "limit_scope" | "limit_value" | "duration" | "ui_enabled"
>[] = [
  {
    limit_type: "CYCLIC",
    limit_scope: "GLOBAL",
    limit_value: 0,
    duration: "P30D",
    ui_enabled: true,
  },
  {
    limit_type: "CYCLIC",
    limit_scope: "USER",
    limit_value: 0,
    duration: "P30D",
    ui_enabled: true,
  },
]

export const createDefaultLimits = async (dealId: number) => {
  const existingLimits = await getLimits(dealId)

  const limitsToCreate = defaultLimits.filter(
    (limit) =>
      !existingLimits.find(
        (l) => l.limit_type === limit.limit_type && l.ui_enabled,
      ),
  )

  const createdLimits = await Promise.all(
    limitsToCreate.map((limit) =>
      createLimit({
        ...limit,
        deal_id: dealId,
      }),
    ),
  )

  return createdLimits
}
