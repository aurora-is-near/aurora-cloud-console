import { SubMenuItem, subrouteMap } from "@/constants/navigation"

export const getSubroutes = (
  pathname: string,
  route: string,
): SubMenuItem[] => {
  if (pathname.startsWith("/admin")) {
    return []
  }

  return subrouteMap[route as keyof typeof subrouteMap] ?? []
}
