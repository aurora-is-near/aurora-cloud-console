import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"
import { Card } from "@/uikit"
import { Heading } from "@/uikit/Typography/Heading"
import { MarketplaceAppCard } from "@/types/marketplace"
import {
  MarketplaceAppsDocument,
  MarketplaceAppsQuery,
  MarketplaceAppsQueryVariables,
} from "@/cms/generated/graphql"
import { createGraphqlClient } from "@/cms/client"
import { LinkButton } from "@/components/LinkButton"
import { MarketPlacePill } from "./MarketPlacePill"

type MarketplaceFooterProps = {
  className?: string
  showNumberOfApps?: boolean
  title?: string
  seeAllLink?: string
  query: MarketplaceAppsQueryVariables
}

export const MarketplaceCards = async ({
  className,
  showNumberOfApps,
  title,
  seeAllLink,
  query,
}: MarketplaceFooterProps) => {
  const graphqlClient = createGraphqlClient()
  const { allMarketplaceApps = [] } =
    await graphqlClient.request<MarketplaceAppsQuery>(
      MarketplaceAppsDocument,
      query,
    )

  const apps = allMarketplaceApps.filter(
    (app): app is MarketplaceAppCard =>
      !!app.id && !!app.title && !!app.slug && !!app.categories,
  )

  return (
    <div className={clsx("flex flex-col", className)}>
      <div className="mb-4 flex flex-row items-center justify-between">
        {!!title && <Heading size={3}>{title}</Heading>}
        {showNumberOfApps && (
          <p className="font-bold text-lg tracking-tight">
            {apps.length} app{apps.length === 1 ? "" : "s"}
          </p>
        )}
        {!!seeAllLink && (
          <LinkButton size="sm" href={seeAllLink} variant="border">
            See all
          </LinkButton>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {apps?.map((app) => (
          <Link key={app.id} href={`/marketplace/apps/${app.slug}`}>
            <Card>
              {!!app.logo?.url && (
                <Image
                  src={app.logo.url}
                  width={48}
                  height={48}
                  className="object-contain mb-4"
                  alt=""
                />
              )}
              <Heading size={4}>{app.title}</Heading>
              {!!app.description && (
                <p className="text-sm text-slate-500 line-clamp-2	mt-1.5">
                  {app.description}
                </p>
              )}
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {app.categories.map((category) => (
                  <li key={category.id}>
                    <MarketPlacePill>{category.title}</MarketPlacePill>
                  </li>
                ))}
                {app.builtByAurora && (
                  <MarketPlacePill variant="green">
                    <Image
                      src="/static/v2/images/icons/marketplace/aurora-small.svg"
                      width={14}
                      height={14}
                      className="inline-block mr-1"
                      alt=""
                    />
                    Built by Aurora
                  </MarketPlacePill>
                )}
              </ul>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
