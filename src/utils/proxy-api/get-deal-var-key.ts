export const getDealVarKey = (
  customerId: number,
  dealId: number,
  suffix: "enabled" | "startTime" | "endTime",
) => `deal::acc::customers::${customerId}::deals::${dealId}::${suffix}`
