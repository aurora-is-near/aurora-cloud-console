import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppsDocument,
  MarketplaceAppsQuery,
  MarketplaceAppsQueryVariables,
} from "@/cms/generated/graphql"

export const getMarketplaceApps = async (
  query: MarketplaceAppsQueryVariables,
) => {
  const graphqlClient = createGraphqlClient()
  const { allMarketplaceApps = [] } =
    await graphqlClient.request<MarketplaceAppsQuery>(
      MarketplaceAppsDocument,
      query,
    )

  return allMarketplaceApps
}
