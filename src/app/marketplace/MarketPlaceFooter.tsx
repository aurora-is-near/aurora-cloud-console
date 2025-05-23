import Link from "next/link"
import Image from "next/image"
import { BaseContainer } from "@/components/BaseContainer"
import { MarketplaceFooterItem } from "@/app/marketplace/MarketPlaceFooterItem"

type MarketplaceFooterProps = {
  className?: string
}

export const MarketplaceFooter = ({ className }: MarketplaceFooterProps) => {
  const year = new Date().getFullYear()

  return (
    <footer className={className}>
      <BaseContainer
        size="lg"
        className="flex flex-col md:grid md:grid-cols-6 md:gap-4"
      >
        <div>
          <Image
            width="122"
            height="70"
            src="/static/v2/images/aurora-cloud-logo.svg"
            alt="Aurora Cloud logo"
            className="hidden md:block"
          />
          <Image
            width="217"
            height="28"
            src="/static/v2/images/aurora-cloud-logo-horizontal.svg"
            alt="Aurora Cloud logo"
            className="md:hidden"
          />
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 md:border-none md:col-span-2 xl:ml-16 pt-8 mt-6 md:pt-0 md:mt-0">
          <h4 className="uppercase font-bold tracking-[2px] text-slate-900 dark:text-slate-50 mb-6">
            Get Help
          </h4>
          <ul className="grid gap-y-4">
            <MarketplaceFooterItem
              href="https://discord.com/invite/auroralabs"
              iconSrc="/static/v2/images/icons/marketplace/discord.svg"
            >
              Developer chat on Discord
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="https://t.me/auroraisnear"
              iconSrc="/static/v2/images/icons/marketplace/telegram.svg"
            >
              Aurora Cloud chat on Telegram
            </MarketplaceFooterItem>
          </ul>
        </div>
        <div className="md:col-span-3 mt-8 md:mt-0">
          <h4 className="uppercase font-bold tracking-[2px] text-slate-900 dark:text-slate-50 mb-6">
            Resources
          </h4>
          <ul className="gap-y-4 grid grid-cols-2 lg:grid-cols-3 gap-x-8">
            <MarketplaceFooterItem
              href="https://aurora-labs.gitbook.io/aurora-cloud-documentation"
              iconSrc="/static/v2/images/icons/marketplace/file.svg"
            >
              Documentation
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="/dashboard"
              iconSrc="/static/v2/images/icons/marketplace/bookmarks.svg"
            >
              Developer Portal
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="https://aurora.dev/ecosystem"
              iconSrc="/static/v2/images/icons/marketplace/planet.svg"
            >
              Ecosystem
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="https://aurora.dev/blog"
              iconSrc="/static/v2/images/icons/marketplace/pen.svg"
            >
              Blog
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="https://aurora.dev"
              iconSrc="/static/v2/images/icons/marketplace/aurora.svg"
            >
              Aurora.dev
            </MarketplaceFooterItem>
          </ul>
        </div>
      </BaseContainer>
      <BaseContainer size="lg">
        <div className="border-t border-slate-200 dark:border-slate-700 py-8 mt-8 flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center space-x-5 text-sm font-medium leading-none text-slate-500 dark:text-slate-300">
            <Link
              className="underline hover:no-underline"
              href="https://auroracloud.dev/terms"
              target="_blank"
            >
              Terms
            </Link>
            <Link
              className="underline hover:no-underline"
              href="https://auroracloud.dev/privacy"
              target="_blank"
            >
              Privacy
            </Link>
          </div>
          <div className="text-sm font-medium leading-none text-slate-500 dark:text-slate-300 mt-4 sm:mt-0">
            &copy; {year} Aurora Labs. All Rights Reserved.
          </div>
        </div>
      </BaseContainer>
    </footer>
  )
}
