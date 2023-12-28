"use client"

import { useQuery } from "@tanstack/react-query"
import ListItemLoader from "../../../../../components/ListItemLoader"
import ContractItem from "./ContractItem"
import { apiClient } from "@/utils/api/client"
import { getQueryKey } from "@/utils/api/query-keys"

type ContractsListProps = {
  dealId: number
}

const ContractsList = ({ dealId }: ContractsListProps) => {
  const { data: deal } = useQuery({
    queryFn: () => apiClient.getDeal({ id: dealId }),
    queryKey: getQueryKey("getDeal", { id: dealId }),
  })

  const { data: contracts } = useQuery({
    queryFn: () => apiClient.getDealContracts({ id: dealId }),
    queryKey: getQueryKey("getDealContracts", { id: dealId }),
    enabled: typeof dealId !== "undefined",
  })

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
