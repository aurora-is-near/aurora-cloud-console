"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/constants/routes"
import { SIGNUP_QUERY_PARAM } from "@/constants/auth"

export const TryAgainButton = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = () => {
    const previousRoute = searchParams.has(SIGNUP_QUERY_PARAM)
      ? SIGNUP_ROUTE
      : LOGIN_ROUTE

    router.push(previousRoute)
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
