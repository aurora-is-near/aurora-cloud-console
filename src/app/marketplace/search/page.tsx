"use client"

import { useCallback, useEffect, useState } from "react"
import { MarketplaceAppCard } from "@/types/marketplace"
import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppsSearchDocument,
  MarketplaceAppsSearchQuery,
} from "@/cms/generated/graphql"
import { MarketplaceCategoryPage } from "../MarketplaceCategoryPage"

const Page = ({
  searchParams: { query },
}: {
  searchParams: { query?: string }
}) => {
  const [apps, setApps] = useState<MarketplaceAppCard[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadResults = useCallback(async () => {
    const graphqlClient = createGraphqlClient()

    const { allMarketplaceApps = [] } =
      await graphqlClient.request<MarketplaceAppsSearchQuery>(
        MarketplaceAppsSearchDocument,
        { search: query ?? "" },
      )

    setApps(allMarketplaceApps)
    setIsLoading(false)
  }, [query])

  useEffect(() => {
    setIsLoading(true)
    void loadResults()
  }, [loadResults])

  if (isLoading) {
    return null
  }

  return (
    <MarketplaceCategoryPage title={`Results for "${query}"`} apps={apps} />
  )
}

export default Page
