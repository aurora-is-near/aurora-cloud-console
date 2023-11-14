"use client"

import Button from "@/components/Button"
import Table from "@/components/Table"
import { formatDate, formatTimeAgo, midTruncate } from "@/utils/helpers"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import DropdownMenu from "./DropdownMenu"
import { Users } from "../../../types/types"
import { useSearchParams } from "next/navigation"

const PER_PAGE = 20

type UsersTableProps = {
  users: Users["users"]
  total: number
}

const UsersTable = ({ users, total }: UsersTableProps) => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? 1)

  return (
    <>
      <Table>
        <Table.TH>Wallet</Table.TH>
        <Table.TH>Date added</Table.TH>
        <Table.TH>Transactions</Table.TH>
        <Table.TH>Last transaction</Table.TH>
        <Table.TH hidden>Options</Table.TH>
        {users.map((user) => (
          <Table.TR key={user.walletAddress}>
            <Table.TD>{midTruncate(user.walletAddress, 24)}</Table.TD>
            <Table.TD>{formatDate(new Date(user.createdAt))}</Table.TD>
            <Table.TD>{user.transactionsCount}</Table.TD>
            <Table.TD>
              {formatTimeAgo(new Date(user.lastTransactionAt))}
            </Table.TD>
            <Table.TD align="right">
              <DropdownMenu address={user.walletAddress} />
            </Table.TD>
          </Table.TR>
        ))}
      </Table>
      <div className="flex items-center justify-between mt-6">
        <PreviousPage page={page} />
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold">{(page - 1) * PER_PAGE + 1}</span> to{" "}
          <span className="font-semibold">
            {Math.min(page * PER_PAGE, total)}
          </span>{" "}
          of <span className="font-semibold">{total.toLocaleString()}</span>{" "}
          users
        </p>
        <NextPage page={page} totalPages={Math.ceil(total / PER_PAGE)} />
      </div>
    </>
  )
}

export default UsersTable

function PreviousPage({ page }: { page: number }) {
  const searchParams = new URLSearchParams(useSearchParams())

  if (page > 2) {
    searchParams.set("page", `${page - 1}`)
  } else {
    searchParams.delete("page")
  }

  const active = page > 1

  return (
    <Button
      style="secondary"
      disabled={!active}
      href={active ? `/users?${searchParams}` : undefined}
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span>Previous</span>
    </Button>
  )
}

function NextPage({ page, totalPages }: { page: number; totalPages: number }) {
  const searchParams = new URLSearchParams(useSearchParams())

  searchParams.set("page", `${page + 1}`)

  const active = page < totalPages

  return (
    <Button
      style="secondary"
      disabled={!active}
      href={active ? `/users?${searchParams}` : undefined}
    >
      <span>Next</span>
      <ArrowRightIcon className="w-5 h-5" />
    </Button>
  )
}
