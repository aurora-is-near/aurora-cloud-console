import { ReactNode } from "react"
import { PlusIcon } from "@heroicons/react/20/solid"
import { isAdmin } from "@/actions/is-admin"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { Button } from "@/components/Button"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const isAdminUser = await isAdmin()

  return (
    <MainDashboardLayout
      teamKey={teamKey}
      showAdminMenu={isAdminUser}
      sidebarAction={
        <Button variant="dark" size="lg">
          <PlusIcon className="inline-block w-4 h-4" />
          Create Aurora Chain
        </Button>
      }
    >
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
