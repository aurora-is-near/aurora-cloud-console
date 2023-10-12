"use server"

import { sleep } from "@/mockApi"
import { revalidatePath } from "next/cache"

export async function blockUser(address: string) {
  console.log("block address: " + address)

  await sleep()

  revalidatePath("/users")
}
