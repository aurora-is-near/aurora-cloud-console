"use client"

import Button from "@/components/Button"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { useRouter, useSearchParams } from "next/navigation"

type ListItemsTableProps = {
  total: number
  itemsPerPage: number
}

const PreviousPage = ({ page }: { page: number }) => {
  const router = useRouter()
  const active = page > 1

  const onClick = () => {
    const url = new URL(window.location.href)

    if (page > 2) {
      url.searchParams.set("page", `${page - 1}`)
    } else {
      url.searchParams.delete("page")
    }

    router.push(`${window.location.pathname}${url.search}`)
  }

  return (
    <Button style="secondary" disabled={!active} onClick={onClick}>
      <ArrowLeftIcon className="w-5 h-5" />
      <span>Previous</span>
    </Button>
  )
}

const NextPage = ({
  page,
  totalPages,
}: {
  page: number
  totalPages: number
}) => {
  const router = useRouter()
  const active = page < totalPages

  const onClick = () => {
    const url = new URL(window.location.href)

    url.searchParams.set("page", `${Number(page ?? 1) + 1}`)
    router.push(`${url.pathname}${url.search}`)
  }

  return (
    <Button style="secondary" disabled={!active} onClick={onClick}>
      <span>Next</span>
      <ArrowRightIcon className="w-5 h-5" />
    </Button>
  )
}

export const Pagination = ({ total, itemsPerPage }: ListItemsTableProps) => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? 1)

  return (
    <div className="flex items-center justify-between mt-6">
      <PreviousPage page={page} />
      <p className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-semibold">
          {Math.min((page - 1) * itemsPerPage + 1, total)}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {Math.min(page * itemsPerPage, total)}
        </span>{" "}
        of <span className="font-semibold">{total.toLocaleString()}</span> item
        {total === 1 ? "" : "s"}
      </p>
      <NextPage page={page} totalPages={Math.ceil(total / itemsPerPage)} />
    </div>
  )
}
