"use server"

import { revalidatePath } from "next/cache"

export async function blockUser(address: string) {
  console.log(`block address: ${address}`)

  revalidatePath("/users")
}
