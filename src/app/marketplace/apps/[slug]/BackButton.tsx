"use client"

import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { usePreviousRoute } from "@/hooks/usePreviousRoute"

export const BackButton = () => {
  const { previousRoute } = usePreviousRoute()
  const router = useRouter()

  /**
   * Go back to the previous route if there is one.
   *
   * Otherwise, default to the marketplace home page.
   */
  const onBackClick = () => {
    if (previousRoute) {
      router.back()

      return
    }

    router.push("/marketplace")
  }

  return (
    <Button
      onClick={onBackClick}
      variant="border"
      className="text-slate-900 dark:text-slate-50"
    >
      <ArrowLeftIcon className="w-5 h-5" />
      Back
    </Button>
  )
}
