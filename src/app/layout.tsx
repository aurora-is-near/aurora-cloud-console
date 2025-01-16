import type { Metadata } from "next"
import { Suspense } from "react"
import Script from "next/script"
import { circular } from "@/styles/fonts/fonts"
import "../styles/globals.css"
import { Providers } from "@/app/Providers"
import { ErrorModal } from "@/components/ErrorModal"

export const metadata: Metadata = {
  title: "Aurora Cloud Console",
  description: "",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="h-full">
      <Script id="mixpanel-script" strategy="afterInteractive">
        {`
          mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
            debug: true,
            track_pageview: true,
            persistence: 'localStorage'
          });
        `}
      </Script>
      <body className={`${circular.variable} font-sans h-full bg-gray-50`}>
        <Providers>
          {children}
          <Suspense>
            <ErrorModal />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
