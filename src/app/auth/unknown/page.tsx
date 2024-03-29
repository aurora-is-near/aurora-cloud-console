"use client"

import { NotAllowed } from "@/app/auth/login/NotAllowed"
import { FullScreenPage } from "@/components/FullScreenPage"

export default function Page() {
  return (
    <FullScreenPage>
      <NotAllowed
        title="Unknown team"
        description="Please check that the URL is correct."
      />
    </FullScreenPage>
  )
}
