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

  const listItems = data ? (
    <ListItems title={data.name ?? ""} listId={data.id} />
  ) : (
    <ListItemLoader />
  )

  return (
    <DashboardPage>
      {error ? <ErrorCard error={error} showNotFoundPage /> : listItems}
    </DashboardPage>
  )
}

export default Page
