import { isAdmin } from "@/actions/is-admin"
import { UNAUTHORISED_ROUTE } from "@/constants/routes"
import { redirect } from "next/navigation"

// Opt out of caching for all admin routes.
// https://nextjs.org/docs/app/building-your-application/caching#opting-out-1
export const dynamic = "force-dynamic"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAdminUser = await isAdmin()

  if (!isAdminUser) {
    return redirect(UNAUTHORISED_ROUTE)
  }

  return <>{children}</>
}
