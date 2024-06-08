"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { DashboardPage } from "@/components/DashboardPage"
import { BulkImport } from "./BulkImport"
import { ErrorCard } from "@/components/ErrorCard"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => {
  const params = useParams()
  const { data, error } = useQuery(
    getQueryFnAndKey("getList", { id: Number(params.id) }),
  )

  return (
    <DashboardPage heading={data?.name ?? ""}>
      {!!error ? (
        <ErrorCard error={error} showNotFoundPage />
      ) : (
        <>{data && <BulkImport teamKey={teamKey} listId={data?.id} />}</>
      )}
    </DashboardPage>
  )
}

export default Page
