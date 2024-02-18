import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { isAdmin } from "@/actions/is-admin"
import {
  mainAdminExtraNavigation,
  mainAdminNavigation,
} from "@/constants/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"

export default async function Layout({ children }: { children: ReactNode }) {
  if (!(await isAdmin())) {
    notFound()
  }

  return (
    <DashboardLayout
      isAdmin
      mainMenuItems={mainAdminNavigation}
      extraMenuItems={mainAdminExtraNavigation}
    >
      {children}
    </DashboardLayout>
  )
}
