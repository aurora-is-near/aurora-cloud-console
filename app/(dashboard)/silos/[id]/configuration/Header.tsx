"use client"

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import { useSilo } from "@/utils/api/queries"
import { notFound } from "next/navigation"

const Header = ({ siloId }: { siloId: string }) => {
  const { data: silo } = useSilo({ id: siloId })

  return <BreadcrumbHeading titles={[silo?.name ?? "", "Configuration"]} />
}

export default Header
