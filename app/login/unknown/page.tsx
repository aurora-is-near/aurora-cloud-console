"use client"

import { NotAllowed } from "@/app/login/NotAllowed"

export default function Page() {
  return (
    <NotAllowed
      title="Unknown team"
      description="Please check that the URL is correct."
    />
  )
}
