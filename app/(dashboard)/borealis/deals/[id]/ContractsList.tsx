"use client"

import ListItemLoader from "../../../../../components/ListItemLoader"
import { useDeal, useDealContracts } from "../../../../../utils/api/queries"
import ContractItem from "./ContractItem"

type ContractsListProps = {
  dealId: number
}

const ContractsList = ({ dealId }: ContractsListProps) => {
  const { data: deal } = useDeal({ id: dealId })
  const { data: contracts } = useDealContracts({ id: dealId })

  if (!deal || !contracts) {
    return <ListItemLoader />
  }

  return (
    <ul
      className="border-t border-gray-200 divide-y divide-gray-200"
      role="list"
    >
      {contracts.map((contract) => (
        <ContractItem key={contract.id} deal={deal} contract={contract} />
      ))}
    </ul>
  )
}

export default ContractsList
