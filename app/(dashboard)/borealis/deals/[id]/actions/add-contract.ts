"use server"

import { revalidatePath } from "next/cache"

export async function addContract(id: string, name: string, address: string) {
  // TODO: Add contract with name and address to deal with id

  revalidatePath(`/borealis/deals/[${id}]`)

  return { success: true, message: "Contract added." }
}
