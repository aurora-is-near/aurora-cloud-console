"use client"

import { notFound } from "next/navigation"
import { useSuspenseQueries } from "@tanstack/react-query"
import { Suspense } from "react"
import { OnrampHomePage } from "@/components/OnrampHomePage/OnrampHomePage"
import { queries } from "@/actions/queries"
import { Spinner } from "@/components/Spinner"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const [{ data: silo }] = useSuspenseQueries({
    queries: [queries.getTeamSiloByKey(teamKey, Number(id))],
  })

  if (!silo) {
    notFound()
  }

  return (
    <Suspense fallback={<Spinner fullScreen size="lg" />}>
      <OnrampHomePage teamKey={teamKey} silo={silo} />
    </Suspense>
  )
}

export default Page
