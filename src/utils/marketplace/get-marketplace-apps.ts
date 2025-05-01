import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppsDocument,
  MarketplaceAppsQuery,
  MarketplaceAppsQueryVariables,
} from "@/cms/generated/graphql"
import { MarketplaceAppCard } from "@/types/marketplace"

export const getMarketplaceApps = async (
  query: MarketplaceAppsQueryVariables,
) => {
  const graphqlClient = createGraphqlClient()
  const { allMarketplaceApps = [] } =
    await graphqlClient.request<MarketplaceAppsQuery>(
      MarketplaceAppsDocument,
      query,
    )

  return allMarketplaceApps.filter(
    (app): app is MarketplaceAppCard =>
      !!app.id && !!app.title && !!app.slug && !!app.categories,
  )
}
