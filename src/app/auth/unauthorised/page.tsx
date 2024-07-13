"use client"

import { NotAllowed } from "@/app/auth/login/NotAllowed"
import { FullScreenPage } from "@/components/FullScreenPage"

const Page = () => {
  return (
    <FullScreenPage>
      <NotAllowed
        title="You are not a member of this team"
        description="If you believe you should be a member of this team please contact your team administrator."
        showRefreshButton
        showLogoutButton
      />
    </FullScreenPage>
  )
}

export default Page
