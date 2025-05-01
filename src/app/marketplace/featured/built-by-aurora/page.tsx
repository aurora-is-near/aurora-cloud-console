import { getMarketplaceApps } from "@/utils/marketplace/get-marketplace-apps"
import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

const Page = async () => {
  const apps = await getMarketplaceApps({ builtByAurora: true })

  return (
    <MarketplaceCategoryPage
      title="Built by Aurora"
      description="Explore integrations that every virtual chain comes with, providing a production-ready environment from day one."
      apps={apps}
    />
  )
}

export default Page
