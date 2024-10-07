import { ReactNode } from "react"
import { PlusIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
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
        <Link href={`/dashboard/${teamKey}/create_chain`}>
          <Button variant="dark" size="lg" fullWidth>
            <div className="flex w-full items-center gap-x-2">
              <PlusIcon className="w-6 h-6" />
              Create Aurora Chain
            </div>
          </Button>
        </Link>
      }
    >
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
