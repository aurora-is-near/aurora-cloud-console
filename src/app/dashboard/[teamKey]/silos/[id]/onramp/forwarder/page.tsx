"use client"

import { notFound } from "next/navigation"
import { useSuspenseQueries } from "@tanstack/react-query"
import { Suspense } from "react"
import { ForwarderPage } from "@/components/ForwarderPage/ForwarderPage"
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
    <Suspense fallback={<Spinner size="lg" />}>
      <ForwarderPage silo={silo} />
    </Suspense>
  )
}

export default Page
