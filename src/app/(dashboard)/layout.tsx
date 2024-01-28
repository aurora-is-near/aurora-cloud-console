import { ReactNode } from "react"
import { mainExtraNavigation, mainNavigation } from "@/constants/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      mainMenuItems={mainNavigation}
      extraMenuItems={mainExtraNavigation}
    >
      {children}
    </DashboardLayout>
  )
}
