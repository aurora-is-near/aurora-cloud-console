import { getMarketplaceApps } from "@/utils/marketplace/get-marketplace-apps"
import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

const Page = async () => {
  const apps = await getMarketplaceApps({ new: true })

  return (
    <MarketplaceCategoryPage
      title="New & Noteworthy"
      description="Check out the latest additions to the Aurora Cloud ecosystem."
      apps={apps}
    />
  )
}

export default Page
