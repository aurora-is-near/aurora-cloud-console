"use client"

import { NotAllowed } from "@/app/auth/login/NotAllowed"
import { AuthPage } from "@/components/AuthPage"

export default function Page() {
  return (
    <AuthPage>
      <NotAllowed
        title="Unknown team"
        description="Please check that the URL is correct."
      />
    </AuthPage>
  )
}
