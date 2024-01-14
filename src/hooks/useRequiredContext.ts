import { useContext } from "react"

export const useRequiredContext = <T>(ctx: React.Context<T | null>) => {
  const context = useContext(ctx)

  if (!context) {
    throw new Error(
      "This hook must be called from within the relevant provider",
    )
  }

  return context
}
