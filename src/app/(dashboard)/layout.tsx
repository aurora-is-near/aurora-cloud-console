import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import MainMenu from "@/components/menu/MainMenu"
import MobileMenu from "@/components/menu/MobileMenu"
import SubMenuNav from "@/components/menu/SubMenuNav"
import { mainExtraNavigation, mainNavigation } from "@/constants/navigation"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MainMenu
        mainMenuItems={mainNavigation}
        extraMenuItems={mainExtraNavigation}
      />
      <MobileMenu menuItems={[...mainNavigation, ...mainExtraNavigation]} />

      <aside className="fixed inset-y-0 flex-col hidden p-6 overflow-y-auto bg-white border-r border-gray-200 left-20 w-72 lg:flex grow gap-y-7">
        <SubMenuNav />
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
