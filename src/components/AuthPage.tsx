import { AuroraTriangle } from "@/components/icons"
import { PropsWithChildren } from "react"

export const AuthPage = ({ children }: PropsWithChildren) => (
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <AuroraTriangle className="w-10 h-10 mx-auto mb-10" />
      {children}
    </div>
  </div>
)
