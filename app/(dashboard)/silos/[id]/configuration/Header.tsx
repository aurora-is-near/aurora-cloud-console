"use client"

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

const Header = ({ siloId }: { siloId: number }) => {
  const { data: silo } = useQuery(getQueryFnAndKey("getSilo", { id: siloId }))

  return <BreadcrumbHeading titles={[silo?.name ?? "", "Configuration"]} />
}

export default Header
