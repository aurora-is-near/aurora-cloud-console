"use client"

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

type SiloHeadingProps = {
  siloId: number
  heading: string
}

export const SiloHeading = ({ siloId, heading }: SiloHeadingProps) => {
  const { data: silo, isLoading } = useQuery(
    getQueryFnAndKey("getSilo", { id: siloId }),
  )

  return (
    <BreadcrumbHeading
      titles={[silo?.name ?? "", heading]}
      isLoading={isLoading}
    />
  )
}
