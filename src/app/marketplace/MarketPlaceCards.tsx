import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"
import { ArrowRightIcon } from "@heroicons/react/20/solid"
import { Heading } from "@/uikit/Typography/Heading"
import { LinkButton } from "@/components/LinkButton"
import { MarketPlacePills } from "@/app/marketplace/MarketPlacePills"
import Card from "@/components/Card"
import { getAuroraCollection } from "@/utils/marketplace/get-aurora-collection"
import { MarketplaceAppCard } from "@/types/marketplace"

type MarketplaceCardsProps = {
  className?: string
  showNumberOfApps?: boolean
  numberOfAppsToShow?: number
  showSingleRow?: boolean
  title?: string
  seeAllLink?: string
  apps: MarketplaceAppCard[]
}

export const MarketplaceCards = ({
  className,
  showNumberOfApps,
  numberOfAppsToShow,
  showSingleRow,
  title,
  seeAllLink,
  apps,
}: MarketplaceCardsProps) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <div className="mb-4 flex flex-row items-center justify-between">
        {!!title && (
          <h2 className="text-slate-900 dark:text-slate-50 text-2xl font-bold tracking-[-1px]">
            {title}
          </h2>
        )}
        {showNumberOfApps && (
          <p className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-50">
            {apps.length} app{apps.length === 1 ? "" : "s"}
          </p>
        )}
        {!!seeAllLink && (
          <LinkButton
            size="sm"
            href={seeAllLink}
            variant="border"
            className={clsx(
              "text-slate-900 dark:text-slate-50",
              numberOfAppsToShow &&
                apps.length <= numberOfAppsToShow &&
                "hidden xl:hidden",
            )}
          >
            See all
            <ArrowRightIcon className="w-4 h-4" />
          </LinkButton>
        )}
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {apps?.slice(0, numberOfAppsToShow ?? apps.length).map((app, index) => {
          return (
            <Link
              key={app.id}
              href={`/marketplace/apps/${app.slug}`}
              className={clsx(
                showSingleRow && index > 1 && "md:hidden xl:block",
                showSingleRow && index > 2 && "xl:hidden",
              )}
            >
              <Card isClickable>
                <div className="w-[48px] h-[48px] relative mb-4">
                  {app.logo?.url ? (
                    <Image
                      fill
                      src={app.logo.url}
                      className="object-contain rounded-xl"
                      alt=""
                    />
                  ) : (
                    <div className="bg-slate-200 dark:bg-slate-700 rounded-xl h-full w-full" />
                  )}
                </div>
                <Heading size={4} className="text-slate-900 dark:text-slate-50">
                  {app.title}
                </Heading>
                {!!app.description && (
                  <p className="text-sm text-slate-500 dark:text-slate-300 line-clamp-2	mt-1.5">
                    {app.description}
                  </p>
                )}
                <MarketPlacePills
                  categories={app.categories}
                  auroraCollection={getAuroraCollection(app)}
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
