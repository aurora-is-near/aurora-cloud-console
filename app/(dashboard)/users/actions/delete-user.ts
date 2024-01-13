"use server"

import { revalidatePath } from "next/cache"

export async function deleteUser(address: string) {
  console.log(`delete address: ${address}`)

  revalidatePath("/users")
}
