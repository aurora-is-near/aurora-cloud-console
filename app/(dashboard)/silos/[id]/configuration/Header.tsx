"use client"

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import { useApiQuery } from "@/utils/api/queries"

const Header = ({ siloId }: { siloId: number }) => {
  const { data: silo } = useApiQuery("getSilo", { params: { id: siloId } })

  return <BreadcrumbHeading titles={[silo?.name ?? "", "Configuration"]} />
}

export default Header
