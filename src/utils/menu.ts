import { SubMenuItem, subrouteMap } from "@/constants/navigation"

export const getSubroutes = (
  route: string,
  isAdmin?: boolean,
): SubMenuItem[] => {
  if (isAdmin) {
    return []
  }

  return subrouteMap[route as keyof typeof subrouteMap] ?? []
}
