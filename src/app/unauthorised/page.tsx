"use client"

import { NotAllowed } from "@/app/[team]/login/NotAllowed"
import { AuthPage } from "@/components/AuthPage"

export default function Page() {
  return (
    <AuthPage>
      <NotAllowed
        title="You are not a member of this team"
        description="If you believe you should be a member of this team please contact your team administrator."
        showRefreshButton
        showGoBackButton
      />
    </AuthPage>
  )
}
