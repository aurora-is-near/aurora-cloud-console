import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

const Page = async () => {
  return (
    <MarketplaceCategoryPage
      title="Essentials"
      description="Explore some apps we consider essential for running your virtual chain."
      query={{ essential: true }}
    />
  )
}

export default Page
