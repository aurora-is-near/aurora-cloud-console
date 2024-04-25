import { usePathname } from "next/navigation"

export const useTeamKey = () => {
  const pathname = usePathname()
  const teamKey = pathname.split("/")[2]

  return teamKey
}
