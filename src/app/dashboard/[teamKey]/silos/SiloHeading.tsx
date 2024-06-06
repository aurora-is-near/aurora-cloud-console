"use client"

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import { Tag } from "@/components/Tag"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { CheckIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"

type SiloHeadingProps = {
  siloId: number
  heading: string
  showActivatedTag?: boolean
}

export const SiloHeading = ({
  siloId,
  heading,
  showActivatedTag,
}: SiloHeadingProps) => {
  const { data: silo, isLoading } = useQuery(
    getQueryFnAndKey("getSilo", { id: siloId }),
  )

  return (
    <div className="flex justify-between items-center mb-7">
      <BreadcrumbHeading
        titles={[silo?.name ?? "", heading]}
        isLoading={isLoading}
      />
      {showActivatedTag && (
        <Tag color="green" text="Activated" Icon={CheckIcon} />
      )}
    </div>
  )
}
