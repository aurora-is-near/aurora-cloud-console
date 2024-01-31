import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

type DashboardPageProps = {
  children: ReactNode
  footer?: ReactNode
}

export const DashboardPage = ({ children, footer }: DashboardPageProps) => {
  return (
    <div className="max-h-full flex-1 flex flex-col">
      <main className="overflow-auto">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
          }}
        />
        <div className="relative px-4 py-6 md:px-6 lg:px-8 min-h-screen flex flex-col">
          {children}
        </div>
      </main>
      {footer}
    </div>
  )
}
