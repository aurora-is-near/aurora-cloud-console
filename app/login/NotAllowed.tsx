"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Heading } from "@/app/login/Heading"
import Button from "@/components/Button"
import { LOGIN_ROUTE } from "@/constants/routes"
import { createClientComponentClient } from "@/supabase/create-client-component-client"

type NotAllowedProps = {
  title: string
  description: string
  showRefreshButton?: boolean
  showGoBackButton?: boolean
}

const MINUMUM_REFRESH_TIME = 1000

export const NotAllowed = ({
  title,
  description,
  showRefreshButton,
  showGoBackButton,
}: NotAllowedProps) => {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const supabase = createClientComponentClient()

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

  const onGoBackClick = async () => {
    await supabase.auth.signOut()

    router.push(LOGIN_ROUTE)
  }

  return (
    <>
      <Heading className="mb-6">{title}</Heading>
      <p className="mb-8 text-center font-medium leading-7 tracking-snug text-white">
        {description}
      </p>
      {showRefreshButton && (
        <Button
          loading={isRefreshing}
          className="mb-6"
          type="submit"
          onClick={onRefreshClick}
          fullWidth
        >
          Refresh
        </Button>
      )}
      {showGoBackButton && (
        <button
          className="text-white w-full underline hover:no-underline"
          type="submit"
          onClick={onGoBackClick}
        >
          Go back
        </button>
      )}
    </>
  )
}
