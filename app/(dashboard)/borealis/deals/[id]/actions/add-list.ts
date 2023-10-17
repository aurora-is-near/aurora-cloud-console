"use server"

import { sleep } from "@/mockApi"
import { revalidatePath } from "next/cache"

export async function addList(id: string, name: string, address: string) {
  // TODO: Add list

  await sleep()

  revalidatePath(`/borealis/deals/[${id}]`)

  return { success: true, message: "List added." }
}
