"use client"

import Image from "next/image"
import { useDarkMode } from "@/hooks/useDarkMode"

export const MarketplaceFooterLogo = () => {
  const { isDarkModeEnabled } = useDarkMode()

  return (
    <div>
      <Image
        width="122"
        height="70"
        src={`/static/image/aurora-cloud-logo${isDarkModeEnabled ? "-dark" : ""}.svg`}
        alt="Aurora Cloud logo"
        className="hidden md:block"
      />
      <Image
        width="217"
        height="28"
        src={`/static/image/aurora-cloud-logo-horizontal${isDarkModeEnabled ? "-dark" : ""}.svg`}
        alt="Aurora Cloud logo"
        className="md:hidden"
      />
    </div>
  )
}
