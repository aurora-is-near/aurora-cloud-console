"use client"

import Card from "@/components/Card"
import Button from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"
import ContractsList from "./ContractsList"
import AccessSelector from "./AccessSelector"
import AccessLists from "./AccessLists"
import RulesList from "./RulesList"
import Contact from "@/components/Contact"
import AddContractButton from "./AddContractButton"
import AddListButton from "./AddListButton"
import TransactionsCharts from "../../../silos/TransactionsCharts"
import { useChartInterval } from "../../../../../hooks/useChartInterval"
import { useNotFoundError } from "../../../../../hooks/useNotFoundError"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"

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

      {/* <div className="fixed lg:ml-[368px] inset-x-0 bottom-0 bg-white px-8 py-5 flex items-center justify-between border-t">
          <Button style="secondary">Reset</Button>
          <div className="text-sm text-gray-500">
            Last update: Jun 16, 2023 at 11:25
          </div>
          <Button>
            <CheckIcon className="w-5 h-5" />
            Save changes
          </Button>
        </div> */}
    </>
  )
}

export default Page
