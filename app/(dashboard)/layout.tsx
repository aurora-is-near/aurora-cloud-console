import { ReactNode } from "react"
import MobileMenu from "@/components/MobileMenu"
import MainMenu from "@/components/MainMenu"
import SubMenuNav from "@/components/SubMenuNav"
import PlanLimit from "@/components/PlanLimit"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MobileMenu />
      <MainMenu />

      <aside className="bg-white fixed inset-y-0 left-20 hidden w-72 overflow-y-auto border-r border-gray-200 p-6 lg:flex grow flex-col gap-y-7">
        <SubMenuNav />
        <PlanLimit />
      </aside>

      <main className="lg:pl-20">
        <div className="lg:pl-72">
          <div className="px-8 py-6">{children}</div>
        </div>
      </main>
    </div>
  )
}
