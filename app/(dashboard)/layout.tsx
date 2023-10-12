import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import MainMenu from "@/components/menu/MainMenu"
import MobileMenu from "@/components/menu/MobileMenu"
import SubMenuNav from "@/components/menu/SubMenuNav"
import PlanLimit from "./PlanLimit"
import Providers from "./Providers"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div>
        <MainMenu />
        <MobileMenu />

        <aside className="fixed inset-y-0 flex-col hidden p-6 overflow-y-auto bg-white border-r border-gray-200 left-20 w-72 lg:flex grow gap-y-7">
          <SubMenuNav />
          <PlanLimit />
        </aside>

        <main className="lg:pl-20">
          <div className="lg:pl-72">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 5000,
              }}
            />
            <div className="relative px-8 pt-6 pb-[132px]">{children}</div>
          </div>
        </main>
      </div>
    </Providers>
  )
}
