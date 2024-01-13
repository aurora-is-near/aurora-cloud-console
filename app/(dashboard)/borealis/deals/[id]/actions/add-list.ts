"use server"

import { revalidatePath } from "next/cache"

export async function addList(id: string) {
  // TODO: Add list
  revalidatePath(`/borealis/deals/[${id}]`)

  return { success: true, message: "List added." }
}
