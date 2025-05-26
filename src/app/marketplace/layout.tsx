import { ReactNode } from "react"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { MainMenu } from "@/components/menu/MainMenu"
import { MarketplaceFooter } from "@/app/marketplace/MarketPlaceFooter"
import { MarketPlaceSearchInput } from "@/app/marketplace/MarketPlaceSearchInput"
import { DarkModeProvider } from "@/providers/DarkModeProvider"

export const metadata: Metadata = {
  title: "Aurora Cloud Marketplace",
  description: "Enhance your Aurora Chain with powerful tools and services.",
  openGraph: {
    url: "https://app.auroracloud.dev/marketplace",
    images: [
      {
        url: "https://app.auroracloud.dev/marketplace/static/image/acc-marketplace-opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Aurora Cloud Marketplace",
      },
    ],
  },
}

export const THEME_PREFERENCES = ["light", "dark"] as const
export const THEME_PREFERENCE_KEY = "theme_preference"

export type ThemePreference = (typeof THEME_PREFERENCES)[number]

const isValidThemePreference = (theme?: string): theme is ThemePreference =>
  !!theme && THEME_PREFERENCES.includes(theme as ThemePreference)

const getThemePreference = (): ThemePreference => {
  const cookieStore = cookies()

  const storedPreference = cookieStore.get(THEME_PREFERENCE_KEY)

  if (storedPreference && isValidThemePreference(storedPreference.value)) {
    return storedPreference.value
  }

  return "light"
}

const Layout = async ({ children }: { children: ReactNode }) => {
  const authUser = await getAuthUser()

  return (
    <DarkModeProvider initialThemePreference={getThemePreference()}>
      <div className="bg-slate-50 dark:bg-slate-900">
        <MainMenu
          isMarketplace
          hasDarkModeToggle
          authUser={authUser}
          menuItems={
            authUser ? [{ name: "Dashboard", href: "/dashboard" }] : []
          }
        >
          <MarketPlaceSearchInput className="hidden md:flex" />
        </MainMenu>
        {children}
        <MarketplaceFooter className="mt-16" />
      </div>
    </DarkModeProvider>
  )
}

export default Layout
