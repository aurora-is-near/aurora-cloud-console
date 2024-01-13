"use client"

import { PlusIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Card from "@/components/Card"
import Button from "@/components/Button"
import Contact from "@/components/Contact"
import { getQueryFnAndKey } from "@/utils/api/queries"
import ContractsList from "./ContractsList"
import AccessSelector from "./AccessSelector"
import AccessLists from "./AccessLists"
import RulesList from "./RulesList"
import AddContractButton from "./AddContractButton"
import AddListButton from "./AddListButton"
import TransactionsCharts from "../../../silos/TransactionsCharts"
import { useChartInterval } from "../../../../../hooks/useChartInterval"
import { useNotFoundError } from "../../../../../hooks/useNotFoundError"

const ACCESS_OPTIONS = [
  {
    title: "Open List",
    description: "Any wallet address will get free transactions.",
    showAccessLists: false,
  },
  {
    title: "Whitelist",
    description:
      "Only the wallet addresses from the selected segments will get free transactions",
    showAccessLists: true,
  },
]

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [selectedOption, setSelectedOption] = useState(ACCESS_OPTIONS[0])
  const [interval, setInterval] = useChartInterval()
  const { data: silo, error } = useQuery(
    getQueryFnAndKey("getDeal", { id: Number(id) }),
  )

  const { data: transactions } = useQuery(
    getQueryFnAndKey("getDealTransactions", { id: Number(id), interval }),
  )

  useNotFoundError(error)

  return (
    <>
      <div className="space-y-4 sm:space-y-5">
        <section>
          <TransactionsCharts
            title={silo?.name ?? ""}
            interval={interval}
            setInterval={setInterval}
            charts={transactions?.items.map((item) => item.chart)}
          />
        </section>

        <Card tag="section">
          <Card.Title>Contracts</Card.Title>
          <Card.Subtitle>
            List of target contracts to benefit from this deal.
          </Card.Subtitle>
          <Card.Actions>
            <AddContractButton />
          </Card.Actions>

          <ContractsList dealId={Number(id)} />
        </Card>

        <Card tag="section">
          <Card.Title>User Access</Card.Title>
          <Card.Subtitle>
            Select which users should benefit from this plan.
          </Card.Subtitle>
          <Card.Actions>
            <AddListButton />
          </Card.Actions>

          <AccessSelector
            options={ACCESS_OPTIONS}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          {selectedOption.showAccessLists && <AccessLists />}
        </Card>

        <Card tag="section">
          <Card.Title>Rules</Card.Title>
          <Card.Subtitle>
            List of conditions applied to this plan.
          </Card.Subtitle>
          <Card.Actions>
            <Button>
              <PlusIcon className="w-5 h-5" />
              Add rule
            </Button>
          </Card.Actions>

          <RulesList />
        </Card>

        <Contact />
      </div>
    </>
  )
}

export default Page
