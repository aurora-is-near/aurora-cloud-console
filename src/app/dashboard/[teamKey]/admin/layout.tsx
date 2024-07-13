import { redirect } from "next/navigation"
import { isAdmin } from "@/actions/is-admin"
import { UNAUTHORISED_ROUTE } from "@/constants/routes"

// Opt out of caching for all admin routes.
// https://nextjs.org/docs/app/building-your-application/caching#opting-out-1
export const dynamic = "force-dynamic"

export const Layout = async ({ children }: { children: React.ReactNode }) => {
  const isAdminUser = await isAdmin()

  if (!isAdminUser) {
    return redirect(UNAUTHORISED_ROUTE)
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default Layout
