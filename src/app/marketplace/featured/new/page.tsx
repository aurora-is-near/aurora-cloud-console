import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

const Page = async () => {
  return (
    <MarketplaceCategoryPage
      title="New & Noteworthy"
      description="Check out the latest additions to the Aurora Cloud ecosystem."
      query={{ new: true }}
    />
  )
}

export default Page
