"use client"

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

const Header = ({ siloId }: { siloId: number }) => {
  const { data: silo } = useQuery(getQueryFnAndKey("getSilo", { id: siloId }))

  return (
    <header className="flex items-start sm:justify-between sm:items-center sm:flex-row flex-col gap-3">
      <BreadcrumbHeading titles={[silo?.name ?? "", "Tokens"]} />
    </header>
  )
}

export default Header
