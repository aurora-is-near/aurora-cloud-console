import { abort } from "@/utils/abort"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"

export const getDealKeyFromSearchParams = async (
  searchParams: URLSearchParams,
): Promise<string | null> => {
  const dealId = searchParams.get("dealId")
  const dealKey = dealId ? await getDealKey(Number(dealId)) : null

  if (dealId && !dealKey) {
    abort(400, "Invalid deal id")
  }

  return dealKey
}
