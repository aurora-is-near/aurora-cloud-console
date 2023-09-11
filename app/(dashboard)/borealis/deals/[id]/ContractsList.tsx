import Card from "@/components/Card"
import { getDealById } from "@/mockApi"
import ContractItem from "./ContractItem"

const ContractsList = async ({ dealId }: { dealId: string }) => {
  const deal = await getDealById(dealId)

  if (!deal) throw `Deal with id ${dealId} not found.`

  return (
    <Card className="divide-y divide-gray-200" tag="ul" role="list">
      {deal.contracts.map((contract) => (
        <ContractItem key={contract.address} {...contract} />
      ))}
    </Card>
  )
}

export default ContractsList
