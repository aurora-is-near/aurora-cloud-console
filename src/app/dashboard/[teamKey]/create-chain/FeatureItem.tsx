import type { ComponentType, SVGProps } from "react"

import { NewLineBreaker, Typography } from "@/uikit"

type Props = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
}

export const FeatureItem = ({ icon: Icon, title }: Props) => {
  return (
    <div className="flex flex-col flex-1 basis-auto items-center justify-center gap-2 p-6 bg-slate-50 rounded-lg">
      <Icon className="w-6 h-6" />
      <Typography
        variant="heading"
        size={4}
        className="text-slate-900 text-center"
      >
        <NewLineBreaker>{title}</NewLineBreaker>
      </Typography>
    </div>
  )
}
