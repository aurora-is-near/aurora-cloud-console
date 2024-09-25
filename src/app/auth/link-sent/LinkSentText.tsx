"use client"

import { useSearchParams } from "next/navigation"
import { EMAIL_QUERY_PARAM } from "@/constants/auth"

export const LinkSentText = () => {
  const seachParams = useSearchParams()
  const emailAddress =
    seachParams.get(EMAIL_QUERY_PARAM) ?? "your email address"

  return (
    <p className="text-sm font-medium text-white">
      We sent a link to {emailAddress}.
    </p>
  )
}
