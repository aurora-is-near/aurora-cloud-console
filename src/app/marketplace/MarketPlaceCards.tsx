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
import { MarketPlacePills } from "@/app/marketplace/MarketPlacePills"

type MarketplaceFooterProps = {
  className?: string
  showNumberOfApps?: boolean
  showSingleRow?: boolean
  title?: string
  seeAllLink?: string
  query: MarketplaceAppsQueryVariables
}

export const MarketplaceCards = async ({
  className,
  showNumberOfApps,
  showSingleRow,
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
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {apps?.map((app, index) => {
          return (
            <Link
              key={app.id}
              href={`/marketplace/apps/${app.slug}`}
              className={clsx(
                showSingleRow && index > 1 && "md:hidden xl:block",
                showSingleRow && index > 2 && "xl:hidden",
              )}
            >
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
                <MarketPlacePills
                  categories={app.categories}
                  builtByAurora={app.builtByAurora}
                  className="mt-4"
                />
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
