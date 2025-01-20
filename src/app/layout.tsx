import type { Metadata } from "next"
import { Suspense } from "react"
import { circular } from "@/styles/fonts/fonts"
import "../styles/globals.css"
import { Providers } from "@/app/Providers"
import { VercelToolbar } from "@vercel/toolbar/next"

import { ErrorModal } from "@/components/ErrorModal"
import { PageviewTracker } from "@/components/Mixpanel/PageviewTracker"

export const metadata: Metadata = {
  title: "Aurora Cloud Console",
  description: "",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="h-full">
      <body className={`${circular.variable} font-sans h-full bg-gray-50`}>
        <Providers>
          {children}
          <VercelToolbar />
          <Suspense>
            <ErrorModal />
            <PageviewTracker />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
