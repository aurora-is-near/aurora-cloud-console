import { ReactNode } from "react"
import { Metadata } from "next"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { MainMenu } from "@/components/menu/MainMenu"
import { MarketplaceFooter } from "@/app/marketplace/MarketPlaceFooter"
import { MarketPlaceSearchInput } from "@/app/marketplace/MarketPlaceSearchInput"

export const metadata: Metadata = {
  title: "Aurora Cloud Marketplace",
  description: "Enhance your Aurora Chain with powerful tools and services.",
  openGraph: {
    url: "https://app.auroracloud.dev/marketplace",
    images: [
      {
        url: "https://app.auroracloud.dev/marketplace/static/v2/images/acc-marketplace-opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Aurora Cloud Marketplace",
      },
    ],
  },
}

const Layout = async ({ children }: { children: ReactNode }) => {
  const authUser = await getAuthUser()

  return (
    <div className="bg-slate-50">
      <MainMenu
        isMarketplace
        authUser={authUser}
        menuItems={authUser ? [{ name: "Dashboard", href: "/dashboard" }] : []}
      >
        <MarketPlaceSearchInput className="hidden md:flex" />
      </MainMenu>
      {children}
      <MarketplaceFooter className="mt-16" />
    </div>
  )
}

export default Layout
