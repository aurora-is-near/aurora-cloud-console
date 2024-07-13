"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import ListItemLoader from "@/components/ListItemLoader"
import { DashboardPage } from "@/components/DashboardPage"
import { ErrorCard } from "@/components/ErrorCard"
import { ListItems } from "../ListItems"

const Page = () => {
  const params = useParams()
  const { data, error } = useQuery(
    getQueryFnAndKey("getList", { id: Number(params.id) }),
  )

  return (
    <DashboardPage>
      {error ? (
        <ErrorCard error={error} showNotFoundPage />
      ) : (
        <>
          {data ? (
            <ListItems title={data?.name ?? ""} listId={data?.id} />
          ) : (
            <ListItemLoader />
          )}
        </>
      )}
    </DashboardPage>
  )
}

export default Page
