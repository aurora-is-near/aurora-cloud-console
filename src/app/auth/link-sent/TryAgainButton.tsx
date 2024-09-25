"use client"

import { useRouter } from "next/navigation"
import { LOGIN_ROUTE } from "@/constants/routes"

export const TryAgainButton = () => {
  const router = useRouter()

  const onClick = () => {
    router.push(LOGIN_ROUTE)
  }

  return (
    <button
      type="button"
      className="underline hover:text-white"
      onClick={onClick}
    >
      Try again.
    </button>
  )
}
