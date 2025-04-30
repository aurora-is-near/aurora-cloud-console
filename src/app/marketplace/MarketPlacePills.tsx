import Image from "next/image"
import clsx from "clsx"
import { MarketPlacePill } from "./MarketPlacePill"

type MarketPlacePillsProps = {
  categories: {
    id: string
    title: string
  }[]
  builtByAurora?: boolean
  className?: string
}

export const MarketPlacePills = ({
  categories,
  builtByAurora,
  className,
}: MarketPlacePillsProps) => {
  return (
    <ul className={clsx("flex flex-wrap gap-1.5", className)}>
      {categories.map((category) => (
        <li key={category.id}>
          <MarketPlacePill>{category.title}</MarketPlacePill>
        </li>
      ))}
      {builtByAurora && (
        <MarketPlacePill variant="green">
          <Image
            src="/static/v2/images/icons/marketplace/aurora-small.svg"
            width={14}
            height={14}
            className="inline-block mr-1"
            alt=""
          />
          Built by Aurora
        </MarketPlacePill>
      )}
    </ul>
  )
}
