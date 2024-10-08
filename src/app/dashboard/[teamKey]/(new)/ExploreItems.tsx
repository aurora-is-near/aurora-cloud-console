import { PropsWithChildren } from "react"

export const ExploreItems = ({ children }: PropsWithChildren) => (
  <div className="grid md:grid-cols-3 gap-6">{children}</div>
)
