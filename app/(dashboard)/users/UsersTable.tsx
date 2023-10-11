import Button from "@/components/Button"
import Table from "@/components/Table"
import { getUsers } from "@/mockApi"
import { formatDate, formatTimeAgo, midTruncate } from "@/utils/helpers"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

const UsersTable = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined

  const perPage = 20
  const userCount = await getUsers({
    search,
  })
  const totalUsers = userCount.length
  const totalPages = Math.ceil(totalUsers / perPage)

  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1

  const users = await getUsers({
    startAt: (page - 1) * perPage,
    limit: perPage,
    search: search,
  })

  const currentSearchParams = new URLSearchParams()

  if (search) {
    currentSearchParams.set("search", search)
  }

  if (page > 1) {
    currentSearchParams.set("page", `${page}`)
  }

  return (
    <>
      <Table className="mt-7">
        <Table.TH>Wallet</Table.TH>
        <Table.TH>Date added</Table.TH>
        <Table.TH>Transactions</Table.TH>
        <Table.TH>Last transaction</Table.TH>
        <Table.TH hidden>Options</Table.TH>

        {users.map((user) => {
          return (
            <Table.TR key={user.address}>
              <Table.TD>{midTruncate(user.address, 24)}</Table.TD>
              <Table.TD>{formatDate(new Date(user.createdAt))}</Table.TD>
              <Table.TD>{user.transactions}</Table.TD>
              <Table.TD>
                {formatTimeAgo(new Date(user.lastTransactionDate))}
              </Table.TD>
              <Table.TD>x</Table.TD>
            </Table.TR>
          )
        })}
      </Table>
      <div className="mt-6 flex items-center justify-between">
        <PreviousPage page={page} currentSearchParams={currentSearchParams} />
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold">{(page - 1) * perPage + 1}</span> to{" "}
          <span className="font-semibold">
            {Math.min(page * perPage, totalUsers)}
          </span>{" "}
          of <span className="font-semibold">{totalUsers}</span> users
        </p>
        <NextPage
          page={page}
          totalPages={totalPages}
          currentSearchParams={currentSearchParams}
        />
      </div>
    </>
  )
}

export default UsersTable

function PreviousPage({
  page,
  currentSearchParams,
}: {
  page: number
  currentSearchParams: URLSearchParams
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams)

  if (page > 2) {
    newSearchParams.set("page", `${page - 1}`)
  } else {
    newSearchParams.delete("page")
  }

  const active = page > 1

  return (
    <Button
      style="secondary"
      disabled={!active}
      href={active ? `/users?${newSearchParams}` : undefined}
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span>Previous</span>
    </Button>
  )
}

function NextPage({
  page,
  totalPages,
  currentSearchParams,
}: {
  page: number
  totalPages: number
  currentSearchParams: URLSearchParams
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams)

  newSearchParams.set("page", `${page + 1}`)

  const active = page < totalPages

  return (
    <Button
      style="secondary"
      disabled={!active}
      href={active ? `/users?${newSearchParams}` : undefined}
    >
      <span>Next</span>
      <ArrowRightIcon className="w-5 h-5" />
    </Button>
  )
}
