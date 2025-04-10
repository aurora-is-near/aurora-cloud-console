import clsx from "clsx"
import type { PropsWithChildren, ReactNode } from "react"

import { Typography } from "@/uikit"

interface HeroProps extends PropsWithChildren {
  title: ReactNode
  description: ReactNode
  image?: ReactNode
  hasDivider?: boolean
}

const Hero = ({
  title,
  description,
  image,
  children,
  hasDivider = false,
}: HeroProps) => (
  <div
    className={clsx(
      "py-12",
      hasDivider ? "border-b border-slate-200 mb-7" : "",
    )}
  >
    <div className="flex flex-row gap-8 justify-between items-center">
      <div className="flex flex-col gap-5 pb-5 lg:max-w-[580px]">
        <Typography variant="heading" size={2} as="h1">
          <div className="flex flex-row items-center gap-5">{title}</div>
        </Typography>
        <Typography variant="paragraph" size={1} className="text-slate-500">
          {description}
        </Typography>
        <div>{children}</div>
      </div>
      <div className="hidden md:flex self-start">{image}</div>
    </div>
  </div>
)

export default Hero
