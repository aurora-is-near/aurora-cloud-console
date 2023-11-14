"use client"

import ListItemLoader from "../../../../../components/ListItemLoader"
import { useDeal } from "../../../../../utils/api/queries"
import ContractItem from "./ContractItem"

type ContractsListProps = {
  dealId: string
}

const ContractsList = ({ dealId }: ContractsListProps) => {
  const { data: deal } = useDeal({ id: dealId })

  if (!deal) {
    return <ListItemLoader />
  }

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
