"use client"

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import { useApiQuery } from "@/utils/api/queries"
import React from "react"

const Header = ({ siloId }: { siloId: number }) => {
  const { data: silo } = useApiQuery("getSilo", { params: { id: siloId } })

  return <BreadcrumbHeading titles={[silo?.name ?? "", "Permissions"]} />
}

export default Header
