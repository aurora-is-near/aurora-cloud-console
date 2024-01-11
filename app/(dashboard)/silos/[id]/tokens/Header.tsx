"use client"

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import Button from "@/components/Button"
import { useApiQuery } from "@/utils/api/queries"
import { PlusIcon } from "@heroicons/react/20/solid"

const Header = ({ siloId }: { siloId: number }) => {
  const { data: silo } = useApiQuery("getSilo", { params: { id: siloId } })

  return (
    <header className="flex items-start sm:justify-between sm:items-center sm:flex-row flex-col gap-3">
      <BreadcrumbHeading titles={[silo?.name ?? "", "Tokens"]} />
      <Button>
        <PlusIcon className="h-5 w-5" />
        <span>Deploy token</span>
      </Button>
    </header>
  )
}

export default Header
