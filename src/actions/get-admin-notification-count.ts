"use server"

import { getBridgedTokenRequests } from "@/actions/bridged-tokens/get-bridged-token-requests"

export const getAdminNotificationCount = async (): Promise<number> => {
  const bridgedTokenRequests = await getBridgedTokenRequests()

  return bridgedTokenRequests.length
}
