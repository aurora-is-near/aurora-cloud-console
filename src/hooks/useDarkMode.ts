import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DarkModeContext } from "@/providers/DarkModeProvider"

export const useDarkMode = () => useRequiredContext(DarkModeContext)
