import { ReactNode } from "react"
import MobileMenu from "@/components/MobileMenu"
import MainMenu from "@/components/MainMenu"
import SubMenu from "@/components/SubMenu"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MobileMenu />
      <MainMenu />
      <SubMenu />

      <main className="lg:pl-20">
        <div className="lg:pl-72">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">{children}</div>
        </div>
      </main>
    </div>
  )
}
