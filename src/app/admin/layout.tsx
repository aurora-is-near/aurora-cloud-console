import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { isAdmin } from "@/actions/is-admin"
import { mainAdminExtraNavigation, mainAdminNavigation } from "@/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"
import { ToastSettingsProvider } from "@/providers/ToastSettingsProvider"

// Opt out of caching for all admin routes.
// https://nextjs.org/docs/app/building-your-application/caching#opting-out-1
export const dynamic = "force-dynamic"

export default async function Layout({ children }: { children: ReactNode }) {
  if (!(await isAdmin())) {
    notFound()
  }

  return (
    <ToastSettingsProvider position="bottom-right">
      <DashboardLayout
        mainMenuItems={mainAdminNavigation}
        extraMenuItems={mainAdminExtraNavigation}
      >
        {children}
      </DashboardLayout>
    </ToastSettingsProvider>
  )
}
