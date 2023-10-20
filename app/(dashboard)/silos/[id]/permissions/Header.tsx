import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import { getSiloById } from "@/mockApi"
import { notFound } from "next/navigation"
import React from "react"

const Header = async ({ siloId }: { siloId: string }) => {
  const silo = await getSiloById(siloId)

  if (!silo) notFound()

  return <BreadcrumbHeading titles={[silo.name, "Permissions"]} />
}

export default Header
