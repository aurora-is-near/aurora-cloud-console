import { getDealById } from "@/mockApi"
import ContractItem from "./ContractItem"

const ContractsList = async ({ dealId }: { dealId: string }) => {
  const deal = await getDealById(dealId)

  if (!deal) throw `Deal with id ${dealId} not found.`

  return (
    <ul
      className="border-t border-gray-200 divide-y divide-gray-200"
      role="list"
    >
      {deal.contracts.map((contract) => (
        <ContractItem key={contract.address} {...contract} />
      ))}
    </ul>
  )
}

export default ContractsList
