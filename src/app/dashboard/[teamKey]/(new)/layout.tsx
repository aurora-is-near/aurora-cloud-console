import { ReactNode } from "react"
import { PlusIcon } from "@heroicons/react/20/solid"
import { isAdmin } from "@/actions/is-admin"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { LinkButton } from "@/components/LinkButton"

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
        <LinkButton
          href={`/dashboard/${teamKey}/create-chain`}
          variant="dark"
          size="lg"
          className="justify-start"
          fullWidth
        >
          <div className="flex w-full items-center gap-x-2">
            <PlusIcon className="w-6 h-6" />
            Create Aurora Chain
          </div>
        </LinkButton>
      }
    >
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
