"use client"

import { useRouter } from "next/navigation"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/constants/routes"
import { SIGNUP_QUERY_PARAM } from "@/constants/auth"

export const TryAgainButton = () => {
  const router = useRouter()

  const onClick = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const previousRoute = searchParams.has(SIGNUP_QUERY_PARAM)
      ? SIGNUP_ROUTE
      : LOGIN_ROUTE

    router.push(previousRoute)
  }

  return (
    <button
      type="button"
      className="text-green-400 hover:underline"
      onClick={onClick}
    >
      Send again
    </button>
  )
}
