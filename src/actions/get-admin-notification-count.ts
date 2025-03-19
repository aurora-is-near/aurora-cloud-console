"use server"

import { countBridgedTokenRequests } from "@/actions/bridged-tokens/count-bridged-token-requests"

export const getAdminNotificationCount = async (): Promise<number> => {
  const numberOfBridgedTokenRequests = await countBridgedTokenRequests()

  return numberOfBridgedTokenRequests
}
