"use client"

import { useStripePaymentLink } from "@/hooks/useStripePaymentLink"
import type { Team } from "@/types/types"

import IconCoins from "../../../../../public/static/icons/coins.svg"
import { Banner } from "./Banner"

type Props = {
  team: Team
}

export const BannerTopup = ({ team }: Props) => {
  const topupLink = useStripePaymentLink(team)
  return (
    <Banner
      variant="info"
      title="Top up your transaction credits"
      description={
        <>
          While there are no ongoing service fees, transaction credits are
          needed to settle on NEAR Protocol. Aurora covers the first{" "}
          <strong className="text-slate-900">1,000 transactions</strong>, beyond
          which you will need to top up.
        </>
      }
      icon={<IconCoins className="w-11 h-11 text-green-900" />}
      link={
        topupLink
          ? {
              isExternal: true,
              isDisabled: false,
              trackEventName: "top_up_click",
              label: "Top up now",
              url: topupLink,
            }
          : {
              isExternal: true,
              isDisabled: true,
              trackEventName: "top_up_click",
              label: "Top up now",
            }
      }
    />
  )
}
