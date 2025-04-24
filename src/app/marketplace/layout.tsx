import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { ReactNode } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { LinkButton } from "@/components/LinkButton"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"

const Layout = async ({ children }: { children: ReactNode }) => {
  const authUser = await getAuthUser()

  return (
    <DashboardLayout
      isMarketplace
      authUser={authUser}
      sidebarMenu={{
        action: (
          <div className="w-fit">
            <LinkButton
              fullWidth
              size="md"
              variant="border"
              href="/marketplace"
            >
              <ArrowLeftIcon className="w-5 h-5 left-4" />
              Back
            </LinkButton>
          </div>
        ),
        sections: [
          {
            heading: "Featured",
            items: [
              {
                name: "Popular",
                href: `/marketplace/popular`,
              },
              {
                name: "Built by Aurora",
                href: `/marketplace/built-by-aurora`,
              },
              {
                name: "Essentials",
                href: `/marketplace/essentials`,
              },
              {
                name: "New & noteworthy",
                href: `/marketplace/new`,
              },
            ],
          },
        ],
      }}
    >
      {children}
    </DashboardLayout>
  )
}

export default Layout
