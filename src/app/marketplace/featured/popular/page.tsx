import { getMarketplaceApps } from "@/utils/marketplace/get-marketplace-apps"
import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

const Page = async () => {
  const apps = await getMarketplaceApps({ new: true })

  return (
    <MarketplaceCategoryPage
      title="Popular"
      description="Enjoy our staff picks for the most popular apps on Aurora Cloud."
      apps={apps}
    />
  )
}

export default Page
