import { useRequiredContext } from "@/hooks/useRequiredContext"
import { MenuContext } from "@/providers/MenuProvider"

export const useMenu = () => useRequiredContext(MenuContext)
