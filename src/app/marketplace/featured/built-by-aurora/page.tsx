import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

const Page = async () => {
  return (
    <MarketplaceCategoryPage
      title="Built by Aurora"
      description="Explore integrations that every virtual chain comes with, providing a production-ready environment from day one."
      query={{ builtByAurora: true }}
    />
  )
}

export default Page
