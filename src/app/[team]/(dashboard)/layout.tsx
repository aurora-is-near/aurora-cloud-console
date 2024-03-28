import { ReactNode } from "react"
import { mainExtraNavigation, getMainNavigation } from "@/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      mainMenuItems={await getMainNavigation()}
      extraMenuItems={mainExtraNavigation}
    >
      {children}
    </DashboardLayout>
  )
}
