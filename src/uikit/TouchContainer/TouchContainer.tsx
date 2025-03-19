import { PropsWithChildren } from "react"

export const TouchContainer = ({ children }: PropsWithChildren) => (
  <div className="flex items-center justify-center min-h-10 min-w-10">
    {children}
  </div>
)
