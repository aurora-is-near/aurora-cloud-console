"use client"

import { useParams } from "next/navigation"
import { ListItems } from "../ListItems"
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useNotFoundError } from "@/hooks/useNotFoundError"
import ListItemLoader from "@/components/ListItemLoader"
import { DashboardPage } from "@/components/DashboardPage"

const Page = () => {
  const params = useParams()
  const { data, error } = useQuery(
    getQueryFnAndKey("getList", { id: Number(params.id) }),
  )

  useNotFoundError(error)

  return (
    <DashboardPage>
      {data ? (
        <ListItems title={data?.name ?? ""} listId={data?.id} />
      ) : (
        <ListItemLoader />
      )}
    </DashboardPage>
  )
}

export default Page
