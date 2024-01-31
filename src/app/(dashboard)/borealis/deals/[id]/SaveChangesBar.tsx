"use client"

import Button from "@/components/Button"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { formatDateAndTime } from "@/utils/helpers"
import { CheckIcon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"

type SaveChangesBarProps = {
  dealId: number
}

export const SaveChangesBar = ({ dealId }: SaveChangesBarProps) => {
  const { data } = useQuery(getQueryFnAndKey("getDeal", { id: dealId }))

  console.log(data?.updated_at)
  return (
    <div className="fixed lg:ml-[368px] inset-x-0 bottom-0 bg-white px-8 py-5 flex items-center justify-between border-t">
      <Button style="secondary">Reset</Button>
      {data?.updated_at && (
        <div className="text-sm text-gray-500">
          Last update: {formatDateAndTime(data.updated_at)}
        </div>
      )}
      <Button>
        <CheckIcon className="w-5 h-5" />
        Save changes
      </Button>
    </div>
  )
}
