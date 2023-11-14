"use client"

import { useParams, notFound } from "next/navigation"
import UsersList from "../UsersList"
import { useDeals } from "../../../../utils/api/queries"

const Page = () => {
  const params = useParams()
  const { data } = useDeals()

  const deal = data?.deals?.find(
    (deal) => encodeURIComponent(deal.id) === params.dealId,
  )

  if (data && !deal) {
    notFound()
  }

  return <UsersList title={deal?.name ?? ""} dealId={deal?.id} />
}

export default Page
