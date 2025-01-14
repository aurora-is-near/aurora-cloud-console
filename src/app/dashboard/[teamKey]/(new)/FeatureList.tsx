import { ReactNode } from "react"
import Card from "@/components/Card"
import { generateIcon } from "@/utils/buttons"

export interface FeatureBanner {
  icon: ReactNode
  title: string
}

const FeatureList = ({ features }: { features: FeatureBanner[] }) => {
  return (
    <div className="mt-5 grid w-full max-w-sm flex-1 gap-4 md:max-w-none md:grid-cols-3 md:gap-8">
      {features.map((feature: FeatureBanner) => {
        const icon = generateIcon(
          feature.icon,
          "h-5 w-5 text-green-800 md:h-10 md:w-10",
        )

        return (
          <Card className="md:p-7" key={feature.title}>
            {icon}
            <h3 className="mt-4 max-w-[65%] font-medium text-slate-900 text leading-5 md:mt-5">
              {feature.title}
            </h3>
          </Card>
        )
      })}
    </div>
  )
}

export default FeatureList
