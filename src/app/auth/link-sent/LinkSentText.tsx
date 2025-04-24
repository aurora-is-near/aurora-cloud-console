"use client"

import { useSearchParams } from "next/navigation"
import { EMAIL_QUERY_PARAM } from "@/constants/auth"

export const LinkSentText = () => {
  const searchParams = useSearchParams()
  const emailAddress =
    searchParams.get(EMAIL_QUERY_PARAM) ?? "your email address"

  return <p className="text-slate-400">We sent a link to {emailAddress}.</p>
}
