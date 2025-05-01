import { Paragraph } from "@/uikit/Typography/Paragraph"
import { MarketplaceCards } from "@/app/marketplace/MarketPlaceCards"
import { Heading } from "@/uikit/Typography/Heading"
import { MarketplaceAppCard } from "@/types/marketplace"

type MarketplaceCategoryPageProps = {
  title?: string
  description?: string
  apps: MarketplaceAppCard[]
}

export const MarketplaceCategoryPage = ({
  title,
  description,
  apps,
}: MarketplaceCategoryPageProps) => {
  return (
    <div className="w-full lg:pl-16">
      <Heading size={1}>{title}</Heading>
      {!!description && (
        <Paragraph size={1} className="text-slate-500 mt-4">
          {description}
        </Paragraph>
      )}
      <MarketplaceCards showNumberOfApps apps={apps} className="mt-8" />
    </div>
  )
}
