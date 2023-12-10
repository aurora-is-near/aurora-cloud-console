"use client"

import { Heading } from "@/app/login/Heading"
import Button from "@/components/Button"
import { LOGIN_ROUTE } from "@/constants/routes"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"

const MINUMUM_REFRESH_TIME = 1000

export default function Page() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const onGoBackClick = async () => {
    await supabase.auth.signOut()

    router.push(LOGIN_ROUTE)
  }

  const onRefreshClick = async () => {
    const start = Date.now()

    setIsRefreshing(true)
    await supabase.auth.refreshSession()

    router.refresh()

    // Use a timeout to show the loading state for at least 1 second. This
    // prevents a flash of the loading state when the refresh happens quickly.
    setTimeout(
      () => {
        setIsRefreshing(false)
      },
      Math.max(MINUMUM_REFRESH_TIME - (Date.now() - start), 0),
    )
  }

  return (
    <>
      <Heading>You are not a member of this team</Heading>
      <p className="mt-6 text-center font-medium leading-7 tracking-snug text-white">
        If you believe you should be a member of this team please contact your
        team administrator.
      </p>
      <Button
        loading={isRefreshing}
        className="mt-8"
        type="submit"
        onClick={onRefreshClick}
        fullWidth
      >
        Refresh
      </Button>
      <button
        className="mt-6 text-white w-full underline hover:no-underline"
        type="submit"
        onClick={onGoBackClick}
      >
        Go back
      </button>
    </>
  )
}
