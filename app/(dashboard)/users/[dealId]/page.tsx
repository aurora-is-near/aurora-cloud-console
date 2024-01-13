"use client"

import { notFound, useParams } from "next/navigation"
import { useDeals } from "@/hooks/useDeals"
import UsersList from "../UsersList"

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
