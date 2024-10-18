import { PropsWithChildren } from "react"

export const BulletPoint = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-slate-100 bg-slate-900 rounded-full w-5 h-5 min-w-5 font-medium flex items-center justify-center">
      {children}
    </div>
  )
}
