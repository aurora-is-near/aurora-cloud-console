"use client"

import { useParams, notFound } from "next/navigation"
import UsersList from "../UsersList"
import { useUserDeals } from "../../../../utils/api/queries"

const Page = () => {
  const params = useParams()
  const { data } = useUserDeals()
  const deal = data?.deals?.find((deal) => deal.slug === params.slug)

  if (data && !deal) {
    notFound()
  }

  return <UsersList title={deal?.name ?? ""} dealId={deal?.id} />
}

export default Page
