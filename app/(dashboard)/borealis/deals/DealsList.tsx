"use client"

import Card from "@/components/Card"
import { useDeals } from "@/hooks/useDeals"
import DealItem from "./DealItem"
import Loader from "../../../../components/Loader"

const DealsList = () => {
  const { data, isLoading } = useDeals()

  if (isLoading) {
    return <Loader className="rounded-md sm:h-[92px] h-32" />
  }

  return (
    <Card className="divide-y divide-gray-200" tag="ul" role="list">
      {data?.deals.map((deal) => <DealItem key={deal.id} deal={deal} />)}
    </Card>
  )
}

export default DealsList
