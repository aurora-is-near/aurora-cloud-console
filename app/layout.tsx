import { circular } from "@/styles/fonts/fonts"
import type { Metadata } from "next"
import "../styles/globals.css"

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
        {children}
      </body>
    </html>
  )
}
