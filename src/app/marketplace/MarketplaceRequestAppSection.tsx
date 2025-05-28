import { MarketplaceSubmitAppRequestButton } from "@/app/marketplace/MarketplaceSubmitAppRequestButton"

type MarketplaceRequestAppSectionProps = {
  className?: string
}

export const MarketplaceRequestAppSection = ({
  className,
}: MarketplaceRequestAppSectionProps) => {
  return (
    <section className={className}>
      <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg tracking-[-0.5px]">
        Get your app listed
      </h3>
      <p className="text-slate-500 dark:text-slate-300 text-sm mt-3">
        Want to feature your integration here? Send us the details.
      </p>
      <MarketplaceSubmitAppRequestButton />
    </section>
  )
}
