"use server"

import { revalidatePath } from "next/cache"
import { Deal } from "@/types/types"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"

export const reloadDeal = async (
  teamKey: string,
  dealId: number,
): Promise<Deal | null> => {
  const deal = await getTeamDealByKey(teamKey, dealId)

  revalidatePath(`/dashboard/${teamKey}/silos/[id]/gas-abstraction/${dealId}`)

  return deal
}
