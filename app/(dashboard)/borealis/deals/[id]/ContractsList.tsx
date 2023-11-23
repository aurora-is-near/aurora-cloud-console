"use client"

import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import ListItemLoader from "../../../../../components/ListItemLoader"
import { useDeal } from "../../../../../utils/api/queries"
import ContractItem from "./ContractItem"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"

type ContractsListProps = {
  dealId: number
}

const ContractsList = ({ dealId }: ContractsListProps) => {
  const { data: deal } = useDeal({ id: dealId })
  const getDealUpdater = useOptimisticUpdater("getDeal", { id: dealId })
  const getDealsUpdater = useOptimisticUpdater("getDeals")

  const { mutate: deleteContract } = useMutation({
    mutationFn: apiClient.deleteContract,
    onMutate: ({ id }) => {
      getDealUpdater.update({
        contracts:
          deal?.contracts.filter((contract) => contract.id !== id) || [],
      })
    },
    onSettled: getDealsUpdater.invalidate,
  })

  if (!deal) {
    return <ListItemLoader />
  }

  return (
    <ul
      className="border-t border-gray-200 divide-y divide-gray-200"
      role="list"
    >
      {deal.contracts.map((contract) => (
        <ContractItem
          key={contract.address}
          address={contract.address}
          name={contract.name}
          onDelete={() => deleteContract({ id: contract.id })}
        />
      ))}
    </ul>
  )
}

export default ContractsList
