"use client"

import { NotAllowed } from "@/app/[team]/login/NotAllowed"

export default function Page() {
  return (
    <NotAllowed
      title="You are not a member of this team"
      description="If you believe you should be a member of this team please contact your team administrator."
      showRefreshButton
      showGoBackButton
    />
  )
}
