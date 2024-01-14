import { useRequiredContext } from "@/hooks/useRequiredContext"
import { ModalsContext } from "@/providers/ModalsProvider"

export const useModals = () => useRequiredContext(ModalsContext)
