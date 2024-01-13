import type { Metadata } from "next"
import { circular } from "@/styles/fonts/fonts"
import "../styles/globals.css"
import Providers from "@/app/Providers"

export const metadata: Metadata = {
  title: "Aurora Cloud Console",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${circular.variable} font-sans h-full bg-gray-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
