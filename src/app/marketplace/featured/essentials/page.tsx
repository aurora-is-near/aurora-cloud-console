import { getMarketplaceApps } from "@/utils/marketplace/get-marketplace-apps"
import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

const Page = async () => {
  const apps = await getMarketplaceApps({ essential: true })

  return (
    <MarketplaceCategoryPage
      title="Essentials"
      description="Explore some apps we consider essential for running your virtual chain."
      apps={apps}
    />
  )
}

export default Page
