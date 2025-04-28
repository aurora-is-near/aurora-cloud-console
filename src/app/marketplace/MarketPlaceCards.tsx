import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"
import { Card } from "@/uikit"
import { Heading } from "@/uikit/Typography/Heading"
import { MarketplaceAppCard } from "@/types/marketplace"
import { MarketPlacePill } from "./MarketPlacePill"

type MarketplaceFooterProps = {
  apps: MarketplaceAppCard[]
  className?: string
  showNumberOfApps?: boolean
}

export const MarketplaceCards = ({
  apps,
  className,
  showNumberOfApps,
}: MarketplaceFooterProps) => {
  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      {showNumberOfApps && (
        <p className="font-bold text-lg tracking-tight">
          {apps.length} app{apps.length > 1 ? "s" : ""}
        </p>
      )}
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
