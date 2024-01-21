"use client"

import { useQuery } from "@tanstack/react-query"
import ListItemLoader from "../../../../../components/ListItemLoader"
import ContractItem from "./ContractItem"
import { getQueryFnAndKey } from "@/utils/api/queries"

type ContractsListProps = {
  dealId: number
}

const ContractsList = ({ dealId }: ContractsListProps) => {
  const { data: deal } = useQuery(getQueryFnAndKey("getDeal", { id: dealId }))
  const { data: contracts } = useQuery(
    getQueryFnAndKey("getDealContracts", { id: dealId }),
  )

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
