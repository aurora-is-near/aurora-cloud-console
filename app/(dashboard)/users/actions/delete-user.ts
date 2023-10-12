"use server"

import { sleep } from "@/mockApi"
import { revalidatePath } from "next/cache"

export async function deleteUser(address: string) {
  console.log("delete address: " + address)

  await sleep()

  revalidatePath("/users")
}
