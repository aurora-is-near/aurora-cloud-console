import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

const Page = async () => {
  return (
    <MarketplaceCategoryPage
      title="Popular"
      description="Enjoy our staff picks for the most popular apps on Aurora Cloud."
      query={{ popular: true }}
    />
  )
}

export default Page
