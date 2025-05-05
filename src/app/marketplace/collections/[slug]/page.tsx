import { notFound } from "next/navigation"
import {
  MarketplaceAppCategoriesDocument,
  MarketplaceAppCategoriesQuery,
  MarketplaceCollectionDocument,
  MarketplaceCollectionQuery,
} from "@/cms/generated/graphql"
import { createGraphqlClient } from "@/cms/client"
import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

export async function generateStaticParams() {
  const graphqlClient = createGraphqlClient()

  const { allMarketplaceAppCategories } =
    await graphqlClient.request<MarketplaceAppCategoriesQuery>(
      MarketplaceAppCategoriesDocument,
    )

  return allMarketplaceAppCategories.map((item) => ({
    slug: item.slug,
  }))
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const graphqlClient = createGraphqlClient()
  const { slug } = await params

  const { marketplaceCollection } =
    await graphqlClient.request<MarketplaceCollectionQuery>(
      MarketplaceCollectionDocument,
      { slug },
    )

  if (!marketplaceCollection) {
    notFound()
  }

  return (
    <MarketplaceCategoryPage
      title={marketplaceCollection.title}
      description={marketplaceCollection.description}
      apps={marketplaceCollection.apps}
    />
  )
}

export default Page
