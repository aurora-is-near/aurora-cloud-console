import { subrouteMap } from "@/constants/navigation"
import { SubMenuItem } from "@/types/menu"

export const getSubroutes = (
  route: string,
  isAdmin?: boolean,
): SubMenuItem[] => {
  if (isAdmin) {
    return []
  }

  return subrouteMap[route as keyof typeof subrouteMap] ?? []
}
