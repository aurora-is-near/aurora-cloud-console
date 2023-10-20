import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import Button from "@/components/Button"
import { getSiloById } from "@/mockApi"
import { PlusIcon } from "@heroicons/react/20/solid"
import { notFound } from "next/navigation"

const Header = async ({ siloId }: { siloId: string }) => {
  const silo = await getSiloById(siloId)

  if (!silo) notFound()

  return (
    <header className="flex items-start sm:justify-between sm:items-center sm:flex-row flex-col gap-3">
      <BreadcrumbHeading titles={[silo.name, "Tokens"]} />
      <Button>
        <PlusIcon className="h-5 w-5" />
        <span>Deploy token</span>
      </Button>
    </header>
  )
}

export default Header
