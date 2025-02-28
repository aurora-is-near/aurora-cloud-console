"use client"

import { useSuspenseQueries } from "@tanstack/react-query"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Spinner } from "@/components/Spinner"
import { queries } from "@/actions/queries"
import { ConfigurationPage } from "./ConfigurationPage"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)

  const [{ data: silo }] = useSuspenseQueries({
    queries: [queries.getTeamSiloByKey(teamKey, siloId)],
  })

  if (!silo) {
    notFound()
  }

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <ConfigurationPage silo={silo} />
    </Suspense>
  )
}

export default Page
