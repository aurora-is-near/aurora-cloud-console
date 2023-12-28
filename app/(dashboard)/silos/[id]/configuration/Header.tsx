"use client"

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import { apiClient } from "@/utils/api/client"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQuery } from "@tanstack/react-query"

const Header = ({ siloId }: { siloId: number }) => {
  const { data: silo } = useQuery({
    queryFn: () => apiClient.getSilo({ id: siloId }),
    queryKey: getQueryKey("getSilo", { id: siloId }),
  })

  return <BreadcrumbHeading titles={[silo?.name ?? "", "Configuration"]} />
}

export default Header
