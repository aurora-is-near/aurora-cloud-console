import { ReactNode } from "react"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { MainMenu } from "@/components/menu/MainMenu"
import { MarketplaceFooter } from "@/app/marketplace/MarketPlaceFooter"

const Layout = async ({ children }: { children: ReactNode }) => {
  const authUser = await getAuthUser()

  return (
    <div className="bg-slate-50">
      <MainMenu isMarketplace authUser={authUser} />
      {children}
      <MarketplaceFooter className="mt-16" />
    </div>
  )
}

export default Layout
