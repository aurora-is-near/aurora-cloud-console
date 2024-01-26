import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import MainMenu from "@/components/menu/MainMenu"
import MobileMenu from "@/components/menu/MobileMenu"
import SubMenuNav from "@/components/menu/SubMenuNav"
import { notFound } from "next/navigation"
import { isAdmin } from "@/actions/admin/is-admin"
import {
  mainAdminExtraNavigation,
  mainAdminNavigation,
} from "@/constants/navigation"

export default async function Layout({ children }: { children: ReactNode }) {
  if (!(await isAdmin())) {
    notFound()
  }

  return (
    <div>
      <MainMenu
        mainMenuItems={mainAdminNavigation}
        extraMenuItems={mainAdminExtraNavigation}
      />
      <MobileMenu
        isAdmin
        menuItems={[...mainAdminNavigation, ...mainAdminExtraNavigation]}
      />

      <aside className="fixed inset-y-0 flex-col hidden p-6 overflow-y-auto bg-white border-r border-gray-200 left-20 w-72 lg:flex grow gap-y-7">
        <SubMenuNav isAdmin />
      </aside>

      <main className="lg:pl-20">
        <div className="lg:pl-72">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
            }}
          />
          <div className="relative px-4 py-6 md:px-6 lg:px-8">{children}</div>
        </div>
      </main>
    </div>
  )
}
