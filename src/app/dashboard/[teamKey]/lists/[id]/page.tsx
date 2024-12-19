"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { DashboardPage } from "@/components/DashboardPage"
import { ErrorCard } from "@/components/ErrorCard"
import { Skeleton } from "@/uikit"
import { ListItems } from "../ListItems"

const Page = () => {
  const params = useParams()
  const { data, error } = useQuery(
    getQueryFnAndKey("getList", { id: Number(params.id) }),
  )

  const listItems = data ? (
    <ListItems title={data.name ?? ""} listId={data.id} />
  ) : (
    <Skeleton.List numberOfItems={1} />
  )

  return (
    <DashboardPage>
      {error ? <ErrorCard error={error} showNotFoundPage /> : listItems}
    </DashboardPage>
  )
}

export default Page
