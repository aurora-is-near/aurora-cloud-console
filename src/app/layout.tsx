import type { Metadata } from "next"
import { circular } from "@/styles/fonts/fonts"
import "../styles/globals.css"
import { Providers } from "@/app/Providers"
import { ErrorModal } from "@/components/ErrorModal"
import { MetaMaskNotInstalledModal } from "@/components/MetaMaskNotInstalledModal"

export const metadata: Metadata = {
  title: "Aurora Cloud Console",
  description: "",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="h-full">
      <body className={`${circular.variable} font-sans h-full bg-gray-50 overflow-hidden`}>
        <Providers>
          {children}
          <ErrorModal />
          <MetaMaskNotInstalledModal />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
