"use client"

import Card from "@/components/Card"
import DealItem from "./DealItem"
import { useDeals } from "../../../../utils/api/queries"
import Loader from "../../../../components/Loader"

const DealsList = () => {
  const { data, isInitialLoading } = useDeals()

  if (isInitialLoading) {
    return <Loader className="rounded-md sm:h-[92px] h-32" />
  }

  return (
    <Card className="divide-y divide-gray-200" tag="ul" role="list">
      {data?.deals.map((deal) => <DealItem key={deal.id} {...deal} />)}
    </Card>
  )
}

export default DealsList
