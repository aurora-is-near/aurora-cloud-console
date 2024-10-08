import type { Metadata } from "next"
import { Suspense } from "react"
import { circular } from "@/styles/fonts/fonts"
import "../styles/globals.css"
import { Providers } from "@/app/Providers"
import { ErrorModal } from "@/components/ErrorModal"
import { FullScreenPage } from "@/components/FullScreenPage"

export const metadata: Metadata = {
  title: "Aurora Cloud Console",
  description: "",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="h-full">
      <body className={`${circular.variable} font-sans h-full bg-gray-50`}>
        <Suspense
          fallback={
            <FullScreenPage>
              <div className="text-slate-100 uppercase flex justify-center">
                Loading
              </div>
            </FullScreenPage>
          }
        >
          <Providers>
            {children}
            <ErrorModal />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}

export default RootLayout
